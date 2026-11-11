# Contenus, droits et indépendance

## Les trois statuts

| Statut | Signifie | Ce que la fiche peut proposer |
| --- | --- | --- |
| **Inspiration externe** | Référence d'un tiers, montrée pour inspirer | Lien vers la source, « Créer quelque chose dans ce style » |
| **Base personnalisable** | Zoé Studio détient les droits ou une licence d'adaptation | Démo, simulation, demande de personnalisation, prix « à partir de » |
| **Zoé Original** | Créé par Zoé Studio | Tout ce qui précède |

Le statut est affiché sur chaque fiche. Une création tierce n'est jamais présentée comme une
réalisation de Zoé Studio.

## Règle d'indépendance : si leur site casse, le vôtre ne casse pas

1. **Aucun lien direct vers un fichier tiers.** Image, vidéo, modèle 3D, texture : tout fichier
   affiché est stocké dans le dépôt ou dans le stockage de Zoé Studio.
2. **Bibliothèques installées par npm à version figée**, jamais par balise `<script>` vers un CDN.
3. **Polices auto-hébergées** (Fontsource ou fichiers locaux sous licence vérifiée).
4. **Une démo = un dossier isolé.** Une démo en panne n'affecte que sa propre page ; la fiche du
   catalogue garde sa miniature et son texte.
5. **Repli prévu** : image de remplacement pour chaque vidéo, version statique si WebGL manque.
6. **Contrôle automatique** : `npm run check:external` échoue dès qu'un hôte non autorisé apparaît
   dans le code. Il s'exécute à chaque construction.

## Ce qu'on peut reprendre d'un prompt tiers, et ce qu'on ne peut pas

| Élément | Réutilisable ? |
| --- | --- |
| Une idée d'interaction, une mécanique (parallaxe, révélation au curseur, défilement piloté) | Oui, les idées ne sont pas protégées |
| Du code écrit par nous à partir de la description | Oui |
| Les images, vidéos, modèles 3D hébergés par l'auteur du prompt | Non, sans licence écrite |
| Le nom, les textes et la composition exacts d'un site existant | Non pour une Base personnalisable : il faut un nom, des textes et une composition propres |
| Le nom ou l'image d'une personne réelle, une marque déposée | Non |
| Une police sous licence libre (SIL OFL) | Oui, auto-hébergée |
| Une police sous autre licence | Seulement après lecture de la licence |

## Ressources que Zoé Studio doit produire ou acquérir

Photos et vidéos : tournages du studio, banques d'images avec licence commerciale, ou génération
par IA avec un outil dont les conditions autorisent l'usage commercial. Modèles 3D : création
propre ou bibliothèques sous licence CC0. Chaque ressource est inscrite dans le fichier
`LICENCES.md` de sa démo, avec origine, licence et date.

L'analyse détaillée de chaque prompt reçu est dans `docs/LAB_PROMPTS.md`.
