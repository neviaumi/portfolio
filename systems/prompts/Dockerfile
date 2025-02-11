# Builder Stage
FROM node:20-alpine AS base

WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY ./src/ ./src/
COPY ./scripts/docker/ ./scripts/docker/
HEALTHCHECK --interval=32s --timeout=256s --start-period=16s --retries=3 CMD [ "sh", "scripts/docker/health-check.sh" ]

RUN sh ./scripts/docker/setup.sh
