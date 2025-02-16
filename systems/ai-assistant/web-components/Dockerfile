# Builder Stage
FROM node:20-alpine AS base

WORKDIR /app

COPY ./tsconfig.json ./package.json ./package-lock.json ./wrangler.json ./index.html ./
COPY ./src/ ./src/
COPY ./scripts/docker/ ./scripts/docker/

RUN sh ./scripts/docker/setup.sh
