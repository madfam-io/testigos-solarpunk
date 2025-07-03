#!/usr/bin/env node

/**
 * Script to analyze and optimize bundle size
 * Target: Reduce from 6.6MB to <400KB
 */

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { gzip } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);

async function analyzeBundle() {
  console.log('🔍 Analyzing bundle size...\n');

  // Check dist folder exists
  const distPath = path.join(process.cwd(), 'dist');
  try {
    await fs.access(distPath);
  } catch {
    console.error('❌ dist folder not found. Run npm run build first.');
    return;
  }

  // Analyze different file types
  const fileTypes = {
    HTML: '**/*.html',
    CSS: '**/*.css',
    JavaScript: '**/*.js',
    Images: '**/*.{png,jpg,jpeg,webp,svg}',
    Fonts: '**/*.{woff,woff2,ttf,eot}',
  };

  const analysis: Record<string, any> = {};
  let totalSize = 0;
  let totalGzipSize = 0;

  for (const [type, pattern] of Object.entries(fileTypes)) {
    const files = await glob(pattern, { cwd: distPath });
    let typeSize = 0;
    let typeGzipSize = 0;
    const largestFiles: any[] = [];

    for (const file of files) {
      const filePath = path.join(distPath, file);
      const stats = await fs.stat(filePath);
      const content = await fs.readFile(filePath);
      const gzipped = await gzipAsync(content);

      typeSize += stats.size;
      typeGzipSize += gzipped.length;

      largestFiles.push({
        file,
        size: stats.size,
        gzipSize: gzipped.length,
      });
    }

    largestFiles.sort((a, b) => b.size - a.size);

    analysis[type] = {
      count: files.length,
      totalSize: typeSize,
      totalGzipSize: typeGzipSize,
      largestFiles: largestFiles.slice(0, 5),
    };

    totalSize += typeSize;
    totalGzipSize += typeGzipSize;
  }

  // Print analysis
  console.log('📊 Bundle Size Analysis\n');
  console.log(
    `Total Size: ${formatSize(totalSize)} (${formatSize(totalGzipSize)} gzipped)`
  );
  console.log(`Target: <400KB\n`);

  for (const [type, data] of Object.entries(analysis)) {
    if (data.count === 0) continue;

    console.log(`\n${type} (${data.count} files):`);
    console.log(
      `  Total: ${formatSize(data.totalSize)} (${formatSize(data.totalGzipSize)} gzipped)`
    );

    if (data.largestFiles.length > 0) {
      console.log('  Largest files:');
      for (const file of data.largestFiles) {
        console.log(
          `    - ${file.file}: ${formatSize(file.size)} (${formatSize(file.gzipSize)} gzipped)`
        );
      }
    }
  }

  // Provide optimization suggestions
  console.log('\n\n💡 Optimization Suggestions:\n');

  // HTML suggestions
  if (analysis.HTML && analysis.HTML.totalSize > 1000000) {
    console.log('🔴 HTML files are too large (>1MB)');
    console.log('   - Check for inline CSS/JS that should be external');
    console.log('   - Ensure HTML minification is enabled');
    console.log('   - Consider server-side compression\n');
  }

  // CSS suggestions
  if (analysis.CSS && analysis.CSS.totalSize > 200000) {
    console.log('🟡 CSS files could be optimized');
    console.log('   - Use PurgeCSS to remove unused styles');
    console.log('   - Consider critical CSS inlining');
    console.log('   - Check for duplicate styles\n');
  }

  // JavaScript suggestions
  if (analysis.JavaScript && analysis.JavaScript.totalSize > 300000) {
    console.log('🟡 JavaScript bundle is large');
    console.log('   - Enable code splitting');
    console.log('   - Lazy load non-critical components');
    console.log('   - Tree-shake unused exports\n');
  }

  // Image suggestions
  if (analysis.Images && analysis.Images.totalSize > 500000) {
    console.log('🔴 Images need optimization');
    console.log('   - Convert to WebP format');
    console.log('   - Use responsive images');
    console.log('   - Implement lazy loading\n');
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

analyzeBundle().catch(console.error);
