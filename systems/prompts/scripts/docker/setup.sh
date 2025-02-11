#!/usr/bin/env bash

set -e

apk --no-cache add curl
npm ci --ignore-scripts