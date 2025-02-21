#!/usr/bin/env bash
set -ex


npx astro build
# with preview it throw
# resume-builder-1  | Blocked request. This host ("web") is not allowed.
  #resume-builder-1  | + node ./resume-to-pdf.js
  #resume-builder-1  | To allow this host, add "web" to `preview.allowedHosts` in vite.config.js.
npx astro dev --host