import { useMemo } from 'react'
import { Bookmark, Search, ArrowRight, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import BookCard from '../components/catalog/BookCard'

export default function MyCDI() {
  const { user, favorites, books } = useAppStore()

  // Filtrar os livros que estão nos favoritos do utilizador
  const favoritedBooks = useMemo(() => {
    return books.filter(book => favorites.includes(book.id))
  }, [books, favorites])

  if (!user) return null // Handled by ProtectedRoute

  return (
    <div className="min-h-screen relative w-full flex flex-col pt-12 max-w-7xl mx-auto px-6 pb-24">
      
      {/* Cabeçalho do Perfil */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-notebook-lines pb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-900 rounded-3xl flex items-center justify-center text-white text-3xl font-serif italic font-bold shadow-thick transform -rotate-3">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold text-blue-900 italic">
              Mon Espace CDI
            </h1>
            <p className="text-notebook-pencil/60 font-medium mt-1">
              Bonjour, <span className="text-blue-900 font-bold">{user.name}</span>. Bem-vindo à tua biblioteca pessoal.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="bg-white border-2 border-notebook-lines px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
            <Bookmark className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-900">{favorites.length} Guardado(s)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-serif font-bold text-blue-950 flex items-center gap-3">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> Minha Lista de Leitura
        </h2>

        {favoritedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoritedBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center border-2 border-notebook-lines border-dashed rounded-3xl bg-white/40">
            <div className="w-20 h-20 bg-blue-50 border-2 border-notebook-lines rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Bookmark className="w-10 h-10 text-notebook-pencil/20" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-blue-900 mb-2">A tua lista está vazia</h3>
            <p className="text-notebook-pencil/70 max-w-sm mx-auto mb-8 font-medium">
              Ainda não guardaste nenhum livro. Explora o catálogo e clica no ícone do marcador para guardar os teus favoritos!
            </p>
            <Link 
              to="/catalog"
              className="px-8 py-4 bg-blue-900 text-white font-bold text-sm tracking-widest uppercase rounded-xl hover:bg-black transition-all flex items-center gap-3 shadow-md"
            >
              <Search className="w-4 h-4" /> Explorar Catálogo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Info Adicional / Estatísticas (Placeholder) */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-amber-50/50 border-2 border-amber-100 rounded-2xl">
              <h4 className="font-bold text-amber-900 mb-2 uppercase text-xs tracking-widest">Leituras em Curso</h4>
              <p className="text-sm text-amber-800/70 italic font-serif">Esta funcionalidade estará disponível em breve para seguires o teu progresso.</p>
          </div>
          <div className="p-6 bg-blue-50/50 border-2 border-blue-100 rounded-2xl">
              <h4 className="font-bold text-blue-900 mb-2 uppercase text-xs tracking-widest">Histórico</h4>
              <p className="text-sm text-blue-800/70 italic font-serif">Consulta os livros que já requisitaste anteriormente no CDI físico.</p>
          </div>
          <div className="p-6 bg-emerald-50/50 border-2 border-emerald-100 rounded-2xl">
              <h4 className="font-bold text-emerald-900 mb-2 uppercase text-xs tracking-widest">Crachás</h4>
              <p className="text-sm text-emerald-800/70 italic font-serif">Ganha crachás ao completar quizzes e desafios de leitura!</p>
          </div>
      </div>
    </div>
  )
}
