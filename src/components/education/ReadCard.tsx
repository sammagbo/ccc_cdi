import { FileText, Bookmark, Download, ExternalLink } from 'lucide-react'
import { ReadResource } from '../../services/educationData'
import { cn } from '../../lib/utils'

export default function ReadCard({ resource, onOpen }: { resource: ReadResource, onOpen: (r: ReadResource) => void }) {
  const isPDF = resource.type === 'PDF'

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-notebook-lines hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
      {/* Decoração Lateral */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-2 opacity-80",
        isPDF ? "bg-emerald-500" : "bg-indigo-500"
      )}></div>

      <div className="flex items-start gap-4 mb-4">
        <div className={cn(
          "w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border",
          isPDF ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-indigo-50 text-indigo-600 border-indigo-100"
        )}>
          {isPDF ? <FileText className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
        </div>
        
        <div className="flex-1 pt-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-notebook-pencil/40 bg-notebook-beige px-2 py-0.5 rounded-full">
              {resource.subject}
            </span>
            {isPDF && resource.pages && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {resource.pages} pages
              </span>
            )}
            {!isPDF && (
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                Recueil
              </span>
            )}
          </div>
          <h3 className="text-xl font-serif font-bold text-blue-900 group-hover:text-blue-700 transition-colors leading-tight">
            {resource.title}
          </h3>
        </div>
      </div>

      <p className="text-sm font-medium text-notebook-pencil/70 mb-6 flex-1 line-clamp-3">
        {resource.description}
      </p>

      {/* Levels & Action */}
      <div className="flex items-center justify-between border-t border-notebook-lines/50 pt-4 mt-auto">
        <div className="flex gap-1.5">
          {resource.levels.includes('college') && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 tooltip" title="Collège"></div>}
          {resource.levels.includes('lycee') && <div className="w-2.5 h-2.5 rounded-full bg-amber-400 tooltip" title="Lycée"></div>}
        </div>
        
        <button 
          onClick={() => onOpen(resource)}
          className={cn(
            "flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors border",
            isPDF 
              ? "text-emerald-700 hover:bg-emerald-50 border-emerald-200 hover:border-emerald-300"
              : "text-indigo-700 hover:bg-indigo-50 border-indigo-200 hover:border-indigo-300"
          )}
        >
          {isPDF ? (
            <><Download className="w-4 h-4" /> Lire PDF</>
          ) : (
            <><ExternalLink className="w-4 h-4" /> Voir Sélection</>
          )}
        </button>
      </div>
    </div>
  )
}
