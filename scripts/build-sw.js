#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const publicDir = join(__dirname, '..', 'public');
const swDev = join(publicDir, 'sw.js');
const swProd = join(publicDir, 'sw.prod.js');

// Copy the appropriate service worker file
if (isProduction && existsSync(swProd)) {
  const prodContent = readFileSync(swProd, 'utf-8');
  writeFileSync(swDev, prodContent);
  console.log('✅ Using production service worker (minified)');
} else {
  console.log('ℹ️ Using development service worker (with console logs)');
}
