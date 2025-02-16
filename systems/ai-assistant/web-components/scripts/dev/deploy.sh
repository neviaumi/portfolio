#!/usr/bin/env bash

cd ./web-components
npx vite build
npx wrangler pages deploy ./dist