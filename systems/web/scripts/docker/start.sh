#!/usr/bin/env bash

set -ex

MODE=${1:---dev}

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
