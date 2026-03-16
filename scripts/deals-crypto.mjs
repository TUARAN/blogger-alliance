import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { pathToFileURL } from 'node:url'

const cwd = process.cwd()

const DEFAULT_SOURCE_PATH = path.resolve(cwd, 'private/commercialDeals.source.json')
const DEFAULT_ENCRYPTED_JS_PATH = path.resolve(cwd, 'src/data/commercialDeals.encrypted.js')
const DEFAULT_PAYLOAD_EXPORT = 'encryptedCommercialDealsPayload'

const PAYLOAD_PRESETS = {
  deals: {
    sourcePath: DEFAULT_SOURCE_PATH,
    encryptedPath: DEFAULT_ENCRYPTED_JS_PATH,
    exportName: 'encryptedCommercialDealsPayload',
    label: '合作进度数据'
  },
  reports: {
    sourcePath: path.resolve(cwd, 'private/promotionReports.source.json'),
    encryptedPath: path.resolve(cwd, 'src/data/promotionReports.encrypted.js'),
    exportName: 'encryptedPromotionReportsPayload',
    label: '数据报告'
  }
}

function getArg(name) {
  const hit = process.argv.find((arg) => arg.startsWith(`${name}=`))
  return hit ? hit.slice(name.length + 1) : undefined
}

function normalizePath(inputPath, fallbackPath) {
  const finalPath = inputPath || fallbackPath
  return path.isAbsolute(finalPath) ? finalPath : path.resolve(cwd, finalPath)
}

function getPayloadConfig() {
  const payloadType = (getArg('--type') || 'deals').trim()
  const preset = PAYLOAD_PRESETS[payloadType]

  if (!preset) {
    throw new Error(`不支持的数据类型：${payloadType}。可选值：${Object.keys(PAYLOAD_PRESETS).join(', ')}`)
  }

  return {
    payloadType,
    sourcePath: normalizePath(getArg('--in'), preset.sourcePath),
    encryptedPath: normalizePath(getArg('--out'), preset.encryptedPath),
    exportName: getArg('--export') || preset.exportName,
    label: preset.label
  }
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

function encodePayloadAsModule(payload, exportName = DEFAULT_PAYLOAD_EXPORT) {
  const wrappedCiphertext = toWrappedBase64(payload.ciphertext)

  return `export const ${exportName} = {\n  version: ${payload.version},\n  algorithm: '${payload.algorithm}',\n  kdf: '${payload.kdf}',\n  hash: '${payload.hash}',\n  iterations: ${payload.iterations},\n  salt: '${payload.salt}',\n  iv: '${payload.iv}',\n  ciphertext: \`\n    ${wrappedCiphertext}\n  \`\n}\n`
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

async function loadPayloadFromModule(modulePath, exportName) {
  const moduleUrl = pathToFileURL(modulePath).href
  const imported = await import(`${moduleUrl}?t=${Date.now()}`)
  return imported[exportName]
}

async function runEncrypt() {
  const credential = getCredential()
  if (!credential) {
    throw new Error('缺少凭证：请传入 --credential=xxxx 或设置 DEALS_CREDENTIAL 环境变量。')
  }

  const { sourcePath, encryptedPath, exportName, label } = getPayloadConfig()

  const sourceText = await fs.readFile(sourcePath, 'utf8')
  const sourceData = JSON.parse(sourceText)

  if (!Array.isArray(sourceData)) {
    throw new Error('明文源数据必须是数组。')
  }

  const payload = encryptDealsData(sourceData, credential)
  const moduleText = encodePayloadAsModule(payload, exportName)

  await ensureDirForFile(encryptedPath)
  await fs.writeFile(encryptedPath, moduleText, 'utf8')

  console.log(`✅ ${label}已加密并写入: ${path.relative(cwd, encryptedPath)}`)
}

async function runDecrypt() {
  const credential = getCredential()
  if (!credential) {
    throw new Error('缺少凭证：请传入 --credential=xxxx 或设置 DEALS_CREDENTIAL 环境变量。')
  }

  const { sourcePath, encryptedPath, exportName, label } = getPayloadConfig()

  const payload = await loadPayloadFromModule(encryptedPath, exportName)
  if (!payload) {
    throw new Error(`未找到 ${exportName} 导出。`)
  }

  const data = decryptDealsData(payload, credential)

  await ensureDirForFile(sourcePath)
  await fs.writeFile(sourcePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')

  console.log(`✅ ${label}已解密并写入: ${path.relative(cwd, sourcePath)}`)
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

  console.log(`用法:\n  DEALS_CREDENTIAL=xxxx npm run deals:decrypt\n  DEALS_CREDENTIAL=xxxx npm run deals:encrypt\n  DEALS_CREDENTIAL=xxxx npm run reports:decrypt\n  DEALS_CREDENTIAL=xxxx npm run reports:encrypt\n\n可选参数:\n  --type=deals|reports\n  --in=路径   输入文件路径\n  --out=路径  输出文件路径\n  --export=名称  导出的 payload 常量名\n  --credential=凭证`)
}

main().catch((err) => {
  console.error(`❌ ${err.message}`)
  process.exit(1)
})
