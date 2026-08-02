# ---- frontend build ----
FROM node:18-alpine AS frontend-build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json tsconfig.node.json vite.config.ts tailwind.config.js postcss.config.js index.html ./
COPY src ./src
COPY admin ./admin
COPY public ./public

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ---- backend build ----
FROM node:18-alpine AS backend-build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY backend ./backend
RUN npm run build:backend

# ---- runtime: nginx + node in one container ----
FROM node:18-alpine AS runtime
RUN apk add --no-cache nginx bash

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5001

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=frontend-build /app/dist /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
CMD ["/entrypoint.sh"]
