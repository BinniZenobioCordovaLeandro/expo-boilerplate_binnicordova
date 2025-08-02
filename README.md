![Expo React Native Boilerplate](./resources/expo-rn-boilerplate_bcordova.gif)

# Expo React Native Boilerplate

Boilerplate created by Binni Cordova  
[@binnicordova](https://github.com/BinniZenobioCordovaLeandro)

---

A production-ready boilerplate for Expo + React Native apps.  
It comes pre-configured with essential tools for development, testing, formatting, and CI/CD.

---

## 🚀 Getting Started

Clone the repo and install dependencies:

```sh
pnpm install
```

### Start the app

```sh
pnpm start        # Production mode
pnpm dev          # Development mode
pnpm preview      # Preview build
```

---

## 📚 Storybook Integration

Use Storybook to build and test UI components in isolation.

```sh
pnpm run storybook         # General
pnpm run storybook:ios     # iOS
pnpm run storybook:android # Android
pnpm run storybook:web     # Web
```

---

## 🧪 Unit Testing

Unit tests focus on business logic.  
CI/CD and pre-commit hooks ensure code is tested before each commit.

```sh
pnpm run test
pnpm run test:coverage
```

---

## 🧹 Code Formatting & Linting

Biome is used for consistent formatting.  
Pre-commit hooks and GitHub Actions enforce style checks.

```sh
pnpm run format
npx lint-staged
```

---

## 📲 QR Preview

Generate a QR code to preview the app in Expo Go:

```sh
pnpm run eas-preview
```

> Install Expo Go from the App Store or Play Store and scan the QR.

---

## 🔄 CI/CD Pipeline

Every push to `main` triggers an EAS build for preview, APK/AAB, and IPA generation.  
Artifacts can be shared with testers or submitted to the stores.

---

## 🔗 Deep Linking

Supports deep linking using Expo Router.

Example commands:

```sh
npx uri-scheme open boilerplate.com://index --android
npx uri-scheme open boilerplate.com://index --ios
```

---

## 🔔 Push Notifications

Configured with `expo-notifications`.

Send push notifications from [expo.dev/notifications](https://expo.dev/notifications)

Example payload:

```json
{
  "to": "ExponentPushToken[xxx]",
  "title": "Hello!",
  "body": "New article available",
  "data": { "url": "https://example.com" }
}
```

---

## ⚙️ Background Tasks

Runs every 15 minutes to fetch new articles and notify users.  
Implemented with `expo-task-manager` and `expo-notifications`.

---

## 🔁 Notification Handling

When a user taps a notification, they're redirected to the article in a WebView.

---

## ✅ Pull Request Template

Located in `.github/pull_request_template.md` to keep PRs clean and consistent.

---

## 🗂 Internal Notes

Tasks and TODOs are tracked using annotations and VSCode’s TODO Tree extension:

[TODO Tree Extension](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

---

## 🏗️ Architecture & Structure

This boilerplate follows a *screaming architecture* approach—organizing files by feature/domain so the code structure immediately reflects app functionality.

```text
src/
├── AppEntry.tsx            # App entrypoint and router init
├── app/                    # Screen components (expo-router)
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── news.tsx
│   └── web.tsx
├── components/             # Reusable UI components (Button, Text, etc.)
│   ├── AppBar/
│   ├── Button/
│   ├── Icon/
│   ├── TabButton/
│   └── Text/
├── constants/              # App-wide constants (routes, strings, storage keys)
├── hooks/                  # Custom React hooks (useNotification, useBackgroundFetch)
├── models/                 # Data models and types (Article, Category)
├── services/               # API and mocks (api.ts, mocks)
├── tasks/                  # Background tasks registration
├── theme/                  # Theming (colors, fonts, spacing)
└── utils/                  # Utility functions (cache, matcher, storage)
```
> For larger component systems, consider design methodologies like **Atomic Design**, organizing your UI into Atoms, Molecules, Organisms, Templates, and Pages for scalable and maintainable component architecture.

This layout makes it clear **what** your app does at a glance, keeping feature files co-located and reducing cross-folder noise.

---

## 🔄 Reset Project (Alternative)

Want to instantly wipe the demo and start from a fresh scaffold? Use the `reset-project` script:

```sh
npm run reset-project
```

This interactive command will archive or remove example files under `project-example/` and generate a clean `src/app/index.tsx` with essential wiring in place.

---

This boilerplate is designed to help you kickstart your next Expo + React Native project with a solid foundation and best practices out of the box.
