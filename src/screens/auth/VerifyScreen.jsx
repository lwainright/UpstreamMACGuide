// src/screens/auth/VerifyScreen.jsx
// Handles magic link callback from email
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { account } from '../../services/appwrite'

export default function VerifyScreen() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')
    if (!userId || !secret) {
      setError('Invalid login link. Please request a new one.')
      return
    }
    account.createSession(userId, secret)
      .then(() => navigate('/', { replace: true }))
      .catch(() => setError('Login link expired or already used. Please request a new one.'))
  }, [])

  return (
    <div className="screen-full" style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 24
    }}>
      {error ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
          <p style={{ color: 'var(--danger)', marginBottom: 20 }}>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/auth/login')}>
            Back to Login
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔑</div>
          <p style={{ color: 'var(--muted)' }}>Signing you in...</p>
        </div>
      )}
    </div>
  )
}
