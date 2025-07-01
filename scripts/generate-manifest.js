#!/usr/bin/env node

/**
 * Generate manifest.json from template based on deployment target
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine base path from environment or arguments
const isVercel = process.env.VERCEL || process.argv.includes('--vercel');
const isGitHub = process.argv.includes('--github');

// Set base path based on deployment target
let basePath = '';
if (isVercel) {
  basePath = '';
} else if (isGitHub || !process.env.VERCEL) {
  basePath = '/testigos-solarpunk';
}

console.log(
  `🔧 Generating manifest.json for ${isVercel ? 'Vercel' : 'GitHub Pages'} deployment`
);
console.log(`   Base path: ${basePath || '(root)'}`);

// Read template
const templatePath = path.join(
  __dirname,
  '..',
  'public',
  'manifest.template.json'
);
const template = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders
const manifest = template.replace(/\{\{BASE_PATH\}\}/g, basePath);

// Write manifest.json
const outputPath = path.join(__dirname, '..', 'public', 'manifest.json');
fs.writeFileSync(outputPath, manifest, 'utf8');

console.log(`✅ Generated manifest.json successfully!`);
