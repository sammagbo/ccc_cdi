const FAVORITES_KEY_PREFIX = 'cdi_user_favorites_'

/**
 * Camada de Serviço para Dados Específicos do Utilizador (Perfil/Favoritos)
 */
export const userService = {
  /**
   * Recupera os favoritos de um utilizador específico do LocalStorage
   */
  getFavorites(userId: string): string[] {
    const stored = localStorage.getItem(`${FAVORITES_KEY_PREFIX}${userId}`)
    if (!stored) return []
    try {
      return JSON.parse(stored) as string[]
    } catch (e) {
      console.error('Erro ao ler favoritos do utilizador:', e)
      return []
    }
  },

  /**
   * Grava a lista completa de favoritos para um utilizador
   */
  saveFavorites(userId: string, favorites: string[]): void {
    localStorage.setItem(`${FAVORITES_KEY_PREFIX}${userId}`, JSON.stringify(favorites))
  },

  /**
   * Toggles a favorite status for a book (Adds or Removes)
   */
  async toggleFavorite(userId: string, bookId: string): Promise<string[]> {
    // Simular latência de persistência
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const current = this.getFavorites(userId)
    let updated: string[]
    
    if (current.includes(bookId)) {
      updated = current.filter(id => id !== bookId)
    } else {
      updated = [bookId, ...current]
    }
    
    this.saveFavorites(userId, updated)
    return updated
  }
}
