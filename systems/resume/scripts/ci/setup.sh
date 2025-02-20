#!/usr/bin/env bash

npm ci
npx tinacms build --local --skip-indexing --skip-cloud-checks
npx playwright install chromium