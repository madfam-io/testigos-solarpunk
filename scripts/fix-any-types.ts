#!/usr/bin/env node

/**
 * Script to identify and help fix explicit any types
 * This identifies patterns that can be safely replaced
 */

import fs from 'fs/promises';
import { glob } from 'glob';

interface AnyTypeOccurrence {
  file: string;
  line: number;
  content: string;
  suggestion?: string;
}

async function findAnyTypes() {
  const files = await glob('src/**/*.{ts,tsx}', {
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/*.test.ts',
      '**/*.spec.ts',
    ],
  });

  const occurrences: AnyTypeOccurrence[] = [];

  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Common patterns of any usage
      const patterns = [
        // as any patterns
        /\bas\s+any\b/g,
        // : any patterns
        /:\s*any\b/g,
        // <any> patterns
        /<any>/g,
        // Array<any> patterns
        /Array<any>/g,
        // any[] patterns
        /any\[\]/g,
      ];

      patterns.forEach((pattern) => {
        if (pattern.test(line)) {
          let suggestion: string | undefined;

          // Suggest fixes for common patterns
          if (line.includes('as any')) {
            if (line.includes('[') && line.includes(']')) {
              suggestion =
                'Consider using proper type assertion or index signature';
            } else {
              suggestion =
                'Consider removing type assertion or using proper type';
            }
          } else if (line.includes(': any')) {
            if (line.includes('error') || line.includes('Error')) {
              suggestion = 'Use : Error or : unknown for error types';
            } else if (line.includes('event')) {
              suggestion =
                'Use proper event type (e.g., Event, CustomEvent<T>)';
            } else {
              suggestion =
                'Use : unknown if type is truly unknown, or define proper interface';
            }
          }

          occurrences.push({
            file,
            line: index + 1,
            content: line.trim(),
            suggestion,
          });
        }
      });
    });
  }

  return occurrences;
}

async function generateReport() {
  const occurrences = await findAnyTypes();

  console.log('🔍 Any Type Usage Report\n');
  console.log(`Total occurrences: ${occurrences.length}\n`);

  // Group by file
  const byFile = occurrences.reduce(
    (acc, occ) => {
      if (!acc[occ.file]) acc[occ.file] = [];
      acc[occ.file].push(occ);
      return acc;
    },
    {} as Record<string, AnyTypeOccurrence[]>
  );

  // Sort files by number of occurrences
  const sortedFiles = Object.entries(byFile).sort(
    ([, a], [, b]) => b.length - a.length
  );

  console.log('📁 Files with most any usage:\n');
  sortedFiles.slice(0, 10).forEach(([file, occs]) => {
    console.log(`${file}: ${occs.length} occurrences`);
  });

  console.log('\n🎯 Suggested fixes:\n');

  // Show first 20 occurrences with suggestions
  occurrences.slice(0, 20).forEach((occ) => {
    console.log(`${occ.file}:${occ.line}`);
    console.log(`  ${occ.content}`);
    if (occ.suggestion) {
      console.log(`  💡 ${occ.suggestion}`);
    }
    console.log('');
  });

  // Common patterns summary
  console.log('📊 Pattern Summary:');
  console.log(
    `- "as any" casts: ${occurrences.filter((o) => o.content.includes('as any')).length}`
  );
  console.log(
    `- ": any" type annotations: ${occurrences.filter((o) => o.content.includes(': any')).length}`
  );
  console.log(
    `- "any[]" arrays: ${occurrences.filter((o) => o.content.includes('any[]')).length}`
  );
  console.log(
    `- "Array<any>": ${occurrences.filter((o) => o.content.includes('Array<any>')).length}`
  );
}

generateReport().catch(console.error);
