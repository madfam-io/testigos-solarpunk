/**
 * Constantes globales del proyecto Testigos de Solarpunk
 */

// Información del sitio
export const SITE_TITLE = 'Testigos de Solarpunk';
export const SITE_DESCRIPTION = 'Universo narrativo evangelista ecológico que combina humor, sostenibilidad y esperanza';
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

// Tipos de milagros verdes
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

// Configuración de SEO
export const SEO_DEFAULTS = {
  titleTemplate: '%s | Testigos de Solarpunk',
  defaultTitle: 'Testigos de Solarpunk - Universo Narrativo Eco-Evangelista',
  defaultDescription: 'Descubre el universo de los Testigos de Solarpunk, donde la fe en un futuro sostenible se encuentra con el humor evangelista',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@TestigosSolar',
} as const;

// Colores del tema MADFAM
export const MADFAM_COLORS = {
  yellow: '#FFC107',
  green: '#4CAF50',
  purple: '#663399',
  blue: '#2196F3',
  black: '#212121',
  white: '#FFFFFF',
} as const;

// Colores extendidos Solarpunk
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

// Configuración de animaciones
export const ANIMATION_DURATION = {
  fast: 150,
  base: 250,
  slow: 350,
  verySlow: 500,
} as const;

// Breakpoints para responsive design
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  ultrawide: 1920,
} as const;

// Límites de contenido
export const CONTENT_LIMITS = {
  titleMax: 100,
  descriptionMax: 300,
  excerptMax: 160,
  bioMax: 500,
  sermonMax: 1000,
} as const;

// Configuración de imágenes
export const IMAGE_CONFIG = {
  formats: ['webp', 'avif'],
  sizes: [320, 640, 768, 1024, 1280, 1920],
  quality: {
    thumbnail: 70,
    default: 85,
    high: 95,
  },
  placeholder: {
    type: 'blur',
    size: 20,
  },
} as const;

// Tags predefinidos para contenido
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

// Mensajes de error y éxito
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

// Configuración de API (si se necesita en el futuro)
export const API_CONFIG = {
  baseURL: process.env.API_URL || '/api',
  timeout: 10000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
    'X-Source': 'testigos-solarpunk-web',
  },
} as const;

// Exportar tipos para TypeScript
export type Platform = keyof typeof PLATFORMS;
export type CharacterRole = keyof typeof CHARACTER_ROLES;
export type MiracleType = keyof typeof MIRACLE_TYPES;
export type ContentTag = typeof CONTENT_TAGS[keyof typeof CONTENT_TAGS][number];