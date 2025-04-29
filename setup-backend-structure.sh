#!/bin/bash

set -e

echo "Creating backend-template folder structure..."

# Base path
BASE_PATH="pure-http-client-starter/apps/backend-template"

# Create folders
mkdir -p "$BASE_PATH/src/app"
mkdir -p "$BASE_PATH/src/context"
mkdir -p "$BASE_PATH/src/db"
mkdir -p "$BASE_PATH/src/domain/models"
mkdir -p "$BASE_PATH/src/domain/repositories"
mkdir -p "$BASE_PATH/src/services"
mkdir -p "$BASE_PATH/src/controllers"
mkdir -p "$BASE_PATH/src/routes"
mkdir -p "$BASE_PATH/src/middlewares"
mkdir -p "$BASE_PATH/src/shared/bases"
mkdir -p "$BASE_PATH/src/shared/types/express"
mkdir -p "$BASE_PATH/tests/controllers"
mkdir -p "$BASE_PATH/tests/services"
mkdir -p "$BASE_PATH/tests/repositories"
mkdir -p "$BASE_PATH/tests/routes"
mkdir -p "$BASE_PATH/tests/middlewares"

# Create config files (empty placeholders)
touch "$BASE_PATH/package.json"
touch "$BASE_PATH/tsconfig.json"
touch "$BASE_PATH/.env"
touch "$BASE_PATH/Dockerfile"
touch "$BASE_PATH/vitest.config.ts"

echo "✅ Backend-template structure created successfully at $BASE_PATH"
