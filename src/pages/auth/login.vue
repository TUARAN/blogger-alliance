<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth.js'
import { formatAuthError, AUTH_COPY } from '../../utils/authMessages.js'
import { showToast } from '../../utils/toast.js'

const router = useRouter()
const { signIn, isSupabaseConfigured } = useAuth()

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

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
          使用邮箱登录联盟工作台，管理你的账号与资料。
        </p>

        <div
          v-if="!isSupabaseConfigured"
          class="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          {{ AUTH_COPY.devConfigMissing }}
        </div>

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
          <p
            v-if="errorMessage.includes('验证')"
            class="text-sm text-slate-600"
          >
            如果找不到邮件，请检查垃圾箱，或回到
            <router-link to="/auth/register" class="font-medium text-indigo-700 hover:text-indigo-800">注册页</router-link>
            重新发送验证邮件。
          </p>

          <button
            type="submit"
            class="h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
            :disabled="isSubmitting || !isSupabaseConfigured"
          >
            {{ isSubmitting ? '登录中...' : '登录' }}
          </button>
        </form>

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
