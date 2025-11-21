// Authentication store using Zustand for students
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { registerStudent, getStudentByLogin } from '@/services/firestoreService'

interface Student {
  id: string
  name: string
  email?: string
  login: string
}

interface AuthState {
  user: Student | null
  isAuthenticated: boolean
  login: (login: string, password: string) => Promise<boolean>
  register: (name: string, email: string, login: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (login: string, password: string) => {
        try {
          const student = await getStudentByLogin(login)
          if (!student) {
            return false
          }

          // В продакшене нужно сравнивать хешированные пароли
          if (student.password !== password) {
            return false
          }

          const user: Student = {
            id: student.id || '',
            name: student.name,
            email: student.email,
            login: student.login,
          }
          set({ user, isAuthenticated: true })
          return true
        } catch (error) {
          console.error('Login error:', error)
          return false
        }
      },
      register: async (name: string, email: string, login: string, password: string) => {
        try {
          const result = await registerStudent({ name, email, login, password })
          if (result.success && result.studentId) {
            const user: Student = {
              id: result.studentId,
              name,
              email,
              login,
            }
            set({ user, isAuthenticated: true })
            return { success: true }
          }
          return { success: false, error: result.error }
        } catch (error: any) {
          console.error('Registration error:', error)
          return { success: false, error: error.message || 'Ошибка при регистрации' }
        }
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'apevault-students-auth',
    }
  )
)

