import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookMarked, CheckCircle, XCircle, FileText, Download, MapPin, SearchX } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export default function BookDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Find book
  const book = useAppStore(state => state.books).find(b => b.id === id)

  if (!book) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <SearchX className="w-16 h-16 text-notebook-pencil/30 mb-4" />
        <h2 className="text-3xl font-serif font-bold text-blue-900 mb-2">Livre introuvable</h2>
        <p className="text-notebook-pencil/70 mb-8 text-center max-w-md">
          Le document que tu cherches n'existe plus ou a été supprimé du catalogue du CDI.
        </p>
        <button 
          onClick={() => navigate('/catalog')}
          className="bg-blue-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-black transition-colors"
        >
          Retourner au Catalogue
        </button>
      </div>
    )
  }

  const isPhysique = book.type === 'Physique' || book.type === 'Bibliographie'
  
  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-8 pb-24 animate-fade-in-up">
      {/* Botão de Voltar */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-900 font-bold uppercase tracking-widest text-sm mb-10 hover:text-blue-700 transition-colors bg-notebook-beige px-4 py-2 rounded-lg border-2 border-transparent hover:border-notebook-lines w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> Retour au Catalogue
      </button>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* COLUNA ESQUERDA: Capa & Ações */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-card aspect-[2/3] w-full max-w-sm mx-auto rounded-3xl overflow-hidden border-2 border-notebook-lines flex items-center justify-center bg-blue-50/50 p-6 relative group">
            <div className="absolute inset-0 bg-notebook-dots opacity-20"></div>
            
            {book.coverUrl ? (
              <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="w-full h-full object-cover rounded-xl shadow-xl z-10 transition-transform duration-500 group-hover:scale-105" 
              />
            ) : (
              <div className="w-3/4 h-3/4 bg-white border border-notebook-lines shadow-thick rounded flex flex-col items-center justify-center z-10 p-4 text-center transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <BookMarked className="w-16 h-16 text-blue-900/20 mb-4" />
                <h4 className="font-serif font-bold text-blue-900 italic text-xl leading-tight">{book.title}</h4>
              </div>
            )}
          </div>

          {/* Call to Action Block */}
          <div className="mt-4">
            {isPhysique ? (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 text-amber-900">
                <div className="flex items-center gap-3 font-bold mb-2">
                  <MapPin className="w-5 h-5" /> 
                  Où le trouver ?
                </div>
                <p className="text-sm font-medium opacity-80 mb-4">
                  Ce document est un exemplaire physique. Demande-le à la bibliothécaire Axelle avec la référence.
                </p>
                <div className="bg-white px-4 py-3 rounded-xl border border-amber-200 text-center font-mono font-bold text-lg tracking-widest text-amber-900 shadow-sm">
                  REF: {book.id.toUpperCase()}
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 font-bold text-blue-900 mb-2">
                  <FileText className="w-5 h-5" /> 
                  Format Numérique
                </div>
                <p className="text-sm text-blue-900/80 font-medium mb-4">
                  Ce livre est disponible numériquement. Tu peux le lire directement ou le télécharger.
                </p>
                <a 
                  href="#" 
                  className="w-full bg-blue-900 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors"
                >
                  <Download className="w-5 h-5" /> Lire & Télécharger
                </a>
              </div>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA: Info & Metadados */}
        <div className="lg:col-span-8 flex flex-col">
          
          {/* Cabeçalho do Livro */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              {book.available ? (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                  <CheckCircle className="w-4 h-4" /> Disponible en rayon
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                  <XCircle className="w-4 h-4" /> Emprunté
                </div>
              )}
              
              <div className="text-xs font-black uppercase tracking-widest text-notebook-pencil bg-notebook-lines/30 px-3 py-1.5 rounded-full">
                {book.type}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-blue-900 leading-tight mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-notebook-pencil/80 font-serif italic">
              de <span className="font-bold border-b-2 border-blue-200">{book.author}</span>
            </p>
          </div>

          {/* Badges de Metadados */}
          <div className="flex flex-wrap gap-4 mb-10 py-6 border-y-2 border-notebook-lines/50">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-black tracking-widest text-notebook-pencil/40">Catégorie</span>
              <span className="font-bold text-blue-900">{book.category}</span>
            </div>
            
            <div className="w-px h-10 bg-notebook-lines/50 hidden sm:block"></div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-black tracking-widest text-notebook-pencil/40">Niveaux Conseillés</span>
              <div className="flex gap-2">
                {book.levels.includes('college') && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">Collège</span>
                )}
                {book.levels.includes('lycee') && (
                  <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">Lycée</span>
                )}
              </div>
            </div>
          </div>

          {/* Sinopse / Descrição Exaustiva */}
          <div className="prose prose-blue max-w-none">
            <h3 className="text-lg font-black uppercase tracking-widest text-notebook-pencil/40 mb-4">À propos de ce livre</h3>
            <p className="text-lg font-medium text-notebook-pencil/80 leading-relaxed text-justify mb-4">
              {book.synopsis}
            </p>
            {/* Mock Extensão da Descrição */}
            <p className="text-lg font-medium text-notebook-pencil/80 leading-relaxed text-justify">
              Ce livre est l'un des joyaux de notre collection au CDI. Il aborde de nombreuses thématiques 
              fascinantes adaptées à ton public cible. Idéal pour ceux qui cherchent à s'embarquer dans 
              une nouvelle aventure de savoir ou simplement s'évader le temps d'une lecture au creux de notre espace éducatif.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
