#!/usr/bin/env bash

set -ex

docker compose -f docker-compose.yml -f docker-compose.development.yml watch --prune