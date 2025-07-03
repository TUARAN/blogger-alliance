// 混合统计服务
// 结合本地存储的实时性和 Google Analytics 的准确性

import { getRealTimeStats, recordPageView as recordLocalPageView } from './statsService.js'
import { trackPageView as trackGAPageView, trackEvent } from './analytics.js'

// 记录页面访问（同时发送到本地存储和 GA）
export function recordPageView(pageTitle = null, pagePath = null) {
  // 记录到本地存储
  const localStats = recordLocalPageView()
  
  // 发送到 Google Analytics
  const title = pageTitle || document.title
  const path = pagePath || window.location.pathname
  trackGAPageView(title, path)
  
  // 记录自定义事件
  trackEvent('page_visit', {
    page_title: title,
    page_path: path,
    timestamp: new Date().toISOString()
  })
  
  return localStats
}

// 获取混合统计数据
export function getHybridStats() {
  const localStats = getRealTimeStats()
  
  return {
    ...localStats,
    source: 'hybrid', // 标识数据来源
    gaEnabled: typeof window !== 'undefined' && !!window.gtag
  }
}

// 记录用户交互事件
export function trackUserInteraction(eventName, parameters = {}) {
  // 发送到 Google Analytics
  trackEvent(eventName, {
    ...parameters,
    timestamp: new Date().toISOString()
  })
  
  // 也可以记录到本地存储（可选）
  console.log('User interaction tracked:', eventName, parameters)
}

// 记录按钮点击
export function trackButtonClick(buttonName, pagePath = null) {
  trackUserInteraction('button_click', {
    button_name: buttonName,
    page_path: pagePath || window.location.pathname
  })
}

// 记录链接点击
export function trackLinkClick(linkText, linkUrl, pagePath = null) {
  trackUserInteraction('link_click', {
    link_text: linkText,
    link_url: linkUrl,
    page_path: pagePath || window.location.pathname
  })
}

// 记录表单提交
export function trackFormSubmit(formName, pagePath = null) {
  trackUserInteraction('form_submit', {
    form_name: formName,
    page_path: pagePath || window.location.pathname
  })
}

// 检查 Google Analytics 是否可用
export function isGAEnabled() {
  return typeof window !== 'undefined' && !!window.gtag
}

// 获取统计状态信息
export function getStatsStatus() {
  return {
    localStorage: true,
    googleAnalytics: isGAEnabled(),
    timestamp: new Date().toISOString()
  }
} 