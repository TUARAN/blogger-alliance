<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
    <AppNav workspace-active />

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div class="max-w-3xl">
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">联盟工作台</h1>
        <p class="mt-4 text-lg text-gray-600 leading-8">
          聚合联盟核心板块入口，统一承载服务介绍、案例、数据报告与知识资源，支持从流量获取到变现转化的完整链路快速访问。
        </p>
      </div>

      <WorkspaceModuleGrid class="mt-10" />
    </section>
  </div>
</template>

<script setup>
import WorkspaceModuleGrid from '../../components/WorkspaceModuleGrid.vue'
</script>
