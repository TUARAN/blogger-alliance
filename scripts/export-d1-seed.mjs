import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Export private JSON backups to D1 seed SQL.
 *
 * Usage:
 *   npm run d1:export-seed
 *   npm run d1:export-seed -- --output ./tmp/d1-seed.sql
 */

const cwd = process.cwd()
const DEFAULT_DEALS_PATH = path.resolve(cwd, 'private/commercialDeals.source.json')
const DEFAULT_REPORTS_PATH = path.resolve(cwd, 'private/promotionReports.source.json')
const DEFAULT_ANNUAL_PATH = path.resolve(cwd, 'private/annualReports.source.json')
const DEFAULT_OUTPUT_PATH = path.resolve(cwd, 'tmp/d1-seed.sql')

function getArg(flag, fallback = '') {
  const exact = process.argv.find((arg) => arg.startsWith(`${flag}=`))

  if (exact) {
    return exact.slice(flag.length + 1)
  }

  const index = process.argv.indexOf(flag)

  if (index >= 0 && process.argv[index + 1]) {
    return process.argv[index + 1]
  }

  return fallback
}

function sqlString(value) {
  if (value == null) {
    return 'NULL'
  }

  return `'${String(value).replace(/'/g, "''")}'`
}

function sqlJson(value, fallback) {
  const normalized = value == null ? fallback : value
  return sqlString(JSON.stringify(normalized))
}

function sqlBool(value) {
  return value === true ? '1' : '0'
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8')
  return JSON.parse(raw)
}

function buildDealsInsertRows(deals) {
  return deals.map((deal, index) => {
    return `(
  ${sqlString(deal.id)},
  ${sqlString(deal.brand || '')},
  ${sqlString(deal.service || '')},
  ${sqlString(deal.progress || '')},
  ${sqlString(deal.remark || '')},
  ${sqlString(deal.category || '')},
  ${sqlString(deal.referrer || '')},
  ${sqlString(deal.owner || '')},
  ${sqlString(deal.updatedAt || '')},
  ${sqlBool(deal.muted)},
  ${sqlString(deal.reportCooperationId || '')},
  ${index}
)`
  })
}

function buildReportsInsertRows(reports) {
  return reports.map((report, index) => {
    return `(
  ${sqlString(report.id)},
  ${sqlString(report.title || '')},
  ${sqlString(report.articleTitle || '')},
  ${sqlString(report.project || '')},
  ${sqlString(report.author || '')},
  ${sqlString(report.period || '')},
  ${sqlString(report.publishedAt || '')},
  ${sqlString(report.cooperationId || '')},
  ${sqlJson(report.platforms, [])},
  ${sqlJson(report.stats, {})},
  ${sqlJson(report.platformStats, {})},
  ${sqlJson(report.authorSections, [])},
  ${sqlString(report.content || '')},
  ${index}
)`
  })
}

function buildAnnualReportsInsertRows(reports) {
  return reports.map((report) => {
    return `(
  ${Number(report.year) || 0},
  ${sqlJson(report.partners, [])},
  ${sqlJson(report.summaryCards, [])},
  ${sqlJson(report.highlights, [])},
  ${sqlString(report.intro || '')},
  ${sqlString(report.updatedAt || '')}
)`
  })
}

async function readJsonOrEmpty(filePath) {
  try {
    return await readJson(filePath)
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function main() {
  const dealsPath = path.resolve(cwd, getArg('--deals', DEFAULT_DEALS_PATH))
  const reportsPath = path.resolve(cwd, getArg('--reports', DEFAULT_REPORTS_PATH))
  const annualPath = path.resolve(cwd, getArg('--annual', DEFAULT_ANNUAL_PATH))
  const outputPath = path.resolve(cwd, getArg('--out', DEFAULT_OUTPUT_PATH))

  const deals = await readJson(dealsPath)
  const reports = await readJson(reportsPath)
  const annualReports = await readJsonOrEmpty(annualPath)

  if (!Array.isArray(deals)) {
    throw new Error('commercialDeals.source.json 必须是数组')
  }

  if (!Array.isArray(reports)) {
    throw new Error('promotionReports.source.json 必须是数组')
  }

  if (!Array.isArray(annualReports)) {
    throw new Error('annualReports.source.json 必须是数组')
  }

  const annualSection = annualReports.length === 0
    ? `DELETE FROM annual_reports;
`
    : `DELETE FROM annual_reports;
INSERT INTO annual_reports (
  year,
  partners_json,
  summary_cards_json,
  highlights_json,
  intro,
  updated_at
) VALUES
${buildAnnualReportsInsertRows(annualReports).join(',\n')};
`

  const sql = `DELETE FROM commercial_deals;
INSERT INTO commercial_deals (
  id,
  brand,
  service,
  progress,
  remark,
  category,
  referrer,
  owner,
  updated_at,
  muted,
  report_cooperation_id,
  sort_order
) VALUES
${buildDealsInsertRows(deals).join(',\n')};

DELETE FROM promotion_reports;
INSERT INTO promotion_reports (
  id,
  title,
  article_title,
  project,
  author,
  period,
  published_at,
  cooperation_id,
  platforms_json,
  stats_json,
  platform_stats_json,
  author_sections_json,
  content,
  sort_order
) VALUES
${buildReportsInsertRows(reports).join(',\n')};

${annualSection}`

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, sql, 'utf8')

  console.log(`已生成 D1 导入 SQL: ${path.relative(cwd, outputPath)}`)
  console.log(`commercial_deals: ${deals.length} 条`)
  console.log(`promotion_reports: ${reports.length} 条`)
  console.log(`annual_reports: ${annualReports.length} 条`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
