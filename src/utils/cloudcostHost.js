export const CLOUDCOST_HOST = 'cloudcost.blogger-alliance.cn'
export const CLOUDCOST_PATH = '/cloudcost'

export function isCloudCostHost(hostname = '') {
  const host = hostname || (typeof window !== 'undefined' ? window.location.hostname : '')
  return host === CLOUDCOST_HOST || host === `www.${CLOUDCOST_HOST}`
}

export function cloudCostSiteUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (typeof window !== 'undefined' && isCloudCostHost()) {
    return normalized === CLOUDCOST_PATH ? '/' : normalized.replace(CLOUDCOST_PATH, '') || '/'
  }
  return normalized === '/' ? CLOUDCOST_PATH : `${CLOUDCOST_PATH}${normalized}`
}
