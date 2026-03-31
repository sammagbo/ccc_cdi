import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center border-2 border-rose-100 border-dashed rounded-3xl bg-rose-50/30 max-w-lg mx-auto">
      <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <AlertTriangle className="w-8 h-8 text-rose-600 animate-pulse" />
      </div>
      <h3 className="text-xl font-serif font-bold text-rose-900 mb-2">Ups! Algo correu mal</h3>
      <p className="text-rose-900/70 mb-8 font-medium leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-rose-200 text-rose-700 font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-rose-100 hover:border-rose-300 transition-all shadow-sm"
        >
          <RefreshCw className="w-4 h-4" /> Tentar Novamente
        </button>
      )}
    </div>
  )
}
