import process from 'node:process'
import { loadAndValidateDeals } from './lib/ledgerDeals.mjs'
import { withClient } from './lib/supabaseDb.mjs'

/**
 * 把 data/ledger/deals/*.json 同步到 Supabase 的 commercial_deals。
 *
 * 流程：读取 → 校验（有错即中止）→ 调用 replace_commercial_deals(jsonb) 全量覆盖。
 * settlement 密文随记录写入 settlement_cipher 列；明文金额从不离开本地。
 *
 * 用法：
 *   npm run ledger:sync             # 校验并写库
 *   npm run ledger:sync -- --dry-run  # 只校验、统计，不连库
 */

async function main() {
  const dryRun = process.argv.includes('--dry-run')

  const { files, records, errors, warnings } = await loadAndValidateDeals()

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

  if (dryRun) {
    console.log(`[dry-run] 校验通过：${records.length} 条合作，${encrypted} 条含加密结算。未写库。`)
    return
  }

  const { label, result } = await withClient(async (client) => {
    const { rows } = await client.query(
      'select public.replace_commercial_deals($1::jsonb) as count',
      [JSON.stringify(records)]
    )
    return rows[0]?.count ?? 0
  })

  console.log(`已同步到 Supabase（${label}）：commercial_deals ${result} 条，其中 ${encrypted} 条含加密结算。`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
