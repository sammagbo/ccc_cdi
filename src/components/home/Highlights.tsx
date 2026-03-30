import { quizData } from '../../services/mockData'
import { Bookmark, Book, Bell, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Highlights() {
  // Vamos usar os livros do P1 como mock para "Destaques do Mês"
  const recommendedBooks = quizData.books.P1.slice(0, 3)

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-blue-900 mb-4 italic flex items-center gap-3">
            <Bell className="w-8 h-8 text-rose-500" />
            Nouveautés & Recommandations
          </h2>
          <p className="text-notebook-pencil/70 font-medium">
            Les coups de cœur de la bibliothécaire Axelle pour ce mois.
          </p>
        </div>
        <Link to="/catalog" className="hidden md:flex text-blue-900 font-bold uppercase tracking-widest text-sm hover:underline underline-offset-4 items-center gap-2 mt-4 md:mt-0">
          Voir tout le catalogue <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid de Livros Recomendados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendedBooks.map((book: any, idx: number) => (
          <div key={idx} className="glass-card group p-6 sm:p-8 rounded-3xl shadow-thick transition-all hover:-translate-y-2 hover:border-blue-900/40">
            {/* Banner Topo */}
            <div className="flex justify-between items-start mb-6">
              <span className="inline-block px-3 py-1 bg-rose-100 text-rose-900 rounded-lg text-xs font-bold uppercase tracking-widest">
                Coup de ❤️
              </span>
              <div className="text-blue-900/10 group-hover:text-blue-900/20 transition-colors">
                <Bookmark className="w-8 h-8" />
              </div>
            </div>

            {/* Imagem Placeholder */}
            <div className="w-full aspect-video bg-blue-50/50 rounded-xl mb-6 flex items-center justify-center p-6 overflow-hidden relative">
              <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
              <div className="book-card-img text-center h-full w-full flex flex-col items-center justify-center scale-95 group-hover:scale-100 transition-transform duration-500">
                {book.img ? (
                  <img src={book.img} alt={book.title} className="max-h-full max-w-full object-contain drop-shadow-md z-10 relative" />
                ) : (
                  <>
                    <h5 className="text-2xl font-serif font-bold text-blue-900 italic mb-2 relative z-10">{book.title}</h5>
                    <p className="text-xs font-black uppercase tracking-widest text-blue-600/60 relative z-10">{book.author}</p>
                  </>
                )}
              </div>
            </div>

            {/* Texto */}
            <h3 className="text-2xl font-bold font-serif text-blue-900 mb-2 truncate group-hover:text-blue-700 transition-colors">
              {book.title}
            </h3>
            <p className="text-xs font-bold font-sans uppercase tracking-widest text-notebook-pencil/40 mb-4">
              {book.author}
            </p>
            <p className="text-notebook-pencil/70 font-serif italic text-sm line-clamp-3 mb-6 min-h-[4.5rem]">
              {book.desc}
            </p>

            <Link to="/catalog" className="w-full py-4 bg-notebook-beige border-2 border-notebook-lines text-blue-900 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-all flex items-center justify-center gap-2 group/btn">
              <Book className="w-4 h-4 group-hover/btn:-rotate-12 transition-transform" />
              Découvrir
            </Link>
          </div>
        ))}
      </div>

      {/* Mobile only Call to action */}
      <Link to="/catalog" className="mt-8 flex md:hidden justify-center text-blue-900 font-bold uppercase tracking-widest text-sm hover:underline underline-offset-4 items-center gap-2">
        Voir tout le catalogue <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  )
}
