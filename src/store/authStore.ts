// Authentication store using Zustand for students
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
  logout: () => void
}

// TODO: Replace with actual student authentication
// For now, this is a placeholder - students will be authenticated separately
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (login: string, password: string) => {
        // TODO: Implement actual student authentication
        // For now, placeholder logic
        if (login && password) {
          const student: Student = {
            id: '1',
            name: 'Ученик',
            login: login
          }
          set({ user: student, isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'apevault-students-auth',
    }
  )
)

