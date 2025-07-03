#!/usr/bin/env node

/**
 * Script to fix conflicts between local and global t function imports
 */

import fs from 'fs/promises';
import { glob } from 'glob';

async function fixFile(filePath: string): Promise<boolean> {
  let content = await fs.readFile(filePath, 'utf-8');

  // Check if file has both useTranslations and global t import
  const hasUseTranslations = content.includes('useTranslations');
  const hasGlobalTImport = content.includes(
    "import { t } from '@/i18n/config'"
  );

  if (hasUseTranslations && hasGlobalTImport) {
    // Remove the global t import
    content = content.replace(/import { t } from '@\/i18n\/config';\n/g, '');
    await fs.writeFile(filePath, content, 'utf-8');
    return true;
  }

  return false;
}

async function main() {
  console.log('🔧 Fixing t function import conflicts...\n');

  // Find all Astro files
  const files = await glob('src/**/*.astro', {
    ignore: ['**/node_modules/**', '**/dist/**'],
  });

  let fixedCount = 0;

  for (const file of files) {
    const fixed = await fixFile(file);
    if (fixed) {
      console.log(`✅ Fixed: ${file}`);
      fixedCount++;
    }
  }

  console.log(`\n✨ Fixed ${fixedCount} files with t function conflicts.`);
}

main().catch(console.error);
