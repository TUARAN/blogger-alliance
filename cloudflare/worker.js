const SESSION_TTL_MS = 30 * 60 * 1000
const ACCESS_FAILURE_WINDOW_MS = 15 * 60 * 1000
const ACCESS_MAX_FAILURES = 5
const ACCESS_LOCKOUT_MS = 15 * 60 * 1000
const jsonEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

function normalizeCredential(raw) {
  if (raw == null) {
    return ''
  }

  return String(raw)
    .replace(/^\uFEFF/, '')
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, '')
    .trim()
    .normalize('NFKC')
}

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...(init.headers || {})
    }
  })
}

function toBase64Url(bytes) {
  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromBase64Url(value) {
  const normalized = String(value).replace(/-/g, '+').replace(/_/g, '/')
  const padLength = (4 - (normalized.length % 4 || 4)) % 4
  const binary = atob(normalized + '='.repeat(padLength))
  const bytes = new Uint8Array(binary.length)

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }

  return bytes
}

async function importHmacKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    jsonEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

async function signTokenPayload(payload, secret) {
  const payloadBase64 = toBase64Url(jsonEncoder.encode(JSON.stringify(payload)))
  const key = await importHmacKey(secret)
  const signature = await crypto.subtle.sign('HMAC', key, jsonEncoder.encode(payloadBase64))

  return `${payloadBase64}.${toBase64Url(new Uint8Array(signature))}`
}

async function verifySessionToken(token, secret) {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return null
  }

  const [payloadBase64, signatureBase64] = token.split('.', 2)

  if (!payloadBase64 || !signatureBase64) {
    return null
  }

  let payload

  try {
    payload = JSON.parse(textDecoder.decode(fromBase64Url(payloadBase64)))
  } catch {
    return null
  }

  if (!payload?.exp || payload.exp <= Date.now()) {
    return null
  }

  const key = await importHmacKey(secret)
  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    fromBase64Url(signatureBase64),
    jsonEncoder.encode(payloadBase64)
  )

  if (!isValid || payload.scope !== 'internal-data') {
    return null
  }

  return payload
}

function getClientFingerprintSource(request) {
  const ip =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown'
  const userAgent = request.headers.get('User-Agent') || 'unknown'

  return `${String(ip).trim()}|${String(userAgent).trim()}`
}

function bytesToHex(bytes) {
  return Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('')
}

async function createClientKey(request) {
  const source = getClientFingerprintSource(request)
  const digest = await crypto.subtle.digest('SHA-256', jsonEncoder.encode(source))
  return bytesToHex(new Uint8Array(digest))
}

function getRetryAfterSeconds(until) {
  return Math.max(1, Math.ceil((until - Date.now()) / 1000))
}

function createLockResponse(lockedUntil) {
  return json(
    {
      error: 'TOO_MANY_ATTEMPTS',
      lockedUntil,
      retryAfterSeconds: getRetryAfterSeconds(lockedUntil)
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(getRetryAfterSeconds(lockedUntil))
      }
    }
  )
}

async function readAccessAttempt(env, clientKey) {
  return env.DB.prepare(`
    SELECT
      client_key AS clientKey,
      failure_count AS failureCount,
      first_failed_at AS firstFailedAt,
      last_failed_at AS lastFailedAt,
      locked_until AS lockedUntil
    FROM internal_access_attempts
    WHERE client_key = ?
  `).bind(clientKey).first()
}

async function clearAccessAttempt(env, clientKey) {
  await env.DB.prepare('DELETE FROM internal_access_attempts WHERE client_key = ?')
    .bind(clientKey)
    .run()
}

async function registerFailedAccessAttempt(env, clientKey, previousAttempt) {
  const now = Date.now()
  const previousFirst = Number(previousAttempt?.firstFailedAt || 0)
  const previousCount = Number(previousAttempt?.failureCount || 0)
  const withinWindow = previousFirst > 0 && now - previousFirst < ACCESS_FAILURE_WINDOW_MS

  const firstFailedAt = withinWindow ? previousFirst : now
  const failureCount = withinWindow ? previousCount + 1 : 1
  const lockedUntil = failureCount >= ACCESS_MAX_FAILURES ? now + ACCESS_LOCKOUT_MS : 0

  await env.DB.prepare(`
    INSERT INTO internal_access_attempts (
      client_key,
      failure_count,
      first_failed_at,
      last_failed_at,
      locked_until
    ) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(client_key) DO UPDATE SET
      failure_count = excluded.failure_count,
      first_failed_at = excluded.first_failed_at,
      last_failed_at = excluded.last_failed_at,
      locked_until = excluded.locked_until
  `).bind(clientKey, failureCount, firstFailedAt, now, lockedUntil).run()

  return {
    failureCount,
    firstFailedAt,
    lastFailedAt: now,
    lockedUntil
  }
}

function readBearerToken(request) {
  const header = request.headers.get('Authorization') || ''

  if (!header.startsWith('Bearer ')) {
    return ''
  }

  return header.slice('Bearer '.length).trim()
}

function mapDealRow(row) {
  return {
    id: row.id || '',
    brand: row.brand || '',
    service: row.service || '',
    progress: row.progress || '',
    remark: row.remark || '',
    category: row.category || '',
    referrer: row.referrer || '',
    owner: row.owner || '',
    updatedAt: row.updatedAt || '',
    muted: Number(row.muted) === 1,
    reportCooperationId: row.reportCooperationId || ''
  }
}

function parseJsonColumn(raw, fallback) {
  if (typeof raw !== 'string' || raw.trim() === '') {
    return fallback
  }

  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function mapReportRow(row) {
  return {
    id: row.id || '',
    title: row.title || '',
    articleTitle: row.articleTitle || '',
    project: row.project || '',
    author: row.author || '',
    period: row.period || '',
    publishedAt: row.publishedAt || '',
    platforms: parseJsonColumn(row.platformsJson, []),
    stats: parseJsonColumn(row.statsJson, {}),
    platformStats: parseJsonColumn(row.platformStatsJson, {}),
    authorSections: parseJsonColumn(row.authorSectionsJson, []),
    content: row.content || '',
    cooperationId: row.cooperationId || ''
  }
}

function emptyString(value) {
  return value == null ? '' : String(value)
}

function normalizeDealRecord(record) {
  return {
    id: emptyString(record?.id).trim(),
    brand: emptyString(record?.brand).trim(),
    service: emptyString(record?.service).trim(),
    progress: emptyString(record?.progress).trim(),
    remark: emptyString(record?.remark).trim(),
    category: emptyString(record?.category).trim(),
    referrer: emptyString(record?.referrer).trim(),
    owner: emptyString(record?.owner).trim(),
    updatedAt: emptyString(record?.updatedAt).trim(),
    muted: record?.muted === true,
    reportCooperationId: emptyString(record?.reportCooperationId).trim()
  }
}

function normalizeReportRecord(record) {
  return {
    id: emptyString(record?.id).trim(),
    title: emptyString(record?.title).trim(),
    articleTitle: emptyString(record?.articleTitle).trim(),
    project: emptyString(record?.project).trim(),
    author: emptyString(record?.author).trim(),
    period: emptyString(record?.period).trim(),
    publishedAt: emptyString(record?.publishedAt).trim(),
    cooperationId: emptyString(record?.cooperationId).trim(),
    platforms: Array.isArray(record?.platforms) ? record.platforms : [],
    stats: record?.stats && typeof record.stats === 'object' && !Array.isArray(record.stats) ? record.stats : {},
    platformStats: record?.platformStats && typeof record.platformStats === 'object' && !Array.isArray(record.platformStats) ? record.platformStats : {},
    authorSections: Array.isArray(record?.authorSections) ? record.authorSections : [],
    content: emptyString(record?.content)
  }
}

function validateDeals(records) {
  if (!Array.isArray(records)) {
    throw new Error('DEALS_PAYLOAD_MUST_BE_ARRAY')
  }

  const ids = new Set()
  return records.map((record) => {
    const next = normalizeDealRecord(record)

    if (!next.id || !next.brand || !next.service || !next.progress) {
      throw new Error('DEAL_REQUIRED_FIELDS_MISSING')
    }

    if (ids.has(next.id)) {
      throw new Error('DEAL_ID_DUPLICATED')
    }

    ids.add(next.id)
    return next
  })
}

function mapAnnualRow(row) {
  return {
    year: Number(row.year) || 0,
    partners: parseJsonColumn(row.partnersJson, []),
    summaryCards: parseJsonColumn(row.summaryCardsJson, []),
    highlights: parseJsonColumn(row.highlightsJson, []),
    intro: row.intro || '',
    updatedAt: row.updatedAt || ''
  }
}

function normalizeAnnualReportRecord(record) {
  const yearNumber = Number(record?.year)
  return {
    year: Number.isFinite(yearNumber) ? Math.trunc(yearNumber) : 0,
    partners: Array.isArray(record?.partners)
      ? record.partners.map((value) => emptyString(value).trim()).filter(Boolean)
      : [],
    summaryCards: Array.isArray(record?.summaryCards)
      ? record.summaryCards
          .filter((card) => card && typeof card === 'object')
          .map((card) => ({
            label: emptyString(card.label).trim(),
            value: emptyString(card.value).trim(),
            accent: emptyString(card.accent).trim()
          }))
          .filter((card) => card.label || card.value)
      : [],
    highlights: Array.isArray(record?.highlights)
      ? record.highlights.map((value) => emptyString(value).trim()).filter(Boolean)
      : [],
    intro: emptyString(record?.intro).trim(),
    updatedAt: emptyString(record?.updatedAt).trim()
  }
}

function validateAnnualReports(records) {
  if (!Array.isArray(records)) {
    throw new Error('ANNUAL_REPORTS_PAYLOAD_MUST_BE_ARRAY')
  }

  const years = new Set()
  return records.map((record) => {
    const next = normalizeAnnualReportRecord(record)

    if (!next.year || next.year < 2000 || next.year > 9999) {
      throw new Error('ANNUAL_REPORT_YEAR_INVALID')
    }

    if (years.has(next.year)) {
      throw new Error('ANNUAL_REPORT_YEAR_DUPLICATED')
    }

    years.add(next.year)
    return next
  })
}

function validateReports(records) {
  if (!Array.isArray(records)) {
    throw new Error('REPORTS_PAYLOAD_MUST_BE_ARRAY')
  }

  const ids = new Set()
  return records.map((record) => {
    const next = normalizeReportRecord(record)

    if (!next.id || !next.title || !next.project || !next.author || !next.content) {
      throw new Error('REPORT_REQUIRED_FIELDS_MISSING')
    }

    if (ids.has(next.id)) {
      throw new Error('REPORT_ID_DUPLICATED')
    }

    ids.add(next.id)
    return next
  })
}

async function requireSession(request, env) {
  const token = readBearerToken(request)
  const session = await verifySessionToken(token, env.INTERNAL_SESSION_SECRET)

  if (!session) {
    return null
  }

  return session
}

async function handleCreateSession(request, env) {
  const body = await request.json().catch(() => null)
  const credential = normalizeCredential(body?.credential)

  if (!credential) {
    return json({ error: 'EMPTY_CREDENTIAL' }, { status: 400 })
  }

  const clientKey = await createClientKey(request)
  const accessAttempt = await readAccessAttempt(env, clientKey)
  const lockedUntil = Number(accessAttempt?.lockedUntil || 0)

  if (lockedUntil > Date.now()) {
    return createLockResponse(lockedUntil)
  }

  if (credential !== normalizeCredential(env.INTERNAL_ACCESS_CREDENTIAL)) {
    const nextAttempt = await registerFailedAccessAttempt(env, clientKey, accessAttempt)

    if (nextAttempt.lockedUntil > Date.now()) {
      return createLockResponse(nextAttempt.lockedUntil)
    }

    return json({ error: 'INVALID_CREDENTIAL' }, { status: 401 })
  }

  await clearAccessAttempt(env, clientKey)

  const expiresAt = Date.now() + SESSION_TTL_MS
  const token = await signTokenPayload(
    {
      scope: 'internal-data',
      exp: expiresAt
    },
    env.INTERNAL_SESSION_SECRET
  )

  return json({ token, expiresAt })
}

async function handleDeals(request, env) {
  const session = await requireSession(request, env)

  if (!session) {
    return json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { results } = await env.DB.prepare(`
    SELECT
      id,
      brand,
      service,
      progress,
      remark,
      category,
      referrer,
      owner,
      updated_at AS updatedAt,
      muted,
      report_cooperation_id AS reportCooperationId
    FROM commercial_deals
    ORDER BY sort_order ASC, updated_at DESC, id ASC
  `).all()

  return json({
    deals: (results || []).map(mapDealRow),
    expiresAt: session.exp
  })
}

async function handleReports(request, env) {
  const session = await requireSession(request, env)

  if (!session) {
    return json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { results } = await env.DB.prepare(`
    SELECT
      id,
      title,
      article_title AS articleTitle,
      project,
      author,
      period,
      published_at AS publishedAt,
      platforms_json AS platformsJson,
      stats_json AS statsJson,
      platform_stats_json AS platformStatsJson,
      author_sections_json AS authorSectionsJson,
      content,
      cooperation_id AS cooperationId
    FROM promotion_reports
    ORDER BY sort_order ASC, published_at DESC, id DESC
  `).all()

  return json({
    reports: (results || []).map(mapReportRow),
    expiresAt: session.exp
  })
}

async function handleClientReport(request, env, reportId) {
  const body = await request.json().catch(() => null)
  const credential = normalizeCredential(body?.credential)

  if (!credential) {
    return json({ error: 'EMPTY_CREDENTIAL' }, { status: 400 })
  }

  const clientKey = await createClientKey(request)
  const accessAttempt = await readAccessAttempt(env, clientKey)
  const lockedUntil = Number(accessAttempt?.lockedUntil || 0)

  if (lockedUntil > Date.now()) {
    return createLockResponse(lockedUntil)
  }

  if (credential !== normalizeCredential(env.INTERNAL_ACCESS_CREDENTIAL)) {
    const nextAttempt = await registerFailedAccessAttempt(env, clientKey, accessAttempt)

    if (nextAttempt.lockedUntil > Date.now()) {
      return createLockResponse(nextAttempt.lockedUntil)
    }

    return json({ error: 'INVALID_CREDENTIAL' }, { status: 401 })
  }

  await clearAccessAttempt(env, clientKey)

  const row = await env.DB.prepare(`
    SELECT
      id,
      title,
      article_title AS articleTitle,
      project,
      author,
      period,
      published_at AS publishedAt,
      platforms_json AS platformsJson,
      stats_json AS statsJson,
      platform_stats_json AS platformStatsJson,
      author_sections_json AS authorSectionsJson,
      content,
      cooperation_id AS cooperationId
    FROM promotion_reports
    WHERE id = ?
    LIMIT 1
  `).bind(reportId).first()

  if (!row) {
    return json({ error: 'NOT_FOUND' }, { status: 404 })
  }

  return json({ report: mapReportRow(row) })
}

async function handleClientApi(request, env) {
  if (!env.DB) {
    return json({ error: 'D1_NOT_CONFIGURED' }, { status: 500 })
  }

  if (!env.INTERNAL_ACCESS_CREDENTIAL) {
    return json({ error: 'WORKER_SECRETS_MISSING' }, { status: 500 })
  }

  const url = new URL(request.url)
  const reportMatch = url.pathname.match(/^\/api\/client\/reports\/([^/]+)$/)

  if (request.method === 'POST' && reportMatch) {
    return handleClientReport(request, env, decodeURIComponent(reportMatch[1]))
  }

  return json({ error: 'NOT_FOUND' }, { status: 404 })
}

async function handleReportCoopIds(request, env) {
  const session = await requireSession(request, env)

  if (!session) {
    return json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { results } = await env.DB.prepare(`
    SELECT DISTINCT lower(trim(cooperation_id)) AS cooperationId
    FROM promotion_reports
    WHERE cooperation_id IS NOT NULL AND trim(cooperation_id) != ''
  `).all()

  return json({
    cooperationIds: (results || []).map((row) => row.cooperationId).filter(Boolean),
    expiresAt: session.exp
  })
}

async function handleHealth(_request, env) {
  const [dealsCount, reportsCount, annualCount] = await Promise.all([
    env.DB.prepare('SELECT COUNT(*) AS count FROM commercial_deals').first(),
    env.DB.prepare('SELECT COUNT(*) AS count FROM promotion_reports').first(),
    env.DB.prepare('SELECT COUNT(*) AS count FROM annual_reports').first()
  ])

  return json({
    ok: true,
    service: 'blogger-alliance-internal-api',
    database: 'blogger-alliance',
    authPolicy: {
      maxFailures: ACCESS_MAX_FAILURES,
      windowMinutes: ACCESS_FAILURE_WINDOW_MS / 60000,
      lockMinutes: ACCESS_LOCKOUT_MS / 60000
    },
    counts: {
      deals: Number(dealsCount?.count || 0),
      reports: Number(reportsCount?.count || 0),
      annualReports: Number(annualCount?.count || 0)
    },
    timestamp: new Date().toISOString()
  })
}

async function handlePublicAnnualReport(request, env) {
  const session = await requireSession(request, env)

  if (!session) {
    return json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const url = new URL(request.url)
  const yearParam = url.searchParams.get('year')
  const yearNumber = Number(yearParam)
  const sql = `
    SELECT
      year,
      partners_json AS partnersJson,
      summary_cards_json AS summaryCardsJson,
      highlights_json AS highlightsJson,
      intro,
      updated_at AS updatedAt
    FROM annual_reports
  `

  if (yearParam && Number.isFinite(yearNumber)) {
    const row = await env.DB.prepare(`${sql} WHERE year = ? LIMIT 1`).bind(Math.trunc(yearNumber)).first()
    if (!row) {
      return json({ error: 'NOT_FOUND' }, { status: 404 })
    }
    return json({ report: mapAnnualRow(row), expiresAt: session.exp })
  }

  const { results } = await env.DB.prepare(`${sql} ORDER BY year DESC`).all()
  return json({
    reports: (results || []).map(mapAnnualRow),
    expiresAt: session.exp
  })
}

async function handleAnnualReportsAdminList(request, env) {
  const session = await requireSession(request, env)

  if (!session) {
    return json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { results } = await env.DB.prepare(`
    SELECT
      year,
      partners_json AS partnersJson,
      summary_cards_json AS summaryCardsJson,
      highlights_json AS highlightsJson,
      intro,
      updated_at AS updatedAt
    FROM annual_reports
    ORDER BY year DESC
  `).all()

  return json({
    reports: (results || []).map(mapAnnualRow),
    expiresAt: session.exp
  })
}

async function replaceDeals(env, deals) {
  const statements = [env.DB.prepare('DELETE FROM commercial_deals')]

  deals.forEach((deal, index) => {
    statements.push(
      env.DB.prepare(`
        INSERT INTO commercial_deals (
          id,
          brand,
          service,
          progress,
          remark,
          category,
          referrer,
          owner,
          updated_at,
          muted,
          report_cooperation_id,
          sort_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        deal.id,
        deal.brand,
        deal.service,
        deal.progress,
        deal.remark,
        deal.category,
        deal.referrer,
        deal.owner,
        deal.updatedAt,
        deal.muted ? 1 : 0,
        deal.reportCooperationId,
        index
      )
    )
  })

  await env.DB.batch(statements)
}

async function replaceReports(env, reports) {
  const statements = [env.DB.prepare('DELETE FROM promotion_reports')]

  reports.forEach((report, index) => {
    statements.push(
      env.DB.prepare(`
        INSERT INTO promotion_reports (
          id,
          title,
          article_title,
          project,
          author,
          period,
          published_at,
          cooperation_id,
          platforms_json,
          stats_json,
          platform_stats_json,
          author_sections_json,
          content,
          sort_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        report.id,
        report.title,
        report.articleTitle,
        report.project,
        report.author,
        report.period,
        report.publishedAt,
        report.cooperationId,
        JSON.stringify(report.platforms),
        JSON.stringify(report.stats),
        JSON.stringify(report.platformStats),
        JSON.stringify(report.authorSections),
        report.content,
        index
      )
    )
  })

  await env.DB.batch(statements)
}

async function replaceAnnualReports(env, reports) {
  const statements = [env.DB.prepare('DELETE FROM annual_reports')]

  reports.forEach((report) => {
    statements.push(
      env.DB.prepare(`
        INSERT INTO annual_reports (
          year,
          partners_json,
          summary_cards_json,
          highlights_json,
          intro,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        report.year,
        JSON.stringify(report.partners),
        JSON.stringify(report.summaryCards),
        JSON.stringify(report.highlights),
        report.intro,
        report.updatedAt
      )
    )
  })

  await env.DB.batch(statements)
}

async function handleAdminAnnualReportsUpdate(request, env) {
  const session = await requireSession(request, env)

  if (!session) {
    return json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)

  try {
    const reports = validateAnnualReports(body?.reports)
    await replaceAnnualReports(env, reports)
    return json({ ok: true, count: reports.length, expiresAt: session.exp })
  } catch (error) {
    return json({ error: error.message || 'INVALID_ANNUAL_REPORTS_PAYLOAD' }, { status: 400 })
  }
}

async function handleAdminDealsUpdate(request, env) {
  const session = await requireSession(request, env)

  if (!session) {
    return json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)

  try {
    const deals = validateDeals(body?.deals)
    await replaceDeals(env, deals)
    return json({ ok: true, count: deals.length, expiresAt: session.exp })
  } catch (error) {
    return json({ error: error.message || 'INVALID_DEALS_PAYLOAD' }, { status: 400 })
  }
}

async function handleAdminReportsUpdate(request, env) {
  const session = await requireSession(request, env)

  if (!session) {
    return json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)

  try {
    const reports = validateReports(body?.reports)
    await replaceReports(env, reports)
    return json({ ok: true, count: reports.length, expiresAt: session.exp })
  } catch (error) {
    return json({ error: error.message || 'INVALID_REPORTS_PAYLOAD' }, { status: 400 })
  }
}

async function handleApi(request, env) {
  if (!env.DB) {
    return json({ error: 'D1_NOT_CONFIGURED' }, { status: 500 })
  }

  if (!env.INTERNAL_ACCESS_CREDENTIAL || !env.INTERNAL_SESSION_SECRET) {
    return json({ error: 'WORKER_SECRETS_MISSING' }, { status: 500 })
  }

  const url = new URL(request.url)

  if (request.method === 'GET' && url.pathname === '/api/internal/health') {
    return handleHealth(request, env)
  }

  if (request.method === 'POST' && url.pathname === '/api/internal/session') {
    return handleCreateSession(request, env)
  }

  if (request.method === 'GET' && url.pathname === '/api/internal/deals') {
    return handleDeals(request, env)
  }

  if (request.method === 'GET' && url.pathname === '/api/internal/reports') {
    return handleReports(request, env)
  }

  if (request.method === 'GET' && url.pathname === '/api/internal/reports/coop-ids') {
    return handleReportCoopIds(request, env)
  }

  if (request.method === 'PUT' && url.pathname === '/api/internal/admin/deals') {
    return handleAdminDealsUpdate(request, env)
  }

  if (request.method === 'PUT' && url.pathname === '/api/internal/admin/reports') {
    return handleAdminReportsUpdate(request, env)
  }

  if (request.method === 'GET' && url.pathname === '/api/internal/annual-reports') {
    return handleAnnualReportsAdminList(request, env)
  }

  if (request.method === 'PUT' && url.pathname === '/api/internal/admin/annual-reports') {
    return handleAdminAnnualReportsUpdate(request, env)
  }

  return json({ error: 'NOT_FOUND' }, { status: 404 })
}

async function handlePublic(request, env) {
  if (!env.DB) {
    return json({ error: 'D1_NOT_CONFIGURED' }, { status: 500 })
  }

  if (!env.INTERNAL_SESSION_SECRET) {
    return json({ error: 'WORKER_SECRETS_MISSING' }, { status: 500 })
  }

  const url = new URL(request.url)

  if (request.method === 'GET' && url.pathname === '/api/public/annual-report') {
    return handlePublicAnnualReport(request, env)
  }

  return json({ error: 'NOT_FOUND' }, { status: 404 })
}

function isWebLlmRoute(pathname) {
  return pathname === '/workspace/web-llm' || pathname.startsWith('/workspace/web-llm/')
}

function withWebLlmIsolation(response) {
  const headers = new Headers(response.headers)
  headers.set('Cross-Origin-Embedder-Policy', 'credentialless')
  headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  })
}

async function handleAssets(request, env) {
  if (!env.ASSETS) {
    return new Response('ASSETS binding not configured', { status: 500 })
  }

  const response = await env.ASSETS.fetch(request)
  const url = new URL(request.url)
  const acceptsHtml = (request.headers.get('Accept') || '').includes('text/html')

  /** 少数情况下资产层会对深链返回 30x 到站点根路径，打断 SPA；改为回退 index.html */
  if (
    request.method === 'GET' &&
    acceptsHtml &&
    response.status >= 300 &&
    response.status < 400
  ) {
    const loc = response.headers.get('Location')
    if (loc) {
      try {
        const locUrl = new URL(loc, url)
        const path = locUrl.pathname.replace(/\/$/, '') || '/'
        if ((path === '' || path === '/') && url.pathname !== '/' && url.pathname !== '/index.html') {
          const indexUrl = new URL('/index.html', url)
          const fallback = await env.ASSETS.fetch(new Request(indexUrl.toString(), request))
          if (isWebLlmRoute(url.pathname)) {
            return withWebLlmIsolation(fallback)
          }
          return fallback
        }
      } catch {
        /* ignore malformed Location */
      }
    }
  }

  if (response.status !== 404 || request.method !== 'GET' || !acceptsHtml) {
    if (acceptsHtml && isWebLlmRoute(url.pathname)) {
      return withWebLlmIsolation(response)
    }
    return response
  }

  const indexUrl = new URL('/index.html', url)
  const fallback = await env.ASSETS.fetch(new Request(indexUrl.toString(), request))
  if (isWebLlmRoute(url.pathname)) {
    return withWebLlmIsolation(fallback)
  }
  return fallback
}

const CLOUDCOST_HOST = 'cloudcost.blogger-alliance.cn'

function normalizeSiteRequest(request) {
  const url = new URL(request.url)

  if (url.hostname === CLOUDCOST_HOST || url.hostname === `www.${CLOUDCOST_HOST}`) {
    if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/cloudcost'
      return new Request(url.toString(), request)
    }
  }

  return request
}

export default {
  async fetch(request, env) {
    request = normalizeSiteRequest(request)
    const url = new URL(request.url)

    if (url.pathname.startsWith('/api/internal/')) {
      return handleApi(request, env)
    }

    if (url.pathname.startsWith('/api/public/')) {
      return handlePublic(request, env)
    }

    if (url.pathname.startsWith('/api/client/')) {
      return handleClientApi(request, env)
    }

    return handleAssets(request, env)
  }
}
