import { openDB } from 'idb'

const DB_NAME = 'blogger-alliance-web-llm'
const STORE_NAME = 'sessions'
const DB_VERSION = 1

let dbPromise

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      }
    })
  }

  return dbPromise
}

export function createSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export function deriveSessionTitle(messages = []) {
  const firstUserMessage = messages.find((message) => message.role === 'user' && message.text?.trim())

  if (!firstUserMessage) {
    return '新会话'
  }

  return firstUserMessage.text.trim().slice(0, 18) || '新会话'
}

export function createEmptySession() {
  return {
    id: createSessionId(),
    title: '新会话',
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
}

export async function listSessions() {
  const db = await getDb()
  const sessions = await db.getAll(STORE_NAME)

  return sessions.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
}

export async function saveSession(session) {
  const db = await getDb()
  const payload = {
    ...session,
    title: deriveSessionTitle(session.messages),
    updatedAt: Date.now()
  }

  await db.put(STORE_NAME, payload)
  return payload
}

export async function removeSession(id) {
  const db = await getDb()
  await db.delete(STORE_NAME, id)
}
