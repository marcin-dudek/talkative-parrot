# AGENTS.md — Talkative Parrot

## Project Overview

**Talkative Parrot** is a Polish word search, crossword, and anagram solver web application. It combines a client-side Single Page Application (SPA) with a Cloudflare Worker backend API.

- **Frontend**: React 19 SPA running in Vite. Heavy dictionary filtering and wildcard searches are delegated to an in-browser Web Worker backed by IndexedDB.
- **Backend**: Cloudflare Worker running Hono, providing a scraping proxy (`/api/definition/:word`) to fetch Polish word definitions from [sjp.pl](https://sjp.pl).

---

## Tech Stack & Environment

- **Package Manager**: [Bun](https://bun.sh/) (`bun@1.3.14`)
- **Frontend**:
  - React 19 (`react`, `react-dom`)
  - TypeScript (strict mode, project references via `tsconfig.json`)
  - Vite 8 with `@vitejs/plugin-react`
  - Tailwind CSS v4 (`@tailwindcss/vite`) & DaisyUI v5 (`daisyui`)
  - Icons: `lucide-react`
  - State Management: `zustand` with `immer` middleware
  - Client Storage: `idb` (IndexedDB wrapper for dictionary caching)
- **Backend / Edge**:
  - Cloudflare Workers with `@cloudflare/vite-plugin` & `wrangler`
  - Web Framework: `hono`
  - HTML Parsing: `cheerio`
- **Dictionary Data**:
  - Pre-generated word lists located in `public/data/{2..15}.json` (words grouped by length 2 to 15).

---

## Repository Structure

```
talkative-parrot/
├── worker/
│   └── index.ts                 # Cloudflare Worker API (Hono app, /api/definition/:word)
├── src/
│   ├── App.tsx                  # Root layout
│   ├── main.tsx                 # Entrypoint
│   ├── index.css                # Tailwind CSS v4 and DaisyUI styling
│   ├── components/
│   │   ├── NavigationMenu.tsx   # Header bar and theme toggle
│   │   ├── Search.tsx           # Search form (prefix, length, letters inputs)
│   │   ├── Words.tsx            # Results table container
│   │   ├── Word.tsx             # Result row item + definition expander
│   │   ├── worker.ts            # Web Worker instantiator
│   │   └── search.worker.ts     # Web Worker logic (IndexedDB caching, regex/prefix matching)
│   └── state/
│       ├── search.ts            # Zustand store for search criteria & validation
│       ├── results.ts           # Zustand store for search results & definitions
│       └── theme.ts             # Theme state (dark/light, persisted in localStorage)
├── public/
│   ├── _headers                 # Cloudflare Pages security & caching headers
│   └── data/                    # Static dictionary JSON files (2.json through 15.json)
├── index.html                   # HTML entry point
├── vite.config.ts               # Vite configuration (Tailwind, React, Cloudflare plugins)
├── wrangler.jsonc               # Cloudflare Worker & asset configuration
└── package.json                 # Dependencies and npm/bun scripts
```

---

## Development & Build Commands

Use **Bun** for all package management and script execution:

| Command | Description |
| :--- | :--- |
| `bun run dev` | Starts the Vite local development server with Cloudflare plugin |
| `bun run build` | Compiles TypeScript (`tsc -b`) and bundles application (`vite build`) |
| `bun run preview` | Builds and runs a local preview of the production build |
| `bun run deploy` | Builds and deploys the worker and static assets via `wrangler deploy` |
| `bun run cf-typegen` | Generates Cloudflare worker environment types (`wrangler types`) |
| `bun run lint` | Runs ESLint across the codebase |

---

## Core Architecture & Patterns

### 1. Dictionary Search via Web Worker (`src/components/search.worker.ts`)
- Dictionary files (`public/data/${length}.json`) are fetched once on demand and cached client-side in IndexedDB (`words-db`, store `words`).
- Searching executes off the main UI thread:
  - **Length**: Filters strictly by word length (2–15).
  - **Prefix / Pattern**: Matches prefix. Dots (`.`) represent single wildcards (e.g. `k.t` -> `kot`, `kat`).
  - **Letters Constraint**: Verifies all characters belong to the permitted letter set.
- All heavy filtering runs in the worker and posts results back to `useResultsStore`.

### 2. SJP Definition Scraping (`worker/index.ts`)
- Route: `GET /api/definition/:word`
- Fetches HTML from `https://sjp.pl/{word}`, extracts clean definitions using `cheerio`, and returns `{ word, definitions: string[] }`.
- In `src/components/Word.tsx`, definitions are fetched lazily when the user clicks the definition button.

### 3. State Management (`src/state/`)
- Zustand stores are decoupled:
  - `search.ts`: Handles input values, regex-based validation (Unicode-aware `\p{L}`), and error messages.
  - `results.ts`: Stores result list, loading/error states, and lazy-loaded definitions using `immer`.
  - `theme.ts`: Manages theme mode with `data-theme` attribute and `localStorage.isDark`.

---

## Guidelines for Agents & Contributors

- **Tooling**: Always use `bun` instead of `npm`/`yarn`/`pnpm` to preserve `bun.lock`.
- **Validation**: After making changes, run `bun run build` to verify that TypeScript compilation and Vite bundling succeed without errors.
- **Off-Thread Processing**: Never move heavy dictionary filtering into React components or the main thread; keep it in `src/components/search.worker.ts`.
- **Unicode Support**: Word validations and regex matching must use Unicode property escapes (`\p{L}`) to properly support Polish diacritics (ą, ć, ę, ł, ń, ó, ś, ź, ż).
