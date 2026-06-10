#!/usr/bin/env node
/**
 * Configure Supabase Auth URL (Site URL + Redirect URLs) via Management API.
 *
 * Requires SUPABASE_ACCESS_TOKEN (Personal Access Token from dashboard account/tokens).
 * Optional: SUPABASE_PROJECT_REF (defaults to pmgpykadirszazskjdhr).
 *
 * Usage:
 *   npm run supabase:auth-urls
 *   SUPABASE_ACCESS_TOKEN=sbp_xxx npm run supabase:auth-urls
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'pmgpykadirszazskjdhr'
const SITE_URL = process.env.SUPABASE_SITE_URL || 'https://blogger-alliance.cn'
const REDIRECT_URLS = (
  process.env.SUPABASE_REDIRECT_URLS
    || [
      'https://blogger-alliance.cn/auth/login',
      'http://localhost:3000/auth/login'
    ].join(',')
).split(',').map((url) => url.trim()).filter(Boolean)

function loadTokenFromEnvLocal() {
  try {
    const envPath = resolve(process.cwd(), '.env.local')
    const content = readFileSync(envPath, 'utf8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const idx = trimmed.indexOf('=')
      if (idx === -1) continue
      const key = trimmed.slice(0, idx).trim()
      if (key !== 'SUPABASE_ACCESS_TOKEN') continue
      let value = trimmed.slice(idx + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"'))
        || (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      return value
    }
  } catch {
    // .env.local is optional
  }
  return ''
}

const token = process.env.SUPABASE_ACCESS_TOKEN || loadTokenFromEnvLocal()

if (!token) {
  console.error(
    'Missing SUPABASE_ACCESS_TOKEN.\n'
    + 'Create one at https://supabase.com/dashboard/account/tokens\n'
    'Then run: SUPABASE_ACCESS_TOKEN=sbp_xxx npm run supabase:auth-urls'
  )
  process.exit(1)
}

const apiBase = `https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth`

async function request(method, body) {
  const response = await fetch(apiBase, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })

  const text = await response.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  if (!response.ok) {
    throw new Error(`${method} ${apiBase} failed (${response.status}): ${JSON.stringify(data)}`)
  }

  return data
}

console.log(`Project: ${PROJECT_REF}`)
console.log(`Site URL: ${SITE_URL}`)
console.log('Redirect URLs:', REDIRECT_URLS.join(', '))

const current = await request('GET')
console.log('\nCurrent Site URL:', current.site_url)
console.log('Current Redirect URLs:', current.uri_allow_list || '(empty)')

const existing = (current.uri_allow_list || '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean)

const mergedRedirects = [...new Set([...existing, ...REDIRECT_URLS])]

const updated = await request('PATCH', {
  site_url: SITE_URL,
  uri_allow_list: mergedRedirects.join(',')
})

console.log('\nUpdated Site URL:', updated.site_url)
console.log('Updated Redirect URLs:', updated.uri_allow_list)
console.log('\nDone.')
