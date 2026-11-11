# Base de données

## Existant (projet Supabase en service)

Reconstitué à partir du code ; le schéma réel n'a pas pu être lu depuis l'environnement de travail.

| Table | Colonnes utilisées par le code | Rôle |
| --- | --- | --- |
| `reservations` | id, client_email, client_nom, telephone, service, date_evenement, heure_evenement, lieu, nb_jours, budget, attentes, statut, created_at | Demandes de tournage |
| `messages` | id, conversation_email, from_role, contenu, lu, created_at | Discussion client ↔ studio |
| `livrables` | id, client_email, nom, type, url, note, created_at | Fichiers remis au client |
| `galerie` | id, titre, categorie, type, url, created_at | Réalisations publiées |
| `profiles` | email, nom, role | Profil des comptes |

Ces tables contiennent de vraies données. **On les fait évoluer par migration, on ne les recrée pas.**

## Cible

Tables à introduire, par phase :

| Phase | Tables |
| --- | --- |
| 2 — Catalogue | `categories`, `showcases`, `showcase_media`, `showcase_tags`, `showcase_tag_links`, `showcase_variants` |
| 3 — Simulateur | `site_simulations` |
| 4 — Conversion | `services`, `service_packages`, `project_briefs` |
| 5 — Administration | `showcase_prompts`, `activity_logs`, colonne `role` fiable sur `profiles` |
| 6 — Espace client | `favorites`, `projects`, `quotes`, `orders`, `project_files` |

### `showcases` (cœur du catalogue)

`id uuid`, `slug text unique`, `title`, `summary`, `description`, `category_id`,
`content_status` (`inspiration` | `customizable` | `original`),
`publication_status` (`draft` | `published` | `archived`), `featured boolean`,
`preview_url`, `source_url`, `rights_note` (interne), `starting_price numeric null`,
`currency text null`, `created_at`, `updated_at`.

Contrainte : `content_status = 'inspiration'` exige `source_url` et interdit `starting_price`.
Une inspiration externe ne peut donc pas être mise en vente par erreur.

### `site_simulations`

`id`, `user_id null`, `config jsonb`, `config_version int`, `created_at`, `updated_at`.
`config` est validée par un schéma versionné côté application et par une contrainte côté base.

## Règles d'accès (RLS)

| Table | Anonyme | Client connecté | Admin |
| --- | --- | --- | --- |
| `showcases`, médias, tags, `categories`, `services` | lecture des lignes publiées | idem | tout |
| `showcase_prompts`, `activity_logs` | rien | rien | tout |
| `project_briefs`, `reservations` | insertion seule, via fonction validée | lecture des siennes | tout |
| `favorites`, `site_simulations`, `quotes`, `orders`, `project_files`, `messages`, `livrables` | rien | les siennes | tout |

Le rôle administrateur est lu dans `profiles.role` par une fonction `is_admin()` ; il n'est jamais
décidé par le navigateur.

## Première migration prévue (phase 5, à valider avant application)

1. Sauvegarde de la base.
2. Ajout de `user_id` sur `reservations`, `messages`, `livrables`, rempli à partir de l'e-mail.
3. Activation de RLS et création des politiques ci-dessus.
4. Création d'un compte Auth administrateur et suppression du contrôle par mot de passe côté
   navigateur.

Chaque étape est testée sur une branche Supabase avant la production.

## Index

`showcases(slug)`, `showcases(publication_status, featured)`, `showcase_tag_links(tag_id)`,
`showcase_media(showcase_id, position)`, et `user_id` sur chaque table privée.
