import { BookMarked, FileText, PlayCircle, Gamepad2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

export default function QuickLinks() {
  const links = [
    {
      title: 'Catalogue',
      desc: 'Trouve ton prochain livre favori.',
      icon: <BookMarked className="w-8 h-8" />,
      path: '/catalog',
      color: 'bg-indigo-50 text-indigo-600',
      hover: 'group-hover:bg-indigo-600 group-hover:text-white',
    },
    {
      title: 'Lire',
      desc: 'Articles, dossiers PDF et sélections.',
      icon: <FileText className="w-8 h-8" />,
      path: '/education/read',
      color: 'bg-emerald-50 text-emerald-600',
      hover: 'group-hover:bg-emerald-600 group-hover:text-white',
    },
    {
      title: "S'informer",
      desc: 'Révise avec des vidéos et podcasts.',
      icon: <PlayCircle className="w-8 h-8" />,
      path: '/education/inform',
      color: 'bg-amber-50 text-amber-600',
      hover: 'group-hover:bg-amber-600 group-hover:text-white',
    },
    {
      title: 'Jouer',
      desc: 'Quizz et défis pédagogiques amusants.',
      icon: <Gamepad2 className="w-8 h-8" />,
      path: '/quiz',
      color: 'bg-rose-50 text-rose-600',
      hover: 'group-hover:bg-rose-600 group-hover:text-white',
    },
  ]

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto z-10 relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-blue-900 mb-4 italic">
          Où veux-tu aller ?
        </h2>
        <div className="w-24 h-1 bg-blue-200 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {links.map((link) => (
          <Link 
            key={link.title}
            to={link.path}
            className="group block relative glass-card p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-blue-900/20"
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300",
              link.color,
              link.hover
            )}>
              {link.icon}
            </div>
            <h3 className="text-2xl font-bold font-serif text-blue-900 mb-2 group-hover:underline decoration-blue-200 underline-offset-4">
              {link.title}
            </h3>
            <p className="text-sm text-notebook-pencil/70 font-medium mb-6">
              {link.desc}
            </p>
            <div className="absolute bottom-8 right-8 text-blue-900/0 group-hover:text-blue-900 transition-colors">
              <ArrowRight className="w-6 h-6 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
