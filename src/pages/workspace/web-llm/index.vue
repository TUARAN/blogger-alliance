<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import ChatMessage from '../../../components/workspace/web-llm/ChatMessage.vue'
import LoadingModal from '../../../components/workspace/web-llm/LoadingModal.vue'
import SessionList from '../../../components/workspace/web-llm/SessionList.vue'
import { useWebLlmChat } from '../../../composables/useWebLlmChat'
import { MODEL_OPTIONS, SUGGESTED_QUESTIONS } from '../../../services/webllm/constants'

const {
  activeSession,
  activeSessionId,
  applySuggestedQuestion,
  canSend,
  composerText,
  createSession,
  deleteSession,
  handleImageSelect,
  loadModel,
  selectSession,
  selectedModel,
  sendMessage,
  sessions,
  state,
  uploadInputRef,
  clearImage
} = useWebLlmChat()

const messagesRef = ref(null)
const textareaRef = ref(null)

const diagnostics = computed(() => ([
  {
    label: 'WebGPU',
    ok: state.diagnostics.webgpuSupported,
    detail: state.diagnostics.webgpuSupported ? 'navigator.gpu 已就绪' : '浏览器未暴露 navigator.gpu'
  },
  {
    label: '安全上下文',
    ok: state.diagnostics.secureContext,
    detail: state.diagnostics.secureContext ? '当前处于安全上下文' : '请使用 localhost 或 HTTPS'
  },
  {
    label: 'crossOriginIsolated',
    ok: state.diagnostics.crossOriginIsolated,
    detail: state.diagnostics.crossOriginIsolated ? 'COEP/COOP 已生效' : '当前页面未隔离'
  }
]))

function syncTextareaHeight() {
  if (!textareaRef.value) {
    return
  }

  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = `${Math.min(textareaRef.value.scrollHeight, 220)}px`
}

async function scrollToBottom() {
  await nextTick()

  if (!messagesRef.value) {
    return
  }

  messagesRef.value.scrollTop = messagesRef.value.scrollHeight
}

async function handleSubmit() {
  if (!canSend.value) {
    return
  }

  await sendMessage()
  syncTextareaHeight()
  scrollToBottom()
}

function handleKeydown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSubmit()
  }
}

watch(() => composerText.value, () => {
  syncTextareaHeight()
})

watch(() => activeSession.value?.messages.map((message) => `${message.role}:${message.text}:${message.tps}`).join('|'), () => {
  scrollToBottom()
})

onMounted(() => {
  syncTextareaHeight()
})
</script>

<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_25%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)]">
    <nav class="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-md">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div class="min-w-0">
          <RouterLink to="/workspace" class="text-lg font-bold text-slate-900 transition hover:text-amber-600">
            联盟工作台 / 大模型问答
          </RouterLink>
        </div>
        <RouterLink to="/workspace" class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
          返回工作台
        </RouterLink>
      </div>
    </nav>

    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section class="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <SessionList
          :active-session-id="activeSessionId"
          :sessions="sessions"
          @create="createSession"
          @select="selectSession"
          @delete="deleteSession"
        />

        <div class="space-y-6">
          <div class="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-xl shadow-slate-200/40">
            <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">WebGPU Runtime</p>
                <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-900">浏览器端本地大模型</h1>
                <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  你是一个资深前端工程师。请把“浏览器端 WebGPU 运行大模型”的能力迁移到目标网站中。
                </p>
              </div>

              <div class="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <label class="text-sm font-semibold text-slate-700">模型选择</label>
                <select
                  v-model="selectedModel"
                  :disabled="state.isLoadingModel || state.isGenerating"
                  class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400"
                >
                  <option v-for="option in MODEL_OPTIONS" :key="option.id" :value="option.id">
                    {{ option.label }}
                  </option>
                </select>
                <p class="mt-2 text-xs leading-5 text-slate-500">
                  {{ MODEL_OPTIONS.find((item) => item.id === selectedModel)?.description }}
                </p>

                <button
                  type="button"
                  :disabled="state.isLoadingModel || state.isGenerating"
                  class="mt-4 w-full rounded-2xl bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                  @click="loadModel"
                >
                  {{ state.modelReady ? '重新加载模型' : '加载模型' }}
                </button>
              </div>
            </div>

            <div class="mt-6 grid gap-4 lg:grid-cols-3">
              <article
                v-for="item in diagnostics"
                :key="item.label"
                :class="item.ok ? 'border-emerald-200 bg-emerald-50/70' : 'border-rose-200 bg-rose-50/70'"
                class="rounded-3xl border p-4"
              >
                <div class="flex items-center justify-between gap-3">
                  <span class="text-sm font-semibold text-slate-900">{{ item.label }}</span>
                  <span :class="item.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'" class="rounded-full px-2.5 py-1 text-xs font-semibold">
                    {{ item.ok ? '满足' : '不满足' }}
                  </span>
                </div>
                <p class="mt-2 text-sm leading-6 text-slate-600">{{ item.detail }}</p>
              </article>
            </div>

            <div class="mt-6 rounded-3xl border border-slate-200 bg-slate-950 p-5 text-slate-100">
              <div class="flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-slate-300">
                  STATUS
                </span>
                <span class="text-sm text-slate-200">{{ state.loadStatus }}</span>
              </div>

              <p v-if="state.loadError" class="mt-3 whitespace-pre-wrap text-sm leading-6 text-rose-300">
                模型加载失败：{{ state.loadError }}
              </p>
              <p v-else-if="state.diagnostics.issues.length > 0" class="mt-3 text-sm leading-6 text-amber-300">
                {{ state.diagnostics.issues.join(' ') }}
              </p>
            </div>
          </div>

          <div class="rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-xl shadow-slate-200/40 sm:p-6">
            <div
              ref="messagesRef"
              class="flex h-[52vh] min-h-[420px] flex-col gap-4 overflow-y-auto rounded-[1.5rem] bg-slate-50/80 p-4"
            >
              <template v-if="activeSession?.messages.length">
                <ChatMessage
                  v-for="(message, index) in activeSession.messages"
                  :key="`${message.role}-${index}`"
                  :message="message"
                />
              </template>
              <div v-else class="flex h-full items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-white text-center">
                <div class="max-w-md px-6">
                  <p class="text-base font-semibold text-slate-900">先加载模型，再发起第一条提问。</p>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    支持文本输入，并预留图片上传、多会话历史和 IndexedDB 本地持久化。
                  </p>
                </div>
              </div>
            </div>

            <div v-if="state.imagePreview" class="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div class="flex items-start justify-between gap-4">
                <div class="flex min-w-0 items-center gap-4">
                  <img :src="state.imagePreview" alt="图片预览" class="h-20 w-20 rounded-2xl object-cover">
                  <div class="min-w-0">
                    <p class="truncate text-sm font-semibold text-slate-900">{{ state.imageName }}</p>
                    <p class="mt-1 text-xs text-slate-500">{{ state.imageMimeType || 'image/*' }}</p>
                  </div>
                </div>
                <button
                  type="button"
                  class="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                  @click="clearImage"
                >
                  移除
                </button>
              </div>
            </div>

            <p v-if="state.inferenceError" class="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              推理错误：{{ state.inferenceError }}
            </p>

            <div
              v-if="state.isGenerating"
              class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            >
              <div class="flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
                  {{ state.generationStage }}
                </span>
                <span>耗时 {{ (state.generationElapsedMs / 1000).toFixed(1) }}s</span>
                <span>Token {{ state.generatedTokens }}</span>
                <span v-if="state.generationTps">{{ state.generationTps }} tokens/s</span>
              </div>
              <p class="mt-2 text-xs leading-5 text-amber-800/80">
                当前会显示准备上下文、编码输入、生成回复等阶段，不再只有“正在生成中”。
              </p>
            </div>

            <div class="mt-4 rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-sm">
              <div class="flex flex-wrap gap-2 px-2 pb-3">
                <button
                  v-for="question in SUGGESTED_QUESTIONS"
                  :key="question"
                  type="button"
                  class="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 transition hover:border-amber-300 hover:bg-amber-100"
                  @click="applySuggestedQuestion(question)"
                >
                  {{ question }}
                </button>
              </div>

              <textarea
                ref="textareaRef"
                v-model="composerText"
                :disabled="!state.modelReady || state.isGenerating"
                rows="1"
                class="max-h-[220px] min-h-[56px] w-full resize-none border-0 bg-transparent px-2 py-2 text-sm leading-7 text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                placeholder="输入你的问题。Enter 发送，Shift + Enter 换行。"
                @keydown="handleKeydown"
              />

              <div class="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex flex-wrap items-center gap-2">
                  <input
                    ref="uploadInputRef"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    :disabled="state.isGenerating"
                    @change="handleImageSelect"
                  >
                  <button
                    type="button"
                    :disabled="state.isGenerating"
                    class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white disabled:cursor-not-allowed disabled:text-slate-400"
                    @click="uploadInputRef?.click()"
                  >
                    上传图片
                  </button>
                  <span class="text-xs text-slate-400">
                    {{ state.modelReady ? '模型已就绪，可开始本地推理' : '需先完成模型加载' }}
                  </span>
                </div>

                <button
                  type="button"
                  :disabled="!canSend"
                  class="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                  @click="handleSubmit"
                >
                  {{ state.isGenerating ? '生成中...' : '发送' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <LoadingModal
      :open="state.isLoadingModel"
      :progress="state.loadProgress"
      :status="state.loadStatus"
    />
  </div>
</template>
