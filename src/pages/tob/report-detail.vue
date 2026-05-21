<template>
  <div class="min-h-screen bg-slate-50">
    <section class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-violet-600">客户报告</p>
          <h1 class="mt-1 text-2xl font-bold text-slate-950 md:text-3xl">推文数据报告</h1>
        </div>
        <button
          v-if="report"
          class="h-9 rounded-lg border border-violet-200 bg-violet-50 px-3 text-sm font-semibold text-violet-700 hover:bg-violet-100"
          @click="exportReportPdf"
        >
          导出 PDF
        </button>
      </div>

      <div v-if="!report" class="rounded-2xl border border-violet-200 bg-white p-5 shadow-sm md:p-6">
        <h2 class="text-lg font-semibold text-slate-900">请输入访问凭证</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600">该链接仅可查看当前报告，不提供报告列表查询。</p>
        <div class="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            v-model="credentialInput"
            type="password"
            class="h-10 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="请输入访问凭证"
            @keyup.enter="loadReport"
          >
          <button
            class="h-10 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
            :disabled="isLoading"
            @click="loadReport"
          >
            {{ isLoading ? '加载中...' : '查看报告' }}
          </button>
        </div>
        <p v-if="message" class="mt-3 text-sm" :class="messageIsError ? 'text-red-600' : 'text-emerald-700'">{{ message }}</p>
      </div>

      <article v-else class="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-200 px-5 py-5 md:px-7">
          <p class="text-xs font-semibold uppercase tracking-wide text-violet-600">数据报告</p>
          <h2 class="mt-1 text-2xl font-bold leading-tight text-slate-950">{{ report.project || report.title || '未命名报告' }}</h2>
          <p v-if="report.articleTitle" class="mt-2 text-sm text-slate-500">{{ formatArticleTitle(report.articleTitle) }}</p>
          <div class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            <span>报告 ID：<span class="font-mono text-slate-800">{{ report.id || '-' }}</span></span>
            <span>执行人：<span class="text-slate-800">{{ report.author || '-' }}</span></span>
            <span v-if="report.period">周期：<span class="text-slate-800">{{ report.period }}</span></span>
          </div>
          <div v-if="report.platforms?.length" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="platform in report.platforms"
              :key="platform"
              class="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700"
            >
              {{ platform }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 px-5 py-5 md:grid-cols-5 md:px-7">
          <MetricCard label="阅读" :value="report.stats?.reads" tone="teal" />
          <MetricCard label="点赞" :value="report.stats?.likes" tone="rose" />
          <MetricCard label="收藏" :value="report.stats?.favorites" tone="amber" />
          <MetricCard label="评论" :value="report.stats?.comments" tone="sky" />
          <MetricCard label="转发" :value="report.stats?.shares" tone="fuchsia" />
        </div>

        <div class="border-t border-slate-200 px-5 py-5 md:px-7">
          <div class="whitespace-pre-line text-sm leading-7 text-slate-700">{{ report.content || '暂无正文。' }}</div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchSinglePromotionReport, explainInternalDataError } from '../../utils/internalDataApi'
import { normalizeCredential } from '../../utils/credentialNormalize'

const route = useRoute()
const reportId = computed(() => String(route.params.id || '').trim())
const credentialInput = ref('')
const report = ref(null)
const isLoading = ref(false)
const message = ref('')
const messageIsError = ref(false)

const toneClasses = {
  teal: 'bg-teal-50 text-teal-900',
  rose: 'bg-rose-50 text-rose-900',
  amber: 'bg-amber-50 text-amber-900',
  sky: 'bg-sky-50 text-sky-900',
  fuchsia: 'bg-fuchsia-50 text-fuchsia-900'
}

const MetricCard = defineComponent({
  props: {
    label: { type: String, required: true },
    value: { type: [Number, String], default: 0 },
    tone: { type: String, default: 'teal' }
  },
  setup(props) {
    return () => h('div', {
      class: `rounded-xl px-3 py-3 ${toneClasses[props.tone] || toneClasses.teal}`
    }, [
      h('p', { class: 'text-xs opacity-80' }, props.label),
      h('p', { class: 'mt-1 text-lg font-semibold' }, formatNumber(props.value))
    ])
  }
})

function setMessage(text, isError = false) {
  message.value = text
  messageIsError.value = isError
}

async function loadReport() {
  const credential = normalizeCredential(credentialInput.value)
  if (!reportId.value) {
    setMessage('报告链接无效。', true)
    return
  }
  if (!credential) {
    setMessage('请输入访问凭证。', true)
    return
  }

  isLoading.value = true
  setMessage('')
  try {
    report.value = await fetchSinglePromotionReport(reportId.value, credential)
    credentialInput.value = ''
  } catch (error) {
    if (error?.message === 'NOT_FOUND') {
      setMessage('未找到该报告。', true)
    } else {
      setMessage(explainInternalDataError(error, 'read'), true)
    }
  } finally {
    isLoading.value = false
  }
}

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

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderMetricCard(label, value) {
  return `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(formatNumber(value))}</strong></div>`
}

function buildReportPrintHtml(currentReport) {
  const platforms = Array.isArray(currentReport.platforms) ? currentReport.platforms : []
  const title = currentReport.project || currentReport.title || '数据报告'
  const articleTitle = currentReport.articleTitle ? formatArticleTitle(currentReport.articleTitle) : ''
  const stats = currentReport.stats || {}
  const contentBlocks = String(currentReport.content || '暂无正文。')
    .split(/\n{2,}/)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
    .join('')

  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>${escapeHtml(title)} - PDF</title><style>
    @page { size: A4; margin: 18mm 16mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; line-height: 1.72; }
    .page { max-width: 760px; margin: 0 auto; }
    .eyebrow { color: #6d28d9; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    h1 { margin: 8px 0 4px; font-size: 26px; line-height: 1.25; }
    .article-title { margin: 0 0 14px; color: #64748b; font-size: 14px; }
    .meta { display: flex; flex-wrap: wrap; gap: 8px 18px; margin: 14px 0; color: #475569; font-size: 12px; }
    .platforms { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0 18px; }
    .platform { border: 1px solid #ddd6fe; border-radius: 999px; padding: 3px 9px; color: #6d28d9; background: #f5f3ff; font-size: 12px; }
    .metrics { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin: 18px 0; }
    .metric { border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; background: #f8fafc; }
    .metric span { display: block; color: #64748b; font-size: 12px; }
    .metric strong { display: block; margin-top: 4px; color: #0f172a; font-size: 18px; }
    .content { margin-top: 18px; border-top: 1px solid #e2e8f0; padding-top: 14px; font-size: 14px; }
    .content p { margin: 0 0 12px; }
    @media print { .page { max-width: none; } }
  </style></head><body><main class="page">
    <div class="eyebrow">数据报告</div>
    <h1>${escapeHtml(title)}</h1>
    ${articleTitle ? `<p class="article-title">${escapeHtml(articleTitle)}</p>` : ''}
    <div class="meta">
      <span>报告 ID：${escapeHtml(currentReport.id || '-')}</span>
      <span>执行人：${escapeHtml(currentReport.author || '-')}</span>
      ${currentReport.period ? `<span>周期：${escapeHtml(currentReport.period)}</span>` : ''}
    </div>
    ${platforms.length ? `<div class="platforms">${platforms.map((platform) => `<span class="platform">${escapeHtml(platform)}</span>`).join('')}</div>` : ''}
    <section class="metrics">
      ${renderMetricCard('阅读', stats.reads)}
      ${renderMetricCard('点赞', stats.likes)}
      ${renderMetricCard('收藏', stats.favorites)}
      ${renderMetricCard('评论', stats.comments)}
      ${renderMetricCard('转发', stats.shares)}
    </section>
    <section class="content">${contentBlocks}</section>
  </main></body></html>`
}

function exportReportPdf() {
  if (!report.value) return
  const printWindow = window.open('', '_blank', 'width=960,height=720')
  if (!printWindow) {
    setMessage('无法打开 PDF 导出窗口，请允许浏览器弹窗后重试。', true)
    return
  }
  printWindow.document.open()
  printWindow.document.write(buildReportPrintHtml(report.value))
  printWindow.document.close()
  printWindow.focus()
  printWindow.setTimeout(() => {
    printWindow.print()
  }, 250)
}
</script>
