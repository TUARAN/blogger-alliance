const SESSION_TTL_MS = 30 * 60 * 1000
const jsonEncoder = new TextEncoder()

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
    payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadBase64)))
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

  if (credential !== normalizeCredential(env.INTERNAL_ACCESS_CREDENTIAL)) {
    return json({ error: 'INVALID_CREDENTIAL' }, { status: 401 })
  }

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

async function handleApi(request, env) {
  if (!env.DB) {
    return json({ error: 'D1_NOT_CONFIGURED' }, { status: 500 })
  }

  if (!env.INTERNAL_ACCESS_CREDENTIAL || !env.INTERNAL_SESSION_SECRET) {
    return json({ error: 'WORKER_SECRETS_MISSING' }, { status: 500 })
  }

  const url = new URL(request.url)

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

  return json({ error: 'NOT_FOUND' }, { status: 404 })
}

async function handleAssets(request, env) {
  if (!env.ASSETS) {
    return new Response('ASSETS binding not configured', { status: 500 })
  }

  const response = await env.ASSETS.fetch(request)
  const url = new URL(request.url)
  const acceptsHtml = (request.headers.get('Accept') || '').includes('text/html')

  if (response.status !== 404 || request.method !== 'GET' || !acceptsHtml) {
    return response
  }

  const indexUrl = new URL('/index.html', url)
  return env.ASSETS.fetch(new Request(indexUrl.toString(), request))
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/api/internal/')) {
      return handleApi(request, env)
    }

    return handleAssets(request, env)
  }
}
