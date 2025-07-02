#!/usr/bin/env node

/**
 * Link Validator for Testigos de Solarpunk
 *
 * This script validates all internal links to ensure they:
 * 1. Include proper language prefixes (/es/ or /en/)
 * 2. Point to existing pages
 * 3. Use consistent URL patterns
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const errors = [];
const warnings = [];

// Patterns to find links in Astro files
const linkPatterns = [
  /href=\{`\$\{basePath\}([^`]+)`\}/g, // Template literal links
  /href="([^"]+)"/g, // Direct href links
  /href='([^']+)'/g, // Single quote href links
];

// Files to skip validation
const skipFiles = [
  'UnifiedLayout.astro', // Old layout file
  'CharacterCard.astro', // Component that uses dynamic paths
];

// Valid language prefixes
const validLangPrefixes = ['/es/', '/en/'];

async function findAllAstroFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (
      entry.isDirectory() &&
      !entry.name.startsWith('.') &&
      entry.name !== 'node_modules'
    ) {
      files.push(...(await findAllAstroFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.astro')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function validateLink(link, filePath) {
  // Skip external links
  if (
    link.startsWith('http://') ||
    link.startsWith('https://') ||
    link.startsWith('//')
  ) {
    return;
  }

  // Skip anchors and mailto links
  if (link.startsWith('#') || link.startsWith('mailto:')) {
    return;
  }

  // Extract the path part (remove basePath variable if present)
  const cleanLink = link.replace(/^\$\{basePath\}/, '');

  // Check if the link is a root-relative link
  if (cleanLink.startsWith('/')) {
    // Check if it has a language prefix
    const hasLangPrefix = validLangPrefixes.some((prefix) =>
      cleanLink.startsWith(prefix)
    );

    if (!hasLangPrefix) {
      // Special cases that don't need language prefix
      const allowedNonPrefixedPaths = [
        '/favicon.ico',
        '/favicon.svg',
        '/favicon-16x16.png',
        '/favicon-32x32.png',
        '/apple-touch-icon.png',
        '/icon-', // All icon sizes
        '/splash-', // All splash screens
        '/manifest.json',
        '/robots.txt',
        '/sitemap.xml',
        '/_assets/',
        '/images/',
        '/og-image.svg',
        '/fonts/',
        '/browserconfig.xml',
      ];

      const isAllowed = allowedNonPrefixedPaths.some((allowed) =>
        cleanLink.startsWith(allowed)
      );

      // Also allow root path
      if (!isAllowed && cleanLink !== '/') {
        errors.push({
          file: path.relative(projectRoot, filePath),
          link: link,
          issue: `Missing language prefix (/es/ or /en/)`,
        });
      }
    } else {
      // Extract language and path
      const lang = cleanLink.startsWith('/es/') ? 'es' : 'en';
      const pathWithoutLang = cleanLink.substring(4); // Remove /es/ or /en/

      // Check if the target page exists
      const possiblePaths = [
        path.join(
          projectRoot,
          'src',
          'pages',
          lang,
          pathWithoutLang.replace(/\/$/, '') + '.astro'
        ),
        path.join(
          projectRoot,
          'src',
          'pages',
          lang,
          pathWithoutLang,
          'index.astro'
        ),
      ];

      let pageExists = false;
      for (const possiblePath of possiblePaths) {
        try {
          await fs.access(possiblePath);
          pageExists = true;
          break;
        } catch {
          // File doesn't exist, continue checking
        }
      }

      if (!pageExists && !pathWithoutLang.includes('[')) {
        // Skip dynamic routes
        warnings.push({
          file: path.relative(projectRoot, filePath),
          link: link,
          issue: `Target page not found`,
        });
      }
    }
  }
}

async function validateFile(filePath) {
  // Skip certain files
  if (skipFiles.some((skip) => filePath.includes(skip))) {
    return;
  }

  const content = await fs.readFile(filePath, 'utf-8');

  for (const pattern of linkPatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const link = match[1];
      // Skip template variables and anchors
      if (!link.includes('${') && !link.startsWith('#')) {
        await validateLink(link, filePath);
      }
    }
    // Reset pattern for next iteration
    pattern.lastIndex = 0;
  }
}

async function main() {
  console.log('🔍 Testigos de Solarpunk - Link Validator\n');
  console.log('='.repeat(50) + '\n');

  try {
    const srcDir = path.join(projectRoot, 'src');
    const astroFiles = await findAllAstroFiles(srcDir);

    console.log(`Found ${astroFiles.length} Astro files to check...\n`);

    // Validate each file
    for (const file of astroFiles) {
      await validateFile(file);
    }

    console.log('\n' + '='.repeat(50) + '\n');
    console.log('📊 Summary:\n');

    if (errors.length === 0 && warnings.length === 0) {
      console.log('✅ All links are valid! No issues found.\n');
    } else {
      if (errors.length > 0) {
        console.log(`❌ Found ${errors.length} error(s):\n`);
        errors.forEach((err, idx) => {
          console.log(`${idx + 1}. ${err.file}`);
          console.log(`   Link: ${err.link}`);
          console.log(`   Issue: ${err.issue}\n`);
        });
      }

      if (warnings.length > 0) {
        console.log(`⚠️  Found ${warnings.length} warning(s):\n`);
        warnings.forEach((warn, idx) => {
          console.log(`${idx + 1}. ${warn.file}`);
          console.log(`   Link: ${warn.link}`);
          console.log(`   Issue: ${warn.issue}\n`);
        });
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
