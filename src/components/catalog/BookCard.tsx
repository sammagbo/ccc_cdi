import { BookMarked, CheckCircle, XCircle, Info, ExternalLink, Bookmark } from 'lucide-react'
import { CatalogBook } from '../../services/catalogData'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { cn } from '../../lib/utils'

export default function BookCard({ book }: { book: CatalogBook }) {
  const { user, favorites, toggleFavorite } = useAppStore()
  const isAvailable = book.available
  const isFavorited = favorites.includes(book.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      alert('Inicia sessão para guardar livros nos teus favoritos! ✨')
      return
    }

    toggleFavorite(book.id)
  }

  return (
    <div className="glass-card flex flex-col h-full rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-notebook-lines border-2 relative">
      
      {/* Favorite Toggle Button (Floating) */}
      <button 
        onClick={handleToggleFavorite}
        className={cn(
          "absolute top-4 left-4 z-20 w-9 h-9 rounded-xl border-2 transition-all flex items-center justify-center shadow-sm",
          isFavorited 
            ? "bg-blue-900 border-blue-900 text-white" 
            : "bg-white/90 backdrop-blur-sm border-notebook-lines text-notebook-pencil hover:border-blue-400 hover:text-blue-900"
        )}
        title={isFavorited ? "Remover dos favoritos" : "Guardar nos favoritos"}
      >
        <Bookmark className={cn("w-5 h-5", isFavorited && "fill-current")} />
      </button>

      {/* Cover / Top Section */}
      <div className="relative aspect-[3/2] w-full bg-blue-50 flex flex-col items-center justify-center p-6 border-b-2 border-notebook-lines border-dashed">
        <div className="absolute inset-0 bg-notebook-dots opacity-20"></div>
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-notebook-pencil shadow-sm border border-notebook-lines opacity-40 group-hover:opacity-100 transition-opacity">
          {book.type}
        </div>

        {/* Level Badges */}
        <div className="absolute bottom-3 right-3 flex gap-1">
          {book.levels.includes('college') && (
            <span className="bg-emerald-100 text-emerald-800 text-[9px] px-2 py-0.5 rounded-full font-bold shadow-sm uppercase">Collège</span>
          )}
          {book.levels.includes('lycee') && (
            <span className="bg-amber-100 text-amber-800 text-[9px] px-2 py-0.5 rounded-full font-bold shadow-sm uppercase">Lycée</span>
          )}
        </div>

        {/* Placeholder Icon / Cover */}
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} className="h-full object-cover rounded shadow-md z-10 group-hover:scale-105 transition-transform" />
        ) : (
          <div className="h-24 w-16 bg-white border border-notebook-lines shadow-sm flex items-center justify-center rounded-sm z-10 group-hover:scale-105 transition-transform rotate-3">
            <BookMarked className="w-8 h-8 text-blue-900/30" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col bg-white/50">
        <div className="flex justify-between items-start gap-2 mb-1">
          <p className="text-[10px] font-black font-sans uppercase tracking-widest text-blue-600/70">
            {book.category}
          </p>
          {isAvailable ? (
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 tracking-wider">
              <CheckCircle className="w-3 h-3" /> DISPO
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[10px] font-bold text-rose-500 tracking-wider">
              <XCircle className="w-3 h-3" /> EMPRUNTÉ
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-serif font-bold text-blue-900 leading-tight mb-1 group-hover:text-blue-700 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm font-semibold text-notebook-pencil/60 mb-3">
          {book.author}
        </p>

        <p className="text-sm text-notebook-pencil/80 font-serif italic line-clamp-2 mt-auto">
          "{book.synopsis}"
        </p>

        {/* Actions */}
        <div className="mt-5 pt-4 border-t border-notebook-lines flex gap-2">
          <Link to={`/catalog/${book.id}`} className="flex-1 bg-notebook-beige hover:bg-blue-50 text-blue-900 border border-notebook-lines font-bold text-xs uppercase tracking-widest py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Info className="w-4 h-4" /> Détails
          </Link>
          {book.type === 'PDF' && (
            <Link to="#" className="px-3 bg-blue-900 hover:bg-black text-white rounded-lg transition-colors flex items-center justify-center tooltip" title="Lire en ligne">
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
