# Authentication Frontend

## Overview
Sampel Authentication Frontend is a Vue 3 + TypeScript single-page application that demonstrates email/password authentication backed by Firebase. complete with responsive Bootstrap styling, client-side form validation, and toast-based feedback. The project is scaffolded with Vite and organized for rapid iteration while keeping the codebase maintainable as the app grows.

## Tech Stack
- **Framework:** Vue 3 with the Composition API and Vite
- **Language:** TypeScript
- **State Management:** Pinia
- **Routing:** Vue Router
- **UI & Styling:** Bootstrap 4, BootstrapVue Next, custom RTL styles, Font Awesome
- **Forms & Validation:** Vee Validate + Zod
- **Notifications:** vue-sonner
- **Authentication:** Firebase Authentication (email/password)
- **Utilities:** js-cookie for token persistence

## Features
- Email/password registration and sign-in backed by Firebase Authentication
- Schema-driven validation with localized error messaging
- Auto-logout timer with cookie-based token persistence
- Route guards that separate guest and authenticated areas
- Toast notifications for success and error flows
- Responsive, RTL-friendly design with reusable form component

## Installation
### Prerequisites
- Node.js **20.19** or **22.12** and above (as defined in `package.json` engines)
- npm v10+

### Setup
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment template, fill in your Firebase project credentials, and rename it to `.env` (or `.env.local`).
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3200` to access the app.

## Environment Variables
Create an `.env` file in the project root with the following keys:
```bash
VITE_FIREBASE_API_KEY="<your-api-key>"
VITE_FIREBASE_AUTH_DOMAIN="<your-auth-domain>"
VITE_FIREBASE_PROJECT_ID="<your-project-id>"
VITE_FIREBASE_STORAGE_BUCKET="<your-storage-bucket>"
VITE_FIREBASE_MESSAGING_SENDER_ID="<your-messaging-sender-id>"
VITE_FIREBASE_APP_ID="<your-app-id>"
```
Firebase will reject requests when these variables are missing or incorrect, so double-check them against your Firebase console.

## Usage
### Running in Development
```bash
npm run dev
```
The command starts Vite on port **3200** with hot module replacement.

### Type Checking and Linting
```bash
npm run type-check
npm run lint
```
`lint` runs both ESLint and Oxlint with auto-fix enabled for supported rules.

### Building for Production
```bash
npm run build
```
The build command performs type checking and outputs static assets to `dist/`. To preview the production build locally, run `npm run preview`.

## Folder Structure
```
.
├── public/                 # Static assets served as-is
├── src/
│   ├── assets/             # Global styles, fonts, and images
│   ├── components/         # Reusable UI components (e.g., AuthForm)
│   ├── firebase/           # Firebase initialization
│   ├── pages/              # Route-level views (Login, Register, Dashboard)
│   ├── router/             # Vue Router configuration and guards
│   ├── schemas/            # Zod schemas and types for forms
│   └── stores/             # Pinia stores (authentication state)
├── eslint.config.ts        # ESLint + Oxlint configuration
├── package.json            # Scripts and dependencies
└── vite.config.ts          # Vite configuration with aliases and dev tools
```

## Available Scripts
- `npm run dev` – Start the Vite development server.
- `npm run build` – Type-check and build the production bundle.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run ESLint and Oxlint with auto-fix.
- `npm run lint:eslint` – Run ESLint only.
- `npm run lint:oxlint` – Run Oxlint only.
- `npm run type-check` – Execute `vue-tsc --build` for strict type checks.
- `npm run format` – Format source files with Prettier.

## Author
- Amin Heidarzadeh
