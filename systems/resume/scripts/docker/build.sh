#!/usr/bin/env bash

set -ex

curl $VITE_JSON_RESUME_URL -o ./public/resume.json
node ./resume-to-pdf.js