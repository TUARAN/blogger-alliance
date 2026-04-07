import {
  AutoProcessor,
  InterruptableStoppingCriteria,
  Qwen3_5ForConditionalGeneration,
  RawImage,
  TextStreamer,
  env
} from '@huggingface/transformers'
import { IMAGE_MAX_EDGE, MAX_NEW_TOKENS, MODEL_OPTIONS } from './constants'
import siteContext from '../../data/webLlmSiteContext.md?raw'

env.allowLocalModels = false

const KNOWLEDGE_ENTRIES = parseKnowledgeEntries(siteContext)
const DEFAULT_ENTRY_NAMES = ['站点总览', '工作台总入口', '回答规则']
const DEFAULT_FAQ_NAMES = ['博主联盟是干嘛的？', '联盟工作台里有什么？']

class DomTextStreamer extends TextStreamer {
  constructor(tokenizer, { onUpdate, onComplete, onToken }) {
    super(tokenizer, {
      skip_prompt: true,
      skip_special_tokens: true
    })

    const state = {
      text: '',
      generatedTokens: 0,
      decodeStartAt: 0,
      firstTokenAt: 0,
      firstPutDone: false
    }

    this.state = state
    this.onUpdate = onUpdate
    this.onComplete = onComplete
    this.onToken = onToken
  }

  put(value) {
    if (!this.state.firstPutDone) {
      this.state.firstPutDone = true
      this.state.decodeStartAt = performance.now()
      this.state.firstTokenAt = this.state.decodeStartAt
    }

    const tokenCount = value?.size ?? value?.length ?? 1
    if (tokenCount > 0) {
      this.state.generatedTokens += tokenCount
    }

    this.onToken?.({
      generatedTokens: this.state.generatedTokens,
      firstTokenAt: this.state.firstTokenAt
    })

    super.put(value)
  }

  on_finalized_text(text) {
    this.state.text += text
    this.onUpdate?.({
      text: this.state.text,
      tps: calculateTps(this.state.generatedTokens, this.state.decodeStartAt)
    })
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

async function yieldToBrowser(frames = 1) {
  if (typeof window === 'undefined') {
    return
  }

  for (let index = 0; index < frames; index += 1) {
    await new Promise((resolve) => window.requestAnimationFrame(() => resolve()))
  }

  await new Promise((resolve) => window.setTimeout(resolve, 0))
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

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[？?！!，,。、“”"'（）()\[\]{}:：/\\\-_*]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseKnowledgeEntries(content) {
  return content
    .split(/^## 条目：/m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const lines = chunk.split('\n')
      const name = lines.shift()?.trim() || ''
      const body = lines.join('\n').trim()
      const type = body.match(/^- 类型：(.+)$/m)?.[1]?.trim() || ''
      const tagsLine = body.match(/^- 相关标签：(.+)$/m)?.[1]?.trim() || ''
      const tags = tagsLine ? tagsLine.split('、').map((item) => item.trim()).filter(Boolean) : []
      const searchable = normalizeText([name, type, tags.join(' '), body].join(' '))

      return {
        name,
        type,
        body,
        tags,
        searchable
      }
    })
}

function collectQueryTerms(messages) {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user')
  const normalized = normalizeText(latestUserMessage?.text || '')
  const terms = normalized
    .split(' ')
    .filter((term) => term.length >= 2)

  const phraseTerms = [
    '博主联盟', '工作台', '大模型问答', '服务介绍', '合作进度查询', '矩阵看板', '联盟学院', '25年报告',
    '推文服务', '引流服务', '社群服务', 'ai access', 'ai', '大模型', '前端', '后端', '云原生',
    '全栈', '博主', '品牌', '合作', '资源', '工具', 'faq'
  ].filter((term) => normalized.includes(normalizeText(term)))

  return Array.from(new Set([...terms, ...phraseTerms]))
}

function scoreEntry(entry, terms) {
  let score = 0

  for (const term of terms) {
    if (entry.searchable.includes(term)) {
      score += 3
    }

    if (normalizeText(entry.name).includes(term)) {
      score += 6
    }

    if (entry.tags.some((tag) => normalizeText(tag).includes(term))) {
      score += 4
    }

    if (normalizeText(entry.type).includes(term)) {
      score += 2
    }
  }

  return score
}

function selectKnowledgeEntries(messages) {
  const terms = collectQueryTerms(messages)
  const alwaysIncluded = KNOWLEDGE_ENTRIES.filter((entry) => DEFAULT_ENTRY_NAMES.includes(entry.name))
  const faqEntries = KNOWLEDGE_ENTRIES
    .filter((entry) => entry.type === 'FAQ')
    .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
    .sort((a, b) => b.score - a.score)
    .filter(({ score, entry }) => score > 0 || DEFAULT_FAQ_NAMES.includes(entry.name))
    .slice(0, 3)
    .map(({ entry }) => entry)

  const matchedEntries = KNOWLEDGE_ENTRIES
    .filter((entry) => !DEFAULT_ENTRY_NAMES.includes(entry.name) && entry.type !== 'FAQ')
    .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
    .sort((a, b) => b.score - a.score)
    .filter(({ score }) => score > 0)
    .slice(0, 4)
    .map(({ entry }) => entry)

  const fallbackEntries = KNOWLEDGE_ENTRIES.filter((entry) =>
    ['服务介绍', '矩阵看板', '大模型问答', '博主名录总表'].includes(entry.name)
  ).slice(0, 4)

  const selected = [...alwaysIncluded, ...faqEntries, ...(matchedEntries.length > 0 ? matchedEntries : fallbackEntries)]
  const deduped = []
  const seen = new Set()

  for (const entry of selected) {
    if (!entry || seen.has(entry.name)) continue
    seen.add(entry.name)
    deduped.push(entry)
  }

  return {
    terms,
    entries: deduped
  }
}

function buildScopedContext(messages) {
  const { terms, entries } = selectKnowledgeEntries(messages)
  const summary = entries.map((entry) => `## 条目：${entry.name}\n${entry.body}`).join('\n\n')

  return {
    terms,
    context: [
      '这是一次经过裁剪后的站点知识上下文，只包含摘要、相关 FAQ 和命中条目。',
      terms.length > 0 ? `当前命中关键词：${terms.join('、')}` : '当前未命中特定关键词，使用默认站点摘要。',
      summary
    ].join('\n\n')
  }
}

function extractField(body, field) {
  return body.match(new RegExp(`^- ${field}：(.+)$`, 'm'))?.[1]?.trim() || ''
}

function summarizeEntry(entry) {
  const type = extractField(entry.body, '类型')
  const positioning = extractField(entry.body, '定位')
  const audience = extractField(entry.body, '适合对象')
  const points = extractField(entry.body, '核心要点')
  const extra = extractField(entry.body, '补充信息')

  return [
    type ? `类型：${type}` : '',
    positioning,
    points,
    audience ? `适合：${audience}` : '',
    extra
  ].filter(Boolean).join(' ')
}

function buildConversation(messages) {
  const scopedContext = buildScopedContext(messages)
  const systemPrompt = [
    '你是“开发者博主联盟”网站里的本地大模型问答助手。',
    '你的主要职责是结合站点固定上下文，回答用户关于本站定位、模块、能力和使用方式的问题。',
    '如果用户问题与站点内容相关，优先依据给定上下文回答。',
    '如果上下文没有提供答案，必须明确说明当前站点上下文没有提供这部分信息，不要编造。',
    '以下是本次问答命中的站点上下文：',
    scopedContext.context
  ].join('\n\n')

  return {
    contextInfo: {
      selectedTerms: scopedContext.terms,
      entryCount: scopedContext.context ? scopedContext.context.split('## 条目：').length - 1 : 0
    },
    messages: [
      {
        role: 'system',
        content: [{ type: 'text', text: systemPrompt }]
      },
      ...messages.map((message) => {
        if (message.role === 'user') {
          const content = []

          if (message.image) {
            content.push({ type: 'image' })
          }

          content.push({ type: 'text', text: message.text || '请结合上下文回答。' })

          return {
            role: 'user',
            content
          }
        }

        return {
          role: 'assistant',
          content: [{ type: 'text', text: message.text || '' }]
        }
      })
    ]
  }
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

export function createGenerationController() {
  const stoppingCriteria = new InterruptableStoppingCriteria()

  return {
    stoppingCriteria,
    stop() {
      stoppingCriteria.interrupt()
    },
    reset() {
      stoppingCriteria.reset()
    }
  }
}

export function buildKnowledgeFallbackReply(messages, { reason = '', includeImageNotice = false } = {}) {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user')
  const { terms, entries } = selectKnowledgeEntries(messages)
  const primaryEntries = entries.slice(0, 3)
  const extraEntries = entries.slice(3, 6)

  const intro = reason
    ? `本地模型暂时未能正常返回，我先基于站点知识库直接回答。原因：${reason}`
    : '当前先基于站点知识库直接回答。'

  const questionLine = latestUserMessage?.text
    ? `你的问题是：${latestUserMessage.text}`
    : ''

  const body = primaryEntries.length > 0
    ? primaryEntries.map((entry, index) => `${index + 1}. ${entry.name}：${summarizeEntry(entry)}`).join('\n')
    : '当前知识库里没有命中足够明确的条目，我只能给出较泛化的站点概览。'

  const extraLine = extraEntries.length > 0
    ? `如果你要继续追问，我还可以继续展开这些相关条目：${extraEntries.map((entry) => entry.name).join('、')}。`
    : '如果你继续追问更具体的模块、博主或合作场景，我会继续按知识库条目展开。'

  const imageLine = includeImageNotice
    ? '这次回答没有解析你上传的图片内容，只基于站点知识库文本条目生成。'
    : ''

  return {
    text: [intro, questionLine, body, extraLine, imageLine].filter(Boolean).join('\n\n'),
    selectedTerms: terms,
    entryCount: entries.length
  }
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
      dtype: typeof modelConfig.dtype === 'object'
        ? modelConfig.dtype
        : {
            embed_tokens: 'q4',
            vision_encoder: 'fp16',
            decoder_model_merged: 'q4'
          },
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
  generationController,
  maxNewTokens = MAX_NEW_TOKENS
}) {
  const startedAt = performance.now()
  onStatus?.({
    stage: 'preparing',
    elapsedMs: 0,
    generatedTokens: 0,
    tps: null,
    promptProcessingMs: 0,
    firstTokenMs: null,
    totalGenerationMs: 0,
    selectedTerms: [],
    entryCount: 0
  })
  await yieldToBrowser(2)

  onStatus?.({
    stage: 'building_prompt',
    elapsedMs: Math.round(performance.now() - startedAt),
    generatedTokens: 0,
    tps: null,
    promptProcessingMs: Math.round(performance.now() - startedAt),
    firstTokenMs: null,
    totalGenerationMs: 0,
    selectedTerms: [],
    entryCount: 0
  })
  await yieldToBrowser(2)

  const { messages: conversation, contextInfo } = buildConversation(messages)

  onStatus?.({
    stage: 'encoding',
    elapsedMs: Math.round(performance.now() - startedAt),
    generatedTokens: 0,
    tps: null,
    promptProcessingMs: Math.round(performance.now() - startedAt),
    firstTokenMs: null,
    totalGenerationMs: 0,
    selectedTerms: contextInfo.selectedTerms,
    entryCount: contextInfo.entryCount
  })
  await yieldToBrowser(2)

  const prompt = runtime.processor.apply_chat_template(conversation, {
    add_generation_prompt: true
  })
  await yieldToBrowser(1)

  const rawImages = []
  for (const message of messages) {
    if (message.role === 'user' && message.image) {
      rawImages.push(await dataUrlToRawImage(message.image))
    }
  }

  const inputs = rawImages.length > 0
    ? await runtime.processor(prompt, rawImages.length === 1 ? rawImages[0] : rawImages)
    : await runtime.processor(prompt)
  await yieldToBrowser(1)

  const generationStartedAt = performance.now()
  generationController?.reset?.()
  onStatus?.({
    stage: 'generating',
    elapsedMs: Math.round(generationStartedAt - startedAt),
    generatedTokens: 0,
    tps: null,
    promptProcessingMs: Math.round(generationStartedAt - startedAt),
    firstTokenMs: null,
    totalGenerationMs: 0,
    selectedTerms: contextInfo.selectedTerms,
    entryCount: contextInfo.entryCount
  })
  await yieldToBrowser(2)

  return runtime.model.generate({
    ...inputs,
    max_new_tokens: maxNewTokens,
    stopping_criteria: generationController?.stoppingCriteria ?? null,
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
          elapsedMs: Math.round(performance.now() - startedAt),
          generatedTokens,
          tps: calculateTps(generatedTokens, firstTokenAt),
          promptProcessingMs: Math.round(generationStartedAt - startedAt),
          firstTokenMs: firstTokenAt ? Math.round(firstTokenAt - generationStartedAt) : null,
          totalGenerationMs: Math.round(performance.now() - generationStartedAt),
          selectedTerms: contextInfo.selectedTerms,
          entryCount: contextInfo.entryCount
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
          tps: tps ?? calculateTps(generatedTokens, firstTokenAt),
          promptProcessingMs: Math.round(generationStartedAt - startedAt),
          firstTokenMs: firstTokenAt ? Math.round(firstTokenAt - generationStartedAt) : null,
          totalGenerationMs: Math.round(performance.now() - generationStartedAt),
          selectedTerms: contextInfo.selectedTerms,
          entryCount: contextInfo.entryCount
        })
      }
    })
  })
}
