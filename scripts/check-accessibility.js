import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color contrast checker
function getLuminance(rgb) {
  const [r, g, b] = rgb;
  const sRGB = [r, g, b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

class AccessibilityChecker {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.passes = [];
  }

  // Recursive function to get all files
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

  async check() {
    console.log('♿ Iniciando verificación de accesibilidad...\n');

    // 1. Verificar estructura HTML
    await this.checkHTMLStructure();

    // 2. Verificar ARIA y roles
    await this.checkARIA();

    // 3. Verificar contraste de colores
    await this.checkColorContrast();

    // 4. Verificar navegación por teclado
    await this.checkKeyboardNavigation();

    // 5. Verificar formularios
    await this.checkForms();

    // 6. Generar reporte
    this.generateReport();

    console.log('✅ Verificación completada!\n');
  }

  async checkHTMLStructure() {
    console.log('📋 Verificando estructura HTML...');

    const srcDir = path.join(__dirname, '..', 'src');
    const files = this.getAllFiles(srcDir).filter((f) => f.endsWith('.astro'));

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      const relativeFile = file.replace(
        path.join(__dirname, '..') + path.sep,
        ''
      );

      // Verificar skip links
      if (file.includes('BaseLayout') && !content.includes('skip-link')) {
        this.issues.push({
          file: relativeFile,
          type: 'missing-skip-link',
          message: 'Falta skip link para saltar al contenido principal',
        });
      }

      // Verificar lang attribute
      if (file.includes('BaseLayout') && !content.includes('lang=')) {
        this.issues.push({
          file: relativeFile,
          type: 'missing-lang',
          message: 'Falta atributo lang en el elemento html',
        });
      }

      // Verificar headings
      const headingMatches = content.match(/<h[1-6][^>]*>/g) || [];
      const headingLevels = headingMatches.map((h) =>
        parseInt(h.match(/h([1-6])/)[1])
      );

      // Verificar saltos en jerarquía de headings
      for (let i = 1; i < headingLevels.length; i++) {
        if (headingLevels[i] - headingLevels[i - 1] > 1) {
          this.warnings.push({
            file: relativeFile,
            type: 'heading-skip',
            message: `Salto en jerarquía de headings: h${headingLevels[i - 1]} a h${headingLevels[i]}`,
          });
        }
      }

      // Verificar alt text en imágenes
      const imgMatches = content.match(/<img[^>]*>/g) || [];
      imgMatches.forEach((img) => {
        if (!img.includes('alt=')) {
          this.issues.push({
            file: relativeFile,
            type: 'missing-alt',
            message: 'Imagen sin atributo alt',
            element: img,
          });
        }
      });
    }
  }

  async checkARIA() {
    console.log('🏷️  Verificando ARIA y roles...');

    const srcDir = path.join(__dirname, '..', 'src');
    const files = this.getAllFiles(srcDir).filter((f) => f.endsWith('.astro'));

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      const relativeFile = file.replace(
        path.join(__dirname, '..') + path.sep,
        ''
      );

      // Verificar botones sin aria-label cuando solo tienen íconos
      const buttonMatches =
        content.match(/<button[^>]*>([^<]*)<\/button>/g) || [];
      buttonMatches.forEach((button) => {
        const buttonContent = button.match(/>([^<]*)</)[1];
        // Si el botón solo tiene emoji o está vacío
        if (
          !buttonContent.trim() ||
          /^[\u{1F300}-\u{1F9FF}]+$/u.test(buttonContent.trim())
        ) {
          if (!button.includes('aria-label')) {
            this.issues.push({
              file: relativeFile,
              type: 'missing-aria-label',
              message: 'Botón con solo ícono/emoji sin aria-label',
              element: button,
            });
          }
        }
      });

      // Verificar navegación principal
      if (content.includes('<nav') && !content.includes('aria-label')) {
        this.warnings.push({
          file: relativeFile,
          type: 'nav-no-label',
          message: 'Elemento nav sin aria-label descriptivo',
        });
      }

      // Verificar dropdowns
      if (content.includes('dropdown') || content.includes('submenu')) {
        if (
          !content.includes('aria-expanded') &&
          !content.includes('aria-haspopup')
        ) {
          this.issues.push({
            file: relativeFile,
            type: 'dropdown-no-aria',
            message:
              'Dropdown sin atributos ARIA apropiados (aria-expanded, aria-haspopup)',
          });
        }
      }

      // Verificar enlaces con target="_blank"
      const blankLinks = content.match(/<a[^>]*target="_blank"[^>]*>/g) || [];
      blankLinks.forEach((link) => {
        if (!link.includes('rel=') || !link.includes('noopener')) {
          this.warnings.push({
            file: relativeFile,
            type: 'unsafe-blank-link',
            message: 'Enlace con target="_blank" sin rel="noopener noreferrer"',
            element: link,
          });
        }
      });
    }
  }

  async checkColorContrast() {
    console.log('🎨 Verificando contraste de colores...');

    // Colores principales del proyecto
    const colorPairs = [
      // Texto sobre fondos
      {
        name: 'Texto primario sobre fondo oscuro',
        fg: '#FFFFFF',
        bg: '#0A0A0B',
        minRatio: 7,
      },
      {
        name: 'Texto secundario sobre fondo oscuro',
        fg: '#DDDDDD',
        bg: '#0A0A0B',
        minRatio: 7,
      },
      {
        name: 'Amarillo MADFAM sobre oscuro',
        fg: '#FFC107',
        bg: '#0A0A0B',
        minRatio: 4.5,
      },
      {
        name: 'Verde sobre oscuro',
        fg: '#66BB6A',
        bg: '#0A0A0B',
        minRatio: 4.5,
      },
      {
        name: 'Enlaces sobre oscuro',
        fg: '#64B5F6',
        bg: '#0A0A0B',
        minRatio: 4.5,
      },
      // Botones
      {
        name: 'Texto sobre botón amarillo',
        fg: '#0A0A0B',
        bg: '#FFC107',
        minRatio: 4.5,
      },
      // Elementos de UI - Updated to match CSS changes
      { name: 'Bordes sobre fondo', fg: '#606060', bg: '#0A0A0B', minRatio: 3 },
    ];

    colorPairs.forEach((pair) => {
      const fgRgb = hexToRgb(pair.fg);
      const bgRgb = hexToRgb(pair.bg);

      if (fgRgb && bgRgb) {
        const ratio = getContrastRatio(fgRgb, bgRgb);

        if (ratio < pair.minRatio) {
          this.issues.push({
            type: 'low-contrast',
            message: `${pair.name}: ratio ${ratio.toFixed(2)}:1 (mínimo ${pair.minRatio}:1)`,
            colors: { foreground: pair.fg, background: pair.bg },
          });
        } else {
          this.passes.push({
            type: 'good-contrast',
            message: `${pair.name}: ratio ${ratio.toFixed(2)}:1 ✓`,
          });
        }
      }
    });
  }

  async checkKeyboardNavigation() {
    console.log('⌨️  Verificando navegación por teclado...');

    const srcDir = path.join(__dirname, '..', 'src');
    const cssFiles = this.getAllFiles(srcDir).filter((f) => f.endsWith('.css'));

    let hasFocusVisible = false;
    let hasSkipLink = false;
    let hasSrOnly = false;

    for (const file of cssFiles) {
      const content = fs.readFileSync(file, 'utf8');

      if (
        content.includes(':focus-visible') ||
        content.includes('focus-visible')
      ) {
        hasFocusVisible = true;
      }

      if (content.includes('.skip-link') || content.includes('skip-to')) {
        hasSkipLink = true;
      }

      if (
        content.includes('.sr-only') ||
        content.includes('.visually-hidden')
      ) {
        hasSrOnly = true;
      }
    }

    if (!hasFocusVisible) {
      this.issues.push({
        type: 'no-focus-visible',
        message:
          'No se encontraron estilos :focus-visible para navegación por teclado',
      });
    }

    if (!hasSkipLink) {
      this.issues.push({
        type: 'no-skip-link-styles',
        message: 'No se encontraron estilos para skip links',
      });
    }

    if (!hasSrOnly) {
      this.issues.push({
        type: 'no-sr-only',
        message:
          'No se encontró clase .sr-only para contenido de screen readers',
      });
    }

    // Verificar componentes interactivos
    const astroFiles = this.getAllFiles(srcDir).filter((f) =>
      f.endsWith('.astro')
    );

    for (const file of astroFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relativeFile = file.replace(
        path.join(__dirname, '..') + path.sep,
        ''
      );

      // Verificar tabindex positivos (mala práctica)
      if (content.includes('tabindex="') && content.match(/tabindex="[1-9]/)) {
        this.issues.push({
          file: relativeFile,
          type: 'positive-tabindex',
          message:
            'Uso de tabindex positivo (interfiere con orden natural de tabulación)',
        });
      }
    }
  }

  async checkForms() {
    console.log('📝 Verificando formularios...');

    const srcDir = path.join(__dirname, '..', 'src');
    const files = this.getAllFiles(srcDir).filter((f) => f.endsWith('.astro'));

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      const relativeFile = file.replace(
        path.join(__dirname, '..') + path.sep,
        ''
      );

      // Verificar inputs sin labels
      const inputMatches = content.match(/<input[^>]*>/g) || [];
      inputMatches.forEach((input) => {
        if (
          !input.includes('type="hidden') &&
          !input.includes('type="submit')
        ) {
          const idMatch = input.match(/id=["']([^"']+)["']/);
          if (idMatch) {
            const inputId = idMatch[1];
            if (
              !content.includes(`for="${inputId}"`) &&
              !input.includes('aria-label')
            ) {
              this.issues.push({
                file: relativeFile,
                type: 'input-no-label',
                message: 'Input sin label asociado o aria-label',
                element: input,
              });
            }
          }
        }
      });

      // Verificar campos requeridos
      const requiredInputs = content.match(/<input[^>]*required[^>]*>/g) || [];
      requiredInputs.forEach((input) => {
        if (!input.includes('aria-required')) {
          this.warnings.push({
            file: relativeFile,
            type: 'required-no-aria',
            message: 'Campo requerido sin aria-required="true"',
            element: input,
          });
        }
      });
    }
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalIssues: this.issues.length,
        totalWarnings: this.warnings.length,
        totalPasses: this.passes.length,
        wcagLevel: this.issues.length === 0 ? 'AA' : 'Fails',
      },
      issues: this.issues,
      warnings: this.warnings,
      passes: this.passes,
      recommendations: [
        'Implementar skip links en el layout principal',
        'Añadir estilos :focus-visible para todos los elementos interactivos',
        'Crear utilidad .sr-only para contenido de screen readers',
        'Añadir ARIA labels a todos los elementos interactivos',
        'Implementar navegación por teclado en dropdowns',
        'Verificar y ajustar contrastes de color para WCAG AAA',
      ],
    };

    fs.writeFileSync(
      path.join(__dirname, '..', 'accessibility-report.json'),
      JSON.stringify(report, null, 2)
    );

    // Generar reporte markdown
    let mdReport = '# Reporte de Accesibilidad\n\n';
    mdReport += `Fecha: ${report.timestamp}\n\n`;
    mdReport += `## Resumen\n\n`;
    mdReport += `- **Issues críticos**: ${this.issues.length}\n`;
    mdReport += `- **Advertencias**: ${this.warnings.length}\n`;
    mdReport += `- **Verificaciones pasadas**: ${this.passes.length}\n`;
    mdReport += `- **Nivel WCAG**: ${report.summary.wcagLevel}\n\n`;

    if (this.issues.length > 0) {
      mdReport += '## Issues Críticos\n\n';
      this.issues.forEach((issue) => {
        mdReport += `- **${issue.type}**: ${issue.message}`;
        if (issue.file) mdReport += ` (${issue.file})`;
        mdReport += '\n';
      });
      mdReport += '\n';
    }

    if (this.warnings.length > 0) {
      mdReport += '## Advertencias\n\n';
      this.warnings.forEach((warning) => {
        mdReport += `- **${warning.type}**: ${warning.message}`;
        if (warning.file) mdReport += ` (${warning.file})`;
        mdReport += '\n';
      });
      mdReport += '\n';
    }

    mdReport += '## Recomendaciones\n\n';
    report.recommendations.forEach((rec) => {
      mdReport += `- ${rec}\n`;
    });

    fs.writeFileSync(
      path.join(__dirname, '..', 'accessibility-report.md'),
      mdReport
    );

    // Imprimir resumen
    console.log('\n📊 Resumen de Accesibilidad:');
    console.log(`   - Issues críticos: ${this.issues.length}`);
    console.log(`   - Advertencias: ${this.warnings.length}`);
    console.log(`   - Verificaciones pasadas: ${this.passes.length}`);
    console.log('\n📁 Reportes generados:');
    console.log('   - accessibility-report.json');
    console.log('   - accessibility-report.md');
  }
}

// Ejecutar verificación
const checker = new AccessibilityChecker();
checker.check().catch(console.error);
