// Google Analytics 4 配置
const GA_MEASUREMENT_ID = 'G-MF2CNPVS7M'

// 初始化 GA4
export function initGA() {
  if (typeof window !== 'undefined' && window.gtag) {
    return
  }

  // 添加 GA4 脚本
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  // 初始化 gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href
  })
}

// 页面浏览事件
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