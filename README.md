# Argent Bank - Application Web React

Ce projet est une application web développée avec React et Redux dans le cadre d'une mission réalisée pour le compte d'Argent Bank, une nouvelle banque en ligne.

## Contexte

Argent Bank cherche à se lancer sur le marché avec une plateforme en ligne moderne et fonctionnelle. Le projet se divise en deux phases :

- **Phase 1** : Authentification des utilisateurs – Développement d'une application web permettant aux clients de se connecter, consulter et modifier leur profil.
- **Phase 2** : Conception des spécifications d'API pour la gestion des transactions (actuellement en cours de réflexion).

## Objectifs de la Phase 1

L’application doit permettre les fonctionnalités suivantes :

- L'utilisateur peut visiter la page d’accueil.
- L'utilisateur peut se connecter à son compte.
- L'utilisateur peut se déconnecter.
- L'utilisateur peut consulter les informations de son profil uniquement après s'être connecté avec succès.
- L'utilisateur peut modifier ses informations personnelles, qui seront sauvegardées dans la base de données.

Le HTML statique et le CSS des pages principales (accueil, connexion, profil) sont fournis comme point de départ.

## Stack Technique

- Front-end : React (Vite)
- State management : Redux / Redux Toolkit
- API : Swagger (fournie par l’équipe back-end d’Argent Bank)
- Authentification : via token JWT

## Installation

1. Cloner le projet :
   git clone https://github.com/annis94/Argent-Bank.git
   cd Argent-Bank

   Installer les dépendances :
npm install


Démarrer le projet en mode développement :
npm run dev

## Phase 2 – Conception de l'API des transactions

Cette partie du projet est actuellement en phase de spécification. Elle consistera à concevoir une documentation Swagger décrivant les endpoints nécessaires pour :

- Consulter les transactions par compte et par mois
- Afficher les détails d'une transaction
- Ajouter, modifier ou supprimer une transaction

La documentation devra inclure pour chaque endpoint : la méthode HTTP, la route, la description, les paramètres, les réponses possibles avec leurs codes, le tout au format YAML conforme à Swagger.

