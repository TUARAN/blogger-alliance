/**
 * 结算金额「字段级加密」——浏览器端解密。
 *
 * 信封格式（与 scripts/lib/settlementEnvelope.mjs 保持一致）：
 *   {
 *     "v": 1,
 *     "alg": "AES-256-GCM",
 *     "kdf": "PBKDF2-SHA256",
 *     "iter": 210000,
 *     "salt": "<base64>",
 *     "iv":   "<base64>",
 *     "ct":   "<base64>",   // 密文（不含 tag）
 *     "tag":  "<base64>"    // GCM 认证标签
 *   }
 *
 * 设计要点：
 * - 密码短语只活在内存里，绝不写入 localStorage / 任何持久化。
 * - 即使拿到密文（如越权读库），没有正确密码短语也解不出明文。
 * - 仅 owner（admin）会在台账页输入密码短语临时解锁。
 */

const ENVELOPE_VERSION = 1
const EXPECTED_ALG = 'AES-256-GCM'
const EXPECTED_KDF = 'PBKDF2-SHA256'

function base64ToBytes(value) {
  const binary = atob(String(value || ''))
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export function parseSettlementEnvelope(raw) {
  if (raw == null || raw === '') return null

  let envelope = raw
  if (typeof raw === 'string') {
    try {
      envelope = JSON.parse(raw)
    } catch {
      throw new Error('SETTLEMENT_ENVELOPE_MALFORMED')
    }
  }

  if (
    !envelope ||
    typeof envelope !== 'object' ||
    envelope.v !== ENVELOPE_VERSION ||
    envelope.alg !== EXPECTED_ALG ||
    envelope.kdf !== EXPECTED_KDF ||
    !Number.isFinite(Number(envelope.iter)) ||
    !envelope.salt ||
    !envelope.iv ||
    !envelope.ct ||
    !envelope.tag
  ) {
    throw new Error('SETTLEMENT_ENVELOPE_MALFORMED')
  }

  return envelope
}

export function isEncryptedSettlement(raw) {
  try {
    return parseSettlementEnvelope(raw) != null
  } catch {
    return false
  }
}

async function deriveKey(passphrase, salt, iterations) {
  const baseKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations,
      hash: 'SHA-256'
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  )
}

/**
 * 解密单个结算信封。
 * @returns {Promise<{forward?: string, backward?: string, opsSupport?: string, detail?: string}>}
 * @throws SETTLEMENT_ENVELOPE_MALFORMED | SETTLEMENT_DECRYPT_FAILED
 */
export async function decryptSettlement(raw, passphrase) {
  const envelope = parseSettlementEnvelope(raw)
  if (!envelope) return null

  if (!passphrase) {
    throw new Error('SETTLEMENT_PASSPHRASE_REQUIRED')
  }

  if (!globalThis.crypto?.subtle) {
    throw new Error('SETTLEMENT_CRYPTO_UNAVAILABLE')
  }

  const salt = base64ToBytes(envelope.salt)
  const iv = base64ToBytes(envelope.iv)
  const ct = base64ToBytes(envelope.ct)
  const tag = base64ToBytes(envelope.tag)

  // WebCrypto 的 AES-GCM 期望 密文 || tag 拼接在一起。
  const combined = new Uint8Array(ct.length + tag.length)
  combined.set(ct, 0)
  combined.set(tag, ct.length)

  let plainBuffer
  try {
    const key = await deriveKey(passphrase, salt, Number(envelope.iter))
    plainBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, combined)
  } catch {
    // 密码短语错误或密文被篡改都会走到这里（GCM 认证失败）。
    throw new Error('SETTLEMENT_DECRYPT_FAILED')
  }

  const text = new TextDecoder().decode(plainBuffer)
  try {
    return JSON.parse(text)
  } catch {
    // 兼容明文不是 JSON 的历史数据，原样返回。
    return { detail: text }
  }
}

/**
 * 用同一密码短语解密一批 deal，返回 id -> 明文对象 的映射。
 * 任一条解密失败即整体抛错（说明密码短语错误）。
 */
export async function decryptDealsSettlement(deals, passphrase) {
  const result = new Map()
  for (const deal of deals) {
    if (!isEncryptedSettlement(deal?.settlement)) continue
    const plain = await decryptSettlement(deal.settlement, passphrase)
    result.set(deal.id, plain)
  }
  return result
}
