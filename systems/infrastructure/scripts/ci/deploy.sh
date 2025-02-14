#!/usr/bin/env bash

export CF_API_TOKEN=$CF_API_TOKEN
export CF_ACCOUNT_ID=$CF_ACCOUNT_ID
npx cdktf get
npx cdktf deploy --auto-approve