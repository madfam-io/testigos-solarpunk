#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fixUnusedTranslation(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');

    // Check if file uses translation function but doesn't actually use it
    if (
      content.includes('const t = useTranslations(lang);') &&
      !content.includes('{t(')
    ) {
      content = content.replace(
        'const t = useTranslations(lang);',
        'const _t = useTranslations(lang);'
      );

      await fs.writeFile(filePath, content);
      console.log(
        `✅ Fixed unused translation: ${path.relative(process.cwd(), filePath)}`
      );
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

async function findEnglishPages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findEnglishPages(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.astro')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const englishPagesDir = path.join(__dirname, '..', 'src', 'pages', 'en');

  console.log('🔍 Finding English pages with unused translation functions...');
  const files = await findEnglishPages(englishPagesDir);

  let fixedCount = 0;
  for (const file of files) {
    const wasFixed = await fixUnusedTranslation(file);
    if (wasFixed) fixedCount++;
  }

  console.log(
    `\n✨ Fixed ${fixedCount} files with unused translation functions!`
  );
}

main().catch(console.error);
