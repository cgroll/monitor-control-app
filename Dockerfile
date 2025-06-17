# Build stage
FROM --platform=linux/arm64 node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# ---------------------------------------------------
# Production stage (Using Node.js to serve static files)
# ---------------------------------------------------
FROM --platform=linux/arm64 node:20-alpine AS production

WORKDIR /app

# Install nginx
RUN apk add --no-cache nginx

# Copy build files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration (if you have a custom config)
# COPY nginx.conf /etc/nginx/nginx.conf

# Set production environment
ENV NODE_ENV=production

# Expose port 3000 
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]