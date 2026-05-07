<script setup>
import { computed, ref } from 'vue'
import { matrixAllianceBloggers } from '../../data/matrixAlliance.js'

const bloggers = matrixAllianceBloggers
const selectedBloggerId = ref('tuaran')
const chartColors = ['#111827', '#2563eb', '#14b8a6', '#f97316', '#8b5cf6', '#ef4444', '#22c55e', '#f59e0b']

const platformCatalog = [
  {
    key: 'media',
    title: '媒体平台',
    items: [
      { platform: '公众号', label: '微信公众号', iconText: '微', iconClass: 'bg-emerald-50 text-emerald-700 border-emerald-200', fallback: '待更新' },
      { platform: '知乎', label: '知乎', iconText: '知', iconClass: 'bg-sky-50 text-sky-700 border-sky-200', fallback: '待更新' },
      { platform: '网易号', label: '网易号', iconText: '网', iconClass: 'bg-rose-50 text-rose-700 border-rose-200', fallback: '待更新' },
      { platform: '微博', label: '微博头条', iconText: '微', iconClass: 'bg-red-50 text-red-700 border-red-200', fallback: '待更新' },
      { platform: '少数派', label: '少数派', iconText: 'π', iconClass: 'bg-neutral-100 text-neutral-700 border-neutral-200', fallback: '待更新' },
      { platform: '抖音', label: '抖音文章', iconText: '抖', iconClass: 'bg-neutral-900 text-white border-neutral-800', fallback: '待更新' },
      { platform: '头条', label: '今日头条', iconText: '头', iconClass: 'bg-red-50 text-red-700 border-red-200', fallback: '待更新' },
      { platform: '百家号', label: '百家号', iconText: '百', iconClass: 'bg-indigo-50 text-indigo-700 border-indigo-200', fallback: '待更新' },
      { platform: '搜狐号', label: '搜狐号', iconText: '狐', iconClass: 'bg-amber-50 text-amber-700 border-amber-200', fallback: '待更新' },
      { platform: 'B站', label: 'B站专栏', iconText: 'B', iconClass: 'bg-cyan-50 text-cyan-700 border-cyan-200', fallback: '待更新' },
      { platform: 'Twitter', label: 'Twitter Articles', iconText: 'X', iconClass: 'bg-neutral-900 text-white border-neutral-800', fallback: '检测中' },
      { platform: '小红书', label: '小红书', iconText: '红', iconClass: 'bg-pink-50 text-pink-700 border-pink-200', fallback: '待更新' }
    ]
  },
  {
    key: 'blog',
    title: '博客平台',
    items: [
      { platform: 'CSDN', label: 'CSDN', iconText: 'C', iconClass: 'bg-orange-50 text-orange-700 border-orange-200', fallback: '待更新' },
      { platform: '掘金', label: '掘金', iconText: '掘', iconClass: 'bg-blue-50 text-blue-700 border-blue-200', fallback: '待更新' },
      { platform: '51CTO', label: '51CTO', iconText: '51', iconClass: 'bg-rose-50 text-rose-700 border-rose-200', fallback: '待更新' },
      { platform: '开源中国', label: '开源中国', iconText: '开', iconClass: 'bg-green-50 text-green-700 border-green-200', fallback: '待更新' },
      { platform: '简书', label: '简书', iconText: '简', iconClass: 'bg-orange-50 text-orange-700 border-orange-200', fallback: '待更新' },
      { platform: '博客园', label: '博客园', iconText: '园', iconClass: 'bg-sky-50 text-sky-700 border-sky-200', fallback: '待更新' },
      { platform: 'Medium', label: 'Medium', iconText: 'M', iconClass: 'bg-neutral-900 text-white border-neutral-800', fallback: '检测中' },
      { platform: '思否', label: '思否', iconText: '思', iconClass: 'bg-green-50 text-green-700 border-green-200', fallback: '待更新' },
      { platform: 'InfoQ', label: 'InfoQ', iconText: 'I', iconClass: 'bg-emerald-50 text-emerald-700 border-emerald-200', fallback: '待更新' }
    ]
  },
  {
    key: 'cloud',
    title: '云平台及开发者社区',
    items: [
      { platform: '腾讯云开发者社区', label: '腾讯云开发者社区', iconText: '腾', iconClass: 'bg-sky-50 text-sky-700 border-sky-200', fallback: '待更新' },
      { platform: '华为云开发者博客', label: '华为云开发者博客', iconText: '华', iconClass: 'bg-rose-50 text-rose-700 border-rose-200', fallback: '待更新' },
      { platform: '百度云千帆', label: '百度云千帆', iconText: '百', iconClass: 'bg-blue-50 text-blue-700 border-blue-200', fallback: '待更新' },
      { platform: 'ModelScope', label: 'ModelScope 魔搭社区', iconText: '魔', iconClass: 'bg-violet-50 text-violet-700 border-violet-200', fallback: '待更新' },
      { platform: '电子发烧友', label: '电子发烧友', iconText: '电', iconClass: 'bg-amber-50 text-amber-700 border-amber-200', fallback: '待更新' },
      { platform: '阿里云开发者社区', label: '阿里云开发者社区', iconText: '阿', iconClass: 'bg-orange-50 text-orange-700 border-orange-200', fallback: '待更新' },
      { platform: '华为开发者文章', label: '华为开发者文章', iconText: '华', iconClass: 'bg-rose-50 text-rose-700 border-rose-200', fallback: '待更新' },
      { platform: '支付宝开放平台', label: '支付宝开放平台', iconText: '支', iconClass: 'bg-blue-50 text-blue-700 border-blue-200', fallback: '待更新' },
      { platform: '火山引擎开发者社区', label: '火山引擎开发者社区', iconText: '火', iconClass: 'bg-cyan-50 text-cyan-700 border-cyan-200', fallback: '待更新' }
    ]
  }
]

const currentBlogger = computed(() => {
  return bloggers.find((item) => item.id === selectedBloggerId.value) || bloggers[0] || null
})

const currentPlatformMap = computed(() => {
  if (!currentBlogger.value) return new Map()

  const platformEntries = currentBlogger.value.accounts.flatMap((account) => {
    return account.platforms.map((platform) => ({
      ...platform,
      accountName: account.name,
      handle: account.handle
    }))
  })

  return new Map(platformEntries.map((item) => [item.platform, item]))
})

const currentMatrixAccountCount = computed(() => {
  return currentBlogger.value?.accounts?.length || 0
})

const currentActivePlatformCount = computed(() => {
  return currentPlatformMap.value.size
})

const groupedPlatforms = computed(() => {
  return platformCatalog.map((group) => {
    const items = group.items.map((item) => {
      const matched = currentPlatformMap.value.get(item.platform)

      return {
        ...item,
        checked: Boolean(matched),
        accountName: matched?.accountName || '',
        handle: matched?.handle ? `@${matched.handle}` : item.fallback,
        link: matched?.link || '',
        reads: matched?.reads || 0,
        followers: matched?.followers || 0
      }
    })

    return {
      ...group,
      items,
      checkedCount: items.filter((item) => item.checked).length
    }
  })
})

const selectedPlatformCount = computed(() => {
  return groupedPlatforms.value.reduce((total, group) => total + group.checkedCount, 0)
})

const selectedPlatformsLabel = computed(() => {
  return `媒体平台（${selectedPlatformCount.value}）`
})

const accountShare = computed(() => {
  if (!currentBlogger.value) return []

  const total = currentBlogger.value.overview.totalFollowers || 1

  return currentBlogger.value.accounts.map((account, index) => ({
    name: account.name,
    followers: account.subtotal.followers,
    reads: account.subtotal.reads,
    percent: ((account.subtotal.followers / total) * 100).toFixed(1),
    color: chartColors[index % chartColors.length]
  }))
})

const pieStyle = computed(() => {
  if (!accountShare.value.length) {
    return { background: '#e5e7eb' }
  }

  let start = 0
  const segments = accountShare.value.map((item) => {
    const end = start + Number(item.percent)
    const segment = `${item.color} ${start}% ${end}%`
    start = end
    return segment
  })

  return {
    background: `conic-gradient(${segments.join(', ')})`
  }
})

const platformBars = computed(() => {
  if (!currentBlogger.value) return []

  const merged = currentBlogger.value.accounts
    .flatMap((account) => account.platforms)
    .reduce((acc, item) => {
      if (!acc[item.platform]) {
        acc[item.platform] = {
          platform: item.platform,
          reads: 0,
          followers: 0
        }
      }

      acc[item.platform].reads += item.reads || 0
      acc[item.platform].followers += item.followers || 0
      return acc
    }, {})

  const rows = Object.values(merged)
    .sort((a, b) => b.reads - a.reads)
    .slice(0, 8)

  const maxReads = rows[0]?.reads || 1

  return rows.map((item, index) => ({
    ...item,
    width: `${Math.max((item.reads / maxReads) * 100, 8)}%`,
    color: chartColors[index % chartColors.length]
  }))
})

function formatNumber(value) {
  return Number(value || 0).toLocaleString('zh-CN')
}
</script>

<template>
  <div class="min-h-screen bg-[#f6f7f8]">
    <AppNav />

    <main class="max-w-[1440px] mx-auto px-4 py-5 sm:px-6 lg:px-8">
      <section class="rounded-[24px] border border-gray-200 bg-white px-6 py-6 md:px-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div class="text-[14px] font-medium uppercase tracking-[0.18em] text-gray-400">Matrix Board</div>
            <h1 class="mt-2 text-[30px] leading-none font-bold tracking-tight text-[#111827]">矩阵看板</h1>
            <p class="mt-3 text-[15px] text-gray-500">按博主查看矩阵账号分布、平台覆盖和核心数据表现。</p>
          </div>

          <div class="flex flex-col items-start gap-3 md:items-end">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-sm text-gray-500">矩阵账号：</span>
              <button
                v-for="blogger in bloggers"
                :key="blogger.id"
                class="rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors"
                :class="selectedBloggerId === blogger.id
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900'"
                @click="selectedBloggerId = blogger.id"
              >
                {{ blogger.name }}
              </button>
            </div>

            <div v-if="currentBlogger" class="rounded-2xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm text-gray-600">
              已接入 <span class="font-bold text-gray-900">{{ currentMatrixAccountCount }}</span> 个矩阵账号，
              覆盖 <span class="font-bold text-gray-900">{{ currentActivePlatformCount }}</span> 个活跃平台
            </div>
          </div>
        </div>

        <section v-if="currentBlogger" class="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-[0.88fr_1.12fr]">
          <article class="rounded-[22px] border border-gray-200 bg-[#fafafa] p-5">
            <div class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-lg font-semibold text-[#111827]">矩阵账号占比</h2>
                <p class="mt-1 text-sm text-gray-500">按账号粉丝规模分布</p>
              </div>
              <div class="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500">
                粉丝口径
              </div>
            </div>

            <div class="mt-6 flex flex-col items-center gap-6 lg:flex-row lg:items-start">
              <div class="relative h-52 w-52 shrink-0 rounded-full" :style="pieStyle">
                <div class="absolute inset-[18%] flex items-center justify-center rounded-full bg-white text-center border border-gray-100">
                  <div>
                    <div class="text-[11px] uppercase tracking-[0.2em] text-gray-400">Total</div>
                    <div class="mt-2 text-2xl font-bold text-[#111827]">
                      {{ formatNumber(currentBlogger.overview.totalFollowers) }}
                    </div>
                    <div class="mt-1 text-xs text-gray-400">全网粉丝</div>
                  </div>
                </div>
              </div>

              <div class="w-full space-y-3">
                <div
                  v-for="item in accountShare"
                  :key="item.name"
                  class="rounded-2xl border border-gray-200 bg-white px-4 py-3"
                >
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: item.color }"></span>
                      <span class="text-sm font-medium text-[#111827]">{{ item.name }}</span>
                    </div>
                    <span class="text-sm font-medium text-gray-500">{{ item.percent }}%</span>
                  </div>
                  <div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span>粉丝 {{ formatNumber(item.followers) }}</span>
                    <span>阅读 {{ formatNumber(item.reads) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article class="rounded-[22px] border border-gray-200 bg-[#fafafa] p-5">
            <div class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-lg font-semibold text-[#111827]">平台阅读柱状图</h2>
                <p class="mt-1 text-sm text-gray-500">按平台汇总阅读表现</p>
              </div>
              <div class="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500">
                TOP {{ platformBars.length }}
              </div>
            </div>

            <div class="mt-6 space-y-4">
              <div
                v-for="item in platformBars"
                :key="item.platform"
                class="grid grid-cols-[92px_1fr_auto] items-center gap-3"
              >
                <div class="text-sm font-medium text-gray-600">{{ item.platform }}</div>
                <div class="h-10 rounded-2xl bg-white border border-gray-200 p-1">
                  <div
                    class="flex h-full items-center rounded-xl px-3 text-xs font-semibold text-white transition-all"
                    :style="{ width: item.width, backgroundColor: item.color }"
                  >
                    {{ formatNumber(item.reads) }}
                  </div>
                </div>
                <div class="text-xs text-gray-400">粉丝 {{ formatNumber(item.followers) }}</div>
              </div>
            </div>
          </article>
        </section>

        <div class="mt-8 flex flex-wrap items-center gap-5 text-[16px] font-semibold text-gray-500">
          <div class="text-gray-900">平台矩阵</div>
          <div class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-[#fafafa] px-3 py-1.5 text-sm font-medium text-gray-500">
            <span>{{ selectedPlatformsLabel }}</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
          <section
            v-for="group in groupedPlatforms"
            :key="group.key"
            class="rounded-[22px] border border-gray-200 bg-[#fafafa] p-4"
          >
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3 text-[17px] font-semibold">
              <div class="text-gray-700">
                {{ group.title }}（{{ group.items.length }}）
              </div>
              <div class="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
                <span class="text-base font-extrabold tracking-tight text-emerald-700">
                  {{ group.checkedCount }}/{{ group.items.length }}
                </span>
              </div>
            </div>

            <div class="mt-4 space-y-1.5">
              <article
                v-for="item in group.items"
                :key="`${group.key}-${item.platform}`"
                class="flex min-h-[56px] items-center gap-3 rounded-2xl bg-white px-3 py-2"
              >
                <div
                  class="h-2.5 w-2.5 shrink-0 rounded-full"
                  :class="item.checked ? 'bg-emerald-500' : 'bg-gray-200'"
                >
                </div>

                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-[15px] font-semibold"
                  :class="item.iconClass"
                >
                  {{ item.iconText }}
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <div class="text-[18px] font-bold text-[#111827]">{{ item.label }}</div>
                    <div
                      v-if="item.checked"
                      class="inline-flex items-center gap-2 text-[15px] text-gray-500"
                    >
                      <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[13px] font-semibold text-gray-700">
                        {{ item.accountName.slice(0, 1) || '号' }}
                      </span>
                      <a
                        v-if="item.link"
                        :href="item.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="truncate hover:text-indigo-700"
                      >
                        {{ item.accountName }}
                      </a>
                      <span v-else>{{ item.accountName }}</span>
                    </div>
                    <div
                      v-else
                      class="text-[15px] text-gray-400"
                    >
                      {{ item.handle }}
                    </div>
                  </div>

                  <div
                    v-if="item.checked"
                    class="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-400"
                  >
                    <span>{{ item.handle }}</span>
                    <span>阅读 {{ formatNumber(item.reads) }}</span>
                    <span>粉丝 {{ formatNumber(item.followers) }}</span>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>

      </section>
    </main>
  </div>
</template>
