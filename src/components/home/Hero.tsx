import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function Hero() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <section className="relative pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden font-sans">
      {/* Decoração sutil exclusiva do Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="animate-fade-in-up max-w-4xl w-full">
        <div className="handwritten text-blue-600 justify-center text-2xl mb-4">Bienvenue au CDI !</div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-blue-900 leading-[1.1] mb-6">
          Ton espace de <span className="italic text-blue-700">découverte</span> et de savoir.
        </h1>
        
        <p className="text-lg md:text-xl text-notebook-pencil/70 mb-12 max-w-2xl mx-auto font-serif">
          Explore notre catalogue, lis des articles passionnants, informe-toi sur le monde ou teste tes connaissances de façon ludique.
        </p>

        {/* Global Search Interface (CTA Principal) */}
        <form 
          onSubmit={handleSearch}
          className="relative max-w-2xl mx-auto transform transition-all hover:scale-[1.02]"
        >
          <div className="absolute inset-0 bg-blue-900/5 blur-xl rounded-full"></div>
          <div className="relative flex items-center bg-white border-2 border-notebook-lines rounded-full shadow-lg overflow-hidden focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
            <div className="pl-6 text-notebook-pencil/40">
              <Search className="w-6 h-6" />
            </div>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher des livres, auteurs, matières..."
              className="w-full py-5 px-4 bg-transparent text-lg font-serif text-blue-900 placeholder:text-notebook-pencil/40 focus:outline-none"
            />
            <button 
              type="submit"
              className="hidden sm:block mr-2 px-8 py-3.5 bg-blue-900 text-white font-black text-xs tracking-[0.2em] uppercase rounded-full hover:bg-black transition-all shadow-md active:scale-95"
            >
              Chercher
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
