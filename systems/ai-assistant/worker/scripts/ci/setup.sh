#!/usr/bin/env bash

set -e
cd ./worker
npm ci
pip install -U pdm
PDM_CHECK_UPDATE=false pdm install --check --no-editable --frozen-lockfile