import { useState, useCallback } from 'react'
import { CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw, BookOpen } from 'lucide-react'
import { QuizGame } from '../../services/quizGameData'
import { cn } from '../../lib/utils'
import { Link } from 'react-router-dom'

type Phase = 'playing' | 'feedback' | 'results'

export default function QuizEngine({ quiz, onBack }: { quiz: QuizGame; onBack: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<Phase>('playing')

  const total = quiz.questions.length
  const question = quiz.questions[currentIndex]
  const progress = ((currentIndex) / total) * 100
  const isCorrect = selectedOption === question?.correctIndex

  const handleSelect = useCallback((optIdx: number) => {
    if (phase !== 'playing') return
    setSelectedOption(optIdx)
    if (optIdx === question.correctIndex) {
      setScore(prev => prev + 1)
    }
    setPhase('feedback')
  }, [phase, question])

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= total) {
      setPhase('results')
    } else {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setPhase('playing')
    }
  }, [currentIndex, total])

  const restart = useCallback(() => {
    setCurrentIndex(0)
    setSelectedOption(null)
    setScore(0)
    setPhase('playing')
  }, [])

  // ---------- RESULTS SCREEN ----------
  if (phase === 'results') {
    const percentage = Math.round((score / total) * 100)
    const emoji = percentage === 100 ? '🏆' : percentage >= 66 ? '🎉' : percentage >= 33 ? '💪' : '📚'
    const message = percentage === 100
      ? 'Parfait ! Tu maîtrises le sujet !'
      : percentage >= 66
        ? 'Très bien joué ! Continue comme ça !'
        : percentage >= 33
          ? 'Pas mal ! Révise un peu et retente ta chance.'
          : 'Il faut encore travailler ce sujet. Courage !'

    return (
      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
        <div className="bg-white rounded-3xl border-2 border-notebook-lines shadow-xl overflow-hidden">
          {/* Score Hero */}
          <div className={cn(
            "py-16 px-8 text-center relative overflow-hidden",
            `bg-${quiz.color}-50`
          )} style={{ background: `linear-gradient(135deg, var(--tw-gradient-from, #eff6ff) 0%, var(--tw-gradient-to, #dbeafe) 100%)` }}>
            <div className="absolute inset-0 bg-notebook-dots opacity-10"></div>
            <div className="text-7xl mb-4 relative z-10">{emoji}</div>
            <h2 className="text-5xl font-serif font-bold text-blue-900 mb-2 relative z-10">
              {score} / {total}
            </h2>
            <p className="text-lg font-medium text-notebook-pencil/70 relative z-10">{message}</p>
            
            {/* Score Ring */}
            <div className="mt-8 relative z-10">
              <svg className="w-32 h-32 mx-auto" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke={percentage >= 66 ? '#10b981' : percentage >= 33 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${percentage * 3.39} 339.292`}
                  transform="rotate(-90 60 60)"
                  className="transition-all duration-1000 ease-out"
                />
                <text x="60" y="65" textAnchor="middle" className="fill-blue-900 text-2xl font-bold" fontFamily="serif">
                  {percentage}%
                </text>
              </svg>
            </div>
          </div>

          {/* Actions */}
          <div className="p-8 flex flex-col sm:flex-row gap-4 justify-center border-t border-notebook-lines">
            <button
              onClick={restart}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-900 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-black transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Réessayer
            </button>
            <button
              onClick={onBack}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-notebook-lines text-blue-900 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-colors"
            >
              <Trophy className="w-4 h-4" /> Autres Jeux
            </button>
            <Link
              to="/education/read"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-notebook-lines text-blue-900 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Lire
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ---------- QUESTION SCREEN ----------
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in-up">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{quiz.emoji}</span>
            <div>
              <h2 className="text-lg font-serif font-bold text-blue-900 leading-tight">{quiz.title}</h2>
              <span className="text-xs font-bold text-notebook-pencil/40 uppercase tracking-widest">
                Question {currentIndex + 1} de {total}
              </span>
            </div>
          </div>
          <span className="text-sm font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Score: {score}
          </span>
        </div>
        <div className="h-2 w-full bg-notebook-lines/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl border-2 border-notebook-lines shadow-lg p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-notebook-dots opacity-5"></div>

        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-blue-900 mb-10 leading-snug relative z-10 text-center">
          {question.question}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          {question.options.map((option, i) => {
            const isSelected = selectedOption === i
            const isAnswer = i === question.correctIndex
            const inFeedback = phase === 'feedback'

            let classes = 'glass-card p-5 sm:p-6 rounded-xl text-left font-medium text-blue-900 transition-all duration-300 border-2 cursor-pointer select-none'

            if (inFeedback) {
              if (isAnswer) {
                classes += ' bg-emerald-50 border-emerald-400 text-emerald-800 shadow-emerald-100 shadow-lg scale-[1.02]'
              } else if (isSelected && !isAnswer) {
                classes += ' bg-rose-50 border-rose-400 text-rose-800 opacity-80'
              } else {
                classes += ' border-notebook-lines/50 opacity-40'
              }
            } else {
              classes += ' border-notebook-lines hover:border-blue-400 hover:bg-blue-50 hover:-translate-y-0.5 hover:shadow-md active:scale-95'
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={inFeedback}
                className={classes}
              >
                <div className="flex items-start gap-3">
                  <span className={cn(
                    "w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-xs font-black uppercase border",
                    inFeedback && isAnswer ? "bg-emerald-500 text-white border-emerald-500" :
                    inFeedback && isSelected && !isAnswer ? "bg-rose-500 text-white border-rose-500" :
                    "bg-notebook-beige border-notebook-lines text-notebook-pencil"
                  )}>
                    {inFeedback && isAnswer ? <CheckCircle className="w-5 h-5" /> :
                     inFeedback && isSelected && !isAnswer ? <XCircle className="w-5 h-5" /> :
                     String.fromCodePoint(65 + i)}
                  </span>
                  <span className="pt-1 text-sm sm:text-base">{option}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Feedback + Next Button */}
        {phase === 'feedback' && (
          <div className="mt-8 flex flex-col items-center gap-4 animate-fade-in-up relative z-10">
            <div className={cn(
              "px-5 py-2 rounded-full font-bold text-sm",
              isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
            )}>
              {isCorrect ? '✅ Bonne réponse !' : `❌ La bonne réponse était : ${question.options[question.correctIndex]}`}
            </div>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-blue-900 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-black transition-colors"
            >
              {currentIndex + 1 >= total ? 'Voir mes Résultats' : 'Question Suivante'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
