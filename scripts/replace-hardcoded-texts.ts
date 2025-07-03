#!/usr/bin/env node

/**
 * Script to replace hardcoded texts with i18n keys
 * This will systematically replace common UI texts with their translation keys
 */

import fs from 'fs/promises';
import { glob } from 'glob';

// Map of hardcoded texts to their i18n keys
const replacementMap: Record<string, string> = {
  // Navigation
  '"Inicio"': '{t("breadcrumb.home")}',
  '>Inicio<': '>{t("breadcrumb.home")}<',
  Inicio: '{t("breadcrumb.home")}',

  // Buttons
  '"Ver más"': '{t("ui.view.more")}',
  '>Ver más<': '>{t("ui.view.more")}<',
  '"Suscribir"': '{t("button.subscribe")}',
  '>Suscribir<': '>{t("button.subscribe")}<',
  '"Compartir"': '{t("button.share")}',
  '>Compartir<': '>{t("button.share")}<',
  '"Descargar"': '{t("ui.download")}',
  '>Descargar<': '>{t("ui.download")}<',
  '"Únete"': '{t("ui.join")}',
  '>Únete<': '>{t("ui.join")}<',

  // Social Media
  '"Instagram"': '{t("social.instagram")}',
  '>Instagram<': '>{t("social.instagram")}<',
  '"TikTok"': '{t("social.tiktok")}',
  '>TikTok<': '>{t("social.tiktok")}<',
  '"YouTube"': '{t("social.youtube")}',
  '>YouTube<': '>{t("social.youtube")}<',
  '"YouTube Shorts"': '{t("social.youtube.shorts")}',
  '>YouTube Shorts<': '>{t("social.youtube.shorts")}<',
  '"Instagram Reels"': '{t("social.instagram.reels")}',
  '>Instagram Reels<': '>{t("social.instagram.reels")}<',
  '"Twitter"': '{t("social.twitter")}',
  '>Twitter<': '>{t("social.twitter")}<',
  '"WhatsApp"': '{t("social.whatsapp")}',
  '>WhatsApp<': '>{t("social.whatsapp")}<',

  // Status
  '"En Desarrollo"': '{t("status.in.development")}',
  '>En Desarrollo<': '>{t("status.in.development")}<',
  '"Próximamente"': '{t("status.coming.soon")}',
  '>Próximamente<': '>{t("status.coming.soon")}<',
  '"En Producción"': '{t("status.in.production")}',
  '>En Producción<': '>{t("status.in.production")}<',
  '"Completado"': '{t("status.completed")}',
  '>Completado<': '>{t("status.completed")}<',

  // Sections
  '"Introducción"': '{t("section.introduction")}',
  '>Introducción<': '>{t("section.introduction")}<',
  '"Objetivos"': '{t("section.objectives")}',
  '>Objetivos<': '>{t("section.objectives")}<',
  '"Beneficios"': '{t("section.benefits")}',
  '>Beneficios<': '>{t("section.benefits")}<',
  '"Recursos"': '{t("section.resources")}',
  '>Recursos<': '>{t("section.resources")}<',
  '"Guías"': '{t("section.guides")}',
  '>Guías<': '>{t("section.guides")}<',

  // Production
  '"Producción"': '{t("production")}',
  '>Producción<': '>{t("production")}<',

  // Sponsors
  '"Qué Significa"': '{t("sponsors.what.it.means")}',
  '>Qué Significa<': '>{t("sponsors.what.it.means")}<',
  '"En la Práctica"': '{t("sponsors.in.practice")}',
  '>En la Práctica<': '>{t("sponsors.in.practice")}<',
  '"Para Patrocinadores"': '{t("sponsors.for.sponsors")}',
  '>Para Patrocinadores<': '>{t("sponsors.for.sponsors")}<',

  // ARIA labels
  'aria-label="Navegación de migas de pan"':
    'aria-label={t("aria.nav.breadcrumb")}',
  'aria-label="GitHub del proyecto (se abre en nueva ventana)"':
    'aria-label={t("aria.github.project")}',
  'aria-label="Cambiar a Español"': 'aria-label={t("aria.language.switch.es")}',
  'aria-label="Switch to English"': 'aria-label={t("aria.language.switch.en")}',

  // Loading
  '"Cargando tu experiencia"': '{t("loading.experience")}',
  '>Cargando tu experiencia<': '>{t("loading.experience")}<',

  // Footer
  '"Construcción del Mundo"': '{t("footer.world.building")}',
  '>Construcción del Mundo<': '>{t("footer.world.building")}<',
  '"Universo Creativo"': '{t("footer.creative.universe")}',
  '>Universo Creativo<': '>{t("footer.creative.universe")}<',
  '"Biblia de Personajes"': '{t("footer.character.bible")}',
  '>Biblia de Personajes<': '>{t("footer.character.bible")}<',
  '"Repositorio de Guiones"': '{t("footer.script.repository")}',
  '>Repositorio de Guiones<': '>{t("footer.script.repository")}<',
  '"Para Creadores"': '{t("footer.for.creators")}',
  '>Para Creadores<': '>{t("footer.for.creators")}<',
  '"Guías y Plantillas"': '{t("footer.guides.templates")}',
  '>Guías y Plantillas<': '>{t("footer.guides.templates")}<',
  '"Guía de Estilo"': '{t("footer.style.guide")}',
  '>Guía de Estilo<': '>{t("footer.style.guide")}<',
  '"Guía Visual"': '{t("footer.visual.guide")}',
  '>Guía Visual<': '>{t("footer.visual.guide")}<',

  // Languages
  '"Español"': '{t("language.spanish")}',
  '>Español<': '>{t("language.spanish")}<',
  '"English"': '{t("language.english")}',
  '>English<': '>{t("language.english")}<',

  // Media
  '"Audio"': '{t("media.audio")}',
  '>Audio<': '>{t("media.audio")}<',

  // Title attributes
  'title="Redirecting to language preference..."':
    'title={t("misc.redirect.language")}',

  // Alt attributes
  'alt="Testigos de Solarpunk"': 'alt={t("site.title")}',
};

/**
 * Process a single file
 */
async function processFile(filePath: string): Promise<number> {
  let content = await fs.readFile(filePath, 'utf-8');
  let replacements = 0;
  let modified = false;

  // Check if file imports the t function
  const hasTranslationImport =
    content.includes('import { t }') ||
    content.includes('import { t,') ||
    content.includes('const { t }') ||
    content.includes('const { t,');

  // Apply replacements
  for (const [search, replace] of Object.entries(replacementMap)) {
    const regex = new RegExp(
      search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      'g'
    );
    const matches = content.match(regex);

    if (matches) {
      content = content.replace(regex, replace);
      replacements += matches.length;
      modified = true;
    }
  }

  // If we made replacements and the file doesn't have t imported, add import
  if (modified && !hasTranslationImport && filePath.endsWith('.astro')) {
    // Find the frontmatter section
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];

      // Check if there are already imports
      if (frontmatter.includes('import ')) {
        // Add after the last import
        const lastImportIndex = frontmatter.lastIndexOf('import ');
        const lineEnd = frontmatter.indexOf('\n', lastImportIndex);
        const beforeImport = frontmatter.substring(0, lineEnd + 1);
        const afterImport = frontmatter.substring(lineEnd + 1);

        const newFrontmatter =
          beforeImport + "import { t } from '@/i18n/config';\n" + afterImport;
        content = content.replace(
          frontmatterMatch[0],
          `---\n${newFrontmatter}\n---`
        );
      } else {
        // Add as first line in frontmatter
        const newFrontmatter =
          "import { t } from '@/i18n/config';\n" + frontmatter;
        content = content.replace(
          frontmatterMatch[0],
          `---\n${newFrontmatter}\n---`
        );
      }
    }
  }

  // Write back if modified
  if (modified) {
    await fs.writeFile(filePath, content, 'utf-8');
  }

  return replacements;
}

/**
 * Main function
 */
async function main() {
  console.log('🔄 Starting hardcoded text replacement...\n');

  // Find all Astro files
  const files = await glob('src/**/*.astro', {
    ignore: ['**/node_modules/**', '**/dist/**'],
  });

  console.log(`Found ${files.length} Astro files to process\n`);

  let totalReplacements = 0;
  let filesModified = 0;

  // Process each file
  for (const file of files) {
    const replacements = await processFile(file);

    if (replacements > 0) {
      console.log(`✅ ${file}: ${replacements} replacements`);
      totalReplacements += replacements;
      filesModified++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`- Files processed: ${files.length}`);
  console.log(`- Files modified: ${filesModified}`);
  console.log(`- Total replacements: ${totalReplacements}`);

  if (totalReplacements > 0) {
    console.log(
      '\n✨ Success! Hardcoded texts have been replaced with i18n keys.'
    );
    console.log('🔍 Please review the changes and test the application.');
  } else {
    console.log('\n✅ No hardcoded texts found to replace.');
  }
}

// Run the script
main().catch(console.error);
