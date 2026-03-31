import { useState, useEffect } from 'react'
import { searchService, SearchResult } from '../services/searchService'
import { useAppStore } from '../store/useAppStore'

/**
 * Hook para lidar com a lógica de Pesquisa Global com Debounce e Autocomplete (Google Style)
 */
export function useOmnisearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1) // Para navegação por teclado
  
  const level = useAppStore(state => state.level)

  useEffect(() => {
    // Resetar se a query for muito curta
    if (!query || query.trim().length < 2) {
      setResults([])
      setSuggestions([])
      setIsSearching(false)
      setActiveIndex(-1)
      return
    }

    setIsSearching(true)

    // Debounce (300ms)
    const timeoutId = setTimeout(async () => {
      try {
        // Buscar Sugestões (Texto) e Resultados (Cards) em paralelo
        const [suggestionsData, resultsData] = await Promise.all([
          searchService.getSuggestions(query, level),
          searchService.searchAll(query, level)
        ])
        
        setSuggestions(suggestionsData)
        setResults(resultsData)
      } catch (err) {
        console.error('Busca falhou:', err)
        setResults([])
        setSuggestions([])
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, level])

  return {
    query,
    setQuery,
    suggestions,
    results,
    topResults: results.slice(0, 5),
    isSearching,
    totalResults: results.length,
    activeIndex,
    setActiveIndex
  }
}
