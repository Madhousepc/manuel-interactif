#!/usr/bin/env bash
# Force Render à installer aussi les devDependencies
set -ex

# Installe tout (prod + dev)
npm install --include=dev

# Lance le build de ton projet
npm run build
