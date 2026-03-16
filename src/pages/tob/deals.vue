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

          <div class="flex items-center gap-4 lg:gap-6">
            <router-link
              to="/tob"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">🏠</span>
              <span>回到首页</span>
            </router-link>

            <router-link
              to="/tob/deals"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">🧭</span>
              <span>合作查询</span>
            </router-link>

            <router-link
              to="/matrix"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">🧩</span>
              <span>矩阵看板</span>
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

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 md:p-8">
        <div class="mb-6 md:mb-8">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">合作查询</h1>
          <div class="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm md:text-base">
            当前页信息已加密，仅支持凭证解密查看。
          </div>
        </div>

        <div
          v-if="!isUnlocked"
          class="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4 md:p-5"
        >
          <h2 class="text-base md:text-lg font-semibold text-indigo-900 mb-2">请输入访问凭证</h2>
          <p class="text-sm text-indigo-700 mb-2">凭证由联盟内部统一发放，输入后可解密展示合作查询内容。</p>
          <p class="text-xs md:text-sm text-indigo-600 mb-4">解密成功后，30 分钟内免重复输入，可持续查看。</p>

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
              {{ isUnlocking ? '解密中...' : '解密并查看' }}
            </button>
          </div>

          <p v-if="unlockError" class="mt-3 text-sm text-red-600">{{ unlockError }}</p>
        </div>

        <template v-else>
          <div class="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div class="rounded-lg border border-green-200 bg-green-50 px-3 py-2">
              <div class="text-sm text-green-700">✅ 已完成解密，可查看合作查询内容。</div>
              <div class="mt-1 text-xs text-green-600">当前设备 30 分钟内免重复输入，刷新页面后仍可继续查看。</div>
            </div>
            <button
              class="h-9 w-full md:w-auto px-3 rounded-lg border border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400 text-sm"
              @click="lockDeals"
            >
              锁定页面
            </button>
          </div>

          <div class="rounded-xl border border-gray-200 bg-gray-50/60 p-4 md:p-5">
            <div class="mb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <h2 class="text-lg md:text-xl font-semibold text-gray-900">进度查询</h2>
                <p class="text-sm text-gray-500 mt-1">查看当前合作项目进度，支持按服务、状态、年份和关键词筛选。</p>
              </div>

              <div class="flex items-center justify-end gap-3">
                <span v-if="copyFeedback" class="text-xs text-green-700 bg-green-50 border border-green-200 rounded px-2.5 py-1">
                  {{ copyFeedback }}
                </span>
                <button
                  class="h-9 px-3 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-sm font-medium"
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
                  placeholder="品牌名 / 服务名 / 分类 / 进度"
                  class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
              </div>
            </div>

            <div class="overflow-x-auto rounded-xl border border-gray-100 bg-white">
              <table class="min-w-full text-sm">
                <thead class="bg-indigo-50/80 text-gray-700">
                  <tr>
                    <th class="px-4 py-3 text-left font-semibold">品牌/项目</th>
                    <th class="px-4 py-3 text-left font-semibold">合作内容</th>
                    <th class="px-4 py-3 text-left font-semibold">服务分类</th>
                    <th class="px-4 py-3 text-left font-semibold">当前进度</th>
                    <th class="px-4 py-3 text-left font-semibold">备注</th>
                    <th class="px-4 py-3 text-left font-semibold">推荐人</th>
                    <th class="px-4 py-3 text-left font-semibold">最近沟通时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in filteredCommercialDeals"
                    :key="row.id"
                    class="border-t border-gray-100 hover:bg-gray-50/70"
                  >
                    <td class="px-4 py-3 font-medium text-gray-900">{{ row.brand }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ row.service }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ row.category || '-' }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ row.progress }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ row.remark || '-' }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ row.referrer || '-' }}</td>
                    <td class="px-4 py-3 text-gray-500">{{ row.updatedAt }}</td>
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

          <div class="mt-8 rounded-xl border border-indigo-100 bg-white p-4 md:p-5">
            <div class="mb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <h2 class="text-lg md:text-xl font-semibold text-gray-900">报告查询</h2>
                <p class="text-sm text-gray-500 mt-1">查询推广后的数据效果报告，支持关键词检索、一键复制和导出 PDF。</p>
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

            <div class="space-y-4">
              <article
                v-for="report in filteredPromotionReports"
                :key="report.id"
                class="rounded-xl border border-gray-200 bg-gray-50/70 p-4 md:p-5 shadow-sm"
              >
                <div class="mb-3 flex flex-col gap-3">
                  <div class="flex items-start justify-between gap-3">
                    <h3 class="text-base md:text-lg font-semibold text-gray-900 leading-6">{{ report.title }}</h3>
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
                      <div class="mt-1 font-medium leading-5 break-all">{{ report.reportCode }}</div>
                    </div>
                  </div>

                  <div>
                    <p v-if="reportCopyFeedback === report.id" class="text-xs text-green-700">
                      已复制完整报告信息。
                    </p>
                    <p v-else-if="reportCopyFeedback === `${report.id}-error`" class="text-xs text-red-600">
                      复制失败，请检查浏览器剪贴板权限。
                    </p>
                    <p v-if="reportExportFeedback === report.id" class="text-xs text-green-700 mt-1">
                      已打开 PDF 导出窗口，请在打印面板中选择“保存为 PDF”。
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
import { computed, onMounted, ref } from 'vue'
import { encryptedCommercialDealsPayload } from '../../data/commercialDeals.encrypted'
import { encryptedPromotionReportsPayload } from '../../data/promotionReports.encrypted'
import { decryptJsonPayload } from '../../utils/securePayload'

const DEALS_CACHE_KEY = 'blogger-alliance:deals-cache'
const DEALS_CACHE_DURATION = 30 * 60 * 1000

function createPayloadFingerprint(payload) {
  return [payload?.version, payload?.salt, payload?.iv, (payload?.ciphertext || '').length].join(':')
}

const DEALS_CACHE_FINGERPRINT = [
  createPayloadFingerprint(encryptedCommercialDealsPayload),
  createPayloadFingerprint(encryptedPromotionReportsPayload)
].join('|')

const commercialDeals = ref([])
const isUnlocked = ref(false)
const isUnlocking = ref(false)
const credentialInput = ref('')
const unlockError = ref('')

const dealServiceFilter = ref('all')
const dealStatusFilter = ref('all')
const dealYearFilter = ref('all')
const dealKeyword = ref('')
const copyFeedback = ref('')
const reportKeyword = ref('')
const reportCopyFeedback = ref('')
const reportExportFeedback = ref('')
const promotionReports = ref([])

let copyFeedbackTimer = null
let reportCopyFeedbackTimer = null
let reportExportFeedbackTimer = null

function attachReportCodes(reports) {
  return reports.map((report) => ({
    ...report,
    reportCode: createReportCode(report)
  }))
}

function persistDealsCache(deals, reports) {
  localStorage.setItem(DEALS_CACHE_KEY, JSON.stringify({
    expiresAt: Date.now() + DEALS_CACHE_DURATION,
    fingerprint: DEALS_CACHE_FINGERPRINT,
    deals,
    reports
  }))
}

function clearDealsCache() {
  localStorage.removeItem(DEALS_CACHE_KEY)
}

function restoreDealsCache() {
  const rawCache = localStorage.getItem(DEALS_CACHE_KEY)

  if (!rawCache) {
    return
  }

  try {
    const parsed = JSON.parse(rawCache)

    if (!parsed?.expiresAt || !Array.isArray(parsed?.deals) || !Array.isArray(parsed?.reports)) {
      clearDealsCache()
      return
    }

    if (parsed.fingerprint !== DEALS_CACHE_FINGERPRINT) {
      clearDealsCache()
      return
    }

    if (parsed.expiresAt <= Date.now()) {
      clearDealsCache()
      return
    }

    commercialDeals.value = parsed.deals
  promotionReports.value = attachReportCodes(parsed.reports)
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

async function hydratePromotionReportsFromEncrypted(credential) {
  try {
    const decryptedReports = await decryptJsonPayload(
      encryptedPromotionReportsPayload,
      credential || credentialInput.value.trim()
    )

    if (!Array.isArray(decryptedReports)) {
      throw new Error('INVALID_REPORT_DATA')
    }

    promotionReports.value = attachReportCodes(decryptedReports)
    return decryptedReports
  } catch {
    promotionReports.value = []
    throw new Error('REPORT_DECRYPT_FAILED')
  }
}

async function unlockDeals() {
  if (!credentialInput.value.trim()) {
    unlockError.value = '请输入有效凭证。'
    return
  }

  unlockError.value = ''
  isUnlocking.value = true

  const credential = credentialInput.value.trim()

  try {
    const decrypted = await decryptJsonPayload(encryptedCommercialDealsPayload, credential)

    if (!Array.isArray(decrypted)) {
      throw new Error('INVALID_DATA')
    }

    const decryptedReports = await hydratePromotionReportsFromEncrypted(credential)

    commercialDeals.value = decrypted
    isUnlocked.value = true
    credentialInput.value = ''
    persistDealsCache(decrypted, decryptedReports)

    const latestYear = decrypted
      .map((item) => item.updatedAt?.split('.')?.[0])
      .filter(Boolean)
      .sort((a, b) => b.localeCompare(a))[0]

    dealYearFilter.value = latestYear || 'all'
  } catch {
    unlockError.value = '凭证错误或数据解密失败，请检查后重试。'
    commercialDeals.value = []
    isUnlocked.value = false
  } finally {
    isUnlocking.value = false
  }
}

function lockDeals() {
  isUnlocked.value = false
  commercialDeals.value = []
  promotionReports.value = []
  dealServiceFilter.value = 'all'
  dealStatusFilter.value = 'all'
  dealYearFilter.value = 'all'
  dealKeyword.value = ''
  reportKeyword.value = ''
  reportCopyFeedback.value = ''
  reportExportFeedback.value = ''
  unlockError.value = ''
  clearDealsCache()
}

async function copyDealsTableToClipboard() {
  const headers = ['品牌/项目', '合作内容', '服务分类', '当前进度', '备注', '推荐人', '最近沟通时间']

  const rows = filteredCommercialDeals.value.map((row) => [
    row.brand || '-',
    row.service || '-',
    row.category || '-',
    row.progress || '-',
    row.remark || '-',
    row.referrer || '-',
    row.updatedAt || '-'
  ])

  const tsv = [headers, ...rows]
    .map((line) => line.join('\t'))
    .join('\n')

  try {
    await navigator.clipboard.writeText(tsv)
    copyFeedback.value = `已复制 ${rows.length} 条，可直接粘贴到飞书表格。`
  } catch {
    copyFeedback.value = '复制失败，请检查浏览器剪贴板权限。'
  }

  if (copyFeedbackTimer) {
    clearTimeout(copyFeedbackTimer)
  }
  copyFeedbackTimer = setTimeout(() => {
    copyFeedback.value = ''
  }, 2500)
}

async function copyReportData(report) {
  const reportText = [
    report.title,
    `报告编号：${report.reportCode}`,
    report.period,
    report.project,
    report.author,
    `推广平台：${report.platforms.join(' / ')}`,
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
        margin: 0 0 24px;
        color: #4b5563;
        font-size: 14px;
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
      <p class="subtitle">报告编号：${escapeReportHtml(report.reportCode)}</p>

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

function createReportHash(value) {
  return Array.from(value).reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) % 1679616
  }, 0).toString(36).toUpperCase().padStart(4, '0')
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

  return `RPT-${authorCode}-${platformCode}-${timestampCode}`
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

  return commercialDeals.value.filter((item) => {
    const serviceMatch = dealServiceFilter.value === 'all' || item.service === dealServiceFilter.value
    const statusMatch = dealStatusFilter.value === 'all' || item.progress === dealStatusFilter.value
    const yearMatch = dealYearFilter.value === 'all' || (item.updatedAt?.split('.')?.[0] === dealYearFilter.value)

    const keywordMatch =
      keyword.length === 0 ||
      `${item.brand} ${item.service} ${item.category || ''} ${item.progress} ${item.remark || ''} ${item.referrer || ''}`.toLowerCase().includes(keyword)

    return serviceMatch && statusMatch && yearMatch && keywordMatch
  })
})

const filteredPromotionReports = computed(() => {
  const keyword = reportKeyword.value.trim().toLowerCase()

  if (!keyword) {
    return promotionReports.value
  }

  return promotionReports.value.filter((report) => {
    return `${report.title} ${report.project} ${report.author} ${report.period} ${report.platforms.join(' ')} ${report.reportCode} ${report.content}`.toLowerCase().includes(keyword)
  })
})

onMounted(() => {
  restoreDealsCache()
})
</script>
