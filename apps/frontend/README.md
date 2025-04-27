
## 🚀 Pure HTTP Client Starter - XP Frontend

[![Build Status](https://github.com/hardikidea/pure-http-client-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/hardikidea/pure-http-client-starter/actions)

---

## 📚 Overview

Professional XP style frontend project built with:

- Vite + React + TypeScript
- Zod for form validation
- Immer for immutable state updates
- Lodash for utility functions
- ESLint, Prettier, Husky, lint-staged
- Vitest + Testing Library for unit/integration tests
- GitHub Actions CI/CD
- Fully XP/TDD workflow

---

## 🛠 Tech Stack

| Layer | Technology |
|:------|:-----------|
| Frontend Framework | React |
| Bundler | Vite |
| Validation | Zod |
| Utilities | Immer, Lodash |
| Styling | TailwindCSS (optional) |
| Testing | Vitest, @testing-library/react |
| CI/CD | GitHub Actions |

---

## 🏗 Folder Structure

```
apps/frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── routes/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── tests/
├── vitest.config.ts
├── tsconfig.json
├── .env.dev
├── .eslintrc.js
├── .prettierrc
├── index.html
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run Project Locally

```bash
pnpm dev
```

Frontend will be running at:

```
http://localhost:5173
```

---

### 3. Project Health Check

```bash
pnpm lint
pnpm format
pnpm test
```

✅ Lint → Format → Tests → Full health ✅

---

### 4. Available Commands (Package.json)

| Command | Purpose |
|:--------|:--------|
| pnpm dev | Start Vite Dev server |
| pnpm build | Build production frontend |
| pnpm preview | Preview production build |
| pnpm lint | Run ESLint |
| pnpm format | Run Prettier format check |
| pnpm test | Run Vitest unit tests |

---

## 📚 Documentation

- Form validation using Zod
- State management using Immer
- API calls with HttpClientManager SDK (pure-http-client-lib)
- Modular component structure

---

## 📜 License

MIT License © 2024
```

✅ XP Clean.
✅ Developer friendly.
✅ Open-source level professional README.md!

---

# 📚 WHAT YOU SHOULD DO:

✅ Create file:
📄 `apps/frontend/README.md`

✅ Paste the above content ✅

✅ Update `<your-username>` and `<your-repo-name>` properly in badge links.

---

# 📚 BONUS AFTER THIS:

| Task | Purpose |
|:-----|:--------|
| Create check-project-health.sh for frontend | (Optional) |
| Create Makefile for frontend | (Optional) |
| Connect frontend tests into GitHub Actions | (Optional) |

✅ We can make frontend even XP cleaner later.

---
