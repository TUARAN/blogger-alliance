import { bloggersData } from '../data/bloggerInfo.js'

// 解析粉丝数量字符串，转换为数字
function parseFollowers(followersStr) {
  if (!followersStr) return 0
  
  // 移除所有空格和加号
  const cleanStr = followersStr.replace(/\s+/g, '').replace(/\+/g, '')
  
  // 检查是否包含K（千）
  if (cleanStr.includes('K') || cleanStr.includes('k')) {
    const num = parseFloat(cleanStr.replace(/[Kk]/g, ''))
    return Math.floor(num * 1000)
  }
  
  // 检查是否包含W（万）
  if (cleanStr.includes('W') || cleanStr.includes('w')) {
    const num = parseFloat(cleanStr.replace(/[Ww]/g, ''))
    return Math.floor(num * 10000)
  }
  
  // 检查是否包含M（百万）
  if (cleanStr.includes('M') || cleanStr.includes('m')) {
    const num = parseFloat(cleanStr.replace(/[Mm]/g, ''))
    return Math.floor(num * 1000000)
  }
  
  // 纯数字
  return parseInt(cleanStr) || 0
}

// 计算所有博主的粉丝总数
export function calculateTotalFollowers() {
  return bloggersData.reduce((total, blogger) => {
    return total + parseFollowers(blogger.followers)
  }, 0)
}

// 格式化粉丝数量显示
export function formatFollowersCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 10000) {
    return (count / 10000).toFixed(1) + 'W'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}

// 获取博主统计信息
export function getBloggerStats() {
  const totalFollowers = calculateTotalFollowers()
  const bloggerCount = bloggersData.length
  
  const computedStats = {
    totalFollowers,
    formattedFollowers: formatFollowersCount(totalFollowers),
    bloggerCount,
    averageFollowers: Math.floor(totalFollowers / Math.max(bloggerCount, 1))
  }

  const manualOverrides = {
    formattedFollowers: '220w',
    totalFollowers: 2200000,
    totalPosts: 300,
    bloggerCount: 30
  }

  const merged = {
    ...computedStats,
    ...manualOverrides
  }

  const finalBloggerCount = manualOverrides.bloggerCount ?? bloggersData.length
  const finalTotalFollowers = manualOverrides.totalFollowers ?? totalFollowers

  return {
    ...merged,
    bloggerCount: finalBloggerCount,
    averageFollowers: Math.floor(finalTotalFollowers / Math.max(finalBloggerCount, 1))
  }
}

// Google Analytics 相关函数
export function trackPageView(pageTitle, pagePath) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pagePath
    })
  }
}

// 自定义事件
export function trackEvent(eventName, parameters = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// 获取实时访问数据（通过 GA4 API）
export async function getRealTimeStats() {
  // 注意：这需要 GA4 API 访问权限和认证
  // 这里提供一个模拟的实现，实际使用时需要配置 GA4 API
  try {
    // 模拟数据，实际应该从 GA4 API 获取
    return {
      pv: Math.floor(Math.random() * 1000) + 500, // 模拟 PV 数据
      uv: Math.floor(Math.random() * 200) + 100,  // 模拟 UV 数据
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
    return {
      pv: 0,
      uv: 0,
      timestamp: new Date().toISOString()
    }
  }
} 