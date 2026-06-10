<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAuth } from '../../../composables/useAuth.js'
import { AUTH_COPY } from '../../../utils/authMessages.js'
import { showToast } from '../../../utils/toast.js'
import {
  CLOUD_PROMO_CONTACT,
  CLOUD_PROMO_COPY_SNIPPETS,
  CLOUD_PROMO_FAQS,
  CLOUD_PROMO_GROUP_BUY_STEPS,
  CLOUD_PROMO_PITCH,
  CLOUD_PROMO_PIPELINE_STEPS,
  CLOUD_PROMO_SELL_POINTS,
  CLOUD_PROMO_STATUS_LABELS,
  buildLandingUrl,
  fillCloudPromoTemplate
} from '../../../data/cloudPromoKit.js'
import {
  cloudPromoAssets,
  cloudPromoPrompts,
  cloudPromoTemplates,
  cloudPromoTopics,
  getTemplateById,
  renderPrompt,
  renderTopicDraft
} from '../../../data/cloudPromoContent.js'

const { initAuth, isAdmin, loading: authLoading } = useAuth()

const CLOUD_PROMO_TABS = [
  { id: 'overview', label: '概览' },
  { id: 'assets', label: '素材库' },
  { id: 'templates', label: '模版与选题' },
  { id: 'distribution', label: '分发与回流' },
  { id: 'roadmap', label: '路线图' }
]

const UTM_PLATFORMS = [
  { value: 'juejin', label: '掘金' },
  { value: 'csdn', label: 'CSDN' },
  { value: 'zhihu', label: '知乎' },
  { value: 'wechat', label: '公众号' },
  { value: 'weibo', label: '微博' },
  { value: 'moment', label: '朋友圈' }
]

const activeTab = ref('overview')
const selectedTopicId = ref(cloudPromoTopics[0]?.id || '')
const utmSource = ref('juejin')
const utmCampaign = ref(cloudPromoTopics[0]?.id || '')
const currentTemplateId = ref(cloudPromoTopics[0]?.template || cloudPromoTemplates[0]?.id || '')

// 已发布文章扫描：从 content/aliyun/published/**/meta.json 读取（目录为空时返回 []）
const publishedMetaModules = import.meta.glob(
  '../../../../content/aliyun/published/**/meta.json',
  { eager: true, import: 'default' }
)
const publishedEntries = Object.entries(publishedMetaModules)
  .map(([path, meta]) => ({
    path: path.replace(/^\.\.\/\.\.\/\.\.\/\.\.\//, ''),
    meta
  }))
  .sort((a, b) => (b.meta?.published_at || '').localeCompare(a.meta?.published_at || ''))

const selectedTopic = computed(() =>
  cloudPromoTopics.find((item) => item.id === selectedTopicId.value) || null
)

const currentTemplate = computed(() => getTemplateById(currentTemplateId.value))

const landingUrl = computed(() =>
  buildLandingUrl({
    utmSource: utmSource.value,
    utmMedium: 'article',
    utmCampaign: utmCampaign.value || selectedTopicId.value
  })
)

// 全平台 UTM 链接
const allPlatformLinks = computed(() =>
  UTM_PLATFORMS.map((p) => ({
    platform: p.label,
    source: p.value,
    url: buildLandingUrl({
      utmSource: p.value,
      utmMedium: 'article',
      utmCampaign: utmCampaign.value || selectedTopicId.value
    })
  }))
)

const allPlatformTsv = computed(() => {
  const header = 'platform\tutm_source\turl'
  const rows = allPlatformLinks.value.map(
    (item) => `${item.platform}\t${item.source}\t${item.url}`
  )
  return [header, ...rows].join('\n')
})

// 选题预览稿（按当前模版渲染，可编辑）
function regenerateDraft() {
  if (!selectedTopic.value) {
    editableDraft.value = ''
    return
  }
  const topicWithTemplate = {
    ...selectedTopic.value,
    template: currentTemplateId.value || selectedTopic.value.template
  }
  editableDraft.value = renderTopicDraft(topicWithTemplate, { utmSource: utmSource.value })
}

const editableDraft = ref('')

// AI 生成提示
const generationPrompt = computed(() => {
  if (!selectedTopic.value) return ''
  const topicWithTemplate = {
    ...selectedTopic.value,
    template: currentTemplateId.value || selectedTopic.value.template
  }
  return renderPrompt('article-generation', topicWithTemplate, { utmSource: utmSource.value })
})

// CTA 片段（来自 content 目录，可编辑）
const editableCtaSnippet = ref('')
function regenerateCtaSnippet() {
  const asset = cloudPromoAssets.find((item) => item.id === 'cta-snippets')
  if (!asset) {
    editableCtaSnippet.value = ''
    return
  }
  editableCtaSnippet.value = fillCloudPromoTemplate(asset.body, {
    landing_url: landingUrl.value,
    wechat: CLOUD_PROMO_CONTACT.wechat,
    utm_campaign: utmCampaign.value || selectedTopicId.value
  })
}

// 文案片段（按落地页填充，可编辑）
const editableSnippets = ref([])
function regenerateSnippets() {
  editableSnippets.value = CLOUD_PROMO_COPY_SNIPPETS.map((item) => ({
    id: item.id,
    label: item.label,
    text: fillCloudPromoTemplate(item.text, { landing_url: landingUrl.value })
  }))
}

// 初始化 + 监听联动
watch(
  [selectedTopicId, currentTemplateId, utmSource, utmCampaign],
  () => {
    regenerateDraft()
    regenerateCtaSnippet()
    regenerateSnippets()
  },
  { immediate: true }
)

// 路线图：从原 pipeline + distribution 提取的"待接入"部分
const ROADMAP_STEPS = CLOUD_PROMO_PIPELINE_STEPS
const ROADMAP_REPO_PATHS = [
  'content/aliyun/topics.queue.json',
  'content/aliyun/templates/*.md.hbs',
  'content/aliyun/prompts/*.md',
  'content/aliyun/assets/cta-snippets.md',
  'content/aliyun/published/<topic-id>/meta.json（待创建，存放定稿元数据）'
]

// robots noindex（仅管理员页面，避免被搜索引擎抓取 SPA shell）
let robotsMeta = null
onMounted(() => {
  document.title = '云服务自推广 · 联盟工作台'
  initAuth()

  robotsMeta = document.createElement('meta')
  robotsMeta.setAttribute('name', 'robots')
  robotsMeta.setAttribute('content', 'noindex,nofollow')
  robotsMeta.setAttribute('data-cloud-promo', 'true')
  document.head.appendChild(robotsMeta)
})
onBeforeUnmount(() => {
  if (robotsMeta && robotsMeta.parentNode) {
    robotsMeta.parentNode.removeChild(robotsMeta)
    robotsMeta = null
  }
})

async function copyText(text, label = '内容') {
  if (!text?.trim()) {
    showToast('没有可复制的内容', { type: 'info' })
    return
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    showToast(`已复制${label}`, { type: 'info', duration: 2500 })
  } catch {
    showToast('复制失败，请手动选择文本', { type: 'info' })
  }
}

function selectTopic(topic) {
  selectedTopicId.value = topic.id
  utmCampaign.value = topic.id
  currentTemplateId.value = topic.template
}

function selectTemplate(tplId) {
  currentTemplateId.value = tplId
}

function statusClass(status) {
  if (status === 'published') return 'bg-emerald-50 text-emerald-700'
  if (status === 'scheduled') return 'bg-sky-50 text-sky-700'
  if (status === 'review') return 'bg-amber-50 text-amber-800'
  return 'bg-slate-100 text-slate-700'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/40 to-orange-50">
    <AppNav />

    <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-3xl">
          <router-link
            to="/workspace"
            class="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-orange-700"
          >
            ← 返回工作台
          </router-link>
          <h1 class="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            云服务自推广
          </h1>
          <p class="mt-3 text-base leading-7 text-slate-600">
            阿里云落地页推广中控台：素材、模版、选题与分发回流的统一入口。可执行操作前置，规划项收进"路线图"。
          </p>
        </div>
        <span
          class="inline-flex w-fit items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-800"
        >
          仅管理员
        </span>
      </div>

      <div
        v-if="authLoading"
        class="mt-8 rounded-2xl border border-orange-100 bg-white p-6 text-sm text-slate-600"
      >
        正在验证账号权限...
      </div>

      <div
        v-else-if="!isAdmin"
        class="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-5 md:p-6"
      >
        <h2 class="text-lg font-semibold text-orange-950 mb-2">{{ AUTH_COPY.adminAccessDeniedTitle }}</h2>
        <p class="text-sm text-orange-800 mb-3">
          {{ AUTH_COPY.adminAccessDeniedBody }}
        </p>
        <router-link
          to="/workspace"
          class="inline-flex h-10 items-center rounded-lg bg-orange-700 px-4 text-sm font-semibold text-white hover:bg-orange-800"
        >
          返回工作台
        </router-link>
      </div>

      <template v-else>
      <!-- 当前选题 / UTM sticky 概览，跨 tab 提示当前状态 -->
      <div
        class="sticky top-16 z-20 mt-6 -mx-4 border-y border-orange-200/70 bg-orange-50/85 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border"
      >
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 sm:text-sm">
          <span class="font-semibold text-orange-900">当前选题</span>
          <span class="font-mono">{{ selectedTopic?.id || '—' }}</span>
          <span class="hidden text-slate-400 sm:inline">·</span>
          <span class="font-semibold text-orange-900">模版</span>
          <span class="font-mono">{{ currentTemplateId || '—' }}</span>
          <span class="hidden text-slate-400 sm:inline">·</span>
          <span class="font-semibold text-orange-900">UTM</span>
          <span class="font-mono">{{ utmSource }} / {{ utmCampaign || selectedTopicId }}</span>
        </div>
      </div>

      <div class="mt-6 flex flex-wrap gap-2 overflow-x-auto">
        <button
          v-for="tab in CLOUD_PROMO_TABS"
          :key="tab.id"
          type="button"
          class="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
          :class="
            activeTab === tab.id
              ? 'bg-orange-600 text-white shadow-sm'
              : 'bg-white/90 text-slate-700 ring-1 ring-slate-200 hover:bg-orange-50'
          "
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 概览 -->
      <div v-show="activeTab === 'overview'" class="mt-8 space-y-6">
        <div class="rounded-3xl border border-orange-100 bg-white/90 p-6 shadow-lg shadow-orange-100/30 sm:p-8">
          <p class="text-lg font-medium leading-8 text-slate-800">{{ CLOUD_PROMO_PITCH }}</p>
          <div class="mt-6 grid gap-4 sm:grid-cols-3">
            <div
              v-for="point in CLOUD_PROMO_SELL_POINTS"
              :key="point.title"
              class="rounded-2xl border border-orange-50 bg-orange-50/50 p-4"
            >
              <div class="font-semibold text-slate-900">{{ point.title }}</div>
              <p class="mt-2 text-sm leading-6 text-slate-600">{{ point.desc }}</p>
            </div>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h2 class="text-lg font-bold text-slate-900">推广链接</h2>
            <dl class="mt-4 space-y-4 text-sm">
              <div>
                <dt class="font-medium text-slate-500">主落地页</dt>
                <dd class="mt-1 break-all font-mono text-slate-800">
                  {{ CLOUD_PROMO_CONTACT.landingOrigin }}{{ CLOUD_PROMO_CONTACT.landingPath }}
                </dd>
              </div>
              <div>
                <dt class="font-medium text-slate-500">服务介绍</dt>
                <dd class="mt-1 font-mono text-slate-800">{{ CLOUD_PROMO_CONTACT.servicePath }}</dd>
              </div>
              <div>
                <dt class="font-medium text-slate-500">联系微信</dt>
                <dd class="mt-1 font-semibold text-slate-900">{{ CLOUD_PROMO_CONTACT.wechat }}</dd>
              </div>
            </dl>
            <div class="mt-5 flex flex-wrap gap-2">
              <a
                :href="CLOUD_PROMO_CONTACT.landingPath"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex h-9 items-center rounded-lg bg-orange-600 px-3 text-sm font-semibold text-white hover:bg-orange-700"
              >
                打开落地页
              </a>
              <button
                type="button"
                class="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                @click="copyText(CLOUD_PROMO_CONTACT.wechat, '微信号')"
              >
                复制微信
              </button>
            </div>
          </div>

          <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h2 class="text-lg font-bold text-slate-900">UTM 链接生成（单平台）</h2>
            <p class="mt-1 text-xs text-slate-500">需要 6 平台一次性导出？见「分发与回流 → 全平台 UTM」。</p>
            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <label class="block text-sm">
                <span class="font-medium text-slate-600">来源 utm_source</span>
                <select
                  v-model="utmSource"
                  class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800"
                >
                  <option v-for="item in UTM_PLATFORMS" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
              </label>
              <label class="block text-sm">
                <span class="font-medium text-slate-600">campaign（文章 ID）</span>
                <input
                  v-model="utmCampaign"
                  type="text"
                  class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm text-slate-800"
                  placeholder="aliyun-ecs-renew-001"
                />
              </label>
            </div>
            <p class="mt-4 break-all rounded-xl bg-slate-50 p-3 font-mono text-xs leading-6 text-slate-700">
              {{ landingUrl }}
            </p>
            <button
              type="button"
              class="mt-3 inline-flex h-9 items-center rounded-lg bg-slate-900 px-3 text-sm font-semibold text-white hover:bg-slate-800"
              @click="copyText(landingUrl, 'UTM 链接')"
            >
              复制带 UTM 的链接
            </button>
          </div>
        </div>

        <div class="rounded-3xl border border-emerald-100 bg-emerald-50/40 p-6">
          <h2 class="text-lg font-bold text-slate-900">团购流程（对外口径）</h2>
          <ol class="mt-4 space-y-3">
            <li
              v-for="(step, index) in CLOUD_PROMO_GROUP_BUY_STEPS"
              :key="step"
              class="flex gap-3 text-sm leading-6 text-slate-700"
            >
              <span
                class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
              >
                {{ index + 1 }}
              </span>
              <span>{{ step }}</span>
            </li>
          </ol>
        </div>
      </div>

      <!-- 素材库 -->
      <div v-show="activeTab === 'assets'" class="mt-8 space-y-6">
        <div class="flex items-center justify-between gap-3">
          <p class="text-xs text-slate-500">
            文案随当前 UTM 自动填充；直接编辑后复制即可，按"重置"恢复初始版本。
          </p>
          <button
            type="button"
            class="text-xs font-semibold text-orange-700 hover:text-orange-900"
            @click="regenerateSnippets"
          >
            重置全部
          </button>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div
            v-for="(snippet, idx) in editableSnippets"
            :key="snippet.id"
            class="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
          >
            <div class="flex items-start justify-between gap-3">
              <h3 class="font-semibold text-slate-900">{{ snippet.label }}</h3>
              <button
                type="button"
                class="shrink-0 text-xs font-semibold text-orange-700 hover:text-orange-900"
                @click="copyText(editableSnippets[idx].text, snippet.label)"
              >
                复制
              </button>
            </div>
            <textarea
              v-model="editableSnippets[idx].text"
              rows="4"
              class="mt-3 w-full resize-y rounded-lg border border-slate-100 bg-white p-3 font-sans text-sm leading-6 text-slate-700 focus:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-200"
            ></textarea>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <h2 class="text-lg font-bold text-slate-900">FAQ（与落地页一致）</h2>
          <dl class="mt-4 space-y-4">
            <div v-for="faq in CLOUD_PROMO_FAQS" :key="faq.q" class="border-b border-slate-100 pb-4 last:border-0">
              <dt class="font-medium text-slate-900">{{ faq.q }}</dt>
              <dd class="mt-2 text-sm leading-6 text-slate-600">{{ faq.a }}</dd>
            </div>
          </dl>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div class="flex items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-slate-900">CTA 片段库（可编辑）</h2>
              <p class="mt-1 text-xs text-slate-500">来自 content/aliyun/assets/cta-snippets.md</p>
            </div>
            <div class="flex gap-2">
              <button
                type="button"
                class="text-xs font-semibold text-slate-500 hover:text-slate-800"
                @click="regenerateCtaSnippet"
              >
                重置
              </button>
              <button
                type="button"
                class="text-sm font-semibold text-orange-700 hover:text-orange-900"
                @click="copyText(editableCtaSnippet, 'CTA 片段')"
              >
                复制全文
              </button>
            </div>
          </div>
          <textarea
            v-model="editableCtaSnippet"
            rows="14"
            class="mt-4 w-full resize-y rounded-xl border border-slate-100 bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-700 focus:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-200"
          ></textarea>
        </div>
      </div>

      <!-- 模版与选题 -->
      <div v-show="activeTab === 'templates'" class="mt-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside class="space-y-4">
          <div class="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
            <h2 class="font-bold text-slate-900">选题池</h2>
            <p class="mt-1 text-xs text-slate-500">
              content/aliyun/topics.queue.json · 当前为只读视图
            </p>
            <ul class="mt-4 space-y-2">
              <li v-for="topic in cloudPromoTopics" :key="topic.id">
                <button
                  type="button"
                  class="w-full rounded-xl border px-3 py-3 text-left transition-colors"
                  :class="
                    selectedTopicId === topic.id
                      ? 'border-orange-300 bg-orange-50'
                      : 'border-slate-100 bg-slate-50/80 hover:border-orange-200'
                  "
                  @click="selectTopic(topic)"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-sm font-semibold text-slate-900">{{ topic.title }}</span>
                    <span
                      class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      :class="statusClass(topic.status)"
                    >
                      {{ CLOUD_PROMO_STATUS_LABELS[topic.status] || topic.status }}
                    </span>
                  </div>
                  <p class="mt-1 text-xs text-slate-500">{{ topic.angle }} · {{ topic.template }}</p>
                </button>
              </li>
            </ul>
          </div>

          <div class="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
            <h2 class="font-bold text-slate-900">切换模版</h2>
            <p class="mt-1 text-xs text-slate-500">
              切换后下方预览稿会按新模版重新渲染，方便对比同选题的不同呈现。
            </p>
            <ul class="mt-3 space-y-2 text-sm">
              <li v-for="tpl in cloudPromoTemplates" :key="tpl.id">
                <button
                  type="button"
                  class="w-full rounded-lg px-2 py-2 text-left transition-colors"
                  :class="currentTemplateId === tpl.id ? 'bg-orange-50 font-semibold text-orange-900' : 'text-slate-700 hover:bg-orange-50/50'"
                  @click="selectTemplate(tpl.id)"
                >
                  {{ tpl.label }}
                  <span
                    v-if="selectedTopic && tpl.id === selectedTopic.template"
                    class="ml-1 rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600"
                  >
                    默认
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <div class="space-y-6">
          <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 class="text-lg font-bold text-slate-900">选题预览稿（可编辑）</h2>
                <p v-if="selectedTopic" class="mt-1 text-sm text-slate-500">
                  {{ selectedTopic.id }} · 模版 {{ currentTemplateId }}
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  type="button"
                  class="text-sm font-semibold text-slate-500 hover:text-slate-800"
                  @click="regenerateDraft"
                >
                  重置
                </button>
                <button
                  type="button"
                  class="inline-flex h-9 items-center rounded-lg bg-orange-600 px-3 text-sm font-semibold text-white hover:bg-orange-700"
                  @click="copyText(editableDraft, '预览稿')"
                >
                  复制预览稿
                </button>
              </div>
            </div>
            <textarea
              v-model="editableDraft"
              rows="18"
              class="mt-4 w-full resize-y rounded-xl border border-slate-100 bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-800 focus:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-200"
            ></textarea>
          </div>

          <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 class="text-lg font-bold text-slate-900">AI 生成任务提示</h2>
                <p class="mt-1 text-sm text-slate-500">prompts/article-generation.md + system.md</p>
              </div>
              <button
                type="button"
                class="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                @click="copyText(generationPrompt, '生成提示')"
              >
                复制生成提示
              </button>
            </div>
            <pre class="mt-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-700">{{ generationPrompt }}</pre>
          </div>

          <div
            v-if="currentTemplate"
            class="rounded-3xl border border-dashed border-orange-200 bg-orange-50/30 p-6"
          >
            <h3 class="font-bold text-slate-900">{{ currentTemplate.label }} · 模版源码</h3>
            <p class="mt-1 text-sm text-slate-600">{{ currentTemplate.desc }}</p>
            <p class="mt-2 font-mono text-xs text-slate-500">{{ currentTemplate.path }}</p>
            <pre class="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl bg-white p-4 text-xs leading-6 text-slate-700">{{ currentTemplate.body }}</pre>
          </div>

          <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h2 class="text-lg font-bold text-slate-900">系统提示（口径）</h2>
            <pre class="mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-700">{{ cloudPromoPrompts.find((p) => p.id === 'system')?.body }}</pre>
          </div>
        </div>
      </div>

      <!-- 分发与回流 -->
      <div v-show="activeTab === 'distribution'" class="mt-8 space-y-6">
        <div class="rounded-3xl border border-orange-100 bg-white/90 p-6 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-slate-900">全平台 UTM 链接（一键 TSV）</h2>
              <p class="mt-1 text-sm text-slate-500">
                campaign 用当前选题 ID，每行一个平台。可直接复制为 links.tsv 喂给 metrics:collect。
              </p>
            </div>
            <button
              type="button"
              class="inline-flex h-9 items-center rounded-lg bg-slate-900 px-3 text-sm font-semibold text-white hover:bg-slate-800"
              @click="copyText(allPlatformTsv, '全平台 UTM TSV')"
            >
              复制 TSV
            </button>
          </div>
          <div class="mt-4 overflow-x-auto">
            <table class="min-w-full text-left text-sm">
              <thead class="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th class="py-2 pr-3">平台</th>
                  <th class="py-2 pr-3">utm_source</th>
                  <th class="py-2 pr-3">URL</th>
                  <th class="py-2 pr-3 text-right">复制</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="row in allPlatformLinks" :key="row.source">
                  <td class="py-2 pr-3 font-medium text-slate-800">{{ row.platform }}</td>
                  <td class="py-2 pr-3 font-mono text-xs text-slate-600">{{ row.source }}</td>
                  <td class="py-2 pr-3 break-all font-mono text-xs text-slate-700">{{ row.url }}</td>
                  <td class="py-2 pr-3 text-right">
                    <button
                      type="button"
                      class="text-xs font-semibold text-orange-700 hover:text-orange-900"
                      @click="copyText(row.url, `${row.platform} UTM`)"
                    >
                      复制
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-slate-900">已发布文章</h2>
              <p class="mt-1 text-sm text-slate-500">
                扫描 content/aliyun/published/&lt;topic-id&gt;/meta.json，按 published_at 倒序。
              </p>
            </div>
            <span class="text-xs text-slate-500">共 {{ publishedEntries.length }} 篇</span>
          </div>
          <div v-if="publishedEntries.length === 0" class="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-6 text-sm leading-6 text-slate-600">
            <p>暂无已发布记录。</p>
            <p class="mt-2 text-xs text-slate-500">
              定稿后请在 <code class="rounded bg-white px-1.5 py-0.5 font-mono">content/aliyun/published/&lt;topic-id&gt;/meta.json</code> 中登记：
            </p>
            <pre class="mt-3 overflow-auto rounded-xl bg-white p-3 font-mono text-xs leading-6 text-slate-700">{
  "topic_id": "aliyun-ecs-renew-001",
  "title": "...",
  "published_at": "2026-06-15",
  "platforms": [
    { "name": "juejin", "url": "https://...", "views": 0, "likes": 0 },
    { "name": "csdn",   "url": "https://...", "views": 0, "likes": 0 }
  ],
  "utm_campaign": "aliyun-ecs-renew-001"
}</pre>
          </div>
          <div v-else class="mt-4 overflow-x-auto">
            <table class="min-w-full text-left text-sm">
              <thead class="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th class="py-2 pr-3">日期</th>
                  <th class="py-2 pr-3">标题</th>
                  <th class="py-2 pr-3">campaign</th>
                  <th class="py-2 pr-3">平台</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="entry in publishedEntries" :key="entry.path">
                  <td class="py-2 pr-3 font-mono text-xs text-slate-600">{{ entry.meta?.published_at || '—' }}</td>
                  <td class="py-2 pr-3 font-medium text-slate-800">{{ entry.meta?.title || entry.path }}</td>
                  <td class="py-2 pr-3 font-mono text-xs text-slate-600">{{ entry.meta?.utm_campaign || '—' }}</td>
                  <td class="py-2 pr-3 text-xs text-slate-600">
                    <span v-for="p in entry.meta?.platforms || []" :key="p.name" class="mr-2">
                      <a :href="p.url" target="_blank" rel="noopener noreferrer" class="text-orange-700 hover:underline">{{ p.name }}</a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <div class="rounded-3xl border border-violet-200 bg-violet-50/40 p-6">
            <h2 class="text-lg font-bold text-slate-900">SyncBlog 分发</h2>
            <p class="mt-3 text-sm leading-6 text-slate-600">
              主稿使用「模版与选题」中的预览稿，同步至多平台。发布后把链接记入上方 meta.json。
            </p>
            <div class="mt-5 flex flex-wrap gap-2">
              <a
                href="https://syncblog.cn"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex h-9 items-center rounded-lg bg-violet-600 px-3 text-sm font-semibold text-white hover:bg-violet-700"
              >
                打开 SyncBlog ↗
              </a>
              <a
                :href="CLOUD_PROMO_CONTACT.syncblogStats"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex h-9 items-center rounded-lg border border-violet-200 bg-white px-3 text-sm font-semibold text-violet-800 hover:bg-violet-50"
              >
                查看统计 ↗
              </a>
            </div>
          </div>

          <div class="rounded-3xl border border-orange-100 bg-white/90 p-6 shadow-sm">
            <h2 class="text-lg font-bold text-slate-900">回流归因清单</h2>
            <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <li class="flex gap-2">
                <span class="text-orange-600">1.</span>
                <span>文末 CTA 使用带 <code class="rounded bg-slate-100 px-1">utm_campaign=文章ID</code> 的落地页链接</span>
              </li>
              <li class="flex gap-2">
                <span class="text-orange-600">2.</span>
                <span>咨询时让读者说明来源平台 / 文章主题（见 CTA 片段库）</span>
              </li>
              <li class="flex gap-2">
                <span class="text-orange-600">3.</span>
                <span>成交线索记入数据台账，备注 campaign ID</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 路线图（所有 planned 项目集中放这里，首屏不再展示） -->
      <div v-show="activeTab === 'roadmap'" class="mt-8 space-y-6">
        <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <h2 class="text-lg font-bold text-slate-900">内容飞轮（规划）</h2>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            选题 → AI + 模版 → Git 审稿 → SyncBlog 分发 → metrics 采集 → 回流 /cloudcost。
            目录已就绪；GitHub Action、发布脚本、metrics 收集脚本逐步接入。
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="item in ROADMAP_STEPS"
            :key="item.step"
            class="rounded-2xl border p-5"
            :class="
              item.status === 'ready'
                ? 'border-emerald-200 bg-emerald-50/50'
                : 'border-slate-200 bg-white/90'
            "
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wide text-slate-500">Step {{ item.step }}</span>
              <span
                class="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                :class="item.status === 'ready' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'"
              >
                {{ item.status === 'ready' ? '可用' : '待接入' }}
              </span>
            </div>
            <h3 class="mt-3 font-semibold text-slate-900">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ item.desc }}</p>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <h2 class="text-lg font-bold text-slate-900">互动数据采集（脚本接入中）</h2>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            发布后从 published meta.json 导出 links.tsv，使用仓库内 Playwright 脚本批量采集各平台阅读与互动数据。
          </p>
          <pre class="mt-4 rounded-xl bg-slate-50 p-4 font-mono text-xs leading-6 text-slate-700">npm run metrics:login -- --site juejin,csdn,zhihu,wechat
npm run metrics:collect -- --input ./links.tsv</pre>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-slate-100">
          <h2 class="text-lg font-bold">仓库路径速查</h2>
          <ul class="mt-4 space-y-2 font-mono text-xs leading-6 text-slate-300">
            <li v-for="p in ROADMAP_REPO_PATHS" :key="p">{{ p }}</li>
          </ul>
        </div>
      </div>
      </template>
    </section>
  </div>
</template>
