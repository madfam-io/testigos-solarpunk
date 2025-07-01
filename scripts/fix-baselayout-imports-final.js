#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fixBaseLayoutImport(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');

    // Calculate the correct relative path based on actual file depth
    const enPagesDir = path.join(__dirname, '..', 'src', 'pages', 'en');
    const relativePath = path.relative(enPagesDir, filePath);
    const depth = relativePath.split(path.sep).length - 1; // -1 because the file itself doesn't count
    const correctPath = '../'.repeat(depth + 2) + 'layouts/BaseLayout.astro'; // +2 to go from /en to /src

    // Fix all possible BaseLayout import patterns
    const patterns = [
      /import BaseLayout from ['"][^'"]*layouts\/BaseLayout\.astro['"];/,
    ];

    let wasFixed = false;
    for (const pattern of patterns) {
      if (content.match(pattern)) {
        content = content.replace(
          pattern,
          `import BaseLayout from '${correctPath}';`
        );
        wasFixed = true;
        break;
      }
    }

    if (wasFixed) {
      await fs.writeFile(filePath, content);
      console.log(
        `✅ Fixed: ${path.relative(process.cwd(), filePath)} -> ${correctPath}`
      );
    } else {
      console.log(
        `⚠️  No BaseLayout import found in: ${path.relative(process.cwd(), filePath)}`
      );
    }
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

  console.log('🔍 Finding English pages to fix BaseLayout imports...');
  const files = await findEnglishPages(englishPagesDir);

  console.log(`📁 Found ${files.length} files to process`);

  for (const file of files) {
    await fixBaseLayoutImport(file);
  }

  console.log('\n✨ BaseLayout import fixing completed!');
}

main().catch(console.error);
