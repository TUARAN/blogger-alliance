import process from 'node:process'
import { loadAndValidateDeals } from './lib/ledgerDeals.mjs'
import { loadAndValidateOpsSummaries } from './lib/ledgerOpsSummaries.mjs'
import { loadDeviceRegistry } from './lib/settlementDevices.mjs'
import { isDeviceEnvelope, isLegacyEnvelope } from './lib/settlementEnvelope.mjs'

/**
 * 校验 data/ledger/deals/*.json。本地与 CI 都用它做提交前门禁。
 * 有 error 时退出码非 0（阻断 CI）；warning 不阻断。
 *
 * 用法：npm run ledger:validate
 */

async function main() {
  const { files, records, errors: dealErrors, warnings } = await loadAndValidateDeals()
  const {
    files: summaryFiles,
    records: summaryRecords,
    errors: summaryErrors
  } = await loadAndValidateOpsSummaries()
  const errors = [...dealErrors, ...summaryErrors]
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
  const activeDevices = devices.filter((device) => device.revoked !== true)
  const pendingByKid = new Map()
  for (const device of devices) {
    if (device.pendingRecoveryIds === undefined) continue
    if (!Array.isArray(device.pendingRecoveryIds)
      || device.pendingRecoveryIds.some((id) => typeof id !== 'string' || !id.trim())
      || new Set(device.pendingRecoveryIds).size !== device.pendingRecoveryIds.length) {
      errors.push(`${device.kid}: pendingRecoveryIds 必须是不重复的合作或运营总结编码列表`)
      continue
    }
    pendingByKid.set(device.kid, new Set(device.pendingRecoveryIds))
  }
  const missingByKid = new Map()
  for (const record of [...records, ...summaryRecords].filter((item) => isDeviceEnvelope(item.settlement))) {
    const recipientKids = new Set(
      JSON.parse(record.settlement).recipients.map((recipient) => recipient.kid)
    )
    for (const kid of recipientKids) {
      if (!knownKids.has(kid)) errors.push(`${record.id}: v2 结算包含未登记设备 kid「${kid}」`)
    }
    for (const device of activeDevices) {
      if (recipientKids.has(device.kid)) continue
      if (!pendingByKid.get(device.kid)?.has(record.id)) {
        errors.push(`${record.id}: v2 结算尚未授权给有效设备 kid「${device.kid}」`)
      } else {
        if (!missingByKid.has(device.kid)) missingByKid.set(device.kid, new Set())
        missingByKid.get(device.kid).add(record.id)
      }
    }
  }
  for (const [kid, pendingIds] of pendingByKid) {
    for (const id of pendingIds) {
      if (!missingByKid.get(kid)?.has(id)) errors.push(`${kid}: ${id} 已无待恢复的设备授权，请移除 pendingRecoveryIds 中的编码`)
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
  const encryptedSummaries = summaryRecords.filter((r) => r.settlement != null).length
  const legacySummaries = summaryRecords.filter((r) => isLegacyEnvelope(r.settlement)).length
  const deviceEncryptedSummaries = summaryRecords.filter((r) => isDeviceEnvelope(r.settlement)).length
  const pendingCount = [...missingByKid.values()].reduce((count, ids) => count + ids.size, 0)
  if (legacy + legacySummaries > 0) console.warn(`⚠ ${legacy + legacySummaries} 条结算仍是 v1 口令信封，需一次性迁移为设备密钥 v2。`)
  if (activeDevices.length === 0) console.warn('⚠ 尚未登记站长设备公钥，新结算暂时无法加密。')
  if (pendingCount > 0) console.warn(`⚠ ${pendingCount} 条历史密文仍待新设备授权；仅在设备清单中逐条登记了待恢复编码。`)
  console.log(`✓ 校验通过：${records.length} 条合作，${encrypted} 条含加密结算（v1=${legacy}, v2=${deviceEncrypted}）；${summaryFiles.length} 份运营支撑总结，${encryptedSummaries} 份含密文（v1=${legacySummaries}, v2=${deviceEncryptedSummaries}）；受信任设备 ${activeDevices.length} 台，${warnings.length} 个字段告警。`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
