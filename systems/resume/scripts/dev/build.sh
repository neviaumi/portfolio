#!/usr/bin/env bash

set -ex

export VITE_IS_TAILORED_RESUME=$VITE_IS_TAILORED_RESUME
export VITE_RESUME_SOURCE=$VITE_RESUME_SOURCE
node ./resume-to-pdf.js
node ./resume-to-latex.js
if [ "$VITE_IS_TAILORED_RESUME" = "true" ]; then
  TAILOR_ID=$(echo "$VITE_RESUME_SOURCE" | awk -F/ '{print $NF}' | sed 's/\.[^.]*$//')
  (cd public && pdflatex -jobname="ats-$TAILOR_ID" "$TAILOR_ID".tex)
else
  (cd public && pdflatex -jobname=ats-resume resume.tex)
fi
