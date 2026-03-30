export type MediaType = 'Video' | 'Podcast';
export type BookLevel = 'college' | 'lycee';

export interface MediaResource {
  id: string;
  title: string;
  type: MediaType;
  levels: BookLevel[];
  subject: string;
  url: string; 
  thumbnailUrl: string;
  duration: string;
  presenter?: string;
  description: string;
}

export const mediaSubjects = [
  "Sciences",
  "Histoire / Géographie",
  "Orientation",
  "Arts / Philosophie",
  "Langues"
];

export const mediaResources: MediaResource[] = [
  {
    id: "med-01",
    title: "Comprendre les trous noirs en 5 minutes",
    type: "Video",
    levels: ["college", "lycee"],
    subject: "Sciences",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    thumbnailUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80",
    duration: "05:12",
    presenter: "Astronomie Facile",
    description: "Une explication visuelle et simplifiée de la formation et des caractéristiques des trous noirs."
  },
  {
    id: "med-02",
    title: "Podcast : La chute de l'Empire Romain",
    type: "Podcast",
    levels: ["college"],
    subject: "Histoire / Géographie",
    url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&color=%23ff5500&auto_play=false", // Placeholder
    thumbnailUrl: "https://images.unsplash.com/photo-1548625361-ecdb8c6f14a6?w=600&q=80",
    duration: "24:30",
    presenter: "Histoire Audio",
    description: "Analyse des causes politiques, économiques et militaires de la chute de Rome."
  },
  {
    id: "med-03",
    title: "Mon Métier : Ingénieur en Aérospatial",
    type: "Video",
    levels: ["college", "lycee"],
    subject: "Orientation",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600&q=80",
    duration: "12:45",
    presenter: "CIDJ Orientation",
    description: "Découvre le quotidien d'une ingénieure qui conçoit des satellites."
  },
  {
    id: "med-04",
    title: "Le Mythe de la Caverne de Platon (Animé)",
    type: "Video",
    levels: ["lycee"],
    subject: "Arts / Philosophie",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80",
    duration: "08:20",
    presenter: "Philo d'Auteur",
    description: "Une représentation animée célèbre allégorie platonicienne sur la connaissance."
  },
  {
    id: "med-05",
    title: "English Listening Practice - Daily Routing",
    type: "Podcast",
    levels: ["college", "lycee"],
    subject: "Langues",
    url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293",
    thumbnailUrl: "https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?w=600&q=80",
    duration: "15:00",
    presenter: "Learn English",
    description: "Exercice d'écoute en anglais (accent britannique) utile pour les révisions."
  },
  {
    id: "med-06",
    title: "Les énergies renouvelables expliquées",
    type: "Video",
    levels: ["college", "lycee"],
    subject: "Sciences",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    duration: "14:10",
    presenter: "SVT Online",
    description: "Tour d'horizon de l'énergie solaire, éolienne et géothermique."
  },
  {
    id: "med-07",
    title: "La Première Guerre Mondiale en Cartes",
    type: "Video",
    levels: ["college", "lycee"],
    subject: "Histoire / Géographie",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1580130601254-05fa23ceebab?w=600&q=80",
    duration: "18:55",
    presenter: "GéoHistoire",
    description: "L'évolution des fronts durant le conflit mondial de 1914-1918."
  },
  {
    id: "med-08",
    title: "Interviews de Lycéens (Orientation Post-Bac)",
    type: "Podcast",
    levels: ["lycee"],
    subject: "Orientation",
    url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293",
    thumbnailUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
    duration: "45:00",
    presenter: "Radio CDI",
    description: "Des élèves partagent leurs expériences sur Parcoursup et l'université."
  }
];
