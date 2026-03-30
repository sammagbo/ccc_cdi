export type ReadType = 'PDF' | 'Bibliographie';
export type BookLevel = 'college' | 'lycee';

export interface ReadResource {
  id: string;
  title: string;
  type: ReadType;
  levels: BookLevel[];
  subject: string;
  url: string;
  description: string;
  pages?: number;
}

export const readSubjects = [
  "Français",
  "Histoire",
  "Philosophie",
  "Sciences",
  "Arts",
  "Langues"
];

export const readResources: ReadResource[] = [
  {
    id: "read-1",
    title: "Le Horla et autres contes",
    type: "PDF",
    levels: ["college", "lycee"],
    subject: "Français",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Placeholder PDF
    description: "Recueil fantastique de Guy de Maupassant idéal pour analyser la folie et le surnaturel.",
    pages: 42
  },
  {
    id: "read-2",
    title: "Bibliographie : La Révolution Française",
    type: "Bibliographie",
    levels: ["college"],
    subject: "Histoire",
    url: "#",
    description: "Une liste complète et curée d'ouvrages pour maîtriser le programme d'Histoire de 4ème.",
  },
  {
    id: "read-3",
    title: "Discours de la méthode",
    type: "PDF",
    levels: ["lycee"],
    subject: "Philosophie",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "Texte fondamental de René Descartes pour l'initiation à la philosophie en Terminale.",
    pages: 110
  },
  {
    id: "read-4",
    title: "Sélection : Les femmes dans les Sciences",
    type: "Bibliographie",
    levels: ["college", "lycee"],
    subject: "Sciences",
    url: "#",
    description: "15 recommandations de lectures allant de Marie Curie à Katherine Johnson.",
  },
  {
    id: "read-5",
    title: "Histoire de l'Art - Période Romantique",
    type: "PDF",
    levels: ["lycee"],
    subject: "Arts",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "Dossier iconographique et descriptif préparé par vos professeurs.",
    pages: 18
  },
  {
    id: "read-6",
    title: "Grammar Cheat Sheet - B1/B2",
    type: "PDF",
    levels: ["college", "lycee"],
    subject: "Langues",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "Fiche récapitulative des temps et verbes irréguliers en anglais.",
    pages: 4
  }
];
