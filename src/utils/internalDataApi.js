function buildHeaders(token, hasJsonBody = false) {
  const headers = {}

  if (hasJsonBody) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

async function readJsonResponse(response) {
  let payload = null

  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const message = payload?.error || `REQUEST_FAILED_${response.status}`
    const error = new Error(message)
    error.status = response.status
    error.payload = payload
    throw error
  }

  return payload
}

async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const hasJsonBody = body !== undefined
  const response = await fetch(path, {
    method,
    headers: buildHeaders(token, hasJsonBody),
    body: hasJsonBody ? JSON.stringify(body) : undefined
  })

  return readJsonResponse(response)
}

export async function createInternalDataSession(credential) {
  return apiRequest('/api/internal/session', {
    method: 'POST',
    body: { credential }
  })
}

export async function fetchCommercialDeals(token) {
  const payload = await apiRequest('/api/internal/deals', { token })
  return Array.isArray(payload?.deals) ? payload.deals : []
}

export async function fetchPromotionReports(token) {
  const payload = await apiRequest('/api/internal/reports', { token })
  return Array.isArray(payload?.reports) ? payload.reports : []
}

export async function fetchReportCooperationIds(token) {
  const payload = await apiRequest('/api/internal/reports/coop-ids', { token })
  return Array.isArray(payload?.cooperationIds) ? payload.cooperationIds : []
}

export async function fetchInternalHealth() {
  return apiRequest('/api/internal/health')
}

export async function updateCommercialDeals(token, deals) {
  return apiRequest('/api/internal/admin/deals', {
    method: 'PUT',
    token,
    body: { deals }
  })
}

export async function updatePromotionReports(token, reports) {
  return apiRequest('/api/internal/admin/reports', {
    method: 'PUT',
    token,
    body: { reports }
  })
}

export async function fetchPublicAnnualReport(year) {
  const path = year ? `/api/public/annual-report?year=${encodeURIComponent(year)}` : '/api/public/annual-report'
  const payload = await apiRequest(path)
  if (year) {
    return payload?.report || null
  }
  return Array.isArray(payload?.reports) ? payload.reports : []
}

export async function fetchAnnualReportsAdmin(token) {
  const payload = await apiRequest('/api/internal/annual-reports', { token })
  return Array.isArray(payload?.reports) ? payload.reports : []
}

export async function updateAnnualReports(token, reports) {
  return apiRequest('/api/internal/admin/annual-reports', {
    method: 'PUT',
    token,
    body: { reports }
  })
}

export function explainInternalDataError(error, context = 'read') {
  const code = error?.message || ''

  if (code === 'INVALID_CREDENTIAL' || code === 'EMPTY_CREDENTIAL') {
    return '访问密码错误，请重新输入。'
  }

  if (code === 'UNAUTHORIZED') {
    return '访问会话已失效，请重新输入密码。'
  }

  if (code === 'TOO_MANY_ATTEMPTS') {
    const retryAfterSeconds = Number(error?.payload?.retryAfterSeconds || 0)
    const retryAfterMinutes = retryAfterSeconds > 0 ? Math.ceil(retryAfterSeconds / 60) : 15
    return `输入错误次数过多，已临时锁定，请约 ${retryAfterMinutes} 分钟后再试。`
  }

  if (code === 'D1_NOT_CONFIGURED') {
    return '服务端未绑定 D1 数据库。'
  }

  if (code === 'WORKER_SECRETS_MISSING') {
    return '服务端缺少访问密码或会话密钥配置。'
  }

  if (code.startsWith('REQUEST_FAILED_5')) {
    return context === 'admin'
      ? '服务端读取或写入 D1 失败，请稍后重试。'
      : '服务端读取 D1 失败，请稍后重试。'
  }

  if (code.startsWith('REQUEST_FAILED_4')) {
    return context === 'admin'
      ? '请求被服务端拒绝，请重新输入密码后再试。'
      : '请求失败，请重新输入密码后再试。'
  }

  if (error instanceof TypeError) {
    return '网络连接失败，请确认当前站点可以访问 Worker API。'
  }

  return context === 'admin'
    ? '后台连接失败，请检查服务端状态后重试。'
    : '读取数据失败，请检查服务端状态后重试。'
}
