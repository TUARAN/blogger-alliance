import {
  AutoProcessor,
  Qwen3_5ForConditionalGeneration,
  RawImage,
  TextStreamer,
  env
} from '@huggingface/transformers'
import { IMAGE_MAX_EDGE, MAX_NEW_TOKENS, MODEL_OPTIONS } from './constants'
import siteContext from '../../data/webLlmSiteContext.md?raw'

env.allowLocalModels = false

class DomTextStreamer extends TextStreamer {
  constructor(tokenizer, { onUpdate, onComplete, onToken }) {
    const state = {
      text: '',
      generatedTokens: 0,
      decodeStartAt: 0,
      firstTokenAt: 0
    }

    super(tokenizer, {
      skip_prompt: true,
      skip_special_tokens: true,
      callback_function: (chunk) => {
        state.text += chunk
        onUpdate({
          text: state.text,
          tps: calculateTps(state.generatedTokens, state.decodeStartAt)
        })
      },
      token_callback_function: (tokens) => {
        if (!state.decodeStartAt && tokens.length > 0) {
          state.decodeStartAt = performance.now()
        }

        if (!state.firstTokenAt && tokens.length > 0) {
          state.firstTokenAt = performance.now()
        }

        state.generatedTokens += tokens.length
        onToken?.({
          generatedTokens: state.generatedTokens,
          firstTokenAt: state.firstTokenAt
        })
      }
    })

    this.state = state
    this.onComplete = onComplete
  }

  end() {
    super.end()

    this.onComplete?.({
      text: this.state.text,
      tps: calculateTps(this.state.generatedTokens, this.state.decodeStartAt),
      generatedTokens: this.state.generatedTokens,
      firstTokenAt: this.state.firstTokenAt
    })
  }
}

function calculateTps(tokenCount, decodeStartAt) {
  if (!decodeStartAt || tokenCount <= 0) {
    return null
  }

  const elapsed = (performance.now() - decodeStartAt) / 1000

  if (elapsed <= 0) {
    return null
  }

  return Number((tokenCount / elapsed).toFixed(2))
}

function createProgressAggregator(onProgress) {
  const files = new Map()

  return (event) => {
    if (!event?.file) {
      return
    }

    const key = `${event.name}:${event.file}`
    const prev = files.get(key) ?? { loaded: 0, total: 0, progress: 0 }

    files.set(key, {
      loaded: event.loaded ?? prev.loaded,
      total: event.total ?? prev.total,
      progress: event.progress ?? prev.progress
    })

    const entries = Array.from(files.values())
    const knownTotals = entries.filter((entry) => entry.total > 0)
    const totalLoaded = knownTotals.reduce((sum, entry) => sum + Math.min(entry.loaded, entry.total), 0)
    const totalBytes = knownTotals.reduce((sum, entry) => sum + entry.total, 0)

    const percent = totalBytes > 0
      ? Math.round((totalLoaded / totalBytes) * 100)
      : Math.round(entries.reduce((sum, entry) => sum + entry.progress, 0) / Math.max(entries.length, 1))

    onProgress({
      percent: Math.min(100, Math.max(0, percent)),
      activeFiles: entries.length
    })
  }
}

export function getEnvironmentDiagnostics() {
  const hasWindow = typeof window !== 'undefined'
  const hasNavigator = typeof navigator !== 'undefined'

  const webgpuSupported = Boolean(hasNavigator && navigator.gpu)
  const secureContext = Boolean(hasWindow && window.isSecureContext)
  const crossOriginIsolated = Boolean(hasWindow && window.crossOriginIsolated)

  const issues = []

  if (!webgpuSupported) {
    issues.push('当前浏览器未暴露 navigator.gpu，无法使用 WebGPU 推理。')
  }

  if (!secureContext) {
    issues.push('当前页面不是安全上下文，请使用 localhost 或 HTTPS 访问。')
  }

  if (!crossOriginIsolated) {
    issues.push('当前页面未启用 cross-origin isolation，请确认 COEP/COOP 响应头已生效。')
  }

  return {
    webgpuSupported,
    secureContext,
    crossOriginIsolated,
    issues,
    ready: webgpuSupported && secureContext && crossOriginIsolated
  }
}

function getModelConfig(modelId) {
  return MODEL_OPTIONS.find((item) => item.id === modelId) ?? MODEL_OPTIONS[0]
}

function buildConversation(messages) {
  const systemPrompt = [
    '你是“开发者博主联盟”网站里的本地大模型问答助手。',
    '你的主要职责是结合站点固定上下文，回答用户关于本站定位、模块、能力和使用方式的问题。',
    '如果用户问题与站点内容相关，优先依据给定上下文回答。',
    '如果上下文没有提供答案，必须明确说明当前站点上下文没有提供这部分信息，不要编造。',
    '以下是站点固定上下文：',
    siteContext
  ].join('\n\n')

  return [
    {
      role: 'system',
      content: systemPrompt
    },
    ...messages.map((message) => {
    if (message.role === 'user' && message.image) {
      return {
        role: 'user',
        content: [
          { type: 'image' },
          { type: 'text', text: message.text || '请结合图片内容回答。' }
        ]
      }
    }

    return {
      role: message.role,
      content: message.text || ''
    }
    })
  ]
}

async function dataUrlToRawImage(dataUrl) {
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  const image = await RawImage.read(blob)
  const longestEdge = Math.max(image.width, image.height)

  if (longestEdge <= IMAGE_MAX_EDGE) {
    return image
  }

  if (image.width >= image.height) {
    return image.resize(IMAGE_MAX_EDGE, -1)
  }

  return image.resize(-1, IMAGE_MAX_EDGE)
}

export async function loadModelRuntime(modelId, onProgress) {
  const diagnostics = getEnvironmentDiagnostics()

  if (!diagnostics.ready) {
    throw new Error(diagnostics.issues.join(' '))
  }

  const modelConfig = getModelConfig(modelId)
  const progress = createProgressAggregator(onProgress)

  const [processor, model] = await Promise.all([
    AutoProcessor.from_pretrained(modelId, {
      progress_callback: progress
    }),
    Qwen3_5ForConditionalGeneration.from_pretrained(modelId, {
      device: 'webgpu',
      dtype: modelConfig.dtype,
      progress_callback: progress
    })
  ])

  return {
    modelId,
    processor,
    model
  }
}

export async function generateReply({
  runtime,
  messages,
  onStream,
  onStatus,
  maxNewTokens = MAX_NEW_TOKENS
}) {
  const startedAt = performance.now()
  onStatus?.({
    stage: 'preparing',
    elapsedMs: 0,
    generatedTokens: 0,
    tps: null
  })

  const conversation = buildConversation(messages)
  onStatus?.({
    stage: 'building_prompt',
    elapsedMs: Math.round(performance.now() - startedAt),
    generatedTokens: 0,
    tps: null
  })

  const images = await Promise.all(
    messages
      .filter((message) => message.role === 'user' && message.image)
      .map((message) => dataUrlToRawImage(message.image))
  )

  const prompt = runtime.processor.apply_chat_template(conversation, {
    add_generation_prompt: true
  })

  onStatus?.({
    stage: 'encoding',
    elapsedMs: Math.round(performance.now() - startedAt),
    generatedTokens: 0,
    tps: null
  })

  const inputs = images.length > 0
    ? await runtime.processor(prompt, images)
    : runtime.processor.tokenizer(prompt, {
        add_special_tokens: false,
        return_tensor: true
      })

  const generationStartedAt = performance.now()
  onStatus?.({
    stage: 'generating',
    elapsedMs: Math.round(generationStartedAt - startedAt),
    generatedTokens: 0,
    tps: null
  })

  return runtime.model.generate({
    ...inputs,
    max_new_tokens: maxNewTokens,
    do_sample: false,
    streamer: new DomTextStreamer(runtime.processor.tokenizer, {
      onUpdate: ({ text, tps }) => {
        onStream?.({
          text,
          tps
        })
      },
      onToken: ({ generatedTokens, firstTokenAt }) => {
        onStatus?.({
          stage: 'generating',
          elapsedMs: Math.round((firstTokenAt || performance.now()) - startedAt),
          generatedTokens,
          tps: calculateTps(generatedTokens, firstTokenAt)
        })
      },
      onComplete: ({ text, tps, generatedTokens, firstTokenAt }) => {
        onStream?.({
          text,
          tps
        })
        onStatus?.({
          stage: 'complete',
          elapsedMs: Math.round(performance.now() - startedAt),
          generatedTokens,
          tps: tps ?? calculateTps(generatedTokens, firstTokenAt)
        })
      }
    })
  })
}
