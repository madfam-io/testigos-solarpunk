#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL mappings from Spanish to English
const urlMappings = {
  '/en/proyecto/': '/en/project/',
  '/en/contenido/sketches/': '/en/content/sketches/',
  '/en/contenido/podcast/': '/en/content/podcast/',
  '/en/contenido/madlab/': '/en/content/madlab/',
  '/en/personajes/': '/en/characters/',
  '/en/filosofia/': '/en/philosophy/',
  '/en/formatos/': '/en/formats/',
  '/en/comunidad/': '/en/community/',
  '/en/impacto/': '/en/impact/',
  '/en/recursos/': '/en/resources/',
  '/en/produccion/': '/en/production/',
  '/en/mundo/': '/en/world/',
  '/en/guiones/': '/en/scripts/',
  // Without trailing slashes
  '/en/proyecto': '/en/project',
  '/en/contenido/sketches': '/en/content/sketches',
  '/en/contenido/podcast': '/en/content/podcast',
  '/en/contenido/madlab': '/en/content/madlab',
  '/en/personajes': '/en/characters',
  '/en/filosofia': '/en/philosophy',
  '/en/formatos': '/en/formats',
  '/en/comunidad': '/en/community',
  '/en/impacto': '/en/impact',
  '/en/recursos': '/en/resources',
  '/en/produccion': '/en/production',
  '/en/mundo': '/en/world',
  '/en/guiones': '/en/scripts',
};

async function fixEnglishUrls(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    let modified = false;

    // Replace all Spanish URLs with English ones
    for (const [spanish, english] of Object.entries(urlMappings)) {
      if (content.includes(spanish)) {
        content = content.replace(
          new RegExp(spanish.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          english
        );
        modified = true;
      }
    }

    if (modified) {
      await fs.writeFile(filePath, content);
      console.log(
        `✅ Fixed URLs in: ${path.relative(process.cwd(), filePath)}`
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

  console.log('🔍 Finding English pages to fix URLs...');
  const files = await findEnglishPages(englishPagesDir);

  for (const file of files) {
    await fixEnglishUrls(file);
  }

  console.log('\n✨ URL fixing completed!');
}

main().catch(console.error);
