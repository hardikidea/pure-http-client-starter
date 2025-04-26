#!/bin/bash

echo "🚀 Starting Project Health Check..."

# Step 1: Install Dependencies
echo "📦 Checking pnpm install..."
pnpm install
if [ $? -ne 0 ]; then
  echo "❌ pnpm install failed!"
  exit 1
fi

# Step 2: Run Lint
echo "🧹 Running ESLint..."
pnpm lint
if [ $? -ne 0 ]; then
  echo "❌ ESLint failed!"
  exit 1
fi

# Step 3: Check Formatting (without writing)
echo "🎨 Checking Prettier formatting..."
pnpm exec prettier --check "apps/**/*.ts*" "packages/**/*.ts*" "infra/**/*.tf"
if [ $? -ne 0 ]; then
  echo "❌ Prettier check failed!"
  exit 1
fi

# Step 4: Run Unit Tests
echo "🧪 Running Unit Tests..."
pnpm test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed!"
  exit 1
fi

# Step 5: Terraform Validation (optional)
echo "🏗️ Validating Terraform infra/dev..."
cd infra/dev
terraform validate
if [ $? -ne 0 ]; then
  echo "❌ Terraform infra/dev validation failed!"
  exit 1
fi
cd ../../

echo "✅ Project Health Check PASSED!"
