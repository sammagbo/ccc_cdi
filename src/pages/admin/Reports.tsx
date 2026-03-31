import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  BookMarked, 
  Users, 
  Download, 
  ArrowUpRight,
  PieChart,
  Clock
} from 'lucide-react'
import { motion } from 'framer-motion'
import { analyticsService, SearchTermStat, SectionAccess, PopularBook } from '../../services/analyticsService'
import { cn } from '../../lib/utils'

export default function Reports() {
  const [loading, setLoading] = useState(true)
  const [searchTerms, setSearchTerms] = useState<SearchTermStat[]>([])
  const [popularBooks, setPopularBooks] = useState<PopularBook[]>([])
  const [sectionUsage, setSectionUsage] = useState<SectionAccess[]>([])
  const [generalStats, setGeneralStats] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [terms, books, usage, stats] = await Promise.all([
          analyticsService.getTopSearchTerms(),
          analyticsService.getTopEngagedBooks(),
          analyticsService.getSectionUsage(),
          analyticsService.getGeneralStats()
        ])
        setSearchTerms(terms)
        setPopularBooks(books)
        setSectionUsage(usage)
        setGeneralStats(stats)
      } catch (err) {
        console.error('Falha ao carregar analytics:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 grayscale opacity-50">
        <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-serif italic text-blue-900">A gerar relatórios estatísticos...</p>
      </div>
    )
  }

  const renderTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
      case 'down': return <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
      default: return <Minus className="w-3.5 h-3.5 text-slate-300" />
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Admin */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-notebook-lines">
        <div>
          <h1 className="text-3xl font-serif font-bold text-blue-950 italic">Relatórios e Analytics</h1>
          <p className="text-sm text-notebook-pencil/60 mt-1">Dados de utilização do CDI • Últimos 30 dias</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md active:scale-95">
          <Download className="w-4 h-4" />
          Exportar Relatório PDF
        </button>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Pesquisas Totais" 
          value={generalStats?.totalSearches} 
          icon={Search} 
          trend="+12% vs mês passado" 
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard 
          title="Alunos Ativos" 
          value={generalStats?.activeUsers} 
          icon={Users} 
          trend="+5% hoje" 
          color="text-emerald-600"
          bgColor="bg-emerald-50"
        />
        <StatCard 
          title="Novos Favoritos" 
          value={generalStats?.newFavoritesThisWeek} 
          icon={BookMarked} 
          trend="+24 esta semana" 
          color="text-amber-600"
          bgColor="bg-amber-50"
        />
        <StatCard 
          title="Pedidos Pendentes" 
          value={generalStats?.pendingRequests} 
          icon={Clock} 
          trend="Requer atenção" 
          color="text-rose-600"
          bgColor="bg-rose-50"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Termos Pesquisados (Table Style) */}
        <div className="xl:col-span-1 bg-white border border-notebook-lines rounded-2xl overflow-hidden flex flex-col shadow-sm">
          <div className="p-5 border-b border-notebook-lines bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-serif font-bold text-blue-950">Top 10 Pesquisas</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-notebook-pencil/40 bg-white px-2 py-1 rounded border border-notebook-lines/50">Esta Semana</span>
          </div>
          <div className="divide-y divide-notebook-lines/30">
            {searchTerms.map((term, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 hover:bg-notebook-beige/20 transition-colors">
                <span className="w-6 text-xs font-black text-notebook-pencil/20 italic">#{idx + 1}</span>
                <span className="flex-1 text-sm font-bold text-blue-900">{term.term}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-notebook-pencil/40">{term.count}</span>
                  {renderTrendIcon(term.trend)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráficos Principais */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Livros Populares (Bar Chart) */}
          <div className="bg-white border border-notebook-lines rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-serif font-bold text-blue-950 flex items-center gap-2">
                 <BarChart3 className="w-5 h-5 text-blue-900" />
                 Engagement de Livros
               </h3>
               <div className="flex gap-4">
                 <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-notebook-pencil/40">
                   <div className="w-3 h-3 bg-blue-900 rounded-sm"></div> Empréstimos
                 </div>
                 <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-notebook-pencil/40">
                   <div className="w-3 h-3 bg-blue-300 rounded-sm"></div> Favoritos
                 </div>
               </div>
            </div>
            
            <div className="space-y-6">
              {popularBooks.map((book) => {
                const total = 80 // Max para escala
                const borrowWidth = (book.borrowCount / total) * 100
                const favoriteWidth = (book.favoriteCount / total) * 100
                
                return (
                  <div key={book.id} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-[10px] font-black uppercase text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 shrink-0">{book.category}</span>
                        <span className="text-sm font-bold text-blue-950 truncate">{book.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-notebook-pencil/40">Total: {book.borrowCount + book.favoriteCount}</span>
                    </div>
                    <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${borrowWidth}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-blue-900 border-r border-blue-700/30"
                        title={`Empréstimos: ${book.borrowCount}`}
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${favoriteWidth}%` }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="h-full bg-blue-300"
                        title={`Favoritos: ${book.favoriteCount}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Distribuição por Secção (Progress Stack) */}
          <div className="bg-white border border-notebook-lines rounded-2xl p-6 shadow-sm">
            <h3 className="font-serif font-bold text-blue-950 flex items-center gap-2 mb-8">
              <PieChart className="w-5 h-5 text-blue-900" />
              Distribuição de Interesse (Acessos)
            </h3>
            
            <div className="flex h-12 w-full rounded-2xl overflow-hidden shadow-inner mb-8 bg-slate-100 border border-notebook-lines/20">
              {sectionUsage.map((section, idx) => {
                const total = sectionUsage.reduce((acc, curr) => acc + curr.count, 0)
                const percentage = (section.count / total) * 100
                return (
                  <motion.div
                    key={idx}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="h-full relative group"
                    style={{ backgroundColor: section.color }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/20 transition-opacity"></div>
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all scale-90 group-hover:scale-100">
                      <div className="bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-xl">
                        {section.name}: {percentage.toFixed(1)}%
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {sectionUsage.map((section, idx) => (
                <div key={idx} className="flex flex-col items-center p-3 rounded-xl border border-notebook-lines bg-slate-50/50 group hover:border-blue-200 transition-colors">
                  <div className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: section.color }}></div>
                  <span className="text-[10px] font-black uppercase text-notebook-pencil/40 group-hover:text-blue-900 leading-tight text-center">{section.name}</span>
                  <span className="text-sm font-mono font-bold text-blue-950 mt-1">{section.count}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, trend, color, bgColor }: any) {
  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
      className="bg-white border border-notebook-lines rounded-2xl p-6 flex flex-col shadow-sm transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-xl", bgColor, color)}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
           <ArrowUpRight className="w-3 h-3" />
           Trend
        </div>
      </div>
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-notebook-pencil/40 mb-1">{title}</h3>
      <div className="text-3xl font-serif font-black text-blue-950 mb-2 leading-none">{value}</div>
      <p className="text-[10px] font-bold text-notebook-pencil/40 italic">{trend}</p>
    </motion.div>
  )
}
