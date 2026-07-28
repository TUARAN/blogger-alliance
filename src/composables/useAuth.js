import { ref, computed, readonly } from 'vue'
import { getSupabaseClient, initSupabase, isSupabaseConfigured } from '../lib/supabase.js'
import { AUTH_COPY } from '../utils/authMessages.js'
import {
  NETWORK_ERROR_COPY,
  isLikelyNetworkError,
  probeSupabaseReachable
} from '../utils/networkProbe.js'
import {
  getEmailVerificationDeadline,
  isEmailVerificationExpired,
  isEmailVerified
} from '../utils/authVerification.js'

/**
 * 包裹 Supabase 调用，统一捕获 "Failed to fetch" 类网络异常并给出中文提示。
 * 成功路径走 supabase 自己的 { data, error } 返回；失败路径返回结构一致的 error.message。
 */
async function callWithNetworkGuard(label, action) {
  try {
    return await action()
  } catch (err) {
    if (!isLikelyNetworkError(err)) {
      throw err
    }

    const probe = await probeSupabaseReachable()
    const reason = probe.ok ? 'unknown' : probe.reason
    return {
      data: null,
      error: {
        message: NETWORK_ERROR_COPY[reason] || NETWORK_ERROR_COPY.unknown,
        code: 'network_error',
        kind: 'network',
        reason,
        originalLabel: label
      }
    }
  }
}

const user = ref(null)
const profile = ref(null)
const loading = ref(true)
const initialized = ref(false)
let initPromise = null

export const ROLES = {
  MEMBER: 'member',
  INTERNAL: 'internal',
  MANAGER: 'manager',
  ADMIN: 'admin'
}

const ROLE_RANK = {
  member: 0,
  internal: 1,
  manager: 2,
  admin: 3
}

export function hasMinimumRole(role, minimumRole) {
  return (ROLE_RANK[role] ?? 0) >= (ROLE_RANK[minimumRole] ?? 0)
}

async function fetchProfile() {
  const supabase = getSupabaseClient()

  if (!supabase || !user.value) {
    profile.value = null
    return
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, display_name, avatar_url, role, created_at, updated_at')
    .eq('id', user.value.id)
    .maybeSingle()

  if (!error) {
    profile.value = data
  }
}

async function initAuth() {
  if (initPromise) {
    return initPromise
  }

  initPromise = (async () => {
    await initSupabase()

    const supabase = getSupabaseClient()

    if (!isSupabaseConfigured.value || !supabase) {
      loading.value = false
      initialized.value = true
      return
    }

    const { data: { session } } = await supabase.auth.getSession()
    const sessionUser = session?.user ?? null

    if (sessionUser && isEmailVerificationExpired(sessionUser)) {
      await supabase.auth.signOut({ scope: 'local' })
      user.value = null
    } else {
      user.value = sessionUser
    }

    if (user.value) {
      await fetchProfile()
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {
      const nextUser = session?.user ?? null
      user.value = nextUser && !isEmailVerificationExpired(nextUser)
        ? nextUser
        : null

      if (user.value) {
        await fetchProfile()
      } else {
        profile.value = null
      }
    })

    loading.value = false
    initialized.value = true
  })()

  return initPromise
}

export function useAuth() {
  const role = computed(() => profile.value?.role || ROLES.MEMBER)
  const isAuthenticated = computed(() => Boolean(user.value))
  const isEmailVerificationPending = computed(() => (
    Boolean(user.value)
    && !isEmailVerified(user.value)
    && !isEmailVerificationExpired(user.value)
  ))
  const emailVerificationDeadline = computed(() => getEmailVerificationDeadline(user.value))
  const isInternal = computed(() => hasMinimumRole(role.value, ROLES.INTERNAL))
  const isManager = computed(() => role.value === ROLES.MANAGER)
  const isAdmin = computed(() => role.value === ROLES.ADMIN)

  const displayName = computed(() => {
    return profile.value?.display_name
      || user.value?.user_metadata?.display_name
      || user.value?.email?.split('@')[0]
      || '用户'
  })

  async function getAccessToken() {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return null
    }

    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token ?? null
  }

  async function signUp({ email, password, displayName: name }) {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return { data: null, error: { message: AUTH_COPY.serviceUnavailable } }
    }

    return callWithNetworkGuard('signUp', () =>
      supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/login`,
          data: {
            display_name: name
          }
        }
      })
    )
  }

  /**
   * OAuth 第三方登录（github / google）。
   * 成功后浏览器整页跳转到 Supabase 授权页，回站后由 supabase-js 自动解析会话。
   */
  async function signInWithOAuth(provider, { redirectTo } = {}) {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return { data: null, error: { message: AUTH_COPY.serviceUnavailable } }
    }

    return callWithNetworkGuard('signInWithOAuth', () =>
      supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectTo || `${window.location.origin}/workspace`
        }
      })
    )
  }

  async function signIn({ email, password }) {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return { data: null, error: { message: AUTH_COPY.serviceUnavailable } }
    }

    const result = await callWithNetworkGuard('signIn', () =>
      supabase.auth.signInWithPassword({ email, password })
    )

    if (result.data?.user && isEmailVerificationExpired(result.data.user)) {
      await supabase.auth.signOut({ scope: 'local' })
      return {
        data: null,
        error: {
          message: 'EMAIL_VERIFICATION_EXPIRED',
          code: 'email_verification_expired'
        },
        verificationPending: false
      }
    }

    return {
      ...result,
      verificationPending: Boolean(result.data?.user && !isEmailVerified(result.data.user))
    }
  }

  async function resendVerificationEmail(email) {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return { error: { message: AUTH_COPY.serviceUnavailable } }
    }

    return callWithNetworkGuard('resend', () =>
      supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/login`
        }
      })
    )
  }

  async function verifySignupEmail(tokenHash) {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return { data: null, error: { message: AUTH_COPY.serviceUnavailable } }
    }

    return callWithNetworkGuard('verifySignupEmail', () =>
      supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: 'email'
      })
    )
  }

  async function signOut() {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return { error: { message: AUTH_COPY.serviceUnavailable } }
    }

    const { error } = await supabase.auth.signOut()
    if (!error) {
      profile.value = null
    }
    return { error }
  }

  async function updateProfile({ displayName: name, avatarUrl }) {
    const supabase = getSupabaseClient()

    if (!supabase || !user.value) {
      return { data: null, error: { message: '请先登录后再更新资料。' } }
    }

    const payload = {
      display_name: name,
      updated_at: new Date().toISOString()
    }

    if (avatarUrl !== undefined) {
      payload.avatar_url = avatarUrl
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', user.value.id)
      .select('id, email, display_name, avatar_url, role, created_at, updated_at')
      .single()

    if (!error) {
      profile.value = data
    }

    return { data, error }
  }

  return {
    user: readonly(user),
    profile: readonly(profile),
    loading: readonly(loading),
    initialized: readonly(initialized),
    isSupabaseConfigured,
    isAuthenticated,
    isEmailVerificationPending,
    emailVerificationDeadline,
    isInternal,
    isManager,
    isAdmin,
    role,
    displayName,
    initAuth,
    getAccessToken,
    signUp,
    signIn,
    signInWithOAuth,
    resendVerificationEmail,
    verifySignupEmail,
    signOut,
    updateProfile,
    fetchProfile
  }
}
