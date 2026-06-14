import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import pg from 'pg'

/**
 * Supabase Postgres 连接助手（与 run-supabase-migration.mjs 同款连接策略）。
 */

const { Client } = pg

export function loadEnvLocal() {
  const envPath = resolve(process.cwd(), '.env.local')
  const content = readFileSync(envPath, 'utf8')
  const env = {}

  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const index = trimmed.indexOf('=')
    if (index === -1) continue

    let value = trimmed.slice(index + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    env[trimmed.slice(0, index).trim()] = value
  }

  return env
}

function createClientConfigs(projectRef, password) {
  return [
    {
      label: 'direct',
      config: { host: `db.${projectRef}.supabase.co`, port: 5432, user: 'postgres', password, database: 'postgres', ssl: { rejectUnauthorized: false } }
    },
    {
      label: 'pooler-session',
      config: { host: 'aws-0-ap-northeast-1.pooler.supabase.com', port: 5432, user: `postgres.${projectRef}`, password, database: 'postgres', ssl: { rejectUnauthorized: false } }
    },
    {
      label: 'pooler-transaction',
      config: { host: 'aws-0-ap-northeast-1.pooler.supabase.com', port: 6543, user: `postgres.${projectRef}`, password, database: 'postgres', ssl: { rejectUnauthorized: false } }
    }
  ]
}

export function resolveProjectCredentials() {
  const env = loadEnvLocal()
  const projectRef = env.VITE_SUPABASE_URL?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1]
  const password = env.SUPABASE_DB_PASSWORD

  if (!projectRef) {
    throw new Error('缺少 VITE_SUPABASE_URL，请先在 .env.local 中配置 Supabase 项目 URL。')
  }
  if (!password) {
    throw new Error('缺少 SUPABASE_DB_PASSWORD（Supabase → Project Settings → Database → Database password），写入 .env.local。')
  }

  return { projectRef, password }
}

/**
 * 依次尝试 direct / pooler 连接，连上后执行回调，失败则换下一个。
 * @param {(client: import('pg').Client) => Promise<T>} run
 * @returns {Promise<{ label: string, result: T }>}
 */
export async function withClient(run) {
  const { projectRef, password } = resolveProjectCredentials()
  let lastError = null

  for (const { label, config } of createClientConfigs(projectRef, password)) {
    const client = new Client(config)
    try {
      await client.connect()
      const result = await run(client)
      await client.end()
      return { label, result }
    } catch (error) {
      lastError = error
      console.error(`连接 ${label} 失败:`, error.message)
      await client.end().catch(() => {})
    }
  }

  throw new Error(`无法连接数据库：${lastError?.message || '未知错误'}`)
}
