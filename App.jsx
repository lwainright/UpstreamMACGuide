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

function Protected({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
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
