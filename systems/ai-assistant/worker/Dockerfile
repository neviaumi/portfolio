# Builder Stage
FROM node:20-slim AS base

WORKDIR /app

COPY ./.dev.vars ./wrangler.toml ./
COPY ./src/ ./src/
COPY ./scripts/docker/ ./scripts/docker/

RUN sh ./scripts/docker/setup.sh
