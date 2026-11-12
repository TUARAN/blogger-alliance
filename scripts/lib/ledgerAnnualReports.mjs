import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * 读取并校验 data/ledger/annual-reports/<year>.json（年度总览权威源）。
 * 被 ledger:validate 与 ledger:sync 共用。
 */

export const ANNUAL_REPORTS_DIR = path.resolve(process.cwd(), 'data/ledger/annual-reports')

const FILE_PATTERN = /^(\d{4})\.json$/

export async function loadAnnualReportFiles() {
  let entries
  try {
    entries = await fs.readdir(ANNUAL_REPORTS_DIR)
  } catch (error) {
    if (error?.code === 'ENOENT') return []
    throw error
  }

  const files = entries.filter((name) => name.endsWith('.json')).sort()
  return Promise.all(files.map(async (name) => ({
    name,
    filePath: path.join(ANNUAL_REPORTS_DIR, name),
    raw: await fs.readFile(path.join(ANNUAL_REPORTS_DIR, name), 'utf8')
  })))
}

export function validateAnnualReportFiles(files) {
  const records = []
  const errors = []
  const warnings = []
  const seenYears = new Map()

  for (const { name, raw } of files) {
    const fileMatch = name.match(FILE_PATTERN)
    if (!fileMatch) {
      errors.push(`${name}: 文件名必须是四位年份，如 2025.json`)
      continue
    }
    const expectedYear = Number(fileMatch[1])
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

    const year = Number(record.year)
    if (!Number.isInteger(year) || year < 2000 || year > 9999) {
      errors.push(`${name}: year 必须是 2000–9999 的整数`)
    } else if (year !== expectedYear) {
      errors.push(`${name}: YEAR_MISMATCH（文件名=${expectedYear}，year=${year}）`)
    } else if (seenYears.has(year)) {
      errors.push(`${name}: DUPLICATE_YEAR「${year}」与 ${seenYears.get(year)} 重复`)
    } else {
      seenYears.set(year, name)
    }

    if (!String(record.updatedAt ?? '').trim()) {
      errors.push(`${name}: MISSING_FIELD「updatedAt」`)
    }

    if (record.partners !== undefined && (
      !Array.isArray(record.partners)
      || record.partners.some((item) => typeof item !== 'string' || !item.trim())
    )) {
      errors.push(`${name}: partners 必须是非空字符串数组`)
    }

    if (record.highlights !== undefined && (
      !Array.isArray(record.highlights)
      || record.highlights.some((item) => typeof item !== 'string' || !item.trim())
    )) {
      errors.push(`${name}: highlights 必须是非空字符串数组`)
    }

    if (record.intro !== undefined && typeof record.intro !== 'string') {
      errors.push(`${name}: intro 必须是字符串`)
    }

    if (record.summaryCards !== undefined) {
      if (!Array.isArray(record.summaryCards)) {
        errors.push(`${name}: summaryCards 必须是数组`)
      } else {
        record.summaryCards.forEach((card, index) => {
          if (!card || typeof card !== 'object' || Array.isArray(card)) {
            errors.push(`${name}: summaryCards[${index}] 必须是对象`)
            return
          }
          if (!String(card.label ?? '').trim() || !String(card.value ?? '').trim()) {
            errors.push(`${name}: summaryCards[${index}] 需要同时填写 label 和 value`)
          }
        })
      }
    }

    if (!Array.isArray(record.partners) || record.partners.length === 0) {
      warnings.push(`${name}: 尚未填写合作品牌 partners`)
    }

    records.push(record)
  }

  return { records, errors, warnings }
}

export function sortAnnualReportsForSync(records) {
  return [...records].sort((a, b) => Number(a.year) - Number(b.year))
}

export async function loadAndValidateAnnualReports() {
  const files = await loadAnnualReportFiles()
  return { files, ...validateAnnualReportFiles(files) }
}
