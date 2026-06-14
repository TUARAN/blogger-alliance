import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import readline from 'node:readline'
import { encryptSettlement, decryptSettlement } from './lib/settlementEnvelope.mjs'

/**
 * owner 本地把结算金额加密成信封串。
 *
 * 用法：
 *   # 交互式输入四个字段与密码短语，打印信封串
 *   node scripts/ledger-encrypt.mjs
 *
 *   # 直接写入某条合作文件的 settlement 字段
 *   node scripts/ledger-encrypt.mjs --deal=finclip-cpc-1
 *
 *   # 非交互（金额走参数，密码短语走环境变量）
 *   LEDGER_PASSPHRASE='***' node scripts/ledger-encrypt.mjs \
 *     --deal=finclip-cpc-1 --forward=1135.5 --backward= --opsSupport= --detail='已对公收，待开票'
 *
 * 密码短语永不入库、永不入 git；只在 owner 脑中 / 本地 .env（已 gitignore）。
 */

const DEALS_DIR = path.resolve(process.cwd(), 'data/ledger/deals')

function getArg(flag, fallback = undefined) {
  const exact = process.argv.find((arg) => arg.startsWith(`${flag}=`))
  if (exact) return exact.slice(flag.length + 1)
  const index = process.argv.indexOf(flag)
  if (index >= 0 && process.argv[index + 1] && !process.argv[index + 1].startsWith('--')) {
    return process.argv[index + 1]
  }
  return fallback
}

function hasFlag(flag) {
  return process.argv.includes(flag)
}

function ask(question, { mask = false } = {}) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  if (mask) {
    // 屏蔽密码短语回显。
    const output = rl.output
    rl._writeToOutput = (str) => {
      if (str.includes('\n') || str.includes(question)) {
        output.write(str)
      } else {
        output.write('*')
      }
    }
  }

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      if (mask) process.stdout.write('\n')
      resolve(answer)
    })
  })
}

async function resolvePassphrase() {
  if (process.env.LEDGER_PASSPHRASE) {
    return process.env.LEDGER_PASSPHRASE
  }
  const passphrase = await ask('结算密码短语（不回显）：', { mask: true })
  if (!passphrase) {
    throw new Error('密码短语不能为空')
  }
  return passphrase
}

async function readDealFile(dealId) {
  const filePath = path.join(DEALS_DIR, `${dealId}.json`)
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    return { filePath, deal: JSON.parse(raw) }
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

async function runBatch(batchPath, passphrase) {
  const raw = await fs.readFile(path.resolve(process.cwd(), batchPath), 'utf8')
  const worksheet = JSON.parse(raw)
  const ids = Object.keys(worksheet)
  if (ids.length === 0) {
    console.log('工作表为空，无需加密。')
    return
  }

  for (const id of ids) {
    const payload = Object.fromEntries(
      Object.entries(worksheet[id] || {}).filter(([, value]) => value !== undefined && value !== '')
    )
    if (Object.keys(payload).length === 0) continue

    const envelope = encryptSettlement(payload, passphrase)
    const roundtrip = decryptSettlement(envelope, passphrase)
    if (JSON.stringify(roundtrip) !== JSON.stringify(payload)) {
      throw new Error(`加密自检失败：${id}`)
    }
    const rel = await writeSettlement(id, envelope)
    console.log(`✓ ${id} → ${rel}`)
  }
  console.log(`\n已加密 ${ids.length} 条结算。务必不要提交明文工作表 ${batchPath}。`)
}

async function main() {
  const dealId = getArg('--deal')
  const batchPath = getArg('--batch')
  const verify = hasFlag('--verify')

  if (batchPath) {
    const passphrase = await resolvePassphrase()
    await runBatch(batchPath, passphrase)
    return
  }

  let payload = {
    forward: getArg('--forward'),
    backward: getArg('--backward'),
    opsSupport: getArg('--opsSupport'),
    detail: getArg('--detail')
  }

  const interactive = ['forward', 'backward', 'opsSupport', 'detail'].every(
    (key) => payload[key] === undefined
  )

  if (interactive) {
    payload = {
      forward: await ask('前向结算金额（可空）：'),
      backward: await ask('后向结算金额（可空）：'),
      opsSupport: await ask('运营支撑结算金额（可空）：'),
      detail: await ask('结算详情备注（可空）：')
    }
  }

  // 去掉空字段，保持明文紧凑。
  payload = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== '')
  )

  if (Object.keys(payload).length === 0) {
    throw new Error('四个结算字段全为空，无需加密。')
  }

  const passphrase = await resolvePassphrase()
  const envelope = encryptSettlement(payload, passphrase)

  // 自检往返，避免密码短语手误后写入错误密文。
  const roundtrip = decryptSettlement(envelope, passphrase)
  if (JSON.stringify(roundtrip) !== JSON.stringify(payload)) {
    throw new Error('加密自检失败（解密结果与输入不一致），已中止。')
  }

  if (dealId) {
    const rel = await writeSettlement(dealId, envelope)
    console.log(`已写入 ${rel} 的 settlement 字段。`)
  } else {
    console.log('\n请把下面这段 settlement 信封粘贴到对应合作文件：\n')
    console.log(envelope)
  }

  if (verify) {
    console.log('\n自检解密结果：')
    console.log(JSON.stringify(roundtrip, null, 2))
  }
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
