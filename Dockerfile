# Multi-stage Dockerfile for iGen Technology Landing Page & Admin Dashboard

# --- Phase 1: Build Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.loc[k] ./
RUN yarn install --frozen-lockfile
COPY frontend/ ./
RUN yarn build

# --- Phase 2: Build Backend ---
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package.json backend/yarn.loc[k] ./
RUN yarn install --frozen-lockfile
COPY backend/ ./
RUN yarn build

# --- Phase 2b: Backend production dependencies (cached riêng, chạy song song) ---
FROM node:20-alpine AS backend-prod-deps
WORKDIR /app/backend
COPY backend/package.json backend/yarn.loc[k] ./
RUN yarn install --production --frozen-lockfile

# --- Phase 3: Runner ---
FROM node:20-alpine AS runner
WORKDIR /app/backend
ENV NODE_ENV=production
ENV PORT=5001

# Copy compiled backend
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/package.json ./package.json
COPY --from=backend-prod-deps /app/backend/node_modules ./node_modules

# Copy compiled frontend static files to the expected location
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Run as non-root user (node user có sẵn trong image chính thức)
USER node

EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:5001/api/v1/health || exit 1

CMD ["node", "dist/server.js"]
