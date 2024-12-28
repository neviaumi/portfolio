#!/usr/bin/env bash

set -ex

IS_DEBUG=${1}

if [ "$IS_DEBUG" == "--debug" ]; then
  tail -f /dev/null 2>&1
else
    npx playwright test
fi



