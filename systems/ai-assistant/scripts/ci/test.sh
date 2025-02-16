#!/bin/bash
set -ex

bash ./worker/scripts/ci/test.sh
bash ./web-components/scripts/ci/test.sh