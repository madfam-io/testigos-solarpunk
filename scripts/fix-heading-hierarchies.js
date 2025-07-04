#!/usr/bin/env node

/**
 * @fileoverview Fixes heading hierarchy issues across all Astro pages.
 *
 * This script automatically corrects heading hierarchy problems identified by accessibility
 * audits. It fixes two main issues:
 * 1. h2→h4 jumps: Changes h4 tags to h3 where there's no h3 between h2 and h4
 * 2. h1→h3 jumps: Adds missing h2 section titles where content jumps from h1 to h3
 *
 * Usage: node scripts/fix-heading-hierarchies.js
 *
 * @module fix-heading-hierarchies
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuration for h4→h3 fixes.
 * Lists all pages where h4 tags should be changed to h3 to maintain proper hierarchy.
 * @type {Array<{file: string, pattern: RegExp, replacement: string, closePattern: RegExp, closeReplacement: string}>}
 */
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

/**
 * Configuration for h1→h3 jump fixes.
 * Lists pages where missing h2 section titles need to be added.
 * @type {Array<{file: string, searchPattern?: RegExp, fix: Function}>}
 */
const h1ToH3Fixes = [
  {
    file: 'src/pages/contenido/podcast.astro',
    searchPattern: /<h1.*?>.*?<\/h1>[\s\S]*?<h3>/,
    /**
     * Adds missing h2 for podcast content section.
     * @param {string} content - The file content
     * @returns {string} Modified content with h2 added if needed
     */
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
    /**
     * Adds missing h2 for sketches content section.
     * @param {string} content - The file content
     * @returns {string} Modified content with h2 added if needed
     */
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
    /**
     * Adds missing h2 for formats section.
     * @param {string} content - The file content
     * @returns {string} Modified content with h2 added if needed
     */
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

/**
 * Apply h4→h3 fixes to all configured files.
 * Replaces h4 tags with h3 tags to maintain proper heading hierarchy.
 */
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

/**
 * Apply h1→h3 jump fixes to all configured files.
 * Adds missing h2 section titles where content jumps directly from h1 to h3.
 */
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
