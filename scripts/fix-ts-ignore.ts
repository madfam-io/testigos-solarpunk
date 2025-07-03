#!/usr/bin/env node

/**
 * Script to replace @ts-ignore with @ts-expect-error
 * This is required by our ESLint configuration
 */

import fs from 'fs/promises';
import { glob } from 'glob';

async function replaceTsIgnore() {
  const files = await glob('src/**/*.{ts,tsx,js,jsx,astro}', {
    ignore: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
  });

  let totalReplacements = 0;
  const affectedFiles: string[] = [];

  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');
    const newContent = content.replace(
      /\/\/\s*@ts-ignore/g,
      '// @ts-expect-error'
    );

    if (content !== newContent) {
      await fs.writeFile(file, newContent, 'utf-8');
      const replacements = (content.match(/\/\/\s*@ts-ignore/g) || []).length;
      totalReplacements += replacements;
      affectedFiles.push(file);
      console.log(`✅ Fixed ${replacements} @ts-ignore in ${file}`);
    }
  }

  console.log('\n📊 Summary:');
  console.log(`Total files scanned: ${files.length}`);
  console.log(`Files modified: ${affectedFiles.length}`);
  console.log(`Total @ts-ignore replaced: ${totalReplacements}`);
}

replaceTsIgnore().catch(console.error);
