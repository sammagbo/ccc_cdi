import { useState, useMemo } from 'react'
import { BookOpen, BookDashed } from 'lucide-react'
import { readResources, readSubjects, ReadResource } from '../services/educationData'
import ReadCard from '../components/education/ReadCard'
import PDFViewerModal from '../components/education/PDFViewerModal'
import { useAppStore } from '../store/useAppStore'
import { cn } from '../lib/utils'

export default function EducationRead() {
  const globalLevel = useAppStore(state => state.level)
  const [activeSubject, setActiveSubject] = useState<string>('Toutes')
  const [selectedDocument, setSelectedDocument] = useState<ReadResource | null>(null)

  // Filtra dependendo do Nível da App e da Disciplina escolhida
  const filteredResources = useMemo(() => {
    return readResources.filter(res => {
      const matchSubject = activeSubject === 'Toutes' || res.subject === activeSubject
      const matchLevel = res.levels.includes(globalLevel)
      return matchSubject && matchLevel
    })
  }, [activeSubject, globalLevel])

  return (
    <div className="min-h-screen relative w-full flex flex-col pt-12 pb-24">
      
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Cabeçalho Inspirador */}
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest mb-6">
            <BookOpen className="w-4 h-4" /> Espace Éducatif
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 leading-[1.1] mb-6">
            Plonge dans la <span className="italic text-emerald-700">lecture</span> et explore d'autres univers.
          </h1>
          <p className="text-lg font-medium text-notebook-pencil/80">
            Retrouve ici tous nos dossiers exclusifs, PDFs en accès libre, et bibliographies préparées par vos professeurs.
            Filtré automatiquement pour le <strong className="text-blue-900 uppercase">{globalLevel}</strong>.
          </p>
        </div>

        {/* Navegação Topo por Disciplinas */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-12 pb-2">
          <button 
            onClick={() => setActiveSubject('Toutes')}
            className={cn(
              "shrink-0 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all",
              activeSubject === 'Toutes' 
                ? "bg-blue-900 text-white shadow-md -translate-y-1" 
                : "bg-white border-2 border-notebook-lines text-notebook-pencil hover:text-blue-900 hover:border-blue-900/50"
            )}
          >
            Toutes les matières
          </button>
          
          {readSubjects.map(subject => (
            <button 
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={cn(
                "shrink-0 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all",
                activeSubject === subject 
                  ? "bg-emerald-600 text-white shadow-md -translate-y-1" 
                  : "bg-white border-2 border-notebook-lines text-notebook-pencil hover:text-emerald-700 hover:border-emerald-300"
              )}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Grelha de Documentos Filtrados */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <ReadCard 
                key={res.id} 
                resource={res} 
                onOpen={(r) => setSelectedDocument(r)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-notebook-lines border-dashed rounded-3xl bg-white/40">
            <BookDashed className="w-16 h-16 text-notebook-pencil/30 mb-6" />
            <h3 className="text-2xl font-serif font-bold text-blue-900 mb-2">Aucun document</h3>
            <p className="text-notebook-pencil/70 font-medium">
              Nous n'avons aucun recueil pour "{activeSubject}" au niveau {globalLevel.toUpperCase()}.
            </p>
          </div>
        )}
      </div>

      {/* Viewer Modal Overlay */}
      {selectedDocument && (
        <PDFViewerModal 
          resource={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}

    </div>
  )
}
