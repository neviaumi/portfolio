#!/usr/bin/env bash

set -e

npm ci --ignore-scripts
npx playwright install chromium