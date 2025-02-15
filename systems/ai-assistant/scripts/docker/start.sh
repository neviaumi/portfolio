#!/usr/bin/env bash

set -ex

MODE=${1:---dev}

if [ "$MODE" == "--dev" ]; then
  echo "Start Prompt API in dev mode"
  node ./src/api.js dev
elif [ "$MODE" == "--test" ]; then
  echo "Start Prompt API in test mode"
  node ./src/api.js test
else
    echo "Invalid argument: $MODE"
    exit 1
fi
