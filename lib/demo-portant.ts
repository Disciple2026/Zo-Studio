import type { RailGarment } from "@/components/ui/product-rail-gallery";

/* Boutique fictive pour la démonstration du portant.
   repli: chaque pièce a un dessin intégré (kind + color). Les photos viennent de cdn.21st.dev ;
   si l'une d'elles ne répond pas, PORTANT_DESSINE est affiché à la place (voir demo-portant.tsx).
   Marque, pièces et prix sont inventés. */

const B = "https://cdn.21st.dev/assets/mirror";
const p = (h: string) => `${B}/${h.slice(0, 2)}/${h}.webp`;

export const PORTANT: RailGarment[] = [
  { id: "tee-ivoire", name: "T-shirt épais, ivoire", kind: "tee", color: "#EFEBE2", tag: "290 MAD", description: "Coton biologique 240 g, broderie ton sur ton.", details: ["240 g/m²", "Coupe droite", "Broderie"],
    image: p("1485bf44725b18fcdba71bfae54d67d648ab3bff4b24215a042c0cc4c895a2e6"), backImage: p("69937e656430ae33d950303e0d53051273e5b02189750ef1e7429ec4bbf95e20"), sideImage: p("838468c32f16b4acba62e4601276737411156052444712ff2534fefe994a7bed") },
  { id: "tee-noir", name: "T-shirt imprimé, noir", kind: "tee", color: "#101214", tag: "320 MAD", description: "Jersey noir, impression devant et dos.", details: ["240 g/m²", "Coupe droite", "Sérigraphie"],
    image: p("d769f183472d0fd98a7aff2a643593748cd36ef9da1497d9bf6f0d87d1025a9b"), backImage: p("fec6f7e96b198cc5b9aad333ca2c4c10968a746d87f6dc11d9c118607b509058"), sideImage: p("b3b6984ea94b8b8cd19fb15387e89dca457ac0f947115c2a54a33217e4fb4571") },
  { id: "chemise-ciel", name: "Chemise oxford, ciel", kind: "shirt", color: "#A3D3EB", trim: "#F4F1EA", tag: "520 MAD", description: "Oxford léger, col boutonné, poche poitrine.", details: ["Oxford de coton", "Col boutonné", "Poche poitrine"],
    image: p("470a7723cef068f81e8a4c09d1ab3f8630c61b734c2168b10f3858e45efbf31f"), backImage: p("9be14e5dce879756775677e2d82dadc2ad9a1690b7df2f82de360cb3600d0ee5"), sideImage: p("5984d5ca60fd1aeee7e688ec33c2219a1c537fcde90d2accab813c13985f8632") },
  { id: "cardigan-olive", name: "Cardigan en maille, olive", kind: "knit", color: "#758151", tag: "690 MAD", description: "Grosse maille de laine, boutons en bois, bords-côtes.", details: ["Laine d'agneau", "Boutons en bois", "Col en V"],
    image: p("581b13c5ca241c653dc94d2c8048c92a60f022cfbaaf153261076d3a6655827e"), backImage: p("d9178d906d37268565cf10af3431aee543aacfc73610f7fa7b0fa4758c498cb3"), sideImage: p("dee1c529600e0460413f1a9b07a29bedb7ea7dc96181fce5d9d6501231e6e45d") },
  { id: "hoodie-chine", name: "Sweat à capuche, gris chiné", kind: "hoodie", color: "#A0A5AB", tag: "640 MAD", description: "Molleton 400 g, poche kangourou, impression poitrine.", details: ["Molleton 400 g", "Poche kangourou", "Capuche doublée"],
    image: p("51750ba098dd622df46695bca781b3f0ec336a36b93b070e638cc04455def6d6"), backImage: p("e75c4ac8fb7f14caae756338a31f81f1437bb312b78e0d7d906e9f956e7968fa"), sideImage: p("a2eb2463d52146c341ede6bb9f6067e917a23eb29b7b1d1d4c40ac084a01c7ce") },
  { id: "sweat-lilas", name: "Sweat col rond, lilas", kind: "knit", color: "#CCB2E0", tag: "580 MAD", description: "Molleton lilas, impression en relief.", details: ["Molleton 400 g", "Bords-côtes", "Impression relief"],
    image: p("8e38660e2add9637c27846d9b8d620f2abb228a5a153ccfd7b1c808b6845e1f8"), backImage: p("b9214a6e009ce4b3044595a51ea010c299135bab5b26775c43d7175c86e77898"), sideImage: p("591872e42b483c43c1cd08a3ac4d7d40c0b5fa2bc585a36096faded2e696e84e") },
  { id: "polo-foret", name: "Polo piqué, vert forêt", kind: "tee", color: "#185B37", tag: "450 MAD", description: "Maille piquée, patte deux boutons, broderie poitrine.", details: ["Maille piquée", "Deux boutons", "Broderie"],
    image: p("19fe43cb681195ae227e3164088d86a07a1b6e33cc54c6e35637374736a16894"), backImage: p("e095182b1a7f04e600c5662aa871b4c055c294b152586817d84e312c22f744cf"), sideImage: p("005a8e10be234bc40917f3153208b8196ba1610c53c987e39942da1f4a7cd808") },
  { id: "henley-brique", name: "Henley manches longues, brique", kind: "knit", color: "#B05139", tag: "410 MAD", description: "Coton flammé, patte trois boutons.", details: ["Coton flammé", "Trois boutons", "Manches longues"],
    image: p("84aa4b0e21ed11fcbc083647a607b94ee3a6c21cb66c114cfb1dad0792c15499"), backImage: p("01c299df56a29afca8dad4a64858bd506667338bfbd0435118e6c3698c7881b3"), sideImage: p("9ca38eeb156aae7d199d3c1ffb7947e395f77d1f094eea006c1b5fbb22352b4e") },
  { id: "mariniere", name: "Marinière manches longues", kind: "knit", color: "#E4DFD3", tag: "430 MAD", description: "Rayure classique encre et écru, col bateau.", details: ["220 g/m²", "Col bateau", "Manches longues"],
    image: p("096002a95aba7de9c197de4cb5c78cbbe17c1677b19c547cc20c6dbef47a899c"), backImage: p("74408a7dbb4f4fc6761ebb8d6ed93187248cddf75e1c2e70d38d04dfdd328776"), sideImage: p("eda3afca537071a80d7d82b3f0d1055b56f1f3263c20772224bae6660bf4072c") },
  { id: "tee-ocre", name: "T-shirt ample, ocre", kind: "tee", color: "#DE9C31", tag: "320 MAD", description: "Coupe carrée, épaules tombantes, grand motif au dos.", details: ["Coupe ample", "Épaules tombantes", "Motif au dos"],
    image: p("7208c811f54e123dd7b1a5c1c3926f43ca832f6c4c20c45de10671ffd544409d"), backImage: p("d356989b7bc741c5cfc934cac34983dfb24d5d6a6b6e7b8b7f6b27cd3eceae69"), sideImage: p("bf94beeafb21f9cb21aa45057a67dc8a2e23ba95c7ac0f79dd27ba3ce4a1230c") },
];

/* Version de repli : les mêmes pièces, dessinées par le composant, sans aucun fichier externe. */
export const PORTANT_DESSINE: RailGarment[] = PORTANT.map(
  ({ image: _i, backImage: _b, sideImage: _s, ...piece }) => piece,
);

export const PORTANT_URLS = PORTANT.flatMap((x) => [x.image, x.backImage, x.sideImage]).filter(
  (u): u is string => !!u,
);
