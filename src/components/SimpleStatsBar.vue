<template>
  <div class="w-full bg-white bg-opacity-80 shadow-sm py-2 px-3 sm:px-4 flex items-center justify-center text-xs sm:text-sm text-gray-700 font-medium rounded-b-xl">
    <div class="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
      <div class="flex items-center">
        今日访问：
        <span class="mx-1 text-blue-600 font-bold">{{ pv }}</span>（PV）/
        <span class="mx-1 text-green-600 font-bold">{{ uv }}</span>（UV）
      </div>
      <div class="flex items-center">
        累计访问：
        <span class="mx-1 text-blue-600 font-bold">{{ totalPv }}</span>（PV）/
        <span class="mx-1 text-green-600 font-bold">{{ totalUv }}</span>（UV）
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTodayStatsWithBonus, getTotalStatsWithMock } from '../utils/statsService.js'

const pv = ref(0)
const uv = ref(0)
const totalPv = ref(0)
const totalUv = ref(0)

const updateStats = () => {
  const today = getTodayStatsWithBonus()
  const total = getTotalStatsWithMock()
  pv.value = today.pv
  uv.value = today.uv
  totalPv.value = total.pv
  totalUv.value = total.uv
}

onMounted(() => {
  updateStats()
  // 可选：每30秒刷新一次
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