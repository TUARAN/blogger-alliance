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
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">数据报告查询</h1>
          <div class="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm md:text-base">
            当前页信息已加密，仅支持凭证解密查看。与「合作进度查询」共用凭证：任一页解密成功后 30 分钟内，另一页自动可查看（无需重复输入）。
          </div>
        </div>

        <div
          v-if="!isUnlocked"
          class="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4 md:p-5"
        >
          <h2 class="text-base md:text-lg font-semibold text-indigo-900 mb-2">请输入访问凭证</h2>
          <p class="text-sm text-indigo-700 mb-2">凭证由联盟内部统一发放，输入后可解密展示报告内容。若在「合作进度查询」已解过密，此处通常会自动进入。</p>
          <p class="text-xs md:text-sm text-indigo-600 mb-4">解密成功后 30 分钟内，两页共用免密；点击「锁定页面」将同时关闭两页访问。若在中文输入法下键入，可能混入全角字符导致与粘贴不一致；请改用英文输入或直接从可靠来源复制。</p>

          <div class="flex flex-col md:flex-row gap-3">
            <input
              v-model="credentialInput"
              type="password"
              placeholder="请输入访问凭证"
              class="flex-1 h-10 px-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              @keyup.enter="unlockReports"
            >
            <button
              :disabled="isUnlocking"
              class="h-10 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
              @click="unlockReports"
            >
              {{ isUnlocking ? '解密中...' : '解密并查看' }}
            </button>
          </div>

          <p v-if="unlockError" class="mt-3 text-sm text-red-600">{{ unlockError }}</p>
        </div>

        <template v-else>
          <div class="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div class="rounded-lg border border-green-200 bg-green-50 px-3 py-2">
              <div class="text-sm text-green-700">✅ 已完成解密，可查看报告内容。</div>
              <div class="mt-1 text-xs text-green-600">30 分钟内「合作进度查询」页也无需再输密码；锁定本页将一并清空两页会话。</div>
            </div>
            <button
              class="h-9 w-full md:w-auto px-3 rounded-lg border border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400 text-sm"
              @click="lockReports"
            >
              锁定页面
            </button>
          </div>

          <div class="rounded-xl border border-indigo-100 bg-white p-4 md:p-5">
            <div
              v-if="coopRouteFilter"
              class="mb-4 flex flex-col gap-2 rounded-lg border border-indigo-200 bg-indigo-50/90 px-3 py-2.5 text-sm text-indigo-900 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
            >
              <p class="min-w-0 leading-relaxed">
                已按合作进度表的 <span class="font-mono font-semibold">{{ coopRouteFilter.toUpperCase() }}</span> 筛选报告；编号为「合作编码·RPT-…」整段大写，其中 <span class="rounded bg-violet-200/80 px-1 font-mono font-semibold">合作编码</span> 与进度表一致。与
                <router-link to="/tob/deals" class="font-medium underline decoration-indigo-400 underline-offset-2 hover:text-indigo-700">合作进度查询</router-link>
                内对应。
                <span v-if="filteredPromotionReports.length === 0" class="mt-1 block text-amber-800">当前无匹配条目，请确认报告编号前缀（· 前）与进度表合作编码（大写）一致。</span>
              </p>
              <button
                type="button"
                class="h-8 shrink-0 rounded-lg border border-indigo-300 bg-white px-3 text-xs font-medium text-indigo-800 hover:bg-indigo-100"
                @click="clearCoopRouteFilter"
              >
                显示全部报告
              </button>
            </div>

            <div class="mb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <h2 class="text-lg md:text-xl font-semibold text-gray-900">数据效果报告</h2>
                <p class="text-sm text-gray-500 mt-1">查询推广后的数据效果报告；报告编号统一大写，「·」前为合作编码（高亮样式），可从合作进度表跳转筛选。</p>
              </div>

              <div class="w-full md:w-80">
                <label class="block text-sm text-gray-500 mb-1">报告关键词</label>
                <input
                  v-model="reportKeyword"
                  type="text"
                  placeholder="输入：平台 / 阅读 / 点赞 / 作者 等"
                  class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
              </div>
            </div>

            <div
              v-if="filteredPromotionReports.length > 0"
              class="mb-4 rounded-xl border border-violet-100 bg-gradient-to-r from-violet-50/95 to-indigo-50/90 px-4 py-4 text-sm text-gray-900 shadow-sm"
            >
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p class="text-xs font-semibold tracking-wide text-violet-700">统计概览</p>
                    <button
                      type="button"
                      class="rounded-md text-xs font-medium text-violet-800 underline decoration-violet-300 underline-offset-2 hover:bg-violet-100/60 hover:no-underline px-1.5 py-0.5 -mx-1.5"
                      @click="statsOverviewExpanded = !statsOverviewExpanded"
                    >
                      {{ statsOverviewExpanded ? '收起详情' : '展开详情' }}
                    </button>
                  </div>
                  <p v-if="!statsOverviewExpanded" class="mt-2 leading-relaxed">
                    目前总计
                    <span class="font-bold tabular-nums text-violet-800">{{ filteredReportsAggregate.count }}</span>
                    条报告；主指标 <span class="font-medium text-violet-700">阅读量</span>
                    <span class="font-bold tabular-nums text-gray-900">{{ formatStatDisplay(filteredReportsAggregate.reads) }}</span>
                  </p>
                  <template v-else>
                    <p class="mt-2 leading-relaxed">
                      目前总计
                      <span class="font-bold tabular-nums text-violet-800">{{ filteredReportsAggregate.count }}</span>
                      条报告，数据表现：
                      <span class="tabular-nums font-medium text-gray-900">{{ formatStatDisplay(filteredReportsAggregate.reads) }}</span> 阅读量、
                      <span class="tabular-nums font-medium text-gray-900">{{ formatStatDisplay(filteredReportsAggregate.likes) }}</span> 点赞、
                      <span class="tabular-nums font-medium text-gray-900">{{ formatStatDisplay(filteredReportsAggregate.favorites) }}</span> 收藏、
                      <span class="tabular-nums font-medium text-gray-900">{{ formatStatDisplay(filteredReportsAggregate.comments) }}</span> 评论、
                      <span class="tabular-nums font-medium text-gray-900">{{ formatStatDisplay(filteredReportsAggregate.shares) }}</span> 转发
                    </p>
                    <p class="mt-3 text-xs leading-relaxed text-gray-600">
                      分项说明：按执行人时，每条报告只计一次，并汇总整稿数据。按推广平台时，优先使用源数据中的 platformStats 分项；未填写时按整稿数据在各已选平台间均分（近似值）。
                    </p>

                    <div class="mt-4 grid gap-4 lg:grid-cols-2">
                      <div class="overflow-x-auto rounded-lg border border-white/60 bg-white/50">
                        <div class="border-b border-violet-100/80 px-3 py-2 text-xs font-semibold text-violet-800">按执行人</div>
                        <table class="min-w-full text-left text-xs text-gray-800">
                          <thead class="bg-violet-50/80 text-[11px] text-violet-700">
                            <tr>
                              <th class="whitespace-nowrap px-3 py-2 font-medium">执行人</th>
                              <th class="whitespace-nowrap px-3 py-2 font-medium">阅读</th>
                              <th class="whitespace-nowrap px-3 py-2 font-medium">点赞</th>
                              <th class="whitespace-nowrap px-3 py-2 font-medium">收藏</th>
                              <th class="whitespace-nowrap px-3 py-2 font-medium">评论</th>
                              <th class="whitespace-nowrap px-3 py-2 font-medium">转发</th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-violet-100/70">
                            <tr v-for="row in filteredReportsBreakdownByAuthor" :key="`author-${row.label}`" class="bg-white/40">
                              <td class="max-w-[8rem] truncate px-3 py-2 font-medium" :title="row.label">{{ row.label }}</td>
                              <td class="whitespace-nowrap px-3 py-2 tabular-nums">{{ formatStatDisplay(row.reads) }}</td>
                              <td class="whitespace-nowrap px-3 py-2 tabular-nums">{{ formatStatDisplay(row.likes) }}</td>
                              <td class="whitespace-nowrap px-3 py-2 tabular-nums">{{ formatStatDisplay(row.favorites) }}</td>
                              <td class="whitespace-nowrap px-3 py-2 tabular-nums">{{ formatStatDisplay(row.comments) }}</td>
                              <td class="whitespace-nowrap px-3 py-2 tabular-nums">{{ formatStatDisplay(row.shares) }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div class="overflow-x-auto rounded-lg border border-white/60 bg-white/50">
                        <div class="border-b border-violet-100/80 px-3 py-2 text-xs font-semibold text-violet-800">按推广平台</div>
                        <table class="min-w-full text-left text-xs text-gray-800">
                          <thead class="bg-violet-50/80 text-[11px] text-violet-700">
                            <tr>
                              <th class="whitespace-nowrap px-3 py-2 font-medium">平台</th>
                              <th class="whitespace-nowrap px-3 py-2 font-medium">阅读</th>
                              <th class="whitespace-nowrap px-3 py-2 font-medium">点赞</th>
                              <th class="whitespace-nowrap px-3 py-2 font-medium">收藏</th>
                              <th class="whitespace-nowrap px-3 py-2 font-medium">评论</th>
                              <th class="whitespace-nowrap px-3 py-2 font-medium">转发</th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-violet-100/70">
                            <tr v-for="row in filteredReportsBreakdownByPlatform" :key="`plat-${row.label}`" class="bg-white/40">
                              <td class="max-w-[10rem] truncate px-3 py-2 font-medium" :title="row.label">{{ row.label }}</td>
                              <td class="whitespace-nowrap px-3 py-2 tabular-nums">{{ formatStatDisplay(row.reads) }}</td>
                              <td class="whitespace-nowrap px-3 py-2 tabular-nums">{{ formatStatDisplay(row.likes) }}</td>
                              <td class="whitespace-nowrap px-3 py-2 tabular-nums">{{ formatStatDisplay(row.favorites) }}</td>
                              <td class="whitespace-nowrap px-3 py-2 tabular-nums">{{ formatStatDisplay(row.comments) }}</td>
                              <td class="whitespace-nowrap px-3 py-2 tabular-nums">{{ formatStatDisplay(row.shares) }}</td>
                            </tr>
                          </tbody>
                        </table>
                        <p class="border-t border-violet-100/60 px-3 py-2 text-[11px] leading-relaxed text-gray-500">
                          各行为分项来自 platformStats（若有）或整稿均分；与单条报告正文中的渠道描述对照时，以正文为准。
                        </p>
                      </div>
                    </div>
                  </template>
                </div>
                <button
                  type="button"
                  class="h-9 shrink-0 rounded-lg border border-violet-200 bg-white px-3 text-sm font-medium text-violet-800 hover:bg-violet-50"
                  @click="copyFilteredStatsSummary"
                >
                  复制全部统计
                </button>
              </div>
              <p v-if="statsSummaryCopyFeedback" class="mt-2 text-xs text-green-700">{{ statsSummaryCopyFeedback }}</p>
            </div>

            <div class="space-y-4">
              <article
                v-for="report in filteredPromotionReports"
                :id="`report-card-${report.id}`"
                :key="report.id"
                class="scroll-mt-24 rounded-xl border border-gray-200 bg-gray-50/70 p-4 md:p-5 shadow-sm"
              >
                <div class="mb-3 flex flex-col gap-3">
                  <div class="flex items-start justify-between gap-3">
                    <h3 class="text-base md:text-lg font-semibold text-gray-900 leading-6">{{ report.project }}</h3>
                    <div class="flex shrink-0 flex-wrap items-center gap-2">
                      <button
                        class="inline-flex h-9 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 px-3 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
                        @click="copyReportData(report)"
                      >
                        复制数据
                      </button>
                      <button
                        class="inline-flex h-9 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 px-3 text-sm font-medium text-rose-700 hover:bg-rose-100"
                        @click="exportReportToPdf(report)"
                      >
                        导出 PDF
                      </button>
                    </div>
                  </div>

                  <div
                    v-if="report.promotionArticleTitle"
                    class="rounded-lg border border-slate-200 bg-slate-50/90 px-3 py-2 text-xs md:text-sm text-slate-800"
                  >
                    <div class="text-slate-500">推广文章标题</div>
                    <div class="mt-1 font-medium leading-snug text-slate-900">
                      {{ formatPromotionArticleTitleDisplay(report.promotionArticleTitle) }}
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs md:text-sm">
                    <div class="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-indigo-800">
                      <div class="text-indigo-500">统计周期</div>
                      <div class="mt-1 font-medium leading-5">{{ report.period }}</div>
                    </div>
                    <div class="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-amber-800">
                      <div class="text-amber-500">合作项目</div>
                      <div class="mt-1 font-medium leading-5">{{ report.project }}</div>
                    </div>
                    <div class="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-emerald-800">
                      <div class="text-emerald-500">执行人</div>
                      <div class="mt-1 font-medium leading-5">{{ report.author }}</div>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm">
                    <div class="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2 text-sky-800">
                      <div class="text-sky-500">推广平台</div>
                      <div class="mt-1 font-medium leading-5">{{ report.platforms.join(' / ') }}</div>
                    </div>
                    <div class="rounded-lg border border-violet-100 bg-violet-50 px-3 py-2 text-violet-800">
                      <div class="text-violet-500">报告编号</div>
                      <template v-for="code in [reportCodeParts(report)]" :key="`code-${report.id}`">
                        <div v-if="code.mode === 'split'" class="mt-1 inline-flex max-w-full flex-wrap items-baseline gap-x-0.5 break-all font-mono text-xs font-semibold leading-6 text-violet-950 md:text-sm">
                          <span class="rounded-md bg-violet-200 px-1.5 py-0.5 font-bold tracking-tight text-violet-950">{{ code.highlight }}</span>
                          <span class="font-bold text-violet-500">{{ code.sep }}</span>
                          <span>{{ code.rest }}</span>
                        </div>
                        <div v-else-if="code.mode === 'plain'" class="mt-1 break-all font-mono text-xs font-semibold leading-6 text-violet-950 md:text-sm">
                          {{ code.rest }}
                        </div>
                        <div v-else class="mt-1 text-violet-400">—</div>
                      </template>
                    </div>
                  </div>

                  <div class="rounded-lg border border-teal-100 bg-teal-50/70 px-3 py-2 text-xs md:text-sm text-teal-950">
                    <div class="text-teal-700/90">数据表现</div>
                    <p class="mt-1 font-medium leading-6 text-teal-950">
                      {{ formatStatDisplay(report.stats.reads) }} 阅读量、{{ formatStatDisplay(report.stats.likes) }} 点赞、{{
                        formatStatDisplay(report.stats.favorites)
                      }} 收藏、{{ formatStatDisplay(report.stats.comments) }} 评论、{{ formatStatDisplay(report.stats.shares) }} 转发
                    </p>
                  </div>

                  <div>
                    <p v-if="reportCopyFeedback === report.id" class="text-xs text-green-700">
                      已复制完整报告信息。
                    </p>
                    <p v-else-if="reportCopyFeedback === `${report.id}-error`" class="text-xs text-red-600">
                      复制失败，请检查浏览器剪贴板权限。
                    </p>
                    <p v-if="reportExportFeedback === report.id" class="text-xs text-green-700 mt-1">
                      已打开 PDF 导出窗口，请在打印面板中选择"保存为 PDF"。
                    </p>
                    <p v-else-if="reportExportFeedback === `${report.id}-error`" class="text-xs text-red-600 mt-1">
                      导出失败，请检查浏览器弹窗权限后重试。
                    </p>
                  </div>
                </div>
                <div class="rounded-lg bg-white/80 px-3 py-3 md:px-4 md:py-4">
                  <p class="text-sm md:text-base leading-7 text-gray-700 whitespace-pre-line">{{ report.content }}</p>
                </div>
              </article>

              <div
                v-if="filteredPromotionReports.length === 0"
                class="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-8 text-center text-sm text-gray-500"
              >
                未找到匹配报告，请更换关键词后重试。
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { encryptedPromotionReportsPayload } from '../../data/promotionReports.encrypted'
import { decryptJsonPayload } from '../../utils/securePayload'
import {
  REPORTS_CACHE_KEY,
  SECURE_DATA_CACHE_DURATION_MS,
  saveSecureUnlockSession,
  readSecureUnlockSession,
  clearSecureUnlockSession,
  clearAllEncryptedInternalCaches
} from '../../utils/secureDataCaches'
import { normalizeCredential } from '../../utils/credentialNormalize'

function createPayloadFingerprint(payload) {
  return [payload?.version, payload?.salt, payload?.iv, (payload?.ciphertext || '').length].join(':')
}

const REPORTS_CACHE_FINGERPRINT = createPayloadFingerprint(encryptedPromotionReportsPayload)

const route = useRoute()
const router = useRouter()

function parseCoopRouteQueryValue(raw) {
  if (raw == null) {
    return ''
  }

  const s = Array.isArray(raw) ? raw[0] : raw

  if (typeof s !== 'string') {
    return ''
  }

  try {
    return decodeURIComponent(s).trim()
  } catch {
    return s.trim()
  }
}

const coopRouteFilter = computed(() => parseCoopRouteQueryValue(route.query.coop))

function reportMatchesCoopFilter(report, coopSlug) {
  if (!coopSlug) {
    return true
  }

  const slug = coopSlug.trim().toLowerCase()
  const cid = (report.cooperationId != null && String(report.cooperationId).trim().toLowerCase()) || ''

  if (cid === slug) {
    return true
  }

  const code = (report.reportCode != null && String(report.reportCode)) || ''
  const codeLower = code.toLowerCase()

  return codeLower.startsWith(`${slug}·`)
}

function clearCoopRouteFilter() {
  const nextQuery = { ...route.query }

  delete nextQuery.coop
  router.replace({ path: route.path, query: nextQuery })
}

const promotionReports = ref([])
const isUnlocked = ref(false)
const isUnlocking = ref(false)
const credentialInput = ref('')
const unlockError = ref('')
const reportKeyword = ref('')
const reportCopyFeedback = ref('')
const reportExportFeedback = ref('')
const statsSummaryCopyFeedback = ref('')
/** 统计概览：默认折叠，仅展示总阅读量一条主指标；展开后显示全文与分项表 */
const statsOverviewExpanded = ref(false)

let reportCopyFeedbackTimer = null
let reportExportFeedbackTimer = null
let statsSummaryCopyTimer = null

function createReportHash(value) {
  return Array.from(value).reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) % 1679616
  }, 0).toString(36).toUpperCase().padStart(4, '0')
}

function normalizeReportAuthor(author) {
  if (author == null || typeof author !== 'string') {
    return author
  }

  const trimmed = author.trim()

  if (!trimmed) {
    return author
  }

  if (/是[yY]u欸\s*[\/／]\s*晓雨的笔记本/.test(trimmed)) {
    return '晓雨'
  }

  if (/^晓雨\s*\(\s*是[yY]u欸\s*\)\s*$/.test(trimmed)) {
    return '晓雨'
  }

  return author
}

function resolvePromotionArticleTitle(report) {
  const explicit = typeof report.articleTitle === 'string' ? report.articleTitle.trim() : ''

  if (explicit) {
    return explicit
  }

  const t = (report.title || '').trim()

  if (t && t !== '数据报告') {
    return t
  }

  return ''
}

function formatPromotionArticleTitleDisplay(raw) {
  if (raw == null || typeof raw !== 'string') {
    return ''
  }

  const t = raw.trim()

  if (!t) {
    return ''
  }

  if (t.startsWith('《') && t.endsWith('》')) {
    return t
  }

  return `《${t}》`
}

function displayReportCatalogTitle(report) {
  const t = (report.title || '').trim()

  if (resolvePromotionArticleTitle(report) && t !== '数据报告') {
    return '数据报告'
  }

  return t || '数据报告'
}

const REPORT_STATS_KEYS = ['reads', 'likes', 'favorites', 'comments', 'shares']

const REPORT_STATS_ALIASES = {
  reads: ['reads', '阅读量', 'read', 'readCount', 'views', '浏览量'],
  likes: ['likes', '点赞', 'like', '点赞数'],
  favorites: ['favorites', '收藏', 'favorite', 'collect', '收藏数'],
  comments: ['comments', '评论', 'comment', '评论数'],
  shares: ['shares', '转发', 'share', 'repost', '转发量']
}

function parseNonNegativeInt(value) {
  if (value == null) {
    return null
  }

  const n = Number(String(value).replace(/[\s,，]/g, ''))

  if (!Number.isFinite(n) || n < 0) {
    return null
  }

  return Math.floor(n)
}

function normalizeReportStats(report) {
  const raw = report.stats && typeof report.stats === 'object' ? report.stats : {}
  const out = {}

  for (const key of REPORT_STATS_KEYS) {
    let v = null

    for (const alias of REPORT_STATS_ALIASES[key]) {
      if (raw[alias] == null) {
        continue
      }

      const parsed = parseNonNegativeInt(raw[alias])

      if (parsed != null) {
        v = parsed
        break
      }
    }

    out[key] = v ?? 0
  }

  return out
}

function cleanContentStatCapture(segment) {
  return String(segment)
    .replace(/[。，、；;\s|]+$/g, '')
    .replace(/^\s*\|?\s*/, '')
    .trim()
}

function parseContentStatNumber(raw) {
  if (raw == null) {
    return null
  }

  let s = cleanContentStatCapture(raw)

  if (!s) {
    return null
  }

  s = s.replace(/\u00a0/g, ' ').replace(/[\s,，]/g, '')
  s = s.replace(/\+$/, '')

  const wan = s.match(/^(\d+(?:\.\d+)?)万$/)

  if (wan) {
    const n = Number(wan[1])

    if (!Number.isFinite(n) || n < 0) {
      return null
    }

    return Math.floor(n * 10000)
  }

  const n = Number(s)

  if (!Number.isFinite(n) || n < 0) {
    return null
  }

  return Math.floor(n)
}

function extractStatsFromReportContent(text) {
  const raw = typeof text === 'string' ? text : ''
  const out = emptyStatSums()
  const num = '([\\d,，.\\s]+(?:\\+)?(?:万)?)'
  const patterns = {
    reads: [
      /"reads"\s*:\s*(\d+)/,
      /"阅读量"\s*:\s*(\d+)/,
      new RegExp(`阅读量[：:\\s]*${num}`),
      new RegExp(`浏览量[：:\\s]*${num}`),
      /\|\s*阅读量\s*\|\s*([^|\n]+)/,
      /\|\s*浏览量\s*\|\s*([^|\n]+)/
    ],
    likes: [
      /"likes"\s*:\s*(\d+)/,
      /"点赞"\s*:\s*(\d+)/,
      new RegExp(`点赞(?:量|数)?[：:\\s]*${num}`),
      new RegExp(`获赞[：:\\s]*${num}`),
      /\|\s*点赞(?:量)?\s*\|\s*([^|\n]+)/
    ],
    favorites: [
      /"favorites"\s*:\s*(\d+)/,
      /"收藏"\s*:\s*(\d+)/,
      new RegExp(`收藏(?:量|数)?[：:\\s]*${num}`),
      /\|\s*收藏(?:量)?\s*\|\s*([^|\n]+)/
    ],
    comments: [
      /"comments"\s*:\s*(\d+)/,
      /"评论"\s*:\s*(\d+)/,
      new RegExp(`评论(?:量|数)?[：:\\s]*${num}`),
      /\|\s*评论(?:量)?\s*\|\s*([^|\n]+)/
    ],
    shares: [
      /"shares"\s*:\s*(\d+)/,
      /"转发"\s*:\s*(\d+)/,
      new RegExp(`转发(?:量|数)?[：:\\s]*${num}`),
      new RegExp(`分享(?:量|数)?[：:\\s]*${num}`),
      /\|\s*转发(?:量)?\s*\|\s*([^|\n]+)/
    ]
  }

  for (const key of REPORT_STATS_KEYS) {
    const list = patterns[key]

    for (const re of list) {
      const m = raw.match(re)

      if (!m || m[1] == null) {
        continue
      }

      const n = parseContentStatNumber(m[1])

      if (n != null && n > 0) {
        out[key] = n
        break
      }
    }
  }

  return out
}

function mergeReportStatsFromObjectAndContent(statsFromObject, content) {
  const fromText = extractStatsFromReportContent(content)
  const out = {}

  for (const key of REPORT_STATS_KEYS) {
    const a = statsFromObject[key] || 0
    const b = fromText[key] || 0
    out[key] = a > 0 ? a : b
  }

  return out
}

function emptyStatSums() {
  return Object.fromEntries(REPORT_STATS_KEYS.map((k) => [k, 0]))
}

function addStatsToRow(row, stats) {
  const s = stats || {}

  for (const key of REPORT_STATS_KEYS) {
    row[key] += Number(s[key]) || 0
  }
}

function distributeStatTotalEvenly(total, n) {
  const t = Number(total) || 0

  if (n <= 0) {
    return []
  }

  const base = Math.floor(t / n)
  const rem = t - base * n

  return Array.from({ length: n }, (_, i) => base + (i < rem ? 1 : 0))
}

/** 各平台分项：优先用源数据 platformStats；否则将整稿 stats 均分到 platforms */
function buildPlatformStatContributions(report) {
  const labels = Array.isArray(report.platforms) && report.platforms.length > 0
    ? report.platforms.map((p) => {
      const s = (p != null && String(p).trim()) || ''

      return s || '未填写'
    })
    : ['未填写']

  const raw = report.platformStats

  if (raw && typeof raw === 'object') {
    const contrib = {}

    for (const label of labels) {
      const st = raw[label]
      const o = emptyStatSums()

      if (st && typeof st === 'object') {
        for (const key of REPORT_STATS_KEYS) {
          o[key] = Number(st[key]) || 0
        }
      }

      contrib[label] = o
    }

    return contrib
  }

  const n = labels.length
  const contrib = {}

  for (const label of labels) {
    contrib[label] = emptyStatSums()
  }

  for (const statKey of REPORT_STATS_KEYS) {
    const parts = distributeStatTotalEvenly(report.stats?.[statKey], n)

    labels.forEach((label, i) => {
      contrib[label][statKey] = parts[i] || 0
    })
  }

  return contrib
}

function formatStatDisplay(value) {
  const n = Number(value)

  if (!Number.isFinite(n) || n < 0) {
    return '0'
  }

  return Math.floor(n).toLocaleString('zh-CN')
}

function formatReportStatsSentence(stats) {
  const s = stats || {}

  return `${formatStatDisplay(s.reads)} 阅读量、${formatStatDisplay(s.likes)} 点赞、${formatStatDisplay(s.favorites)} 收藏、${formatStatDisplay(s.comments)} 评论、${formatStatDisplay(s.shares)} 转发`
}

function formatReportStatsSearchBlob(stats) {
  const s = stats || {}

  return REPORT_STATS_KEYS.map((k) => s[k]).join(' ')
}

const REPORT_CODE_SEPARATOR = '·'

/** 整段编号大写展示用（复制等） */
function formatReportCodePlainUpper(report) {
  return String(report?.reportCode || '').trim().toUpperCase()
}

/**
 * 报告编号拆成高光 ID（· 前）与后半段；无分隔符则整段归入 rest
 */
function reportCodeParts(report) {
  const raw = String(report?.reportCode || '').trim()

  if (!raw) {
    return { mode: 'empty', highlight: '', sep: REPORT_CODE_SEPARATOR, rest: '' }
  }

  const idx = raw.indexOf(REPORT_CODE_SEPARATOR)

  if (idx <= 0) {
    return { mode: 'plain', highlight: '', sep: REPORT_CODE_SEPARATOR, rest: raw.toUpperCase() }
  }

  const prefix = raw.slice(0, idx).trim()
  const suffix = raw.slice(idx + REPORT_CODE_SEPARATOR.length).trim()

  return {
    mode: 'split',
    highlight: prefix.toUpperCase(),
    sep: REPORT_CODE_SEPARATOR,
    rest: suffix.toUpperCase()
  }
}

function buildReportCodePrintLineInnerHtml(report) {
  const parts = reportCodeParts(report)

  if (parts.mode === 'empty') {
    return ''
  }

  if (parts.mode === 'plain') {
    return `<span class="mono">${escapeReportHtml(parts.rest)}</span>`
  }

  return `<span class="mono"><span class="report-id">${escapeReportHtml(parts.highlight)}</span>${escapeReportHtml(parts.sep)}${escapeReportHtml(parts.rest)}</span>`
}

function formatReportPrintStatsBlock(report) {
  const line = formatReportStatsSentence(report.stats)

  return `<div class="card" style="grid-column: 1 / -1;">
          <div class="label">数据表现</div>
          <div class="value">${escapeReportHtml(line)}</div>
        </div>`
}

function formatReportTimestamp(value) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '000000000000'
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}${month}${day}${hours}${minutes}`
}

function createReportCode(report) {
  const authorCode = createReportHash(report.author)
  const platformCode = createReportHash(report.platforms.join('|'))
  const timestampCode = formatReportTimestamp(report.publishedAt)
  const suffix = `RPT-${authorCode}-${platformCode}-${timestampCode}`
  const coop = (report.cooperationId != null && String(report.cooperationId).trim()) || ''

  if (coop) {
    return `${coop.toUpperCase()}·${suffix}`
  }

  return suffix
}

function attachReportCodes(reports) {
  return reports.map((report) => {
    const next = { ...report, author: normalizeReportAuthor(report.author) }
    const promotionArticleTitle = resolvePromotionArticleTitle(next)
    const statsNormalized = normalizeReportStats(next)
    const stats = mergeReportStatsFromObjectAndContent(statsNormalized, next.content)
    const withStats = { ...next, stats }
    const platformStatContributions = buildPlatformStatContributions(withStats)

    return {
      ...next,
      promotionArticleTitle,
      stats,
      platformStatContributions,
      reportCode: createReportCode(next)
    }
  })
}

function persistReportsCache(reports) {
  localStorage.setItem(REPORTS_CACHE_KEY, JSON.stringify({
    expiresAt: Date.now() + SECURE_DATA_CACHE_DURATION_MS,
    fingerprint: REPORTS_CACHE_FINGERPRINT,
    reports
  }))
}

function clearReportsCache() {
  localStorage.removeItem(REPORTS_CACHE_KEY)
}

function restoreReportsCache() {
  const rawCache = localStorage.getItem(REPORTS_CACHE_KEY)

  if (!rawCache) {
    return
  }

  try {
    const parsed = JSON.parse(rawCache)

    if (!parsed?.expiresAt || !Array.isArray(parsed?.reports)) {
      clearReportsCache()
      return
    }

    if (parsed.fingerprint !== REPORTS_CACHE_FINGERPRINT) {
      clearReportsCache()
      return
    }

    if (parsed.expiresAt <= Date.now()) {
      clearReportsCache()
      return
    }

    promotionReports.value = attachReportCodes(parsed.reports)
    isUnlocked.value = true
  } catch {
    clearReportsCache()
  }
}

async function unlockReports() {
  const credential = normalizeCredential(credentialInput.value)

  if (!credential) {
    unlockError.value = '请输入有效凭证。'
    return
  }

  unlockError.value = ''
  isUnlocking.value = true

  try {
    const decryptedReports = await decryptJsonPayload(encryptedPromotionReportsPayload, credential)

    if (!Array.isArray(decryptedReports)) {
      throw new Error('INVALID_REPORT_DATA')
    }

    promotionReports.value = attachReportCodes(decryptedReports)
    isUnlocked.value = true
    credentialInput.value = ''
    persistReportsCache(decryptedReports)
    saveSecureUnlockSession(credential)
  } catch {
    unlockError.value = '凭证错误或数据解密失败，请检查后重试。'
    promotionReports.value = []
    isUnlocked.value = false
  } finally {
    isUnlocking.value = false
  }
}

function lockReports() {
  isUnlocked.value = false
  promotionReports.value = []
  reportKeyword.value = ''
  reportCopyFeedback.value = ''
  reportExportFeedback.value = ''
  statsSummaryCopyFeedback.value = ''
  statsOverviewExpanded.value = false
  unlockError.value = ''
  clearAllEncryptedInternalCaches()
}

async function tryUnlockReportsFromSharedSession() {
  const credential = readSecureUnlockSession()

  if (!credential) {
    return
  }

  try {
    const decryptedReports = await decryptJsonPayload(encryptedPromotionReportsPayload, credential)

    if (!Array.isArray(decryptedReports)) {
      throw new Error('INVALID_REPORT_DATA')
    }

    promotionReports.value = attachReportCodes(decryptedReports)
    isUnlocked.value = true
    persistReportsCache(decryptedReports)
    saveSecureUnlockSession(credential)
  } catch {
    clearSecureUnlockSession()
  }
}

async function copyReportData(report) {
  const reportText = [
    `报告标题：${displayReportCatalogTitle(report)}`,
    `报告编号：${formatReportCodePlainUpper(report)}`,
    report.period,
    `合作项目：${report.project}`,
    ...(report.promotionArticleTitle
      ? [`推广文章标题：${formatPromotionArticleTitleDisplay(report.promotionArticleTitle)}`]
      : []),
    `执行人：${report.author}`,
    `推广平台：${report.platforms.join(' / ')}`,
    `数据表现：${formatReportStatsSentence(report.stats)}`,
    '',
    report.content
  ].join('\n')

  try {
    await navigator.clipboard.writeText(reportText)
    reportCopyFeedback.value = report.id
  } catch {
    reportCopyFeedback.value = `${report.id}-error`
  }

  if (reportCopyFeedbackTimer) {
    clearTimeout(reportCopyFeedbackTimer)
  }

  reportCopyFeedbackTimer = setTimeout(() => {
    reportCopyFeedback.value = ''
  }, 2500)
}

function escapeReportHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildReportPrintHtml(report) {
  const catalogTitle = displayReportCatalogTitle(report)
  const promotionTitleBlock = report.promotionArticleTitle
    ? `<p class="promotion-title">推广文章标题：${escapeReportHtml(formatPromotionArticleTitleDisplay(report.promotionArticleTitle))}</p>`
    : ''

  const paragraphs = report.content
    .split(/\n\n+/)
    .map((paragraph) => `<p>${escapeReportHtml(paragraph).replace(/\n/g, '<br />')}</p>`)
    .join('')

  const platformTags = report.platforms
    .map((platform) => `<span class="tag">${escapeReportHtml(platform)}</span>`)
    .join('')

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeReportHtml(report.project)} - 数据报告</title>
    <style>
      :root {
        color-scheme: light;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 32px;
        font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
        color: #111827;
        background: #f8fafc;
        line-height: 1.7;
      }
      .sheet {
        max-width: 860px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 20px;
        padding: 32px;
        box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
      }
      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border-radius: 999px;
        background: #eef2ff;
        color: #4338ca;
        font-size: 12px;
        font-weight: 600;
      }
      h1 {
        margin: 16px 0 8px;
        font-size: 28px;
        line-height: 1.3;
      }
      .subtitle {
        margin: 0 0 8px;
        color: #4b5563;
        font-size: 14px;
      }
      .promotion-title {
        margin: 0 0 20px;
        color: #374151;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.5;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 20px;
      }
      .card {
        border: 1px solid #e5e7eb;
        border-radius: 14px;
        padding: 14px 16px;
        background: #f9fafb;
      }
      .label {
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 6px;
      }
      .value {
        font-size: 15px;
        color: #111827;
        font-weight: 600;
        word-break: break-word;
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .tag {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: #eff6ff;
        color: #1d4ed8;
        padding: 4px 10px;
        font-size: 12px;
        font-weight: 600;
      }
      .content {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #e5e7eb;
      }
      .content p {
        margin: 0 0 16px;
        font-size: 15px;
        color: #1f2937;
      }
      .mono {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 14px;
        word-break: break-all;
      }
      .report-id {
        display: inline-block;
        background: #e9d5ff;
        color: #4c1d95;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 6px;
        margin-right: 1px;
      }
      @media print {
        body {
          background: #ffffff;
          padding: 0;
        }
        .sheet {
          max-width: none;
          border: none;
          border-radius: 0;
          box-shadow: none;
          padding: 0;
        }
      }
    </style>
  </head>
  <body>
    <main class="sheet">
      <div class="eyebrow">数据报告</div>
      <h1>${escapeReportHtml(report.project)}</h1>
      <p class="subtitle">报告编号：${buildReportCodePrintLineInnerHtml(report)}</p>
      <p class="subtitle">报告标题：${escapeReportHtml(catalogTitle)}</p>
      ${promotionTitleBlock}

      <section class="grid">
        <div class="card">
          <div class="label">统计周期</div>
          <div class="value">${escapeReportHtml(report.period)}</div>
        </div>
        <div class="card">
          <div class="label">执行人</div>
          <div class="value">${escapeReportHtml(report.author)}</div>
        </div>
        <div class="card" style="grid-column: 1 / -1;">
          <div class="label">推广平台</div>
          <div class="tags">${platformTags}</div>
        </div>
        ${formatReportPrintStatsBlock(report)}
      </section>

      <section class="content">${paragraphs}</section>
    </main>
  </body>
</html>`
}

function exportReportToPdf(report) {
  const printWindow = window.open('', '_blank', 'width=960,height=1200')

  if (!printWindow) {
    reportExportFeedback.value = `${report.id}-error`
  } else {
    printWindow.document.open()
    printWindow.document.write(buildReportPrintHtml(report))
    printWindow.document.close()

    printWindow.onload = () => {
      printWindow.focus()
      printWindow.print()
    }

    reportExportFeedback.value = report.id
  }

  if (reportExportFeedbackTimer) {
    clearTimeout(reportExportFeedbackTimer)
  }

  reportExportFeedbackTimer = setTimeout(() => {
    reportExportFeedback.value = ''
  }, 3500)
}

const filteredPromotionReports = computed(() => {
  const coop = coopRouteFilter.value
  let list = promotionReports.value

  if (coop) {
    list = list.filter((report) => reportMatchesCoopFilter(report, coop))
  }

  const keyword = reportKeyword.value.trim().toLowerCase()

  if (!keyword) {
    return list
  }

  return list.filter((report) => {
    return `${report.title} ${report.project} ${report.promotionArticleTitle || ''} ${report.author} ${report.period} ${report.platforms.join(' ')} ${report.reportCode} ${report.cooperationId || ''} ${formatReportStatsSearchBlob(report.stats)} ${report.content}`
      .toLowerCase()
      .includes(keyword)
  })
})

watch(
  [coopRouteFilter, isUnlocked, () => promotionReports.value.length],
  async () => {
    const coop = coopRouteFilter.value

    if (!coop || !isUnlocked.value) {
      return
    }

    await nextTick()

    const visible = filteredPromotionReports.value

    if (!visible.length) {
      return
    }

    const el = document.getElementById(`report-card-${visible[0].id}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  },
  { flush: 'post' }
)

const filteredReportsAggregate = computed(() => {
  const list = filteredPromotionReports.value
  const sums = emptyStatSums()

  for (const r of list) {
    addStatsToRow(sums, r.stats)
  }

  return { count: list.length, ...sums }
})

const filteredReportsBreakdownByAuthor = computed(() => {
  const list = filteredPromotionReports.value
  const map = new Map()

  for (const r of list) {
    const label = (r.author && String(r.author).trim()) || '未填写'

    if (!map.has(label)) {
      map.set(label, { label, count: 0, ...emptyStatSums() })
    }

    const row = map.get(label)
    row.count += 1
    addStatsToRow(row, r.stats)
  }

  return Array.from(map.values()).sort((a, b) => b.reads - a.reads || b.count - a.count || a.label.localeCompare(b.label, 'zh-CN'))
})

const filteredReportsBreakdownByPlatform = computed(() => {
  const list = filteredPromotionReports.value
  const map = new Map()

  for (const r of list) {
    const contrib = r.platformStatContributions || {}

    for (const [label, st] of Object.entries(contrib)) {
      const key = (label != null && String(label).trim()) || '未填写'

      if (!map.has(key)) {
        map.set(key, { label: key, ...emptyStatSums() })
      }

      addStatsToRow(map.get(key), st)
    }
  }

  return Array.from(map.values()).sort((a, b) => b.reads - a.reads || a.label.localeCompare(b.label, 'zh-CN'))
})

function buildFilteredStatsSummaryText() {
  const agg = filteredReportsAggregate.value
  const lines = [
    '【数据效果报告 · 汇总】',
    `目前总计 ${agg.count} 条报告，数据表现：${formatReportStatsSentence(agg)}`,
    '',
    '【按执行人】'
  ]

  for (const row of filteredReportsBreakdownByAuthor.value) {
    lines.push(`${row.label}：${formatReportStatsSentence(row)}`)
  }

  lines.push('', '【按推广平台】')

  for (const row of filteredReportsBreakdownByPlatform.value) {
    lines.push(`${row.label}：${formatReportStatsSentence(row)}`)
  }

  return lines.join('\n')
}

async function copyFilteredStatsSummary() {
  const text = buildFilteredStatsSummaryText()

  try {
    await navigator.clipboard.writeText(text)
    statsSummaryCopyFeedback.value = '已复制当前列表的全部统计（含汇总与分项）。'
  } catch {
    statsSummaryCopyFeedback.value = '复制失败，请检查浏览器剪贴板权限。'
  }

  if (statsSummaryCopyTimer) {
    clearTimeout(statsSummaryCopyTimer)
  }

  statsSummaryCopyTimer = setTimeout(() => {
    statsSummaryCopyFeedback.value = ''
  }, 2800)
}

onMounted(async () => {
  restoreReportsCache()

  if (!isUnlocked.value) {
    await tryUnlockReportsFromSharedSession()
  }
})
</script>
