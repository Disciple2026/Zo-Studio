/* Données du mini-simulateur de l'accueil. Tous les noms sont inventés : contenu de démonstration.
   Le simulateur complet (phase 3) reprendra ce même principe avec une configuration validée par schéma. */

export type Secteur = {
  id: string;
  label: string;
  marque: string;
  menu: string[];
  titre: string;
  texte: string;
  bouton: string;
  tuiles: string[];
};

export const SECTEURS: Secteur[] = [
  {
    id: "restaurant",
    label: "Restaurant",
    marque: "Dar Zitoun",
    menu: ["La carte", "La maison", "Réserver"],
    titre: "La table du détroit",
    texte: "Cuisine tangéroise de saison, servie face à la mer.",
    bouton: "Réserver une table",
    tuiles: ["Entrées", "Tajines", "Desserts"],
  },
  {
    id: "boutique",
    label: "Boutique",
    marque: "Atelier Souani",
    menu: ["Nouveautés", "Collections", "Panier"],
    titre: "Pièces cousues à Tanger",
    texte: "Des séries courtes, des matières choisies, livrées partout au Maroc.",
    bouton: "Voir la collection",
    tuiles: ["Chemises", "Mailles", "Vestes"],
  },
  {
    id: "mariage",
    label: "Mariage",
    marque: "Salma & Idriss",
    menu: ["Le jour J", "Le lieu", "Répondre"],
    titre: "Nous nous marions",
    texte: "Le 14 juin, à Tanger. Toutes les informations pour être des nôtres.",
    bouton: "Confirmer ma présence",
    tuiles: ["Programme", "Accès", "Liste"],
  },
  {
    id: "portfolio",
    label: "Photographe",
    marque: "Nour Benali",
    menu: ["Séries", "À propos", "Contact"],
    titre: "Portraits et lumière du nord",
    texte: "Photographe à Tanger. Portraits, mariages, commandes pour les marques.",
    bouton: "Voir les séries",
    tuiles: ["Portraits", "Mariages", "Commandes"],
  },
];

export type Ambiance = {
  id: string;
  label: string;
  fond: "clair" | "sombre" | "couleur";
  police: "serif" | "sans" | "affiche";
  rayon: string;
  centre: boolean;
  capitales: boolean;
  italique: boolean;
};

export const AMBIANCES: Ambiance[] = [
  { id: "editorial", label: "Éditorial", fond: "clair", police: "serif", rayon: "2px", centre: false, capitales: false, italique: false },
  { id: "luxe", label: "Luxe", fond: "sombre", police: "serif", rayon: "0px", centre: true, capitales: false, italique: true },
  { id: "audacieux", label: "Audacieux", fond: "couleur", police: "affiche", rayon: "999px", centre: false, capitales: true, italique: false },
  { id: "minimal", label: "Minimal", fond: "clair", police: "sans", rayon: "14px", centre: true, capitales: false, italique: false },
];

export const COULEURS = [
  { id: "emeraude", label: "Émeraude", hex: "#0B7F63" },
  { id: "or", label: "Or", hex: "#C99A3B" },
  { id: "terracotta", label: "Terracotta", hex: "#C2502D" },
  { id: "nuit", label: "Bleu nuit", hex: "#243C8F" },
  { id: "prune", label: "Prune", hex: "#7A2E5E" },
];

/* Texte lisible sur une couleur donnée : blanc ou presque noir selon la luminance. */
export function texteSur(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.3 ? "#10140f" : "#ffffff";
}

export const POLICES = {
  serif: "var(--font-serif)",
  sans: "var(--font-sans)",
  affiche: "var(--font-affiche)",
} as const;
