// src/components/AppHeader.jsx
import { useSync } from '../context/SyncContext'

export default function AppHeader({ title, onBack, rightAction }) {
  const { online, statusText } = useSync()

  return (
    <div style={{
      position:       'fixed',
      top:            0,
      left:           0,
      right:          0,
      height:         'var(--header-height)',
      background:     'linear-gradient(180deg, #1c1c1c 0%, #141414 100%)',
      borderBottom:   '1px solid #2a2a2a',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      padding:        '0 16px',
      zIndex:         100
    }}>

      {/* Left — glossy back button or logo */}
      <div style={{ width: 80, display: 'flex', alignItems: 'center' }}>
        {onBack ? (
          <button
            onClick={onBack}
            style={{
              width:          48,
              height:         48,
              borderRadius:   '50%',
              padding:        0,
              border:         'none',
              cursor:         'pointer',
              position:       'relative',
              background:     'transparent',
              flexShrink:     0
            }}
            onMouseDown={e =>  e.currentTarget.querySelector('.btn-inner').style.transform = 'scale(0.92)'}
            onMouseUp={e =>    e.currentTarget.querySelector('.btn-inner').style.transform = 'scale(1)'}
            onTouchStart={e => e.currentTarget.querySelector('.btn-inner').style.transform = 'scale(0.92)'}
            onTouchEnd={e =>   e.currentTarget.querySelector('.btn-inner').style.transform = 'scale(1)'}
          >
            {/* Gold ring outer */}
            <div style={{
              position:     'absolute',
              inset:        0,
              borderRadius: '50%',
              background:   'linear-gradient(145deg, #c8a23a 0%, #f5d67a 30%, #a07820 60%, #e8c050 100%)',
              boxShadow:    '0 3px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(200,162,58,0.4)'
            }} />
            {/* Inner sphere */}
            <div
              className="btn-inner"
              style={{
                position:     'absolute',
                inset:        3,
                borderRadius: '50%',
                background:   'linear-gradient(145deg, #ff7a2a 0%, #e85c00 45%, #b83e00 100%)',
                boxShadow:    'inset 0 -3px 8px rgba(0,0,0,0.35)',
                transition:   'transform 0.12s ease',
                overflow:     'hidden'
              }}
            >
              {/* Gloss highlight */}
              <div style={{
                position:     'absolute',
                top:          '8%',
                left:         '18%',
                width:        '55%',
                height:       '38%',
                borderRadius: '50%',
                background:   'radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 70%)',
                transform:    'rotate(-20deg)'
              }} />
              {/* Arrow */}
              <div style={{
                position:       'absolute',
                inset:          0,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M13 4L7 10L13 16"
                    stroke="#000"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </button>
        ) : (
          <img
            src="/icons/icon-192.png"
            alt="MAC"
            style={{
              width:        40,
              height:       40,
              borderRadius: '50%',
              border:       '1.5px solid #333',
              boxShadow:    '0 2px 8px rgba(0,0,0,0.5)'
            }}
          />
        )}
      </div>

      {/* Center — title + sync */}
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

      {/* Right */}
      <div style={{ width: 80, display: 'flex', justifyContent: 'flex-end' }}>
        {rightAction}
      </div>
    </div>
  )
}
