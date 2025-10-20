# Backend – Pokédex App

This is the backend application serving the Pokédex frontend. Built with NestJS and TypeScript, it acts as a proxy for the public PokéAPI and manages user favorites.

## Tech Stack

- NestJS (Framework)  
- TypeScript  
- Axios for HTTP calls to external PokéAPI  
- In‐memory data store for favorites 

## Setup & Run

From `apps/backend` directory:

```bash
npm install
npm run start:dev
```

This starts the NestJS server (default port: 3000).
Ensure your frontend’s VITE_API_URL points here (e.g., http://localhost:3000).

## Available Scripts

- npm run start — start production server
- npm run start:dev — start development server with hot‐reload
- npm run build — build the project for production
- npm run lint — lint code
- npm run test — run tests (if configured)

## Current API Endpoints

| Method | Endpoint         | Description                            | Request Body / Params                     |
| ------ | ---------------- | -------------------------------------- | ----------------------------------------- |
| GET    | `/pokemon`       | Get list of Pokémon (paginated)        | `?limit=` number & `?offset=` number      |
| GET    | `/pokemon/:name` | Get details of a specific Pokémon      | `:name` path parameter                    |
| GET    | `/favorites`     | Get list of favourite Pokémon          | —                                         |
| POST   | `/favorites`     | Add a Pokémon to favourites            | JSON body: `{ id: number, name: string }` |
| DELETE | `/favorites/:id` | Remove a Pokémon from favourites by id | `:id` path parameter                      |


## Running Locally (Quick Start)

Ensure the backend is running: `npm run start:dev`

Go to http://localhost:3000
 and test an endpoint, e.g., http://localhost:3000/pokemon/pikachu

Once verified, start the frontend and interact with the app end‐to‐end