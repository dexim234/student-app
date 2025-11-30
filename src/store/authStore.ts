// src/store/authStore.ts (Lines 1-94)
// Authentication store using Zustand for students - Mock authentication (no real auth)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface Student {
  id: string
  name: string
  email?: string
  login: string
}

// Mock student data for development
const mockStudent: Student = {
  id: 'mock-student-1',
  name: 'Тестовый Студент',
  email: 'student@example.com',
  login: 'student',
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
      user: mockStudent,
      isAuthenticated: true,
      login: async (login: string, _password: string) => {
        // Mock login - always successful for development
        console.log('Mock login for:', login)
        set({ user: mockStudent, isAuthenticated: true })
        return true
      },
      register: async (_name: string, _email: string, _login: string, _password: string) => {
        // Mock registration - always successful for development
        return { success: true }
      },
      logout: () => set({ user: mockStudent, isAuthenticated: true }), // Mock logout - stay logged in
    }),
    {
      name: 'apevault-students-auth',
    }
  )
)