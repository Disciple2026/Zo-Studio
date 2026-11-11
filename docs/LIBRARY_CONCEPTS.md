# Bibliothèque : enseignements des modèles, matrice des secteurs et 24 concepts

Document de recherche, rédigé le 11 novembre 2026. Rien ici n'est publié ni validé : ce sont des
propositions soumises au propriétaire.

**Comment lire ce document**

- **Fait** : ce qui vient de `docs/LAB_PROMPTS.md` et `docs/CONTENT_AND_LICENSES.md` (sections 1 et 2).
- **Observation** : lecture de la couverture par secteur (section 2). C'est un jugement, pas une mesure.
- **Idée** : tous les concepts de la section 3 et l'ordre de la section 4.

**Limites de ce travail**

- Aucune recherche web n'a été faite. Les noms de concepts sont inventés, mais **aucune recherche
  d'antériorité** (marque, nom de domaine, enseigne existante au Maroc) n'a été menée. À vérifier
  avant toute publication.
- La présence de chaque police dans Fontsource et sa licence (attendue : SIL OFL) sont données de
  mémoire. À confirmer au moment de `npm install @fontsource/...`.
- Les modèles fournis n'ont pas été relus : je m'appuie sur l'analyse existante.
- Tous les concepts visent le statut **Zoé Original**. Ils reprennent des mécaniques (idées, non
  protégées), jamais un nom, un texte, une composition ni un fichier d'un modèle.

---

## 1. Ce que chaque modèle nous apprend

### 1. Baseline (club de tennis)
- **Mécanique réutilisable** : titres révélés mot par mot derrière un masque ; grille en `rem` proportionnelle à l'écran ; carrousel avec mots fantômes géants.
- **Secteurs** : sportif/coach, association/institution, agence, tout site à forte voix éditoriale.
- **Repli local** : aplats de couleur et silhouettes SVG à la place des six photos ; le texte et la grille tiennent seuls.

### 2. Gravity (studio, champ de sphères)
- **Mécanique réutilisable** : physique pilotée par le défilement (flotter, tomber, former une silhouette, s'envoler) ; palette qui évolue ; objets repoussés par le curseur.
- **Secteurs** : agence créative, SaaS, association (données en points), mariage (tables), tout récit en étapes.
- **Repli local** : aucun fichier tiers ; prévoir une image fixe sans WebGL et un mode allégé sur mobile.

### 3. Loopstack (écran unique avec vidéo)
- **Mécanique réutilisable** : un seul écran, une vidéo de fond, un message et une action.
- **Secteurs** : page d'attente, lancement, hôtel/riad, parfum, portfolio vidéo.
- **Repli local** : dégradé CSS animé et image fixe ; le dégradé SVG d'origine se refait en CSS.

### 4. KIMI (pilote de F1) — Inspiration externe uniquement
- **Mécanique réutilisable** : sections qui s'empilent, portrait en parallaxe de profondeur, masque révélé par le curseur, frise chronologique.
- **Secteurs** : sportif fictif, portfolio, immobilier (couches de profondeur), institution (frise).
- **Repli local** : couches SVG ou CSS décalées à la place des cartes de profondeur ; athlète inventé, aucune marque.

### 5. Marcus Vane (portfolio de fondateur)
- **Mécanique réutilisable** : nom géant derrière un portrait détouré ; effet liquide par filtre SVG au survol ; témoignages interactifs.
- **Secteurs** : portfolio, coach, artisan, association (portraits et paroles).
- **Repli local** : silhouette vectorielle à la place du portrait ; témoignages étiquetés « contenu de démonstration ».

### 6. Alpha.Project (grotte de glace)
- **Mécanique réutilisable** : séquence d'images pilotée par le défilement, parallaxe par carte de profondeur, verre flou.
- **Secteurs** : hôtel/riad (traversée des lieux), immobilier (visite), artisanat (geste filmé), portfolio vidéo.
- **Repli local** : trois à cinq images clés en fondu enchaîné au lieu de 120 ; la séquence complète se charge ensuite.

### 7. easylog (tronc et mousse)
- **Mécanique réutilisable** : masque peint par le curseur, qui s'efface avec le temps ; chargement pixelisé.
- **Secteurs** : restaurant (cru et dressé), mariage (salle vide et décorée), immobilier (plan et réalisé), artisanat (brut et fini).
- **Repli local** : paire de dessins SVG ; sur écran tactile, curseur « avant / après » classique.

### 8. Soda (canette 3D)
- **Mécanique réutilisable** : produit qui suit le curseur ; changement de variante chorégraphié.
- **Secteurs** : parfum/cosmétique, e-commerce, artisanat d'objet.
- **Repli local** : objet construit en primitives Three.js (cylindre, sphère, tour) ou image fixe ; aucun fichier GLB requis.

### 9. Portant de vêtements (composant)
- **Mécanique réutilisable** : rail de produits dessinés en SVG que l'on fait défiler comme un portant.
- **Secteurs** : mode/e-commerce ; transposable à tout rayonnage (flacons, poteries, livres).
- **Repli local** : déjà en place, les dessins SVG intégrés sont le repli. Licence du composant à confirmer.

---

## 2. Matrice secteurs

Observation : « couvert » signifie qu'un modèle fourni vise ce secteur ou s'y transpose presque
directement. Cela ne dit rien des droits (voir section 1 et `LAB_PROMPTS.md`).

| Secteur | Modèle qui le couvre | Trou constaté |
| --- | --- | --- |
| Restaurant | Aucun (easylog transposable) | **Vide.** Ni carte, ni réservation, ni récit de cuisine |
| Hôtel / riad | Aucun (Alpha.Project et Loopstack transposables) | **Vide.** Pas de parcours chambre, dates, lieu |
| Mariage / événement | Aucun (easylog transposable) | **Vide.** Pas de faire-part, programme, devis |
| Mode / e-commerce | Portant ; Soda pour la fiche produit | Une seule direction artistique ; pas de tunnel panier |
| Parfum / cosmétique | Soda, par transposition | Pas d'univers sensoriel ; modèles 3D à produire |
| Immobilier | Aucun | **Vide.** Pas de plan, de lot, de visite |
| Portfolio photo / vidéo | Marcus Vane, Loopstack | Portfolio de personne, pas de galerie d'œuvres ni de lecteur vidéo |
| Artisanat marocain | Aucun | **Vide.** Aucun ancrage local dans les neuf modèles |
| Association / institution | Aucun | **Vide.** Pas de don, d'impact, de transparence |
| SaaS / dashboard | Aucun (Gravity est une vitrine de studio) | **Vide.** Pas d'interface produit, pas de tarifs |
| Sportif / coach | Baseline ; KIMI (inspiration seulement) | Pas de coach individuel ni de réservation de séance |
| Agence créative | Gravity ; Loopstack | Couvert ; manque une version sobre et commerciale |

**Lecture** : huit secteurs sont vides. Les concepts de la section 3 portent sur ces huit-là.
Mode, portfolio, sportif et agence sont partiellement couverts et viendront dans un second lot.
Autre constat : sept modèles sur neuf reposent sur le même schéma (hero spectaculaire puis
défilement). Les concepts ci-dessous cherchent d'autres structures : outil, plan, objet, jeu.

---

## 3. Concepts proposés (24)

Règles communes à tous : `prefers-reduced-motion` respecté, version tactile prévue, contenu lisible
sans JavaScript lourd, prix et avis étiquetés « démonstration », vouvoiement.
Effort : léger (1 à 2 jours), moyen (3 à 5 jours), lourd (plus d'une semaine ou tournage).

### 3.1 Restaurant

**R1 — Le Comptoir des Marées** (élégant, commercial)
- Identité : une table de poisson face au détroit, dont la carte change avec la pêche du jour.
- Interaction signature : la carte est un menu papier à trois volets qui se déplie en CSS 3D ; chaque volet ouvert révèle un service.
- Palette : `#0E2A3B` `#F4EDE0` `#B8733A` `#7FA7A0`
- Polices : Cormorant Garamond, Onest
- Ressources : 6 photos de plats (tournage) ; version de départ en illustrations au trait SVG.
- Mécanique reprise : révélation mot par mot (1). Effort : léger.

**R2 — Braise** (créatif, immersif)
- Identité : un grill au feu de bois où tout part de la matière crue.
- Interaction signature : le curseur « cuit » l'assiette ; il révèle le plat dressé sous les ingrédients crus, puis la trace refroidit et s'efface.
- Palette : `#17110D` `#E4572E` `#F2C078` `#8A8178`
- Polices : Fraunces, DM Sans
- Ressources : 3 paires de photos alignées (cru, dressé), prises du même point de vue.
- Mécanique reprise : masque peint au curseur (7). Effort : moyen.

**R3 — Vingt-Deux Couverts** (expérimental, audacieux)
- Identité : un petit restaurant qui montre sa salle telle qu'elle est, vue du plafond.
- Interaction signature : la page est une table dessinée vue de dessus ; le visiteur y fait glisser des assiettes et une addition de caisse se met à jour en direct.
- Palette : `#FBF7EF` `#1B1B1B` `#D7263D` `#2E6F57`
- Polices : Space Grotesk, JetBrains Mono (ticket)
- Ressources : aucune ; assiettes et table en SVG.
- Mécanique reprise : aucune. Effort : moyen.

### 3.2 Hôtel / riad

**H1 — Dar Azelmat** (élégant, commercial)
- Identité : une maison d'hôtes de médina qui vend d'abord sa lumière.
- Interaction signature : un curseur d'heure (de 7 h à 22 h) fait glisser sur toute la page l'ombre d'un claustra en SVG et réchauffe les couleurs ; les chambres s'affichent selon l'heure choisie.
- Palette : `#F6F1E7` `#C4623A` `#5B6B45` `#1F2A2E`
- Polices : Marcellus, Manrope
- Ressources : aucune pour la démo (claustra et dégradés en SVG et CSS) ; 5 photos de chambres pour la version vendue.
- Mécanique reprise : palette qui évolue (2). Effort : léger.

**H2 — Kasbah Haute** (créatif, immersif)
- Identité : on n'arrive pas à cet hôtel, on y monte, de la ruelle à la terrasse.
- Interaction signature : le défilement fait avancer un plan continu, porte, patio, escalier, toit, avec les informations en verre flou à chaque palier.
- Palette : `#101820` `#E8DCC8` `#2F6F8F` `#D9A441`
- Polices : Playfair Display, Inter
- Ressources : un plan vidéo stabilisé découpé en 60 à 90 images ; lieu de tournage avec autorisation écrite.
- Mécanique reprise : séquence pilotée par le défilement (6). Effort : lourd.

**H3 — Chambre Neuf** (expérimental, audacieux)
- Identité : un riad présenté comme une maquette d'architecte ouverte en deux.
- Interaction signature : pas de menu ; une coupe isométrique du bâtiment sert de navigation, chaque pièce cliquée s'allume et déplie son prix et sa disponibilité de démonstration.
- Palette : `#EDE6DA` `#22313F` `#E07A5F` `#81B29A`
- Polices : Syne, IBM Plex Mono
- Ressources : une coupe isométrique en SVG, dessinée par le studio.
- Mécanique reprise : aucune. Effort : moyen.

### 3.3 Mariage / événement

**M1 — Maison Lila et Sel** (élégant, commercial)
- Identité : une organisatrice de mariages qui traite chaque couple comme un courrier précieux.
- Interaction signature : le visiteur brise un sceau de cire ; l'enveloppe s'ouvre en CSS 3D et le faire-part en sort pour devenir la page.
- Palette : `#FAF6F0` `#C9A9A6` `#B89B5E` `#6E7F6A`
- Polices : Italiana, Cormorant Garamond
- Ressources : aucune pour la démo (enveloppe et sceau en SVG) ; 6 photos d'événements pour la version vendue.
- Mécanique reprise : aucune. Effort : léger.

**M2 — Salle Comble** (créatif, immersif)
- Identité : un décorateur d'événements qui prouve la transformation d'un lieu.
- Interaction signature : le visiteur « allume » la salle au curseur ; la salle vide laisse place à la salle décorée là où il passe. Sur mobile, curseur avant et après.
- Palette : `#1C1A22` `#F3E9DC` `#D4A373` `#9D4E5F`
- Polices : DM Serif Display, Outfit
- Ressources : une paire de photos alignées d'une même salle, vide puis décorée (ou deux rendus).
- Mécanique reprise : masque peint au curseur (7). Effort : moyen.

**M3 — Plan de Table** (expérimental, audacieux)
- Identité : un traiteur qui commence par le problème réel des mariés, placer tout le monde.
- Interaction signature : le visiteur saisit un nombre d'invités ; des tables rondes naissent, se repoussent et s'organisent dans la salle, et l'estimation de démonstration suit en direct.
- Palette : `#FFFDF8` `#14342B` `#F2A541` `#E4572E`
- Polices : Bricolage Grotesque, Space Mono
- Ressources : aucune ; canvas 2D.
- Mécanique reprise : physique et répulsion, ramenées en 2D (2). Effort : moyen.

### 3.4 Parfum / cosmétique

**P1 — Maison Zhar** (élégant, commercial)
- Identité : une parfumerie de fleur d'oranger qui explique le temps d'un parfum.
- Interaction signature : appui maintenu sur le flacon ; les notes de tête, de cœur puis de fond se diffusent en trois temps tant que l'on tient. Un bouton « Lire les notes » fait la même chose au clavier.
- Palette : `#FBF8F2` `#E9B872` `#3E5641` `#2B2118`
- Polices : Bodoni Moda, Manrope
- Ressources : flacon en SVG ; 3 photos de matières premières pour la version vendue.
- Mécanique reprise : aucune. Effort : léger.

**P2 — Sillage** (créatif, immersif)
- Identité : trois fragrances, trois heures de la journée, un seul flacon.
- Interaction signature : le flacon 3D se tourne vers le curseur ; changer de fragrance déclenche une rotation, un changement de liquide et de lumière.
- Palette : `#0B0B12` `#C8B6FF` `#FFD6A5` `#8ECAE6`
- Polices : Gloock, Sora
- Ressources : flacon construit en primitives Three.js (verre, bouchon, liquide), sans fichier de modèle.
- Mécanique reprise : produit qui suit le curseur et variante chorégraphiée (8). Effort : lourd.

**P3 — Accord** (expérimental, audacieux)
- Identité : un atelier de parfum sur mesure où le client compose avant d'acheter.
- Interaction signature : trois curseurs (agrume, bois, fleur) ; un nuage génératif change de forme, de densité et de couleur, et la formule obtenue s'écrit en clair pour être envoyée à l'atelier.
- Palette : `#F7F3EE` `#FF7A59` `#5E548E` `#1D3557`
- Polices : Unbounded, Inter
- Ressources : aucune ; canvas 2D.
- Mécanique reprise : palette qui évolue (2). Effort : moyen.

### 3.5 Immobilier

**I1 — Les Terrasses du Levant** (élégant, commercial)
- Identité : une résidence neuve vendue sur plan, sans brochure.
- Interaction signature : plan de masse interactif ; un filtre par nombre de pièces éteint les lots hors critères, chaque lot restant affiche surface, étage, orientation et statut de démonstration.
- Palette : `#F5F2EC` `#1E3A4C` `#C08A4B` `#8FA89B`
- Polices : Newsreader, Work Sans
- Ressources : plan de masse et plans de lots en SVG.
- Mécanique reprise : aucune. Effort : moyen.

**I2 — Belvédère Dix-Sept** (créatif, immersif)
- Identité : une tour d'habitation à Tanger dont l'argument est la vue.
- Interaction signature : le défilement est un ascenseur ; l'indicateur d'étage monte et la vue par la fenêtre change par couches, rue, toits, port, détroit, côte d'en face.
- Palette : `#0F1C2E` `#F4E9D8` `#3A86A8` `#F28F3B`
- Polices : Archivo, Fraunces
- Ressources : paysage en 5 couches SVG, dessiné par le studio.
- Mécanique reprise : sections qui s'empilent, parallaxe de profondeur (4). Effort : moyen.

**I3 — Mètre Carré** (expérimental, audacieux)
- Identité : une agence qui part du mode de vie du client, pas de son catalogue.
- Interaction signature : budget, nombre de pièces et priorité (cuisine, séjour, extérieur) redessinent en direct un plan d'appartement ; les cloisons se déplacent à la main.
- Palette : `#FFFFFF` `#111111` `#0057FF` `#FFCC00`
- Polices : Space Grotesk, JetBrains Mono
- Ressources : aucune ; plan généré en SVG.
- Mécanique reprise : aucune. Effort : lourd.

### 3.6 Artisanat marocain

**A1 — Maison Doum** (élégant, commercial)
- Identité : vannerie et cuir, vendus avec le nom de l'atelier et le temps de fabrication.
- Interaction signature : une loupe ronde suit le curseur sur l'objet et montre le grain de la matière ; à côté, la fiche indique atelier, heures de travail et matière.
- Palette : `#F3ECE0` `#8C5A2B` `#2F4538` `#1A1A1A`
- Polices : Fraunces, Onest
- Ressources : 6 photos d'objets en haute définition ; accord écrit des artisans pour toute mention ou image.
- Mécanique reprise : rail de produits (9), sous réserve de licence ; sinon grille simple. Effort : léger.

**A2 — Rang par Rang** (créatif, immersif)
- Identité : un atelier de tissage qui raconte un tapis dans l'ordre où il se fait.
- Interaction signature : le défilement tisse le tapis, rang après rang ; chaque bande de motif fait apparaître l'étape correspondante, et le tapis terminé devient la fiche produit.
- Palette : `#EFE6D5` `#9B2226` `#1D3557` `#E9C46A`
- Polices : Reem Kufi, Inter
- Ressources : aucune ; motifs géométriques générés en canvas. Motifs à dessiner par le studio, sans copier un tapis existant.
- Mécanique reprise : récit piloté par le défilement (6), sans images. Effort : moyen.

**A3 — Zelij Variable** (expérimental, audacieux)
- Identité : un atelier de zellige qui laisse le client composer son mur.
- Interaction signature : le visiteur choisit la symétrie (8, 12 ou 16 branches) et trois émaux ; le motif se construit pièce par pièce, chaque tesselle se recolore au clic, et le résultat part en demande de devis.
- Palette : `#F7F4EA` `#1B4D3E` `#1F4E79` `#D9A404`
- Polices : Syne, Reem Kufi
- Ressources : aucune ; géométrie calculée en SVG.
- Mécanique reprise : aucune. Effort : moyen.

### 3.7 Association / institution

**S1 — Fondation Rive Nord** (élégant, commercial)
- Identité : une fondation d'aide scolaire qui dit où va chaque dirham.
- Interaction signature : un curseur de montant traduit le don en actes concrets (cartables, heures de soutien) dessinés en pictogrammes qui s'ajoutent un à un. Équivalences étiquetées « démonstration ».
- Palette : `#FFFFFF` `#123C69` `#F2B134` `#EEF2F5`
- Polices : Lexend, Newsreader
- Ressources : jeu de 8 pictogrammes SVG.
- Mécanique reprise : aucune. Effort : léger.

**S2 — Les Voix du Quartier** (créatif, immersif)
- Identité : une association de quartier racontée par ceux qui la font vivre.
- Interaction signature : une journée défile de 8 h à 20 h ; à chaque heure, une parole s'écrit mot par mot à côté d'un portrait, et le visiteur choisit la voix suivante.
- Palette : `#FDF6EC` `#2A2A2A` `#E76F51` `#2A9D8F`
- Polices : Anton, Onest
- Ressources : 5 portraits illustrés (dessin, pas de photo de personnes réelles en démo) ; paroles fictives étiquetées.
- Mécanique reprise : révélation mot par mot (1), témoignages interactifs (5). Effort : moyen.

**S3 — Mille Points** (expérimental, audacieux)
- Identité : un rapport d'activité où chaque personne aidée reste visible.
- Interaction signature : mille points, un par bénéficiaire ; au défilement ils se regroupent en carte, puis en courbe par année, puis en chiffre. Survoler un point l'isole.
- Palette : `#0D1B2A` `#E0E1DD` `#F4A261` `#52B788`
- Polices : Archivo, IBM Plex Mono
- Ressources : aucune ; canvas 2D et jeu de données de démonstration étiqueté.
- Mécanique reprise : former une silhouette au défilement (2). Effort : moyen.

### 3.8 SaaS / dashboard

**D1 — Feuillet** (élégant, commercial)
- Identité : un outil de facturation pour petites entreprises, qui se montre au lieu de se décrire.
- Interaction signature : l'en-tête est un tableau de bord réel et manipulable ; changer la période ou cocher une facture redessine les graphiques, et le curseur d'utilisateurs recalcule le tarif.
- Palette : `#FAFAF7` `#0F172A` `#0E9F6E` `#E2E8F0`
- Polices : Inter, JetBrains Mono (chiffres)
- Ressources : aucune ; graphiques SVG et données de démonstration.
- Mécanique reprise : aucune. Effort : léger.

**D2 — Orbe** (créatif, immersif)
- Identité : une plateforme de gestion d'équipe qui s'assemble sous les yeux du visiteur.
- Interaction signature : au défilement, les pièces de l'interface tombent, rebondissent et se rangent en un écran complet ; chaque pièce posée correspond à un bénéfice expliqué.
- Palette : `#0A0A0F` `#7C5CFF` `#22D3EE` `#F5F5F7`
- Polices : Sora, Space Grotesk
- Ressources : aucune ; éléments DOM animés avec Motion.
- Mécanique reprise : tomber puis former (2). Effort : moyen.

**D3 — Invite** (expérimental, audacieux)
- Identité : un outil pour développeurs dont le site se pilote comme le produit.
- Interaction signature : une ligne de commande est la navigation ; taper « prix », « démo » ou « contact » compose la page réponse par réponse. Les mêmes commandes existent en boutons visibles.
- Palette : `#0B0F0C` `#C6F432` `#E6E6E6` `#FF5C5C`
- Polices : JetBrains Mono, Space Grotesk
- Ressources : aucune.
- Mécanique reprise : aucune. Effort : léger.

### Vérification de distinction

Les 24 interactions signatures sont toutes différentes : déplier, peindre, glisser-déposer, régler
l'heure, avancer dans un plan, naviguer par une coupe, décacheter, simuler une physique, maintenir,
orienter un objet 3D, mélanger, filtrer un plan, monter, générer un plan, grossir, tisser, composer
un motif, convertir un montant, écouter une journée, regrouper des points, manipuler un tableau de
bord, assembler, taper une commande. Deux concepts partagent la mécanique du masque (R2 et M2) :
si un seul doit être construit, garder M2, plus lisible commercialement.

---

## 4. Ordre de réalisation : les six premières démos

Idée, à arbitrer par le propriétaire. Les six sont réalisables en code, SVG, CSS et canvas, sans
photo, vidéo, modèle 3D ni service tiers, et couvrent six secteurs aujourd'hui vides. Cet ordre
complète celui de `LAB_PROMPTS.md` (Gravity en premier pour valider la chaîne du Lab) sans le remplacer.

1. **A3 Zelij Variable** (artisanat) : ancrage marocain immédiat, zéro ressource, se termine par une demande de devis, donc démontre le parcours complet du studio.
2. **D1 Feuillet** (SaaS) : effort léger, comble un secteur vide et montre une direction sobre et commerciale face aux démos spectaculaires.
3. **H1 Dar Azelmat** (hôtel/riad) : une seule idée en CSS et SVG, forte en émotion, pour un secteur très demandé à Tanger.
4. **R3 Vingt-Deux Couverts** (restaurant) : prouve qu'un site de restaurant peut être un objet à manipuler ; SVG seul.
5. **M3 Plan de Table** (mariage) : réemploie la physique de Gravity en 2D, donc amortit le travail de la première démo du Lab.
6. **P3 Accord** (parfum) : canvas génératif, très différent du restaurant, et repoussant la 3D lourde (P2) à plus tard.

Viennent ensuite, par besoin croissant de ressources : M1, S1, D3, I2, A2, S3 (toujours sans
ressource externe), puis I1, H3, D2, puis les concepts à photos (R1, A1, R2, M2, S2), enfin P2,
I3 et H2.

## Points de droits à trancher avant publication

- Noms de concepts : antériorité non vérifiée (section « Limites »).
- Composant Portant (9) : licence 21st.dev non confirmée ; A1 ne doit pas en dépendre.
- Modèles 6 et 7 : produits édités avec marqueur d'origine ; seule l'idée de mécanique est reprise, réécrite par nous.
- Photos de personnes, d'artisans et de lieux : autorisation écrite nécessaire ; les démos utilisent des dessins.
- Motifs traditionnels (zellige, tissage) : géométries du domaine commun, mais ne pas reproduire le dessin d'un atelier ou d'une pièce identifiable.
- Polices : licence à relire à l'installation, en particulier toute police hors SIL OFL.
