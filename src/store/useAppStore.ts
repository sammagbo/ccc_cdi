import { create } from 'zustand'
import { CatalogBook } from '../services/catalogData'
import { bookService } from '../services/bookService'
import { userService } from '../services/userService'

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

  // User Specific Data
  favorites: string[]
  toggleFavorite: (bookId: string) => Promise<void>

  // Catalog State & Async handling
  books: CatalogBook[]
  isLoading: boolean
  error: string | null
  fetchBooks: () => Promise<void>
  addBook: (book: CatalogBook) => Promise<void>
  updateBook: (id: string, updatedBook: Partial<CatalogBook>) => Promise<void>
  deleteBook: (id: string) => Promise<void>
}

export const useAppStore = create<AppState>((set, get) => ({
  level: 'college',
  setLevel: (level) => set({ level }),
  isSearchOpen: false,
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  
  // Auth Initial State
  user: null, 
  login: async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let loggedUser: AuthUser | null = null

        if (email === 'admin@lyceemoliere.com' && password === 'admin123') {
          loggedUser = {
            id: 'u_admin_1',
            email: 'admin@lyceemoliere.com',
            name: 'Axelle Beurel',
            role: 'admin'
          }
        } else if (email === 'aluno@lyceemoliere.com' && password === 'aluno123') {
          loggedUser = {
            id: 'u_user_1',
            email: 'aluno@lyceemoliere.com',
            name: 'Jean Dubois',
            role: 'user'
          }
        }

        if (loggedUser) {
          // Ao logar, carregar os favoritos do utilizador
          const userFavorites = userService.getFavorites(loggedUser.id)
          set({ user: loggedUser, favorites: userFavorites })
          resolve(true)
        } else {
          resolve(false)
        }
      }, 600)
    })
  },
  logout: () => set({ user: null, favorites: [] }),

  // User Data
  favorites: [],
  toggleFavorite: async (bookId: string) => {
    const { user, favorites } = get()
    if (!user) return

    // Optimistic Update
    const isFavorited = favorites.includes(bookId)
    const newFavorites = isFavorited 
      ? favorites.filter(id => id !== bookId)
      : [bookId, ...favorites]
    
    set({ favorites: newFavorites })

    try {
      // Persistência em background
      await userService.toggleFavorite(user.id, bookId)
    } catch (err) {
      // Rollback em caso de erro (raro em LocalStorage, mas boa prática)
      console.error('Erro ao guardar favorito:', err)
      set({ favorites })
    }
  },

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
