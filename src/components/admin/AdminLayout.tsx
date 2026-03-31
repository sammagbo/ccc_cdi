import { Outlet, Link, useLocation } from 'react-router-dom'
import { BookOpen, Video, HelpCircle, Bell, ArrowLeft, ShieldCheck, BarChart3 } from 'lucide-react'

export default function AdminLayout() {
  const location = useLocation()

  const navLinks = [
    { name: 'Catálogo', path: '/admin/catalog', icon: BookOpen },
    { name: 'Multimédia', path: '/admin/media', icon: Video },
    { name: 'Quizzes', path: '/admin/quizzes', icon: HelpCircle },
    { name: 'Relatórios', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Avisos', path: 'disabled', icon: Bell },
  ]

  return (
    <div className="min-h-screen flex bg-[#fdfaf3] font-sans">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-notebook-lines flex flex-col fixed h-screen overflow-y-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-notebook-lines flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 text-notebook-pencil hover:text-blue-900 transition-colors tooltip text-xs font-bold uppercase tracking-widest" title="Sair do modo Gestão">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Portal
          </Link>
          
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-blue-950 leading-tight">Painel de Gestão</h2>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-sm">Axelle</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <div className="text-[10px] font-black uppercase tracking-widest text-notebook-pencil/40 mb-2 pl-2">
            Módulos
          </div>
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path)
            const Icon = link.icon
            
            if (link.path === 'disabled') {
              return (
                <div key={link.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-notebook-pencil/40 cursor-not-allowed">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-bold">{link.name}</span>
                  <span className="ml-auto text-[8px] font-black uppercase tracking-widest bg-slate-100 px-1.5 py-0.5 rounded">Em Breve</span>
                </div>
              )
            }

            return (
              <Link 
                key={link.path} 
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-900 border border-blue-100 shadow-sm' 
                    : 'text-notebook-pencil/70 hover:bg-notebook-beige hover:text-blue-950 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-notebook-lines bg-slate-50">
          <div className="text-[10px] text-center font-medium text-notebook-pencil/50">
            CDI Admin v1.0
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <div className="flex-1 p-8 md:p-12 overflow-x-hidden">
          <Outlet />
        </div>
      </main>

    </div>
  )
}
