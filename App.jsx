// src/App.jsx
// Complete file — never partial edits
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { SyncProvider } from './context/SyncContext'

import SplashScreen     from './screens/splash/SplashScreen'
import LoginScreen      from './screens/auth/LoginScreen'
import VerifyScreen     from './screens/auth/VerifyScreen'
import HomeScreen       from './screens/home/HomeScreen'
import JobsitesScreen   from './screens/jobsite/JobsitesScreen'
import NewJobsiteScreen from './screens/jobsite/NewJobsiteScreen'
import MaterialsScreen  from './screens/materials/MaterialsScreen'
import HomeJobsScreen   from './screens/home-jobs/HomeJobsScreen'
import ProfileScreen    from './screens/profile/ProfileScreen'

// Route guard — shows loading spinner while Appwrite checks session
// Never passes through on loading=true — prevents unauthenticated access
function Protected({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        background: '#1a1a1a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16
      }}>
        <div style={{ fontSize: 11, color: '#666', letterSpacing: 4 }}>UPSTREAM</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: '#E85C00', letterSpacing: -2 }}>MAC</div>
        <div style={{ fontSize: 11, color: '#666', letterSpacing: 4 }}>GUIDE</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 24 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#E85C00', opacity: 0.4,
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
            }} />
          ))}
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }`}</style>
      </div>
    )
  }

  return user ? children : <Navigate to="/auth/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/splash"       element={<SplashScreen />} />
      <Route path="/auth/login"   element={<LoginScreen />} />
      <Route path="/auth/verify"  element={<VerifyScreen />} />

      <Route path="/"             element={<Protected><HomeScreen /></Protected>} />
      <Route path="/jobsites"     element={<Protected><JobsitesScreen /></Protected>} />
      <Route path="/jobsites/new" element={<Protected><NewJobsiteScreen /></Protected>} />
      <Route path="/jobsites/:jobsiteId" element={<Protected><JobsitesScreen /></Protected>} />
      <Route path="/materials"           element={<Protected><MaterialsScreen /></Protected>} />
      <Route path="/materials/:jobsiteId" element={<Protected><MaterialsScreen /></Protected>} />
      <Route path="/home-jobs"    element={<Protected><HomeJobsScreen /></Protected>} />
      <Route path="/profile"      element={<Protected><ProfileScreen /></Protected>} />
      <Route path="/contacts"     element={<Protected><ProfileScreen /></Protected>} />

      <Route path="*" element={<Navigate to="/splash" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SyncProvider>
          <AppRoutes />
        </SyncProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
