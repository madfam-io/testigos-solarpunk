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

    // Community Page
    'community.hero.title': 'Join the Movement',
    'community.hero.description':
      'A diverse community united by humor and hope for a sustainable future',
    'community.personas.title': 'Do you identify with any of them?',
    'community.personas.intro':
      'Meet the real characters that inspire our sketches',
    'community.barriers.title': 'We Understand the Barriers',
    'community.barriers.intro':
      "We know sustainability can seem complicated. That's why we use humor to break down these myths:",
    'community.values.title': 'Our Values',
    'community.participation.title': 'Ways to Participate',
    'community.cta.title': 'Ready to change the world with a smile?',
    'community.cta.subtitle':
      'Join thousands of Solarpunk Witnesses across Mexico',
    'community.newsletter.title': 'Get our newsletter',

    // Community Values
    'values.inclusion.title': 'Inclusion',
    'values.inclusion.description':
      'Everyone is welcome, regardless of their level of knowledge',
    'values.humor.title': 'Humor',
    'values.humor.description': 'Laughing together while we learn and grow',
    'values.action.title': 'Action',
    'values.action.description': 'Small steps that generate big changes',
    'values.creativity.title': 'Creativity',
    'values.creativity.description': 'Innovative solutions to complex problems',

    // Community Participation
    'participation.create.title': 'Create Content',
    'participation.create.description':
      'Share your own sketches and sustainable experiences',
    'participation.create.cta': 'Create',
    'participation.share.title': 'Share',
    'participation.share.description':
      'Spread the message on your social networks',
    'participation.share.cta': 'Share',
    'participation.collaborate.title': 'Collaborate',
    'participation.collaborate.description':
      'Join as a volunteer in MADLAB events',
    'participation.collaborate.cta': 'Volunteer',
    'participation.sponsor.title': 'Sponsor',
    'participation.sponsor.description':
      'Support the project as a sustainable company',
    'participation.sponsor.cta': 'Sponsor',

    // Sketches Page
    'sketches.hero.title': 'Solarpunk Witnesses',
    'sketches.hero.description':
      '60-90 second sketches that break cultural barriers and teach sustainability with humor',
    'sketches.phase.label': 'Phase 1: Attraction',
    'sketches.stats.episodes': 'Episodes',
    'sketches.stats.views': 'Views',
    'sketches.stats.engagement': 'Engagement',
    'sketches.filters.all': 'All',
    'sketches.filters.sustainability': 'Sustainability',
    'sketches.filters.technology': 'Technology',
    'sketches.filters.social': 'Social',
    'sketches.grid.title': 'Our Sketches',
    'sketches.load.more': 'Load more sketches',
    'sketches.cta.title': 'Do you like what you see?',
    'sketches.cta.description': "Subscribe so you don't miss any episode",
    'sketches.cta.subscribe': 'Subscribe to Channel',
    'sketches.cta.community': 'Join the Community',
    'sketches.actions.watch': 'Watch Sketch',
    'sketches.actions.share': 'Share',

    // Personas
    'personas.gaby.name': 'Gaby Godínez',
    'personas.gaby.nickname': 'The eco-stressed',
    'personas.gaby.occupation': 'Freelance graphic designer',
    'personas.gaby.description':
      'Wants to be sustainable but feels overwhelmed by all the contradictory information',
    'personas.gaby.pain': 'Information overload and environmental guilt',
    'personas.gaby.sketch': 'Day 237 trying to be sustainable',

    'personas.carlos.name': 'Carlos Mendoza',
    'personas.carlos.nickname': 'The pragmatic skeptic',
    'personas.carlos.occupation': 'Sales manager',
    'personas.carlos.description':
      'Believes sustainability is an expensive fad for privileged millennials',
    'personas.carlos.pain': 'Perceives eco as elitist and impractical',
    'personas.carlos.sketch': 'The solar panel that paid for college',

    'personas.sofia.name': 'Sofia Ramírez',
    'personas.sofia.nickname': 'The conscious influencer',
    'personas.sofia.occupation': 'Content creator',
    'personas.sofia.description':
      'Seeks authentic sustainability content that connects with her audience',
    'personas.sofia.pain': 'Fear of greenwashing and loss of credibility',
    'personas.sofia.sketch': 'The app that saves the world... or not',

    'personas.miguel.name': 'Miguel Ángel Torres',
    'personas.miguel.nickname': 'The curious maker',
    'personas.miguel.occupation': 'Engineering student',
    'personas.miguel.description':
      'Loves creating and experimenting, seeks accessible DIY sustainable projects',
    'personas.miguel.pain': 'Lack of resources and accessible guides',
    'personas.miguel.sketch': 'Hacking the solar future',

    'personas.laura.name': 'Laura Hernández',
    'personas.laura.nickname': 'The activist mom',
    'personas.laura.occupation': 'Teacher and mother of two',
    'personas.laura.description':
      'Wants to teach sustainable values to her children without sounding preachy',
    'personas.laura.pain': 'How to make sustainability fun for kids',
    'personas.laura.sketch': 'The garden that became a jungle',

    // Pain Points
    'barriers.economic.title': 'Economic Barrier',
    'barriers.economic.belief': '"Being sustainable is expensive"',
    'barriers.economic.solution':
      'Sketches showing accessible and DIY alternatives',

    'barriers.educational.title': 'Educational Barrier',
    'barriers.educational.belief': '"It\'s too complicated to understand"',
    'barriers.educational.solution': 'Humor that simplifies complex concepts',

    'barriers.cultural.title': 'Cultural Barrier',
    'barriers.cultural.belief': '"Environmentalists are boring"',
    'barriers.cultural.solution': 'Comedy that connects with pop culture',

    'barriers.time.title': 'Time Barrier',
    'barriers.time.belief': '"I don\'t have time for this"',
    'barriers.time.solution': 'Quick tips in 60-second sketches',

    // Common UI labels
    'ui.age': 'years old',
    'ui.pain.label': 'Their pain:',
    'ui.sketch.label': 'Related sketch:',
    'ui.solution.label': 'Our response:',

    // Sketch Episodes
    'sketches.ep1.title': 'Day 237 trying to be sustainable',
    'sketches.ep1.description':
      'Luna tries to compost but ends up creating an ecosystem in her kitchen',
    'sketches.ep2.title': 'The Gospel according to the Panels',
    'sketches.ep2.description':
      'Solar evangelists preach in the market about energy salvation',
    'sketches.ep3.title': 'The app that saves the world... or not',
    'sketches.ep3.description':
      'Alex presents his new eco-friendly app that uses more battery than Bitcoin',

    // Creative Process
    'process.research.title': 'Research',
    'process.research.description':
      'We identify pain points and cultural barriers',
    'process.design.title': 'Design',
    'process.design.description':
      'We create content that connects and educates',
    'process.production.title': 'Production',
    'process.production.description': 'We record with MADFAM quality',
    'process.distribution.title': 'Distribution',
    'process.distribution.description':
      'We reach audiences on multiple platforms',
    'process.impact.title': 'Impact',
    'process.impact.description': 'We measure and optimize results',

    // Project Page Content
    'project.process.title': 'Our Creative Process',
    'project.cta.title': 'Ready to be part of the change?',
    'project.cta.subtitle': 'Join the sustainable humor revolution',

    // Project Phases Details
    'project.phase1.title': 'Solarpunk Witnesses',
    'project.phase1.description':
      'Comedy sketches with relevant content to reflect on daily habits and science',
    'project.phase1.duration': '60-90 seconds',
    'project.phase1.feature1': 'Viral content for social media',
    'project.phase1.feature2': 'Humor that breaks cultural barriers',
    'project.phase1.feature3': 'Practical sustainability tips',

    'project.phase2.title': 'MADFAM Podcast',
    'project.phase2.description':
      'Medium-depth content about science, technology and quality of life with guest experts',
    'project.phase2.duration': '20-30 minutes',
    'project.phase2.feature1': 'Deep conversations with experts',
    'project.phase2.feature2': 'Current environmental topics',
    'project.phase2.feature3': 'Practical and scalable solutions',

    'project.phase3.title': 'MADLAB',
    'project.phase3.description':
      'Events, experiences and activations in schools with sponsor support for direct impact',
    'project.phase3.duration': 'In-person events',
    'project.phase3.feature1': 'Immersive educational experiences',
    'project.phase3.feature2': 'Innovation laboratories',
    'project.phase3.feature3': 'Direct impact on communities',

    // Common labels
    'ui.mission.vision': 'Mission and Vision',

    // Philosophy Page
    'philosophy.title': 'Project Philosophy',
    'philosophy.hero.title': 'The Evangelizing Vision',
    'philosophy.hero.subtitle':
      "Solarpunk Witnesses is a parody that imitates the style of Jehovah's Witnesses, but preaching eco-technological salvation and a sustainable future",
    'philosophy.concept.title': 'Central Concept',
    'philosophy.concept.text':
      "The **Solarpunk Witnesses** announce the imminent climate crisis and offer salvation through green technology, community life and sustainable practices. It's a satire that combines:",
    'philosophy.objectives.title': 'Project Objectives',
    'philosophy.roadmap.title': 'Evangelization Roadmap',
    'philosophy.commandments.title': 'The Solarpunk Commandments',
    'philosophy.quotes.title': 'Words from the Prophets',
    'philosophy.cta.title': 'Ready to Join the Mission?',
    'philosophy.cta.scriptures': 'Study the Scriptures',
    'philosophy.cta.prophets': 'Meet the Prophets',

    // Impact Page
    'impact.title2': 'Our Impact',
    'impact.hero.subtitle': 'We measure our success by the smiles generated',
    'impact.metrics.title': 'Real-Time Metrics',
    'impact.phases.title': 'Impact by Phase',
    'impact.stories.title': 'Change Stories',
    'impact.growth.title': 'Movement Growth',
    'impact.partners.title': 'Change Allies',
    'impact.cta.title': 'Be Part of the Impact',
    'impact.cta.support': 'Support the Project',
    'impact.cta.volunteer': 'Join as Volunteer',

    // Characters Page
    'characters.title2': 'Characters',
    'characters.hero.title': 'Universe Characters',
    'characters.hero.subtitle': 'Meet the inhabitants of Neo-Cuernavaca',
    'characters.filters.all': 'All',
    'characters.filters.protagonists': 'Protagonists',
    'characters.filters.evangelists': 'Evangelists',
    'characters.filters.support': 'Support',
    'characters.cta.title': 'Want to know more about these characters?',
    'characters.cta.description':
      'Explore the scripts to see these characters in action',
    'characters.cta.scripts': 'View Scripts',

    // Production Pages
    'production.visual.title': 'Visual Style Guide',
    'production.visual.colors': 'Main Color Palette',
    'production.visual.typography': 'Typography',
    'production.visual.aesthetic': 'Magazine Cutout Aesthetic',
    'production.audio.title': 'Audio Production',
    'production.back': 'Back to Production',

    // MADLAB Page
    'madlab.title': 'MADLAB - Phase 3',
    'madlab.hero.title': 'MADLAB',
    'madlab.hero.subtitle': 'Sustainable innovation laboratories',
    'madlab.what.title': 'What is MADLAB?',
    'madlab.programs.title': 'MADLAB Programs',
    'madlab.timeline.title': 'Expected Impact',
    'madlab.sponsors.title': 'Sponsors',
    'madlab.sponsors.benefits': 'Benefits for Sponsors',
    'madlab.sponsors.cta': 'Become a Sponsor',
    'madlab.cta.schools': 'For Schools',
    'madlab.cta.volunteers': 'For Volunteers',
    'madlab.cta.facilitator': 'Join as facilitator or mentor',

    // Podcast Page
    'podcast.title': 'Podcast - Phase 2',
    'podcast.hero.title': 'MADFAM Podcast',
    'podcast.coming.title': "What's Coming",
    'podcast.features.deep': 'Deep Content',
    'podcast.features.experts': 'Expert Guests',
    'podcast.features.solutions': 'Practical Solutions',
    'podcast.features.relevant': 'Relevant Topics',
    'podcast.topics.title': "Topics We'll Explore",
    'podcast.notify.title': 'Be the first to listen',
    'podcast.notify.cta': 'Notify Me',
    'podcast.meanwhile.title': 'Meanwhile...',
    'podcast.meanwhile.description': 'Enjoy our Phase 1 sketches',

    // Formats Page
    'formats.title': 'Content Formats',
    'formats.hero.title': 'Our Content Formats',
    'formats.hero.subtitle': 'Multiple ways to spread the solar message',

    // Visual Guide Page
    'visual.guide.title': 'Visual Style Guide',
    'visual.guide.hero.title': 'Visual Identity',
    'visual.guide.colors.title': 'Color Palette',
    'visual.guide.typography.title': 'Typography',
    'visual.guide.aesthetic.title': 'Magazine Cutout Aesthetic',

    // Resources Page
    'resources.title': 'Resources',
    'resources.hero.title': 'Creative Resources',
    'resources.actors.title': 'For Actors',
    'resources.creators.title': 'For Creators',
    'resources.sponsors.title': 'For Sponsors',

    // Scripts Page
    'scripts.title': 'Scripts',
    'scripts.hero.title': 'Comedy Scripts',
    'scripts.hero.subtitle': 'Discover our sketch scripts',

    // Universe/World Page
    'universe.title': 'Universe',
    'world.hero.title': 'The Solarpunk World',
    'world.hero.subtitle': 'Welcome to Neo-Cuernavaca',

    // Production Page
    'production.title': 'Production',
    'production.hero.title': 'Production Guide',

    // Common page elements
    'page.back.home': 'Back to Home',
    'page.more.info': 'More Information',
    'page.coming.soon': 'Coming Soon',
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
