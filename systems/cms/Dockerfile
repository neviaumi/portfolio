# Builder Stage
FROM node:20-alpine AS base

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./vite.config.js ./
COPY ./tina/ ./tina/
COPY ./public ./public/
COPY ./scripts/docker/ ./scripts/docker/
HEALTHCHECK --interval=30s --timeout=60s --start-period=5s --retries=3 CMD [ "sh", "scripts/docker/health-check.sh" ]

RUN sh ./scripts/docker/setup.sh
