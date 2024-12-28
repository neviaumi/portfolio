#!/bin/bash
set -ex

npx eslint .

npx lerna exec --concurrency 1 --stream -- "test ! -f  scripts/ci/test.sh || bash scripts/ci/test.sh"

docker compose -f docker-compose.yml -f docker-compose.test.yml up --build \
 --exit-code-from tests \
 --abort-on-container-exit