<template>
  <div class="space-y-5">
    <section
      v-if="summaries.length === 0"
      class="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-6 text-center shadow-sm"
    >
      <h2 class="text-lg font-semibold text-slate-800">暂无运营支撑半年总结</h2>
      <p class="mt-2 text-sm text-slate-500">同步总结数据后，这里会显示加密的核算口径与分配结果。</p>
    </section>

    <section v-else class="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50/60 p-5 shadow-sm md:p-6">
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

const props = defineProps({
  summaries: { type: Array, default: () => [] },
  summaryMap: { type: Map, default: () => new Map() },
  deals: { type: Array, default: () => [] },
  settlementMap: { type: Map, default: () => new Map() }
})

const selectedSummaryId = ref('')
const serviceFilter = ref('all')
const keyword = ref('')

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
