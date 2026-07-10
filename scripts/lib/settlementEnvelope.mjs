import crypto from 'node:crypto'

/**
 * 结算字段信封。
 *
 * v1（历史）：PBKDF2(passphrase) -> AES-256-GCM。
 * v2（当前）：随机 AES-256-GCM 数据密钥；数据密钥分别用每台站长设备的
 * RSA-OAEP-SHA256 公钥包装。服务端、数据库和 Git 始终只持有密文与公钥。
 */

export const LEGACY_ENVELOPE_VERSION = 1
export const ENVELOPE_VERSION = 2
export const ALG = 'AES-256-GCM'
export const LEGACY_KDF = 'PBKDF2-SHA256'
export const WRAP_ALG = 'RSA-OAEP-256'
export const ITERATIONS = 210000

const KEY_LENGTH = 32
const SALT_LENGTH = 16
const IV_LENGTH = 12

function toBase64(value) {
  return Buffer.from(value).toString('base64')
}

function fromBase64(value) {
  return Buffer.from(String(value || ''), 'base64')
}

function parseEnvelope(raw) {
  if (raw == null || raw === '') return null
  if (typeof raw === 'object' && !Array.isArray(raw)) return raw
  if (typeof raw !== 'string') return null
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

function deriveLegacyKey(passphrase, salt, iterations = ITERATIONS) {
  return crypto.pbkdf2Sync(String(passphrase), salt, iterations, KEY_LENGTH, 'sha256')
}

function encryptAesGcm(payload) {
  const key = crypto.randomBytes(KEY_LENGTH)
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const plaintext = Buffer.from(JSON.stringify(payload), 'utf8')
  const ct = Buffer.concat([cipher.update(plaintext), cipher.final()])
  return { key, iv, ct, tag: cipher.getAuthTag() }
}

function decryptAesGcm({ key, iv, ct, tag }) {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(ct), decipher.final()])
}

/** 仅供旧数据迁移。新结算不得继续使用口令信封。 */
export function encryptLegacySettlement(payload, passphrase) {
  if (!passphrase) throw new Error('SETTLEMENT_PASSPHRASE_REQUIRED')
  const salt = crypto.randomBytes(SALT_LENGTH)
  const iv = crypto.randomBytes(IV_LENGTH)
  const key = deriveLegacyKey(passphrase, salt)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const plaintext = Buffer.from(JSON.stringify(payload), 'utf8')
  const ct = Buffer.concat([cipher.update(plaintext), cipher.final()])

  return JSON.stringify({
    v: LEGACY_ENVELOPE_VERSION,
    alg: ALG,
    kdf: LEGACY_KDF,
    iter: ITERATIONS,
    salt: toBase64(salt),
    iv: toBase64(iv),
    ct: toBase64(ct),
    tag: toBase64(cipher.getAuthTag())
  })
}

/**
 * 使用已登记设备的公钥加密结算。
 * @param {object} payload
 * @param {{kid:string,userId?:string,label?:string,publicKeyJwk:object}[]} recipients
 */
export function encryptSettlement(payload, recipients) {
  const active = Array.isArray(recipients) ? recipients.filter(Boolean) : []
  if (active.length === 0) throw new Error('SETTLEMENT_DEVICE_PUBLIC_KEY_REQUIRED')

  const { key, iv, ct, tag } = encryptAesGcm(payload)
  const wrappedRecipients = active.map((recipient) => {
    if (!recipient.kid || !recipient.publicKeyJwk) {
      throw new Error('SETTLEMENT_DEVICE_PUBLIC_KEY_INVALID')
    }
    const publicKey = crypto.createPublicKey({ key: recipient.publicKeyJwk, format: 'jwk' })
    const wrappedKey = crypto.publicEncrypt(
      { key: publicKey, oaepHash: 'sha256', padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
      key
    )
    return {
      kid: String(recipient.kid),
      ...(recipient.userId ? { userId: String(recipient.userId) } : {}),
      ...(recipient.label ? { label: String(recipient.label) } : {}),
      alg: WRAP_ALG,
      ek: toBase64(wrappedKey)
    }
  })

  return JSON.stringify({
    v: ENVELOPE_VERSION,
    alg: ALG,
    iv: toBase64(iv),
    ct: toBase64(ct),
    tag: toBase64(tag),
    recipients: wrappedRecipients
  })
}

/** 仅供旧数据迁移和测试。 */
export function decryptLegacySettlement(raw, passphrase) {
  const envelope = parseEnvelope(raw)
  if (!envelope || envelope.v !== LEGACY_ENVELOPE_VERSION) {
    throw new Error('SETTLEMENT_LEGACY_ENVELOPE_REQUIRED')
  }
  if (!passphrase) throw new Error('SETTLEMENT_PASSPHRASE_REQUIRED')

  const key = deriveLegacyKey(passphrase, fromBase64(envelope.salt), Number(envelope.iter))
  const plaintext = decryptAesGcm({
    key,
    iv: fromBase64(envelope.iv),
    ct: fromBase64(envelope.ct),
    tag: fromBase64(envelope.tag)
  })
  return JSON.parse(plaintext.toString('utf8'))
}

/** 仅供自动化测试；生产浏览器私钥不可导出。 */
export function decryptSettlementWithPrivateKey(raw, kid, privateKeyJwk) {
  const envelope = parseEnvelope(raw)
  if (!envelope || envelope.v !== ENVELOPE_VERSION) {
    throw new Error('SETTLEMENT_DEVICE_ENVELOPE_REQUIRED')
  }
  const recipient = envelope.recipients.find((item) => item?.kid === kid)
  if (!recipient) throw new Error('SETTLEMENT_DEVICE_NOT_AUTHORIZED')

  const privateKey = crypto.createPrivateKey({ key: privateKeyJwk, format: 'jwk' })
  const key = crypto.privateDecrypt(
    { key: privateKey, oaepHash: 'sha256', padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
    fromBase64(recipient.ek)
  )
  const plaintext = decryptAesGcm({
    key,
    iv: fromBase64(envelope.iv),
    ct: fromBase64(envelope.ct),
    tag: fromBase64(envelope.tag)
  })
  return JSON.parse(plaintext.toString('utf8'))
}

export function getEnvelopeVersion(raw) {
  return Number(parseEnvelope(raw)?.v || 0)
}

export function isLegacyEnvelope(raw) {
  return getEnvelopeVersion(raw) === LEGACY_ENVELOPE_VERSION && isValidEnvelope(raw)
}

export function isDeviceEnvelope(raw) {
  return getEnvelopeVersion(raw) === ENVELOPE_VERSION && isValidEnvelope(raw)
}

export function isValidEnvelope(raw) {
  const envelope = parseEnvelope(raw)
  if (!envelope || envelope.alg !== ALG) return false

  if (envelope.v === LEGACY_ENVELOPE_VERSION) {
    return envelope.kdf === LEGACY_KDF
      && Number.isFinite(Number(envelope.iter))
      && [envelope.salt, envelope.iv, envelope.ct, envelope.tag].every(
        (value) => typeof value === 'string' && value.length > 0
      )
  }

  if (envelope.v === ENVELOPE_VERSION) {
    const recipientsValid = Array.isArray(envelope.recipients)
      && envelope.recipients.length > 0
      && envelope.recipients.every((recipient) => (
        recipient
        && typeof recipient.kid === 'string'
        && recipient.kid.length > 0
        && recipient.alg === WRAP_ALG
        && typeof recipient.ek === 'string'
        && recipient.ek.length > 0
      ))
      && new Set(envelope.recipients.map((recipient) => recipient.kid)).size === envelope.recipients.length
    return [envelope.iv, envelope.ct, envelope.tag].every(
      (value) => typeof value === 'string' && value.length > 0
    ) && recipientsValid
  }

  return false
}
