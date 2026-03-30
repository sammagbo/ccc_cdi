import { useState, useMemo } from 'react'
import { Filter, Search, BookDashed, ChevronDown } from 'lucide-react'
import { catalogData, categories, BookLevel } from '../services/catalogData'
import BookCard from '../components/catalog/BookCard'
import { useAppStore } from '../store/useAppStore'

export default function Catalog() {
  const globalLevel = useAppStore(state => state.level)

  // Estados dos Filtros
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevels, setSelectedLevels] = useState<BookLevel[]>(globalLevel ? [globalLevel] : ['college', 'lycee'])
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes')
  const [onlyAvailable, setOnlyAvailable] = useState(false)

  // Toggle de Nível de Escolaridade (Filtro Local)
  const toggleLevel = (lvl: BookLevel) => {
    setSelectedLevels(prev => 
      prev.includes(lvl) 
        ? prev.filter(l => l !== lvl)
        : [...prev, lvl]
    )
  }

  // Lógica de Filtragem Dinâmica
  const filteredBooks = useMemo(() => {
    return catalogData.filter(book => {
      // 1. Pesquisa por Título ou Autor
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())

      // 2. Filtro de Nível Escolar (Interseção entre níveis do livro e selecionados)
      const matchesLevel = selectedLevels.length === 0 || book.levels.some(l => selectedLevels.includes(l))

      // 3. Filtro de Categoria
      const matchesCategory = selectedCategory === 'Toutes' || book.category === selectedCategory

      // 4. Filtro de Disponibilidade
      const matchesAvailability = !onlyAvailable || book.available

      return matchesSearch && matchesLevel && matchesCategory && matchesAvailability
    })
  }, [searchQuery, selectedLevels, selectedCategory, onlyAvailable])

  return (
    <div className="min-h-screen relative w-full flex flex-col pt-12 max-w-7xl mx-auto px-6 pb-24">
      
      {/* Cabeçalho da Página */}
      <div className="mb-12 border-b-2 border-notebook-lines pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-2 italic flex items-center gap-3">
            Catalogue
          </h1>
          <p className="text-notebook-pencil/70 font-medium font-sans">
            Recherche ton prochain livre parmi nos collections.
          </p>
        </div>
        
        {/* Barra de Pesquisa Principal Desktop */}
        <div className="relative w-full md:w-96 flex items-center bg-white border-2 border-notebook-lines rounded-full shadow-sm overflow-hidden focus-within:border-blue-300 transition-all">
          <Search className="absolute left-4 w-5 h-5 text-notebook-pencil/40" />
          <input 
            type="text" 
            placeholder="Rechercher titre ou auteur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-transparent text-sm font-serif text-blue-900 placeholder:text-notebook-pencil/40 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Sidebar de Filtros */}
        <aside className="w-full lg:w-72 shrink-0 glass-card p-6 rounded-2xl sticky top-28 border-2 border-notebook-lines shadow-sm">
          <div className="flex items-center gap-2 text-lg font-bold font-serif text-blue-900 border-b border-notebook-lines pb-4 mb-6">
            <Filter className="w-5 h-5" /> Filtres
          </div>

          {/* Filtro: Nível Escolar */}
          <div className="mb-6 border-b border-notebook-lines/50 pb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-notebook-pencil/40 mb-3">Niveau</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedLevels.includes('college')}
                  onChange={() => toggleLevel('college')}
                  className="w-5 h-5 rounded border-2 border-notebook-lines text-blue-900 focus:ring-blue-900 focus:ring-offset-0 bg-transparent"
                />
                <span className="text-sm font-bold text-blue-900 group-hover:text-blue-700">Collège</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedLevels.includes('lycee')}
                  onChange={() => toggleLevel('lycee')}
                  className="w-5 h-5 rounded border-2 border-notebook-lines text-blue-900 focus:ring-blue-900 focus:ring-offset-0 bg-transparent"
                />
                <span className="text-sm font-bold text-blue-900 group-hover:text-blue-700">Lycée</span>
              </label>
            </div>
          </div>

          {/* Filtro: Categoria */}
          <div className="mb-6 border-b border-notebook-lines/50 pb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-notebook-pencil/40 mb-3">Catégorie</h3>
            <div className="relative">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-notebook-beige border-2 border-notebook-lines rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-blue-900 focus:outline-none focus:border-blue-300 cursor-pointer"
              >
                <option value="Toutes">Toutes les catégories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-notebook-pencil/40 pointer-events-none" />
            </div>
          </div>

          {/* Filtro: Disponibilidade */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-notebook-pencil/40 mb-3">Disponibilité</h3>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-notebook-lines text-blue-900 focus:ring-blue-900 focus:ring-offset-0 bg-transparent"
              />
              <span className="text-sm font-bold text-blue-900 group-hover:text-emerald-700 transition-colors">En rayon unqiuement</span>
            </label>
          </div>
        </aside>

        {/* Grelha de Resultados */}
        <div className="flex-1 w-full">
          {/* Status Bar */}
          <div className="mb-6 flex items-center justify-between text-sm font-medium text-notebook-pencil/60 border-b-2 border-notebook-lines/30 pb-4">
            <span>
              <strong className="text-blue-900 font-black">{filteredBooks.length}</strong> livre(s) trouvé(s)
            </span>
            {searchQuery && (
              <span className="hidden sm:inline-block italic bg-blue-50 px-3 py-1 rounded-full text-blue-800 border-notebook-lines border border-dashed">
                Recherche: "{searchQuery}"
              </span>
            )}
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center border-2 border-notebook-lines border-dashed rounded-3xl bg-white/40">
              <div className="w-20 h-20 bg-blue-50 border-2 border-notebook-lines rounded-full flex items-center justify-center mb-6 shadow-sm">
                <BookDashed className="w-10 h-10 text-notebook-pencil/40 -rotate-12" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-blue-900 mb-2">Aucun livre trouvé</h3>
              <p className="text-notebook-pencil/70 max-w-sm mx-auto mb-6 font-medium">
                Nous n'avons trouvé aucun livre correspondant à ces critères. Essaye de modifier tes filtres ou d'autres mots-clés.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedLevels(['college', 'lycee'])
                  setSelectedCategory('Toutes')
                  setOnlyAvailable(false)
                }}
                className="px-6 py-3 bg-blue-900 text-white font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-black transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
