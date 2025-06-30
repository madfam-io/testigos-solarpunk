/**
 * Constantes globales del proyecto Testigos de Solarpunk
 */

// Información del sitio
export const SITE_TITLE = 'Testigos de Solarpunk';
export const SITE_DESCRIPTION =
  'Universo narrativo evangelista ecológico que combina humor, sostenibilidad y esperanza';
export const SITE_URL = 'https://madfam-io.github.io/testigos-solarpunk';
export const SITE_AUTHOR = 'MADFAM';
export const SITE_LANG = 'es-MX';

// Redes sociales
export const SOCIAL_LINKS = {
  tiktok: '@testigosdesolarpunk',
  youtube: '@TestigosSolarpunk',
  instagram: '@testigos.solarpunk',
  twitter: '@TestigosSolar',
  github: 'https://github.com/madfam-io/testigos-solarpunk',
} as const;

// Plataformas de contenido
export const PLATFORMS = {
  TT: {
    name: 'TikTok',
    icon: '📱',
    maxDuration: 180, // segundos
    aspectRatio: '9:16',
    hashtags: ['#TestigosDeSolarpunk', '#MilagroVerde', '#AleluyaSolar'],
  },
  YT: {
    name: 'YouTube',
    icon: '📺',
    maxDuration: 900, // 15 minutos
    aspectRatio: '16:9',
    hashtags: ['#Solarpunk', '#EvangelioEcologico', '#MADFAM'],
  },
  IG: {
    name: 'Instagram',
    icon: '📷',
    maxDuration: 90, // Reels
    aspectRatio: '9:16',
    hashtags: ['#EcoEvangelista', '#SolarPunkLife', '#VerdeMilagroso'],
  },
  FB: {
    name: 'Facebook',
    icon: '👥',
    maxDuration: 240, // 4 minutos
    aspectRatio: '16:9',
    hashtags: ['#TestigosDeSolarpunk', '#ComunidadVerde'],
  },
} as const;

// Roles de personajes
export const CHARACTER_ROLES = {
  PROTAGONISTA: {
    label: 'Protagonista',
    color: 'var(--madfam-yellow)',
    icon: '⭐',
  },
  ANTAGONISTA: {
    label: 'Antagonista',
    color: 'var(--madfam-purple)',
    icon: '⚡',
  },
  SECUNDARIO: {
    label: 'Secundario',
    color: 'var(--madfam-green)',
    icon: '🌱',
  },
  CAMEO: {
    label: 'Cameo',
    color: 'var(--madfam-blue)',
    icon: '✨',
  },
} as const;

// Frases evangelistas recurrentes
export const CATCHPHRASES = [
  '¡Aleluya Solar!',
  '¡Amén Verde!',
  '¡Gloria a la Madre Tierra!',
  '¡Bendito sea el compost!',
  '¡El sol brilla para todos!',
  '¡Hermanos verdes, testifiquen!',
  '¡Que la fotosíntesis esté con ustedes!',
  '¡Alabado sea el panel solar!',
] as const;

/**
 * Green miracle categorization
 *
 * Types of sustainable transformations portrayed in the content,
 * each representing a different aspect of environmental action.
 *
 * @constant {Object}
 *
 * Categories align with real sustainability pillars:
 * - ENERGIA: Renewable energy adoption
 * - AGRICULTURA: Urban farming and food systems
 * - RECICLAJE: Circular economy practices
 * - AGUA: Water conservation and management
 * - TRANSPORTE: Sustainable mobility solutions
 */
export const MIRACLE_TYPES = {
  ENERGIA: {
    name: 'Milagro Energético',
    icon: '⚡',
    description: 'Transformación relacionada con energía renovable',
  },
  AGRICULTURA: {
    name: 'Milagro Agrícola',
    icon: '🌱',
    description: 'Transformación de espacios en huertos',
  },
  RECICLAJE: {
    name: 'Milagro de Reciclaje',
    icon: '♻️',
    description: 'Conversión de basura en recursos',
  },
  AGUA: {
    name: 'Milagro Acuático',
    icon: '💧',
    description: 'Purificación o conservación de agua',
  },
  TRANSPORTE: {
    name: 'Milagro de Movilidad',
    icon: '🚲',
    description: 'Transformación a transporte sostenible',
  },
} as const;

/**
 * SEO configuration defaults
 *
 * Search engine optimization settings for consistent metadata across pages.
 * Follows Open Graph and Twitter Card specifications.
 *
 * @constant {Object}
 *
 * Templates:
 * - titleTemplate: Pattern for page titles (%s is replaced)
 * - defaultImage: Social sharing preview image
 * - twitterHandle: Twitter account for attribution
 */
export const SEO_DEFAULTS = {
  titleTemplate: '%s | Testigos de Solarpunk',
  defaultTitle: 'Testigos de Solarpunk - Universo Narrativo Eco-Evangelista',
  defaultDescription:
    'Descubre el universo de los Testigos de Solarpunk, donde la fe en un futuro sostenible se encuentra con el humor evangelista',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@TestigosSolar',
} as const;

/**
 * MADFAM brand color palette
 *
 * Core brand colors used throughout the design system.
 * These colors maintain consistency with MADFAM's visual identity.
 *
 * @constant {Object}
 *
 * Colors:
 * - yellow: Primary brand color (Amber 500)
 * - green: Success/sustainability (Green 500)
 * - purple: Creative/mystical (Rebecca Purple)
 * - blue: Information/water (Blue 500)
 * - black: Text/contrast (Grey 900)
 * - white: Background/light
 */
export const MADFAM_COLORS = {
  yellow: '#FFC107',
  green: '#4CAF50',
  purple: '#663399',
  blue: '#2196F3',
  black: '#212121',
  white: '#FFFFFF',
} as const;

/**
 * Extended Solarpunk color palette
 *
 * Additional thematic colors representing different aspects
 * of the Solarpunk aesthetic and environmental themes.
 *
 * @constant {Object}
 *
 * Thematic associations:
 * - bioGlow: Bioluminescence, future tech (Chartreuse)
 * - skyHope: Clear skies, optimism (Sky Blue)
 * - earth: Soil, grounding (Saddle Brown)
 * - water: Clean water, life (Dark Turquoise)
 * - community: Human connection (Portland Orange)
 * - solarGold: Solar energy, prosperity (Gold)
 * - leafGreen: Vegetation, growth (Forest Green)
 * - compostBrown: Organic matter, cycles (Saddle Brown)
 */
export const SOLARPUNK_COLORS = {
  bioGlow: '#7FFF00',
  skyHope: '#87CEEB',
  earth: '#8B4513',
  water: '#00CED1',
  community: '#FF6B35',
  solarGold: '#FFD700',
  leafGreen: '#228B22',
  compostBrown: '#8B4513',
} as const;

/**
 * Animation timing configuration
 *
 * Standardized durations for consistent animation feel across the UI.
 * Values in milliseconds for CSS transitions and JavaScript animations.
 *
 * @constant {Object}
 *
 * Durations:
 * - fast: Quick feedback (hover states)
 * - base: Standard transitions
 * - slow: Deliberate animations
 * - verySlow: Major state changes
 */
export const ANIMATION_DURATION = {
  fast: 150,
  base: 250,
  slow: 350,
  verySlow: 500,
} as const;

/**
 * Responsive design breakpoints
 *
 * Screen size thresholds for responsive layouts.
 * Based on common device dimensions and content requirements.
 *
 * @constant {Object}
 *
 * Breakpoints (pixels):
 * - mobile: Minimum supported width
 * - tablet: iPad portrait and similar
 * - desktop: Laptop screens
 * - wide: Desktop monitors
 * - ultrawide: Large displays and TV
 */
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  ultrawide: 1920,
} as const;

/**
 * Content length limits
 *
 * Maximum character counts for different content types.
 * Optimized for readability and SEO requirements.
 *
 * @constant {Object}
 *
 * Limits:
 * - titleMax: SEO-friendly title length
 * - descriptionMax: Card and preview descriptions
 * - excerptMax: Meta description length
 * - bioMax: Character biography length
 * - sermonMax: Long-form sermon content
 */
export const CONTENT_LIMITS = {
  titleMax: 100,
  descriptionMax: 300,
  excerptMax: 160,
  bioMax: 500,
  sermonMax: 1000,
} as const;

/**
 * Image optimization configuration
 *
 * Settings for responsive images, format selection, and quality levels.
 * Supports modern formats with fallbacks.
 *
 * @constant {Object}
 *
 * Features:
 * - formats: Modern image formats in priority order
 * - sizes: Responsive image widths for srcset
 * - quality: Compression levels by use case
 * - placeholder: Magazine cutout style settings
 */
export const IMAGE_CONFIG = {
  formats: ['webp', 'avif'],
  sizes: [320, 640, 768, 1024, 1280, 1920],
  quality: {
    thumbnail: 70,
    default: 85,
    high: 95,
  },
  placeholder: {
    type: 'magazine-cutout',
    ai: true,
    size: 20,
    fallback: 'svg',
  },
} as const;

/**
 * Magazine cutout placeholder configuration
 *
 * Settings for AI-generated placeholder images with DIY magazine aesthetic.
 * Manages service fallbacks and visual styling.
 *
 * @constant {Object}
 *
 * Configuration:
 * - aiServices: Priority-ordered AI services
 * - performance: Timeout and concurrency limits
 * - aesthetic: Visual style parameters
 *   - rotation: Random angle range in degrees
 *   - decorationChance: Probability of tape/staples
 *   - vintageFilter: Apply aged paper effect
 *   - paperTexture: Add paper grain texture
 */
export const MAGAZINE_PLACEHOLDER_CONFIG = {
  enabled: true,
  aiServices: ['placeholders.io', 'abh.ai', 'placeholdr.ai'],
  fallbackToSVG: true,
  cacheEnabled: true,
  preloadCommon: true,
  performance: {
    timeout: 5000,
    retries: 2,
    maxConcurrent: 3,
  },
  aesthetic: {
    rotation: [-5, 5],
    decorationChance: 0.6,
    vintageFilter: true,
    paperTexture: true,
  },
} as const;

/**
 * Predefined content tags
 *
 * Taxonomies for categorizing and filtering content.
 * Used for navigation, search, and content recommendations.
 *
 * @constant {Object}
 *
 * Categories:
 * - episodios: Episode content types
 * - personajes: Character archetypes
 * - temas: Environmental themes
 *
 * Tags enable content discovery and cross-referencing
 */
export const CONTENT_TAGS = {
  episodios: [
    'tutorial',
    'testimonio',
    'milagro',
    'conversión',
    'predicación',
    'celebración',
  ],
  personajes: [
    'evangelista',
    'converso',
    'escéptico',
    'mentor',
    'comunidad',
    'innovador',
  ],
  temas: [
    'energía-solar',
    'agricultura-urbana',
    'reciclaje',
    'movilidad',
    'agua',
    'comunidad',
  ],
} as const;

/**
 * User-facing messages
 *
 * Thematically consistent messages for different UI states.
 * Maintains evangelical tone while providing clear feedback.
 *
 * @constant {Object}
 *
 * Message types:
 * - error: Failure states with humor
 * - success: Positive feedback with celebration
 * - loading: Progress indicators with theme
 *
 * All messages use evangelical language for brand consistency
 */
export const MESSAGES = {
  error: {
    notFound: '¡Hermano, esta página se ha extraviado en el camino verde!',
    loadFailed: '¡Oh no! El milagro de carga ha fallado. Intenta de nuevo.',
    formInvalid: 'Por favor, revisa los campos marcados con el espíritu rojo.',
  },
  success: {
    subscribed: '¡Aleluya! Te has unido a la congregación verde.',
    shared: '¡Amén! Has compartido la buena nueva solar.',
    saved: '¡Gloria! Tus cambios han sido bendecidos y guardados.',
  },
  loading: {
    default: 'Cargando milagros verdes...',
    characters: 'Convocando a los testigos...',
    scripts: 'Desenrollando los pergaminos sagrados...',
  },
} as const;

/**
 * API configuration (future use)
 *
 * Prepared configuration for backend API integration.
 * Currently unused but ready for future content management system.
 *
 * @constant {Object}
 *
 * Settings:
 * - baseURL: API endpoint (environment variable or default)
 * - timeout: Request timeout in milliseconds
 * - retries: Automatic retry count for failed requests
 * - headers: Default headers for API requests
 */
export const API_CONFIG = {
  baseURL:
    process.env.API_URL != null && process.env.API_URL !== ''
      ? process.env.API_URL
      : '/api',
  timeout: 10000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
    'X-Source': 'testigos-solarpunk-web',
  },
} as const;

/**
 * TypeScript type exports
 *
 * Derived types from constants for type-safe usage throughout the application.
 * These types ensure consistency when referencing constant values.
 */
export type Platform = keyof typeof PLATFORMS;
export type CharacterRole = keyof typeof CHARACTER_ROLES;
export type MiracleType = keyof typeof MIRACLE_TYPES;
export type ContentTag =
  (typeof CONTENT_TAGS)[keyof typeof CONTENT_TAGS][number];
