import { Play, Headphones, Clock } from 'lucide-react'
import { MediaResource } from '../../services/mediaData'
import { cn } from '../../lib/utils'

export default function MediaCard({ media, onPlay }: { media: MediaResource, onPlay: (m: MediaResource) => void }) {
  const isVideo = media.type === 'Video'

  return (
    <div 
      onClick={() => onPlay(media)}
      className="group cursor-pointer shrink-0 w-[280px] sm:w-[320px] bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-slate-700/50"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
        <img 
          src={media.thumbnailUrl} 
          alt={media.title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
        />
        
        {/* Overlay Escuro Inferior */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent"></div>

        {/* Tipo e Nível Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {media.levels.includes('college') && (
            <span className="bg-emerald-500/90 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded shadow-sm">
              Collège
            </span>
          )}
          {media.levels.includes('lycee') && (
            <span className="bg-amber-500/90 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded shadow-sm">
              Lycée
            </span>
          )}
        </div>

        {/* Duração */}
        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1.5 backdrop-blur-sm">
          <Clock className="w-3 h-3 text-slate-400" />
          {media.duration}
        </div>

        {/* Ícone de Play Centrado ao Fazer Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
            {isVideo ? (
              <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
            ) : (
              <Headphones className="w-6 h-6 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Media Info */}
      <div className="p-4 flex-1 flex flex-col bg-slate-900 relative">
        <div className="flex justify-between items-start gap-3 mb-1">
          <h3 className="text-slate-100 font-bold leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
            {media.title}
          </h3>
          <div className={cn(
            "mt-1 p-1.5 rounded-lg shrink-0",
            isVideo ? "bg-red-500/10 text-red-400" : "bg-purple-500/10 text-purple-400"
          )}>
            {isVideo ? <Play className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
          </div>
        </div>
        
        {media.presenter && (
          <p className="text-[12px] font-medium text-slate-400 mb-2 truncate">
            {media.presenter}
          </p>
        )}

        {/* Progress Bar simulada inferior */}
        <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full group-hover:bg-slate-700 transition-colors">
          <div className="h-full bg-red-500 w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
        </div>
      </div>
    </div>
  )
}
