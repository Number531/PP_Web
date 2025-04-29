#!/bin/bash

# Create results directory
mkdir -p lighthouse-results

# Define pages to test
PAGES=("" "/about" "/products" "/chat")

# Run Lighthouse for each page
for page in "${PAGES[@]}"; do
  PAGE_NAME=${page//\//-}
  if [ -z "$PAGE_NAME" ]; then
    PAGE_NAME="home"
  else
    # Remove leading dash
    PAGE_NAME=${PAGE_NAME#-}
  fi
  
  echo "Running Lighthouse audit for http://localhost:3001$page"
  
  # Run mobile audit
  lighthouse "http://localhost:3001$page" \
    --output=html,json \
    --output-path="./lighthouse-results/mobile-$PAGE_NAME" \
    --emulated-form-factor=mobile \
    --only-categories=performance,accessibility,best-practices,seo \
    --view
    
  # Run desktop audit
  lighthouse "http://localhost:3001$page" \
    --output=html,json \
    --output-path="./lighthouse-results/desktop-$PAGE_NAME" \
    --emulated-form-factor=desktop \
    --only-categories=performance,accessibility,best-practices,seo
done

echo "Lighthouse audits complete. Results saved in lighthouse-results directory."
