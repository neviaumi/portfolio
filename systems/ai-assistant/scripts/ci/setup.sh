#!/usr/bin/env bash

npm ci
bash ./worker/scripts/ci/setup.sh
bash ./web-components/scripts/ci/setup.sh