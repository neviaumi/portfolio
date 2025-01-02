#!/bin/bash
set -ex

docker compose -f docker-compose.yml -f docker-compose.build.yml up --build \
 --exit-code-from web \
 --abort-on-container-exit