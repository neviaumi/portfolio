#!/usr/bin/env bash

set -ex

node ./resume-to-pdf.js

(cd public && pdflatex -jobname=ast-resume resume.tex)