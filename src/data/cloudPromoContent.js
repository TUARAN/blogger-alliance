import topicsQueue from '../../content/aliyun/topics.queue.json'
import {
  CLOUD_PROMO_TEMPLATE_META,
  buildTopicVariables,
  fillCloudPromoTemplate
} from './cloudPromoKit.js'

const templateModules = import.meta.glob('../../content/aliyun/templates/*.md.hbs', {
  eager: true,
  query: '?raw',
  import: 'default'
})

const promptModules = import.meta.glob('../../content/aliyun/prompts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

const assetModules = import.meta.glob('../../content/aliyun/assets/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

function fileBaseName(path) {
  const name = path.split('/').pop() || path
  return name.replace(/\.(md\.hbs|md)$/, '').replace(/\.hbs$/, '')
}

function templateIdFromPath(path) {
  const base = fileBaseName(path)
  return base
}

export const cloudPromoTopics = topicsQueue.topics

export const cloudPromoTemplates = Object.entries(templateModules)
  .map(([path, body]) => {
    const id = templateIdFromPath(path)
    const meta = CLOUD_PROMO_TEMPLATE_META[id] || { label: id, desc: '' }
    return {
      id,
      path: path.replace(/^\.\.\/\.\.\//, ''),
      label: meta.label,
      desc: meta.desc,
      body
    }
  })
  .sort((a, b) => a.label.localeCompare(b.label, 'zh-CN'))

export const cloudPromoPrompts = Object.entries(promptModules).map(([path, body]) => ({
  id: fileBaseName(path),
  path: path.replace(/^\.\.\/\.\.\//, ''),
  body
}))

export const cloudPromoAssets = Object.entries(assetModules).map(([path, body]) => ({
  id: fileBaseName(path),
  path: path.replace(/^\.\.\/\.\.\//, ''),
  body
}))

export function getTemplateById(id) {
  return cloudPromoTemplates.find((item) => item.id === id) || null
}

export function renderTopicDraft(topic, { utmSource = 'juejin' } = {}) {
  const template = getTemplateById(topic.template)
  if (!template) {
    return ''
  }

  const variables = buildTopicVariables(topic, utmSource)
  return fillCloudPromoTemplate(template.body, variables)
}

export function renderPrompt(promptId, topic, { utmSource = 'juejin' } = {}) {
  const prompt = cloudPromoPrompts.find((item) => item.id === promptId)
  const template = getTemplateById(topic.template)
  if (!prompt || !template) {
    return ''
  }

  const variables = {
    ...buildTopicVariables(topic, utmSource),
    template_body: template.body
  }

  return fillCloudPromoTemplate(prompt.body, variables)
}
