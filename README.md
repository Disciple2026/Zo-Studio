# Zoé Studio

> Le cahier des charges est dans `ZOE_STUDIO_MASTER_BRIEF.md`, les instructions de travail dans
> `CLAUDE.md`, l'avancement dans `docs/ROADMAP.md`.

Site de Zoé Studio, production vidéo à Tanger : présentation, galerie, réservation en ligne,
espace client (réservations, films à télécharger, discussion) et administration.

## Technologies

- **Next.js 16** (App Router, export statique) et **React 19**, en **TypeScript**
- **Tailwind CSS 4** (jetons de design dans `app/globals.css`)
- **Motion** pour l'animation d'ouverture
- **Supabase** : base de données, authentification, stockage et temps réel
- Polices auto-hébergées (Fontsource) : Sofia Sans, Sofia Sans Extra Condensed, Newsreader

## Lancer le projet

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # génère le site statique dans out/
npm run typecheck
npm run check:external   # refuse toute ressource chargée depuis un site tiers
```

## Organisation

| Dossier | Contenu |
| --- | --- |
| `app/page.tsx` | Page d'accueil |
| `app/espace/` | Espace client (connexion, réservations, films, discussion) |
| `app/admin/` | Administration (réservations, discussions, galerie, livrables, statistiques) |
| `components/` | Sections et composants (la navigation « timeline » est dans `timeline.tsx`) |
| `lib/content.ts` | Tous les textes : services, avis, FAQ, coordonnées |
| `lib/supabase.ts` | Connexion Supabase et types des tables |

Pour changer un texte, un service ou un avis, modifiez `lib/content.ts`.

## Mise en ligne

Le workflow `.github/workflows/deploy.yml` construit et publie le site sur GitHub Pages à chaque
push sur `main`. **À faire une fois** : dans le dépôt, *Settings → Pages → Source*, choisir
**GitHub Actions** (l'ancien site était servi directement depuis la branche).

Le site fonctionne aussi tel quel sur Vercel ou Netlify.

## Sécurité : à traiter

L'accès à l'administration est vérifié dans le navigateur, comme sur l'ancien site. Ce n'est pas
une vraie protection : toute personne qui possède la clé publique Supabase peut lire ou modifier
les tables si les règles RLS ne l'interdisent pas. Pour sécuriser réellement :

1. changer le mot de passe administrateur (l'ancien est visible dans l'historique Git) ;
2. créer un compte Supabase Auth pour l'administrateur ;
3. activer RLS sur `reservations`, `messages`, `livrables`, `galerie`, `profiles` avec des règles
   limitant chaque client à ses propres lignes et réservant l'écriture à l'administrateur.
