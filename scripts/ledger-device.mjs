import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import {
  DEVICE_REGISTRY_PATH,
  loadDeviceRegistry,
  saveDeviceRegistry,
  validateDevice
} from './lib/settlementDevices.mjs'
import { isDeviceEnvelope, isValidEnvelope } from './lib/settlementEnvelope.mjs'

const DEALS_DIR = path.resolve(process.cwd(), 'data/ledger/deals')

function getArg(flag) {
  const exact = process.argv.find((arg) => arg.startsWith(`${flag}=`))
  if (exact) return exact.slice(flag.length + 1)
  const index = process.argv.indexOf(flag)
  return index >= 0 ? process.argv[index + 1] : undefined
}

async function addDevice(file) {
  if (!file) throw new Error('用法：npm run ledger:device -- add --file=<浏览器导出的公钥文件>')
  const device = JSON.parse(await fs.readFile(path.resolve(process.cwd(), file), 'utf8'))
  const validationError = validateDevice(device)
  if (validationError) throw new Error(`设备公钥无效：${validationError}`)

  const registry = await loadDeviceRegistry()
  const ownerUserId = registry.devices.find((item) => item.revoked !== true && item.userId)?.userId
  if (ownerUserId && device.userId !== ownerUserId) {
    throw new Error('新设备 userId 与已登记站长身份不一致')
  }
  const sameKid = registry.devices.find((item) => item.kid === device.kid)
  if (sameKid) {
    if (JSON.stringify(sameKid.publicKeyJwk) !== JSON.stringify(device.publicKeyJwk)) {
      throw new Error(`kid ${device.kid} 已存在，但公钥内容不同`)
    }
    console.log(`设备 ${device.kid} 已登记，无需重复添加。`)
    return
  }
  registry.devices.push({
    kid: String(device.kid),
    label: String(device.label),
    ...(device.userId ? { userId: String(device.userId) } : {}),
    publicKeyJwk: device.publicKeyJwk,
    createdAt: device.createdAt || new Date().toISOString(),
    revoked: false
  })
  await saveDeviceRegistry(registry)
  console.log(`已登记设备公钥 ${device.kid} → ${path.relative(process.cwd(), DEVICE_REGISTRY_PATH)}`)
}

function validateRewrappedEnvelope(previousRaw, nextRaw, targetKid) {
  if (!isDeviceEnvelope(previousRaw) || !isValidEnvelope(nextRaw)) {
    throw new Error('轮换包只能更新有效的 v2 设备密文')
  }
  const previous = JSON.parse(previousRaw)
  const next = JSON.parse(nextRaw)
  if (next.v !== previous.v || next.alg !== previous.alg
    || next.iv !== previous.iv || next.ct !== previous.ct || next.tag !== previous.tag) {
    throw new Error('轮换包改动了结算正文密文，已拒绝')
  }
  const nextByKid = new Map()
  for (const recipient of next.recipients) {
    if (nextByKid.has(recipient.kid)) throw new Error(`轮换包包含重复接收者：${recipient.kid}`)
    nextByKid.set(recipient.kid, recipient)
  }
  for (const recipient of previous.recipients) {
    const preserved = nextByKid.get(recipient.kid)
    if (!preserved || preserved.ek !== recipient.ek || preserved.alg !== recipient.alg) {
      throw new Error(`轮换包移除或改动了原接收者：${recipient.kid}`)
    }
  }
  if (!nextByKid.has(targetKid)) throw new Error('轮换包未包含目标设备接收者')
}

async function applyRewrap(file) {
  if (!file) throw new Error('用法：npm run ledger:device -- apply-rewrap --file=<轮换包>')
  const bundle = JSON.parse(await fs.readFile(path.resolve(process.cwd(), file), 'utf8'))
  if (bundle?.version !== 1 || !bundle?.targetDevice || !bundle?.settlements
    || typeof bundle.settlements !== 'object' || Array.isArray(bundle.settlements)) {
    throw new Error('设备轮换包格式无效')
  }
  const validationError = validateDevice(bundle.targetDevice)
  if (validationError) throw new Error(`目标设备公钥无效：${validationError}`)

  const registry = await loadDeviceRegistry()
  const ownerUserId = registry.devices.find((item) => item.revoked !== true && item.userId)?.userId
  if (ownerUserId && bundle.targetDevice.userId !== ownerUserId) {
    throw new Error('目标设备 userId 与已登记站长身份不一致')
  }

  const updates = []
  for (const [id, nextEnvelope] of Object.entries(bundle.settlements)) {
    const filePath = path.join(DEALS_DIR, `${id}.json`)
    const deal = JSON.parse(await fs.readFile(filePath, 'utf8'))
    if (deal.id !== id) throw new Error(`轮换包合作编码不匹配：${id}`)
    validateRewrappedEnvelope(deal.settlement, nextEnvelope, bundle.targetDevice.kid)
    deal.settlement = nextEnvelope
    updates.push({ filePath, deal })
  }

  const existing = registry.devices.find((item) => item.kid === bundle.targetDevice.kid)
  if (existing && JSON.stringify(existing.publicKeyJwk) !== JSON.stringify(bundle.targetDevice.publicKeyJwk)) {
    throw new Error(`kid ${bundle.targetDevice.kid} 已存在，但公钥内容不同`)
  }
  if (!existing) {
    registry.devices.push({ ...bundle.targetDevice, revoked: false })
  }

  for (const update of updates) {
    await fs.writeFile(update.filePath, `${JSON.stringify(update.deal, null, 2)}\n`, 'utf8')
  }
  await saveDeviceRegistry(registry)
  console.log(`已登记设备 ${bundle.targetDevice.kid}，并为其追加 ${updates.length} 条历史密文接收权限。`)
}

async function revokeDevice(kid) {
  if (!kid) throw new Error('用法：npm run ledger:device -- revoke --kid=<设备 kid>')
  const registry = await loadDeviceRegistry()
  const device = registry.devices.find((item) => item.kid === kid)
  if (!device) throw new Error(`找不到设备：${kid}`)
  device.revoked = true
  device.revokedAt = new Date().toISOString()
  await saveDeviceRegistry(registry)
  console.log(`已撤销设备公钥 ${kid}。旧密文仍需在受信任设备上轮换后才能移除该接收者。`)
}

async function listDevices() {
  const registry = await loadDeviceRegistry()
  if (registry.devices.length === 0) {
    console.log('尚未登记设备公钥。请先在站长台账页启用设备并导出公钥。')
    return
  }
  for (const device of registry.devices) {
    console.log(`${device.revoked ? 'revoked' : 'active'}\t${device.kid}\t${device.label}`)
  }
}

async function main() {
  const command = process.argv[2] || 'list'
  if (command === 'add') return addDevice(getArg('--file'))
  if (command === 'apply-rewrap') return applyRewrap(getArg('--file'))
  if (command === 'revoke') return revokeDevice(getArg('--kid'))
  if (command === 'list') return listDevices()
  throw new Error(`未知命令：${command}`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
