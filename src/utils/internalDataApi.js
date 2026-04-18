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
