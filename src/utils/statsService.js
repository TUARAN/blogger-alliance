// 真实访问统计服务
// 使用 localStorage 记录访问数据，结合 Google Analytics 提供真实的 PV/UV 统计
import { busuanziStats } from './busuanzi.js'

const STATS_KEY = 'blogger_alliance_stats'
const VISITOR_KEY = 'blogger_alliance_visitor'

// 获取或初始化统计数据
function getStats() {
  const stats = localStorage.getItem(STATS_KEY)
  if (stats) {
    return JSON.parse(stats)
  }
  
  // 初始化统计数据
  const initialStats = {
    pv: 0,
    uv: 0,
    dailyStats: {},
    lastUpdate: new Date().toISOString()
  }
  localStorage.setItem(STATS_KEY, JSON.stringify(initialStats))
  return initialStats
}

// 保存统计数据
function saveStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats))
}

// 生成访客 ID
function generateVisitorId() {
  return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// 获取访客 ID
function getVisitorId() {
  let visitorId = localStorage.getItem(VISITOR_KEY)
  if (!visitorId) {
    visitorId = generateVisitorId()
    localStorage.setItem(VISITOR_KEY, visitorId)
  }
  return visitorId
}

// 记录页面访问
export function recordPageView() {
  const stats = getStats()
  const visitorId = getVisitorId()
  const today = new Date().toISOString().split('T')[0]
  
  // 增加 PV
  stats.pv++
  
  // 检查是否是新的独立访客
  if (!stats.dailyStats[today]) {
    stats.dailyStats[today] = {
      visitors: [], // 用数组存储
      pv: 0
    }
  }
  
  // 记录今日访问
  if (!stats.dailyStats[today].visitors.includes(visitorId)) {
    stats.dailyStats[today].visitors.push(visitorId)
  }
  stats.dailyStats[today].pv++
  
  // 计算总 UV（去重）
  const allVisitors = new Set()
  Object.values(stats.dailyStats).forEach(day => {
    day.visitors.forEach(visitor => allVisitors.add(visitor))
  })
  stats.uv = allVisitors.size
  
  stats.lastUpdate = new Date().toISOString()
  saveStats(stats)
  
  // 同时发送到 Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    })
  }
  
  return stats
}

// 获取实时统计数据
export function getRealTimeStats() {
  const stats = getStats()
  
  // 如果不蒜子数据已加载，优先使用不蒜子数据作为总数
  if (busuanziStats.sitePv > 0) {
    return {
      pv: busuanziStats.sitePv,
      uv: busuanziStats.siteUv,
      timestamp: new Date().toISOString(),
      source: 'busuanzi'
    }
  }

  return {
    pv: stats.pv,
    uv: stats.uv,
    timestamp: stats.lastUpdate,
    source: 'local'
  }
}

// 获取今日统计数据
export function getTodayStats() {
  const stats = getStats()
  const today = new Date().toISOString().split('T')[0]
  const todayStats = stats.dailyStats[today]
  
  if (todayStats) {
    return {
      pv: todayStats.pv,
      uv: new Set(todayStats.visitors).size,
      date: today
    }
  }
  
  return {
    pv: 0,
    uv: 0,
    date: today
  }
}


// 获取历史统计数据（最近7天）
export function getWeeklyStats() {
  const stats = getStats()
  const weeklyStats = []
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    const dayStats = stats.dailyStats[dateStr]
    
    weeklyStats.push({
      date: dateStr,
      pv: dayStats ? dayStats.pv : 0,
      uv: dayStats ? new Set(dayStats.visitors).size : 0
    })
  }
  
  return weeklyStats
}
