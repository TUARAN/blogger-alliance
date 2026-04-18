<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_36%),linear-gradient(135deg,_#f8fafc_0%,_#ecfeff_45%,_#eef2ff_100%)]">
    <nav class="sticky top-0 z-40 border-b border-cyan-100 bg-white/85 backdrop-blur-md">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <router-link to="/workspace" class="truncate text-xl font-bold text-cyan-700 hover:text-cyan-900">
          🚀开发者博主联盟
        </router-link>
        <div class="flex items-center gap-3 overflow-x-auto whitespace-nowrap text-sm">
          <router-link to="/workspace" class="font-medium text-slate-500 hover:text-slate-700">联盟工作台</router-link>
          <router-link to="/tob/deals" class="font-medium text-slate-500 hover:text-slate-700">合作进度查询</router-link>
          <router-link to="/tob/reports" class="font-medium text-slate-500 hover:text-slate-700">数据报告查询</router-link>
        </div>
      </div>
    </nav>

    <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="grid gap-8 xl:grid-cols-[0.95fr_1.55fr]">
        <div class="space-y-6">
          <div class="rounded-3xl border border-cyan-100 bg-white/90 p-6 shadow-xl shadow-cyan-100/40">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Internal CMS</p>
            <h1 class="mt-3 text-3xl font-bold text-slate-900">D1 数据后台</h1>
            <p class="mt-3 text-sm leading-7 text-slate-600">
              这里直接读写 Cloudflare D1，不再依赖本地 `private/*.json` 和加密脚本。录入页目前采用整段 JSON 编辑并整表覆盖写入，适合当前小数据量场景。
            </p>
            <div class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
              保存会直接覆盖远端表，请先确认 JSON 合法且 `id` 唯一。建议每次保存前先点击“重新加载数据库”。
            </div>
          </div>

          <div class="rounded-3xl border border-cyan-100 bg-white/90 p-6 shadow-xl shadow-cyan-100/40">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">API 健康状态</h2>
                <p class="mt-1 text-sm text-slate-500">来自 `/api/internal/health`。</p>
              </div>
              <button
                class="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-800 hover:bg-cyan-100"
                @click="loadHealth"
              >
                刷新状态
              </button>
            </div>

            <div v-if="health" class="mt-4 grid gap-3 sm:grid-cols-2">
              <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">服务</p>
                <p class="mt-1 text-sm font-medium text-slate-900">{{ health.service }}</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">时间</p>
                <p class="mt-1 text-sm font-medium text-slate-900">{{ formatTime(health.timestamp) }}</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">商单数量</p>
                <p class="mt-1 text-2xl font-bold text-slate-900">{{ health.counts?.deals ?? 0 }}</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">报告数量</p>
                <p class="mt-1 text-2xl font-bold text-slate-900">{{ health.counts?.reports ?? 0 }}</p>
              </div>
            </div>

            <p v-if="healthError" class="mt-4 text-sm text-red-600">{{ healthError }}</p>
          </div>

          <div class="rounded-3xl border border-cyan-100 bg-white/90 p-6 shadow-xl shadow-cyan-100/40">
            <h2 class="text-lg font-semibold text-slate-900">访问控制</h2>
            <p class="mt-2 text-sm leading-7 text-slate-600">
              管理页复用内部查询页相同凭证。成功后会缓存 30 分钟 session token，可连续编辑商单和报告。
            </p>

            <div v-if="!isUnlocked" class="mt-5 space-y-3">
              <input
                v-model="credentialInput"
                type="password"
                placeholder="请输入访问凭证"
                class="h-11 w-full rounded-xl border border-cyan-200 bg-white px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                @keyup.enter="unlockAdmin"
              >
              <button
                :disabled="isUnlocking"
                class="w-full rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                @click="unlockAdmin"
              >
                {{ isUnlocking ? '连接中...' : '解锁后台' }}
              </button>
              <p v-if="unlockError" class="text-sm text-red-600">{{ unlockError }}</p>
            </div>

            <div v-else class="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p class="text-sm font-medium text-emerald-800">已连接远端 D1，可直接读取和保存数据。</p>
              <button
                class="mt-3 rounded-xl border border-emerald-300 bg-white px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
                @click="lockAdmin"
              >
                锁定后台
              </button>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-cyan-100 bg-white/90 p-6 shadow-xl shadow-cyan-100/40">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                class="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                :class="activeTab === tab.key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                @click="activeTab = tab.key"
              >
                {{ tab.label }}
              </button>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <button
                :disabled="!isUnlocked || isRefreshing"
                class="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                @click="refreshActiveDataset"
              >
                {{ isRefreshing ? '加载中...' : '重新加载数据库' }}
              </button>
              <button
                :disabled="!isUnlocked"
                class="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                @click="formatActiveJson"
              >
                格式化 JSON
              </button>
              <button
                :disabled="!isUnlocked || isSaving"
                class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                @click="saveActiveDataset"
              >
                {{ isSaving ? '保存中...' : '保存到 D1' }}
              </button>
            </div>
          </div>

          <div class="mt-5 grid gap-4 md:grid-cols-3">
            <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">当前数据集</p>
              <p class="mt-1 text-sm font-medium text-slate-900">{{ activeTabMeta.label }}</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">记录数</p>
              <p class="mt-1 text-sm font-medium text-slate-900">{{ activeCount }}</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">字段提示</p>
              <p class="mt-1 text-xs leading-6 text-slate-600">{{ activeTabMeta.hint }}</p>
            </div>
          </div>

          <p v-if="editorError" class="mt-4 text-sm text-red-600">{{ editorError }}</p>
          <p v-if="saveMessage" class="mt-4 text-sm text-emerald-700">{{ saveMessage }}</p>

          <textarea
            v-model="activeEditor"
            class="mt-5 min-h-[34rem] w-full rounded-2xl border border-slate-200 bg-slate-950 px-4 py-4 font-mono text-sm leading-6 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            spellcheck="false"
            :placeholder="activeTabMeta.placeholder"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import {
  clearSecureUnlockSession,
  readSecureUnlockSession,
  saveSecureUnlockSession
} from '../../utils/secureDataCaches'
import { normalizeCredential } from '../../utils/credentialNormalize'
import {
  createInternalDataSession,
  fetchCommercialDeals,
  fetchInternalHealth,
  fetchPromotionReports,
  updateCommercialDeals,
  updatePromotionReports
} from '../../utils/internalDataApi'

const tabs = [
  {
    key: 'deals',
    label: '合作进度',
    hint: '必填建议：id、brand、service、progress。支持 reportCooperationId 关联报告。',
    placeholder: '[\n  {\n    "id": "BRAND-SERVICE-001",\n    "brand": "示例品牌",\n    "service": "公众号推文",\n    "progress": "需求沟通中"\n  }\n]'
  },
  {
    key: 'reports',
    label: '数据报告',
    hint: '必填建议：id、title、project、author、content。platforms 为数组，stats 为对象。',
    placeholder: '[\n  {\n    "id": "report-20260419-001",\n    "title": "数据报告",\n    "project": "示例项目",\n    "author": "某某",\n    "content": "报告正文"\n  }\n]'
  }
]

const activeTab = ref('deals')
const credentialInput = ref('')
const isUnlocking = ref(false)
const isUnlocked = ref(false)
const unlockError = ref('')
const editorError = ref('')
const saveMessage = ref('')
const isSaving = ref(false)
const isRefreshing = ref(false)
const health = ref(null)
const healthError = ref('')

const dealsEditor = ref('[]')
const reportsEditor = ref('[]')
const sessionToken = ref('')

const activeTabMeta = computed(() => tabs.find((item) => item.key === activeTab.value) || tabs[0])

const activeEditor = computed({
  get() {
    return activeTab.value === 'deals' ? dealsEditor.value : reportsEditor.value
  },
  set(value) {
    if (activeTab.value === 'deals') {
      dealsEditor.value = value
      return
    }

    reportsEditor.value = value
  }
})

const activeCount = computed(() => {
  try {
    const parsed = JSON.parse(activeEditor.value)
    return Array.isArray(parsed) ? parsed.length : 0
  } catch {
    return 'JSON 无效'
  }
})

function formatJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`
}

function formatTime(value) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value || '—'
  }

  return date.toLocaleString('zh-CN', { hour12: false })
}

function resetMessages() {
  editorError.value = ''
  saveMessage.value = ''
}

async function loadHealth() {
  healthError.value = ''

  try {
    health.value = await fetchInternalHealth()
  } catch {
    healthError.value = '健康检查失败，请确认 Worker 已成功部署。'
  }
}

async function loadDeals() {
  const deals = await fetchCommercialDeals(sessionToken.value)
  dealsEditor.value = formatJson(deals)
}

async function loadReports() {
  const reports = await fetchPromotionReports(sessionToken.value)
  reportsEditor.value = formatJson(reports)
}

async function refreshActiveDataset() {
  if (!sessionToken.value) {
    return
  }

  resetMessages()
  isRefreshing.value = true

  try {
    if (activeTab.value === 'deals') {
      await loadDeals()
    } else {
      await loadReports()
    }
  } catch {
    editorError.value = '读取数据库失败，请重新解锁后台后再试。'
  } finally {
    isRefreshing.value = false
  }
}

async function unlockAdmin() {
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
    saveSecureUnlockSession(session.token)
    credentialInput.value = ''
    isUnlocked.value = true
    await Promise.all([loadDeals(), loadReports(), loadHealth()])
  } catch {
    unlockError.value = '凭证错误或后台连接失败，请检查后重试。'
    isUnlocked.value = false
    sessionToken.value = ''
  } finally {
    isUnlocking.value = false
  }
}

function lockAdmin() {
  isUnlocked.value = false
  sessionToken.value = ''
  credentialInput.value = ''
  unlockError.value = ''
  resetMessages()
  clearSecureUnlockSession()
}

function formatActiveJson() {
  resetMessages()

  try {
    activeEditor.value = formatJson(JSON.parse(activeEditor.value))
  } catch {
    editorError.value = '当前 JSON 语法无效，无法格式化。'
  }
}

async function saveActiveDataset() {
  if (!sessionToken.value) {
    return
  }

  resetMessages()
  isSaving.value = true

  try {
    const parsed = JSON.parse(activeEditor.value)

    if (!Array.isArray(parsed)) {
      throw new Error('PAYLOAD_MUST_BE_ARRAY')
    }

    if (activeTab.value === 'deals') {
      const result = await updateCommercialDeals(sessionToken.value, parsed)
      dealsEditor.value = formatJson(parsed)
      saveMessage.value = `已写入 D1：合作进度 ${result.count} 条。`
    } else {
      const result = await updatePromotionReports(sessionToken.value, parsed)
      reportsEditor.value = formatJson(parsed)
      saveMessage.value = `已写入 D1：数据报告 ${result.count} 条。`
    }

    await loadHealth()
  } catch (error) {
    if (error instanceof SyntaxError) {
      editorError.value = '当前 JSON 语法无效，请修正后再保存。'
    } else {
      editorError.value = '保存失败：请确认必填字段完整、id 唯一，且会话未过期。'
    }
  } finally {
    isSaving.value = false
  }
}

watch(activeTab, () => {
  resetMessages()
})

onMounted(async () => {
  await loadHealth()

  const cachedToken = readSecureUnlockSession()

  if (!cachedToken) {
    return
  }

  sessionToken.value = cachedToken

  try {
    await Promise.all([loadDeals(), loadReports()])
    isUnlocked.value = true
    saveSecureUnlockSession(cachedToken)
  } catch {
    lockAdmin()
  }
})
</script>
