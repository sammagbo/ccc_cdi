import { create } from 'zustand'
import { CatalogBook } from '../services/catalogData'
import { bookService } from '../services/bookService'

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

  // Catalog State & Async handling
  books: CatalogBook[]
  isLoading: boolean
  error: string | null
  fetchBooks: () => Promise<void>
  addBook: (book: CatalogBook) => Promise<void>
  updateBook: (id: string, updatedBook: Partial<CatalogBook>) => Promise<void>
  deleteBook: (id: string) => Promise<void>
}

export const useAppStore = create<AppState>((set) => ({
  level: 'college',
  setLevel: (level) => set({ level }),
  isSearchOpen: false,
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  
  // Auth Initial State
  user: null, 
  login: async (email, password) => {
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
          resolve(false)
        }
      }, 600)
    })
  },
  logout: () => set({ user: null }),

  // Catalog State
  books: [],
  isLoading: false,
  error: null,

  fetchBooks: async () => {
    set({ isLoading: true, error: null })
    try {
      const books = await bookService.getBooks()
      set({ books, isLoading: false })
    } catch (err) {
      set({ error: 'Erro ao carregar o catálogo. Tente novamente.', isLoading: false })
    }
  },

  addBook: async (book) => {
    set({ isLoading: true, error: null })
    try {
      await bookService.addBook(book)
      const books = await bookService.getBooks()
      set({ books, isLoading: false })
    } catch (err) {
      set({ error: 'Erro ao adicionar o livro.', isLoading: false })
    }
  },

  updateBook: async (id, updatedBook) => {
    set({ isLoading: true, error: null })
    try {
      await bookService.updateBook(id, updatedBook)
      const books = await bookService.getBooks()
      set({ books, isLoading: false })
    } catch (err) {
      set({ error: 'Erro ao atualizar o livro.', isLoading: false })
    }
  },

  deleteBook: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await bookService.deleteBook(id)
      const books = await bookService.getBooks()
      set({ books, isLoading: false })
    } catch (err) {
      set({ error: 'Erro ao eliminar o livro.', isLoading: false })
    }
  }
}))
