#!/usr/bin/env bash

set -ex

echo "I am not working due to "

docker compose -f docker-compose.yml -f docker-compose.development.yml up --build