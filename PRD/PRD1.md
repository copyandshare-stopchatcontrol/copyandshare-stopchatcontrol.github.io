Product Requirements Document (PRD) - StopChatControl
1. Aperçu du Produit
Nom du Projet: StopChatControl - Campagne Multilingue
Type: Site Web Statique (HTML, CSS, JavaScript)
Objectif: Sensibiliser à la loi ChatControl 2.0 et faciliter le partage d'informations à travers des cartes interactives 3D.
2. Public Cible
Citoyens de l'Union Européenne
Militants des droits numériques
Personnes intéressées par la protection de la vie privée
Communauté technique et développeurs

3. Fonctionnalités Principales

### 3.1 Navigation Multilingue
- **Sélecteur de langue** :
  - Utilisation de drapeaux Unicode pour une meilleure performance
  - Pas d'images à charger (économie de ressources)
  - Affichage clair et universel
  - Liste des langues avec leurs drapeaux :
    - Français 🇫🇷 (francais.html)
    - English 🇬🇧 (english.html)
    - Deutsch 🇩🇪 (deutsch.html)
    - Español 🇪🇸 (espanol.html)
    - Italiano 🇮🇹 (italiano.html)
    - Polski 🇵🇱 (polski.html)
    - Português 🇵🇹 (portugues.html)


3.2 Fonctionnalité de Copie
Bouton de copie sur chaque 
Feedback visuel lors de la copie
Texte copié au format prêt à partager (incluant les hashtags #StopChatControl #ChatControl #nochatcontrol)

3.3 Design minimaliste et élégant

Chaque page web contient un message avec un bouton copier
et un bouton partager
sur mobile l'utilisateur partage par l'application de son choix
Les liens sont mis en évidence
le texte est copié au format markdown


3.4 Contenu du texte
Message principal sur la loi ChatControl 2.0
Liens vers des sources officielles
Pétitions à signer
Vidéos explicatives
Appels à l'action clairs

4 Données
4.1 types de données utilisés
audio image html css js
rien d'autre
pas de json, pdf ...

4.2 Harchitecture des données
.
├── assets/
│   ├── css/
│   │   ├── main.css              # Styles principaux
│   │   ├── responsive.css        # Design responsive mobile-first
│   │   └── animations.css        # Effets visuels pour feedback
│   ├── js/
│   │   ├── copy.js               # Fonctionnalité de copie avec feedback
│   │   └── share.js              # Boutons de partage
│   ├── img/                      # Images optimisées
│   └── audio/                    # Fichiers audio si besoin
├── deutsch/
│   └── index.html                # Version allemande avec menu en dur
├── english/
│   └── index.html                # Version anglaise avec menu en dur
├── espanol/
│   └── index.html                # Version espagnole avec menu en dur
├── francais/
│   └── index.html                # Version française avec menu en dur
├── italiano/
│   └── index.html                # Version italienne avec menu en dur
├── polski/
│   └── index.html                # Version polonaise avec menu en dur
├── portugues/
│   └── index.html                # Version portugaise avec menu en dur
├── index.html                    # Page d'accueil avec redirection ou choix de langue
├── templates/                    # Modèles pour référence (non utilisés en production)
│   ├── header-template.html      # Exemple d'en-tête à copier dans chaque page
│   └── footer-template.html      # Exemple de pied de page à copier dans chaque page
└── README.md                     # Documentation du projet

5. Spécifications Techniques
5.1 Frontend
HTML5 sémantique
CSS3 avec animations
JavaScript vanilla (pas de dépendances externes)
Design responsive (mobile-first)
Compatibilité cross-browser

5.2 Performance
Temps de chargement < 3 secondes
Images optimisées
Minification des assets en production

6. Éléments d'Interface Utilisateur

### 6.1 En-tête (Header)
- **Design du haut de page** :
  - Bannière pleine largeur avec fond coloré bleu foncé #050325
  - Typographie distinctive pour le titre principal
  - Sous-titre explicatif
  - **Sélecteur de langue avec drapeaux Unicode** :
    - Affichage compact des drapeaux
    - Effet de survol pour indiquer la sélection
    - Menu déroulant avec noms complets des langues
    - Animation fluide à l'ouverture/fermeture
  - Bouton d'appel à l'action principal
  - Design responsive s'adaptant à toutes les tailles d'écran
  - Palette de couleurs cohérente avec l'identité du mouvement
  - Espacement généreux pour une meilleure lisibilité
  - Version mobile : menu hamburger avec les drapeaux alignés verticalement


6.2 Zone Principale
Texte mis en évidance
couleur de font du body #0B084A
couleur de font du markdown bleu clair #7b7cd4
coins de la zone markdown arrondis

liens en importants en gras
couleur des liens non consultés  #0B084A
couleur des liens déjà consultés #ffd500
police texte à chasse fixe Roboto Mono


6.3 Pied de Page
- Couleur de font du pied de page bleu foncé  #050325
Liens vers les sources
Mentions légales
Contact


6.4 4 boutons acompagnant la Navigation

fleche haut pour remonter en haut de page
copier
partager
fleche bas pour descendre en bas de page



7. Plan de Développement
Phase 1: Mise en place
[ ] Structure de base HTML
[ ] Styles CSS principaux
Phase 2: Fonctionnalités
[ ] Système de copie
[ ] Système de partage
Phase 3: Internationalisation
[ ] Traduction du contenu
[ ] Sélecteur de langue
[ ] Vérification des traductions
Phase 4: Optimisation
[ ] Tests de performance
[ ] Correction des bugs
[ ] Optimisation mobile

## 8. Métriques de Succès
- **Système de badges de suivi** :
  - Intégration de https://hitscounter.dev/ pour le suivi des visites
  - Un badge unique par page linguistique
  - Affichage discret en bas de chaque page
  - Pas de JavaScript requis (solution basée sur les images)
  - Compatible avec GitHub Pages
  - Configuration personnalisable pour chaque badge

**Avantages** :
- Solution légère et performante
- Respect de la vie privée (pas de cookies)
- Facile à mettre en œuvre
- Données en temps réel
- Interface utilisateur claire et lisible

**Métriques suivies** :
- Nombre total de visites par page
- Visites uniques
- Graphique de nombre de visites par jour sur https://hitscounter.dev/history?url=lien_de_lapage.com

9. Maintenance
Mise à jour des informations légales
Ajout de nouvelles langues
Maintenance technique régulière
