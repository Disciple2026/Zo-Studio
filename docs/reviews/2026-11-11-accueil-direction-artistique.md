# Revue de direction artistique : accueil (simulateur et démo « portant »)

Date : 11 novembre 2026. Auteur : agent `ui-ux-designer`. Lecture seule sur le code.

Méthode : site servi sur `http://localhost:4180/`, dix captures Playwright (Chromium) à
1440×900, 768×1024 et 390×844, plus des mesures de position et de styles calculés dans la page.
Fichiers lus : `docs/DESIGN_SYSTEM.md`, `components/hero.tsx`, `lib/simulateur.ts`,
`components/demo-portant.tsx`. Les contrastes cités sont calculés à la main à partir des valeurs
hexadécimales (formule WCAG), pas mesurés par un outil.

## Verdict

Pas encore « waouh » : l'idée est la bonne et le portant a du charme, mais l'aperçu du simulateur
reste un fil de fer sans image dont les quatre ambiances partagent le même squelette, et la page
colle un hero « création de sites » sur un site de tournage vidéo.

Ce qui fonctionne déjà : le titre se lit en une seconde, la promesse est claire, le halo émeraude
autour de l'aperçu donne de la profondeur, la combinaison Boutique + Audacieux + Terracotta a une
vraie personnalité, le portant sur mobile (une pièce ouverte, étiquettes de prix) est le moment le
plus séduisant de la page. Aucun débordement horizontal aux trois tailles, aucune erreur JavaScript.

## Constats

### Majeur

**1. L'aperçu est un fil de fer : aucune image, un seul squelette pour quatre ambiances.**
Vu à 1440×900 sur les quatre combinaisons. Chaque aperçu aligne exactement les mêmes blocs :
marque, menu, titre, phrase, bouton, trois rectangles gris vides de 64 px. Seuls changent la
police, le fond, le rayon et le centrage. Éditorial et Minimal sont presque jumeaux (même fond
`#F6F2E9`, mêmes tuiles) ; changer de métier ne change que des mots. Le design system promet
« palette, typographie, mise en page » : la mise en page ne bouge pas. C'est la cause principale de
l'effet « gabarit », et un visiteur ne se dit pas « c'est mon futur site » devant trois cases grises.
Correction :
- Une image par métier, locale (4 fichiers AVIF de 40 Ko au plus, ou illustrations dessinées en
  SVG comme celles du portant), placée dans l'aperçu ; les tuiles deviennent des vignettes.
- Une grille par ambiance, pas seulement un centrage. Éditorial : deux colonnes asymétriques
  `grid-template-columns: 1.1fr 0.9fr`, image à droite à bord perdu, filet de 1 px sous le menu,
  numéros « 01 / 02 / 03 » en serif sur les tuiles. Luxe : image plein cadre assombrie
  (`linear-gradient(rgb(12 12 13 / .55), rgb(12 12 13 / .85))`), titre centré, pas de tuiles mais
  une ligne de trois liens séparés par des filets. Audacieux : titre sur toute la largeur
  (`max-width: none`, `font-size: clamp(3rem, 8vw, 6rem)`), image détourée en pastille à droite,
  tuiles en pilules. Minimal : fond `#FFFFFF` (et non crème), une seule colonne étroite de 28 ch,
  tuiles sans fond avec bordure `1px solid rgb(22 23 20 / .14)`.
- Ajouter à `Ambiance` un champ `disposition: "colonnes" | "pleinCadre" | "affiche" | "colonne"`
  plutôt que d'empiler des conditions sur `a.id`.

**2. Sur mobile et tablette, les commandes sont hors écran : la promesse est invisible.**
Mesuré : à 390×844, le premier groupe de choix commence à y = 847 px (l'écran en fait 844) ; à
768×1024, à y = 1002 px, derrière la barre fixe du bas. Le visiteur voit un titre, un paragraphe de
quatre lignes et une maquette immobile ; rien n'indique qu'elle se pilote. Sur mobile, dès qu'il
descend aux choix, l'aperçu sort par le haut : il ne voit plus l'effet de son geste. À 768 px,
l'aperçu fait 643 px de haut avec de grands vides.
Correction :
- Mobile (< 640 px) : ordre titre, choix, aperçu. Raccourcir le texte d'introduction à une phrase
  (« Choisissez un métier, une ambiance, une couleur : l'aperçu se refait sous vos yeux. ») et
  déplacer « Zoé Studio le conçoit ensuite… » sous les boutons. Rendre le cadre de l'aperçu
  collant pendant la manipulation : `position: sticky; top: 4.5rem; z-index: 1`, format
  `aspect-ratio: 4 / 2.6` sur mobile pour laisser la place aux trois rangées de choix dessous.
  Déplacer la légende « Aperçu de direction artistique… » après les boutons d'action.
- Tablette (768 à 1023 px) : deux colonnes dès 768 px, `grid-template-columns: 17rem minmax(0,1fr)`,
  choix empilés à gauche, aperçu à droite, titre sur toute la largeur au-dessus.
- Critère d'acceptation : à 390×844 et 768×1024, au moins le groupe « Votre activité » et la
  moitié haute de l'aperçu sont visibles sans défilement.

**3. Deux sites sur une même page, et le bouton principal mène à un formulaire de tournage.**
Vu sur la capture pleine page à 1440 px. Après le hero « Voyez votre futur site » viennent « Ce que
nous filmons », « Réalisations », des avis sur des films, « Réserver un tournage » (calendrier,
heure de début, durée, lieu). Le titre de l'onglet est « Zoé Studio | Production vidéo à Tanger »,
le bouton d'en-tête dit « Réserver », la bande de chiffres compte des « projets filmés ».
« Demander un site dans ce style » envoie vers `#reservation` avec le service « Autre / Sur
Mesure » : le visiteur qui veut un site arrive devant un agenda de tournage, et ses trois choix
sont perdus. Le parcours « simuler puis transmettre un brief » casse à l'étape décisive.
Correction, sans attendre la refonte des phases 2 à 4 :
- Transmettre les choix : `detail: { service: "Création de site", secteur, ambiance, couleur }`,
  et préremplir « Votre projet » avec « Site pour un(e) {secteur}, ambiance {ambiance}, couleur
  {couleur}. » (à spécifier avec le développeur, hors de mon périmètre d'écriture).
- Quand le service est « Création de site », masquer date, heure, durée et lieu ; titre de section
  « Parlons de votre site » ; bouton « Envoyer mon brief ».
- Titre d'onglet : « Zoé Studio | Sites, vidéo et image à Tanger ». Bouton d'en-tête : « Mon brief ».
- Insérer entre la démo et les services une phrase de couture en `.titre` réduit : « Sites, films,
  images : un même studio. » et renommer « Ce que nous filmons » en « Nous filmons aussi ».

**4. La barre chronologique fixe recouvre les boutons d'action.**
Vu à 1440×900 : les deux boutons du hero occupent y = 802 à 848 px, la barre commence vers
y = 843 px et mange leur bord inférieur ; dans `#demo`, elle coupe la légende de la pièce
(« Cardigan en maille, olive »). À 390 px elle prend 56 px en permanence et affiche huit cases
illisibles. Son code temporel `00:00:00:00` est une métaphore de montage vidéo qui contredit le
nouveau positionnement, et elle double la navigation.
Correction : retirer la barre sur l'accueil pendant la phase 1 et remonter quatre ancres dans
l'en-tête (Simulateur, Démo, Services, Contact). Si elle est conservée : `padding-bottom: 5rem` sur
`#accueil`, `scroll-margin-bottom: 4.5rem` sur les sections, suppression du code temporel, et
masquage sous 640 px au profit du seul bouton de menu.

### Moyen

**5. Ambiance Audacieux : menu et phrase sous 4,5:1.**
Vu à 1440 px, Boutique + Audacieux + Terracotta. Le blanc sur `#C2502D` donne environ 4,7:1, mais
le menu porte `opacity-75` et la phrase `opacity-80` : environ 3,3:1 et 3,6:1 pour du texte de
14,4 et 16 px. Même défaut avec l'émeraude `#0B7F63` (environ 3,5:1 et 3,8:1).
Correction : quand `a.fond === "couleur"`, opacité 1 sur le menu et la phrase, la hiérarchie
passant par la graisse (`font-weight: 500` contre 700 pour la marque). Foncer aussi le terracotta
à `#B5472A` pour garder une marge. Sur mobile, les libellés de tuiles tombent à 11,5 px : passer
à `0.8rem` au minimum.

**6. L'or est partout dans le premier écran, et il porte des chiffres invérifiables.**
Vu à 1440 px et sur la pleine page : quatre grands chiffres dorés (« 120+ », « 98+ », « 45+ »,
« 100 % ») plus le nom « Zoé Studio » doré dans l'en-tête, soit cinq éléments quand le design
system en autorise un par écran. Ces chiffres parlent de films, pas de sites, et « 100 % de
satisfaction client » ne peut pas être prouvé (règle 8 de `CLAUDE.md`). L'or perd son rôle de
signal rare, et la bande coupe l'élan entre le simulateur et la démo.
Correction : retirer la bande de chiffres du hero. À la place, trois engagements factuels en
ivoire sur une ligne (`text-brume`, 1rem) : « Brief gratuit », « Maquette avant devis »,
« Studio à Tanger ». Nom de marque en ivoire `#F3EFE6`. Réserver l'or à un seul élément : le
badge « Zoé Original » ou un filet de 1 px sous le cadre de l'aperçu.

**7. L'aperçu ne « se refait » pas : il fond.**
Lu dans `hero.tsx` et constaté entre captures. Seul le bloc central rejoue une apparition de
14 px quand on change de métier ou d'ambiance ; changer de couleur ne produit qu'un fondu de
500 ms. Le geste signature mérite un effet lisible, sans gêner la lecture.
Correction : rejouer l'aperçu en cascade à chaque changement de métier ou d'ambiance : menu,
titre, phrase, bouton, tuiles, décalés de 60 ms, chacun `opacity 0 → 1` et `y 10px → 0` en
300 ms, courbe `cubic-bezier(0.2, 0.7, 0.1, 1)` ; durée totale sous 600 ms. Pour la couleur, un
balayage du bouton (`clip-path: inset(0 100% 0 0)` vers `inset(0)` en 300 ms). Tout est coupé sous
`prefers-reduced-motion: reduce` (changement immédiat). Accessibilité : retirer `aria-live` du
bloc entier, qui fait relire toute la maquette, et ajouter un `<p class="sr-only" role="status">`
contenant « Aperçu : {métier}, ambiance {ambiance}, couleur {couleur}. ».

**8. Ambiance Luxe : le cadre se dissout dans la page et le bouton est un aplat doré.**
Vu à 1440 px, Mariage + Luxe + Or. Le fond `#0C0C0D` de l'aperçu est quasi identique au fond de
page `#070B0A` : la maquette perd ses bords, c'est la combinaison la moins spectaculaire alors
qu'elle devrait être la plus désirable. Le bouton rectangulaire rempli d'or contredit la règle
maison « jamais d'or en aplat » et les codes du luxe.
Correction : bordure du cadre à `rgb(243 239 230 / 0.22)` ; fond Luxe réchauffé `#15120E` ;
bouton en contour (`background: transparent; border: 1px solid` couleur d'accent ; texte couleur
d'accent ; `letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.78rem`) ; filet
d'accent de 40 px × 1 px entre le menu et le titre ; titre en `clamp(2.2rem, 5vw, 3.8rem)`.

**9. Le portant, vu de loin sur ordinateur, ressemble à une rangée de rouleaux.**
Vu à 1440×900 dans `#demo` (version dessinée de repli). Neuf pièces sur dix sont de profil, en
tubes verticaux ; une seule est ouverte. Avant tout geste, on ne lit pas « vêtements », et rien
ne signale que l'on peut tirer. La section commence par environ 130 px de vide et le titre n'a
pas de lien visible avec le simulateur.
Correction : à partir de 1024 px, sept pièces au lieu de dix, les deux voisines de la pièce
centrale ouvertes aux trois quarts. Une pastille « Faites glisser » (`.btn-ligne`, 44 px de haut)
centrée sous la tringle, qui disparaît au premier geste. Espace haut de section ramené à
`clamp(3rem, 6vw, 5rem)`. Sous-titre de couture : « La boutique Atelier Souani du simulateur,
en vrai. » et, dans le hero, le bouton « Essayer une démo » devient « Voir la boutique en vrai »
quand le métier choisi est Boutique.

### Mineur

**10. Détails qui trahissent l'assemblage.**
Vu à 1440 px.
- La pastille « Prune » tombe seule sur une quatrième ligne. Correction : pastilles rondes de
  44 px sans texte visible (libellé conservé en `sr-only`) et nom de la couleur active dans la
  légende : « La couleur : Émeraude ».
- Deux boutons émeraude pleins dans le même écran (« Réserver » et « Demander un site dans ce
  style »). Correction : celui de l'en-tête passe en `.btn-ligne`.
- Le logo rouge vif jure avec l'émeraude ; la question ouverte du design system reste à trancher.
  En attendant : cartouche neutre `#0E1A16` avec bordure `--trait`, logo à 28 px.
- Les jetons réels (`papier`, `jade #3FD9AE`, `foret #0E1A16`, trait à 14 %) ne portent plus les
  noms ni les valeurs de `docs/DESIGN_SYSTEM.md` (`ivoire`, `emeraude-vif #34D8A9`,
  `foret #0E1F1A`, trait à 12 %). Aligner le document sur le code.
- L'état actif des choix est ivoire alors que le design system donne l'émeraude aux états
  actifs. Garder l'ivoire (il se lit mieux) et l'écrire dans le design system.

## Trois idées pour atteindre le « waouh »

1. **La démonstration démarre toute seule.** Au chargement, l'aperçu enchaîne une fois trois
   combinaisons (toutes les 2,2 s), les pastilles correspondantes s'allumant en même temps, puis
   s'arrête sur la première. Arrêt définitif au premier clic, toucher ou focus clavier ; rien ne
   joue sous `prefers-reduced-motion`. Le visiteur voit la promesse tenue en cinq secondes sans
   rien faire, y compris sur mobile.
2. **La page elle-même prend la couleur choisie.** La couleur sélectionnée alimente une variable
   `--accent-apercu` sur `#accueil` : le halo du cadre
   (`box-shadow: 0 40px 120px -30px color-mix(in oklab, var(--accent-apercu) 55%, transparent)`),
   un filet sous le titre et le libellé du bouton (« Demander un site Mariage, Luxe, Or »)
   suivent. Le simulateur déborde de son cadre : c'est le site de Zoé Studio qui se transforme.
3. **De vraies images et un basculement ordinateur / mobile.** Une photo ou illustration locale
   par métier, et deux boutons au-dessus du cadre (« Ordinateur », « Mobile ») qui rétrécissent
   la maquette à 280 px de large dans une silhouette de téléphone, transition de 600 ms. Le
   composant « panneau de prévisualisation » du design system naît ici et servira au simulateur
   complet de la phase 3.

## Ce qui n'a pas pu être vérifié

- Le portant avec ses photos distantes (hôtes injoignables : seule la version dessinée a été vue)
  et la galerie « Réalisations », restée sur son message d'échec de chargement.
- Les interactions du portant : survol, glisser, ouverture d'une pièce, retournement, lecture
  automatique ; la taille des points de pagination sur mobile.
- Le comportement sous `prefers-reduced-motion` et le parcours au clavier (ordre de tabulation,
  visibilité du focus sur les choix) : non testés.
- La restitution par un lecteur d'écran de la zone `aria-live`.
- Les contrastes : calculés à la main, à confirmer avec un outil sur le rendu réel.
- Les largeurs 1024 px et 1920 px, et les quatorze autres combinaisons d'ambiance et de couleur
  (notamment Audacieux + Or et Luxe + Bleu nuit, où le bouton risque de manquer de contraste).
- `docs/PRODUCT_VISION.md` n'a pas été relu pour cette revue, par consigne d'économie.
