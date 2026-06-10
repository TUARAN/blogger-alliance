<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth.js'
import { formatAuthError, AUTH_COPY } from '../../utils/authMessages.js'
import { showToast } from '../../utils/toast.js'
import AuthNetworkBanner from '../../components/AuthNetworkBanner.vue'

const router = useRouter()
const { signUp, resendVerificationEmail, isSupabaseConfigured, initialized, loading: authLoading } = useAuth()

const displayName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isSubmitting = ref(false)
const isResending = ref(false)
const resendCooldown = ref(0)
const errorMessage = ref('')
const verificationPending = ref(false)
const registeredEmail = ref('')

let resendTimer = null

const verificationBody = computed(() => {
  return AUTH_COPY.verificationBody.replace('{email}', registeredEmail.value)
})

const resendLabel = computed(() => {
  if (isResending.value) {
    return '发送中...'
  }

  if (resendCooldown.value > 0) {
    return AUTH_COPY.verificationResendWait.replace('{seconds}', String(resendCooldown.value))
  }

  return '重发验证邮件'
})

onBeforeUnmount(() => {
  if (resendTimer) {
    clearInterval(resendTimer)
  }
})

function startResendCooldown(seconds = 60) {
  resendCooldown.value = seconds

  if (resendTimer) {
    clearInterval(resendTimer)
  }

  resendTimer = setInterval(() => {
    resendCooldown.value -= 1

    if (resendCooldown.value <= 0) {
      clearInterval(resendTimer)
      resendTimer = null
    }
  }, 1000)
}

async function handleSubmit() {
  errorMessage.value = ''
  verificationPending.value = false

  if (!displayName.value.trim() || !email.value.trim() || !password.value) {
    errorMessage.value = '请填写昵称、邮箱和密码。'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = '密码至少需要 6 位。'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致。'
    return
  }

  isSubmitting.value = true

  const { data, error } = await signUp({
    email: email.value.trim(),
    password: password.value,
    displayName: displayName.value.trim()
  })

  isSubmitting.value = false

  if (error) {
    errorMessage.value = formatAuthError(error, '注册失败，请稍后重试。')
    return
  }

  if (data?.session) {
    showToast('注册成功', { type: 'success' })
    router.replace('/workspace')
    return
  }

  registeredEmail.value = email.value.trim()
  verificationPending.value = true
  startResendCooldown(60)
}

async function handleResend() {
  if (isResending.value || resendCooldown.value > 0 || !registeredEmail.value) {
    return
  }

  isResending.value = true
  errorMessage.value = ''

  const { error } = await resendVerificationEmail(registeredEmail.value)

  isResending.value = false

  if (error) {
    errorMessage.value = formatAuthError(error, '重发失败，请稍后再试。')
    return
  }

  showToast(AUTH_COPY.verificationResent, { type: 'success' })
  startResendCooldown(60)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
    <AppNav />

    <section class="mx-auto max-w-md px-4 py-12 sm:py-16">
      <div class="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 class="text-2xl font-bold text-slate-900">注册账号</h1>
        <p class="mt-2 text-sm text-slate-600">
          创建联盟账号，后续可在工作台使用更多功能。
        </p>

        <div
          v-if="initialized && !isSupabaseConfigured"
          class="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          {{ AUTH_COPY.serviceUnavailable }}
        </div>

        <div
          v-else-if="authLoading"
          class="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
        >
          正在连接账号服务...
        </div>

        <AuthNetworkBanner v-else />

        <div
          v-if="verificationPending"
          class="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
        >
          <h2 class="text-lg font-semibold text-emerald-950">{{ AUTH_COPY.verificationTitle }}</h2>
          <p class="mt-2 text-sm leading-6 text-emerald-900">
            {{ verificationBody }}
          </p>
          <p class="mt-3 text-xs leading-5 text-emerald-800/90">
            {{ AUTH_COPY.verificationHint }}
          </p>

          <p v-if="errorMessage" class="mt-3 text-sm text-red-600">{{ errorMessage }}</p>

          <div class="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              class="inline-flex h-10 items-center rounded-lg border border-emerald-300 bg-white px-4 text-sm font-medium text-emerald-800 hover:bg-emerald-100 disabled:opacity-60"
              :disabled="isResending || resendCooldown > 0"
              @click="handleResend"
            >
              {{ resendLabel }}
            </button>
            <router-link
              to="/auth/login"
              class="inline-flex h-10 items-center rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              去登录
            </router-link>
          </div>
        </div>

        <form v-else class="mt-6 space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label for="register-name" class="mb-1.5 block text-sm font-medium text-slate-700">昵称</label>
            <input
              id="register-name"
              v-model="displayName"
              type="text"
              autocomplete="nickname"
              placeholder="你的昵称"
              class="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
          </div>

          <div>
            <label for="register-email" class="mb-1.5 block text-sm font-medium text-slate-700">邮箱</label>
            <input
              id="register-email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              class="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
          </div>

          <div>
            <label for="register-password" class="mb-1.5 block text-sm font-medium text-slate-700">密码</label>
            <input
              id="register-password"
              v-model="password"
              type="password"
              autocomplete="new-password"
              placeholder="至少 6 位"
              class="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
          </div>

          <div>
            <label for="register-confirm-password" class="mb-1.5 block text-sm font-medium text-slate-700">确认密码</label>
            <input
              id="register-confirm-password"
              v-model="confirmPassword"
              type="password"
              autocomplete="new-password"
              placeholder="再次输入密码"
              class="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
          </div>

          <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

          <button
            type="submit"
            class="h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
            :disabled="isSubmitting || authLoading || !isSupabaseConfigured"
          >
            {{ isSubmitting ? '注册中...' : '注册' }}
          </button>
        </form>

        <p v-if="!verificationPending" class="mt-6 text-center text-sm text-slate-600">
          已有账号？
          <router-link to="/auth/login" class="font-medium text-indigo-700 hover:text-indigo-800">
            去登录
          </router-link>
        </p>
      </div>
    </section>
  </div>
</template>
