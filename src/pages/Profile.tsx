// Profile page - Premium design matching site style
import { Layout } from '@/components/Layout'
import { useAuthStore } from '@/store/authStore'
import { User, Mail, CreditCard, Calendar } from 'lucide-react'

export const Profile = () => {
  const { user } = useAuthStore()

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-8">Личный кабинет</h1>

        {/* User Info Card */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-6 border border-gray-700/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.name || 'Ученик'}</h2>
              <p className="text-sm text-gray-400">{user?.email || user?.login || 'Не указано'}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-5 h-5 text-gray-400" />
              <span>{user?.email || 'Email не указан'}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <User className="w-5 h-5 text-gray-400" />
              <span>Логин: {user?.login || 'Не указан'}</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Информация</h3>
          <p className="text-gray-400 text-sm">
            Личный кабинет позволяет управлять вашим профилем и настройками аккаунта.
          </p>
        </div>
      </div>
    </Layout>
  )
}

