<script setup>
import { onMounted, ref } from 'vue'
import annualDashboardImage from '../../img/example/wechat_2026-03-16_104619_761.png'
import annualCloudImage from '../../img/example/wechat_2026-03-16_104632_010.png'
import { useAuth } from '../../composables/useAuth.js'
import { AUTH_COPY } from '../../utils/authMessages.js'
import {
  explainInternalDataError,
  fetchAnnualReportsAdmin
} from '../../utils/internalDataApi'

const TARGET_YEAR = 2025

const FALLBACK_REPORT = {
  year: TARGET_YEAR,
  intro: '围绕技术内容分发、平台种草、社群扩散和数据复盘，持续帮助品牌建立开发者认知。',
  partners: ['秒哒', 'FinClip', '亚马逊云科技', '火山引擎', '明基', '秦托邦'],
  summaryCards: [
    { label: '合作品牌', value: '8+', accent: 'from-indigo-500 to-blue-500' },
    { label: '累计投放', value: '376 篇', accent: 'from-fuchsia-500 to-violet-500' },
    { label: '覆盖平台', value: '11+', accent: 'from-emerald-500 to-cyan-500' },
    { label: '社群辐射', value: '20+', accent: 'from-amber-500 to-orange-500' }
  ],
  highlights: [
    '以技术内容分发为核心，持续帮助品牌建立开发者认知',
    '合作内容覆盖掘金、CSDN、知乎、公众号、头条、博客园等平台',
    '配合社群扩散与矩阵号联动，形成更稳定的传播放大效果'
  ]
}

const { initAuth, isInternal, getAccessToken, loading: authLoading } = useAuth()

const partnerBrands = ref(FALLBACK_REPORT.partners)
const summaryCards = ref(FALLBACK_REPORT.summaryCards)
const reportHighlights = ref(FALLBACK_REPORT.highlights)
const introText = ref(FALLBACK_REPORT.intro)
const isReady = ref(false)
const isLoadingReport = ref(false)
const loadError = ref('')
const accessError = ref('')

function applyReport(remote) {
  if (!remote) return
  if (Array.isArray(remote.partners) && remote.partners.length) {
    partnerBrands.value = remote.partners
  }
  if (Array.isArray(remote.summaryCards) && remote.summaryCards.length) {
    summaryCards.value = remote.summaryCards
  }
  if (Array.isArray(remote.highlights) && remote.highlights.length) {
    reportHighlights.value = remote.highlights
  }
  if (typeof remote.intro === 'string' && remote.intro.trim()) {
    introText.value = remote.intro.trim()
  }
}

async function loadAnnualReport(token) {
  isLoadingReport.value = true
  loadError.value = ''
  try {
    const reports = await fetchAnnualReportsAdmin(token)
    const remote = reports.find((item) => Number(item?.year) === TARGET_YEAR)
    applyReport(remote)
    isReady.value = true
  } catch (error) {
    loadError.value = explainInternalDataError(error, 'read')
    throw error
  } finally {
    isLoadingReport.value = false
  }
}

onMounted(async () => {
  await initAuth()

  if (!isInternal.value) {
    accessError.value = AUTH_COPY.internalAccessDeniedBody
    return
  }

  const token = await getAccessToken()
  if (!token) {
    accessError.value = AUTH_COPY.sessionMissing
    return
  }

  try {
    await loadAnnualReport(token)
  } catch {
    isReady.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
    <AppNav />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <section
        v-if="authLoading || isLoadingReport"
        class="rounded-2xl border border-indigo-100 bg-white p-6 text-sm text-slate-600"
      >
        正在加载 2025 年度总览...
      </section>

      <section
        v-else-if="accessError"
        class="rounded-2xl border border-amber-200 bg-amber-50 p-5 md:p-6"
      >
        <h1 class="text-xl font-semibold text-amber-950">无法打开年度总览</h1>
        <p class="mt-2 text-sm leading-6 text-amber-800">{{ accessError }}</p>
        <router-link
          to="/workspace"
          class="mt-4 inline-flex h-10 items-center rounded-lg bg-amber-700 px-4 text-sm font-semibold text-white hover:bg-amber-800"
        >
          返回工作台
        </router-link>
      </section>

      <section
        v-else-if="loadError"
        class="rounded-2xl border border-red-200 bg-red-50 p-5 md:p-6"
      >
        <h1 class="text-xl font-semibold text-red-900">加载失败</h1>
        <p class="mt-2 text-sm text-red-700">{{ loadError }}</p>
      </section>

      <template v-else-if="isReady">
        <section class="rounded-3xl border border-white/70 bg-white/90 p-6 sm:p-8 shadow-lg">
          <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">2025 年度总览</p>
          <h1 class="mt-2 text-3xl sm:text-4xl font-bold text-slate-950">开发者博主联盟</h1>
          <p class="mt-4 text-base leading-8 text-slate-600">{{ introText }}</p>
        </section>

        <section class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div
            v-for="card in summaryCards"
            :key="card.label"
            class="rounded-2xl bg-gradient-to-br p-5 text-white shadow-md"
            :class="card.accent"
          >
            <p class="text-sm opacity-90">{{ card.label }}</p>
            <p class="mt-2 text-2xl font-bold">{{ card.value }}</p>
          </div>
        </section>

        <section class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 class="text-lg font-semibold text-slate-900">合作品牌</h2>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="brand in partnerBrands"
                :key="brand"
                class="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
              >
                {{ brand }}
              </span>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 class="text-lg font-semibold text-slate-900">年度亮点</h2>
            <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <li v-for="(item, index) in reportHighlights" :key="index">{{ item }}</li>
            </ul>
          </div>
        </section>

        <section class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <figure class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img :src="annualDashboardImage" alt="年度数据看板示例" class="w-full object-cover">
          </figure>
          <figure class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img :src="annualCloudImage" alt="云端协作示例" class="w-full object-cover">
          </figure>
        </section>
      </template>
    </main>
  </div>
</template>
