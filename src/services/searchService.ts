import { readResources } from './educationData'
import { mediaResources } from './mediaData'
import { quizGames } from './quizGameData'
import { bookService } from './bookService'

export type SearchResultType = 'Book' | 'PDF' | 'Media' | 'Quiz'

export interface SearchResult {
  id: string
  title: string
  subtitle: string
  type: SearchResultType
  url: string
  category?: string
}

/**
 * Serviço de Pesquisa Unificada (Omnisearch)
 */
export const searchService = {
  /**
   * Procura em todas as coleções de dados
   */
  async searchAll(query: string, level: 'college' | 'lycee'): Promise<SearchResult[]> {
    if (!query || query.length < 2) return []

    const q = query.toLowerCase()
    
    // 1. Obter Livros (do bookService que é o único dinâmico por agora)
    const allBooks = await bookService.getBooks()
    const bookResults: SearchResult[] = allBooks
      .filter(b => b.levels.includes(level))
      .filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.author.toLowerCase().includes(q) || 
        b.category.toLowerCase().includes(q)
      )
      .map(b => ({
        id: b.id,
        title: b.title,
        subtitle: b.author,
        type: 'Book',
        url: `/catalog/${b.id}`,
        category: b.category
      }))

    // 2. Obter PDFs / Reading
    const readResults: SearchResult[] = readResources
      .filter(r => r.levels.includes(level))
      .filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.subject.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      )
      .map(r => ({
        id: r.id,
        title: r.title,
        subtitle: r.subject,
        type: 'PDF',
        url: '/education/read',
        category: r.type
      }))

    // 3. Obter Media
    const mediaResults: SearchResult[] = mediaResources
      .filter(m => m.levels.includes(level))
      .filter(m => 
        m.title.toLowerCase().includes(q) || 
        m.subject.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      )
      .map(m => ({
        id: m.id,
        title: m.title,
        subtitle: `${m.type} • ${m.subject}`,
        type: 'Media',
        url: '/education/inform',
        category: m.type
      }))

    // 4. Obter Quizzes
    const quizResults: SearchResult[] = quizGames
      .filter(qz => qz.level === level) // Quizzes têm level singular
      .filter(qz => 
        qz.title.toLowerCase().includes(q) || 
        qz.subject.toLowerCase().includes(q) ||
        qz.description.toLowerCase().includes(q)
      )
      .map(qz => ({
        id: qz.id,
        title: qz.title,
        subtitle: qz.subject,
        type: 'Quiz',
        url: '/quiz',
        category: 'Desafio'
      }))

    // Unificar e retornar
    return [...bookResults, ...readResults, ...mediaResults, ...quizResults]
  }
}
