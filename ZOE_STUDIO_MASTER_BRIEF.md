# ZOÉ STUDIO --- MASTER PROJECT BRIEF

## Cahier des charges, architecture, agents Claude Code et instructions de réalisation

**Version :** 1.0\
**Date :** 11 novembre 2026\
**Entreprise :** Zoé Studio\
**Document destiné à :** Claude Code --- modèle principal Fable 5.2\
**Rôle du document :** référence centrale du projet et instruction de
démarrage.

------------------------------------------------------------------------

# 0. INSTRUCTION PRINCIPALE À CLAUDE CODE

Tu es le directeur technique, architecte logiciel et coordinateur du
projet **Zoé Studio**. Tu dois transformer ce document en une plateforme
digitale complète, évolutive, élégante et réellement fonctionnelle.

Le propriétaire du projet peut également te fournir des prompts de
création de sites, des captures, des vidéos, des liens et des
inspirations. Ces éléments sont des ressources supplémentaires : **ils
ne remplacent pas ce cahier des charges et ne limitent pas ta
créativité**.

## Ta mission

1.  Auditer le dépôt et l'environnement existants avant toute
    modification.
2.  Comprendre le projet dans son ensemble et établir une architecture
    cohérente.
3.  Créer les fichiers de gouvernance et les instructions des agents
    spécialisés.
4.  Créer les compétences (skills), scripts, composants, pages, schémas
    de données et tests nécessaires.
5.  Construire le site par phases vérifiables, sans produire une simple
    maquette statique.
6.  Concevoir de nouvelles expériences et de nouveaux modèles originaux,
    même lorsque le propriétaire ne fournit aucun prompt correspondant.
7.  Permettre à un visiteur de découvrir des références, de les tester,
    de composer une direction visuelle et de simuler l'apparence de son
    futur site.
8.  Préparer une architecture qui pourra accueillir ultérieurement un
    assistant IA public, sans intégrer l'API Claude dans la première
    version.
9.  Documenter les décisions, les commandes, les variables
    d'environnement et les opérations à effectuer par le propriétaire.

## Règles non négociables

-   Ne commence pas par générer tout le projet en une seule réponse ou
    un seul gros commit.
-   Ne détruis, ne remplace et ne supprime aucun fichier existant sans
    l'avoir inspecté et sans autorisation explicite.
-   Ne réinitialise pas un dépôt Git, une base de données ou un projet
    Supabase existant.
-   Ne publie pas en production, ne configure pas de paiement réel et ne
    modifie pas de DNS sans validation explicite.
-   Ne demande jamais au propriétaire de coller des secrets dans une
    conversation ou dans un fichier versionné.
-   N'expose aucune clé secrète dans le navigateur.
-   Ne prétends pas qu'une fonctionnalité est terminée si elle n'est pas
    implémentée et testée.
-   N'utilise pas de faux boutons, de liens morts, de formulaires
    décoratifs ou de données qui donnent l'impression d'une vraie
    commande sans traitement réel.
-   Utilise des données de démonstration clairement identifiées
    lorsqu'un service externe n'est pas encore connecté.
-   Privilégie les composants réutilisables, les types stricts,
    l'accessibilité, les performances et la maintenabilité.
-   Si une information manque, choisis une solution raisonnable,
    documente l'hypothèse et continue. Pose une question uniquement si
    une décision bloque réellement la sécurité, les coûts, une action
    irréversible ou une fonctionnalité essentielle.
-   Le propriétaire peut fournir des prompts au fil du développement.
    Analyse-les, conserve leur intention utile et adapte-les à
    l'architecture. Ne copie pas aveuglément un prompt qui contredit les
    règles de sécurité ou le présent document.
-   Tu dois aussi proposer de nouvelles idées originales de sites,
    d'interactions et de démonstrations. La bibliothèque ne doit pas
    dépendre uniquement des prompts fournis.

## Première réponse attendue après lecture

Avant de modifier le code : 1. Résume en quelques lignes ta
compréhension du produit. 2. Inspecte les fichiers, le framework, les
scripts, Git et les dépendances existantes. 3. Identifie les éléments
réutilisables et les risques. 4. Présente un plan d'exécution par phases
et les éventuels blocages. 5. Crée ensuite les fichiers de gouvernance
demandés dans la section 12. 6. N'écrase pas une configuration existante
: compare, fusionne proprement et explique les changements.

------------------------------------------------------------------------

# 1. VISION ET POSITIONNEMENT

## 1.1 Concept

**Zoé Studio est un univers de découverte, d'inspiration,
d'expérimentation et de création digitale.**

Ce n'est pas seulement le site vitrine d'une agence. C'est une
plateforme dans laquelle les visiteurs peuvent :

-   découvrir des expériences web, vidéo et graphiques ;
-   parcourir une bibliothèque visuelle comme un flux de contenus ;
-   observer des sites en mouvement, pas seulement des captures d'écran
    ;
-   ouvrir des démonstrations interactives ;
-   tester des styles, couleurs, typographies, mises en page et
    fonctionnalités ;
-   simuler leur futur site ;
-   sauvegarder leurs inspirations ;
-   transmettre un brief à Zoé Studio ;
-   commander une création personnalisée.

Zoé Studio transforme l'inspiration en réalisation.

## 1.2 Signature de marque proposée

**ZOÉ STUDIO --- A world of digital possibilities.**

Piliers d'expérience :

-   **DISCOVER** --- découvrir ce qui est possible.
-   **EXPERIENCE** --- tester et explorer.
-   **CREATE** --- personnaliser et faire réaliser son projet.

La plateforme doit donner envie d'explorer, tout en guidant clairement
vers une demande commerciale.

## 1.3 Publics

-   Entrepreneurs et petites entreprises.
-   Marques et commerces.
-   Photographes, vidéastes et créateurs.
-   Organisateurs d'événements et futurs mariés.
-   Restaurants, hôtels et acteurs du tourisme.
-   Associations et institutions.
-   Entreprises ayant besoin de communication visuelle ou de présence
    digitale.

Zoé Studio est basé à Tanger et peut proposer ses services dans tout le
Maroc. Prévoir une structure qui pourra servir des clients
internationaux.

## 1.4 Promesse

Le visiteur n'a pas besoin de connaître le vocabulaire technique du web.
Il doit pouvoir dire ce qu'il aime, ce qu'il veut obtenir et voir une
représentation visuelle de son idée.

------------------------------------------------------------------------

# 2. PRINCIPES DE PRODUIT

## 2.1 Les quatre univers principaux

### A. Web Experiences

-   Sites vitrines.
-   E-commerce.
-   Sites événementiels et mariage.
-   Immobilier.
-   Restauration et hôtellerie.
-   Portfolio et photographie.
-   Landing pages.
-   Sites institutionnels.
-   Plateformes de réservation.
-   Applications web.
-   SaaS et dashboards.
-   Expériences interactives et 3D.

### B. Video Experiences

-   Publicités.
-   Films institutionnels.
-   Vidéos promotionnelles.
-   Réels et formats verticaux.
-   YouTube Shorts.
-   Récaps événementiels.
-   Motion design.
-   Animations de logo.
-   Vidéos générées ou assistées par IA.

### C. Visual Design

-   Identité visuelle.
-   Branding.
-   Logos.
-   Affiches.
-   Supports de communication.
-   Campagnes social media.
-   Présentations et visuels publicitaires.

### D. Digital Innovation

-   Expériences 3D.
-   WebGL lorsque pertinent.
-   Prototypes interactifs.
-   Expériences immersives.
-   Concepts créatifs.
-   Démonstrations de nouvelles interactions numériques.

Les quatre univers doivent être visibles et cohérents, mais ne doivent
pas être présentés comme quatre entreprises séparées.

## 2.2 Trois statuts de contenu obligatoires

Chaque référence de la bibliothèque doit avoir un statut clair :

1.  **Inspiration externe** : référence provenant d'un tiers, présentée
    à titre d'inspiration. Elle n'est ni la propriété de Zoé Studio ni
    un modèle revendiqué comme tel.
2.  **Base personnalisable** : modèle ou création dont Zoé Studio
    possède les droits nécessaires ou une licence autorisant
    l'adaptation et l'exploitation.
3.  **Zoé Original** : création produite par Zoé Studio ou sous ses
    droits.

Afficher ce statut sur chaque fiche. Ne jamais laisser croire qu'une
création tierce est une réalisation Zoé Studio.

Respecter les droits d'auteur, licences, conditions d'utilisation,
marques, images, polices et ressources. Ne pas aspirer ou republier des
sites tiers sans autorisation. Pour les inspirations externes,
privilégier un lien vers la source, des captures autorisées ou une
présentation descriptive. Une reproduction de référence doit être
suffisamment transformée et légalement exploitable avant
commercialisation.

## 2.3 Deux espaces techniques séparés

### Plateforme principale

Le site public, le catalogue, les médias, les services, les formulaires,
les comptes, les commandes et l'administration.

### Zoé Experience Lab

Un environnement isolé pour héberger les prototypes et démonstrations de
sites créés avec Claude ou d'autres outils. Les démonstrations ne
doivent pas pouvoir casser le site principal. Utiliser des sous-domaines
ou des déploiements séparés selon les possibilités de l'hébergement.

Le catalogue principal conserve les métadonnées, miniatures, vidéos et
URL des démonstrations. Les prototypes sont isolés, limités en
permissions et ne contiennent aucun secret de production.

------------------------------------------------------------------------

# 3. EXPÉRIENCE UTILISATEUR ET ARBORESCENCE

Créer une navigation claire, mobile-first et évolutive.

## 3.1 Navigation publique recommandée

1.  Accueil
2.  Explorer
3.  Bibliothèque
4.  Vidéo
5.  Creative Lab
6.  Services
7.  Tendances / Inspirations
8.  À propos
9.  Contact
10. Mon espace

L'administration est séparée et protégée.

## 3.2 Accueil

Objectif : faire comprendre en quelques secondes que Zoé Studio est un
univers créatif digital.

Contenu recommandé : - Hero immersif avec une proposition de valeur
courte. - Séquence visuelle présentant les univers Web, Vidéo, Design et
Innovation. - Aperçu du flux de découvertes. - Sélection de créations
remarquables. - Présentation des services. - Présentation des packs. -
Mise en avant de la fonctionnalité « Simuler mon site ». - Quelques
projets Zoé Original. - Appel à l'action vers l'exploration ou le
brief. - Footer complet et coordonnées.

Ne pas surcharger le hero. L'animation doit être élégante, rapide et
accessible.

## 3.3 Explorer --- flux visuel

Créer une expérience inspirée des flux vidéo verticaux, sans reproduire
l'identité graphique ou les éléments propriétaires d'une plateforme
existante.

Fonctions : - Défilement fluide. - Vidéo ou animation en aperçu. -
Lecture automatique uniquement lorsque l'élément est visible, sans son
par défaut. - Pause/reprise. - Contrôle du son. - Favori. - Catégorie et
tags. - Bouton « Voir le projet ». - Bouton « Tester la démo »
lorsqu'une démo existe. - Bouton « Créer quelque chose dans ce style
». - Navigation clavier et alternatives accessibles. - Chargement
différé et préchargement limité de l'élément suivant. - Fallback image
si la vidéo ne charge pas.

Ne pas charger toutes les vidéos à l'ouverture. Prévoir une pagination
ou un chargement progressif.

## 3.4 Bibliothèque

Présenter les références sous forme de cartes visuelles, avec filtres
: - univers ; - secteur ; - type de projet ; - style visuel ; - ambiance
; - fonctionnalités ; - niveau de personnalisation ; - statut de contenu
; - disponibilité d'une démo.

Chaque fiche de référence contient : - nom ; - identifiant ; -
description ; - catégorie ; - statut (Inspiration, Base personnalisable,
Zoé Original) ; - vidéo de présentation ; - galerie d'images ; -
captures desktop et mobile ; - URL de démonstration si disponible ; -
fonctionnalités ; - tags ; - droits et provenance internes ; - prix de
départ si applicable ; - CTA adapté.

Les inspirations externes doivent ouvrir leur source ou afficher une
attribution appropriée. Ne pas proposer « Acheter ce modèle » pour un
contenu qui n'est pas exploitable commercialement.

## 3.5 Fiche détaillée d'une création

La page doit permettre : - de comprendre l'objectif du modèle ; - de
regarder la vidéo ; - d'examiner les captures ; - de tester la démo ; -
de consulter les fonctionnalités ; - de découvrir les variantes ; -
d'ajouter aux favoris ; - de démarrer une simulation à partir de cette
référence ; - de demander une personnalisation.

## 3.6 Vidéo et portfolio audiovisuel

Créer une section propre aux prestations vidéo : - publicités ; - vidéos
institutionnelles ; - réels ; - clips promotionnels ; - événements ; -
motion design ; - créations assistées par IA.

Filtres par format, secteur et type de prestation. Prévoir les formats
verticaux et horizontaux. La lecture doit rester performante sur mobile.

## 3.7 Services et packs

Présenter les services sans inventer de prix définitifs. Les prix
peuvent être configurés depuis l'administration et être indiqués comme «
à partir de » ou « sur devis ».

Packs indicatifs à affiner : - Présence digitale : identité visuelle et
site vitrine. - Business : site et vidéo promotionnelle. - E-commerce :
boutique et contenus de présentation. - Premium : stratégie, site sur
mesure, contenus et accompagnement.

Chaque service doit avoir une description, les livrables possibles, les
options et un CTA.

## 3.8 Contact et brief

Créer un parcours de demande de projet simple, progressif et rassurant.
Les champs doivent s'adapter au type de prestation.

Prévoir : - nom ; - email ; - téléphone facultatif ; - entreprise ou
marque ; - pays / ville ; - type de projet ; - objectif ; - budget
indicatif facultatif ; - délai souhaité ; - description ; - références
sélectionnées ; - pièces jointes autorisées ; - consentement de
traitement des données.

Ne jamais promettre automatiquement un prix ou un délai définitif.

------------------------------------------------------------------------

# 4. FONCTIONNALITÉ SIGNATURE : « SIMULER MON SITE »

Cette fonctionnalité est centrale. Elle doit permettre au visiteur de
stimuler son imagination et de voir une représentation de son futur site
avant de contacter Zoé Studio.

Nom de travail : **Zoé Site Studio** ou **Build Your Experience**.

## 4.1 Objectif

Le client doit pouvoir composer une première direction visuelle sans
avoir de connaissances techniques. Il doit voir les changements en
direct dans une prévisualisation.

Ce module est un configurateur visuel guidé, pas nécessairement un
constructeur no-code complet dans la première version. Il ne doit pas
prétendre générer un site prêt à publier si ce n'est pas le cas.

## 4.2 Parcours de simulation

### Étape 1 --- Quel est ton projet ?

Choix possibles : - entreprise ; - boutique ; - restaurant ; - mariage /
événement ; - immobilier ; - portfolio ; - photographie ; - association
; - application / plateforme ; - autre.

### Étape 2 --- Quel est ton objectif ?

-   présenter une activité ;
-   vendre des produits ;
-   recevoir des réservations ;
-   présenter des réalisations ;
-   obtenir des demandes de contact ;
-   partager un événement ;
-   créer une plateforme ;
-   autre.

### Étape 3 --- Choisir une direction artistique

Présenter des vignettes visuelles et des exemples : - minimaliste ; -
luxe ; - éditorial ; - moderne ; - corporate ; - futuriste ; -
chaleureux ; - artistique ; - cinématographique ; - coloré / audacieux.

Les styles doivent être des choix visuels compréhensibles, pas
uniquement des mots.

### Étape 4 --- Personnaliser l'apparence

-   couleur principale ;
-   couleur secondaire ;
-   couleur d'accent ;
-   thème clair ou sombre ;
-   typographie parmi une sélection licenciée et optimisée ;
-   densité de l'interface ;
-   arrondis ;
-   style des boutons ;
-   ambiance des images.

### Étape 5 --- Choisir les sections

Selon le type de site : - accueil ; - à propos ; - services ; - produits
; - galerie ; - portfolio ; - témoignages ; - tarifs ; - FAQ ; - contact
; - réservation ; - blog ; - équipe ; - localisation.

### Étape 6 --- Choisir les fonctionnalités

-   formulaire ;
-   catalogue ;
-   recherche ;
-   filtres ;
-   panier de démonstration ;
-   réservation de démonstration ;
-   galerie ;
-   témoignages ;
-   newsletter de démonstration ;
-   espace client (option de conception) ;
-   multilingue ;
-   animations ;
-   vidéo de couverture.

Ne pas implémenter de vrais paiements ou réservations dans le
simulateur. Les présenter comme des options possibles à développer dans
le projet final.

### Étape 7 --- Prévisualiser

Afficher une prévisualisation qui se met à jour sans rechargement : -
desktop ; - tablette ; - mobile ; - navigation entre sections ; -
changements de palette ; - typographie ; - style des boutons ; - ordre
ou visibilité des sections ; - contenu fictif adapté au secteur.

Utiliser des composants de démonstration réutilisables. Une sélection de
secteur peut charger une structure de départ différente. Une référence
de la bibliothèque peut être utilisée comme point de départ.

### Étape 8 --- Sauvegarder et demander une réalisation

-   sauvegarder localement ou dans le compte si connecté ;
-   générer un récapitulatif visuel ;
-   produire un brief structuré ;
-   inclure les choix, les références, les fonctionnalités et le niveau
    de personnalisation ;
-   permettre au client de transmettre le brief à Zoé Studio.

Le brief ne doit pas être perdu si l'utilisateur revient en arrière.
Prévoir un état de simulation persistant durant la session et une
sauvegarde explicite.

## 4.3 Architecture du simulateur

Construire un moteur de configuration basé sur des données et des
composants, pas une page codée en dur par combinaison.

Prévoir : - `SiteConfiguration` typé ; - catalogues de thèmes ; -
catalogues de typographies ; - modèles de sections ; - presets par
secteur ; - composants de prévisualisation ; - moteur de rendu de démo
; - sauvegarde et restauration de configuration ; - export du brief.

Chaque configuration doit être versionnable et validée par schéma.

## 4.4 Limites honnêtes

La simulation représente une direction artistique et une structure. Elle
n'est pas automatiquement le site final. Le site livré sera conçu,
adapté, développé et testé après validation du brief et du devis.

L'interface doit expliquer cette différence avec tact.

## 4.5 Évolutions ultérieures

-   Importer une inspiration de la bibliothèque.
-   Comparer deux variantes.
-   Générer une planche de style.
-   Ajouter un logo et des images du client.
-   Préparer un brief PDF.
-   Assistant IA public qui conseille et propose des variantes.
-   Génération assistée de prototypes.

L'IA publique est reportée : la première version doit fonctionner sans
clé API Claude.

------------------------------------------------------------------------

# 5. GESTION DES PROMPTS ET GÉNÉRATION DE NOUVELLES CRÉATIONS

Le propriétaire fournira parfois des prompts complets à Claude Code. Tu
dois aussi être capable de proposer et développer des concepts
originaux.

## 5.1 Prompt Studio interne

Créer une section privée d'administration pour organiser : - prompts
fournis par le propriétaire ; - prompts créés par Claude ; - prompts
améliorés ; - variantes d'un même concept ; - prompts associés à une
référence ; - historique des versions ; - statut : brouillon, en test,
validé, archivé.

Ne pas afficher les prompts internes aux visiteurs.

## 5.2 Processus de création d'une démonstration

1.  Identifier une catégorie peu représentée.
2.  Proposer un concept original.
3.  Rédiger un prompt détaillé.
4.  Définir le parcours utilisateur.
5.  Développer la démonstration dans Zoé Experience Lab.
6.  Vérifier le rendu desktop et mobile.
7.  Tester les interactions.
8.  Enregistrer captures et vidéo.
9.  Documenter technologies, fonctionnalités, licences et limites.
10. Soumettre à validation du propriétaire.
11. Publier dans la bibliothèque uniquement après validation.

## 5.3 Créativité proactive

Ne pas attendre uniquement les prompts du propriétaire. Proposer
régulièrement de nouveaux concepts : - secteurs sous-représentés ; -
expériences de navigation originales ; - sites immersifs ; - interfaces
éditoriales ; - e-commerce innovants ; - sites événementiels ; -
expériences mobiles ; - concepts 3D lorsque justifiés.

Chaque proposition doit être distincte, utile et réalisable. Éviter de
générer dix variantes presque identiques.

## 5.4 Exemples de concepts initiaux à créer

Créer une première collection de démonstrations originales, avec données
fictives et ressources dont l'utilisation est autorisée :

1.  E-commerce de mode premium.
2.  Site de mariage avec invitation interactive.
3.  Portfolio de photographe.
4.  Site immobilier.
5.  Restaurant avec menu immersif.
6.  Landing page pour une marque de parfum.
7.  Site d'agence créative.
8.  Site de réservation d'hôtel.
9.  Portfolio d'artiste.
10. Dashboard SaaS.
11. Site événementiel.
12. Site institutionnel moderne.

Ces exemples sont un point de départ, pas une limite. Prioriser la
qualité et la diversité plutôt qu'un grand nombre de modèles
superficiels.

------------------------------------------------------------------------

# 6. IDENTITÉ VISUELLE ET DESIGN SYSTEM

## 6.1 Direction artistique

Direction proposée : - noir profond ; - vert émeraude ; - doré en accent
; - blanc cassé ; - typographie moderne et élégante ; - composition
éditoriale ; - images et vidéos de grande qualité ; - transitions
cinématographiques ; - détails subtils et micro-interactions.

Ne pas utiliser le doré partout. Il doit rester un accent. Le vert doit
conserver une présence équilibrée.

## 6.2 Principes UX

-   Mobile-first, mais excellente expérience desktop.
-   Navigation compréhensible.
-   Hiérarchie visuelle forte.
-   Contraste suffisant.
-   Animations utiles et non intrusives.
-   Réduction des mouvements si l'utilisateur préfère
    `prefers-reduced-motion`.
-   États de chargement, erreurs et succès.
-   Formulaires accessibles.
-   Focus clavier visible.
-   Alternatives aux vidéos.
-   Textes lisibles.
-   Pas de curseur personnalisé qui gêne l'accessibilité.
-   Pas d'effet WebGL lourd sans bénéfice UX clair.

## 6.3 Design system

Créer des tokens centralisés : - couleurs ; - typographies ; -
espacements ; - rayons ; - ombres ; - largeurs de contenu ; -
breakpoints ; - durées et courbes d'animation.

Créer des composants cohérents : - boutons ; - cartes ; - badges de
statut ; - filtres ; - navigation ; - modales ; - lecteurs vidéo ; -
formulaires ; - panneaux de prévisualisation ; - états vides ; -
notifications.

Ne pas multiplier les styles isolés.

------------------------------------------------------------------------

# 7. ARCHITECTURE TECHNIQUE RECOMMANDÉE

## 7.1 Stack cible

Choix de départ : - Next.js avec App Router et TypeScript ; - React ; -
Tailwind CSS ; - Framer Motion ou Motion pour les animations ; -
Supabase : PostgreSQL, Auth, Storage ; - Cloudinary ou Mux pour la
gestion/diffusion média selon les besoins réels ; - Vercel ou hébergeur
compatible Next.js ; - GitHub ; - Playwright pour les tests end-to-end.

Avant d'installer ou de mettre à jour quoi que ce soit, inspecter le
dépôt. Si un framework existe déjà et est fonctionnel, proposer une
migration seulement si elle apporte un avantage réel et obtenir l'accord
avant une migration risquée.

## 7.2 Architecture logique

-   Frontend public.
-   API / logique serveur.
-   Base de données.
-   Authentification.
-   Stockage des médias.
-   Service de diffusion vidéo.
-   Administration.
-   Environnement isolé des démonstrations.
-   Futur adaptateur IA.

## 7.3 Structure de fichiers cible

Adapter à la version réelle du framework. Exemple de structure :

``` text
/
├── CLAUDE.md
├── README.md
├── .env.example
├── .mcp.json.example
├── docs/
│   ├── PRODUCT_VISION.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   ├── DESIGN_SYSTEM.md
│   ├── CONTENT_AND_LICENSES.md
│   ├── DEPLOYMENT.md
│   └── ROADMAP.md
├── .claude/
│   ├── agents/
│   │   ├── ui-ux-designer.md
│   │   ├── frontend-developer.md
│   │   ├── backend-architect.md
│   │   ├── qa-security-engineer.md
│   │   └── research-experience.md
│   └── skills/
│       ├── build-showcase/
│       │   └── SKILL.md
│       ├── create-site-demo/
│       │   └── SKILL.md
│       ├── review-ui/
│       │   └── SKILL.md
│       └── release-check/
│           └── SKILL.md
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   │   ├── discovery/
│   │   ├── library/
│   │   ├── simulator/
│   │   ├── video/
│   │   ├── services/
│   │   ├── client-space/
│   │   └── admin/
│   ├── lib/
│   ├── types/
│   └── styles/
├── supabase/
│   ├── migrations/
│   ├── seed/
│   └── config.toml
└── tests/
    ├── unit/
    └── e2e/
```

Ne crée pas artificiellement tous les dossiers si le projet n'en a pas
encore besoin. La structure finale doit suivre une logique cohérente.

## 7.4 Architecture de composants

Organiser par domaine fonctionnel. Éviter les composants monolithiques.
Isoler : - feed ; - carte de référence ; - fiche de référence ; -
lecteur vidéo ; - filtres ; - simulateur ; - prévisualisation ; -
formulaire de brief ; - tableau de bord ; - gestion des médias.

Utiliser des types TypeScript et des validations de données côté
serveur.

------------------------------------------------------------------------

# 8. MODÈLE DE DONNÉES INITIAL

Concevoir les tables avec migrations SQL versionnées. Vérifier les
relations et les index.

Tables indicatives :

-   `profiles` : profil utilisateur.
-   `categories` : univers et catégories.
-   `showcases` : références de la bibliothèque.
-   `showcase_media` : images, vidéos, captures.
-   `showcase_tags` : tags.
-   `showcase_tag_links` : liaison références/tags.
-   `showcase_prompts` : prompts internes et versions.
-   `showcase_variants` : variantes d'une référence.
-   `favorites` : favoris utilisateur ou collection.
-   `services` : prestations.
-   `service_packages` : packs.
-   `projects` : projets clients.
-   `project_briefs` : briefs structurés.
-   `site_simulations` : configurations du simulateur.
-   `quotes` : devis et statuts.
-   `orders` : commandes.
-   `project_files` : fichiers livrables et documents.
-   `activity_logs` : historique d'opérations administratives.

Champs de base à considérer pour `showcases` : - id ; - slug ; - title
; - summary ; - description ; - category_id ; - content_status ; -
publication_status ; - featured ; - preview_url ; - source_url ; -
starting_price nullable ; - currency nullable ; - created_at ; -
updated_at.

Ne pas enregistrer des données sensibles dans les tables publiques.

## 8.1 Sécurité Supabase

-   Activer RLS sur toutes les tables exposées.
-   Les visiteurs anonymes peuvent lire uniquement les références
    publiées et les données explicitement publiques.
-   Les clients ne peuvent lire que leurs propres favoris, simulations,
    briefs, commandes et fichiers.
-   Seuls les administrateurs autorisés peuvent gérer les références,
    prompts internes, prix, clients et commandes.
-   Les clés `service_role` ne doivent jamais apparaître dans le
    frontend.
-   Valider les entrées côté serveur.
-   Limiter les types, tailles et extensions des fichiers.
-   Vérifier l'accès aux fichiers privés.
-   Ajouter des journaux pour les opérations sensibles.
-   Prévoir une stratégie de sauvegarde et de restauration.

Ne jamais désactiver RLS pour faire fonctionner rapidement une
fonctionnalité.

------------------------------------------------------------------------

# 9. ESPACE ADMINISTRATION

Créer un espace privé utilisable sans modifier le code pour chaque ajout
de contenu.

Modules : 1. Vue d'ensemble et indicateurs. 2. Gestion des références.
3. Gestion des catégories et tags. 4. Gestion des vidéos et images. 5.
Gestion des prompts. 6. Gestion des variantes et démonstrations. 7.
Gestion des services et packs. 8. Demandes et briefs. 9. Clients. 10.
Projets et commandes. 11. Fichiers et livrables. 12. Paramètres. 13.
Journal d'activité.

Fonctions essentielles : - créer, modifier, prévisualiser, publier,
dépublier, archiver ; - enregistrer la provenance et les droits ; -
organiser les médias ; - vérifier qu'une démo fonctionne avant
publication ; - gérer les statuts de projet ; - rechercher et filtrer
; - confirmer les actions sensibles.

L'administration doit avoir un contrôle d'accès strict. Prévoir des
rôles, au minimum `admin` et `client`, et éventuellement `editor`
lorsque nécessaire.

------------------------------------------------------------------------

# 10. ESPACE CLIENT

Développer progressivement.

Fonctions prévues : - profil ; - favoris ; - simulations sauvegardées
; - briefs envoyés ; - demandes de devis ; - commandes ; - état
d'avancement ; - fichiers partagés ; - livrables ; - historique des
échanges ou notes de suivi.

Ne pas créer un système de messagerie complexe dans la première version
si un suivi de projet simple suffit.

------------------------------------------------------------------------

# 11. VIDÉO, IMAGES ET PERFORMANCE

Le site repose fortement sur le visuel. Les performances sont donc une
exigence de produit.

-   Utiliser des miniatures optimisées.
-   Utiliser des formats d'image modernes.
-   Charger les médias à la demande.
-   Ne pas lancer toutes les vidéos simultanément.
-   Lecture automatique uniquement à l'écran et sans son.
-   Prévoir une miniature de remplacement.
-   Adapter les résolutions aux écrans.
-   Éviter les fichiers vidéo volumineux servis directement depuis le
    serveur applicatif.
-   Utiliser un CDN / service média approprié.
-   Limiter les animations coûteuses.
-   Mesurer les performances sur mobile réel ou émulation.
-   Prévoir une solution de repli si un service vidéo est indisponible.

Ne pas sélectionner un fournisseur vidéo avant d'avoir comparé le
volume, le stockage, la bande passante, les prix et les besoins de
streaming.

------------------------------------------------------------------------

# 12. AGENTS CLAUDE CODE --- FICHIERS À CRÉER

Tu dois créer les cinq fichiers suivants dans `.claude/agents/`. Chaque
agent doit avoir un rôle, des objectifs, des limites, des livrables et
des critères de validation. Respecte la syntaxe officielle de la version
de Claude Code utilisée.

## 12.1 Agent UI/UX Designer

Fichier : `.claude/agents/ui-ux-designer.md`

Mission : - analyser les parcours utilisateurs ; - proposer des
structures de pages ; - définir le design system ; - vérifier cohérence
visuelle, responsive et accessibilité ; - proposer des interactions
adaptées ; - examiner les références fournies par le propriétaire ; -
recommander des concepts originaux.

Limites : - ne pas modifier le backend ; - ne pas inventer des
fonctionnalités impossibles ; - ne pas sacrifier la lisibilité aux
animations ; - documenter ses recommandations avant les modifications
majeures.

Livrables : - spécifications de pages ; - tokens et composants ; - états
responsive ; - recommandations d'accessibilité ; - checklist UI.

## 12.2 Agent Frontend Developer

Fichier : `.claude/agents/frontend-developer.md`

Mission : - développer les pages et composants React ; - intégrer le
design system ; - réaliser le feed et le catalogue ; - construire le
simulateur visuel ; - gérer les états, erreurs et chargements ; -
optimiser les performances frontend ; - écrire ou maintenir les tests
UI.

Limites : - ne jamais exposer de secrets ; - ne pas contourner RLS ; -
ne pas inventer des réponses backend ; - ne pas modifier les migrations
sans coordination ; - respecter les contrats de données validés.

Livrables : - composants typés ; - pages responsive ; - tests ; -
documentation d'intégration.

## 12.3 Agent Backend Architect

Fichier : `.claude/agents/backend-architect.md`

Mission : - concevoir le schéma Supabase ; - créer les migrations ; -
définir les relations et index ; - mettre en place Auth et RLS ; -
développer les API et opérations serveur ; - protéger les données
clients ; - documenter les variables d'environnement.

Limites : - aucune clé secrète dans le client ; - ne jamais désactiver
RLS comme solution de facilité ; - ne pas modifier ou supprimer des
données de production sans validation ; - migrations réversibles ou
stratégie de restauration documentée ; - valider les entrées côté
serveur.

Livrables : - migrations ; - politiques RLS ; - types de données ; - API
documentées ; - tests d'accès et de sécurité.

## 12.4 Agent QA & Security Engineer

Fichier : `.claude/agents/qa-security-engineer.md`

Mission : - écrire et exécuter les tests ; - vérifier les parcours
critiques ; - tester desktop et mobile ; - examiner accessibilité et
performances ; - rechercher les fuites de secrets ; - vérifier les
règles d'accès ; - contrôler les formulaires et erreurs ; - signaler les
régressions.

Limites : - lecture seule par défaut ; - ne pas corriger directement un
module sans accord de coordination ; - ne pas utiliser de vraies données
clients dans les tests ; - ne pas réaliser de test intrusif sur un
service externe sans autorisation.

Livrables : - rapport de tests ; - bugs reproductibles ; - niveau de
gravité ; - preuves et résultats ; - checklist de mise en production.

## 12.5 Agent Research & Digital Experience

Fichier : `.claude/agents/research-experience.md`

Mission : - analyser les inspirations fournies ; - étudier les tendances
et expériences pertinentes ; - proposer des concepts originaux ; -
identifier les lacunes de la bibliothèque ; - améliorer la
découvrabilité ; - recommander des parcours et interactions ; - rédiger
des prompts de démonstration pour Claude.

Limites : - distinguer faits, observations et idées ; - ne pas
revendiquer la propriété de références tierces ; - enregistrer la source
et les droits connus ; - ne pas copier une interface propriétaire ; - ne
pas publier sans validation.

Livrables : - fiches de recherche ; - propositions de concepts ; -
prompts structurés ; - recommandations UX ; - matrice des catégories à
enrichir.

## 12.6 Coordination des agents

Claude principal doit : - attribuer des missions précises ; - fournir le
contexte nécessaire ; - éviter les modifications simultanées des mêmes
fichiers ; - définir les contrats d'interface entre agents ; - demander
des comptes rendus concis ; - intégrer les résultats ; - lancer les
tests après intégration.

Les agents ne sont pas cinq développeurs indépendants qui modifient tout
en même temps. Le chef d'orchestre garde la responsabilité de
l'architecture et de la cohérence.

------------------------------------------------------------------------

# 13. SKILLS ET INSTRUCTIONS RÉUTILISABLES

Créer les skills suivants si la version de Claude Code les prend en
charge. Vérifier leur format officiel.

## `build-showcase/SKILL.md`

Procédure pour concevoir une nouvelle référence : - analyser le brief
; - définir la cible ; - rédiger le parcours ; - définir la direction
artistique ; - créer les composants ; - construire le prototype ; -
tester ; - documenter ; - préparer les médias ; - demander validation
avant publication.

## `create-site-demo/SKILL.md`

Procédure pour développer un site de démonstration dans Zoé Experience
Lab : - isoler le projet ; - définir les données fictives ; - vérifier
les licences ; - développer ; - tester ; - vérifier les formats ; -
publier une prévisualisation sécurisée ; - relier la démo au catalogue.

## `review-ui/SKILL.md`

Checklist de cohérence UI, responsive, accessibilité, lisibilité,
interactions, états et performance.

## `release-check/SKILL.md`

Checklist avant publication : - tests ; - sécurité ; - variables
d'environnement ; - migrations ; - liens ; - formulaires ; - mobile ; -
SEO ; - médias ; - sauvegarde ; - validation humaine.

Ne crée pas de skill qui prétend effectuer une action non disponible.
Documente les prérequis.

------------------------------------------------------------------------

# 14. CONNECTEURS, MCP ET PERMISSIONS

Ne configure pas tous les connecteurs immédiatement. Utilise seulement
ceux qui apportent une capacité réelle au projet.

## 14.1 Priorités

### Dès le départ

-   GitHub : dépôt, branches, historique et revue du code.
-   Outils locaux du projet : terminal, éditeur, tests.
-   Playwright : tests navigateur.

### Pendant le backend

-   Supabase CLI et/ou MCP Supabase adapté.
-   Accès limité au projet de développement.

### Pour le design

-   Figma MCP uniquement si le propriétaire utilise Figma et souhaite
    donner accès à ses fichiers.

### Pour le déploiement

-   Vercel ou l'hébergeur choisi, d'abord en prévisualisation.

### Pour les médias

-   Cloudinary ou Mux lorsque le choix est validé.

### Plus tard

-   API Claude pour l'assistant public.
-   Autres intégrations selon les besoins réels.

## 14.2 Permissions à accorder à Claude Code

Le propriétaire doit accorder les permissions progressivement.

### Autoriser pour le travail quotidien

-   lecture des fichiers du projet ;
-   recherche dans le code ;
-   création et modification des fichiers du dépôt ;
-   lancement des scripts de développement ;
-   tests et lint ;
-   lecture des logs locaux ;
-   création de branches Git ;
-   commits locaux si demandés ou convenus.

### Demander confirmation avant

-   installation ou mise à jour majeure de dépendances ;
-   suppression ou déplacement massif de fichiers ;
-   modification de configuration système ;
-   migration de framework ;
-   modification des paramètres GitHub ;
-   push vers une branche partagée ;
-   déploiement ;
-   migration de base de données distante ;
-   modification de DNS ;
-   activation d'un service payant ;
-   envoi d'emails ou messages réels ;
-   publication de contenu ;
-   modification d'un compte ou d'une permission externe.

### Ne jamais accorder sans nécessité explicite

-   accès global à tout l'ordinateur ;
-   accès à tous les fichiers personnels ;
-   accès aux mots de passe ;
-   accès bancaire ;
-   accès non limité à la production ;
-   possibilité de supprimer une base de données ;
-   possibilité de déployer ou facturer sans contrôle ;
-   accès aux secrets dans un contexte partagé.

## 14.3 Configuration des permissions

Ne pas activer automatiquement un mode « bypass permissions » ou une
autorisation générale permanente. Utiliser le mode de permissions normal
de Claude Code, examiner les demandes et n'autoriser que les commandes
nécessaires.

Si des règles de permissions sont ajoutées dans la configuration Claude
Code : - autoriser des commandes précises et compréhensibles ; - éviter
les jokers trop larges ; - ne pas autoriser `rm -rf`, `sudo`, les
commandes de suppression de base ou les déploiements globaux sans
validation ; - ne pas considérer une règle d'autorisation comme une
preuve que la commande est sans risque.

## 14.4 Secrets et variables d'environnement

Créer `.env.example` avec des noms de variables sans valeurs secrètes.

Exemples indicatifs : - `NEXT_PUBLIC_SUPABASE_URL` -
`NEXT_PUBLIC_SUPABASE_ANON_KEY` - `SUPABASE_SERVICE_ROLE_KEY` (serveur
uniquement) - `CLOUDINARY_CLOUD_NAME` - `CLOUDINARY_API_KEY` (serveur si
nécessaire) - `CLOUDINARY_API_SECRET` (serveur uniquement) -
`MUX_TOKEN_ID` (serveur uniquement) - `MUX_TOKEN_SECRET` (serveur
uniquement)

Ne renseigner aucune vraie valeur dans le dépôt. Ajouter `.env*` au
`.gitignore`, en autorisant uniquement `.env.example`. Vérifier que les
clés privées ne sont jamais importées dans un composant client.

Ne pas créer une clé Claude API tant que l'assistant public n'est pas
planifié et validé.

## 14.5 GitHub

-   Utiliser un dépôt privé au départ si le propriétaire le souhaite.
-   Créer une branche de travail.
-   Préserver l'historique.
-   Ne pas forcer un push.
-   Ne pas écraser `main`.
-   Proposer une Pull Request ou un résumé des changements.
-   Ne jamais inclure `.env`, tokens ou fichiers privés dans les
    commits.

------------------------------------------------------------------------

# 15. SÉCURITÉ, CONFIDENTIALITÉ ET CONFORMITÉ

-   Protéger les données personnelles et les documents clients.
-   Collecter uniquement les données nécessaires.
-   Prévoir une politique de confidentialité et des mentions légales à
    valider.
-   Prévoir consentement lorsque nécessaire pour les cookies et outils
    d'analyse.
-   Ne pas enregistrer les secrets dans les logs.
-   Limiter les tentatives de formulaires et protéger contre le spam.
-   Valider les fichiers envoyés.
-   Contrôler les URL externes et les redirections.
-   Sécuriser les démonstrations isolées.
-   Ne pas intégrer des sites externes arbitraires dans des iframes sans
    vérifier les risques et restrictions.
-   Prévoir une politique de conservation et suppression des données.
-   Respecter les lois applicables au Maroc et les obligations
    applicables aux clients ciblés. Faire valider les documents
    juridiques par une personne compétente.

------------------------------------------------------------------------

# 16. SEO, ACCESSIBILITÉ ET ANALYTICS

## SEO

-   métadonnées par page ;
-   titres et descriptions ;
-   URLs lisibles ;
-   sitemap ;
-   robots.txt ;
-   Open Graph ;
-   données structurées pertinentes ;
-   pages rapides ;
-   contenu indexable ;
-   images avec textes alternatifs.

## Accessibilité

-   navigation clavier ;
-   focus visible ;
-   contraste ;
-   labels de formulaires ;
-   structure de titres ;
-   alternatives aux médias ;
-   prise en compte de `prefers-reduced-motion`.

## Analytics

Prévoir des événements utiles et respectueux de la vie privée : -
consultation d'une référence ; - lecture d'une vidéo ; - ouverture d'une
démo ; - ajout aux favoris ; - démarrage d'une simulation ; - sauvegarde
d'une simulation ; - envoi d'un brief ; - clic vers WhatsApp.

Ne pas collecter plus de données que nécessaire. Les outils d'analyse et
leur consentement doivent être configurés correctement.

------------------------------------------------------------------------

# 17. PLAN DE DÉVELOPPEMENT ET JALONS

Développer par phases. Chaque phase doit avoir un résultat testable et
une validation.

## Phase 0 --- Audit et fondations

-   inspecter dépôt ;
-   identifier framework ;
-   vérifier Git ;
-   lire les scripts ;
-   identifier les risques ;
-   créer documentation ;
-   créer `CLAUDE.md` ;
-   créer les agents ;
-   créer les skills ;
-   proposer les permissions.

**Validation :** le propriétaire comprend l'architecture et les fichiers
créés. Aucun fichier existant n'a été écrasé.

## Phase 1 --- Design system et prototype UX

-   tokens ;
-   navigation ;
-   accueil ;
-   cartes ;
-   composants ;
-   responsive ;
-   interactions principales.

**Validation :** parcours principal testable sur mobile et desktop.

## Phase 2 --- Catalogue et découverte

-   feed ;
-   catégories ;
-   filtres ;
-   fiches ;
-   médias ;
-   favoris en mode local si backend non prêt.

**Validation :** découverte et exploration fonctionnent avec des données
de démonstration clairement identifiées.

## Phase 3 --- Simulateur Zoé Site Studio

-   parcours guidé ;
-   presets ;
-   configuration ;
-   prévisualisation live ;
-   responsive ;
-   sauvegarde ;
-   génération du brief.

**Validation :** les choix du client modifient réellement l'aperçu et le
récapitulatif.

## Phase 4 --- Services et conversion

-   services ;
-   packs ;
-   formulaires ;
-   demandes ;
-   intégration WhatsApp ;
-   statuts de demande.

**Validation :** une demande arrive de façon fiable dans
l'administration.

## Phase 5 --- Backend et administration

-   Supabase ;
-   Auth ;
-   RLS ;
-   gestion du catalogue ;
-   gestion des médias ;
-   gestion des prompts ;
-   gestion des clients et projets.

**Validation :** tests d'accès positifs et négatifs réussis.

## Phase 6 --- Espace client

-   compte ;
-   favoris ;
-   simulations ;
-   briefs ;
-   commandes ;
-   fichiers.

**Validation :** un client ne peut accéder qu'à ses propres données.

## Phase 7 --- Zoé Experience Lab

-   environnement isolé ;
-   structure de démonstrations ;
-   déploiement preview ;
-   liaison au catalogue ;
-   procédure de validation.

**Validation :** une démonstration indépendante peut être publiée sans
affecter le site principal.

## Phase 8 --- Optimisation et lancement

-   sécurité ;
-   tests ;
-   SEO ;
-   performance ;
-   accessibilité ;
-   sauvegardes ;
-   configuration de production ;
-   validation humaine.

**Validation :** aucune mise en production sans approbation explicite du
propriétaire.

## Phase ultérieure --- IA publique

-   assistant de découverte ;
-   recommandations ;
-   génération de brief ;
-   connexion Claude API côté serveur ;
-   quotas, coûts, journalisation et modération.

Ne pas développer cette phase dans la première livraison.

------------------------------------------------------------------------

# 18. TESTS ET CRITÈRES D'ACCEPTATION

La plateforme ne sera pas considérée comme terminée parce que la page
d'accueil est jolie.

Critères minimaux :

## Parcours public

-   chaque lien fonctionne ;
-   les filtres fonctionnent ;
-   les fiches sont accessibles ;
-   les médias ont un fallback ;
-   le feed ne charge pas toutes les vidéos ;
-   les démos s'ouvrent correctement.

## Simulateur

-   chaque choix met à jour la prévisualisation ;
-   desktop/mobile fonctionnent ;
-   les sections peuvent être ajoutées ou retirées ;
-   la configuration peut être restaurée ;
-   le brief correspond aux choix ;
-   les erreurs sont compréhensibles.

## Conversion

-   formulaires validés côté client et serveur ;
-   messages de confirmation ;
-   prévention du spam ;
-   demande enregistrée ;
-   pas de fausse confirmation si l'enregistrement échoue.

## Administration

-   accès protégé ;
-   création et modification de référence ;
-   publication et archivage ;
-   gestion des médias ;
-   historique des opérations sensibles.

## Sécurité

-   RLS testée ;
-   absence de secrets côté client ;
-   accès inter-comptes refusé ;
-   validation des fichiers ;
-   erreurs serveur sans fuite d'informations.

## Qualité

-   lint ;
-   vérification TypeScript ;
-   tests unitaires pertinents ;
-   tests Playwright des parcours critiques ;
-   test responsive ;
-   contrôle accessibilité ;
-   contrôle performance mobile.

Documenter les tests réellement exécutés et leurs résultats. Ne jamais
écrire « tout est testé » sans preuve.

------------------------------------------------------------------------

# 19. CONTENU INITIAL ET DONNÉES DE DÉMONSTRATION

Créer des données fictives de qualité pour rendre le site vivant dès la
première prévisualisation.

Chaque contenu fictif doit être identifiable comme démonstration et ne
doit pas être présenté comme un vrai client ou un vrai témoignage.

Prévoir au minimum : - 8 à 12 références de sites de démonstration ; -
plusieurs exemples vidéo ; - plusieurs créations graphiques ; - 4
univers principaux ; - des tags variés ; - des exemples de fiches
détaillées ; - des configurations préremplies du simulateur.

Ne pas inventer de faux avis clients, de fausses statistiques
commerciales ou de faux logos de partenaires.

Les visuels temporaires doivent être remplacés par des ressources
autorisées et cohérentes avant le lancement public.

------------------------------------------------------------------------

# 20. LIVRABLES OBLIGATOIRES DE CLAUDE CODE

Au terme des phases concernées, fournir :

1.  Code source propre et organisé.
2.  `CLAUDE.md`.
3.  Cinq agents dans `.claude/agents/`.
4.  Skills dans `.claude/skills/`.
5.  Documentation d'architecture.
6.  Documentation de base de données.
7.  Migrations SQL.
8.  Politiques RLS.
9.  `.env.example`.
10. `.gitignore` vérifié.
11. Guide d'installation.
12. Guide de développement local.
13. Guide de déploiement.
14. Guide de gestion du catalogue.
15. Guide de création d'une démonstration.
16. Rapport de tests.
17. Liste des variables à renseigner par le propriétaire.
18. Liste des permissions et connecteurs nécessaires.
19. Liste des coûts récurrents potentiels, sans souscrire aux services.
20. Liste des éléments restant à valider avant production.

------------------------------------------------------------------------

# 21. FORMAT DES COMPTES RENDUS À CHAQUE PHASE

À la fin de chaque phase, présenter :

### Réalisé

Liste des éléments réellement implémentés.

### Fichiers créés ou modifiés

Chemins exacts et raison.

### Tests

Commandes exécutées et résultats.

### À configurer par le propriétaire

Comptes, variables, permissions ou choix nécessaires.

### Risques et limites

Ce qui n'est pas encore prêt.

### Prochaine phase

Travail suivant et critères de validation.

Ne pas passer à une opération irréversible ou à une mise en production
sans validation du propriétaire.

------------------------------------------------------------------------

# 22. PROMPT DE DÉMARRAGE À EXÉCUTER DANS CLAUDE CODE

Après avoir placé ce document à la racine du dépôt, le propriétaire peut
donner à Claude Code le message suivant :

> Lis intégralement le fichier `ZOÉ_STUDIO_MASTER_BRIEF.md`. Il
> constitue le cahier des charges maître du projet Zoé Studio.
>
> Tu es le directeur technique et le coordinateur du projet. Commence
> par auditer le dépôt existant, son historique Git, son framework, ses
> dépendances et ses scripts. Ne supprime et n'écrase rien.
>
> Présente d'abord ton diagnostic et ton plan. Ensuite, crée les
> fichiers de gouvernance du projet : `CLAUDE.md`, les cinq agents dans
> `.claude/agents/`, les skills dans `.claude/skills/`, ainsi que la
> documentation initiale dans `docs/`.
>
> Les agents doivent être réellement utilisables par Claude Code et
> respecter la syntaxe de la version installée. Vérifie la documentation
> officielle si nécessaire.
>
> Prépare une architecture qui respecte le cahier des charges, en
> particulier la bibliothèque de références, le flux vidéo, le
> simulateur interactif « Zoé Site Studio », l'administration et
> l'environnement isolé « Zoé Experience Lab ».
>
> Je vais aussi te fournir des prompts de création de sites. Traite-les
> comme des briefs supplémentaires à intégrer au laboratoire. Ne te
> limite pas à ces prompts : propose et développe également des concepts
> originaux pour enrichir la bibliothèque, en respectant les droits et
> licences.
>
> L'IA destinée aux visiteurs sera développée plus tard. N'intègre pas
> de dépendance payante à l'API Claude dans la première version.
>
> Travaille phase par phase. Teste chaque fonctionnalité. Documente les
> décisions. Demande confirmation avant les actions destructrices, les
> opérations sur la production, les dépenses, les publications et les
> changements irréversibles.
>
> Pour cette première étape, ne construis pas encore tout le site.
> Termine l'audit, crée les fichiers de gouvernance et les instructions
> des agents, vérifie leur cohérence et donne-moi la liste précise des
> permissions et configurations que je dois fournir.

------------------------------------------------------------------------

# 23. DÉCISIONS À CONSERVER PENDANT TOUT LE PROJET

-   Zoé Studio est un univers digital, pas un simple portfolio.
-   La bibliothèque peut contenir des références externes, mais leur
    provenance et leur statut doivent être explicites.
-   Les prompts du propriétaire sont des ressources, pas une limite
    créative.
-   Claude doit aussi imaginer de nouveaux concepts originaux.
-   Le client doit pouvoir explorer et simuler l'apparence de son futur
    site.
-   Le simulateur doit réellement réagir aux choix du visiteur.
-   La prévisualisation n'est pas automatiquement un site final prêt à
    publier.
-   Les sites de démonstration sont isolés de la plateforme principale.
-   Les agents servent au développement et à la qualité du projet.
-   L'IA publique est reportée après le lancement initial.
-   La sécurité, les droits d'utilisation et les performances sont des
    exigences de base.
-   Le propriétaire garde la décision finale sur les dépenses, les
    publications et la production.

**Résultat recherché :** une plateforme élégante, immersive, rapide,
administrable et évolutive, dans laquelle les visiteurs découvrent des
possibilités digitales, expérimentent leur propre vision et peuvent
confier sa réalisation à Zoé Studio.

**Fin du document maître.**
