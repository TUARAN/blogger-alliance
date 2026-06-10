import { AUTH_COPY } from './authMessages.js'

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

export async function fetchCommercialDeals(token) {
  const payload = await apiRequest('/api/internal/deals', { token })
  return Array.isArray(payload?.deals) ? payload.deals : []
}

export async function fetchPromotionReports(token) {
  const payload = await apiRequest('/api/internal/reports', { token })
  return Array.isArray(payload?.reports) ? payload.reports : []
}

export async function fetchSinglePromotionReport(reportId, token) {
  const payload = await apiRequest(`/api/client/reports/${encodeURIComponent(reportId)}`, { token })
  return payload?.report || null
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

export async function fetchPublicAnnualReport(year, token) {
  const path = year ? `/api/public/annual-report?year=${encodeURIComponent(year)}` : '/api/public/annual-report'
  const payload = await apiRequest(path, { token })
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

  if (code === 'FORBIDDEN') {
    return AUTH_COPY.internalAccessDeniedBody
  }

  if (code === 'UNAUTHORIZED') {
    return AUTH_COPY.sessionExpired
  }

  if (code === 'SUPABASE_NOT_CONFIGURED') {
    return '数据服务暂不可用，请稍后再试或联系管理员。'
  }

  if (code === 'D1_NOT_CONFIGURED') {
    return '数据服务尚未就绪，请稍后再试。'
  }

  if (code.startsWith('REQUEST_FAILED_5')) {
    return context === 'admin'
      ? '保存失败，服务器暂时无法写入数据，请稍后重试。'
      : '加载失败，服务器暂时无法读取数据，请稍后重试。'
  }

  if (code.startsWith('REQUEST_FAILED_4')) {
    return context === 'admin'
      ? '你没有权限执行此操作。如需编辑数据，请联系管理员开通管理员权限。'
      : '你没有权限查看这部分内容。'
  }

  if (error instanceof TypeError) {
    return '网络连接失败，请检查网络后重试。'
  }

  return context === 'admin'
    ? '操作失败，请稍后重试。'
    : '加载失败，请稍后重试。'
}
