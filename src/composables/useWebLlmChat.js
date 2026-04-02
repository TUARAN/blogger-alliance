import { computed, onMounted, reactive, ref, watch } from 'vue'
import { DEFAULT_MODEL_ID } from '../services/webllm/constants'
import {
  createEmptySession,
  listSessions,
  removeSession,
  saveSession
} from '../services/webllm/sessionStore'
import {
  generateReply,
  getEnvironmentDiagnostics,
  loadModelRuntime
} from '../services/webllm/runtime'

export function useWebLlmChat() {
  const sessions = ref([])
  const activeSessionId = ref('')
  const runtime = ref(null)
  const selectedModel = ref(DEFAULT_MODEL_ID)
  const composerText = ref('')
  const uploadInputRef = ref(null)

  const state = reactive({
    diagnostics: getEnvironmentDiagnostics(),
    isLoadingModel: false,
    isGenerating: false,
    loadProgress: 0,
    loadStatus: '尚未加载模型',
    loadError: '',
    inferenceError: '',
    imagePreview: '',
    imageName: '',
    imageMimeType: '',
    modelReady: false,
    loadedModelId: ''
  })

  const activeSession = computed(() => {
    return sessions.value.find((session) => session.id === activeSessionId.value) ?? null
  })

  const canSend = computed(() => {
    return Boolean(
      state.modelReady &&
      state.loadedModelId === selectedModel.value &&
      !state.isGenerating &&
      composerText.value.trim() &&
      activeSession.value
    )
  })

  function replaceSession(nextSession) {
    sessions.value = sessions.value.map((session) => {
      return session.id === nextSession.id ? nextSession : session
    }).sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
  }

  async function persistActiveSession() {
    if (!activeSession.value) {
      return
    }

    const saved = await saveSession(activeSession.value)
    replaceSession(saved)
    activeSessionId.value = saved.id
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
    if (!activeSession.value || !runtime.value || !composerText.value.trim() || state.isGenerating) {
      return
    }

    const userMessage = {
      role: 'user',
      text: composerText.value.trim(),
      image: state.imagePreview || null,
      tps: null
    }
    const assistantMessage = {
      role: 'assistant',
      text: '',
      image: null,
      tps: null,
      pending: true
    }

    activeSession.value.messages.push(userMessage, assistantMessage)
    activeSession.value.updatedAt = Date.now()
    composerText.value = ''
    state.inferenceError = ''
    state.isGenerating = true
    clearImage()
    await persistActiveSession()

    try {
      await generateReply({
        runtime: runtime.value,
        messages: activeSession.value.messages.filter((message) => !message.pending),
        onStream: ({ text, tps }) => {
          assistantMessage.text = text
          assistantMessage.tps = tps
          activeSession.value.updatedAt = Date.now()
        }
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      assistantMessage.text = `推理失败：${message}`
      state.inferenceError = message
    } finally {
      assistantMessage.pending = false
      activeSession.value.updatedAt = Date.now()
      state.isGenerating = false
      await persistActiveSession()
    }
  }

  onMounted(() => {
    bootstrapSessions()
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
    sessions,
    state,
    uploadInputRef,
    clearImage
  }
}
