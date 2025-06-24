#!/usr/bin/env node

/**
 * Script para generar todos los iconos necesarios para PWA
 * Genera iconos en múltiples tamaños a partir de un SVG o PNG base
 */

import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

// Configuración de iconos
const ICON_SIZES = [
  // PWA estándar
  { size: 72, name: 'icon-72.png' },
  { size: 96, name: 'icon-96.png' },
  { size: 128, name: 'icon-128.png' },
  { size: 144, name: 'icon-144.png' },
  { size: 152, name: 'icon-152.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 384, name: 'icon-384.png' },
  { size: 512, name: 'icon-512.png' },
  
  // Apple Touch Icons
  { size: 57, name: 'icon-57.png' },
  { size: 60, name: 'icon-60.png' },
  { size: 76, name: 'icon-76.png' },
  { size: 114, name: 'icon-114.png' },
  { size: 120, name: 'icon-120.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  
  // Favicon
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  
  // Windows
  { size: 144, name: 'ms-icon-144x144.png' },
  { size: 150, name: 'ms-icon-150x150.png' },
  { size: 310, name: 'ms-icon-310x310.png' },
];

// Splash screens para iOS
const SPLASH_SCREENS = [
  { width: 2048, height: 2732, name: 'splash-2048x2732.png' }, // iPad Pro 12.9"
  { width: 1668, height: 2388, name: 'splash-1668x2388.png' }, // iPad Pro 11"
  { width: 1536, height: 2048, name: 'splash-1536x2048.png' }, // iPad Air
  { width: 1125, height: 2436, name: 'splash-1125x2436.png' }, // iPhone X/XS
  { width: 1242, height: 2688, name: 'splash-1242x2688.png' }, // iPhone XS Max
  { width: 750, height: 1334, name: 'splash-750x1334.png' },   // iPhone 8
  { width: 828, height: 1792, name: 'splash-828x1792.png' },   // iPhone XR
];

// Colores MADFAM
const MADFAM_COLORS = {
  yellow: '#FFC107',
  green: '#4CAF50',
  purple: '#663399',
  blue: '#2196F3',
  black: '#212121',
  white: '#FFFFFF',
};

async function generateIconFromSVG() {
  const svgContent = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${MADFAM_COLORS.yellow};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${MADFAM_COLORS.green};stop-opacity:1" />
        </linearGradient>
        <radialGradient id="glowGradient">
          <stop offset="0%" style="stop-color:${MADFAM_COLORS.yellow};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${MADFAM_COLORS.yellow};stop-opacity:0" />
        </radialGradient>
      </defs>
      
      <!-- Fondo -->
      <rect width="512" height="512" fill="${MADFAM_COLORS.black}"/>
      
      <!-- Resplandor solar -->
      <circle cx="256" cy="180" r="150" fill="url(#glowGradient)" opacity="0.5"/>
      
      <!-- Sol principal -->
      <circle cx="256" cy="180" r="80" fill="url(#sunGradient)"/>
      
      <!-- Rayos de sol -->
      <g transform="translate(256, 180)">
        ${Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45) * Math.PI / 180;
          const x1 = Math.cos(angle) * 90;
          const y1 = Math.sin(angle) * 90;
          const x2 = Math.cos(angle) * 120;
          const y2 = Math.sin(angle) * 120;
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MADFAM_COLORS.yellow}" stroke-width="8" stroke-linecap="round"/>`;
        }).join('')}
      </g>
      
      <!-- Hojas/Plantas -->
      <path d="M 256 300 Q 200 350 180 400 Q 200 380 256 360 Q 312 380 332 400 Q 312 350 256 300" 
            fill="${MADFAM_COLORS.green}" opacity="0.9"/>
      <path d="M 256 320 L 256 400" 
            stroke="${MADFAM_COLORS.green}" stroke-width="6" stroke-linecap="round"/>
      
      <!-- Cruz evangelista estilizada -->
      <g transform="translate(256, 180)">
        <rect x="-4" y="-40" width="8" height="60" fill="${MADFAM_COLORS.white}" opacity="0.8"/>
        <rect x="-20" y="-15" width="40" height="8" fill="${MADFAM_COLORS.white}" opacity="0.8"/>
      </g>
      
      <!-- Texto -->
      <text x="256" y="450" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
            text-anchor="middle" fill="${MADFAM_COLORS.white}">TESTIGOS</text>
    </svg>
  `;
  
  return Buffer.from(svgContent);
}

async function generateSplashScreen(width, height) {
  const svgContent = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${MADFAM_COLORS.black};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${MADFAM_COLORS.purple};stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Fondo -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
      
      <!-- Sol central -->
      <circle cx="${width/2}" cy="${height/2 - 100}" r="120" fill="${MADFAM_COLORS.yellow}" opacity="0.9"/>
      
      <!-- Título -->
      <text x="${width/2}" y="${height/2 + 50}" font-family="Arial, sans-serif" font-size="72" 
            font-weight="bold" text-anchor="middle" fill="${MADFAM_COLORS.white}">
        Testigos de Solarpunk
      </text>
      
      <!-- Subtítulo -->
      <text x="${width/2}" y="${height/2 + 120}" font-family="Arial, sans-serif" font-size="36" 
            text-anchor="middle" fill="${MADFAM_COLORS.yellow}" opacity="0.8">
        ¡Aleluya Solar!
      </text>
      
      <!-- Logo MADFAM -->
      <text x="${width/2}" y="${height - 100}" font-family="Arial, sans-serif" font-size="24" 
            text-anchor="middle" fill="${MADFAM_COLORS.white}" opacity="0.5">
        Un proyecto MADFAM
      </text>
    </svg>
  `;
  
  return Buffer.from(svgContent);
}

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function main() {
  console.log('🎨 Generador de Iconos - Testigos de Solarpunk\n');
  
  const publicDir = path.join(ROOT_DIR, 'public');
  await ensureDirectoryExists(publicDir);
  
  try {
    // Verificar si existe un icono base
    let sourceBuffer;
    const possibleSources = [
      path.join(publicDir, 'icon-source.png'),
      path.join(publicDir, 'icon-source.svg'),
      path.join(publicDir, 'favicon.svg'),
    ];
    
    let sourceFound = false;
    for (const sourcePath of possibleSources) {
      try {
        sourceBuffer = await fs.readFile(sourcePath);
        sourceFound = true;
        console.log(`✅ Usando imagen fuente: ${path.basename(sourcePath)}`);
        break;
      } catch (e) {
        // Continuar buscando
      }
    }
    
    if (!sourceFound) {
      console.log('⚠️  No se encontró imagen fuente, generando icono SVG predeterminado...');
      sourceBuffer = await generateIconFromSVG();
    }
    
    // Generar iconos
    console.log('\n📱 Generando iconos de aplicación...');
    
    for (const icon of ICON_SIZES) {
      const outputPath = path.join(publicDir, icon.name);
      
      await sharp(sourceBuffer)
        .resize(icon.size, icon.size, {
          fit: 'cover',
          background: { r: 33, g: 33, b: 33, alpha: 1 } // MADFAM black
        })
        .png()
        .toFile(outputPath);
      
      console.log(`   ✅ ${icon.name} (${icon.size}x${icon.size})`);
    }
    
    // Generar favicon.ico
    console.log('\n🌟 Generando favicon.ico...');
    await sharp(sourceBuffer)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('   ✅ favicon.ico');
    
    // Generar splash screens
    console.log('\n💦 Generando splash screens...');
    
    for (const splash of SPLASH_SCREENS) {
      const splashBuffer = await generateSplashScreen(splash.width, splash.height);
      const outputPath = path.join(publicDir, splash.name);
      
      await sharp(splashBuffer)
        .png()
        .toFile(outputPath);
      
      console.log(`   ✅ ${splash.name} (${splash.width}x${splash.height})`);
    }
    
    // Generar otros archivos necesarios
    console.log('\n📄 Generando archivos adicionales...');
    
    // browserconfig.xml para Windows
    const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/testigos-solarpunk/ms-icon-70x70.png"/>
      <square150x150logo src="/testigos-solarpunk/ms-icon-150x150.png"/>
      <square310x310logo src="/testigos-solarpunk/ms-icon-310x310.png"/>
      <TileColor>${MADFAM_COLORS.yellow}</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
    
    await fs.writeFile(
      path.join(publicDir, 'browserconfig.xml'),
      browserConfig
    );
    console.log('   ✅ browserconfig.xml');
    
    // Resumen
    console.log('\n' + '='.repeat(50));
    console.log('✨ ¡Generación completada!');
    console.log('='.repeat(50));
    console.log(`Total de iconos generados: ${ICON_SIZES.length}`);
    console.log(`Total de splash screens: ${SPLASH_SCREENS.length}`);
    console.log('\n🌞 ¡Aleluya Solar! Los iconos están listos.\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}