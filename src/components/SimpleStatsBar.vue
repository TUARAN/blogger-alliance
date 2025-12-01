<template>
  <div class="w-full bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100 py-2.5 px-3 sm:px-4 flex items-center justify-center text-xs sm:text-sm shadow-sm">
    <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
      <div class="flex items-center">
        <span class="text-gray-600">今日访问：</span>
        <span class="mx-1 text-blue-600 font-bold">{{ pv }}</span>
        <span class="text-gray-500">PV</span>
        <span class="mx-2 text-gray-300">/</span>
        <span class="mx-1 text-green-600 font-bold">{{ uv }}</span>
        <span class="text-gray-500">UV</span>
      </div>
      <div class="flex items-center">
        <span class="text-gray-600">累计访问：</span>
        <span class="mx-1 text-blue-600 font-bold">{{ formatNumber(totalPv) }}</span>
        <span class="text-gray-500">PV</span>
        <span class="mx-2 text-gray-300">/</span>
        <span class="mx-1 text-green-600 font-bold">{{ formatNumber(totalUv) }}</span>
        <span class="text-gray-500">UV</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTodayStats, getRealTimeStats } from '../utils/statsService.js'

const pv = ref(0)
const uv = ref(0)
const totalPv = ref(0)
const totalUv = ref(0)

const updateStats = () => {
  const today = getTodayStats()
  const total = getRealTimeStats()
  pv.value = today.pv
  uv.value = today.uv
  totalPv.value = total.pv
  totalUv.value = total.uv
}

const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

onMounted(() => {
  updateStats()
  // 每30秒刷新一次
  setInterval(updateStats, 30000)
})
</script>

<style scoped>
div {
  animation: fadeInDown 0.5s;
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 