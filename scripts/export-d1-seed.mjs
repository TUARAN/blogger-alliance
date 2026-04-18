import fs from 'node:fs/promises'
import path from 'node:path'

const cwd = process.cwd()
const DEFAULT_DEALS_PATH = path.resolve(cwd, 'private/commercialDeals.source.json')
const DEFAULT_REPORTS_PATH = path.resolve(cwd, 'private/promotionReports.source.json')
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

async function main() {
  const dealsPath = path.resolve(cwd, getArg('--deals', DEFAULT_DEALS_PATH))
  const reportsPath = path.resolve(cwd, getArg('--reports', DEFAULT_REPORTS_PATH))
  const outputPath = path.resolve(cwd, getArg('--out', DEFAULT_OUTPUT_PATH))

  const deals = await readJson(dealsPath)
  const reports = await readJson(reportsPath)

  if (!Array.isArray(deals)) {
    throw new Error('commercialDeals.source.json 必须是数组')
  }

  if (!Array.isArray(reports)) {
    throw new Error('promotionReports.source.json 必须是数组')
  }

  const sql = `DELETE FROM commercial_deals;
INSERT INTO commercial_deals (
  id,
  brand,
  service,
  progress,
  remark,
  category,
  referrer,
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
`

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, sql, 'utf8')

  console.log(`已生成 D1 导入 SQL: ${path.relative(cwd, outputPath)}`)
  console.log(`commercial_deals: ${deals.length} 条`)
  console.log(`promotion_reports: ${reports.length} 条`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
