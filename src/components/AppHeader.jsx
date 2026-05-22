// src/components/AppHeader.jsx
// Mirrors growAware AppHeader critical layout pattern
import { useSync } from '../context/SyncContext'

export default function AppHeader({ title, onBack, rightAction }) {
  const { online, statusText } = useSync()

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: 'var(--header-height)',
      background: 'var(--charcoal)',
      borderBottom: '1px solid var(--charcoal-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      zIndex: 100
    }}>
      {/* Left — back button */}
      <div style={{ width: 80 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: 'none', border: 'none', color: 'var(--orange)',
            fontSize: 24, cursor: 'pointer', padding: '4px 8px 4px 0'
          }}>
            &#8592;
          </button>
        )}
      </div>

      {/* Center — title + sync indicator */}
      <div style={{ textAlign: 'center', flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--cream)' }}>
          {title}
        </div>
        <div className="sync-bar" style={{ justifyContent: 'center' }}>
          <span className={`sync-dot ${online ? 'online' : 'offline'}`} />
          <span style={{ fontSize: 11 }}>{statusText}</span>
        </div>
      </div>

      {/* Right — action */}
      <div style={{ width: 80, display: 'flex', justifyContent: 'flex-end' }}>
        {rightAction}
      </div>
    </div>
  )
}
