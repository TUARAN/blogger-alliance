<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
    <AppNav workspace-active />

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <WorkspaceChangelog class="mt-0 sm:mt-0" />
    </section>
  </div>
</template>

<script setup>
import WorkspaceChangelog from '../../components/WorkspaceChangelog.vue'
</script>
