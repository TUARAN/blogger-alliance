import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { pathToFileURL } from 'node:url'

const cwd = process.cwd()

const DEFAULT_SOURCE_PATH = path.resolve(cwd, 'private/commercialDeals.source.json')
const DEFAULT_ENCRYPTED_JS_PATH = path.resolve(cwd, 'src/data/commercialDeals.encrypted.js')

function getArg(name) {
  const hit = process.argv.find((arg) => arg.startsWith(`${name}=`))
  return hit ? hit.slice(name.length + 1) : undefined
}

function normalizePath(inputPath, fallbackPath) {
  const finalPath = inputPath || fallbackPath
  return path.isAbsolute(finalPath) ? finalPath : path.resolve(cwd, finalPath)
}

function getCredential() {
  const fromArg = getArg('--credential')
  const fromEnv = process.env.DEALS_CREDENTIAL
  return (fromArg || fromEnv || '').trim()
}

function toWrappedBase64(base64, width = 160) {
  const chunks = []
  for (let i = 0; i < base64.length; i += width) {
    chunks.push(base64.slice(i, i + width))
  }
  return chunks.join('\n    ')
}

function encodePayloadAsModule(payload) {
  const wrappedCiphertext = toWrappedBase64(payload.ciphertext)

  return `export const encryptedCommercialDealsPayload = {\n  version: ${payload.version},\n  algorithm: '${payload.algorithm}',\n  kdf: '${payload.kdf}',\n  hash: '${payload.hash}',\n  iterations: ${payload.iterations},\n  salt: '${payload.salt}',\n  iv: '${payload.iv}',\n  ciphertext: \`\n    ${wrappedCiphertext}\n  \`\n}\n`
}

function parseCiphertextBase64(value) {
  return (value || '').replace(/\s+/g, '')
}

function deriveKey(credential, salt, iterations) {
  return crypto.pbkdf2Sync(credential, salt, iterations, 32, 'sha256')
}

function encryptDealsData(data, credential) {
  const salt = crypto.randomBytes(16)
  const iv = crypto.randomBytes(12)
  const iterations = 150000
  const key = deriveKey(credential, salt, iterations)

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const plaintextBytes = Buffer.from(JSON.stringify(data), 'utf8')
  const encrypted = Buffer.concat([cipher.update(plaintextBytes), cipher.final()])
  const tag = cipher.getAuthTag()

  return {
    version: 1,
    algorithm: 'AES-GCM',
    kdf: 'PBKDF2',
    hash: 'SHA-256',
    iterations,
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ciphertext: Buffer.concat([encrypted, tag]).toString('base64')
  }
}

function decryptDealsData(payload, credential) {
  const salt = Buffer.from(payload.salt, 'base64')
  const iv = Buffer.from(payload.iv, 'base64')
  const encryptedAndTag = Buffer.from(parseCiphertextBase64(payload.ciphertext), 'base64')

  const encrypted = encryptedAndTag.subarray(0, encryptedAndTag.length - 16)
  const tag = encryptedAndTag.subarray(encryptedAndTag.length - 16)

  const key = deriveKey(credential, salt, payload.iterations || 150000)
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)

  const plaintext = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
  return JSON.parse(plaintext)
}

async function ensureDirForFile(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
}

async function loadPayloadFromModule(modulePath) {
  const moduleUrl = pathToFileURL(modulePath).href
  const imported = await import(`${moduleUrl}?t=${Date.now()}`)
  return imported.encryptedCommercialDealsPayload
}

async function runEncrypt() {
  const credential = getCredential()
  if (!credential) {
    throw new Error('缺少凭证：请传入 --credential=xxxx 或设置 DEALS_CREDENTIAL 环境变量。')
  }

  const sourcePath = normalizePath(getArg('--in'), DEFAULT_SOURCE_PATH)
  const outputPath = normalizePath(getArg('--out'), DEFAULT_ENCRYPTED_JS_PATH)

  const sourceText = await fs.readFile(sourcePath, 'utf8')
  const sourceData = JSON.parse(sourceText)

  if (!Array.isArray(sourceData)) {
    throw new Error('明文源数据必须是数组。')
  }

  const payload = encryptDealsData(sourceData, credential)
  const moduleText = encodePayloadAsModule(payload)

  await ensureDirForFile(outputPath)
  await fs.writeFile(outputPath, moduleText, 'utf8')

  console.log(`✅ 已加密并写入: ${path.relative(cwd, outputPath)}`)
}

async function runDecrypt() {
  const credential = getCredential()
  if (!credential) {
    throw new Error('缺少凭证：请传入 --credential=xxxx 或设置 DEALS_CREDENTIAL 环境变量。')
  }

  const inputPath = normalizePath(getArg('--in'), DEFAULT_ENCRYPTED_JS_PATH)
  const outputPath = normalizePath(getArg('--out'), DEFAULT_SOURCE_PATH)

  const payload = await loadPayloadFromModule(inputPath)
  if (!payload) {
    throw new Error('未找到 encryptedCommercialDealsPayload 导出。')
  }

  const data = decryptDealsData(payload, credential)

  await ensureDirForFile(outputPath)
  await fs.writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')

  console.log(`✅ 已解密并写入: ${path.relative(cwd, outputPath)}`)
}

async function main() {
  const command = process.argv[2]

  if (command === 'encrypt') {
    await runEncrypt()
    return
  }

  if (command === 'gen-pass') {
    runGenPass()
    return
  }

  console.log(`用法:\n  npm run deals:credential\n  DEALS_CREDENTIAL=xxxx npm run deals:decrypt\n  DEALS_CREDENTIAL=xxxx npm run deals:encrypt\n\n可选参数:\n  --in=路径   输入文件路径\n  --out=路径  输出文件路径\n  --credential=凭证`)
}

main().catch((err) => {
  console.error(`❌ ${err.message}`)
  process.exit(1)
})
