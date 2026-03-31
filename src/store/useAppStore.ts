import { create } from 'zustand'
import { CatalogBook, catalogData } from '../services/catalogData'

interface AppState {
  level: 'college' | 'lycee'
  setLevel: (level: 'college' | 'lycee') => void
  isSearchOpen: boolean
  setSearchOpen: (isOpen: boolean) => void
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
