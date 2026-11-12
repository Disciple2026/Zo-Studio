/* Catalogue de la bibliothèque. Une démo n'est connue ici que par sa fiche et son adresse :
   son code vit dans public/lab/<identifiant>/ et ne dépend de rien d'autre.
   Phase 5 : ces fiches passeront dans la table `showcases`. */

export type Statut = "original" | "personnalisable" | "inspiration";

export const STATUTS: Record<Statut, { label: string; aide: string }> = {
  original: { label: "Zoé Original", aide: "Conçu et réalisé par Zoé Studio." },
  personnalisable: { label: "Base personnalisable", aide: "Adaptable à votre marque." },
  inspiration: { label: "Inspiration externe", aide: "Référence d'un tiers, montrée pour inspirer." },
};

export type Fiche = {
  id: string;
  nom: string;
  secteur: string;
  direction: "Élégant" | "Immersif" | "Audacieux";
  statut: Statut;
  identite: string;
  interactions: string[];
  /** Adresse de la démo, relative à la racine du site. */
  url: string;
  apercu: string;
  note?: string;
};

export const FICHES: Fiche[] = [
  {
    id: "dar-azelmat",
    nom: "Dar Azelmat",
    secteur: "Hôtel et riad",
    direction: "Élégant",
    statut: "original",
    identite: "Une maison d'hôtes de médina qui vend d'abord sa lumière.",
    interactions: ["Curseur d'heure de 7 h à 22 h", "Ombre du claustra qui glisse sur la page", "Chambre mise en avant selon l'heure"],
    url: "/lab/dar-azelmat/",
    apercu: "/lab/dar-azelmat/apercu.jpg",
  },
  {
    id: "vingt-deux-couverts",
    nom: "Vingt-Deux Couverts",
    secteur: "Restaurant",
    direction: "Audacieux",
    statut: "original",
    identite: "Un petit restaurant dont on compose la table, vue du plafond.",
    interactions: ["Assiettes à glisser sur la table", "Addition mise à jour en direct", "Utilisable au clavier et au toucher"],
    url: "/lab/vingt-deux-couverts/",
    apercu: "/lab/vingt-deux-couverts/apercu.jpg",
  },
  {
    id: "zelij-variable",
    nom: "Zelij Variable",
    secteur: "Artisanat",
    direction: "Audacieux",
    statut: "original",
    identite: "Un atelier de zellige qui laisse le client composer son mur.",
    interactions: ["Symétrie à 8, 12 ou 16 branches", "Trois émaux au choix", "Chaque tesselle se recolore au clic"],
    url: "/lab/zelij-variable/",
    apercu: "/lab/zelij-variable/apercu.jpg",
  },
  {
    id: "portant",
    nom: "Atelier Souani",
    secteur: "Mode et e-commerce",
    direction: "Immersif",
    statut: "inspiration",
    identite: "Une boutique dont on parcourt le portant à la main.",
    interactions: ["Cintres à faire glisser", "Pièce à ouvrir et à retourner", "Photos distantes avec repli dessiné"],
    url: "/#demo",
    apercu: "/apercus/portant.jpg",
    note: "Composant issu d'une bibliothèque tierce (21st.dev), licence à confirmer : montré comme inspiration, pas comme modèle à vendre.",
  },
];

export const SECTEURS_BIBLIO = [...new Set(FICHES.map((f) => f.secteur))];
