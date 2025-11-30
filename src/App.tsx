
// Main App component with routing for students - No authentication required
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useEffect } from 'react'
import { Profile } from './pages/Profile'
import { Wallet } from './pages/Wallet'
import { Club } from './pages/Club'
import { Trading } from './pages/Trading'
import { Referrals } from './pages/Referrals'
import { Settings } from './pages/Settings'

function App() {
  // const { isAuthenticated } = useAuthStore() // No longer needed

  useEffect(() => {
    // Apply dark theme on mount
    document.body.classList.add('dark')
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* Remove login route - no authentication needed */}
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/wallet"
          element={<Wallet />}
        />
        <Route
          path="/club"
          element={<Club />}
        />
        <Route
          path="/trading"
          element={<Trading />}
        />
        <Route
          path="/referrals"
          element={<Referrals />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
        {/* Redirect to club by default */}
        <Route path="/" element={<Navigate to="/club" replace />} />
        <Route path="*" element={<Navigate to="/club" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
