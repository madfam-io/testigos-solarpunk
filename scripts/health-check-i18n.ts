#!/usr/bin/env tsx
/**
 * i18n Health Check Script - Testigos de Solarpunk
 *
 * Validates completeness and consistency of internationalization:
 * - Translation parity between languages
 * - No hardcoded text in components
 * - Proper route translations
 * - Alt text for images
 * - Unused translations
 *
 * @author MADFAM
 * @version 0.3.0+health
 */

import { ui, routes } from '../src/i18n/config.js';
import fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';
import chalk from 'chalk';

interface I18nIssues {
  missingTranslations: string[];
  unusedTranslations: string[];
  hardcodedText: Array<{ file: string; text: string; line: number }>;
  inconsistentRoutes: string[];
  missingAltText: Array<{ file: string; tag: string; line: number }>;
  summary: {
    totalTranslations: number;
    translationCoverage: number;
    filesScanned: number;
    issuesFound: number;
  };
}

async function auditI18n(): Promise<I18nIssues> {
  console.log(chalk.blue('\n🌐 Starting i18n Health Check...\n'));

  const issues: I18nIssues = {
    missingTranslations: [],
    unusedTranslations: [],
    hardcodedText: [],
    inconsistentRoutes: [],
    missingAltText: [],
    summary: {
      totalTranslations: 0,
      translationCoverage: 0,
      filesScanned: 0,
      issuesFound: 0,
    },
  };

  // 1. Check translation parity
  console.log(chalk.yellow('Checking translation parity...'));
  const esKeys = Object.keys(ui.es);
  const enKeys = Object.keys(ui.en);

  issues.summary.totalTranslations = esKeys.length;

  // Missing English translations
  esKeys.forEach((key) => {
    if (!enKeys.includes(key)) {
      issues.missingTranslations.push(`EN missing: ${key}`);
    }
  });

  // Missing Spanish translations
  enKeys.forEach((key) => {
    if (!esKeys.includes(key)) {
      issues.missingTranslations.push(`ES missing: ${key}`);
    }
  });

  // 2. Scan for hardcoded text in components
  console.log(chalk.yellow('Scanning for hardcoded text...'));
  const astroFiles = await glob('src/**/*.astro');
  issues.summary.filesScanned = astroFiles.length;

  for (const file of astroFiles) {
    const content = await fs.readFile(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Skip comments and script sections
      if (line.trim().startsWith('//') || line.trim().startsWith('/*')) return;

      // Check for Spanish text not in translation function
      const spanishPattern = />([\s]*[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,}[\s]*)</g;
      const matches = line.match(spanishPattern);

      if (matches) {
        matches.forEach((match) => {
          const text = match.replace(/[><]/g, '').trim();
          // Skip if it's a variable, component name, or already translated
          if (
            text &&
            !text.match(/^[A-Z0-9_]+$/) &&
            !text.match(/^\{.*\}$/) &&
            !line.includes(`t('`) &&
            !line.includes('useTranslations') &&
            text.length > 2 &&
            !['true', 'false', 'null', 'undefined'].includes(text.toLowerCase())
          ) {
            issues.hardcodedText.push({
              file: file.replace('src/', ''),
              text: text,
              line: index + 1,
            });
          }
        });
      }

      // Check for hardcoded English in aria-label, title, alt attributes
      const attrPattern = /(aria-label|title|alt)="([^"]+)"/g;
      const attrMatches = [...line.matchAll(attrPattern)];

      attrMatches.forEach((match) => {
        const attrValue = match[2];
        // Skip if it's using translation function
        if (!attrValue.includes('{') && attrValue.match(/[a-zA-Z\s]{3,}/)) {
          issues.hardcodedText.push({
            file: file.replace('src/', ''),
            text: `${match[1]}="${attrValue}"`,
            line: index + 1,
          });
        }
      });
    });

    // Check for missing alt text on images
    const imgPattern = /<img[^>]+>/g;
    const images = content.match(imgPattern) || [];

    images.forEach((img) => {
      if (
        !img.includes('alt=') ||
        img.includes('alt=""') ||
        img.includes("alt=''")
      ) {
        const lineNumber = content
          .substring(0, content.indexOf(img))
          .split('\n').length;
        issues.missingAltText.push({
          file: file.replace('src/', ''),
          tag: img.substring(0, 50) + '...',
          line: lineNumber,
        });
      }
    });
  }

  // 3. Verify route consistency
  console.log(chalk.yellow('Checking route consistency...'));
  Object.keys(routes.es).forEach((key) => {
    if (!routes.en[key]) {
      issues.inconsistentRoutes.push(`Route missing in EN: ${key}`);
    }
  });

  Object.keys(routes.en).forEach((key) => {
    if (!routes.es[key]) {
      issues.inconsistentRoutes.push(`Route missing in ES: ${key}`);
    }
  });

  // 4. Check for unused translations
  console.log(chalk.yellow('Checking for unused translations...'));
  const translationKeys = Object.keys(ui.es);
  const usedKeys = new Set<string>();

  for (const file of astroFiles) {
    const content = await fs.readFile(file, 'utf-8');
    translationKeys.forEach((key) => {
      if (
        content.includes(`t('${key}')`) ||
        content.includes(`t("${key}")`) ||
        content.includes(`t(\`${key}\`)`)
      ) {
        usedKeys.add(key);
      }
    });
  }

  // Also check TypeScript files
  const tsFiles = await glob('src/**/*.ts');
  for (const file of tsFiles) {
    const content = await fs.readFile(file, 'utf-8');
    translationKeys.forEach((key) => {
      if (content.includes(`'${key}'`) || content.includes(`"${key}"`)) {
        usedKeys.add(key);
      }
    });
  }

  translationKeys.forEach((key) => {
    if (!usedKeys.has(key)) {
      issues.unusedTranslations.push(key);
    }
  });

  // Calculate summary
  issues.summary.translationCoverage = Math.round(
    ((esKeys.length -
      issues.missingTranslations.filter((m) => m.startsWith('EN')).length) /
      esKeys.length) *
      100
  );
  issues.summary.issuesFound =
    issues.missingTranslations.length +
    issues.hardcodedText.length +
    issues.inconsistentRoutes.length +
    issues.missingAltText.length +
    issues.unusedTranslations.length;

  return issues;
}

function generateReport(issues: I18nIssues): void {
  console.log(chalk.blue('\n📊 i18n Health Check Report\n'));
  console.log(chalk.white('━'.repeat(50)));

  // Summary
  console.log(chalk.cyan('\n📈 Summary:'));
  console.log(`  Total translations: ${issues.summary.totalTranslations}`);
  console.log(`  Translation coverage: ${issues.summary.translationCoverage}%`);
  console.log(`  Files scanned: ${issues.summary.filesScanned}`);
  console.log(`  Total issues found: ${issues.summary.issuesFound}`);

  // Missing translations
  if (issues.missingTranslations.length > 0) {
    console.log(
      chalk.red(
        `\n❌ Missing translations (${issues.missingTranslations.length}):`
      )
    );
    issues.missingTranslations.slice(0, 10).forEach((issue) => {
      console.log(`  - ${issue}`);
    });
    if (issues.missingTranslations.length > 10) {
      console.log(`  ... and ${issues.missingTranslations.length - 10} more`);
    }
  } else {
    console.log(chalk.green('\n✅ All translations are complete!'));
  }

  // Hardcoded text
  if (issues.hardcodedText.length > 0) {
    console.log(
      chalk.red(`\n⚠️  Hardcoded text (${issues.hardcodedText.length}):`)
    );
    issues.hardcodedText.slice(0, 10).forEach((issue) => {
      console.log(`  - ${issue.file}:${issue.line} - "${issue.text}"`);
    });
    if (issues.hardcodedText.length > 10) {
      console.log(`  ... and ${issues.hardcodedText.length - 10} more`);
    }
  }

  // Inconsistent routes
  if (issues.inconsistentRoutes.length > 0) {
    console.log(
      chalk.red(
        `\n🔗 Inconsistent routes (${issues.inconsistentRoutes.length}):`
      )
    );
    issues.inconsistentRoutes.forEach((issue) => {
      console.log(`  - ${issue}`);
    });
  }

  // Missing alt text
  if (issues.missingAltText.length > 0) {
    console.log(
      chalk.red(`\n🖼️  Missing alt text (${issues.missingAltText.length}):`)
    );
    issues.missingAltText.slice(0, 5).forEach((issue) => {
      console.log(`  - ${issue.file}:${issue.line}`);
    });
    if (issues.missingAltText.length > 5) {
      console.log(`  ... and ${issues.missingAltText.length - 5} more`);
    }
  }

  // Unused translations
  if (issues.unusedTranslations.length > 0) {
    console.log(
      chalk.yellow(
        `\n🗑️  Unused translations (${issues.unusedTranslations.length}):`
      )
    );
    issues.unusedTranslations.slice(0, 10).forEach((key) => {
      console.log(`  - ${key}`);
    });
    if (issues.unusedTranslations.length > 10) {
      console.log(`  ... and ${issues.unusedTranslations.length - 10} more`);
    }
  }

  // Health status
  console.log(chalk.white('\n━'.repeat(50)));
  if (issues.summary.issuesFound === 0) {
    console.log(chalk.green.bold('\n✅ i18n Health Status: EXCELLENT'));
    console.log(chalk.green('All internationalization checks passed!'));
  } else if (issues.summary.issuesFound < 10) {
    console.log(chalk.yellow.bold('\n⚠️  i18n Health Status: GOOD'));
    console.log(chalk.yellow('Minor issues found that should be addressed.'));
  } else {
    console.log(chalk.red.bold('\n❌ i18n Health Status: NEEDS ATTENTION'));
    console.log(
      chalk.red('Multiple issues found that require immediate attention.')
    );
  }

  console.log(chalk.white('\n━'.repeat(50)));
}

async function saveDetailedReport(issues: I18nIssues): Promise<void> {
  const reportPath = path.join(
    process.cwd(),
    'reports',
    'i18n-health-check.json'
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
    const issues = await auditI18n();
    generateReport(issues);
    await saveDetailedReport(issues);

    // Exit with error code if critical issues found
    if (
      issues.missingTranslations.length > 0 ||
      issues.inconsistentRoutes.length > 0
    ) {
      process.exit(1);
    }
  } catch (error) {
    console.error(chalk.red('\n❌ Error running i18n health check:'), error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { auditI18n, I18nIssues };
