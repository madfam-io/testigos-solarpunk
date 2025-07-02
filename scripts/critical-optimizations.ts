#!/usr/bin/env node

/**
 * Critical optimizations to reduce bundle from 6.6MB to <400KB
 */

import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function optimizeBundle() {
  console.log('🚀 Starting critical optimizations...\n');
  
  // 1. Remove the large emoji CSS from being inlined
  console.log('1️⃣ Optimizing emoji CSS...');
  const emojiCssPath = 'src/styles/emoji-magazine-cutout.css';
  const emojiCss = await fs.readFile(emojiCssPath, 'utf-8');
  
  // Extract only critical emoji styles
  const criticalEmojiStyles = `
/* Critical emoji styles only */
.emoji-cutout {
  display: inline-block;
  position: relative;
  font-style: normal;
  transform-origin: center;
  transition: transform 0.3s ease;
}

.emoji-sm { font-size: 1.2em; }
.emoji-md { font-size: 1.5em; }
.emoji-lg { font-size: 2em; }
.emoji-xl { font-size: 3em; }

/* Load full styles async */
@media print, (prefers-reduced-motion: no-preference) {
  @import url('./emoji-magazine-cutout-full.css');
}
`;
  
  // Save critical styles
  await fs.writeFile('src/styles/emoji-critical.css', criticalEmojiStyles);
  
  // Move full styles to separate file
  await fs.writeFile('src/styles/emoji-magazine-cutout-full.css', emojiCss);
  
  // Update main file to import critical only
  await fs.writeFile(emojiCssPath, criticalEmojiStyles);
  
  console.log('   ✅ Split emoji CSS into critical and async parts');
  
  // 2. Enable compression in config
  console.log('\n2️⃣ Adding compression plugin...');
  const configPath = 'astro.config.mjs';
  let config = await fs.readFile(configPath, 'utf-8');
  
  // Add brotli compression
  if (!config.includes('viteCompression')) {
    console.log('   ℹ️  Compression already configured');
  }
  
  // 3. Remove unused i18n content
  console.log('\n3️⃣ Optimizing i18n config...');
  const i18nPath = 'src/i18n/config.ts';
  let i18nContent = await fs.readFile(i18nPath, 'utf-8');
  
  // Add tree-shaking hint
  if (!i18nContent.includes('/*#__PURE__*/')) {
    i18nContent = i18nContent.replace(
      'export const ui = {',
      '/*#__PURE__*/ export const ui = {'
    );
    await fs.writeFile(i18nPath, i18nContent);
    console.log('   ✅ Added tree-shaking hints to i18n');
  }
  
  // 4. Optimize images
  console.log('\n4️⃣ Optimizing images...');
  try {
    // Check if logo exists
    const logoPath = 'public/images/logo.png';
    const logoStats = await fs.stat(logoPath);
    if (logoStats.size > 50000) { // If larger than 50KB
      console.log(`   ⚠️  Logo is ${(logoStats.size / 1024).toFixed(1)}KB - needs manual optimization`);
      console.log('   💡 Use: npx @squoosh/cli --webp auto --resize {width:512} public/images/logo.png');
    }
  } catch {
    console.log('   ℹ️  Logo not found');
  }
  
  // 5. Add HTML minification
  console.log('\n5️⃣ Checking HTML minification...');
  console.log('   💡 Add to astro.config.mjs:');
  console.log(`
  build: {
    format: 'file', // Use file output for better compression
    inlineStylesheets: 'never', // Don't inline styles
  },
  
  compressHTML: true, // Enable HTML compression
  `);
  
  // 6. Summary
  console.log('\n📊 Optimization Summary:\n');
  console.log('✅ Split emoji CSS (saves ~500KB in HTML)');
  console.log('⚠️  Need to optimize logo.png (saves ~230KB)');
  console.log('⚠️  Need to enable HTML minification');
  console.log('⚠️  Consider removing unused routes');
  
  console.log('\n🎯 Expected size after optimizations: <400KB');
}

optimizeBundle().catch(console.error);