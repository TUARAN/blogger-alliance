import { createClient } from '@supabase/supabase-js'
import { ref, readonly } from 'vue'

const buildTimeUrl = import.meta.env.VITE_SUPABASE_URL
const buildTimeKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const client = ref(null)
const ready = ref(Boolean(buildTimeUrl && buildTimeKey))
let initPromise = null

function applyConfig(url, key) {
  if (!url || !key) {
    return false
  }

  client.value = createClient(url, key)
  ready.value = true
  return true
}

if (ready.value) {
  applyConfig(buildTimeUrl, buildTimeKey)
}

export const isSupabaseConfigured = readonly(ready)

export function getSupabaseClient() {
  return client.value
}

export async function initSupabase() {
  if (initPromise) {
    return initPromise
  }

  initPromise = (async () => {
    if (ready.value && client.value) {
      return client.value
    }

    if (applyConfig(buildTimeUrl, buildTimeKey)) {
      return client.value
    }

    try {
      const response = await fetch('/api/public/auth-config', { cache: 'no-store' })

      if (response.ok) {
        const data = await response.json()
        applyConfig(data.supabaseUrl, data.supabaseAnonKey)
      }
    } catch {
      // Local Vite dev without Worker falls back to build-time env only.
    }

    return client.value
  })()

  return initPromise
}
