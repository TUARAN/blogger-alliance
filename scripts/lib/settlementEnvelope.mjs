import crypto from 'node:crypto'

/**
 * 结算金额「字段级加密」——Node 端加密 / 信封格式校验。
 *
 * 信封格式必须与浏览器端 src/utils/settlementCrypto.js 完全一致：
 *   { v, alg, kdf, iter, salt, iv, ct, tag }（salt/iv/ct/tag 均为 base64）
 *
 * 算法：AES-256-GCM；密钥 = PBKDF2-HMAC-SHA256(passphrase, salt, ITERATIONS)。
 */

export const ENVELOPE_VERSION = 1
export const ALG = 'AES-256-GCM'
export const KDF = 'PBKDF2-SHA256'
export const ITERATIONS = 210000
const KEY_LENGTH = 32 // AES-256
const SALT_LENGTH = 16
const IV_LENGTH = 12 // GCM 推荐 96-bit

function deriveKey(passphrase, salt, iterations = ITERATIONS) {
  return crypto.pbkdf2Sync(String(passphrase), salt, iterations, KEY_LENGTH, 'sha256')
}

/**
 * 加密一个结算明文对象，返回信封串（JSON 字符串）。
 * @param {{forward?: string, backward?: string, opsSupport?: string, detail?: string}} payload
 * @param {string} passphrase
 * @returns {string}
 */
export function encryptSettlement(payload, passphrase) {
  if (!passphrase) {
    throw new Error('SETTLEMENT_PASSPHRASE_REQUIRED')
  }

  const salt = crypto.randomBytes(SALT_LENGTH)
  const iv = crypto.randomBytes(IV_LENGTH)
  const key = deriveKey(passphrase, salt)

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const plaintext = Buffer.from(JSON.stringify(payload), 'utf8')
  const ct = Buffer.concat([cipher.update(plaintext), cipher.final()])
  const tag = cipher.getAuthTag()

  return JSON.stringify({
    v: ENVELOPE_VERSION,
    alg: ALG,
    kdf: KDF,
    iter: ITERATIONS,
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ct: ct.toString('base64'),
    tag: tag.toString('base64')
  })
}

/**
 * 解密（仅供脚本/测试用，owner 本地校验往返）。
 */
export function decryptSettlement(raw, passphrase) {
  const envelope = parseEnvelope(raw)
  if (!envelope) return null

  const salt = Buffer.from(envelope.salt, 'base64')
  const iv = Buffer.from(envelope.iv, 'base64')
  const ct = Buffer.from(envelope.ct, 'base64')
  const tag = Buffer.from(envelope.tag, 'base64')
  const key = deriveKey(passphrase, salt, Number(envelope.iter))

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  const plaintext = Buffer.concat([decipher.update(ct), decipher.final()])
  return JSON.parse(plaintext.toString('utf8'))
}

export function parseEnvelope(raw) {
  if (raw == null || raw === '') return null
  let envelope = raw
  if (typeof raw === 'string') {
    try {
      envelope = JSON.parse(raw)
    } catch {
      return null
    }
  }
  if (!envelope || typeof envelope !== 'object') return null
  return envelope
}

/**
 * 仅校验信封结构是否合法（不解密、不需要密码短语）。供 ledger:validate 使用。
 */
export function isValidEnvelope(raw) {
  const envelope = parseEnvelope(raw)
  if (!envelope) return false

  return (
    envelope.v === ENVELOPE_VERSION &&
    envelope.alg === ALG &&
    envelope.kdf === KDF &&
    Number.isFinite(Number(envelope.iter)) &&
    typeof envelope.salt === 'string' && envelope.salt.length > 0 &&
    typeof envelope.iv === 'string' && envelope.iv.length > 0 &&
    typeof envelope.ct === 'string' && envelope.ct.length > 0 &&
    typeof envelope.tag === 'string' && envelope.tag.length > 0
  )
}
