// src/components/BottomNav.jsx
import { useNavigate, useLocation } from 'react-router-dom'

const TABS = [
  { path: '/',          label: 'Home',     icon: '⊞' },
  { path: '/jobsites',  label: 'Jobs',     icon: '📍' },
  { path: '/materials', label: 'Materials',icon: '📋' },
  { path: '/contacts',  label: 'Contacts', icon: '👤' },
  { path: '/profile',   label: 'Profile',  icon: '⚙' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      height: 'var(--nav-height)',
      background: 'var(--charcoal)',
      borderTop: '1px solid var(--charcoal-light)',
      display: 'flex',
      alignItems: 'center',
      zIndex: 100
    }}>
      {TABS.map(tab => {
        const active = pathname === tab.path ||
          (tab.path !== '/' && pathname.startsWith(tab.path))
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 0',
              color: active ? 'var(--orange)' : 'var(--muted)',
              transition: 'color 0.15s'
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 400 }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
