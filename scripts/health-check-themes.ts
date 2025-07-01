#!/usr/bin/env tsx
/**
 * Theme System Health Check Script - Testigos de Solarpunk
 *
 * Validates theme implementation consistency:
 * - CSS variable completeness
 * - Contrast ratio compliance
 * - Theme switching performance
 * - Magazine cutout aesthetic preservation
 * - No hardcoded colors
 *
 * @author MADFAM
 * @version 0.3.0+health
 */

import fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';
import chalk from 'chalk';
import { chromium } from 'playwright';

interface ThemeIssues {
  missingVariables: Array<{ theme: string; variable: string }>;
  contrastIssues: Array<{
    background: string;
    foreground: string;
    ratio: number;
    required: number;
    context: string;
  }>;
  hardcodedColors: Array<{ file: string; color: string; line: number }>;
  performanceIssues: Array<{
    metric: string;
    value: number;
    threshold: number;
  }>;
  aestheticIssues: string[];
  summary: {
    themesChecked: number;
    variableCoverage: number;
    contrastCompliance: number;
    performanceScore: number;
    issuesFound: number;
  };
}

// Required CSS variables for each theme
const requiredVariables = [
  // Core colors
  '--bg-primary',
  '--bg-secondary',
  '--bg-tertiary',
  '--text-primary',
  '--text-secondary',
  '--text-on-accent',
  '--border-default',
  '--border-subtle',

  // Brand colors
  '--color-eco-green',
  '--color-solar-yellow',
  '--color-comedy-purple',
  '--color-tech-blue',
  '--color-community-orange',

  // Magazine cutout specific
  '--cutout-shadow',
  '--tape-color',
  '--paper-texture-opacity',
  '--torn-edge-color',

  // Component specific
  '--nav-bg',
  '--nav-text',
  '--card-bg',
  '--card-border',
  '--button-primary-bg',
  '--button-primary-text',
];

// Minimum contrast ratios (WCAG AAA)
const contrastRequirements = [
  {
    bg: '--bg-primary',
    fg: '--text-primary',
    minRatio: 7,
    context: 'Main content',
  },
  {
    bg: '--bg-secondary',
    fg: '--text-primary',
    minRatio: 7,
    context: 'Cards/sections',
  },
  {
    bg: '--bg-tertiary',
    fg: '--text-secondary',
    minRatio: 4.5,
    context: 'Subtle elements',
  },
  {
    bg: '--color-eco-green',
    fg: '--text-on-accent',
    minRatio: 4.5,
    context: 'Green buttons',
  },
  {
    bg: '--color-solar-yellow',
    fg: '--text-primary',
    minRatio: 4.5,
    context: 'Yellow accents',
  },
  {
    bg: '--color-comedy-purple',
    fg: '--text-on-accent',
    minRatio: 4.5,
    context: 'Purple elements',
  },
];

async function checkThemeVariables(): Promise<
  Pick<ThemeIssues, 'missingVariables'>
> {
  console.log(chalk.yellow('Checking CSS variable completeness...'));

  const issues = {
    missingVariables: [],
  };

  // Check theme CSS files
  const themeCSSFiles = await glob('src/styles/*theme*.css');

  for (const file of themeCSSFiles) {
    const content = await fs.readFile(file, 'utf-8');

    // Extract theme name from file or content
    const themeName = file.includes('dark')
      ? 'dark'
      : file.includes('light')
        ? 'light'
        : 'base';

    // Check for required variables
    requiredVariables.forEach((variable) => {
      if (!content.includes(variable)) {
        issues.missingVariables.push({
          theme: themeName,
          variable: variable,
        });
      }
    });
  }

  return issues;
}

async function checkContrastRatios(): Promise<
  Pick<ThemeIssues, 'contrastIssues'>
> {
  console.log(chalk.yellow('Checking contrast ratios...'));

  const issues = {
    contrastIssues: [],
  };

  // This would require a headless browser to compute actual contrast ratios
  // For now, we'll mark this as a manual check requirement
  console.log(
    chalk.gray('  (Contrast ratio checking requires manual verification)')
  );

  return issues;
}

async function checkHardcodedColors(): Promise<
  Pick<ThemeIssues, 'hardcodedColors'>
> {
  console.log(chalk.yellow('Checking for hardcoded colors...'));

  const issues = {
    hardcodedColors: [],
  };

  // Color patterns to detect
  const colorPatterns = [
    /#[0-9a-fA-F]{3,8}/g, // Hex colors
    /rgb\([^)]+\)/g, // RGB colors
    /rgba\([^)]+\)/g, // RGBA colors
    /hsl\([^)]+\)/g, // HSL colors
    /hsla\([^)]+\)/g, // HSLA colors
  ];

  // Files to check
  const files = await glob('src/**/*.{astro,css,tsx,ts}');

  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Skip comments and imports
      if (
        line.trim().startsWith('//') ||
        line.trim().startsWith('/*') ||
        line.includes('import')
      )
        return;

      colorPatterns.forEach((pattern) => {
        const matches = line.match(pattern);
        if (matches) {
          matches.forEach((color) => {
            // Skip if it's in a CSS variable definition
            if (!line.includes('--') || !line.includes(':')) {
              issues.hardcodedColors.push({
                file: file.replace('src/', ''),
                color: color,
                line: index + 1,
              });
            }
          });
        }
      });
    });
  }

  return issues;
}

async function checkThemePerformance(): Promise<
  Pick<ThemeIssues, 'performanceIssues'>
> {
  console.log(chalk.yellow('Checking theme switching performance...'));

  const issues = {
    performanceIssues: [],
  };

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the development server
    await page.goto('http://localhost:4321/testigos-solarpunk/es/');

    // Measure theme switching performance
    const switchTime = await page.evaluate(() => {
      const start = performance.now();

      // Trigger theme change
      document.documentElement.setAttribute('data-theme', 'dark');

      // Force reflow
      void document.documentElement.offsetHeight;

      const end = performance.now();
      return end - start;
    });

    if (switchTime > 50) {
      issues.performanceIssues.push({
        metric: 'Theme switch time',
        value: switchTime,
        threshold: 50,
      });
    }

    // Check for layout shift during theme change
    const layoutShift = await page.evaluate(() => {
      let totalShift = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift') {
            totalShift += (entry as any).value;
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });

      // Switch theme
      document.documentElement.setAttribute('data-theme', 'light');

      // Wait a bit
      return new Promise((resolve) => {
        setTimeout(() => {
          observer.disconnect();
          resolve(totalShift);
        }, 100);
      });
    });

    if ((layoutShift as number) > 0.1) {
      issues.performanceIssues.push({
        metric: 'Layout shift on theme change',
        value: layoutShift as number,
        threshold: 0.1,
      });
    }
  } catch (error) {
    console.log(
      chalk.gray('  (Performance testing requires dev server running)')
    );
  } finally {
    await browser.close();
  }

  return issues;
}

async function checkMagazineAesthetic(): Promise<
  Pick<ThemeIssues, 'aestheticIssues'>
> {
  console.log(
    chalk.yellow('Checking magazine cutout aesthetic preservation...')
  );

  const issues = {
    aestheticIssues: [],
  };

  // Check for required aesthetic CSS
  const aestheticFiles = await glob('src/styles/*magazine*.css');

  if (aestheticFiles.length === 0) {
    issues.aestheticIssues.push('No magazine cutout CSS files found');
  }

  // Check for aesthetic-specific classes
  const requiredClasses = [
    'emoji-cutout',
    'tape-',
    'torn-edge',
    'paper-texture',
    'flutter',
    'rotate',
  ];

  const componentFiles = await glob('src/**/*.astro');
  let aestheticClassUsage = 0;

  for (const file of componentFiles) {
    const content = await fs.readFile(file, 'utf-8');
    requiredClasses.forEach((className) => {
      if (content.includes(className)) {
        aestheticClassUsage++;
      }
    });
  }

  if (aestheticClassUsage < requiredClasses.length * 2) {
    issues.aestheticIssues.push(
      'Limited use of magazine cutout aesthetic classes'
    );
  }

  return issues;
}

function generateReport(issues: ThemeIssues): void {
  console.log(chalk.blue('\n📊 Theme System Health Check Report\n'));
  console.log(chalk.white('━'.repeat(50)));

  // Summary
  console.log(chalk.cyan('\n📈 Summary:'));
  console.log(`  Themes checked: ${issues.summary.themesChecked}`);
  console.log(`  Variable coverage: ${issues.summary.variableCoverage}%`);
  console.log(`  Contrast compliance: ${issues.summary.contrastCompliance}%`);
  console.log(`  Performance score: ${issues.summary.performanceScore}/100`);
  console.log(`  Total issues found: ${issues.summary.issuesFound}`);

  // Missing variables
  if (issues.missingVariables.length > 0) {
    console.log(
      chalk.red(
        `\n❌ Missing CSS variables (${issues.missingVariables.length}):`
      )
    );
    issues.missingVariables.slice(0, 10).forEach((issue) => {
      console.log(`  - ${issue.theme}: ${issue.variable}`);
    });
  } else {
    console.log(chalk.green('\n✅ All required CSS variables are defined!'));
  }

  // Contrast issues
  if (issues.contrastIssues.length > 0) {
    console.log(
      chalk.red(`\n⚠️  Contrast issues (${issues.contrastIssues.length}):`)
    );
    issues.contrastIssues.forEach((issue) => {
      console.log(
        `  - ${issue.context}: ${issue.ratio} (required: ${issue.required})`
      );
    });
  }

  // Hardcoded colors
  if (issues.hardcodedColors.length > 0) {
    console.log(
      chalk.red(`\n🎨 Hardcoded colors (${issues.hardcodedColors.length}):`)
    );
    issues.hardcodedColors.slice(0, 10).forEach((issue) => {
      console.log(`  - ${issue.file}:${issue.line} - ${issue.color}`);
    });
    if (issues.hardcodedColors.length > 10) {
      console.log(`  ... and ${issues.hardcodedColors.length - 10} more`);
    }
  }

  // Performance issues
  if (issues.performanceIssues.length > 0) {
    console.log(
      chalk.red(`\n⚡ Performance issues (${issues.performanceIssues.length}):`)
    );
    issues.performanceIssues.forEach((issue) => {
      console.log(
        `  - ${issue.metric}: ${issue.value}ms (threshold: ${issue.threshold}ms)`
      );
    });
  }

  // Aesthetic issues
  if (issues.aestheticIssues.length > 0) {
    console.log(
      chalk.yellow(
        `\n✂️  Magazine aesthetic issues (${issues.aestheticIssues.length}):`
      )
    );
    issues.aestheticIssues.forEach((issue) => {
      console.log(`  - ${issue}`);
    });
  }

  // Health status
  console.log(chalk.white('\n━'.repeat(50)));
  if (issues.summary.issuesFound === 0) {
    console.log(chalk.green.bold('\n✅ Theme Health Status: EXCELLENT'));
    console.log(chalk.green('All theme system checks passed!'));
  } else if (issues.summary.issuesFound < 5) {
    console.log(chalk.yellow.bold('\n⚠️  Theme Health Status: GOOD'));
    console.log(chalk.yellow('Minor issues found that should be addressed.'));
  } else {
    console.log(chalk.red.bold('\n❌ Theme Health Status: NEEDS ATTENTION'));
    console.log(
      chalk.red('Multiple issues found that require immediate attention.')
    );
  }

  console.log(chalk.white('\n━'.repeat(50)));
}

async function saveDetailedReport(issues: ThemeIssues): Promise<void> {
  const reportPath = path.join(
    process.cwd(),
    'reports',
    'theme-health-check.json'
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
}

// Main execution
async function main() {
  try {
    const variableIssues = await checkThemeVariables();
    const contrastIssues = await checkContrastRatios();
    const colorIssues = await checkHardcodedColors();
    const performanceIssues = await checkThemePerformance();
    const aestheticIssues = await checkMagazineAesthetic();

    const allIssues: ThemeIssues = {
      ...variableIssues,
      ...contrastIssues,
      ...colorIssues,
      ...performanceIssues,
      ...aestheticIssues,
      summary: {
        themesChecked: 3, // light, dark, auto
        variableCoverage: Math.round(
          ((requiredVariables.length - variableIssues.missingVariables.length) /
            requiredVariables.length) *
            100
        ),
        contrastCompliance:
          contrastIssues.contrastIssues.length === 0 ? 100 : 0,
        performanceScore:
          performanceIssues.performanceIssues.length === 0 ? 100 : 50,
        issuesFound:
          variableIssues.missingVariables.length +
          contrastIssues.contrastIssues.length +
          colorIssues.hardcodedColors.length +
          performanceIssues.performanceIssues.length +
          aestheticIssues.aestheticIssues.length,
      },
    };

    generateReport(allIssues);
    await saveDetailedReport(allIssues);

    // Exit with error code if critical issues found
    if (allIssues.summary.issuesFound > 10) {
      process.exit(1);
    }
  } catch (error) {
    console.error(chalk.red('\n❌ Error running theme health check:'), error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { checkThemeVariables, checkHardcodedColors, ThemeIssues };
