# Builder Stage
FROM node:20-alpine AS base

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json  ./
COPY ./tina/ ./tina/
COPY ./public ./public/
COPY ./scripts/docker/ ./scripts/docker/

RUN sh ./scripts/docker/setup.sh
