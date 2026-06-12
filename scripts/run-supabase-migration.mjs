import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import pg from 'pg'

/**
 * Apply SQL files under supabase/migrations/ to the linked Supabase project.
 *
 * Usage:
 *   npm run supabase:migrate
 */

const { Client } = pg

function loadEnvLocal() {
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
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    env[trimmed.slice(0, index).trim()] = value
  }

  return env
}

function createClients(projectRef, password) {
  return [
    {
      label: 'direct',
      config: {
        host: `db.${projectRef}.supabase.co`,
        port: 5432,
        user: 'postgres',
        password,
        database: 'postgres',
        ssl: { rejectUnauthorized: false }
      }
    },
    {
      label: 'pooler-session',
      config: {
        host: 'aws-0-ap-northeast-1.pooler.supabase.com',
        port: 5432,
        user: `postgres.${projectRef}`,
        password,
        database: 'postgres',
        ssl: { rejectUnauthorized: false }
      }
    },
    {
      label: 'pooler-transaction',
      config: {
        host: 'aws-0-ap-northeast-1.pooler.supabase.com',
        port: 6543,
        user: `postgres.${projectRef}`,
        password,
        database: 'postgres',
        ssl: { rejectUnauthorized: false }
      }
    }
  ]
}

const env = loadEnvLocal()
const projectRef = env.VITE_SUPABASE_URL?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1]
const password = env.SUPABASE_DB_PASSWORD

if (!projectRef) {
  console.error('缺少 VITE_SUPABASE_URL，请先在 .env.local 中配置 Supabase 项目 URL。')
  process.exit(1)
}

if (!password) {
  console.error('缺少 SUPABASE_DB_PASSWORD。')
  console.error('请到 Supabase → Project Settings → Database → Database password 复制密码，')
  console.error('写入 .env.local：SUPABASE_DB_PASSWORD=你的数据库密码')
  process.exit(1)
}

const migrationsDir = resolve(process.cwd(), 'supabase/migrations')
const migrations = readdirSync(migrationsDir)
  .filter((fileName) => fileName.endsWith('.sql'))
  .sort((a, b) => a.localeCompare(b))
  .map((fileName) => ({
    fileName,
    sql: readFileSync(resolve(migrationsDir, fileName), 'utf8')
  }))

if (migrations.length === 0) {
  console.error('supabase/migrations/ 下没有可执行的 SQL 文件。')
  process.exit(1)
}

let lastError = null

for (const { label, config } of createClients(projectRef, password)) {
  const client = new Client(config)

  try {
    await client.connect()
    for (const migration of migrations) {
      await client.query(migration.sql)
      console.log(`已执行: ${migration.fileName}`)
    }
    const { rows } = await client.query(`
      select
        to_regclass('public.profiles') as profiles_table,
        to_regclass('public.commercial_deals') as deals_table,
        to_regclass('public.promotion_reports') as reports_table,
        to_regclass('public.annual_reports') as annual_table
    `)
    console.log(`迁移成功（${label}）。`, rows[0])
    await client.end()
    process.exit(0)
  } catch (error) {
    lastError = error
    console.error(`连接 ${label} 失败:`, error.message)
    await client.end().catch(() => {})
  }
}

console.error('迁移失败:', lastError?.message || '无法连接数据库')
process.exit(1)
