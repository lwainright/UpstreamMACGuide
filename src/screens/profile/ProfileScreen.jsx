// src/screens/profile/ProfileScreen.jsx
import { useNavigate } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import BottomNav from '../../components/BottomNav'
import { useAuth } from '../../context/AuthContext'
import { useSync } from '../../context/SyncContext'

export default function ProfileScreen() {
  const navigate            = useNavigate()
  const { user, logout }    = useAuth()
  const { online, statusText } = useSync()

  async function handleLogout() {
    await logout()
    navigate('/auth/login', { replace: true })
  }

  return (
    <>
      <AppHeader title="Settings" onBack={() => navigate('/')} />

      <div className="screen">

        {/* Account */}
        <div className="section-title">Account</div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'var(--orange)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontWeight: 700, color: 'white', flexShrink: 0
            }}>
              {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                {user?.name || 'No name set'}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>
                {user?.email}
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--charcoal-light)', paddingTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
              <span style={{ color: 'var(--muted)' }}>User ID</span>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--muted)' }}>
                {user?.$id?.slice(0, 12)}...
              </span>
            </div>
          </div>
        </div>

        {/* Sync status */}
        <div className="section-title">Sync</div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: online ? 'var(--success)' : 'var(--warning)',
              flexShrink: 0
            }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>
                {online ? 'Online' : 'Offline'}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>{statusText}</div>
            </div>
          </div>
        </div>

        {/* App info */}
        <div className="section-title">App</div>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 10 }}>
            <span style={{ color: 'var(--muted)' }}>Version</span>
            <span>1.0.0</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 10 }}>
            <span style={{ color: 'var(--muted)' }}>Platform</span>
            <span>Upstream Initiative LLC</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: 'var(--muted)' }}>Product</span>
            <span>MAC Guide</span>
          </div>
        </div>

        {/* Logout */}
        <div style={{ marginTop: 24 }}>
          <button
            className="btn"
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid var(--danger)',
              color: 'var(--danger)',
              fontWeight: 600
            }}
          >
            Sign Out
          </button>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 11, marginTop: 24 }}>
          Upstream Initiative LLC &middot; upstreammacguide.netlify.app
        </p>
      </div>

      <BottomNav />
    </>
  )
}
