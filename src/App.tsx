// Main App component with routing for students
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { useThemeStore } from './store/themeStore'
import { useEffect } from 'react'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Wallet } from './pages/Wallet'
import { Club } from './pages/Club'
import { Trading } from './pages/Trading'
import { Referrals } from './pages/Referrals'
import { Settings } from './pages/Settings'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  const { isAuthenticated } = useAuthStore()
  const { theme } = useThemeStore()

  useEffect(() => {
    // Apply theme on mount
    document.body.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/club" replace />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/club"
          element={
            <ProtectedRoute>
              <Club />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trading"
          element={
            <ProtectedRoute>
              <Trading />
            </ProtectedRoute>
          }
        />
        <Route
          path="/referrals"
          element={
            <ProtectedRoute>
              <Referrals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/club" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

