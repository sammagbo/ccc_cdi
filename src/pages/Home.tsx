import Hero from '../components/home/Hero'
import QuickLinks from '../components/home/QuickLinks'
import Highlights from '../components/home/Highlights'

export default function Home() {
  return (
    <div className="min-h-screen relative w-full flex flex-col">
      {/* 
        Hero Section (Boas-vindas e Barra de Pesquisa)
      */}
      <Hero />

      {/* 
        Acessos Rápidos (Grelha com 4 áreas do CDI)
      */}
      <QuickLinks />

      {/* 
        Destaques da Bibliotecária (Novidades/Recomendações do mês)
      */}
      <Highlights />
    </div>
  )
}
