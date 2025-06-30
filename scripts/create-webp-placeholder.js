#!/usr/bin/env node

/**
 * @fileoverview Creates a placeholder WebP file for the project logo.
 *
 * This script generates a minimal valid WebP file (1x1 transparent pixel) as a placeholder
 * when image conversion tools are not available. The placeholder should be replaced with
 * a properly converted WebP version of the logo for optimal performance.
 *
 * Usage: node scripts/create-webp-placeholder.js
 *
 * @module create-webp-placeholder
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Base64 encoded minimal valid WebP file (1x1 transparent pixel).
 * This creates the smallest possible valid WebP file for use as a placeholder.
 * @constant {string}
 */
const minimalWebP = Buffer.from(
  'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
  'base64'
);

/** @constant {string} outputPath - Destination path for the placeholder WebP file */
const outputPath = path.join(__dirname, '..', 'public', 'images', 'logo.webp');

try {
  // Create the WebP file in the public images directory
  fs.writeFileSync(outputPath, minimalWebP);
  console.log('✅ Created placeholder logo.webp at:', outputPath);

  // Provide guidance for proper WebP conversion
  console.log(
    '⚠️  Note: This is a placeholder file. For optimal results, convert logo.png to WebP using:'
  );
  console.log('   - Online tools like squoosh.app');
  console.log('   - Command line tools like cwebp');
  console.log('   - Image editing software like GIMP or Photoshop');
  console.log(
    '\n📊 Expected savings: ~50% file size reduction (281KB → ~140KB)'
  );
} catch (error) {
  console.error('❌ Error creating WebP file:', error.message);
  process.exit(1);
}
