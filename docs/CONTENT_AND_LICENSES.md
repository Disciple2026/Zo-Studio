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

Décision du propriétaire, 11 novembre 2026 : les images et technologies hébergées par les auteurs
des modèles peuvent être utilisées, à condition qu'une version de repli prenne le relais le jour
où elles ne répondent plus.

1. **Local d'abord.** Chaque démo s'affiche avec une version construite par Zoé Studio.
2. **Distant ensuite, tout ou rien.** `useRessourcesDistantes` (`lib/remote.ts`) précharge les
   fichiers tiers ; la version enrichie ne remplace la version locale que si tous ont répondu
   dans le délai. Une panne, un fichier supprimé ou un réseau lent laissent la démo intacte.
3. **Repli déclaré.** Tout fichier citant un hébergeur tiers porte un commentaire `repli: …`.
   `npm run check:external` échoue sinon.
4. **Bibliothèques et polices par npm**, à version figée : un script chargé depuis un CDN qui
   tombe ne peut pas être remplacé à la volée.
5. **Une démo = un dossier isolé.** Une démo en panne n'affecte que sa propre page.

Ce choix règle la disponibilité, pas les droits : les licences des fichiers tiers restent
inconnues. Avant de vendre une démo comme modèle, ses visuels sont à remplacer par des ressources
de Zoé Studio. Le repli local en est le point de départ.

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
