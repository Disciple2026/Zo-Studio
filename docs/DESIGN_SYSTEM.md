# Design system

## Direction artistique (cahier des charges, section 6)

Noir profond, vert émeraude, doré en accent, blanc cassé. Composition éditoriale, transitions
cinématographiques, détails subtils.

### Jetons de couleur proposés pour la phase 1

| Jeton | Valeur | Rôle |
| --- | --- | --- |
| `--encre` | `#070B0A` | fond principal, noir légèrement vert |
| `--foret` | `#0E1F1A` | surfaces, cartes |
| `--emeraude` | `#0FA37F` | couleur de marque : actions, liens, états actifs |
| `--emeraude-vif` | `#34D8A9` | texte émeraude sur fond sombre (contraste suffisant) |
| `--or` | `#D4AF6A` | accent rare : un élément par écran au plus |
| `--ivoire` | `#F3EFE6` | texte principal |
| `--brume` | `#9DAAA5` | texte secondaire |
| `--trait` | `rgb(243 239 230 / 0.12)` | filets et bordures |

Règles : l'émeraude porte l'action, l'or signale l'exceptionnel (statut « Zoé Original », un chiffre,
un filet). Jamais d'or en aplat ni en texte courant.

### Question ouverte

Le logo actuel est un Z rouge sur fond ardoise. Trois issues possibles, à trancher par le
propriétaire : garder le logo tel quel sur le nouveau fond, le décliner en émeraude et or, ou le
redessiner. La phase 1 avance avec le logo actuel placé dans un cartouche neutre.

## Typographie

Deux familles, auto-hébergées, sous licence libre (SIL OFL). Choix à valider en phase 1 sur
maquette réelle ; l'échelle suit un rapport de 1,25, corps de texte à 17 px, lignes de moins de
75 caractères.

## Autres jetons

Espacements sur une base de 4 px ; rayons `6 / 14 / 28 / pilule` ; largeur de contenu 82 rem ;
points de rupture 640, 768, 1024, 1440 px ; durées 150, 300, 600, 900 ms ; courbe principale
`cubic-bezier(0.2, 0.7, 0.1, 1)`.

## Composants à construire

Bouton, carte de référence, badge de statut (Inspiration externe, Base personnalisable, Zoé
Original), filtres, navigation, modale, lecteur vidéo, champs de formulaire, panneau de
prévisualisation (ordinateur, tablette, mobile), état vide, notification.

## Principes d'expérience

Mobile d'abord. Hiérarchie forte. Contraste d'au moins 4,5:1. Animations utiles, coupées par
`prefers-reduced-motion`. Focus clavier visible. Pas de curseur personnalisé imposé. Pas de WebGL
lourd sans bénéfice clair. Chaque écran a ses états chargement, vide, erreur et succès.

## Pourquoi la refonte actuelle n'est « pas waouh », et ce que la phase 1 change

Constat honnête sur la version livrée : une page sombre, de grands titres et un logo fixe. Rien ne
bouge sous la main du visiteur, et aucune vraie image ne porte la promesse.

Proposition pour l'accueil de la phase 1 : **le site se transforme sous les yeux du visiteur.**
Le hero montre un écran de démonstration, et quelques choix (un secteur, une ambiance, une
couleur) refont cet écran en direct : palette, typographie, mise en page. C'est la fonctionnalité
signature du cahier des charges, « Simuler mon site », montrée dès les cinq premières secondes
au lieu d'être décrite. Le visiteur comprend le produit en jouant avec.

Autour de ce moment unique, le reste reste calme : aperçu du flux Explorer, les quatre univers,
les packs, puis l'appel au brief.

Ce qui manque pour que cela porte vraiment : des visuels et vidéos de réalisations réelles de Zoé
Studio. Sans eux, la bibliothèque repose sur des démonstrations originales produites dans le Lab.
