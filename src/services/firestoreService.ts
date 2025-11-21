// Firestore service for students app
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  doc,
  getDoc,
  setDoc,
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

// Student registration and authentication functions
export const registerStudent = async (studentData: {
  name: string
  email: string
  login: string
  password: string
}): Promise<{ success: boolean; error?: string; studentId?: string }> => {
  try {
    // Check if login already exists
    const studentsRef = collection(db, 'students')
    const loginQuery = query(studentsRef, where('login', '==', studentData.login))
    const loginSnapshot = await getDocs(loginQuery)
    
    if (!loginSnapshot.empty) {
      return { success: false, error: 'Логин уже занят' }
    }

    // Check if email already exists
    const emailQuery = query(studentsRef, where('email', '==', studentData.email))
    const emailSnapshot = await getDocs(emailQuery)
    
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

    const docRef = await addDoc(studentsRef, newStudent)
    return { success: true, studentId: docRef.id }
  } catch (error: any) {
    console.error('Error registering student:', error)
    return { success: false, error: error.message || 'Ошибка при регистрации' }
  }
}

export const getStudentByLogin = async (login: string): Promise<StudentData | null> => {
  try {
    const studentsRef = collection(db, 'students')
    const q = query(studentsRef, where('login', '==', login))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      return null
    }

    const doc = snapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as StudentData
  } catch (error) {
    console.error('Error getting student:', error)
    return null
  }
}
