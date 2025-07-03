<template>
  <div class="stats-display">
    <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span class="mr-2">📊</span>
        网站访问统计
      </h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">{{ formatNumber(stats.pv) }}</div>
          <div class="text-sm text-gray-600">页面浏览量 (PV)</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">{{ formatNumber(stats.uv) }}</div>
          <div class="text-sm text-gray-600">独立访客 (UV)</div>
        </div>
      </div>
      <div class="mt-3 text-xs text-gray-500 text-center">
        最后更新: {{ formatTime(stats.timestamp) }}
      </div>
      <div class="mt-2 text-xs text-gray-400 text-center">
        <span class="inline-flex items-center">
          <span class="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
          实时数据
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getRealTimeStats, recordPageView } from '../utils/statsService.js'

const stats = ref({
  pv: 0,
  uv: 0,
  timestamp: new Date().toISOString()
})

let updateInterval = null

// 格式化数字显示
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// 格式化时间显示
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date
  
  if (diff < 60000) { // 1分钟内
    return '刚刚'
  } else if (diff < 3600000) { // 1小时内
    return Math.floor(diff / 60000) + '分钟前'
  } else if (diff < 86400000) { // 1天内
    return Math.floor(diff / 3600000) + '小时前'
  } else {
    return date.toLocaleDateString('zh-CN')
  }
}

// 更新统计数据
const updateStats = async () => {
  try {
    const newStats = await getRealTimeStats()
    stats.value = newStats
  } catch (error) {
    console.error('更新统计数据失败:', error)
  }
}

onMounted(() => {
  // 记录页面访问
  recordPageView()
  
  // 立即获取一次数据
  updateStats()
  
  // 每30秒更新一次数据
  updateInterval = setInterval(updateStats, 30000)
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})
</script>

<style scoped>
.stats-display {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 