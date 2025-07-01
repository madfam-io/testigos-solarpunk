#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Spanish to English translation mappings for common content
const translations = {
  // Page titles and metadata
  'title="Filosofía del Proyecto"': 'title={t("philosophy.title")}',
  'title="Impacto"': 'title={t("impact.title")}',
  'title="Personajes"': 'title={t("characters.title")}',
  'title="MADLAB - Fase 3"': 'title={t("madlab.title")}',
  'title="Podcast - Fase 2"': 'title={t("podcast.title")}',
  'title="Guía de Estilo Visual"': 'title={t("production.visual.title")}',

  // Common headings
  '"La Visión Evangelizadora"': '{t("philosophy.hero.title")}',
  '"Concepto Central"': '{t("philosophy.concept.title")}',
  '"Objetivos del Proyecto"': '{t("philosophy.objectives.title")}',
  '"Los Mandamientos Solarpunk"': '{t("philosophy.commandments.title")}',
  '"Palabras de los Profetas"': '{t("philosophy.quotes.title")}',
  '"Hoja de Ruta de la Evangelización"': '{t("philosophy.roadmap.title")}',
  '"¿Listo para Unirte a la Misión?"': '{t("philosophy.cta.title")}',

  '"Nuestro Impacto"': '{t("impact.title")}',
  '"Métricas en Tiempo Real"': '{t("impact.metrics.title")}',
  '"Impacto por Fase"': '{t("impact.phases.title")}',
  '"Historias de Cambio"': '{t("impact.stories.title")}',
  '"Crecimiento del Movimiento"': '{t("impact.growth.title")}',
  '"Aliados del Cambio"': '{t("impact.partners.title")}',
  '"Sé Parte del Impacto"': '{t("impact.cta.title")}',

  '"Personajes del Universo"': '{t("characters.hero.title")}',
  '"Conoce a los habitantes de Neo-Cuernavaca"':
    '{t("characters.hero.subtitle")}',
  '"¿Quieres conocer más sobre estos personajes?"':
    '{t("characters.cta.title")}',
  '"Explora los guiones para ver a estos personajes en acción"':
    '{t("characters.cta.description")}',
  '"Ver Guiones"': '{t("characters.cta.scripts")}',

  '"MADLAB"': '{t("madlab.hero.title")}',
  '"Laboratorios de innovación sostenible"': '{t("madlab.hero.subtitle")}',
  '"¿Qué es MADLAB?"': '{t("madlab.what.title")}',
  '"Programas MADLAB"': '{t("madlab.programs.title")}',
  '"Impacto Esperado"': '{t("madlab.timeline.title")}',
  '"Patrocinadores"': '{t("madlab.sponsors.title")}',
  '"Para Escuelas"': '{t("madlab.cta.schools")}',
  '"Para Voluntarios"': '{t("madlab.cta.volunteers")}',

  '"MADFAM Podcast"': '{t("podcast.hero.title")}',
  '"Lo que viene"': '{t("podcast.coming.title")}',
  '"Contenido Profundo"': '{t("podcast.features.deep")}',
  '"Invitados Expertos"': '{t("podcast.features.experts")}',
  '"Soluciones Prácticas"': '{t("podcast.features.solutions")}',
  '"Temas Relevantes"': '{t("podcast.features.relevant")}',
  '"Temas que Exploraremos"': '{t("podcast.topics.title")}',
  '"Sé el primero en escuchar"': '{t("podcast.notify.title")}',
  '"Notificarme"': '{t("podcast.notify.cta")}',
  '"Mientras tanto..."': '{t("podcast.meanwhile.title")}',

  // Common UI elements
  '"Todos"': '{t("characters.filters.all")}',
  '"Protagonistas"': '{t("characters.filters.protagonists")}',
  '"Evangelistas"': '{t("characters.filters.evangelists")}',
  '"Apoyo"': '{t("characters.filters.support")}',
  '"Ver"': '{t("cta.watch")}',
  '"Crear"': '{t("participation.create.cta")}',
  '"Únete"': '{t("cta.connect")}',
  '"Conoce"': '{t("cta.learn")}',
  '"Apoyar el Proyecto"': '{t("impact.cta.support")}',
  '"Unirse como Voluntario"': '{t("impact.cta.volunteer")}',
  '"Volver a Producción"': '{t("production.back")}',

  // Phase labels
  '"Fase 1: Atracción"': '{t("phase1.title")}',
  '"Fase 2: Conexión"': '{t("phase2.title")}',
  '"Fase 3: Conversión"': '{t("phase3.title")}',

  // Navigation and links updates (fix href paths)
  'href="/contenido/sketches"': 'href="/en/content/sketches"',
  'href="/contenido/podcast"': 'href="/en/content/podcast"',
  'href="/contenido/madlab"': 'href="/en/content/madlab"',
  'href="/comunidad"': 'href="/en/community"',
  'href="/personajes"': 'href="/en/characters"',
  'href="/filosofia"': 'href="/en/philosophy"',
  'href="/impacto"': 'href="/en/impact"',
  'href="/produccion"': 'href="/en/production"',
  'href="/recursos"': 'href="/en/resources"',

  // Fix basePath URLs too
  '${basePath}/contenido/sketches': '${basePath}/en/content/sketches',
  '${basePath}/contenido/podcast': '${basePath}/en/content/podcast',
  '${basePath}/contenido/madlab': '${basePath}/en/content/madlab',
  '${basePath}/comunidad': '${basePath}/en/community',
  '${basePath}/personajes': '${basePath}/en/characters',
  '${basePath}/filosofia': '${basePath}/en/philosophy',
  '${basePath}/impacto': '${basePath}/en/impact',
  '${basePath}/produccion': '${basePath}/en/production',
  '${basePath}/recursos': '${basePath}/en/resources',

  // Fix translation function calls
  'const _t = useTranslations(lang);': 'const t = useTranslations(lang);',
  '{_t(': '{t(',
};

async function fixEnglishPage(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    let wasModified = false;

    // Apply translations
    for (const [spanish, english] of Object.entries(translations)) {
      if (content.includes(spanish)) {
        content = content.replace(
          new RegExp(spanish.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          english
        );
        wasModified = true;
      }
    }

    // Ensure translation function is defined early
    if (
      content.includes('const t = useTranslations(lang);') &&
      !content.includes("const lang = 'en';")
    ) {
      content = content.replace(
        'const t = useTranslations(lang);',
        "const lang = 'en';\nconst t = useTranslations(lang);"
      );
      wasModified = true;
    }

    // Move lang/t definitions before data structures if they exist
    const langDefinition =
      "const lang = 'en';\nconst t = useTranslations(lang);";
    if (content.includes(langDefinition) && content.includes('const ')) {
      // Find first const after imports
      const importEnd = content.lastIndexOf('import ');
      if (importEnd > -1) {
        const afterImports = content.substring(importEnd);
        const nextConst = afterImports.indexOf('\nconst ');
        if (
          nextConst > -1 &&
          !afterImports.substring(0, nextConst).includes('const lang')
        ) {
          // Need to move lang definition earlier
          content = content.replace(langDefinition, '');
          const insertPos = content.indexOf('\n\n', importEnd);
          if (insertPos > -1) {
            content =
              content.substring(0, insertPos) +
              '\n\n' +
              langDefinition +
              '\n' +
              content.substring(insertPos + 2);
            wasModified = true;
          }
        }
      }
    }

    if (wasModified) {
      await fs.writeFile(filePath, content);
      console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
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

  console.log('🔍 Finding English pages to fix Spanish content...');
  const files = await findEnglishPages(englishPagesDir);

  let fixedCount = 0;
  for (const file of files) {
    const wasFixed = await fixEnglishPage(file);
    if (wasFixed) fixedCount++;
  }

  console.log(`\n✨ Fixed ${fixedCount} English pages with Spanish content!`);
  console.log(
    '📝 Note: Some complex content may still need manual translation.'
  );
}

main().catch(console.error);
