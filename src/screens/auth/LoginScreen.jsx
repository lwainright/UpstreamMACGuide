// src/screens/auth/LoginScreen.jsx
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function LoginScreen() {
  const { loginMagicLink } = useAuth()
  const [email,   setEmail]   = useState('')
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function handleMagicLink(e) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    try {
      await loginMagicLink(email.trim().toLowerCase())
      setSent(true)
    } catch (err) {
      setError('Could not send link. Check your email and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="screen-full" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: '#1a1a1a'
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: 4, marginBottom: 4 }}>UPSTREAM</div>
        <div style={{ fontSize: 52, fontWeight: 900, color: 'var(--orange)', letterSpacing: -2 }}>MAC</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: 4, marginTop: 4 }}>GUIDE</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12 }}>
          Materials &amp; Construction
        </div>
      </div>

      {sent ? (
        <div className="card" style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📧</div>
          <h3 style={{ marginBottom: 8 }}>Check your email</h3>
          <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>
            We sent a login link to <strong style={{ color: 'var(--cream)' }}>{email}</strong>.
            Tap the link to sign in.
          </p>
          <button
            className="btn btn-ghost"
            style={{ marginTop: 20 }}
            onClick={() => { setSent(false); setEmail('') }}
          >
            Use a different email
          </button>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: 380 }}>
          <form onSubmit={handleMagicLink}>
            <label className="label">Email address</label>
            <input
              className="input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
              style={{ marginBottom: 12 }}
            />
            {error && (
              <div style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 10 }}>
                {error}
              </div>
            )}
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading || !email.trim()}
              style={{ marginBottom: 12, opacity: (!email.trim() || loading) ? 0.6 : 1 }}
            >
              {loading ? 'Sending...' : 'Send Login Link'}
            </button>
          </form>

          {/* Google OAuth — disabled during development
              TODO: Re-enable when Google OAuth is configured
              See CLAUDE.md — Pending section for setup instructions
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--charcoal-light)' }} />
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--charcoal-light)' }} />
          </div>
          <button
            className="btn btn-secondary"
            onClick={loginGoogle}
            style={{ gap: 10 }}
          >
            <span style={{ fontSize: 18 }}>G</span>
            Continue with Google
          </button>
          */}

          <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, marginTop: 24, lineHeight: 1.6 }}>
            Upstream Initiative LLC &middot; Upstream MAC Guide
          </p>
        </div>
      )}
    </div>
  )
}
