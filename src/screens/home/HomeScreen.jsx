// src/screens/home/HomeScreen.jsx
import { useNavigate } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import BottomNav from '../../components/BottomNav'
import { useAuth } from '../../context/AuthContext'

const TILES = [
  { path: '/jobsites/new', label: 'New Jobsite',  icon: '📍', desc: 'Start a new job or project' },
  { path: '/jobsites',     label: 'My Jobsites',  icon: '🏗',  desc: 'View all active sites' },
  { path: '/materials',    label: 'Materials',    icon: '📋', desc: 'Lists, checklists, orders' },
  { path: '/contacts',     label: 'Supply Squad', icon: '📞', desc: 'Vendors and trade contacts' },
  { path: '/home-jobs',    label: 'Home Jobs',    icon: '🏠', desc: 'Family project list' },
  { path: '/profile',      label: 'Settings',     icon: '⚙',  desc: 'Account and preferences' },
]

export default function HomeScreen() {
  const navigate = useNavigate()
  const { user } = useAuth()

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

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12
        }}>
          {TILES.map(tile => (
            <button
              key={tile.path}
              onClick={() => navigate(tile.path)}
              style={{
                background: 'var(--charcoal-mid)',
                border: '1px solid var(--charcoal-light)',
                borderRadius: 14,
                padding: '20px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.15s',
                WebkitAppearance: 'none'
              }}
              onTouchStart={e => e.currentTarget.style.borderColor = 'var(--orange)'}
              onTouchEnd={e => e.currentTarget.style.borderColor = 'var(--charcoal-light)'}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{tile.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--cream)', marginBottom: 4 }}>
                {tile.label}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>
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
