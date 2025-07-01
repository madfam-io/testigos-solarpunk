#!/usr/bin/env tsx
/**
 * Comprehensive Health Check Script - Testigos de Solarpunk
 *
 * Runs all health checks and generates a consolidated report:
 * - i18n completeness
 * - Theme consistency
 * - Performance metrics
 * - Accessibility compliance
 * - Overall health score
 *
 * @author MADFAM
 * @version 0.3.0+health
 */

import fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';
import ora from 'ora';

interface HealthCheckResult {
  name: string;
  status: 'passed' | 'warning' | 'failed';
  score: number;
  issues: number;
  criticalIssues: number;
  summary: string;
}

interface OverallHealthReport {
  timestamp: string;
  healthScore: number;
  status: 'excellent' | 'good' | 'needs-attention' | 'critical';
  checks: HealthCheckResult[];
  recommendations: string[];
  readyForProduction: boolean;
}

async function runHealthCheck(
  name: string,
  script: string,
  spinner: any
): Promise<HealthCheckResult> {
  spinner.text = `Running ${name} health check...`;

  try {
    // Run the health check script
    const output = execSync(`npx tsx ${script}`, {
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    // Try to read the JSON report if it exists
    const reportName = script
      .replace('scripts/health-check-', '')
      .replace('.ts', '');
    const reportPath = path.join(
      process.cwd(),
      'reports',
      `${reportName}-health-check.json`
    );

    let score = 100;
    let issues = 0;
    let criticalIssues = 0;

    if (await fs.pathExists(reportPath)) {
      const report = await fs.readJSON(reportPath);

      // Extract metrics based on report type
      switch (reportName) {
        case 'i18n':
          issues = report.summary?.issuesFound || 0;
          criticalIssues = report.missingTranslations?.length || 0;
          score = report.summary?.translationCoverage || 100;
          break;

        case 'themes':
          issues = report.summary?.issuesFound || 0;
          criticalIssues = report.missingVariables?.length || 0;
          score = report.summary?.variableCoverage || 100;
          break;

        case 'performance':
          issues = report.failedTests?.length || 0;
          criticalIssues =
            report.failedTests?.filter((t: any) => t.metric.includes('Score'))
              .length || 0;
          score = report.summary?.averagePerformance || 100;
          break;

        case 'accessibility':
          issues = report.summary?.totalIssues || 0;
          criticalIssues = report.summary?.criticalErrors || 0;
          score = 100 - Math.min(100, criticalIssues * 10);
          break;
      }
    }

    return {
      name,
      status: criticalIssues > 0 ? 'failed' : issues > 0 ? 'warning' : 'passed',
      score,
      issues,
      criticalIssues,
      summary: `${issues} issues found (${criticalIssues} critical)`,
    };
  } catch (error) {
    // If script exits with error code, it failed
    return {
      name,
      status: 'failed',
      score: 0,
      issues: -1,
      criticalIssues: -1,
      summary: 'Health check failed to run',
    };
  }
}

async function generateConsolidatedReport(
  results: HealthCheckResult[]
): Promise<OverallHealthReport> {
  // Calculate overall health score
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const healthScore = Math.round(totalScore / results.length);

  // Determine overall status
  const failedChecks = results.filter((r) => r.status === 'failed').length;
  const warningChecks = results.filter((r) => r.status === 'warning').length;

  let status: OverallHealthReport['status'];
  if (failedChecks > 0) {
    status = 'critical';
  } else if (warningChecks > 2) {
    status = 'needs-attention';
  } else if (warningChecks > 0) {
    status = 'good';
  } else {
    status = 'excellent';
  }

  // Generate recommendations
  const recommendations: string[] = [];

  results.forEach((check) => {
    if (check.status === 'failed') {
      switch (check.name) {
        case 'i18n':
          recommendations.push('Fix missing translations and hardcoded text');
          break;
        case 'Theme System':
          recommendations.push(
            'Complete theme variable definitions and fix contrast issues'
          );
          break;
        case 'Performance':
          recommendations.push(
            'Optimize bundle sizes and improve Core Web Vitals'
          );
          break;
        case 'Accessibility':
          recommendations.push('Fix WCAG violations for compliance');
          break;
      }
    }
  });

  if (recommendations.length === 0) {
    recommendations.push('Continue monitoring health metrics');
    recommendations.push(
      'Consider implementing additional performance optimizations'
    );
  }

  return {
    timestamp: new Date().toISOString(),
    healthScore,
    status,
    checks: results,
    recommendations,
    readyForProduction: failedChecks === 0 && healthScore >= 90,
  };
}

function displayReport(report: OverallHealthReport): void {
  console.log(chalk.blue('\n\n🏥 Comprehensive Health Check Report\n'));
  console.log(chalk.white('═'.repeat(60)));

  // Overall health score with color
  const scoreColor =
    report.healthScore >= 90
      ? chalk.green
      : report.healthScore >= 70
        ? chalk.yellow
        : chalk.red;

  console.log(
    chalk.cyan('\n📊 Overall Health Score: ') +
      scoreColor.bold(`${report.healthScore}/100`)
  );
  console.log(
    chalk.cyan('📋 Status: ') +
      getStatusEmoji(report.status) +
      ' ' +
      chalk.bold(report.status.toUpperCase())
  );
  console.log(
    chalk.cyan('🚀 Production Ready: ') +
      (report.readyForProduction ? chalk.green('YES') : chalk.red('NO'))
  );

  // Individual check results
  console.log(chalk.white('\n' + '─'.repeat(60)));
  console.log(chalk.cyan('\n🔍 Individual Health Checks:\n'));

  report.checks.forEach((check) => {
    const statusEmoji =
      check.status === 'passed'
        ? '✅'
        : check.status === 'warning'
          ? '⚠️ '
          : '❌';

    const statusColor =
      check.status === 'passed'
        ? chalk.green
        : check.status === 'warning'
          ? chalk.yellow
          : chalk.red;

    console.log(
      `  ${statusEmoji} ${chalk.bold(check.name)}: ${statusColor(check.status.toUpperCase())}`
    );
    console.log(`     Score: ${check.score}/100 | ${check.summary}`);
  });

  // Recommendations
  if (report.recommendations.length > 0) {
    console.log(chalk.white('\n' + '─'.repeat(60)));
    console.log(chalk.cyan('\n💡 Recommendations:\n'));
    report.recommendations.forEach((rec, i) => {
      console.log(`  ${i + 1}. ${rec}`);
    });
  }

  // Summary
  console.log(chalk.white('\n' + '═'.repeat(60)));

  if (report.status === 'excellent') {
    console.log(
      chalk.green.bold('\n🎉 Excellent! The codebase is in great health!')
    );
    console.log(chalk.green('All systems are functioning optimally.\n'));
  } else if (report.status === 'good') {
    console.log(
      chalk.yellow.bold('\n👍 Good! The codebase is healthy with minor issues.')
    );
    console.log(
      chalk.yellow('Address the warnings to achieve excellent status.\n')
    );
  } else if (report.status === 'needs-attention') {
    console.log(
      chalk.yellow.bold('\n⚠️  Needs Attention! Several issues require fixing.')
    );
    console.log(chalk.yellow('Focus on the critical issues first.\n'));
  } else {
    console.log(chalk.red.bold('\n🚨 Critical! Immediate action required!'));
    console.log(chalk.red('Multiple critical issues must be resolved.\n'));
  }
}

function getStatusEmoji(status: OverallHealthReport['status']): string {
  switch (status) {
    case 'excellent':
      return '🟢';
    case 'good':
      return '🟡';
    case 'needs-attention':
      return '🟠';
    case 'critical':
      return '🔴';
  }
}

async function saveConsolidatedReport(
  report: OverallHealthReport
): Promise<void> {
  const reportPath = path.join(
    process.cwd(),
    'reports',
    'comprehensive-health-report.json'
  );
  await fs.ensureDir(path.dirname(reportPath));
  await fs.writeJSON(reportPath, report, { spaces: 2 });

  // Also save an HTML summary
  const htmlPath = path.join(
    process.cwd(),
    'reports',
    'health-check-summary.html'
  );
  const html = generateHTMLSummary(report);
  await fs.writeFile(htmlPath, html);

  console.log(chalk.gray(`\nReports saved to:`));
  console.log(chalk.gray(`  - ${reportPath}`));
  console.log(chalk.gray(`  - ${htmlPath}`));
}

function generateHTMLSummary(report: OverallHealthReport): string {
  const statusColor =
    report.status === 'excellent'
      ? '#22c55e'
      : report.status === 'good'
        ? '#f59e0b'
        : report.status === 'needs-attention'
          ? '#f97316'
          : '#ef4444';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Health Check Summary - Testigos de Solarpunk</title>
  <style>
    body { 
      font-family: system-ui, -apple-system, sans-serif; 
      max-width: 800px; 
      margin: 40px auto; 
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .score {
      font-size: 72px;
      font-weight: bold;
      color: ${statusColor};
      margin: 20px 0;
    }
    .status {
      font-size: 24px;
      color: ${statusColor};
      text-transform: uppercase;
      font-weight: bold;
    }
    .checks {
      margin: 30px 0;
    }
    .check-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin: 10px 0;
      background: #f9f9f9;
      border-radius: 8px;
      border-left: 4px solid ${statusColor};
    }
    .check-status {
      font-weight: bold;
    }
    .passed { color: #22c55e; }
    .warning { color: #f59e0b; }
    .failed { color: #ef4444; }
    .recommendations {
      background: #f0f9ff;
      padding: 20px;
      border-radius: 8px;
      margin-top: 30px;
    }
    .recommendations h3 {
      color: #0369a1;
      margin-top: 0;
    }
    .recommendations ul {
      margin: 0;
      padding-left: 20px;
    }
    .timestamp {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏥 Health Check Summary</h1>
      <div class="score">${report.healthScore}/100</div>
      <div class="status">${report.status}</div>
      <p>Production Ready: <strong>${report.readyForProduction ? 'YES ✅' : 'NO ❌'}</strong></p>
    </div>
    
    <div class="checks">
      <h2>Individual Checks</h2>
      ${report.checks
        .map(
          (check) => `
        <div class="check-item">
          <div>
            <strong>${check.name}</strong><br>
            <small>${check.summary}</small>
          </div>
          <div class="check-status ${check.status}">
            ${check.status.toUpperCase()} (${check.score}/100)
          </div>
        </div>
      `
        )
        .join('')}
    </div>
    
    ${
      report.recommendations.length > 0
        ? `
      <div class="recommendations">
        <h3>💡 Recommendations</h3>
        <ul>
          ${report.recommendations.map((rec) => `<li>${rec}</li>`).join('')}
        </ul>
      </div>
    `
        : ''
    }
    
    <div class="timestamp">
      Generated: ${new Date(report.timestamp).toLocaleString()}
    </div>
  </div>
</body>
</html>
  `;
}

// Main execution
async function main() {
  console.log(chalk.blue.bold('\n🏥 Starting Comprehensive Health Check...\n'));
  console.log(
    chalk.gray(
      'This will run all health checks and may take several minutes.\n'
    )
  );

  const spinner = ora({ spinner: 'dots' });
  const results: HealthCheckResult[] = [];

  try {
    // Check if dev server is running for performance/accessibility tests
    let devServerRunning = false;
    try {
      execSync('curl -s http://localhost:4321 > /dev/null', {
        stdio: 'ignore',
      });
      devServerRunning = true;
    } catch {
      console.log(
        chalk.yellow(
          '⚠️  Dev server not running. Some checks will be skipped.\n'
        )
      );
    }

    // Run i18n health check
    spinner.start();
    results.push(
      await runHealthCheck('i18n', 'scripts/health-check-i18n.ts', spinner)
    );
    spinner.succeed('i18n health check complete');

    // Run theme health check
    spinner.start();
    results.push(
      await runHealthCheck(
        'Theme System',
        'scripts/health-check-themes.ts',
        spinner
      )
    );
    spinner.succeed('Theme health check complete');

    // Run performance health check (only if dev server is running)
    if (devServerRunning) {
      spinner.start();
      results.push(
        await runHealthCheck(
          'Performance',
          'scripts/health-check-performance.ts',
          spinner
        )
      );
      spinner.succeed('Performance health check complete');

      // Run accessibility health check
      spinner.start();
      results.push(
        await runHealthCheck(
          'Accessibility',
          'scripts/health-check-accessibility.ts',
          spinner
        )
      );
      spinner.succeed('Accessibility health check complete');
    } else {
      console.log(
        chalk.gray(
          '\nSkipping performance and accessibility checks (requires dev server)'
        )
      );
    }

    // Generate and display report
    const report = await generateConsolidatedReport(results);
    displayReport(report);
    await saveConsolidatedReport(report);

    // Exit with appropriate code
    process.exit(report.readyForProduction ? 0 : 1);
  } catch (error) {
    spinner.fail('Health check failed');
    console.error(
      chalk.red('\n❌ Error running comprehensive health check:'),
      error
    );
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateConsolidatedReport, OverallHealthReport };
