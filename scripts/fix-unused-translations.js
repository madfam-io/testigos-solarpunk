#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fixUnusedTranslations(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');

    // Replace const t = with const _t = if t is not used in the file
    if (
      content.includes('const t = useTranslations(lang);') &&
      !content.includes('{t(') &&
      !content.includes(' t(') &&
      !content.includes('>{t(')
    ) {
      content = content.replace(
        'const t = useTranslations(lang);',
        'const _t = useTranslations(lang);'
      );
    }

    await fs.writeFile(filePath, content);
    console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
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

  console.log('🔍 Finding English pages to fix unused translations...');
  const files = await findEnglishPages(englishPagesDir);

  for (const file of files) {
    await fixUnusedTranslations(file);
  }

  console.log('\n✨ Fixed unused translation variables!');
}

main().catch(console.error);
