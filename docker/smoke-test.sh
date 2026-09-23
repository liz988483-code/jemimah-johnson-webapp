#!/usr/bin/env bash
# Builds the app image and boots it against a throwaway Postgres on an isolated
# bridge network, then checks the container reports healthy and actually serves
# both the API and the frontend. Fully self-contained -- does not touch
# docker-compose.yml, embrace-network, or any container names used in production
# (jemimah-app / jemimah-db), so it's safe to run alongside a real deployment.
set -euo pipefail
cd "$(dirname "$0")/.."

IMAGE_TAG="jemima-smoke-test"
NETWORK="jemima-smoke-net"
DB_CONTAINER="jemima-smoke-db"
APP_CONTAINER="jemima-smoke-app"
DB_PASSWORD="smoke-test-password"
ENCRYPTION_KEY="$(printf '0%.0s' {1..64})" # 64 hex chars = 32 bytes, for AES-256

cleanup() {
  echo "==> Cleaning up smoke test containers"
  docker rm -f "$APP_CONTAINER" "$DB_CONTAINER" >/dev/null 2>&1 || true
  docker network rm "$NETWORK" >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "==> Building image"
docker build -t "$IMAGE_TAG" .

echo "==> Creating throwaway network"
docker network create "$NETWORK" >/dev/null

echo "==> Starting throwaway Postgres"
docker run -d --name "$DB_CONTAINER" --network "$NETWORK" \
  -e POSTGRES_DB=jemimah_johnson \
  -e POSTGRES_USER=jemimah_johnson_user \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  postgres:16-alpine >/dev/null

echo "==> Waiting for Postgres to accept connections"
ready=false
for _ in $(seq 1 30); do
  if docker exec "$DB_CONTAINER" pg_isready -U jemimah_johnson_user -d jemimah_johnson >/dev/null 2>&1; then
    ready=true
    break
  fi
  sleep 2
done
if [ "$ready" != true ]; then
  echo "Postgres never became ready" >&2
  docker logs "$DB_CONTAINER"
  exit 1
fi

echo "==> Starting app container"
docker run -d --name "$APP_CONTAINER" --network "$NETWORK" \
  -e NODE_ENV=production \
  -e DB_HOST="$DB_CONTAINER" \
  -e DB_PORT=5432 \
  -e DB_DIALECT=postgres \
  -e DB_NAME=jemimah_johnson \
  -e DB_USER=jemimah_johnson_user \
  -e DB_PASSWORD="$DB_PASSWORD" \
  -e JWT_SECRET=smoke-test-jwt-secret \
  -e ADMIN_EMAIL=admin@example.com \
  -e ADMIN_PASSWORD=smoke-test-admin-password \
  -e ENCRYPTION_KEY="$ENCRYPTION_KEY" \
  -e CORS_ORIGINS=http://localhost \
  -e FRONTEND_URL=http://localhost \
  "$IMAGE_TAG" >/dev/null

echo "==> Waiting for app container to become healthy"
healthy=false
for _ in $(seq 1 30); do
  status="$(docker inspect -f '{{.State.Health.Status}}' "$APP_CONTAINER" 2>/dev/null || echo unknown)"
  if [ "$status" = "healthy" ]; then
    healthy=true
    break
  fi
  if [ "$status" = "unhealthy" ]; then
    echo "App container reported unhealthy" >&2
    docker logs "$APP_CONTAINER"
    exit 1
  fi
  sleep 3
done
if [ "$healthy" != true ]; then
  echo "App container never became healthy (last status: ${status:-unknown})" >&2
  docker logs "$APP_CONTAINER"
  exit 1
fi

echo "==> Checking /api/health response body"
health_body="$(docker exec "$APP_CONTAINER" wget -qO- http://localhost/api/health)"
echo "$health_body"
echo "$health_body" | grep -q '"success":true' || { echo "Unexpected /api/health body" >&2; exit 1; }

echo "==> Checking the frontend root serves the SPA shell"
root_body="$(docker exec "$APP_CONTAINER" wget -qO- http://localhost/)"
echo "$root_body" | grep -qi '<div id="root"' || { echo "Frontend root did not return expected markup" >&2; exit 1; }

echo "==> Smoke test passed"
