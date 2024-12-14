# Builder Stage
FROM node:20-alpine AS base

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./astro.config.mjs ./
COPY ./src/ ./src/
COPY ./public ./public/
COPY ./scripts/docker/ ./scripts/docker/

RUN sh ./scripts/docker/setup.sh
