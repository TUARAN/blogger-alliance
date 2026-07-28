import fs from 'node:fs/promises'
import path from 'node:path'
import { isValidEnvelope } from './settlementEnvelope.mjs'

export const OPS_SUMMARIES_DIR = path.resolve(process.cwd(), 'data/ledger/ops-summaries')

const REQUIRED_FIELDS = ['id', 'title', 'period', 'status', 'updatedAt']
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export async function loadOpsSummaryFiles() {
  let entries
  try {
    entries = await fs.readdir(OPS_SUMMARIES_DIR)
  } catch (error) {
    if (error?.code === 'ENOENT') return []
    throw error
  }

  const files = entries.filter((name) => name.endsWith('.json')).sort()
  return Promise.all(files.map(async (name) => ({
    name,
    filePath: path.join(OPS_SUMMARIES_DIR, name),
    raw: await fs.readFile(path.join(OPS_SUMMARIES_DIR, name), 'utf8')
  })))
}

export function validateOpsSummaryFiles(files) {
  const records = []
  const errors = []
  const seenIds = new Set()

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
      if (!String(record[field] ?? '').trim()) errors.push(`${name}: MISSING_FIELD「${field}」`)
    }

    const id = String(record.id ?? '').trim()
    if (id !== expectedId) errors.push(`${name}: ID_MISMATCH（文件名=${expectedId}，id=${id}）`)
    if (id && !ID_PATTERN.test(id)) errors.push(`${name}: BAD_ID 格式`)
    if (seenIds.has(id)) errors.push(`${name}: DUPLICATE_ID「${id}」`)
    seenIds.add(id)

    if (!Number.isInteger(record.participantCount) || record.participantCount <= 0) {
      errors.push(`${name}: participantCount 必须是正整数`)
    }

    if (record.settlement !== undefined && record.settlement !== null && !isValidEnvelope(record.settlement)) {
      errors.push(`${name}: BAD_SETTLEMENT（半年总结只能保存 null 或设备密钥密文信封）`)
    }

    records.push(record)
  }

  return { records, errors }
}

export async function loadAndValidateOpsSummaries() {
  const files = await loadOpsSummaryFiles()
  return { files, ...validateOpsSummaryFiles(files) }
}
