#!/usr/bin/env bash

cd ./web-components
VITE_WORKER_BASE_URL=https://ai-assistant-worker.david-ng-dev.workers.dev/ npx vite build
npx wrangler pages deploy --branch main ./dist