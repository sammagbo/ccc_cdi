import { create } from 'zustand'

interface AppState {
  level: 'college' | 'lycee'
  setLevel: (level: 'college' | 'lycee') => void
  isSearchOpen: boolean
  setSearchOpen: (isOpen: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  level: 'college',
  setLevel: (level) => set({ level }),
  isSearchOpen: false,
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen })
}))
