import { normalizeCredential } from './credentialNormalize'

export const INTERNAL_DEALS_CACHE_KEY = 'blogger-alliance:deals-cache'
export const INTERNAL_REPORTS_CACHE_KEY = 'blogger-alliance:reports-cache'
export const INTERNAL_ACCESS_SESSION_KEY = 'blogger-alliance:deals-reports-access-session'

/** 合作进度查询与数据报告查询共用访问会话时长 */
export const INTERNAL_ACCESS_CACHE_DURATION_MS = 30 * 60 * 1000

export function saveInternalAccessSession(sessionToken) {
  const normalized = normalizeCredential(sessionToken)

  if (!normalized) {
    return
  }

  localStorage.setItem(INTERNAL_ACCESS_SESSION_KEY, JSON.stringify({
    expiresAt: Date.now() + INTERNAL_ACCESS_CACHE_DURATION_MS,
    sessionToken: normalized
  }))
}

export function readInternalAccessSession() {
  const raw = localStorage.getItem(INTERNAL_ACCESS_SESSION_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)

    if (!parsed?.expiresAt || typeof parsed.sessionToken !== 'string') {
      clearInternalAccessSession()
      return null
    }

    const normalized = normalizeCredential(parsed.sessionToken)

    if (!normalized) {
      clearInternalAccessSession()
      return null
    }

    if (parsed.expiresAt <= Date.now()) {
      clearInternalAccessSession()
      return null
    }

    return normalized
  } catch {
    clearInternalAccessSession()
    return null
  }
}

export function clearInternalAccessSession() {
  localStorage.removeItem(INTERNAL_ACCESS_SESSION_KEY)
}

/** 在「锁定」时任一内部数据页调用：清空两页本地缓存与访问会话 */
export function clearInternalAccessCaches() {
  localStorage.removeItem(INTERNAL_DEALS_CACHE_KEY)
  localStorage.removeItem(INTERNAL_REPORTS_CACHE_KEY)
  clearInternalAccessSession()
}
