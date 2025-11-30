// Login/Register page with WOW premium crypto-style design (Dark theme only)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Sparkles, Wallet, TrendingUp, Lock, Mail, User, Coins } from 'lucide-react'

type TabType = 'login' | 'register'

export const Login = () => {
  // Регистрация отключена - оставляем только вход
  const [activeTab, setActiveTab] = useState<TabType>('login')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  // Переменные для регистрации сохранены, но не используются (регистрация отключена)
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login: loginUser } = useAuthStore()
  // const { login: loginUser, register } = useAuthStore() // register отключен
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!login || !password) {
        setError('Введите логин и пароль')
        setLoading(false)
        return
      }

      const success = await loginUser(login, password)
      
      if (success) {
        navigate('/club')
      } else {
        setError('Неверный логин или пароль')
      }
    } catch (error: any) {
      console.error('Login form error:', error)
      setError(error.message || 'Произошла ошибка при входе')
    } finally {
      setLoading(false)
    }
  }

  // Функция регистрации отключена, но код сохранен для возможного восстановления
  /*
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
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
      
      if (result.success) {
        navigate('/club')
      } else {
        setError(result.error || 'Ошибка при регистрации')
      }
    } catch (error: any) {
      console.error('Register form error:', error)
      setError(error.message || 'Произошла ошибка при регистрации')
    } finally {
      setLoading(false)
    }
  }
  */

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-black">
      {/* Premium animated background elements - responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large background blobs - hidden on mobile, visible on larger screens */}
        <div className="hidden lg:block absolute top-20 left-20 w-[600px] h-[600px] bg-emerald-500/25 rounded-full mix-blend-screen filter blur-[120px] animate-blob-large"></div>
        <div className="hidden lg:block absolute top-40 right-20 w-[600px] h-[600px] bg-cyan-500/25 rounded-full mix-blend-screen filter blur-[120px] animate-blob-large animation-delay-2000"></div>
        <div className="hidden lg:block absolute bottom-20 left-40 w-[600px] h-[600px] bg-blue-500/25 rounded-full mix-blend-screen filter blur-[120px] animate-blob-large animation-delay-4000"></div>
        <div className="hidden lg:block absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[140px] animate-blob-large animation-delay-6000"></div>
        
        {/* Medium blobs for tablets */}
        <div className="hidden md:block lg:hidden absolute top-20 left-20 w-[400px] h-[400px] bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="hidden md:block lg:hidden absolute top-40 right-20 w-[400px] h-[400px] bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="hidden md:block lg:hidden absolute bottom-20 left-40 w-[400px] h-[400px] bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
        
        {/* Small optimized blobs for mobile */}
        <div className="md:hidden absolute top-10 left-10 w-[250px] h-[250px] bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob"></div>
        <div className="md:hidden absolute top-20 right-10 w-[250px] h-[250px] bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000"></div>
        <div className="md:hidden absolute bottom-10 left-20 w-[250px] h-[250px] bg-blue-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Enhanced grid pattern overlay - responsive */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] lg:bg-[size:80px_80px]"></div>

      {/* Main card - fully responsive */}
      <div className="relative z-10 w-full max-w-md bg-gray-900/75 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 rounded-2xl sm:rounded-3xl overflow-hidden crypto-glow">
        {/* Premium header with gradient - responsive padding */}
        <div className="relative p-4 sm:p-5 md:p-6 bg-gradient-to-r from-emerald-900/40 via-emerald-800/20 to-transparent border-b border-emerald-500/20">
          <div className="flex items-center justify-center mb-4 sm:mb-5">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2 text-white mb-2">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                ApeVault
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              </h1>
              <p className="text-sm sm:text-base font-medium text-gray-400">
                крипто-платформа ApeVault
              </p>
            </div>
          </div>

          {/* Premium tabs - responsive */}
          {/* Регистрация отключена - показываем только вход */}
          <div className="flex gap-2 sm:gap-2.5">
            <button
              onClick={() => {
                setActiveTab('login')
                setError('')
              }}
              className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/20"
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Вход</span>
              </div>
            </button>
            {/* Кнопка регистрации скрыта, но код сохранен для возможного восстановления */}
            {/* <button
              onClick={() => {
                setActiveTab('register')
                setError('')
              }}
              className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeTab === 'register'
                  ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Регистрация</span>
                <span className="xs:hidden">Рег.</span>
              </div>
            </button> */}
          </div>
        </div>

        {/* Form container - responsive padding */}
        <div className="p-4 sm:p-5 md:p-6">
          {/* Регистрация отключена - показываем только форму входа */}
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="login" className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-2.5 text-gray-300">
                  Логин
                </label>
                <div className="relative group">
                  <User className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-colors text-gray-500 group-focus-within:text-emerald-400" />
                  <input
                    id="login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base transition-all duration-200 border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800"
                    placeholder="Введите логин"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-2.5 text-gray-300">
                  Пароль
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-colors text-gray-500 group-focus-within:text-emerald-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base transition-all duration-200 border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800"
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base bg-red-900/20 text-red-300 border-red-700/50 animate-shake">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"></div>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Вход...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Войти</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Форма регистрации отключена, но код сохранен для возможного восстановления */
            null
            /* 
            <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-2.5 text-gray-300">
                  Имя
                </label>
                <div className="relative group">
                  <User className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-colors text-gray-500 group-focus-within:text-emerald-400" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base transition-all duration-200 border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800"
                    placeholder="Введите ваше имя"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-2.5 text-gray-300">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-colors text-gray-500 group-focus-within:text-emerald-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base transition-all duration-200 border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-login" className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-2.5 text-gray-300">
                  Логин
                </label>
                <div className="relative group">
                  <User className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-colors text-gray-500 group-focus-within:text-emerald-400" />
                  <input
                    id="reg-login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base transition-all duration-200 border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800"
                    placeholder="Введите логин"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-password" className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-2.5 text-gray-300">
                  Пароль
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-colors text-gray-500 group-focus-within:text-emerald-400" />
                  <input
                    id="reg-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base transition-all duration-200 border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800"
                    placeholder="Минимум 6 символов"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-2.5 text-gray-300">
                  Подтвердите пароль
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-colors text-gray-500 group-focus-within:text-emerald-400" />
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base transition-all duration-200 border-gray-700 bg-gray-800/60 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-800"
                    placeholder="Повторите пароль"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base bg-red-900/20 text-red-300 border-red-700/50 animate-shake">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"></div>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Регистрация...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Зарегистрироваться</span>
                  </>
                )}
              </button>
            </form>
            */
          )}
        </div>

        {/* Premium footer - responsive */}
        <div className="p-3 sm:p-4 md:p-5 text-center border-t border-gray-800 bg-gradient-to-r from-transparent via-gray-900/50 to-transparent">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <p className="text-xs font-medium text-gray-400">
              Платформа ApeVault для торговли, анализа и обучения
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
