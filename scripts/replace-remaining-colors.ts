#!/usr/bin/env tsx
import fs from 'fs';
import { glob } from 'glob';
import chalk from 'chalk';

// Additional color mappings for remaining hardcoded colors
const additionalColorMappings: Record<string, string> = {
  // SVG and placeholder colors
  '#F4E5D3': 'var(--madfam-gray-100)', // Paper background
  '#E74C3C': 'var(--color-error)', // Error/alert color
  '#2C3E50': 'var(--madfam-gray-800)', // Dark text
  '#666': 'var(--madfam-gray-600)', // Gray text
  '#666666': 'var(--madfam-gray-600)',

  // Paper aging effects
  'rgba(139, 119, 101, 0.02)': 'rgba(139, 119, 101, 0.02)', // Keep as is - paper texture
  'rgba(139, 119, 101, 0.015)': 'rgba(139, 119, 101, 0.015)',
  'rgba(139, 119, 101, 0.01)': 'rgba(139, 119, 101, 0.01)',
  'rgba(139, 119, 101, 0.008)': 'rgba(139, 119, 101, 0.008)',

  // Subtle background overlays
  'rgba(0, 0, 0, 0.05)': 'var(--hover-overlay)',
  'rgba(0, 0, 0, 0.06)': 'var(--hover-overlay)',
  'rgba(0, 0, 0, 0.02)': 'var(--paper-texture-opacity)',
  'rgba(0, 0, 0, 0.03)': 'var(--paper-texture-opacity)',

  // Bootstrap/common colors that might be in the codebase
  '#28a745': 'var(--madfam-green)',
  '#dc3545': 'var(--color-error)',
  '#ffc107': 'var(--madfam-yellow)',
  '#17a2b8': 'var(--madfam-blue)',
  '#6c757d': 'var(--madfam-gray-700)',
  '#343a40': 'var(--madfam-gray-900)',
  '#f8f9fa': 'var(--madfam-gray-100)',
  '#e9ecef': 'var(--madfam-gray-300)',
  '#dee2e6': 'var(--madfam-gray-400)',
  '#ced4da': 'var(--madfam-gray-400)',
  '#adb5bd': 'var(--madfam-gray-500)',
  '#495057': 'var(--madfam-gray-800)',

  // Material design colors that might be used
  '#3f51b5': 'var(--madfam-blue)',
  '#009688': 'var(--madfam-green)',
  '#ff5722': 'var(--color-error)',
  '#795548': 'var(--madfam-gray-700)',
  '#607d8b': 'var(--madfam-gray-600)',

  // Additional grays
  '#333': 'var(--madfam-gray-900)',
  '#333333': 'var(--madfam-gray-900)',
  '#555': 'var(--madfam-gray-700)',
  '#555555': 'var(--madfam-gray-700)',
  '#777': 'var(--madfam-gray-600)',
  '#777777': 'var(--madfam-gray-600)',
  '#999': 'var(--madfam-gray-500)',
  '#999999': 'var(--madfam-gray-500)',
  '#ccc': 'var(--madfam-gray-400)',
  '#cccccc': 'var(--madfam-gray-400)',
  '#ddd': 'var(--madfam-gray-300)',
  '#dddddd': 'var(--madfam-gray-300)',
  '#eee': 'var(--madfam-gray-300)',
  '#eeeeee': 'var(--madfam-gray-300)',
  '#f0f0f0': 'var(--madfam-gray-200)',
  '#f5f5f5': 'var(--madfam-gray-200)',
  '#fafafa': 'var(--madfam-gray-100)',

  // Special magazine colors
  '#4CAF50': 'var(--madfam-green)',
  '#FFC107': 'var(--madfam-yellow)',
  '#663399': 'var(--madfam-purple)',
  '#2196F3': 'var(--madfam-blue)',
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
      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('/*')) {
        return;
      }

      // Check each color mapping
      Object.entries(additionalColorMappings).forEach(([color, variable]) => {
        if (line.includes(color)) {
          // Special handling for SVG colors in templates
          // const isSvgContext =
          //   line.includes('fill=') ||
          //   line.includes('stroke=') ||
          //   line.includes('lighting-color=') ||
          //   line.includes('<svg');

          // Skip paper texture colors as they're intentionally hardcoded
          if (color.includes('139, 119, 101')) {
            return;
          }

          // Skip if it's already in a CSS variable definition
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
    // Special handling for SVG contexts
    if (
      replacement.context.includes('fill=') ||
      replacement.context.includes('stroke=')
    ) {
      // For SVG, we can't use CSS variables directly, so skip these
      console.log(
        chalk.yellow(`  Skipping SVG color in ${file}:${replacement.line}`)
      );
      continue;
    }

    // Replace the color
    content = content.replace(
      new RegExp(
        replacement.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'g'
      ),
      replacement.replacement
    );
  }

  await fs.promises.writeFile(file, content, 'utf-8');
}

async function main() {
  console.log(chalk.blue('🎨 Replacing remaining hardcoded colors...\n'));

  // Find all files
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

  // Filter out SVG-related replacements
  const validReplacements = replacements.filter(
    (r) =>
      !r.context.includes('fill=') &&
      !r.context.includes('stroke=') &&
      !r.context.includes('lighting-color=')
  );

  // Group replacements by file
  const replacementsByFile = validReplacements.reduce(
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
      `\nFound ${validReplacements.length} replaceable colors in ${Object.keys(replacementsByFile).length} files\n`
    )
  );

  // Show preview
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
  console.log(
    chalk.yellow(
      `\n⚠️  Note: ${replacements.length - validReplacements.length} SVG colors were skipped (they cannot use CSS variables)`
    )
  );
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
