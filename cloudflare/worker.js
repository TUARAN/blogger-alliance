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

function readBearerToken(request) {
  const header = request.headers.get('Authorization') || ''

  if (!header.startsWith('Bearer ')) {
    return ''
  }

  return header.slice('Bearer '.length).trim()
}

const ROLE_RANK = {
  member: 0,
  internal: 1,
  admin: 2
}

function hasMinimumRole(role, minimumRole) {
  return (ROLE_RANK[role] ?? 0) >= (ROLE_RANK[minimumRole] ?? 0)
}

function missingSupabaseConfig(env) {
  return !env.SUPABASE_URL || !env.SUPABASE_ANON_KEY
}

function missingSupabaseDataConfig(env) {
  return missingSupabaseConfig(env) || !env.SUPABASE_SERVICE_ROLE_KEY
}

function getSupabaseBaseUrl(env) {
  return String(env.SUPABASE_URL || '').replace(/\/$/, '')
}

function getSupabaseRestUrl(env, path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getSupabaseBaseUrl(env)}/rest/v1${normalizedPath}`
}

function getSupabaseDataHeaders(env, { hasBody = false, prefer = '' } = {}) {
  return {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    Accept: 'application/json',
    ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
    ...(prefer ? { Prefer: prefer } : {})
  }
}

async function supabaseDataRequest(env, path, { method = 'GET', body, prefer } = {}) {
  if (missingSupabaseDataConfig(env)) {
    const error = new Error('SUPABASE_SERVICE_ROLE_NOT_CONFIGURED')
    error.status = 500
    throw error
  }

  const response = await fetch(getSupabaseRestUrl(env, path), {
    method,
    headers: getSupabaseDataHeaders(env, {
      hasBody: body !== undefined,
      prefer
    }),
    body: body === undefined ? undefined : JSON.stringify(body)
  })

  const text = await response.text()
  const payload = text ? JSON.parse(text) : null

  if (!response.ok) {
    const error = new Error(payload?.code || payload?.message || payload?.error || `SUPABASE_REQUEST_FAILED_${response.status}`)
    error.status = response.status
    error.payload = payload
    throw error
  }

  return payload
}

function dataErrorResponse(error) {
  if (error?.message === 'SUPABASE_SERVICE_ROLE_NOT_CONFIGURED') {
    return json({ error: error.message }, { status: 500 })
  }

  if (error?.message === '42501' || error?.status === 401) {
    return json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  if (error?.status === 403) {
    return json({ error: 'FORBIDDEN' }, { status: 403 })
  }

  return json(
    {
      error: 'SUPABASE_DATA_REQUEST_FAILED',
      detail: error?.message || 'UNKNOWN_ERROR'
    },
    { status: 500 }
  )
}

async function verifySupabaseAccess(request, env, minimumRole = 'internal') {
  const token = readBearerToken(request)

  if (!token || missingSupabaseConfig(env)) {
    return { ok: false, status: 401, error: 'UNAUTHORIZED' }
  }

  const userResponse = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: env.SUPABASE_ANON_KEY
    }
  })

  if (!userResponse.ok) {
    return { ok: false, status: 401, error: 'UNAUTHORIZED' }
  }

  const user = await userResponse.json()
  const profileResponse = await fetch(
    `${env.SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}&select=role`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: env.SUPABASE_ANON_KEY,
        Accept: 'application/json'
      }
    }
  )

  if (!profileResponse.ok) {
    return { ok: false, status: 401, error: 'UNAUTHORIZED' }
  }

  const profiles = await profileResponse.json()
  const role = profiles[0]?.role || 'member'

  if (!hasMinimumRole(role, minimumRole)) {
    return { ok: false, status: 403, error: 'FORBIDDEN' }
  }

  return {
    ok: true,
    user,
    role,
    token
  }
}

async function requireSupabaseAccess(request, env, minimumRole = 'internal') {
  const access = await verifySupabaseAccess(request, env, minimumRole)

  if (!access.ok) {
    return json({ error: access.error }, { status: access.status })
  }

  return access
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
    updatedAt: row.updatedAt || row.updated_at || '',
    muted: row.muted === true || Number(row.muted) === 1,
    reportCooperationId: row.reportCooperationId || row.report_cooperation_id || ''
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
    articleTitle: row.articleTitle || row.article_title || '',
    project: row.project || '',
    author: row.author || '',
    period: row.period || '',
    publishedAt: row.publishedAt || row.published_at || '',
    platforms: Array.isArray(row.platforms) ? row.platforms : parseJsonColumn(row.platformsJson, []),
    stats: row.stats && typeof row.stats === 'object' && !Array.isArray(row.stats) ? row.stats : parseJsonColumn(row.statsJson, {}),
    platformStats: row.platform_stats && typeof row.platform_stats === 'object' && !Array.isArray(row.platform_stats) ? row.platform_stats : parseJsonColumn(row.platformStatsJson, {}),
    authorSections: Array.isArray(row.author_sections) ? row.author_sections : parseJsonColumn(row.authorSectionsJson, []),
    content: row.content || '',
    cooperationId: row.cooperationId || row.cooperation_id || ''
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
    partners: Array.isArray(row.partners) ? row.partners : parseJsonColumn(row.partnersJson, []),
    summaryCards: Array.isArray(row.summary_cards) ? row.summary_cards : parseJsonColumn(row.summaryCardsJson, []),
    highlights: Array.isArray(row.highlights) ? row.highlights : parseJsonColumn(row.highlightsJson, []),
    intro: row.intro || '',
    updatedAt: row.updatedAt || row.updated_at || ''
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

async function requireSession(request, env, minimumRole = 'internal') {
  return verifySupabaseAccess(request, env, minimumRole)
}

function authFailureResponse(access) {
  return json(
    { error: access?.error || 'UNAUTHORIZED' },
    { status: access?.status || 401 }
  )
}

async function handleDeals(request, env) {
  const session = await requireSession(request, env, 'internal')

  if (!session.ok) {
    return authFailureResponse(session)
  }

  const rows = await supabaseDataRequest(
    env,
    '/commercial_deals?select=id,brand,service,progress,remark,category,referrer,owner,updated_at,muted,report_cooperation_id&order=sort_order.asc,updated_at.desc,id.asc'
  )

  return json({
    deals: (rows || []).map(mapDealRow)
  })
}

async function handleReports(request, env) {
  const session = await requireSession(request, env, 'internal')

  if (!session.ok) {
    return authFailureResponse(session)
  }

  const rows = await supabaseDataRequest(
    env,
    '/promotion_reports?select=id,title,article_title,project,author,period,published_at,platforms,stats,platform_stats,author_sections,content,cooperation_id&order=sort_order.asc,published_at.desc,id.desc'
  )

  return json({
    reports: (rows || []).map(mapReportRow)
  })
}

async function handleClientReport(request, env, reportId) {
  const session = await requireSession(request, env, 'internal')

  if (!session.ok) {
    return authFailureResponse(session)
  }

  const rows = await supabaseDataRequest(
    env,
    `/promotion_reports?select=id,title,article_title,project,author,period,published_at,platforms,stats,platform_stats,author_sections,content,cooperation_id&id=eq.${encodeURIComponent(reportId)}&limit=1`
  )
  const row = rows?.[0]

  if (!row) {
    return json({ error: 'NOT_FOUND' }, { status: 404 })
  }

  return json({ report: mapReportRow(row) })
}

async function handleClientApi(request, env) {
  if (missingSupabaseDataConfig(env)) {
    return json({ error: 'SUPABASE_NOT_CONFIGURED' }, { status: 500 })
  }

  const url = new URL(request.url)
  const reportMatch = url.pathname.match(/^\/api\/client\/reports\/([^/]+)$/)

  if (request.method === 'GET' && reportMatch) {
    try {
      return await handleClientReport(request, env, decodeURIComponent(reportMatch[1]))
    } catch (error) {
      return dataErrorResponse(error)
    }
  }

  return json({ error: 'NOT_FOUND' }, { status: 404 })
}

async function handleReportCoopIds(request, env) {
  const session = await requireSession(request, env, 'internal')

  if (!session.ok) {
    return authFailureResponse(session)
  }

  const rows = await supabaseDataRequest(
    env,
    '/promotion_reports?select=cooperation_id'
  )
  const cooperationIds = Array.from(new Set(
    (rows || [])
      .map((row) => String(row.cooperation_id || '').trim().toLowerCase())
      .filter(Boolean)
  ))

  return json({
    cooperationIds
  })
}

async function handleHealth(_request, env) {
  const counts = await supabaseDataRequest(env, '/rpc/get_internal_data_counts', {
    method: 'POST',
    body: {}
  })

  return json({
    ok: true,
    service: 'blogger-alliance-internal-api',
    database: 'supabase',
    authPolicy: {
      provider: 'supabase',
      roles: ['member', 'internal', 'admin']
    },
    counts: {
      deals: Number(counts?.deals || 0),
      reports: Number(counts?.reports || 0),
      annualReports: Number(counts?.annualReports || 0)
    },
    timestamp: new Date().toISOString()
  })
}

async function handlePublicAnnualReport(request, env) {
  const session = await requireSession(request, env, 'internal')

  if (!session.ok) {
    return authFailureResponse(session)
  }

  const url = new URL(request.url)
  const yearParam = url.searchParams.get('year')
  const yearNumber = Number(yearParam)
  if (yearParam && Number.isFinite(yearNumber)) {
    const rows = await supabaseDataRequest(
      env,
      `/annual_reports?select=year,partners,summary_cards,highlights,intro,updated_at&year=eq.${Math.trunc(yearNumber)}&limit=1`
    )
    const row = rows?.[0]
    if (!row) {
      return json({ error: 'NOT_FOUND' }, { status: 404 })
    }
    return json({ report: mapAnnualRow(row) })
  }

  const rows = await supabaseDataRequest(
    env,
    '/annual_reports?select=year,partners,summary_cards,highlights,intro,updated_at&order=year.desc'
  )
  return json({
    reports: (rows || []).map(mapAnnualRow)
  })
}

async function handleAnnualReportsAdminList(request, env) {
  const session = await requireSession(request, env, 'internal')

  if (!session.ok) {
    return authFailureResponse(session)
  }

  const rows = await supabaseDataRequest(
    env,
    '/annual_reports?select=year,partners,summary_cards,highlights,intro,updated_at&order=year.desc'
  )

  return json({
    reports: (rows || []).map(mapAnnualRow)
  })
}

async function replaceDeals(env, deals) {
  return supabaseDataRequest(env, '/rpc/replace_commercial_deals', {
    method: 'POST',
    body: { records: deals }
  })
}

async function replaceReports(env, reports) {
  return supabaseDataRequest(env, '/rpc/replace_promotion_reports', {
    method: 'POST',
    body: { records: reports }
  })
}

async function replaceAnnualReports(env, reports) {
  return supabaseDataRequest(env, '/rpc/replace_annual_reports', {
    method: 'POST',
    body: { records: reports }
  })
}

async function handleAdminAnnualReportsUpdate(request, env) {
  const session = await requireSession(request, env, 'admin')

  if (!session.ok) {
    return authFailureResponse(session)
  }

  const body = await request.json().catch(() => null)

  try {
    const reports = validateAnnualReports(body?.reports)
    const count = await replaceAnnualReports(env, reports)
    return json({ ok: true, count: Number(count || reports.length) })
  } catch (error) {
    if (error.status) return dataErrorResponse(error)
    return json({ error: error.message || 'INVALID_ANNUAL_REPORTS_PAYLOAD' }, { status: 400 })
  }
}

async function handleAdminDealsUpdate(request, env) {
  const session = await requireSession(request, env, 'admin')

  if (!session.ok) {
    return authFailureResponse(session)
  }

  const body = await request.json().catch(() => null)

  try {
    const deals = validateDeals(body?.deals)
    const count = await replaceDeals(env, deals)
    return json({ ok: true, count: Number(count || deals.length) })
  } catch (error) {
    if (error.status) return dataErrorResponse(error)
    return json({ error: error.message || 'INVALID_DEALS_PAYLOAD' }, { status: 400 })
  }
}

async function handleAdminReportsUpdate(request, env) {
  const session = await requireSession(request, env, 'admin')

  if (!session.ok) {
    return authFailureResponse(session)
  }

  const body = await request.json().catch(() => null)

  try {
    const reports = validateReports(body?.reports)
    const count = await replaceReports(env, reports)
    return json({ ok: true, count: Number(count || reports.length) })
  } catch (error) {
    if (error.status) return dataErrorResponse(error)
    return json({ error: error.message || 'INVALID_REPORTS_PAYLOAD' }, { status: 400 })
  }
}

const ASSIGNABLE_ROLES = ['member', 'internal', 'admin']

async function handleAdminUsersList(request, env) {
  const session = await requireSession(request, env, 'admin')

  if (!session.ok) {
    return authFailureResponse(session)
  }

  const rows = await supabaseDataRequest(
    env,
    '/profiles?select=id,email,display_name,avatar_url,role,created_at,updated_at&order=created_at.desc'
  )

  return json({
    users: (rows || []).map((row) => ({
      id: row.id || '',
      email: row.email || '',
      displayName: row.display_name || '',
      avatarUrl: row.avatar_url || '',
      role: row.role || 'member',
      createdAt: row.created_at || '',
      updatedAt: row.updated_at || ''
    }))
  })
}

async function handleAdminUserRoleUpdate(request, env, userId) {
  const session = await requireSession(request, env, 'admin')

  if (!session.ok) {
    return authFailureResponse(session)
  }

  // 禁止管理员修改自己的角色，避免误操作把自己降权锁死
  if (session.user?.id === userId) {
    return json({ error: 'CANNOT_CHANGE_OWN_ROLE' }, { status: 400 })
  }

  const body = await request.json().catch(() => null)
  const role = String(body?.role || '').trim()

  if (!ASSIGNABLE_ROLES.includes(role)) {
    return json({ error: 'INVALID_ROLE' }, { status: 400 })
  }

  try {
    const rows = await supabaseDataRequest(
      env,
      `/profiles?id=eq.${encodeURIComponent(userId)}&select=id,email,display_name,role,updated_at`,
      {
        method: 'PATCH',
        body: { role, updated_at: new Date().toISOString() },
        prefer: 'return=representation'
      }
    )

    if (!rows?.length) {
      return json({ error: 'NOT_FOUND' }, { status: 404 })
    }

    return json({ ok: true, user: rows[0] })
  } catch (error) {
    return dataErrorResponse(error)
  }
}

async function handleApi(request, env) {
  if (missingSupabaseDataConfig(env)) {
    return json({ error: 'SUPABASE_NOT_CONFIGURED' }, { status: 500 })
  }

  const url = new URL(request.url)

  if (request.method === 'GET' && url.pathname === '/api/internal/health') {
    try {
      return await handleHealth(request, env)
    } catch (error) {
      return dataErrorResponse(error)
    }
  }

  if (request.method === 'GET' && url.pathname === '/api/internal/deals') {
    try {
      return await handleDeals(request, env)
    } catch (error) {
      return dataErrorResponse(error)
    }
  }

  if (request.method === 'GET' && url.pathname === '/api/internal/reports') {
    try {
      return await handleReports(request, env)
    } catch (error) {
      return dataErrorResponse(error)
    }
  }

  if (request.method === 'GET' && url.pathname === '/api/internal/reports/coop-ids') {
    try {
      return await handleReportCoopIds(request, env)
    } catch (error) {
      return dataErrorResponse(error)
    }
  }

  if (request.method === 'PUT' && url.pathname === '/api/internal/admin/deals') {
    return handleAdminDealsUpdate(request, env)
  }

  if (request.method === 'PUT' && url.pathname === '/api/internal/admin/reports') {
    return handleAdminReportsUpdate(request, env)
  }

  if (request.method === 'GET' && url.pathname === '/api/internal/annual-reports') {
    try {
      return await handleAnnualReportsAdminList(request, env)
    } catch (error) {
      return dataErrorResponse(error)
    }
  }

  if (request.method === 'PUT' && url.pathname === '/api/internal/admin/annual-reports') {
    return handleAdminAnnualReportsUpdate(request, env)
  }

  if (request.method === 'GET' && url.pathname === '/api/internal/admin/users') {
    try {
      return await handleAdminUsersList(request, env)
    } catch (error) {
      return dataErrorResponse(error)
    }
  }

  const userRoleMatch = url.pathname.match(/^\/api\/internal\/admin\/users\/([^/]+)\/role$/)

  if (request.method === 'PUT' && userRoleMatch) {
    return handleAdminUserRoleUpdate(request, env, decodeURIComponent(userRoleMatch[1]))
  }

  return json({ error: 'NOT_FOUND' }, { status: 404 })
}

async function handlePublic(request, env) {
  const url = new URL(request.url)

  if (request.method === 'GET' && url.pathname === '/api/public/auth-config') {
    if (missingSupabaseConfig(env)) {
      return json({ error: 'SUPABASE_NOT_CONFIGURED' }, { status: 503 })
    }

    return json(
      {
        supabaseUrl: env.SUPABASE_URL,
        supabaseAnonKey: env.SUPABASE_ANON_KEY
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=300'
        }
      }
    )
  }

  if (missingSupabaseDataConfig(env)) {
    return json({ error: 'SUPABASE_NOT_CONFIGURED' }, { status: 500 })
  }

  if (request.method === 'GET' && url.pathname === '/api/public/annual-report') {
    try {
      return await handlePublicAnnualReport(request, env)
    } catch (error) {
      return dataErrorResponse(error)
    }
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
