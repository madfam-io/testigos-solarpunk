/**
 * @fileoverview Magazine Cutout Placeholder Configuration
 *
 * Central configuration for the AI-powered placeholder generation system.
 * Defines services, aesthetic parameters, prompts, and fallback settings
 * for creating authentic DIY magazine cutout style placeholder images.
 *
 * @module config/magazine-placeholders
 */

/**
 * AI placeholder service configuration
 *
 * @interface PlaceholderService
 * @property {string} name - Service identifier
 * @property {string} endpoint - API endpoint URL
 * @property {string[]} features - Supported features list
 * @property {Record<string, string>} styleParams - Service-specific style parameters
 * @property {boolean} enabled - Whether service is active
 */
export interface PlaceholderService {
  name: string;
  endpoint: string;
  features: string[];
  styleParams: Record<string, string>;
  enabled: boolean;
}

/**
 * Magazine cutout visual aesthetics configuration
 *
 * @interface MagazineAesthetics
 * @property {[number, number]} rotationRange - Min/max rotation angles in degrees
 * @property {number} shadowIntensity - Drop shadow opacity (0-1)
 * @property {boolean} paperTexture - Enable paper grain texture
 * @property {number} tapeChance - Probability of washi tape decoration (0-1)
 * @property {number} stapleChance - Probability of staple decoration (0-1)
 * @property {number} coffeeStainChance - Probability of coffee stains (0-1)
 * @property {string[]} tornEdgeVariations - Types of edge cutting styles
 */
export interface MagazineAesthetics {
  rotationRange: [number, number];
  shadowIntensity: number;
  paperTexture: boolean;
  tapeChance: number;
  stapleChance: number;
  coffeeStainChance: number;
  tornEdgeVariations: string[];
}

/**
 * Content type to AI prompt mapping
 *
 * @interface PlaceholderPrompts
 * Base prompts for each placeholder type, enhanced with style modifiers
 */
export interface PlaceholderPrompts {
  [key: string]: string;
}

/**
 * Main magazine placeholder configuration object
 *
 * Central configuration containing all settings for the placeholder system.
 * Services array is empty as they are dynamically configured per deployment.
 */
export const magazinePlaceholderConfig = {
  /**
   * AI services array (populated at runtime)
   * Services are tried in order until one succeeds
   */
  services: [] as PlaceholderService[],

  /**
   * Visual style configuration for magazine cutout effect
   * Creates authentic DIY aesthetic with realistic imperfections
   */
  aesthetics: {
    rotationRange: [-5, 5] as [number, number],
    shadowIntensity: 0.2,
    paperTexture: true,
    tapeChance: 0.6,
    stapleChance: 0.3,
    coffeeStainChance: 0.1,
    tornEdgeVariations: ['scissors', 'rough-tear', 'careful-cut', 'aged-edge'],
  } as MagazineAesthetics,

  /**
   * Base prompts for AI generation by content type
   * Enhanced with style modifiers for final prompt
   */
  prompts: {
    character: 'vintage portrait, person',
    sketch: 'comic panel, sketch',
    podcast: 'retro radio poster',
    hero: 'magazine spread',
    background: 'paper collage',
    madlab: 'science poster',
    community: 'group photo',
    impact: 'data visualization',
    production: 'production notes',
  } as PlaceholderPrompts,

  /**
   * Style modifiers to enhance base prompts
   * Combined with prompts to create authentic magazine aesthetic
   */
  styleModifiers: {
    magazine: 'magazine cutout, vintage',
    diy: 'DIY handmade',
    vintage: 'retro aged paper',
    collage: 'collage layered',
    solarpunk: 'eco-futuristic',
  },

  /**
   * Performance and optimization settings
   * Balances quality with response time and resource usage
   */
  performance: {
    timeout: 5000, // Maximum wait time per service (5 seconds)
    retries: 2, // Retry attempts per service
    cacheDuration: 24 * 60 * 60 * 1000, // Cache TTL (24 hours)
    preloadSize: 10, // Number of common placeholders to preload
    maxConcurrent: 3, // Maximum parallel AI requests
  },

  /**
   * SVG fallback configuration when AI services fail
   * Generates deterministic SVG placeholders with magazine aesthetic
   */
  svgFallback: {
    enabled: true,
    paperColors: [
      '#FFFEF7',
      '#F8F5E4',
      '#F5F5DC',
      '#FDF6E3',
      '#FAF0E6',
      '#F0F8F0',
      '#FFF8F0',
      '#F5F0FF',
      '#F8F8F0',
      '#FFF5EE',
    ],
    decorationColors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
    fonts: ['Georgia', 'serif', 'Times New Roman', 'Courier New'],
    defaultMessages: {
      character: 'PERSONAJE',
      sketch: 'SKETCH',
      podcast: 'PODCAST',
      hero: 'UNIVERSO SOLARPUNK',
      background: 'TESTIGOS',
      madlab: 'MADLAB',
      community: 'COMUNIDAD',
      impact: 'IMPACTO',
      production: 'EN PRODUCCIÓN',
    },
  },
} as const;

/**
 * TypeScript type definitions derived from configuration
 */
export type PlaceholderType = keyof typeof magazinePlaceholderConfig.prompts;
export type StyleModifier =
  keyof typeof magazinePlaceholderConfig.styleModifiers;

/**
 * Default configurations for each placeholder type
 *
 * Defines dimensions, quality, and style modifiers optimized
 * for each content type's specific use case.
 *
 * @constant {Record<PlaceholderType, Object>}
 */
export const defaultConfigs: Record<
  PlaceholderType,
  {
    width: number;
    height: number;
    quality: number;
    modifiers: StyleModifier[];
  }
> = {
  /**
   * Character cards - Medium size for grid layouts
   */
  character: {
    width: 400,
    height: 300,
    quality: 85,
    modifiers: ['magazine', 'vintage'],
  },
  /**
   * Video sketches - 16:9 aspect ratio for thumbnails
   */
  sketch: {
    width: 640,
    height: 360,
    quality: 80,
    modifiers: ['diy', 'collage'],
  },
  /**
   * Podcast covers - Square format for audio platforms
   */
  podcast: {
    width: 500,
    height: 500,
    quality: 90,
    modifiers: ['vintage', 'magazine'],
  },
  /**
   * Hero sections - Large banner format
   */
  hero: {
    width: 1200,
    height: 600,
    quality: 95,
    modifiers: ['magazine', 'collage', 'solarpunk'],
  },
  /**
   * Background images - Medium quality for performance
   */
  background: {
    width: 800,
    height: 400,
    quality: 75,
    modifiers: ['collage', 'vintage'],
  },
  /**
   * MADLAB sections - Educational content format
   */
  madlab: {
    width: 600,
    height: 400,
    quality: 85,
    modifiers: ['magazine', 'solarpunk'],
  },
  /**
   * Community features - Social content dimensions
   */
  community: {
    width: 500,
    height: 400,
    quality: 85,
    modifiers: ['vintage', 'magazine'],
  },
  /**
   * Impact metrics - Data visualization format
   */
  impact: {
    width: 700,
    height: 500,
    quality: 90,
    modifiers: ['magazine', 'solarpunk'],
  },
  /**
   * Production content - Behind-the-scenes format
   */
  production: {
    width: 600,
    height: 450,
    quality: 85,
    modifiers: ['diy', 'magazine'],
  },
};
