<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../../composables/useAuth.js'
import { AUTH_COPY } from '../../utils/authMessages.js'
import WorkspaceModuleGrid from '../../components/WorkspaceModuleGrid.vue'

const route = useRoute()
const { initAuth, isAuthenticated, isInternal, displayName, loading } = useAuth()

onMounted(() => {
  initAuth()
})

const showInternalNotice = computed(() => route.query.notice === 'internal-required')

const welcomeText = computed(() => {
  if (!isAuthenticated.value) {
    return '聚合联盟核心板块入口。介绍、案例、学院等公开内容可直接访问；数据报告需登录并由管理员开通权限。'
  }

  if (!isInternal.value) {
    return `${displayName.value}，欢迎回来。你可以浏览公开模块；如需查看数据报告，请联系管理员开通内部权限。`
  }

  return `${displayName.value}，欢迎回来。你可以访问公开模块，也可以进入数据报告查看内部台账。`
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
    <AppNav workspace-active />

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div class="max-w-3xl">
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">联盟工作台</h1>
        <p class="mt-4 text-lg text-gray-600 leading-8">
          {{ welcomeText }}
        </p>
      </div>

      <div
        v-if="showInternalNotice"
        class="mt-6 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-5"
      >
        <h2 class="text-base font-semibold text-amber-950">{{ AUTH_COPY.internalAccessDeniedTitle }}</h2>
        <p class="mt-2 text-sm leading-6 text-amber-900">{{ AUTH_COPY.internalAccessDeniedBody }}</p>
      </div>

      <div
        v-if="!loading && !isAuthenticated"
        class="mt-6 max-w-3xl rounded-2xl border border-indigo-100 bg-white/90 p-5 shadow-sm"
      >
        <p class="text-sm text-slate-700">
          登录后可使用账号中心；如需查看数据报告、年度总览，还需管理员为你开通内部权限。
        </p>
        <div class="mt-4 flex flex-wrap gap-3">
          <router-link
            :to="{ path: '/auth/login', query: { redirect: '/workspace' } }"
            class="inline-flex h-10 items-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            登录
          </router-link>
          <router-link
            to="/auth/register"
            class="inline-flex h-10 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            注册
          </router-link>
        </div>
      </div>

      <WorkspaceModuleGrid class="mt-10" />
    </section>
  </div>
</template>
