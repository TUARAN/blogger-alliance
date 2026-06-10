import { ref, computed, readonly } from 'vue'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { AUTH_COPY } from '../utils/authMessages.js'

const user = ref(null)
const profile = ref(null)
const loading = ref(true)
const initialized = ref(false)
let initPromise = null

export const ROLES = {
  MEMBER: 'member',
  INTERNAL: 'internal',
  ADMIN: 'admin'
}

const ROLE_RANK = {
  member: 0,
  internal: 1,
  admin: 2
}

export function hasMinimumRole(role, minimumRole) {
  return (ROLE_RANK[role] ?? 0) >= (ROLE_RANK[minimumRole] ?? 0)
}

async function fetchProfile() {
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
    if (!isSupabaseConfigured || !supabase) {
      loading.value = false
      initialized.value = true
      return
    }

    const { data: { session } } = await supabase.auth.getSession()
    user.value = session?.user ?? null

    if (user.value) {
      await fetchProfile()
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {
      user.value = session?.user ?? null

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
  const isInternal = computed(() => hasMinimumRole(role.value, ROLES.INTERNAL))
  const isAdmin = computed(() => role.value === ROLES.ADMIN)

  const displayName = computed(() => {
    return profile.value?.display_name
      || user.value?.user_metadata?.display_name
      || user.value?.email?.split('@')[0]
      || '用户'
  })

  async function getAccessToken() {
    if (!supabase) {
      return null
    }

    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token ?? null
  }

  async function signUp({ email, password, displayName: name }) {
    if (!supabase) {
      return { data: null, error: { message: AUTH_COPY.serviceUnavailable } }
    }

    return supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/login`,
        data: {
          display_name: name
        }
      }
    })
  }

  async function signIn({ email, password }) {
    if (!supabase) {
      return { data: null, error: { message: AUTH_COPY.serviceUnavailable } }
    }

    return supabase.auth.signInWithPassword({ email, password })
  }

  async function signOut() {
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
    isInternal,
    isAdmin,
    role,
    displayName,
    initAuth,
    getAccessToken,
    signUp,
    signIn,
    signOut,
    updateProfile,
    fetchProfile
  }
}
