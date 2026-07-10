import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import readline from 'node:readline'
import {
  decryptLegacySettlement,
  encryptSettlement,
  isLegacyEnvelope,
  isValidEnvelope
} from './lib/settlementEnvelope.mjs'
import { loadActiveRecipients } from './lib/settlementDevices.mjs'
import { loadDealFiles } from './lib/ledgerDeals.mjs'

function askMasked(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const output = rl.output
  rl._writeToOutput = (value) => {
    if (value.includes('\n') || value.includes(question)) output.write(value)
    else output.write('*')
  }
  return new Promise((resolve) => rl.question(question, (answer) => {
    rl.close()
    process.stdout.write('\n')
    resolve(answer)
  }))
}

async function main() {
  const recipients = await loadActiveRecipients()
  if (recipients.length === 0) {
    throw new Error('尚未登记站长设备公钥，无法迁移。')
  }
  const passphrase = process.env.LEDGER_PASSPHRASE || await askMasked('旧结算密码短语（仅本次迁移，不回显）：')
  if (!passphrase) throw new Error('旧结算密码短语不能为空')

  const files = await loadDealFiles()
  const legacyFiles = files.filter(({ raw }) => {
    try { return isLegacyEnvelope(JSON.parse(raw)?.settlement) } catch { return false }
  })
  if (legacyFiles.length === 0) {
    console.log('没有 v1 旧密文，无需迁移。')
    return
  }

  const migrated = []
  // 先全部解密并在内存中验证；任一失败时不会改写任何文件。
  for (const file of legacyFiles) {
    const deal = JSON.parse(file.raw)
    const plaintext = decryptLegacySettlement(deal.settlement, passphrase)
    const envelope = encryptSettlement(plaintext, recipients)
    if (!isValidEnvelope(envelope)) throw new Error(`迁移自检失败：${deal.id}`)
    deal.settlement = envelope
    migrated.push({ filePath: file.filePath, deal, id: deal.id })
  }

  for (const item of migrated) {
    await fs.writeFile(item.filePath, `${JSON.stringify(item.deal, null, 2)}\n`, 'utf8')
    console.log(`✓ ${item.id} → ${path.relative(process.cwd(), item.filePath)}`)
  }
  console.log(`\n已将 ${migrated.length} 条 v1 结算迁移为设备密钥 v2 信封。请立即运行 npm run ledger:validate。`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
