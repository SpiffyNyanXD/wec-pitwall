#!/usr/bin/env bash
set -euo pipefail

echo "Starting Jules environment setup for WEC Pitwall..."

# Install exactly the reviewed lockfile. No system-level package mutations.
npm ci --ignore-scripts

# 3. Build the project to cache artifacts (speeds up future Jules tasks)
echo "Building project to cache artifacts..."
npm run build

echo "Setup completed successfully."
