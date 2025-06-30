/**
 * @fileoverview Navigation Audit Script
 *
 * Automated tool to audit site navigation, find broken links, and generate
 * comprehensive reports about the site's link structure. Helps maintain
 * navigation integrity across the Testigos de Solarpunk website.
 *
 * Features:
 * - Discovers all pages in the project
 * - Scans for internal links in all source files
 * - Identifies broken links and missing pages
 * - Generates JSON and Markdown reports
 *
 * Usage:
 * ```bash
 * node scripts/audit-navigation.js
 * ```
 *
 * @module scripts/audit-navigation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Navigation auditing class
 *
 * Scans the entire codebase to build a comprehensive map of pages and links,
 * then identifies any broken internal links.
 */
class NavigationAuditor {
  constructor() {
    /** @type {Array<{link: string, normalizedLink: string, usedIn: string[]}>} Broken links found */
    this.brokenLinks = [];
    /** @type {Set<string>} All discoverable page routes */
    this.allPages = new Set();
    /** @type {Set<string>} All internal links found in codebase */
    this.allLinks = new Set();
    /** @type {Object<string, string[]>} Map of links to files using them */
    this.navigationMap = {};
  }

  /**
   * Main audit process
   *
   * Executes the complete navigation audit workflow:
   * 1. Discovers all pages
   * 2. Scans for all internal links
   * 3. Identifies broken links
   * 4. Generates comprehensive reports
   *
   * @async
   * @returns {Promise<void>}
   */
  async audit() {
    console.log('🔍 Iniciando auditoría de navegación...\n');

    // 1. Encontrar todas las páginas
    await this.findAllPages();

    // 2. Escanear todos los enlaces
    await this.scanAllLinks();

    // 3. Verificar enlaces rotos
    this.checkBrokenLinks();

    // 4. Generar reportes
    this.generateReports();

    console.log('✅ Auditoría completada!\n');
  }

  /**
   * Recursively retrieves all files in a directory
   *
   * @param {string} dirPath - Directory path to scan
   * @param {string[]} [arrayOfFiles=[]] - Accumulator for file paths
   * @returns {string[]} Array of all file paths found
   *
   * Excludes:
   * - node_modules directory
   * - .git directory
   */
  getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        if (!filePath.includes('node_modules') && !filePath.includes('.git')) {
          arrayOfFiles = this.getAllFiles(filePath, arrayOfFiles);
        }
      } else {
        arrayOfFiles.push(filePath);
      }
    });

    return arrayOfFiles;
  }

  /**
   * Discovers all page routes in the project
   *
   * Scans the src/pages directory for .astro, .md, and .mdx files
   * and converts file paths to URL routes.
   *
   * @async
   * @returns {Promise<void>}
   */
  async findAllPages() {
    const pagesDir = path.join(__dirname, '..', 'src', 'pages');
    const files = this.getAllFiles(pagesDir);

    files.forEach((file) => {
      if (
        file.endsWith('.astro') ||
        file.endsWith('.md') ||
        file.endsWith('.mdx')
      ) {
        const route = this.fileToRoute(file);
        this.allPages.add(route);
      }
    });

    console.log(`📄 Encontradas ${this.allPages.size} páginas`);
  }

  /**
   * Scans all source files for internal links
   *
   * Searches through .astro, .tsx, .jsx, .md, and .mdx files
   * to extract all internal link references.
   *
   * @async
   * @returns {Promise<void>}
   */
  async scanAllLinks() {
    const srcDir = path.join(__dirname, '..', 'src');
    const files = this.getAllFiles(srcDir);

    for (const file of files) {
      if (
        file.endsWith('.astro') ||
        file.endsWith('.tsx') ||
        file.endsWith('.jsx') ||
        file.endsWith('.md') ||
        file.endsWith('.mdx')
      ) {
        const content = fs.readFileSync(file, 'utf8');
        const links = this.extractLinks(content);

        links.forEach((link) => {
          this.allLinks.add(link);

          // Mapear qué archivos enlazan a qué rutas
          if (!this.navigationMap[link]) {
            this.navigationMap[link] = [];
          }
          this.navigationMap[link].push(
            file.replace(path.join(__dirname, '..') + path.sep, '')
          );
        });
      }
    }

    console.log(`🔗 Encontrados ${this.allLinks.size} enlaces únicos`);
  }

  /**
   * Extracts all internal links from file content
   *
   * Uses regex patterns to find various link formats including:
   * - Standard href attributes
   * - Template literal hrefs
   * - React Router links
   * - Programmatic navigation
   *
   * @param {string} content - File content to search
   * @returns {Set<string>} Set of unique internal links found
   */
  extractLinks(content) {
    const links = new Set();

    // Patrones para encontrar enlaces - incluyendo template literals
    const patterns = [
      /href=["']([^"']+)["']/g,
      /href=\{`([^`]+)`\}/g, // Template literals
      /to=["']([^"']+)["']/g,
      /<Link[^>]+href=["']([^"']+)["']/g,
      /navigate\(["']([^"']+)["']\)/g,
    ];

    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        let link = match[1];

        // Manejar enlaces con ${basePath}
        if (link.includes('${basePath}')) {
          // Extraer la parte después de ${basePath}
          link = link.replace(/\$\{basePath\}/g, '');
        }

        // Solo enlaces internos
        if (
          link &&
          (link.startsWith('/') || link === '') &&
          !link.startsWith('//')
        ) {
          links.add(link || '/');
        }
      }
    });

    return links;
  }

  /**
   * Converts file path to URL route
   *
   * Transforms file system paths into web routes following
   * Astro's file-based routing conventions.
   *
   * @param {string} filePath - Absolute file path
   * @returns {string} URL route path
   *
   * Examples:
   * - /pages/index.astro -> /
   * - /pages/about.astro -> /about
   * - /pages/blog/index.astro -> /blog
   */
  fileToRoute(filePath) {
    // Convertir ruta de archivo a ruta URL
    const pagesDir = path.join(__dirname, '..', 'src', 'pages');
    let route = filePath
      .replace(pagesDir, '')
      .replace(/\.(astro|md|mdx)$/, '')
      .replace(/\/index$/, '');

    // Manejar la página raíz
    if (route === '') {
      route = '/';
    }

    // Asegurar que todas las rutas empiecen con /
    if (!route.startsWith('/')) {
      route = '/' + route;
    }

    // Convertir separadores de Windows a Unix
    route = route.replace(/\\/g, '/');

    return route;
  }

  /**
   * Identifies broken internal links
   *
   * Compares all found links against discovered pages to find
   * links pointing to non-existent routes.
   *
   * @returns {void}
   *
   * Handles:
   * - Hash fragments (#section)
   * - Query parameters (?param=value)
   * - Trailing slashes
   * - Index routes
   */
  checkBrokenLinks() {
    this.allLinks.forEach((link) => {
      // Normalizar el enlace
      let normalizedLink = link.split('#')[0].split('?')[0];

      // Ignorar enlaces externos y especiales
      if (
        normalizedLink.startsWith('http') ||
        normalizedLink.startsWith('mailto:') ||
        normalizedLink === '' ||
        normalizedLink === '#'
      ) {
        return;
      }

      // Añadir / al final si no es un archivo
      if (!normalizedLink.includes('.') && !normalizedLink.endsWith('/')) {
        // Verificar ambas versiones
        const withSlash = normalizedLink + '/';
        const withoutSlash = normalizedLink;

        if (!this.allPages.has(withoutSlash) && !this.allPages.has(withSlash)) {
          // También verificar si existe como /index
          const asIndex = normalizedLink + '/index';
          if (!this.allPages.has(asIndex)) {
            this.brokenLinks.push({
              link: link,
              normalizedLink: normalizedLink,
              usedIn: this.navigationMap[link] || [],
            });
          }
        }
      } else if (!this.allPages.has(normalizedLink)) {
        this.brokenLinks.push({
          link: link,
          normalizedLink: normalizedLink,
          usedIn: this.navigationMap[link] || [],
        });
      }
    });

    console.log(`❌ Encontrados ${this.brokenLinks.length} enlaces rotos`);
  }

  /**
   * Generates comprehensive audit reports
   *
   * Creates three report files:
   * 1. broken-links.json - Detailed broken links data
   * 2. site-navigation.json - Complete navigation map
   * 3. missing-pages.md - Human-readable missing pages report
   *
   * @returns {void}
   */
  generateReports() {
    const timestamp = new Date().toISOString();

    // Reporte de enlaces rotos
    const brokenLinksReport = {
      totalBroken: this.brokenLinks.length,
      brokenLinks: this.brokenLinks,
      timestamp: timestamp,
    };

    fs.writeFileSync(
      path.join(__dirname, '..', 'broken-links.json'),
      JSON.stringify(brokenLinksReport, null, 2)
    );

    // Mapa de navegación
    const navigationMapReport = {
      totalPages: this.allPages.size,
      totalLinks: this.allLinks.size,
      pages: Array.from(this.allPages).sort(),
      links: Array.from(this.allLinks).sort(),
      navigationMap: this.navigationMap,
      timestamp: timestamp,
    };

    fs.writeFileSync(
      path.join(__dirname, '..', 'site-navigation.json'),
      JSON.stringify(navigationMapReport, null, 2)
    );

    // Reporte de páginas faltantes
    let missingPagesReport = '# Páginas Faltantes\n\n';
    missingPagesReport += `Fecha: ${timestamp}\n\n`;

    if (this.brokenLinks.length > 0) {
      missingPagesReport += '## Enlaces Rotos Encontrados:\n\n';

      // Agrupar por página faltante
      const groupedByMissing = {};
      this.brokenLinks.forEach((broken) => {
        if (!groupedByMissing[broken.normalizedLink]) {
          groupedByMissing[broken.normalizedLink] = [];
        }
        groupedByMissing[broken.normalizedLink].push(...broken.usedIn);
      });

      Object.entries(groupedByMissing).forEach(([missingPage, usedInFiles]) => {
        missingPagesReport += `### ${missingPage}\n`;
        missingPagesReport += 'Usado en:\n';
        const uniqueFiles = [...new Set(usedInFiles)];
        uniqueFiles.forEach((file) => {
          missingPagesReport += `- ${file}\n`;
        });
        missingPagesReport += '\n';
      });
    } else {
      missingPagesReport += '✅ No se encontraron enlaces rotos!\n';
    }

    fs.writeFileSync(
      path.join(__dirname, '..', 'missing-pages.md'),
      missingPagesReport
    );

    // Imprimir resumen
    console.log('\n📊 Resumen de la Auditoría:');
    console.log(`   - Total de páginas: ${this.allPages.size}`);
    console.log(`   - Total de enlaces: ${this.allLinks.size}`);
    console.log(`   - Enlaces rotos: ${this.brokenLinks.length}`);
    console.log('\n📁 Reportes generados:');
    console.log('   - broken-links.json');
    console.log('   - site-navigation.json');
    console.log('   - missing-pages.md');
  }
}

/**
 * Script execution
 *
 * Creates and runs the navigation auditor.
 * Errors are logged to console.
 */
const auditor = new NavigationAuditor();
auditor.audit().catch(console.error);
