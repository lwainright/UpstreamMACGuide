// src/components/AppHeader.jsx
import { useSync } from '../context/SyncContext'

export default function AppHeader({ title, onBack, rightAction }) {
  const { online, statusText } = useSync()

  return (
    <div style={{
      position:       'fixed',
      top: 0, left: 0, right: 0,
      height:         'var(--header-height)',
      background:     'var(--charcoal)',
      borderBottom:   '1px solid var(--charcoal-light)',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      padding:        '0 16px',
      zIndex:         100
    }}>
      {/* Left — back button or logo */}
      <div style={{ width: 80, display: 'flex', alignItems: 'center' }}>
        {onBack ? (
          <button
            onClick={onBack}
            style={{
              width:          38,
              height:         38,
              borderRadius:   '50%',
              background:     'var(--orange)',
              border:         'none',
              cursor:         'pointer',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexShrink:     0,
              transition:     'transform 0.1s, opacity 0.1s'
            }}
            onTouchStart={e => e.currentTarget.style.transform = 'scale(0.92)'}
            onTouchEnd={e =>   e.currentTarget.style.transform = 'scale(1)'}
          >
            {/* Black arrow */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M11.5 3.5L6 9L11.5 14.5"
                stroke="#111111"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <img
            src="/icons/icon-192.png"
            alt="MAC"
            style={{ width: 36, height: 36, borderRadius: '50%' }}
          />
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
