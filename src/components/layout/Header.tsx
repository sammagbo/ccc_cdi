import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Library, Menu, X, Search, ChevronDown, GraduationCap, ArrowRight, User, LogOut, Shield, Bookmark, Loader2, Book, FileText, PlayCircle, Zap } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { useOmnisearch } from '@/hooks/useOmnisearch'
import { cn } from '@/lib/utils'
import { SearchResultType } from '@/services/searchService'

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const { level, setLevel, isSearchOpen, setSearchOpen, user, logout } = useAppStore()
  const { query, setQuery, topResults, isSearching, totalResults } = useOmnisearch()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchOpen(false)
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const getResultIcon = (type: SearchResultType) => {
    switch (type) {
      case 'Book': return <Book className="w-4 h-4 text-blue-600" />
      case 'PDF': return <FileText className="w-4 h-4 text-emerald-600" />
      case 'Media': return <PlayCircle className="w-4 h-4 text-rose-500" />
      case 'Quiz': return <Zap className="w-4 h-4 text-amber-500" />
      default: return null
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Fechar menus ao mudar de rota
  useEffect(() => {
    setMobileMenuOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Catalogue', path: '/catalog' },
    { name: 'Le Test', path: '/quiz' },
    { name: "L'Espace d'Axelle", path: '/librarian' },
  ]

  const eduLinks = [
    { name: 'Lire (PDFs & Textes)', path: '/education/read' },
    { name: "S'informer (Médias)", path: '/education/inform' },
    { name: 'Jouer (Défis)', path: '/education/play' },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 glass-card border-b border-notebook-lines">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group relative z-50 shrink-0">
            <div className="w-11 h-11 bg-blue-900 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-thick">
              <Library className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl md:text-2xl tracking-tighter text-blue-900 leading-[0.8] mb-1">
                Axelle Beurel
              </span>
              <span className="text-[9px] font-black font-sans uppercase tracking-[0.3em] opacity-30 text-blue-900">
                CDI 2026
              </span>
            </div>
          </Link>

          {/* Nav Principal (Desktop) */}
          <nav className="hidden lg:flex items-center gap-x-8 xl:gap-x-12">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group whitespace-nowrap py-2",
                  location.pathname === link.path ? "text-blue-900" : "text-notebook-pencil/40 hover:text-blue-900"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[3px] bg-blue-900/10 rounded-full transition-all origin-left",
                  location.pathname === link.path ? "scale-x-100 bg-blue-900" : "scale-x-0 group-hover:scale-x-50"
                )}></span>
              </Link>
            ))}

            {/* Dropdown Espace Éducatif */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-notebook-pencil/40 hover:text-blue-900 transition-all py-2 whitespace-nowrap"
              >
                Espace Éducatif
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform opacity-50", isDropdownOpen && "rotate-180")} />
              </button>
              
              {/* Dropdown Content */}
              <div className={cn(
                "absolute top-full right-0 mt-4 w-64 bg-white rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-notebook-lines overflow-hidden transition-all duration-200 origin-top-right",
                isDropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              )}>
                <div className="p-2 space-y-1">
                  {eduLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-notebook-beige text-notebook-pencil font-medium transition-colors group"
                    >
                      {link.name}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-900" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Ações (Desktop & Mobile) */}
          <div className="flex items-center gap-6 relative z-50 shrink-0">
            {/* Global Level Toggle (Collège / Lycée) */}
            <button 
              onClick={() => setLevel(level === 'college' ? 'lycee' : 'college')}
              className="hidden xl:flex items-center bg-notebook-beige border-2 border-notebook-lines rounded-full overflow-hidden p-1 hover:border-blue-200 transition-colors shadow-inner"
              title="Changer de niveau"
            >
              <div className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all",
                level === 'college' ? "bg-blue-900 text-white shadow-md scale-105" : "text-notebook-pencil/30 hover:text-notebook-pencil/60"
              )}>
                <GraduationCap className="w-3.5 h-3.5" />
                Collège
              </div>
              <div className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all",
                level === 'lycee' ? "bg-yellow-600 text-white shadow-md scale-105" : "text-notebook-pencil/30 hover:text-notebook-pencil/60"
              )}>
                <GraduationCap className="w-3.5 h-3.5" />
                Lycée
              </div>
            </button>

            {/* Global Search Toggle */}
            <button 
              onClick={() => setSearchOpen(!isSearchOpen)}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm border",
                isSearchOpen 
                  ? "bg-blue-900 text-white border-blue-950 rotate-90" 
                  : "bg-white text-blue-900 border-notebook-lines hover:bg-blue-50"
              )}
              title="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Auth Actions */}
            <div className="hidden lg:flex border-l border-notebook-lines pl-6 h-10 items-center">
              {user ? (
                <div className="flex items-center gap-4">
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="text-[9px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <Shield className="w-3 h-3" />
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center gap-4 pr-2 border-r border-notebook-lines mr-2">
                    <Link 
                      to="/my-cdi" 
                      className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
                      title="Mon Espace CDI"
                    >
                      <Bookmark className="w-4.5 h-4.5 fill-current" />
                    </Link>
                    <div className="flex flex-col items-end">
                      <span className="text-[11px] font-black text-blue-950 leading-none uppercase tracking-wider">{user.name}</span>
                      <span className="text-[9px] font-bold text-notebook-pencil/40 uppercase tracking-widest mt-0.5">{user.role}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-10 h-10 rounded-full bg-notebook-beige border border-notebook-lines flex items-center justify-center text-notebook-pencil/40 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm"
                    title="Sair"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="px-6 py-2.5 rounded-xl bg-blue-900 border border-blue-950 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Connexion
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-blue-900 bg-blue-50 hover:bg-blue-100 transition-colors"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className={cn(
          "absolute top-full left-0 w-full bg-white border-b border-notebook-lines overflow-visible transition-all duration-300 ease-out",
          isSearchOpen ? "h-auto opacity-100 border-b" : "h-0 opacity-0 border-transparent pointer-events-none"
        )}>
          <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col gap-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
              <Search className="absolute left-4 w-6 h-6 text-notebook-pencil/30" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Rechercher un livre, un auteur, une thématique...`}
                className="w-full pl-14 pr-32 py-4 bg-transparent border-b-2 border-notebook-lines text-2xl font-serif text-blue-900 placeholder-notebook-pencil/30 focus:outline-none focus:ring-0 focus:border-blue-300 transition-colors"
                autoFocus={isSearchOpen}
              />
              <div className="absolute right-4 flex items-center gap-4">
                {isSearching && <Loader2 className="w-5 h-5 animate-spin text-blue-900" />}
                <button type="button" onClick={() => setSearchOpen(false)} className="text-xs font-bold uppercase tracking-widest text-notebook-pencil/40 hover:text-blue-900">
                  Fermer (ESC)
                </button>
              </div>
            </form>

            {/* Drodown de Resultados Rápidos */}
            {query.length >= 2 && (
              <div className="bg-notebook-beige/30 rounded-xl border border-notebook-lines overflow-hidden shadow-inner animate-fade-in">
                {topResults.length > 0 ? (
                  <>
                    <div className="divide-y divide-notebook-lines/30">
                      {topResults.map((res) => (
                        <Link
                          key={res.id}
                          to={res.url}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-4 p-4 hover:bg-white transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm border border-notebook-lines group-hover:scale-110 transition-transform">
                            {getResultIcon(res.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-blue-950 group-hover:text-blue-700">{res.title}</h4>
                            <p className="text-[10px] uppercase font-black tracking-widest text-notebook-pencil/40">{res.subtitle}</p>
                          </div>
                          <div className="text-[10px] font-black uppercase text-notebook-pencil/20 tracking-widest group-hover:text-blue-900/40">
                             {res.type}
                          </div>
                        </Link>
                      ))}
                    </div>
                    {totalResults > 5 && (
                      <button 
                        onClick={handleSearchSubmit}
                        className="w-full p-4 text-center text-xs font-black uppercase tracking-widest text-blue-900 hover:bg-blue-900 hover:text-white transition-all bg-notebook-beige/50"
                      >
                         Ver todos os {totalResults} resultados
                      </button>
                    )}
                  </>
                ) : !isSearching && (
                  <div className="p-8 text-center text-notebook-pencil/40 italic font-serif">
                     Nenhum resultado encontrado para "{query}" no nível {level === 'college' ? 'Collège' : 'Lycée'}.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-24 px-6 flex flex-col transition-all duration-500 lg:hidden",
        isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        {/* Level Toggle na versão Mobile */}
        <div className="flex bg-notebook-beige border-2 border-notebook-lines rounded-xl overflow-hidden p-1 mb-8">
            <button 
                onClick={() => setLevel('college')}
                className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-widest flex justify-center items-center gap-2 transition-all",
                    level === 'college' ? "bg-blue-900 text-white shadow-md" : "text-notebook-pencil/40"
                )}
            >
                <GraduationCap className="w-4 h-4" />
                Collège
            </button>
            <button 
                onClick={() => setLevel('lycee')}
                className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-widest flex justify-center items-center gap-2 transition-all",
                    level === 'lycee' ? "bg-yellow-600 text-white shadow-md" : "text-notebook-pencil/40"
                )}
            >
                <GraduationCap className="w-4 h-4" />
                Lycée
            </button>
        </div>

        <nav className="flex flex-col gap-6 text-2xl font-serif font-bold italic text-blue-900">
          {navLinks.map((link) => (
             <Link key={link.path} to={link.path} className="border-b border-notebook-lines pb-4 hover:pl-4 transition-all">
               {link.name}
             </Link>
          ))}
          <div className="pt-4 space-y-4">
             <div className="text-sm font-black font-sans uppercase tracking-widest text-notebook-pencil/40 not-italic">Espace Éducatif</div>
             {eduLinks.map((link) => (
                <Link key={link.path} to={link.path} className="block text-xl border-b border-notebook-lines pb-2 hover:pl-4 transition-all opacity-80">
                  - {link.name}
                </Link>
             ))}
          </div>

          <div className="mt-auto border-t border-notebook-lines pt-8 pb-12 flex flex-col gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <div className="w-12 h-12 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-sm font-serif text-xl italic font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-blue-950 font-serif leading-none mb-1">{user.name}</span>
                    <span className="text-xs font-black uppercase tracking-widest text-notebook-pencil/40">{user.role}</span>
                  </div>
                </div>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-emerald-100 bg-emerald-50 text-emerald-800 font-bold text-sm tracking-widest uppercase transition-all"
                  >
                    <Shield className="w-4 h-4" /> Painel de Gestão
                  </Link>
                )}
                <Link 
                  to="/my-cdi" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-blue-100 bg-blue-50 text-blue-800 font-bold text-sm tracking-widest uppercase transition-all"
                >
                  <Bookmark className="w-4 h-4 fill-current" /> Mon Espace CDI
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-rose-100 bg-rose-50 text-rose-800 font-bold text-sm tracking-widest uppercase transition-all"
                >
                  <LogOut className="w-4 h-4" /> Terminar Sessão
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="flex items-center justify-center gap-3 px-4 py-5 rounded-xl bg-blue-900 border-2 border-blue-950 text-white font-black text-sm tracking-[0.2em] uppercase transition-all shadow-md"
              >
                <User className="w-5 h-5" /> Iniciar Sessão
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}
