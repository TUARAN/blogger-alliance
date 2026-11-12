import process from 'node:process'
import { loadAndValidateDeals } from './lib/ledgerDeals.mjs'
import { loadAndValidateOpsSummaries } from './lib/ledgerOpsSummaries.mjs'
import { loadAndValidateReports, sortReportsForSync } from './lib/ledgerReports.mjs'
import { loadAndValidateAnnualReports, sortAnnualReportsForSync } from './lib/ledgerAnnualReports.mjs'
import { withClient } from './lib/supabaseDb.mjs'

/**
 * 把 data/ledger 下的合作台账、推广报告、年度总览和运营支撑总结同步到 Supabase。
 *
 * 流程：读取 → 校验（有错即中止）→ 调用对应 replace_* RPC 全量覆盖。
 * 合作与运营总结的 settlement 密文随记录写入；明文金额从不离开本地。
 *
 * 用法：
 *   npm run ledger:sync             # 校验并写库
 *   npm run ledger:sync -- --dry-run  # 只校验、统计，不连库
 */

async function main() {
  const dryRun = process.argv.includes('--dry-run')

  const { files, records, errors: dealErrors, warnings: dealWarnings } = await loadAndValidateDeals()
  const { records: summaries, errors: summaryErrors } = await loadAndValidateOpsSummaries()
  const dealIds = new Set(records.map((record) => record.id))
  const { records: reports, errors: reportErrors, warnings: reportWarnings } = await loadAndValidateReports({ dealIds })
  const { records: annualReports, errors: annualErrors, warnings: annualWarnings } = await loadAndValidateAnnualReports()
  const errors = [...dealErrors, ...summaryErrors, ...reportErrors, ...annualErrors]
  const warnings = [...dealWarnings, ...reportWarnings, ...annualWarnings]
  const sortedReports = sortReportsForSync(reports)
  const sortedAnnualReports = sortAnnualReportsForSync(annualReports)

  if (files.length === 0) {
    throw new Error('data/ledger/deals/ 下没有任何合作文件。')
  }
  for (const warning of warnings) {
    console.warn(`⚠ ${warning}`)
  }
  if (errors.length > 0) {
    for (const error of errors) console.error(`✗ ${error}`)
    throw new Error(`校验未通过（${errors.length} 个错误），已中止同步。先修复或运行 npm run ledger:validate。`)
  }

  const encrypted = records.filter((r) => r.settlement != null).length
  const encryptedSummaries = summaries.filter((r) => r.settlement != null).length

  if (dryRun) {
    console.log(`[dry-run] 校验通过：${records.length} 条合作（${encrypted} 条含加密结算），${sortedReports.length} 份推广报告，${sortedAnnualReports.length} 份年度总览，${summaries.length} 份运营支撑总结（${encryptedSummaries} 份含密文）。未写库。`)
    return
  }

  const { label, result } = await withClient(async (client) => {
    const dealsResult = await client.query(
      'select public.replace_commercial_deals($1::jsonb) as count',
      [JSON.stringify(records)]
    )
    const reportsResult = await client.query(
      'select public.replace_promotion_reports($1::jsonb) as count',
      [JSON.stringify(sortedReports)]
    )
    const annualResult = await client.query(
      'select public.replace_annual_reports($1::jsonb) as count',
      [JSON.stringify(sortedAnnualReports)]
    )
    const summariesResult = await client.query(
      'select public.replace_ops_support_summaries($1::jsonb) as count',
      [JSON.stringify(summaries)]
    )
    return {
      deals: dealsResult.rows[0]?.count ?? 0,
      reports: reportsResult.rows[0]?.count ?? 0,
      annualReports: annualResult.rows[0]?.count ?? 0,
      summaries: summariesResult.rows[0]?.count ?? 0
    }
  })

  console.log(`已同步到 Supabase（${label}）：commercial_deals ${result.deals} 条（${encrypted} 条含加密结算），promotion_reports ${result.reports} 份，annual_reports ${result.annualReports} 份，ops_support_summaries ${result.summaries} 份（${encryptedSummaries} 份含密文）。`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
