// src/screens/home/HomeScreen.jsx
import { useNavigate } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import BottomNav from '../../components/BottomNav'
import { useAuth } from '../../context/AuthContext'

const TILES = [
  { path: '/jobsites/new', label: 'New Jobsite',  desc: 'Start a new job',        icon: '📍', accent: '#E85C00' },
  { path: '/jobsites',     label: 'My Jobsites',  desc: 'View all active sites',  icon: '🏗',  accent: '#2D8653' },
  { path: '/materials',    label: 'Materials',    desc: 'Lists & checklists',      icon: '📋', accent: '#2176AE' },
  { path: '/contacts',     label: 'Supply Squad', desc: 'Vendors & trades',        icon: '📞', accent: '#7B2D8B' },
  { path: '/home-jobs',    label: 'Home Jobs',    desc: 'Family project list',     icon: '🏠', accent: '#C4861A' },
  { path: '/profile',      label: 'Settings',     desc: 'Account & preferences',  icon: '⚙️', accent: '#555555' },
]

export default function HomeScreen() {
  const navigate  = useNavigate()
  const { user }  = useAuth()
  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <>
      <AppHeader title="MAC Guide" />

      <div className="screen">
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>Hey {firstName} 👋</h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>
            What are we building today?
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {TILES.map(tile => (
            <button
              key={tile.path}
              onClick={() => navigate(tile.path)}
              style={{
                background:       'var(--charcoal-mid)',
                border:           '1px solid var(--charcoal-light)',
                borderTop:        `3px solid ${tile.accent}`,
                borderRadius:     14,
                padding:          '20px 12px',
                cursor:           'pointer',
                textAlign:        'center',
                display:          'flex',
                flexDirection:    'column',
                alignItems:       'center',
                gap:              8,
                transition:       'transform 0.1s',
                WebkitAppearance: 'none'
              }}
              onTouchStart={e => e.currentTarget.style.transform = 'scale(0.96)'}
              onTouchEnd={e =>   e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                width:          48,
                height:         48,
                borderRadius:   14,
                background:     `${tile.accent}22`,
                border:         `1px solid ${tile.accent}44`,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       24
              }}>
                {tile.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--cream)' }}>
                {tile.label}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.4 }}>
                {tile.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </>
  )
}
