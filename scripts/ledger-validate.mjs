import process from 'node:process'
import { loadAndValidateDeals } from './lib/ledgerDeals.mjs'

/**
 * 校验 data/ledger/deals/*.json。本地与 CI 都用它做提交前门禁。
 * 有 error 时退出码非 0（阻断 CI）；warning 不阻断。
 *
 * 用法：npm run ledger:validate
 */

async function main() {
  const { files, records, errors, warnings } = await loadAndValidateDeals()

  if (files.length === 0) {
    console.error('data/ledger/deals/ 下没有任何合作文件。')
    process.exitCode = 1
    return
  }

  for (const warning of warnings) {
    console.warn(`⚠ ${warning}`)
  }

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`✗ ${error}`)
    }
    console.error(`\n校验未通过：${errors.length} 个错误，${records.length}/${files.length} 个文件已解析。`)
    process.exitCode = 1
    return
  }

  const encrypted = records.filter((r) => r.settlement != null).length
  console.log(`✓ 校验通过：${records.length} 条合作，${encrypted} 条含加密结算，${warnings.length} 个告警。`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
