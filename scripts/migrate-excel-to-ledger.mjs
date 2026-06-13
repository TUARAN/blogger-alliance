import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import AdmZip from 'adm-zip'

/**
 * 一次性迁移工具：把运营支撑台账 Excel + 现有 private/commercialDeals.source.json
 * 落成 git 跟踪的「每合作一文件」权威源 data/ledger/deals/<id>.json。
 *
 * - 公开/内部字段：直接来自 private/commercialDeals.source.json（已清洗、id 稳定）。
 * - 敏感结算字段：从 Excel 解析出明文，按 品牌+服务+期数 匹配到 deal id，
 *   写入 gitignore 的 tmp/ledger-settlement-plain.json 作为「待加密工作表」。
 *   owner 之后用 `npm run ledger:encrypt -- --batch=tmp/ledger-settlement-plain.json`
 *   把明文加密进各 deal 文件的 settlement 字段（明文绝不进 git）。
 *
 * 用法：
 *   node scripts/migrate-excel-to-ledger.mjs --excel="/path/运营支撑台账26.xlsx"
 */

const cwd = process.cwd()
const DEALS_DIR = path.resolve(cwd, 'data/ledger/deals')
const SOURCE_PATH = path.resolve(cwd, 'private/commercialDeals.source.json')
const PLAIN_OUT = path.resolve(cwd, 'tmp/ledger-settlement-plain.json')
const DEFAULT_EXCEL = '/Users/tuaran/Downloads/运营支撑台账26.xlsx'

const MONEY_ALIASES = {
  forward: ['前向结算', '前向'],
  backward: ['后向结算', '后向'],
  opsSupport: ['运营支撑结算', '运营支撑'],
  detail: ['结算详情备注', '结算备注', '结算详情']
}
const BRAND_ALIASES = ['品牌/项目', '品牌', '项目']
const SERVICE_ALIASES = ['具体服务', '服务']
const PHASE_HINT_ALIASES = ['备注', '承接（进度）', '承接']

function getArg(flag, fallback = '') {
  const exact = process.argv.find((arg) => arg.startsWith(`${flag}=`))
  if (exact) return exact.slice(flag.length + 1)
  const index = process.argv.indexOf(flag)
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1]
  return fallback
}

// ---- 最小 XLSX 读取（与既有解析逻辑一致，零额外依赖） ----
function cellRefToIndexes(ref) {
  const match = String(ref || '').match(/^([A-Z]+)(\d+)$/i)
  if (!match) return null
  let col = 0
  for (const char of match[1].toUpperCase()) col = col * 26 + char.charCodeAt(0) - 64
  return { row: Number(match[2]) - 1, col: col - 1 }
}

function decodeXml(value) {
  return String(value || '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_m, c) => String.fromCodePoint(Number(c)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, c) => String.fromCodePoint(Number.parseInt(c, 16)))
}

function readZipText(zip, entryName) {
  const entry = zip.getEntry(entryName)
  return entry ? entry.getData().toString('utf8') : ''
}

function parseSharedStrings(xml) {
  const strings = []
  const textRegex = /<t\b[^>]*>([\s\S]*?)<\/t>/g
  for (const si of xml.match(/<si\b[\s\S]*?<\/si>/g) || []) {
    const pieces = []
    let match = textRegex.exec(si)
    while (match) { pieces.push(decodeXml(match[1])); match = textRegex.exec(si) }
    textRegex.lastIndex = 0
    strings.push(pieces.join(''))
  }
  return strings
}

function firstSheetPath(zip) {
  const workbookXml = readZipText(zip, 'xl/workbook.xml')
  const relsXml = readZipText(zip, 'xl/_rels/workbook.xml.rels')
  const relTargets = new Map()
  for (const m of relsXml.matchAll(/<Relationship\b[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)) {
    relTargets.set(m[1], m[2])
  }
  const m = workbookXml.match(/<sheet\b[^>]*r:id="([^"]+)"/)
  const target = m ? relTargets.get(m[1]) : null
  if (!target) throw new Error('EXCEL_SHEET_NOT_FOUND')
  return target.startsWith('xl/') ? target : `xl/${target.replace(/^\//, '')}`
}

function parseSheetRows(xml, sharedStrings) {
  const rows = []
  const cellRegex = /<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g
  let match = cellRegex.exec(xml)
  while (match) {
    const attrs = match[1]
    const body = match[2] || ''
    const indexes = cellRefToIndexes(attrs.match(/\br="([^"]+)"/)?.[1])
    if (indexes) {
      const type = attrs.match(/\bt="([^"]+)"/)?.[1] || ''
      const rawValue = body.match(/<v>([\s\S]*?)<\/v>/)?.[1]
      const inlineValue = body.match(/<is>[\s\S]*?<t\b[^>]*>([\s\S]*?)<\/t>[\s\S]*?<\/is>/)?.[1]
      let value = ''
      if (type === 's') value = sharedStrings[Number(rawValue)] || ''
      else if (type === 'inlineStr') value = decodeXml(inlineValue || '')
      else if (rawValue != null) value = decodeXml(rawValue)
      rows[indexes.row] ||= []
      rows[indexes.row][indexes.col] = value
    }
    match = cellRegex.exec(xml)
  }
  return rows.map((row) => row || [])
}

function normalizeText(value) {
  return String(value ?? '').replace(/ /g, ' ').trim()
}

function normalizeKey(value) {
  return normalizeText(value).toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '').replace(/\s+/g, '')
}

function detectPhase(...values) {
  const text = values.map(normalizeText).join(' ')
  return text.match(/[一二三四五六七八九十\d]+期/)?.[0] || ''
}

function dealKey(brand, service, phase) {
  return [normalizeKey(brand), normalizeKey(service), normalizeKey(phase)].join('|')
}

function pickIndex(headers, aliases) {
  return headers.findIndex((h) => aliases.includes(normalizeText(h)))
}

function parseExcelMoney(filePath) {
  const zip = new AdmZip(filePath)
  const sharedStrings = parseSharedStrings(readZipText(zip, 'xl/sharedStrings.xml'))
  const rows = parseSheetRows(readZipText(zip, firstSheetPath(zip)), sharedStrings)
  const headerRowIndex = rows.findIndex((row) => row.some((v) => BRAND_ALIASES.includes(normalizeText(v))))
  if (headerRowIndex < 0) throw new Error('EXCEL_HEADER_ROW_NOT_FOUND')

  const headers = rows[headerRowIndex].map(normalizeText)
  const idx = {
    brand: pickIndex(headers, BRAND_ALIASES),
    service: pickIndex(headers, SERVICE_ALIASES),
    phaseHint: PHASE_HINT_ALIASES.map((a) => pickIndex(headers, [a])).filter((i) => i >= 0),
    forward: pickIndex(headers, MONEY_ALIASES.forward),
    backward: pickIndex(headers, MONEY_ALIASES.backward),
    opsSupport: pickIndex(headers, MONEY_ALIASES.opsSupport),
    detail: pickIndex(headers, MONEY_ALIASES.detail)
  }

  const byKey = new Map()
  for (const row of rows.slice(headerRowIndex + 1)) {
    const brand = normalizeText(row[idx.brand])
    const service = normalizeText(row[idx.service])
    if (!brand || !service) continue
    const phaseHints = idx.phaseHint.map((i) => row[i])
    const phase = detectPhase(...phaseHints)

    const money = {}
    for (const field of ['forward', 'backward', 'opsSupport', 'detail']) {
      const cell = normalizeText(row[idx[field]])
      if (cell && cell !== '/' ) money[field] = cell
    }
    if (Object.keys(money).length === 0) continue
    byKey.set(dealKey(brand, service, phase), money)
  }
  return byKey
}

async function main() {
  const excelPath = path.resolve(getArg('--excel', process.env.LEDGER_EXCEL_PATH || DEFAULT_EXCEL))

  const source = JSON.parse(await fs.readFile(SOURCE_PATH, 'utf8'))
  if (!Array.isArray(source)) throw new Error('commercialDeals.source.json 必须是数组')

  let moneyByKey = new Map()
  try {
    moneyByKey = parseExcelMoney(excelPath)
    console.log(`Excel 解析出 ${moneyByKey.size} 行含结算金额。`)
  } catch (error) {
    console.warn(`跳过 Excel 结算解析：${error.message}（仅迁移公开字段）`)
  }

  await fs.mkdir(DEALS_DIR, { recursive: true })

  const plainWorksheet = {}
  let written = 0

  for (const record of source) {
    const id = String(record.id || '').trim()
    if (!id) continue

    const phase = detectPhase(record.remark)
    const dealFile = {
      id,
      brand: record.brand || '',
      service: record.service || '',
      progress: record.progress || '',
      remark: record.remark || '',
      category: record.category || '',
      referrer: record.referrer || '',
      owner: record.owner || '',
      updatedAt: record.updatedAt || '',
      reportCooperationId: record.reportCooperationId || '',
      muted: record.muted === true,
      // 敏感结算：迁移阶段一律置空，owner 用 ledger:encrypt 加密后填入。
      settlement: null
    }

    await fs.writeFile(
      path.join(DEALS_DIR, `${id}.json`),
      `${JSON.stringify(dealFile, null, 2)}\n`,
      'utf8'
    )
    written += 1

    const money = moneyByKey.get(dealKey(record.brand, record.service, phase))
    if (money) plainWorksheet[id] = money
  }

  await fs.mkdir(path.dirname(PLAIN_OUT), { recursive: true })
  await fs.writeFile(PLAIN_OUT, `${JSON.stringify(plainWorksheet, null, 2)}\n`, 'utf8')

  console.log(`已写入 ${written} 个 deal 文件到 ${path.relative(cwd, DEALS_DIR)}/`)
  console.log(`结算明文工作表（${Object.keys(plainWorksheet).length} 条，未加密、勿提交）：${path.relative(cwd, PLAIN_OUT)}`)
  console.log('下一步：owner 执行  npm run ledger:encrypt -- --batch=tmp/ledger-settlement-plain.json')
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
