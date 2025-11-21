// Trading page - placeholder
import { useThemeStore } from '@/store/themeStore'
import { Layout } from '@/components/Layout'
import { TrendingUp } from 'lucide-react'

export const Trading = () => {
  const { theme } = useThemeStore()
  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const subtleColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600'

  return (
    <Layout>
      <div className={`${bgColor} rounded-xl p-8 text-center shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <TrendingUp className={`w-16 h-16 mx-auto mb-4 ${subtleColor}`} />
        <h2 className={`text-2xl font-bold ${textColor} mb-2`}>Торговля</h2>
        <p className={subtleColor}>Раздел находится в разработке</p>
      </div>
    </Layout>
  )
}

