export const quizData = {
    profiles: {
        P1: { title: "Échos du réel et combats pour le corps", desc: "La réalité brute et les questions d'intégrité physique sont tes priorités.", color: "#3b82f6" },
        P2: { title: "Romancer la résistance", desc: "La fiction est ton refuge pour aborder les thèmes des violences et des traditions.", color: "#8b5cf6" },
        P3: { title: "Penser le monde et ses évolutions", desc: "Tu cherches des textes de réflexion et des essais pour comprendre la société.", color: "#0ea5e9" },
        P4: { title: "Se construire et s'affirmer", desc: "Un focus sur l'adolescence, le genre et la quête de soi.", color: "#ec4899" },
        P5: { title: "Les racines du combat", desc: "Un voyage dans le temps pour comprendre les luttes passées.", color: "#f59e0b" },
        P6: { title: "Horizons lointains et soif de liberté", desc: "Des témoignages et récits de vie à travers le monde.", color: "#10b981" },
        P7: { title: "La force du collectif", desc: "Des récits choraux mettant en avant la solidarité féminine.", color: "#6366f1" },
        P8: { title: "S'évader et se reconstruire", desc: "Des romans d'action, de départ et de résilience.", color: "#f43f5e" },
        P9: { title: "Imaginer demain et agir aujourd'hui", desc: "Entre anticipation et engagement citoyen.", color: "#14b8a6" }
    },
    questions: [
        {
            key: 'portal',
            text: "Quelle porte as-tu envie d'ouvrir aujourd'hui ?",
            options: [
                { text: "PORTAIL A : Réalité brute. Témoignages, faits vécus, récits qui bousculent.", value: "A" },
                { text: "PORTAIL B : Imaginaire et émotion. Romans, personnages de fiction et intrigues.", value: "B" },
                { text: "PORTAIL C : Réflexion et analyse. Manifestes, mécanismes de société et textes courts.", value: "C" }
            ]
        },
        {
            key: 'voice',
            text: "Comment aimes-tu que l'histoire te soit racontée ?",
            options: [
                { text: "Par une voix unique, forte et personnelle (1ère personne).", value: "1" },
                { text: "Par un chœur de femmes dont les destins s'entrecroisent.", value: "2" },
                { text: "De manière directe et percutante (cri ou plaidoirie).", value: "3" },
                { text: "À travers le temps (enquête ou fresque historique).", value: "4" }
            ]
        },
        {
            key: 'subject',
            text: "Quel sujet te semble le plus essentiel en ce moment ?",
            options: [
                { text: "X : L'intégrité et le corps (IVG, violences, harcèlement).", value: "X" },
                { text: "Y : L'identité et la liberté (famille, affirmation, genre).", value: "Y" },
                { text: "Z : L'engagement et l'Histoire (pionnières, combats passés, futur).", value: "Z" }
            ]
        }
    ],
    books: {
        P1: [
            { title: "Plaidoirie pour l'avortement", author: "Gisèle Halimi", desc: "Un texte historique sur le combat juridique pour l'IVG.", img: "/Nouveau dossier/plaidoirie-pour-lavortement.jpg" },
            { title: "Brûlée vive", author: "Souad", desc: "Un témoignage bouleversant sur les crimes d'honneur.", img: "/Nouveau dossier/brulee-vive.jpg" },
            { title: "Nos corps jugés", author: "Catherine Cuenca", desc: "Un récit sur la lutte pour disposer de son corps.", img: "/Nouveau dossier/nos-corps-juges.jpg" },
            { title: "J'entends des pas derrière moi", author: "Jo Witek", desc: "Un texte fort sur le harcèlement de rue.", img: "" }
        ],
        P2: [
            { title: "Les Impatientes", author: "Djaïli Amadou Amal", desc: "Un roman puissant sur le mariage forcé et les violences conjugales.", img: "/Nouveau dossier/les-impatientes.jpg" },
            { title: "Que sur toi se lamente le tigre", author: "Emilienne Malfatto", desc: "Une tragédie moderne sur le poids des interdits.", img: "/Nouveau dossier/que-sur-toi-se-lamente-le-tigre.jpg" },
            { title: "Le harem du roi", author: "Djaïli Amadou Amal", desc: "Une immersion dans les rapports de force et de pouvoir.", img: "/Nouveau dossier/le harem du roi.jpg" },
            { title: "Girls bazaar", author: "Ruchira Gupta", desc: "Un roman sur la lutte contre le trafic et l'exploitation.", img: "" }
        ],
        P3: [
            { title: "Le deuxième sexe", author: "Simone de Beauvoir", desc: "L'essai fondateur du féminisme moderne.", img: "/Nouveau dossier/le deuxième sexe.jpg" },
            { title: "Nous sommes tous des féministes", author: "Chimamanda Ngozi Adichie", desc: "Une approche contemporaine et accessible.", img: "/Nouveau dossier/nous-sommes-tous-des-feministes.jpg" },
            { title: "Masculin-Féminin pluriel", author: "Collectif", desc: "Pour interroger les stéréotypes de genre.", img: "/Nouveau dossier/masculin-feminin-pluriel.jpg" },
            { title: "Je suis une fille sans histoire", author: "Alice Zeniter", desc: "Une réflexion sur la place des femmes dans les récits.", img: "" }
        ],
        P4: [
            { title: "Celle dont j'ai toujours rêvé", author: "Meredith Russo", desc: "Un roman sur l'identité transgenre à l'adolescence.", img: "/Nouveau dossier/celle-dont-jai-toujours-reve.jpg" },
            { title: "Celle que je suis", author: "Anne Loyer", desc: "Le chemin vers l'affirmation de sa propre personnalité.", img: "" },
            { title: "Je serai vivante", author: "Nastasia Rugani", desc: "Un récit intense sur la résilience.", img: "/Nouveau dossier/je-serai-vivante-2.jpg" },
            { title: "Point de fuite", author: "Marie Colot & Nancy Guilbert", desc: "Une histoire d'amitié et de secrets.", img: "" }
        ],
        P5: [
            { title: "Le bal des folles", author: "Victoria Mas", desc: "Le sort des femmes internées au XIXe siècle.", img: "/Nouveau dossier/le-bal-des-folles.jpg" },
            { title: "Une maison de poupée", author: "Henrik Ibsen", desc: "La pièce classique sur l'émancipation féminine.", img: "/Nouveau dossier/une-maison-de-poupee.jpg" },
            { title: "Là où tombent les anges", author: "Charlotte Bousquet", desc: "Un récit historique sur les femmes durant la Grande Guerre.", img: "/Nouveau dossier/la-ou-tombent-les-anges.jpg" },
            { title: "Combien de pas jusqu'à la lune", author: "Carole Trébor", desc: "La biographie romancée de Katherine Johnson.", img: "" }
        ],
        P6: [
            { title: "Moi, Malala", author: "Malala Yousafzai", desc: "Le combat pour l'education des filles.", img: "/Nouveau dossier/moi-malala.jpg" },
            { title: "Jamais sans ma fille", author: "Betty Mahmoody", desc: "Une fuite désespérée pour la liberté.", img: "/Nouveau dossier/jamais-sans-ma-fille.jpg" },
            { title: "Mille soleils splendides", author: "Khaled Hosseini", desc: "Une fresque sur la condition féminine en Afghanistan.", img: "/Nouveau dossier/mille-soleils-splendides.jpg" },
            { title: "Baguettes chinoises", author: "Xinran", desc: "Le destin de trois sœurs dans la Chine moderne.", img: "" }
        ],
        P7: [
            { title: "Femmes d'Alger dans leur appartement", author: "Assia Djebar", desc: "Des voix de femmes qui se répondent.", img: "/Nouveau dossier/femmes-dalger-dans-leur-appartement.jpg" },
            { title: "Compartiment pour dame", author: "Anita Nair", desc: "Des confidences entre voyageuses en India.", img: "/Nouveau dossier/compartiment-pour-dames.jpg" },
            { title: "Une si longue lettre", author: "Mariama Bâ", desc: "Un clásico sur la condition des femmes en Afrique.", img: "/Nouveau dossier/une-si-longue-lettre.jpg" },
            { title: "L'inventaire des rêves", author: "Rita Bullwinkel", desc: "Un recueil explorant l'intériorité féminine.", img: "" }
        ],
        P8: [
            { title: "Missouri 1627", author: "J. Hendricks & T. Caplan", desc: "Un road-trip lycéen sur l'accès à l'avortement.", img: "/Nouveau dossier/missouri-1627.jpg" },
            { title: "Le jour où je suis partie", author: "Charlotte Bousquet", desc: "Un récit de rupture et de nouveau départ.", img: "/Nouveau dossier/le-jour-ou-je-suis-partie.jpg" },
            { title: "Sauver Mina", author: "Catherine Cuenca", desc: "Un roman sur le courage et la survie.", img: "/Nouveau dossier/sauver-mina.jpg" },
            { title: "De femme et d'acier", author: "Cécile Chabaud", desc: "Une fiction sur la détermination.", img: "" }
        ],
        P9: [
            { title: "L'empire des femmes T1", author: "Cassandre Lambert", desc: "Une dystopie où les rôles de pouvoir sont inversés.", img: "/Nouveau dossier/lempire-des-femmes.jpg" },
            { title: "Juke vox", author: "Pascale Perrier", desc: "Un roman d'anticipation sur le contrôle social.", img: "/Nouveau dossier/juke-vox.jpg" },
            { title: "La vie vue d'en bas", author: "Stacey Lee", desc: "Un regard original sur les classes sociales et le genre.", img: "/Nouveau dossier/la-vie-vue-den-bas.jpg" },
            { title: "Combats de filles", author: "Collectif", desc: "Des histoires de lutte et d'empouvoirement.", img: "" }
        ]
    }
};
