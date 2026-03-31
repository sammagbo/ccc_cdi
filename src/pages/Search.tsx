import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Book, FileText, PlayCircle, Zap, ArrowRight, Loader2, X } from 'lucide-react'
import { searchService, SearchResult, SearchResultType } from '../services/searchService'
import { useAppStore } from '../store/useAppStore'

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [localQuery, setLocalQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  
  const level = useAppStore(state => state.level)

  useEffect(() => {
    const performSearch = async () => {
      if (!initialQuery) return
      setIsSearching(true)
      try {
        const data = await searchService.searchAll(initialQuery, level)
        setResults(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsSearching(false)
      }
    }
    performSearch()
  }, [initialQuery, level])

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery })
    }
  }

  const getResultIcon = (type: SearchResultType) => {
    switch (type) {
      case 'Book': return <Book className="w-5 h-5 text-blue-600" />
      case 'PDF': return <FileText className="w-5 h-5 text-emerald-600" />
      case 'Media': return <PlayCircle className="w-5 h-5 text-rose-500" />
      case 'Quiz': return <Zap className="w-5 h-5 text-amber-500" />
      default: return null
    }
  }

  // Grupar resultados por tipo
  const groupedResults = results.reduce((acc, res) => {
    if (!acc[res.type]) acc[res.type] = []
    acc[res.type].push(res)
    return acc
  }, {} as Record<SearchResultType, SearchResult[]>)

  const categories = [
    { type: 'Book' as SearchResultType, label: 'Livros no Catálogo', icon: <Book className="w-6 h-6" /> },
    { type: 'PDF' as SearchResultType, label: 'Materiais de Estudo', icon: <FileText className="w-6 h-6" /> },
    { type: 'Media' as SearchResultType, label: 'Multimédia', icon: <PlayCircle className="w-6 h-6" /> },
    { type: 'Quiz' as SearchResultType, label: 'Quizzes e Desafios', icon: <Zap className="w-6 h-6" /> },
  ]

  return (
    <div className="min-h-screen pt-12 pb-24 max-w-7xl mx-auto px-6 font-sans">
      
      {/* Search Header & Integrated Bar */}
      <div className="mb-12 border-b-2 border-notebook-lines pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-in-up">
        <div className="max-w-2xl flex-1">
          <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-900 rounded-2xl flex items-center justify-center text-white shadow-thick transform -rotate-3">
                  <Search className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-4xl font-serif font-bold text-blue-900 italic leading-none">
                    Pesquisa CDI
                </h1>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-notebook-pencil/30 mt-2">
                  Resultados Federados • Nível {level}
                </p>
              </div>
          </div>
          
          <form onSubmit={handleLocalSubmit} className="relative group max-w-xl">
            <input 
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="w-full bg-white border-2 border-notebook-lines rounded-2xl px-6 py-4 text-lg font-serif text-blue-950 shadow-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              placeholder="Pesquisar novamente..."
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {localQuery && (
                <button 
                  type="button" 
                  onClick={() => setLocalQuery('')}
                  className="p-2 text-notebook-pencil/20 hover:text-rose-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button 
                type="submit"
                className="bg-blue-900 text-white p-3 rounded-xl hover:bg-black transition-all shadow-md group-hover:scale-105 active:scale-95"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="bg-notebook-beige/40 border border-notebook-lines rounded-2xl px-6 py-4 flex flex-col items-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-notebook-pencil/40 mb-1">Status da Busca</span>
          <p className="text-sm font-serif italic text-blue-900">
            {isSearching ? 'A vasculhar...' : `${results.length} correspondências encontradas`}
          </p>
        </div>
      </div>

      {isSearching ? (
        <div className="flex flex-col items-center justify-center py-24 grayscale opacity-50">
            <Loader2 className="w-16 h-16 animate-spin text-blue-900 mb-6" />
            <p className="font-serif italic text-xl tracking-tight">O motor de busca está a processar os dados...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-20">
          {categories.map((cat) => {
            const catResults = groupedResults[cat.type] || []
            if (catResults.length === 0) return null

            return (
              <section key={cat.type} className="animate-fade-in-up">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-900 border border-blue-100 shadow-sm">
                      {cat.icon}
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-blue-950 italic">
                      {cat.label}
                    </h2>
                  </div>
                  <div className="h-px flex-1 bg-notebook-lines/30 mx-8 hidden lg:block"></div>
                  <span className="bg-white border-2 border-notebook-lines px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-blue-900/40">
                    {catResults.length} {catResults.length === 1 ? 'Item' : 'Itens'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {catResults.map((res) => (
                    <Link
                      key={res.id}
                      to={res.url}
                      className="group flex flex-col bg-white p-8 rounded-3xl border-2 border-notebook-lines hover:border-blue-300 hover:shadow-2xl transition-all relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[100px] -translate-y-12 translate-x-12 group-hover:translate-x-10 group-hover:-translate-y-10 transition-transform"></div>
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="p-3 bg-blue-50 rounded-2xl shadow-sm border border-blue-100 group-hover:scale-110 group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                          {getResultIcon(res.type)}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-notebook-pencil/30 group-hover:text-blue-900 transition-colors">
                          {res.category || res.type}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-serif font-bold text-blue-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
                        {res.title}
                      </h3>
                      <p className="text-xs font-bold text-notebook-pencil/50 uppercase tracking-widest mb-6">
                        {res.subtitle}
                      </p>
                      
                      <div className="mt-auto flex items-center gap-3 text-xs font-black uppercase tracking-widest text-blue-950/40 group-hover:text-blue-900 transition-colors">
                        Explorar Conteúdo <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center border-2 border-notebook-lines border-dashed rounded-[40px] bg-notebook-beige/20 animate-fade-in grayscale">
            <div className="w-24 h-24 bg-white border-2 border-notebook-lines rounded-full flex items-center justify-center mb-8 shadow-thick">
                <Search className="w-10 h-10 text-notebook-pencil/10" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-blue-900 mb-4 italic">Nenhum resultado para "{initialQuery}"</h2>
            <p className="text-notebook-pencil/60 max-w-md mx-auto mb-10 font-medium text-lg leading-relaxed">
              Tentou pesquisar algo diferente? <br/>
              Verifique se o seletor de nível (Collège/Lycée) está na posição correta para o que procura.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                  onClick={() => setLocalQuery('')}
                  className="px-10 py-4 bg-white border-2 border-notebook-lines text-blue-900 font-black text-xs tracking-widest uppercase rounded-2xl hover:bg-notebook-beige transition-all active:scale-95 shadow-sm"
              >
                  Limpar Pesquisa
              </button>
              <Link 
                  to="/catalog"
                  className="px-10 py-4 bg-blue-900 text-white font-black text-xs tracking-widest uppercase rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95"
              >
                  Abrir Catálogo Completo
              </Link>
            </div>
        </div>
      )}
    </div>
  )
}
