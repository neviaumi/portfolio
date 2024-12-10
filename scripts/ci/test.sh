#!/bin/bash
set -ex

npx eslint .

npx lerna exec --concurrency 1 --stream -- "test ! -f  scripts/ci/test.sh || bash scripts/ci/test.sh"