import process from 'node:process'
import { loadAndValidateDeals } from './lib/ledgerDeals.mjs'
import { loadDeviceRegistry } from './lib/settlementDevices.mjs'
import { isDeviceEnvelope, isLegacyEnvelope } from './lib/settlementEnvelope.mjs'

/**
 * 校验 data/ledger/deals/*.json。本地与 CI 都用它做提交前门禁。
 * 有 error 时退出码非 0（阻断 CI）；warning 不阻断。
 *
 * 用法：npm run ledger:validate
 */

async function main() {
  const { files, records, errors, warnings } = await loadAndValidateDeals()
  let devices = []
  try {
    devices = (await loadDeviceRegistry()).devices
  } catch (error) {
    errors.push(`data/ledger/keys/devices.json: ${error.message}`)
  }

  if (files.length === 0) {
    console.error('data/ledger/deals/ 下没有任何合作文件。')
    process.exitCode = 1
    return
  }

  const knownKids = new Set(devices.map((device) => device.kid))
  const activeKids = new Set(
    devices.filter((device) => device.revoked !== true).map((device) => device.kid)
  )
  for (const record of records.filter((item) => isDeviceEnvelope(item.settlement))) {
    const recipientKids = new Set(
      JSON.parse(record.settlement).recipients.map((recipient) => recipient.kid)
    )
    for (const kid of recipientKids) {
      if (!knownKids.has(kid)) errors.push(`${record.id}: v2 结算包含未登记设备 kid「${kid}」`)
    }
    for (const kid of activeKids) {
      if (!recipientKids.has(kid)) errors.push(`${record.id}: v2 结算尚未授权给有效设备 kid「${kid}」`)
    }
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
  const legacy = records.filter((r) => isLegacyEnvelope(r.settlement)).length
  const deviceEncrypted = records.filter((r) => isDeviceEnvelope(r.settlement)).length
  const activeDevices = devices.filter((device) => device.revoked !== true).length
  if (legacy > 0) console.warn(`⚠ ${legacy} 条结算仍是 v1 口令信封，需一次性迁移为设备密钥 v2。`)
  if (activeDevices === 0) console.warn('⚠ 尚未登记站长设备公钥，新结算暂时无法加密。')
  console.log(`✓ 校验通过：${records.length} 条合作，${encrypted} 条含加密结算（v1=${legacy}, v2=${deviceEncrypted}），受信任设备 ${activeDevices} 台，${warnings.length} 个字段告警。`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
