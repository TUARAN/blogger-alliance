<template>
  <div class="space-y-5">
    <section class="overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-sm">
      <div class="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-6 text-white md:p-8">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-200">Owner · Management Review</p>
        <h2 class="mt-3 text-2xl font-bold md:text-3xl">2026 年上半年运营支撑回顾</h2>
        <p class="mt-2 text-sm leading-6 text-indigo-100">统计区间：2026 年 1 月 1 日—6 月 30 日 · 根据合作台账实时生成 · 仅站长可见</p>
        <p class="mt-4 max-w-3xl text-sm leading-6 text-indigo-100">
          这是内部管理口径，不是审计财报。台账以「最近沟通时间」筛选上半年记录；金额来自本机解密的结算填报，不能据此认定已收款、已确认收入或净利润。
        </p>
      </div>

      <div class="p-5 md:p-6">
        <div class="mb-5 rounded-xl border-l-4 border-indigo-500 bg-indigo-50/70 px-4 py-3">
          <h3 class="text-sm font-semibold text-indigo-950">经营概览</h3>
          <p class="mt-1 text-sm leading-6 text-slate-700">
            上半年纳入 {{ halfYearReport.dealCount }} 条合作记录，其中 {{ halfYearReport.closed }} 条标为已闭环或已完成，
            {{ halfYearReport.inProgress }} 条仍在执行或待结算，{{ halfYearReport.other }} 条处于其他进度。
            {{ halfYearReport.encrypted }} 条附有加密结算，当前设备已解密 {{ halfYearReport.decrypted }} 条。
          </p>
        </div>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p class="text-xs text-slate-500">上半年合作记录</p>
            <p class="mt-1 text-2xl font-bold text-slate-900 tabular-nums">{{ halfYearReport.dealCount }} <span class="text-sm font-normal">条</span></p>
            <p class="mt-2 text-xs text-slate-500">按最近沟通时间筛选</p>
          </div>
          <div class="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
            <p class="text-xs text-emerald-800">已闭环 / 已完成</p>
            <p class="mt-1 text-2xl font-bold text-emerald-950 tabular-nums">{{ halfYearReport.closed }} <span class="text-sm font-normal">条</span></p>
            <p class="mt-2 text-xs text-emerald-800">按台账进度文本归类</p>
          </div>
          <div class="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
            <p class="text-xs text-amber-800">执行 / 待结算</p>
            <p class="mt-1 text-2xl font-bold text-amber-950 tabular-nums">{{ halfYearReport.inProgress }} <span class="text-sm font-normal">条</span></p>
            <p class="mt-2 text-xs text-amber-800">尚不能视为回款</p>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white p-4">
            <p class="text-xs text-slate-500">其他进度</p>
            <p class="mt-1 text-2xl font-bold text-slate-900 tabular-nums">{{ halfYearReport.other }} <span class="text-sm font-normal">条</span></p>
            <p class="mt-2 text-xs text-slate-500">包含沟通中、暂不推进等</p>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center justify-between gap-2">
          <h3 class="text-base font-bold text-slate-900">结算填报概览</h3>
          <span class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-800">
            已解密 {{ halfYearReport.decrypted }}/{{ halfYearReport.encrypted }} 条密文
          </span>
        </div>

        <div v-if="halfYearReport.decrypted === 0" class="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          🔒 本设备尚未解密上半年结算。启用或授权站长设备后，才会在本机计算金额汇总。
        </div>
        <template v-else>
          <div v-if="halfYearReport.locked" class="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
            还有 {{ halfYearReport.locked }} 条密文未解密；以下是已解密记录的小计，并非全量金额。
          </div>
          <div class="mt-3 grid gap-3 md:grid-cols-3">
            <div v-for="field in amountFields" :key="field.key" class="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4">
              <p class="text-xs font-medium text-indigo-700">{{ field.label }}填报合计</p>
              <p class="mt-2 text-xl font-bold text-slate-900 tabular-nums">{{ halfYearReport.fields[field.key].count ? formatMoney(halfYearReport.fields[field.key].total) : '—' }}</p>
              <p class="mt-2 text-xs text-slate-500">
                {{ halfYearReport.fields[field.key].count }} 条可计算 ·
                {{ halfYearReport.fields[field.key].missing }} 条未填 ·
                {{ halfYearReport.fields[field.key].unparsed }} 条待核对
              </p>
            </div>
          </div>
        </template>

        <div class="mt-6 grid gap-4 lg:grid-cols-2">
          <div class="rounded-xl border border-slate-200 p-4">
            <h3 class="text-sm font-semibold text-slate-900">统计口径</h3>
            <ul class="mt-3 list-disc space-y-2 pl-5 text-xs leading-6 text-slate-600">
              <li>范围是台账「最近沟通时间」落在 2026 年 1—6 月的合作；该日期不是成交或收款日期。</li>
              <li>前向、后向、运营支撑分别合计已解密、可计算的填报值；三者不强制相减或勾稽。</li>
              <li>仅计算纯数字及简单四则运算；文字说明与无法计算的金额不进入合计。</li>
              <li>{{ halfYearReport.withoutSettlement }} 条没有结算密文；{{ halfYearReport.locked }} 条当前设备未解密。税费、成本、实收、回款日期及利润未建立完整凭证口径，故不展示利润或人均分配。</li>
            </ul>
          </div>
          <div class="rounded-xl border border-slate-200 p-4">
            <h3 class="text-sm font-semibold text-slate-900">待核对事项</h3>
            <p v-if="halfYearReport.exceptions.length === 0" class="mt-3 text-xs leading-6 text-slate-500">已解密记录中没有无法计算的金额文本。未填字段仍需结合下方明细核对。</p>
            <ul v-else class="mt-3 space-y-2 text-xs leading-5 text-slate-600">
              <li v-for="item in halfYearReport.exceptions" :key="`${item.id}-${item.field}`">
                {{ item.brand || item.id }}：{{ amountLabel(item.field) }}含非数值内容，未计入合计
              </li>
            </ul>
            <p class="mt-3 text-xs leading-5 text-slate-500">数据来源：Git 合作台账与站长设备本地解密结果；每次打开页面按当前同步数据重新计算。</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="summaries.length > 0" class="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50/60 p-5 shadow-sm md:p-6">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Ops Support</p>
          <h2 class="mt-2 text-xl font-bold text-slate-900 md:text-2xl">
            {{ currentSummary?.title || '运营支撑总结' }}
          </h2>
          <p class="mt-2 text-sm text-slate-500">
            {{ currentSummary?.period || '—' }} · {{ currentSummary?.participantCount || 0 }} 位参与者 ·
            {{ currentSummary?.status || '待核算' }}
          </p>
        </div>

        <select
          v-if="summaries.length > 1"
          v-model="selectedSummaryId"
          class="h-10 rounded-lg border border-amber-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option v-for="summary in summaries" :key="summary.id" :value="summary.id">
            {{ summary.period }}
          </option>
        </select>
      </div>

      <div v-if="!plainSummary" class="mt-5 rounded-xl border border-dashed border-amber-300 bg-white/70 px-4 py-5">
        <p class="text-sm font-semibold text-amber-900">🔒 半年结算已加密</p>
        <p class="mt-2 text-sm leading-6 text-amber-800">
          只有持有已授权设备私钥的 owner 能查看金额与分配明细。请先在台账页启用或授权本设备。
        </p>
      </div>

      <template v-else>
        <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-xl border border-white bg-white/85 px-4 py-4 shadow-sm">
            <p class="text-xs text-slate-500">基础款合计</p>
            <p class="mt-1 text-xl font-bold text-slate-900 tabular-nums">{{ formatMoney(plainSummary.grossBasis) }}</p>
          </div>
          <div class="rounded-xl border border-white bg-white/85 px-4 py-4 shadow-sm">
            <p class="text-xs text-slate-500">计税后金额</p>
            <p class="mt-1 text-xl font-bold text-slate-900 tabular-nums">{{ formatMoney(plainSummary.postTax) }}</p>
          </div>
          <div class="rounded-xl border border-white bg-white/85 px-4 py-4 shadow-sm">
            <p class="text-xs text-slate-500">可分配金额</p>
            <p class="mt-1 text-xl font-bold text-amber-800 tabular-nums">{{ formatMoney(plainSummary.distributable) }}</p>
          </div>
          <div class="rounded-xl border border-amber-200 bg-amber-100/70 px-4 py-4 shadow-sm">
            <p class="text-xs text-amber-800">每人到手</p>
            <p class="mt-1 text-xl font-bold text-amber-950 tabular-nums">{{ formatMoney(plainSummary.perPerson) }}</p>
          </div>
        </div>

        <div class="mt-5 grid gap-4 lg:grid-cols-2">
          <div class="rounded-xl border border-slate-200 bg-white/85 p-4">
            <h3 class="text-sm font-semibold text-slate-900">核算口径</h3>
            <ol class="mt-3 space-y-3 text-sm text-slate-600">
              <li>
                <span class="font-medium text-slate-800">1. 汇总基础款项</span>
                <p class="mt-1 text-xs leading-5">{{ basisFormula }}</p>
              </li>
              <li>
                <span class="font-medium text-slate-800">2. 扣除专项费用</span>
                <ul class="mt-1 space-y-1 text-xs">
                  <li v-for="item in plainSummary.adjustments || []" :key="item.label">
                    {{ item.label }}：{{ formatMoney(item.amount) }}
                  </li>
                </ul>
              </li>
              <li>
                <span class="font-medium text-slate-800">3. 按内部口径计税</span>
                <p class="mt-1 text-xs leading-5">
                  计税基数 {{ formatMoney(plainSummary.tax?.base) }} ×
                  {{ formatPercent(plainSummary.tax?.rate) }} =
                  {{ formatMoney(plainSummary.tax?.amount) }}
                </p>
              </li>
              <li>
                <span class="font-medium text-slate-800">4. 扣除对公成本并分配</span>
                <p class="mt-1 text-xs leading-5">
                  对公成本 {{ formatMoney(plainSummary.corporateCost) }}；
                  {{ plainSummary.participantCount || currentSummary?.participantCount || 0 }} 人平均分配。
                </p>
              </li>
            </ol>
          </div>

          <div class="rounded-xl border border-slate-200 bg-white/85 p-4">
            <h3 class="text-sm font-semibold text-slate-900">口径说明</h3>
            <p class="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
              {{ plainSummary.note || '暂无补充说明。' }}
            </p>
            <p class="mt-3 text-xs leading-5 text-slate-400">
              本页用于内部运营核算留档；税务申报与票据处理应以实际业务性质和正式凭证为准。
            </p>
          </div>
        </div>
      </template>
    </section>

    <section class="rounded-2xl border border-indigo-100 bg-white shadow-sm">
      <div class="border-b border-slate-100 p-4 md:p-5">
        <div class="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 class="text-lg font-bold text-slate-900">合作结算明细</h2>
            <p class="mt-1 text-sm text-slate-500">仅展示已加密的合作结算；金额在当前设备本地解密。</p>
          </div>
          <div class="grid w-full gap-2 sm:w-auto sm:grid-cols-2">
            <select
              v-model="serviceFilter"
              class="h-9 rounded-lg border border-slate-300 bg-white px-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">全部服务</option>
              <option v-for="service in serviceOptions" :key="service" :value="service">{{ service }}</option>
            </select>
            <input
              v-model="keyword"
              class="h-9 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="品牌 / 编码 / 人员"
              type="search"
            >
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-indigo-50/70 text-left text-xs font-semibold text-slate-600">
            <tr>
              <th class="px-4 py-3">合作</th>
              <th class="px-4 py-3">服务 / 进度</th>
              <th class="px-4 py-3">承接人</th>
              <th class="px-4 py-3">结算明细</th>
              <th class="px-4 py-3">最近沟通</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="deal in filteredSettledDeals" :key="deal.id" class="border-t border-slate-100 align-top">
              <td class="px-4 py-3">
                <p class="font-medium text-slate-900">{{ deal.brand }}</p>
                <p class="mt-1 font-mono text-[11px] text-slate-400">{{ deal.id }}</p>
                <p v-if="settlementMap.get(deal.id)?.activity" class="mt-1 max-w-xs text-xs leading-5 text-slate-500">{{ settlementMap.get(deal.id).activity }}</p>
              </td>
              <td class="px-4 py-3 text-slate-600">
                <p>{{ deal.service }}</p>
                <p class="mt-1 text-xs text-slate-400">{{ deal.progress }}</p>
              </td>
              <td class="px-4 py-3 text-slate-600">{{ deal.owner || '—' }}</td>
              <td class="px-4 py-3">
                <span v-if="!settlementMap.has(deal.id)" class="text-xs text-amber-700">🔒 当前设备未解密</span>
                <div v-else class="space-y-1 text-xs text-slate-700">
                  <p v-if="settlementMap.get(deal.id).dealAmount">成交金额 {{ formatSettlementValue(settlementMap.get(deal.id).dealAmount) }}</p>
                  <p v-if="settlementMap.get(deal.id).forward">前向 {{ formatSettlementValue(settlementMap.get(deal.id).forward) }}</p>
                  <p v-if="settlementMap.get(deal.id).backward">后向 {{ formatSettlementValue(settlementMap.get(deal.id).backward) }}</p>
                  <p v-if="settlementMap.get(deal.id).opsSupport">运营支撑 {{ formatSettlementValue(settlementMap.get(deal.id).opsSupport) }}</p>
                  <p v-if="settlementMap.get(deal.id).financeNote" class="max-w-md whitespace-pre-line leading-5 text-slate-500">
                    {{ settlementMap.get(deal.id).financeNote }}
                  </p>
                  <p v-if="settlementMap.get(deal.id).detail" class="max-w-md whitespace-pre-line leading-5 text-slate-500">
                    {{ settlementMap.get(deal.id).detail }}
                  </p>
                </div>
              </td>
              <td class="px-4 py-3 font-mono text-xs text-slate-500">{{ deal.updatedAt || '—' }}</td>
            </tr>
            <tr v-if="filteredSettledDeals.length === 0">
              <td colspan="5" class="px-4 py-10 text-center text-sm text-slate-400">没有匹配的加密结算。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { isEncryptedSettlement } from '../utils/settlementCrypto.js'
import { makeOpsHalfYearReport } from '../utils/opsHalfYearReport.js'

const props = defineProps({
  summaries: { type: Array, default: () => [] },
  summaryMap: { type: Map, default: () => new Map() },
  deals: { type: Array, default: () => [] },
  settlementMap: { type: Map, default: () => new Map() }
})

const selectedSummaryId = ref('')
const serviceFilter = ref('all')
const keyword = ref('')
const amountFields = [
  { key: 'forward', label: '前向' },
  { key: 'backward', label: '后向' },
  { key: 'opsSupport', label: '运营支撑' }
]
const halfYearReport = computed(() => makeOpsHalfYearReport(props.deals, props.settlementMap))

function amountLabel(key) {
  return amountFields.find((field) => field.key === key)?.label || key
}

watch(
  () => props.summaries,
  (summaries) => {
    if (!summaries.some((item) => item.id === selectedSummaryId.value)) {
      selectedSummaryId.value = summaries[0]?.id || ''
    }
  },
  { immediate: true }
)

const currentSummary = computed(() => (
  props.summaries.find((item) => item.id === selectedSummaryId.value)
  || props.summaries[0]
  || null
))

const plainSummary = computed(() => (
  currentSummary.value ? props.summaryMap.get(currentSummary.value.id) : null
))

const basisFormula = computed(() => {
  const items = plainSummary.value?.basisItems || []
  if (!items.length) return '暂无基础款明细。'
  return `${items.map((item) => formatMoney(item.amount)).join(' + ')} = ${formatMoney(plainSummary.value.grossBasis)}`
})

const settledDeals = computed(() => props.deals.filter((deal) => isEncryptedSettlement(deal?.settlement)))

const serviceOptions = computed(() => (
  Array.from(new Set(settledDeals.value.map((deal) => deal.service).filter(Boolean))).sort()
))

const filteredSettledDeals = computed(() => {
  const tokens = keyword.value.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return settledDeals.value.filter((deal) => {
    if (serviceFilter.value !== 'all' && deal.service !== serviceFilter.value) return false
    if (!tokens.length) return true
    const text = [deal.id, deal.brand, deal.service, deal.progress, deal.remark, deal.referrer, deal.owner]
      .filter(Boolean).join(' ').toLowerCase()
    return tokens.every((token) => text.includes(token))
  })
})

function formatMoney(value) {
  const number = Number(value)
  if (!Number.isFinite(number)) return '—'
  return `¥${number.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatSettlementValue(value) {
  const number = Number(value)
  if (Number.isFinite(number)) return formatMoney(number)
  return String(value || '—')
}

function formatPercent(value) {
  const number = Number(value)
  if (!Number.isFinite(number)) return '—'
  return `${(number * 100).toFixed(1).replace(/\.0$/, '')}%`
}
</script>
