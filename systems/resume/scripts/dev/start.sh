#!/usr/bin/env bash

set -ex

VITE_JSON_RESUME_URL=http://localhost:4321/portfolio/resume.json
curl $VITE_JSON_RESUME_URL -o ./public/resume.json

npx vite dev