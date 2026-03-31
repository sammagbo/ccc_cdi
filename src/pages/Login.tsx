import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LogIn, AlertCircle, Library } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const login = useAppStore(state => state.login)
  const navigate = useNavigate()
  const location = useLocation()

  // Where to send the user after successful login
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const success = await login(email, password)
    
    if (success) {
      navigate(from, { replace: true })
    } else {
      setError('Credenciais inválidas. Tente novamente.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center font-sans">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-notebook-lines relative overflow-hidden">
        
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center transform -rotate-3 mb-4 shadow-sm">
            <Library className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-blue-950 tracking-tight text-center">
            Bem-vindo de volta
          </h1>
          <p className="text-notebook-pencil/60 text-sm mt-2 text-center font-medium">
            Entra com a tua conta para acederes a recursos exclusivos do CDI.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm p-3 rounded-xl flex items-start gap-2 animate-fade-in-up">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-blue-950 ml-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-notebook-lines rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
              placeholder="ex: aluno@lyceemoliere.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-blue-950 ml-1">Palavra-passe</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-notebook-lines rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-4 bg-blue-900 hover:bg-black text-white px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Iniciar Sessão
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-notebook-lines text-center">
          <p className="text-xs text-notebook-pencil/50 italic font-serif">
            As contas de estudantes são geridas automaticamente pela administração escolar. <br/>
            Contacta a bibliotecária se não conseguires aceder.
          </p>
        </div>

      </div>
    </div>
  )
}
