<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuth } from '../../../composables/useAuth.js'
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
  CLOUD_PROMO_TABS,
  buildLandingUrl,
  fillCloudPromoTemplate
} from '../../../data/cloudPromoKit.js'
import {
  cloudPromoAssets,
  cloudPromoPrompts,
  cloudPromoTemplates,
  cloudPromoTopics,
  renderPrompt,
  renderTopicDraft
} from '../../../data/cloudPromoContent.js'

const { initAuth } = useAuth()

const activeTab = ref('overview')
const selectedTopicId = ref(cloudPromoTopics[0]?.id || '')
const utmSource = ref('juejin')
const utmCampaign = ref(cloudPromoTopics[0]?.id || '')
const expandedTemplateId = ref(cloudPromoTemplates[0]?.id || '')

const utmSources = [
  { value: 'juejin', label: '掘金' },
  { value: 'csdn', label: 'CSDN' },
  { value: 'zhihu', label: '知乎' },
  { value: 'wechat', label: '公众号' },
  { value: 'weibo', label: '微博' },
  { value: 'moment', label: '朋友圈' }
]

const selectedTopic = computed(() =>
  cloudPromoTopics.find((item) => item.id === selectedTopicId.value) || null
)

const landingUrl = computed(() =>
  buildLandingUrl({
    utmSource: utmSource.value,
    utmMedium: 'article',
    utmCampaign: utmCampaign.value || selectedTopicId.value
  })
)

const topicDraft = computed(() => {
  if (!selectedTopic.value) return ''
  return renderTopicDraft(selectedTopic.value, { utmSource: utmSource.value })
})

const generationPrompt = computed(() => {
  if (!selectedTopic.value) return ''
  return renderPrompt('article-generation', selectedTopic.value, { utmSource: utmSource.value })
})

const ctaSnippet = computed(() => {
  const asset = cloudPromoAssets.find((item) => item.id === 'cta-snippets')
  if (!asset) return ''
  return fillCloudPromoTemplate(asset.body, {
    landing_url: landingUrl.value,
    wechat: CLOUD_PROMO_CONTACT.wechat,
    utm_campaign: utmCampaign.value || selectedTopicId.value
  })
})

const snippetsWithUrls = computed(() =>
  CLOUD_PROMO_COPY_SNIPPETS.map((item) => ({
    ...item,
    text: fillCloudPromoTemplate(item.text, { landing_url: landingUrl.value })
  }))
)

onMounted(() => {
  document.title = '云服务自推广 · 联盟工作台'
  initAuth()
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
  expandedTemplateId.value = topic.template
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
    <AppNav workspace-active />

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
            阿里云落地页推广中控台：素材、模版、选题与后续自动化流水线的统一入口。
          </p>
        </div>
        <span
          class="inline-flex w-fit items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-800"
        >
          仅管理员
        </span>
      </div>

      <div class="mt-8 flex flex-wrap gap-2">
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
            <h2 class="text-lg font-bold text-slate-900">UTM 链接生成</h2>
            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <label class="block text-sm">
                <span class="font-medium text-slate-600">来源 utm_source</span>
                <select
                  v-model="utmSource"
                  class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800"
                >
                  <option v-for="item in utmSources" :key="item.value" :value="item.value">
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
        <div class="grid gap-4 md:grid-cols-2">
          <div
            v-for="snippet in snippetsWithUrls"
            :key="snippet.id"
            class="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
          >
            <div class="flex items-start justify-between gap-3">
              <h3 class="font-semibold text-slate-900">{{ snippet.label }}</h3>
              <button
                type="button"
                class="shrink-0 text-xs font-semibold text-orange-700 hover:text-orange-900"
                @click="copyText(snippet.text, snippet.label)"
              >
                复制
              </button>
            </div>
            <pre class="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-600">{{ snippet.text }}</pre>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-lg font-bold text-slate-900">FAQ（与落地页一致）</h2>
          </div>
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
              <h2 class="text-lg font-bold text-slate-900">CTA 片段库</h2>
              <p class="mt-1 text-sm text-slate-500">来自 content/aliyun/assets/cta-snippets.md</p>
            </div>
            <button
              type="button"
              class="text-sm font-semibold text-orange-700 hover:text-orange-900"
              @click="copyText(ctaSnippet, 'CTA 片段')"
            >
              复制全文
            </button>
          </div>
          <pre class="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{{ ctaSnippet }}</pre>
        </div>
      </div>

      <!-- 模版与选题 -->
      <div v-show="activeTab === 'templates'" class="mt-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside class="space-y-4">
          <div class="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
            <h2 class="font-bold text-slate-900">选题池</h2>
            <p class="mt-1 text-xs text-slate-500">content/aliyun/topics.queue.json</p>
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
            <h2 class="font-bold text-slate-900">模版文件</h2>
            <ul class="mt-3 space-y-2 text-sm">
              <li v-for="tpl in cloudPromoTemplates" :key="tpl.id">
                <button
                  type="button"
                  class="w-full rounded-lg px-2 py-2 text-left hover:bg-orange-50"
                  :class="expandedTemplateId === tpl.id ? 'bg-orange-50 font-semibold text-orange-900' : 'text-slate-700'"
                  @click="expandedTemplateId = tpl.id"
                >
                  {{ tpl.label }}
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <div class="space-y-6">
          <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 class="text-lg font-bold text-slate-900">选题预览稿</h2>
                <p v-if="selectedTopic" class="mt-1 text-sm text-slate-500">
                  {{ selectedTopic.id }} · 模版 {{ selectedTopic.template }}
                </p>
              </div>
              <button
                type="button"
                class="inline-flex h-9 items-center rounded-lg bg-orange-600 px-3 text-sm font-semibold text-white hover:bg-orange-700"
                @click="copyText(topicDraft, '预览稿')"
              >
                复制预览稿
              </button>
            </div>
            <pre class="mt-4 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-800">{{ topicDraft }}</pre>
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
            v-for="tpl in cloudPromoTemplates"
            v-show="expandedTemplateId === tpl.id"
            :key="tpl.id"
            class="rounded-3xl border border-dashed border-orange-200 bg-orange-50/30 p-6"
          >
            <h3 class="font-bold text-slate-900">{{ tpl.label }}</h3>
            <p class="mt-1 text-sm text-slate-600">{{ tpl.desc }}</p>
            <p class="mt-2 font-mono text-xs text-slate-500">{{ tpl.path }}</p>
            <pre class="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl bg-white p-4 text-xs leading-6 text-slate-700">{{ tpl.body }}</pre>
          </div>

          <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h2 class="text-lg font-bold text-slate-900">系统提示（口径）</h2>
            <pre class="mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-700">{{ cloudPromoPrompts.find((p) => p.id === 'system')?.body }}</pre>
          </div>
        </div>
      </div>

      <!-- 流水线 -->
      <div v-show="activeTab === 'pipeline'" class="mt-8 space-y-6">
        <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <h2 class="text-lg font-bold text-slate-900">内容飞轮（规划）</h2>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            选题 → AI + 模版 → Git 审稿 → SyncBlog 分发 → metrics 采集 → 回流 /cloudcost。目录已就绪，GitHub Action 与发布脚本下一步接入。
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="item in CLOUD_PROMO_PIPELINE_STEPS"
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

        <div class="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-slate-100">
          <h2 class="text-lg font-bold">仓库路径速查</h2>
          <ul class="mt-4 space-y-2 font-mono text-xs leading-6 text-slate-300">
            <li>content/aliyun/topics.queue.json</li>
            <li>content/aliyun/templates/*.md.hbs</li>
            <li>content/aliyun/prompts/*.md</li>
            <li>content/aliyun/assets/cta-snippets.md</li>
            <li>content/aliyun/published/（待创建，存放定稿）</li>
          </ul>
        </div>
      </div>

      <!-- 分发与回流 -->
      <div v-show="activeTab === 'distribution'" class="mt-8 space-y-6">
        <div class="grid gap-6 lg:grid-cols-2">
          <div class="rounded-3xl border border-violet-200 bg-violet-50/40 p-6">
            <h2 class="text-lg font-bold text-slate-900">SyncBlog 分发</h2>
            <p class="mt-3 text-sm leading-6 text-slate-600">
              主稿使用「模版与选题」中的预览稿，同步至多平台。发布后在 meta 中记录各平台 URL（待 published 目录接入）。
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

          <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h2 class="text-lg font-bold text-slate-900">互动数据采集</h2>
            <p class="mt-3 text-sm leading-6 text-slate-600">
              发布后将链接汇总为 TSV，使用仓库内 Playwright 脚本批量采集各平台阅读与互动数据。
            </p>
            <pre class="mt-4 rounded-xl bg-slate-50 p-4 font-mono text-xs leading-6 text-slate-700">npm run metrics:login -- --site juejin,csdn,zhihu,wechat
npm run metrics:collect -- --input ./links.tsv</pre>
            <p class="mt-3 text-xs text-slate-500">
              下一步：从 content/aliyun/published/*/meta.yaml 导出 links.tsv（脚本待接）。
            </p>
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
    </section>
  </div>
</template>
