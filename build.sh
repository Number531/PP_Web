#!/bin/bash

# Install dependencies with legacy peer deps to handle any remaining conflicts
npm install --legacy-peer-deps

# Build the Next.js application
npm run build

# Success message
echo "Build completed successfully!"
