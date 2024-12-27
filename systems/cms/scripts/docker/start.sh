#!/usr/bin/env bash

set -ex

IS_DEV=${1:---dev}

cp ./vite.config.js ./node_modules/@tinacms/app

if [ "$IS_DEV" == "--dev" ]; then
  echo "Start CMS service in dev mode"
  npx tinacms dev
elif [ "$IS_DEV" == "--test" ]; then
  echo "Start CMS service in test mode"
  npx tinacms dev --noWatch
else
    echo "Invalid argument: $IS_DEV"
    exit 1
fi
