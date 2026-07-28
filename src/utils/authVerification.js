export const EMAIL_VERIFICATION_GRACE_MS = 24 * 60 * 60 * 1000

function isPasswordUser(authUser) {
  return authUser?.app_metadata?.provider === 'email'
}

export function isEmailVerified(authUser) {
  return !isPasswordUser(authUser)
    || Boolean(authUser?.email_confirmed_at || authUser?.confirmed_at)
}

export function getEmailVerificationDeadline(authUser) {
  if (!isPasswordUser(authUser) || !authUser?.created_at) {
    return null
  }

  const createdAt = Date.parse(authUser.created_at)
  return Number.isFinite(createdAt)
    ? new Date(createdAt + EMAIL_VERIFICATION_GRACE_MS)
    : null
}

export function isEmailVerificationExpired(authUser, now = Date.now()) {
  if (isEmailVerified(authUser)) {
    return false
  }

  const deadline = getEmailVerificationDeadline(authUser)
  return Boolean(deadline && deadline.getTime() <= now)
}
