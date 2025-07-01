/**
 * Internationalization configuration for Testigos de Solarpunk
 * Enterprise-grade bilingual support (Spanish-first, English secondary)
 *
 * @fileoverview Core i18n configuration with TypeScript support
 * @author MADFAM
 * @version 0.3.0+i18n
 */

export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'es';
export const showDefaultLang = true; // Always show /es/ in URLs for clarity

/**
 * Route mappings for bilingual navigation
 * Spanish routes are canonical, English routes are translated
 */
export const routes = {
  es: {
    // Main routes
    proyecto: 'proyecto',
    contenido: 'contenido',
    sketches: 'sketches',
    podcast: 'podcast',
    madlab: 'madlab',
    universo: 'universo',
    personajes: 'personajes',
    mundo: 'mundo',
    guiones: 'guiones',
    recursos: 'recursos',
    comunidad: 'comunidad',
    produccion: 'produccion',
    impacto: 'impacto',
    equipo: 'equipo',
    filosofia: 'filosofia',
    formatos: 'formatos',
    'guia-visual': 'guia-visual',
    // Nested routes
    actores: 'actores',
    creadores: 'creadores',
    patrocinadores: 'patrocinadores',
    dialogo: 'dialogo',
    movimiento: 'movimiento',
    plantillas: 'plantillas',
    worldbuilding: 'worldbuilding',
    valores: 'valores',
    integracion: 'integracion',
  },
  en: {
    // Main routes
    proyecto: 'project',
    contenido: 'content',
    sketches: 'sketches',
    podcast: 'podcast',
    madlab: 'madlab',
    universo: 'universe',
    personajes: 'characters',
    mundo: 'world',
    guiones: 'scripts',
    recursos: 'resources',
    comunidad: 'community',
    produccion: 'production',
    impacto: 'impact',
    equipo: 'team',
    filosofia: 'philosophy',
    formatos: 'formats',
    'guia-visual': 'visual-guide',
    // Nested routes
    actores: 'actors',
    creadores: 'creators',
    patrocinadores: 'sponsors',
    dialogo: 'dialogue',
    movimiento: 'movement',
    plantillas: 'templates',
    worldbuilding: 'worldbuilding',
    valores: 'values',
    integracion: 'integration',
  },
} as const;

/**
 * Translation strings for UI elements
 * Comprehensive bilingual content management
 */
export const ui = {
  es: {
    // Site metadata
    'site.title': 'Testigos de Solarpunk',
    'site.description':
      'Un universo narrativo evangelista ecológico que transforma la percepción sobre la sostenibilidad',
    'site.keywords':
      'solarpunk, sostenibilidad, comedia, sketches, podcast, educación, MADFAM',

    // Navigation
    'nav.home': 'Inicio',
    'nav.project': 'El Proyecto',
    'nav.content': 'Contenido',
    'nav.sketches': 'Sketches',
    'nav.podcast': 'Podcast',
    'nav.madlab': 'MADLAB',
    'nav.universe': 'Universo',
    'nav.characters': 'Personajes',
    'nav.world': 'Mundo',
    'nav.scripts': 'Guiones',
    'nav.resources': 'Recursos',
    'nav.community': 'Comunidad',
    'nav.production': 'Producción',
    'nav.impact': 'Impacto',
    'nav.team': 'Equipo',
    'nav.philosophy': 'Filosofía',

    // Hero Section
    'hero.title': 'Testigos de Solarpunk',
    'hero.subtitle': 'Conectar, Concientizar y Crear Comunidad',
    'hero.description':
      'Un universo narrativo evangelista ecológico que transforma la percepción sobre la sostenibilidad con sketches virales, podcasts educativos y experiencias de aprendizaje inmersivas.',
    'hero.cta.primary': 'Ver Sketches',
    'hero.cta.secondary': 'Conoce el Proyecto',

    // 3 Phase Strategy
    'phase1.title': 'Fase 1: Atracción',
    'phase1.description':
      'Sketches virales de 60-90 segundos que rompen barreras culturales con humor inteligente',
    'phase1.status': 'En Producción',

    'phase2.title': 'Fase 2: Conexión',
    'phase2.description':
      'Podcast MADFAM con expertos en sostenibilidad y conversaciones profundas',
    'phase2.status': 'Próximamente',

    'phase3.title': 'Fase 3: Conversión',
    'phase3.description':
      'MADLAB: Experiencias educativas inmersivas en escuelas y comunidades',
    'phase3.status': 'En Desarrollo',

    // Content Types
    'content.sketches.title': 'Sketches Virales',
    'content.sketches.description':
      'Comedia inteligente que desafía percepciones',
    'content.podcast.title': 'Podcast MADFAM',
    'content.podcast.description':
      'Conversaciones profundas sobre sostenibilidad',
    'content.madlab.title': 'Experiencias MADLAB',
    'content.madlab.description': 'Aprendizaje inmersivo en acción',

    // Metrics & Stats
    'metrics.views': 'vistas',
    'metrics.sketches': 'sketches',
    'metrics.episodes': 'episodios',
    'metrics.schools': 'escuelas',
    'metrics.perception': 'cambio positivo',
    'metrics.communities': 'comunidades',
    'metrics.engagement': 'engagement',
    'metrics.reach': 'alcance',

    // Call to Actions
    'cta.watch': 'Ver Sketches',
    'cta.listen': 'Escuchar Podcast',
    'cta.join': 'Únete a MADLAB',
    'cta.explore': 'Explorar',
    'cta.learn': 'Aprende Más',
    'cta.discover': 'Descubrir',
    'cta.participate': 'Participar',
    'cta.connect': 'Conectar',

    // Characters & Universe
    'characters.title': 'Nuestros Personajes',
    'characters.description':
      'Conoce a los protagonistas del universo Solarpunk',
    'world.title': 'El Mundo Solarpunk',
    'world.description': 'Un futuro sostenible y esperanzador',

    // Community & Impact
    'community.title': 'Nuestra Comunidad',
    'community.description': 'Conectando personas que creen en un futuro mejor',
    'impact.title': 'Nuestro Impacto',
    'impact.description': 'Midiendo el cambio positivo que generamos',

    // Evangelistas Section
    'evangelistas.title': 'El Evangelio Solar',
    'evangelistas.quote':
      'Hermanos, el Sol nos ama y quiere vernos iluminados. Cada panel es una oración al astro rey.',
    'evangelistas.author': 'Hermana Panelia',
    'evangelistas.card1.title': 'Los Evangelistas',
    'evangelistas.card1.description':
      'Tres misioneros dedicados a predicar la salvación ecológica y la redención energética de la humanidad.',
    'evangelistas.card1.cta': 'Conocer Evangelistas',
    'evangelistas.card2.title': 'El Mensaje',
    'evangelistas.card2.description':
      'Transformación espiritual a través de la tecnología sostenible y la reconexión con los ciclos naturales.',
    'evangelistas.card2.cta': 'Leer Filosofía',
    'evangelistas.card3.title': 'Los Formatos',
    'evangelistas.card3.description':
      'Múltiples maneras de llevar la luz solar a cada hogar: videos, podcasts, sketches y más.',
    'evangelistas.card3.cta': 'Ver Formatos',

    // Vision Section
    'vision.title': 'Nuestra Visión',
    'vision.energy.title': 'Energía Limpia',
    'vision.energy.description':
      'Un mundo impulsado por el sol, el viento y la creatividad humana',
    'vision.community.title': 'Comunidad Fuerte',
    'vision.community.description':
      'Las soluciones nacen de la colaboración y el apoyo mutuo',
    'vision.harmony.title': 'Armonía Natural',
    'vision.harmony.description':
      'La tecnología y la naturaleza coexisten en equilibrio',
    'vision.stories.title': 'Historias que Inspiran',
    'vision.stories.description':
      'Narrativas que muestran futuros posibles y deseables',

    // CTA Section
    'cta.question': '¿Listo para cambiar el mundo con humor?',
    'cta.subtitle':
      'Únete a los Testigos de Solarpunk y sé parte del movimiento',
    'cta.impact': 'Ver Nuestro Impacto',

    // Project Page
    'project.hero.title': 'Conectar, Concientizar y Crear Comunidad',
    'project.hero.tagline': 'Instruir desde el humor',
    'project.mission.title': 'Nuestra Misión',
    'project.mission.description':
      'Transformar la percepción sobre la sostenibilidad a través del humor, creando contenido que conecte, eduque y construya una comunidad comprometida con el futuro del planeta.',
    'project.vision.title': 'Visión Solarpunk',
    'project.vision.description':
      'Un mundo donde la tecnología y la naturaleza coexisten en armonía, donde cada persona es un agente de cambio positivo, y donde el futuro es brillante, sostenible y lleno de esperanza.',
    'project.strategy.title': 'Estrategia de 3 Fases',
    'project.strategy.intro':
      'Un viaje de transformación que comienza con una sonrisa y termina con acción real',

    // UI Controls
    'ui.menu': 'Menú',
    'ui.close': 'Cerrar',
    'ui.toggle': 'Alternar',
    'ui.search': 'Buscar',
    'ui.filter': 'Filtrar',
    'ui.sort': 'Ordenar',
    'ui.share': 'Compartir',
    'ui.like': 'Me gusta',
    'ui.comment': 'Comentar',
    'ui.subscribe': 'Suscribirse',

    // Accessibility
    'a11y.skip.content': 'Saltar al contenido',
    'a11y.theme.toggle': 'Cambiar tema',
    'a11y.lang.toggle': 'Cambiar idioma',
    'a11y.menu.open': 'Abrir menú',
    'a11y.menu.close': 'Cerrar menú',

    // Footer
    'footer.tagline': 'Conectar, Concientizar y Crear Comunidad',
    'footer.copyright': 'Un proyecto de MADFAM',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.contact': 'Contacto',

    // Status Messages
    'status.loading': 'Cargando...',
    'status.error': 'Error al cargar contenido',
    'status.success': '¡Operación exitosa!',
    'status.offline': 'Sin conexión a internet',

    // Form Elements
    'form.name': 'Nombre',
    'form.email': 'Correo electrónico',
    'form.message': 'Mensaje',
    'form.submit': 'Enviar',
    'form.required': 'Campo requerido',
    'form.invalid': 'Formato inválido',
  },
  en: {
    // Site metadata
    'site.title': 'Solarpunk Witnesses',
    'site.description':
      'An ecological evangelism narrative universe that transforms sustainability perception',
    'site.keywords':
      'solarpunk, sustainability, comedy, sketches, podcast, education, MADFAM',

    // Navigation
    'nav.home': 'Home',
    'nav.project': 'The Project',
    'nav.content': 'Content',
    'nav.sketches': 'Sketches',
    'nav.podcast': 'Podcast',
    'nav.madlab': 'MADLAB',
    'nav.universe': 'Universe',
    'nav.characters': 'Characters',
    'nav.world': 'World',
    'nav.scripts': 'Scripts',
    'nav.resources': 'Resources',
    'nav.community': 'Community',
    'nav.production': 'Production',
    'nav.impact': 'Impact',
    'nav.team': 'Team',
    'nav.philosophy': 'Philosophy',

    // Hero Section
    'hero.title': 'Solarpunk Witnesses',
    'hero.subtitle': 'Connect, Raise Awareness, Create Community',
    'hero.description':
      'An ecological evangelism narrative universe that transforms sustainability perception through viral sketches, educational podcasts, and immersive learning experiences.',
    'hero.cta.primary': 'Watch Sketches',
    'hero.cta.secondary': 'Learn About the Project',

    // 3 Phase Strategy
    'phase1.title': 'Phase 1: Attraction',
    'phase1.description':
      '60-90 second viral sketches breaking cultural barriers with intelligent humor',
    'phase1.status': 'In Production',

    'phase2.title': 'Phase 2: Connection',
    'phase2.description':
      'MADFAM Podcast with sustainability experts and deep conversations',
    'phase2.status': 'Coming Soon',

    'phase3.title': 'Phase 3: Conversion',
    'phase3.description':
      'MADLAB: Immersive educational experiences in schools and communities',
    'phase3.status': 'In Development',

    // Content Types
    'content.sketches.title': 'Viral Sketches',
    'content.sketches.description':
      'Intelligent comedy that challenges perceptions',
    'content.podcast.title': 'MADFAM Podcast',
    'content.podcast.description': 'Deep conversations about sustainability',
    'content.madlab.title': 'MADLAB Experiences',
    'content.madlab.description': 'Immersive learning in action',

    // Metrics & Stats
    'metrics.views': 'views',
    'metrics.sketches': 'sketches',
    'metrics.episodes': 'episodes',
    'metrics.schools': 'schools',
    'metrics.perception': 'positive change',
    'metrics.communities': 'communities',
    'metrics.engagement': 'engagement',
    'metrics.reach': 'reach',

    // Call to Actions
    'cta.watch': 'Watch Sketches',
    'cta.listen': 'Listen to Podcast',
    'cta.join': 'Join MADLAB',
    'cta.explore': 'Explore',
    'cta.learn': 'Learn More',
    'cta.discover': 'Discover',
    'cta.participate': 'Participate',
    'cta.connect': 'Connect',

    // Characters & Universe
    'characters.title': 'Our Characters',
    'characters.description': 'Meet the protagonists of the Solarpunk universe',
    'world.title': 'The Solarpunk World',
    'world.description': 'A sustainable and hopeful future',

    // Community & Impact
    'community.title': 'Our Community',
    'community.description': 'Connecting people who believe in a better future',
    'impact.title': 'Our Impact',
    'impact.description': 'Measuring the positive change we generate',

    // Evangelistas Section
    'evangelistas.title': 'The Solar Gospel',
    'evangelistas.quote':
      'Brothers, the Sun loves us and wants to see us illuminated. Each panel is a prayer to the star king.',
    'evangelistas.author': 'Sister Panelia',
    'evangelistas.card1.title': 'The Evangelists',
    'evangelistas.card1.description':
      "Three missionaries dedicated to preaching ecological salvation and humanity's energy redemption.",
    'evangelistas.card1.cta': 'Meet the Evangelists',
    'evangelistas.card2.title': 'The Message',
    'evangelistas.card2.description':
      'Spiritual transformation through sustainable technology and reconnection with natural cycles.',
    'evangelistas.card2.cta': 'Read Philosophy',
    'evangelistas.card3.title': 'The Formats',
    'evangelistas.card3.description':
      'Multiple ways to bring solar light to every home: videos, podcasts, sketches and more.',
    'evangelistas.card3.cta': 'View Formats',

    // Vision Section
    'vision.title': 'Our Vision',
    'vision.energy.title': 'Clean Energy',
    'vision.energy.description':
      'A world powered by the sun, wind and human creativity',
    'vision.community.title': 'Strong Community',
    'vision.community.description':
      'Solutions are born from collaboration and mutual support',
    'vision.harmony.title': 'Natural Harmony',
    'vision.harmony.description': 'Technology and nature coexist in balance',
    'vision.stories.title': 'Inspiring Stories',
    'vision.stories.description':
      'Narratives that show possible and desirable futures',

    // CTA Section
    'cta.question': 'Ready to change the world with humor?',
    'cta.subtitle': 'Join the Solarpunk Witnesses and be part of the movement',
    'cta.impact': 'See Our Impact',

    // Project Page
    'project.hero.title': 'Connect, Raise Awareness and Create Community',
    'project.hero.tagline': 'Teaching through humor',
    'project.mission.title': 'Our Mission',
    'project.mission.description':
      'Transform the perception of sustainability through humor, creating content that connects, educates and builds a community committed to the future of the planet.',
    'project.vision.title': 'Solarpunk Vision',
    'project.vision.description':
      'A world where technology and nature coexist in harmony, where each person is an agent of positive change, and where the future is bright, sustainable and full of hope.',
    'project.strategy.title': '3-Phase Strategy',
    'project.strategy.intro':
      'A transformation journey that begins with a smile and ends with real action',

    // UI Controls
    'ui.menu': 'Menu',
    'ui.close': 'Close',
    'ui.toggle': 'Toggle',
    'ui.search': 'Search',
    'ui.filter': 'Filter',
    'ui.sort': 'Sort',
    'ui.share': 'Share',
    'ui.like': 'Like',
    'ui.comment': 'Comment',
    'ui.subscribe': 'Subscribe',

    // Accessibility
    'a11y.skip.content': 'Skip to content',
    'a11y.theme.toggle': 'Toggle theme',
    'a11y.lang.toggle': 'Switch language',
    'a11y.menu.open': 'Open menu',
    'a11y.menu.close': 'Close menu',

    // Footer
    'footer.tagline': 'Connect, Raise Awareness, Create Community',
    'footer.copyright': 'A MADFAM project',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.contact': 'Contact',

    // Status Messages
    'status.loading': 'Loading...',
    'status.error': 'Error loading content',
    'status.success': 'Operation successful!',
    'status.offline': 'No internet connection',

    // Form Elements
    'form.name': 'Name',
    'form.email': 'Email',
    'form.message': 'Message',
    'form.submit': 'Submit',
    'form.required': 'Required field',
    'form.invalid': 'Invalid format',
  },
} as const;

/**
 * Helper function to extract language from URL
 */
export function getLangFromUrl(url: URL): keyof typeof languages {
  const pathSegments = url.pathname.split('/');
  const lang = pathSegments[1];
  if (lang !== undefined && lang !== '' && lang in languages) {
    return lang as keyof typeof languages;
  }
  return defaultLang;
}

/**
 * Helper function to detect language from path string
 */
export function detectLanguage(path: string): keyof typeof languages {
  const pathSegments = path.split('/');
  const lang = pathSegments[1];
  if (lang !== undefined && lang !== '' && lang in languages) {
    return lang as keyof typeof languages;
  }
  return defaultLang;
}

/**
 * Translation helper function with fallback support
 */
export function useTranslations(lang: keyof typeof languages) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    const translation = ui[lang]?.[key];
    if (translation !== undefined && translation.length > 0) {
      return translation;
    }
    const defaultTranslation = ui[defaultLang][key];
    return defaultTranslation !== undefined && defaultTranslation.length > 0
      ? defaultTranslation
      : key;
  };
}

/**
 * Get translated route for current language
 */
export function getLocalizedPath(
  path: string,
  lang: keyof typeof languages
): string {
  const segments = path.split('/').filter(Boolean);
  const translatedSegments = segments.map((segment) => {
    // First, check all languages to find which route key this segment belongs to
    let routeKey: string | undefined;

    // Search in all language routes to find the key
    for (const [, searchRoutes] of Object.entries(routes)) {
      const entry = Object.entries(searchRoutes).find(
        ([, value]) => value === segment
      );
      if (entry) {
        routeKey = entry[0];
        break;
      }
    }

    // If we found a route key and it exists in target language, use the translation
    if (routeKey !== undefined && routeKey in routes[lang]) {
      return routes[lang][routeKey as keyof (typeof routes)[typeof lang]];
    }

    // Otherwise, return the segment as-is
    return segment;
  });

  return `/${lang}/${translatedSegments.join('/')}`;
}

/**
 * Get route key from URL for the current language
 */
export function getRouteFromUrl(
  url: URL,
  lang: keyof typeof languages
): string | undefined {
  const { pathname } = url;
  const segments = pathname.split('/').filter(Boolean);

  // Remove language prefix if present
  if (segments[0] === lang) {
    segments.shift();
  }

  const route = segments.join('/');

  // Find the route key for the current language
  const routeEntry = Object.entries(routes[lang]).find(
    ([, value]) => value === route
  );
  return routeEntry?.[0];
}

/**
 * Type definitions for better TypeScript support
 */
export type Language = keyof typeof languages;
export type TranslationKey = keyof (typeof ui)[typeof defaultLang];
export type RouteKey = keyof (typeof routes)[typeof defaultLang];
