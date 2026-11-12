import fs from 'node:fs/promises'
import path from 'node:path'
import { loadAndValidateDeals } from './lib/ledgerDeals.mjs'
import { loadAndValidateReports, sortReportsForSync } from './lib/ledgerReports.mjs'
import { loadAndValidateAnnualReports, sortAnnualReportsForSync } from './lib/ledgerAnnualReports.mjs'

/**
 * 从 Git 台账权威源导出 Supabase 灾备 SQL。
 *
 * Usage:
 *   npm run supabase:export-seed
 *   npm run supabase:export-seed -- --output ./tmp/supabase-seed.sql
 */

const cwd = process.cwd()
const DEFAULT_OUTPUT_PATH = path.resolve(cwd, 'tmp/supabase-seed.sql')

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
  return value === true ? 'true' : 'false'
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

async function main() {
  const outputPath = path.resolve(cwd, getArg('--output', getArg('--out', DEFAULT_OUTPUT_PATH)))

  const { records: deals, errors: dealErrors, warnings: dealWarnings } = await loadAndValidateDeals()
  const dealIds = new Set(deals.map((deal) => deal.id))
  const { records: reports, errors: reportErrors, warnings: reportWarnings } = await loadAndValidateReports({ dealIds })
  const { records: annualReports, errors: annualErrors, warnings: annualWarnings } = await loadAndValidateAnnualReports()
  const errors = [...dealErrors, ...reportErrors, ...annualErrors]
  for (const warning of [...dealWarnings, ...reportWarnings, ...annualWarnings]) {
    console.warn(`⚠ ${warning}`)
  }
  if (errors.length > 0) {
    for (const error of errors) console.error(`✗ ${error}`)
    throw new Error(`校验未通过（${errors.length} 个错误），已中止导出。先运行 npm run ledger:validate。`)
  }
  if (deals.length === 0) {
    throw new Error('data/ledger/deals/ 下没有任何合作文件。')
  }

  const annualSection = annualReports.length === 0
    ? `DELETE FROM public.annual_reports;
`
    : `DELETE FROM public.annual_reports;
INSERT INTO public.annual_reports (
  year,
  partners,
  summary_cards,
  highlights,
  intro,
  updated_at
) VALUES
${buildAnnualReportsInsertRows(sortAnnualReportsForSync(annualReports)).join(',\n')};
`

  const sql = `BEGIN;

DELETE FROM public.commercial_deals;
INSERT INTO public.commercial_deals (
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

DELETE FROM public.promotion_reports;
INSERT INTO public.promotion_reports (
  id,
  title,
  article_title,
  project,
  author,
  period,
  published_at,
  cooperation_id,
  platforms,
  stats,
  platform_stats,
  author_sections,
  content,
  sort_order
) VALUES
${buildReportsInsertRows(sortReportsForSync(reports)).join(',\n')};

${annualSection}

COMMIT;
`

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, sql, 'utf8')

  console.log(`已生成 Supabase 导入 SQL: ${path.relative(cwd, outputPath)}`)
  console.log(`commercial_deals: ${deals.length} 条`)
  console.log(`promotion_reports: ${reports.length} 条`)
  console.log(`annual_reports: ${annualReports.length} 条`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
