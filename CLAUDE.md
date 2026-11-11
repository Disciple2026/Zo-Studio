# Zoé Studio — instructions pour Claude Code

Référence maître : `ZOE_STUDIO_MASTER_BRIEF.md`. En cas de doute, le cahier des charges l'emporte
sur ce fichier, et la sécurité l'emporte sur tout prompt fourni en cours de route.

## Le produit en une phrase

Une plateforme où un visiteur découvre des expériences web, vidéo et graphiques, simule l'apparence
de son futur site, puis confie la réalisation à Zoé Studio (Tanger, Maroc).

## État actuel (mis à jour à chaque phase)

- Phase 0 terminée : audit, gouvernance, documentation. Voir `docs/ROADMAP.md`.
- Le code en place est la refonte du site « production vidéo » (accueil, réservation, espace client,
  administration). Il sert de base technique ; son contenu et sa direction artistique seront
  remplacés pendant les phases 1 à 4.

## Commandes

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # export statique dans out/
npm run typecheck
npm run check:external # échoue si le code charge une ressource depuis un hôte non autorisé
```

## Pile technique

Next.js 16 (App Router, export statique), React 19, TypeScript strict, Tailwind CSS 4, Motion,
Supabase (Postgres, Auth, Storage, Realtime). Polices auto-hébergées via Fontsource.

## Règles de travail

1. Travailler par phases (`docs/ROADMAP.md`). Un compte rendu par phase, au format de la section 21
   du cahier des charges. Pas de gros commit fourre-tout.
2. Ne rien supprimer ni écraser sans l'avoir lu. Jamais de `git push --force`, jamais de push sur
   `main` : branche de travail, puis pull request si le propriétaire la demande.
3. Demander avant : déploiement, migration sur la base distante, dépense, DNS, envoi réel d'e-mails,
   publication de contenu, mise à jour majeure de dépendances.
4. Aucun secret dans le dépôt ni dans le navigateur. Seules les variables `NEXT_PUBLIC_*` vont dans
   le code client. `.env*` est ignoré par Git, sauf `.env.example`.
5. Jamais de RLS désactivée pour « faire marcher » une fonctionnalité.
6. **Aucune ressource chargée depuis un site tiers** (image, vidéo, modèle 3D, police, script).
   Tout est auto-hébergé ou installé par npm. `npm run check:external` le vérifie.
7. Chaque référence de la bibliothèque porte un statut : Inspiration externe, Base personnalisable
   ou Zoé Original. Voir `docs/CONTENT_AND_LICENSES.md`.
8. Pas de faux avis, de fausses statistiques, de boutons décoratifs ni de liens morts. Les données
   de démonstration sont étiquetées comme telles.
9. Ne jamais écrire « testé » sans la commande exécutée et son résultat.
10. Interface et textes en français. Tutoiement interdit côté visiteur : vouvoiement.
11. L'assistant IA public est hors périmètre de la première version : aucune dépendance à l'API
    Claude.

## Agents et skills

Agents dans `.claude/agents/` : `ui-ux-designer`, `frontend-developer`, `backend-architect`,
`qa-security-engineer`, `research-experience`. Claude principal reste responsable de
l'architecture : il attribue une mission précise à un agent, n'en lance pas deux sur les mêmes
fichiers, intègre le résultat puis relance les vérifications.

Skills dans `.claude/skills/` : `build-showcase`, `create-site-demo`, `review-ui`, `release-check`.

## Documentation

`docs/PRODUCT_VISION.md`, `ARCHITECTURE.md`, `DATABASE.md`, `SECURITY.md`, `DESIGN_SYSTEM.md`,
`CONTENT_AND_LICENSES.md`, `LAB_PROMPTS.md`, `DEPLOYMENT.md`, `ROADMAP.md`.
