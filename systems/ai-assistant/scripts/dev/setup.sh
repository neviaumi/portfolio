#!/usr/bin/env bash

npm install
bash ./worker/scripts/dev/deploy.sh
bash ./web-components/scripts/dev/deploy.sh