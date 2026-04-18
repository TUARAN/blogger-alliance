import { normalizeCredential } from './credentialNormalize'

export const DEALS_CACHE_KEY = 'blogger-alliance:deals-cache'
export const REPORTS_CACHE_KEY = 'blogger-alliance:reports-cache'
export const SECURE_UNLOCK_SESSION_KEY = 'blogger-alliance:deals-reports-unlock-session'

/** 合作进度查询与数据报告查询共用免密时长 */
export const SECURE_DATA_CACHE_DURATION_MS = 30 * 60 * 1000

export function saveSecureUnlockSession(sessionToken) {
  const normalized = normalizeCredential(sessionToken)

  if (!normalized) {
    return
  }

  localStorage.setItem(SECURE_UNLOCK_SESSION_KEY, JSON.stringify({
    expiresAt: Date.now() + SECURE_DATA_CACHE_DURATION_MS,
    sessionToken: normalized
  }))
}

export function readSecureUnlockSession() {
  const raw = localStorage.getItem(SECURE_UNLOCK_SESSION_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)

    if (!parsed?.expiresAt || typeof parsed.sessionToken !== 'string') {
      clearSecureUnlockSession()
      return null
    }

    const normalized = normalizeCredential(parsed.sessionToken)

    if (!normalized) {
      clearSecureUnlockSession()
      return null
    }

    if (parsed.expiresAt <= Date.now()) {
      clearSecureUnlockSession()
      return null
    }

    return normalized
  } catch {
    clearSecureUnlockSession()
    return null
  }
}

export function clearSecureUnlockSession() {
  localStorage.removeItem(SECURE_UNLOCK_SESSION_KEY)
}

/** 在「锁定」时任一加密页调用：清空两页本地缓存与会话凭证 */
export function clearAllEncryptedInternalCaches() {
  localStorage.removeItem(DEALS_CACHE_KEY)
  localStorage.removeItem(REPORTS_CACHE_KEY)
  clearSecureUnlockSession()
}
