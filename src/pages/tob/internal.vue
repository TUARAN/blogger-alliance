<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 gap-4">
          <div class="flex items-center min-w-0">
            <router-link to="/tob" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              🚀开发者博主联盟
            </router-link>
          </div>

          <div class="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <router-link
              to="/workspace"
              class="inline-flex items-center gap-1.5 text-gray-700 transition-colors font-semibold text-base"
            >
              <span class="text-base leading-none">🗂️</span>
              <span>联盟工作台</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div class="mb-5 md:mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">内部数据台账</h1>
          <p class="mt-2 text-sm md:text-base text-gray-600">
            合作进度与数据报告融合为一张台账：既能查进度、查报告，也能新增、修改、删除数据。凭证解锁后 30 分钟内免重复输入。
          </p>
        </div>
        <div v-if="isUnlocked" class="flex flex-wrap gap-2">
          <button
            class="h-9 px-3 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            :disabled="isRefreshing"
            @click="refreshAll"
          >
            {{ isRefreshing ? '加载中...' : '刷新数据' }}
          </button>
          <button
            class="h-9 px-3 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            @click="lockAll"
          >
            锁定页面
          </button>
        </div>
      </div>

      <!-- Credential gate -->
      <div
        v-if="!isUnlocked"
        class="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 md:p-6"
      >
        <h2 class="text-lg font-semibold text-indigo-900 mb-2">请输入访问凭证</h2>
        <p class="text-sm text-indigo-700 mb-3">凭证由联盟内部统一发放；解锁后即可查询、新增、修改、删除。15 分钟内连续输错 5 次将被临时锁定。</p>
        <div class="flex flex-col md:flex-row gap-3">
          <input
            v-model="credentialInput"
            type="password"
            placeholder="请输入访问凭证"
            class="flex-1 h-10 px-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            @keyup.enter="unlock"
          >
          <button
            :disabled="isUnlocking"
            class="h-10 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
            @click="unlock"
          >
            {{ isUnlocking ? '连接中...' : '解锁台账' }}
          </button>
        </div>
        <p v-if="unlockError" class="mt-3 text-sm text-red-600">{{ unlockError }}</p>
      </div>

      <!-- Unified ledger -->
      <template v-else>
        <!-- Stats summary -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
          <div class="rounded-xl border border-indigo-100 bg-white px-4 py-3">
            <p class="text-xs text-gray-500">合作数</p>
            <p class="mt-1 text-xl font-bold text-indigo-700 tabular-nums">{{ filteredDeals.length }}</p>
          </div>
          <div class="rounded-xl border border-indigo-100 bg-white px-4 py-3">
            <p class="text-xs text-gray-500">报告数</p>
            <p class="mt-1 text-xl font-bold text-indigo-700 tabular-nums">{{ filteredReportsCount }}</p>
          </div>
          <div class="rounded-xl border border-indigo-100 bg-white px-4 py-3">
            <p class="text-xs text-gray-500">总阅读</p>
            <p class="mt-1 text-xl font-bold text-teal-700 tabular-nums">{{ formatNumber(filteredStats.reads) }}</p>
          </div>
          <div class="rounded-xl border border-indigo-100 bg-white px-4 py-3">
            <p class="text-xs text-gray-500">总点赞</p>
            <p class="mt-1 text-xl font-bold text-rose-700 tabular-nums">{{ formatNumber(filteredStats.likes) }}</p>
          </div>
          <div class="rounded-xl border border-indigo-100 bg-white px-4 py-3">
            <p class="text-xs text-gray-500">互动 (评+转+收)</p>
            <p class="mt-1 text-xl font-bold text-violet-700 tabular-nums">
              {{ formatNumber(filteredStats.comments + filteredStats.shares + filteredStats.favorites) }}
            </p>
          </div>
        </div>

        <!-- Toolbar -->
        <div class="rounded-2xl border border-indigo-100 bg-white shadow-sm p-4 md:p-5 mb-5">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">服务类型</label>
              <select v-model="serviceFilter" class="w-full h-9 px-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="all">全部服务</option>
                <option v-for="item in serviceOptions" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">当前进度</label>
              <select v-model="progressFilter" class="w-full h-9 px-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="all">全部状态</option>
                <option v-for="item in progressOptions" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">年份</label>
              <select v-model="yearFilter" class="w-full h-9 px-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="all">全部年份</option>
                <option v-for="item in yearOptions" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs text-gray-500 mb-1">关键词（合作编码 / 品牌 / 服务 / 备注 / 报告）</label>
              <input
                v-model="keyword"
                type="text"
                placeholder="输入任意关键词筛选合作与报告"
                class="w-full h-9 px-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
            </div>
          </div>

          <div class="mt-4 flex flex-wrap items-center gap-2">
            <button
              class="h-9 px-4 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
              @click="openCreateDeal"
            >
              ➕ 新增合作
            </button>
            <button
              class="h-9 px-4 rounded-lg border border-indigo-300 bg-white text-sm font-medium text-indigo-700 hover:bg-indigo-50"
              @click="openCreateReport(null)"
            >
              ➕ 新增独立报告
            </button>
            <button
              class="h-9 px-3 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
              @click="copyAsTable"
            >
              复制为表格
            </button>
            <span v-if="toolbarMessage" class="text-xs text-emerald-700">{{ toolbarMessage }}</span>
            <span v-if="toolbarError" class="text-xs text-red-600">{{ toolbarError }}</span>
          </div>
        </div>

        <!-- Main ledger table -->
        <div class="rounded-2xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead class="bg-indigo-50/80 text-gray-700">
                <tr>
                  <th class="w-10 px-2 py-3"></th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">合作编码</th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">品牌 / 项目</th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">合作内容</th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">当前进度</th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">推荐人</th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">最近沟通</th>
                  <th class="px-3 py-3 text-center text-xs font-semibold">报告</th>
                  <th class="px-3 py-3 text-center text-xs font-semibold">操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(deal, idx) in filteredDeals" :key="deal.id || `deal-${idx}`">
                  <tr
                    :class="[
                      'border-t border-gray-100',
                      deal.muted ? 'bg-gray-100/70' : 'hover:bg-gray-50/70'
                    ]"
                  >
                    <td class="px-2 py-3 text-center align-top">
                      <button
                        v-if="dealReports(deal).length > 0"
                        class="text-indigo-600 hover:text-indigo-800 text-sm"
                        @click="toggleExpanded(deal.id)"
                      >
                        {{ isExpanded(deal.id) ? '▾' : '▸' }}
                      </button>
                      <span v-else class="text-gray-300 text-sm">·</span>
                    </td>
                    <td class="px-3 py-3 align-top font-mono text-xs font-semibold text-slate-800 whitespace-nowrap">
                      {{ deal.id }}
                      <span v-if="deal.reportCooperationId && deal.reportCooperationId !== deal.id" class="block text-[10px] text-slate-500 font-normal mt-0.5">
                        ↳ 引用 {{ deal.reportCooperationId }}
                      </span>
                    </td>
                    <td class="px-3 py-3 align-top font-medium text-slate-900">{{ deal.brand }}</td>
                    <td class="px-3 py-3 align-top text-slate-700">{{ deal.service }}</td>
                    <td class="px-3 py-3 align-top">
                      <span
                        class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                        :class="progressBadgeClass(deal.progress)"
                      >
                        {{ deal.progress || '—' }}
                      </span>
                      <p v-if="deal.remark" class="mt-1 text-xs text-slate-500 leading-5">{{ deal.remark }}</p>
                    </td>
                    <td class="px-3 py-3 align-top text-slate-600 whitespace-nowrap">{{ deal.referrer || '—' }}</td>
                    <td class="px-3 py-3 align-top text-slate-600 font-mono text-xs whitespace-nowrap">{{ deal.updatedAt || '—' }}</td>
                    <td class="px-3 py-3 align-top text-center">
                      <span class="inline-flex items-center rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-700">
                        {{ dealReports(deal).length }}
                      </span>
                    </td>
                    <td class="px-3 py-3 align-top text-center whitespace-nowrap">
                      <button class="text-xs text-indigo-600 hover:text-indigo-800 mr-2" @click="openEditDeal(deal)">编辑</button>
                      <button class="text-xs text-emerald-600 hover:text-emerald-800" @click="openCreateReport(deal)">+报告</button>
                    </td>
                  </tr>

                  <!-- Expanded reports row -->
                  <tr v-if="isExpanded(deal.id) && dealReports(deal).length > 0" class="bg-indigo-50/30 border-t border-indigo-100">
                    <td></td>
                    <td colspan="8" class="px-3 py-4">
                      <div class="space-y-3">
                        <div
                          v-for="report in dealReports(deal)"
                          :key="report.id"
                          class="rounded-xl border border-violet-100 bg-white p-4"
                        >
                          <div class="flex items-start justify-between gap-3 mb-2">
                            <div class="min-w-0 flex-1">
                              <h4 class="text-sm font-semibold text-slate-900">{{ report.project }}</h4>
                              <p v-if="report.articleTitle" class="mt-0.5 text-xs text-slate-500">{{ formatArticleTitle(report.articleTitle) }}</p>
                              <div class="mt-1 flex flex-wrap gap-3 text-[11px] text-slate-500">
                                <span>执行人：<span class="text-slate-700 font-medium">{{ report.author }}</span></span>
                                <span v-if="report.period">周期：<span class="text-slate-700">{{ report.period }}</span></span>
                                <span v-if="report.platforms?.length">平台：<span class="text-slate-700">{{ report.platforms.join(' / ') }}</span></span>
                              </div>
                            </div>
                            <div class="flex shrink-0 gap-2">
                              <button class="text-xs text-indigo-600 hover:text-indigo-800" @click="openEditReport(report)">编辑</button>
                            </div>
                          </div>
                          <div class="rounded-lg bg-teal-50/70 px-3 py-2 text-xs text-teal-900">
                            {{ formatNumber(report.stats?.reads) }} 阅读 ·
                            {{ formatNumber(report.stats?.likes) }} 点赞 ·
                            {{ formatNumber(report.stats?.favorites) }} 收藏 ·
                            {{ formatNumber(report.stats?.comments) }} 评论 ·
                            {{ formatNumber(report.stats?.shares) }} 转发
                          </div>
                          <p v-if="report.content" class="mt-2 text-xs text-slate-600 leading-6 whitespace-pre-line line-clamp-6">{{ report.content }}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>

                <tr v-if="filteredDeals.length === 0">
                  <td colspan="9" class="px-4 py-10 text-center text-sm text-gray-500">
                    未找到匹配合作，请调整筛选条件或新增合作。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Orphan reports (no matching deal) -->
        <div v-if="orphanReports.length > 0" class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <h3 class="text-sm font-semibold text-amber-900 mb-2">未匹配合作的报告（{{ orphanReports.length }}）</h3>
          <p class="text-xs text-amber-700 mb-3">以下报告的 cooperationId 未在合作列表中找到对应条目，建议补全或修正。</p>
          <div class="space-y-2">
            <div
              v-for="report in orphanReports"
              :key="report.id"
              class="flex items-center justify-between gap-3 rounded-lg bg-white border border-amber-100 px-3 py-2 text-xs"
            >
              <div class="min-w-0">
                <span class="font-mono font-semibold text-slate-800">{{ report.cooperationId || '（空）' }}</span>
                <span class="mx-2 text-slate-400">·</span>
                <span class="text-slate-700">{{ report.project }} / {{ report.author }}</span>
              </div>
              <button class="shrink-0 text-indigo-600 hover:text-indigo-800" @click="openEditReport(report)">编辑</button>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- Modals -->
    <DealFormModal
      v-if="dealModalOpen"
      :deal="editingDeal"
      :is-saving="isSavingDeal"
      @save="handleDealSave"
      @cancel="closeDealModal"
      @delete="handleDealDelete"
    />

    <ReportFormModal
      v-if="reportModalOpen"
      :report="editingReport"
      :cooperation-id="reportModalCoopId"
      :is-saving="isSavingReport"
      @save="handleReportSave"
      @cancel="closeReportModal"
      @delete="handleReportDelete"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import DealFormModal from '../../components/internal/DealFormModal.vue'
import ReportFormModal from '../../components/internal/ReportFormModal.vue'
import { normalizeCredential } from '../../utils/credentialNormalize'
import {
  createInternalDataSession,
  explainInternalDataError,
  fetchCommercialDeals,
  fetchPromotionReports,
  updateCommercialDeals,
  updatePromotionReports
} from '../../utils/internalDataApi'
import {
  readInternalAccessSession,
  saveInternalAccessSession,
  clearInternalAccessCaches
} from '../../utils/internalAccessCache'

const deals = ref([])
const reports = ref([])
const sessionToken = ref('')
const isUnlocked = ref(false)
const isUnlocking = ref(false)
const isRefreshing = ref(false)
const credentialInput = ref('')
const unlockError = ref('')

const serviceFilter = ref('all')
const progressFilter = ref('all')
const yearFilter = ref('all')
const keyword = ref('')

const expanded = reactive(new Set())
const toolbarMessage = ref('')
const toolbarError = ref('')
let toolbarTimer = null

const dealModalOpen = ref(false)
const editingDeal = ref(null)
const isSavingDeal = ref(false)

const reportModalOpen = ref(false)
const editingReport = ref(null)
const reportModalCoopId = ref('')
const isSavingReport = ref(false)

function setToolbarMessage(text, isError = false) {
  if (toolbarTimer) clearTimeout(toolbarTimer)
  if (isError) {
    toolbarError.value = text
    toolbarMessage.value = ''
  } else {
    toolbarMessage.value = text
    toolbarError.value = ''
  }
  toolbarTimer = setTimeout(() => {
    toolbarMessage.value = ''
    toolbarError.value = ''
  }, 3200)
}

async function unlock() {
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
    credentialInput.value = ''
    await loadAll()
    isUnlocked.value = true
  } catch (error) {
    unlockError.value = explainInternalDataError(error, 'admin')
    isUnlocked.value = false
    sessionToken.value = ''
  } finally {
    isUnlocking.value = false
  }
}

async function loadAll() {
  const [d, r] = await Promise.all([
    fetchCommercialDeals(sessionToken.value),
    fetchPromotionReports(sessionToken.value)
  ])
  deals.value = Array.isArray(d) ? d : []
  reports.value = Array.isArray(r) ? r : []
}

async function refreshAll() {
  if (!sessionToken.value) return
  isRefreshing.value = true
  try {
    await loadAll()
    setToolbarMessage('已刷新最新数据。')
  } catch (error) {
    setToolbarMessage(explainInternalDataError(error, 'read'), true)
  } finally {
    isRefreshing.value = false
  }
}

function lockAll() {
  isUnlocked.value = false
  sessionToken.value = ''
  deals.value = []
  reports.value = []
  credentialInput.value = ''
  expanded.clear()
  clearInternalAccessCaches()
}

// Filter options
const serviceOptions = computed(() => {
  const s = new Set()
  for (const d of deals.value) {
    if (d.service) s.add(String(d.service).trim())
  }
  return Array.from(s).filter(Boolean).sort()
})

const progressOptions = computed(() => {
  const s = new Set()
  for (const d of deals.value) {
    if (d.progress) s.add(String(d.progress).trim())
  }
  return Array.from(s).filter(Boolean).sort()
})

const yearOptions = computed(() => {
  const s = new Set()
  for (const d of deals.value) {
    const m = String(d.updatedAt || '').match(/(\d{4})/)
    if (m) s.add(m[1])
  }
  return Array.from(s).sort((a, b) => Number(b) - Number(a))
})

// Reports by deal
const reportsByDeal = computed(() => {
  const map = new Map()
  for (const r of reports.value) {
    const key = String(r.cooperationId || '').trim().toUpperCase()
    if (!key) continue
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(r)
  }
  return map
})

function dealReports(deal) {
  const reportKey = String(deal.reportCooperationId || deal.id || '').trim().toUpperCase()
  const primaryKey = String(deal.id || '').trim().toUpperCase()
  const found = new Map()
  for (const key of [primaryKey, reportKey]) {
    if (!key) continue
    const list = reportsByDeal.value.get(key) || []
    for (const r of list) {
      if (!found.has(r.id)) found.set(r.id, r)
    }
  }
  return Array.from(found.values())
}

const orphanReports = computed(() => {
  const knownKeys = new Set()
  for (const d of deals.value) {
    if (d.id) knownKeys.add(String(d.id).toUpperCase())
    if (d.reportCooperationId) knownKeys.add(String(d.reportCooperationId).toUpperCase())
  }
  return reports.value.filter((r) => {
    const k = String(r.cooperationId || '').toUpperCase()
    return !k || !knownKeys.has(k)
  })
})

// Filters
function dealMatchesKeyword(deal, kw) {
  if (!kw) return true
  const blob = [deal.id, deal.brand, deal.service, deal.progress, deal.remark, deal.referrer, deal.reportCooperationId, deal.updatedAt]
    .filter(Boolean).join(' ').toLowerCase()
  if (blob.includes(kw)) return true
  // Also match if any linked report matches keyword
  const reps = dealReports(deal)
  return reps.some((r) => {
    const rb = [r.id, r.project, r.author, r.period, r.articleTitle, r.content, r.cooperationId,
      Array.isArray(r.platforms) ? r.platforms.join(' ') : '']
      .filter(Boolean).join(' ').toLowerCase()
    return rb.includes(kw)
  })
}

const filteredDeals = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return deals.value.filter((d) => {
    if (serviceFilter.value !== 'all' && d.service !== serviceFilter.value) return false
    if (progressFilter.value !== 'all' && d.progress !== progressFilter.value) return false
    if (yearFilter.value !== 'all') {
      const m = String(d.updatedAt || '').match(/(\d{4})/)
      if (!m || m[1] !== yearFilter.value) return false
    }
    if (!dealMatchesKeyword(d, kw)) return false
    return true
  }).sort((a, b) => {
    const ad = String(a.updatedAt || '')
    const bd = String(b.updatedAt || '')
    return bd.localeCompare(ad)
  })
})

const filteredReportsCount = computed(() => {
  let n = 0
  for (const d of filteredDeals.value) n += dealReports(d).length
  return n
})

const filteredStats = computed(() => {
  const sum = { reads: 0, likes: 0, favorites: 0, comments: 0, shares: 0 }
  for (const d of filteredDeals.value) {
    for (const r of dealReports(d)) {
      sum.reads += Number(r.stats?.reads) || 0
      sum.likes += Number(r.stats?.likes) || 0
      sum.favorites += Number(r.stats?.favorites) || 0
      sum.comments += Number(r.stats?.comments) || 0
      sum.shares += Number(r.stats?.shares) || 0
    }
  }
  return sum
})

// Expansion
function isExpanded(id) {
  return expanded.has(id)
}
function toggleExpanded(id) {
  if (expanded.has(id)) expanded.delete(id)
  else expanded.add(id)
}

// Formatting helpers
function formatNumber(value) {
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return '0'
  return Math.floor(n).toLocaleString('zh-CN')
}

function formatArticleTitle(raw) {
  const t = String(raw || '').trim()
  if (!t) return ''
  if (t.startsWith('《') && t.endsWith('》')) return t
  return `《${t}》`
}

function progressBadgeClass(progress) {
  const p = String(progress || '').trim()
  if (!p) return 'bg-gray-100 text-gray-600'
  if (p.includes('已闭环')) return 'bg-emerald-50 text-emerald-700'
  if (p.includes('待结算')) return 'bg-amber-50 text-amber-800'
  if (p.includes('持续计费')) return 'bg-sky-50 text-sky-700'
  if (p.includes('测试')) return 'bg-slate-100 text-slate-700'
  if (p.includes('沟通')) return 'bg-indigo-50 text-indigo-700'
  return 'bg-violet-50 text-violet-700'
}

// Copy as table
async function copyAsTable() {
  const headers = ['合作编码', '品牌/项目', '合作内容', '当前进度', '备注', '推荐人', '最近沟通', '报告数']
  const rows = filteredDeals.value.map((d) => [
    d.id || '', d.brand || '', d.service || '', d.progress || '', d.remark || '',
    d.referrer || '', d.updatedAt || '', String(dealReports(d).length)
  ])
  const tsv = [headers, ...rows].map((r) => r.map((c) => String(c).replace(/\t/g, ' ')).join('\t')).join('\n')
  try {
    await navigator.clipboard.writeText(tsv)
    setToolbarMessage('已复制为 TSV 表格，可直接粘贴到飞书 / Excel。')
  } catch {
    setToolbarMessage('复制失败，请检查剪贴板权限。', true)
  }
}

// Deal CRUD
function openCreateDeal() {
  editingDeal.value = null
  dealModalOpen.value = true
}
function openEditDeal(deal) {
  editingDeal.value = { ...deal }
  dealModalOpen.value = true
}
function closeDealModal() {
  dealModalOpen.value = false
  editingDeal.value = null
}

async function handleDealSave(payload) {
  const { mode, deal, originalId } = payload
  isSavingDeal.value = true
  try {
    const current = deals.value.slice()
    if (mode === 'create') {
      if (current.some((d) => String(d.id).toUpperCase() === deal.id.toUpperCase())) {
        throw new Error('DUPLICATE_ID')
      }
      current.push(deal)
    } else {
      const idx = current.findIndex((d) => d.id === originalId)
      if (idx === -1) throw new Error('DEAL_NOT_FOUND')
      current[idx] = { ...current[idx], ...deal, id: current[idx].id }
    }
    await updateCommercialDeals(sessionToken.value, current)
    deals.value = current
    closeDealModal()
    setToolbarMessage(mode === 'create' ? '合作已创建。' : '合作已更新。')
  } catch (error) {
    const msg = error?.message === 'DUPLICATE_ID' ? '合作编码已存在。' : explainInternalDataError(error, 'admin')
    setToolbarMessage(msg, true)
  } finally {
    isSavingDeal.value = false
  }
}

async function handleDealDelete() {
  if (!editingDeal.value) return
  const dealId = editingDeal.value.id
  const linked = dealReports(editingDeal.value).length
  const msg = linked > 0
    ? `确定删除合作「${dealId}」吗？该合作下有 ${linked} 条报告，这些报告将成为孤立状态（需单独处理）。`
    : `确定删除合作「${dealId}」吗？此操作不可恢复。`
  if (!window.confirm(msg)) return
  isSavingDeal.value = true
  try {
    const next = deals.value.filter((d) => d.id !== dealId)
    await updateCommercialDeals(sessionToken.value, next)
    deals.value = next
    closeDealModal()
    setToolbarMessage('合作已删除。')
  } catch (error) {
    setToolbarMessage(explainInternalDataError(error, 'admin'), true)
  } finally {
    isSavingDeal.value = false
  }
}

// Report CRUD
function openCreateReport(deal) {
  editingReport.value = null
  reportModalCoopId.value = deal ? (deal.reportCooperationId || deal.id || '') : ''
  reportModalOpen.value = true
}
function openEditReport(report) {
  editingReport.value = { ...report }
  reportModalCoopId.value = report.cooperationId || ''
  reportModalOpen.value = true
}
function closeReportModal() {
  reportModalOpen.value = false
  editingReport.value = null
  reportModalCoopId.value = ''
}

async function handleReportSave(payload) {
  const { mode, report, originalId } = payload
  isSavingReport.value = true
  try {
    const current = reports.value.slice()
    if (mode === 'create') {
      if (current.some((r) => String(r.id) === report.id)) {
        throw new Error('DUPLICATE_ID')
      }
      current.push(report)
    } else {
      const idx = current.findIndex((r) => r.id === originalId)
      if (idx === -1) throw new Error('REPORT_NOT_FOUND')
      current[idx] = { ...current[idx], ...report, id: current[idx].id }
    }
    await updatePromotionReports(sessionToken.value, current)
    reports.value = current
    // Ensure the related deal row is expanded to show change
    const coopKey = String(report.cooperationId || '').toUpperCase()
    const host = deals.value.find((d) =>
      String(d.id || '').toUpperCase() === coopKey ||
      String(d.reportCooperationId || '').toUpperCase() === coopKey
    )
    if (host) expanded.add(host.id)
    closeReportModal()
    setToolbarMessage(mode === 'create' ? '报告已创建。' : '报告已更新。')
  } catch (error) {
    const msg = error?.message === 'DUPLICATE_ID' ? '报告 ID 已存在。' : explainInternalDataError(error, 'admin')
    setToolbarMessage(msg, true)
  } finally {
    isSavingReport.value = false
  }
}

async function handleReportDelete() {
  if (!editingReport.value) return
  const reportId = editingReport.value.id
  if (!window.confirm(`确定删除报告「${reportId}」吗？此操作不可恢复。`)) return
  isSavingReport.value = true
  try {
    const next = reports.value.filter((r) => r.id !== reportId)
    await updatePromotionReports(sessionToken.value, next)
    reports.value = next
    closeReportModal()
    setToolbarMessage('报告已删除。')
  } catch (error) {
    setToolbarMessage(explainInternalDataError(error, 'admin'), true)
  } finally {
    isSavingReport.value = false
  }
}

onMounted(async () => {
  const cached = readInternalAccessSession()
  if (!cached) return
  sessionToken.value = cached
  try {
    await loadAll()
    isUnlocked.value = true
    saveInternalAccessSession(cached)
  } catch {
    lockAll()
  }
})
</script>
