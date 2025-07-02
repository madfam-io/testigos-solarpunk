#!/usr/bin/env node

/**
 * Local Lighthouse Testing Script
 * @fileoverview Run Lighthouse audits locally for development
 * @author MADFAM
 * @version 0.5.0
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  // URLs to test
  urls: [
    'http://localhost:4321/testigos-solarpunk/es/',
    'http://localhost:4321/testigos-solarpunk/es/proyecto/',
    'http://localhost:4321/testigos-solarpunk/es/contenido/',
  ],
  // Output directory
  outputDir: './lighthouse-results',
  // Chrome flags
  chromeFlags: ['--headless', '--no-sandbox'],
};

/**
 * Run Lighthouse audit for a single URL
 */
async function runLighthouse(url, chrome) {
  console.log(`🔍 Auditing: ${url}`);
  
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);
  
  // Extract scores
  const { categories } = runnerResult.lhr;
  const scores = {
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    'best-practices': Math.round(categories['best-practices'].score * 100),
    seo: Math.round(categories.seo.score * 100),
  };

  console.log(`📊 Scores for ${url}:`);
  console.log(`   🚀 Performance: ${scores.performance}%`);
  console.log(`   ♿ Accessibility: ${scores.accessibility}%`);
  console.log(`   ✅ Best Practices: ${scores['best-practices']}%`);
  console.log(`   🔍 SEO: ${scores.seo}%`);

  return { url, scores, report: runnerResult.report };
}

/**
 * Save HTML report
 */
function saveReport(url, report, outputDir) {
  const filename = url
    .replace(/https?:\/\//, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const filepath = path.join(outputDir, `${filename}-report.html`);
  fs.writeFileSync(filepath, report);
  console.log(`💾 Report saved: ${filepath}`);
  return filepath;
}

/**
 * Generate summary report
 */
function generateSummary(results, outputDir) {
  let html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lighthouse Summary - Testigos de Solarpunk</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; }
    .header { text-align: center; margin-bottom: 40px; }
    .results { display: grid; gap: 20px; }
    .result-card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
    .url { font-weight: bold; color: #1976d2; margin-bottom: 15px; }
    .scores { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
    .score { padding: 10px; border-radius: 4px; text-align: center; font-weight: bold; }
    .score.excellent { background: #4caf50; color: white; }
    .score.good { background: #8bc34a; color: white; }
    .score.needs-improvement { background: #ff9800; color: white; }
    .score.poor { background: #f44336; color: white; }
    .timestamp { text-align: center; color: #666; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🏄‍♂️ Lighthouse Summary</h1>
    <p>Performance audit results for Testigos de Solarpunk</p>
  </div>
  <div class="results">
`;

  results.forEach(result => {
    const getScoreClass = (score) => {
      if (score >= 90) return 'excellent';
      if (score >= 75) return 'good';
      if (score >= 50) return 'needs-improvement';
      return 'poor';
    };

    html += `
    <div class="result-card">
      <div class="url">${result.url}</div>
      <div class="scores">
        <div class="score ${getScoreClass(result.scores.performance)}">
          🚀 Performance: ${result.scores.performance}%
        </div>
        <div class="score ${getScoreClass(result.scores.accessibility)}">
          ♿ Accessibility: ${result.scores.accessibility}%
        </div>
        <div class="score ${getScoreClass(result.scores['best-practices'])}">
          ✅ Best Practices: ${result.scores['best-practices']}%
        </div>
        <div class="score ${getScoreClass(result.scores.seo)}">
          🔍 SEO: ${result.scores.seo}%
        </div>
      </div>
    </div>`;
  });

  html += `
  </div>
  <div class="timestamp">
    Generated on ${new Date().toLocaleString()}
  </div>
</body>
</html>`;

  const summaryPath = path.join(outputDir, 'summary.html');
  fs.writeFileSync(summaryPath, html);
  console.log(`📋 Summary saved: ${summaryPath}`);
  return summaryPath;
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting Lighthouse local audit...');
  
  // Create output directory
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  // Launch Chrome
  const chrome = await chromeLauncher.launch({ chromeFlags: config.chromeFlags });
  console.log(`✅ Chrome launched on port ${chrome.port}`);

  const results = [];

  try {
    // Run audits
    for (const url of config.urls) {
      const result = await runLighthouse(url, chrome);
      results.push(result);
      
      // Save individual report
      saveReport(url, result.report, config.outputDir);
    }

    // Generate summary
    const summaryPath = generateSummary(results, config.outputDir);
    
    console.log('\n🎉 Lighthouse audit complete!');
    console.log(`📊 View summary: file://${path.resolve(summaryPath)}`);
    
    // Calculate overall scores
    const avgScores = {
      performance: Math.round(results.reduce((sum, r) => sum + r.scores.performance, 0) / results.length),
      accessibility: Math.round(results.reduce((sum, r) => sum + r.scores.accessibility, 0) / results.length),
      'best-practices': Math.round(results.reduce((sum, r) => sum + r.scores['best-practices'], 0) / results.length),
      seo: Math.round(results.reduce((sum, r) => sum + r.scores.seo, 0) / results.length),
    };

    console.log('\n📈 Overall Average Scores:');
    console.log(`   🚀 Performance: ${avgScores.performance}%`);
    console.log(`   ♿ Accessibility: ${avgScores.accessibility}%`);
    console.log(`   ✅ Best Practices: ${avgScores['best-practices']}%`);
    console.log(`   🔍 SEO: ${avgScores.seo}%`);

  } catch (error) {
    console.error('❌ Error running Lighthouse:', error);
  } finally {
    // Close Chrome
    await chrome.kill();
    console.log('🔴 Chrome closed');
  }
}

// Check if server is running
const checkServer = async () => {
  try {
    const response = await fetch('http://localhost:4321/testigos-solarpunk/');
    if (response.ok) {
      return true;
    }
  } catch (error) {
    // Server not running
  }
  return false;
};

// Run the script
(async () => {
  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log('❌ Development server not running!');
    console.log('💡 Start it with: npm run dev');
    console.log('💡 Or run preview with: npm run preview');
    process.exit(1);
  }
  
  await main();
})();