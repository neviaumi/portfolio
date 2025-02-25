# Builder Stage
FROM mcr.microsoft.com/playwright:v1.50.1 AS base

WORKDIR /app

COPY ./package.json ./package-lock.json ./index.html ./vite.config.js ./resume-to-pdf.js ./
COPY ./scripts/docker/ ./scripts/docker/
COPY ./public ./public/

RUN sh ./scripts/docker/setup.sh
