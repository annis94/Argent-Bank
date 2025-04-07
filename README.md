# Argent Bank - Application Web React

![Argent Bank Logo](./src/assets/argent-bank-logo.svg)

Ce projet est une application web développée avec React et Redux pour Argent Bank, une nouvelle banque en ligne qui souhaite moderniser ses services.

## 📋 Table des matières

- [Contexte](#contexte)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API Documentation](#api-documentation)
- [Phase 2 - Roadmap](#phase-2---roadmap)

## 🎯 Contexte

Argent Bank est en phase de développement de sa plateforme. Le projet se déroule en deux phases :
- **Phase 1** : Authentification des utilisateurs et gestion des profils
- **Phase 2** : Transactions API (en cours de spécification)

## ✨ Fonctionnalités

### Phase 1 - Authentification
- Page d'accueil publique
- Authentification des utilisateurs
- Gestion du profil utilisateur
  - Consultation des informations
  - Modification des données personnelles
- Déconnexion sécurisée

## 🛠 Technologies utilisées

- **Frontend**:
  - React 18 avec TypeScript
  - Vite comme bundler
  - Redux Toolkit pour la gestion d'état
  - React Router pour la navigation
  - Tailwind CSS pour le styling
  
- **Authentification**:
  - JWT (JSON Web Tokens)

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- npm (version 9 ou supérieure)
- Git

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/annis94/Argent-Bank.git
   cd Argent-Bank
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Variables d'environnement**
   ```bash
   cp .env.example .env
   ```
   Configurez les variables selon votre environnement

## ⚙️ Configuration

1. **Développement**
   ```bash
   npm run dev
   ```
   L'application sera disponible sur `http://localhost:5173`

2. **Production**
   ```bash
   npm run build
   npm run preview
   ```

## 💻 Utilisation

1. **Accès à l'application**
   - Ouvrez votre navigateur
   - Accédez à `http://localhost:5173`

2. **Connexion**
   - Cliquez sur "Sign In"
   - Utilisez vos identifiants
   - Ou utilisez les identifiants de test :
     - Email : `tony@stark.com`
     - Mot de passe : `password123`

3. **Gestion du profil**
   - Accédez à votre profil via le menu
   - Modifiez vos informations personnelles
   - Sauvegardez vos modifications

## 📚 API Documentation

La documentation complète de l'API est disponible dans le fichier `swagger.yaml` à la racine du projet.

## 🚀 Phase 2 - Roadmap

La phase 2 du projet concernera la gestion des transactions :
- Consultation des transactions par compte
- Filtrage par mois
- Détails des transactions
- Gestion (ajout, modification, suppression)

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez notre guide de contribution dans `CONTRIBUTING.md`.

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Phase 2 – Conception de l'API des transactions

Cette partie du projet est actuellement en phase de spécification. Elle consistera à concevoir une documentation Swagger décrivant les endpoints nécessaires pour :

- Consulter les transactions par compte et par mois
- Afficher les détails d'une transaction
- Ajouter, modifier ou supprimer une transaction

La documentation devra inclure pour chaque endpoint : la méthode HTTP, la route, la description, les paramètres, les réponses possibles avec leurs codes, le tout au format YAML conforme à Swagger.

