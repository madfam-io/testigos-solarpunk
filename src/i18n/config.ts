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
  },
  en: {
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
    // Find the key for this segment in default language
    const routeEntry = Object.entries(routes[defaultLang]).find(
      ([, value]) => value === segment
    );
    const routeKey = routeEntry?.[0];

    if (routeKey !== undefined && routeKey in routes[lang]) {
      return routes[lang][routeKey as keyof (typeof routes)[typeof lang]];
    }

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
