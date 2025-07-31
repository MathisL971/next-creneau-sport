# 🏟️ Loisirs Montréal

**Interface alternative dédiée à la réservation d'espaces sportifs et de loisirs de la Ville de Montréal**

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
- **Data Fetching** : [TanStack Query](https://tanstack.com/query)
- **Theming** : [next-themes](https://github.com/pacocoursey/next-themes)

---

## 🏃‍♂️ **Démarrage rapide**

### **Prérequis**

- Node.js 18+
- pnpm (recommandé) ou npm

### **Installation**

```bash
# Cloner le projet
git clone https://github.com/your-username/next-loisirs-montreal.git
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

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📄 **Licence**

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 🙏 **Remerciements**

- **Ville de Montréal** pour la mise à disposition des données publiques
- **Communauté open source** pour les outils et bibliothèques utilisés
- **Utilisateurs** qui ont signalé les problèmes d'UX de la plateforme officielle

---

## ⚠️ **Disclaimer**

Cette application est **non officielle** et n'est pas affiliée à la Ville de Montréal. Elle utilise les APIs publiques disponibles pour améliorer l'expérience utilisateur. Les réservations officielles doivent toujours être effectuées via les canaux officiels de la Ville de Montréal.

---

**Fait avec ❤️ pour la communauté montréalaise**
