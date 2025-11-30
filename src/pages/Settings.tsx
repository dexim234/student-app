// src/pages/Settings.tsx
// Enhanced settings page with personal account and help sections
import { useThemeStore } from '@/store/themeStore'
import { Layout } from '@/components/Layout'
import { useAuthStore } from '@/store/authStore'
import { 
  User, 
  Wallet, 
  Globe, 
  Shield, 
  Palette,
  Download,
  HelpCircle,
  Users,
  FileText,
  LogOut,
  Settings as SettingsIcon
} from 'lucide-react'

export const Settings = () => {
  const { theme } = useThemeStore()
  const { user, logout } = useAuthStore()
  
  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const subtleColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
  const hoverColor = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'

  const handleLogout = () => {
    logout()
  }

  const generalSettings = [
    { icon: User, label: 'Личный кабинет', description: 'Управление профилем и данными', action: () => {} },
    { icon: Wallet, label: 'Настройки кошелька', description: 'Настройки платежей и баланса', action: () => {} },
    { icon: Download, label: 'Экспортировать seed-фразу', description: 'Безопасное сохранение ключей', action: () => {} },
    { icon: Globe, label: 'Язык', description: 'Русский', action: () => {} },
    { icon: Shield, label: 'Безопасность', description: 'Двухфакторная аутентификация', action: () => {} },
    { icon: Palette, label: 'Персонализация', description: 'Темы и внешний вид', action: () => {} },
  ]

  const helpSettings = [
    { icon: HelpCircle, label: 'Поддержка', description: 'Помощь и консультации', action: () => {} },
    { icon: Users, label: 'О нас', description: 'Информация о платформе', action: () => {} },
    { icon: FileText, label: 'Документация', description: 'Руководства и инструкции', action: () => {} },
  ]

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`${bgColor} rounded-xl p-8 mb-6 shadow-lg border ${borderColor}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <SettingsIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${textColor}`}>Настройки</h1>
                <p className={subtleColor}>Управление аккаунтом и настройками платформы</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm ${textColor} font-medium`}>{user?.name || 'Ученик'}</p>
              <p className={`text-xs ${subtleColor}`}>{user?.email || user?.login || 'Не указано'}</p>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className={`${bgColor} rounded-xl p-6 mb-6 shadow-lg border ${borderColor}`}>
          <h2 className={`text-xl font-semibold ${textColor} mb-4 flex items-center gap-2`}>
            <SettingsIcon className="w-5 h-5" />
            Общие настройки
          </h2>
          <div className="space-y-3">
            {generalSettings.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-4 rounded-lg border ${borderColor} transition-all ${hoverColor} hover:shadow-md`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className={`font-medium ${textColor}`}>{item.label}</p>
                    <p className={`text-sm ${subtleColor}`}>{item.description}</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className={`${bgColor} rounded-xl p-6 mb-6 shadow-lg border ${borderColor}`}>
          <h2 className={`text-xl font-semibold ${textColor} mb-4 flex items-center gap-2`}>
            <HelpCircle className="w-5 h-5" />
            Помощь
          </h2>
          <div className="space-y-3">
            {helpSettings.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-4 rounded-lg border ${borderColor} transition-all ${hoverColor} hover:shadow-md`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className={`font-medium ${textColor}`}>{item.label}</p>
                    <p className={`text-sm ${subtleColor}`}>{item.description}</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className={`${bgColor} rounded-xl p-6 shadow-lg border ${borderColor}`}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium transition-all hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <LogOut className="w-5 h-5" />
            <span>Выйти из аккаунта</span>
          </button>
        </div>
      </div>
    </Layout>
  )
}
