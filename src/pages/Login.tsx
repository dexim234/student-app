// Login/Register page with premium crypto-style design
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { Moon, Sun, Shield, Sparkles, Wallet, TrendingUp, Lock, Mail, User, Coins } from 'lucide-react'

type TabType = 'login' | 'register'

export const Login = () => {
  const [activeTab, setActiveTab] = useState<TabType>('login')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login: loginUser, register } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!login || !password) {
      setError('Введите логин и пароль')
      setLoading(false)
      return
    }

    const success = await loginUser(login, password)
    setLoading(false)
    
    if (success) {
      navigate('/club')
    } else {
      setError('Неверный логин или пароль')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!name || !email || !login || !password || !confirmPassword) {
      setError('Заполните все поля')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      setLoading(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Введите корректный email')
      setLoading(false)
      return
    }

    const result = await register(name, email, login, password)
    setLoading(false)
    
    if (result.success) {
      navigate('/club')
    } else {
      setError(result.error || 'Ошибка при регистрации')
    }
  }

  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-gray-900 to-black' 
        : 'bg-gradient-to-br from-emerald-50 via-white to-cyan-50'
    }`}>
      {/* Premium animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dark theme: Neon glows */}
        {isDark && (
          <>
            <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
            <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/15 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
          </>
        )}
        {/* Light theme: Soft pastels */}
        {!isDark && (
          <>
            <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-40 w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          </>
        )}
      </div>

      {/* Grid pattern overlay - more subtle */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:60px_60px]' 
          : 'bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:60px_60px]'
      }`}></div>

      {/* Main card */}
      <div className={`relative z-10 w-full max-w-md ${
        isDark 
          ? 'bg-gray-900/70 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/10' 
          : 'bg-white/80 backdrop-blur-2xl border-2 border-emerald-100 shadow-2xl shadow-emerald-500/5'
      } rounded-3xl overflow-hidden crypto-glow`}>
        {/* Premium header with gradient */}
        <div className={`relative p-6 ${
          isDark 
            ? 'bg-gradient-to-r from-emerald-900/40 via-emerald-800/20 to-transparent border-b border-emerald-500/20' 
            : 'bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-transparent border-b-2 border-emerald-200'
        }`}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className={`relative p-3.5 rounded-2xl ${
                isDark 
                  ? 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 shadow-lg shadow-emerald-500/50' 
                  : 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 shadow-lg shadow-emerald-500/30'
              }`}>
                <Shield className="w-7 h-7 text-white" />
                <div className={`absolute inset-0 rounded-2xl ${
                  isDark ? 'bg-emerald-400/20' : 'bg-white/20'
                } animate-pulse`}></div>
              </div>
              <div>
                <h1 className={`text-2xl font-bold flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  ApeVault
                  <Sparkles className={`w-5 h-5 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                </h1>
                <p className={`text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Крипто-платформа для учеников
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400 border border-gray-700' 
                  : 'bg-emerald-50 hover:bg-emerald-100 text-gray-700 border border-emerald-200'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Premium tabs */}
          <div className="flex gap-2.5">
            <button
              onClick={() => {
                setActiveTab('login')
                setError('')
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'login'
                  ? isDark
                    ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/20'
                    : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 border-2 border-emerald-600'
                  : isDark
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800/50 border-2 border-transparent'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-emerald-50 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Вход
              </div>
            </button>
            <button
              onClick={() => {
                setActiveTab('register')
                setError('')
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'register'
                  ? isDark
                    ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/20'
                    : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 border-2 border-emerald-600'
                  : isDark
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800/50 border-2 border-transparent'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-emerald-50 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                Регистрация
              </div>
            </button>
          </div>
        </div>

        {/* Form container */}
        <div className="p-6">
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="login" className={`block text-sm font-semibold mb-2.5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Логин
                </label>
                <div className="relative group">
                  <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDark ? 'text-gray-500 group-focus-within:text-emerald-400' : 'text-gray-400 group-focus-within:text-emerald-600'
                  }`} />
                  <input
                    id="login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-emerald-50/50'
                    }`}
                    placeholder="Введите логин"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className={`block text-sm font-semibold mb-2.5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Пароль
                </label>
                <div className="relative group">
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDark ? 'text-gray-500 group-focus-within:text-emerald-400' : 'text-gray-400 group-focus-within:text-emerald-600'
                  }`} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-emerald-50/50'
                    }`}
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {error && (
                <div className={`p-4 rounded-xl border-2 ${
                  isDark 
                    ? 'bg-red-900/20 text-red-300 border-red-700/50' 
                    : 'bg-red-50 text-red-800 border-red-200'
                } animate-shake`}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                    {error}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 ${
                  isDark
                    ? 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50'
                    : 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Вход...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    Войти
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label htmlFor="name" className={`block text-sm font-semibold mb-2.5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Имя
                </label>
                <div className="relative group">
                  <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDark ? 'text-gray-500 group-focus-within:text-emerald-400' : 'text-gray-400 group-focus-within:text-emerald-600'
                  }`} />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-emerald-50/50'
                    }`}
                    placeholder="Введите ваше имя"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-semibold mb-2.5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <div className="relative group">
                  <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDark ? 'text-gray-500 group-focus-within:text-emerald-400' : 'text-gray-400 group-focus-within:text-emerald-600'
                  }`} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-emerald-50/50'
                    }`}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-login" className={`block text-sm font-semibold mb-2.5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Логин
                </label>
                <div className="relative group">
                  <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDark ? 'text-gray-500 group-focus-within:text-emerald-400' : 'text-gray-400 group-focus-within:text-emerald-600'
                  }`} />
                  <input
                    id="reg-login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-emerald-50/50'
                    }`}
                    placeholder="Введите логин"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-password" className={`block text-sm font-semibold mb-2.5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Пароль
                </label>
                <div className="relative group">
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDark ? 'text-gray-500 group-focus-within:text-emerald-400' : 'text-gray-400 group-focus-within:text-emerald-600'
                  }`} />
                  <input
                    id="reg-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-emerald-50/50'
                    }`}
                    placeholder="Минимум 6 символов"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className={`block text-sm font-semibold mb-2.5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Подтвердите пароль
                </label>
                <div className="relative group">
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDark ? 'text-gray-500 group-focus-within:text-emerald-400' : 'text-gray-400 group-focus-within:text-emerald-600'
                  }`} />
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-emerald-50/50'
                    }`}
                    placeholder="Повторите пароль"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {error && (
                <div className={`p-4 rounded-xl border-2 ${
                  isDark 
                    ? 'bg-red-900/20 text-red-300 border-red-700/50' 
                    : 'bg-red-50 text-red-800 border-red-200'
                } animate-shake`}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                    {error}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 ${
                  isDark
                    ? 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50'
                    : 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Регистрация...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Зарегистрироваться
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Premium footer */}
        <div className={`p-5 text-center border-t ${
          isDark 
            ? 'border-gray-800 bg-gradient-to-r from-transparent via-gray-900/50 to-transparent' 
            : 'border-emerald-100 bg-gradient-to-r from-transparent via-emerald-50/50 to-transparent'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Coins className={`w-4 h-4 ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
            <p className={`text-xs font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Безопасная крипто-платформа для обучения
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
