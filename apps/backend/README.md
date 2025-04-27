

## 🚀 Pure HTTP Client Starter - XP Backend

[![Build Status](https://github.com/hardikidea/pure-http-client-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/hardikidea/pure-http-client-starter/actions)

---

## 📚 Overview

Professional XP style monorepo backend built with:

- Express.js + TypeScript
- Sequelize ORM + PostgreSQL
- Zod validation
- Immer, Lodash utilities
- ESLint, Prettier, Husky, lint-staged
- Sociable Tests (No mocks, only createNull stubs)
- Clean Architecture: App ➔ Routers ➔ Controllers ➔ Services ➔ Repositories
- Health Check Scripts, Makefile, Migrations, Seeders
- GitHub Actions CI/CD
- Fully XP/TDD workflow

---

## 🛠 Tech Stack

| Layer | Technology |
|:------|:-----------|
| Web Framework | Express.js |
| ORM | Sequelize |
| Database | PostgreSQL |
| Validation | Zod |
| Utilities | Immer, Lodash |
| Testing | Vitest, Supertest |
| CI/CD | GitHub Actions |
| Infrastructure | Sequelize Migrations, Seeders |

---

## 🏗 Folder Structure

```
apps/backend/
├── src/
│   ├── app/
│   ├── controllers/
│   ├── routers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── migrations/
│   ├── seeders/
│   ├── exceptions/
│   ├── middleware/
│   ├── utils/
│   ├── validators/
│   └── config/
├── tests/
├── Makefile
├── check-project-health.sh
├── vitest.config.ts
├── tsconfig.json
├── .sequelizerc
├── .env.dev
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Setup Database

Create database `pure_dev` locally in Postgres.

```sql
CREATE DATABASE pure_dev;
```

Run Migrations:

```bash
pnpm migrate
```

Seed demo data:

```bash
pnpm seed:all
```

---

### 3. Run Project Locally

```bash
make dev
```

Access API at:

```
http://localhost:5000
```

---

### 4. Project Health Check

```bash
make health-check
```

✅ Runs install, lint, format, tests, migration status check.

---

### 5. Available Commands (Makefile)

| Command | Purpose |
|:--------|:--------|
| make dev | Start server |
| make lint | Lint code |
| make format | Prettier format check |
| make test | Run unit tests |
| make migrate | Run DB migrations |
| make seed | Seed database |
| make health-check | Run full health verification |

---

## 📚 Documentation

- Sociable Testing without mocks (using createNull)
- Clean Repositories, Services, Controllers pattern
- Exception Handling with BaseException
- Full XP Evolutionary Architecture

---

## 📜 License

MIT License © 2024
```

✅ XP clean
✅ Developer friendly
✅ Open-source ready 🚀

---

# 📚 2️⃣ FINAL GITHUB ACTIONS (CI/CD Workflow)

✅ Create workflow:

📄 `.github/workflows/ci.yml`

```yaml
name: 🛠️ Build, Lint, Test, Health Check

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install pnpm
        run: npm install -g pnpm@8.10.5

      - name: Install Dependencies
        run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Format Check
        run: pnpm format

      - name: Run Tests
        run: pnpm test

      - name: Health Check
        run: bash check-project-health.sh
```

✅ Auto runs on every push and PR.

✅ Lint, Format, Tests, Health check.

✅ XP clean CI/CD 🚀

---

# 📚 OPTIONAL BONUS:

✅ Create GitHub Project Board for XP Kanban tracking:
- TODO
- In Progress
- Done
- Bugs
- Features

✅ Full Agile/Xtreme Programming ready.

---
