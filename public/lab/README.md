# Zoé Experience Lab

Une démo par dossier. Chaque dossier est autonome : son `index.html`, ses polices dans `fonts/`,
aucun import depuis l'application, aucune adresse externe. Supprimer ou casser un dossier
n'affecte ni les autres démos ni le site. Le catalogue (`lib/bibliotheque.ts`) ne connaît d'une
démo que son adresse et sa fiche.

Contrat d'une démo :
- `lang="fr"`, un seul `h1`, utilisable au clavier, `prefers-reduced-motion` respecté ;
- lisible à 390, 768 et 1440 px, sans défilement horizontal ;
- bandeau « Démonstration Zoé Studio » avec retour vers `../../bibliotheque/` ;
- un appel à l'action vers `../../#brief` ;
- marques, personnes, prix et avis inventés, et signalés comme tels.
