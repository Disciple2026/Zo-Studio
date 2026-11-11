---
name: review-ui
description: Checklist de revue d'un écran ou d'une démo Zoé Studio : cohérence, responsive, accessibilité, lisibilité, interactions, états et performance. À utiliser avant de déclarer une page terminée.
---

# Revue d'interface

Ouvrir la page dans un navigateur (Playwright) à 390, 768 et 1440 px. Capturer chaque largeur.

**Cohérence**
- [ ] Couleurs, polices, rayons et espacements viennent des jetons du design system.
- [ ] Une seule action principale par écran. Les libellés disent ce qui se passe au clic.

**Responsive**
- [ ] Aucun défilement horizontal. Aucun texte coupé ou superposé.
- [ ] Cibles tactiles d'au moins 44 px.

**Accessibilité**
- [ ] Tout est atteignable et utilisable au clavier, focus visible.
- [ ] Contraste du texte d'au moins 4,5:1 (3:1 pour les grands titres).
- [ ] Chaque champ a un libellé. Chaque image informative a un texte alternatif.
- [ ] Un seul `h1`, titres dans l'ordre.
- [ ] `prefers-reduced-motion` coupe les animations non essentielles.

**États**
- [ ] Chargement, vide, erreur et succès existent et disent quoi faire ensuite.
- [ ] Aucune confirmation n'apparaît si l'enregistrement a échoué.

**Médias et performance**
- [ ] Images en chargement différé, dimensions fixées, format moderne.
- [ ] Une seule vidéo lue à la fois, muette par défaut, avec image de remplacement.
- [ ] Console du navigateur sans erreur. `npm run check:external` passe.

Rendre la checklist cochée, les captures, et la liste des écarts avec le fichier concerné.
Ce qui n'a pas pu être vérifié est écrit comme tel.
