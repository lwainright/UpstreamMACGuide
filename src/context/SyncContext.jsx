// src/context/SyncContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { getLastSynced, setLastSynced } from '../services/sync'

const SyncContext = createContext(null)

export function SyncProvider({ children }) {
  const [online,      setOnline]      = useState(navigator.onLine)
  const [lastSynced,  setLastSyncedUI] = useState(getLastSynced())
  const [syncPending, setSyncPending]  = useState(false)

  useEffect(() => {
    const goOnline  = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online',  goOnline)
    window.addEventListener('offline', goOffline)

    // Update last synced display every 30 seconds
    const interval = setInterval(() => {
      setLastSyncedUI(getLastSynced())
    }, 30000)

    return () => {
      window.removeEventListener('online',  goOnline)
      window.removeEventListener('offline', goOffline)
      clearInterval(interval)
    }
  }, [])

  function markSynced() {
    setLastSynced()
    setLastSyncedUI(getLastSynced())
    setSyncPending(false)
  }

  const statusText = online
    ? (lastSynced || 'Not yet synced')
    : 'Offline — changes saved locally'

  return (
    <SyncContext.Provider value={{ online, lastSynced, statusText, syncPending, setSyncPending, markSynced }}>
      {children}
    </SyncContext.Provider>
  )
}

export function useSync() {
  return useContext(SyncContext)
}
