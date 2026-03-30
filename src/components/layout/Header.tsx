import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Library, Menu, X, Search, ChevronDown, GraduationCap, ArrowRight } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const { level, setLevel, isSearchOpen, setSearchOpen } = useAppStore()
  const location = useLocation()

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
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-thick">
              <Library className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl md:text-2xl tracking-tighter text-blue-900 leading-none">
                Axelle Beurel
              </span>
              <span className="text-[10px] font-black font-sans uppercase tracking-[0.2em] opacity-40 text-blue-900">
                CDI 2026
              </span>
            </div>
          </Link>

          {/* Nav Principal (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "text-sm font-bold uppercase tracking-widest transition-colors relative group",
                  location.pathname === link.path ? "text-blue-900" : "text-notebook-pencil/60 hover:text-blue-900"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-2 left-0 w-full h-0.5 bg-blue-900 transition-transform origin-left",
                  location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}></span>
              </Link>
            ))}

            {/* Dropdown Espace Éducatif */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-notebook-pencil/60 hover:text-blue-900 transition-colors"
              >
                Espace Éducatif
                <ChevronDown className={cn("w-4 h-4 transition-transform", isDropdownOpen && "rotate-180")} />
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
          <div className="flex items-center gap-4 relative z-50">
            {/* Global Level Toggle (Collège / Lycée) */}
            <button 
              onClick={() => setLevel(level === 'college' ? 'lycee' : 'college')}
              className="hidden sm:flex shrink-0 items-center bg-notebook-beige border-2 border-notebook-lines rounded-full overflow-hidden p-1 hover:border-blue-200 transition-colors"
              title="Changer de niveau"
            >
              <div className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all",
                level === 'college' ? "bg-blue-900 text-white shadow-md" : "text-notebook-pencil/40 hover:text-notebook-pencil/80"
              )}>
                <GraduationCap className="w-3.5 h-3.5" />
                Collège
              </div>
              <div className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all",
                level === 'lycee' ? "bg-yellow-600 text-white shadow-md" : "text-notebook-pencil/40 hover:text-notebook-pencil/80"
              )}>
                <GraduationCap className="w-3.5 h-3.5" />
                Lycée
              </div>
            </button>

            {/* Global Search Toggle */}
            <button 
              onClick={() => setSearchOpen(!isSearchOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-notebook-pencil hover:bg-blue-50 hover:text-blue-900 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-blue-900 bg-blue-50 hover:bg-blue-100 transition-colors"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Global Search Bar Dropaway */}
        <div className={cn(
          "absolute top-full left-0 w-full bg-white border-b border-notebook-lines overflow-hidden transition-all duration-300 ease-out",
          isSearchOpen ? "h-24 opacity-100 border-b" : "h-0 opacity-0 border-transparent"
        )}>
          <div className="max-w-4xl mx-auto px-6 h-full flex items-center">
            <div className="relative w-full flex items-center">
              <Search className="absolute left-4 w-6 h-6 text-notebook-pencil/30" />
              <input 
                type="text" 
                placeholder={`Rechercher un livre, un auteur, une thématique...`}
                className="w-full pl-14 pr-4 py-4 bg-transparent border-none text-xl font-serif text-blue-900 placeholder-notebook-pencil/30 focus:outline-none focus:ring-0"
                autoFocus={isSearchOpen}
              />
              <button onClick={() => setSearchOpen(false)} className="absolute right-4 text-xs font-bold uppercase tracking-widest text-notebook-pencil/40 hover:text-blue-900">
                Fermer (ESC)
              </button>
            </div>
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
        </nav>
      </div>
    </>
  )
}
