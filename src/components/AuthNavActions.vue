<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

defineProps({
  variant: {
    type: String,
    default: 'desktop'
  }
})

const router = useRouter()
const { isAuthenticated, displayName, signOut, loading } = useAuth()
const menuOpen = ref(false)

async function handleSignOut() {
  menuOpen.value = false
  await signOut()
  router.push('/auth/login')
}
</script>

<template>
  <div v-if="loading" class="h-9 w-16 animate-pulse rounded-lg bg-slate-100" />

  <template v-else-if="isAuthenticated">
    <div v-if="variant === 'desktop'" class="relative">
      <button
        type="button"
        class="inline-flex h-9 max-w-[160px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
          {{ displayName.slice(0, 1).toUpperCase() }}
        </span>
        <span class="truncate">{{ displayName }}</span>
      </button>

      <div
        v-if="menuOpen"
        class="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[160px] rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
      >
        <router-link
          to="/account"
          class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          @click="menuOpen = false"
        >
          账号中心
        </router-link>
        <router-link
          to="/workspace"
          class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          @click="menuOpen = false"
        >
          工作台
        </router-link>
        <button
          type="button"
          class="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          @click="handleSignOut"
        >
          退出登录
        </button>
      </div>
    </div>

    <div v-else class="space-y-1 px-1">
      <p class="px-3 py-1 text-xs text-slate-500">已登录：{{ displayName }}</p>
      <router-link
        to="/account"
        class="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        账号中心
      </router-link>
      <button
        type="button"
        class="flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
        @click="handleSignOut"
      >
        退出登录
      </button>
    </div>
  </template>

  <template v-else>
    <div
      v-if="variant === 'desktop'"
      class="flex items-center gap-2"
    >
      <router-link
        to="/auth/login"
        class="inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
      >
        登录
      </router-link>
      <router-link
        to="/auth/register"
        class="inline-flex h-9 items-center rounded-lg bg-indigo-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        注册
      </router-link>
    </div>

    <div v-else class="grid grid-cols-2 gap-2 px-1">
      <router-link
        to="/auth/login"
        class="flex min-h-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700"
      >
        登录
      </router-link>
      <router-link
        to="/auth/register"
        class="flex min-h-11 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white"
      >
        注册
      </router-link>
    </div>
  </template>
</template>
