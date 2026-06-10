import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import AdmZip from 'adm-zip'

/**
 * Import commercial ledger rows from Excel into D1 via Worker admin API.
 *
 * Usage:
 *   npm run d1:import-ledger -- --parse-only --excel="/path/to/file.xlsx"
 *   INTERNAL_ACCESS_CREDENTIAL='...' npm run d1:import-ledger -- --excel="/path/to/file.xlsx"
 */

const DEFAULT_EXCEL_PATH = '/Users/tuaran/Downloads/运营支撑台账26/草稿（含报价结算）.xlsx'
const DEFAULT_API_BASE = 'http://127.0.0.1:8787'

const HEADER_ALIASES = {
  updatedAt: ['最近沟通时间', '更新时间', 'updatedAt'],
  brand: ['品牌/项目', '品牌', '项目', 'brand'],
  service: ['具体服务', '服务', 'service'],
  progress: ['当前进度', '进度', 'progress'],
  remark: ['备注', 'remark'],
  referrer: ['推荐人', 'referrer'],
  ownerProgress: ['承接（进度）', '承接', '执行人', '承接人']
}

function getArg(flag, fallback = '') {
  const exact = process.argv.find((arg) => arg.startsWith(`${flag}=`))
  if (exact) return exact.slice(flag.length + 1)

  const index = process.argv.indexOf(flag)
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1]

  return fallback
}

function hasFlag(flag) {
  return process.argv.includes(flag)
}

function cellRefToIndexes(ref) {
  const match = String(ref || '').match(/^([A-Z]+)(\d+)$/i)
  if (!match) return null

  const colLetters = match[1].toUpperCase()
  let col = 0
  for (const char of colLetters) {
    col = col * 26 + char.charCodeAt(0) - 64
  }

  return { row: Number(match[2]) - 1, col: col - 1 }
}

function decodeXml(value) {
  return String(value || '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)))
}

function readZipText(zip, entryName) {
  const entry = zip.getEntry(entryName)
  return entry ? entry.getData().toString('utf8') : ''
}

function parseSharedStrings(xml) {
  const strings = []
  const siRegex = /<si\b[\s\S]*?<\/si>/g
  const textRegex = /<t\b[^>]*>([\s\S]*?)<\/t>/g

  for (const si of xml.match(siRegex) || []) {
    const pieces = []
    let match = textRegex.exec(si)
    while (match) {
      pieces.push(decodeXml(match[1]))
      match = textRegex.exec(si)
    }
    textRegex.lastIndex = 0
    strings.push(pieces.join(''))
  }

  return strings
}

function parseWorkbookSheets(zip) {
  const workbookXml = readZipText(zip, 'xl/workbook.xml')
  const relsXml = readZipText(zip, 'xl/_rels/workbook.xml.rels')
  const relTargets = new Map()

  for (const match of relsXml.matchAll(/<Relationship\b[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)) {
    relTargets.set(match[1], match[2])
  }

  const sheets = []
  for (const match of workbookXml.matchAll(/<sheet\b[^>]*name="([^"]+)"[^>]*r:id="([^"]+)"/g)) {
    const target = relTargets.get(match[2])
    if (!target) continue
    sheets.push({
      name: decodeXml(match[1]),
      path: target.startsWith('xl/') ? target : `xl/${target.replace(/^\//, '')}`
    })
  }

  return sheets
}

function parseSheetRows(xml, sharedStrings) {
  const rows = []
  const cellRegex = /<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g
  const refRegex = /\br="([^"]+)"/
  const typeRegex = /\bt="([^"]+)"/
  const valueRegex = /<v>([\s\S]*?)<\/v>/
  const inlineRegex = /<is>[\s\S]*?<t\b[^>]*>([\s\S]*?)<\/t>[\s\S]*?<\/is>/

  let match = cellRegex.exec(xml)
  while (match) {
    const attrs = match[1]
    const body = match[2] || ''
    const ref = attrs.match(refRegex)?.[1]
    const indexes = cellRefToIndexes(ref)

    if (indexes) {
      const type = attrs.match(typeRegex)?.[1] || ''
      const rawValue = body.match(valueRegex)?.[1]
      const inlineValue = body.match(inlineRegex)?.[1]
      let value = ''

      if (type === 's') {
        value = sharedStrings[Number(rawValue)] || ''
      } else if (type === 'inlineStr') {
        value = decodeXml(inlineValue || '')
      } else if (rawValue != null) {
        value = decodeXml(rawValue)
      }

      rows[indexes.row] ||= []
      rows[indexes.row][indexes.col] = value
    }

    match = cellRegex.exec(xml)
  }

  return rows.map((row) => row || [])
}

function excelSerialToDateString(value) {
  const serial = Number(value)
  if (!Number.isFinite(serial) || serial < 1 || serial > 100000) return ''

  const excelEpoch = Date.UTC(1899, 11, 30)
  const date = new Date(excelEpoch + serial * 86400000)
  if (Number.isNaN(date.getTime())) return ''

  return `${date.getUTCFullYear()}.${date.getUTCMonth() + 1}.${date.getUTCDate()}`
}

function readWorkbookRows(filePath) {
  const zip = new AdmZip(filePath)
  const sharedStrings = parseSharedStrings(readZipText(zip, 'xl/sharedStrings.xml'))
  const sheets = parseWorkbookSheets(zip)

  if (sheets.length === 0) {
    throw new Error('EXCEL_SHEET_NOT_FOUND')
  }

  const firstSheet = sheets[0]
  return {
    sheetName: firstSheet.name,
    rows: parseSheetRows(readZipText(zip, firstSheet.path), sharedStrings)
  }
}

function normalizeText(value) {
  return String(value ?? '').replace(/\u00a0/g, ' ').trim()
}

function isBlankRow(row) {
  return row.every((value) => normalizeText(value) === '')
}

function pickHeaderIndex(headers, aliases) {
  return headers.findIndex((header) => aliases.includes(normalizeText(header)))
}

function buildHeaderMap(headers) {
  const map = {}
  for (const [key, aliases] of Object.entries(HEADER_ALIASES)) {
    map[key] = pickHeaderIndex(headers, aliases)
  }
  return map
}

function getCell(row, index) {
  if (index < 0) return ''
  return normalizeText(row[index])
}

function normalizeDate(value) {
  const text = normalizeText(value)
  if (!text) return ''

  const serialDate = excelSerialToDateString(text)
  if (serialDate) return serialDate

  const match = text.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})/)
  if (!match) return text

  return `${match[1]}.${Number(match[2])}.${Number(match[3])}`
}

function normalizeProgress(progress) {
  const text = normalizeText(progress)
  if (!text || text === '/') return { progress: '暂不推进', note: '' }

  const [head, ...rest] = text.split(/[：:]/)
  const progressHead = normalizeText(head)
  const note = normalizeText(rest.join('：'))

  if (note && progressHead.length <= 12) {
    return { progress: progressHead, note }
  }

  if (text.length > 28) {
    return { progress: progressHead || '需求沟通中', note: text }
  }

  return { progress: text, note: '' }
}

function detectPhase(...values) {
  const text = values.map((value) => normalizeText(value)).join(' ')
  return text.match(/[一二三四五六七八九十\d]+期/)?.[0] || ''
}

function normalizeRemark({ remark, progressNote }) {
  const parts = []

  for (const value of [remark, progressNote]) {
    const text = normalizeText(value)
    if (text && text !== '/') parts.push(text)
  }

  return parts.join('；')
}

function normalizeKey(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .replace(/\s+/g, '')
}

function slugify(value) {
  const ascii = normalizeText(value)
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (ascii) return ascii

  return Array.from(normalizeText(value))
    .map((char) => char.codePointAt(0).toString(36))
    .join('-')
    .slice(0, 48)
}

function buildGeneratedId(row) {
  const brand = slugify(row.brand) || 'deal'
  const service = slugify(row.service) || 'service'
  const phase = slugify(detectPhase(row.remark, row.ownerProgress)) || 'p1'
  return `${brand}-${service}-${phase}`.slice(0, 96)
}

function dealMatchKey(deal) {
  return [
    normalizeKey(deal.brand),
    normalizeKey(deal.service),
    normalizeKey(detectPhase(deal.remark, deal.progress))
  ].join('|')
}

function findExistingDeal(row, currentDeals, usedIds) {
  const exactKey = [
    normalizeKey(row.brand),
    normalizeKey(row.service),
    normalizeKey(detectPhase(row.remark, row.ownerProgress))
  ].join('|')

  const exact = currentDeals.find((deal) => !usedIds.has(deal.id) && dealMatchKey(deal) === exactKey)
  if (exact) return exact

  const brandServiceMatches = currentDeals.filter((deal) => (
    !usedIds.has(deal.id)
    && normalizeKey(deal.brand) === normalizeKey(row.brand)
    && normalizeKey(deal.service) === normalizeKey(row.service)
  ))

  if (brandServiceMatches.length === 1) {
    return brandServiceMatches[0]
  }

  return null
}

function parseDealsFromExcel(filePath) {
  const { sheetName, rows } = readWorkbookRows(filePath)
  const headerRowIndex = rows.findIndex((row) => row.some((value) => normalizeText(value) === '品牌/项目'))

  if (headerRowIndex < 0) {
    throw new Error('EXCEL_HEADER_ROW_NOT_FOUND')
  }

  const headers = rows[headerRowIndex].map(normalizeText)
  const headerMap = buildHeaderMap(headers)

  for (const required of ['updatedAt', 'brand', 'service', 'progress']) {
    if (headerMap[required] < 0) {
      throw new Error(`EXCEL_REQUIRED_COLUMN_MISSING:${required}`)
    }
  }

  const deals = []
  for (const row of rows.slice(headerRowIndex + 1)) {
    if (isBlankRow(row)) continue

    const progressParts = normalizeProgress(getCell(row, headerMap.progress))
    const deal = {
      updatedAt: normalizeDate(getCell(row, headerMap.updatedAt)),
      brand: getCell(row, headerMap.brand),
      service: getCell(row, headerMap.service),
      progress: progressParts.progress,
      remark: normalizeRemark({
        remark: getCell(row, headerMap.remark),
        progressNote: progressParts.note
      }),
      referrer: getCell(row, headerMap.referrer),
      owner: getCell(row, headerMap.ownerProgress),
      ownerProgress: getCell(row, headerMap.ownerProgress)
    }

    if (!deal.brand || !deal.service || !deal.progress) continue
    deals.push(deal)
  }

  return { sheetName, deals }
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {})
    }
  })

  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(payload?.error || `REQUEST_FAILED_${response.status}`)
  }

  return payload
}

async function createSession(apiBase, credential) {
  const payload = await requestJson(`${apiBase}/api/internal/session`, {
    method: 'POST',
    body: JSON.stringify({ credential })
  })
  return payload.token
}

async function fetchCurrentDeals(apiBase, token) {
  const payload = await requestJson(`${apiBase}/api/internal/deals`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return Array.isArray(payload.deals) ? payload.deals : []
}

async function updateDeals(apiBase, token, deals) {
  return requestJson(`${apiBase}/api/internal/admin/deals`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ deals })
  })
}

function mergeDeals(excelRows, currentDeals) {
  const usedIds = new Set()
  const nextDeals = excelRows.map((row) => {
    const existing = findExistingDeal(row, currentDeals, usedIds)
    const id = existing?.id || buildGeneratedId(row)
    usedIds.add(id)

    const next = {
      ...(existing || {}),
      id,
      brand: row.brand,
      service: row.service,
      progress: row.progress,
      remark: row.remark,
      referrer: row.referrer,
      owner: row.owner,
      updatedAt: row.updatedAt
    }

    delete next.ownerProgress
    return next
  })

  const ids = new Set()
  for (const deal of nextDeals) {
    if (ids.has(deal.id)) {
      throw new Error(`DEAL_ID_DUPLICATED_AFTER_MERGE:${deal.id}`)
    }
    ids.add(deal.id)
  }

  return nextDeals
}

async function writeDryRun(filePath, payload) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
}

async function main() {
  const excelPath = path.resolve(getArg('--excel', process.env.LEDGER_EXCEL_PATH || DEFAULT_EXCEL_PATH))
  const apiBase = (getArg('--api-base', process.env.INTERNAL_API_BASE || DEFAULT_API_BASE)).replace(/\/$/, '')
  const credential = process.env.INTERNAL_ACCESS_CREDENTIAL || ''
  const dryRun = hasFlag('--dry-run')
  const parseOnly = hasFlag('--parse-only')

  const { sheetName, deals: excelDeals } = parseDealsFromExcel(excelPath)

  if (parseOnly) {
    const outPath = path.resolve('tmp/import-ledger-parse-preview.json')
    await writeDryRun(outPath, {
      source: excelPath,
      sheetName,
      count: excelDeals.length,
      deals: excelDeals.map((deal) => {
        const { ownerProgress, ...rest } = deal
        return rest
      })
    })
    console.log(`已生成解析预览: ${outPath}`)
    console.log(`Excel 工作表 ${sheetName} 解析出 ${excelDeals.length} 条合作进度。`)
    return
  }

  if (!credential) {
    throw new Error('INTERNAL_ACCESS_CREDENTIAL 环境变量不能为空')
  }

  const token = await createSession(apiBase, credential)
  const currentDeals = await fetchCurrentDeals(apiBase, token)
  const nextDeals = mergeDeals(excelDeals, currentDeals)

  if (dryRun) {
    const outPath = path.resolve('tmp/import-ledger-preview.json')
    await writeDryRun(outPath, {
      source: excelPath,
      sheetName,
      currentCount: currentDeals.length,
      nextCount: nextDeals.length,
      deals: nextDeals
    })
    console.log(`已生成预览: ${outPath}`)
    console.log(`当前 D1 台账 ${currentDeals.length} 条，Excel 合并后 ${nextDeals.length} 条，未写入数据库。`)
    return
  }

  const result = await updateDeals(apiBase, token, nextDeals)
  console.log(`Excel 工作表: ${sheetName}`)
  console.log(`已写入 D1 合作进度台账: ${result.count} 条`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
