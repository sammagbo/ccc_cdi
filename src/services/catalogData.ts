export type BookType = 'Physique' | 'PDF' | 'Bibliographie';
export type BookLevel = 'college' | 'lycee';

export interface CatalogBook {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  category: string;
  levels: BookLevel[];
  type: BookType;
  available: boolean;
  synopsis?: string;
}

export const categories = [
  "Roman",
  "Science-Fiction",
  "Histoire",
  "BD",
  "Manga",
  "Poésie",
  "Sciences",
  "Philosophie"
]

export const catalogData: CatalogBook[] = [
  {
    id: "bk-01",
    title: "1984",
    author: "George Orwell",
    category: "Science-Fiction",
    levels: ["college", "lycee"],
    type: "Physique",
    available: true,
    synopsis: "Un classique dystopique sur la surveillance gouvernementale."
  },
  {
    id: "bk-02",
    title: "Vingt mille lieues sous les mers",
    author: "Jules Verne",
    category: "Roman",
    levels: ["college"],
    type: "Physique",
    available: true,
    synopsis: "Une aventure sous-marine avec le Capitaine Nemo."
  },
  {
    id: "bk-03",
    title: "L'Étranger",
    author: "Albert Camus",
    category: "Philosophie",
    levels: ["lycee"],
    type: "Physique",
    available: false,
    synopsis: "L'histoire de Meursault, un Français d'Algérie."
  },
  {
    id: "bk-04",
    title: "Les Misérables",
    author: "Victor Hugo",
    category: "Histoire",
    levels: ["college", "lycee"],
    type: "PDF",
    available: true,
    synopsis: "Le destin tragique de Jean Valjean au XIXe siècle."
  },
  {
    id: "bk-05",
    title: "Naruto - Tome 1",
    author: "Masashi Kishimoto",
    category: "Manga",
    levels: ["college"],
    type: "Physique",
    available: true,
    synopsis: "Le début de l'aventure du célèbre ninja de Konoha."
  },
  {
    id: "bk-06",
    title: "Astérix le Gaulois",
    author: "René Goscinny",
    category: "BD",
    levels: ["college", "lycee"],
    type: "Physique",
    available: true,
    synopsis: "Les aventures des irrésistibles Gaulois."
  },
  {
    id: "bk-07",
    title: "Une brève histoire du temps",
    author: "Stephen Hawking",
    category: "Sciences",
    levels: ["lycee"],
    type: "Bibliographie",
    available: true,
    synopsis: "Une introduction à la cosmologie moderne."
  },
  {
    id: "bk-08",
    title: "Les Contes de Beedle le Barde",
    author: "J.K. Rowling",
    category: "Roman",
    levels: ["college"],
    type: "Physique",
    available: false,
    synopsis: "Recueil de contes populaires pour les jeunes sorciers."
  },
  {
    id: "bk-09",
    title: "Persepolis",
    author: "Marjane Satrapi",
    category: "BD",
    levels: ["college", "lycee"],
    type: "PDF",
    available: true,
    synopsis: "Une autobiographie poignante sous forme de roman graphique."
  },
  {
    id: "bk-10",
    title: "Les Fleurs du mal",
    author: "Charles Baudelaire",
    category: "Poésie",
    levels: ["lycee"],
    type: "Physique",
    available: true,
    synopsis: "Un recueil de poèmes majeur de la littérature française."
  }
];
