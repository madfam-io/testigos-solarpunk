#!/usr/bin/env node

/**
 * @fileoverview Optimizes all project images for web performance.
 *
 * This script processes images to create optimized versions:
 * - Generates WebP and AVIF formats for modern browsers
 * - Creates multiple sizes for responsive images (srcset)
 * - Preserves aspect ratios and applies quality settings
 * - Skips already optimized images to save processing time
 *
 * Usage: node scripts/optimize-images.js
 *
 * @module optimize-images
 */

import sharp from 'sharp';
import { globby } from 'globby';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

/**
 * Configuration object for image optimization.
 * @constant {Object} CONFIG
 * @property {string[]} sourcePaths - Glob patterns for finding source images
 * @property {number[]} sizes - Width breakpoints for responsive images
 * @property {string[]} formats - Output formats to generate
 * @property {Object} quality - Quality settings for each format (0-100)
 * @property {string[]} skipPatterns - Patterns to exclude from processing
 */
const CONFIG = {
  sourcePaths: [
    'src/assets/images/**/*.{jpg,jpeg,png}',
    'public/images/**/*.{jpg,jpeg,png}',
  ],
  sizes: [320, 640, 768, 1024, 1280, 1920],
  formats: ['webp', 'avif'],
  quality: {
    webp: 85,
    avif: 80,
    jpg: 85,
  },
  skipPatterns: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
};

/**
 * ANSI color codes for console output formatting.
 * @constant {Object} colors
 */
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

/**
 * Logs a colored message to the console.
 * @param {string} message - The message to log
 * @param {keyof colors} color - The color to use (defaults to 'reset')
 */
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Formats byte size into human-readable format.
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size string (e.g., "1.5 MB")
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Processes a single image file to create optimized versions.
 * @async
 * @param {string} imagePath - Path to the source image
 * @returns {Promise<Object>} Processing statistics including sizes and file counts
 */
async function processImage(imagePath) {
  try {
    const startTime = Date.now();
    const stats = await fs.stat(imagePath);
    const originalSize = stats.size;

    log(`\n📸 Procesando: ${path.basename(imagePath)}`, 'blue');
    log(`   Tamaño original: ${formatBytes(originalSize)}`);

    const image = sharp(imagePath);
    const metadata = await image.metadata();
    const { width, height, format } = metadata;

    log(`   Dimensiones: ${width}x${height} (${format})`);

    const outputDir = path.dirname(imagePath);
    const baseName = path.basename(imagePath, path.extname(imagePath));
    let totalSaved = 0;
    let filesCreated = 0;

    // Generate different formats and sizes for responsive images
    for (const outputFormat of CONFIG.formats) {
      for (const size of CONFIG.sizes) {
        // Skip if source image is smaller than target size
        if (width < size) continue;

        const outputPath = path.join(
          outputDir,
          `${baseName}-${size}w.${outputFormat}`
        );

        // Skip if output file exists and is newer than source
        try {
          const outputStats = await fs.stat(outputPath);
          if (outputStats.mtime > stats.mtime) {
            log(
              `   ⏭️  Saltando ${path.basename(outputPath)} (ya actualizado)`
            );
            continue;
          }
        } catch (e) {
          // Output file doesn't exist, proceed with creation
        }

        // Process image with Sharp: resize and convert format
        const buffer = await sharp(imagePath)
          .resize(size, null, {
            withoutEnlargement: true,
            fit: 'inside',
          })
          [outputFormat]({
            quality: CONFIG.quality[outputFormat] || 85,
          })
          .toBuffer();

        await fs.writeFile(outputPath, buffer);

        const newSize = buffer.length;
        const saved = originalSize - newSize;
        totalSaved += saved;
        filesCreated++;

        log(
          `   ✅ ${path.basename(outputPath)} - ${formatBytes(newSize)} ` +
            `(${saved > 0 ? '-' : '+'}${formatBytes(Math.abs(saved))})`,
          saved > 0 ? 'green' : 'yellow'
        );
      }
    }

    // Generate main WebP version at original size
    const mainOutputPath = path.join(outputDir, `${baseName}.webp`);

    try {
      const mainStats = await fs.stat(mainOutputPath);
      if (mainStats.mtime <= stats.mtime) {
        const mainBuffer = await sharp(imagePath)
          .webp({ quality: CONFIG.quality.webp })
          .toBuffer();

        await fs.writeFile(mainOutputPath, mainBuffer);
        filesCreated++;

        log(
          `   ✅ ${path.basename(mainOutputPath)} - ${formatBytes(mainBuffer.length)}`,
          'green'
        );
      }
    } catch (e) {
      const mainBuffer = await sharp(imagePath)
        .webp({ quality: CONFIG.quality.webp })
        .toBuffer();

      await fs.writeFile(mainOutputPath, mainBuffer);
      filesCreated++;

      log(
        `   ✅ ${path.basename(mainOutputPath)} - ${formatBytes(mainBuffer.length)}`,
        'green'
      );
    }

    const duration = Date.now() - startTime;
    log(
      `   📊 Resumen: ${filesCreated} archivos creados, ` +
        `${formatBytes(totalSaved)} ahorrados, ${duration}ms`,
      'blue'
    );

    return {
      originalSize,
      totalSaved,
      filesCreated,
      duration,
    };
  } catch (error) {
    log(`   ❌ Error: ${error.message}`, 'red');
    return {
      originalSize: 0,
      totalSaved: 0,
      filesCreated: 0,
      duration: 0,
      error: true,
    };
  }
}

/**
 * Main function that orchestrates the image optimization process.
 * Finds all images, processes them, and reports statistics.
 * @async
 * @returns {Promise<void>}
 */
async function main() {
  log('\n🌟 Optimizador de Imágenes - Testigos de Solarpunk\n', 'green');

  // Change to root directory for consistent path resolution
  process.chdir(ROOT_DIR);

  // Find all images matching source patterns
  const images = await globby(CONFIG.sourcePaths, {
    ignore: CONFIG.skipPatterns,
  });

  if (images.length === 0) {
    log('No se encontraron imágenes para procesar.', 'yellow');
    return;
  }

  log(`Encontradas ${images.length} imágenes para procesar...`, 'blue');

  // Process all images and collect statistics
  const startTime = Date.now();
  let totalOriginalSize = 0;
  let totalSaved = 0;
  let totalFiles = 0;
  let errors = 0;

  for (const imagePath of images) {
    const result = await processImage(imagePath);
    totalOriginalSize += result.originalSize;
    totalSaved += result.totalSaved;
    totalFiles += result.filesCreated;
    if (result.error) errors++;
  }

  const totalDuration = Date.now() - startTime;

  // Print final summary with statistics
  log('\n' + '='.repeat(60), 'blue');
  log('📊 RESUMEN FINAL', 'green');
  log('='.repeat(60), 'blue');
  log(`Imágenes procesadas: ${images.length}`);
  log(`Archivos generados: ${totalFiles}`);
  log(`Tamaño original total: ${formatBytes(totalOriginalSize)}`);
  log(
    `Espacio ahorrado: ${formatBytes(totalSaved)} (${Math.round((totalSaved / totalOriginalSize) * 100)}%)`
  );
  log(`Tiempo total: ${(totalDuration / 1000).toFixed(2)}s`);
  if (errors > 0) {
    log(`Errores: ${errors}`, 'red');
  }
  log('='.repeat(60) + '\n', 'blue');

  log('✨ ¡Optimización completada! ¡Aleluya Solar! ✨\n', 'green');
}

// Execute main function if script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    log(`\n❌ Error fatal: ${error.message}`, 'red');
    process.exit(1);
  });
}
