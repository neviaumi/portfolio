#!/usr/bin/env bash

set -e

npm ci --ignore-scripts
npx playwright install chromium

# Install TeX Live for pdflatex
apt-get update && apt-get install -y \
    texlive-latex-base \
    texlive-fonts-recommended \
    texlive-latex-extra \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
