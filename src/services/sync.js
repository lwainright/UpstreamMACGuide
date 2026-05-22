// src/services/sync.js
// Offline-first sync — IndexedDB local storage + Appwrite cloud sync
// Every object stamped with jobsiteCode at creation

const DB_NAME    = 'mac-guide-local'
const DB_VERSION = 1
const STORES     = ['jobsites', 'materials', 'notes', 'syncQueue']

let db = null

export async function openLocalDB() {
  if (db) return db
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = (e) => {
      const d = e.target.result
      STORES.forEach(store => {
        if (!d.objectStoreNames.contains(store)) {
          d.createObjectStore(store, { keyPath: 'id' })
        }
      })
    }
    req.onsuccess = (e) => { db = e.target.result; resolve(db) }
    req.onerror   = (e) => reject(e.target.error)
  })
}

export async function saveLocal(store, item) {
  const d = await openLocalDB()
  return new Promise((resolve, reject) => {
    const tx  = d.transaction(store, 'readwrite')
    const req = tx.objectStore(store).put({
      ...item,
      updatedAt:  new Date().toISOString(),
      syncStatus: item.syncStatus || 'local'
    })
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
}

export async function getAllLocal(store) {
  const d = await openLocalDB()
  return new Promise((resolve, reject) => {
    const tx  = d.transaction(store, 'readonly')
    const req = tx.objectStore(store).getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
}

export async function getLocal(store, id) {
  const d = await openLocalDB()
  return new Promise((resolve, reject) => {
    const tx  = d.transaction(store, 'readonly')
    const req = tx.objectStore(store).get(id)
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
}

export async function deleteLocal(store, id) {
  const d = await openLocalDB()
  return new Promise((resolve, reject) => {
    const tx  = d.transaction(store, 'readwrite')
    const req = tx.objectStore(store).delete(id)
    req.onsuccess = () => resolve()
    req.onerror   = () => reject(req.error)
  })
}

export async function queueForSync(action, store, item) {
  await saveLocal('syncQueue', {
    id:        `sq_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    action,
    store,
    item,
    retries:   0,
    createdAt: new Date().toISOString()
  })
}

export async function getSyncQueue() {
  return getAllLocal('syncQueue')
}

export async function removeFromQueue(id) {
  return deleteLocal('syncQueue', id)
}

export function generateJobsiteCode(name) {
  const prefix = (name || 'SITE')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .slice(0, 4)
    .padEnd(4, 'X')
  const num = String(Math.floor(Math.random() * 900) + 100)
  return `${prefix}-${num}`
}

export function localId() {
  return `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function setLastSynced() {
  localStorage.setItem('mac_last_synced', new Date().toISOString())
}

export function getLastSynced() {
  const ts = localStorage.getItem('mac_last_synced')
  if (!ts) return null
  const diff = Math.floor((Date.now() - new Date(ts)) / 1000)
  if (diff < 60)   return `Synced ${diff}s ago`
  if (diff < 3600) return `Synced ${Math.floor(diff / 60)}m ago`
  return `Synced ${Math.floor(diff / 3600)}h ago`
}
