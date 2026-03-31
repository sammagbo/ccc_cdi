import { CatalogBook, catalogData } from './catalogData'

const STORAGE_KEY = 'cdi_catalog_books'
const DELAY_MS = 800 // Simular latência de rede

// Auxiliar para simular atraso
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Camada de Serviço para Gestão de Livros com Persistência em LocalStorage
 */
export const bookService = {
  /**
   * Inicializa e retorna a lista de livros
   */
  async getBooks(): Promise<CatalogBook[]> {
    await delay(DELAY_MS)
    
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      // Primeira vez: guardar dados mock na persistência
      localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogData))
      return [...catalogData]
    }
    
    try {
      return JSON.parse(stored) as CatalogBook[]
    } catch (e) {
      console.error('Erro ao ler do LocalStorage:', e)
      return [...catalogData]
    }
  },

  /**
   * Adiciona um novo livro
   */
  async addBook(book: CatalogBook): Promise<void> {
    await delay(DELAY_MS)
    const books = await this.getBooks()
    const updated = [book, ...books]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  },

  /**
   * Atualiza um livro existente
   */
  async updateBook(id: string, updatedData: Partial<CatalogBook>): Promise<void> {
    await delay(DELAY_MS)
    const books = await this.getBooks()
    const updated = books.map(b => b.id === id ? { ...b, ...updatedData } : b)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  },

  /**
   * Remove um livro
   */
  async deleteBook(id: string): Promise<void> {
    await delay(DELAY_MS)
    const books = await this.getBooks()
    const updated = books.filter(b => b.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }
}
