// Login page for students
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { Moon, Sun, Shield, Sparkles } from 'lucide-react'

export const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login: loginUser } = useAuthStore()
  const { theme, toggleTheme, setTheme } = useThemeStore()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!login || !password) {
      setError('Введите логин и пароль')
      return
    }

    const success = await loginUser(login, password)
    if (success) {
      navigate('/club')
    } else {
      setError('Неверный логин или пароль')
    }
  }

  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const subtleColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600'

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-gray-50'}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className={`${bgColor} rounded-2xl shadow-2xl p-8 w-full max-w-md backdrop-blur-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} animate-fade-in relative z-10`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-400 to-green-600">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${textColor} flex items-center gap-2`}>
                ApeVault
                <Sparkles className="w-6 h-6 text-green-500" />
              </h1>
              <p className={subtleColor}>Для учеников</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="login" className={`block text-sm font-medium ${textColor} mb-2`}>
              Логин
            </label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
              placeholder="Введите логин"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${textColor} mb-2`}>
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
              placeholder="Введите пароль"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-900/30 text-red-300 border border-red-700' : 'bg-red-50 text-red-800 border border-red-200'} animate-shake`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}

