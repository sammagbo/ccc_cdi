import { useState, useEffect } from 'react'
import { quizData } from '../services/mockData'
import { BookOpen, RotateCcw, Bookmark, Book, Plus } from 'lucide-react'

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userChoices, setUserChoices] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [resultProfile, setResultProfile] = useState<any>(null)

  const isFinished = currentStep >= quizData.questions.length

  useEffect(() => {
    if (isFinished && !resultProfile) {
      setIsLoading(true)
      
      // Calculate result profile
      const { portal, voice, subject } = userChoices
      let winner = 'P1'

      if (portal === 'A' && subject === 'X') winner = 'P1'
      else if (portal === 'B' && subject === 'X') winner = 'P2'
      else if (portal === 'C' && (subject === 'Y' || subject === 'Z')) winner = 'P3'
      else if (portal === 'B' && subject === 'Y') winner = 'P4'
      else if (portal === 'B' && subject === 'Z') winner = 'P5'
      else if (portal === 'A' && subject === 'Y') winner = 'P6'
      else if (portal === 'B' && voice === '2') winner = 'P7'
      else if (portal === 'B' && (voice === '1' || subject === 'X')) winner = 'P8'
      else if ((portal === 'B' || portal === 'C') && subject === 'Z') winner = 'P9'
      else {
          if (portal === 'A') winner = 'P1'
          else if (portal === 'B') winner = 'P4'
          else winner = 'P3'
      }

      setTimeout(() => {
        setResultProfile(winner)
        setIsLoading(false)
      }, 1500)
    }
  }, [isFinished, userChoices, resultProfile])

  const handleChoice = (key: string, value: string) => {
    setUserChoices(prev => ({ ...prev, [key]: value }))
    setCurrentStep(prev => prev + 1)
  }

  const restart = () => {
    setCurrentStep(0)
    setUserChoices({})
    setResultProfile(null)
  }

  // --- RENDERING ---
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-notebook-paper">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-900 rounded-full border-t-transparent animate-spin"></div>
          <BookOpen className="absolute inset-x-0 inset-y-0 m-auto text-blue-900 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif italic text-blue-900 animate-pulse">Génération de votre profil...</h2>
      </div>
    )
  }

  if (resultProfile) {
    const profile = (quizData.profiles as any)[resultProfile]
    const books = (quizData.books as any)[resultProfile]

    return (
      <main className="max-w-4xl mx-auto px-6 py-32 animate-fade-in-up">
        <div className="space-y-12">
            <div className="notebook-page p-12 text-center relative">
                <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-900 rounded-lg font-hand text-xl mb-6 shadow-thick transform -rotate-1">
                    Ton Profil
                </div>
                <h3 className="text-5xl md:text-7xl font-serif font-bold text-blue-900 italic mb-6">{profile.title}</h3>
                <p className="text-xl text-notebook-pencil/70 max-w-2xl mx-auto leading-relaxed font-serif italic mb-10">
                    {profile.desc}
                </p>
                <div className="flex justify-center gap-4">
                    <button onClick={restart} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-notebook-pencil/40 hover:text-blue-900 transition-colors">
                        <RotateCcw className="w-4 h-4" />
                        Refaire le test
                    </button>
                </div>
            </div>

            <h4 className="text-3xl font-serif font-bold text-blue-900 mb-8 border-b-2 border-notebook-lines inline-block italic">
                Ma Pile à Lire Personnalisée
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {books.map((b: any, idx: number) => (
                    <div key={idx} className="glass-card group p-8 rounded-2xl shadow-thick hover:border-blue-900 transition-all cursor-default">
                         <div className="w-full aspect-video bg-blue-50 rounded-lg mb-6 flex items-center justify-center p-8 overflow-hidden relative">
                            <div className="absolute top-4 right-4 text-blue-900/10">
                                <Bookmark className="w-8 h-8" />
                            </div>
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
                            <div className="book-card-img text-center h-full w-full flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                                {b.img ? (
                                    <img src={b.img} alt={b.title} className="max-h-full max-w-full object-contain drop-shadow-md z-10 relative" />
                                ) : (
                                    <>
                                      <h5 className="text-2xl font-serif font-bold text-blue-900 italic mb-2 relative z-10">{b.title}</h5>
                                      <p className="text-xs font-black uppercase tracking-widest text-blue-600/60 relative z-10">{b.author}</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <Book className="w-4 h-4 text-blue-900" />
                            <h5 className="text-2xl font-bold text-blue-900">{b.title}</h5>
                        </div>
                        <p className="text-notebook-pencil/60 text-sm leading-relaxed mb-6 font-serif italic">{b.desc}</p>
                        <button className="w-full py-3 bg-blue-900 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" />
                            Ajouter au carnet
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 flex justify-center">
                <button onClick={restart} className="flex items-center gap-2 px-8 py-4 border-2 border-blue-900 text-blue-900 rounded-full font-bold hover:bg-blue-900 hover:text-white transition-all">
                    <RotateCcw className="w-5 h-5" />
                    Recommencer l'aventure
                </button>
            </div>
        </div>
      </main>
    )
  }

  const step = quizData.questions[currentStep]
  const progress = (currentStep / quizData.questions.length) * 100

  return (
    <main className="max-w-4xl mx-auto px-6 py-32 animate-fade-in-up">
        {/* Step Indicator */}
        <div className="mb-12">
            <div className="flex justify-between items-end mb-4">
                <span className="text-lg font-hand text-blue-900">Note 0{currentStep + 1} / 0{quizData.questions.length}</span>
                <span className="text-xs font-bold text-notebook-pencil/40 uppercase tracking-widest">{Math.round(progress)}% accompli</span>
            </div>
            <div className="h-1.5 w-full bg-notebook-lines rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
        </div>

        {/* Question View */}
        <div className="notebook-page p-10 sm:p-16 min-h-[500px] flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-blue-900 mb-12 leading-tight italic">
                {step.text}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                {step.options.map((opt, i) => (
                    <button 
                        key={i}
                        onClick={() => handleChoice(step.key, opt.value)}
                        className="glass-card p-6 sm:p-8 rounded-xl text-left font-serif font-bold text-lg text-blue-900 hover:bg-blue-900 hover:text-white hover:-translate-y-1 active:scale-95 transition-all shadow-thick">
                        {opt.text}
                    </button>
                ))}
            </div>
        </div>
    </main>
  )
}
