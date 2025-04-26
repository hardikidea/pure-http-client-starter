

## 🚀 Pure HTTP Client Starter - XP Monorepo


[![Build Status](https://github.com/hardikidea/pure-http-client-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/hardikidea/pure-http-client-starter/actions)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 📚 Overview

Pure HTTP Client Starter is a production-ready, Extreme Programming (XP) style Monorepo designed for rapid development, clean architecture, and high developer experience.

---

## 🛠 Tech Stack

| Layer | Technology |
|:------|:-----------|
| Frontend | Vite + React + TypeScript |
| Backend | Express.js + TypeScript |
| Packages | Shared Types (packages/shared), SDK (packages/pure-http-client-lib) |
| Infra | Terraform (AWS S3 backend, DynamoDB locking) |
| CI/CD | GitHub Actions (Build, Test, Lint, Release) |
| Releases | Semantic Release Automation |
| Dev Tooling | ESLint, Prettier, Husky, lint-staged, commitlint, Vitest |
| Environment Management | .env.dev, .env.stage, .env.prod |
| Monorepo Management | pnpm Workspaces |

---

## 🏗 Monorepo Structure

```bash
apps/
├── frontend/         # Vite React frontend
├── backend/          # Express API server
packages/
├── shared/           # Shared Types
├── pure-http-client-lib/  # HttpClientManager SDK
infra/
├── dev/              # Terraform Dev infra
├── stage/            # Terraform Stage infra
├── prod/             # Terraform Prod infra
.github/
├── workflows/        # CI/CD workflows
```

---

## 🚀 Quick Start

### 1. Clone the Repo

```bash
git clone https://github.com/<your-github-username>/pure-http-client-starter.git
cd pure-http-client-starter
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Health Check

```bash
bash check-project-health.sh
```

✅ Installs deps, runs lint, runs tests, validates terraform.

### 4. Start Local Development (Frontend + Backend)

```bash
make dev
```

- Frontend → `http://localhost:5173`
- Backend → `http://localhost:5000`

---

## 📦 Makefile Scripts

| Command | Purpose |
|:--------|:--------|
| `make dev` | Start frontend and backend (dev mode) |
| `make stage` | Start frontend and backend (stage mode) |
| `make build` | Build frontend, backend, shared, sdk |
| `make lint` | Run ESLint |
| `make format` | Run Prettier |
| `make test` | Run unit tests (Vitest) |
| `make infra-dev` | Terraform apply Dev environment |
| `make infra-stage` | Terraform apply Stage environment |
| `make infra-prod` | Terraform apply Prod environment |

---

## 🌍 Environment Variables

| Location | Purpose |
|:---------|:--------|
| apps/frontend/.env.dev | Frontend API Dev URL |
| apps/frontend/.env.stage | Frontend API Stage URL |
| apps/frontend/.env.prod | Frontend API Production URL |
| apps/backend/.env.dev | Backend Dev Port |
| apps/backend/.env.stage | Backend Stage Port |
| apps/backend/.env.prod | Backend Production Port |

✅ Frontend uses `VITE_API_URL`
✅ Backend uses `PORT`

---

## 📚 Documentation Wiki

📖 Full documentation available on [GitHub Wiki](https://github.com/<your-github-username>/pure-http-client-starter/wiki)

- Setup Guide
- Contribution Guide
- Release Management
- Infrastructure Setup
- Environment Variables

---

## 🛡 Code Quality and Release Automation

| Tool | Purpose |
|:-----|:--------|
| ESLint | Linting TypeScript and React code |
| Prettier | Formatting code |
| Husky | Pre-commit hooks |
| lint-staged | Lint only staged files |
| commitlint | Enforce Conventional Commits |
| Vitest | Unit Testing |
| Semantic Release | Auto version bump, changelog, GitHub Release |

---

## 🏗 Infrastructure (Terraform)

- AWS S3 bucket for remote backend state
- DynamoDB table for state locking
- Dev/Stage/Prod separated infrastructure
- Remote safe backend with version control

```bash
cd infra/dev
terraform init
terraform apply
```

✅ Infrastructure as Code ready.

---

## 🧪 Testing

- Frontend unit tests using Vitest
- Run:

```bash
pnpm test
```

✅ CI will automatically run tests on each PR and Push.

---

## 📦 Release Checklist

Before creating a new release:

- [ ] Run `bash check-project-health.sh`
- [ ] Ensure lint, format, test pass
- [ ] Validate terraform
- [ ] Ensure PR follows Conventional Commit standards
- [ ] Merge to main branch
- [ ] Semantic Release will auto-publish 🚀

✅ Release Checklist also available in `Release-Checklist.md`

---

## 📜 License

MIT License © 2025

---
