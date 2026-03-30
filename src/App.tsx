import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Catalog from './pages/Catalog'
import BookDetails from './pages/BookDetails'
import EducationRead from './pages/EducationRead'
import EducationInform from './pages/EducationInform'
import Jouer from './pages/Jouer'
import AppLayout from './components/layout/AppLayout'

function App() {
  return (
    <Router>
      {/* Texturas e decorações de fundo fixas (z-índice negativo ou no fundo real da página) */}
      <div className="fixed inset-0 notebook-texture z-0 pointer-events-none"></div>
      <div className="fixed top-[-10rem] right-[-10rem] w-[30rem] h-[30rem] bg-indigo-100 rounded-full blur-[80px] opacity-40 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-[-10rem] left-[-10rem] w-[30rem] h-[30rem] bg-rose-100 rounded-full blur-[80px] opacity-40 animate-pulse pointer-events-none"></div>

      {/* Roteamento Principal envolto pelo App Shell (AppLayout) */}
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Outlet: Componentes dinâmicos renderizados na <main> */}
          <Route index element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<BookDetails />} />
          <Route path="jouer" element={<Jouer />} />
          
          {/* Rotas Educacionais */}
          <Route path="education/read" element={<EducationRead />} />
          <Route path="education/inform" element={<EducationInform />} />
          {/* <Route path="librarian" element={<Librarian />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
