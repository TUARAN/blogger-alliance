<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth.js'
import { formatAuthError, AUTH_COPY } from '../../utils/authMessages.js'
import { showToast } from '../../utils/toast.js'
import AuthNetworkBanner from '../../components/AuthNetworkBanner.vue'
import AccountSupportHint from '../../components/AccountSupportHint.vue'
import EmailProviderHint from '../../components/EmailProviderHint.vue'
import OAuthButtons from '../../components/OAuthButtons.vue'

const router = useRouter()
const { signIn, resendVerificationEmail, isSupabaseConfigured, initialized, loading: authLoading } = useAuth()

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const isResending = ref(false)
const resendCooldown = ref(0)
const errorMessage = ref('')

let resendTimer = null

const showVerificationHelp = computed(() => errorMessage.value.includes('验证'))

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

async function handleResend() {
  if (isResending.value || resendCooldown.value > 0 || !email.value.trim()) {
    return
  }

  isResending.value = true

  const { error } = await resendVerificationEmail(email.value.trim())

  isResending.value = false

  if (error) {
    showToast(formatAuthError(error, '重发失败，请稍后再试。'), { type: 'error' })
    return
  }

  showToast(AUTH_COPY.verificationResent, { type: 'success' })
  startResendCooldown(60)
}

async function handleSubmit() {
  errorMessage.value = ''

  if (!email.value.trim() || !password.value) {
    errorMessage.value = '请填写邮箱和密码。'
    return
  }

  isSubmitting.value = true

  const { error } = await signIn({
    email: email.value.trim(),
    password: password.value
  })

  isSubmitting.value = false

  if (error) {
    errorMessage.value = formatAuthError(error, '登录失败，请稍后重试。')
    return
  }

  showToast('登录成功', { type: 'success' })

  const redirect = typeof router.currentRoute.value.query.redirect === 'string'
    ? router.currentRoute.value.query.redirect
    : '/workspace'

  router.replace(redirect)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
    <AppNav />

    <section class="mx-auto max-w-md px-4 py-12 sm:py-16">
      <div class="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 class="text-2xl font-bold text-slate-900">登录账号</h1>
        <p class="mt-2 text-sm text-slate-600">
          使用邮箱登录联盟入口，管理你的账号与资料。
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

        <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label for="login-email" class="mb-1.5 block text-sm font-medium text-slate-700">邮箱</label>
            <input
              id="login-email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              class="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
          </div>

          <div>
            <label for="login-password" class="mb-1.5 block text-sm font-medium text-slate-700">密码</label>
            <input
              id="login-password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              placeholder="请输入密码"
              class="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
          </div>

          <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
          <div v-if="showVerificationHelp" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p class="text-sm text-slate-600">{{ AUTH_COPY.verificationHint }}</p>
            <button
              type="button"
              class="mt-3 inline-flex h-9 items-center rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-60"
              :disabled="isResending || resendCooldown > 0 || !email.trim()"
              @click="handleResend"
            >
              {{ resendLabel }}
            </button>
            <EmailProviderHint variant="inline" />
          </div>

          <button
            type="submit"
            class="h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
            :disabled="isSubmitting || authLoading || !isSupabaseConfigured"
          >
            {{ isSubmitting ? '登录中...' : '登录' }}
          </button>
        </form>

        <OAuthButtons class="mt-6" :disabled="authLoading || !isSupabaseConfigured" />

        <AccountSupportHint class="mt-5" />

        <p class="mt-6 text-center text-sm text-slate-600">
          还没有账号？
          <router-link to="/auth/register" class="font-medium text-indigo-700 hover:text-indigo-800">
            立即注册
          </router-link>
        </p>
      </div>
    </section>
  </div>
</template>
