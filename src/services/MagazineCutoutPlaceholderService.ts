/**
 * Servicio de Placeholders con Estética Magazine Cutout
 * Testigos de Solarpunk - MADFAM
 *
 * Genera placeholders AI que mantienen la estética DIY de recortes de revista
 */

import {
  magazinePlaceholderConfig,
  type PlaceholderType,
  type StyleModifier,
  type PlaceholderService,
  defaultConfigs,
} from '../config/magazine-placeholders.config';

export interface MagazinePlaceholderOptions {
  type: PlaceholderType;
  width?: number;
  height?: number;
  prompt?: string;
  customModifiers?: StyleModifier[];
  rotation?: number;
  priority?: 'high' | 'normal' | 'low';
}

interface PlaceholderConfig {
  type: PlaceholderType;
  width: number;
  height: number;
  quality: number;
  prompt: string;
  enhancedPrompt: string;
  modifiers: StyleModifier[];
  priority: string;
}

export interface GeneratedPlaceholder {
  url: string;
  fallbackUrl?: string;
  service: string;
  cached: boolean;
  aesthetic: {
    rotation: number;
    translateX: number;
    translateY: number;
    hasDecorations: boolean;
  };
}

export class MagazineCutoutPlaceholderService {
  private static cache = new Map<string, GeneratedPlaceholder>();
  // private static activePreviews = new Set<string>();

  /**
   * Genera un placeholder con estética magazine cutout
   */
  static async generatePlaceholder(
    options: MagazinePlaceholderOptions
  ): Promise<GeneratedPlaceholder> {
    const config = this.buildConfig(options);
    const cacheKey = this.getCacheKey(config);

    // Verificar cache primero
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return { ...cached, cached: true };
    }

    // Generar aesthetic properties
    const aesthetic = this.generateAesthetic();

    try {
      // Intentar servicios AI en orden de prioridad
      for (const service of magazinePlaceholderConfig.services) {
        if (!service.enabled) continue;

        try {
          const url = await this.tryService(service, config);
          if (url !== null && url !== '') {
            const result: GeneratedPlaceholder = {
              url,
              fallbackUrl: this.generateSVGFallback(config),
              service: service.name,
              cached: false,
              aesthetic,
            };

            // Cachear resultado
            this.cache.set(cacheKey, result);
            return result;
          }
        } catch (error) {
          console.warn(`Service ${service.name} failed:`, error);
          continue;
        }
      }

      // Si todos fallan, usar SVG fallback
      const fallbackUrl = this.generateSVGFallback(config);
      const result: GeneratedPlaceholder = {
        url: fallbackUrl,
        service: 'svg-fallback',
        cached: false,
        aesthetic,
      };

      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error generating placeholder:', error);

      // Fallback de emergencia
      return {
        url: this.generateSVGFallback(config),
        service: 'emergency-fallback',
        cached: false,
        aesthetic,
      };
    }
  }

  /**
   * Construye configuración completa a partir de opciones
   */
  private static buildConfig(
    options: MagazinePlaceholderOptions
  ): PlaceholderConfig {
    const defaults = defaultConfigs[options.type];
    const basePrompt = magazinePlaceholderConfig.prompts[options.type];

    const modifiers = options.customModifiers || defaults.modifiers;
    const modifierText = modifiers
      .map((m) => magazinePlaceholderConfig.styleModifiers[m])
      .join(', ');

    return {
      type: options.type,
      width: options.width ?? defaults.width,
      height: options.height ?? defaults.height,
      quality: defaults.quality,
      prompt: options.prompt ?? basePrompt,
      enhancedPrompt: `${options.prompt ?? basePrompt}, ${modifierText}`,
      modifiers,
      priority: options.priority ?? 'normal',
    };
  }

  /**
   * Intenta generar placeholder con un servicio específico
   */
  private static async tryService(
    service: PlaceholderService,
    config: PlaceholderConfig
  ): Promise<string | null> {
    const { timeout } = magazinePlaceholderConfig.performance;

    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => resolve(null), timeout);

      try {
        let url: string;

        switch (service.name) {
          case 'placeholders.io':
            url = this.buildPlaceholdersIOUrl(service, config);
            break;

          case 'abh.ai':
            url = this.buildABHUrl(service, config);
            break;

          case 'placeholdr.ai':
            url = this.buildPlaceholdrUrl(service, config);
            break;

          default:
            resolve(null);
            return;
        }

        // Verificar que la URL es válida
        const img = new Image();
        img.onload = () => {
          clearTimeout(timeoutId);
          resolve(url);
        };
        img.onerror = () => {
          clearTimeout(timeoutId);
          resolve(null);
        };
        img.src = url;
      } catch (error) {
        clearTimeout(timeoutId);
        resolve(null);
      }
    });
  }

  /**
   * Construye URL para placeholders.io
   */
  private static buildPlaceholdersIOUrl(
    service: PlaceholderService,
    config: PlaceholderConfig
  ): string {
    const params = new URLSearchParams({
      prompt: config.enhancedPrompt,
      w: config.width.toString(),
      h: config.height.toString(),
      style: service.styleParams.style ?? 'collage',
      texture: service.styleParams.texture ?? 'paper',
      effect: service.styleParams.effect ?? 'vintage',
    });

    return `${service.endpoint}?${params.toString()}`;
  }

  /**
   * Construye URL para abh.ai
   */
  private static buildABHUrl(
    service: PlaceholderService,
    config: PlaceholderConfig
  ): string {
    const size = `${config.width}x${config.height}`;
    const params = new URLSearchParams({
      text: config.enhancedPrompt,
      style: service.styleParams.style ?? 'magazine',
      border: service.styleParams.border ?? 'cutout',
    });

    return `${service.endpoint}/${size}?${params.toString()}`;
  }

  /**
   * Construye URL para placeholdr.ai
   */
  private static buildPlaceholdrUrl(
    service: PlaceholderService,
    config: PlaceholderConfig
  ): string {
    const params = new URLSearchParams({
      prompt: config.enhancedPrompt,
      w: config.width.toString(),
      h: config.height.toString(),
      aesthetic: service.styleParams.aesthetic ?? 'diy-cutout',
      paper: service.styleParams.paper ?? 'vintage',
    });

    return `${service.endpoint}?${params.toString()}`;
  }

  /**
   * Genera propiedades estéticas para el magazine cutout
   */
  private static generateAesthetic(): {
    rotation: number;
    translateX: number;
    translateY: number;
    hasDecorations: boolean;
  } {
    const { rotationRange, tapeChance, stapleChance } =
      magazinePlaceholderConfig.aesthetics;

    return {
      rotation:
        Math.random() * (rotationRange[1] - rotationRange[0]) +
        rotationRange[0],
      translateX: Math.random() * 6 - 3, // -3px a 3px
      translateY: Math.random() * 6 - 3,
      hasDecorations: Math.random() < tapeChance + stapleChance,
    };
  }

  /**
   * Genera SVG fallback con estética auténtica de magazine cutout
   */
  private static generateSVGFallback(config: PlaceholderConfig): string {
    const { paperColors, decorationColors, defaultMessages } =
      magazinePlaceholderConfig.svgFallback;
    const { width, height, type } = config;

    const rotation = Math.random() * 10 - 5;
    const paperColor =
      paperColors[Math.floor(Math.random() * paperColors.length)];
    const decorColor =
      decorationColors[Math.floor(Math.random() * decorationColors.length)];
    const message =
      defaultMessages[type as keyof typeof defaultMessages] ?? 'PRÓXIMAMENTE';

    const tornEdgePath = this.generateTornEdgePath(width, height);
    const decorations = this.generateSVGDecorations(width, height, decorColor);
    const content = this.generateTypeSpecificContent(
      String(type),
      width,
      height,
      message
    );

    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Textura de papel -->
          <filter id="roughPaper" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise"/>
            <feColorMatrix in="noise" values="0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0"/>
          </filter>
          
          <!-- Borde desgarrado -->
          <clipPath id="tornEdge">
            <path d="${tornEdgePath}" />
          </clipPath>
          
          <!-- Sombra -->
          <filter id="dropShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="4" dy="4" result="offsetblur"/>
            <feFlood flood-color="#000000" flood-opacity="0.2"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <g transform="rotate(${rotation} ${width / 2} ${height / 2})">
          <!-- Fondo de papel -->
          <rect 
            width="${width}" 
            height="${height}" 
            fill="${paperColor}"
            filter="url(#roughPaper)"
            clip-path="url(#tornEdge)"
          />
          
          <!-- Contenido específico del tipo -->
          <g filter="url(#dropShadow)">
            ${content}
          </g>
          
          <!-- Decoraciones (cinta, grapas) -->
          ${decorations}
        </g>
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  /**
   * Genera path de borde desgarrado
   */
  private static generateTornEdgePath(width: number, height: number): string {
    const points: string[] = [];
    const steps = 15;
    const roughness = 8;

    // Borde superior
    for (let i = 0; i <= steps; i++) {
      const x = (width / steps) * i;
      const y = Math.random() * roughness;
      points.push(`${x},${y}`);
    }

    // Borde derecho
    for (let i = 1; i <= steps; i++) {
      const y = (height / steps) * i;
      const x = width - Math.random() * roughness;
      points.push(`${x},${y}`);
    }

    // Borde inferior
    for (let i = steps; i >= 0; i--) {
      const x = (width / steps) * i;
      const y = height - Math.random() * roughness;
      points.push(`${x},${y}`);
    }

    // Borde izquierdo
    for (let i = steps; i >= 0; i--) {
      const y = (height / steps) * i;
      const x = Math.random() * roughness;
      points.push(`${x},${y}`);
    }

    return `M ${points.join(' L ')} Z`;
  }

  /**
   * Genera decoraciones SVG (cinta, grapas)
   */
  private static generateSVGDecorations(
    width: number,
    height: number,
    color: string
  ): string {
    const decorations = [];

    // Múltiples cintas para mayor autenticidad
    if (Math.random() > 0.3) {
      const numTapes = Math.random() > 0.7 ? 2 : 1;
      for (let i = 0; i < numTapes; i++) {
        const tapeWidth = 40 + Math.random() * 60;
        const tapeHeight = 15 + Math.random() * 20;
        const x = Math.random() * (width - tapeWidth);
        const y =
          i === 0 ? Math.random() * 30 - 15 : height - 30 + Math.random() * 30;
        const rotation = Math.random() * 50 - 25;
        const tapeColor = i === 0 ? color : '#F5DEB3';

        decorations.push(`
          <rect 
            x="${x}" y="${y}" 
            width="${tapeWidth}" height="${tapeHeight}" 
            fill="${tapeColor}" opacity="0.8" 
            transform="rotate(${rotation} ${x + tapeWidth / 2} ${y + tapeHeight / 2})"
            filter="url(#roughPaper)"
          />
          <!-- Tape shine effect -->
          <rect 
            x="${x + 2}" y="${y + 2}" 
            width="${tapeWidth - 4}" height="4" 
            fill="white" opacity="0.3" 
            transform="rotate(${rotation} ${x + tapeWidth / 2} ${y + tapeHeight / 2})"
          />
        `);
      }
    }

    // Grapas y elementos adicionales
    if (Math.random() > 0.6) {
      const x = Math.random() * (width - 25) + 15;
      const y = Math.random() * (height - 40) + 20;
      const stapleRotation = Math.random() * 30 - 15;

      decorations.push(`
        <g transform="translate(${x}, ${y}) rotate(${stapleRotation})">
          <!-- Staple shadow -->
          <rect x="2" y="2" width="14" height="3" fill="#000" opacity="0.2" rx="1"/>
          <rect x="2" y="10" width="14" height="3" fill="#000" opacity="0.2" rx="1"/>
          <!-- Actual staple -->
          <rect x="0" y="0" width="14" height="3" fill="#666" rx="1"/>
          <rect x="0" y="8" width="14" height="3" fill="#666" rx="1"/>
          <rect x="0" y="0" width="3" height="11" fill="#555" rx="1"/>
          <rect x="11" y="0" width="3" height="11" fill="#555" rx="1"/>
          <!-- Metallic shine -->
          <rect x="1" y="1" width="12" height="1" fill="white" opacity="0.4" rx="0.5"/>
        </g>
      `);
    }

    // Manchas de café ocasionales
    if (Math.random() > 0.8) {
      const stainX = Math.random() * (width - 40) + 20;
      const stainY = Math.random() * (height - 40) + 20;
      const stainSize = 15 + Math.random() * 25;

      decorations.push(`
        <circle 
          cx="${stainX}" cy="${stainY}" r="${stainSize}" 
          fill="#8B4513" opacity="0.15"
          filter="url(#roughPaper)"
        />
        <circle 
          cx="${stainX + 3}" cy="${stainY - 2}" r="${stainSize * 0.3}" 
          fill="#8B4513" opacity="0.1"
        />
      `);
    }

    return decorations.join('');
  }

  /**
   * Genera contenido específico por tipo
   */
  private static generateTypeSpecificContent(
    type: string,
    width: number,
    height: number,
    message: string
  ): string {
    const centerX = width / 2;
    const centerY = height / 2;

    switch (type) {
      case 'character':
        return `
          <circle cx="${centerX}" cy="${centerY - 20}" r="${Math.min(width, height) / 6}" 
                  fill="#E74C3C" opacity="0.8"/>
          <text x="${centerX}" y="${centerY + 30}" text-anchor="middle" 
                font-family="Georgia" font-size="24" fill="#2C3E50" 
                transform="rotate(-2 ${centerX} ${centerY + 30})">
            ${message}
          </text>
        `;

      case 'sketch':
        return `
          <rect x="${width * 0.2}" y="${height * 0.2}" width="${width * 0.6}" height="${height * 0.6}" 
                fill="#3498DB" opacity="0.6" transform="rotate(2 ${centerX} ${centerY})"/>
          <polygon points="${centerX - 20},${centerY - 15} ${centerX + 15},${centerY} ${centerX - 20},${centerY + 15}" 
                   fill="#F39C12"/>
          <text x="${centerX}" y="${height * 0.8}" text-anchor="middle" 
                font-family="Courier" font-size="16" fill="#2C3E50">
            ${message} #${Math.floor(Math.random() * 99)}
          </text>
        `;

      case 'podcast':
        return `
          <circle cx="${centerX}" cy="${centerY}" r="${Math.min(width, height) / 3}" 
                  fill="#9B59B6" opacity="0.7"/>
          <circle cx="${centerX}" cy="${centerY}" r="${Math.min(width, height) / 6}" 
                  fill="white" opacity="0.9"/>
          <text x="${centerX}" y="${centerY + 50}" text-anchor="middle" 
                font-family="Georgia" font-size="20" fill="#2C3E50">
            ${message}
          </text>
        `;

      default:
        return `
          <rect x="20" y="20" width="${width - 40}" height="${height - 40}" 
                fill="#95A5A6" opacity="0.5" rx="8"/>
          <text x="${centerX}" y="${centerY}" text-anchor="middle" 
                font-family="Arial Black" font-size="18" fill="#2C3E50" 
                transform="rotate(-1 ${centerX} ${centerY})">
            ${message}
          </text>
        `;
    }
  }

  /**
   * Genera clave de cache
   */
  private static getCacheKey(config: PlaceholderConfig): string {
    return `${config.type}-${config.width}x${config.height}-${btoa(config.enhancedPrompt).slice(0, 20)}`;
  }

  /**
   * Limpia cache antiguo
   */
  static clearCache(): void {
    this.cache.clear();
  }

  /**
   * Precarga placeholders comunes
   */
  static async preloadCommon(): Promise<void> {
    const commonTypes: PlaceholderType[] = ['character', 'sketch', 'hero'];

    const preloadPromises = commonTypes.map((type) =>
      this.generatePlaceholder({ type, priority: 'low' })
    );

    try {
      await Promise.allSettled(preloadPromises);
    } catch (error) {
      console.warn('Preload failed:', error);
    }
  }
}
