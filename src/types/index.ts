// Types for students app

// Call (Trading Signal) types
export type Network = 'solana' | 'bsc' | 'ethereum' | 'base' | 'ton' | 'tron' | 'sui' | 'cex'
export type Strategy = 'flip' | 'medium' | 'long'
export type CallStatus = 'active' | 'completed' | 'cancelled' | 'reviewed'

export interface Call {
  id: string
  userId: string // ID трейдера
  network: Network
  ticker: string // Тикер токена (например, PEPE)
  pair: string // Пара токена (например, PEPE/USDT)
  entryPoint: string // Точка входа или диапазон (например, "0.001" или "0.001-0.002")
  target: string // Цель/ориентиры по прибыли (например, "0.002, 0.003, 0.005")
  strategy: Strategy // Флип, среднесрок, долгосрок
  risks: string // Риски
  cancelConditions?: string // Условия отмены или пересмотра колла
  comment?: string // Комментарий по ситуации
  createdAt: string // ISO timestamp
  status: CallStatus
  
  // Данные для отображения (заполняются из API)
  maxProfit?: number // MAX прибыль в %
  currentPnL?: number // Текущий PNL с момента сигнала в %
  currentMarketCap?: number // Текущая капитализация токена
  signalMarketCap?: number // Капитализация во время дачи сигнала
  currentPrice?: number // Текущая цена токена
  entryPrice?: number // Цена входа
}

// Team members (traders)
export interface User {
  id: string
  name: string
  login: string
  password: string
}

export const TEAM_MEMBERS: User[] = [
  { id: '1', name: 'Артём', login: 'artyom03', password: '248artdex' },
  { id: '2', name: 'Адель', login: 'adel05', password: '058adeldex' },
  { id: '3', name: 'Ксения', login: 'ksen03', password: '907ksendex' },
  { id: '4', name: 'Ольга', login: 'olga04', password: '638olgadex' },
  { id: '5', name: 'Анастасия', login: 'anastasia05', password: '638anastadex' },
]
