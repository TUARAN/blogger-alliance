<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" @click.self="$emit('cancel')">
      <div class="w-full max-w-3xl max-h-[calc(100vh-2rem)] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col">
        <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h3 class="text-lg font-bold text-slate-900">{{ mode === 'create' ? '新增数据报告' : '编辑数据报告' }}</h3>
            <p class="text-xs text-slate-500 mt-0.5">报告编号 ID 用于唯一标识，保存后不可修改。数据指标不填写视为 0。</p>
          </div>
          <button class="text-slate-400 hover:text-slate-600" @click="$emit('cancel')">✕</button>
        </div>

        <div class="overflow-y-auto px-6 py-5 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">报告编号 ID <span class="text-red-500">*</span></span>
              <input
                v-model.trim="form.id"
                :disabled="mode === 'edit'"
                type="text"
                placeholder="report-20260424-001"
                class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-500 font-mono text-sm"
              >
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">归属合作编码 <span class="text-red-500">*</span></span>
              <input
                v-model.trim="form.cooperationId"
                type="text"
                placeholder="BRAND-SERVICE-001"
                class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
              >
              <span class="block mt-1 text-[11px] text-slate-400">指向一条合作记录，报告会挂在对应合作下。</span>
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">报告标题</span>
              <input v-model.trim="form.title" type="text" placeholder="数据报告" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">推广文章标题</span>
              <input v-model.trim="form.articleTitle" type="text" placeholder="《示例推广文章》" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">合作项目 <span class="text-red-500">*</span></span>
              <input v-model.trim="form.project" type="text" placeholder="品牌 / 项目名称" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">执行人 <span class="text-red-500">*</span></span>
              <input v-model.trim="form.author" type="text" placeholder="某某" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">推广平台</span>
              <input v-model.trim="form.platforms" type="text" placeholder="公众号, 知乎, 掘金（用逗号分隔）" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <span class="block mt-1 text-[11px] text-slate-400">多个平台用中英文逗号均可。</span>
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">统计周期</span>
              <input v-model.trim="form.period" type="text" placeholder="2026.04.01 - 2026.04.24" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm">
            </label>
            <label class="block md:col-span-2">
              <span class="text-xs font-semibold text-slate-600">发布时间</span>
              <input v-model.trim="form.publishedAt" type="text" placeholder="2026-04-24T10:00:00Z" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm">
              <span class="block mt-1 text-[11px] text-slate-400">建议使用 ISO 格式，影响报告编号生成。</span>
            </label>
          </div>

          <div>
            <p class="text-xs font-semibold text-slate-600 mb-2">数据表现</p>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
              <label class="block">
                <span class="text-[11px] text-slate-500">阅读</span>
                <input v-model.number="form.stats.reads" type="number" min="0" class="mt-1 w-full h-9 px-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums text-sm">
              </label>
              <label class="block">
                <span class="text-[11px] text-slate-500">点赞</span>
                <input v-model.number="form.stats.likes" type="number" min="0" class="mt-1 w-full h-9 px-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums text-sm">
              </label>
              <label class="block">
                <span class="text-[11px] text-slate-500">收藏</span>
                <input v-model.number="form.stats.favorites" type="number" min="0" class="mt-1 w-full h-9 px-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums text-sm">
              </label>
              <label class="block">
                <span class="text-[11px] text-slate-500">评论</span>
                <input v-model.number="form.stats.comments" type="number" min="0" class="mt-1 w-full h-9 px-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums text-sm">
              </label>
              <label class="block">
                <span class="text-[11px] text-slate-500">转发</span>
                <input v-model.number="form.stats.shares" type="number" min="0" class="mt-1 w-full h-9 px-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums text-sm">
              </label>
            </div>
          </div>

          <label class="block">
            <span class="text-xs font-semibold text-slate-600">报告正文 <span class="text-red-500">*</span></span>
            <textarea
              v-model="form.content"
              rows="6"
              placeholder="报告正文：可包含行业背景、内容概述、数据表现、亮点总结等。"
              class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-normal"
            ></textarea>
          </label>

          <p v-if="validationError" class="text-sm text-red-600">{{ validationError }}</p>
        </div>

        <div class="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-3">
          <button
            v-if="mode === 'edit'"
            class="mr-auto h-9 px-3 rounded-lg border border-red-200 bg-white text-sm font-medium text-red-600 hover:bg-red-50"
            :disabled="isSaving"
            @click="$emit('delete')"
          >
            删除报告
          </button>
          <button class="h-9 px-4 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-100" :disabled="isSaving" @click="$emit('cancel')">取消</button>
          <button class="h-9 px-4 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60" :disabled="isSaving" @click="onSave">
            {{ isSaving ? '保存中...' : '保存' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  report: { type: Object, default: null },
  cooperationId: { type: String, default: '' },
  isSaving: { type: Boolean, default: false }
})

const emit = defineEmits(['save', 'cancel', 'delete'])

const mode = ref(props.report?.id ? 'edit' : 'create')
const validationError = ref('')

function buildForm(source) {
  const platforms = Array.isArray(source?.platforms) ? source.platforms.join(', ') : ''
  const stats = source?.stats && typeof source.stats === 'object' ? source.stats : {}

  return {
    id: source?.id ?? '',
    cooperationId: source?.cooperationId ?? props.cooperationId ?? '',
    title: source?.title ?? '数据报告',
    articleTitle: source?.articleTitle ?? '',
    project: source?.project ?? '',
    author: source?.author ?? '',
    platforms,
    period: source?.period ?? '',
    publishedAt: source?.publishedAt ?? '',
    stats: {
      reads: Number(stats.reads) || 0,
      likes: Number(stats.likes) || 0,
      favorites: Number(stats.favorites) || 0,
      comments: Number(stats.comments) || 0,
      shares: Number(stats.shares) || 0
    },
    content: source?.content ?? ''
  }
}

const form = reactive(buildForm(props.report))

watch(() => props.report, (next) => {
  Object.assign(form, buildForm(next))
  mode.value = next?.id ? 'edit' : 'create'
  validationError.value = ''
})

function parsePlatforms(raw) {
  return String(raw || '')
    .split(/[,，、\s]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function nonNegativeInt(value) {
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.floor(n)
}

function onSave() {
  validationError.value = ''
  const id = String(form.id || '').trim()
  const cooperationId = String(form.cooperationId || '').trim()
  const project = String(form.project || '').trim()
  const author = String(form.author || '').trim()
  const content = String(form.content || '').trim()

  if (!id) {
    validationError.value = '报告编号 ID 不能为空。'
    return
  }

  if (!cooperationId) {
    validationError.value = '归属合作编码不能为空。'
    return
  }

  if (!project) {
    validationError.value = '合作项目不能为空。'
    return
  }

  if (!author) {
    validationError.value = '执行人不能为空。'
    return
  }

  if (!content) {
    validationError.value = '报告正文不能为空。'
    return
  }

  const payload = {
    id,
    cooperationId: cooperationId.toUpperCase(),
    title: String(form.title || '').trim() || '数据报告',
    project,
    author,
    platforms: parsePlatforms(form.platforms),
    period: String(form.period || '').trim(),
    publishedAt: String(form.publishedAt || '').trim(),
    stats: {
      reads: nonNegativeInt(form.stats.reads),
      likes: nonNegativeInt(form.stats.likes),
      favorites: nonNegativeInt(form.stats.favorites),
      comments: nonNegativeInt(form.stats.comments),
      shares: nonNegativeInt(form.stats.shares)
    },
    content
  }

  const articleTitle = String(form.articleTitle || '').trim()
  if (articleTitle) {
    payload.articleTitle = articleTitle
  }

  emit('save', { mode: mode.value, report: payload, originalId: props.report?.id || null })
}
</script>
