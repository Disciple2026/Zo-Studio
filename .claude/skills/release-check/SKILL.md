---
name: release-check
description: Checklist à dérouler avant toute publication de Zoé Studio : tests, sécurité, variables d'environnement, migrations, liens, formulaires, mobile, SEO, médias, sauvegarde et validation humaine. À utiliser avant une demande de mise en ligne.
---

# Contrôle avant publication

Cette skill prépare la décision ; elle ne publie pas. La mise en ligne exige l'accord explicite
du propriétaire.

1. **Vérifications automatiques** — exécuter et coller les résultats :
   `npm run typecheck`, `npm run build`, `npm run check:external`, tests Playwright s'ils existent.
2. **Sécurité** — aucun secret dans le code ni dans le diff ; RLS active sur chaque table
   exposée ; tests d'accès anonyme, client, administrateur et accès croisé rejoués.
3. **Variables d'environnement** — chaque variable de `.env.example` est renseignée chez
   l'hébergeur ; aucune clé serveur n'est préfixée `NEXT_PUBLIC_`.
4. **Migrations** — appliquées et testées sur l'environnement de développement ; procédure de
   retour arrière écrite ; sauvegarde de la base faite avant application en production.
5. **Liens et formulaires** — aucun lien mort ; chaque formulaire enregistre réellement et
   affiche une erreur claire en cas d'échec.
6. **Mobile** — parcours principal rejoué à 390 px.
7. **SEO** — titre et description par page, Open Graph, `sitemap.xml`, `robots.txt`.
8. **Médias** — droits vérifiés pour chaque visuel public ; contenus de démonstration étiquetés.
9. **Juridique** — mentions légales et politique de confidentialité validées par une personne
   compétente.
10. **Validation humaine** — présenter au propriétaire ce qui est vérifié, ce qui ne l'est pas,
    et attendre son accord écrit.
