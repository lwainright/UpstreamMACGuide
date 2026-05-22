// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { account } from '../services/appwrite'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    account.get()
      .then(u => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function loginMagicLink(email) {
    // Redirect URL must match exactly — no trailing slash
    const redirectUrl = `${window.location.origin}/auth/verify`
    return account.createMagicURLToken(
      'unique()',
      email,
      redirectUrl
    )
  }

  async function logout() {
    await account.deleteSession('current')
    setUser(null)
  }

  async function refreshUser() {
    const u = await account.get()
    setUser(u)
    return u
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginMagicLink, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
