#!/usr/bin/env bash

set -e

IS_DEV=${1:---dev}

if [ "$IS_DEV" == "--dev" ]; then
  echo "Start Web frontend in dev mode"
  npx astro dev --host
elif [ "$IS_DEV" == "--test" ]; then
  echo "Start Web frontend in test mode"
  npx astro build
  npx astro preview --host
else
    echo "Invalid argument: $IS_DEV"
    exit 1
fi
