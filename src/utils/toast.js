import { reactive } from 'vue'

const state = reactive({ items: [] })
let nextId = 0

export function showToast(message, options = {}) {
  const id = nextId++
  const duration = options.duration ?? 3000
  const item = {
    id,
    message,
    type: options.type || 'info'
  }
  state.items.push(item)
  setTimeout(() => {
    const idx = state.items.findIndex((t) => t.id === id)
    if (idx >= 0) state.items.splice(idx, 1)
  }, duration)
}

export const toastState = state
