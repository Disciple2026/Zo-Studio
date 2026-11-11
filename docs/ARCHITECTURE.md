# Architecture

## Audit du dépôt (phase 0, 11 novembre 2026)

| Élément | Constat |
| --- | --- |
| Historique | `main` : une page `index.html` unique (HTML, CSS, JS, Supabase). Branche `claude/zoe-studio-redesign-59vfya` : refonte Next.js, non fusionnée. |
| Framework | Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4, Motion. |
| Rendu | Export statique (`output: "export"`) : aucun code serveur Next n'est exécuté en production. |
| Backend | Projet Supabase existant, appelé directement depuis le navigateur avec la clé publique. |
| Tables utilisées | `reservations`, `messages`, `livrables`, `galerie`, `profiles`, bucket de stockage `galerie`. |
| Tests | Aucun test automatisé. Vérifications manuelles par captures Playwright. |
| Déploiement | Workflow GitHub Pages présent, jamais exécuté. Hébergement actuel du site non vérifié. |

### Réutilisable

- La pile technique, qui est celle demandée par le cahier des charges.
- Le client Supabase typé, le formulaire de réservation, le calendrier, le chat, la structure
  des pages `/espace` et `/admin`.
- Le workflow de construction et le garde-fou `check:external`.

### Risques relevés

1. **Administration non protégée.** Le contrôle d'accès se fait dans le navigateur. Les tables
   sont lisibles et modifiables par quiconque possède la clé publique si RLS ne l'interdit pas.
   L'état réel de RLS n'a pas pu être vérifié depuis cet environnement.
2. **Ancien mot de passe administrateur** visible en clair dans l'historique Git.
3. **Pas de logique serveur.** L'export statique empêche la validation côté serveur exigée par
   le cahier des charges. Voir la décision ci-dessous.
4. **Messagerie par e-mail en clair** : une conversation est identifiée par l'adresse e-mail, pas
   par l'identifiant du compte.
5. **Écart de positionnement** entre le site actuel (production vidéo) et la plateforme décrite.

## Décision d'architecture : où vit la logique serveur

Le site reste **statique**, et le serveur est **Supabase** :

- les règles d'accès sont des politiques RLS ;
- les écritures sensibles (envoi d'un brief, changement de statut, publication) passent par des
  fonctions SQL `security definer` ou des Edge Functions qui valident les entrées ;
- les fichiers privés sont servis par des URL signées.

Avantages : aucun coût d'hébergement supplémentaire, le site fonctionne sur GitHub Pages comme sur
Vercel, et la sécurité ne dépend pas du code du navigateur. Si un besoin impose un vrai serveur
(rendu à la demande, webhooks de paiement), le passage à Vercel se fait en retirant
`output: "export"`. Ce passage demandera l'accord du propriétaire.

## Vue logique

```
Navigateur
 ├─ Plateforme principale (Next.js statique)
 │    accueil · explorer · bibliothèque · vidéo · creative lab · services · contact
 │    mon espace · administration
 ├─ Zoé Experience Lab (démos isolées, une par dossier, déployées à part)
 └─ Supabase
      Auth · Postgres + RLS · Storage · fonctions serveur
      (plus tard : service vidéo, adaptateur IA)
```

Le catalogue principal ne contient que les **métadonnées** d'une démo : identifiant, adresse,
miniature, vidéo, statut. Une démo cassée n'affecte donc que sa propre page.

## Structure de fichiers cible

Le code actuel est à la racine (`app/`, `components/`, `lib/`). Le passage à `src/` avec un
découpage par domaine se fera en phase 1, en un seul commit de déplacement, pour ne pas mélanger
déplacement et réécriture :

```
src/
  app/                     routes
  components/              composants du design system
  features/
    discovery/  library/  simulator/  video/  services/  client-space/  admin/
  lib/                     supabase, utilitaires
  types/
supabase/
  migrations/  seed/
lab/
  <identifiant>/           une démo isolée, avec ses assets et son LICENCES.md
tests/
  unit/  e2e/
```

## Règle d'indépendance

Le site ne charge **aucun** fichier depuis un hébergeur tiers. Les seuls appels externes sont des
services choisis (Supabase, WhatsApp, copie e-mail). `scripts/check-external.mjs` l'impose à chaque
construction. Détail dans `docs/CONTENT_AND_LICENSES.md`.
