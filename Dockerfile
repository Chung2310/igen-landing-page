# Multi-stage Dockerfile for iGen Technology Landing Page & Admin Dashboard

# --- Phase 1: Build Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json ./
# Copy yarn.lock if exists, ignore error if doesn't
COPY frontend/yarn.loc[k] ./
RUN yarn install
COPY frontend/ ./
RUN yarn build

# --- Phase 2: Build Backend ---
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package.json ./
COPY backend/yarn.loc[k] ./
RUN yarn install
COPY backend/ ./
RUN yarn build
# Install only production dependencies
RUN rm -rf node_modules && yarn install --production

# --- Phase 3: Runner ---
FROM node:20-alpine AS runner
WORKDIR /app/backend
ENV NODE_ENV=production
ENV PORT=5001

# Copy compiled backend
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/package.json ./package.json
COPY --from=backend-builder /app/backend/node_modules ./node_modules

# Copy compiled frontend static files to the expected location
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

EXPOSE 5001
CMD ["node", "dist/server.js"]
