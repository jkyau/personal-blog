FROM node:18-alpine

# Install dependencies
RUN apk add --no-cache wget curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

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

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
