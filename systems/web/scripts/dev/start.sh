#!/usr/bin/env bash

set -ex

MODE=${1:---dev}
export WEB_CMS_BASE_URL=${WEB_CMS_BASE_URL:-"http://localhost:4001"}
if [ "$MODE" == "--dev" ]; then
  echo "Start Web frontend in dev mode"
  npx astro dev --host
elif [ "$MODE" == "--test" ]; then
  echo "Start Web frontend in test mode"
  npx astro build
  npx astro preview --host
else
    echo "Invalid argument: $MODE"
    exit 1
fi
