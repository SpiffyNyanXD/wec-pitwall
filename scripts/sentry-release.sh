#!/bin/bash

# Install the CLI if not already installed
if ! command -v sentry-cli &> /dev/null; then
  echo "Installing Sentry CLI..."
  curl -sL https://sentry.io/get-cli/ | bash
fi

# Setup configuration values from environment
export SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN:-a06cdeafa8fb3b012ab03d6580652130d60a43d926888e16dec7ae0910a6edf4}
export SENTRY_ORG=${SENTRY_ORG:-anshul-d6}
export SENTRY_PROJECT=${SENTRY_PROJECT:-javascript-react}

# Get version
VERSION=$(sentry-cli releases propose-version)

echo "Creating Sentry release: $VERSION"

# Workflow to create releases
sentry-cli releases new "$VERSION"
sentry-cli releases set-commits "$VERSION" --auto
sentry-cli releases finalize "$VERSION"

echo "✓ Release $VERSION created and finalized in Sentry"
