import { useState, useEffect } from 'react'
import { searchService, SearchResult } from '../services/searchService'
import { useAppStore } from '../store/useAppStore'

/**
 * Hook para lidar com a lógica de Pesquisa Global com Debounce
 */
export function useOmnisearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  
  const level = useAppStore(state => state.level)

  useEffect(() => {
    // Se a query for muito curta, limpar resultados
    if (!query || query.trim().length < 2) {
      setResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)

    // Implementação de Debounce (300ms)
    const timeoutId = setTimeout(async () => {
      try {
        const data = await searchService.searchAll(query, level)
        // No dropdown, mostramos apenas os Top 5 para não sobrecarregar
        setResults(data)
      } catch (err) {
        console.error('Busca falhou:', err)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, level])

  return {
    query,
    setQuery,
    results,
    topResults: results.slice(0, 5), // Apenas top 5 para o live search
    isSearching,
    totalResults: results.length
  }
}
