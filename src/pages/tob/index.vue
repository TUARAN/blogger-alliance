<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <AppNav logo-to="/" />

    <!-- Hero 区域 -->
    <section class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-14 lg:pb-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span class="block mb-6">博主联盟</span>
            <span class="relative inline-block">
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                连接 AI 产品与技术影响力
              </span>
            </span>
          </h1>
          <p class="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            我们聚合一批专业技术博主，把技术品牌带到开发者 / AI 爱好者 / 科技爱好者真正会讨论的地方，并持续沉淀真实有效的 GEO 结果
            <span class="mt-3 inline-flex flex-wrap items-center justify-center gap-4">
              <router-link
                to="/ecosystem"
                class="inline-flex items-center gap-1 text-sm md:text-base font-medium text-indigo-700 transition-colors hover:text-indigo-800"
              >
                <span class="leading-none no-underline">📍</span>
                <span class="underline decoration-indigo-300 underline-offset-4 hover:decoration-indigo-500">生态定位</span>
              </router-link>
              <router-link
                to="/why-us"
                class="inline-flex items-center gap-1 text-sm md:text-base font-medium text-indigo-700 transition-colors hover:text-indigo-800"
              >
                <span class="leading-none no-underline">✨</span>
                <span class="underline decoration-indigo-300 underline-offset-4 hover:decoration-indigo-500">为什么选择博主联盟？</span>
              </router-link>
            </span>
          </p>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div class="text-center">
              <div class="text-3xl font-bold text-indigo-600 mb-2">{{ bloggerStats.bloggerCount }} 位+</div>
              <div class="text-gray-600">技术博主</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-600 mb-2">{{ bloggerStats.formattedFollowers }}+</div>
              <div class="text-gray-600">覆盖程序员 / 科技粉丝</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">{{ bloggerStats.totalPosts }} 篇+</div>
              <div class="text-gray-600">累计投放推文</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-orange-600 mb-2">20 个+</div>
              <div class="text-gray-600">辐射社群</div>
            </div>
          </div>

          <div class="mt-12 max-w-4xl mx-auto">
            <div class="mb-6 flex items-center justify-center">
              <div class="flex flex-wrap items-center justify-center gap-3">
                <router-link
                  to="/cases"
                  class="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-bold text-indigo-700 bg-white border border-indigo-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span class="text-base leading-none">📘</span>
                  <span>案例介绍</span>
                </router-link>

                <router-link
                  to="/tob/services"
                  class="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-extrabold text-white bg-gradient-to-r from-indigo-600 to-purple-600 border border-indigo-400/30 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <span class="text-base leading-none">🔥</span>
                  <span>我要合作</span>
                  <span class="text-base leading-none transition-transform group-hover:translate-x-1">→</span>
                  <span class="pointer-events-none absolute right-0 top-0 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                    进入服务介绍
                  </span>
                </router-link>
              </div>
            </div>
            <h3 class="mb-4 text-center text-sm md:text-base font-semibold text-gray-600">已合作品牌</h3>
            <BrandMarquee />
          </div>
        </div>
      </div>

      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div class="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div class="absolute bottom-20 left-20 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>
    </section>

    <!-- 博主团队展示 -->
    <section id="blogger-team" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <div class="text-center mb-10">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">我们的博主团队名单</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          专业的技术博主团队，覆盖前端、后端、AI、移动开发等多个技术领域
          <a href="#join-cta" class="ml-2 inline-flex items-center gap-1 text-indigo-600 font-medium hover:text-indigo-800 hover:underline underline-offset-4">
            <span>持续招募中</span>
            <span aria-hidden="true">↘</span>
          </a>
        </p>
      </div>

      <BloggerControls
        v-model:viewMode="viewMode"
        v-model:selectedPlatform="selectedPlatform"
        v-model:sortField="sortField"
        v-model:sortOrder="sortOrder"
        :available-platforms="availablePlatforms"
        :roster-file="bloggerRosterFile"
        @copy-table="copyTableToClipboard"
      />

      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <BloggerCard
          v-for="blogger in filteredAndSortedBloggers"
          :key="blogger.id"
          :blogger="blogger"
          :expanded="expandedBloggers.includes(blogger.id)"
          :is-kol="isKOL(blogger.followers)"
          :is-koc="isKOC(blogger.followers)"
          :has-only-one-platform="hasOnlyOnePlatform(blogger)"
          :fallback-avatar="getFallbackAvatar(blogger.name)"
          @toggle-expanded="toggleExpanded"
          @link-click="handleLinkEvent"
          @request-platforms="openMoreDataModal"
          @avatar-error="handleAvatarError"
        />
      </div>

      <BloggerTable
        v-else
        :bloggers="filteredAndSortedBloggers"
        :available-platforms="availablePlatforms"
        :fallback-avatar-for="getFallbackAvatar"
        :has-only-one-platform="hasOnlyOnePlatform"
        :get-account-by-platform="getAccountByPlatform"
        @link-click="handleLinkEvent"
        @request-platforms="openMoreDataModal"
        @avatar-error="handleAvatarError"
      />
    </section>

    <!-- 底部 CTA -->
    <section id="join-cta" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="relative overflow-hidden rounded-[28px] border border-amber-200 bg-[linear-gradient(135deg,#fffdf7_0%,#fff7ed_48%,#fffefb_100%)] px-6 py-6 shadow-[0_20px_60px_rgba(120,53,15,0.08)] md:px-8">
        <div class="absolute right-6 top-5 rotate-6 text-2xl opacity-70">✉️</div>
        <div class="max-w-3xl">
          <div class="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700/80">To Builders</div>
          <div class="mt-2 text-sm font-medium text-amber-800">致程序员 / 技术博主 / 大学生 / AI 爱好者</div>
          <p class="mt-4 text-sm leading-7 text-gray-700 md:text-base">
            如果你也想一起共创内容、尝试做 AI 项目、打磨开发者工具，或者用兼职方式参与真实合作，欢迎来和我们聊聊。这里既欢迎长期深度协作，也欢迎从一次内容共创、一次项目尝试开始。
          </p>
        </div>
        <div class="mt-5">
          <a
            href="https://github.com/TUARAN/blogger-alliance"
            target="_blank"
            class="inline-flex items-center rounded-full border border-amber-300 bg-white/90 px-4 py-2 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-50"
          >
            <span class="mr-2">🤝</span>
            加入博主联盟
          </a>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-center text-xs text-gray-500">
      <span v-if="trafficStats.loading">流量统计加载中...</span>
      <span v-else>总PV {{ trafficStats.pv }} · 总UV {{ trafficStats.uv }} · 本页PV {{ trafficStats.pagePv }}</span>
    </div>

    <QrCorner />

    <div v-if="moreDataModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40" @click="closeMoreDataModal"></div>
      <div class="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
        <div class="text-base font-semibold text-gray-900 mb-2">提示</div>
        <div class="text-sm text-gray-600 leading-relaxed">
          该博主尚未补全其他平台主页链接。补齐后即可展示更完整的影响力画像与覆盖人数。
        </div>
        <div class="mt-5 flex justify-end">
          <button
            type="button"
            class="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
            @click="closeMoreDataModal"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { bloggersData, cooperationHeatOrder } from '../../data/bloggerInfo.js'
import { trackLinkClick } from '../../utils/hybridStats.js'
import { getBloggerStats } from '../../utils/analytics.js'
import { getRealTimeStats, recordPageView } from '../../utils/statsService.js'
import bloggerRosterFile from '../../data/博主联盟花名册v20260106.xlsx?url'
import BrandMarquee from '../../components/BrandMarquee.vue'
import BloggerCard from '../../components/BloggerCard.vue'
import BloggerTable from '../../components/BloggerTable.vue'
import BloggerControls from '../../components/BloggerControls.vue'
import QrCorner from '../../components/QrCorner.vue'

const expandedBloggers = ref([])
const bloggerStats = ref(getBloggerStats())
const trafficStats = computed(() => getRealTimeStats())

const moreDataModalOpen = ref(false)
const openMoreDataModal = () => { moreDataModalOpen.value = true }
const closeMoreDataModal = () => { moreDataModalOpen.value = false }

const hasOnlyOnePlatform = (blogger) => (blogger?.socialAccounts?.length ?? 0) === 1

const avatarPalette = [
  ['#E0EAFF', '#6D28D9'],
  ['#DFF6F3', '#0F766E'],
  ['#FFE7D6', '#C2410C'],
  ['#FDE7F3', '#BE185D'],
  ['#E9F7D9', '#3F6212']
]

const getInitials = (name = '') => {
  const compact = String(name).trim().replace(/\s+/g, '')
  if (!compact) return '博'
  return compact.slice(0, Math.min(2, compact.length))
}

const getFallbackAvatar = (name = '') => {
  const initials = getInitials(name)
  const seed = Array.from(String(name)).reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const [bgColor, textColor] = avatarPalette[seed % avatarPalette.length]
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="48" fill="${bgColor}" />
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="${textColor}" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif" font-size="34" font-weight="700">${initials}</text>
    </svg>
  `
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const handleAvatarError = (event) => {
  const target = event?.target
  if (!(target instanceof HTMLImageElement)) return
  const fallback = target.dataset.fallbackAvatar || getFallbackAvatar(target.alt)
  if (target.src === fallback) return
  target.src = fallback
}

const parseFollowersValue = (followersStr) => {
  if (!followersStr) return 0
  const clean = followersStr.replace(/\s+/g, '').replace(/\+/g, '').toUpperCase()

  if (clean.includes('K')) {
    const num = parseFloat(clean.replace('K', ''))
    return Number.isNaN(num) ? 0 : num * 1000
  }
  if (clean.includes('W')) {
    const num = parseFloat(clean.replace('W', ''))
    return Number.isNaN(num) ? 0 : num * 10000
  }
  if (clean.includes('M')) {
    const num = parseFloat(clean.replace('M', ''))
    return Number.isNaN(num) ? 0 : num * 1000000
  }
  const num = parseFloat(clean)
  return Number.isNaN(num) ? 0 : num
}

const KOL_THRESHOLD = 5000
const isKOL = (followersStr) => parseFollowersValue(followersStr) > KOL_THRESHOLD
const isKOC = (followersStr) => {
  const value = parseFollowersValue(followersStr)
  return value > 0 && value <= KOL_THRESHOLD
}

const hasExplicitAvatar = (blogger) => {
  const avatar = blogger?.avatar
  if (typeof avatar !== 'string') return false
  const trimmed = avatar.trim()
  if (!trimmed) return false
  return !trimmed.includes('dicebear.com')
}

const toggleExpanded = (bloggerId) => {
  const index = expandedBloggers.value.indexOf(bloggerId)
  if (index > -1) {
    expandedBloggers.value.splice(index, 1)
  } else {
    expandedBloggers.value.push(bloggerId)
  }
}

const handleLinkEvent = ({ platform, url, bloggerName }) => {
  trackLinkClick(`${bloggerName}-${platform}`, url, '/tob')
}

// --- 列表/表格视图与筛选排序逻辑 ---
const viewMode = ref('grid')
const selectedPlatform = ref('all')
const sortField = ref('cooperationHeat')
const sortOrder = ref('desc')

const bloggerOrderIndex = new Map(bloggersData.map((b, i) => [b.id, i]))
const getBloggerOriginalIndex = (b) => bloggerOrderIndex.get(b.id) ?? Number.MAX_SAFE_INTEGER

const getCooperationHeatPriority = (blogger) => {
  const idx = cooperationHeatOrder.findIndex((kw) => blogger.name.includes(kw))
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx
}

const compareByRecommendedOrder = (a, b) => {
  const hasA = hasExplicitAvatar(a)
  const hasB = hasExplicitAvatar(b)
  if (hasA !== hasB) return hasA ? -1 : 1

  if (hasA && hasB) {
    const tierA = isKOL(a.followers) ? 0 : isKOC(a.followers) ? 1 : 2
    const tierB = isKOL(b.followers) ? 0 : isKOC(b.followers) ? 1 : 2
    if (tierA !== tierB) return tierA - tierB
    return getBloggerOriginalIndex(a) - getBloggerOriginalIndex(b)
  }

  const followersDiff = parseFollowersValue(b.followers) - parseFollowersValue(a.followers)
  if (followersDiff !== 0) return followersDiff
  return getBloggerOriginalIndex(a) - getBloggerOriginalIndex(b)
}

const staticPlatforms = ['掘金', 'GitHub', 'CSDN', '知乎', '微信公众号']

const availablePlatforms = computed(() => {
  const platforms = new Set()
  bloggersData.forEach((blogger) => {
    blogger.socialAccounts.forEach((acc) => {
      let p = acc.platform
      if (p.includes('微信公众号')) p = '微信公众号'
      if (p.includes('腾讯云')) p = '腾讯云'
      platforms.add(p)
    })
  })
  return Array.from(platforms).sort((a, b) => {
    const idxA = staticPlatforms.indexOf(a)
    const idxB = staticPlatforms.indexOf(b)
    if (idxA !== -1 && idxB !== -1) return idxA - idxB
    if (idxA !== -1) return -1
    if (idxB !== -1) return 1
    return a.localeCompare(b)
  })
})

const getAccountByPlatform = (blogger, platformName) => {
  return blogger.socialAccounts.find((acc) => {
    if (platformName === '微信公众号') return acc.platform.includes('微信公众号')
    if (platformName === '腾讯云') return acc.platform.includes('腾讯云')
    return acc.platform === platformName
  })
}

const copyTableToClipboard = () => {
  const headers = ['博主姓名', '粉丝基数', '擅长领域', '个人简介', ...availablePlatforms.value]

  const rows = filteredAndSortedBloggers.value.map((blogger) => {
    const rowData = [
      blogger.name,
      blogger.followers,
      blogger.expandedContent.specialties.join(', '),
      blogger.introduction.replace(/\n|\r/g, ' ')
    ]
    availablePlatforms.value.forEach((p) => {
      const acc = getAccountByPlatform(blogger, p)
      rowData.push(acc ? acc.url : '-')
    })
    return rowData.join('\t')
  })

  const finalContent = `${headers.join('\t')}\n${rows.join('\n')}`

  navigator.clipboard
    .writeText(finalContent)
    .then(() => alert('✅ 表格数据已复制！\n\n您现在可以直接在 Excel、飞书或 Notion 中粘贴。'))
    .catch(() => alert('复制失败，请重试'))
}

const filteredAndSortedBloggers = computed(() => {
  let result = [...bloggersData]

  if (selectedPlatform.value !== 'all') {
    result = result.filter((blogger) => getAccountByPlatform(blogger, selectedPlatform.value))
  }

  if (sortField.value === 'cooperationHeat') {
    result.sort((a, b) => {
      const priorityA = getCooperationHeatPriority(a)
      const priorityB = getCooperationHeatPriority(b)
      if (priorityA !== priorityB) return priorityA - priorityB
      return compareByRecommendedOrder(a, b)
    })
  } else if (sortField.value === 'recommended') {
    result.sort(compareByRecommendedOrder)
  } else if (sortField.value === 'followers') {
    result.sort((a, b) => {
      const valA = parseFollowersValue(a.followers)
      const valB = parseFollowersValue(b.followers)
      if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1
      if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return result
})

onMounted(() => {
  recordPageView()
})
</script>
