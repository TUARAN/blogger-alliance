import { getSupabaseUrl } from '../lib/supabase.js'

/**
 * 浏览器在 fetch 失败（DNS / TLS / 代理隧道断 / CORS preflight 失败）时
 * 抛出的 TypeError，messsage 在各家浏览器形态不同。
 * Chrome / Edge: "Failed to fetch"
 * Firefox: "NetworkError when attempting to fetch resource."
 * Safari: "Load failed" / "The Internet connection appears to be offline."
 * supabase-js 在自身重试用尽后会包装成 AuthRetryableFetchError。
 */
const NETWORK_ERROR_HINTS = [
  'failed to fetch',
  'load failed',
  'networkerror when attempting',
  'network request failed',
  'fetch failed',
  'the internet connection appears to be offline'
]

export function isLikelyNetworkError(error) {
  if (!error) {
    return false
  }

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return true
  }

  const name = error.name || error.constructor?.name
  if (name === 'AuthRetryableFetchError') {
    return true
  }

  if (name === 'TypeError') {
    const msg = String(error.message || '').toLowerCase()
    return NETWORK_ERROR_HINTS.some((hint) => msg.includes(hint))
  }

  const msg = String(error.message || '').toLowerCase()
  return NETWORK_ERROR_HINTS.some((hint) => msg.includes(hint))
}

/**
 * 主动探测账号服务是否可达。
 * 使用 no-cors 模式，只要能在 timeout 内完成 fetch（即便是 opaque 响应）就视为可达。
 * 返回：{ ok: true } 或 { ok: false, reason: 'offline'|'timeout'|'blocked'|'misconfigured' }
 */
export async function probeSupabaseReachable({ timeout = 5000 } = {}) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return { ok: false, reason: 'offline' }
  }

  const url = getSupabaseUrl()
  if (!url) {
    return { ok: false, reason: 'misconfigured' }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    await fetch(`${url}/auth/v1/health`, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal
    })
    return { ok: true }
  } catch (err) {
    if (err?.name === 'AbortError') {
      return { ok: false, reason: 'timeout' }
    }
    return { ok: false, reason: 'blocked' }
  } finally {
    clearTimeout(timer)
  }
}

export const NETWORK_ERROR_COPY = {
  offline: '当前似乎没有网络连接，请检查网络后重试。',
  timeout:
    '账号服务连接超时（5 秒内未响应）。可能是网络/代理较慢或节点不稳定，请稍后重试。',
  blocked:
    '无法连接账号服务（supabase.co）。常见原因：①代理节点不可用或未将 *.supabase.co 走代理；②直连环境下 DNS 被劫持。请切换代理节点或检查代理规则后重试。',
  misconfigured: '账号服务尚未配置，请联系管理员。',
  unknown: '账号服务暂时无法访问，请稍后重试。'
}

export function describeProbe(probe) {
  if (!probe) return NETWORK_ERROR_COPY.unknown
  if (probe.ok) return ''
  return NETWORK_ERROR_COPY[probe.reason] || NETWORK_ERROR_COPY.unknown
}
