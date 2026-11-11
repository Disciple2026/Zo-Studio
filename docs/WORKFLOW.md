# Organisation de travail autonome

Zoé Studio est développé par une équipe d'agents coordonnée par Claude principal, qui est chef de
projet et décideur final. Le propriétaire confie une mission et retrouve un travail réalisé,
testé, critiqué et documenté.

## L'équipe

| Agent | Fichier | Rôle | Écrit dans |
| --- | --- | --- | --- |
| Directeur artistique et UI/UX | `ui-ux-designer` | Direction artistique, hiérarchie, animations, expérience | `docs/`, jetons CSS |
| Architecte et développeur frontend | `frontend-developer` | Interfaces, composants, responsive, performances | code de l'application et des démos |
| Architecte backend | `backend-architect` | Données, RLS, formulaires, services externes | `supabase/`, `lib/` |
| QA, tests et sécurité | `qa-security-engineer` | Bugs, parcours, tailles d'écran, sécurité | rien (lecture seule) |
| Critiqueur indépendant | `critiqueur-independant` | Cherche ce qui fait amateur ou incomplet ; peut rejeter | rien (lecture seule) |
| Recherche et expériences | `research-experience` | Analyse des modèles, concepts originaux, prompts de démo | `docs/` |

Les définitions sont dans `.claude/agents/`. Deux agents n'écrivent jamais dans le même fichier
pendant la même mission.

## La boucle

```
DÉVELOPPER → TESTER → CRITIQUER → CORRIGER → RETESTER → VALIDER
```

Pour chaque fonctionnalité importante :

1. **L'agent responsable réalise** (ou Claude principal pour un petit changement).
2. **Un deuxième agent examine** : le directeur artistique relit le frontend, le frontend relit
   une migration qui change un contrat de données, etc.
3. **La QA vérifie** en exécutant réellement : commandes, navigateur, tailles d'écran.
4. **Le critiqueur indépendant cherche les défauts**, sans connaître l'avis des autres.
5. **Claude principal confronte les rapports**, vérifie lui-même les points contestés, et décide.
6. **Correction**, puis nouveau passage de la QA sur ce qui a changé. Nouvelle critique si la
   correction est importante.

Trois cycles sérieux au plus. Si un problème résiste, il est documenté avec sa cause probable et
présenté au propriétaire tel quel. Rien n'est déclaré « terminé » sur la seule parole de son auteur.

## Qui décide quoi

Claude principal décide seul de tout ce qui est interne et réversible : créer ou modifier des
fichiers, composants, styles, structure du code, dépendances courantes, organisation des agents.
Entre deux solutions ordinaires, il choisit et l'explique en une phrase dans le rapport.

**Arrêt et demande d'autorisation obligatoires** avant de : supprimer des données ou des fichiers
importants, migrer la base réelle, toucher à la sécurité de production, publier en production,
modifier domaine ou DNS, engager une dépense, envoyer un message à un client, exposer un secret.

Une information secondaire manquante ne bloque pas : hypothèse raisonnable, notée dans le rapport.
Un blocage sur une tâche n'arrête pas les tâches indépendantes.

## Outils de vérification

```bash
npm run typecheck
npm run build            # produit out/
npm run check:external   # ressources tierces : interdites sans repli local déclaré
npx serve out -l 4180    # sert le site construit pour les essais en navigateur
```

Playwright et Chromium sont installés dans l'environnement : `require("playwright")` fonctionne
depuis n'importe quel dossier. Les agents de revue ouvrent la page servie, capturent à 390, 768 et
1440 px et lisent leurs captures. Pendant une revue en parallèle, les agents ne relancent pas
`npm run build` : ils travaillent sur le site déjà servi.

## Ressources hébergées chez des tiers

Autorisées depuis le 11 novembre 2026, à une condition : **le site doit s'afficher sans elles.**
La version locale est affichée d'abord ; la version distante ne la remplace que si toutes ses
ressources ont répondu (`lib/remote.ts`). Tout fichier qui cite un hébergeur tiers déclare son
repli par un commentaire `repli: …`, sans quoi `npm run check:external` échoue.

## Traces

Chaque revue laisse un compte rendu daté dans `docs/reviews/` : critiques reçues, décision prise
pour chacune, corrections faites, tests rejoués.

## Rapport de fin de mission

1. Réalisé · 2. Fichiers créés ou modifiés · 3. Améliorations · 4. Décisions techniques ·
5. Critiques des agents · 6. Corrections après critiques · 7. Tests exécutés · 8. Résultats ·
9. Problèmes non résolus · 10. Ce qui demande l'intervention du propriétaire.

Le rapport distingue ce qui est validé de ce qui reste à vérifier.
