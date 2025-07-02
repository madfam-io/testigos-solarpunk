#!/usr/bin/env node

/**
 * Script to fix files that use {t(...)} but don't have the t function defined
 */

import fs from 'fs/promises';
import { glob } from 'glob';

async function fixFile(filePath: string): Promise<boolean> {
  let content = await fs.readFile(filePath, 'utf-8');
  
  // Check if file uses {t(...)}
  const usesTFunction = content.includes('{t(');
  if (!usesTFunction) {
    return false;
  }
  
  // Check if t is already defined
  const hasTDefined = content.includes('const t = useTranslations(') || 
                      content.includes('const { t } = ');
  
  if (hasTDefined) {
    return false;
  }
  
  // Check if useTranslations is imported but commented or not used
  const hasUseTranslationsImport = content.includes('import { useTranslations }') || 
                                    content.includes('// import { useTranslations }');
  
  // Find the lang variable
  const langMatch = content.match(/const lang = ['"](\w+)['"]/);
  if (!langMatch) {
    console.warn(`⚠️  Could not find lang variable in ${filePath}`);
    return false;
  }
  
  // const lang = langMatch[1]; // Not needed - we use it directly in replacements
  
  // Fix the import if it's commented
  if (content.includes('// import { useTranslations }')) {
    content = content.replace('// import { useTranslations }', 'import { useTranslations }');
  } else if (!hasUseTranslationsImport) {
    // Add the import after BaseLayout import
    content = content.replace(
      /import BaseLayout from.*?;\n/,
      (match) => `${match}import { useTranslations } from '@/i18n/config';\n`
    );
  }
  
  // Add or fix the t function definition
  // Look for commented out t definition
  if (content.includes('// const _t = useTranslations(')) {
    content = content.replace(
      /\/\/ const _t = useTranslations\(.*?\);.*?\n/,
      `const t = useTranslations(lang);\n`
    );
  } else if (content.includes('// const t = useTranslations(')) {
    content = content.replace(
      /\/\/ const t = useTranslations\(.*?\);.*?\n/,
      `const t = useTranslations(lang);\n`
    );
  } else {
    // Add t definition after lang definition
    content = content.replace(
      /const lang = ['"](\w+)['"](.*?)\n/,
      `const lang = '$1'$2\nconst t = useTranslations(lang);\n`
    );
  }
  
  await fs.writeFile(filePath, content, 'utf-8');
  return true;
}

async function main() {
  console.log('🔧 Fixing missing t function definitions...\n');
  
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
  
  console.log(`\n✨ Fixed ${fixedCount} files with missing t function.`);
}

main().catch(console.error);