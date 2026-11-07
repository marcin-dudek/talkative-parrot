# Talkative Parrot 🦜

**Talkative Parrot** is a fast, web-based Polish word search, crossword, and anagram solver. It allows users to quickly find words matching specific lengths, prefix patterns, and available letter sets, complete with on-demand definitions fetched from the Polish dictionary ([SJP.pl](https://sjp.pl)).

---

## Features

- **Instant Offline-First Search**: Static dictionary files (words with lengths 2 to 15) are cached in the browser using IndexedDB and queried via a dedicated Web Worker off the main UI thread.
- **Flexible Pattern Matching**:
  - **Prefix**: Find words starting with specific letters.
  - **Wildcards**: Use dots (`.`) as single-character wildcards (e.g., `k.t` matches *kot*, *kat*).
  - **Letter Constraints**: Restrict matches to a specific pool of permitted letters (ideal for Scrabble, Literaki, or anagram solving).
  - **Full Polish Unicode Support**: Seamlessly handles Polish diacritics (`ą`, `ć`, `ę`, `ł`, `ń`, `ó`, `ś`, `ź`, `ż`).
- **On-Demand Word Definitions**: Definitions are fetched lazily from [SJP.pl](https://sjp.pl) through an edge proxy and displayed directly within the results table.
- **Modern & Responsive UI**: Clean interface built with DaisyUI and Tailwind CSS with automatic and manual light/dark theme toggle.

---

## Architecture & Tech Stack

- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Frontend**:
  - [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
  - [Vite 8](https://vite.dev/) with `@vitejs/plugin-react`
  - [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI v5](https://daisyui.com/)
  - [Zustand](https://zustand.docs.pmnd.rs/) with Immer for state management
  - [idb](https://github.com/jakearchibald/idb) for client-side IndexedDB dictionary caching
  - [Lucide React](https://lucide.dev/) for icons
- **Edge / Backend**:
  - [Cloudflare Workers](https://workers.cloudflare.com/) via `@cloudflare/vite-plugin` and Wrangler
  - [Hono](https://hono.dev/) serverless web framework
  - [Cheerio](https://cheerio.js.org/) for scraping definitions from SJP.pl

---

## Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed:

```bash
bun --version
```

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/talkative-parrot.git
cd talkative-parrot
bun install
```

### Development

Start the local development server (serves the frontend and the Cloudflare Worker API proxy):

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Script | Description |
| :--- | :--- |
| `bun run dev` | Starts the Vite development server with Cloudflare plugin |
| `bun run build` | Type-checks (`tsc -b`) and builds frontend & worker bundles (`vite build`) |
| `bun run preview` | Builds and starts a local preview of the production build |
| `bun run deploy` | Builds and deploys the application to Cloudflare Workers via Wrangler |
| `bun run cf-typegen` | Generates Cloudflare worker environment types (`wrangler types`) |
