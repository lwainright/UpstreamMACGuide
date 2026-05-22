// src/screens/auth/VerifyScreen.jsx
// Handles magic link callback from email
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { account } from '../../services/appwrite'

export default function VerifyScreen() {
  const [searchParams] = useSearchParams()
  const navigate       = useNavigate()
  const [error,  setError]  = useState('')
  const [status, setStatus] = useState('Signing you in...')

  useEffect(() => {
    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')

    if (!userId || !secret) {
      setError('Invalid login link. Please request a new one.')
      return
    }

    setStatus('Verifying...')

    account.createSession(userId, secret)
      .then(() => {
        setStatus('Signed in! Loading...')
        navigate('/', { replace: true })
      })
      .catch(err => {
        console.error('Magic link error:', err)
        // Token already used or expired
        if (err?.code === 401) {
          setError('This link has already been used or expired. Please request a new one.')
        } else {
          setError(`Login failed: ${err?.message || 'Unknown error'}. Please request a new link.`)
        }
      })
  }, [])

  return (
    <div className="screen-full" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }}>
      {error ? (
        <div style={{ textAlign: 'center', maxWidth: 340 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
          <p style={{ color: 'var(--danger)', marginBottom: 20, lineHeight: 1.6 }}>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/auth/login')}>
            Back to Login
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: 4, marginBottom: 4 }}>UPSTREAM</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: 'var(--orange)', letterSpacing: -2, marginBottom: 4 }}>MAC</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: 4, marginBottom: 24 }}>GUIDE</div>
          <p style={{ color: 'var(--muted)' }}>{status}</p>
        </div>
      )}
    </div>
  )
}
