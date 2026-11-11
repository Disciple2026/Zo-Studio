---
name: create-site-demo
description: Procédure pour développer une démonstration de site dans le Zoé Experience Lab, isolée de la plateforme principale et sans dépendance à un hébergeur tiers. À utiliser pour construire ou adapter une démo à partir d'un prompt validé.
---

# Créer une démo du Lab

Prérequis : la phase 7 (structure du Lab) est en place, ou la démo vit provisoirement dans
`lab/<identifiant>/` sans être liée au site public.

1. **Isoler.** Un dossier par démo : `lab/<identifiant>/`, avec son propre `index.html` ou son
   propre projet. Aucun import depuis `app/`, `components/` ou `lib/`. Aucune clé, aucun appel à
   la base de production.
2. **Rapatrier les dépendances.** Bibliothèques installées par npm à une version figée, jamais
   par balise `<script>` vers un CDN. Polices par Fontsource ou fichiers locaux.
3. **Remplacer les ressources tierces.** Chaque image, vidéo ou modèle cité par le prompt est
   remplacé par une ressource produite par Zoé Studio ou sous licence vérifiée, rangée dans
   `lab/<identifiant>/assets/`. Noter l'origine dans `lab/<identifiant>/LICENCES.md`.
4. **Données fictives.** Noms, marques et personnes inventés. Aucune personne réelle, aucune
   marque déposée, aucun faux témoignage présenté comme vrai.
5. **Prévoir la panne.** Image de remplacement pour chaque vidéo, repli statique si WebGL est
   indisponible, respect de `prefers-reduced-motion`.
6. **Développer**, puis vérifier à 390, 768 et 1440 px de large.
7. **Contrôler** : `npm run check:external` passe ; la console du navigateur est sans erreur.
8. **Relier au catalogue** : identifiant, adresse de la démo, miniature, statut de contenu.
   La publication reste soumise à la validation du propriétaire.

Limite : cette skill ne déploie pas. Le déploiement en prévisualisation demande l'accord du
propriétaire (voir `docs/DEPLOYMENT.md`).
