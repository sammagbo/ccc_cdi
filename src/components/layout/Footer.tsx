import { Link } from 'react-router-dom'
import { Library, MapPin, Clock, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-notebook-lines relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Identidade */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center transform -rotate-3">
                <Library className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-tighter text-blue-900 leading-none">
                  CDI Axelle Beurel
                </span>
              </div>
            </Link>
            <p className="text-notebook-pencil/70 font-serif italic leading-relaxed text-sm">
              Un espace vivant de découverte, d'information et d'émancipation dédié aux élèves du Collège e du Lycée.
            </p>
          </div>

          {/* Horários */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-notebook-pencil/40">Horaires</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-notebook-pencil/80">
                <Clock className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Lundi, Mardi, Jeudi</span>
                  <span>08h00 - 17h30</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-notebook-pencil/80">
                <Clock className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Mercredi, Vendredi</span>
                  <span>08h00 - 12h30</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Localização & Contatos */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-notebook-pencil/40">Rencontrons-nous</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-notebook-pencil/80">
                <MapPin className="w-4 h-4 text-blue-900 shrink-0" />
                <span>Bâtiment Central, 2ème étage</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-notebook-pencil/80">
                <Mail className="w-4 h-4 text-blue-900 shrink-0" />
                <a href="mailto:cdi@ecole.fr" className="hover:text-blue-900 underline underline-offset-4 transition-colors">cdi-contact@ecole.fr</a>
              </li>
            </ul>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-notebook-pencil/40">Liens Rapides</h4>
            <ul className="space-y-3 font-medium text-sm text-notebook-pencil/80">
              <li>
                <Link to="/contact" className="hover:text-blue-900 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-900/30"></span> 
                  Règlement du CDI
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-900 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-900/30"></span> 
                  Aide & FAQs
                </Link>
              </li>
              <li>
                <Link to="/librarian" className="hover:text-blue-900 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-900/30"></span> 
                  Demander un livre
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Cópia de Segurança */}
        <div className="mt-16 pt-8 border-t border-notebook-lines flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-notebook-pencil/40 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} CDI Axelle Beurel. Tous droits réservés.</p>
          <div className="flex gap-4">
            <span className="cursor-help" title="Construit avec React & Tailwind">Architecturé pour l'éducation</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
