import fs from 'node:fs/promises'
import path from 'node:path'
import { isValidEnvelope } from './settlementEnvelope.mjs'

/**
 * 读取并校验 data/ledger/deals/*.json（合作台账权威源）。
 * 被 ledger:validate 与 ledger:sync 共用。
 */

export const DEALS_DIR = path.resolve(process.cwd(), 'data/ledger/deals')

const REQUIRED_FIELDS = ['id', 'brand', 'service', 'progress']
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const PROGRESS_HINTS = [
  '沟通', '需求', '报价', '待确认', '确认中',
  '执行', '待执行', '已发布', '待出数据', '持续计费', '投放中',
  '待结算', '待付款', '待支付', '开票', '结算中',
  '已完成', '已闭环', '已结算', '已收款',
  '暂不推进', '暂停', '取消', '作废', '无效', '测试'
]

export async function loadDealFiles() {
  let entries
  try {
    entries = await fs.readdir(DEALS_DIR)
  } catch (error) {
    if (error?.code === 'ENOENT') return []
    throw error
  }

  const files = entries.filter((name) => name.endsWith('.json')).sort()
  const loaded = []
  for (const name of files) {
    const filePath = path.join(DEALS_DIR, name)
    const raw = await fs.readFile(filePath, 'utf8')
    loaded.push({ name, filePath, raw })
  }
  return loaded
}

/**
 * @returns {{ records: object[], errors: string[], warnings: string[] }}
 */
export function validateDealFiles(files) {
  const records = []
  const errors = []
  const warnings = []
  const seenIds = new Map()

  for (const { name, raw } of files) {
    const expectedId = name.replace(/\.json$/, '')

    let record
    try {
      record = JSON.parse(raw)
    } catch {
      errors.push(`${name}: JSON 解析失败`)
      continue
    }

    if (!record || typeof record !== 'object' || Array.isArray(record)) {
      errors.push(`${name}: 顶层必须是对象`)
      continue
    }

    for (const field of REQUIRED_FIELDS) {
      if (!String(record[field] ?? '').trim()) {
        errors.push(`${name}: MISSING_FIELD「${field}」`)
      }
    }

    const id = String(record.id ?? '').trim()
    if (id && id !== expectedId) {
      errors.push(`${name}: ID_MISMATCH（文件名=${expectedId}，id=${id}）`)
    }
    if (id && !ID_PATTERN.test(id)) {
      errors.push(`${name}: BAD_ID 格式（应为小写字母数字与连字符）`)
    }
    if (id) {
      if (seenIds.has(id)) {
        errors.push(`${name}: DUPLICATE_ID「${id}」与 ${seenIds.get(id)} 重复`)
      } else {
        seenIds.set(id, name)
      }
    }

    if (record.muted !== undefined && typeof record.muted !== 'boolean') {
      errors.push(`${name}: muted 必须是布尔值`)
    }

    // 结算字段：只能是 null 或合法密文信封。任何明文都会在这里被挡下。
    const settlement = record.settlement
    if (settlement !== undefined && settlement !== null && !isValidEnvelope(settlement)) {
      errors.push(`${name}: BAD_SETTLEMENT（settlement 必须是 null 或 ledger:encrypt 产出的密文信封；疑似写入了明文金额）`)
    }

    const progress = String(record.progress ?? '').trim()
    if (progress && !PROGRESS_HINTS.some((kw) => progress.includes(kw))) {
      warnings.push(`${name}: progress「${progress}」未命中任何状态关键词，台账归类可能不准`)
    }

    records.push(record)
  }

  return { records, errors, warnings }
}

export async function loadAndValidateDeals() {
  const files = await loadDealFiles()
  return { files, ...validateDealFiles(files) }
}
