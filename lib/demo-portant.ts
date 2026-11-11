import type { RailGarment } from "@/components/ui/product-rail-gallery";

/* Boutique fictive pour la démonstration du portant. Les vêtements sont dessinés par le composant
   lui-même : aucune photo, aucun fichier externe. Marque, pièces et prix sont inventés. */
export const PORTANT: RailGarment[] = [
  { id: "tee-ivoire", name: "T-shirt épais, ivoire", kind: "tee", color: "#EDE7DA", tag: "290 MAD", description: "Coton biologique 240 g, coupe droite.", details: ["240 g/m²", "Coupe droite", "Coton bio"] },
  { id: "chemise-ciel", name: "Chemise oxford, ciel", kind: "shirt", color: "#A9CFE6", trim: "#F4F1EA", tag: "520 MAD", description: "Oxford léger, col boutonné, deux poches poitrine.", details: ["Oxford de coton", "Col boutonné", "Deux poches"] },
  { id: "maille-emeraude", name: "Pull en maille, émeraude", kind: "knit", color: "#0F7A5F", tag: "690 MAD", description: "Laine d'agneau, bords-côtes aux poignets et à la taille.", details: ["Laine d'agneau", "Col rond", "Bords-côtes"] },
  { id: "hoodie-sable", name: "Sweat à capuche, sable", kind: "hoodie", color: "#CDBB9B", trim: "#F1EADB", tag: "640 MAD", description: "Molleton 400 g, poche kangourou, cordons ton sur ton.", details: ["Molleton 400 g", "Poche kangourou", "Capuche doublée"] },
  { id: "veste-encre", name: "Veste de travail, encre", kind: "jacket", color: "#1F2C3A", trim: "#D4AF6A", tag: "980 MAD", description: "Toile de coton, trois poches plaquées, boutons laiton.", details: ["Toile épaisse", "Trois poches", "Boutons laiton"] },
  { id: "manteau-camel", name: "Manteau long, camel", kind: "coat", color: "#B98A52", trim: "#3A2A1A", tag: "1 850 MAD", description: "Drap de laine, col tailleur, fente au dos.", details: ["Drap de laine", "Col tailleur", "Doublé"] },
  { id: "tee-terracotta", name: "T-shirt ample, terracotta", kind: "tee", color: "#B8502F", tag: "310 MAD", description: "Épaules tombantes, jersey lavé pour un toucher doux.", details: ["Coupe ample", "Jersey lavé", "Épaules tombantes"] },
  { id: "maille-ecrue", name: "Cardigan, écru", kind: "knit", color: "#E3DCCB", tag: "720 MAD", description: "Maille épaisse à porter ouverte, toute l'année.", details: ["Coton et laine", "Maille épaisse", "Manches longues"] },
];
