import { type ManualSection } from "@shared/schema";
import { randomUUID } from "crypto";

// This function parses the manual content and structures it into sections
export function parseManualContent(): ManualSection[] {
  const sections: ManualSection[] = [];

  // CATALOGUE EN LIGNE sections
  sections.push({
    id: randomUUID(),
    title: "Accéder au catalogue en ligne",
    category: "catalogue",
    content: `Pour accéder au catalogue en ligne :
1. Cliquez dans la barre des onglets sur «Bibliothèque»
2. Puis «catalogue en ligne»
3. La page s'affiche automatiquement dans un sous-onglet nommé « Catalogue »`,
  });

  sections.push({
    id: randomUUID(),
    title: "Rechercher un document",
    category: "catalogue",
    subsection: "Catalogue",
    content: `Pour faire une recherche :
1. Entrez un ou plusieurs termes dans la zone de recherche
2. Choisissez dans les options si vous voulez faire une recherche sur tous les mots, expressions exactes ou n'importe quel mot
3. Vous pouvez choisir le type de document
4. Vous pouvez cocher des options pour chercher dans les titres, auteurs, résumés et notes, code-barres, mots-clés, éditeurs, index et cotes
5. Vous pouvez spécifier l'année de publication et ses intervalles ainsi que la langue`,
  });

  sections.push({
    id: randomUUID(),
    title: "Voir les détails d'un document",
    category: "catalogue",
    subsection: "Résultats",
    content: `Pour voir les détails d'un livre :
1. Cliquez sur le bouton « + » sur chaque livre dans les résultats
2. Vous verrez tous les détails du livre
3. Vous pouvez ajouter le livre dans une bibliographie de cours
4. Si le document est électronique, vous pouvez le télécharger (il faut être connecté)
5. Si le document est physique et disponible, vous pouvez le réserver (il faut être connecté)`,
  });

  sections.push({
    id: randomUUID(),
    title: "Gérer les favoris",
    category: "catalogue",
    subsection: "Favoris",
    content: `Pour créer une liste de favoris :
1. Allez dans les détails du livre
2. Cliquez sur l'icône du cœur
3. Le livre sera directement ajouté dans la liste des favoris automatiquement
4. Accédez à vos favoris via le sous-onglet « Favoris »`,
  });

  sections.push({
    id: randomUUID(),
    title: "Consulter vos emprunts",
    category: "catalogue",
    subsection: "Emprunts",
    content: `Dans le sous-onglet « Emprunts », vous pouvez voir :
- Tous vos emprunts actuels avec code-barre, cote, titre
- Date d'emprunt et date de retour
- Les jours restants ou dépassant la date de retour
- Les amendes éventuelles
- Vos téléchargements de documents électroniques`,
  });

  sections.push({
    id: randomUUID(),
    title: "Gérer les réservations",
    category: "catalogue",
    subsection: "Réservations",
    content: `Dans le sous-onglet « Réservations » :
1. Vous pouvez voir le statut de vos réservations
2. Vous pouvez annuler une réservation si nécessaire`,
  });

  // PRÊT DE DOCUMENTS sections
  sections.push({
    id: randomUUID(),
    title: "Accéder au prêt de documents",
    category: "pret",
    content: `Pour accéder au prêt de documents :
1. Cliquez dans la barre des onglets sur «Bibliothèque»
2. Puis «Prêt de documents»
3. La page s'affiche automatiquement`,
  });

  sections.push({
    id: randomUUID(),
    title: "Emprunter un document",
    category: "pret",
    content: `Pour emprunter un document :
1. Scannez ou entrez le matricule de l'emprunteur
2. Cliquez sur « Rechercher »
3. Les informations de l'emprunteur s'affichent
4. Scannez le code-barre du document
5. Cliquez sur le bouton « Emprunter »
6. Vous pouvez voir les emprunts actuels de l'emprunteur
7. Vous pouvez ensuite enregistrer un autre emprunteur`,
  });

  // RETOUR DE DOCUMENTS sections
  sections.push({
    id: randomUUID(),
    title: "Accéder au retour de documents",
    category: "retour",
    content: `Pour accéder au retour de documents :
1. Cliquez dans la barre des onglets sur «Bibliothèque»
2. Puis «Retour de documents»
3. La page s'affiche automatiquement`,
  });

  sections.push({
    id: randomUUID(),
    title: "Retourner un document",
    category: "retour",
    content: `Pour retourner un document :
1. Scannez le code-barre du document
2. Cliquez sur le bouton « Retourner »
3. Vous verrez le document retourné
4. Les réservations actuelles s'affichent si applicable
5. Les autres emprunts actuels du lecteur sont visibles
6. Vous pouvez voir tout le rapport du lecteur en cliquant sur le bouton de son nom`,
  });

  // CATALOGAGE sections
  sections.push({
    id: randomUUID(),
    title: "Créer une nouvelle notice",
    category: "catalogage",
    subsection: "Nouvelle Notice",
    content: `Pour créer une nouvelle notice :
1. Cliquez sur «Bibliothèque» > «Catalogage» > «Nouvelle Notice»
2. Entrez le titre ou l'ISBN du document
3. Cliquez sur « Recherche » pour vérifier s'il existe déjà
4. Le système consulte Google Books, ISBNdb, Goodreads et OpenLibrary automatiquement
5. Si le document existe, vous êtes averti
6. Sinon, vous pouvez copier les informations trouvées ou compléter les vides
7. Vérifiez et corrigez les informations
8. Cliquez sur « Sauvegarder »`,
  });

  sections.push({
    id: randomUUID(),
    title: "Remplir la partie Notice",
    category: "catalogage",
    subsection: "Nouvelle Notice",
    content: `Dans la partie « Notice » :
1. Choisissez le type de document (obligatoire)
2. Complétez le titre monographique ou périodique/revue (obligatoire)
3. Ajoutez le complément ou sous-titre si nécessaire
4. Entrez l'ISBN ou ISSN
5. Ajoutez l'URL de la vignette si disponible`,
  });

  sections.push({
    id: randomUUID(),
    title: "Remplir la partie Autorités",
    category: "catalogage",
    subsection: "Nouvelle Notice",
    content: `Dans la partie « Autorités » :
1. Cherchez d'abord si l'autorité existe dans votre catalogue
2. Si elle existe, cliquez sur son nom pour compléter automatiquement
3. Choisissez le type d'autorité (auteur, traducteur, etc.)
4. La première autorité est la principale et sera utilisée dans l'indexation`,
  });

  sections.push({
    id: randomUUID(),
    title: "Remplir la partie Édition",
    category: "catalogage",
    subsection: "Nouvelle Notice",
    content: `Dans la partie « Édition » :
1. Cherchez si l'éditeur existe dans votre catalogue
2. Si oui, cliquez sur sa nomination pour compléter automatiquement
3. Entrez l'année de publication (important)
4. Spécifiez la langue de publication et/ou langue originale`,
  });

  sections.push({
    id: randomUUID(),
    title: "Remplir la partie Collation",
    category: "catalogage",
    subsection: "Nouvelle Notice",
    content: `Dans la partie « Collation » :
1. Entrez le nombre de pages (important)
2. Ajoutez les caractéristiques du document (ex: illustration)
3. Indiquez le matériel d'accompagnement (ex: DVD, carte)
4. Spécifiez le format et le prix
5. Ajoutez la ressource en ligne si applicable`,
  });

  sections.push({
    id: randomUUID(),
    title: "Remplir la partie Indexation",
    category: "catalogage",
    subsection: "Nouvelle Notice",
    content: `Dans la partie « Indexation » :
1. Choisissez un index (comme l'index décimal Dewey)
2. Ajoutez des mots-clés pertinents séparés par des points-virgules
3. Assurez-vous que les champs sont complets (au moins un champ)
4. Utilisez le bouton « assistant Dewey » pour voir les classifications d'indexes`,
  });

  sections.push({
    id: randomUUID(),
    title: "Gérer les inventaires",
    category: "catalogage",
    subsection: "Inventaires",
    content: `Pour gérer les inventaires :
1. Allez dans «Bibliothèque» > «Catalogage» > «Inventaires»
2. Choisissez de créer un nouvel inventaire ou consulter un ancien
3. Sélectionnez la bibliothèque et la date
4. Cliquez sur « Démarrer » (le service de prêt sera bloqué)
5. Scannez les documents avec leur code-barre
6. Cliquez sur « Terminer » pour enregistrer
7. Vous pouvez télécharger le rapport d'inventaire`,
  });

  sections.push({
    id: randomUUID(),
    title: "Générer des codes-barres",
    category: "catalogage",
    subsection: "Générateur",
    content: `Pour générer des codes-barres :
1. Allez dans «Bibliothèque» > «Catalogage» > «Générateur de code-barres»
2. Choisissez le numéro de départ
3. Indiquez le nombre de code-barres (max 1000)
4. Choisissez la taille (moyen, petit, grand)
5. Choisissez l'entête
6. Cochez l'option « prévenir les doublons »
7. Affichez d'abord puis imprimez`,
  });

  // DONNÉES sections
  sections.push({
    id: randomUUID(),
    title: "Gérer les notices",
    category: "donnees",
    subsection: "Notices",
    content: `Pour gérer les notices :
1. Allez dans «Bibliothèque» > «Données» > «Notices»
2. Choisissez le type de document à rechercher
3. Déterminez la visibilité OPAC
4. Utilisez le panneau de recherche
5. Cliquez sur « + » pour voir les exemplaires associés
6. Utilisez les trois barres pour voir, modifier ou afficher dans le catalogue
7. Vous pouvez sélectionner plusieurs notices pour imprimer les cotes ou supprimer`,
  });

  sections.push({
    id: randomUUID(),
    title: "Imprimer les cotes",
    category: "donnees",
    subsection: "Notices",
    content: `Pour imprimer les cotes :
1. Sélectionnez les notices désirées
2. Cliquez sur « Imprimer les cotes »
3. Choisissez le nombre de cotes à imprimer
4. Sélectionnez la taille souhaitée
5. Décidez si vous souhaitez ajouter des marges
6. Cliquez sur « Imprimer »`,
  });

  sections.push({
    id: randomUUID(),
    title: "Gérer les exemplaires",
    category: "donnees",
    subsection: "Exemplaires",
    content: `Pour gérer les exemplaires :
1. Allez dans «Bibliothèque» > «Données» > «Exemplaires»
2. Vous pouvez voir, modifier ou supprimer les exemplaires
3. Chaque exemplaire peut être lié à une notice
4. Gérez les exemplaires physiques et électroniques séparément`,
  });

  return sections;
}
