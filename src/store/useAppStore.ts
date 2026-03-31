import { create } from 'zustand'
import { CatalogBook, catalogData } from '../services/catalogData'

export type UserRole = 'user' | 'admin'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AppState {
  level: 'college' | 'lycee'
  setLevel: (level: 'college' | 'lycee') => void
  isSearchOpen: boolean
  setSearchOpen: (isOpen: boolean) => void
  
  // Auth State
  user: AuthUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void

  // Catalog State
  books: CatalogBook[]
  addBook: (book: CatalogBook) => void
  updateBook: (id: string, updatedBook: Partial<CatalogBook>) => void
  deleteBook: (id: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  level: 'college',
  setLevel: (level) => set({ level }),
  isSearchOpen: false,
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  
  // Auth Initial State
  user: null, // by default not logged in
  login: async (email, password) => {
    // Mock Authentication Logic
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@lyceemoliere.com' && password === 'admin123') {
          set({
            user: {
              id: 'u_admin_1',
              email: 'admin@lyceemoliere.com',
              name: 'Axelle Beurel',
              role: 'admin'
            }
          })
          resolve(true)
        } else if (email === 'aluno@lyceemoliere.com' && password === 'aluno123') {
          set({
            user: {
              id: 'u_user_1',
              email: 'aluno@lyceemoliere.com',
              name: 'Jean Dubois',
              role: 'user'
            }
          })
          resolve(true)
        } else {
          resolve(false) // invalid credentials
        }
      }, 600) // fake delay for better UX
    })
  },
  logout: () => {
    set({ user: null })
  },

  // Books State Initialized from Mock Data
  books: [...catalogData],
  addBook: (book) => set((state) => ({ books: [book, ...state.books] })),
  updateBook: (id, updatedBook) => set((state) => ({
    books: state.books.map(b => b.id === id ? { ...b, ...updatedBook } : b)
  })),
  deleteBook: (id) => set((state) => ({
    books: state.books.filter(b => b.id !== id)
  }))
}))
