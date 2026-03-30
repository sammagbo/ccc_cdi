import { X, PlayCircle, Info } from 'lucide-react'
import { MediaResource } from '../../services/mediaData'
import { cn } from '../../lib/utils'

interface MediaPlayerModalProps {
  media: MediaResource
  onClose: () => void
}

export default function MediaPlayerModal({ media, onClose }: MediaPlayerModalProps) {
  const isVideo = media.type === 'Video'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in-up">
      <div className="w-full max-w-5xl bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-700 relative animate-drop-in">
        
        {/* Cabecalho do Player */}
        <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={cn(
              "p-2 rounded-lg",
              isVideo ? "bg-red-500/10 text-red-500" : "bg-purple-500/10 text-purple-500"
            )}>
              <PlayCircle className="w-5 h-5" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                Lector de {media.type} • {media.subject}
              </span>
              <h2 className="text-lg font-bold text-slate-100 truncate max-w-sm sm:max-w-xl">
                {media.title}
              </h2>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
            title="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Player Container */}
        <div className="w-full aspect-video bg-black flex items-center justify-center relative">
          {isVideo ? (
            <iframe 
              src={media.url} 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full border-0 absolute inset-0"
              title={`Vidéo: ${media.title}`}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black text-slate-300 gap-6">
               <iframe 
                width="100%" 
                height="166" 
                scrolling="no" 
                frameBorder="no" 
                allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
              ></iframe>
              <p className="text-sm font-medium animate-pulse text-purple-400">Audio ready to play</p>
            </div>
          )}
        </div>

        {/* Informações Extras Abaixo */}
        <div className="p-6 bg-slate-900 flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{media.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {media.description}
            </p>
            {media.presenter && (
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <span className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center">?</span>
                Présenté par: <strong className="text-slate-300">{media.presenter}</strong>
              </div>
            )}
          </div>
          <div className="shrink-0 sm:w-64 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest mb-3">
              <Info className="w-4 h-4" /> Détails
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
              <span className="text-slate-500 font-bold uppercase">Durée :</span>
              <span className="text-slate-200">{media.duration}</span>
              <span className="text-slate-500 font-bold uppercase">Sujet :</span>
              <span className="text-slate-200">{media.subject}</span>
              <span className="text-slate-500 font-bold uppercase">Type :</span>
              <span className="text-slate-200">{media.type}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
