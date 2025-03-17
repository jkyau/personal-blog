FROM node:18-alpine AS base

# Install system dependencies
RUN apk add --no-cache wget curl openssl openssl-dev

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

FROM base AS development
# Install dependencies
RUN npm install
RUN npm install bcryptjs @types/bcryptjs

# Copy all files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Create necessary directories with proper permissions
RUN mkdir -p /app/.next/cache/webpack/client-development \
    && mkdir -p /app/.next/cache/webpack/server-development \
    && mkdir -p /app/public \
    && chmod -R 777 /app/.next \
    && chmod -R 777 /app/public

# Make start script executable
RUN chmod +x /app/start.sh

# Expose port
EXPOSE 3000

# Start the application
ENTRYPOINT ["/bin/sh", "/app/start.sh"]
