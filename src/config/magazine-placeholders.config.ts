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
        border: 'torn'
      },
      enabled: true
    },
    {
      name: 'abh.ai',
      endpoint: 'https://abh.ai/place',
      features: ['contextual', 'fast', 'magazine-styles'],
      styleParams: {
        style: 'magazine',
        border: 'cutout',
        texture: 'paper'
      },
      enabled: true
    },
    {
      name: 'placeholdr.ai',
      endpoint: 'https://placeholdr.ai/generate',
      features: ['custom-styles', 'high-quality', 'artistic'],
      styleParams: {
        aesthetic: 'diy-cutout',
        paper: 'vintage',
        style: 'collage'
      },
      enabled: true
    }
  ] as PlaceholderService[],

  // Configuración estética del magazine cutout
  aesthetics: {
    rotationRange: [-5, 5] as [number, number],
    shadowIntensity: 0.2,
    paperTexture: true,
    tapeChance: 0.6,
    stapleChance: 0.3,
    coffeeStainChance: 0.1,
    tornEdgeVariations: [
      'scissors', 'rough-tear', 'careful-cut', 'aged-edge'
    ]
  } as MagazineAesthetics,

  // Templates de prompts por tipo de contenido
  prompts: {
    character: 'vintage magazine portrait, editorial illustration, retro photography, person {name}',
    sketch: 'storyboard panel, comic strip, DIY zine aesthetic, sketch illustration, {theme}',
    podcast: 'record album cover, vintage music magazine, retro radio show poster',
    hero: 'magazine collage spread, editorial design, vintage travel poster',
    background: 'abstract paper collage, mixed media texture, vintage magazine clippings',
    madlab: 'science magazine illustration, educational poster, laboratory equipment',
    community: 'community newsletter, group photo, social gathering vintage style',
    impact: 'infographic magazine page, data visualization retro style',
    production: 'behind scenes magazine, production notes, DIY manual'
  } as PlaceholderPrompts,

  // Modificadores de estilo para añadir autenticidad
  styleModifiers: {
    magazine: 'magazine cutout, paper texture, vintage editorial',
    diy: 'DIY aesthetic, handmade, imperfect edges, scissors cut',
    vintage: 'retro color palette, aged paper, 70s magazine style',
    collage: 'collage composition, layered paper, mixed media',
    solarpunk: 'eco-futuristic, green technology, sustainable design'
  },

  // Configuración de rendimiento
  performance: {
    timeout: 5000, // 5 segundos timeout
    retries: 2,
    cacheDuration: 24 * 60 * 60 * 1000, // 24 horas
    preloadSize: 10, // Número de placeholders para precargar
    maxConcurrent: 3 // Máximo número de requests simultáneos
  },

  // Configuración de fallback SVG
  svgFallback: {
    enabled: true,
    paperColors: ['#F4E5D3', '#E8D5B7', '#D4C5A0', '#F5F5DC'],
    decorationColors: ['#F5DEB3', '#DDD5B8', '#C4B896'],
    fonts: ['Georgia', 'serif', 'Times New Roman'],
    defaultMessages: {
      character: 'PERSONA',
      sketch: 'SKETCH',
      podcast: 'PODCAST',
      hero: 'TESTIGOS',
      background: 'PRÓXIMAMENTE'
    }
  }
} as const;

// Tipos para TypeScript
export type PlaceholderType = keyof typeof magazinePlaceholderConfig.prompts;
export type StyleModifier = keyof typeof magazinePlaceholderConfig.styleModifiers;

// Configuración por defecto para cada tipo
export const defaultConfigs: Record<PlaceholderType, {
  width: number;
  height: number;
  quality: number;
  modifiers: StyleModifier[];
}> = {
  character: {
    width: 400,
    height: 300,
    quality: 85,
    modifiers: ['magazine', 'vintage']
  },
  sketch: {
    width: 640,
    height: 360,
    quality: 80,
    modifiers: ['diy', 'collage']
  },
  podcast: {
    width: 500,
    height: 500,
    quality: 90,
    modifiers: ['vintage', 'magazine']
  },
  hero: {
    width: 1200,
    height: 600,
    quality: 95,
    modifiers: ['magazine', 'collage', 'solarpunk']
  },
  background: {
    width: 800,
    height: 400,
    quality: 75,
    modifiers: ['collage', 'vintage']
  },
  madlab: {
    width: 600,
    height: 400,
    quality: 85,
    modifiers: ['magazine', 'solarpunk']
  },
  community: {
    width: 500,
    height: 400,
    quality: 85,
    modifiers: ['vintage', 'magazine']
  },
  impact: {
    width: 700,
    height: 500,
    quality: 90,
    modifiers: ['magazine', 'solarpunk']
  },
  production: {
    width: 600,
    height: 450,
    quality: 85,
    modifiers: ['diy', 'magazine']
  }
};