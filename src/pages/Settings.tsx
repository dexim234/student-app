// src/pages/Settings.tsx
// Premium settings page matching the design style
import { useNavigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { useAuthStore } from '@/store/authStore'
import { 
  Wallet, 
  Globe, 
  Shield, 
  Palette,
  Upload,
  Headphones,
  RefreshCw,
  FileText,
  FileCheck,
  ArrowLeft,
  LogOut
} from 'lucide-react'

export const Settings = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/club')
  }

  const settingsItems = [
    { icon: Wallet, label: 'Настройки кошелька', action: () => {} },
    { icon: Upload, label: 'Экспортировать seed-фразу', action: () => {} },
    { icon: Shield, label: 'Безопасность', action: () => {} },
    { icon: Globe, label: 'Язык', action: () => {} },
    { icon: Palette, label: 'Персонализация', action: () => {} },
  ]

  const helpItems = [
    { icon: Headphones, label: 'Поддержка', action: () => {} },
    { icon: RefreshCw, label: 'О нас', action: () => {} },
    { icon: FileText, label: 'Документация', action: () => {} },
    { icon: FileText, label: 'Политика конфиденциальности', action: () => {} },
    { icon: FileCheck, label: 'Условия использования', action: () => {} },
  ]

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-8">Настройки</h1>

        {/* Настройки Section */}
        <div className="mb-8">
          <div className="space-y-0">
            {settingsItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-4 px-4 py-4 text-white hover:bg-gray-800/50 transition-colors duration-200 border-b border-gray-800/50 last:border-b-0"
              >
                <item.icon className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <span className="text-base font-normal">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Помощь Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Помощь</h2>
          <div className="space-y-0">
            {helpItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-4 px-4 py-4 text-white hover:bg-gray-800/50 transition-colors duration-200 border-b border-gray-800/50 last:border-b-0"
              >
                <item.icon className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <span className="text-base font-normal">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 text-red-500 hover:bg-gray-800/50 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 flex-shrink-0" />
          <span className="text-base font-normal">Выйти</span>
        </button>
      </div>
    </Layout>
  )
}
