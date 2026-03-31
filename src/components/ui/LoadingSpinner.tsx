import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  message?: string
  fullPage?: boolean
}

export default function LoadingSpinner({ message = 'A carregar...', fullPage = false }: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in relative z-10">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 scale-150 animate-pulse"></div>
        <Loader2 className="w-12 h-12 text-blue-900 animate-spin relative z-10 opacity-80" />
      </div>
      <p className="text-xl font-serif font-bold italic text-blue-900 mb-2">
        {message}
      </p>
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></span>
      </div>
    </div>
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}
