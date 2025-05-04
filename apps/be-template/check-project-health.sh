#!/bin/bash

echo "🚀 Starting Project Health Check..."

# Step 1: Install dependencies
echo "📦 Checking pnpm install..."
pnpm install
if [ $? -ne 0 ]; then
  echo "❌ pnpm install failed!"
  exit 1
fi

# Step 2: Lint
echo "🧹 Running ESLint..."
pnpm lint
if [ $? -ne 0 ]; then
  echo "❌ ESLint failed!"
  exit 1
fi

# Step 3: Format Check
echo "🎨 Checking Prettier formatting..."
pnpm exec prettier --check "src/**/*.{ts,tsx}"
if [ $? -ne 0 ]; then
  echo "❌ Prettier formatting failed!"
  exit 1
fi

# Step 4: Test
echo "🧪 Running Tests with Vitest..."
pnpm test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed!"
  exit 1
fi

# Step 5: Sequelize Migration Validate
echo "🏗️ Validating Sequelize migrations (optional)..."
# You can run any Sequelize CLI db:migrate:status command here if needed

# Step 5: Sequelize Migration Status
echo "🏗️ Checking Sequelize migration status..."
pnpm migrate:status
if [ $? -ne 0 ]; then
  echo "❌ Sequelize migration status check failed!"
  exit 1
fi

echo "✅ Project Health Check PASSED!"
