import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { withClient } from './lib/supabaseDb.mjs'

/**
 * 一次性回灌 promotion_reports / annual_reports。
 *
 * 背景：台账网页改只读后，reports/annual 不再有网页编辑器入口；deals 走
 * data/ledger + ledger:sync，而 reports/annual 暂仍以 private/*.source.json
 * 为本地源。本脚本读取这两个源文件，调用 replace_* RPC 全量覆盖回库。
 *
 * 用法：
 *   npm run ledger:restore-aux             # 写库
 *   npm run ledger:restore-aux -- --dry-run  # 只读源文件并统计，不连库
 *
 * 注：这两个源文件不含加密结算字段，无需密码短语。
 */

const SOURCES = {
  reports: {
    file: 'private/promotionReports.source.json',
    rpc: 'replace_promotion_reports',
    table: 'promotion_reports'
  },
  annual: {
    file: 'private/annualReports.source.json',
    rpc: 'replace_annual_reports',
    table: 'annual_reports'
  }
}

async function readRecords(relFile) {
  const abs = path.resolve(process.cwd(), relFile)
  let raw
  try {
    raw = await fs.readFile(abs, 'utf8')
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error(`找不到源文件：${relFile}`)
    }
    throw error
  }
  const parsed = JSON.parse(raw)
  const records = Array.isArray(parsed)
    ? parsed
    : parsed.reports || parsed.annualReports || []
  if (!Array.isArray(records)) {
    throw new Error(`${relFile} 解析后不是数组。`)
  }
  return records
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')

  const reports = await readRecords(SOURCES.reports.file)
  const annual = await readRecords(SOURCES.annual.file)

  console.log(`读取：promotion_reports ${reports.length} 条，annual_reports ${annual.length} 条。`)

  if (dryRun) {
    console.log('[dry-run] 未写库。')
    return
  }

  const { label } = await withClient(async (client) => {
    const r = await client.query(
      `select public.${SOURCES.reports.rpc}($1::jsonb) as count`,
      [JSON.stringify(reports)]
    )
    const a = await client.query(
      `select public.${SOURCES.annual.rpc}($1::jsonb) as count`,
      [JSON.stringify(annual)]
    )
    console.log(`已写入 promotion_reports ${r.rows[0]?.count ?? 0} 条。`)
    console.log(`已写入 annual_reports ${a.rows[0]?.count ?? 0} 条。`)
    return {}
  })

  console.log(`完成（连接：${label}）。`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
