<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth.js'
import { formatAuthError } from '../../utils/authMessages.js'
import { showToast } from '../../utils/toast.js'
import AuthNetworkBanner from '../../components/AuthNetworkBanner.vue'

const route = useRoute()
const router = useRouter()
const {
  verifySignupEmail,
  isSupabaseConfigured,
  initialized,
  loading: authLoading
} = useAuth()

const isSubmitting = ref(false)
const errorMessage = ref('')

const tokenHash = computed(() => (
  typeof route.query.token_hash === 'string' ? route.query.token_hash : ''
))

const hasValidLink = computed(() => (
  Boolean(tokenHash.value) && (!route.query.type || route.query.type === 'email')
))

async function handleConfirm() {
  if (!hasValidLink.value || isSubmitting.value) {
    return
  }

  errorMessage.value = ''
  isSubmitting.value = true

  const { error } = await verifySignupEmail(tokenHash.value)

  isSubmitting.value = false

  if (error) {
    errorMessage.value = formatAuthError(
      error,
      '验证链接无效或已过期，请返回登录页重新发送验证邮件。'
    )
    return
  }

  showToast('邮箱验证成功，已为你登录。', { type: 'success' })
  router.replace('/workspace')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
    <AppNav />

    <section class="mx-auto max-w-md px-4 py-12 sm:py-16">
      <div class="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 class="text-2xl font-bold text-slate-900">确认邮箱</h1>
        <p class="mt-2 text-sm leading-6 text-slate-600">
          点击下方按钮完成邮箱验证。只有你主动点击后，一次性验证码才会被使用。
        </p>

        <div
          v-if="initialized && !isSupabaseConfigured"
          class="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          账号服务暂不可用，请稍后再试。
        </div>

        <div
          v-else-if="authLoading"
          class="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
        >
          正在连接账号服务...
        </div>

        <AuthNetworkBanner v-else />

        <div
          v-if="!hasValidLink"
          class="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
        >
          验证链接不完整，请返回登录页重新发送验证邮件。
        </div>

        <p v-if="errorMessage" class="mt-5 text-sm leading-6 text-red-600">
          {{ errorMessage }}
        </p>

        <button
          type="button"
          class="mt-6 h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
          :disabled="isSubmitting || authLoading || !isSupabaseConfigured || !hasValidLink"
          @click="handleConfirm"
        >
          {{ isSubmitting ? '验证中...' : '确认邮箱并登录' }}
        </button>

        <p class="mt-5 text-center text-sm text-slate-600">
          <router-link to="/auth/login" class="font-medium text-indigo-700 hover:text-indigo-800">
            返回登录页
          </router-link>
        </p>
      </div>
    </section>
  </div>
</template>
