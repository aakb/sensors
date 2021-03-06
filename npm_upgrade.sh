#!/usr/bin/env bash

# Install main modules
rm -rf node_modules
npm install "$@"

# Install plugin dependencies.
for folder in plugins/*; do
  if [ -d $folder ]; then
    cd $folder || exit
    npx npm-check-updates -u
    rm -rf node_modules
    npm install "$@"
    cd ../..
  fi
done
