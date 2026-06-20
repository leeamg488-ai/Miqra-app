# מִקְרָא — Étude Biblique Strong

## Application PWA d'Étude Biblique avec Concordance Strong Hébraïque

### Fonctionnalités implémentées

#### ✅ Version de base
- **Lecture de la Bible** — Genèse 1 et Psaume 23 avec texte complet LSG + KJV + hébreu
- **Recherche de versets** — par mot-clé, numéro Strong ou hébreu
- **Interface simple** — Navigation par livre, chapitre, traduction

#### ✅ Intégration des numéros Strong
- **Cliquer sur un mot** — Chaque mot hébreu est cliquable dans la vue interlinéaire
- **Afficher le numéro Strong** — Popup avec numéro Strong (H1254, H430, etc.)

#### ✅ Lexique hébreu complet
- **Définition** — Définitions exégétiques détaillées
- **Translittération** — Système académique (bārāʾ, ʾĕlōhîm…)
- **Prononciation** — Notation phonétique (aw-dawm', el-o-heem'…)
- **Étymologie** — Racines et dérivations
- Lexique Strong disponible : H1, H2, H3, H120, H127, H216, H430, H776, H1254, H2822, H3068, H4325, H7225, H7307, H8064

#### ✅ Fonctions avancées
- **Recherche par numéro Strong** — Retrouver tous les versets contenant H430 etc.
- **Liens entre mots apparentés** — Chips cliquables (H430 → H410, H433, H3068)
- **Statistiques d'occurrences** — Distribution par livre avec barres visuelles

#### ✅ Mode hors ligne (PWA)
- **Service Worker** — Cache-first strategy
- **manifest.json** — Application installable
- **Données locales** — Tout stocké en JS + localStorage
- **Indicateur de statut** — En ligne / hors ligne dans la sidebar

#### ✅ Fonctions premium
- **Notes personnelles** — Sauvegardées en localStorage
- **Comparaison de traductions** — LSG, KJV, ESV, hébreu, traduction littérale + notes exégétiques
- **Audio** — Interface prête (implémentation avec API audio à brancher)
- **Favoris et surlignage** — 4 couleurs, persistés en localStorage

### Modes de lecture
1. **Interlinéaire** — Texte français + hébreu cliquable sous chaque mot
2. **Parallèle** — Texte français + texte hébreu
3. **Strong** — Vue hébreu uniquement avec numéros Strong visibles

### Structure des fichiers
```
bible-strong/
├── index.html      — Interface principale
├── style.css       — Design (parchment + ink + gold)
├── app.js          — Logique application
├── data.js         — Lexique Strong + textes bibliques
├── manifest.json   — PWA manifest
├── sw.js           — Service Worker offline
└── icons/          — Icônes PWA (à générer)
```

### Pour étendre l'application
- **Ajouter des livres** : Ajouter entrées dans `BIBLE_DATA` dans `data.js`
- **Étendre le lexique** : Ajouter entrées dans `STRONGS_HEBREW`
- **API biblique** : Connecter à api.esv.org ou api.biblia.com pour plus de versets
- **Audio** : Connecter à une API TTS hébraïque ou fichiers .mp3 Strong's

### Installation comme PWA
1. Ouvrir dans Chrome/Safari
2. Menu → "Ajouter à l'écran d'accueil" ou "Installer l'application"
3. L'app fonctionne ensuite hors ligne
