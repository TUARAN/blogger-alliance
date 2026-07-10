import { openDB } from 'idb'

const DB_NAME = 'blogger-alliance-settlement-keys'
const DB_VERSION = 1
const STORE_NAME = 'device-keys'
const RSA_ALGORITHM = {
  name: 'RSA-OAEP',
  modulusLength: 3072,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: 'SHA-256'
}

function assertCryptoAvailable() {
  if (!globalThis.crypto?.subtle || !globalThis.indexedDB) {
    throw new Error('SETTLEMENT_DEVICE_CRYPTO_UNAVAILABLE')
  }
}

function bytesToBase64Url(bytes) {
  let binary = ''
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

async function openKeyDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME)
    }
  })
}

export async function getSettlementDeviceKey(userId) {
  assertCryptoAvailable()
  if (!userId) return null
  const db = await openKeyDb()
  const record = await db.get(STORE_NAME, String(userId))
  if (!record?.privateKey || !record?.publicKeyJwk || !record?.kid) return null
  return record
}

export async function createSettlementDeviceKey(userId, label) {
  assertCryptoAvailable()
  if (!userId) throw new Error('SETTLEMENT_DEVICE_USER_REQUIRED')
  const existing = await getSettlementDeviceKey(userId)
  if (existing) return existing

  // WebCrypto 会令公钥可导出、私钥遵循 extractable=false；私钥只能留在本浏览器中使用。
  const keyPair = await crypto.subtle.generateKey(RSA_ALGORITHM, false, ['encrypt', 'decrypt'])
  const [spki, publicKeyJwk] = await Promise.all([
    crypto.subtle.exportKey('spki', keyPair.publicKey),
    crypto.subtle.exportKey('jwk', keyPair.publicKey)
  ])
  const fingerprint = await crypto.subtle.digest('SHA-256', spki)
  const record = {
    userId: String(userId),
    kid: `sha256:${bytesToBase64Url(fingerprint)}`,
    label: String(label || '站长设备'),
    publicKeyJwk,
    privateKey: keyPair.privateKey,
    createdAt: new Date().toISOString()
  }
  const db = await openKeyDb()
  await db.put(STORE_NAME, record, String(userId))
  return record
}

export function getDefaultDeviceLabel() {
  const platform = navigator.userAgentData?.platform || navigator.platform || '浏览器'
  return `${platform} · ${new Date().toLocaleDateString('zh-CN')}`
}

export function toPublicDeviceConfig(record) {
  if (!record?.kid || !record?.publicKeyJwk) {
    throw new Error('SETTLEMENT_DEVICE_KEY_MISSING')
  }
  return {
    kid: record.kid,
    label: record.label,
    userId: record.userId,
    publicKeyJwk: record.publicKeyJwk,
    createdAt: record.createdAt
  }
}
