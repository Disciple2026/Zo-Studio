# Déploiement

Rien n'est déployé sans l'accord explicite du propriétaire.

## État

- `main` contient encore l'ancienne page HTML. La refonte est sur la branche
  `claude/zoe-studio-redesign-59vfya`, non fusionnée.
- L'hébergement actuel du site n'a pas pu être vérifié depuis l'environnement de travail.

## GitHub Pages (workflow fourni)

`.github/workflows/deploy.yml` vérifie les dépendances externes et les types, construit le site et
le publie à chaque push sur `main`.

À faire une fois par le propriétaire, **avant** de fusionner : *Settings → Pages → Source →
GitHub Actions*. Sans ce réglage, GitHub Pages afficherait le README à la place du site.

## Vercel (recommandé pour les prévisualisations)

Importer le dépôt dans Vercel donne une adresse de prévisualisation par branche, sans toucher au
site en ligne. Renseigner `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Offre
gratuite suffisante au départ.

## Zoé Experience Lab

Chaque démo est un site statique indépendant. Cible : un sous-domaine `lab.` ou un projet
d'hébergement séparé, sans aucune variable d'environnement de production. Mise en place en phase 7.

## Coûts récurrents possibles (aucun service souscrit)

| Service | Gratuit jusqu'à | Ensuite |
| --- | --- | --- |
| Supabase | petit projet | offre payante mensuelle si le stockage ou le trafic augmentent |
| Hébergement (GitHub Pages ou Vercel) | usage courant | offre payante pour un usage commercial intensif sur Vercel |
| Vidéo (Cloudinary ou Mux) | quota d'essai | facturé au stockage et au visionnage ; à comparer en phase 2 |
| Nom de domaine | — | annuel |

Les tarifs changent : les vérifier sur les sites officiels au moment du choix.
