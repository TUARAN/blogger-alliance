<script setup>
import { computed, onMounted } from 'vue'
import { useAuth } from '../../composables/useAuth.js'
import WorkspaceModuleGrid from '../../components/WorkspaceModuleGrid.vue'

const { initAuth, isAuthenticated, displayName } = useAuth()

onMounted(() => {
  initAuth()
})

const welcomeText = computed(() => {
  if (!isAuthenticated.value) {
    return '汇总公开资源、成员入口、内部数据与运营工具。'
  }

  return `${displayName.value}，欢迎回来。`
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
    <AppNav />

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div class="max-w-3xl">
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">联盟入口</h1>
        <p class="mt-4 text-lg text-gray-600 leading-8">
          {{ welcomeText }}
        </p>
      </div>

      <WorkspaceModuleGrid class="mt-10" />
    </section>
  </div>
</template>
