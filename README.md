# My Watchlist – Application Angular

## Présentation du projet

My Watchlist est une application web développée avec Angular qui permet de gérer une liste personnelle de films, séries, animes et documentaires.

L'utilisateur peut ajouter des œuvres à sa liste, consulter leurs informations, modifier leurs données et suivre leur progression de visionnage.

Ce projet a été réalisé dans le cadre d'un exercice pédagogique visant à mettre en pratique les fonctionnalités modernes d'Angular.

## Fonctionnalités

- Afficher la liste des films, séries, animes et documentaires.
- Ajouter une œuvre à la watchlist.
- Consulter les détails d'une œuvre.
- Modifier les informations d'une œuvre.
- Supprimer une œuvre.
- Modifier son statut :
  - À regarder
  - En cours
  - Terminé
- Afficher des statistiques sur la watchlist.
- Afficher les affiches des œuvres.
- Gérer les états de chargement, les erreurs et les listes vides.
- Valider les formulaires avant leur envoi.

## Technologies utilisées

- **Angular** : framework frontend.
- **TypeScript** : langage de programmation.
- **HTML / CSS** : structure et mise en forme.
- **Angular Signals** : gestion réactive des données.
- **Angular Router** : navigation entre les pages.
- **Reactive Forms** : gestion et validation des formulaires.
- **HttpClient** : communication avec l'API.
- **JSON Server** : simulation d'une API REST.
- **Git / GitHub** : gestion du code source.

## Installation

### 1. Récupérer le projet

```bash
git clone https://github.com/Nour10-c/bookshelf-angular.git
cd bookshelf-angular
```

### 2. Installer les dépendances

```bash
npm install
```

## Lancement du projet

L'application nécessite deux terminaux.

### Terminal 1 – Lancer l'API

```bash
npm run api
```

L'API JSON Server est accessible à l'adresse :

http://localhost:3000/watchlist

### Terminal 2 – Lancer Angular

```bash
npm start
```

L'application est accessible à l'adresse :

http://localhost:4200/

## Architecture et organisation

Le projet est organisé autour de plusieurs composants :

- `media/watchlist` : affichage de la liste et du tableau de bord.
- `media/media-card` : affichage d'une carte représentant une œuvre.
- `media/media-detail` : affichage des détails d'une œuvre.
- `media/media-form` : formulaire de création et de modification.
- `media/media.ts` : définition des modèles et des types.
- `media/media.service.ts` : gestion des données et communication avec l'API.

## Navigation

Les principales routes de l'application sont :

| Route | Description |
|---|---|
| `/` | Affichage de la watchlist |
| `/watchlist/new` | Ajouter une œuvre |
| `/watchlist/:id` | Consulter les détails |
| `/watchlist/:id/edit` | Modifier une œuvre |

## Gestion des données

Les données sont stockées dans le fichier `db.json` et manipulées à travers JSON Server.

Les opérations disponibles sont :

- GET : récupérer les œuvres.
- POST : ajouter une œuvre.
- PATCH : modifier une œuvre ou son statut.
- DELETE : supprimer une œuvre.

## Gestion de l'état avec Angular Signals

Le service utilise des Signals pour gérer la liste des œuvres, l'état de chargement et les erreurs.

Les données sont exposées en lecture seule avec `asReadonly()` et les statistiques sont calculées avec `computed()`.

## Tests et compilation

Pour lancer les tests :

```bash
npm test
```

Pour vérifier la compilation du projet :

```bash
npm run build
```

## Utilisation de l'intelligence artificielle

L'intelligence artificielle a été utilisée comme outil d'assistance pendant le développement du projet.

Elle m'a notamment aidé pour :

- Comprendre certaines fonctionnalités d'Angular, notamment les Signals, les composants Standalone, les formulaires réactifs et le routage.
- Analyser et corriger certaines erreurs de code.
- Améliorer progressivement l'interface utilisateur et la présentation des cartes.
- Préparer et structurer des données d'exemple dans `db.json`, notamment les affiches des œuvres.
- Comprendre certaines commandes Git et organiser l'historique du projet.
- Améliorer la documentation du projet.

L'IA a été utilisée pour obtenir des explications, des pistes de correction et des suggestions. J'ai ensuite intégré et adapté les modifications dans mon projet, puis vérifié le fonctionnement de l'application.

Mon objectif était de mieux comprendre les concepts utilisés et de pouvoir expliquer les choix techniques réalisés.

