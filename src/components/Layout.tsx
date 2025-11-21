// Main layout component for students app
import { Link, useLocation } from 'react-router-dom'
import { LogOut, User, Wallet, Users, TrendingUp, Settings, Sparkles } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { logout, user } = useAuthStore()
  const location = useLocation()

  const handleLogout = () => {
    logout()
  }

  const navItems: Array<{
    path: string
    label: string
    icon: typeof User
  }> = [
    { path: '/profile', label: 'Личный кабинет', icon: User },
    { path: '/wallet', label: 'Кошелек', icon: Wallet },
    { path: '/club', label: 'Club', icon: Sparkles },
    { path: '/trading', label: 'Торговля', icon: TrendingUp },
    { path: '/referrals', label: 'Рефералы', icon: Users },
    { path: '/settings', label: 'Настройки', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">
                ApeVault Students
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    location.pathname === item.path
                      ? 'bg-green-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* User info and logout */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">
                  {user?.name || 'Ученик'}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg transition-colors bg-gray-700 hover:bg-gray-600"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5 text-gray-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile navigation */}
          <nav className="md:hidden pb-4 flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                  location.pathname === item.path
                    ? 'bg-green-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

