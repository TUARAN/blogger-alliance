import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * 读取并校验 data/ledger/reports/*.json（推广报告权威源）。
 * 被 ledger:validate 与 ledger:sync 共用。
 */

export const REPORTS_DIR = path.resolve(process.cwd(), 'data/ledger/reports')

const REQUIRED_FIELDS = ['id', 'title', 'project', 'author', 'content']
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export async function loadReportFiles() {
  let entries
  try {
    entries = await fs.readdir(REPORTS_DIR)
  } catch (error) {
    if (error?.code === 'ENOENT') return []
    throw error
  }

  const files = entries.filter((name) => name.endsWith('.json')).sort()
  return Promise.all(files.map(async (name) => ({
    name,
    filePath: path.join(REPORTS_DIR, name),
    raw: await fs.readFile(path.join(REPORTS_DIR, name), 'utf8')
  })))
}

function isBlank(value) {
  return !String(value ?? '').trim()
}

function isIsoDateTime(value) {
  const text = String(value ?? '').trim()
  if (!text) return false
  const timestamp = Date.parse(text)
  return Number.isFinite(timestamp)
}

export function validateReportFiles(files, { dealIds = null } = {}) {
  const records = []
  const errors = []
  const warnings = []
  const seenIds = new Map()
  const knownDealIds = dealIds instanceof Set ? dealIds : new Set(dealIds || [])
  const dealIdsByLower = new Map()
  for (const id of knownDealIds) {
    dealIdsByLower.set(String(id).toLowerCase(), id)
  }

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
      if (field === 'content') {
        if (typeof record.content !== 'string' || record.content.length === 0) {
          errors.push(`${name}: MISSING_FIELD「content」`)
        }
        continue
      }
      if (isBlank(record[field])) {
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

    if (record.platforms !== undefined && (
      !Array.isArray(record.platforms)
      || record.platforms.some((item) => typeof item !== 'string' || !item.trim())
    )) {
      errors.push(`${name}: platforms 必须是非空字符串数组`)
    }

    if (record.stats !== undefined && (typeof record.stats !== 'object' || record.stats == null || Array.isArray(record.stats))) {
      errors.push(`${name}: stats 必须是对象`)
    }

    if (record.platformStats !== undefined && (typeof record.platformStats !== 'object' || record.platformStats == null || Array.isArray(record.platformStats))) {
      errors.push(`${name}: platformStats 必须是对象`)
    }

    if (record.authorSections !== undefined && !Array.isArray(record.authorSections)) {
      errors.push(`${name}: authorSections 必须是数组`)
    }

    if (record.authorSplitNote !== undefined && typeof record.authorSplitNote !== 'boolean' && typeof record.authorSplitNote !== 'string') {
      errors.push(`${name}: authorSplitNote 必须是布尔值或字符串`)
    }

    const publishedAt = String(record.publishedAt ?? '').trim()
    if (publishedAt && !isIsoDateTime(publishedAt)) {
      errors.push(`${name}: publishedAt「${publishedAt}」不是合法日期时间`)
    }

    const cooperationId = String(record.cooperationId ?? '').trim()
    if (!cooperationId) {
      warnings.push(`${name}: 未填写 cooperationId，报告尚未挂到合作台账`)
    } else if (knownDealIds.size > 0) {
      if (knownDealIds.has(cooperationId)) {
        // exact match
      } else if (dealIdsByLower.has(cooperationId.toLowerCase())) {
        errors.push(`${name}: COOPERATION_ID_CASE「${cooperationId}」应与合作编码「${dealIdsByLower.get(cooperationId.toLowerCase())}」完全一致`)
      } else {
        errors.push(`${name}: COOPERATION_ID_UNKNOWN「${cooperationId}」在 data/ledger/deals 中不存在`)
      }
    }

    const platforms = Array.isArray(record.platforms) ? record.platforms : []
    const platformStats = record.platformStats && typeof record.platformStats === 'object' && !Array.isArray(record.platformStats)
      ? record.platformStats
      : null
    if (platforms.length > 0 && platformStats) {
      const missing = platforms.filter((platform) => !Object.prototype.hasOwnProperty.call(platformStats, platform))
      if (missing.length > 0) {
        warnings.push(`${name}: platformStats 缺少平台 ${missing.join('、')}`)
      }
    } else if (platforms.length > 0 && record.platformStats === undefined) {
      warnings.push(`${name}: 已列出 platforms，但缺少 platformStats`)
    }

    if (isBlank(record.articleTitle)) {
      warnings.push(`${name}: 未填写 articleTitle`)
    }

    records.push(record)
  }

  return { records, errors, warnings }
}

export function sortReportsForSync(records) {
  return [...records].sort((a, b) => {
    const timeA = Date.parse(a.publishedAt || '')
    const timeB = Date.parse(b.publishedAt || '')
    const safeA = Number.isFinite(timeA) ? timeA : 0
    const safeB = Number.isFinite(timeB) ? timeB : 0
    if (safeA !== safeB) return safeA - safeB
    return String(a.id || '').localeCompare(String(b.id || ''))
  })
}

export async function loadAndValidateReports(options = {}) {
  const files = await loadReportFiles()
  return { files, ...validateReportFiles(files, options) }
}
