import { catalogData, CatalogBook } from './catalogData'

export interface SearchTermStat {
  term: string
  count: number
  trend: 'up' | 'down' | 'stable'
}

export interface SectionAccess {
  name: string
  count: number
  color: string
}

export interface PopularBook extends CatalogBook {
  borrowCount: number
  favoriteCount: number
}

const DELAY_MS = 500

/**
 * Serviço de Analytics para o painel administrativo (Mock Data)
 */
export const analyticsService = {
  /**
   * Termos mais pesquisados na semana
   */
  async getTopSearchTerms(): Promise<SearchTermStat[]> {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS))
    return [
      { term: 'Segunda Guerra Mundial', count: 145, trend: 'up' },
      { term: 'Mudanças Climáticas', count: 98, trend: 'stable' },
      { term: 'IA e o futuro', count: 87, trend: 'up' },
      { term: 'Camões', count: 76, trend: 'down' },
      { term: 'Manga e Anime', count: 65, trend: 'up' },
      { term: 'Revolução Francesa', count: 54, trend: 'stable' },
      { term: 'Matemática A', count: 43, trend: 'up' },
      { term: 'Código de Conduta', count: 32, trend: 'stable' },
      { term: 'Harry Potter', count: 28, trend: 'down' },
      { term: 'Poesia Moderna', count: 21, trend: 'up' },
    ]
  },

  /**
   * Livros com maior engajamento (favoritos + empréstimos simulados)
   */
  async getTopEngagedBooks(): Promise<PopularBook[]> {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS))
    // Selecionar alguns livros do catálogo e adicionar estatísticas
    const selectedIds = ['bk-01', 'bk-04', 'bk-05', 'bk-06', 'bk-09']
    return catalogData
      .filter(b => selectedIds.includes(b.id))
      .map(b => ({
        ...b,
        borrowCount: Math.floor(Math.random() * 50) + 20,
        favoriteCount: Math.floor(Math.random() * 30) + 10
      }))
      .sort((a, b) => (b.borrowCount + b.favoriteCount) - (a.borrowCount + a.favoriteCount))
  },

  /**
   * Distribuição de acessos por secção da plataforma
   */
  async getSectionUsage(): Promise<SectionAccess[]> {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS))
    return [
      { name: 'Lire (PDF/Artigos)', count: 450, color: '#10b981' }, // emerald-500
      { name: "S'informer (Média)", count: 320, color: '#f59e0b' }, // amber-500
      { name: 'Jouer (Quizzes)', count: 280, color: '#f43f5e' },    // rose-500
      { name: 'Catálogo', count: 680, color: '#3b82f6' }            // blue-500
    ]
  },

  /**
   * Estatísticas gerais (Cards de topo)
   */
  async getGeneralStats() {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS))
    return {
      totalSearches: 2450,
      activeUsers: 342,
      pendingRequests: 12,
      newFavoritesThisWeek: 89
    }
  }
}
