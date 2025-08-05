# 🏟️ CréneauSport

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/mathis-m/next-loisirs-montreal/actions/workflows/ci.yml/badge.svg)](https://github.com/mathis-m/next-loisirs-montreal/actions/workflows/ci.yml)
[![CodeQL](https://github.com/mathis-m/next-loisirs-montreal/actions/workflows/codeql.yml/badge.svg)](https://github.com/mathis-m/next-loisirs-montreal/actions/workflows/codeql.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Contributors](https://img.shields.io/github/contributors/mathis-m/next-loisirs-montreal.svg)](https://github.com/mathis-m/next-loisirs-montreal/graphs/contributors)

**CréneauSport - Interface alternative dédiée à la réservation d'espaces sportifs et de loisirs de la Ville de Montréal**

Une application web moderne créée pour offrir une expérience utilisateur améliorée par rapport à la plateforme officielle, avec une recherche plus intuitive et une navigation simplifiée.

---

## 🎯 **À propos du projet**

Cette application est une réponse directe aux défis d'utilisabilité de la plateforme officielle de réservation de la Ville de Montréal. Elle utilise les mêmes données officielles mais présente l'information de manière plus accessible et conviviale.

### **Problèmes résolus :**

- Interface complexe et peu intuitive
- Navigation difficile entre les différents services
- Recherche peu efficace
- Expérience utilisateur frustrante

### **Solutions apportées :**

- ✨ Interface moderne et épurée
- 🔍 Recherche avancée avec filtres intuitifs
- 📱 Design responsive pour tous les appareils
- 🎨 Mode sombre/clair adaptatif
- ⚡ Performance optimisée

---

## 🚀 **Fonctionnalités**

- **Recherche intelligente** : Filtrer par sport, arrondissement, et dates
- **Vue tableau optimisée** : Affichage clair des créneaux disponibles
- **Filtres avancés** : Panneau latéral avec options détaillées
- **Interface responsive** : Fonctionne parfaitement sur mobile et desktop
- **Thème adaptatif** : Mode sombre et clair selon vos préférences
- **Navigation intuitive** : UX simplifiée pour une utilisation rapide

---

## 🛠️ **Stack technologique**

- **Framework** : [Next.js 15](https://nextjs.org/) (App Router)
- **Language** : TypeScript
- **Styling** : [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components** : [Radix UI](https://www.radix-ui.com/)
- **Icons** : [Lucide React](https://lucide.dev/)
- **State Management** : [Jotai](https://jotai.org/)
- **Theming** : [next-themes](https://github.com/pacocoursey/next-themes)

---

## 🏃‍♂️ **Démarrage rapide**

### **Prérequis**

- Node.js 18+
- pnpm (recommandé) ou npm

### **Installation**

```bash
# Cloner le projet
git clone https://github.com/mathis-m/next-loisirs-montreal.git
cd next-loisirs-montreal

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### **Scripts disponibles**

```bash
pnpm dev          # Serveur de développement avec Turbopack
pnpm build        # Build de production
pnpm start        # Serveur de production
pnpm lint         # Vérification du code
```

---

## 📖 **Utilisation**

1. **Sélectionner vos critères** : Choisissez un sport, un arrondissement et une ou plusieurs dates
2. **Consulter les résultats** : Les créneaux disponibles s'affichent dans un tableau clair
3. **Affiner votre recherche** : Utilisez les filtres avancés pour préciser vos besoins
4. **Réserver** : Suivez les liens vers la plateforme officielle pour finaliser votre réservation

> **Note** : Cette application facilite la recherche mais les réservations se font toujours via la plateforme officielle de la Ville de Montréal.

---

## 🏗️ **Structure du projet**

```
src/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── ui/               # Composants UI de base
│   ├── time-slots/       # Composants pour les créneaux
│   └── filters/          # Composants de filtrage
├── hooks/                # Hooks personnalisés
├── lib/                  # Utilitaires et configuration
└── types/                # Types TypeScript
```

---

## 🤝 **Contribution**

Les contributions sont les bienvenues ! Ce projet vise à améliorer l'accès aux services municipaux pour tous les Montréalais.

Consultez notre [Guide de Contribution](CONTRIBUTING.md) pour commencer.

### 🚀 Comment contribuer

1. 🍴 [Forkez le projet](../../fork)
2. 🌿 Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. ✨ Committez vos changements (`git commit -m 'feat: add AmazingFeature'`)
4. 📤 Push sur la branche (`git push origin feature/AmazingFeature`)
5. 🔄 Ouvrez une [Pull Request](../../compare)

### 📋 Types de contributions recherchées

- 🐛 **Corrections de bugs**
- ✨ **Nouvelles fonctionnalités**
- 📝 **Améliorations de documentation**
- 🎨 **Améliorations UI/UX**
- ⚡ **Optimisations de performance**
- 🌐 **Améliorations d'accessibilité**

### 📖 Ressources pour les contributeurs

- [Guide de Contribution](CONTRIBUTING.md)
- [Code de Conduite](CODE_OF_CONDUCT.md)
- [Signaler un Bug](../../issues/new?template=bug_report.yml)
- [Proposer une Fonctionnalité](../../issues/new?template=feature_request.yml)
- [Poser une Question](../../issues/new?template=question.yml)

---

## 🔒 **Sécurité**

Si vous découvrez une vulnérabilité de sécurité, veuillez consulter notre [Politique de Sécurité](SECURITY.md) pour savoir comment la signaler de manière responsable.

---

## 📄 **Licence**

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 **Remerciements**

- **Ville de Montréal** pour la mise à disposition des données publiques
- **Communauté open source** pour les outils et bibliothèques utilisés
- **Contributeurs** qui améliorent continuellement ce projet
- **Utilisateurs** qui signalent les problèmes et proposent des améliorations

## 👥 **Contributeurs**

Merci à toutes les personnes qui contribuent à ce projet !

[![Contributors](https://contrib.rocks/image?repo=mathis-m/next-loisirs-montreal)](https://github.com/mathis-m/next-loisirs-montreal/graphs/contributors)

---

## 📊 **Statistiques du projet**

![GitHub stars](https://img.shields.io/github/stars/mathis-m/next-loisirs-montreal?style=social)
![GitHub forks](https://img.shields.io/github/forks/mathis-m/next-loisirs-montreal?style=social)
![GitHub issues](https://img.shields.io/github/issues/mathis-m/next-loisirs-montreal)
![GitHub pull requests](https://img.shields.io/github/issues-pr/mathis-m/next-loisirs-montreal)

---

## ⚠️ **Disclaimer**

Cette application est **non officielle** et n'est pas affiliée à la Ville de Montréal. Elle utilise les APIs publiques disponibles pour améliorer l'expérience utilisateur. Les réservations officielles doivent toujours être effectuées via les canaux officiels de la Ville de Montréal.

---

**CréneauSport - Fait avec ❤️ pour la communauté montréalaise**

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/mathis-m/next-loisirs-montreal)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black.svg)](https://nextjs.org/)
[![Powered by TypeScript](https://img.shields.io/badge/Powered%20by-TypeScript-blue.svg)](https://www.typescriptlang.org/)
