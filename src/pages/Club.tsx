// Club page - Trading signals for students
import { useState, useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { Layout } from '@/components/Layout'
import { getCalls } from '@/services/firestoreService'
import { Call, TEAM_MEMBERS } from '@/types'
import { Info, Bell, X, Copy, Check, TrendingUp, TrendingDown, Clock, Target, AlertCircle, FileText, Sparkles } from 'lucide-react'

export const Club = () => {
  const { theme } = useThemeStore()
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'feed' | 'alerts'>('feed')
  const [filters, setFilters] = useState({
    proOnly: false,
    activeOnly: true,
    strategy: '' as '' | 'flip' | 'medium' | 'long',
    trader: ''
  })
  const [copiedTicker, setCopiedTicker] = useState<string | null>(null)

  useEffect(() => {
    loadCalls()
  }, [filters])

  const loadCalls = async () => {
    setLoading(true)
    try {
      const fetchedCalls = await getCalls({
        status: filters.activeOnly ? 'active' : undefined,
        activeOnly: filters.activeOnly,
        strategy: filters.strategy || undefined,
        userId: filters.trader || undefined
      })
      
      let filtered = fetchedCalls
      
      // Filter by active (24 hours) if needed
      if (filters.activeOnly) {
        const yesterday = new Date()
        yesterday.setHours(yesterday.getHours() - 24)
        filtered = filtered.filter(c => {
          const createdAt = new Date(c.createdAt)
          return c.status === 'active' && createdAt >= yesterday
        })
      }
      
      setCalls(filtered)
    } catch (error) {
      console.error('Error loading calls:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyTicker = async (ticker: string) => {
    try {
      await navigator.clipboard.writeText(ticker)
      setCopiedTicker(ticker)
      setTimeout(() => setCopiedTicker(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const subtleColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200'

  const networkColors: Record<string, string> = {
    solana: 'bg-purple-500',
    bsc: 'bg-yellow-500',
    ethereum: 'bg-blue-500',
    base: 'bg-indigo-500',
    ton: 'bg-cyan-500',
    tron: 'bg-red-500',
    sui: 'bg-green-500',
    cex: 'bg-orange-500'
  }

  const strategyLabels: Record<string, string> = {
    flip: 'Флип',
    medium: 'Среднесрок',
    long: 'Долгосрок'
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className={`${bgColor} rounded-xl p-6 shadow-lg border ${borderColor}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <h1 className={`text-3xl font-bold ${textColor} flex items-center gap-3`}>
                  <span className="bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text">
                    ApeVault CLUB
                  </span>
                  <span className="text-lg">- место трейдеров</span>
                </h1>
              </div>
              <button
                onClick={() => setShowInfoModal(true)}
                className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                title="Информация о Club"
              >
                <Info className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} />
              </button>
            </div>
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              } transition-colors`}
            >
              <Bell className="w-4 h-4" />
              Подписаться на уведомления
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'feed'
                ? 'bg-green-500 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Лента
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'alerts'
                ? 'bg-green-500 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ApeVault Alerts
          </button>
        </div>

        {activeTab === 'feed' && (
          <>
            {/* Filters */}
            <div className={`${bgColor} rounded-xl p-4 shadow-md border ${borderColor}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.proOnly}
                    onChange={(e) => setFilters({ ...filters, proOnly: e.target.checked })}
                    className="w-4 h-4 text-green-500 rounded"
                  />
                  <span className={textColor}>Только PRO трейдеры</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.activeOnly}
                    onChange={(e) => setFilters({ ...filters, activeOnly: e.target.checked })}
                    className="w-4 h-4 text-green-500 rounded"
                  />
                  <span className={textColor}>Только активные (&lt;24ч)</span>
                </label>
                <select
                  value={filters.strategy}
                  onChange={(e) => setFilters({ ...filters, strategy: e.target.value as any })}
                  className={`px-4 py-2 rounded-lg border ${borderColor} ${bgColor} ${textColor}`}
                >
                  <option value="">Все стратегии</option>
                  <option value="flip">Флип</option>
                  <option value="medium">Среднесрок</option>
                  <option value="long">Долгосрок</option>
                </select>
                <select
                  value={filters.trader}
                  onChange={(e) => setFilters({ ...filters, trader: e.target.value })}
                  className={`px-4 py-2 rounded-lg border ${borderColor} ${bgColor} ${textColor}`}
                >
                  <option value="">Все трейдеры</option>
                  {TEAM_MEMBERS.map((trader) => (
                    <option key={trader.id} value={trader.id}>
                      {trader.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calls Feed */}
            {loading ? (
              <div className={`${bgColor} rounded-xl p-8 text-center ${borderColor} border`}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                <p className={`${subtleColor} mt-4`}>Загрузка сигналов...</p>
              </div>
            ) : calls.length === 0 ? (
              <div className={`${bgColor} rounded-xl p-8 text-center ${borderColor} border`}>
                <p className={subtleColor}>Нет сигналов по выбранным фильтрам</p>
              </div>
            ) : (
              <div className="space-y-4">
                {calls.map((call) => {
                  const trader = TEAM_MEMBERS.find((t) => t.id === call.userId)
                  const networkColor = networkColors[call.network] || 'bg-gray-500'
                  const isCopied = copiedTicker === call.ticker
                  
                  // Calculate PnL (placeholder - will be filled from API)
                  const pnl = call.currentPnL || 0
                  const maxProfit = call.maxProfit || 0
                  
                  return (
                    <div
                      key={call.id}
                      className={`${bgColor} rounded-xl p-6 shadow-lg border ${borderColor} hover:shadow-xl transition-shadow`}
                    >
                      {/* Trader Info */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                            {trader?.name?.[0] || '?'}
                          </div>
                          <div>
                            <p className={`font-semibold ${textColor}`}>{trader?.name || 'Неизвестный трейдер'}</p>
                            <p className={`text-sm ${subtleColor}`}>
                              {new Date(call.createdAt).toLocaleString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full ${networkColor} text-white text-sm font-medium`}>
                          {call.network.toUpperCase()}
                        </div>
                      </div>

                      {/* Token Info */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-2xl font-bold ${textColor}`}>{call.ticker}</h3>
                          <button
                            onClick={() => copyTicker(call.ticker)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            title="Скопировать тикер"
                          >
                            {isCopied ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className={`w-4 h-4 ${subtleColor}`} />
                            )}
                          </button>
                        </div>
                        <p className={`${subtleColor} text-sm`}>Пара: {call.pair}</p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`text-xs ${subtleColor} mb-1`}>MAX прибыль</p>
                          <p className={`text-lg font-bold ${maxProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {maxProfit >= 0 ? '+' : ''}{maxProfit.toFixed(2)}%
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`text-xs ${subtleColor} mb-1`}>PNL</p>
                          <div className="flex items-center gap-1">
                            {pnl >= 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <p className={`text-lg font-bold ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}%
                            </p>
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`text-xs ${subtleColor} mb-1`}>Капитализация</p>
                          <p className={`text-lg font-bold ${textColor}`}>
                            {call.currentMarketCap ? `$${(call.currentMarketCap / 1e6).toFixed(2)}M` : '—'}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`text-xs ${subtleColor} mb-1`}>При сигнале</p>
                          <p className={`text-lg font-bold ${textColor}`}>
                            {call.signalMarketCap ? `$${(call.signalMarketCap / 1e6).toFixed(2)}M` : '—'}
                          </p>
                        </div>
                      </div>

                      {/* Call Details */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-2">
                          <Target className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${textColor} mb-1`}>Вход</p>
                            <p className={subtleColor}>{call.entryPoint}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Target className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${textColor} mb-1`}>Цели</p>
                            <p className={subtleColor}>{call.target}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className={`w-5 h-5 mt-0.5 ${subtleColor}`} />
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${textColor} mb-1`}>Стратегия</p>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              call.strategy === 'flip'
                                ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                                : call.strategy === 'medium'
                                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                : 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
                            }`}>
                              {strategyLabels[call.strategy]}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <AlertCircle className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${textColor} mb-1`}>Риски</p>
                            <p className={subtleColor}>{call.risks}</p>
                          </div>
                        </div>
                        {call.cancelConditions && (
                          <div className="flex items-start gap-2">
                            <AlertCircle className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${textColor} mb-1`}>Условия отмены</p>
                              <p className={subtleColor}>{call.cancelConditions}</p>
                            </div>
                          </div>
                        )}
                        {call.comment && (
                          <div className="flex items-start gap-2">
                            <FileText className={`w-5 h-5 mt-0.5 ${subtleColor}`} />
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${textColor} mb-1`}>Комментарий</p>
                              <p className={subtleColor}>{call.comment}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Trade Button */}
                      <button
                        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                          theme === 'dark'
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        Торговля
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {activeTab === 'alerts' && (
          <div className={`${bgColor} rounded-xl p-8 text-center ${borderColor} border`}>
            <p className={subtleColor}>ApeVault Alerts в разработке</p>
          </div>
        )}

        {/* Info Modal */}
        {showInfoModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`${bgColor} rounded-xl p-6 max-w-2xl w-full shadow-2xl border ${borderColor}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-2xl font-bold ${textColor} flex items-center gap-2`}>
                  <Sparkles className="w-6 h-6 text-green-500" />
                  ApeVault CLUB
                </h2>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X className={`w-5 h-5 ${subtleColor}`} />
                </button>
              </div>
              <div className={`space-y-4 ${textColor}`}>
                <p>
                  Это клуб, где участники сообщества могут найти сигналы от опытных и проверенных трейдеров с полной аналитикой, чтобы облегчить свою торговлю.
                </p>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/30 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-red-300' : 'text-red-800'}`}>
                    ⚠️ ВАЖНО: Сигналы трейдеров НЕ являются ИИР (Инвестиционной Информацией с Рекомендацией). 
                    Проводите свою собственную исследовательскую работу перед любыми сделками!
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className={`px-4 py-2 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  } transition-colors`}
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

