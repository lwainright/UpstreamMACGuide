// src/screens/splash/SplashScreen.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function SplashScreen() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    const timer = setTimeout(() => {
      navigate(user ? '/' : '/auth/login', { replace: true })
    }, 1800)
    return () => clearTimeout(timer)
  }, [user, loading])

  return (
    <div className="screen-full" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1a1a1a'
    }}>
      {/* Logo placeholder — replace with actual logo image */}
      <div style={{
        width: 160,
        height: 160,
        borderRadius: '50%',
        border: '3px solid var(--orange)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        background: 'var(--charcoal)'
      }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: 3, marginBottom: 4 }}>UPSTREAM</div>
        <div style={{ fontSize: 42, fontWeight: 900, color: 'var(--orange)', letterSpacing: -1 }}>MAC</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: 3, marginTop: 4 }}>GUIDE</div>
      </div>

      <div style={{ color: 'var(--muted)', fontSize: 14 }}>
        Materials &amp; Construction
      </div>

      {/* Loading indicator */}
      <div style={{ marginTop: 48, display: 'flex', gap: 6 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--orange)',
            opacity: 0.3,
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
          }} />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}
