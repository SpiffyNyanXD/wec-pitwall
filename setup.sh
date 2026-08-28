#!/usr/bin/env bash
set -euo pipefail

echo "Starting Jules environment setup for WEC Pitwall..."

# 1. Install system dependencies (needed for some Node.js native builds)
echo "Installing system packages..."
sudo apt-get update && sudo apt-get install -y \
  build-essential \
  curl

# 2. Install Node.js dependencies
if [ -f "package.json" ]; then
  echo "Installing Node dependencies..."
  npm install
fi

# 3. Build the project to cache artifacts (speeds up future Jules tasks)
echo "Building project to cache artifacts..."
npm run build

echo "Setup completed successfully."
