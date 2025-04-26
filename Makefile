# -------------------------------
# Variables
# -------------------------------
FRONTEND_DIR=apps/frontend
BACKEND_DIR=apps/backend
DEV_INFRA_DIR=infra/dev
STAGE_INFRA_DIR=infra/stage
PROD_INFRA_DIR=infra/prod

# -------------------------------
# Start Commands
# -------------------------------

dev:
	cd $(BACKEND_DIR) && export $(grep -v '^#' .env.dev | xargs) && pnpm install && pnpm run dev &
	cd $(FRONTEND_DIR) && export $(grep -v '^#' .env.dev | xargs) && pnpm install && pnpm run dev

stage:
	cd $(BACKEND_DIR) && export $(grep -v '^#' .env.stage | xargs) && pnpm install && pnpm run dev &
	cd $(FRONTEND_DIR) && export $(grep -v '^#' .env.stage | xargs) && pnpm install && pnpm run dev

build-frontend:
	cd $(FRONTEND_DIR) && pnpm build

# -------------------------------
# Developer Tools
# -------------------------------

lint:
	pnpm lint

format:
	pnpm format

test:
	pnpm test

# -------------------------------
# Terraform Infra
# -------------------------------

infra-dev:
	cd $(DEV_INFRA_DIR) && terraform init && terraform apply

infra-stage:
	cd $(STAGE_INFRA_DIR) && terraform init && terraform apply

infra-prod:
	cd $(PROD_INFRA_DIR) && terraform init && terraform apply

# -------------------------------
# Help
# -------------------------------

help:
	@echo "Available targets:"
	@echo "  make dev            Start frontend + backend (dev)"
	@echo "  make stage          Start frontend + backend (stage)"
	@echo "  make build-frontend Build frontend app"
	@echo "  make lint           Run ESLint"
	@echo "  make format         Run Prettier"
	@echo "  make test           Run Vitest"
	@echo "  make infra-dev      Terraform infra for dev"
	@echo "  make infra-stage    Terraform infra for stage"
	@echo "  make infra-prod     Terraform infra for prod"
