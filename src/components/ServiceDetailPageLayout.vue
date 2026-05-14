<script setup>
defineProps({
  backLabel: {
    type: String,
    default: '返回服务总览'
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <AppNav />

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <router-link
        to="/tob/services"
        class="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 hover:text-indigo-900 mb-8"
      >
        ← {{ backLabel }}
      </router-link>
      <slot />
    </main>
  </div>
</template>
