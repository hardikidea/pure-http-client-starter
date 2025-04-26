# 🚀 Final Release Checklist

This checklist must be completed before cutting a new release for **Pure HTTP Client Starter**.

✅ Follow Extreme Programming (XP) quality standards
✅ Protects open-source reputation
✅ Prevents last-minute mistakes

---

# 📋 1. Project Setup Validation

- [ ] Ensure Monorepo folder structure is correct (apps/, packages/, infra/)
- [ ] Ensure `pnpm-workspace.yaml` includes all apps and packages
- [ ] Ensure root `package.json` is private and clean
- [ ] Check `.env` files (`.env.dev`, `.env.stage`, `.env.prod`) exist for frontend/backend
- [ ] Verify `.gitignore` includes `node_modules/`, `dist/`, `coverage/`, etc.

---

# 📋 2. Codebase Quality Checks

- [ ] Run `pnpm install` at root
- [ ] Run `pnpm lint` and ensure no lint errors
- [ ] Run `pnpm exec prettier --check "apps/**/*.ts*" "packages/**/*.ts*"`
- [ ] Run `pnpm test` to ensure all unit tests pass
- [ ] Manually test basic frontend and backend endpoints locally

---

# 📋 3. Git and Branching

- [ ] Ensure all commits follow Conventional Commits
- [ ] Ensure all Pull Requests have semantic PR titles
- [ ] Branch is up-to-date with `main`
- [ ] No large unreviewed PRs pending

---

# 📋 4. Infrastructure Validation (Terraform)

- [ ] Validate Terraform in `infra/dev/`, `infra/stage/`, `infra/prod/`
```bash
cd infra/dev && terraform validate
cd infra/stage && terraform validate
cd infra/prod && terraform validate
