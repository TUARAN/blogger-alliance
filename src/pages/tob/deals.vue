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

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 md:p-8">
        <div class="mb-6 md:mb-8">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">合作进度查询</h1>
          <div class="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm md:text-base">
            当前页数据存放在 D1，仅支持输入访问密码后读取。与「数据报告查询」共用凭证：任一页解锁成功后 30 分钟内，另一页自动可查看（无需重复输入）。
          </div>
        </div>

        <div
          v-if="!isUnlocked"
          class="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4 md:p-5"
        >
          <h2 class="text-base md:text-lg font-semibold text-indigo-900 mb-2">请输入访问凭证</h2>
          <p class="text-sm text-indigo-700 mb-2">访问密码由联盟内部统一发放，输入后会向 Worker 换取会话并从 D1 读取合作进度。若在「数据报告查询」已解锁，此处通常会自动进入。</p>
          <p class="text-xs md:text-sm text-indigo-600 mb-4">解锁成功后 30 分钟内，两页共用免密；点击「锁定页面」将同时关闭两页访问。若在中文输入法下键入，可能混入全角字符导致与粘贴不一致；请改用英文输入或直接从可靠来源复制。</p>

          <div class="flex flex-col md:flex-row gap-3">
            <input
              v-model="credentialInput"
              type="password"
              placeholder="请输入访问凭证"
              class="flex-1 h-10 px-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              @keyup.enter="unlockDeals"
            >
            <button
              :disabled="isUnlocking"
              class="h-10 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
              @click="unlockDeals"
            >
              {{ isUnlocking ? '连接中...' : '输入密码并查看' }}
            </button>
          </div>

          <p v-if="unlockError" class="mt-3 text-sm text-red-600">{{ unlockError }}</p>
        </div>

        <template v-else>
          <div class="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div class="rounded-lg border border-green-200 bg-green-50 px-3 py-2">
              <div class="text-sm text-green-700">✅ 已完成解锁，可查看合作进度。</div>
              <div class="mt-1 text-xs text-green-600">30 分钟内「数据报告查询」页也无需再输密码；锁定本页将一并清空两页会话。</div>
            </div>
            <button
              class="h-9 w-full md:w-auto px-3 rounded-lg border border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400 text-sm"
              @click="lockDeals"
            >
              锁定页面
            </button>
          </div>

          <div class="rounded-xl border border-gray-200 bg-gray-50/60 p-4 md:p-5">
            <div class="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
              <div class="min-w-0 w-full flex-1 md:pr-2">
                <h2 class="text-lg md:text-xl font-semibold text-gray-900">进度查询</h2>
                <p class="text-sm text-gray-500 mt-1 break-words">查看当前合作项目进度，支持按服务、状态、年份和关键词筛选；点击表头列可排序，默认按最近沟通时间由近到远。合作编码列：有数据报告时在编码下方提供「查看报告」跳转并带合作编码筛选；无报告则仅展示编码。</p>
              </div>

              <div class="flex w-full shrink-0 flex-wrap items-center justify-start md:w-auto md:justify-end md:pt-0.5">
                <button
                  type="button"
                  class="shrink-0 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-center text-sm font-medium leading-snug text-indigo-700 hover:bg-indigo-100"
                  @click="copyDealsTableToClipboard"
                >
                  复制为表格（飞书可粘贴）
                </button>
              </div>
            </div>

            <div class="mb-5 grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-sm text-gray-500 mb-1">筛选服务类型</label>
                <select
                  v-model="dealServiceFilter"
                  class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="all">全部服务</option>
                  <option v-for="item in dealServiceOptions" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm text-gray-500 mb-1">筛选状态</label>
                <select
                  v-model="dealStatusFilter"
                  class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="all">全部状态</option>
                  <option v-for="item in dealStatusOptions" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm text-gray-500 mb-1">筛选年份</label>
                <select
                  v-model="dealYearFilter"
                  class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="all">全部年份</option>
                  <option v-for="item in dealYearOptions" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm text-gray-500 mb-1">关键词</label>
                <input
                  v-model="dealKeyword"
                  type="text"
                  placeholder="合作编码 / 品牌 / 服务 / 备注 / 进度"
                  class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
              </div>
            </div>

            <div class="overflow-x-auto rounded-xl border border-gray-100 bg-white">
              <table class="min-w-full text-sm">
                <thead class="bg-indigo-50/80 text-gray-700">
                  <tr>
                    <th class="w-[9rem] max-w-[9rem] px-2 py-3 align-middle" scope="col" :aria-sort="dealSortAriaSort('id')">
                      <button
                        type="button"
                        class="flex w-full flex-wrap items-center justify-center gap-0.5 rounded-md px-1 py-1 text-center text-xs font-semibold text-gray-800 hover:bg-indigo-100/80 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                        @click="setDealSort('id')"
                      >
                        合作编码
                        <span v-if="dealSortKey === 'id'" class="tabular-nums text-indigo-600" aria-hidden="true">{{ dealSortDir === 'asc' ? '↑' : '↓' }}</span>
                      </button>
                    </th>
                    <th class="px-2 py-3 align-middle" scope="col" :aria-sort="dealSortAriaSort('brand')">
                      <button
                        type="button"
                        class="flex w-full flex-wrap items-center justify-center gap-0.5 rounded-md px-1 py-1 text-center text-xs font-semibold text-gray-800 hover:bg-indigo-100/80 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                        @click="setDealSort('brand')"
                      >
                        品牌/项目
                        <span v-if="dealSortKey === 'brand'" class="tabular-nums text-indigo-600" aria-hidden="true">{{ dealSortDir === 'asc' ? '↑' : '↓' }}</span>
                      </button>
                    </th>
                    <th class="px-2 py-3 align-middle" scope="col" :aria-sort="dealSortAriaSort('service')">
                      <button
                        type="button"
                        class="flex w-full flex-wrap items-center justify-center gap-0.5 rounded-md px-1 py-1 text-center text-xs font-semibold text-gray-800 hover:bg-indigo-100/80 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                        @click="setDealSort('service')"
                      >
                        合作内容
                        <span v-if="dealSortKey === 'service'" class="tabular-nums text-indigo-600" aria-hidden="true">{{ dealSortDir === 'asc' ? '↑' : '↓' }}</span>
                      </button>
                    </th>
                    <th class="px-2 py-3 align-middle" scope="col" :aria-sort="dealSortAriaSort('progress')">
                      <button
                        type="button"
                        class="flex w-full flex-wrap items-center justify-center gap-0.5 rounded-md px-1 py-1 text-center text-xs font-semibold text-gray-800 hover:bg-indigo-100/80 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                        @click="setDealSort('progress')"
                      >
                        当前进度
                        <span v-if="dealSortKey === 'progress'" class="tabular-nums text-indigo-600" aria-hidden="true">{{ dealSortDir === 'asc' ? '↑' : '↓' }}</span>
                      </button>
                    </th>
                    <th class="w-[13rem] max-w-[13rem] px-2 py-3 align-middle" scope="col" :aria-sort="dealSortAriaSort('remark')">
                      <button
                        type="button"
                        class="flex w-full flex-wrap items-center justify-center gap-0.5 rounded-md px-1 py-1 text-center text-xs font-semibold text-gray-800 hover:bg-indigo-100/80 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                        @click="setDealSort('remark')"
                      >
                        备注
                        <span v-if="dealSortKey === 'remark'" class="tabular-nums text-indigo-600" aria-hidden="true">{{ dealSortDir === 'asc' ? '↑' : '↓' }}</span>
                      </button>
                    </th>
                    <th class="px-2 py-3 align-middle" scope="col" :aria-sort="dealSortAriaSort('referrer')">
                      <button
                        type="button"
                        class="flex w-full flex-wrap items-center justify-center gap-0.5 rounded-md px-1 py-1 text-center text-xs font-semibold text-gray-800 hover:bg-indigo-100/80 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                        @click="setDealSort('referrer')"
                      >
                        推荐人
                        <span v-if="dealSortKey === 'referrer'" class="tabular-nums text-indigo-600" aria-hidden="true">{{ dealSortDir === 'asc' ? '↑' : '↓' }}</span>
                      </button>
                    </th>
                    <th class="px-2 py-3 align-middle" scope="col" :aria-sort="dealSortAriaSort('updatedAt')">
                      <button
                        type="button"
                        class="flex w-full flex-wrap items-center justify-center gap-0.5 rounded-md px-1 py-1 text-center text-xs font-semibold text-gray-800 hover:bg-indigo-100/80 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                        @click="setDealSort('updatedAt')"
                      >
                        最近沟通时间
                        <span v-if="dealSortKey === 'updatedAt'" class="tabular-nums text-indigo-600" aria-hidden="true">{{ dealSortDir === 'asc' ? '↑' : '↓' }}</span>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, rowIdx) in filteredCommercialDeals"
                    :key="row.id || `deal-row-${rowIdx}`"
                    :class="[
                      'border-t border-gray-100',
                      isDealRowMuted(row) ? 'bg-gray-100/70 hover:bg-gray-100/90' : 'hover:bg-gray-50/70'
                    ]"
                  >
                    <td class="w-[9rem] max-w-[9rem] px-4 py-3 align-middle text-center">
                      <div v-if="displayCooperationId(row) !== '—'" class="mx-auto flex max-w-full flex-col items-center gap-1.5">
                        <span
                          class="font-mono text-xs leading-snug break-all"
                          :class="isDealRowMuted(row) ? 'text-gray-500' : 'text-indigo-900'"
                        >{{ displayCooperationId(row) }}</span>
                        <router-link
                          v-if="dealHasLinkedReport(row)"
                          :to="{ path: '/tob/reports', query: { coop: dealReportQueryCoop(row) } }"
                          class="text-xs font-semibold hover:underline"
                          :class="isDealRowMuted(row) ? 'text-gray-500 hover:text-gray-700' : 'text-indigo-600 hover:text-indigo-800'"
                        >
                          查看报告
                        </router-link>
                      </div>
                      <span v-else class="block font-mono text-xs text-gray-400">—</span>
                    </td>
                    <td
                      class="px-4 py-3 align-middle text-center font-medium"
                      :class="isDealRowMuted(row) ? 'text-gray-500' : 'text-gray-900'"
                    >{{ row.brand }}</td>
                    <td
                      class="px-4 py-3 align-middle text-center"
                      :class="isDealRowMuted(row) ? 'text-gray-500' : 'text-gray-700'"
                    >{{ row.service }}</td>
                    <td
                      class="px-4 py-3 align-middle text-center font-medium"
                      :class="dealProgressCellClass(row)"
                    >{{ row.progress }}</td>
                    <td
                      class="w-[13rem] max-w-[13rem] px-4 py-3 align-middle break-words text-center leading-snug whitespace-normal"
                      :class="isDealRowMuted(row) ? 'text-gray-500' : 'text-gray-700'"
                    >{{ displayDealRemark(row) }}</td>
                    <td
                      class="px-4 py-3 align-middle text-center"
                      :class="isDealRowMuted(row) ? 'text-gray-500' : 'text-gray-700'"
                    >{{ row.referrer || '-' }}</td>
                    <td
                      class="px-4 py-3 align-middle text-center"
                      :class="isDealRowMuted(row) ? 'text-gray-400' : 'text-gray-500'"
                    >{{ row.updatedAt }}</td>
                  </tr>
                  <tr v-if="filteredCommercialDeals.length === 0">
                    <td colspan="7" class="px-4 py-8 text-center text-gray-500">暂无匹配结果，请调整筛选条件。</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 md:px-5 md:py-4 text-indigo-900 font-medium leading-relaxed">
              如果大家近期时间充裕、接单意愿较强，欢迎随时沟通。目前整体仍处在拓展阶段，也希望大家多多引荐合适的合作机会。
            </div>
          </div>

        </template>
      </div>
    </section>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-[0.98]"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="copyFeedback"
          class="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center"
          aria-live="polite"
          role="status"
        >
          <div class="max-w-[min(24rem,90vw)] rounded-xl bg-gray-900/90 px-5 py-3 text-center text-sm font-medium text-white shadow-xl">
            {{ copyFeedback }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  INTERNAL_DEALS_CACHE_KEY,
  INTERNAL_ACCESS_CACHE_DURATION_MS,
  saveInternalAccessSession,
  readInternalAccessSession,
  clearInternalAccessSession,
  clearInternalAccessCaches
} from '../../utils/internalAccessCache'
import { normalizeCredential } from '../../utils/credentialNormalize'
import {
  createInternalDataSession,
  fetchCommercialDeals,
  fetchReportCooperationIds
} from '../../utils/internalDataApi'

const commercialDeals = ref([])
const isUnlocked = ref(false)
const isUnlocking = ref(false)
const credentialInput = ref('')
const unlockError = ref('')

const dealServiceFilter = ref('all')
const dealStatusFilter = ref('all')
const dealYearFilter = ref('all')
const dealKeyword = ref('')

const DEFAULT_DEAL_SORT_KEY = 'updatedAt'
const DEFAULT_DEAL_SORT_DIR = 'desc'

/** 排序列：合作编码 / 品牌 / 服务 / 进度 / 备注 / 推荐人 / 最近沟通时间 */
const dealSortKey = ref(DEFAULT_DEAL_SORT_KEY)
/** asc | desc；最近沟通默认 desc = 新→旧 */
const dealSortDir = ref(DEFAULT_DEAL_SORT_DIR)

const copyFeedback = ref('')
let copyFeedbackTimer = null

/** 报告数据里出现过的 cooperationId（需与本页共用会话凭证读取报告数据） */
const coopIdsWithReports = ref(new Set())

async function loadCoopIdsWithReports() {
  coopIdsWithReports.value = new Set()

  const sessionToken = readInternalAccessSession()

  if (!sessionToken) {
    return
  }

  try {
    const next = new Set()
    const ids = await fetchReportCooperationIds(sessionToken)

    for (const id of ids) {
      const cid = id != null ? String(id).trim() : ''

      if (cid) {
        next.add(cid.toLowerCase())
      }
    }

    coopIdsWithReports.value = next
  } catch {
    clearInternalAccessSession()
  }
}

/** 报告页 ?coop= 所用：可与本行合作编码不同（如同一客户二期沿用既有报告的 cooperationId）；统一大写传参 */
function dealReportQueryCoop(row) {
  const own = displayCooperationId(row)

  if (own === '—') {
    return ''
  }

  const alias = row?.reportCooperationId != null ? String(row.reportCooperationId).trim().toUpperCase() : ''

  return alias || own
}

function dealHasLinkedReport(row) {
  const key = dealReportQueryCoop(row)

  if (!key) {
    return false
  }

  return coopIdsWithReports.value.has(key.toLowerCase())
}

function flashCopyFeedback(message, durationMs = 1400) {
  copyFeedback.value = message
  if (copyFeedbackTimer) {
    clearTimeout(copyFeedbackTimer)
  }
  copyFeedbackTimer = setTimeout(() => {
    copyFeedback.value = ''
  }, durationMs)
}

function displayCooperationId(item) {
  if (item?.id != null && String(item.id).trim() !== '') {
    return String(item.id).trim().toUpperCase()
  }

  return '—'
}

/** 当前进度着色：已闭环绿、待结算黄、持续计费蓝；需求沟通 / 测试单黑；其余默认灰 */
function parseDealUpdatedAtTs(value) {
  if (value == null) {
    return 0
  }

  const parts = String(value).trim().split('.').map((p) => p.trim()).filter(Boolean)

  if (parts.length < 3) {
    return 0
  }

  const y = Number(parts[0])
  const m = Number(parts[1])
  const d = Number(parts[2])

  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) {
    return 0
  }

  const t = new Date(y, m - 1, d).getTime()

  return Number.isNaN(t) ? 0 : t
}

function setDealSort(key) {
  if (dealSortKey.value === key) {
    dealSortDir.value = dealSortDir.value === 'asc' ? 'desc' : 'asc'
    return
  }

  dealSortKey.value = key
  dealSortDir.value = key === 'updatedAt' ? 'desc' : 'asc'
}

function dealSortAriaSort(thKey) {
  if (dealSortKey.value !== thKey) {
    return 'none'
  }

  return dealSortDir.value === 'asc' ? 'ascending' : 'descending'
}

function isDealRowMuted(row) {
  return row?.muted === true
}

function dealProgressClass(progress) {
  const p = (progress != null && String(progress).trim()) || ''

  if (p === '已闭环') {
    return 'text-emerald-700'
  }

  if (p === '待结算') {
    return 'text-amber-700'
  }

  if (p === '持续计费') {
    return 'text-blue-700'
  }

  if (p === '测试单') {
    return 'text-red-700'
  }

  if (p.startsWith('需求沟通')) {
    return 'text-gray-900'
  }

  return 'text-gray-600'
}

/** 置灰行整行偏灰，但「测试单」仍用红色便于识别 */
function dealProgressCellClass(row) {
  const p = (row?.progress != null && String(row.progress).trim()) || ''
  if (p === '测试单') {
    return 'text-red-700'
  }
  if (isDealRowMuted(row)) {
    return 'text-gray-500'
  }
  return dealProgressClass(row.progress)
}

/** 备注列：新数据仅有 remark；旧缓存若仍含 category 则合并展示 */
function displayDealRemark(item) {
  const r = (item?.remark != null && String(item.remark).trim()) ? String(item.remark).trim() : ''
  const c = (item?.category != null && String(item.category).trim()) ? String(item.category).trim() : ''

  if (c && r) {
    return `${c}；${r}`
  }

  if (c) {
    return c
  }

  return r || '—'
}

function persistDealsCache(deals) {
  localStorage.setItem(INTERNAL_DEALS_CACHE_KEY, JSON.stringify({
    expiresAt: Date.now() + INTERNAL_ACCESS_CACHE_DURATION_MS,
    deals
  }))
}

function clearDealsCache() {
  localStorage.removeItem(INTERNAL_DEALS_CACHE_KEY)
}

function restoreDealsCache() {
  const rawCache = localStorage.getItem(INTERNAL_DEALS_CACHE_KEY)

  if (!rawCache) {
    return
  }

  try {
    const parsed = JSON.parse(rawCache)

    if (!parsed?.expiresAt || !Array.isArray(parsed?.deals)) {
      clearDealsCache()
      return
    }

    if (parsed.expiresAt <= Date.now()) {
      clearDealsCache()
      return
    }

    commercialDeals.value = parsed.deals
    isUnlocked.value = true

    const latestYear = parsed.deals
      .map((item) => item.updatedAt?.split('.')?.[0])
      .filter(Boolean)
      .sort((a, b) => b.localeCompare(a))[0]

    dealYearFilter.value = latestYear || 'all'
  } catch {
    clearDealsCache()
  }
}

async function unlockDeals() {
  const credential = normalizeCredential(credentialInput.value)

  if (!credential) {
    unlockError.value = '请输入有效凭证。'
    return
  }

  unlockError.value = ''
  isUnlocking.value = true

  try {
    const session = await createInternalDataSession(credential)
    const deals = await fetchCommercialDeals(session.token)

    if (!Array.isArray(deals)) {
      throw new Error('INVALID_DATA')
    }

    commercialDeals.value = deals
    isUnlocked.value = true
    credentialInput.value = ''
    persistDealsCache(deals)
    saveInternalAccessSession(session.token)

    const latestYear = deals
      .map((item) => item.updatedAt?.split('.')?.[0])
      .filter(Boolean)
      .sort((a, b) => b.localeCompare(a))[0]

    dealYearFilter.value = latestYear || 'all'
    await loadCoopIdsWithReports()
  } catch {
    unlockError.value = '凭证错误或数据读取失败，请检查后重试。'
    commercialDeals.value = []
    isUnlocked.value = false
  } finally {
    isUnlocking.value = false
  }
}

function lockDeals() {
  isUnlocked.value = false
  commercialDeals.value = []
  dealServiceFilter.value = 'all'
  dealStatusFilter.value = 'all'
  dealYearFilter.value = 'all'
  dealKeyword.value = ''
  unlockError.value = ''
  coopIdsWithReports.value = new Set()
  dealSortKey.value = DEFAULT_DEAL_SORT_KEY
  dealSortDir.value = DEFAULT_DEAL_SORT_DIR
  clearInternalAccessCaches()
}

async function tryUnlockDealsFromSharedSession() {
  const sessionToken = readInternalAccessSession()

  if (!sessionToken) {
    return
  }

  try {
    const deals = await fetchCommercialDeals(sessionToken)

    if (!Array.isArray(deals)) {
      throw new Error('INVALID_DATA')
    }

    commercialDeals.value = deals
    isUnlocked.value = true
    persistDealsCache(deals)
    saveInternalAccessSession(sessionToken)

    const latestYear = deals
      .map((item) => item.updatedAt?.split('.')?.[0])
      .filter(Boolean)
      .sort((a, b) => b.localeCompare(a))[0]

    dealYearFilter.value = latestYear || 'all'
    await loadCoopIdsWithReports()
  } catch {
    clearInternalAccessSession()
  }
}

async function copyDealsTableToClipboard() {
  const headers = ['合作编码', '品牌/项目', '合作内容', '当前进度', '备注', '推荐人', '最近沟通时间']

  const rows = filteredCommercialDeals.value.map((row) => {
    const coopId = displayCooperationId(row)
    const remarkCell = displayDealRemark(row)

    return [
      coopId === '—' ? '-' : coopId,
      row.brand || '-',
      row.service || '-',
      row.progress || '-',
      remarkCell === '—' ? '-' : remarkCell,
      row.referrer || '-',
      row.updatedAt || '-'
    ]
  })

  const tsv = [headers, ...rows]
    .map((line) => line.join('\t'))
    .join('\n')

  try {
    await navigator.clipboard.writeText(tsv)
    flashCopyFeedback(`已复制 ${rows.length} 条`)
  } catch {
    flashCopyFeedback('复制失败，请检查浏览器剪贴板权限。', 2400)
  }
}

const dealServiceOptions = computed(() => {
  return [...new Set(commercialDeals.value.map((item) => item.service))]
})

const dealStatusOptions = computed(() => {
  return [...new Set(commercialDeals.value.map((item) => item.progress))]
})

const dealYearOptions = computed(() => {
  const years = commercialDeals.value
    .map((item) => item.updatedAt?.split('.')?.[0])
    .filter(Boolean)
  return [...new Set(years)].sort((a, b) => b.localeCompare(a))
})

const filteredCommercialDeals = computed(() => {
  const keyword = dealKeyword.value.trim().toLowerCase()

  const list = commercialDeals.value.filter((item) => {
    const serviceMatch = dealServiceFilter.value === 'all' || item.service === dealServiceFilter.value
    const statusMatch = dealStatusFilter.value === 'all' || item.progress === dealStatusFilter.value
    const yearMatch = dealYearFilter.value === 'all' || (item.updatedAt?.split('.')?.[0] === dealYearFilter.value)

    const keywordMatch =
      keyword.length === 0 ||
      `${displayCooperationId(item)} ${item.brand} ${item.service} ${item.progress} ${displayDealRemark(item)} ${item.referrer || ''}`
        .toLowerCase()
        .includes(keyword)

    return serviceMatch && statusMatch && yearMatch && keywordMatch
  })

  const key = dealSortKey.value
  const dirAsc = dealSortDir.value === 'asc'

  return [...list].sort((a, b) => {
    const mutedA = a?.muted === true
    const mutedB = b?.muted === true
    if (mutedA !== mutedB) {
      return mutedA ? 1 : -1
    }

    let cmp = 0

    if (key === 'updatedAt') {
      const ta = parseDealUpdatedAtTs(a.updatedAt)
      const tb = parseDealUpdatedAtTs(b.updatedAt)
      cmp = ta === tb ? 0 : ta < tb ? -1 : 1
    } else if (key === 'id') {
      const ia = displayCooperationId(a)
      const ib = displayCooperationId(b)
      cmp = ia.localeCompare(ib, 'zh-CN', { sensitivity: 'base' })
    } else if (key === 'remark') {
      const ra = displayDealRemark(a)
      const rb = displayDealRemark(b)
      cmp = ra.localeCompare(rb, 'zh-CN', { sensitivity: 'base' })
    } else if (key === 'brand') {
      cmp = (a.brand || '').localeCompare(b.brand || '', 'zh-CN', { sensitivity: 'base' })
    } else if (key === 'service') {
      cmp = (a.service || '').localeCompare(b.service || '', 'zh-CN', { sensitivity: 'base' })
    } else if (key === 'progress') {
      cmp = (a.progress || '').localeCompare(b.progress || '', 'zh-CN', { sensitivity: 'base' })
    } else if (key === 'referrer') {
      cmp = (a.referrer || '').localeCompare(b.referrer || '', 'zh-CN', { sensitivity: 'base' })
    }

    if (cmp !== 0) {
      return dirAsc ? cmp : -cmp
    }

    const tieTa = parseDealUpdatedAtTs(a.updatedAt)
    const tieTb = parseDealUpdatedAtTs(b.updatedAt)

    if (tieTa !== tieTb) {
      return tieTb - tieTa
    }

    return displayCooperationId(a).localeCompare(displayCooperationId(b), 'zh-CN')
  })
})

onMounted(async () => {
  restoreDealsCache()

  if (!isUnlocked.value) {
    await tryUnlockDealsFromSharedSession()
  }

  if (isUnlocked.value) {
    await loadCoopIdsWithReports()
  }
})
</script>
