<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const initialized = ref(false)
const cleanupFns = []

onMounted(async () => {
  if (initialized.value) {
    return
  }
  initialized.value = true

  const {
    AutoProcessor,
    Qwen3_5ForConditionalGeneration,
    RawImage,
    TextStreamer,
    env
  } = await import('@huggingface/transformers')

  class DOMTextStreamer extends TextStreamer {
    constructor(tokenizer, callback) {
      super(tokenizer, { skip_prompt: true, skip_special_tokens: true })
      this.callback = callback
      this.generatedText = ''
      this.tokenCount = 0
      this.startTime = null
      this.firstPutDone = false
      this.finalTps = 0
    }

    put(value) {
      if (!this.firstPutDone) {
        this.firstPutDone = true
        this.startTime = performance.now()
      } else {
        const count = value.size !== undefined ? value.size : value.length || 1
        this.tokenCount += count
      }
      super.put(value)
    }

    on_finalized_text(text, streamEnd) {
      this.generatedText += text

      let tps = 0
      if (this.tokenCount > 0 && this.startTime) {
        const elapsed = (performance.now() - this.startTime) / 1000
        if (elapsed > 0) {
          tps = Number((this.tokenCount / elapsed).toFixed(2))
        }
      }

      this.finalTps = tps
      this.callback(this.generatedText, streamEnd, tps)
    }
  }

  const DB_NAME = 'QwenChatDB'
  const STORE_NAME = 'chats'

  let db
  let currentChatId = null
  let chatHistory = []
  let processor = null
  let model = null
  let isLoading = false
  let currentImageBase64 = null

  const chatListEl = document.getElementById('chat-list')
  const chatContainerEl = document.getElementById('chat-container')
  const textInput = document.getElementById('text-input')
  const sendBtn = document.getElementById('send-btn')
  const loadModelBtn = document.getElementById('load-model-btn')
  const modelSelect = document.getElementById('model-select')
  const attachBtn = document.getElementById('attach-btn')
  const fileInput = document.getElementById('file-input')
  const previewContainer = document.getElementById('preview-container')
  const previewImg = document.getElementById('preview-img')
  const removeImgBtn = document.getElementById('remove-img-btn')
  const loadingModal = document.getElementById('loading-modal')
  const progressBar = document.getElementById('progress-bar')
  const progressText = document.getElementById('progress-text')
  const newChatBtn = document.getElementById('new-chat-btn')
  const inputForm = document.getElementById('input-form')
  const runtimeNoticeEl = document.getElementById('runtime-notice')

  const MODEL_OPTIONS = {
    'onnx-community/Qwen3.5-0.8B-ONNX': {
      label: 'Qwen3.5-0.8B-ONNX',
      notes: '推荐首测模型，体积最小，加载成功率最高。'
    },
    'onnx-community/Qwen3.5-2B-ONNX': {
      label: 'Qwen3.5-2B-ONNX',
      notes: '质量更稳，但对显存和下载体积要求更高。'
    },
    'onnx-community/Qwen3.5-4B-ONNX': {
      label: 'Qwen3.5-4B-ONNX',
      notes: '仅建议在高显存设备上尝试。'
    }
  }

  env.allowLocalModels = false

  function setRuntimeNotice(kind, message) {
    runtimeNoticeEl.className = kind ? `notice notice-${kind}` : ''
    runtimeNoticeEl.textContent = message || ''
  }

  function getBrowserDiagnostics() {
    const notices = []

    if (!('gpu' in navigator)) {
      notices.push('当前浏览器未暴露 WebGPU，模型无法在 GPU 上加载。建议使用新版 Chrome/Edge。')
    }

    if (!window.isSecureContext) {
      notices.push('当前页面不是安全上下文，部分浏览器特性可能受限。请通过 localhost 或 HTTPS 访问。')
    }

    if (!crossOriginIsolated) {
      notices.push('当前页面未启用 cross-origin isolation，某些 ONNX/WebAssembly 优化可能不可用。')
    }

    return notices
  }

  function initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1)

      request.onupgradeneeded = (event) => {
        const instance = event.target.result
        if (!instance.objectStoreNames.contains(STORE_NAME)) {
          instance.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      }

      request.onsuccess = (event) => {
        db = event.target.result
        resolve()
      }

      request.onerror = (event) => reject(event.target.error)
    })
  }

  function saveChat(chat) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      tx.objectStore(STORE_NAME).put(chat)
      tx.oncomplete = () => resolve()
      tx.onerror = (event) => reject(event.target.error)
    })
  }

  function getAllChats() {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const request = tx.objectStore(STORE_NAME).getAll()
      request.onsuccess = () => resolve(request.result || [])
      request.onerror = (event) => reject(event.target.error)
    })
  }

  function removeChat(id) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      tx.objectStore(STORE_NAME).delete(id)
      tx.oncomplete = () => resolve()
      tx.onerror = (event) => reject(event.target.error)
    })
  }

  function scrollChatToBottom() {
    chatContainerEl.scrollTop = chatContainerEl.scrollHeight
  }

  function autoResizeTextarea() {
    textInput.style.height = 'auto'
    textInput.style.height = `${Math.min(textInput.scrollHeight, 180)}px`
  }

  function setLoadingModal(visible) {
    loadingModal.style.display = visible ? 'flex' : 'none'
    loadingModal.setAttribute('aria-hidden', String(!visible))
  }

  function toggleComposer(disabled) {
    sendBtn.disabled = disabled || !model || !processor
    textInput.disabled = disabled
    attachBtn.disabled = disabled
  }

  function resetPreview() {
    currentImageBase64 = null
    previewContainer.style.display = 'none'
    previewImg.src = ''
  }

  function updateModelNotice() {
    const details = MODEL_OPTIONS[modelSelect.value]
    if (!details) {
      setRuntimeNotice('', '')
      return
    }

    const diagnostics = getBrowserDiagnostics()
    const baseMessage = `${details.label}: ${details.notes}`
    setRuntimeNotice(
      diagnostics.length > 0 ? 'warn' : 'info',
      diagnostics.length > 0
        ? `${baseMessage} ${diagnostics.join(' ')}`
        : baseMessage
    )
  }

  function buildChatTitle(messages) {
    if (messages.length === 0) {
      return '新对话'
    }

    const firstText = messages[0].text?.trim()
    if (firstText) {
      return firstText.slice(0, 15)
    }

    return '图片对话'
  }

  async function updateDB() {
    await saveChat({
      id: currentChatId,
      title: buildChatTitle(chatHistory),
      messages: chatHistory
    })
    await loadSidebar()
  }

  async function loadSidebar() {
    const chats = await getAllChats()
    chats.sort((a, b) => b.id - a.id)
    chatListEl.innerHTML = ''

    chats.forEach((chat) => {
      const item = document.createElement('div')
      item.className = `chat-item ${chat.id === currentChatId ? 'active' : ''}`
      item.onclick = () => selectChat(chat)

      const title = document.createElement('div')
      title.className = 'chat-title'
      title.innerText = chat.title || '新对话'

      const delBtn = document.createElement('button')
      delBtn.className = 'delete-btn'
      delBtn.type = 'button'
      delBtn.innerText = '删除'
      delBtn.onclick = async (event) => {
        event.stopPropagation()
        await removeChat(chat.id)

        if (currentChatId === chat.id) {
          createNewChat()
        } else {
          await loadSidebar()
        }
      }

      item.appendChild(title)
      item.appendChild(delBtn)
      chatListEl.appendChild(item)
    })
  }

  function appendEmptyState() {
    if (chatHistory.length > 0 || chatContainerEl.children.length > 0) {
      return
    }

    const hint = document.createElement('div')
    hint.className = 'message ai-msg'
    hint.innerHTML =
      '<strong>准备就绪</strong><br />先加载模型，然后输入文字或上传图片开始对话。'
    chatContainerEl.appendChild(hint)
  }

  function clearChatView() {
    chatContainerEl.innerHTML = ''
    appendEmptyState()
  }

  function createNewChat() {
    currentChatId = Date.now()
    chatHistory = []
    clearChatView()
    loadSidebar()
  }

  function appendMessageUI(role, text, imageBase64 = null, msgId = null) {
    const isAssistant = role === 'assistant'
    const msgDiv = document.createElement('div')
    msgDiv.className = `message ${role === 'user' ? 'user-msg' : 'ai-msg'}`

    if (msgId) {
      msgDiv.id = msgId
    }

    if (imageBase64) {
      const img = document.createElement('img')
      img.src = imageBase64
      img.alt = '用户上传图片'
      msgDiv.appendChild(img)
    }

    const textSpan = document.createElement('span')
    textSpan.innerText = text
    msgDiv.appendChild(textSpan)

    let statsDiv = null
    if (isAssistant) {
      statsDiv = document.createElement('div')
      statsDiv.className = 'msg-stats'
      msgDiv.appendChild(statsDiv)
    }

    if (chatContainerEl.children.length === 1 && chatHistory.length === 0) {
      const firstChild = chatContainerEl.firstElementChild
      if (firstChild && firstChild.innerText.includes('准备就绪')) {
        chatContainerEl.innerHTML = ''
      }
    }

    chatContainerEl.appendChild(msgDiv)
    scrollChatToBottom()

    return { textSpan, statsDiv }
  }

  async function selectChat(chat) {
    currentChatId = chat.id
    chatHistory = chat.messages || []
    chatContainerEl.innerHTML = ''

    chatHistory.forEach((msg) => {
      const { statsDiv } = appendMessageUI(msg.role, msg.text, msg.image)
      if (msg.tps && statsDiv) {
        statsDiv.innerText = `速度: ${msg.tps} tokens/s`
      }
    })

    appendEmptyState()
    await loadSidebar()
  }

  async function loadModel() {
    if (isLoading) {
      return
    }

    const modelId = modelSelect.value
    isLoading = true
    loadModelBtn.disabled = true
    modelSelect.disabled = true
    progressBar.value = 0
    progressText.innerText = '正在初始化...'
    setLoadingModal(true)

    const progressMap = {}

    try {
      setRuntimeNotice('info', `开始加载 ${MODEL_OPTIONS[modelId]?.label || modelId}。首次下载会较慢。`)

      const progressCallback = (info) => {
        if (info.status === 'progress') {
          progressMap[info.file] = {
            loaded: info.loaded,
            total: info.total
          }

          let totalLoaded = 0
          let totalSize = 0
          Object.values(progressMap).forEach((entry) => {
            totalLoaded += entry.loaded
            totalSize += entry.total
          })

          const percent = totalSize > 0 ? (totalLoaded / totalSize) * 100 : 0
          progressBar.value = percent
          progressText.innerText = `下载中... ${Math.round(percent)}%`
        } else if (info.status === 'ready') {
          progressText.innerText = '加载至 WebGPU... 这可能会需要一段时间'
        }
      }

      processor = await AutoProcessor.from_pretrained(modelId, {
        progress_callback: progressCallback
      })

      model = await Qwen3_5ForConditionalGeneration.from_pretrained(modelId, {
        dtype: {
          embed_tokens: 'q4',
          vision_encoder: 'fp16',
          decoder_model_merged: 'q4'
        },
        device: 'webgpu',
        progress_callback: progressCallback
      })

      loadModelBtn.innerText = '模型已加载'
      setRuntimeNotice('success', `${MODEL_OPTIONS[modelId]?.label || modelId} 已加载，可以开始对话。`)
      toggleComposer(false)
    } catch (error) {
      console.error(error)
      const diagnostics = getBrowserDiagnostics()
      const diagnosticText =
        diagnostics.length > 0 ? `\n\n环境诊断：${diagnostics.join(' ')}` : ''

      alert(
        '模型加载失败。请确认浏览器支持 WebGPU，并查看控制台错误信息。\n' +
          error.message +
          diagnosticText
      )
      setRuntimeNotice(
        'error',
        `模型加载失败: ${error.message}${diagnostics.length > 0 ? ` ${diagnostics.join(' ')}` : ''}`
      )
      loadModelBtn.disabled = false
      modelSelect.disabled = false
    } finally {
      isLoading = false
      setLoadingModal(false)
    }
  }

  async function buildConversationAndImages() {
    const conversation = []
    const rawImages = []

    for (const msg of chatHistory) {
      if (msg.role === 'user') {
        const content = []
        if (msg.image) {
          content.push({ type: 'image' })
          const rawImage = await RawImage.read(msg.image)
          const resized = await rawImage.resize(448, 448)
          rawImages.push(resized)
        }
        content.push({ type: 'text', text: msg.text || '' })
        conversation.push({ role: 'user', content })
        continue
      }

      conversation.push({
        role: 'assistant',
        content: [{ type: 'text', text: msg.text }]
      })
    }

    return { conversation, rawImages }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const text = textInput.value.trim()
    if (!text && !currentImageBase64) {
      return
    }

    if (!model || !processor) {
      alert('请先加载模型。')
      return
    }

    const userText = text
    const userImg = currentImageBase64

    textInput.value = ''
    autoResizeTextarea()
    resetPreview()

    appendMessageUI('user', userText, userImg)
    chatHistory.push({ role: 'user', text: userText, image: userImg })
    await updateDB()

    toggleComposer(true)

    const aiMsgId = `ai-msg-${Date.now()}`
    const { textSpan: aiTextSpan, statsDiv: aiStatsDiv } = appendMessageUI(
      'assistant',
      '思考中...',
      null,
      aiMsgId
    )

    try {
      const { conversation, rawImages } = await buildConversationAndImages()
      const promptText = processor.apply_chat_template(conversation, {
        add_generation_prompt: true
      })

      const inputs =
        rawImages.length > 0
          ? await processor(
              promptText,
              rawImages.length === 1 ? rawImages[0] : rawImages
            )
          : await processor(promptText)

      aiTextSpan.innerText = ''

      const streamer = new DOMTextStreamer(
        processor.tokenizer,
        (newText, _isEnd, tps) => {
          aiTextSpan.innerText = newText
          if (tps > 0 && aiStatsDiv) {
            aiStatsDiv.innerText = `速度: ${tps} tokens/s`
          }
          scrollChatToBottom()
        }
      )

      await model.generate({
        ...inputs,
        max_new_tokens: 512,
        streamer
      })

      chatHistory.push({
        role: 'assistant',
        text: aiTextSpan.innerText,
        tps: streamer.finalTps
      })
      await updateDB()
    } catch (error) {
      console.error('生成报错:', error)
      aiTextSpan.innerText = `生成出错: ${error.message}`
    } finally {
      toggleComposer(false)
      textInput.focus()
    }
  }

  function bindEvents() {
    const onNewChat = () => createNewChat()
    const onLoadModel = () => loadModel()
    const onModelChange = () => updateModelNotice()
    const onAttach = () => fileInput.click()
    const onFileChange = (event) => {
      const file = event.target.files?.[0]
      if (!file) {
        return
      }

      const reader = new FileReader()
      reader.onload = (loadEvent) => {
        currentImageBase64 = loadEvent.target.result
        previewImg.src = currentImageBase64
        previewContainer.style.display = 'block'
      }
      reader.readAsDataURL(file)
      fileInput.value = ''
    }
    const onRemoveImg = () => resetPreview()
    const onTextInput = () => autoResizeTextarea()
    const onTextKeydown = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        inputForm.requestSubmit()
      }
    }

    newChatBtn.addEventListener('click', onNewChat)
    loadModelBtn.addEventListener('click', onLoadModel)
    inputForm.addEventListener('submit', handleSubmit)
    modelSelect.addEventListener('change', onModelChange)
    attachBtn.addEventListener('click', onAttach)
    fileInput.addEventListener('change', onFileChange)
    removeImgBtn.addEventListener('click', onRemoveImg)
    textInput.addEventListener('input', onTextInput)
    textInput.addEventListener('keydown', onTextKeydown)

    cleanupFns.push(() => {
      newChatBtn.removeEventListener('click', onNewChat)
      loadModelBtn.removeEventListener('click', onLoadModel)
      inputForm.removeEventListener('submit', handleSubmit)
      modelSelect.removeEventListener('change', onModelChange)
      attachBtn.removeEventListener('click', onAttach)
      fileInput.removeEventListener('change', onFileChange)
      removeImgBtn.removeEventListener('click', onRemoveImg)
      textInput.removeEventListener('input', onTextInput)
      textInput.removeEventListener('keydown', onTextKeydown)
    })
  }

  async function init() {
    await initDB()
    bindEvents()
    autoResizeTextarea()
    updateModelNotice()
    await loadSidebar()
    createNewChat()
  }

  init().catch((error) => {
    console.error('初始化失败:', error)
    alert(`应用初始化失败: ${error.message}`)
  })
})

onBeforeUnmount(() => {
  cleanupFns.forEach((fn) => {
    try {
      fn()
    } catch (error) {
      console.error('cleanup failed:', error)
    }
  })
  cleanupFns.length = 0
})
</script>

<template>
  <div id="web-llm-app-shell">
    <aside id="sidebar">
      <div id="sidebar-header">
        <button id="new-chat-btn" type="button">+ 新建对话</button>
      </div>
      <div id="chat-list" />
    </aside>

    <main id="main">
      <header id="header">
        <div>
          <p class="eyebrow">Browser-side Multimodal Chat</p>
          <h1>Qwen WebGPU Chat</h1>
        </div>
        <div id="model-controls">
          <select id="model-select" aria-label="选择模型">
            <option value="onnx-community/Qwen3.5-0.8B-ONNX">
              Qwen3.5-0.8B-ONNX
            </option>
            <option value="onnx-community/Qwen3.5-2B-ONNX">
              Qwen3.5-2B-ONNX
            </option>
            <option value="onnx-community/Qwen3.5-4B-ONNX">
              Qwen3.5-4B-ONNX
            </option>
          </select>
          <button id="load-model-btn" type="button">加载模型</button>
        </div>
      </header>

      <section id="runtime-notice" aria-live="polite" />

      <section id="chat-container" aria-live="polite" />

      <section id="input-wrapper">
        <div id="preview-container">
          <img id="preview-img" src="" alt="图片预览">
          <button id="remove-img-btn" type="button" aria-label="移除图片">✕</button>
        </div>
        <form id="input-form">
          <input
            type="file"
            id="file-input"
            accept="image/*"
            :style="{ display: 'none' }"
          >
          <button
            type="button"
            class="icon-btn"
            id="attach-btn"
            title="上传图片"
            aria-label="上传图片"
          >
            📷
          </button>
          <textarea
            id="text-input"
            placeholder="输入消息 (Shift + Enter 换行)..."
            rows="1"
          />
          <button type="submit" id="send-btn" disabled>发送</button>
        </form>
      </section>

      <div id="loading-modal" aria-hidden="true">
        <div class="modal-box">
          <h2>加载模型中</h2>
          <div id="progress-text">正在初始化...</div>
          <progress id="progress-bar" value="0" max="100" />
          <p class="modal-tip">首次加载会自动下载模型文件，请耐心等待。</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
#web-llm-app-shell {
  --primary: #14532d;
  --primary-strong: #0f3f23;
  --accent: #f59e0b;
  --sidebar-bg: linear-gradient(180deg, #f4f7f1 0%, #eef3e7 100%);
  --page-bg: radial-gradient(circle at top, #fff7e8 0%, #f9faf5 38%, #f3f6ef 100%);
  --panel-bg: rgba(255, 255, 255, 0.82);
  --panel-border: rgba(15, 63, 35, 0.12);
  --text-main: #142013;
  --text-muted: #5d6858;
  --msg-user: linear-gradient(135deg, #14532d 0%, #1d6b3d 100%);
  --msg-ai: #f7f1e4;
  --shadow-soft: 0 24px 60px rgba(20, 32, 19, 0.08);

  display: flex;
  min-height: 100vh;
  font-family:
    "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Noto Sans SC",
    sans-serif;
  color: var(--text-main);
  background: var(--page-bg);
}

#web-llm-app-shell *,
#web-llm-app-shell *::before,
#web-llm-app-shell *::after {
  box-sizing: border-box;
}

#web-llm-app-shell button,
#web-llm-app-shell textarea,
#web-llm-app-shell select,
#web-llm-app-shell input {
  font: inherit;
  margin: 0;
}

#web-llm-app-shell h1,
#web-llm-app-shell h2,
#web-llm-app-shell p {
  margin: 0;
}

#web-llm-app-shell #sidebar {
  width: 280px;
  background: var(--sidebar-bg);
  border-right: 1px solid rgba(20, 83, 45, 0.12);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(14px);
}

#web-llm-app-shell #sidebar-header {
  padding: 18px;
  border-bottom: 1px solid rgba(20, 83, 45, 0.12);
}

#web-llm-app-shell #new-chat-btn {
  width: 100%;
  padding: 12px 14px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition:
    transform 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
  box-shadow: 0 10px 24px rgba(20, 83, 45, 0.22);
}

#web-llm-app-shell #new-chat-btn:hover {
  background: var(--primary-strong);
  transform: translateY(-1px);
}

#web-llm-app-shell #chat-list {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
}

#web-llm-app-shell .chat-item {
  padding: 12px 12px 12px 14px;
  margin-bottom: 8px;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid transparent;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    transform 180ms ease;
}

#web-llm-app-shell .chat-item:hover {
  background: rgba(255, 255, 255, 0.75);
  border-color: rgba(20, 83, 45, 0.1);
  transform: translateX(2px);
}

#web-llm-app-shell .chat-item.active {
  background: rgba(20, 83, 45, 0.1);
  border-color: rgba(20, 83, 45, 0.18);
  color: var(--primary-strong);
}

#web-llm-app-shell .chat-title {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

#web-llm-app-shell .delete-btn {
  color: #b42318;
  font-size: 12px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0 4px;
  display: none;
}

#web-llm-app-shell .chat-item:hover .delete-btn {
  display: block;
}

#web-llm-app-shell #main {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 18px;
}

#web-llm-app-shell #header {
  padding: 18px 22px;
  border: 1px solid var(--panel-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--panel-bg);
  backdrop-filter: blur(18px);
  border-radius: 22px;
  box-shadow: var(--shadow-soft);
}

#web-llm-app-shell .eyebrow {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 6px;
}

#web-llm-app-shell #header h1 {
  font-size: 26px;
  line-height: 1.1;
}

#web-llm-app-shell #model-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

#web-llm-app-shell select {
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid rgba(20, 83, 45, 0.12);
  min-width: 250px;
  background: rgba(255, 255, 255, 0.92);
}

#web-llm-app-shell #load-model-btn,
#web-llm-app-shell #send-btn {
  border: none;
  background: var(--primary);
  color: #fff;
  cursor: pointer;
  transition:
    background 180ms ease,
    transform 180ms ease;
}

#web-llm-app-shell #load-model-btn {
  padding: 11px 18px;
  border-radius: 12px;
  font-weight: 600;
}

#web-llm-app-shell #load-model-btn:hover,
#web-llm-app-shell #send-btn:hover {
  background: var(--primary-strong);
  transform: translateY(-1px);
}

#web-llm-app-shell #load-model-btn:disabled,
#web-llm-app-shell #send-btn:disabled {
  background: #93a19a;
  cursor: not-allowed;
  transform: none;
}

#web-llm-app-shell #chat-container {
  flex: 1;
  overflow-y: auto;
  margin: 18px 0;
  padding: 8px 6px 8px 2px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

#web-llm-app-shell #runtime-notice {
  margin-top: 16px;
  border-radius: 16px;
  padding: 12px 14px;
  font-size: 14px;
  line-height: 1.5;
  min-height: 21px;
}

#web-llm-app-shell .notice {
  border: 1px solid transparent;
}

#web-llm-app-shell .notice-info {
  background: rgba(20, 83, 45, 0.06);
  border-color: rgba(20, 83, 45, 0.1);
  color: #204529;
}

#web-llm-app-shell .notice-warn {
  background: rgba(245, 158, 11, 0.12);
  border-color: rgba(245, 158, 11, 0.18);
  color: #7a4a00;
}

#web-llm-app-shell .notice-error {
  background: rgba(180, 35, 24, 0.08);
  border-color: rgba(180, 35, 24, 0.14);
  color: #8f2419;
}

#web-llm-app-shell .notice-success {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.18);
  color: #166534;
}

#web-llm-app-shell .message {
  max-width: min(760px, 82%);
  padding: 14px 16px;
  border-radius: 18px;
  line-height: 1.6;
  font-size: 15px;
  word-wrap: break-word;
  box-shadow: 0 14px 30px rgba(20, 32, 19, 0.08);
  animation: web-llm-rise-in 220ms ease;
}

#web-llm-app-shell .message img {
  max-width: 320px;
  border-radius: 12px;
  margin-bottom: 10px;
  display: block;
}

#web-llm-app-shell .user-msg {
  background: var(--msg-user);
  color: #fff;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

#web-llm-app-shell .ai-msg {
  background: var(--msg-ai);
  color: var(--text-main);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

#web-llm-app-shell .msg-stats {
  font-size: 12px;
  color: #6b7280;
  margin-top: 8px;
  font-family:
    ui-monospace, SFMono-Regular, Consolas, "Courier New", monospace;
}

#web-llm-app-shell #input-wrapper {
  border: 1px solid var(--panel-border);
  background: var(--panel-bg);
  backdrop-filter: blur(18px);
  border-radius: 22px;
  padding: 16px;
  box-shadow: var(--shadow-soft);
}

#web-llm-app-shell #preview-container {
  display: none;
  margin-bottom: 12px;
  position: relative;
  width: max-content;
}

#web-llm-app-shell #preview-img {
  max-height: 110px;
  border-radius: 12px;
  border: 1px solid rgba(20, 83, 45, 0.12);
}

#web-llm-app-shell #remove-img-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #b42318;
  color: #fff;
  border: none;
  border-radius: 999px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

#web-llm-app-shell #input-form {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

#web-llm-app-shell #text-input {
  flex: 1;
  padding: 12px 14px;
  border: 1px solid rgba(20, 83, 45, 0.12);
  border-radius: 16px;
  resize: none;
  min-height: 48px;
  max-height: 180px;
  background: rgba(255, 255, 255, 0.94);
}

#web-llm-app-shell #text-input:focus,
#web-llm-app-shell select:focus {
  outline: 2px solid rgba(245, 158, 11, 0.35);
  border-color: rgba(245, 158, 11, 0.4);
}

#web-llm-app-shell .icon-btn {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(20, 83, 45, 0.12);
  border-radius: 14px;
  padding: 12px;
  cursor: pointer;
  color: #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;
}

#web-llm-app-shell .icon-btn:hover {
  background: #fff;
}

#web-llm-app-shell #send-btn {
  padding: 0 20px;
  height: 48px;
  border-radius: 14px;
  font-weight: 600;
}

#web-llm-app-shell #loading-modal {
  position: absolute;
  inset: 0;
  background: rgba(248, 249, 243, 0.85);
  z-index: 100;
  display: none;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

#web-llm-app-shell .modal-box {
  background: #fffef9;
  padding: 28px;
  border-radius: 24px;
  box-shadow: var(--shadow-soft);
  width: min(440px, 100%);
  text-align: center;
  border: 1px solid rgba(20, 83, 45, 0.08);
}

#web-llm-app-shell .modal-box h2 {
  margin-bottom: 14px;
}

#web-llm-app-shell #progress-text {
  margin-bottom: 15px;
  font-weight: 500;
  color: #374151;
}

#web-llm-app-shell progress {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  appearance: none;
}

#web-llm-app-shell progress::-webkit-progress-bar {
  background-color: #ece7dc;
  border-radius: 999px;
}

#web-llm-app-shell progress::-webkit-progress-value {
  background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
  border-radius: 999px;
}

#web-llm-app-shell .modal-tip {
  margin-top: 15px;
  font-size: 12px;
  color: #6b7280;
}

@keyframes web-llm-rise-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 960px) {
  #web-llm-app-shell {
    flex-direction: column;
  }

  #web-llm-app-shell #sidebar {
    width: 100%;
    max-height: 220px;
  }

  #web-llm-app-shell #main {
    padding: 12px;
  }

  #web-llm-app-shell #header {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  #web-llm-app-shell #model-controls {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  #web-llm-app-shell select {
    min-width: 0;
    width: 100%;
  }

  #web-llm-app-shell .message {
    max-width: 92%;
  }
}

@media (max-width: 640px) {
  #web-llm-app-shell #input-form {
    flex-wrap: wrap;
  }

  #web-llm-app-shell .icon-btn {
    width: 48px;
    height: 48px;
  }

  #web-llm-app-shell #send-btn {
    width: 100%;
  }
}
</style>
