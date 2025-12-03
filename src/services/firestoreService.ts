// Firestore service for students app
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import { Call } from '@/types'

export interface StudentData {
  id?: string
  name: string
  email: string
  login: string
  password: string
  createdAt: string
  updatedAt: string
}

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

// Real-time subscription to calls collection
export const subscribeToCalls = (
  callback: (calls: Call[]) => void,
  filters?: {
    userId?: string
    network?: string
    strategy?: string
    status?: string
    activeOnly?: boolean
  }
): Unsubscribe => {
  const callsRef = collection(db, 'calls')
  let q: ReturnType<typeof query> = query(callsRef, orderBy('createdAt', 'desc'))

  if (filters?.userId) {
    q = query(callsRef, where('userId', '==', filters.userId), orderBy('createdAt', 'desc'))
  }
  if (filters?.status && !filters?.activeOnly) {
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

  return onSnapshot(q, (snapshot) => {
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

    callback(calls)
  }, (error) => {
    console.error('Error in calls subscription:', error)
    callback([])
  })
}

// Student registration and authentication functions
export const registerStudent = async (studentData: {
  name: string
  email: string
  login: string
  password: string
}): Promise<{ success: boolean; error?: string; studentId?: string }> => {
  try {
    // Check if Firebase is properly configured
    if (!db) {
      console.error('Firestore database is not initialized')
      return { success: false, error: 'База данных не настроена. Проверьте конфигурацию Firebase.' }
    }

    // Check if login already exists
    const studentsRef = collection(db, 'students')
    const loginQuery = query(studentsRef, where('login', '==', studentData.login))
    
    // Add timeout to prevent infinite waiting
    const loginSnapshot = await Promise.race([
      getDocs(loginQuery),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Таймаут запроса')), 10000))
    ]) as any
    
    if (!loginSnapshot.empty) {
      return { success: false, error: 'Логин уже занят' }
    }

    // Check if email already exists
    const emailQuery = query(studentsRef, where('email', '==', studentData.email))
    const emailSnapshot = await Promise.race([
      getDocs(emailQuery),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Таймаут запроса')), 10000))
    ]) as any
    
    if (!emailSnapshot.empty) {
      return { success: false, error: 'Email уже зарегистрирован' }
    }

    // Create new student
    const now = new Date().toISOString()
    const newStudent: Omit<StudentData, 'id'> = {
      name: studentData.name,
      email: studentData.email,
      login: studentData.login,
      password: studentData.password, // В продакшене нужно хешировать пароль
      createdAt: now,
      updatedAt: now,
    }

    const docRef = await Promise.race([
      addDoc(studentsRef, newStudent),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Таймаут запроса')), 10000))
    ]) as any
    
    return { success: true, studentId: docRef.id }
  } catch (error: any) {
    console.error('Error registering student:', error)
    
    // More specific error messages
    if (error.code === 'permission-denied') {
      return { success: false, error: 'Нет доступа к базе данных. Проверьте правила Firestore.' }
    }
    if (error.code === 'unavailable') {
      return { success: false, error: 'Сервис временно недоступен. Попробуйте позже.' }
    }
    if (error.message === 'Таймаут запроса') {
      return { success: false, error: 'Превышено время ожидания. Проверьте подключение к интернету.' }
    }
    
    return { success: false, error: error.message || 'Ошибка при регистрации' }
  }
}

export const getStudentByLogin = async (login: string): Promise<StudentData | null> => {
  try {
    // Check if Firebase is properly configured
    if (!db) {
      console.error('Firestore database is not initialized')
      return null
    }

    const studentsRef = collection(db, 'students')
    const q = query(studentsRef, where('login', '==', login))
    
    // Add timeout to prevent infinite waiting
    const snapshot = await Promise.race([
      getDocs(q),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Таймаут запроса')), 10000))
    ]) as any
    
    if (snapshot.empty) {
      return null
    }

    const doc = snapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as StudentData
  } catch (error: any) {
    console.error('Error getting student:', error)
    
    // Log specific error for debugging
    if (error.code) {
      console.error('Firestore error code:', error.code)
    }
    
    return null
  }
}
