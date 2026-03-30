export type BookLevel = 'college' | 'lycee';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface QuizGame {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: BookLevel;
  emoji: string;
  color: string;       // Tailwind bg-* prefix
  questions: QuizQuestion[];
}

export const quizGames: QuizGame[] = [
  {
    id: "quiz-myth",
    title: "Mythologie Grecque",
    description: "Connais-tu les dieux de l'Olympe et les héros légendaires ?",
    subject: "Histoire",
    level: "college",
    emoji: "⚡",
    color: "amber",
    questions: [
      {
        question: "Qui est le roi des dieux dans la mythologie grecque ?",
        options: ["Poséidon", "Hadès", "Zeus", "Apollon"],
        correctIndex: 2
      },
      {
        question: "Quel héros a vaincu le Minotaure dans le labyrinthe ?",
        options: ["Héraclès", "Thésée", "Persée", "Ulysse"],
        correctIndex: 1
      },
      {
        question: "Comment s'appelle la déesse de la sagesse et de la guerre ?",
        options: ["Aphrodite", "Héra", "Artémis", "Athéna"],
        correctIndex: 3
      }
    ]
  },
  {
    id: "quiz-science",
    title: "Le Système Solaire",
    description: "Teste tes connaissances sur les planètes et les étoiles !",
    subject: "Sciences",
    level: "college",
    emoji: "🪐",
    color: "blue",
    questions: [
      {
        question: "Quelle est la planète la plus proche du Soleil ?",
        options: ["Vénus", "Mars", "Mercure", "Terre"],
        correctIndex: 2
      },
      {
        question: "Combien de planètes composent notre système solaire ?",
        options: ["7", "8", "9", "10"],
        correctIndex: 1
      },
      {
        question: "Quelle planète est surnommée la 'planète rouge' ?",
        options: ["Jupiter", "Saturne", "Mars", "Vénus"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "quiz-litt",
    title: "Littérature Française",
    description: "De Victor Hugo à Camus — montre que tu es un vrai lecteur !",
    subject: "Français",
    level: "lycee",
    emoji: "📜",
    color: "rose",
    questions: [
      {
        question: "Qui a écrit 'Les Misérables' ?",
        options: ["Émile Zola", "Victor Hugo", "Gustave Flaubert", "Honoré de Balzac"],
        correctIndex: 1
      },
      {
        question: "Dans quel roman trouve-t-on le personnage de Meursault ?",
        options: ["La Peste", "L'Étranger", "La Chute", "Le Mythe de Sisyphe"],
        correctIndex: 1
      },
      {
        question: "Quel mouvement littéraire est associé à Charles Baudelaire ?",
        options: ["Le Romantisme", "Le Naturalisme", "Le Symbolisme", "Le Surréalisme"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "quiz-philo",
    title: "Intro à la Philosophie",
    description: "Socrate, Descartes, Sartre… Es-tu prêt à philosopher ?",
    subject: "Philosophie",
    level: "lycee",
    emoji: "🤔",
    color: "violet",
    questions: [
      {
        question: "'Je pense, donc je suis.' Qui a prononcé cette phrase célèbre ?",
        options: ["Platon", "René Descartes", "Jean-Paul Sartre", "Friedrich Nietzsche"],
        correctIndex: 1
      },
      {
        question: "Quel philosophe grec est connu pour sa méthode de questionnement (maïeutique) ?",
        options: ["Aristote", "Épicure", "Socrate", "Diogène"],
        correctIndex: 2
      },
      {
        question: "L'existentialisme est un courant philosophique du…",
        options: ["XVIIe siècle", "XVIIIe siècle", "XIXe siècle", "XXe siècle"],
        correctIndex: 3
      }
    ]
  }
];

export interface ExternalGame {
  id: string;
  title: string;
  description: string;
  emoji: string;
  url: string;
  color: string;
}

export const externalGames: ExternalGame[] = [
  {
    id: "ext-1",
    title: "Mots Croisés Littéraires",
    description: "Des grilles de mots croisés sur les grands auteurs français.",
    emoji: "🔤",
    url: "#",
    color: "teal"
  },
  {
    id: "ext-2",
    title: "Timeline Historique",
    description: "Replace les événements dans l'ordre chronologique.",
    emoji: "⏳",
    url: "#",
    color: "orange"
  }
];
