#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Common translation replacements for English pages
const commonTranslations = [
  // Navigation items
  ['Ver Sketches', "t('cta.watch')"],
  ['Ver Más', "t('cta.learn')"],
  ['Saber Más', "t('cta.learn')"],
  ['Descubrir', "t('cta.discover')"],
  ['Explorar', "t('cta.explore')"],
  ['Participar', "t('cta.participate')"],
  ['Conectar', "t('cta.connect')"],
  ['Únete a la Comunidad', "t('cta.connect')"],
  ['Ver Contenido', "t('cta.watch')"],

  // Common phrases
  ['En Producción', "t('phase1.status')"],
  ['Próximamente', "t('phase2.status')"],
  ['En Desarrollo', "t('phase3.status')"],
];

async function processEnglishPage(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');

    // Check if it already has translation import
    if (!content.includes("import { useTranslations } from '@/i18n/config';")) {
      // Add import after BaseLayout import
      content = content.replace(
        /import BaseLayout from ['"](\.\.\/)+layouts\/BaseLayout\.astro['"];/,
        `import BaseLayout from '../../layouts/BaseLayout.astro';
import { useTranslations } from '@/i18n/config';`
      );

      // Add language setup in frontmatter
      const frontmatterEnd = content.indexOf('---', 3);
      if (frontmatterEnd !== -1) {
        content =
          content.slice(0, frontmatterEnd) +
          "\nconst lang = 'en';\nconst t = useTranslations(lang);\n" +
          content.slice(frontmatterEnd);
      }
    }

    // Update lang attribute
    content = content.replace(/lang="en"/g, 'lang={lang}');

    // Apply common translations
    for (const [spanish, translation] of commonTranslations) {
      // Replace in text content
      const regex = new RegExp(`>\\s*${spanish}\\s*<`, 'g');
      content = content.replace(regex, `>{${translation}}<`);

      // Replace in attributes
      const attrRegex = new RegExp(`="${spanish}"`, 'g');
      content = content.replace(attrRegex, `={${translation}}`);
    }

    await fs.writeFile(filePath, content);
    console.log(`✅ Processed: ${path.relative(process.cwd(), filePath)}`);
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

  console.log('🔍 Finding English pages to translate...');
  const files = await findEnglishPages(englishPagesDir);

  console.log(`📁 Found ${files.length} files to process`);

  for (const file of files) {
    await processEnglishPage(file);
  }

  console.log('\n✨ Translation helper script completed!');
  console.log('⚠️  Note: This script only handles common translations.');
  console.log(
    '📝 You will need to manually review and complete page-specific translations.'
  );
}

main().catch(console.error);
