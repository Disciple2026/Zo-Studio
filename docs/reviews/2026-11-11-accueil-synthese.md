# Revue croisée de l'accueil — 11 et 12 novembre 2026

Première mission menée avec l'organisation de `docs/WORKFLOW.md`.

## Qui a rendu quoi

| Agent | Résultat |
| --- | --- |
| Critiqueur indépendant | **REJETÉ**, 8 défauts dont 2 bloquants |
| Directeur artistique | « Pas encore waouh », 10 constats (`2026-11-11-accueil-direction-artistique.md`) |
| Recherche | `docs/LIBRARY_CONCEPTS.md` : 24 concepts, 6 démos prioritaires |
| QA | Coupée deux fois par la limite d'utilisation, aucun rapport. Vérifications exécutées par Claude principal (voir « Tests »). |

## Décisions sur chaque critique

| # | Critique (source) | Vérifié | Décision |
| --- | --- | --- | --- |
| 1 | Le bouton principal mène au formulaire de tournage et perd les choix (critiqueur, DA) | Oui, dans le code | **Corrigé** : brief de site dédié, prérempli avec la simulation, enregistré avec elle |
| 2 | Chiffres « 120+ », « 100 % » non sourcés sous un titre qui vend des sites (critiqueur, DA) | Oui | **Corrigé** : bande retirée. Les avis restent, rattachés à la vidéo ; leur véracité est à confirmer par le propriétaire |
| 3 | Deux sites collés : haut « sites web », bas « tournage » (critiqueur, DA) | Oui | **Corrigé en partie** : section « quatre métiers », chapitre vidéo nommé, titre et description de page refaits. La refonte complète relève des phases 2 à 4 |
| 4 | Simulateur = recoloration d'un même squelette, sans image (critiqueur, DA) | Oui | **Corrigé** : contenu propre à chaque activité (carte, produits, compte à rebours, photos composées), Minimal sur blanc, Éditorial à filets, aperçu mobile, état conservé |
| 5 | Couleur illisible en Luxe (critiqueur, DA) | Oui, mesuré | **Corrigé** : couleur éclaircie sur fond sombre, assombrie sur fond clair si trop pâle |
| 6 | `lib/remote.ts` : 30 images dès l'arrivée, remontage du composant, minuterie non annulée (critiqueur) | Oui | **Corrigé** : déclenchement à l'approche de la section, plus de `key`, jamais de bascule après une interaction, nettoyage complet |
| 7 | Bascule pièce par pièce plutôt que tout ou rien (critiqueur) | — | **Rejeté** : les photos portent leur propre cintre, les dessins un cintre en bois ; un mélange serait incohérent |
| 8 | Garde-fou contournable, non branché sur la construction (critiqueur) | Oui | **Corrigé en partie** : exécuté avant chaque construction, extensions et adresses sans protocole couvertes, test `npm run test:repli`. Une adresse assemblée à l'exécution reste indétectable par lecture du code : c'est le test en navigateur qui la couvre |
| 9 | Réglages hors écran sur mobile et tablette (DA, critiqueur) | Oui, mesuré | **Corrigé** : le choix d'activité est au-dessus de l'aperçu (y = 294 px à 390 px de large, contre 847) |
| 10 | Barre du bas : code temporel hors sujet, boutons rognés (DA, critiqueur) | Oui | **Corrigé** : code temporel retiré, hero resserré (bouton à 786 px pour 844 visibles) |
| 11 | `aria-live` sur tout l'aperçu (DA, critiqueur) | Oui | **Corrigé** : statut court réservé aux lecteurs d'écran |
| 12 | Portant : pièces de profil peu lisibles, aucun signe qu'on peut tirer (DA, critiqueur) | Oui | **Reporté** : comportement du composant d'origine ; à traiter avec la démo « boutique » complète |
| 13 | Logo rouge sur palette émeraude (DA, critiqueur) | Oui | **Reporté** : décision du propriétaire |
| 14 | `docs/reviews/` vide, périmètres d'écriture qui se recouvrent (critiqueur) | Oui | **Corrigé** : ce compte rendu, périmètres précisés |
| 15 | « Le dépôt n'est pas un dépôt Git » (critiqueur) | Faux | **Rejeté** : l'agent a lu l'état du dossier parent ; `git log` fonctionne dans `Zo-Studio/` |

## Tests exécutés après correction (12 novembre)

| Commande ou script | Résultat |
| --- | --- |
| `npm run typecheck` | sans erreur |
| `npm run build` (lance `check:external`) | réussi ; 30 fichiers, 1 référence tierce avec repli déclaré |
| `npm run test:repli` | 4 cas sur 4 : panne → local ; photos disponibles → distant ; une photo manquante → local ; photos lentes → local |
| Navigateur, 1440 / 768 / 390 / 320 px | aucun débordement horizontal, aucune erreur de script |
| Contraste des 20 combinaisons ambiance × couleur | premier passage : Or sur Éditorial et Minimal à 2,2 et 2,6 (bouton sur fond) ; après correction : 20 conformes sur 20 |
| Persistance | après rechargement : « Mariage, Audacieux, Prune » conservé, et repris dans le brief |
| Brief sans consentement | envoi bloqué par le navigateur |
| Brief, base injoignable | message d'erreur en 0,4 s, bouton réactivé, pas de fausse confirmation |
| Galerie, base injoignable | état d'erreur affiché |
| Clavier | deux flèches font passer de Restaurant à Mariage |
| Mouvement réduit | 2 fondus d'opacité subsistent (aucun déplacement) |

## Non vérifié

Envoi réel d'un brief dans la base ; affichage des vraies photos tierces ; glisser d'un cintre et
balayage tactile ; lecteur d'écran ; licence du composant de portant et des photos.
