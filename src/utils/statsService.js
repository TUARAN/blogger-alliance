// 真实访问统计服务
// 使用 localStorage 来记录访问数据，模拟真实的 PV/UV 统计

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
      visitors: new Set(),
      pv: 0
    }
  }
  
  // 记录今日访问
  stats.dailyStats[today].visitors.add(visitorId)
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
  return {
    pv: stats.pv,
    uv: stats.uv,
    timestamp: stats.lastUpdate
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
      uv: todayStats.visitors.size,
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
      uv: dayStats ? dayStats.visitors.size : 0
    })
  }
  
  return weeklyStats
}

// 模拟一些初始数据（可选）
export function initializeWithMockData() {
  const stats = getStats()
  
  // 如果已经有数据，不覆盖
  if (stats.pv > 0) {
    return
  }
  
  // 生成一些模拟的历史数据
  const mockData = {
    pv: 1250,
    uv: 180,
    dailyStats: {},
    lastUpdate: new Date().toISOString()
  }
  
  // 生成最近7天的模拟数据
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    const dailyPV = Math.floor(Math.random() * 200) + 50
    const dailyUV = Math.floor(Math.random() * 30) + 10
    
    mockData.dailyStats[dateStr] = {
      pv: dailyPV,
      visitors: new Set()
    }
    
    // 生成一些模拟访客
    for (let j = 0; j < dailyUV; j++) {
      mockData.dailyStats[dateStr].visitors.add(`visitor_${dateStr}_${j}`)
    }
  }
  
  localStorage.setItem(STATS_KEY, JSON.stringify(mockData))
} 