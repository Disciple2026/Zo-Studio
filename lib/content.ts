export const WHATSAPP = "https://wa.me/212777822868?text=Bonjour%20Zo%C3%A9%20Studio";
export const PHONE = "+212 777-822868";
export const PHONE_HREF = "tel:+212777822868";
export const EMAIL = "jauresulriche@gmail.com";

export const SERVICES = [
  { nom: "Mariages & cérémonies", option: "Mariage & Cérémonie", texte: "Le film de votre mariage, des préparatifs à la dernière danse. Chaque regard et chaque émotion restent." },
  { nom: "Baptêmes & naissances", option: "Baptême & Naissance", texte: "Les premiers instants de votre enfant, filmés avec douceur et discrétion." },
  { nom: "Anniversaires & fêtes", option: "Anniversaire & Fête", texte: "18 ans, 50 ans, fête surprise : la soirée devient un film que l'on se repasse." },
  { nom: "Soutenances & conférences", option: "Soutenance / Académique", texte: "Captation nette, son clair. Votre famille peut suivre la soutenance à distance." },
  { nom: "Publicités & spots", option: "Publicité & Spot Commercial", texte: "Des spots courts pensés pour retenir l'attention et faire connaître votre activité." },
  { nom: "Vlogs & contenu digital", option: "Vlog & Contenu Digital", texte: "Vlogs et formats pour les réseaux sociaux, tournés avec un regard de cinéma." },
  { nom: "Récaps d'activités & sport", option: "Récap Activités / Sport", texte: "Tournois, sorties, événements associatifs : un récap rythmé qui donne envie d'y retourner." },
  { nom: "Projets sur mesure", option: "Autre / Sur Mesure", texte: "Clip, film d'entreprise, aftermovie. Racontez-nous l'idée, nous construisons le tournage autour." },
] as const;

export const CATEGORIES = [
  { id: "all", label: "Tout" },
  { id: "mariage", label: "Mariage" },
  { id: "evenement", label: "Événement" },
  { id: "pub", label: "Publicité" },
  { id: "sport", label: "Sport" },
] as const;

export const CHIFFRES = [
  { n: "120+", l: "projets réalisés" },
  { n: "98+", l: "clients satisfaits" },
  { n: "45+", l: "projets filmés" },
  { n: "100 %", l: "de satisfaction client" },
];

export const AVIS = [
  { q: "Zoé Studio a fait un travail au-delà de nos espérances. Chaque regard, chaque larme immortalisé avec une sensibilité rare.", nom: "Awa Lucie", ev: "Récap d'activité religieuse, Tanger 2026" },
  { q: "Pour notre spot publicitaire, Zoé Studio a livré un résultat digne des grandes agences. Professionnalisme et réactivité au rendez-vous.", nom: "Barack", ev: "Publicité, 2026" },
  { q: "La captation de ma soutenance était impeccable. Cadrage parfait, son cristallin. Toute ma famille a pu suivre à distance.", nom: "Dr. Fatima R.", ev: "Soutenance, 2025" },
  { q: "L'anniversaire de ma fille est devenu un vrai film. Montage livré en 48 h avec une musique parfaitement choisie. Merci !", nom: "Nadia M.", ev: "Anniversaire, Tanger 2026" },
  { q: "Notre récap de tournoi était exactement ce qu'on cherchait : dynamique, rythmé, avec des angles qu'on ne voit nulle part ailleurs.", nom: "Yassine K.", ev: "Sport, 2025" },
  { q: "Le baptême de notre fils filmé par Zoé Studio, un souvenir pour la vie. On replonge dans cette journée à chaque visionnage.", nom: "Houda & Rachid", ev: "Baptême, 2024" },
];

export const ETAPES = [
  { t: "Vous réservez en ligne", d: "Le formulaire ci-contre suffit." },
  { t: "Nous vous rappelons sous 24 h", d: "Un échange gratuit pour préciser votre idée." },
  { t: "Vous recevez un devis clair", d: "Le prix et les livrables, sans surprise." },
  { t: "Nous tournons le jour J", d: "L'équipe arrive en avance et reste discrète." },
  { t: "Vous téléchargez votre film", d: "Il vous attend dans votre espace client." },
];

export const FAQ = [
  { q: "Combien de temps à l'avance faut-il réserver ?", r: "3 jours minimum pour les petits projets, 4 à 8 jours pour les mariages. Pour une demande urgente, écrivez-nous sur WhatsApp : nous faisons notre possible." },
  { q: "Sous quel délai vais-je recevoir ma vidéo ?", r: "48 à 72 h pour un événement standard, 5 à 10 jours pour un montage personnalisé. Le fichier se télécharge depuis votre espace client." },
  { q: "Proposez-vous aussi la photographie ?", r: "Oui, en partenariat avec Racine_Photographique, pour une formule complète vidéo et photo." },
  { q: "Dans quelles villes intervenez-vous ?", r: "Nous sommes basés à Tanger et nous nous déplaçons partout au Maroc. Des frais peuvent s'ajouter hors de la région Tanger-Tétouan." },
  { q: "Comment se passe le paiement ?", r: "Le solde se règle le jour J ou à la livraison. Virement, espèces et paiement mobile sont acceptés." },
];

export const BUDGETS = ["200 MAD", "200–350 MAD", "350–400 MAD", "400–1500 MAD", "Plus de 1500 MAD"];
export const JOURS = ["1 jour", "2 jours", "3 jours", "4 jours", "5 jours ou plus"];

export const STATUT_LABEL = {
  new: "En attente de confirmation",
  confirmed: "Confirmée",
  done: "Terminée",
} as const;
