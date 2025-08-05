# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à **CréneauSport** ! Ce guide vous aidera à démarrer rapidement.

## 📋 Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Configuration de l'environnement](#configuration-de-lenvironnement)
- [Processus de développement](#processus-de-développement)
- [Directives de code](#directives-de-code)
- [Signaler un bug](#signaler-un-bug)
- [Proposer une fonctionnalité](#proposer-une-fonctionnalité)
- [Questions](#questions)

## 📜 Code de conduite

En participant à ce projet, vous acceptez de respecter notre [Code de Conduite](CODE_OF_CONDUCT.md). Veuillez le lire avant de contribuer.

## 🚀 Comment contribuer

### Types de contributions recherchées

- 🐛 **Corrections de bugs** : Résolution de problèmes identifiés
- ✨ **Nouvelles fonctionnalités** : Améliorations de l'expérience utilisateur
- 📝 **Documentation** : Amélioration de la documentation existante
- 🎨 **Design/UX** : Améliorations de l'interface utilisateur
- ⚡ **Performance** : Optimisations du code et des performances
- 🧪 **Tests** : Ajout ou amélioration des tests
- 🌐 **Accessibilité** : Améliorations pour l'accessibilité web

### Avant de commencer

1. Consultez les [issues existantes](../../issues) pour voir si votre idée n'a pas déjà été proposée
2. Pour les changements majeurs, ouvrez d'abord une issue pour discuter de votre proposition
3. Assignez-vous l'issue sur laquelle vous souhaitez travailler

## 🛠️ Configuration de l'environnement

### Prérequis

- **Node.js** 18+
- **pnpm** (recommandé) ou npm
- **Git**

### Installation

```bash
# 1. Forkez le repository sur GitHub
# 2. Clonez votre fork
git clone https://github.com/VOTRE-USERNAME/next-creneau-sport.git
cd next-creneau-sport

# 3. Ajoutez le repository original comme remote
git remote add upstream https://github.com/MathisL971/next-creneau-sport.git

# 4. Installez les dépendances
pnpm install

# 5. Lancez le serveur de développement
pnpm dev
```

## 🔄 Processus de développement

### 1. Créer une branche

```bash
# Synchronisez avec la branche principale
git checkout main
git pull upstream main

# Créez une nouvelle branche
git checkout -b type/description-courte
```

**Convention de nommage des branches :**

- `feat/nom-fonctionnalite` : Nouvelle fonctionnalité
- `fix/description-bug` : Correction de bug
- `docs/mise-a-jour` : Mise à jour documentation
- `refactor/composant` : Refactoring
- `style/amelioration-ui` : Améliorations UI/UX
- `perf/optimisation` : Optimisations performance

### 2. Développer

- Respectez les [directives de code](#directives-de-code)
- Testez vos modifications localement
- Vérifiez que le build fonctionne : `pnpm build`
- Utilisez le linter : `pnpm lint`

### 3. Commiter

```bash
# Utilisez des messages de commit clairs et descriptifs
git add .
git commit -m "feat: ajouter filtre par disponibilité des créneaux"
```

**Convention des messages de commit :**

- `feat:` : Nouvelle fonctionnalité
- `fix:` : Correction de bug
- `docs:` : Documentation
- `style:` : Formatage, CSS
- `refactor:` : Refactoring du code
- `perf:` : Amélioration des performances
- `test:` : Ajout de tests

### 4. Soumettre une Pull Request

```bash
# Poussez votre branche
git push origin nom-de-votre-branche
```

1. Allez sur GitHub et créez une Pull Request
2. Remplissez le template de PR avec toutes les informations requises
3. Liez votre PR à l'issue correspondante si applicable
4. Attendez la review et répondez aux commentaires

## 📝 Directives de code

### Style de code

- **TypeScript** : Utilisez TypeScript pour tous les nouveaux fichiers
- **ESLint/Prettier** : Le code doit passer les vérifications ESLint et Prettier
- **Imports** : Organisez les imports par ordre alphabétique et séparez-les par type

```typescript
// Imports externes
import React from 'react';
import { NextPage } from 'next';

// Imports internes
import { Button } from '@/components/ui/button';
import { useFilters } from '@/hooks/useFilters';

// Imports types
import type { TimeSlot } from '@/types/reservation';
```

### Composants React

- Utilisez les **fonction components** avec TypeScript
- Préférez les **hooks** à la place des class components
- Utilisez **React.memo** pour les composants qui rerendent souvent
- Documentez les props complexes avec JSDoc

```typescript
interface ButtonProps {
  /** Le texte affiché sur le bouton */
  children: React.ReactNode;
  /** Variante du bouton */
  variant?: 'primary' | 'secondary';
  /** Fonction appelée au clic */
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
}) => {
  // Implementation
};
```

### Styling

- Utilisez **Tailwind CSS** pour le styling
- Créez des composants réutilisables dans `/src/components/ui/`
- Utilisez le système de thème pour la cohérence

### Tests

- Ajoutez des tests pour les nouvelles fonctionnalités
- Testez les cas limites et les erreurs
- Utilisez des noms de tests descriptifs

## 🐛 Signaler un bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les [issues](../../issues)
2. Utilisez le template d'issue "Bug Report"
3. Incluez :
   - Description claire du problème
   - Étapes pour reproduire
   - Comportement attendu vs observé
   - Captures d'écran si applicable
   - Informations d'environnement (OS, navigateur, etc.)

## ✨ Proposer une fonctionnalité

1. Vérifiez que la fonctionnalité n'a pas déjà été proposée
2. Utilisez le template d'issue "Feature Request"
3. Décrivez :
   - Le problème que résout cette fonctionnalité
   - La solution proposée
   - Les alternatives considérées
   - L'impact sur les utilisateurs existants

## ❓ Questions

- **Issues GitHub** : Pour les questions liées au développement
- **Discussions** : Pour les discussions générales sur le projet

## 🙏 Reconnaissance

Toutes les contributions sont appréciées et seront reconnues dans le projet. Les contributeurs réguliers peuvent être invités à rejoindre l'équipe de maintenance.

---

**Merci de contribuer à améliorer l'accès aux services sportifs pour la communauté montréalaise !** 🏒🏀⚽
