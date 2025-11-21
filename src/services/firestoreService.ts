// Firestore service for students app
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import { Call } from '@/types'

// Call (Trading Signal) functions - for students to view calls
export const getCalls = async (filters?: {
  userId?: string
  network?: string
  strategy?: string
  status?: string
  activeOnly?: boolean
}): Promise<Call[]> => {
  const callsRef = collection(db, 'calls')
  let q: ReturnType<typeof query> = query(callsRef, orderBy('createdAt', 'desc'))

  if (filters?.userId) {
    q = query(callsRef, where('userId', '==', filters.userId), orderBy('createdAt', 'desc'))
  }
  if (filters?.status) {
    q = query(callsRef, where('status', '==', filters.status), orderBy('createdAt', 'desc'))
  }
  if (filters?.activeOnly) {
    const yesterday = new Date()
    yesterday.setHours(yesterday.getHours() - 24)
    q = query(
      callsRef,
      where('status', '==', 'active'),
      where('createdAt', '>=', yesterday.toISOString()),
      orderBy('createdAt', 'desc')
    )
  }

  const snapshot = await getDocs(q)
  let calls = snapshot.docs.map((doc) => {
    const data = doc.data() as any
    return {
      id: doc.id,
      userId: data.userId || '',
      network: data.network || '',
      ticker: data.ticker || '',
      pair: data.pair || '',
      entryPoint: data.entryPoint || '',
      target: data.target || '',
      strategy: data.strategy || 'flip',
      risks: data.risks || '',
      cancelConditions: data.cancelConditions,
      comment: data.comment,
      createdAt: data.createdAt || new Date().toISOString(),
      status: data.status || 'active',
      maxProfit: data.maxProfit,
      currentPnL: data.currentPnL,
      currentMarketCap: data.currentMarketCap,
      signalMarketCap: data.signalMarketCap,
      currentPrice: data.currentPrice,
      entryPrice: data.entryPrice
    } as Call
  })

  // Apply additional filters in memory
  if (filters?.network) {
    calls = calls.filter(c => c.network === filters.network)
  }
  if (filters?.strategy) {
    calls = calls.filter(c => c.strategy === filters.strategy)
  }

  // Filter by active (24 hours) if needed
  if (filters?.activeOnly && !filters.status) {
    const yesterday = new Date()
    yesterday.setHours(yesterday.getHours() - 24)
    calls = calls.filter(c => {
      const createdAt = new Date(c.createdAt)
      return c.status === 'active' && createdAt >= yesterday
    })
  }

  return calls
}
