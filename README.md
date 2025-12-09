# MyMealz


MyMealz is a modern recipe and kitchen management app (Vue 3 + Vite + Express + SQLite). You can manage your recipes, virtual fridge, and meal planning in one place.


## Features (MVP)

- Create, edit, and delete recipes
- Categories, tags, favorites
- Random recipe suggestion
- "Not cooked for a long time" logic
- Local database (SQLite via Express backend)
- Virtual fridge: ingredients, quantities, shelf life
- Suggestions based on available ingredients


## Planned Extensions

- Barcode scanner (camera)
- Push notifications (e.g. shelf life expiring)
- Shopping list
- Cloud sync & user accounts


## Tech Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/) backend (Node.js)
- [SQLite](https://www.sqlite.org/) database (backend/mymealz.db)
- [Axios](https://axios-http.com/) for API calls
- TypeScript


## Development

1. Install all dependencies:
   ```sh
   npm install
   ```
2. Start both backend (Express/SQLite) and frontend (Vite) together:
   ```sh
   npm run dev:full
   ```
   - The backend runs on http://localhost:3001
   - The frontend runs on http://localhost:5173
3. The frontend communicates with the backend via REST API (see `src/services/api.ts`).

**No direct SQLite usage in the frontend anymore!**


## Data Model

See `src/types/index.ts` for all interfaces.


## Database

The SQLite database is located at `backend/mymealz.db` and is managed by the Express backend. You can inspect it with any SQLite client.


## Roadmap

See TODO.md for planned features and phases.

---

**Lizenz:** MIT
