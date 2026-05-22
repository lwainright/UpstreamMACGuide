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

      {/* Left — orange circle back button or logo */}
      <div style={{ width: 80, display: 'flex', alignItems: 'center' }}>
        {onBack ? (
          <button
            onClick={onBack}
            style={{
              width:          48,
              height:         48,
              borderRadius:   '50%',
              background:     '#E85C00',
              border:         'none',
              cursor:         'pointer',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              padding:        0,
              boxShadow:      '0 2px 8px rgba(232,92,0,0.4)',
              transition:     'transform 0.1s',
              flexShrink:     0
            }}
            onTouchStart={e => e.currentTarget.style.transform = 'scale(0.93)'}
            onTouchEnd={e =>   e.currentTarget.style.transform = 'scale(1)'}
            onMouseDown={e =>  e.currentTarget.style.transform = 'scale(0.93)'}
            onMouseUp={e =>    e.currentTarget.style.transform = 'scale(1)'}
          >
            <span style={{
              color:      '#000000',
              fontSize:   22,
              fontWeight: 900,
              lineHeight: 1,
              marginLeft: -2
            }}>&#8592;</span>
          </button>
        ) : (
          <img
            src="/icons/icon-192.png"
            alt="MAC"
            style={{ width: 40, height: 40, borderRadius: '50%' }}
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
