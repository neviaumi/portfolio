# Builder Stage
FROM node:20-alpine AS base

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./vite.config.js ./
COPY ./tina/ ./tina/
COPY ./public ./public/
COPY ./scripts/docker/ ./scripts/docker/
HEALTHCHECK --interval=32s --timeout=64s --start-period=16s --retries=3 CMD [ "sh", "scripts/docker/health-check.sh" ]

RUN sh ./scripts/docker/setup.sh
