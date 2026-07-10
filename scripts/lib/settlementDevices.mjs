import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'

export const DEVICE_REGISTRY_PATH = path.resolve(process.cwd(), 'data/ledger/keys/devices.json')

function validatePublicJwk(jwk) {
  return Boolean(
    jwk
    && typeof jwk === 'object'
    && jwk.kty === 'RSA'
    && typeof jwk.n === 'string'
    && jwk.n.length > 0
    && typeof jwk.e === 'string'
    && jwk.e.length > 0
  )
}

function fingerprintPublicJwk(jwk) {
  const key = crypto.createPublicKey({ key: jwk, format: 'jwk' })
  const spki = key.export({ type: 'spki', format: 'der' })
  return `sha256:${crypto.createHash('sha256').update(spki).digest('base64url')}`
}

export function validateDevice(device) {
  if (!device || typeof device !== 'object') return '设备配置必须是对象'
  if (!String(device.kid || '').trim()) return '缺少 kid'
  if (!String(device.label || '').trim()) return '缺少 label'
  if (!validatePublicJwk(device.publicKeyJwk)) return 'publicKeyJwk 不是有效的 RSA 公钥'
  try {
    if (fingerprintPublicJwk(device.publicKeyJwk) !== device.kid) return 'kid 与公钥指纹不匹配'
  } catch {
    return 'publicKeyJwk 无法导入'
  }
  return ''
}

export async function loadDeviceRegistry() {
  let registry
  try {
    registry = JSON.parse(await fs.readFile(DEVICE_REGISTRY_PATH, 'utf8'))
  } catch (error) {
    if (error?.code === 'ENOENT') return { version: 1, devices: [] }
    throw new Error(`设备公钥清单读取失败：${error.message}`)
  }

  if (registry?.version !== 1 || !Array.isArray(registry.devices)) {
    throw new Error('设备公钥清单格式错误')
  }
  const seenKids = new Set()
  for (const device of registry.devices) {
    const error = validateDevice(device)
    if (error) throw new Error(`设备公钥清单格式错误（${device?.kid || 'unknown'}）：${error}`)
    if (seenKids.has(device.kid)) throw new Error(`设备公钥清单存在重复 kid：${device.kid}`)
    seenKids.add(device.kid)
  }
  return registry
}

export async function saveDeviceRegistry(registry) {
  await fs.mkdir(path.dirname(DEVICE_REGISTRY_PATH), { recursive: true })
  await fs.writeFile(DEVICE_REGISTRY_PATH, `${JSON.stringify(registry, null, 2)}\n`, 'utf8')
}

export async function loadActiveRecipients() {
  const registry = await loadDeviceRegistry()
  return registry.devices.filter((device) => device.revoked !== true)
}
