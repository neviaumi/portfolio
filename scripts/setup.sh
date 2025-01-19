#!/bin/bash

set -ex

if [ -z "$CI" ]
then
    echo "Not in CI, installing dependencies with npm install"
    npm install
    npx lerna exec --concurrency 1 --stream -- "test ! -f  scripts/dev/setup.sh || bash \
    scripts/dev/setup.sh"
else
    echo "Run in CI, installing dependencies with npm ci"
    npm ci
    npx lerna exec --concurrency 1 --stream -- "test ! -f  scripts/ci/setup.sh || bash \
    scripts/ci/setup.sh"
fi