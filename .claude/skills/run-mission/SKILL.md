---
name: run-mission
description: Déroule une mission Zoé Studio en autonomie avec l'équipe d'agents : plan, réalisation, revue croisée, QA, critique indépendante, corrections, rapport. À utiliser dès que le propriétaire confie une mission qui dépasse une petite retouche.
---

# Mener une mission

Référence : `docs/WORKFLOW.md`. Ne pas demander d'accord pour une décision interne et réversible.

1. **Cadrer** en cinq lignes : objectif, périmètre, hors périmètre, hypothèses, critère de fin.
2. **Découper** en tâches. Attribuer chaque fichier à un seul agent.
3. **Réaliser.** Petit changement : Claude principal. Sinon l'agent responsable, avec un brief
   précis : but, fichiers autorisés, contrat de données, critère de validation.
4. **Construire et servir** : `npm run typecheck && npm run build && npm run check:external`,
   puis `npx serve out -l 4180` en arrière-plan.
5. **Revue en parallèle**, sur le site servi, sans reconstruire :
   - un deuxième agent du métier voisin ;
   - `qa-security-engineer` ;
   - `critiqueur-independant`, qui ne reçoit pas l'avis des autres.
6. **Confronter.** Pour chaque critique : vérifier le fait, puis décider — corrigé, reporté
   (avec raison) ou rejeté (avec raison). En cas de désaccord entre agents, vérifier soi-même.
7. **Corriger, reconstruire, retester** ce qui a changé. Trois cycles au plus.
8. **Tracer** dans `docs/reviews/AAAA-MM-JJ-sujet.md`.
9. **Rapport final** en dix points (voir `docs/WORKFLOW.md`).

S'arrêter et demander seulement pour : données ou fichiers importants à supprimer, base réelle,
production, DNS, dépense, message à un client, secret.
