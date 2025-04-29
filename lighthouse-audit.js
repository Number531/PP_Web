const { lighthouse, prepareLabData } = require('lighthouse/core/index.cjs');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

/**
 * Lighthouse Audit Script
 * 
 * This script runs a Lighthouse audit on the specified URLs and saves the results
 * to JSON and HTML files for analysis.
 */

// URLs to audit
const urls = [
  'http://localhost:3001',               // Home page
  'http://localhost:3001/about',         // About page
  'http://localhost:3001/products',      // Products page
  'http://localhost:3001/chat'           // Chat page
];

// Lighthouse configuration
const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
    },
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      disabled: false,
    },
    emulatedUserAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36',
  },
};

// Create results directory if it doesn't exist
const resultsDir = path.join(__dirname, 'lighthouse-results');
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir);
}

// Function to run Lighthouse audit
async function runLighthouse(url) {
  // Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
  });

  // Run Lighthouse
  const options = {
    logLevel: 'info',
    output: 'html',
    port: chrome.port,
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  };

  try {
    const runnerResult = await lighthouse(url, options, lighthouseConfig);

    // Extract page name from URL for filename
    const pageName = url.replace('http://localhost:3001', '').replace(/\//g, '-') || 'home';
    
    // Save results
    const jsonPath = path.join(resultsDir, `lighthouse-${pageName}.json`);
    const htmlPath = path.join(resultsDir, `lighthouse-${pageName}.html`);
    
    fs.writeFileSync(jsonPath, JSON.stringify(runnerResult.lhr, null, 2));
    fs.writeFileSync(htmlPath, runnerResult.report);
    
    // Log scores
    console.log(`\n---- Lighthouse Scores for ${url} ----`);
    console.log(`Performance: ${Math.round(runnerResult.lhr.categories.performance.score * 100)}`);
    console.log(`Accessibility: ${Math.round(runnerResult.lhr.categories.accessibility.score * 100)}`);
    console.log(`Best Practices: ${Math.round(runnerResult.lhr.categories['best-practices'].score * 100)}`);
    console.log(`SEO: ${Math.round(runnerResult.lhr.categories.seo.score * 100)}`);
    
    // Extract key performance metrics
    const metrics = runnerResult.lhr.audits;
    console.log('\nKey Performance Metrics:');
    console.log(`First Contentful Paint: ${metrics['first-contentful-paint'].displayValue}`);
    console.log(`Largest Contentful Paint: ${metrics['largest-contentful-paint'].displayValue}`);
    console.log(`Total Blocking Time: ${metrics['total-blocking-time'].displayValue}`);
    console.log(`Cumulative Layout Shift: ${metrics['cumulative-layout-shift'].displayValue}`);
    
    // Extract SEO issues if any
    const seoAudits = Object.values(runnerResult.lhr.audits)
      .filter(audit => audit.group === 'seo' && audit.score !== 1);
    
    if (seoAudits.length > 0) {
      console.log('\nSEO Issues:');
      seoAudits.forEach(audit => {
        console.log(`- ${audit.title}: ${audit.displayValue || 'Failed'}`);
      });
    }
    
    return runnerResult;
  } catch (error) {
    console.error(`Error running Lighthouse for ${url}:`, error);
  } finally {
    // Close Chrome
    await chrome.kill();
  }
}

// Run Lighthouse for all URLs
async function runAllAudits() {
  console.log('Starting Lighthouse audits...');
  
  for (const url of urls) {
    await runLighthouse(url);
  }
  
  console.log(`\nAll audits complete. Results saved to ${resultsDir}`);
  console.log('To view the reports, open the HTML files in your browser.');
}

runAllAudits();
