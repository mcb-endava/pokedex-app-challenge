# Frontend – Pokédex App

This is the frontend application of the Pokédex project, built with React, TypeScript, Material UI, Zustand and React Router.

## Tech Stack & Libraries

- React + TypeScript  
- React Router DOM for client‐side routing  
- Zustand for global state
- Material UI (MUI) for UI components  
- Axios for HTTP requests to the backend API  
- Vite as build tool / dev server  

## Setup & Run

From `apps/frontend` directory:

```bash
npm install
npm run dev
```

This will start the development server on http://localhost:5173.

## Available Scripts

- npm run dev — start development server with hot reload

- npm run build — build production‐ready bundle into dist

- npm run preview — preview built bundle locally

- npm run test — (if tests added) run unit/integration tests

- npm run lint — lint code (if configured)

## Folder Structure

```bash
src/
├── components/        # reusable UI components (Card, SearchInput, Layout, etc.)
├── pages/             # page components mapped to routes (PokemonListPage, PokemonDetailPage, FavoritesPage)
├── store/             # Zustand store slices (favourites, list state)
├── services/          # API wrappers (axios instances)
├── theme.ts           # MUI theme configuration
├── App.tsx            # Routes setup
└── main.tsx           # App entry point
```
## Testing & Quality

(pending)
```bash
npm run lint
npm run test
```

## Environment

The frontend currently expects a backend API base URL set via environment variable `VITE_API_URL`.

Example .env file:
```bash
VITE_API_URL=http://localhost:3000
```

