import { Clock, MapPin, Shield, CheckCircle2 } from 'lucide-react'

const rules = [
  {
    id: 1,
    title: 'Para podermos estudar em paz...',
    desc: 'O CDI é o nosso santuário de concentração. Mantemos o tom de voz baixo para que todos possam ler e investigar sem interrupções. É um espaço de tranquilidade.'
  },
  {
    id: 2,
    title: 'Cuidar dos nossos livros',
    desc: 'Os livros viajam de mão em mão. Tratamos cada página com carinho, não dobramos os cantos, e usamos marcadores. O próximo leitor agradece!'
  },
  {
    id: 3,
    title: 'Pausa para o lanche',
    desc: 'Para proteger os equipamentos e os documentos, pedimos que não comam ou bebam no interior do CDI (exceto garrafas de água fechadas). O refeitório e o pátio são perfeitos para isso.'
  },
  {
    id: 4,
    title: 'O computador não é uma consola de jogos',
    desc: 'Os nossos computadores estão aqui para vos ajudar nos trabalhos escolares e pesquisas importantes. Os videojogos ficam para casa!'
  }
]

export default function Contact() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 font-sans bg-[#fdfaf3]">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 tracking-tight leading-tight">
            Informações Práticas
          </h1>
          <p className="text-lg md:text-xl text-notebook-pencil/70 font-serif italic">
            Tudo o que precisas de saber para aproveitar ao máximo o teu CDI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Horários */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-notebook-lines relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full z-0 transition-transform duration-500 group-hover:scale-110"></div>
            
            <div className="relative z-10">
               <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-900 mb-6 shadow-sm transform -rotate-3 transition-transform group-hover:rotate-0">
                  <Clock className="w-8 h-8" />
               </div>
               
               <h2 className="text-2xl font-bold text-blue-900 mb-6 tracking-tight">
                 Horários de Abertura
               </h2>
               
               <ul className="space-y-6">
                 <li className="flex flex-col gap-1">
                   <div className="text-xs font-black uppercase tracking-widest text-notebook-pencil/40 bg-notebook-beige px-2 py-1 rounded w-fit">
                     2ª feira a 6ª feira
                   </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-bold font-serif text-blue-950">08h00</span>
                      <span className="text-notebook-pencil font-medium">—</span>
                      <span className="text-3xl font-bold font-serif text-blue-950">17h00</span>
                    </div>
                 </li>
                 <li className="flex flex-col gap-1 pt-4 border-t border-dashed border-notebook-lines">
                   <div className="text-xs font-black uppercase tracking-widest text-orange-800/60 bg-orange-100 px-2 py-1 rounded w-fit">
                     Pausa para Almoço
                   </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-xl font-bold font-serif text-notebook-pencil">11h00</span>
                      <span className="text-notebook-pencil/50">—</span>
                      <span className="text-xl font-bold font-serif text-notebook-pencil">12h00</span>
                    </div>
                   <p className="text-sm text-notebook-pencil/60 mt-1 italic font-serif">Encerrado durante a hora de almoço.</p>
                 </li>
               </ul>
            </div>
          </div>

          {/* Card 2: Localização */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-notebook-lines relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full z-0 transition-transform duration-500 group-hover:scale-110"></div>
            
            <div className="relative z-10 h-full flex flex-col">
               <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-6 shadow-sm transform rotate-3 transition-transform group-hover:rotate-0">
                  <MapPin className="w-8 h-8" />
               </div>
               
               <h2 className="text-2xl font-bold text-blue-900 mb-6 tracking-tight">
                 Onde nos encontrar?
               </h2>
               
               <div className="space-y-4">
                  <p className="text-base text-notebook-pencil/80 leading-relaxed font-serif">
                    O CDI está localizado no Bloco D, mesmo ao lado da sala da Vie scolaire secondaire do Lycée Molière. Basta seguir as placas no corredor principal!
                  </p>
               </div>
               
               {/* Decorative Element */}
               <div className="mt-8 pt-6 border-t border-notebook-lines/50 w-full">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100/50 px-3 py-1.5 rounded-full inline-flex">
                     Acesso via rampas garantido
                  </span>
               </div>
            </div>
          </div>

        </div>

        {/* Card 3: Regras de Ouro */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-notebook-lines relative overflow-hidden">
           <div className="flex flex-col md:flex-row gap-8 lg:gap-16 relative z-10">
              
              {/* Left Column: Icon & Title */}
              <div className="md:w-1/3 shrink-0">
                <div className="sticky top-24">
                  <div className="w-20 h-20 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 mb-6 shadow-sm">
                      <Shield className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-blue-900 tracking-tight leading-tight mb-4">
                    As nossas Regras de Ouro
                  </h2>
                  <p className="text-lg text-notebook-pencil/70 font-serif italic mb-8">
                    Orientações simples para mantermos um ambiente perfeito para todos.
                  </p>
                </div>
              </div>

              {/* Right Column: Rules List */}
              <div className="md:w-2/3 space-y-6">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex gap-4 p-5 rounded-2xl hover:bg-notebook-beige/50 transition-colors border border-transparent hover:border-notebook-lines/30">
                    <div className="mt-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600/80" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-950 mb-2 leading-tight">
                        {rule.title}
                      </h3>
                      <p className="text-base text-notebook-pencil/80 leading-relaxed font-serif">
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

           </div>
        </div>

      </div>
    </div>
  )
}
