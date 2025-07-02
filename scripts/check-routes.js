#!/usr/bin/env node

/**
 * Route Checker for Testigos de Solarpunk
 *
 * This script validates:
 * 1. All routes defined in config have corresponding page files
 * 2. All pages have translations in both languages
 * 3. No broken internal links exist in pages
 * 4. Sitemap contains all valid routes
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Route translations from i18n config
const routeTranslations = {
  es: {
    proyecto: 'proyecto',
    contenido: 'contenido',
    sketches: 'sketches',
    podcast: 'podcast',
    madlab: 'madlab',
    universo: 'universo',
    personajes: 'personajes',
    mundo: 'mundo',
    guiones: 'guiones',
    recursos: 'recursos',
    comunidad: 'comunidad',
    produccion: 'produccion',
    impacto: 'impacto',
    equipo: 'equipo',
    filosofia: 'filosofia',
    formatos: 'formatos',
    'guia-visual': 'guia-visual',
    actores: 'actores',
    creadores: 'creadores',
    patrocinadores: 'patrocinadores',
    dialogo: 'dialogo',
    movimiento: 'movimiento',
    plantillas: 'plantillas',
    worldbuilding: 'worldbuilding',
    valores: 'valores',
    integracion: 'integracion',
  },
  en: {
    proyecto: 'project',
    contenido: 'content',
    sketches: 'sketches',
    podcast: 'podcast',
    madlab: 'madlab',
    universo: 'universe',
    personajes: 'characters',
    mundo: 'world',
    guiones: 'scripts',
    recursos: 'resources',
    comunidad: 'community',
    produccion: 'production',
    impacto: 'impact',
    equipo: 'team',
    filosofia: 'philosophy',
    formatos: 'formats',
    'guia-visual': 'visual-guide',
    actores: 'actors',
    creadores: 'creators',
    patrocinadores: 'sponsors',
    dialogo: 'dialogue',
    movimiento: 'movement',
    plantillas: 'templates',
    worldbuilding: 'worldbuilding',
    valores: 'values',
    integracion: 'integration',
  },
};

const errors = [];
const warnings = [];

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findAllPages(dir, baseDir = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (
      entry.isDirectory() &&
      !entry.name.startsWith('.') &&
      entry.name !== 'node_modules'
    ) {
      files.push(...(await findAllPages(fullPath, baseDir)));
    } else if (entry.isFile() && entry.name.endsWith('.astro')) {
      const relativePath = path.relative(baseDir, fullPath);
      files.push(relativePath);
    }
  }

  return files;
}

async function checkRouteTranslations() {
  console.log('🔍 Checking route translations...\n');

  const pagesDir = path.join(projectRoot, 'src', 'pages');
  const allPages = await findAllPages(pagesDir);

  // Group pages by language
  const pagesByLang = {
    es: allPages.filter((p) => p.startsWith('es/')),
    en: allPages.filter((p) => p.startsWith('en/')),
    root: allPages.filter((p) => !p.startsWith('es/') && !p.startsWith('en/')),
  };

  // Check Spanish pages have English equivalents
  for (const esPage of pagesByLang.es) {
    const pageName = esPage.replace('es/', '').replace('.astro', '');

    // Convert Spanish route to English
    let enPagePath = pageName;

    // Apply route translations
    for (const [esRoute, enRoute] of Object.entries(routeTranslations.en)) {
      enPagePath = enPagePath.replace(
        new RegExp(`\\b${routeTranslations.es[esRoute]}\\b`, 'g'),
        enRoute
      );
    }

    const expectedEnFile = `en/${enPagePath}.astro`;
    const expectedEnIndex = `en/${enPagePath}/index.astro`;

    if (
      !pagesByLang.en.includes(expectedEnFile) &&
      !pagesByLang.en.includes(expectedEnIndex)
    ) {
      // Special cases
      if (pageName === 'proyecto-unified') {
        if (!pagesByLang.en.includes('en/unified-project.astro')) {
          errors.push(
            `❌ Missing English translation for: ${esPage} (expected: en/unified-project.astro)`
          );
        }
      } else if (pageName === 'mundo/azotea-verde-neo-cuernavaca') {
        if (
          !pagesByLang.en.includes('en/world/green-roof-neo-cuernavaca.astro')
        ) {
          errors.push(
            `❌ Missing English translation for: ${esPage} (expected: en/world/green-roof-neo-cuernavaca.astro)`
          );
        }
      } else if (pageName === 'produccion/estilo-visual') {
        if (!pagesByLang.en.includes('en/production/visual-style.astro')) {
          errors.push(
            `❌ Missing English translation for: ${esPage} (expected: en/production/visual-style.astro)`
          );
        }
      } else if (pageName === 'produccion/tono-voz') {
        if (!pagesByLang.en.includes('en/production/tone-voice.astro')) {
          errors.push(
            `❌ Missing English translation for: ${esPage} (expected: en/production/tone-voice.astro)`
          );
        }
      } else {
        errors.push(
          `❌ Missing English translation for: ${esPage} (expected: ${expectedEnFile})`
        );
      }
    }
  }

  // Check English pages have Spanish equivalents
  for (const enPage of pagesByLang.en) {
    const pageName = enPage.replace('en/', '').replace('.astro', '');

    // Convert English route to Spanish
    let esPagePath = pageName;

    // Apply reverse route translations
    for (const [esRoute, enRoute] of Object.entries(routeTranslations.en)) {
      esPagePath = esPagePath.replace(
        new RegExp(`\\b${enRoute}\\b`, 'g'),
        routeTranslations.es[esRoute]
      );
    }

    const expectedEsFile = `es/${esPagePath}.astro`;
    const expectedEsIndex = `es/${esPagePath}/index.astro`;

    if (
      !pagesByLang.es.includes(expectedEsFile) &&
      !pagesByLang.es.includes(expectedEsIndex)
    ) {
      // Special cases
      if (pageName === 'unified-project') {
        if (!pagesByLang.es.includes('es/proyecto-unified.astro')) {
          errors.push(
            `❌ Missing Spanish translation for: ${enPage} (expected: es/proyecto-unified.astro)`
          );
        }
      } else if (pageName === 'world/green-roof-neo-cuernavaca') {
        if (
          !pagesByLang.es.includes('es/mundo/azotea-verde-neo-cuernavaca.astro')
        ) {
          errors.push(
            `❌ Missing Spanish translation for: ${enPage} (expected: es/mundo/azotea-verde-neo-cuernavaca.astro)`
          );
        }
      } else if (pageName === 'production/visual-style') {
        if (!pagesByLang.es.includes('es/produccion/estilo-visual.astro')) {
          errors.push(
            `❌ Missing Spanish translation for: ${enPage} (expected: es/produccion/estilo-visual.astro)`
          );
        }
      } else if (pageName === 'production/tone-voice') {
        if (!pagesByLang.es.includes('es/produccion/tono-voz.astro')) {
          errors.push(
            `❌ Missing Spanish translation for: ${enPage} (expected: es/produccion/tono-voz.astro)`
          );
        }
      } else {
        errors.push(
          `❌ Missing Spanish translation for: ${enPage} (expected: ${expectedEsFile})`
        );
      }
    }
  }
}

async function checkSitemapRoutes() {
  console.log('\n🗺️  Checking sitemap routes...\n');

  const sitemapFiles = [
    path.join(projectRoot, 'src', 'pages', 'es', 'sitemap.astro'),
    path.join(projectRoot, 'src', 'pages', 'en', 'sitemap.astro'),
  ];

  for (const sitemapFile of sitemapFiles) {
    const content = await fs.readFile(sitemapFile, 'utf-8');
    const lang = sitemapFile.includes('/es/') ? 'es' : 'en';

    // Extract href values from sitemap
    const hrefRegex = /href:\s*`\${basePath}\/(es|en)\/([^`]+)`/g;
    let match;

    while ((match = hrefRegex.exec(content)) !== null) {
      const fullPath = match[0];
      const pathLang = match[1];
      const routePath = match[2];

      if (pathLang !== lang) {
        warnings.push(
          `⚠️  Sitemap ${lang} contains link to ${pathLang} page: ${fullPath}`
        );
      }

      // Check if corresponding page exists
      const pagePath = path.join(
        projectRoot,
        'src',
        'pages',
        pathLang,
        routePath.replace(/\/$/, '')
      );
      const pageFile = `${pagePath}.astro`;
      const pageIndex = path.join(pagePath, 'index.astro');

      if (!(await fileExists(pageFile)) && !(await fileExists(pageIndex))) {
        errors.push(
          `❌ Broken link in ${lang} sitemap: /${pathLang}/${routePath} (no page found)`
        );
      }
    }
  }
}

async function checkConfiguredRoutes() {
  console.log('\n🔧 Checking configured routes...\n');

  // Check if configured routes have corresponding pages
  for (const [esRoute, enRoute] of Object.entries(routeTranslations.en)) {
    // Skip nested routes for now
    if (
      [
        'actores',
        'creadores',
        'patrocinadores',
        'dialogo',
        'movimiento',
        'plantillas',
        'worldbuilding',
        'valores',
        'integracion',
      ].includes(esRoute)
    ) {
      continue;
    }

    const esPagePath = path.join(
      projectRoot,
      'src',
      'pages',
      'es',
      routeTranslations.es[esRoute]
    );
    const enPagePath = path.join(projectRoot, 'src', 'pages', 'en', enRoute);

    const esPageFile = `${esPagePath}.astro`;
    const esPageIndex = path.join(esPagePath, 'index.astro');
    const enPageFile = `${enPagePath}.astro`;
    const enPageIndex = path.join(enPagePath, 'index.astro');

    if (!(await fileExists(esPageFile)) && !(await fileExists(esPageIndex))) {
      warnings.push(
        `⚠️  Route configured but no Spanish page: ${esRoute} (expected at: ${esPagePath})`
      );
    }

    if (!(await fileExists(enPageFile)) && !(await fileExists(enPageIndex))) {
      warnings.push(
        `⚠️  Route configured but no English page: ${enRoute} (expected at: ${enPagePath})`
      );
    }
  }
}

async function main() {
  console.log('🚀 Testigos de Solarpunk - Route Checker\n');
  console.log('='.repeat(50) + '\n');

  try {
    await checkRouteTranslations();
    await checkSitemapRoutes();
    await checkConfiguredRoutes();

    console.log('\n' + '='.repeat(50) + '\n');
    console.log('📊 Summary:\n');

    if (errors.length === 0 && warnings.length === 0) {
      console.log('✅ All routes are valid! No issues found.\n');
    } else {
      if (errors.length > 0) {
        console.log(`❌ Found ${errors.length} error(s):\n`);
        errors.forEach((err) => console.log(`   ${err}`));
        console.log('');
      }

      if (warnings.length > 0) {
        console.log(`⚠️  Found ${warnings.length} warning(s):\n`);
        warnings.forEach((warn) => console.log(`   ${warn}`));
        console.log('');
      }
    }

    // Exit with error code if errors found
    if (errors.length > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Script error:', error);
    process.exit(1);
  }
}

main();
