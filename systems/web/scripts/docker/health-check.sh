#!/usr/bin/env bash

set -ex
curl --fail-with-body --request GET \
"${WEB_BASE_URL}/portfolio/healthz"