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
  email_not_confirmed: '邮箱尚未验证，请先查收邮件并点击验证链接。',
  user_already_registered: '该邮箱已注册，请直接登录。',
  signup_disabled: '当前暂不支持新用户注册，请联系管理员。',
  too_many_requests: '尝试次数过多，请稍等几分钟后再试。',
  weak_password: '密码强度不足，请至少使用 6 位字符。',
  otp_expired: '验证链接无效或已过期，请返回登录页重新发送验证邮件。'
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

  if (
    text.includes('token has expired')
    || text.includes('token not found')
    || text.includes('otp_expired')
    || (text.includes('email link') && text.includes('invalid'))
  ) {
    return AUTH_ERROR_MESSAGES.otp_expired
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
    '你的账号已登录，但还没有查看数据台账、年度总览等内部内容的权限。请联系联盟管理员为你开通权限。',
  adminAccessDeniedTitle: '暂无管理员权限',
  adminAccessDeniedBody:
    '云服务自推广等管理板块仅对管理员开放。如需使用，请联系联盟管理员。',
  sessionExpired: '登录状态已失效，请重新登录。',
  sessionMissing: '登录状态异常，请重新登录后再试。',
  serviceUnavailable: '账号服务暂不可用，请稍后再试。',
  verificationTitle: '请查收验证邮件',
  verificationBody: '已向 {email} 发送验证链接。打开链接后，再在确认页点击按钮完成验证。',
  verificationHint: '没收到？先查垃圾箱，或稍等片刻后重发。',
  verificationResent: '验证邮件已重新发送',
  verificationResendWait: '请 {seconds} 秒后再试'
}
