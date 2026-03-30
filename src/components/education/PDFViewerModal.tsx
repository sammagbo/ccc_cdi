import { X, Download, Maximize2 } from 'lucide-react'
import { ReadResource } from '../../services/educationData'

interface PDFViewerModalProps {
  resource: ReadResource
  onClose: () => void
}

export default function PDFViewerModal({ resource, onClose }: PDFViewerModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-blue-900/60 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-notebook-beige w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-notebook-lines relative animate-drop-in">
        
        {/* Barre Supérieure du Modal */}
        <div className="bg-white border-b border-notebook-lines px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black tracking-widest text-notebook-pencil/60">
              Visionneuse : {resource.subject}
            </span>
            <h2 className="text-xl font-serif font-bold text-blue-900 truncate max-w-md md:max-w-xl">
              {resource.title}
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-notebook-pencil hover:text-blue-900 transition-colors">
              <Download className="w-4 h-4" /> Télécharger
            </button>
            <div className="w-px h-6 bg-notebook-lines mx-2 hidden sm:block"></div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-rose-100 hover:text-rose-900 text-notebook-pencil rounded-full transition-colors"
              title="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Espace Contenu (Iframe simulé) */}
        <div className="flex-1 bg-gray-100 overflow-hidden relative p-4 flex flex-col">
          {resource.type === 'PDF' && (
            <iframe 
              src={resource.url} 
              className="w-full flex-1 bg-white shadow-md border border-gray-200 rounded-xl"
              title={`PDF de ${resource.title}`}
            />
          )}

          {resource.type === 'Bibliographie' && (
            <div className="flex-1 bg-white shadow-md border border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <Maximize2 className="w-10 h-10 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-blue-900 mb-4">Bibliographie Recommandée</h3>
              <p className="text-notebook-pencil/70 max-w-sm mb-8">
                Cette liste d'ouvrages recommandés a été envoyée sur ton espace personnel ou est disponible à l'accueil du CDI !
              </p>
              <button 
                onClick={onClose}
                className="px-6 py-3 bg-blue-900 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-black transition-colors"
>
                J'ai compris
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
