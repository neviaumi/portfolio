#!/usr/bin/env bash

set -ex
curl --fail-with-body -H "Content-Type: application/json" \
  --request POST \
  --data '{"query":"{collections {name}}"}' \
"${CMS_BASE_URL}/graphql"