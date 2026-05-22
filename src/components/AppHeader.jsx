// src/components/AppHeader.jsx
import { useSync } from '../context/SyncContext'

export default function AppHeader({ title, onBack, rightAction }) {
  const { online, statusText } = useSync()

  return (
    <div style={{
      position:       'fixed',
      top: 0, left: 0, right: 0,
      height:         'var(--header-height)',
      background:     'linear-gradient(180deg, #1f1f1f 0%, #1a1a1a 100%)',
      borderBottom:   '1px solid #333',
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
              width:          42,
              height:         42,
              borderRadius:   '50%',
              background:     'linear-gradient(145deg, #ff6b1a, #c44800)',
              border:         '1.5px solid rgba(255,107,26,0.4)',
              cursor:         'pointer',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              padding:        0,
              boxShadow:      '0 2px 12px rgba(232,92,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
              transition:     'all 0.15s ease',
              flexShrink:     0
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(232,92,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(232,92,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            onMouseDown={e =>  e.currentTarget.style.transform = 'scale(0.94) translateY(0)'}
            onMouseUp={e =>    e.currentTarget.style.transform = 'translateY(-1px)'}
            onTouchStart={e => e.currentTarget.style.transform = 'scale(0.94)'}
            onTouchEnd={e =>   e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8L10 13"
                stroke="#000"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <img
            src="/icons/icon-192.png"
            alt="MAC"
            style={{
              width:      38,
              height:     38,
              borderRadius: '50%',
              border:     '1.5px solid #333',
              boxShadow:  '0 2px 8px rgba(0,0,0,0.4)'
            }}
          />
        )}
      </div>

      {/* Center — title + sync indicator */}
      <div style={{ textAlign: 'center', flex: 1 }}>
        <div style={{
          fontWeight:    700,
          fontSize:      17,
          color:         '#f5f4f0',
          letterSpacing: '0.3px'
        }}>
          {title}
        </div>
        <div className="sync-bar" style={{ justifyContent: 'center', marginTop: 1 }}>
          <span className={`sync-dot ${online ? 'online' : 'offline'}`} />
          <span style={{ fontSize: 10, letterSpacing: '0.3px' }}>{statusText}</span>
        </div>
      </div>

      {/* Right — action */}
      <div style={{ width: 80, display: 'flex', justifyContent: 'flex-end' }}>
        {rightAction}
      </div>
    </div>
  )
}
