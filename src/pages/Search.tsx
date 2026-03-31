import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Book, FileText, PlayCircle, Zap, ArrowRight, Loader2 } from 'lucide-react'
import { searchService, SearchResult, SearchResultType } from '../services/searchService'
import { useAppStore } from '../store/useAppStore'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const level = useAppStore(state => state.level)
  
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const performSearch = async () => {
      if (!query) return
      setIsSearching(true)
      try {
        const data = await searchService.searchAll(query, level)
        setResults(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsSearching(false)
      }
    }
    performSearch()
  }, [query, level])

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
    { type: 'PDF' as SearchResultType, label: 'Materiais de Estudo (PDFs)', icon: <FileText className="w-6 h-6" /> },
    { type: 'Media' as SearchResultType, label: 'Vídeos e Podcasts', icon: <PlayCircle className="w-6 h-6" /> },
    { type: 'Quiz' as SearchResultType, label: 'Desafios e Quizzes', icon: <Zap className="w-6 h-6" /> },
  ]

  return (
    <div className="min-h-screen pt-12 pb-24 max-w-7xl mx-auto px-6">
      
      {/* Search Header */}
      <div className="mb-12 border-b-2 border-notebook-lines pb-8">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center text-white shadow-thick">
                <Search className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-blue-900 italic">
                Resultados da Pesquisa
            </h1>
        </div>
        <p className="text-notebook-pencil/60 font-medium">
            Encontrámos <span className="text-blue-900 font-bold">{results.length}</span> resultados para 
            <span className="bg-notebook-beige px-3 py-1 rounded-lg ml-2 text-blue-900 font-serif italic font-bold">"{query}"</span>
            no nível <span className="capitalize font-bold">{level}</span>.
        </p>
      </div>

      {isSearching ? (
        <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
            <Loader2 className="w-12 h-12 animate-spin text-blue-900 mb-4" />
            <p className="font-serif italic text-lg">A vasculhar o CDI...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-16">
          {categories.map((cat) => {
            const catResults = groupedResults[cat.type] || []
            if (catResults.length === 0) return null

            return (
              <section key={cat.type} className="animate-fade-in">
                <div className="flex items-center gap-3 mb-8 border-l-4 border-blue-900 pl-4">
                  <div className="text-blue-900 opacity-60">{cat.icon}</div>
                  <h2 className="text-2xl font-serif font-bold text-blue-950">
                    {cat.label} ({catResults.length})
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catResults.map((res) => (
                    <Link
                      key={res.id}
                      to={res.url}
                      className="glass-card flex flex-col p-6 rounded-2xl border-2 border-notebook-lines hover:border-blue-300 hover:shadow-xl transition-all group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-notebook-lines group-hover:scale-110 transition-transform">
                          {getResultIcon(res.type)}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-notebook-pencil/30 group-hover:text-blue-900 transition-colors">
                          {res.category || res.type}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-serif font-bold text-blue-900 mb-2 leading-tight">
                        {res.title}
                      </h3>
                      <p className="text-sm font-bold text-notebook-pencil/50 uppercase tracking-widest mb-4">
                        {res.subtitle}
                      </p>
                      
                      <div className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-tighter text-blue-950/40 group-hover:text-blue-900 transition-colors">
                        Ver detalhes <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center border-2 border-notebook-lines border-dashed rounded-3xl bg-white/40 grayscale">
            <div className="w-20 h-20 bg-blue-50 border-2 border-notebook-lines rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Search className="w-10 h-10 text-notebook-pencil/20" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-blue-900 mb-2">Nenhum resultado encontrado</h2>
            <p className="text-notebook-pencil/70 max-w-sm mx-auto mb-8 font-medium italic">
                Não conseguimos encontrar nada que corresponda a "{query}". <br/>
                Tenta pesquisar por termos mais genéricos ou mudar o nível de ensino.
            </p>
            <Link 
                to="/catalog"
                className="px-8 py-4 bg-blue-900 text-white font-bold text-sm tracking-widest uppercase rounded-xl hover:bg-black transition-all shadow-md"
            >
                Explorar Catálogo Completo
            </Link>
        </div>
      )}
    </div>
  )
}
