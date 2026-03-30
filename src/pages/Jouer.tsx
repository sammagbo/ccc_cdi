import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Gamepad2, Brain, ExternalLink, Sparkles, BookOpen, ChevronRight } from 'lucide-react'
import { quizGames, externalGames, QuizGame } from '../services/quizGameData'
import QuizEngine from '../components/games/QuizEngine'
import { useAppStore } from '../store/useAppStore'
import { cn } from '../lib/utils'

export default function Jouer() {
  const globalLevel = useAppStore(state => state.level)
  const [activeQuiz, setActiveQuiz] = useState<QuizGame | null>(null)

  // Filtra quizzes por nível
  const availableQuizzes = quizGames.filter(q => q.level === globalLevel)

  // Se um quiz foi selecionado, renderiza o Motor de Jogo
  if (activeQuiz) {
    return (
      <div className="min-h-screen w-full pt-12 pb-24 px-6 max-w-7xl mx-auto">
        <QuizEngine quiz={activeQuiz} onBack={() => setActiveQuiz(null)} />
      </div>
    )
  }

  // ---------- LANDING PAGE "JOUER" ----------
  return (
    <div className="min-h-screen w-full flex flex-col pt-12 pb-24 relative">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-violet-100/30 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-800 text-xs font-black uppercase tracking-widest mb-6">
            <Gamepad2 className="w-4 h-4" /> Jouer & Apprendre
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 leading-[1.1] mb-6">
            Teste tes <span className="italic text-violet-600">connaissances</span> en t'amusant.
          </h1>
          <p className="text-lg font-medium text-notebook-pencil/80">
            Des quiz interactifs, des jeux pédagogiques et même un test de personnalité de lecteur ! Contenu filtré pour le niveau <strong className="uppercase text-blue-900">{globalLevel}</strong>.
          </p>
        </div>

        {/* Section 1: Le Test de Profil de Lecteur (lien para o Quiz original) */}
        <div className="mb-16">
          <h2 className="text-xs font-black uppercase tracking-widest text-notebook-pencil/40 mb-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Expérience Interactive
          </h2>
          <Link 
            to="/quiz"
            className="block w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-violet-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden group hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-56 h-56 bg-violet-500/20 rounded-full blur-[60px] group-hover:bg-violet-400/30 transition-all"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="text-4xl mb-3">📖✨</div>
                <h3 className="text-3xl font-serif font-bold mb-2 group-hover:text-violet-200 transition-colors">
                  Le Test — Quel lecteur es-tu ?
                </h3>
                <p className="text-white/70 font-medium max-w-xl text-lg">
                  Réponds à trois questions et découvre ton profil de lecteur personnalisé, avec une pile de livres recommandés spécialement pour toi.
                </p>
              </div>
              <div className="shrink-0 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all">
                <BookOpen className="w-8 h-8" />
              </div>
            </div>
          </Link>
        </div>

        {/* Section 2: Quiz Pedagógicos */}
        <div className="mb-16">
          <h2 className="text-xs font-black uppercase tracking-widest text-notebook-pencil/40 mb-6 flex items-center gap-2">
            <Brain className="w-4 h-4" /> Quiz de Connaissances
          </h2>

          {availableQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableQuizzes.map(quiz => (
                <button
                  key={quiz.id}
                  onClick={() => setActiveQuiz(quiz)}
                  className="text-left bg-white rounded-2xl p-6 border-2 border-notebook-lines shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                >
                  {/* Decoração Lateral Colorida */}
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-2",
                    quiz.color === 'amber' ? 'bg-amber-400' :
                    quiz.color === 'blue' ? 'bg-blue-500' :
                    quiz.color === 'rose' ? 'bg-rose-500' :
                    quiz.color === 'violet' ? 'bg-violet-500' : 'bg-blue-500'
                  )}></div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border shrink-0",
                      quiz.color === 'amber' ? 'bg-amber-50 border-amber-100' :
                      quiz.color === 'blue' ? 'bg-blue-50 border-blue-100' :
                      quiz.color === 'rose' ? 'bg-rose-50 border-rose-100' :
                      quiz.color === 'violet' ? 'bg-violet-50 border-violet-100' : 'bg-blue-50 border-blue-100'
                    )}>
                      {quiz.emoji}
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-blue-900 group-hover:text-violet-700 transition-colors leading-tight">
                        {quiz.title}
                      </h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-notebook-pencil/40">
                        {quiz.subject} • {quiz.questions.length} questions
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-notebook-pencil/70 font-medium flex-1 mb-4">
                    {quiz.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-notebook-lines/50 mt-auto">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                      quiz.level === 'college' ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    )}>
                      {quiz.level === 'college' ? 'Collège' : 'Lycée'}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-violet-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Jouer <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/50 rounded-3xl border-2 border-dashed border-notebook-lines">
              <p className="text-notebook-pencil/60 font-medium">Aucun quiz disponible pour le niveau <strong className="uppercase">{globalLevel}</strong>.</p>
            </div>
          )}
        </div>

        {/* Section 3: Jogos Externos */}
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-notebook-pencil/40 mb-6 flex items-center gap-2">
            <ExternalLink className="w-4 h-4" /> Jeux Pédagogiques Externes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {externalGames.map(game => (
              <a
                key={game.id}
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 border-2 border-notebook-lines flex items-center gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border shrink-0",
                  game.color === 'teal' ? 'bg-teal-50 border-teal-100' : 'bg-orange-50 border-orange-100'
                )}>
                  {game.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-blue-900 group-hover:text-violet-700 transition-colors text-lg">
                    {game.title}
                  </h3>
                  <p className="text-sm text-notebook-pencil/60 font-medium">{game.description}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-notebook-pencil/30 group-hover:text-violet-500 transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
