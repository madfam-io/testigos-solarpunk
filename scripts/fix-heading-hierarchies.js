#!/usr/bin/env node

/**
 * Fix heading hierarchy issues across all pages
 * Based on accessibility report warnings
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixes = [
  // Pages with h2 to h4 jumps - change h4 to h3
  {
    file: 'src/pages/contenido/madlab.astro',
    pattern: /<h4>/g,
    replacement: '<h3>',
    closePattern: /<\/h4>/g,
    closeReplacement: '</h3>',
  },
  {
    file: 'src/pages/contenido/podcast.astro',
    pattern: /<h4>/g,
    replacement: '<h3>',
    closePattern: /<\/h4>/g,
    closeReplacement: '</h3>',
  },
  {
    file: 'src/pages/filosofia/index.astro',
    pattern: /<h4>/g,
    replacement: '<h3>',
    closePattern: /<\/h4>/g,
    closeReplacement: '</h3>',
  },
  {
    file: 'src/pages/guia-visual/index.astro',
    pattern: /<h4>/g,
    replacement: '<h3>',
    closePattern: /<\/h4>/g,
    closeReplacement: '</h3>',
  },
  {
    file: 'src/pages/impacto.astro',
    pattern: /<h4>/g,
    replacement: '<h3>',
    closePattern: /<\/h4>/g,
    closeReplacement: '</h3>',
  },
  {
    file: 'src/pages/proyecto.astro',
    pattern: /<h4>/g,
    replacement: '<h3>',
    closePattern: /<\/h4>/g,
    closeReplacement: '</h3>',
  },
  {
    file: 'src/pages/proyecto-unified.astro',
    pattern: /<h4>/g,
    replacement: '<h3>',
    closePattern: /<\/h4>/g,
    closeReplacement: '</h3>',
  },
  {
    file: 'src/pages/recursos/index.astro',
    pattern: /<h4>/g,
    replacement: '<h3>',
    closePattern: /<\/h4>/g,
    closeReplacement: '</h3>',
  },
];

// Also need to add missing h2 elements where we jump from h1 to h3
const h1ToH3Fixes = [
  {
    file: 'src/pages/contenido/podcast.astro',
    searchPattern: /<h1.*?>.*?<\/h1>[\s\S]*?<h3>/,
    fix: (content) => {
      // Find the first h3 after h1 and check if there's an h2 between them
      const h1Match = content.match(/<h1.*?>.*?<\/h1>/);
      if (!h1Match) return content;

      const afterH1 = content.indexOf(h1Match[0]) + h1Match[0].length;
      const firstH3 = content.indexOf('<h3>', afterH1);
      const h2Between = content.substring(afterH1, firstH3).includes('<h2>');

      if (!h2Between && firstH3 > -1) {
        // Need to add a section title before the first h3
        const sectionStart = content.lastIndexOf('<section', firstH3);
        if (sectionStart > afterH1) {
          const insertPoint = content.indexOf('>', sectionStart) + 1;
          return (
            content.slice(0, insertPoint) +
            '\n      <h2 class="section-title">Contenido del Podcast</h2>' +
            content.slice(insertPoint)
          );
        }
      }
      return content;
    },
  },
  {
    file: 'src/pages/contenido/sketches.astro',
    fix: (content) => {
      // Similar fix for sketches page
      const h1Match = content.match(/<h1.*?>.*?<\/h1>/);
      if (!h1Match) return content;

      const afterH1 = content.indexOf(h1Match[0]) + h1Match[0].length;
      const firstH3 = content.indexOf('<h3>', afterH1);
      const h2Between = content.substring(afterH1, firstH3).includes('<h2>');

      if (!h2Between && firstH3 > -1) {
        const sectionStart = content.lastIndexOf('<section', firstH3);
        if (sectionStart > afterH1) {
          const insertPoint = content.indexOf('>', sectionStart) + 1;
          return (
            content.slice(0, insertPoint) +
            '\n      <h2 class="section-title">Nuestros Sketches</h2>' +
            content.slice(insertPoint)
          );
        }
      }
      return content;
    },
  },
  {
    file: 'src/pages/formatos/index.astro',
    fix: (content) => {
      const h1Match = content.match(/<h1.*?>.*?<\/h1>/);
      if (!h1Match) return content;

      const afterH1 = content.indexOf(h1Match[0]) + h1Match[0].length;
      const firstH3 = content.indexOf('<h3>', afterH1);
      const h2Between = content.substring(afterH1, firstH3).includes('<h2>');

      if (!h2Between && firstH3 > -1) {
        const sectionStart = content.lastIndexOf('<section', firstH3);
        if (sectionStart > afterH1) {
          const insertPoint = content.indexOf('>', sectionStart) + 1;
          return (
            content.slice(0, insertPoint) +
            '\n      <h2 class="section-title">Formatos Disponibles</h2>' +
            content.slice(insertPoint)
          );
        }
      }
      return content;
    },
  },
];

console.log('🔧 Fixing heading hierarchies...\n');

// Apply h4 to h3 fixes
fixes.forEach((fix) => {
  const filePath = path.join(__dirname, '..', fix.file);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    content = content.replace(fix.pattern, fix.replacement);
    content = content.replace(fix.closePattern, fix.closeReplacement);

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed h4→h3 in ${fix.file}`);
    } else {
      console.log(`ℹ️  No h4 tags found in ${fix.file}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${fix.file}:`, error.message);
  }
});

console.log('\n🔧 Fixing h1→h3 jumps...\n');

// Apply h1 to h3 jump fixes
h1ToH3Fixes.forEach((fix) => {
  const filePath = path.join(__dirname, '..', fix.file);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    content = fix.fix(content);

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Added missing h2 in ${fix.file}`);
    } else {
      console.log(`ℹ️  No h1→h3 jump found in ${fix.file}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${fix.file}:`, error.message);
  }
});

console.log('\n✨ Heading hierarchy fixes complete!');
