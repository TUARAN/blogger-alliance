const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

function base64ToBytes(base64) {
  const normalized = (base64 || '').replace(/\s+/g, '')
  const binaryString = atob(normalized)
  const len = binaryString.length
  const bytes = new Uint8Array(len)

  for (let i = 0; i < len; i += 1) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return bytes
}

async function deriveAesKey(credential, salt, iterations = 150000) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(credential),
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
    keyMaterial,
    {
      name: 'AES-GCM',
      length: 256
    },
    false,
    ['decrypt']
  )
}

export async function decryptJsonPayload(payload, credential) {
  if (!credential?.trim()) {
    throw new Error('EMPTY_CREDENTIAL')
  }

  if (!crypto?.subtle) {
    throw new Error('WEB_CRYPTO_UNAVAILABLE')
  }

  const salt = base64ToBytes(payload.salt)
  const iv = base64ToBytes(payload.iv)
  const encryptedBytes = base64ToBytes(payload.ciphertext)

  const key = await deriveAesKey(credential, salt, payload.iterations || 150000)
  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    encryptedBytes
  )

  return JSON.parse(textDecoder.decode(decrypted))
}
