export const ROLE_LABELS = {
  member: '普通成员',
  internal: '内部成员',
  admin: '管理员'
}

export function getRoleLabel(role) {
  return ROLE_LABELS[role] || '普通成员'
}

const AUTH_ERROR_MESSAGES = {
  invalid_credentials: '邮箱或密码不正确，请检查后重试。',
  email_not_confirmed: '邮箱尚未完成验证。请打开注册邮箱，点击验证链接后再登录。',
  user_already_registered: '该邮箱已注册，请直接登录。',
  signup_disabled: '当前暂不支持新用户注册，请联系管理员。',
  too_many_requests: '尝试次数过多，请稍等几分钟后再试。',
  weak_password: '密码强度不足，请至少使用 6 位字符。'
}

function normalizeAuthErrorMessage(message = '') {
  const text = String(message).toLowerCase()

  if (text.includes('invalid login credentials') || text.includes('invalid credentials')) {
    return AUTH_ERROR_MESSAGES.invalid_credentials
  }

  if (text.includes('email not confirmed')) {
    return AUTH_ERROR_MESSAGES.email_not_confirmed
  }

  if (text.includes('already registered') || text.includes('user already exists')) {
    return AUTH_ERROR_MESSAGES.user_already_registered
  }

  if (text.includes('signup is disabled')) {
    return AUTH_ERROR_MESSAGES.signup_disabled
  }

  if (text.includes('too many requests') || text.includes('rate limit')) {
    return AUTH_ERROR_MESSAGES.too_many_requests
  }

  if (text.includes('password') && text.includes('least')) {
    return AUTH_ERROR_MESSAGES.weak_password
  }

  return ''
}

export function formatAuthError(error, fallback = '操作失败，请稍后重试。') {
  if (!error) {
    return fallback
  }

  if (typeof error === 'string') {
    return normalizeAuthErrorMessage(error) || error
  }

  const mapped = normalizeAuthErrorMessage(error.message)
  if (mapped) {
    return mapped
  }

  if (error.message?.includes('Supabase') || error.message?.includes('环境变量')) {
    return '账号服务暂不可用，请稍后再试。'
  }

  return error.message || fallback
}

export const AUTH_COPY = {
  internalAccessDeniedTitle: '暂无内部数据访问权限',
  internalAccessDeniedBody:
    '你的账号已登录，但还没有查看数据报告、年度总览等内部内容的权限。请联系联盟管理员为你开通权限。',
  sessionExpired: '登录状态已失效，请重新登录。',
  sessionMissing: '登录状态异常，请重新登录后再试。',
  serviceUnavailable: '账号服务暂不可用，请稍后再试。',
  devConfigMissing: '开发环境尚未完成账号服务配置，请联系开发者处理。'
}
