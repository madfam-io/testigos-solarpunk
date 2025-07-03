#!/usr/bin/env node

/**
 * Script to migrate hardcoded texts to i18n
 * This will systematically replace hardcoded texts with i18n keys
 */

import fs from 'fs/promises';
// import { glob } from 'glob'; // Reserved for future use
import path from 'path';

// Read the i18n health check report
async function getHardcodedTexts() {
  const reportPath = path.join(process.cwd(), 'reports/i18n-health-check.json');
  const report = JSON.parse(await fs.readFile(reportPath, 'utf-8'));
  return report.hardcodedText;
}

// Group texts by file
function groupByFile(texts: any[]) {
  const grouped: Record<string, any[]> = {};
  for (const text of texts) {
    if (!grouped[text.file]) {
      grouped[text.file] = [];
    }
    grouped[text.file].push(text);
  }
  return grouped;
}

// Priority replacements - common UI elements
const commonReplacements: Record<string, string> = {
  // Navigation
  Inicio: 't("nav.home")',
  'El Proyecto': 't("nav.project")',
  Contenido: 't("nav.content")',
  Sketches: 't("nav.sketches")',
  Podcast: 't("nav.podcast")',
  MADLAB: 't("nav.madlab")',
  Comunidad: 't("nav.community")',
  Impacto: 't("nav.impact")',

  // Common actions
  'Ver más': 't("button.learn.more")',
  'Conoce más': 't("button.learn.more")',
  'Leer más': 't("button.read.more")',
  Siguiente: 't("button.next")',
  Anterior: 't("button.previous")',
  Cerrar: 't("button.close")',
  Enviar: 't("button.submit")',

  // Common titles
  'Testigos de Solarpunk': 't("site.title")',
  'Un universo narrativo evangelista ecológico': 't("hero.subtitle")',

  // Sections
  'Nuestro Impacto': 't("impact.title")',
  'Filosofía del Proyecto': 't("philosophy.title")',
  'Únete a la Comunidad': 't("community.join.title")',
  'Mapa del Sitio': 't("footer.sitemap")',

  // Status
  Próximamente: 't("status.coming.soon")',
  'En Construcción': 't("status.under.construction")',
  Nuevo: 't("status.new")',
};

async function migrateFile(filePath: string, texts: any[]) {
  const fullPath = path.join(process.cwd(), 'src', filePath);
  let content = await fs.readFile(fullPath, 'utf-8');
  let replacements = 0;

  // Sort texts by line number in reverse to avoid offset issues
  texts.sort((a, b) => b.line - a.line);

  for (const { text } of texts) {
    // Check if this text has a common replacement
    if (commonReplacements[text]) {
      // Simple replacement for common texts
      const searchPattern = new RegExp(
        `(['"\`])${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`,
        'g'
      );
      const before = content;
      content = content.replace(searchPattern, `{${commonReplacements[text]}}`);
      if (content !== before) {
        replacements++;
      }
    }
  }

  if (replacements > 0) {
    // Check if file needs import
    if (!content.includes('import { t }') && !content.includes('const { t }')) {
      // Add import at the top of the file
      if (filePath.endsWith('.astro')) {
        content = content.replace(
          /^---/m,
          '---\nimport { t } from "@/i18n/utils";'
        );
      }
    }

    await fs.writeFile(fullPath, content);
    console.log(`✅ Migrated ${replacements} texts in ${filePath}`);
  }

  return replacements;
}

async function main() {
  console.log('🔄 Starting hardcoded text migration...\n');

  const hardcodedTexts = await getHardcodedTexts();
  const grouped = groupByFile(hardcodedTexts);

  console.log(
    `📊 Found ${hardcodedTexts.length} hardcoded texts in ${Object.keys(grouped).length} files\n`
  );

  let totalReplacements = 0;

  // Process files with most common texts first
  const sortedFiles = Object.entries(grouped)
    .filter(([file]) => file.endsWith('.astro')) // Only process Astro files for now
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 10); // Process top 10 files first

  for (const [file, texts] of sortedFiles) {
    try {
      const count = await migrateFile(file, texts);
      totalReplacements += count;
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }

  console.log(
    `\n✨ Migration complete! Replaced ${totalReplacements} hardcoded texts`
  );
  console.log('\n📝 Next steps:');
  console.log('1. Review the changes');
  console.log('2. Run tests to ensure everything works');
  console.log('3. Add any missing translation keys to i18n/config.ts');
}

main().catch(console.error);
