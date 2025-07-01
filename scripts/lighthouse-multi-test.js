#!/usr/bin/env node

/**
 * @fileoverview Multi-dimensional Lighthouse testing for Testigos de Solarpunk
 *
 * Tests all combinations of:
 * - Languages: Spanish (es) and English (en)
 * - Themes: light, dark, auto
 * - Key pages: home, project, content, community
 *
 * Generates comprehensive performance reports for enterprise health validation.
 *
 * @module lighthouse-multi-test
 * @version 0.3.0+testing
 */

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const REPORTS_DIR = path.join(ROOT_DIR, 'lighthouse-reports');

/**
 * Test configuration matrix
 */
const TEST_CONFIG = {
  baseUrl: 'http://localhost:4321/testigos-solarpunk',
  languages: ['es', 'en'],
  themes: ['light', 'dark', 'auto'],
  pages: [
    { path: '', name: 'home' },
    { path: 'proyecto/', name: 'project' },
    { path: 'contenido/', name: 'content' },
    { path: 'contenido/sketches/', name: 'sketches' },
    { path: 'comunidad/', name: 'community' },
  ],
  // Performance budgets - all combinations must meet these
  budgets: {
    performance: 90, // Minimum acceptable (target: 100)
    accessibility: 95, // Minimum acceptable (target: 100)
    bestPractices: 95, // Minimum acceptable (target: 100)
    seo: 95, // Minimum acceptable (target: 100)
    // Web Vitals
    firstContentfulPaint: 1500, // ms
    largestContentfulPaint: 2500, // ms
    cumulativeLayoutShift: 0.1,
    totalBlockingTime: 300, // ms
  },
};

/**
 * ANSI color codes for console output
 */
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

/**
 * Log colored messages to console
 */
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Generate all test combinations
 */
function generateTestMatrix() {
  const combinations = [];

  for (const lang of TEST_CONFIG.languages) {
    for (const theme of TEST_CONFIG.themes) {
      for (const page of TEST_CONFIG.pages) {
        combinations.push({
          id: `${lang}-${theme}-${page.name}`,
          lang,
          theme,
          page: page.name,
          path: page.path,
          url: `${TEST_CONFIG.baseUrl}/${lang}/${page.path}`,
        });
      }
    }
  }

  return combinations;
}

/**
 * Launch Chrome with accessibility and performance flags
 */
async function launchChrome() {
  return chromeLauncher.launch({
    chromeFlags: [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--disable-default-apps',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-features=TranslateUI',
      '--disable-ipc-flooding-protection',
      '--enable-features=NetworkService,NetworkServiceLogging',
      '--force-color-profile=srgb',
      '--metrics-recording-only',
      '--use-mock-keychain',
    ],
  });
}

/**
 * Set theme preference via localStorage
 */
function getThemeScript(theme) {
  return `
    localStorage.setItem('testigos-theme-preference', '${theme}');
    if ('${theme}' !== 'auto') {
      document.documentElement.setAttribute('data-theme', '${theme}');
      document.documentElement.setAttribute('data-theme-selection', '${theme}');
    }
  `;
}

/**
 * Run Lighthouse audit for a specific combination
 */
async function runLighthouseAudit(chrome, testCase) {
  const startTime = Date.now();

  log(`\n🔬 Testing: ${testCase.id}`, 'cyan');
  log(`   URL: ${testCase.url}`, 'blue');
  log(`   Theme: ${testCase.theme}`, 'blue');

  const options = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    // Custom config for theme testing
    extraHeaders: {
      'Accept-Language':
        testCase.lang === 'es' ? 'es-MX,es;q=0.9' : 'en-US,en;q=0.9',
    },
  };

  const config = {
    extends: 'lighthouse:default',
    settings: {
      // Ensure consistent network conditions
      throttlingMethod: 'simulate',
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
      },
      // Run with theme preference
      precomputedLanternData: null,
      // Inject theme setting script
      beforePass: async ({ driver }) => {
        await driver.evaluateAsync(getThemeScript(testCase.theme));
        // Wait for theme to apply
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
    },
  };

  try {
    const result = await lighthouse(testCase.url, options, config);
    const duration = Date.now() - startTime;

    if (!result) {
      throw new Error('Lighthouse returned null result');
    }

    const scores = {
      performance: Math.round(result.lhr.categories.performance.score * 100),
      accessibility: Math.round(
        result.lhr.categories.accessibility.score * 100
      ),
      bestPractices: Math.round(
        result.lhr.categories['best-practices'].score * 100
      ),
      seo: Math.round(result.lhr.categories.seo.score * 100),
    };

    // Extract key metrics
    const metrics = {
      firstContentfulPaint:
        result.lhr.audits['first-contentful-paint']?.numericValue || 0,
      largestContentfulPaint:
        result.lhr.audits['largest-contentful-paint']?.numericValue || 0,
      cumulativeLayoutShift:
        result.lhr.audits['cumulative-layout-shift']?.numericValue || 0,
      totalBlockingTime:
        result.lhr.audits['total-blocking-time']?.numericValue || 0,
      speedIndex: result.lhr.audits['speed-index']?.numericValue || 0,
    };

    // Check if scores meet budgets
    const passesbudgets = {
      performance: scores.performance >= TEST_CONFIG.budgets.performance,
      accessibility: scores.accessibility >= TEST_CONFIG.budgets.accessibility,
      bestPractices: scores.bestPractices >= TEST_CONFIG.budgets.bestPractices,
      seo: scores.seo >= TEST_CONFIG.budgets.seo,
      fcp:
        metrics.firstContentfulPaint <=
        TEST_CONFIG.budgets.firstContentfulPaint,
      lcp:
        metrics.largestContentfulPaint <=
        TEST_CONFIG.budgets.largestContentfulPaint,
      cls:
        metrics.cumulativeLayoutShift <=
        TEST_CONFIG.budgets.cumulativeLayoutShift,
      tbt: metrics.totalBlockingTime <= TEST_CONFIG.budgets.totalBlockingTime,
    };

    const overallPass = Object.values(passesbudgets).every(Boolean);

    // Log results
    const perfColor =
      scores.performance >= 90
        ? 'green'
        : scores.performance >= 70
          ? 'yellow'
          : 'red';
    const a11yColor =
      scores.accessibility >= 95
        ? 'green'
        : scores.accessibility >= 85
          ? 'yellow'
          : 'red';
    const bpColor =
      scores.bestPractices >= 95
        ? 'green'
        : scores.bestPractices >= 85
          ? 'yellow'
          : 'red';
    const seoColor =
      scores.seo >= 95 ? 'green' : scores.seo >= 85 ? 'yellow' : 'red';

    log(`   📊 Performance: ${scores.performance}`, perfColor);
    log(`   ♿ Accessibility: ${scores.accessibility}`, a11yColor);
    log(`   ✅ Best Practices: ${scores.bestPractices}`, bpColor);
    log(`   🔍 SEO: ${scores.seo}`, seoColor);
    log(`   ⏱️  Duration: ${duration}ms`, 'blue');
    log(
      `   ${overallPass ? '✅ PASS' : '❌ FAIL'}`,
      overallPass ? 'green' : 'red'
    );

    // Save detailed report
    const reportPath = path.join(REPORTS_DIR, `${testCase.id}.json`);
    await fs.writeFile(reportPath, JSON.stringify(result.lhr, null, 2));

    return {
      testCase,
      scores,
      metrics,
      passesbudgets,
      overallPass,
      duration,
      reportPath,
    };
  } catch (error) {
    log(`   ❌ Error: ${error.message}`, 'red');
    return {
      testCase,
      error: error.message,
      overallPass: false,
      duration: Date.now() - startTime,
    };
  }
}

/**
 * Generate HTML summary report
 */
async function generateSummaryReport(results) {
  const totalTests = results.length;
  const passedTests = results.filter((r) => r.overallPass).length;
  const failedTests = totalTests - passedTests;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lighthouse Multi-Dimensional Test Report - Testigos de Solarpunk</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; }
    .header { background: #fff; padding: 2rem; border-radius: 8px; margin-bottom: 2rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .stat-card { background: #fff; padding: 1.5rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .stat-number { font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; }
    .stat-label { color: #666; font-size: 0.9rem; }
    .passed { color: #22c55e; }
    .failed { color: #ef4444; }
    .results-table { background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: 600; }
    .score { font-weight: bold; padding: 0.25rem 0.5rem; border-radius: 4px; color: white; }
    .score-100 { background: #22c55e; }
    .score-90 { background: #84cc16; }
    .score-80 { background: #eab308; }
    .score-70 { background: #f97316; }
    .score-low { background: #ef4444; }
    .pass { color: #22c55e; font-weight: bold; }
    .fail { color: #ef4444; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌟 Lighthouse Multi-Dimensional Test Report</h1>
      <p><strong>Testigos de Solarpunk</strong> - Enterprise Health Check</p>
      <p>Generated: ${new Date().toISOString()}</p>
    </div>
    
    <div class="summary">
      <div class="stat-card">
        <div class="stat-number">${totalTests}</div>
        <div class="stat-label">Total Tests</div>
      </div>
      <div class="stat-card">
        <div class="stat-number passed">${passedTests}</div>
        <div class="stat-label">Passed</div>
      </div>
      <div class="stat-card">
        <div class="stat-number failed">${failedTests}</div>
        <div class="stat-label">Failed</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${Math.round((passedTests / totalTests) * 100)}%</div>
        <div class="stat-label">Pass Rate</div>
      </div>
    </div>
    
    <div class="results-table">
      <table>
        <thead>
          <tr>
            <th>Test Case</th>
            <th>Language</th>
            <th>Theme</th>
            <th>Page</th>
            <th>Performance</th>
            <th>Accessibility</th>
            <th>Best Practices</th>
            <th>SEO</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          ${results
            .map((result) => {
              if (result.error) {
                return `
                <tr>
                  <td>${result.testCase.id}</td>
                  <td>${result.testCase.lang.toUpperCase()}</td>
                  <td>${result.testCase.theme}</td>
                  <td>${result.testCase.page}</td>
                  <td colspan="4">Error: ${result.error}</td>
                  <td class="fail">FAIL</td>
                </tr>
              `;
              }

              const getScoreClass = (score) => {
                if (score >= 100) return 'score-100';
                if (score >= 90) return 'score-90';
                if (score >= 80) return 'score-80';
                if (score >= 70) return 'score-70';
                return 'score-low';
              };

              return `
              <tr>
                <td>${result.testCase.id}</td>
                <td>${result.testCase.lang.toUpperCase()}</td>
                <td>${result.testCase.theme}</td>
                <td>${result.testCase.page}</td>
                <td><span class="score ${getScoreClass(result.scores.performance)}">${result.scores.performance}</span></td>
                <td><span class="score ${getScoreClass(result.scores.accessibility)}">${result.scores.accessibility}</span></td>
                <td><span class="score ${getScoreClass(result.scores.bestPractices)}">${result.scores.bestPractices}</span></td>
                <td><span class="score ${getScoreClass(result.scores.seo)}">${result.scores.seo}</span></td>
                <td class="${result.overallPass ? 'pass' : 'fail'}">${result.overallPass ? 'PASS' : 'FAIL'}</td>
              </tr>
            `;
            })
            .join('')}
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>
  `;

  const reportPath = path.join(REPORTS_DIR, 'summary.html');
  await fs.writeFile(reportPath, html);

  return reportPath;
}

/**
 * Main test runner
 */
async function main() {
  log('\n🚀 Starting Multi-Dimensional Lighthouse Testing', 'magenta');
  log('Testing all Language × Theme × Page combinations\n', 'blue');

  // Ensure reports directory exists
  await fs.mkdir(REPORTS_DIR, { recursive: true });

  // Generate test matrix
  const testCases = generateTestMatrix();
  log(`📋 Generated ${testCases.length} test combinations`, 'blue');

  // Launch Chrome
  log('🌐 Launching Chrome...', 'blue');
  const chrome = await launchChrome();

  try {
    const results = [];
    const startTime = Date.now();

    // Run all tests
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      log(
        `\n[${i + 1}/${testCases.length}] Running test: ${testCase.id}`,
        'cyan'
      );

      const result = await runLighthouseAudit(chrome, testCase);
      results.push(result);

      // Brief pause between tests
      if (i < testCases.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    const totalDuration = Date.now() - startTime;

    // Generate summary
    const passedTests = results.filter((r) => r.overallPass).length;
    const failedTests = results.length - passedTests;

    log('\n' + '='.repeat(80), 'blue');
    log('📊 FINAL RESULTS', 'magenta');
    log('='.repeat(80), 'blue');
    log(`Total tests: ${results.length}`);
    log(
      `Passed: ${passedTests}`,
      passedTests === results.length ? 'green' : 'yellow'
    );
    log(`Failed: ${failedTests}`, failedTests === 0 ? 'green' : 'red');
    log(`Pass rate: ${Math.round((passedTests / results.length) * 100)}%`);
    log(`Total duration: ${(totalDuration / 1000).toFixed(2)}s`);

    // Generate summary report
    const summaryPath = await generateSummaryReport(results);
    log(`\n📄 Summary report: ${summaryPath}`, 'green');

    // Save raw results
    const rawResultsPath = path.join(REPORTS_DIR, 'raw-results.json');
    await fs.writeFile(rawResultsPath, JSON.stringify(results, null, 2));
    log(`📄 Raw results: ${rawResultsPath}`, 'blue');

    log('\n✨ Multi-dimensional testing complete!', 'green');

    // Exit with appropriate code
    process.exit(failedTests === 0 ? 0 : 1);
  } finally {
    chrome.kill();
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    log(`\n❌ Fatal error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  });
}
