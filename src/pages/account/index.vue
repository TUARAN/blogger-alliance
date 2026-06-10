<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth.js'
import { getRoleLabel } from '../../utils/authMessages.js'
import { showToast } from '../../utils/toast.js'

const router = useRouter()
const { user, profile, isAuthenticated, loading, initAuth, updateProfile, signOut, role } = useAuth()

const roleLabel = computed(() => getRoleLabel(role.value))
const displayName = ref('')
const isSaving = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  await initAuth()

  if (!isAuthenticated.value) {
    router.replace({ path: '/auth/login', query: { redirect: '/account' } })
    return
  }

  displayName.value = profile.value?.display_name
    || user.value?.user_metadata?.display_name
    || ''
})

async function handleSave() {
  errorMessage.value = ''

  if (!displayName.value.trim()) {
    errorMessage.value = '昵称不能为空。'
    return
  }

  isSaving.value = true

  const { error } = await updateProfile({
    displayName: displayName.value.trim()
  })

  isSaving.value = false

  if (error) {
    errorMessage.value = error.message || '保存失败，请稍后重试。'
    return
  }

  showToast('资料已更新', { type: 'success' })
}

async function handleSignOut() {
  await signOut()
  showToast('已退出登录', { type: 'success' })
  router.replace('/auth/login')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
    <AppNav />

    <section class="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <div v-if="loading" class="rounded-2xl border border-indigo-100 bg-white p-8 text-sm text-slate-600">
        加载账号信息...
      </div>

      <div v-else class="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 class="text-2xl font-bold text-slate-900">账号中心</h1>
        <p class="mt-2 text-sm text-slate-600">管理你的联盟账号资料。</p>

        <div class="mt-6 space-y-4">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">邮箱</label>
            <input
              :value="user?.email || profile?.email || ''"
              type="email"
              disabled
              class="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500"
            >
          </div>

          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">账号权限</label>
            <input
              :value="roleLabel"
              type="text"
              disabled
              class="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500"
            >
            <p v-if="role === 'member'" class="mt-1.5 text-xs leading-5 text-slate-500">
              当前为普通成员。如需使用数据台账，请联系管理员开通内部权限。
            </p>
            <p v-else-if="role === 'internal'" class="mt-1.5 text-xs leading-5 text-slate-500">
              已开通内部权限，可访问数据台账与年度总览。
            </p>
            <p v-else class="mt-1.5 text-xs leading-5 text-slate-500">
              已开通管理员权限，可查看并管理内部板块数据。
            </p>
          </div>

          <div>
            <label for="account-name" class="mb-1.5 block text-sm font-medium text-slate-700">昵称</label>
            <input
              id="account-name"
              v-model="displayName"
              type="text"
              class="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
          </div>

          <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

          <div class="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              class="h-10 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
              :disabled="isSaving"
              @click="handleSave"
            >
              {{ isSaving ? '保存中...' : '保存资料' }}
            </button>
            <button
              type="button"
              class="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
              @click="handleSignOut"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
