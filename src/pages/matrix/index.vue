<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 gap-4">
          <div class="flex items-center">
            <router-link to="/tob" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              🚀开发者博主联盟
            </router-link>
          </div>

          <div class="flex items-center gap-4 lg:gap-6">
            <router-link
              to="/tob/deals"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">🧭</span>
              <span>商单进度</span>
            </router-link>

            <router-link
              to="/matrix"
              class="inline-flex items-center gap-1.5 text-indigo-600 transition-colors font-semibold text-base"
              active-class="text-indigo-700"
            >
              <span class="text-base leading-none">🧩</span>
              <span>矩阵联盟</span>
            </router-link>

            <router-link
              to="/academy"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">📚</span>
              <span>联盟学院</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <section class="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 md:p-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">矩阵联盟总览</h1>
            <p class="mt-2 text-gray-600 leading-relaxed max-w-3xl">
              以账号为维度管理博主矩阵，面向博主沉淀运营数据，面向品牌方直观展示账号资产与合作价值。
            </p>
          </div>
          <div class="inline-flex items-center self-start rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm text-indigo-700 font-medium">
            默认展示：TUARAN
          </div>
        </div>

        <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="rounded-xl border border-green-200 bg-green-50 p-4">
            <div class="text-sm font-semibold text-green-800 mb-1">面向博主</div>
            <ul class="text-sm text-green-700 space-y-1">
              <li>• 号召一线技术博主开矩阵号并持续记录数据</li>
              <li>• 支持账号分平台运营与阶段复盘</li>
            </ul>
          </div>
          <div class="rounded-xl border border-purple-200 bg-purple-50 p-4">
            <div class="text-sm font-semibold text-purple-800 mb-1">面向品牌方</div>
            <ul class="text-sm text-purple-700 space-y-1">
              <li>• 可直接查看账号级覆盖、活跃与增长势能</li>
              <li>• 辅助合作对象筛选与投放决策</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div class="flex flex-wrap items-center gap-3">
          <span class="text-sm text-gray-500">博主切换：</span>
          <button
            v-for="blogger in bloggers"
            :key="blogger.id"
            class="px-3 py-1.5 rounded-full border text-sm font-medium transition-colors"
            :class="selectedBloggerId === blogger.id
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'bg-white border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300'"
            @click="selectedBloggerId = blogger.id"
          >
            {{ blogger.name }}
          </button>
        </div>
      </section>

      <section v-if="isLoading" class="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div v-for="idx in 4" :key="idx" class="h-28 rounded-xl bg-white border border-gray-100 animate-pulse"></div>
      </section>

      <template v-else-if="currentBlogger">
        <section class="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div class="metric-card">
            <div class="text-xs text-gray-500">全网粉丝</div>
            <div class="mt-2 text-3xl font-bold text-indigo-600">{{ formatNumber(animatedOverview.totalFollowers) }}</div>
          </div>
          <div class="metric-card">
            <div class="text-xs text-gray-500">全网阅读</div>
            <div class="mt-2 text-3xl font-bold text-purple-600">{{ formatNumber(animatedOverview.totalReads) }}</div>
          </div>
          <div class="metric-card">
            <div class="text-xs text-gray-500">全网点赞</div>
            <div class="mt-2 text-3xl font-bold text-emerald-600">{{ formatNumber(animatedOverview.totalLikes) }}</div>
          </div>
          <div class="metric-card">
            <div class="text-xs text-gray-500">全网文章/帖子</div>
            <div class="mt-2 text-3xl font-bold text-amber-600">{{ formatNumber(animatedOverview.totalPosts) }}</div>
          </div>
        </section>

        <section class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="summary-chip">矩阵账号数：{{ currentBlogger.overview.matrixAccountCount }}</div>
          <div class="summary-chip">活跃平台数：{{ currentBlogger.overview.activePlatformCount }}</div>
          <div class="summary-chip">数据更新时间：{{ currentBlogger.updatedAt }}</div>
        </section>

        <section class="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div class="xl:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div class="text-lg font-semibold text-gray-900 mb-3">账号粉丝分布饼图</div>
            <div class="mx-auto w-56 h-56 rounded-full" :style="pieStyle"></div>
            <div class="mt-4 space-y-2">
              <div v-for="(item, idx) in accountFanDistribution" :key="item.name" class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2 text-gray-700">
                  <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: chartColors[idx % chartColors.length] }"></span>
                  <span>{{ item.name }}</span>
                </div>
                <div class="text-gray-500">{{ item.percent }}%</div>
              </div>
            </div>
          </div>

          <div class="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div class="text-lg font-semibold text-gray-900 mb-3">仪表盘能力（账号排行 / 全局指标 / 平台跳转）</div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead class="bg-indigo-50 text-gray-700">
                  <tr>
                    <th class="px-3 py-2 text-left">账号（IP）</th>
                    <th class="px-3 py-2 text-left">粉丝</th>
                    <th class="px-3 py-2 text-left">阅读</th>
                    <th class="px-3 py-2 text-left">文章/帖子</th>
                    <th class="px-3 py-2 text-left">点赞</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in accountRanking" :key="item.id" class="border-t border-gray-100">
                    <td class="px-3 py-2 font-medium text-gray-900">{{ item.name }}</td>
                    <td class="px-3 py-2">{{ formatNumber(item.subtotal.followers) }}</td>
                    <td class="px-3 py-2">{{ formatNumber(item.subtotal.reads) }}</td>
                    <td class="px-3 py-2">{{ formatNumber(item.subtotal.posts) }}</td>
                    <td class="px-3 py-2">{{ formatNumber(item.subtotal.likes) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section class="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div class="text-lg font-semibold text-gray-900 mb-3">各平台外链入口</div>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <a
              v-for="item in platformLinks"
              :key="`${item.account}-${item.platform}`"
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-xl border border-gray-200 px-4 py-3 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors"
            >
              <div class="text-sm text-gray-500">{{ item.account }}</div>
              <div class="font-semibold text-gray-900">{{ item.platform }}</div>
            </a>
          </div>
        </section>

        <section class="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div class="text-lg font-semibold text-gray-900 mb-4">平台运营计划</div>
          <div class="space-y-4">
            <div v-for="plan in currentBlogger.allianceProfile.operationPlans" :key="plan.stage" class="rounded-xl border border-gray-200 p-4 bg-gray-50/70">
              <div class="font-semibold text-gray-900">{{ plan.stage }}</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-sm">
                <div><span class="text-gray-500">阶段总结：</span><span class="text-gray-700">{{ plan.summary }}</span></div>
                <div><span class="text-gray-500">目标：</span><span class="text-gray-700">{{ plan.goal }}</span></div>
                <div><span class="text-gray-500">策略：</span><span class="text-gray-700">{{ plan.strategy }}</span></div>
                <div><span class="text-gray-500">挑战：</span><span class="text-gray-700">{{ plan.challenge }}</span></div>
                <div><span class="text-gray-500">机会：</span><span class="text-gray-700">{{ plan.opportunity }}</span></div>
                <div><span class="text-gray-500">写作计划：</span><span class="text-gray-700">{{ plan.writingPlan }}</span></div>
              </div>
            </div>
          </div>
        </section>

        <section class="mt-6">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div class="text-lg font-semibold text-gray-900 mb-3">变现平台清单（写即有钱）</div>
            <div class="space-y-3">
              <div v-for="group in currentBlogger.allianceProfile.monetizationPlatforms" :key="group.group" class="rounded-xl border border-gray-200 p-3">
                <div class="text-sm font-semibold text-gray-900 mb-2">{{ group.group }}</div>
                <div class="flex flex-wrap gap-2">
                  <a
                    v-for="item in group.items"
                    :key="item.name"
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs hover:bg-amber-100 transition-colors"
                  >
                    {{ item.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>

      <section v-else class="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
        暂无可展示的矩阵联盟数据。
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { matrixAllianceBloggers } from '../../data/matrixAlliance.js'

const bloggers = matrixAllianceBloggers
const selectedBloggerId = ref('tuaran')
const isLoading = ref(true)
const animationFrame = ref(null)

const currentBlogger = computed(() => {
  return bloggers.find((item) => item.id === selectedBloggerId.value) || bloggers[0] || null
})

const animatedOverview = ref({
  totalFollowers: 0,
  totalReads: 0,
  totalLikes: 0,
  totalPosts: 0
})

const chartColors = ['#6366F1', '#A855F7', '#14B8A6', '#F59E0B', '#06B6D4', '#EC4899', '#84CC16', '#F97316']

const accountRanking = computed(() => {
  if (!currentBlogger.value) return []
  return [...currentBlogger.value.accounts].sort((a, b) => b.subtotal.followers - a.subtotal.followers)
})

const accountFanDistribution = computed(() => {
  if (!currentBlogger.value) return []
  const total = currentBlogger.value.overview.totalFollowers || 1

  return currentBlogger.value.accounts.map((account) => ({
    name: account.name,
    value: account.subtotal.followers,
    percent: ((account.subtotal.followers / total) * 100).toFixed(1)
  }))
})

const pieStyle = computed(() => {
  if (!accountFanDistribution.value.length) {
    return { background: '#E5E7EB' }
  }

  let start = 0
  const segments = accountFanDistribution.value.map((item, idx) => {
    const span = Number(item.percent)
    const end = start + span
    const color = chartColors[idx % chartColors.length]
    const segment = `${color} ${start}% ${end}%`
    start = end
    return segment
  })

  return {
    background: `conic-gradient(${segments.join(',')})`
  }
})

const platformLinks = computed(() => {
  if (!currentBlogger.value) return []

  return currentBlogger.value.accounts.flatMap((account) => {
    return account.platforms.map((platform) => ({
      account: account.name,
      platform: platform.platform,
      link: platform.link
    }))
  })
})

const animateOverview = () => {
  if (!currentBlogger.value) return

  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }

  const target = {
    totalFollowers: currentBlogger.value.overview.totalFollowers,
    totalReads: currentBlogger.value.overview.totalReads,
    totalLikes: currentBlogger.value.overview.totalLikes,
    totalPosts: currentBlogger.value.overview.totalPosts
  }

  const duration = 900
  const start = performance.now()

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)

    animatedOverview.value = {
      totalFollowers: Math.floor(target.totalFollowers * eased),
      totalReads: Math.floor(target.totalReads * eased),
      totalLikes: Math.floor(target.totalLikes * eased),
      totalPosts: Math.floor(target.totalPosts * eased)
    }

    if (progress < 1) {
      animationFrame.value = requestAnimationFrame(step)
    }
  }

  animationFrame.value = requestAnimationFrame(step)
}

const formatNumber = (value) => {
  return Number(value || 0).toLocaleString('zh-CN')
}

watch(currentBlogger, () => {
  animateOverview()
})

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
    animateOverview()
  }, 300)
})

onBeforeUnmount(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})
</script>

<style scoped>
.metric-card {
  @apply bg-white rounded-2xl border border-gray-100 shadow-sm p-5 transition-transform duration-300 hover:-translate-y-0.5;
}

.summary-chip {
  @apply rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700;
}
</style>
