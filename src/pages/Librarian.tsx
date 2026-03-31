import { Heart, Megaphone, Calendar } from 'lucide-react'

// Mock Data
const coupsDeCoeur = [
  {
    id: 'c1',
    title: 'O Principezinho',
    author: 'Antoine de Saint-Exupéry',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    reason: 'Uma leitura obrigatória que nos ensina sobre a amizade e o amor. Perfeito para qualquer idade!',
    badge: 'Recomendação do Mês',
    level: 'College'
  },
  {
    id: 'c2',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    reason: 'Um clássico distópico que nos faz refletir sobre a sociedade atual.',
    badge: 'Clássico Intemporal',
    level: 'Lycée'
  },
  {
    id: 'c3',
    title: 'A Menina que Roubava Livros',
    author: 'Markus Zusak',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    reason: 'Uma história emocionante sobre o poder das palavras e da literatura.',
    badge: 'Favorito Pessoal',
    level: 'Lycée'
  }
]

const noticias = [
  {
    id: 1,
    title: 'Clube de Leitura na próxima 6ª feira',
    date: '15 Mai 2026',
    content: 'Junta-te a nós para discutir "O Principezinho" às 14h00 no CDI.',
    type: 'Evento'
  },
  {
    id: 2,
    title: 'Novos Mangás chegaram!',
    date: '12 Mai 2026',
    content: 'A nova coleção de One Piece e Naruto já está disponível nas prateleiras.',
    type: 'Novidades'
  }
]

export default function Librarian() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section 1: Apresentação (Hero Banner) */}
        <section className="bg-amber-50/80 rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-amber-200/50 backdrop-blur-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 group">
          {/* Elementos decorativos acolhedores */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full blur-[80px] opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-200 rounded-full blur-[60px] opacity-30 translate-y-1/3 -translate-x-1/3 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>

          {/* Avatar Photo */}
          <div className="relative shrink-0 z-10 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-rose-100 flex items-center justify-center">
              {/* Usando uma foto de banco de imagens como placeholder da bibliotecária */}
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400" 
                alt="Axelle Beurel - Documentaliste"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Tag flutuante */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md border border-white whitespace-nowrap">
              Sempre à escuta
            </div>
          </div>

          <div className="text-center md:text-left z-10 flex-1">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-950 mb-4 tracking-tight">
              Bem-vindos ao meu espaço!
            </h1>
            <p className="text-lg md:text-xl text-amber-900/80 font-serif italic leading-relaxed">
              "Olá! Sou a Axelle Beurel, a vossa bibliotecária. O CDI é um espaço vosso, para explorar, descobrir e partilhar. Quer precisem de ajuda com uma pesquisa escolar ou apenas de uma recomendação para descontrair, estou aqui para ajudar."
            </p>
          </div>
        </section>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Section 2: Coups de Cœur (Os Favoritos) */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm border border-rose-200 transform transition-transform hover:scale-110 hover:rotate-12">
                <Heart className="w-5 h-5 fill-rose-600" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-rose-950 tracking-tight">
                Coups de Cœur
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coupsDeCoeur.map((book) => (
                <div key={book.id} className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-rose-100 hover:border-rose-300 transition-colors group flex flex-col h-full relative overflow-hidden">
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full z-10 shadow-sm transform transition-transform group-hover:scale-105">
                    {book.badge}
                  </div>

                  <div className="flex gap-4 h-full">
                    {/* Cover */}
                    <img 
                      src={book.coverUrl} 
                      alt={book.title} 
                      className="w-24 h-36 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="flex-1 flex flex-col py-1">
                      <div className="text-[10px] font-bold text-notebook-pencil uppercase tracking-wider mb-1">
                        {book.level}
                      </div>
                      <h3 className="text-lg font-serif font-bold text-rose-950 leading-tight mb-1 group-hover:text-rose-700 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm font-semibold text-rose-900/60 mb-3">
                        {book.author}
                      </p>
                      <div className="bg-rose-50/50 rounded-lg p-3 mt-auto border border-rose-100/50 group-hover:bg-rose-50 transition-colors">
                        <p className="text-xs text-rose-900/80 font-serif italic line-clamp-3 leading-snug">
                          "{book.reason}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Quadro de Avisos (Notice Board) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm border border-amber-200 transform transition-transform hover:scale-110 hover:-rotate-12">
                <Megaphone className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-amber-950 tracking-tight">
                Actualités
              </h2>
            </div>

            <div className="bg-amber-50 rounded-3xl p-6 border-2 border-dashed border-amber-200 shadow-inner relative">
               {/* Prego de desenho animado p fixar o quadro */}
               <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-slate-200 rounded-full shadow-md border border-slate-300 z-10">
                 <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1 opacity-60"></div>
               </div>

              <div className="space-y-4 pt-2">
                {noticias.map((notice) => (
                  <div key={notice.id} className="bg-[#fef9c3] backdrop-blur-sm p-5 rounded-lg shadow-[2px_4px_12px_rgba(0,0,0,0.05)] border border-yellow-200 transform transition-transform duration-300 hover:-rotate-1 hover:scale-[1.02] cursor-default">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 bg-amber-200/50 px-2 py-0.5 rounded">
                        {notice.type}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700/60 bg-white/50 px-2 py-0.5 rounded-full">
                        <Calendar className="w-3 h-3" /> {notice.date}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-amber-950 mb-2 leading-tight">
                      {notice.title}
                    </h4>
                    <p className="text-sm text-amber-900/80 font-hand text-lg leading-tight transform -rotate-1">
                      {notice.content}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
