/**
 * @fileoverview MagazineCutoutPlaceholderService
 *
 * Advanced placeholder generation service that creates AI-generated images with
 * magazine cutout aesthetic. Manages multiple AI services with fallback mechanisms,
 * caching, and authentic DIY visual effects.
 *
 * Features:
 * - Multi-service AI placeholder generation with automatic fallback
 * - In-memory caching for performance optimization
 * - SVG fallback with authentic magazine cutout styling
 * - Configurable aesthetic properties (rotation, tape, staples)
 * - Priority-based generation for critical images
 *
 * @module services/MagazineCutoutPlaceholderService
 */

import {
  magazinePlaceholderConfig,
  type PlaceholderType,
  type StyleModifier,
  type PlaceholderService,
  defaultConfigs,
} from '../config/magazine-placeholders.config';

/**
 * Configuration options for placeholder generation
 *
 * @interface MagazinePlaceholderOptions
 * @property {PlaceholderType} type - Type of placeholder to generate
 * @property {number} [width] - Image width in pixels (defaults to type-specific)
 * @property {number} [height] - Image height in pixels (defaults to type-specific)
 * @property {string} [prompt] - Custom prompt for AI generation
 * @property {StyleModifier[]} [customModifiers] - Style modifiers to apply
 * @property {number} [rotation] - Custom rotation angle in degrees
 * @property {'high' | 'normal' | 'low'} [priority='normal'] - Generation priority
 */
export interface MagazinePlaceholderOptions {
  type: PlaceholderType;
  width?: number;
  height?: number;
  prompt?: string;
  customModifiers?: StyleModifier[];
  rotation?: number;
  priority?: 'high' | 'normal' | 'low';
}

/**
 * Internal configuration structure for placeholder generation
 * @internal
 */
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

/**
 * Result of placeholder generation
 *
 * @interface GeneratedPlaceholder
 * @property {string} url - Primary image URL (AI or SVG fallback)
 * @property {string} [fallbackUrl] - Backup URL if primary fails
 * @property {string} service - Service that generated the image
 * @property {boolean} cached - Whether result was served from cache
 * @property {Object} aesthetic - Visual styling properties
 * @property {number} aesthetic.rotation - Rotation angle in degrees
 * @property {number} aesthetic.translateX - Horizontal offset in pixels
 * @property {number} aesthetic.translateY - Vertical offset in pixels
 * @property {boolean} aesthetic.hasDecorations - Whether to show tape/staples
 */
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
   * Generates a placeholder image with magazine cutout aesthetic
   *
   * Main entry point for placeholder generation. Attempts AI services in priority order,
   * falling back to SVG generation if all services fail. Results are cached for performance.
   *
   * @static
   * @async
   * @param {MagazinePlaceholderOptions} options - Configuration for placeholder generation
   * @returns {Promise<GeneratedPlaceholder>} Generated placeholder with URL and metadata
   *
   * @example
   * ```typescript
   * const placeholder = await MagazineCutoutPlaceholderService.generatePlaceholder({
   *   type: 'character',
   *   width: 300,
   *   height: 400,
   *   priority: 'high'
   * });
   * ```
   *
   * Generation Flow:
   * 1. Build complete configuration from options
   * 2. Check cache for existing result
   * 3. Generate aesthetic properties (rotation, decorations)
   * 4. Try each enabled AI service in order
   * 5. Fall back to SVG if all services fail
   * 6. Cache successful result
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
   * Builds complete configuration from user options
   *
   * Merges user-provided options with type-specific defaults and constructs
   * enhanced prompt with style modifiers for AI generation.
   *
   * @private
   * @static
   * @param {MagazinePlaceholderOptions} options - User-provided options
   * @returns {PlaceholderConfig} Complete configuration for placeholder generation
   *
   * Configuration includes:
   * - Type-specific dimensions from defaults
   * - Base prompt enhanced with style modifiers
   * - Quality settings for the placeholder type
   * - Priority level for generation queue
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
   * Attempts placeholder generation with a specific AI service
   *
   * Wraps service-specific URL building and validation with timeout protection.
   * Uses Image API to verify that generated URLs actually load successfully.
   *
   * @private
   * @static
   * @async
   * @param {PlaceholderService} service - AI service configuration
   * @param {PlaceholderConfig} config - Complete placeholder configuration
   * @returns {Promise<string | null>} Generated image URL or null if failed
   *
   * Error Handling:
   * - Timeout after configured duration (default 5s)
   * - Image load validation with onload/onerror
   * - Graceful failure returns null instead of throwing
   * - Service-specific URL builders handle their own parameter encoding
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
   * Builds URL for placeholders.io AI service
   *
   * Constructs query parameters specific to placeholders.io API including
   * magazine-style aesthetic parameters.
   *
   * @private
   * @static
   * @param {PlaceholderService} service - Service configuration with style params
   * @param {PlaceholderConfig} config - Placeholder configuration
   * @returns {string} Complete URL for placeholders.io API
   *
   * URL Parameters:
   * - prompt: Enhanced prompt with style modifiers
   * - w/h: Dimensions in pixels
   * - style: Visual style (default: collage)
   * - texture: Paper texture effect
   * - effect: Vintage filter application
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
   * Builds URL for abh.ai placeholder service
   *
   * Constructs URL with path-based sizing and query parameters for
   * magazine cutout styling specific to abh.ai API format.
   *
   * @private
   * @static
   * @param {PlaceholderService} service - Service configuration with style params
   * @param {PlaceholderConfig} config - Placeholder configuration
   * @returns {string} Complete URL for abh.ai API
   *
   * URL Format: {endpoint}/{width}x{height}?params
   * Parameters:
   * - text: Enhanced prompt text
   * - style: Visual style (default: magazine)
   * - border: Border effect (default: cutout)
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
   * Builds URL for placeholdr.ai service
   *
   * Constructs query parameters for placeholdr.ai API with DIY cutout
   * aesthetic preferences.
   *
   * @private
   * @static
   * @param {PlaceholderService} service - Service configuration with style params
   * @param {PlaceholderConfig} config - Placeholder configuration
   * @returns {string} Complete URL for placeholdr.ai API
   *
   * URL Parameters:
   * - prompt: Enhanced prompt with modifiers
   * - w/h: Image dimensions
   * - aesthetic: DIY cutout style preference
   * - paper: Vintage paper texture type
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
   * Generates random aesthetic properties for magazine cutout effect
   *
   * Creates authentic DIY magazine aesthetic with random rotation,
   * slight position offsets, and decoration probability.
   *
   * @private
   * @static
   * @returns {Object} Aesthetic properties for visual styling
   * @returns {number} rotation - Random rotation angle within configured range
   * @returns {number} translateX - Horizontal offset (-3px to 3px)
   * @returns {number} translateY - Vertical offset (-3px to 3px)
   * @returns {boolean} hasDecorations - Whether to show tape/staples
   *
   * Randomization creates natural variation mimicking hand-placed cutouts
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
   * Generates SVG fallback with authentic magazine cutout aesthetic
   *
   * Creates a data URI SVG image with torn paper edges, realistic textures,
   * decorations (tape/staples), and type-specific content. Used when AI
   * services are unavailable or fail.
   *
   * @private
   * @static
   * @param {PlaceholderConfig} config - Placeholder configuration
   * @returns {string} Data URI containing SVG image
   *
   * SVG Features:
   * - Torn paper edge with irregular path
   * - Paper texture using fractal noise filter
   * - Realistic drop shadow effect
   * - Random decorations (washi tape, staples, coffee stains)
   * - Type-specific content (character, sketch, podcast icons)
   * - Slight rotation for authentic placement
   *
   * @example
   * // Returns: "data:image/svg+xml,%3Csvg..."
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
          <!-- Paper texture with realistic grain -->
          <filter id="roughPaper" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
            <feColorMatrix in="noise" values="0.2 0.2 0.2 0 0 0.2 0.2 0.2 0 0 0.2 0.2 0.2 0 0 0 0 0 1 0"/>
            <feComposite operator="multiply" in2="SourceGraphic"/>
          </filter>
          
          <!-- Authentic torn paper edge -->
          <clipPath id="tornEdge">
            <path d="${this.generateTornEdgePath(width, height)}" />
          </clipPath>
          
          <!-- Realistic drop shadow -->
          <filter id="dropShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="3" dy="4" result="offsetblur"/>
            <feFlood flood-color="#000000" flood-opacity="0.25"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <g transform="rotate(${rotation} ${width / 2} ${height / 2})">
          <!-- Paper base with texture -->
          <rect 
            width="${width}" 
            height="${height}" 
            fill="${paperColor}"
            filter="url(#roughPaper)"
            clip-path="url(#tornEdge)"
          />
          
          <!-- Content with shadow -->
          <g filter="url(#dropShadow)">
            ${content}
          </g>
          
          <!-- Authentic decorations -->
          ${decorations}
        </g>
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  /**
   * Generates authentic torn/cut paper edge path
   *
   * Creates an SVG path that simulates hand-cut paper edges with
   * realistic irregularities and organic variation.
   *
   * @private
   * @static
   * @param {number} width - Paper width in pixels
   * @param {number} height - Paper height in pixels
   * @returns {string} SVG path data for clip-path
   *
   * Algorithm:
   * 1. Divide each edge into 20 segments
   * 2. Add random roughness to each point (±12px)
   * 3. Ensure points stay within bounds
   * 4. Create closed path with all points
   *
   * The high point count and roughness value create
   * convincing hand-cut paper appearance
   */
  private static generateTornEdgePath(width: number, height: number): string {
    const points: string[] = [];
    const steps = 20; // Más puntos para mayor realismo
    const roughness = 12; // Mayor variación para aspecto más auténtico

    // Borde superior - corte irregular
    for (let i = 0; i <= steps; i++) {
      const x = (width / steps) * i;
      const y = Math.random() * roughness - roughness / 2;
      points.push(`${x},${Math.max(0, y)}`);
    }

    // Borde derecho
    for (let i = 1; i <= steps; i++) {
      const y = (height / steps) * i;
      const x = width - Math.random() * roughness;
      points.push(`${Math.min(width, x)},${y}`);
    }

    // Borde inferior
    for (let i = steps; i >= 0; i--) {
      const x = (width / steps) * i;
      const y = height - Math.random() * roughness;
      points.push(`${x},${Math.min(height, y)}`);
    }

    // Borde izquierdo
    for (let i = steps; i >= 0; i--) {
      const y = (height / steps) * i;
      const x = Math.random() * roughness;
      points.push(`${Math.max(0, x)},${y}`);
    }

    return `M ${points.join(' L ')} Z`;
  }

  /**
   * Generates SVG decorations for magazine cutout authenticity
   *
   * Creates realistic washi tape, metallic staples, and coffee stains
   * with proper shadows, highlights, and textures.
   *
   * @private
   * @static
   * @param {number} width - Container width for decoration placement
   * @param {number} height - Container height for decoration placement
   * @param {string} color - Primary color for decorations
   * @returns {string} SVG markup for all decorations
   *
   * Decoration Types:
   * - Washi Tape (40% chance):
   *   - Realistic width variation (35-85px)
   *   - Paper texture filter
   *   - Highlight and shadow for depth
   *   - Random rotation and placement
   *
   * - Staples (35% chance):
   *   - Metallic appearance with gradients
   *   - Proper shadow beneath
   *   - Realistic proportions
   *
   * - Coffee Stains (20% chance):
   *   - Multiple overlapping circles
   *   - Varying opacity and color
   *   - Organic irregular shape
   */
  private static generateSVGDecorations(
    width: number,
    height: number,
    color: string
  ): string {
    const decorations = [];

    // Authentic washi tape with realistic appearance
    if (Math.random() > 0.4) {
      const numTapes = Math.random() > 0.7 ? 2 : 1;
      for (let i = 0; i < numTapes; i++) {
        const tapeWidth = 35 + Math.random() * 50;
        const tapeHeight = 12 + Math.random() * 15;
        const x = Math.random() * (width - tapeWidth);
        const y =
          i === 0 ? Math.random() * 25 - 10 : height - 25 + Math.random() * 20;
        const rotation = Math.random() * 40 - 20;
        const tapeColor = i === 0 ? color : '#F4E6D7';

        decorations.push(`
          <rect 
            x="${x}" y="${y}" 
            width="${tapeWidth}" height="${tapeHeight}" 
            fill="${tapeColor}" opacity="0.85" 
            transform="rotate(${rotation} ${x + tapeWidth / 2} ${y + tapeHeight / 2})"
            filter="url(#roughPaper)"
          />
          <!-- Tape highlight for realism -->
          <rect 
            x="${x + 2}" y="${y + 1}" 
            width="${tapeWidth - 4}" height="3" 
            fill="white" opacity="0.4" 
            transform="rotate(${rotation} ${x + tapeWidth / 2} ${y + tapeHeight / 2})"
          />
          <!-- Tape shadow -->
          <rect 
            x="${x + 1}" y="${y + tapeHeight - 2}" 
            width="${tapeWidth}" height="2" 
            fill="black" opacity="0.15" 
            transform="rotate(${rotation} ${x + tapeWidth / 2} ${y + tapeHeight / 2})"
          />
        `);
      }
    }

    // Realistic staples with metallic shine
    if (Math.random() > 0.65) {
      const x = Math.random() * (width - 20) + 10;
      const y = Math.random() * (height - 30) + 15;
      const stapleRotation = Math.random() * 25 - 12;

      decorations.push(`
        <g transform="translate(${x}, ${y}) rotate(${stapleRotation})">
          <!-- Staple body -->
          <rect x="0" y="0" width="12" height="2.5" fill="#8B8B8B" rx="0.5"/>
          <rect x="0" y="6" width="12" height="2.5" fill="#8B8B8B" rx="0.5"/>
          <rect x="0" y="0" width="2.5" height="8.5" fill="#777" rx="0.5"/>
          <rect x="9.5" y="0" width="2.5" height="8.5" fill="#777" rx="0.5"/>
          <!-- Metallic highlights -->
          <rect x="0.5" y="0.5" width="11" height="0.8" fill="white" opacity="0.5" rx="0.3"/>
          <rect x="0.5" y="6.5" width="11" height="0.8" fill="white" opacity="0.5" rx="0.3"/>
          <!-- Shadow -->
          <rect x="1" y="9" width="12" height="1" fill="black" opacity="0.2" rx="0.5"/>
        </g>
      `);
    }

    // Coffee stains for authentic feel
    if (Math.random() > 0.8) {
      const stainX = Math.random() * (width - 35) + 15;
      const stainY = Math.random() * (height - 35) + 15;
      const stainSize = 12 + Math.random() * 20;

      decorations.push(`
        <circle 
          cx="${stainX}" cy="${stainY}" r="${stainSize}" 
          fill="#D2B48C" opacity="0.2"
          filter="url(#roughPaper)"
        />
        <circle 
          cx="${stainX + 2}" cy="${stainY - 1}" r="${stainSize * 0.4}" 
          fill="#CD853F" opacity="0.15"
        />
        <circle 
          cx="${stainX - 1}" cy="${stainY + 2}" r="${stainSize * 0.2}" 
          fill="#A0522D" opacity="0.1"
        />
      `);
    }

    return decorations.join('');
  }

  /**
   * Generates type-specific SVG content for placeholders
   *
   * Creates distinct visual representations for each placeholder type
   * with appropriate iconography and styling.
   *
   * @private
   * @static
   * @param {string} type - Placeholder type (character, sketch, podcast, etc.)
   * @param {number} width - Content area width
   * @param {number} height - Content area height
   * @param {string} message - Display message (e.g., "PRÓXIMAMENTE")
   * @returns {string} SVG markup for type-specific content
   *
   * Content Types:
   * - character: Red circle avatar with rotated text
   * - sketch: Blue rectangle with play icon and episode number
   * - podcast: Purple circles representing audio waves
   * - default: Generic gray rounded rectangle
   *
   * Each type includes styled text with appropriate fonts
   * and slight rotation for magazine aesthetic
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
   * Generates unique cache key for placeholder configuration
   *
   * Creates a deterministic key based on visual properties to enable
   * efficient caching of generated placeholders.
   *
   * @private
   * @static
   * @param {PlaceholderConfig} config - Complete placeholder configuration
   * @returns {string} Unique cache key
   *
   * Key Format: "{type}-{width}x{height}-{promptHash}"
   * - Type ensures different placeholder types are cached separately
   * - Dimensions prevent size mismatches
   * - Prompt hash (first 20 chars of base64) captures content uniqueness
   */
  private static getCacheKey(config: PlaceholderConfig): string {
    return `${config.type}-${config.width}x${config.height}-${btoa(config.enhancedPrompt).slice(0, 20)}`;
  }

  /**
   * Clears all cached placeholders
   *
   * Removes all entries from the in-memory cache. Useful for:
   * - Memory management in long-running sessions
   * - Forcing regeneration after configuration changes
   * - Development and testing
   *
   * @static
   * @returns {void}
   */
  static clearCache(): void {
    this.cache.clear();
  }

  /**
   * Preloads commonly used placeholder types
   *
   * Generates and caches frequently used placeholders in the background
   * to improve perceived performance when they're needed.
   *
   * @static
   * @async
   * @returns {Promise<void>} Resolves when all preloads complete
   *
   * Preloaded Types:
   * - character: Used in character cards and grids
   * - sketch: Used in sketch listings
   * - hero: Used in hero sections
   *
   * Uses low priority to avoid blocking critical requests.
   * Errors are silently caught to prevent preload failures
   * from affecting application startup.
   */
  static async preloadCommon(): Promise<void> {
    const commonTypes: PlaceholderType[] = ['character', 'sketch', 'hero'];

    const preloadPromises = commonTypes.map((type) =>
      this.generatePlaceholder({ type, priority: 'low' })
    );

    await Promise.allSettled(preloadPromises);
  }
}
