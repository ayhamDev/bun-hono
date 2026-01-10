# --- Stage 1: Build Stage (Bun) ---
FROM oven/bun:latest AS builder
WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .
# Builds into ./dist/index.js targeting Node.js
RUN bun run build

# --- Stage 2: Runtime Stage (Node.js) ---
FROM node:20-slim AS runner
WORKDIR /app

# Copy ONLY the built files and package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Install only production dependencies in the Node container
# (Required since we marked mongoose/hono-node as external)
RUN npm install --omit=dev

EXPOSE 5444
CMD ["node", "dist/index.js"]