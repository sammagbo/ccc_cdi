import { useState, useMemo } from 'react'
import { PlayCircle, Podcast, Video, ChevronRight, Hash } from 'lucide-react'
import { mediaResources, mediaSubjects, MediaResource, MediaType } from '../services/mediaData'
import MediaCard from '../components/education/MediaCard'
import MediaPlayerModal from '../components/education/MediaPlayerModal'
import { useAppStore } from '../store/useAppStore'
import { cn } from '../lib/utils'

export default function EducationInform() {
  const globalLevel = useAppStore(state => state.level)
  const [activeFilter, setActiveFilter] = useState<'Tous' | MediaType>('Tous')
  const [selectedMedia, setSelectedMedia] = useState<MediaResource | null>(null)

  // Filtra todo o conteúdo com base no nível global e no tipo selecionado (Vídeo, Podcast ou Todos)
  const filteredData = useMemo(() => {
    return mediaResources.filter(media => {
      const matchLevel = media.levels.includes(globalLevel)
      const matchType = activeFilter === 'Tous' || media.type === activeFilter
      return matchLevel && matchType
    })
  }, [globalLevel, activeFilter])

  // Agrupa os itens filtrados por subject para desenhar as "Prateleiras" (Shelves) estilo Netflix
  const shelves = useMemo(() => {
    return mediaSubjects.map(subject => ({
      subject,
      items: filteredData.filter(m => m.subject === subject)
    })).filter(shelf => shelf.items.length > 0) // Só mostrar prateleiras que tenham conteúdo
  }, [filteredData])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative">
      
      {/* Background Ambience Top */}
      <div className="absolute top-0 inset-x-0 h-[60vh] bg-gradient-to-b from-blue-900/20 via-slate-900/40 to-slate-950 pointer-events-none z-0"></div>

      <div className="max-w-[1600px] w-full mx-auto px-6 py-12 md:py-20 z-10 flex-1 flex flex-col">
        
        {/* Cabeçalho */}
        <div className="mb-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
            <PlayCircle className="w-4 h-4" /> S'informer
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-white leading-tight mb-4">
            Explore de Nouveaux <span className="italic text-blue-400">Horizons</span>.
          </h1>
          <p className="text-xl font-medium text-slate-400 max-w-2xl">
            Vidéos éducatives, documentaires et podcasts triés sur le volet pour approfondir tes connaissances.
          </p>
        </div>

        {/* Barra de Filtros (Todos, Vídeos, Audios) */}
        <div className="flex gap-4 mb-14 overflow-x-auto hide-scrollbar pb-4 border-b border-slate-800">
          <button 
            onClick={() => setActiveFilter('Tous')}
            className={cn(
              "shrink-0 px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2",
              activeFilter === 'Tous' 
                ? "bg-slate-100 text-slate-900 shadow-lg shadow-white/10" 
                : "bg-slate-900 border-2 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600"
            )}
          >
            <Hash className="w-4 h-4" /> Tous
          </button>
          
          <button 
            onClick={() => setActiveFilter('Video')}
            className={cn(
              "shrink-0 px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2",
              activeFilter === 'Video' 
                ? "bg-red-600 text-white shadow-lg shadow-red-500/20" 
                : "bg-slate-900 border-2 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600"
            )}
          >
            <Video className="w-4 h-4" /> Vidéos Uniquement
          </button>

          <button 
            onClick={() => setActiveFilter('Podcast')}
            className={cn(
              "shrink-0 px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2",
              activeFilter === 'Podcast' 
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" 
                : "bg-slate-900 border-2 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600"
            )}
          >
            <Podcast className="w-4 h-4" /> Audios & Podcasts
          </button>
        </div>

        {/* Prateleiras (Galleries horinzontais) */}
        <div className="flex flex-col gap-12 pb-24">
          {shelves.length > 0 ? (
            shelves.map(shelf => (
              <div key={shelf.subject} className="flex flex-col group/shelf">
                {/* Título da Prateleira */}
                <div className="flex justify-between items-end mb-4 px-2">
                  <h2 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
                    {shelf.subject}
                    <ChevronRight className="w-6 h-6 text-slate-600 group-hover/shelf:text-blue-400 transition-colors opacity-0 group-hover/shelf:opacity-100 -translate-x-2 group-hover/shelf:translate-x-0" />
                  </h2>
                </div>
                
                {/* Horizontal Scroll Area */}
                <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 pt-2 px-2 snap-x snap-mandatory">
                  {shelf.items.map(media => (
                    <div key={media.id} className="snap-start">
                      <MediaCard 
                        media={media} 
                        onPlay={(m) => setSelectedMedia(m)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="w-full flex items-center justify-center p-24 bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-800">
              <div className="text-center flex flex-col items-center">
                <PlayCircle className="w-16 h-16 text-slate-700 mb-6" />
                <h3 className="text-xl font-bold text-slate-400 mb-2">Aucun média trouvé</h3>
                <p className="text-slate-500">Pas de type "{activeFilter}" pour cette section.</p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Modal / Video Player Overlay */}
      {selectedMedia && (
        <MediaPlayerModal 
          media={selectedMedia} 
          onClose={() => setSelectedMedia(null)} 
        />
      )}

    </div>
  )
}
