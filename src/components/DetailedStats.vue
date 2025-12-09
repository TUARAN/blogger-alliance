<template>
  <div class="detailed-stats">
    <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span class="mr-2">📊</span>
        详细访问统计
      </h3>
      
      <!-- 总体统计 -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">{{ formatNumber(totalStats.pv) }}</div>
          <div class="text-sm text-gray-600">总浏览量 (PV)</div>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <div class="text-2xl font-bold text-green-600">{{ formatNumber(totalStats.uv) }}</div>
          <div class="text-sm text-gray-600">总访客数 (UV)</div>
        </div>
      </div>
      
      <!-- 今日统计 -->
      <div class="mb-6">
        <h4 class="text-md font-semibold text-gray-800 mb-3">今日数据</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center p-3 bg-orange-50 rounded-lg">
            <div class="text-xl font-bold text-orange-600">{{ formatNumber(todayStats.pv) }}</div>
            <div class="text-xs text-gray-600">今日 PV</div>
          </div>
          <div class="text-center p-3 bg-purple-50 rounded-lg">
            <div class="text-xl font-bold text-purple-600">{{ formatNumber(todayStats.uv) }}</div>
            <div class="text-xs text-gray-600">今日 UV</div>
          </div>
        </div>
      </div>
      
      <!-- 趋势图表 -->
      <div class="mb-4">
        <h4 class="text-md font-semibold text-gray-800 mb-3">最近7天趋势</h4>
        <div class="space-y-2">
          <div 
            v-for="(day, index) in weeklyStats" 
            :key="day.date"
            class="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <div class="flex items-center">
              <span class="text-xs text-gray-500 w-16">{{ formatDate(day.date) }}</span>
              <div class="flex items-center space-x-4 ml-4">
                <span class="text-xs text-blue-600">PV: {{ day.pv }}</span>
                <span class="text-xs text-green-600">UV: {{ day.uv }}</span>
              </div>
            </div>
            <div class="flex space-x-1">
              <div 
                v-for="i in 10" 
                :key="i"
                class="w-1 h-4 rounded"
                :class="getBarColor(day.pv, i)"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 更新时间 -->
      <div class="text-xs text-gray-500 text-center pt-2 border-t">
        最后更新: {{ formatTime(totalStats.timestamp) }}
        <span class="inline-flex items-center ml-2">
          <span class="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
          实时数据
        </span>
        <div class="mt-1 flex justify-center space-x-2">
          <span class="inline-flex items-center text-xs" v-if="totalStats.source === 'busuanzi'">
            <span class="w-2 h-2 bg-purple-400 rounded-full mr-1"></span>
            不蒜子统计
          </span>
          <span class="inline-flex items-center text-xs" v-else>
            <span class="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
            本地统计
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  getRealTimeStats, 
  getTodayStats, 
  getWeeklyStats
} from '../utils/statsService.js'
import { recordPageView, getStatsStatus } from '../utils/hybridStats.js'

const totalStats = ref({
  pv: 0,
  uv: 0,
  timestamp: new Date().toISOString()
})

const todayStats = ref({
  pv: 0,
  uv: 0,
  date: new Date().toISOString().split('T')[0]
})

const weeklyStats = ref([])
const statsStatus = ref({
  localStorage: true,
  googleAnalytics: false,
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

// 格式化日期显示
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const today = new Date()
  const diff = today - date
  
  if (diff < 86400000) { // 1天内
    return '今天'
  } else if (diff < 172800000) { // 2天内
    return '昨天'
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }
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

// 获取柱状图颜色
const getBarColor = (value, index) => {
  const maxValue = Math.max(...weeklyStats.value.map(day => day.pv))
  const normalizedValue = maxValue > 0 ? (value / maxValue) * 10 : 0
  
  if (index <= normalizedValue) {
    return 'bg-blue-500'
  } else {
    return 'bg-gray-200'
  }
}

// 更新统计数据
const updateStats = async () => {
  try {
    totalStats.value = getRealTimeStats()
    todayStats.value = getTodayStats()
    weeklyStats.value = getWeeklyStats()
    statsStatus.value = getStatsStatus()
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
.detailed-stats {
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