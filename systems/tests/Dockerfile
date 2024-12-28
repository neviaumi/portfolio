# Builder Stage
FROM mcr.microsoft.com/playwright:v1.49.1 AS base

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./playwright.config.ts ./
COPY ./tests ./tests
COPY ./scripts/docker/ ./scripts/docker/


RUN sh ./scripts/docker/setup.sh
