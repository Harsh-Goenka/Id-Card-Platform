# ---------- Build Stage ----------
FROM node:24-slim AS builder

WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY . .

# ---------- Runtime Stage ----------
FROM node:24-slim

WORKDIR /app

ENV NODE_ENV=production

# Install fonts required by @napi-rs/canvas
RUN apt-get update && apt-get install -y \
    fontconfig \
    fonts-dejavu-core \
 && rm -rf /var/lib/apt/lists/* \
 && fc-cache -fv

# Copy application
COPY --from=builder /app ./

# Create temporary storage directory
RUN mkdir -p storage

EXPOSE 10000

CMD ["npm", "start"]