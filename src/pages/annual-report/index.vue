<script setup>
import { onMounted, ref } from 'vue'
import annualDashboardImage from '../../img/example/wechat_2026-03-16_104619_761.png'
import annualCloudImage from '../../img/example/wechat_2026-03-16_104632_010.png'
import { normalizeCredential } from '../../utils/credentialNormalize'
import {
  createInternalDataSession,
  explainInternalDataError,
  fetchAnnualReportsAdmin
} from '../../utils/internalDataApi'
import {
  clearInternalAccessCaches,
  readInternalAccessSession,
  saveInternalAccessSession
} from '../../utils/internalAccessCache'

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

const partnerBrands = ref(FALLBACK_REPORT.partners)
const summaryCards = ref(FALLBACK_REPORT.summaryCards)
const reportHighlights = ref(FALLBACK_REPORT.highlights)
const introText = ref(FALLBACK_REPORT.intro)
const sessionToken = ref('')
const isUnlocked = ref(false)
const isUnlocking = ref(false)
const isLoadingReport = ref(false)
const credentialInput = ref('')
const unlockError = ref('')
const loadError = ref('')

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
  } catch (error) {
    loadError.value = explainInternalDataError(error, 'read')
    throw error
  } finally {
    isLoadingReport.value = false
  }
}

async function unlockAnnualReport() {
  const credential = normalizeCredential(credentialInput.value)
  if (!credential) {
    unlockError.value = '请输入有效凭证。'
    return
  }

  unlockError.value = ''
  isUnlocking.value = true
  try {
    const session = await createInternalDataSession(credential)
    sessionToken.value = session.token
    saveInternalAccessSession(session.token)
    await loadAnnualReport(session.token)
    credentialInput.value = ''
    isUnlocked.value = true
  } catch (error) {
    unlockError.value = explainInternalDataError(error, 'read')
    sessionToken.value = ''
    isUnlocked.value = false
  } finally {
    isUnlocking.value = false
  }
}

function lockAnnualReport() {
  sessionToken.value = ''
  isUnlocked.value = false
  credentialInput.value = ''
  clearInternalAccessCaches()
}

onMounted(async () => {
  const cached = readInternalAccessSession()
  if (!cached) return
  sessionToken.value = cached
  try {
    await loadAnnualReport(cached)
    isUnlocked.value = true
    saveInternalAccessSession(cached)
  } catch {
    lockAnnualReport()
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 gap-4">
          <div class="flex items-center min-w-0">
            <router-link to="/tob" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors truncate">
              🚀开发者博主联盟
            </router-link>
          </div>

          <div class="flex items-center gap-3 lg:gap-5 overflow-x-auto whitespace-nowrap">
            <router-link
              to="/workspace"
              class="inline-flex items-center gap-1.5 text-gray-700 transition-colors font-semibold text-base"
            >
              <span class="text-base leading-none">🗂️</span>
              <span>联盟工作台</span>
            </router-link>
            <WebLlmNavBot />
            <button
              v-if="isUnlocked"
              class="h-9 px-3 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
              @click="lockAnnualReport"
            >
              锁定
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <section
        v-if="!isUnlocked"
        class="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 md:p-6"
      >
        <h1 class="text-xl font-semibold text-indigo-950">请输入访问凭证</h1>
        <p class="mt-2 text-sm leading-6 text-indigo-700">
          2025 年度总览仅面向联盟内部开放；解锁后 30 分钟内免重复输入。15 分钟内连续输错 5 次将被临时锁定。
        </p>
        <div class="mt-4 flex flex-col md:flex-row gap-3">
          <input
            v-model="credentialInput"
            type="password"
            placeholder="请输入访问凭证"
            class="flex-1 h-10 px-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            @keyup.enter="unlockAnnualReport"
          >
          <button
            :disabled="isUnlocking"
            class="h-10 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
            @click="unlockAnnualReport"
          >
            {{ isUnlocking ? '连接中...' : '查看年度总览' }}
          </button>
        </div>
        <p v-if="unlockError" class="mt-3 text-sm text-red-600">{{ unlockError }}</p>
      </section>

      <template v-else>
      <section class="rounded-3xl border border-slate-200 bg-slate-900 px-6 py-8 text-white shadow-xl md:px-8 md:py-10">
        <div class="max-w-3xl">
          <p class="text-sm uppercase tracking-[0.24em] text-indigo-200">Annual Review</p>
          <h1 class="mt-3 text-3xl md:text-4xl font-bold">2025 年报告</h1>
          <p class="mt-3 text-sm md:text-base leading-7 text-slate-300">
            <span>2025 年，我们与</span>
            <span class="font-semibold text-white"> {{ partnerBrands.join('、') }} </span>
            <span>等品牌完成合作，{{ introText }}</span>
          </p>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="card in summaryCards"
            :key="card.label"
            class="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur-sm"
          >
            <div class="inline-flex rounded-xl bg-gradient-to-r px-3 py-1 text-sm font-semibold text-white" :class="card.accent">
              {{ card.label }}
            </div>
            <div class="mt-4 text-3xl font-bold text-white">{{ card.value }}</div>
          </article>
        </div>
        <p v-if="isLoadingReport" class="mt-4 text-sm text-indigo-200">正在加载最新年度数据...</p>
        <p v-if="loadError" class="mt-4 text-sm text-red-200">{{ loadError }}</p>
      </section>

      <section class="mt-8 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <article class="overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-lg">
          <div class="border-b border-indigo-100 px-6 py-5">
            <h2 class="text-xl font-bold text-gray-900">年度合作数据看板</h2>
            <p class="mt-1 text-sm text-gray-500">全年累计投放、平台分布与内容数量概览。</p>
          </div>
          <img :src="annualDashboardImage" alt="2025 合作数据看板" class="w-full object-cover" />
        </article>

        <article class="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-indigo-50 p-6 shadow-lg">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Report Focus</p>
          <h2 class="mt-3 text-2xl font-bold text-gray-900">年度重点</h2>
          <div class="mt-5 space-y-3">
            <div
              v-for="highlight in reportHighlights"
              :key="highlight"
              class="rounded-2xl border border-white/70 bg-white/80 px-4 py-4 text-sm leading-6 text-gray-700 shadow-sm"
            >
              {{ highlight }}
            </div>
          </div>
        </article>
      </section>

      <section class="mt-8 overflow-hidden rounded-3xl border border-fuchsia-100 bg-white shadow-lg">
        <div class="border-b border-fuchsia-100 px-6 py-5">
          <h2 class="text-xl font-bold text-gray-900">品牌与博主词云</h2>
          <p class="mt-1 text-sm text-gray-500">品牌方与开发者博主合作网络的可视化展示。</p>
        </div>
        <div class="flex min-h-[360px] items-center justify-center bg-slate-50 px-4 py-6">
          <img :src="annualCloudImage" alt="2025 品牌与博主合作词云" class="max-h-[560px] w-full object-contain object-center" />
        </div>
      </section>
      </template>
    </main>
  </div>
</template>
