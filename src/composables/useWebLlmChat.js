import { computed, onMounted, onUnmounted, reactive, ref, toRaw, watch } from 'vue'
import { DEFAULT_MODEL_ID } from '../services/webllm/constants'
import {
  createEmptySession,
  listSessions,
  removeSession,
  saveSession
} from '../services/webllm/sessionStore'
import {
  buildKnowledgeFallbackReply,
  createGenerationController,
  generateReply,
  getEnvironmentDiagnostics,
  loadModelRuntime
} from '../services/webllm/runtime'

const FIRST_TOKEN_TIMEOUT_MS = 15000

export function useWebLlmChat() {
  const sessions = ref([])
  const activeSessionId = ref('')
  const runtime = ref(null)
  const selectedModel = ref(DEFAULT_MODEL_ID)
  const composerText = ref('')
  const uploadInputRef = ref(null)
  let activeGenerationController = null

  const state = reactive({
    diagnostics: getEnvironmentDiagnostics(),
    isLoadingModel: false,
    isGenerating: false,
    generationStage: 'idle',
    generationElapsedMs: 0,
    generatedTokens: 0,
    generationTps: null,
    promptProcessingMs: 0,
    firstTokenMs: null,
    totalGenerationMs: 0,
    contextSelectedTerms: [],
    contextEntryCount: 0,
    loadProgress: 0,
    loadStatus: '尚未加载模型',
    loadError: '',
    inferenceError: '',
    imagePreview: '',
    imageName: '',
    imageMimeType: '',
    modelReady: false,
    loadedModelId: '',
    generationHint: '',
    fallbackMode: '',
    fallbackReason: ''
  })

  const activeSession = computed(() => {
    return sessions.value.find((session) => session.id === activeSessionId.value) ?? null
  })

  const canSend = computed(() => {
    return Boolean(
      !state.isGenerating &&
      composerText.value.trim() &&
      activeSession.value
    )
  })

  function stopActiveGeneration(reason = '已停止生成') {
    activeGenerationController?.stop?.()
  }

  async function persistActiveSession() {
    if (!activeSession.value) {
      return
    }

    try {
      const raw = toRaw(activeSession.value)
      const rawMessages = raw.messages.map((msg) => toRaw(msg))
      await saveSession({ ...raw, messages: rawMessages })
    } catch {
      // IndexedDB save failed silently — non-critical
    }
  }

  async function bootstrapSessions() {
    const storedSessions = await listSessions()

    if (storedSessions.length === 0) {
      const initialSession = createEmptySession()
      const saved = await saveSession(initialSession)

      sessions.value = [saved]
      activeSessionId.value = saved.id
      return
    }

    sessions.value = storedSessions
    activeSessionId.value = storedSessions[0].id
  }

  async function createSession() {
    const session = createEmptySession()
    const saved = await saveSession(session)

    sessions.value = [saved, ...sessions.value]
    activeSessionId.value = saved.id
    composerText.value = ''
    clearImage()
  }

  async function selectSession(id) {
    activeSessionId.value = id
    composerText.value = ''
    clearImage()
    state.inferenceError = ''
  }

  async function deleteSession(id) {
    await removeSession(id)
    sessions.value = sessions.value.filter((session) => session.id !== id)

    if (sessions.value.length === 0) {
      await createSession()
      return
    }

    if (activeSessionId.value === id) {
      activeSessionId.value = sessions.value[0].id
    }
  }

  async function loadModel() {
    state.diagnostics = getEnvironmentDiagnostics()
    state.loadError = ''
    state.inferenceError = ''
    state.isLoadingModel = true
    state.loadProgress = 0
    state.loadStatus = '正在准备处理器与模型资源...'

    try {
      runtime.value = await loadModelRuntime(selectedModel.value, ({ percent, activeFiles }) => {
        state.loadProgress = percent
        state.loadStatus = `正在下载并初始化模型资源 (${percent}%) · ${activeFiles} 个文件`
      })
      state.modelReady = true
      state.loadedModelId = selectedModel.value
      state.loadProgress = 100
      state.loadStatus = '模型已加载，可以开始对话'
    } catch (error) {
      state.modelReady = false
      state.loadedModelId = ''
      state.loadError = [
        `原始错误：${error instanceof Error ? error.message : String(error)}`,
        `环境诊断：WebGPU=${state.diagnostics.webgpuSupported ? 'yes' : 'no'}, 安全上下文=${state.diagnostics.secureContext ? 'yes' : 'no'}, crossOriginIsolated=${state.diagnostics.crossOriginIsolated ? 'yes' : 'no'}`
      ].join('\n')
      state.loadStatus = '模型加载失败'
    } finally {
      state.isLoadingModel = false
    }
  }

  async function handleImageSelect(event) {
    const [file] = event.target.files ?? []

    if (!file) {
      return
    }

    state.imageName = file.name
    state.imageMimeType = file.type
    state.imagePreview = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(new Error('图片读取失败'))
      reader.readAsDataURL(file)
    })
  }

  function clearImage() {
    state.imagePreview = ''
    state.imageName = ''
    state.imageMimeType = ''

    if (uploadInputRef.value) {
      uploadInputRef.value.value = ''
    }
  }

  async function sendMessage() {
    if (!activeSession.value || !composerText.value.trim() || state.isGenerating) {
      return
    }

    const userText = composerText.value.trim()
    const userImage = state.imagePreview || null
    composerText.value = ''
    clearImage()

    activeSession.value.messages.push(
      { role: 'user', text: userText, image: userImage, tps: null },
      { role: 'assistant', text: '', image: null, tps: null, pending: true }
    )
    const assistantMessage = activeSession.value.messages[activeSession.value.messages.length - 1]

    state.inferenceError = ''
    state.isGenerating = true
    state.generationStage = 'preparing'
    state.generationElapsedMs = 0
    state.generatedTokens = 0
    state.generationTps = null
    state.promptProcessingMs = 0
    state.firstTokenMs = null
    state.totalGenerationMs = 0
    state.contextSelectedTerms = []
    state.contextEntryCount = 0
    state.generationHint = ''
    state.fallbackMode = ''
    state.fallbackReason = ''

    try {
      const modelAvailable = runtime.value && state.modelReady && state.loadedModelId === selectedModel.value

      if (!modelAvailable) {
        const fallback = buildKnowledgeFallbackReply(
          activeSession.value.messages.filter((m) => !m.pending),
          {
            reason: '当前未加载可用的本地 WebGPU 模型',
            includeImageNotice: Boolean(userImage)
          }
        )

        assistantMessage.text = fallback.text
        state.fallbackMode = 'knowledge'
        state.fallbackReason = '未加载模型时直接使用知识库检索回答'
        state.contextSelectedTerms = fallback.selectedTerms
        state.contextEntryCount = fallback.entryCount
        state.generationHint = '当前回答来自站点知识库兜底，不依赖 WebGPU 推理。'
        state.generationStage = 'complete'
        return
      }

      activeGenerationController = createGenerationController()

      await generateReply({
        runtime: runtime.value,
        messages: activeSession.value.messages.filter((m) => !m.pending),
        generationController: activeGenerationController,
        onStatus: ({ stage, elapsedMs, generatedTokens, tps, promptProcessingMs, firstTokenMs, totalGenerationMs, selectedTerms, entryCount }) => {
          state.generationStage = stage
          state.generationElapsedMs = elapsedMs ?? 0
          state.generatedTokens = generatedTokens ?? 0
          state.generationTps = tps ?? null
          state.promptProcessingMs = promptProcessingMs ?? 0
          state.firstTokenMs = firstTokenMs ?? null
          state.totalGenerationMs = totalGenerationMs ?? 0
          state.contextSelectedTerms = selectedTerms ?? []
          state.contextEntryCount = entryCount ?? 0

          if (stage === 'generating' && generatedTokens > 0) {
            state.generationHint = '模型正在持续解码。'
          } else if (stage === 'generating') {
            state.generationHint = '模型已进入生成阶段，正在等待首个 token。'
          } else if (stage === 'complete') {
            state.generationHint = '生成完成。'
          }
        },
        onStream: ({ text, tps }) => {
          assistantMessage.text = text
          assistantMessage.tps = tps
        }
      })
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error)
      const fallback = buildKnowledgeFallbackReply(
        activeSession.value.messages.filter((m) => !m.pending),
        {
          reason: errorMsg,
          includeImageNotice: Boolean(userImage)
        }
      )

      assistantMessage.text = fallback.text
      assistantMessage.tps = null
      state.inferenceError = errorMsg
      state.fallbackMode = 'knowledge'
      state.fallbackReason = `本地模型失败后切换知识库兜底：${errorMsg}`
      state.contextSelectedTerms = fallback.selectedTerms
      state.contextEntryCount = fallback.entryCount
      state.generationHint = '本地模型失败，已自动切换为站点知识库检索回答。'
      state.generationStage = 'complete'
    } finally {
      assistantMessage.pending = false
      activeGenerationController = null
      state.isGenerating = false
      state.generationStage = 'complete'
      activeSession.value.updatedAt = Date.now()
      await persistActiveSession()
    }
  }

  function applySuggestedQuestion(question) {
    composerText.value = question
  }

  onMounted(() => {
    bootstrapSessions()
  })

  onUnmounted(() => {
    activeGenerationController?.stop?.()
  })

  watch(selectedModel, (nextModel) => {
    if (state.loadedModelId && state.loadedModelId !== nextModel) {
      state.modelReady = false
      state.loadStatus = '模型选择已变更，请重新加载模型后再发送消息'
    } else if (state.loadedModelId === nextModel) {
      state.modelReady = true
      state.loadStatus = '模型已加载，可以开始对话'
    }
  })

  return {
    activeSession,
    activeSessionId,
    canSend,
    composerText,
    createSession,
    deleteSession,
    handleImageSelect,
    loadModel,
    selectSession,
    selectedModel,
    sendMessage,
    stopActiveGeneration,
    applySuggestedQuestion,
    sessions,
    state,
    uploadInputRef,
    clearImage
  }
}
