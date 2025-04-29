# Use Node LTS image
FROM node:20

# Create app directory
WORKDIR /app

# Copy only workspace files first
COPY ../../package.json ../../pnpm-workspace.yaml ./
COPY package.json ./apps/backend-template/
RUN npm install -g pnpm
RUN pnpm install --filter backend-template...

# Copy backend source
COPY ./src ./apps/backend-template/src
COPY ./tests ./apps/backend-template/tests
COPY ./tsconfig.json ./apps/backend-template/tsconfig.json
COPY .env ./apps/backend-template/.env

# Set working directory
WORKDIR /app/apps/backend-template

# Build backend
RUN pnpm build

# Expose backend port
EXPOSE 4000

# Command to run app
CMD ["pnpm", "start"]
