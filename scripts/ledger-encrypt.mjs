import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import readline from 'node:readline'
import { encryptSettlement, isValidEnvelope } from './lib/settlementEnvelope.mjs'
import { loadActiveRecipients } from './lib/settlementDevices.mjs'

/**
 * owner 本地录入结算，使用已登记设备公钥生成 v2 信封。
 * 私钥不参与加密，也不会离开站长浏览器；金额只存在于进程内存和已忽略的批量中转文件。
 */

const DEALS_DIR = path.resolve(process.cwd(), 'data/ledger/deals')

function getArg(flag) {
  const exact = process.argv.find((arg) => arg.startsWith(`${flag}=`))
  if (exact) return exact.slice(flag.length + 1)
  const index = process.argv.indexOf(flag)
  if (index >= 0 && process.argv[index + 1] && !process.argv[index + 1].startsWith('--')) {
    return process.argv[index + 1]
  }
  return undefined
}

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

async function readDealFile(dealId) {
  const filePath = path.join(DEALS_DIR, `${dealId}.json`)
  try {
    return { filePath, deal: JSON.parse(await fs.readFile(filePath, 'utf8')) }
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error(`找不到合作文件：${path.relative(process.cwd(), filePath)}`)
    }
    throw error
  }
}

async function writeSettlement(dealId, envelope) {
  const { filePath, deal } = await readDealFile(dealId)
  deal.settlement = envelope
  await fs.writeFile(filePath, `${JSON.stringify(deal, null, 2)}\n`, 'utf8')
  return path.relative(process.cwd(), filePath)
}

function encryptAndCheck(payload, recipients) {
  const envelope = encryptSettlement(payload, recipients)
  if (!isValidEnvelope(envelope)) throw new Error('加密自检失败：生成的 v2 信封无效')
  return envelope
}

async function runBatch(batchPath, recipients) {
  const raw = await fs.readFile(path.resolve(process.cwd(), batchPath), 'utf8')
  const worksheet = JSON.parse(raw)
  const ids = Object.keys(worksheet)
  if (ids.length === 0) {
    console.log('工作表为空，无需加密。')
    return
  }

  let encryptedCount = 0
  for (const id of ids) {
    const payload = Object.fromEntries(
      Object.entries(worksheet[id] || {}).filter(([, value]) => value !== undefined && value !== '')
    )
    if (Object.keys(payload).length === 0) continue
    const rel = await writeSettlement(id, encryptAndCheck(payload, recipients))
    encryptedCount += 1
    console.log(`✓ ${id} → ${rel}`)
  }
  console.log(`\n已用 ${recipients.length} 台受信任设备的公钥加密 ${encryptedCount} 条结算。务必删除明文工作表。`)
}

async function main() {
  const dealId = getArg('--deal')
  const batchPath = getArg('--batch')
  const recipients = await loadActiveRecipients()
  if (recipients.length === 0) {
    throw new Error('尚未登记站长设备公钥。请在台账页启用本设备、导出公钥，再运行 npm run ledger:device -- add --file=<文件>。')
  }

  if (batchPath) return runBatch(batchPath, recipients)

  let payload = {
    forward: getArg('--forward'),
    backward: getArg('--backward'),
    opsSupport: getArg('--opsSupport'),
    detail: getArg('--detail')
  }
  if (Object.values(payload).every((value) => value === undefined)) {
    payload = {
      forward: await ask('前向结算金额（可空）：'),
      backward: await ask('后向结算金额（可空）：'),
      opsSupport: await ask('运营支撑结算金额（可空）：'),
      detail: await ask('结算详情备注（可空）：')
    }
  }
  payload = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== '')
  )
  if (Object.keys(payload).length === 0) throw new Error('四个结算字段全为空，无需加密。')

  const envelope = encryptAndCheck(payload, recipients)
  if (!dealId) {
    throw new Error('为避免密文进入终端日志，v2 加密必须指定 --deal=<合作编码> 或 --batch=<明文中转文件>。')
  }
  const rel = await writeSettlement(dealId, envelope)
  console.log(`已用 ${recipients.length} 台受信任设备的公钥写入 ${rel}。`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
