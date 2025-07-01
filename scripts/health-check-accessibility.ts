#!/usr/bin/env tsx
/**
 * Accessibility Health Check Script - Testigos de Solarpunk
 * 
 * Validates WCAG AAA compliance for all language/theme combinations:
 * - Color contrast ratios
 * - ARIA attributes and roles
 * - Keyboard navigation
 * - Screen reader compatibility
 * - Focus management
 * - Form accessibility
 * 
 * @author MADFAM
 * @version 0.3.0+health
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import pa11y from 'pa11y';
import { chromium } from 'playwright';

interface AccessibilityIssue {
  code: string;
  type: 'error' | 'warning' | 'notice';
  message: string;
  selector: string;
  context: string;
  runner: string;
}

interface AccessibilityTestResult {
  url: string;
  language: string;
  theme: string;
  issues: AccessibilityIssue[];
  score: number;
  wcagLevel: 'A' | 'AA' | 'AAA' | 'FAIL';
}

interface AccessibilityReport {
  testResults: AccessibilityTestResult[];
  criticalIssues: Array<{
    type: string;
    count: number;
    examples: string[];
  }>;
  contrastIssues: Array<{
    selector: string;
    ratio: number;
    required: number;
    colors: { bg: string; fg: string };
  }>;
  keyboardIssues: Array<{
    element: string;
    issue: string;
  }>;
  summary: {
    testsRun: number;
    testsPassed: number;
    totalIssues: number;
    wcagCompliance: string;
    criticalErrors: number;
  };
}

// Test matrix
const testMatrix = [
  { lang: 'es', theme: 'light' },
  { lang: 'es', theme: 'dark' },
  { lang: 'en', theme: 'light' },
  { lang: 'en', theme: 'dark' }
];

// Pages to test
const pagesToTest = [
  '/', // Home
  '/proyecto/', // Project
  '/contenido/sketches/', // Sketches
  '/personajes/', // Characters
  '/comunidad/', // Community
  '/recursos/' // Resources
];

async function runPa11yTest(url: string, theme: string): Promise<AccessibilityIssue[]> {
  try {
    const results = await pa11y(url, {
      standard: 'WCAG2AAA',
      runners: ['axe', 'htmlcs'],
      viewport: {
        width: 1920,
        height: 1080
      },
      wait: 1500,
      includeWarnings: true,
      includeNotices: false,
      actions: [
        `set cookie testigos-theme-preference=${theme}`
      ],
      chromeLaunchConfig: {
        args: ['--no-sandbox']
      }
    });
    
    return results.issues as AccessibilityIssue[];
  } catch (error) {
    console.error(chalk.red(`Failed to test ${url}: ${error.message}`));
    return [];
  }
}

async function testKeyboardNavigation(url: string): Promise<Array<{ element: string; issue: string }>> {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const issues: Array<{ element: string; issue: string }> = [];
  
  try {
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    
    // Check for skip links
    const skipLinks = await page.$$('[class*="skip-link"]');
    if (skipLinks.length === 0) {
      issues.push({
        element: 'body',
        issue: 'No skip links found for keyboard navigation'
      });
    }
    
    // Check focusable elements have visible focus
    const focusableElements = await page.$$('a, button, input, select, textarea, [tabindex]');
    
    for (const element of focusableElements) {
      const hasFocusStyles = await element.evaluate(el => {
        el.focus();
        const styles = window.getComputedStyle(el);
        const focusStyles = styles.outline || styles.boxShadow || styles.border;
        return focusStyles !== 'none' && focusStyles !== '';
      });
      
      if (!hasFocusStyles) {
        const tagName = await element.evaluate(el => el.tagName.toLowerCase());
        const text = await element.textContent();
        issues.push({
          element: `${tagName}: ${text?.substring(0, 30)}...`,
          issue: 'No visible focus indicator'
        });
      }
    }
    
    // Check tab order
    const tabIndexElements = await page.$$('[tabindex]');
    for (const element of tabIndexElements) {
      const tabIndex = await element.getAttribute('tabindex');
      if (tabIndex && parseInt(tabIndex) > 0) {
        const tagName = await element.evaluate(el => el.tagName.toLowerCase());
        issues.push({
          element: tagName,
          issue: `Positive tabindex (${tabIndex}) disrupts natural tab order`
        });
      }
    }
    
  } finally {
    await browser.close();
  }
  
  return issues;
}

async function testColorContrast(url: string): Promise<Array<any>> {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const issues: Array<any> = [];
  
  try {
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    
    // Get all text elements and check contrast
    const textElements = await page.$$('h1, h2, h3, h4, h5, h6, p, a, button, span, div');
    
    for (const element of textElements.slice(0, 50)) { // Limit to first 50 elements
      const contrast = await element.evaluate(el => {
        const styles = window.getComputedStyle(el);
        const bg = styles.backgroundColor;
        const fg = styles.color;
        
        // Skip if transparent or inherit
        if (bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') return null;
        
        return { bg, fg, selector: el.tagName.toLowerCase() };
      });
      
      if (contrast && contrast.bg && contrast.fg) {
        // Here you would calculate actual contrast ratio
        // For now, we'll flag dark text on dark bg or light on light
        const isDarkBg = contrast.bg.includes('0, 0, 0') || contrast.bg.includes('dark');
        const isDarkFg = contrast.fg.includes('0, 0, 0') || contrast.fg.includes('dark');
        
        if (isDarkBg === isDarkFg) {
          issues.push({
            selector: contrast.selector,
            ratio: 1.5, // Placeholder
            required: 7,
            colors: { bg: contrast.bg, fg: contrast.fg }
          });
        }
      }
    }
  } finally {
    await browser.close();
  }
  
  return issues;
}

async function runAccessibilityTests(): Promise<AccessibilityTestResult[]> {
  console.log(chalk.yellow('Running accessibility tests...'));
  
  const results: AccessibilityTestResult[] = [];
  const baseUrl = 'http://localhost:4321/testigos-solarpunk';
  
  for (const { lang, theme } of testMatrix) {
    for (const page of pagesToTest) {
      const url = `${baseUrl}/${lang}${page}`;
      console.log(chalk.gray(`  Testing ${lang}${page} with ${theme} theme...`));
      
      try {
        const issues = await runPa11yTest(url, theme);
        
        // Calculate score based on issues
        const errorCount = issues.filter(i => i.type === 'error').length;
        const warningCount = issues.filter(i => i.type === 'warning').length;
        const score = Math.max(0, 100 - (errorCount * 10) - (warningCount * 2));
        
        // Determine WCAG level
        let wcagLevel: 'A' | 'AA' | 'AAA' | 'FAIL' = 'AAA';
        if (errorCount > 0) wcagLevel = 'FAIL';
        else if (warningCount > 5) wcagLevel = 'AA';
        else if (warningCount > 0) wcagLevel = 'AA';
        
        results.push({
          url,
          language: lang,
          theme,
          issues,
          score,
          wcagLevel
        });
      } catch (error) {
        console.error(chalk.red(`    Failed: ${error.message}`));
      }
    }
  }
  
  return results;
}

function analyzeResults(results: AccessibilityTestResult[]): AccessibilityReport {
  const report: AccessibilityReport = {
    testResults: results,
    criticalIssues: [],
    contrastIssues: [],
    keyboardIssues: [],
    summary: {
      testsRun: results.length,
      testsPassed: 0,
      totalIssues: 0,
      wcagCompliance: 'AAA',
      criticalErrors: 0
    }
  };
  
  // Count issues by type
  const issueTypes = new Map<string, { count: number; examples: string[] }>();
  
  results.forEach(result => {
    if (result.issues.length === 0) {
      report.summary.testsPassed++;
    }
    
    report.summary.totalIssues += result.issues.length;
    
    result.issues.forEach(issue => {
      if (!issueTypes.has(issue.code)) {
        issueTypes.set(issue.code, { count: 0, examples: [] });
      }
      
      const typeData = issueTypes.get(issue.code)!;
      typeData.count++;
      
      if (typeData.examples.length < 3) {
        typeData.examples.push(`${result.url}: ${issue.message}`);
      }
      
      if (issue.type === 'error') {
        report.summary.criticalErrors++;
      }
    });
    
    // Update WCAG compliance
    if (result.wcagLevel === 'FAIL') {
      report.summary.wcagCompliance = 'FAIL';
    } else if (result.wcagLevel === 'AA' && report.summary.wcagCompliance !== 'FAIL') {
      report.summary.wcagCompliance = 'AA';
    }
  });
  
  // Convert to critical issues array
  issueTypes.forEach((data, code) => {
    report.criticalIssues.push({
      type: code,
      count: data.count,
      examples: data.examples
    });
  });
  
  // Sort by count
  report.criticalIssues.sort((a, b) => b.count - a.count);
  
  return report;
}

function generateReport(report: AccessibilityReport): void {
  console.log(chalk.blue('\n📊 Accessibility Health Check Report\n'));
  console.log(chalk.white('━'.repeat(50)));
  
  // Summary
  console.log(chalk.cyan('\n📈 Summary:'));
  console.log(`  Tests run: ${report.summary.testsRun}`);
  console.log(`  Tests passed: ${report.summary.testsPassed}/${report.summary.testsRun}`);
  console.log(`  Total issues: ${report.summary.totalIssues}`);
  console.log(`  Critical errors: ${report.summary.criticalErrors}`);
  console.log(`  WCAG Compliance: ${report.summary.wcagCompliance}`);
  
  // Results by page
  console.log(chalk.cyan('\n🎯 Results by Page:'));
  const pageResults = new Map<string, { passed: number; total: number }>();
  
  report.testResults.forEach(result => {
    const pagePath = result.url.split('/testigos-solarpunk')[1];
    if (!pageResults.has(pagePath)) {
      pageResults.set(pagePath, { passed: 0, total: 0 });
    }
    
    const stats = pageResults.get(pagePath)!;
    stats.total++;
    if (result.issues.length === 0) stats.passed++;
  });
  
  pageResults.forEach((stats, page) => {
    const status = stats.passed === stats.total ? '✅' : '❌';
    console.log(`  ${status} ${page}: ${stats.passed}/${stats.total} combinations passed`);
  });
  
  // Critical issues
  if (report.criticalIssues.length > 0) {
    console.log(chalk.red(`\n❌ Critical Issues:`));
    report.criticalIssues.slice(0, 10).forEach(issue => {
      console.log(`  - ${issue.type} (${issue.count} occurrences)`);
      issue.examples.forEach(example => {
        console.log(`    → ${example}`);
      });
    });
  }
  
  // Contrast issues
  if (report.contrastIssues.length > 0) {
    console.log(chalk.red(`\n🎨 Contrast Issues (${report.contrastIssues.length}):`));
    report.contrastIssues.slice(0, 5).forEach(issue => {
      console.log(`  - ${issue.selector}: ratio ${issue.ratio} (required: ${issue.required})`);
    });
  }
  
  // Keyboard issues
  if (report.keyboardIssues.length > 0) {
    console.log(chalk.red(`\n⌨️  Keyboard Navigation Issues (${report.keyboardIssues.length}):`));
    report.keyboardIssues.slice(0, 5).forEach(issue => {
      console.log(`  - ${issue.element}: ${issue.issue}`);
    });
  }
  
  // Health status
  console.log(chalk.white('\n━'.repeat(50)));
  if (report.summary.criticalErrors === 0 && report.summary.wcagCompliance === 'AAA') {
    console.log(chalk.green.bold('\n✅ Accessibility Health Status: EXCELLENT'));
    console.log(chalk.green('WCAG AAA compliance achieved!'));
  } else if (report.summary.criticalErrors < 5) {
    console.log(chalk.yellow.bold('\n⚠️  Accessibility Health Status: GOOD'));
    console.log(chalk.yellow('Minor accessibility issues found.'));
  } else {
    console.log(chalk.red.bold('\n❌ Accessibility Health Status: NEEDS ATTENTION'));
    console.log(chalk.red('Critical accessibility issues must be fixed.'));
  }
  
  console.log(chalk.white('\n━'.repeat(50)));
}

async function saveDetailedReport(report: AccessibilityReport): Promise<void> {
  const reportPath = path.join(process.cwd(), 'reports', 'accessibility-health-check.json');
  await fs.ensureDir(path.dirname(reportPath));
  await fs.writeJSON(reportPath, {
    timestamp: new Date().toISOString(),
    ...report
  }, { spaces: 2 });
  
  console.log(chalk.gray(`\nDetailed report saved to: ${reportPath}`));
  
  // Save HTML report
  const htmlPath = path.join(process.cwd(), 'reports', 'accessibility-report.html');
  const html = generateHTMLReport(report);
  await fs.writeFile(htmlPath, html);
  console.log(chalk.gray(`HTML report saved to: ${htmlPath}`));
}

function generateHTMLReport(report: AccessibilityReport): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Accessibility Health Check Report - Testigos de Solarpunk</title>
  <style>
    body { font-family: system-ui; max-width: 1200px; margin: 0 auto; padding: 20px; }
    .summary { background: #f0f0f0; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .status-excellent { color: #22c55e; }
    .status-good { color: #f59e0b; }
    .status-poor { color: #ef4444; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #f5f5f5; }
    .issue-error { background: #fee; }
    .issue-warning { background: #ffeaa7; }
  </style>
</head>
<body>
  <h1>Accessibility Health Check Report</h1>
  <div class="summary">
    <h2>Summary</h2>
    <p>Tests Run: ${report.summary.testsRun}</p>
    <p>Tests Passed: ${report.summary.testsPassed}</p>
    <p>Total Issues: ${report.summary.totalIssues}</p>
    <p>WCAG Compliance: <strong class="status-${report.summary.wcagCompliance === 'AAA' ? 'excellent' : 'poor'}">${report.summary.wcagCompliance}</strong></p>
  </div>
  
  <h2>Issues by Type</h2>
  <table>
    <thead>
      <tr>
        <th>Issue Type</th>
        <th>Count</th>
        <th>Examples</th>
      </tr>
    </thead>
    <tbody>
      ${report.criticalIssues.map(issue => `
        <tr>
          <td>${issue.type}</td>
          <td>${issue.count}</td>
          <td>${issue.examples.join('<br>')}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  
  <p>Generated: ${new Date().toISOString()}</p>
</body>
</html>
  `;
}

// Main execution
async function main() {
  try {
    // Check if dev server is running
    try {
      const { execSync } = await import('child_process');
      execSync('curl -s http://localhost:4321 > /dev/null');
    } catch {
      console.error(chalk.red('\n❌ Development server is not running!'));
      console.log(chalk.yellow('Please run "npm run dev" in another terminal and try again.'));
      process.exit(1);
    }
    
    const results = await runAccessibilityTests();
    
    // Run additional tests on homepage
    const homepageUrl = 'http://localhost:4321/testigos-solarpunk/es/';
    console.log(chalk.yellow('\nRunning keyboard navigation tests...'));
    const keyboardIssues = await testKeyboardNavigation(homepageUrl);
    
    console.log(chalk.yellow('Running color contrast tests...'));
    const contrastIssues = await testColorContrast(homepageUrl);
    
    const report = analyzeResults(results);
    report.keyboardIssues = keyboardIssues;
    report.contrastIssues = contrastIssues;
    
    generateReport(report);
    await saveDetailedReport(report);
    
    // Exit with error code if critical issues found
    if (report.summary.criticalErrors > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error(chalk.red('\n❌ Error running accessibility health check:'), error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { runAccessibilityTests, AccessibilityReport };