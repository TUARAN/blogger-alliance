<script setup>
import { onMounted } from 'vue'
import { initBusuanzi } from './utils/busuanzi.js'
import ToastHost from './components/ToastHost.vue'

onMounted(() => {
  initBusuanzi()
})
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <router-view />
    <ToastHost />
  </div>
</template>
