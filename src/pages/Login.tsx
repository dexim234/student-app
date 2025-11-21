// Login/Register page with crypto-style design
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { Moon, Sun, Shield, Sparkles, Wallet, TrendingUp, Lock, Mail, User } from 'lucide-react'

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
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-blob"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className={`absolute inset-0 opacity-5 ${
        isDark ? 'bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:50px_50px]' : 'bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px]'
      }`}></div>

      <div className={`relative z-10 w-full max-w-md ${
        isDark 
          ? 'bg-gray-900/80 backdrop-blur-xl border border-green-500/20' 
          : 'bg-white/90 backdrop-blur-xl border border-gray-200'
      } rounded-3xl shadow-2xl overflow-hidden crypto-glow`}>
        {/* Header */}
        <div className={`relative p-6 ${
          isDark 
            ? 'bg-gradient-to-r from-green-900/30 to-green-800/20 border-b border-green-500/20' 
            : 'bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${
                isDark 
                  ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/50' 
                  : 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg'
              }`}>
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  ApeVault
                  <Sparkles className="w-5 h-5 text-green-500" />
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Крипто-платформа для учеников
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
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

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveTab('login')
                setError('')
              }}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'login'
                  ? isDark
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-green-500 text-white shadow-lg'
                  : isDark
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'register'
                  ? isDark
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-green-500 text-white shadow-lg'
                  : isDark
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                Регистрация
              </div>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="login" className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Логин
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    id="login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                    }`}
                    placeholder="Введите логин"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Пароль
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                    }`}
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {error && (
                <div className={`p-3 rounded-xl ${
                  isDark 
                    ? 'bg-red-900/30 text-red-300 border border-red-700/50' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                } animate-shake`}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
                  isDark
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
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
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Имя
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                    }`}
                    placeholder="Введите ваше имя"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                    }`}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-login" className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Логин
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    id="reg-login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                    }`}
                    placeholder="Введите логин"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-password" className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Пароль
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    id="reg-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                    }`}
                    placeholder="Минимум 6 символов"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Подтвердите пароль
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all ${
                      isDark
                        ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                    }`}
                    placeholder="Повторите пароль"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {error && (
                <div className={`p-3 rounded-xl ${
                  isDark 
                    ? 'bg-red-900/30 text-red-300 border border-red-700/50' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                } animate-shake`}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
                  isDark
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
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

        {/* Footer decoration */}
        <div className={`p-4 text-center border-t ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Безопасная крипто-платформа для обучения
          </p>
        </div>
      </div>
    </div>
  )
}
