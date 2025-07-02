#!/usr/bin/env tsx
import fs from 'fs';
import { glob } from 'glob';
import chalk from 'chalk';

// Color mappings from hardcoded values to CSS variables
const colorMappings: Record<string, string> = {
  // Black variations
  '#000000': 'var(--madfam-black)',
  '#000': 'var(--madfam-black)',
  'rgba(0, 0, 0, 0.87)': 'var(--text-secondary)',
  'rgba(0, 0, 0, 0.6)': 'var(--text-tertiary)',
  'rgba(0, 0, 0, 0.38)': 'var(--text-disabled)',
  'rgba(0, 0, 0, 0.12)': 'var(--border-default)',
  'rgba(0, 0, 0, 0.08)': 'var(--border-subtle)',
  'rgba(0, 0, 0, 0.23)': 'var(--border-strong)',
  'rgba(0, 0, 0, 0.04)': 'var(--hover-overlay)',
  'rgba(0, 0, 0, 0.15)': 'var(--cutout-shadow)',
  'rgba(0, 0, 0, 0.1)': 'var(--torn-edge-color)',
  'rgba(0, 0, 0, 0.24)': 'var(--shadow-overlay-dark)',
  'rgba(0, 0, 0, 0.16)': 'var(--shadow-overlay-medium)',
  'rgba(0, 0, 0, 0.20)': 'var(--shadow-overlay-strong)',
  'rgba(0, 0, 0, 0.5)': 'var(--shadow-overlay-dark-mode)',
  'rgba(0, 0, 0, 0.8)': 'var(--shadow-overlay-darkest)',
  'rgba(0, 0, 0, 0.4)': 'var(--shadow-overlay-dark-medium)',
  'rgba(0, 0, 0, 0.7)': 'var(--shadow-overlay-dark-stronger)',
  'rgba(0, 0, 0, 0.3)': 'var(--cutout-shadow-dark)',

  // White variations
  '#ffffff': 'var(--madfam-white)',
  '#fff': 'var(--madfam-white)',
  'rgba(255, 255, 255, 0.87)': 'var(--text-secondary)',
  'rgba(255, 255, 255, 0.6)': 'var(--text-tertiary)',
  'rgba(255, 255, 255, 0.38)': 'var(--text-disabled)',
  'rgba(255, 255, 255, 0.08)': 'var(--hover-overlay)',
  'rgba(255, 255, 255, 0.16)': 'var(--active-overlay)',
  'rgba(255, 255, 255, 0.2)': 'var(--border-subtle)',
  'rgba(255, 255, 255, 0.3)': 'var(--border-default)',
  'rgba(255, 255, 255, 0.5)': 'var(--border-strong)',
  'rgba(255, 255, 255, 0.1)': 'var(--torn-edge-color)',

  // Brand colors
  '#ffc107': 'var(--madfam-yellow)',
  '#ffd54f': 'var(--madfam-yellow-light)',
  '#ffa000': 'var(--madfam-yellow-dark)',
  'rgba(255, 193, 7, 0.4)': 'var(--shadow-glow)',
  'rgba(255, 193, 7, 0.3)': 'var(--shadow-glow)',
  'rgba(255, 193, 7, 0.7)': 'var(--tape-color)',
  'rgba(255, 193, 7, 0.8)': 'var(--tape-color)',
  'rgba(255, 193, 7, 0.24)': 'var(--focus-overlay)',
  'rgba(255, 213, 79, 0.8)': 'var(--tape-color)',

  '#4caf50': 'var(--madfam-green)',
  '#81c784': 'var(--madfam-green-light)',
  '#388e3c': 'var(--madfam-green-dark)',
  '#66bb6a': 'var(--madfam-green-light)',
  'rgba(76, 175, 80, 0.03)': 'var(--paper-texture)',
  'rgba(102, 187, 106, 0.05)': 'var(--paper-texture)',

  '#663399': 'var(--madfam-purple)',
  '#9575cd': 'var(--madfam-purple-light)',
  '#4527a0': 'var(--madfam-purple-dark)',

  '#2196f3': 'var(--madfam-blue)',
  '#64b5f6': 'var(--madfam-blue-light)',
  '#42a5f5': 'var(--madfam-blue-light)',
  '#1976d2': 'var(--madfam-blue-dark)',

  // Grays
  '#212121': 'var(--madfam-black)',
  '#424242': 'var(--madfam-gray-900)',
  '#616161': 'var(--madfam-gray-800)',
  '#757575': 'var(--madfam-gray-700)',
  '#9e9e9e': 'var(--madfam-gray-600)',
  '#bdbdbd': 'var(--madfam-gray-500)',
  '#e0e0e0': 'var(--madfam-gray-400)',
  '#eeeeee': 'var(--madfam-gray-300)',
  '#f5f5f5': 'var(--madfam-gray-200)',
  '#fafafa': 'var(--madfam-gray-100)',

  // Dark theme backgrounds
  '#0a0a0b': 'var(--bg-primary)',
  '#141416': 'var(--bg-secondary)',
  '#1c1c1f': 'var(--bg-tertiary)',
  '#242428': 'var(--bg-elevated)',

  // Community orange
  '#ff6b35': 'var(--sp-community)',
  '#ff8a65': 'var(--sp-community-light)',
  '#e55100': 'var(--sp-community-dark)',

  // Other semantic colors
  '#f44336': 'var(--color-error)',
  '#ef5350': 'var(--color-error-light)',
  '#d32f2f': 'var(--color-error-dark)',
  '#e57373': 'var(--color-error-light)',
  '#ffb74d': 'var(--color-warning-light)',
};

interface ColorReplacement {
  file: string;
  line: number;
  original: string;
  replacement: string;
  context: string;
}

async function findHardcodedColors(
  files: string[]
): Promise<ColorReplacement[]> {
  const replacements: ColorReplacement[] = [];

  for (const file of files) {
    const content = await fs.promises.readFile(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Skip comments and imports
      if (
        line.trim().startsWith('//') ||
        line.trim().startsWith('/*') ||
        line.includes('import')
      ) {
        return;
      }

      // Check each color mapping
      Object.entries(colorMappings).forEach(([color, variable]) => {
        if (line.includes(color)) {
          // Don't replace if it's already in a CSS variable definition
          if (!line.includes('--') || !line.includes(':')) {
            replacements.push({
              file,
              line: index + 1,
              original: color,
              replacement: variable,
              context: line.trim(),
            });
          }
        }
      });
    });
  }

  return replacements;
}

async function replaceColorsInFile(
  file: string,
  replacements: ColorReplacement[]
): Promise<void> {
  let content = await fs.promises.readFile(file, 'utf-8');

  // Sort replacements by line number in reverse order to avoid offset issues
  const sortedReplacements = replacements.sort((a, b) => b.line - a.line);

  for (const replacement of sortedReplacements) {
    // Use a more precise replacement to avoid replacing colors in strings or comments
    const regex = new RegExp(
      `(['"\`]?)${replacement.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`,
      'g'
    );
    content = content.replace(regex, (match, quote) => {
      // If it's in quotes, replace the whole quoted value
      if (quote) {
        return quote + replacement.replacement + quote;
      }
      return replacement.replacement;
    });
  }

  await fs.promises.writeFile(file, content, 'utf-8');
}

async function main() {
  console.log(
    chalk.blue('🎨 Replacing hardcoded colors with CSS variables...\n')
  );

  // Find all TypeScript and CSS files
  const tsFiles = await glob('src/**/*.{ts,tsx}', {
    ignore: ['**/node_modules/**'],
  });
  const cssFiles = await glob('src/**/*.css', {
    ignore: ['**/node_modules/**'],
  });
  const astroFiles = await glob('src/**/*.astro', {
    ignore: ['**/node_modules/**'],
  });

  const allFiles = [...tsFiles, ...cssFiles, ...astroFiles];

  console.log(chalk.gray(`Found ${allFiles.length} files to check`));

  // Find all hardcoded colors
  const replacements = await findHardcodedColors(allFiles);

  // Group replacements by file
  const replacementsByFile = replacements.reduce(
    (acc, replacement) => {
      if (!acc[replacement.file]) {
        acc[replacement.file] = [];
      }
      acc[replacement.file].push(replacement);
      return acc;
    },
    {} as Record<string, ColorReplacement[]>
  );

  console.log(
    chalk.yellow(
      `\nFound ${replacements.length} hardcoded colors in ${Object.keys(replacementsByFile).length} files\n`
    )
  );

  // Show preview of replacements
  let fileCount = 0;
  for (const [file, fileReplacements] of Object.entries(replacementsByFile)) {
    if (fileCount < 5) {
      console.log(chalk.cyan(`\n${file.replace('src/', '')}:`));
      fileReplacements.slice(0, 3).forEach((r) => {
        console.log(
          chalk.gray(`  Line ${r.line}: ${r.original} → ${r.replacement}`)
        );
      });
      if (fileReplacements.length > 3) {
        console.log(
          chalk.gray(`  ... and ${fileReplacements.length - 3} more`)
        );
      }
    }
    fileCount++;
  }

  if (Object.keys(replacementsByFile).length > 5) {
    console.log(
      chalk.gray(
        `\n... and ${Object.keys(replacementsByFile).length - 5} more files`
      )
    );
  }

  // Ask for confirmation
  console.log(
    chalk.yellow(
      '\n⚠️  This will modify multiple files. Make sure you have committed your changes.'
    )
  );
  console.log(chalk.green('\nProceeding with replacements...\n'));

  // Perform replacements
  let successCount = 0;
  for (const [file, fileReplacements] of Object.entries(replacementsByFile)) {
    try {
      await replaceColorsInFile(file, fileReplacements);
      successCount++;
      process.stdout.write(chalk.green('.'));
    } catch (error) {
      console.error(chalk.red(`\nError processing ${file}:`), error);
    }
  }

  console.log(
    chalk.green(`\n\n✅ Successfully updated ${successCount} files!`)
  );
  console.log(chalk.blue('\n💡 Next steps:'));
  console.log(chalk.gray('  1. Review the changes with: git diff'));
  console.log(chalk.gray('  2. Run tests to ensure nothing broke'));
  console.log(
    chalk.gray('  3. Update any missing CSS variables in madfam-tokens.css')
  );
  console.log(chalk.gray('  4. Run npm run health:themes to verify'));
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
