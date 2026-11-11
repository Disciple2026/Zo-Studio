# Prompts reçus : analyse de dépendances et plan de recréation

Huit prompts de sites ont été fournis le 11 novembre 2026 (l'un d'eux, Gravity, en double).
Les textes des prompts ne sont pas versionnés ici : ils viennent d'éditeurs tiers et le dépôt
peut être public. Ils seront rangés dans le Prompt Studio privé (phase 5).

**Limite de cette analyse :** les hébergeurs `api.getlayers.ai`, `storage.getlayers.ai` et
`assets.uberdesigner.ai` ne sont pas joignables depuis l'environnement de travail. Aucun fichier
n'a pu être téléchargé ni examiné. Les licences de ces fichiers sont donc **inconnues**, et
inconnu vaut non exploitable.

## Synthèse

| # | Prompt | Fichiers tiers | Bibliothèques par CDN | Recréable sans rien emprunter ? | Statut possible |
| --- | --- | --- | --- | --- | --- |
| 1 | Baseline (club de tennis) | 6 photos | Lenis, police Onest | Oui, avec 6 photos à nous | Base personnalisable après rebaptême |
| 2 | Gravity (studio, sphères 3D) | **aucun** | Three.js, 4 polices | **Oui, entièrement** | Base personnalisable après rebaptême |
| 3 | Loopstack (écran unique) | 1 vidéo, 1 SVG | polices Google et Fontshare | Oui, avec 1 vidéo à nous ; le SVG se refait en CSS | Base personnalisable après rebaptême |
| 4 | KIMI (pilote de F1) | environ 40 fichiers dont un modèle 3D de casque et des portraits | Three.js, Lenis, décodeur Draco | **Non en l'état** : personne réelle et marques déposées | Inspiration externe uniquement |
| 5 | Marcus Vane (fondateur) | 8 photos, 1 vidéo | Lenis, polices Anton et Onest | Oui, avec portraits à nous | Base personnalisable après rebaptême |
| 6 | Alpha.Project (grotte de glace) | 240 images de séquence, 2 SVG | aucune | Mécanique oui ; la séquence est à produire | Base personnalisable avec notre propre séquence |
| 7 | easylog (tronc et mousse) | 2 images appariées, 1 logo | GSAP | Oui, avec une paire d'images à nous | Base personnalisable après rebaptême |
| 8 | Soda (canette 3D) | 4 modèles 3D, 5 images | GSAP, model-viewer | Mécanique oui ; les modèles 3D sont à produire | Base personnalisable avec nos modèles |

« Rebaptême » : nouveau nom, nouveaux textes, composition retravaillée. Un prompt qui demande de
reproduire un site « à l'identique » ne donne pas, tel quel, un modèle que Zoé Studio peut vendre.

## Détail par prompt

### 1. Baseline — club de tennis
- **Dépend de** : `hero-court.webp` et `1.webp` à `5.webp` (photos de joueurs) chez getlayers ;
  Lenis 1.1.18 par jsDelivr ; police Onest par Google Fonts.
- **Si l'hébergeur tombe** : hero vide, cartes sans image. Le texte et la mise en page tiennent.
- **Recréation** : Lenis par npm, Onest par Fontsource (licence OFL). Six photos à produire.
  Le formulaire de contact est un simulacre : à étiqueter « démonstration ».
- **Mécaniques à retenir** : grille en `rem` proportionnelle à l'écran, révélation des titres mot
  par mot derrière un masque, carrousel d'entraîneurs avec mots fantômes géants.

### 2. Gravity — studio numérique, champ de sphères
- **Dépend de** : rien d'autre que Three.js (unpkg) et des polices Google (Raleway, Space Grotesk,
  JetBrains Mono, Inter, toutes OFL). La scène est entièrement calculée.
- **Si un CDN tombe** : page blanche, d'où l'installation par npm.
- **Recréation** : complète et immédiate. **Meilleur candidat pour la première démo du Lab.**
- **Mécaniques à retenir** : physique pilotée par le défilement (flotter, tomber, former une
  silhouette, s'envoler), palette qui change au fil de la page, sphères repoussées par le curseur.
- **À surveiller** : 96 sphères et 4 passes de collision par image ; prévoir un mode allégé sur
  mobile et un repli statique sans WebGL.

### 3. Loopstack — écran unique avec vidéo
- **Dépend de** : `flower.mp4` et `black_gradient.svg` chez getlayers ; Playfair Display et Outfit
  (Google, OFL) ; General Sans par Fontshare (licence à lire avant auto-hébergement).
- **Si l'hébergeur tombe** : fond noir sans vidéo. La page reste lisible.
- **Recréation** : le dégradé se refait en CSS ; la vidéo est à produire (tournage du studio : une
  occasion de montrer son métier). Image de remplacement obligatoire.
- **À corriger** : curseur personnalisé imposé (contraire au cahier des charges), page sans
  défilement fragile sur petit écran, liens du pied de page morts, `lang="ru"`.

### 4. KIMI — site d'un pilote de Formule 1
- **Dépend de** : environ 40 fichiers chez getlayers : modèle de casque compressé, éclairage HDR,
  portrait avec cartes de profondeur, de découpe et de relief, logos, plaques photo par année ;
  Three.js, Lenis et le décodeur Draco par CDN.
- **Problème de droits** : le prompt porte le nom et l'image d'un pilote réel et la marque
  Mercedes-AMG F1. Zoé Studio ne peut ni le publier ni le vendre.
- **Décision** : classé **Inspiration externe**. Non reconstruit en l'état.
- **Ce qu'on peut en tirer** : un concept original « sportif fictif » qui reprend les mécaniques
  (sections qui s'empilent, portrait en parallaxe de profondeur, masque révélé par le curseur,
  frise chronologique), avec un athlète inventé et des visuels produits par le studio.
- Seuls le début, le plan et la liste des ressources de ce fichier (5 550 lignes) ont été lus.

### 5. Marcus Vane — portfolio de fondateur
- **Dépend de** : `portrait.webp`, `hero.mp4`, 4 images d'entreprises, 3 portraits chez getlayers ;
  Lenis par jsDelivr ; Anton et Onest (Google, OFL).
- **Si l'hébergeur tombe** : le hero perd son portrait, qui est tout l'effet.
- **Recréation** : code entièrement refaisable. Il faut un portrait détouré et une courte vidéo.
  Personnage fictif, mais ses « témoignages » et ses chiffres sont inventés : à étiqueter
  « contenu de démonstration ».
- **Mécaniques à retenir** : nom géant derrière un portrait, effet liquide par filtre SVG au survol,
  témoignages interactifs.

### 6. Alpha.Project — voyage dans une grotte de glace
- **Dépend de** : 120 images JPEG et 120 cartes de profondeur chez uberdesigner (240 requêtes),
  plus 2 SVG. Le prompt interdit explicitement de substituer ces fichiers et porte un marqueur
  d'origine invisible : c'est un produit édité, sous conditions à vérifier.
- **Si l'hébergeur tombe** : écran vide derrière le texte. C'est la dépendance la plus lourde.
- **Recréation** : le moteur (séquence pilotée par le défilement, parallaxe par carte de profondeur,
  verre flou recalculé, transition de chargement) se réécrit. La séquence d'images est à produire :
  rendu 3D, ou plan vidéo tourné par le studio et découpé en images, avec profondeur estimée.
  Poids à maîtriser : une séquence de 120 images pèse plusieurs dizaines de Mo.
- **Projet** : Vite et React, donc démo autonome dans le Lab.

### 7. easylog — le tronc et la mousse
- **Dépend de** : `log-bare.webp` et `log-moss.webp` (paire d'images alignées au pixel) et
  `logo.svg` chez uberdesigner ; GSAP par npm ; Instrument Sans et Instrument Serif (OFL). Même
  éditeur et même marqueur que le prompt 6.
- **Si l'hébergeur tombe** : il ne reste que le dégradé et le texte.
- **Recréation** : simple. Il faut une paire d'images « avant / révélé » sur fond transparent.
  L'idée se transpose à n'importe quel métier : mur brut et mur peint, plat cru et plat dressé,
  salle vide et salle décorée pour un mariage.
- **Mécaniques à retenir** : masque peint par le curseur qui s'efface avec le temps, chargement
  pixelisé.

### 8. Soda — canette en 3D
- **Dépend de** : `deit_soda2.glb`, `cherry.glb`, `blueberry.glb`, `leaves.glb`, 2 textures, 2
  images de canette, `bubble.png` chez getlayers ; GSAP par cdnjs ; `model-viewer` par unpkg
  **sans numéro de version**, donc susceptible de changer sans prévenir.
- **Si l'hébergeur tombe** : fond dégradé et textes seuls. Jusqu'à 14 scènes 3D simultanées :
  lourd sur mobile.
- **Recréation** : code refaisable, bibliothèques par npm à version figée. Les modèles 3D sont à
  créer ou à prendre sous licence CC0.
- **Mécaniques à retenir** : produit qui suit le curseur, changement de variante chorégraphié.

## Ordre de construction recommandé pour le Lab

1. **Gravity** (aucune ressource à produire) : valide toute la chaîne du Lab.
2. **easylog** et **Loopstack** : une paire d'images ou une vidéo à fournir.
3. **Baseline** et **Marcus Vane** : six à neuf photos à fournir.
4. **Soda** et **Alpha.Project** : modèles 3D ou séquence à produire.
5. **KIMI** : remplacé par un concept original.

Chaque démo sera rebaptisée et retravaillée avant d'entrer dans la bibliothèque, puis soumise à
validation.
