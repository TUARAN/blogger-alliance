// 单一统计模块：博主聚合数据 + 实时流量（localStorage / 不蒜子）+ GA 事件
// 历史拆分的 analytics.js / hybridStats.js / statsService.js 已合并到此文件

import { bloggersData } from '../data/bloggerInfo.js'
import { busuanziStats } from './busuanzi.js'

// 累计投放推文，非数据可推导，作为业务指标手动维护
const TOTAL_POSTS = 300

/** 单条合作推广内容在全平台的保守触达人次估算（含推荐流曝光+阅读，非「去重人数」） */
const EST_AVG_IMPRESSIONS_PER_POST = 22000

function formatExposureImpressions(count) {
  if (count >= 100_000_000) {
    const yi = count / 100_000_000
    return yi >= 10 ? `${Math.round(yi)}亿` : `${yi.toFixed(1).replace(/\.0$/, '')}亿`
  }
  if (count >= 10_000) {
    const wan = count / 10_000
    return wan >= 100 ? `${Math.round(wan)}万` : `${wan.toFixed(0)}万`
  }
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`
  return String(Math.round(count))
}

// ---------- 博主聚合数据 ----------

function parseFollowers(followersStr) {
  if (!followersStr) return 0
  const clean = followersStr.replace(/\s+/g, '').replace(/\+/g, '')
  if (/[Kk]/.test(clean)) return Math.floor(parseFloat(clean.replace(/[Kk]/g, '')) * 1000)
  if (/[Ww]/.test(clean)) return Math.floor(parseFloat(clean.replace(/[Ww]/g, '')) * 10000)
  if (/[Mm]/.test(clean)) return Math.floor(parseFloat(clean.replace(/[Mm]/g, '')) * 1000000)
  return parseInt(clean) || 0
}

function formatFollowersCount(count) {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + 'M'
  if (count >= 10_000) return (count / 10_000).toFixed(1) + 'W'
  if (count >= 1_000) return (count / 1_000).toFixed(1) + 'K'
  return String(count)
}

export function getBloggerStats() {
  const totalFollowers = bloggersData.reduce((sum, b) => sum + parseFollowers(b.followers), 0)
  const bloggerCount = bloggersData.length
  const estimatedExposureImpressions = TOTAL_POSTS * EST_AVG_IMPRESSIONS_PER_POST
  return {
    totalFollowers,
    formattedFollowers: formatFollowersCount(totalFollowers),
    bloggerCount,
    averageFollowers: Math.floor(totalFollowers / Math.max(bloggerCount, 1)),
    totalPosts: TOTAL_POSTS,
    estimatedExposureImpressions,
    formattedExposure: formatExposureImpressions(estimatedExposureImpressions)
  }
}

// ---------- 实时流量统计 ----------

const STATS_KEY = 'blogger_alliance_stats'
const VISITOR_KEY = 'blogger_alliance_visitor'

function readLocalStats() {
  const raw = localStorage.getItem(STATS_KEY)
  if (raw) return JSON.parse(raw)
  const init = { pv: 0, uv: 0, dailyStats: {}, lastUpdate: new Date().toISOString() }
  localStorage.setItem(STATS_KEY, JSON.stringify(init))
  return init
}

function getVisitorId() {
  let id = localStorage.getItem(VISITOR_KEY)
  if (!id) {
    id = `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
    localStorage.setItem(VISITOR_KEY, id)
  }
  return id
}

function sendGAEvent(name, params) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}

export function recordPageView() {
  const stats = readLocalStats()
  const visitorId = getVisitorId()
  const today = new Date().toISOString().split('T')[0]

  stats.pv++
  if (!stats.dailyStats[today]) stats.dailyStats[today] = { visitors: [], pv: 0 }
  if (!stats.dailyStats[today].visitors.includes(visitorId)) {
    stats.dailyStats[today].visitors.push(visitorId)
  }
  stats.dailyStats[today].pv++

  const allVisitors = new Set()
  Object.values(stats.dailyStats).forEach((d) => d.visitors.forEach((v) => allVisitors.add(v)))
  stats.uv = allVisitors.size
  stats.lastUpdate = new Date().toISOString()
  localStorage.setItem(STATS_KEY, JSON.stringify(stats))

  sendGAEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname
  })
}

export function getRealTimeStats() {
  const local = readLocalStats()
  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'

  if (isLocalhost) {
    return {
      pv: local.pv,
      uv: local.uv,
      pagePv: 0,
      timestamp: local.lastUpdate,
      source: 'local',
      loading: false
    }
  }

  if (busuanziStats.sitePv > 0) {
    return {
      pv: busuanziStats.sitePv,
      uv: busuanziStats.siteUv,
      pagePv: busuanziStats.pagePv,
      timestamp: new Date().toISOString(),
      source: 'busuanzi',
      loading: busuanziStats.loading
    }
  }

  return {
    pv: local.pv,
    uv: local.uv,
    pagePv: 0,
    timestamp: local.lastUpdate,
    source: 'local',
    loading: false
  }
}

// ---------- GA 事件 ----------

export function trackLinkClick(linkText, linkUrl, pagePath = null) {
  sendGAEvent('link_click', {
    link_text: linkText,
    link_url: linkUrl,
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    timestamp: new Date().toISOString()
  })
}
