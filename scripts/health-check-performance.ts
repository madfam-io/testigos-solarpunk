#!/usr/bin/env tsx
/**
 * Performance Health Check Script - Testigos de Solarpunk
 *
 * Runs comprehensive Lighthouse tests for all language/theme combinations:
 * - Performance metrics (Core Web Vitals)
 * - Resource optimization
 * - Bundle sizes
 * - Loading performance
 * - Cache effectiveness
 *
 * @author MADFAM
 * @version 0.3.0+health
 */

import fs from 'fs-extra';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

interface PerformanceTestResult {
  language: string;
  theme: string;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metrics: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
    speedIndex: number;
    timeToInteractive: number;
  };
  resources: {
    totalSize: number;
    jsSize: number;
    cssSize: number;
    imageSize: number;
    fontSize: number;
    requestCount: number;
  };
}

interface PerformanceIssues {
  testResults: PerformanceTestResult[];
  failedTests: Array<{
    combination: string;
    metric: string;
    value: number;
    threshold: number;
  }>;
  bundleSizeIssues: Array<{
    file: string;
    size: number;
    threshold: number;
  }>;
  summary: {
    testsRun: number;
    testsPassed: number;
    averagePerformance: number;
    averageLCP: number;
    averageFCP: number;
    totalBundleSize: number;
  };
}

// Performance thresholds
const performanceThresholds = {
  scores: {
    performance: 90,
    accessibility: 95,
    bestPractices: 95,
    seo: 95,
  },
  metrics: {
    firstContentfulPaint: 1800, // ms
    largestContentfulPaint: 2500, // ms
    totalBlockingTime: 300, // ms
    cumulativeLayoutShift: 0.1,
    speedIndex: 3400, // ms
    timeToInteractive: 3800, // ms
  },
  resources: {
    totalSize: 2000000, // 2MB
    jsSize: 500000, // 500KB
    cssSize: 100000, // 100KB
    requestCount: 50,
  },
};

// Test matrix
const testMatrix = [
  { lang: 'es', theme: 'light' },
  { lang: 'es', theme: 'dark' },
  { lang: 'es', theme: 'auto' },
  { lang: 'en', theme: 'light' },
  { lang: 'en', theme: 'dark' },
  { lang: 'en', theme: 'auto' },
];

async function runLighthouseTest(url: string, theme: string): Promise<any> {
  const chrome = await launch({ chromeFlags: ['--headless'] });

  try {
    const options = {
      logLevel: 'error' as const,
      output: 'json' as const,
      port: chrome.port,
      extraHeaders: {
        Cookie: `testigos-theme-preference=${theme}`,
      },
      throttling: {
        cpuSlowdownMultiplier: 4,
        rttMs: 150,
        throughputKbps: 1638.4, // 3G connection
      },
    };

    const runnerResult = await lighthouse(url, options);
    return runnerResult?.lhr;
  } finally {
    chrome.kill();
  }
}

async function runPerformanceTests(): Promise<PerformanceTestResult[]> {
  console.log(chalk.yellow('Running Lighthouse performance tests...'));

  const results: PerformanceTestResult[] = [];
  const baseUrl = 'http://localhost:4321/testigos-solarpunk';

  for (const { lang, theme } of testMatrix) {
    console.log(chalk.gray(`  Testing ${lang}/${theme}...`));

    try {
      const url = `${baseUrl}/${lang}/`;
      const lhr = await runLighthouseTest(url, theme);

      if (lhr) {
        const result: PerformanceTestResult = {
          language: lang,
          theme: theme,
          scores: {
            performance: Math.round(lhr.categories.performance.score * 100),
            accessibility: Math.round(lhr.categories.accessibility.score * 100),
            bestPractices: Math.round(
              lhr.categories['best-practices'].score * 100
            ),
            seo: Math.round(lhr.categories.seo.score * 100),
          },
          metrics: {
            firstContentfulPaint:
              lhr.audits['first-contentful-paint'].numericValue,
            largestContentfulPaint:
              lhr.audits['largest-contentful-paint'].numericValue,
            totalBlockingTime: lhr.audits['total-blocking-time'].numericValue,
            cumulativeLayoutShift:
              lhr.audits['cumulative-layout-shift'].numericValue,
            speedIndex: lhr.audits['speed-index'].numericValue,
            timeToInteractive: lhr.audits['interactive'].numericValue,
          },
          resources: {
            totalSize: lhr.audits['total-byte-weight'].numericValue,
            jsSize:
              lhr.audits['total-byte-weight'].details?.items?.find(
                (item: any) => item.label === 'Script'
              )?.totalBytes || 0,
            cssSize:
              lhr.audits['total-byte-weight'].details?.items?.find(
                (item: any) => item.label === 'Stylesheet'
              )?.totalBytes || 0,
            imageSize:
              lhr.audits['total-byte-weight'].details?.items?.find(
                (item: any) => item.label === 'Image'
              )?.totalBytes || 0,
            fontSize:
              lhr.audits['total-byte-weight'].details?.items?.find(
                (item: any) => item.label === 'Font'
              )?.totalBytes || 0,
            requestCount:
              lhr.audits['network-requests'].details?.items?.length || 0,
          },
        };

        results.push(result);
      }
    } catch (error) {
      console.error(
        chalk.red(
          `    Failed to test ${lang}/${theme}: ${error instanceof Error ? error.message : String(error)}`
        )
      );
    }
  }

  return results;
}

async function checkBundleSizes(): Promise<
  Array<{ file: string; size: number; threshold: number }>
> {
  console.log(chalk.yellow('Checking bundle sizes...'));

  const issues: Array<{ file: string; size: number; threshold: number }> = [];

  try {
    // Build the project first
    console.log(chalk.gray('  Building project...'));
    execSync('npm run build', { stdio: 'ignore' });

    // Check dist folder sizes
    const distPath = path.join(process.cwd(), 'dist');
    const jsFiles = await fs
      .readdir(path.join(distPath, '_assets'))
      .then((files) => files.filter((f) => f.endsWith('.js')));

    for (const file of jsFiles) {
      const filePath = path.join(distPath, '_assets', file);
      const stats = await fs.stat(filePath);

      if (stats.size > 200000) {
        // 200KB threshold for individual JS files
        issues.push({
          file: file,
          size: stats.size,
          threshold: 200000,
        });
      }
    }
  } catch (error) {
    console.error(chalk.gray('  Could not check bundle sizes'));
  }

  return issues;
}

function analyzeResults(results: PerformanceTestResult[]): PerformanceIssues {
  const issues: PerformanceIssues = {
    testResults: results,
    failedTests: [],
    bundleSizeIssues: [],
    summary: {
      testsRun: results.length,
      testsPassed: 0,
      averagePerformance: 0,
      averageLCP: 0,
      averageFCP: 0,
      totalBundleSize: 0,
    },
  };

  // Check each result against thresholds
  results.forEach((result) => {
    const combination = `${result.language}-${result.theme}`;

    // Check scores
    Object.entries(performanceThresholds.scores).forEach(
      ([metric, threshold]) => {
        const value = result.scores[metric as keyof typeof result.scores];
        if (value < threshold) {
          issues.failedTests.push({
            combination,
            metric: `Score: ${metric}`,
            value,
            threshold,
          });
        }
      }
    );

    // Check metrics
    Object.entries(performanceThresholds.metrics).forEach(
      ([metric, threshold]) => {
        const value = result.metrics[metric as keyof typeof result.metrics];
        if (value > threshold) {
          issues.failedTests.push({
            combination,
            metric: `Metric: ${metric}`,
            value,
            threshold,
          });
        }
      }
    );

    // Check resources
    if (
      result.resources.totalSize > performanceThresholds.resources.totalSize
    ) {
      issues.failedTests.push({
        combination,
        metric: 'Total bundle size',
        value: result.resources.totalSize,
        threshold: performanceThresholds.resources.totalSize,
      });
    }
  });

  // Calculate summary
  if (results.length > 0) {
    issues.summary.testsPassed =
      results.length -
      new Set(issues.failedTests.map((t) => t.combination)).size;

    issues.summary.averagePerformance = Math.round(
      results.reduce((sum, r) => sum + r.scores.performance, 0) / results.length
    );

    issues.summary.averageLCP = Math.round(
      results.reduce((sum, r) => sum + r.metrics.largestContentfulPaint, 0) /
        results.length
    );

    issues.summary.averageFCP = Math.round(
      results.reduce((sum, r) => sum + r.metrics.firstContentfulPaint, 0) /
        results.length
    );

    issues.summary.totalBundleSize = Math.max(
      ...results.map((r) => r.resources.totalSize)
    );
  }

  return issues;
}

function generateReport(issues: PerformanceIssues): void {
  console.log(chalk.blue('\n📊 Performance Health Check Report\n'));
  console.log(chalk.white('━'.repeat(50)));

  // Summary
  console.log(chalk.cyan('\n📈 Summary:'));
  console.log(`  Tests run: ${issues.summary.testsRun}`);
  console.log(
    `  Tests passed: ${issues.summary.testsPassed}/${issues.summary.testsRun}`
  );
  console.log(
    `  Average performance score: ${issues.summary.averagePerformance}/100`
  );
  console.log(`  Average LCP: ${issues.summary.averageLCP}ms`);
  console.log(`  Average FCP: ${issues.summary.averageFCP}ms`);
  console.log(
    `  Max bundle size: ${(issues.summary.totalBundleSize / 1024 / 1024).toFixed(2)}MB`
  );

  // Test results by combination
  console.log(chalk.cyan('\n🎯 Results by Language/Theme:'));
  issues.testResults.forEach((result) => {
    const status = issues.failedTests.some(
      (f) => f.combination === `${result.language}-${result.theme}`
    )
      ? '❌'
      : '✅';

    console.log(
      `  ${status} ${result.language.toUpperCase()}-${result.theme}: ` +
        `Perf ${result.scores.performance}, ` +
        `A11y ${result.scores.accessibility}, ` +
        `LCP ${Math.round(result.metrics.largestContentfulPaint)}ms`
    );
  });

  // Failed tests
  if (issues.failedTests.length > 0) {
    console.log(
      chalk.red(
        `\n❌ Failed performance checks (${issues.failedTests.length}):`
      )
    );
    issues.failedTests.slice(0, 10).forEach((failure) => {
      console.log(
        `  - ${failure.combination} | ${failure.metric}: ${failure.value} (threshold: ${failure.threshold})`
      );
    });
    if (issues.failedTests.length > 10) {
      console.log(`  ... and ${issues.failedTests.length - 10} more`);
    }
  }

  // Bundle size issues
  if (issues.bundleSizeIssues.length > 0) {
    console.log(
      chalk.red(`\n📦 Bundle size issues (${issues.bundleSizeIssues.length}):`)
    );
    issues.bundleSizeIssues.forEach((issue) => {
      console.log(
        `  - ${issue.file}: ${(issue.size / 1024).toFixed(2)}KB (threshold: ${(issue.threshold / 1024).toFixed(2)}KB)`
      );
    });
  }

  // Health status
  console.log(chalk.white('\n━'.repeat(50)));
  if (issues.failedTests.length === 0 && issues.bundleSizeIssues.length === 0) {
    console.log(chalk.green.bold('\n✅ Performance Health Status: EXCELLENT'));
    console.log(chalk.green('All performance checks passed!'));
  } else if (issues.failedTests.length < 5) {
    console.log(chalk.yellow.bold('\n⚠️  Performance Health Status: GOOD'));
    console.log(
      chalk.yellow('Minor performance issues found that should be addressed.')
    );
  } else {
    console.log(
      chalk.red.bold('\n❌ Performance Health Status: NEEDS ATTENTION')
    );
    console.log(
      chalk.red(
        'Multiple performance issues found that require immediate attention.'
      )
    );
  }

  console.log(chalk.white('\n━'.repeat(50)));
}

async function saveDetailedReport(issues: PerformanceIssues): Promise<void> {
  const reportPath = path.join(
    process.cwd(),
    'reports',
    'performance-health-check.json'
  );
  await fs.ensureDir(path.dirname(reportPath));
  await fs.writeJSON(
    reportPath,
    {
      timestamp: new Date().toISOString(),
      ...issues,
    },
    { spaces: 2 }
  );

  console.log(chalk.gray(`\nDetailed report saved to: ${reportPath}`));

  // Also save individual Lighthouse reports
  for (const result of issues.testResults) {
    const individualPath = path.join(
      process.cwd(),
      'reports',
      `lighthouse-${result.language}-${result.theme}.json`
    );
    await fs.writeJSON(individualPath, result, { spaces: 2 });
  }
}

// Main execution
async function main() {
  try {
    // Check if dev server is running
    try {
      execSync('curl -s http://localhost:4321 > /dev/null');
    } catch {
      console.error(chalk.red('\n❌ Development server is not running!'));
      console.log(
        chalk.yellow(
          'Please run "npm run dev" in another terminal and try again.'
        )
      );
      process.exit(1);
    }

    const testResults = await runPerformanceTests();
    const bundleSizeIssues = await checkBundleSizes();

    const issues = analyzeResults(testResults);
    issues.bundleSizeIssues = bundleSizeIssues;

    generateReport(issues);
    await saveDetailedReport(issues);

    // Exit with error code if critical issues found
    if (issues.failedTests.length > 0 || issues.bundleSizeIssues.length > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error(
      chalk.red('\n❌ Error running performance health check:'),
      error
    );
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { runPerformanceTests };
export type { PerformanceIssues };
