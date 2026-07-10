/** 浏览器端结算信封解析与设备私钥解密。 */

const LEGACY_ENVELOPE_VERSION = 1
const DEVICE_ENVELOPE_VERSION = 2
const EXPECTED_ALG = 'AES-256-GCM'
const EXPECTED_LEGACY_KDF = 'PBKDF2-SHA256'
const EXPECTED_WRAP_ALG = 'RSA-OAEP-256'

function base64ToBytes(value) {
  const binary = atob(String(value || ''))
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function bytesToBase64(value) {
  let binary = ''
  for (const byte of new Uint8Array(value)) binary += String.fromCharCode(byte)
  return btoa(binary)
}

export function parseSettlementEnvelope(raw) {
  if (raw == null || raw === '') return null
  let envelope = raw
  if (typeof raw === 'string') {
    try { envelope = JSON.parse(raw) } catch { throw new Error('SETTLEMENT_ENVELOPE_MALFORMED') }
  }
  if (!envelope || typeof envelope !== 'object' || envelope.alg !== EXPECTED_ALG) {
    throw new Error('SETTLEMENT_ENVELOPE_MALFORMED')
  }

  const commonValid = envelope.iv && envelope.ct && envelope.tag
  const legacyValid = envelope.v === LEGACY_ENVELOPE_VERSION
    && envelope.kdf === EXPECTED_LEGACY_KDF
    && Number.isFinite(Number(envelope.iter))
    && envelope.salt
  const deviceValid = envelope.v === DEVICE_ENVELOPE_VERSION
    && Array.isArray(envelope.recipients)
    && envelope.recipients.length > 0
    && new Set(envelope.recipients.map((recipient) => recipient?.kid)).size === envelope.recipients.length
    && envelope.recipients.every((recipient) => (
      recipient?.kid && recipient?.alg === EXPECTED_WRAP_ALG && recipient?.ek
    ))
  if (!commonValid || (!legacyValid && !deviceValid)) {
    throw new Error('SETTLEMENT_ENVELOPE_MALFORMED')
  }
  return envelope
}

export function getSettlementEnvelopeVersion(raw) {
  try { return Number(parseSettlementEnvelope(raw)?.v || 0) } catch { return 0 }
}

export function isEncryptedSettlement(raw) {
  return getSettlementEnvelopeVersion(raw) > 0
}

export function isLegacySettlement(raw) {
  return getSettlementEnvelopeVersion(raw) === LEGACY_ENVELOPE_VERSION
}

export function isDeviceSettlement(raw) {
  return getSettlementEnvelopeVersion(raw) === DEVICE_ENVELOPE_VERSION
}

export async function decryptSettlementWithDevice(raw, device) {
  const envelope = parseSettlementEnvelope(raw)
  if (!envelope) return null
  if (envelope.v !== DEVICE_ENVELOPE_VERSION) throw new Error('SETTLEMENT_LEGACY_MIGRATION_REQUIRED')
  if (!device?.kid || !device?.privateKey) throw new Error('SETTLEMENT_DEVICE_KEY_REQUIRED')
  if (!globalThis.crypto?.subtle) throw new Error('SETTLEMENT_CRYPTO_UNAVAILABLE')

  const recipient = envelope.recipients.find((item) => item.kid === device.kid)
  if (!recipient) throw new Error('SETTLEMENT_DEVICE_NOT_AUTHORIZED')

  let dataKey
  let plainBuffer
  try {
    const rawDataKey = await crypto.subtle.decrypt(
      { name: 'RSA-OAEP' },
      device.privateKey,
      base64ToBytes(recipient.ek)
    )
    dataKey = await crypto.subtle.importKey('raw', rawDataKey, { name: 'AES-GCM' }, false, ['decrypt'])
    const ct = base64ToBytes(envelope.ct)
    const tag = base64ToBytes(envelope.tag)
    const combined = new Uint8Array(ct.length + tag.length)
    combined.set(ct, 0)
    combined.set(tag, ct.length)
    plainBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: base64ToBytes(envelope.iv) },
      dataKey,
      combined
    )
  } catch {
    throw new Error('SETTLEMENT_DECRYPT_FAILED')
  }

  try {
    return JSON.parse(new TextDecoder().decode(plainBuffer))
  } catch {
    throw new Error('SETTLEMENT_DECRYPT_FAILED')
  }
}

export async function decryptDealsSettlementWithDevice(deals, device) {
  const result = new Map()
  const unauthorized = []
  for (const deal of deals) {
    if (!isDeviceSettlement(deal?.settlement)) continue
    try {
      result.set(deal.id, await decryptSettlementWithDevice(deal.settlement, device))
    } catch (error) {
      if (error?.message === 'SETTLEMENT_DEVICE_NOT_AUTHORIZED') {
        unauthorized.push(deal.id)
        continue
      }
      throw error
    }
  }
  return { result, unauthorized }
}

/**
 * 受信任设备为新设备追加一个包装后的数据密钥。不会解密结算正文，iv/ct/tag 均保持不变。
 */
export async function rewrapSettlementForDevice(raw, currentDevice, targetDevice) {
  const envelope = parseSettlementEnvelope(raw)
  if (!envelope || envelope.v !== DEVICE_ENVELOPE_VERSION) {
    throw new Error('SETTLEMENT_DEVICE_ENVELOPE_REQUIRED')
  }
  if (!targetDevice?.kid || !targetDevice?.publicKeyJwk) {
    throw new Error('SETTLEMENT_TARGET_DEVICE_INVALID')
  }
  if (envelope.recipients.some((item) => item.kid === targetDevice.kid)) return raw

  const currentRecipient = envelope.recipients.find((item) => item.kid === currentDevice?.kid)
  if (!currentRecipient || !currentDevice?.privateKey) {
    throw new Error('SETTLEMENT_DEVICE_NOT_AUTHORIZED')
  }

  let rawDataKey
  let targetPublicKey
  let wrappedKey
  try {
    rawDataKey = await crypto.subtle.decrypt(
      { name: 'RSA-OAEP' },
      currentDevice.privateKey,
      base64ToBytes(currentRecipient.ek)
    )
    targetPublicKey = await crypto.subtle.importKey(
      'jwk',
      targetDevice.publicKeyJwk,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      false,
      ['encrypt']
    )
    wrappedKey = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, targetPublicKey, rawDataKey)
  } catch {
    throw new Error('SETTLEMENT_REWRAP_FAILED')
  }

  return JSON.stringify({
    ...envelope,
    recipients: [
      ...envelope.recipients,
      {
        kid: String(targetDevice.kid),
        ...(targetDevice.userId ? { userId: String(targetDevice.userId) } : {}),
        ...(targetDevice.label ? { label: String(targetDevice.label) } : {}),
        alg: EXPECTED_WRAP_ALG,
        ek: bytesToBase64(wrappedKey)
      }
    ]
  })
}

export async function rewrapDealsSettlementForDevice(deals, currentDevice, targetDevice) {
  const settlements = {}
  for (const deal of deals) {
    if (!isDeviceSettlement(deal?.settlement)) continue
    const next = await rewrapSettlementForDevice(deal.settlement, currentDevice, targetDevice)
    if (next !== deal.settlement) settlements[deal.id] = next
  }
  return settlements
}
