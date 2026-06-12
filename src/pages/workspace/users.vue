<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useAuth } from '../../composables/useAuth.js'
import { AUTH_COPY } from '../../utils/authMessages.js'
import { showToast } from '../../utils/toast.js'
import {
  explainInternalDataError,
  fetchAdminUsers,
  updateUserRole
} from '../../utils/internalDataApi.js'

const { initAuth, isAdmin, loading: authLoading, user, getAccessToken } = useAuth()

const ROLE_OPTIONS = [
  { value: 'member', label: '普通成员' },
  { value: 'internal', label: '内部成员' },
  { value: 'admin', label: '管理员' }
]

const ROLE_BADGE = {
  member: 'bg-slate-100 text-slate-700',
  internal: 'bg-blue-50 text-blue-700',
  admin: 'bg-indigo-100 text-indigo-800'
}

const users = ref([])
const isLoading = ref(false)
const loadError = ref('')
const savingUserId = ref('')
const keyword = ref('')

const filteredUsers = computed(() => {
  const query = keyword.value.trim().toLowerCase()

  if (!query) {
    return users.value
  }

  return users.value.filter((item) =>
    item.email.toLowerCase().includes(query)
    || item.displayName.toLowerCase().includes(query)
  )
})

const roleCounts = computed(() => {
  const counts = { member: 0, internal: 0, admin: 0 }

  users.value.forEach((item) => {
    if (counts[item.role] !== undefined) {
      counts[item.role] += 1
    }
  })

  return counts
})

function roleLabel(role) {
  return ROLE_OPTIONS.find((item) => item.value === role)?.label || role
}

function formatDate(value) {
  if (!value) {
    return '—'
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('zh-CN')
}

async function loadUsers() {
  isLoading.value = true
  loadError.value = ''

  try {
    const token = await getAccessToken()
    users.value = await fetchAdminUsers(token)
  } catch (error) {
    loadError.value = explainInternalDataError(error, 'read')
  } finally {
    isLoading.value = false
  }
}

async function handleRoleChange(target, nextRole) {
  if (target.role === nextRole || savingUserId.value) {
    return
  }

  const previousRole = target.role
  target.role = nextRole
  savingUserId.value = target.id

  try {
    const token = await getAccessToken()
    await updateUserRole(token, target.id, nextRole)
    showToast(`已将 ${target.displayName || target.email} 设为${roleLabel(nextRole)}`, { type: 'success' })
  } catch (error) {
    target.role = previousRole

    if (error?.message === 'CANNOT_CHANGE_OWN_ROLE') {
      showToast('不能修改自己的角色。', { type: 'error' })
    } else {
      showToast(explainInternalDataError(error, 'admin'), { type: 'error' })
    }
  } finally {
    savingUserId.value = ''
  }
}

onMounted(async () => {
  await initAuth()
})

watch(
  [isAdmin, authLoading],
  ([admin, loading]) => {
    if (admin && !loading && !users.value.length && !isLoading.value) {
      loadUsers()
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
    <AppNav />

    <section class="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="max-w-3xl">
          <router-link
            to="/workspace"
            class="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-indigo-700"
          >
            ← 返回工作台
          </router-link>
          <h1 class="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            用户管理
          </h1>
          <p class="mt-3 text-base leading-7 text-slate-600">
            查看注册用户并分配角色：普通成员、内部成员（可读内部数据）、管理员（可管理全部数据）。
          </p>
        </div>
        <span
          class="inline-flex w-fit items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800"
        >
          仅管理员
        </span>
      </div>

      <div
        v-if="authLoading"
        class="mt-8 rounded-2xl border border-indigo-100 bg-white p-6 text-sm text-slate-600"
      >
        正在验证账号权限...
      </div>

      <div
        v-else-if="!isAdmin"
        class="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 md:p-6"
      >
        <h2 class="mb-2 text-lg font-semibold text-indigo-950">{{ AUTH_COPY.adminAccessDeniedTitle }}</h2>
        <p class="mb-3 text-sm text-indigo-800">
          {{ AUTH_COPY.adminAccessDeniedBody }}
        </p>
        <router-link
          to="/workspace"
          class="inline-flex h-10 items-center rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white hover:bg-indigo-800"
        >
          返回工作台
        </router-link>
      </div>

      <template v-else>
        <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            v-for="option in ROLE_OPTIONS"
            :key="option.value"
            class="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm"
          >
            <p class="text-sm text-slate-500">{{ option.label }}</p>
            <p class="mt-2 text-3xl font-bold text-slate-900">{{ roleCounts[option.value] }}</p>
          </div>
        </div>

        <div class="mt-6 rounded-2xl border border-white/70 bg-white/90 shadow-sm">
          <div class="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 class="text-lg font-semibold text-slate-900">
              全部用户
              <span class="ml-1 text-sm font-normal text-slate-500">（共 {{ users.length }} 人）</span>
            </h2>
            <input
              v-model="keyword"
              type="search"
              placeholder="按邮箱或昵称搜索"
              class="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-64"
            >
          </div>

          <div v-if="isLoading" class="p-6 text-sm text-slate-600">
            正在加载用户列表...
          </div>

          <div v-else-if="loadError" class="p-6">
            <p class="text-sm text-red-600">{{ loadError }}</p>
            <button
              type="button"
              class="mt-3 inline-flex h-9 items-center rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
              @click="loadUsers"
            >
              重新加载
            </button>
          </div>

          <div v-else-if="!filteredUsers.length" class="p-6 text-sm text-slate-600">
            {{ keyword ? '没有匹配的用户。' : '暂无注册用户。' }}
          </div>

          <ul v-else class="divide-y divide-slate-100">
            <li
              v-for="item in filteredUsers"
              :key="item.id"
              class="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="flex min-w-0 items-center gap-3">
                <img
                  v-if="item.avatarUrl"
                  :src="item.avatarUrl"
                  alt=""
                  class="h-10 w-10 shrink-0 rounded-full border border-slate-200 object-cover"
                >
                <span
                  v-else
                  class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700"
                >
                  {{ (item.displayName || item.email || '?').slice(0, 1).toUpperCase() }}
                </span>
                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold text-slate-900">
                    {{ item.displayName || '未设置昵称' }}
                    <span
                      v-if="item.id === user?.id"
                      class="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                    >
                      我
                    </span>
                  </p>
                  <p class="truncate text-sm text-slate-500">{{ item.email || '—' }}</p>
                </div>
              </div>

              <div class="flex shrink-0 items-center gap-4">
                <span class="text-xs text-slate-400">注册于 {{ formatDate(item.createdAt) }}</span>
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
                  :class="ROLE_BADGE[item.role] || ROLE_BADGE.member"
                >
                  {{ roleLabel(item.role) }}
                </span>
                <select
                  :value="item.role"
                  class="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                  :disabled="item.id === user?.id || savingUserId === item.id"
                  :title="item.id === user?.id ? '不能修改自己的角色' : ''"
                  @change="handleRoleChange(item, $event.target.value)"
                >
                  <option
                    v-for="option in ROLE_OPTIONS"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </section>
  </div>
</template>
