import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* O Header inclui a lógica de barra fixa e menus dropdown */}
      <Header />
      
      {/* 
        Main content wrapper: 
        Aplica o padding-top equivalente à altura do header (h-20 -> pt-20)
        garantindo que o conteúdo dinâmico não colida com a barra fixa.
      */}
      <main className="flex-1 w-full pt-20 flex flex-col">
        {/* <Outlet /> é onde as páginas do react-router (ex: Home, Quiz) são inseridas dinamicamente */}
        <Outlet />
      </main>

      {/* Rodapé acessível, contendo horários e regras */}
      <Footer />
    </div>
  )
}
