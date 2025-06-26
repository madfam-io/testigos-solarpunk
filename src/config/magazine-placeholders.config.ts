/**
 * Configuración para el sistema de placeholders con estética Magazine Cutout
 * Testigos de Solarpunk - MADFAM
 */

export interface PlaceholderService {
  name: string;
  endpoint: string;
  features: string[];
  styleParams: Record<string, string>;
  enabled: boolean;
}

export interface MagazineAesthetics {
  rotationRange: [number, number];
  shadowIntensity: number;
  paperTexture: boolean;
  tapeChance: number;
  stapleChance: number;
  coffeeStainChance: number;
  tornEdgeVariations: string[];
}

export interface PlaceholderPrompts {
  [key: string]: string;
}

export const magazinePlaceholderConfig = {
  // Servicios de AI en orden de preferencia
  services: [
    {
      name: 'placeholders.io',
      endpoint: 'https://placeholders.io/api/v1/image',
      features: ['ai-generated', 'style-params', 'free-tier'],
      styleParams: {
        style: 'collage',
        texture: 'paper',
        effect: 'vintage',
        border: 'torn',
      },
      enabled: true,
    },
    {
      name: 'abh.ai',
      endpoint: 'https://abh.ai/place',
      features: ['contextual', 'fast', 'magazine-styles'],
      styleParams: {
        style: 'magazine',
        border: 'cutout',
        texture: 'paper',
      },
      enabled: true,
    },
    {
      name: 'placeholdr.ai',
      endpoint: 'https://placeholdr.ai/generate',
      features: ['custom-styles', 'high-quality', 'artistic'],
      styleParams: {
        aesthetic: 'diy-cutout',
        paper: 'vintage',
        style: 'collage',
      },
      enabled: true,
    },
  ] as PlaceholderService[],

  // Configuración estética del magazine cutout
  aesthetics: {
    rotationRange: [-5, 5] as [number, number],
    shadowIntensity: 0.2,
    paperTexture: true,
    tapeChance: 0.6,
    stapleChance: 0.3,
    coffeeStainChance: 0.1,
    tornEdgeVariations: ['scissors', 'rough-tear', 'careful-cut', 'aged-edge'],
  } as MagazineAesthetics,

  // Templates de prompts por tipo de contenido
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

  // Modificadores de estilo para añadir autenticidad
  styleModifiers: {
    magazine: 'magazine cutout, vintage',
    diy: 'DIY handmade',
    vintage: 'retro aged paper',
    collage: 'collage layered',
    solarpunk: 'eco-futuristic',
  },

  // Configuración de rendimiento
  performance: {
    timeout: 5000, // 5 segundos timeout
    retries: 2,
    cacheDuration: 24 * 60 * 60 * 1000, // 24 horas
    preloadSize: 10, // Número de placeholders para precargar
    maxConcurrent: 3, // Máximo número de requests simultáneos
  },

  // Configuración de fallback SVG
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

// Tipos para TypeScript
export type PlaceholderType = keyof typeof magazinePlaceholderConfig.prompts;
export type StyleModifier =
  keyof typeof magazinePlaceholderConfig.styleModifiers;

// Configuración por defecto para cada tipo
export const defaultConfigs: Record<
  PlaceholderType,
  {
    width: number;
    height: number;
    quality: number;
    modifiers: StyleModifier[];
  }
> = {
  character: {
    width: 400,
    height: 300,
    quality: 85,
    modifiers: ['magazine', 'vintage'],
  },
  sketch: {
    width: 640,
    height: 360,
    quality: 80,
    modifiers: ['diy', 'collage'],
  },
  podcast: {
    width: 500,
    height: 500,
    quality: 90,
    modifiers: ['vintage', 'magazine'],
  },
  hero: {
    width: 1200,
    height: 600,
    quality: 95,
    modifiers: ['magazine', 'collage', 'solarpunk'],
  },
  background: {
    width: 800,
    height: 400,
    quality: 75,
    modifiers: ['collage', 'vintage'],
  },
  madlab: {
    width: 600,
    height: 400,
    quality: 85,
    modifiers: ['magazine', 'solarpunk'],
  },
  community: {
    width: 500,
    height: 400,
    quality: 85,
    modifiers: ['vintage', 'magazine'],
  },
  impact: {
    width: 700,
    height: 500,
    quality: 90,
    modifiers: ['magazine', 'solarpunk'],
  },
  production: {
    width: 600,
    height: 450,
    quality: 85,
    modifiers: ['diy', 'magazine'],
  },
};
