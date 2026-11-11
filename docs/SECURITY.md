# Sécurité et confidentialité

## Constats de l'audit, par ordre de gravité

| # | Constat | Gravité | Action | Phase |
| --- | --- | --- | --- | --- |
| 1 | Accès administrateur vérifié dans le navigateur ; les données dépendent uniquement de RLS, dont l'état n'est pas vérifié | Bloquant avant lancement | Compte Auth admin, RLS, fonction `is_admin()` | 5 |
| 2 | Ancien mot de passe administrateur lisible dans l'historique Git | Majeur | Le propriétaire change ce mot de passe partout où il sert | Immédiat |
| 3 | Conversations indexées par e-mail : un client qui connaît l'e-mail d'un autre pourrait lire ses messages si RLS ne filtre pas | Majeur | Passage à `user_id` | 5 |
| 4 | Aucune limite d'envoi sur le formulaire de réservation | Mineur | Limitation côté serveur et champ piège | 4 |
| 5 | Clé Web3Forms dans le code client | Mineur | Publique par conception ; à remplacer par une notification côté serveur | 4 |

## Règles permanentes

- Aucun secret dans le dépôt ni dans le navigateur. `.env*` est ignoré, sauf `.env.example`.
- La clé `service_role` reste côté serveur.
- RLS active sur toute table exposée. Jamais désactivée pour avancer plus vite.
- Entrées validées côté serveur, même si le formulaire valide déjà.
- Fichiers envoyés : types, tailles et extensions limités ; fichiers privés servis par URL signée.
- Opérations sensibles tracées dans `activity_logs`.
- Démos du Lab : aucun secret, aucun accès à la base de production, aucun `iframe` vers un site
  tiers arbitraire.
- Aucune ressource d'affichage chargée depuis un hôte tiers (`npm run check:external`).

## Données personnelles

- Collecte limitée au nécessaire : nom, e-mail, téléphone, détails du projet.
- Consentement explicite sur le formulaire de brief.
- Durée de conservation et procédure de suppression à écrire en phase 8.
- Mentions légales et politique de confidentialité à faire valider par une personne compétente
  (loi marocaine 09-08, et RGPD si des clients européens sont visés).
- Aucun outil de mesure d'audience sans consentement configuré.

## Ce que le propriétaire ne doit jamais faire

Coller une clé, un mot de passe ou un jeton dans une conversation ou dans un fichier versionné.
Les secrets se saisissent dans les réglages de l'hébergeur ou de Supabase.
