#!/usr/bin/env bash

set -ex

MODE=${1:---dev}

cp ./vite.config.js ./node_modules/@tinacms/app

if [ "$MODE" == "--dev" ]; then
  echo "Start CMS service in dev mode"
  npx tinacms dev
elif [ "$MODE" == "--test" ]; then
  echo "Start CMS service in test mode"
  npx tinacms dev --noWatch
elif [ "$MODE" == "--build" ]; then
  echo "Start CMS service in build mode"
  npx tinacms dev --noWatch
else
    echo "Invalid argument: $MODE"
    exit 1
fi
