# Manuel Interactif - Catalogue en Ligne

## Vue d'ensemble
Application web interactive qui permet aux utilisateurs de poser des questions sur le manuel d'utilisation du catalogue de bibliothèque et de recevoir des procédures détaillées étape par étape.

## Architecture
- **Frontend**: React avec TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js avec TypeScript
- **IA**: OpenAI GPT-5 pour générer des réponses contextuelles
- **Stockage**: En mémoire (MemStorage)

## Fonctionnalités principales
1. **Assistant Interactif IA**: Chat en temps réel pour poser des questions
2. **Navigation par catégories**: Accès direct aux sections du manuel
3. **Procédures étape par étape**: Affichage formaté des instructions
4. **Thème sombre/clair**: Support complet du mode sombre
5. **Questions suggérées**: Suggestions contextuelles de questions

## Catégories du manuel
- **Catalogue en ligne**: Recherche, favoris, emprunts, réservations
- **Prêt de documents**: Emprunter des documents pour les lecteurs
- **Retour de documents**: Gérer les retours et amendes
- **Catalogage**: Créer des notices, gérer les index
- **Données**: Gérer les notices et exemplaires

## Structure du projet
```
client/src/
  ├── components/     # Composants réutilisables
  ├── pages/         # Pages de l'application
  └── lib/           # Utilitaires

server/
  ├── routes.ts           # Routes API
  ├── storage.ts          # Interface de stockage
  ├── manual-parser.ts    # Parser du manuel
  └── openai-service.ts   # Service OpenAI

shared/
  └── schema.ts      # Schémas et types partagés
```

## Variables d'environnement
- `OPENAI_API_KEY`: Clé API OpenAI (requise)

## Commandes
- `npm run dev`: Démarrer le serveur de développement
- Le serveur tourne sur le port 5000

## Notes techniques
- L'application utilise GPT-5, le modèle OpenAI le plus récent
- Les réponses sont structurées en JSON pour un affichage optimal
- Le contenu du manuel est pré-parsé au démarrage du serveur
- Les conversations sont stockées en mémoire (perdues au redémarrage)

## Dernières modifications
- 2024-10-04: Création de l'application avec interface de chat interactive
- Design professionnel avec système de couleurs cohérent
- Support multilingue en français
