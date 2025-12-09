<script setup>
import { onMounted } from 'vue'
import { initBusuanzi } from './utils/busuanzi.js'

onMounted(() => {
  initBusuanzi()
})
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <router-view />
  </div>
</template> 