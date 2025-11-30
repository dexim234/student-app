// src/components/Layout.tsx
// Main layout component for students app with premium navigation design
import { Link, useLocation } from 'react-router-dom'
import { LogOut, Wallet, Users, TrendingUp, Settings, Layers } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { logout, user } = useAuthStore()
  const location = useLocation()

  const navItems: Array<{
    path: string
    label: string
    icon: typeof Wallet
    badge?: number
  }> = [
    { path: '/wallet', label: 'Кошелек', icon: Wallet },
    { path: '/trading', label: 'Торговля', icon: TrendingUp },
    { path: '/club', label: 'Club', icon: Layers, badge: 1 },
    { path: '/referrals', label: 'Рефералы', icon: Users },
    { path: '/settings', label: 'Настройки', icon: Settings },
  ]

  const handleLogout = () => {
    logout()
  }

  // Mock balance - можно заменить на реальный баланс из store
  const balance = '$0.24'

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Premium Navigation Bar */}
      <header className="bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-400 to-pink-400 blur-sm opacity-75"></div>
              </div>
              <span className="text-sm font-medium text-gray-400">SOL</span>
            </div>

            {/* Premium Navigation with Icons and Labels */}
            <nav className="hidden md:flex items-center gap-6 px-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300 group relative"
                  >
                    {/* Icon Container */}
                    <div className={`relative flex items-center justify-center ${
                      isActive 
                        ? 'text-cyan-400' 
                        : 'text-gray-400 group-hover:text-gray-300'
                    } transition-colors duration-300`}>
                      {/* Active background circle for Hub */}
                      {item.path === '/club' && (
                        <div className={`absolute w-12 h-12 rounded-full transition-all duration-300 ${
                          isActive 
                            ? 'bg-cyan-500 scale-100 shadow-lg shadow-cyan-500/30' 
                            : 'bg-transparent scale-0'
                        }`}></div>
                      )}
                      <item.icon className={`relative z-10 transition-transform duration-300 ${
                        isActive 
                          ? item.path === '/club' 
                            ? 'w-5 h-5 text-gray-900 stroke-[2.5]' 
                            : 'w-6 h-6 text-cyan-400'
                          : 'w-5 h-5 text-gray-400 group-hover:text-gray-300 group-hover:scale-110'
                      }`} />
                      
                      {/* Notification Badge for Hub */}
                      {item.badge && item.path === '/club' && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center z-20 shadow-lg shadow-orange-500/50">
                          <span className="text-[10px] font-bold text-white">{item.badge}</span>
                        </div>
                      )}
                      
                      {/* Active indicator dot */}
                      {isActive && item.path !== '/club' && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"></div>
                      )}
                    </div>
                    
                    {/* Label */}
                    <span className={`text-xs font-medium transition-colors duration-300 ${
                      isActive 
                        ? 'text-cyan-400' 
                        : 'text-gray-400 group-hover:text-gray-300'
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                )
              })}
            </nav>

            {/* Right side - Balance and User */}
            <div className="flex items-center gap-4">
              {/* Balance */}
              <div className="text-right hidden sm:block">
                <span className="text-sm font-medium text-gray-300">{balance}</span>
              </div>
              
              {/* User info and logout */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300 hidden lg:inline">
                  {user?.name || 'Ученик'}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg transition-colors bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        {children}
      </main>

      {/* Mobile bottom navigation - Premium Style */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-t border-gray-800/50 z-50 shadow-2xl shadow-black/30">
        <div className="flex justify-around items-center py-3 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-all duration-300 relative group"
              >
                <div className="relative">
                  {item.path === '/club' && isActive && (
                    <div className="absolute inset-0 w-10 h-10 rounded-full bg-cyan-500 -m-2 shadow-lg shadow-cyan-500/30"></div>
                  )}
                  <item.icon className={`relative z-10 transition-all duration-300 ${
                    isActive 
                      ? item.path === '/club'
                        ? 'w-5 h-5 text-gray-900 stroke-[2.5]'
                        : 'w-6 h-6 text-cyan-400'
                      : 'w-5 h-5 text-gray-400 group-hover:text-gray-300'
                  }`} />
                  
                  {/* Notification Badge for Hub */}
                  {item.badge && item.path === '/club' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center z-20 shadow-lg shadow-orange-500/50">
                      <span className="text-[9px] font-bold text-white">{item.badge}</span>
                    </div>
                  )}
                </div>
                <span className={`text-[10px] font-medium transition-colors duration-300 ${
                  isActive 
                    ? 'text-cyan-400' 
                    : 'text-gray-400 group-hover:text-gray-300'
                }`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
