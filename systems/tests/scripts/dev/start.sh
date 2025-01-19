#!/usr/bin/env bash

export TESTS_WEB_BASE_URL=${TESTS_WEB_BASE_URL:-"http://localhost:4321"}
export TESTS_CMS_BASE_URL=${TESTS_CMS_BASE_URL:-"http://localhost:4001"}

npx playwright test --ui