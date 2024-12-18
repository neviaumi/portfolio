#!/usr/bin/env bash

set -e

cp ./vite.config.js ./node_modules/@tinacms/app
npx tinacms dev
