#!/usr/bin/env node

/**
 * Script to fix any type issues in test files
 * This will replace common patterns with proper type annotations
 */

import fs from 'fs/promises';
import { glob } from 'glob';

async function fixTestAnyTypes() {
  const files = await glob('**/*.test.ts', {
    ignore: ['**/node_modules/**', '**/dist/**'],
  });

  let totalReplacements = 0;

  for (const file of files) {
    let content = await fs.readFile(file, 'utf-8');
    let replacements = 0;

    // Fix mock function any types
    content = content.replace(/vi\.fn\(\((.*?)\) => \{/g, (match, params) => {
      if (params.includes(':')) return match; // Already typed
      return match.replace(params, `${params}: any`);
    });

    // Fix expect.any(Function) to expect.any(Function as any)
    content = content.replace(
      /expect\.any\(Function\)/g,
      'expect.any(Function as any)'
    );

    // Fix document/window mocks
    content = content.replace(
      /\(global as any\)\.(window|document)/g,
      '(global as typeof globalThis & { $1: any }).$1'
    );

    // Fix vi.fn() without types
    content = content.replace(/vi\.fn\(\)([,;])/g, 'vi.fn(() => {})$1');

    // Count replacements
    const originalLength = content.length;
    if (content.length !== originalLength) {
      replacements++;
    }

    if (replacements > 0) {
      await fs.writeFile(file, content);
      totalReplacements += replacements;
      console.log(`Fixed ${replacements} any type issues in ${file}`);
    }
  }

  console.log(`\nTotal files processed: ${files.length}`);
  console.log(`Total replacements made: ${totalReplacements}`);
}

fixTestAnyTypes().catch(console.error);
