#!/usr/bin/env node

/**
 * Script para optimizar imágenes del proyecto
 * Genera versiones WebP y múltiples tamaños para responsive
 */

import sharp from 'sharp';
import { globby } from 'globby';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

// Configuración
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

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

// Utilidades
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Procesar una imagen
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

    // Generar diferentes formatos y tamaños
    for (const outputFormat of CONFIG.formats) {
      for (const size of CONFIG.sizes) {
        // Skip si la imagen es más pequeña que el tamaño objetivo
        if (width < size) continue;

        const outputPath = path.join(
          outputDir,
          `${baseName}-${size}w.${outputFormat}`
        );

        // Skip si el archivo ya existe y es más nuevo
        try {
          const outputStats = await fs.stat(outputPath);
          if (outputStats.mtime > stats.mtime) {
            log(
              `   ⏭️  Saltando ${path.basename(outputPath)} (ya actualizado)`
            );
            continue;
          }
        } catch (e) {
          // El archivo no existe, continuar
        }

        // Procesar imagen
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

    // Generar versión principal en formato moderno
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

// Función principal
async function main() {
  log('\n🌟 Optimizador de Imágenes - Testigos de Solarpunk\n', 'green');

  // Cambiar al directorio raíz
  process.chdir(ROOT_DIR);

  // Buscar imágenes
  const images = await globby(CONFIG.sourcePaths, {
    ignore: CONFIG.skipPatterns,
  });

  if (images.length === 0) {
    log('No se encontraron imágenes para procesar.', 'yellow');
    return;
  }

  log(`Encontradas ${images.length} imágenes para procesar...`, 'blue');

  // Procesar imágenes
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

  // Resumen final
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

// Ejecutar si es llamado directamente
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    log(`\n❌ Error fatal: ${error.message}`, 'red');
    process.exit(1);
  });
}
