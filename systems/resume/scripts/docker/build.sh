#!/usr/bin/env bash

set -ex

node ./resume-to-pdf.js
node ./resume-to-latex.js
(cd public && pdflatex -jobname=ats-resume resume.tex)
cp public/resume.pdf ./dist
cp public/resume.tex ./dist
cp public/ats-resume.pdf ./dist