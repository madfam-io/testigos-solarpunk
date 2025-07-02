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
    'cta.watchSketches': 'Ver Sketches',
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

    // Community Page
    'community.hero.title': 'Únete al Movimiento',
    'community.hero.description':
      'Una comunidad diversa unida por el humor y la esperanza de un futuro sostenible',
    'community.personas.title': '¿Te identificas con alguno de ellos?',
    'community.personas.intro':
      'Conoce a los personajes reales que inspiran nuestros sketches',
    'community.barriers.title': 'Entendemos las Barreras',
    'community.barriers.intro':
      'Sabemos que la sostenibilidad puede parecer complicada. Por eso usamos el humor para derribar estos mitos:',
    'community.values.title': 'Nuestros Valores',
    'community.participation.title': 'Formas de Participar',
    'community.cta.title': '¿Listo para cambiar el mundo con una sonrisa?',
    'community.cta.subtitle':
      'Únete a miles de Testigos de Solarpunk en todo México',
    'community.newsletter.title': 'Recibe nuestro newsletter',

    // Community Values
    'values.inclusion.title': 'Inclusión',
    'values.inclusion.description':
      'Todos son bienvenidos, sin importar su nivel de conocimiento',
    'values.humor.title': 'Humor',
    'values.humor.description': 'Reír juntos mientras aprendemos y crecemos',
    'values.action.title': 'Acción',
    'values.action.description': 'Pequeños pasos que generan grandes cambios',

    // World/Universe Page
    'world.hero.title': 'El Mundo de Testigos de Solarpunk',
    'world.hero.description':
      'Un futuro cercano donde la humanidad ha aprendido a vivir en armonía con la naturaleza, combinando tecnología avanzada con prácticas ancestrales.',
    'world.timeline.title': 'Línea Temporal',
    'world.timeline.2025.title': 'El Despertar',
    'world.timeline.2025.description':
      'Primeras comunidades adoptan energía solar distribuida',
    'world.timeline.2030.title': 'La Transición',
    'world.timeline.2030.description':
      'Neo-Cuernavaca se convierte en la primera ciudad carbono-negativa de México',
    'world.timeline.2035.title': 'La Expansión',
    'world.timeline.2035.description':
      'El modelo solarpunk se replica en ciudades de todo el continente',
    'world.timeline.2040.title': 'El Florecimiento',
    'world.timeline.2040.description':
      'Nueva era de cooperación global basada en sostenibilidad',
    'world.locations.title': 'Ubicaciones Principales',
    'world.locations.features': 'Características:',
    'world.locations.explore': 'Explorar Ubicación',
    'world.technology.title': 'Tecnologías Clave',
    'world.tech.solar.title': 'Paneles Solares Orgánicos',
    'world.tech.solar.description':
      'Células fotovoltaicas biodegradables que imitan la fotosíntesis',
    'world.tech.water.title': 'Captación Atmosférica',
    'world.tech.water.description':
      'Sistemas que extraen agua potable directamente del aire',
    'world.tech.agriculture.title': 'Agricultura Vertical',
    'world.tech.agriculture.description':
      'Torres de cultivo que producen alimentos usando 90% menos agua',
    'world.tech.batteries.title': 'Baterías de Sal',
    'world.tech.batteries.description':
      'Almacenamiento de energía usando materiales abundantes y no tóxicos',
    'world.tech.bioconcrete.title': 'Bioconcreto',
    'world.tech.bioconcrete.description':
      'Material de construcción que se auto-repara y purifica el aire',
    'world.tech.transport.title': 'Transporte Magnético',
    'world.tech.transport.description':
      'Sistemas de levitación magnética alimentados por energía solar',
    'world.society.title': 'Sociedad y Cultura',
    'world.society.economy.title': 'Economía Circular',
    'world.society.economy.description':
      'Los desechos de un proceso se convierten en recursos para otro. La basura es un concepto obsoleto en el mundo solarpunk.',
    'world.society.governance.title': 'Gobernanza Participativa',
    'world.society.governance.description':
      'Las decisiones comunitarias se toman mediante asambleas locales y plataformas digitales de democracia directa.',
    'world.society.education.title': 'Educación Holística',
    'world.society.education.description':
      'El aprendizaje combina conocimiento técnico con sabiduría ancestral, enfocándose en la resolución creativa de problemas.',
    'world.society.time.title': 'Tiempo de Calidad',
    'world.society.time.description':
      'La semana laboral de 25 horas permite más tiempo para la familia, el arte y el desarrollo personal.',

    // Green Roof Neo-Cuernavaca Page (Spanish)
    'greenroof.title': 'Azotea Verde de Neo-Cuernavaca',
    'greenroof.description':
      'Descubre el corazón verde de la ciudad: la azotea comunitaria donde convergen tecnología, naturaleza y esperanza en el universo solarpunk',
    'greenroof.breadcrumb.home': 'Inicio',
    'greenroof.breadcrumb.world': 'Construcción del Mundo',
    'greenroof.hero.title': 'Azotea Verde de Neo-Cuernavaca',
    'greenroof.hero.description':
      'El corazón pulsante de la revolución solarpunk: un oasis urbano donde la tecnología sostenible se encuentra con la sabiduría ancestral para crear el futuro que todos merecemos.',
    'greenroof.overview.title': 'Un Nuevo Modelo de Comunidad',
    'greenroof.overview.p1':
      'La Azotea Verde no es solo un espacio físico; es una manifestación tangible de los principios solarpunk en acción. Ubicada en el corazón de Neo-Cuernavaca, esta azotea comunitaria de 2,500 metros cuadrados funciona como laboratorio social, centro de innovación y jardín comunitario.',
    'greenroof.overview.p2':
      'Aquí, los habitantes de la ciudad experimentan de primera mano cómo la tecnología apropiada puede mejorar sus vidas sin sacrificar su conexión con la naturaleza. Es el lugar donde Hermana Panelia realiza sus demostraciones más impactantes y donde Hermano Compostino enseña los ciclos eternos de regeneración.',
    'greenroof.stats.area': 'Metros cuadrados',
    'greenroof.stats.plants': 'Plantas nativas',
    'greenroof.stats.renewable': 'Energía renovable',
    'greenroof.stats.visitors': 'Visitantes semanales',
    'greenroof.features.title': 'Características de la Azotea',
    'greenroof.features.solar.title': 'Sistema de Energía Solar',
    'greenroof.features.solar.description':
      'Una instalación de 50kW de paneles solares de última generación que no solo abastece las necesidades energéticas de la azotea, sino que también alimenta el edificio de apartamentos comunitario de abajo.',
    'greenroof.features.solar.feature1':
      'Paneles bifaciales de alta eficiencia',
    'greenroof.features.solar.feature2':
      'Sistema de almacenamiento en baterías',
    'greenroof.features.solar.feature3':
      'Inversor inteligente con monitoreo en tiempo real',
    'greenroof.features.solar.feature4':
      'Excedente compartido con la red comunitaria',
    'greenroof.features.gardens.title': 'Jardines Verticales y Huertos',
    'greenroof.features.gardens.description':
      'Un sistema integrado de agricultura urbana que combina permacultura tradicional con hidroponía moderna, produciendo alimentos frescos para más de 50 familias de la comunidad.',
    'greenroof.features.gardens.feature1':
      'Torres de cultivo hidropónico automatizadas',
    'greenroof.features.gardens.feature2':
      'Bancales elevados con compost comunitario',
    'greenroof.features.gardens.feature3':
      'Plantas medicinales y aromáticas nativas',
    'greenroof.features.gardens.feature4':
      'Sistema de recolección de agua de lluvia',
    'greenroof.features.meeting.title': 'Espacio de Reunión Comunitaria',
    'greenroof.features.meeting.description':
      'Un anfiteatro al aire libre construido con materiales reciclados donde se realizan talleres, presentaciones y las famosas "Asambleas del Atardecer" donde la comunidad toma decisiones consensuadas.',
    'greenroof.features.meeting.feature1':
      'Capacidad para 80 personas sentadas',
    'greenroof.features.meeting.feature2':
      'Sistema de sonido alimentado por energía solar',
    'greenroof.features.meeting.feature3': 'Escenario modular y adaptable',
    'greenroof.features.meeting.feature4':
      'Pérgola con plantas trepadoras para sombra natural',
    'greenroof.features.compost.title': 'Centro de Compostaje Comunitario',
    'greenroof.features.compost.description':
      'El dominio de Hermano Compostino: un sistema de compostaje en capas que procesa los residuos orgánicos de todo el barrio, transformándolos en el "oro negro" que alimenta los jardines.',
    'greenroof.features.compost.feature1':
      'Compostera termofílica de tres cámaras',
    'greenroof.features.compost.feature2':
      'Vermicompostaje con lombrices californianas',
    'greenroof.features.compost.feature3':
      'Biodigestor para generación de biogás',
    'greenroof.features.compost.feature4':
      'Talleres semanales de compostaje doméstico',
    'greenroof.dailylife.title': 'Un Día en la Azotea Verde',
    'greenroof.dailylife.6am.title': 'Amanecer Solar',
    'greenroof.dailylife.6am.description':
      'Los primeros rayos del sol activan automáticamente el sistema de riego por goteo. Los madrugadores llegan para el "Ritual del Amanecer": yoga, meditación y revisión de las plantas antes de comenzar el día.',
    'greenroof.dailylife.8am.title': 'Cosecha Matutina',
    'greenroof.dailylife.8am.description':
      'Las familias participantes recogen los vegetales frescos para el desayuno. Hermano Compostino suele estar aquí, enseñando sobre los ciclos naturales mientras revuelve el compost.',
    'greenroof.dailylife.12pm.title': 'Almuerzo Comunitario',
    'greenroof.dailylife.12pm.description':
      'Los miércoles y sábados se organiza un almuerzo comunitario donde todos contribuyen con algo preparado con los ingredientes de la azotea. Es cuando más historias y conocimientos se comparten.',
    'greenroof.dailylife.4pm.title': 'Talleres y Demostraciones',
    'greenroof.dailylife.4pm.description':
      'El momento favorito de Hermana Panelia. Aquí demuestra nuevas tecnologías, explica el funcionamiento de los paneles solares y enseña a otros cómo pueden implementar soluciones similares en sus hogares.',
    'greenroof.dailylife.6pm.title': 'Asamblea del Atardecer',
    'greenroof.dailylife.6pm.description':
      'Los viernes, la comunidad se reúne para tomar decisiones importantes, planificar proyectos futuros y resolver conflictos de manera colaborativa. Es democracia directa en acción.',
    'greenroof.dailylife.8pm.title': 'Noches de Estrellas',
    'greenroof.dailylife.8pm.description':
      'Con la contaminación lumínica reducida gracias al uso inteligente de la energía, las noches en la azotea permiten observar las estrellas mientras se comparten historias y sueños para el futuro.',
    'greenroof.impact.title': 'Impacto Real y Medible',
    'greenroof.impact.energy.number': '65%',
    'greenroof.impact.energy.label': 'Reducción en costos de energía',
    'greenroof.impact.energy.description':
      'Las familias del edificio han visto una reducción promedio del 65% en sus facturas eléctricas desde la instalación del sistema solar.',
    'greenroof.impact.co2.number': '2.5 Ton',
    'greenroof.impact.co2.label': 'CO₂ evitado mensualmente',
    'greenroof.impact.co2.description':
      'La combinación de energía solar y compostaje evita la emisión de 2.5 toneladas de CO₂ cada mes.',
    'greenroof.impact.waste.number': '80%',
    'greenroof.impact.waste.label': 'Residuos orgánicos procesados',
    'greenroof.impact.waste.description':
      'El sistema de compostaje procesa el 80% de los residuos orgánicos del barrio, transformándolos en fertilizante natural.',
    'greenroof.impact.food.number': '300kg',
    'greenroof.impact.food.label': 'Alimentos frescos al mes',
    'greenroof.impact.food.description':
      'Los jardines urbanos producen 300kg de vegetales y hierbas frescas mensualmente para la comunidad.',
    'greenroof.stories.title': 'Historias de Transformación',
    'greenroof.stories.hernandez.title': 'La Familia Hernández',
    'greenroof.stories.hernandez.quote':
      '"Al principio éramos escépticos sobre esto de los paneles solares", cuenta María Hernández. "Pero cuando vimos que nuestra factura de luz bajó de $2,500 a $800 pesos, y además tenemos vegetales frescos cada semana... ya no hay vuelta atrás."',
    'greenroof.stories.hernandez.impact':
      '$20,400 pesos ahorrados en el primer año',
    'greenroof.stories.carlos.title': 'Don Carlos, el Converso',
    'greenroof.stories.carlos.quote':
      'Ex-escéptico del cambio climático, Don Carlos ahora lidera los talleres de compostaje los sábados. "Compostino me enseñó que \'basura\' es solo una palabra para cosas que no sabemos aprovechar. Ahora veo oportunidades donde antes veía problemas."',
    'greenroof.stories.carlos.impact':
      '40 familias adoptaron compostaje doméstico',
    'greenroof.stories.sofia.title': 'Sofía, de 8 años',
    'greenroof.stories.sofia.quote':
      '"Me gusta venir aquí porque las plantas me dicen secretos", explica Sofía mientras riega sus tomates cherry. "Y cuando crezca, voy a hacer una azotea así en toda la ciudad."',
    'greenroof.stories.sofia.impact':
      '25 niños participan en programas educativos semanales',
    'greenroof.future.title': 'La Semilla del Futuro',
    'greenroof.future.description':
      'La Azotea Verde de Neo-Cuernavaca no es un destino, sino un punto de partida. Es la prueba viviente de que otro mundo es posible: uno donde la tecnología sirve a la vida, donde la comunidad prospera sin destruir el planeta, y donde cada persona puede ser protagonista del cambio que quiere ver.',
    'greenroof.future.goal1.title': 'Red de 100 Azoteas',
    'greenroof.future.goal1.description':
      'Replicar el modelo en toda la ciudad para 2027',
    'greenroof.future.goal2.title': 'Independencia Energética',
    'greenroof.future.goal2.description':
      'Barrio 100% autoabastecido con renovables para 2026',
    'greenroof.future.goal3.title': 'Modelo Exportable',
    'greenroof.future.goal3.description':
      'Guías y recursos disponibles para cualquier comunidad',
    'greenroof.nav.back': 'Volver al Mundo',
    'greenroof.nav.characters': 'Conocer a los Personajes',

    'values.creativity.title': 'Creatividad',
    'values.creativity.description':
      'Soluciones innovadoras a problemas complejos',

    // Community Participation
    'participation.create.title': 'Crear Contenido',
    'participation.create.description':
      'Comparte tus propios sketches y experiencias sostenibles',
    'participation.create.cta': 'Crear',
    'participation.share.title': 'Compartir',
    'participation.share.description':
      'Difunde el mensaje en tus redes sociales',
    'participation.share.cta': 'Compartir',
    'participation.collaborate.title': 'Colaborar',
    'participation.collaborate.description':
      'Únete como voluntario en eventos MADLAB',
    'participation.collaborate.cta': 'Voluntario',
    'participation.sponsor.title': 'Patrocinar',
    'participation.sponsor.description':
      'Apoya el proyecto como empresa sostenible',
    'participation.sponsor.cta': 'Patrocinar',

    // Sketches Page
    'sketches.hero.title': 'Testigos de Solarpunk',
    'sketches.hero.description':
      'Sketches de 60-90 segundos que rompen barreras culturales y enseñan sostenibilidad con humor',
    'sketches.phase.label': 'Fase 1: Atracción',
    'sketches.stats.episodes': 'Episodios',
    'sketches.stats.views': 'Visualizaciones',
    'sketches.stats.engagement': 'Engagement',
    'sketches.filters.all': 'Todos',
    'sketches.filters.sustainability': 'Sostenibilidad',
    'sketches.filters.technology': 'Tecnología',
    'sketches.filters.social': 'Social',
    'sketches.grid.title': 'Nuestros Sketches',
    'sketches.load.more': 'Cargar más sketches',
    'sketches.cta.title': '¿Te gusta lo que ves?',
    'sketches.cta.description': 'Suscríbete para no perderte ningún episodio',
    'sketches.cta.subscribe': 'Suscribirse al Canal',
    'sketches.cta.community': 'Únete a la Comunidad',
    'sketches.actions.watch': 'Ver Sketch',
    'sketches.actions.share': 'Compartir',

    // Personas
    'personas.gaby.name': 'Gaby Godínez',
    'personas.gaby.nickname': 'La ecoestresada',
    'personas.gaby.occupation': 'Diseñadora gráfica freelance',
    'personas.gaby.description':
      'Quiere ser sostenible pero se siente abrumada por toda la información contradictoria',
    'personas.gaby.pain': 'Sobrecarga de información y culpa ambiental',
    'personas.gaby.sketch': 'Día 237 tratando de ser sostenible',

    'personas.carlos.name': 'Carlos Mendoza',
    'personas.carlos.nickname': 'El escéptico prágmatico',
    'personas.carlos.occupation': 'Gerente de ventas',
    'personas.carlos.description':
      'Cree que la sostenibilidad es una moda cara para millennials privilegiados',
    'personas.carlos.pain': 'Percibe lo eco como elitista e impracticable',
    'personas.carlos.sketch': 'El panel solar que pagó la universidad',

    'personas.sofia.name': 'Sofia Ramírez',
    'personas.sofia.nickname': 'La influencer consciente',
    'personas.sofia.occupation': 'Creadora de contenido',
    'personas.sofia.description':
      'Busca contenido de sostenibilidad auténtico que conecte con su audiencia',
    'personas.sofia.pain': 'Miedo al greenwashing y pérdida de credibilidad',
    'personas.sofia.sketch': 'La app que salva al mundo... o no',

    'personas.miguel.name': 'Miguel Ángel Torres',
    'personas.miguel.nickname': 'El maker curioso',
    'personas.miguel.occupation': 'Estudiante de ingeniería',
    'personas.miguel.description':
      'Le encanta crear y experimentar, busca proyectos sostenibles DIY accesibles',
    'personas.miguel.pain': 'Falta de recursos y guías accesibles',
    'personas.miguel.sketch': 'Hackeando el futuro solar',

    'personas.laura.name': 'Laura Hernández',
    'personas.laura.nickname': 'La mamá activista',
    'personas.laura.occupation': 'Maestra y madre de dos',
    'personas.laura.description':
      'Quiere enseñar valores sostenibles a sus hijos sin sonar predicativa',
    'personas.laura.pain': 'Cómo hacer la sostenibilidad divertida para niños',
    'personas.laura.sketch': 'El jardín que se volvió selva',

    // Pain Points
    'barriers.economic.title': 'Barrera Económica',
    'barriers.economic.belief': '"Ser sostenible es caro"',
    'barriers.economic.solution':
      'Sketches mostrando alternativas accesibles y DIY',

    'barriers.educational.title': 'Barrera Educativa',
    'barriers.educational.belief': '"Es muy complicado de entender"',
    'barriers.educational.solution': 'Humor que simplifica conceptos complejos',

    'barriers.cultural.title': 'Barrera Cultural',
    'barriers.cultural.belief': '"Los ambientalistas son aburridos"',
    'barriers.cultural.solution': 'Comedia que conecta con la cultura popular',

    'barriers.time.title': 'Barrera de Tiempo',
    'barriers.time.belief': '"No tengo tiempo para esto"',
    'barriers.time.solution': 'Tips rápidos en sketches de 60 segundos',

    // Common UI labels
    'ui.age': 'años',
    'ui.pain.label': 'Su dolor:',
    'ui.sketch.label': 'Sketch relacionado:',
    'ui.solution.label': 'Nuestra respuesta:',

    // Sketch Episodes
    'sketches.ep1.title': 'Día 237 tratando de ser sostenible',
    'sketches.ep1.description':
      'Luna intenta hacer compost pero termina creando un ecosistema en su cocina',
    'sketches.ep2.title': 'El Evangelio según los Paneles',
    'sketches.ep2.description':
      'Los evangelistas solares predican en el mercado sobre la salvación energética',
    'sketches.ep3.title': 'La app que salva al mundo... o no',
    'sketches.ep3.description':
      'Alex presenta su nueva app eco-friendly que consume más batería que Bitcoin',

    // Creative Process
    'process.research.title': 'Investigación',
    'process.research.description':
      'Identificamos puntos de dolor y barreras culturales',
    'process.design.title': 'Diseño',
    'process.design.description': 'Creamos contenido que conecta y educa',
    'process.production.title': 'Producción',
    'process.production.description': 'Grabamos con calidad MADFAM',
    'process.distribution.title': 'Distribución',
    'process.distribution.description':
      'Llegamos a audiencias en múltiples plataformas',
    'process.impact.title': 'Impacto',
    'process.impact.description': 'Medimos y optimizamos resultados',

    // Project Page Content
    'project.process.title': 'Nuestro Proceso Creativo',
    'project.cta.title': '¿Listo para ser parte del cambio?',
    'project.cta.subtitle': 'Únete a la revolución del humor sostenible',

    // Project Phases Details
    'project.phase1.title': 'Testigos de Solarpunk',
    'project.phase1.description':
      'Sketches de comedia con contenido relevante para reflexionar sobre hábitos diarios y ciencia',
    'project.phase1.duration': '60-90 segundos',
    'project.phase1.feature1': 'Contenido viral para redes sociales',
    'project.phase1.feature2': 'Humor que rompe barreras culturales',
    'project.phase1.feature3': 'Tips prácticos de sostenibilidad',

    'project.phase2.title': 'Podcast MADFAM',
    'project.phase2.description':
      'Contenido de profundidad media sobre ciencia, tecnología y calidad de vida con expertos invitados',
    'project.phase2.duration': '20-30 minutos',
    'project.phase2.feature1': 'Conversaciones profundas con expertos',
    'project.phase2.feature2': 'Temas ambientales actuales',
    'project.phase2.feature3': 'Soluciones prácticas y escalables',

    'project.phase3.title': 'MADLAB',
    'project.phase3.description':
      'Eventos, experiencias y activaciones en escuelas con apoyo de patrocinadores para impacto directo',
    'project.phase3.duration': 'Eventos presenciales',
    'project.phase3.feature1': 'Experiencias educativas inmersivas',
    'project.phase3.feature2': 'Laboratorios de innovación',
    'project.phase3.feature3': 'Impacto directo en comunidades',

    // Common labels
    'ui.mission.vision': 'Misión y Visión',

    // Philosophy Page
    'philosophy.title': 'Filosofía del Proyecto',
    'philosophy.hero.title': 'La Visión Evangelizadora',
    'philosophy.hero.subtitle':
      'Testigos de Solarpunk es una parodia que imita el estilo de los Testigos de Jehová, pero predicando la salvación eco-tecnológica y un futuro sostenible',
    'philosophy.concept.title': 'Concepto Central',
    'philosophy.concept.text':
      'Los **Testigos de Solarpunk** anuncian la crisis climática inminente y ofrecen salvación a través de tecnología verde, vida comunitaria y prácticas sostenibles. Es una sátira que combina:',
    'philosophy.objectives.title': 'Objetivos del Proyecto',
    'philosophy.roadmap.title': 'Hoja de Ruta de Evangelización',
    'philosophy.commandments.title': 'Los Mandamientos Solarpunk',
    'philosophy.quotes.title': 'Palabras de los Profetas',
    'philosophy.cta.title': '¿Listo para Unirte a la Misión?',
    'philosophy.cta.scriptures': 'Estudiar las Escrituras',
    'philosophy.cta.prophets': 'Conocer a los Profetas',

    // Impact Page
    'impact.title2': 'Nuestro Impacto',
    'impact.hero.subtitle': 'Medimos nuestro éxito por las sonrisas generadas',
    'impact.metrics.title': 'Métricas en Tiempo Real',
    'impact.phases.title': 'Impacto por Fase',
    'impact.stories.title': 'Historias de Cambio',
    'impact.growth.title': 'Crecimiento del Movimiento',
    'impact.partners.title': 'Aliados del Cambio',
    'impact.cta.title': 'Sé Parte del Impacto',
    'impact.cta.support': 'Apoyar el Proyecto',
    'impact.cta.volunteer': 'Únete como Voluntario',

    // Characters Page
    'characters.hero.title': 'Personajes del Universo',
    'characters.hero.subtitle': 'Conoce a los habitantes de Neo-Cuernavaca',
    'characters.filters.all': 'Todos',
    'characters.filters.protagonists': 'Protagonistas',
    'characters.filters.evangelists': 'Evangelistas',
    'characters.filters.support': 'Apoyo',
    'characters.cta.title': '¿Quieres saber más sobre estos personajes?',
    'characters.cta.description':
      'Explora los guiones para ver a estos personajes en acción',
    'characters.cta.scripts': 'Ver Guiones',
    'characters.breadcrumb.home': 'Inicio',
    'characters.breadcrumb.characters': 'Personajes',
    'characters.section.story': 'Historia',
    'characters.section.personality': 'Personalidad',
    'characters.section.relationships': 'Relaciones',
    'characters.section.quotes': 'Frases Memorables',

    // Production Pages
    'production.visual.title': 'Guía de Estilo Visual',
    'production.visual.colors': 'Paleta de Colores Principal',
    'production.visual.typography': 'Tipografía',
    'production.visual.aesthetic': 'Estética de Recortes de Revista',
    'production.audio.title': 'Producción de Audio',
    'production.back': 'Volver a Producción',

    // MADLAB Page
    'madlab.title': 'MADLAB - Fase 3',
    'madlab.hero.title': 'MADLAB',
    'madlab.hero.subtitle': 'Laboratorios de innovación sostenible',
    'madlab.what.title': '¿Qué es MADLAB?',
    'madlab.programs.title': 'Programas MADLAB',
    'madlab.timeline.title': 'Impacto Esperado',
    'madlab.sponsors.title': 'Patrocinadores',
    'madlab.sponsors.benefits': 'Beneficios para Patrocinadores',
    'madlab.sponsors.cta': 'Convertirse en Patrocinador',
    'madlab.cta.schools': 'Para Escuelas',
    'madlab.cta.volunteers': 'Para Voluntarios',
    'madlab.cta.facilitator': 'Únete como facilitador o mentor',

    // Podcast Page
    'podcast.title': 'Podcast - Fase 2',
    'podcast.description':
      'MADFAM Podcast: Conversaciones profundas sobre ciencia, tecnología y sostenibilidad',
    'podcast.hero.phase': 'Fase 2: Conexión',
    'podcast.hero.title': 'Podcast MADFAM',
    'podcast.hero.description':
      'Conversaciones de 20-30 minutos con expertos, activistas y visionarios del movimiento solarpunk',
    'podcast.hero.status': 'Estado del Podcast',
    'podcast.status.title': 'Estado del Podcast',
    'podcast.status.date': 'Lanzamiento: Agosto 2025',
    'podcast.coming.title': 'Lo que Viene',
    'podcast.launch.date': 'Agosto 2025',
    'podcast.features.title': 'Lo que Hace Único a Nuestro Podcast',
    'podcast.features.depth.title': 'Contenido Profundo',
    'podcast.features.depth.description':
      'Exploramos temas complejos de sostenibilidad, tecnología y sociedad con profundidad y rigor',
    'podcast.features.experts.title': 'Expertos Invitados',
    'podcast.features.experts.description':
      'Científicos, innovadores, activistas y pensadores que están construyendo el futuro sostenible',
    'podcast.features.practical.title': 'Soluciones Prácticas',
    'podcast.features.practical.description':
      'Cada episodio incluye acciones concretas que los oyentes pueden implementar en su vida diaria',
    'podcast.features.topics.title': 'Temas Relevantes',
    'podcast.features.topics.description':
      'Desde energías renovables hasta economía circular, agricultura urbana y justicia climática',
    'podcast.topics.title': 'Temas que Exploraremos',
    'podcast.topics.urban_farming.title': 'Agricultura Urbana',
    'podcast.topics.urban_farming.description':
      'Cómo cultivar alimentos en la ciudad',
    'podcast.topics.community_energy.title': 'Energía Comunitaria',
    'podcast.topics.community_energy.description':
      'Proyectos de energía renovable participativa',
    'podcast.topics.circular_economy.title': 'Economía Circular',
    'podcast.topics.circular_economy.description':
      'Rediseñando sistemas para eliminar desperdicios',
    'podcast.topics.sustainable_urbanism.title': 'Urbanismo Sostenible',
    'podcast.topics.sustainable_urbanism.description':
      'Ciudades diseñadas para personas y naturaleza',
    'podcast.topics.climate_justice.title': 'Justicia Climática',
    'podcast.topics.climate_justice.description':
      'Equidad social en la transición ecológica',
    'podcast.topics.green_innovation.title': 'Innovación Verde',
    'podcast.topics.green_innovation.description':
      'Tecnologías que regeneran el planeta',
    'podcast.notify.title': 'Sé el primero en escuchar',
    'podcast.notify.description':
      'Suscríbete para recibir notificaciones cuando lancemos el podcast',
    'podcast.notify.placeholder': 'tu@email.com',
    'podcast.notify.aria_label': 'Correo electrónico para notificaciones',
    'podcast.notify.button': 'Notifícame',
    'podcast.cta.title': 'Mientras esperas el podcast...',
    'podcast.cta.description':
      'Comienza con la Fase 1: Nuestros sketches virales que hacen reír mientras educan',
    'podcast.cta.button': 'Ver Sketches',
    'podcast.notify.aria.label': 'Correo electrónico para notificaciones',
    'podcast.notify.cta': 'Notificarme',
    'podcast.notify.alert':
      '¡Gracias! Te notificaremos en {email} cuando lancemos el podcast.',
    'podcast.meanwhile.title': 'Mientras tanto...',
    'podcast.meanwhile.description': 'Disfruta nuestros sketches de la Fase 1',
    'podcast.meanwhile.cta': 'Ver Sketches',

    // Formats Page
    'formats.title': 'Formatos de Contenido',
    'formats.hero.title': 'Nuestros Formatos de Contenido',
    'formats.hero.subtitle': 'Múltiples formas de difundir el mensaje solar',

    // Visual Guide Page
    'visual.guide.title': 'Guía de Estilo Visual',
    'visual.guide.hero.title': 'Identidad Visual',
    'visual.guide.colors.title': 'Paleta de Colores',
    'visual.guide.typography.title': 'Tipografía',
    'visual.guide.aesthetic.title': 'Estética de Recortes de Revista',

    // Resources Page
    'resources.title': 'Recursos',
    'resources.hero.title': 'Recursos Creativos',
    'resources.actors.title': 'Para Actores',
    'resources.creators.title': 'Para Creadores',
    'resources.sponsors.title': 'Para Patrocinadores',

    // Scripts Page
    'scripts.title': 'Guiones',
    'scripts.hero.title': 'Repositorio de Guiones',
    'scripts.hero.description':
      'Episodios diseñados específicamente para cada plataforma, optimizados para contar historias de esperanza y cambio.',
    'scripts.stats.total': 'Episodios Totales',
    'scripts.stats.tiktoks': 'TikToks',
    'scripts.stats.instagram': 'Instagram Reels',
    'scripts.stats.youtube': 'YouTube Videos',
    'scripts.platform.episodes': 'episodios',
    'scripts.actions.read': 'Leer Guión',
    'scripts.resources.title': 'Recursos para Creadores',
    'scripts.resources.description':
      'Descarga plantillas y guías para crear tus propios episodios',
    'scripts.download.tiktok': 'Plantilla TikTok',
    'scripts.download.instagram': 'Plantilla Instagram',
    'scripts.download.guide': 'Guía de Escritura',

    // Universe/World Page
    'universe.title': 'Universo',

    // Production Page
    'production.title': 'Producción',
    'production.hero.title': 'Guía de Producción',
    'production.visual.breadcrumb.home': 'Inicio',
    'production.visual.breadcrumb.production': 'Producción',
    'production.visual.breadcrumb.current': 'Estilo Visual',
    'production.visual.hero.title': 'Guía de Estilo Visual',
    'production.visual.hero.description':
      'Mantén la consistencia estética del universo Testigos de Solarpunk en todas tus creaciones',

    'production.visual.colors.title': 'Paleta de Colores Principal',
    'production.visual.colors.solar.name': 'Amarillo Solar',
    'production.visual.colors.solar.usage':
      'Acentos principales, CTAs, highlights',
    'production.visual.colors.green.name': 'Verde Sostenible',
    'production.visual.colors.green.usage':
      'Elementos naturales, botones secundarios',
    'production.visual.colors.purple.name': 'Púrpura Creativo',
    'production.visual.colors.purple.usage':
      'Elementos artísticos, badges, creatividad',
    'production.visual.colors.blue.name': 'Azul Tecnológico',
    'production.visual.colors.blue.usage': 'Enlaces, elementos tech, datos',
    'production.visual.colors.orange.name': 'Naranja Comunidad',
    'production.visual.colors.orange.usage': 'Elementos sociales, calor humano',

    'production.visual.typography.title': 'Tipografía',
    'production.visual.typography.font': 'Fuente',
    'production.visual.typography.size': 'Tamaño',
    'production.visual.typography.usage': 'Uso',
    'production.visual.typography.main_titles.title': 'Títulos Principales',
    'production.visual.typography.main_titles.usage': 'H1, títulos hero',
    'production.visual.typography.subtitles.title': 'Subtítulos',
    'production.visual.typography.subtitles.usage': 'H2, H3, secciones',
    'production.visual.typography.body.title': 'Texto Cuerpo',
    'production.visual.typography.body.usage': 'Párrafos, contenido',
    'production.visual.typography.code.title': 'Código/Técnico',
    'production.visual.typography.code.usage': 'Códigos, metadatos',

    'production.visual.cutout.title': 'Estética Magazine Cutout',
    'production.visual.cutout.principles.title': 'Principios Clave',
    'production.visual.cutout.principles.borders.title': 'Bordes Irregulares',
    'production.visual.cutout.principles.borders.description':
      'Usa clip-path para crear bordes de papel recortado',
    'production.visual.cutout.principles.textures.title': 'Texturas de Papel',
    'production.visual.cutout.principles.textures.description':
      'Efectos de ruido y grano para simular papel real',
    'production.visual.cutout.principles.shadows.title': 'Sombras Realistas',
    'production.visual.cutout.principles.shadows.description':
      'Drop shadows que simulan papel sobre superficie',
    'production.visual.cutout.principles.colors.title': 'Colores Vibrantes',
    'production.visual.cutout.principles.colors.description':
      'Paleta saturada como revistas de los 70s',
    'production.visual.cutout.example_caption':
      'Ejemplo de emoji con estética cutout',

    'production.visual.references.title': 'Referencias Visuales por Contexto',
    'production.visual.references.urban.title': 'Neo-Cuernavaca Urbano',
    'production.visual.references.urban.item1': 'Arquitectura bioclimática',
    'production.visual.references.urban.item2': 'Jardines verticales',
    'production.visual.references.urban.item3': 'Transporte limpio',
    'production.visual.references.urban.item4': 'Plazas comunitarias',
    'production.visual.references.tech.title': 'Espacios Tecnológicos',
    'production.visual.references.tech.item1': 'Laboratorios bio-tech',
    'production.visual.references.tech.item2': 'Paneles solares integrados',
    'production.visual.references.tech.item3': 'Interfaces holográficas',
    'production.visual.references.tech.item4': 'Diseño minimalista',
    'production.visual.references.wardrobe.title': 'Vestuario Personajes',
    'production.visual.references.wardrobe.item1': 'Materiales sostenibles',
    'production.visual.references.wardrobe.item2': 'Colores tierra + vibrantes',
    'production.visual.references.wardrobe.item3': 'Accesorios tecnológicos',
    'production.visual.references.wardrobe.item4': 'Estilo funcional-estético',

    'production.visual.tokens.title': 'Design Tokens CSS',
    'production.visual.tokens.main_colors': 'Colores Principales',
    'production.visual.tokens.spacing': 'Espaciado',
    'production.visual.tokens.cutout': 'Magazine Cutout',
    'production.visual.tokens.transitions': 'Transiciones',
    'production.visual.back_button': 'Volver a Producción',

    // Common page elements
    'page.back.home': 'Volver a Inicio',
    'page.more.info': 'Más Información',
    'page.coming.soon': 'Próximamente',

    // Error pages
    'error.404.title': '404 - Página no encontrada',
    'error.404.heading': 'Página no encontrada',
    'error.404.message':
      'Parece que esta página se perdió en el multiverso solarpunk...',
    'error.404.home': 'Volver al Inicio',
    'error.404.explore': 'Explorar Personajes',

    // Component labels
    'character.portrait.alt': 'Retrato evangelista de {name}, {occupation}',
    'character.age.label': 'años',
    'character.learn.more': 'Conocer más',
    'theme.toggle.label': 'Cambiar tema',
    'theme.toggle.description': 'Cambiar entre tema claro, oscuro y automático',
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'theme.auto': 'Auto',
    'theme.changed': 'Tema cambiado a {theme}',
    'theme.current': 'Actual: {theme}',

    // Under construction
    'construction.title': '🚧 Próximamente',
    'construction.message':
      'Estamos trabajando en traerte algo increíble. Esta sección estará lista muy pronto.',
    'construction.explore': '¿Qué tal si exploras esto mientras tanto?',
    'construction.back': 'Volver',
    'construction.close': 'Cerrar modal',

    // ARIA labels
    'aria.nav.main': 'Navegación principal',
    'aria.nav.brand': 'Testigos de Solarpunk - Ir a la página principal',
    'aria.logo.alt': 'Testigos de Solarpunk',
    'aria.submenu.content': 'Submenu de Contenido',
    'aria.email.newsletter': 'Email para boletín',
    'aria.duration': 'Duración',
    'aria.views': 'Vistas',
    'aria.watchSketch': 'Ver sketch: {title}',

    // CTAs
    'cta.watch': 'Ver',

    // UI Elements
    'ui.learn.more': 'Conocer más',
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
    'cta.watchSketches': 'Watch Sketches',
    'cta.listen': 'Listen to Podcast',
    'cta.join': 'Join MADLAB',
    'cta.explore': 'Explore',
    'cta.learn': 'Learn More',
    'cta.discover': 'Discover',
    'cta.participate': 'Participate',
    'cta.connect': 'Connect',

    // Characters & Universe
    'characters.title': 'Characters',
    'characters.description': 'Meet the protagonists of the Solarpunk universe',
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
    'characters.breadcrumb.home': 'Home',
    'characters.breadcrumb.characters': 'Characters',
    'characters.section.story': 'Story',
    'characters.section.personality': 'Personality',
    'characters.section.relationships': 'Relationships',
    'characters.section.quotes': 'Memorable Quotes',

    // World/Universe Page
    'world.title': 'World',
    'world.description': 'A sustainable and hopeful future',
    'world.hero.title': 'The World of Solarpunk Witnesses',
    'world.hero.description':
      'A near future where humanity has learned to live in harmony with nature, combining advanced technology with ancestral practices.',
    'world.timeline.title': 'Timeline',
    'world.timeline.2025.title': 'The Awakening',
    'world.timeline.2025.description':
      'First communities adopt distributed solar energy',
    'world.timeline.2030.title': 'The Transition',
    'world.timeline.2030.description':
      "Neo-Cuernavaca becomes Mexico's first carbon-negative city",
    'world.timeline.2035.title': 'The Expansion',
    'world.timeline.2035.description':
      'The solarpunk model replicates in cities across the continent',
    'world.timeline.2040.title': 'The Flourishing',
    'world.timeline.2040.description':
      'New era of global cooperation based on sustainability',
    'world.locations.title': 'Main Locations',
    'world.locations.features': 'Features:',
    'world.locations.explore': 'Explore Location',
    'world.technology.title': 'Key Technologies',
    'world.tech.solar.title': 'Organic Solar Panels',
    'world.tech.solar.description':
      'Biodegradable photovoltaic cells that mimic photosynthesis',
    'world.tech.water.title': 'Atmospheric Capture',
    'world.tech.water.description':
      'Systems that extract drinking water directly from air',
    'world.tech.agriculture.title': 'Vertical Agriculture',
    'world.tech.agriculture.description':
      'Cultivation towers that produce food using 90% less water',
    'world.tech.batteries.title': 'Salt Batteries',
    'world.tech.batteries.description':
      'Energy storage using abundant and non-toxic materials',
    'world.tech.bioconcrete.title': 'Bio-concrete',
    'world.tech.bioconcrete.description':
      'Construction material that self-repairs and purifies air',
    'world.tech.transport.title': 'Magnetic Transport',
    'world.tech.transport.description':
      'Magnetic levitation systems powered by solar energy',
    'world.society.title': 'Society and Culture',
    'world.society.economy.title': 'Circular Economy',
    'world.society.economy.description':
      'Waste from one process becomes resources for another. Garbage is an obsolete concept in the solarpunk world.',
    'world.society.governance.title': 'Participatory Governance',
    'world.society.governance.description':
      'Community decisions are made through local assemblies and digital direct democracy platforms.',
    'world.society.education.title': 'Holistic Education',
    'world.society.education.description':
      'Learning combines technical knowledge with ancestral wisdom, focusing on creative problem solving.',
    'world.society.time.title': 'Quality Time',
    'world.society.time.description':
      'The 25-hour work week allows more time for family, art and personal development.',

    // Green Roof Neo-Cuernavaca Page (English)
    'greenroof.title': 'Green Roof of Neo-Cuernavaca',
    'greenroof.description':
      'Discover the green heart of the city: the community rooftop where technology, nature and hope converge in the solarpunk universe',
    'greenroof.breadcrumb.home': 'Home',
    'greenroof.breadcrumb.world': 'World Building',
    'greenroof.hero.title': 'Green Roof of Neo-Cuernavaca',
    'greenroof.hero.description':
      'The beating heart of the solarpunk revolution: an urban oasis where sustainable technology meets ancestral wisdom to create the future we all deserve.',
    'greenroof.overview.title': 'A New Community Model',
    'greenroof.overview.p1':
      'The Green Roof is not just a physical space; it is a tangible manifestation of solarpunk principles in action. Located in the heart of Neo-Cuernavaca, this 2,500 square meter community rooftop functions as a social laboratory, innovation center and community garden.',
    'greenroof.overview.p2':
      'Here, city dwellers experience firsthand how appropriate technology can improve their lives without sacrificing their connection to nature. It is the place where Sister Panelia performs her most impactful demonstrations and where Brother Compostino teaches the eternal cycles of regeneration.',
    'greenroof.stats.area': 'Square meters',
    'greenroof.stats.plants': 'Native plants',
    'greenroof.stats.renewable': 'Renewable energy',
    'greenroof.stats.visitors': 'Weekly visitors',
    'greenroof.features.title': 'Rooftop Features',
    'greenroof.features.solar.title': 'Solar Energy System',
    'greenroof.features.solar.description':
      "A 50kW installation of state-of-the-art solar panels that not only supplies the rooftop's energy needs, but also powers the community apartment building below.",
    'greenroof.features.solar.feature1': 'High-efficiency bifacial panels',
    'greenroof.features.solar.feature2': 'Battery storage system',
    'greenroof.features.solar.feature3':
      'Smart inverter with real-time monitoring',
    'greenroof.features.solar.feature4': 'Surplus shared with community grid',
    'greenroof.features.gardens.title': 'Vertical Gardens and Orchards',
    'greenroof.features.gardens.description':
      'An integrated urban agriculture system that combines traditional permaculture with modern hydroponics, producing fresh food for more than 50 families in the community.',
    'greenroof.features.gardens.feature1':
      'Automated hydroponic growing towers',
    'greenroof.features.gardens.feature2': 'Raised beds with community compost',
    'greenroof.features.gardens.feature3':
      'Native medicinal and aromatic plants',
    'greenroof.features.gardens.feature4': 'Rainwater collection system',
    'greenroof.features.meeting.title': 'Community Meeting Space',
    'greenroof.features.meeting.description':
      'An outdoor amphitheater built with recycled materials where workshops, presentations and the famous "Sunset Assemblies" are held where the community makes consensus decisions.',
    'greenroof.features.meeting.feature1': 'Capacity for 80 seated people',
    'greenroof.features.meeting.feature2': 'Solar-powered sound system',
    'greenroof.features.meeting.feature3': 'Modular and adaptable stage',
    'greenroof.features.meeting.feature4':
      'Pergola with climbing plants for natural shade',
    'greenroof.features.compost.title': 'Community Composting Center',
    'greenroof.features.compost.description':
      'Brother Compostino\'s domain: a layered composting system that processes organic waste from throughout the neighborhood, transforming it into the "black gold" that feeds the gardens.',
    'greenroof.features.compost.feature1':
      'Three-chamber thermophilic composter',
    'greenroof.features.compost.feature2':
      'Vermicomposting with California worms',
    'greenroof.features.compost.feature3': 'Biodigester for biogas generation',
    'greenroof.features.compost.feature4': 'Weekly home composting workshops',
    'greenroof.dailylife.title': 'A Day on the Green Roof',
    'greenroof.dailylife.6am.title': 'Solar Dawn',
    'greenroof.dailylife.6am.description':
      'The first rays of sun automatically activate the drip irrigation system. Early risers arrive for the "Dawn Ritual": yoga, meditation and plant check before starting the day.',
    'greenroof.dailylife.8am.title': 'Morning Harvest',
    'greenroof.dailylife.8am.description':
      'Participating families pick fresh vegetables for breakfast. Brother Compostino is usually here, teaching about natural cycles while stirring the compost.',
    'greenroof.dailylife.12pm.title': 'Community Lunch',
    'greenroof.dailylife.12pm.description':
      'On Wednesdays and Saturdays a community lunch is organized where everyone contributes something prepared with ingredients from the rooftop. This is when the most stories and knowledge are shared.',
    'greenroof.dailylife.4pm.title': 'Workshops and Demonstrations',
    'greenroof.dailylife.4pm.description':
      "Sister Panelia's favorite time. Here she demonstrates new technologies, explains how solar panels work and teaches others how they can implement similar solutions in their homes.",
    'greenroof.dailylife.6pm.title': 'Sunset Assembly',
    'greenroof.dailylife.6pm.description':
      'On Fridays, the community meets to make important decisions, plan future projects and resolve conflicts collaboratively. It is direct democracy in action.',
    'greenroof.dailylife.8pm.title': 'Starry Nights',
    'greenroof.dailylife.8pm.description':
      'With light pollution reduced through intelligent energy use, nights on the rooftop allow stargazing while sharing stories and dreams for the future.',
    'greenroof.impact.title': 'Real and Measurable Impact',
    'greenroof.impact.energy.number': '65%',
    'greenroof.impact.energy.label': 'Reduction in energy costs',
    'greenroof.impact.energy.description':
      'Building families have seen an average 65% reduction in their electric bills since the solar system installation.',
    'greenroof.impact.co2.number': '2.5 Tons',
    'greenroof.impact.co2.label': 'CO₂ avoided monthly',
    'greenroof.impact.co2.description':
      'The combination of solar energy and composting avoids the emission of 2.5 tons of CO₂ each month.',
    'greenroof.impact.waste.number': '80%',
    'greenroof.impact.waste.label': 'Organic waste processed',
    'greenroof.impact.waste.description':
      "The composting system processes 80% of the neighborhood's organic waste, transforming it into natural fertilizer.",
    'greenroof.impact.food.number': '300kg',
    'greenroof.impact.food.label': 'Fresh food per month',
    'greenroof.impact.food.description':
      'Urban gardens produce 300kg of fresh vegetables and herbs monthly for the community.',
    'greenroof.stories.title': 'Transformation Stories',
    'greenroof.stories.hernandez.title': 'The Hernández Family',
    'greenroof.stories.hernandez.quote':
      '"At first we were skeptical about this solar panel thing," says María Hernández. "But when we saw our electricity bill drop from $2,500 to $800 pesos, and we also have fresh vegetables every week... there\'s no going back."',
    'greenroof.stories.hernandez.impact':
      '$20,400 pesos saved in the first year',
    'greenroof.stories.carlos.title': 'Don Carlos, the Convert',
    'greenroof.stories.carlos.quote':
      "Former climate change skeptic, Don Carlos now leads composting workshops on Saturdays. \"Compostino taught me that 'garbage' is just a word for things we don't know how to use. Now I see opportunities where I used to see problems.\"",
    'greenroof.stories.carlos.impact': '40 families adopted home composting',
    'greenroof.stories.sofia.title': 'Sofía, 8 years old',
    'greenroof.stories.sofia.quote':
      '"I like coming here because the plants tell me secrets," explains Sofía while watering her cherry tomatoes. "And when I grow up, I\'m going to make a rooftop like this all over the city."',
    'greenroof.stories.sofia.impact':
      '25 children participate in weekly educational programs',
    'greenroof.future.title': 'The Seed of the Future',
    'greenroof.future.description':
      'The Green Roof of Neo-Cuernavaca is not a destination, but a starting point. It is living proof that another world is possible: one where technology serves life, where community thrives without destroying the planet, and where every person can be the protagonist of the change they want to see.',
    'greenroof.future.goal1.title': 'Network of 100 Rooftops',
    'greenroof.future.goal1.description':
      'Replicate the model throughout the city by 2027',
    'greenroof.future.goal2.title': 'Energy Independence',
    'greenroof.future.goal2.description':
      '100% renewable self-sufficient neighborhood by 2026',
    'greenroof.future.goal3.title': 'Exportable Model',
    'greenroof.future.goal3.description':
      'Guides and resources available for any community',
    'greenroof.nav.back': 'Back to World',
    'greenroof.nav.characters': 'Meet the Characters',

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
    'impact.hero.subtitle':
      'We measure our success by the smiles generated and the actions inspired',
    'impact.metrics.title': 'Real-Time Metrics',
    'impact.phases.title': 'Impact by Phase',
    'impact.stories.title': 'Change Stories',
    'impact.growth.title': 'Movement Growth',
    'impact.partners.title': 'Change Allies',
    'impact.cta.title': 'Be Part of the Impact',
    'impact.cta.support': 'Support the Project',
    'impact.cta.volunteer': 'Join as Volunteer',
    'impact.cta.subtitle': 'Your support can multiply our reach',

    // Missing impact page translations
    'metrics.people.reached': 'People Reached',
    'metrics.sketches.produced': 'Sketches Produced',
    'metrics.active.communities': 'Active Communities',
    'metrics.perception.change': 'Perception Change',
    'metrics.goal': 'Goal',
    'phase.1.title': 'Phase 1: Attraction',
    'phase.2.title': 'Phase 2: Connection',
    'phase.3.title': 'Phase 3: Conversion',
    'stats.total.views': 'Total Views',
    'stats.engagement.rate': 'Engagement Rate',
    'stats.shares': 'Shares',
    'stats.launch': 'Launch',
    'stats.experts.confirmed': 'Experts Confirmed',
    'stats.preregistrations': 'Pre-registrations',
    'stats.pilot.start': 'Pilot Start',
    'stats.pilot.schools': 'Pilot Schools',
    'stats.students': 'Students',
    'achievements.title': 'Achievements',
    'achievements.phase1.viral': 'Viral on TikTok Mexico',
    'achievements.phase1.influencers': 'Collaboration with 10 influencers',
    'achievements.phase1.trending': 'Trending topic #SolarpunkWitnesses',
    'goals.title': 'Goals',
    'goals.phase2.weekly.episodes': 'Weekly episodes',
    'goals.phase2.discord.community': 'Discord community',
    'goals.phase2.live.events': 'Live events',
    'goals.phase3.schools.first.year': '10 schools first year',
    'goals.phase3.students.impacted': '5,000 students impacted',
    'goals.phase3.replicable.model': 'Replicable model',
    'testimonials.maria':
      'The sketches made me realize I can be sustainable without being perfect. Now composting is part of my daily routine.',
    'testimonials.maria.name': 'Maria, 28 years old',
    'testimonials.roberto':
      'My students now see sustainability as cool thanks to the videos. We started a school garden inspired by you.',
    'testimonials.roberto.name': 'Prof. Roberto',
    'testimonials.carlos':
      "I installed solar panels after watching Brother Voltio's sketch. My electricity bill dropped 80% and now I preach the solar gospel.",
    'testimonials.carlos.name': 'Carlos, 45 years old',
    'growth.chart.caption': 'Monthly community growth',
    'partners.intro': 'Organizations that make our impact possible',
    'partners.sustainable.companies': 'Sustainable Companies',
    'partners.sustainable.companies.desc': 'Financial support and resources',
    'partners.educational.institutions': 'Educational Institutions',
    'partners.educational.institutions.desc': 'Spaces and communities',
    'partners.environmental.ngos': 'Environmental NGOs',
    'partners.environmental.ngos.desc': 'Expertise and networks',
    'partners.content.creators': 'Content Creators',
    'partners.content.creators.desc': 'Message amplification',

    // Content Page translations
    'content.page.description':
      'Explore all content phases of Testigos de Solarpunk: Sketches, Podcast and MADLAB',
    'content.hero.title': 'Testigos de Solarpunk Content',
    'content.hero.subtitle':
      'A three-phase content strategy to connect, raise awareness and create community',
    'phase.1.sketches': 'Phase 1: Sketches',
    'phase.2.podcast': 'Phase 2: Podcast',
    'phase.3.madlab': 'Phase 3: MADLAB',
    'content.phase1.description':
      '60-90 second viral comedy sketches that break cultural barriers about sustainability. With memorable characters and intelligent humor, we bring the ecological message to the masses.',
    'content.phase2.description':
      'MADFAM Podcast delves into 20-30 minute conversations with experts, activists and visionaries. We explore practical and scalable solutions for current environmental challenges.',
    'content.phase3.description':
      'Sustainable innovation laboratories: in-person events and educational experiences in schools that transform communities. We bring theory to practice with workshops and activations.',
    'stats.episodes': 'Episodes',
    'stats.views': 'Views',
    'stats.minutes': 'Minutes',
    'stats.schools': 'Schools',
    'cta.learn.more': 'Learn More',
    'content.strategy.title': 'Comprehensive Content Strategy',
    'strategy.attract': 'Attract',
    'strategy.attract.desc': 'Viral sketches that capture attention',
    'strategy.educate': 'Educate',
    'strategy.educate.desc': 'Podcasts that deepen the message',
    'strategy.activate': 'Activate',
    'strategy.activate.desc': 'Events that generate real change',

    // Resources Page translations
    'resources.title': 'Resources',
    'resources.hero.title': 'Resource Center',
    'resources.hero.subtitle':
      'Tools, guides and materials for creators, sponsors and solarpunk advocates',
    'resources.for.creators': 'For Creators',
    'resources.creators.description':
      'Everything you need to create content in our universe',
    'resources.script.templates': 'Script Templates',
    'resources.script.templates.desc': 'Formats optimized for each platform',
    'resources.character.sheets': 'Character Sheets',
    'resources.character.sheets.desc':
      'Detailed profiles for narrative development',
    'resources.worldbuilding.guide': 'Worldbuilding Guide',
    'resources.worldbuilding.guide.desc':
      'Rules and coherence of the solarpunk universe',
    'resources.for.actors': 'For Actors',
    'resources.actors.description': 'Resources to bring characters to life',
    'resources.character.analysis': 'Character Analysis',
    'resources.character.analysis.desc':
      'Motivations, stories and narrative arcs',
    'resources.dialogue.guides': 'Dialogue Guides',
    'resources.dialogue.guides.desc':
      'Tone, rhythm and style of each character',
    'resources.movement.references': 'Movement References',
    'resources.movement.references.desc': 'Gestures and physical presence',
    'resources.for.sponsors': 'For Sponsors',
    'resources.sponsors.description': 'Collaboration and impact opportunities',
    'resources.impact.report': 'Impact Report',
    'resources.impact.report.desc': 'Reach and engagement metrics',
    'resources.integration.opportunities': 'Integration Opportunities',
    'resources.integration.opportunities.desc':
      'Organic ways to participate in the stories',
    'resources.values.alignment': 'Values Alignment',
    'resources.values.alignment.desc':
      'Philosophy and principles of the project',
    'resources.philosophy.title': 'Solarpunk Philosophy',
    'philosophy.radical.optimism': 'Radical Optimism',
    'philosophy.radical.optimism.desc':
      'We believe a better future is not only possible, but inevitable if we work together.',
    'philosophy.local.action': 'Local Action',
    'philosophy.local.action.desc':
      'Global changes begin with transformations in our communities.',
    'philosophy.appropriate.tech': 'Appropriate Technology',
    'philosophy.appropriate.tech.desc':
      'The best technology is that which solves real problems while respecting the environment.',
    'philosophy.regenerative.diversity': 'Regenerative Diversity',
    'philosophy.regenerative.diversity.desc':
      'Strength comes from the diversity of voices, cultures and solutions.',
    'resources.downloads.title': 'Quick Downloads',
    'resources.downloads.subtitle': 'Access the most used resources',
    'downloads.character.bible': 'Character Bible',
    'downloads.world.guide': 'World Guide',
    'downloads.press.kit': 'Press Kit',
    'downloads.visual.assets': 'Visual Assets',

    // Unified Project Page translations
    'project.phase1.name': 'Testigos de Solarpunk',
    'units.seconds': 'seconds',
    'phase1.feature1': 'Viral content for social media',
    'phase1.feature2': 'Humor that breaks cultural barriers',
    'phase1.feature3': 'Practical sustainability tips',

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
    'podcast.description':
      'MADFAM Podcast: Deep conversations about science, technology and sustainability',
    'podcast.hero.phase': 'Phase 2: Connection',
    'podcast.hero.title': 'MADFAM Podcast',
    'podcast.hero.description':
      '20-30 minute conversations with experts, activists and visionaries of the solarpunk movement',
    'podcast.hero.status': 'Podcast Status',
    'podcast.status.title': 'Podcast Status',
    'podcast.status.date': 'Launch: August 2025',
    'podcast.coming.title': "What's Coming",
    'podcast.launch.date': 'August 2025',
    'podcast.features.title': 'What Makes Our Podcast Unique',
    'podcast.features.depth.title': 'Deep Content',
    'podcast.features.depth.description':
      'We explore complex topics of sustainability, technology and society with depth and rigor',
    'podcast.features.experts.title': 'Expert Guests',
    'podcast.features.experts.description':
      'Scientists, innovators, activists and thinkers who are building the sustainable future',
    'podcast.features.practical.title': 'Practical Solutions',
    'podcast.features.practical.description':
      'Each episode includes concrete actions that listeners can implement in their daily lives',
    'podcast.features.topics.title': 'Relevant Topics',
    'podcast.features.topics.description':
      'From renewable energy to circular economy, urban agriculture and climate justice',
    'podcast.topics.title': "Topics We'll Explore",
    'podcast.topics.urban_farming.title': 'Urban Farming',
    'podcast.topics.urban_farming.description': 'How to grow food in the city',
    'podcast.topics.community_energy.title': 'Community Energy',
    'podcast.topics.community_energy.description':
      'Participatory renewable energy projects',
    'podcast.topics.circular_economy.title': 'Circular Economy',
    'podcast.topics.circular_economy.description':
      'Redesigning systems to eliminate waste',
    'podcast.topics.sustainable_urbanism.title': 'Sustainable Urbanism',
    'podcast.topics.sustainable_urbanism.description':
      'Cities designed for people and nature',
    'podcast.topics.climate_justice.title': 'Climate Justice',
    'podcast.topics.climate_justice.description':
      'Social equity in the ecological transition',
    'podcast.topics.green_innovation.title': 'Green Innovation',
    'podcast.topics.green_innovation.description':
      'Technologies that regenerate the planet',
    'podcast.notify.title': 'Be the first to listen',
    'podcast.notify.description':
      'Subscribe to receive notifications when we launch the podcast',
    'podcast.notify.placeholder': 'your@email.com',
    'podcast.notify.aria_label': 'Email for notifications',
    'podcast.notify.button': 'Notify Me',
    'podcast.cta.title': 'While you wait for the podcast...',
    'podcast.cta.description':
      'Start with Phase 1: Our viral sketches that make you laugh while educating',
    'podcast.cta.button': 'Watch Sketches',
    'podcast.notify.aria.label': 'Email for notifications',
    'podcast.notify.cta': 'Notify Me',
    'podcast.notify.alert':
      'Thank you! We will notify you at {email} when we launch the podcast.',
    'podcast.meanwhile.title': 'Meanwhile...',
    'podcast.meanwhile.description': 'Enjoy our Phase 1 sketches',
    'podcast.meanwhile.cta': 'Watch Sketches',

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

    // Scripts Page
    'scripts.title': 'Scripts',
    'scripts.hero.title': 'Scripts Repository',
    'scripts.hero.description':
      'Episodes designed specifically for each platform, optimized to tell stories of hope and change.',
    'scripts.stats.total': 'Total Episodes',
    'scripts.stats.tiktoks': 'TikToks',
    'scripts.stats.instagram': 'Instagram Reels',
    'scripts.stats.youtube': 'YouTube Videos',
    'scripts.platform.episodes': 'episodes',
    'scripts.actions.read': 'Read Script',
    'scripts.resources.title': 'Resources for Creators',
    'scripts.resources.description':
      'Download templates and guides to create your own episodes',
    'scripts.download.tiktok': 'TikTok Template',
    'scripts.download.instagram': 'Instagram Template',
    'scripts.download.guide': 'Writing Guide',

    // Universe/World Page
    'universe.title': 'Universe',

    // Production Page
    'production.title': 'Production',
    'production.hero.title': 'Production Guide',
    'production.visual.breadcrumb.home': 'Home',
    'production.visual.breadcrumb.production': 'Production',
    'production.visual.breadcrumb.current': 'Visual Style',
    'production.visual.hero.title': 'Visual Style Guide',
    'production.visual.hero.description':
      'Maintain aesthetic consistency of the Solarpunk Witnesses universe in all your creations',

    'production.visual.colors.title': 'Main Color Palette',
    'production.visual.colors.solar.name': 'Solar Yellow',
    'production.visual.colors.solar.usage': 'Main accents, CTAs, highlights',
    'production.visual.colors.green.name': 'Sustainable Green',
    'production.visual.colors.green.usage':
      'Natural elements, secondary buttons',
    'production.visual.colors.purple.name': 'Creative Purple',
    'production.visual.colors.purple.usage':
      'Artistic elements, badges, creativity',
    'production.visual.colors.blue.name': 'Technological Blue',
    'production.visual.colors.blue.usage': 'Links, tech elements, data',
    'production.visual.colors.orange.name': 'Community Orange',
    'production.visual.colors.orange.usage': 'Social elements, human warmth',

    'production.visual.typography.title': 'Typography',
    'production.visual.typography.font': 'Font',
    'production.visual.typography.size': 'Size',
    'production.visual.typography.usage': 'Usage',
    'production.visual.typography.main_titles.title': 'Main Titles',
    'production.visual.typography.main_titles.usage': 'H1, hero titles',
    'production.visual.typography.subtitles.title': 'Subtitles',
    'production.visual.typography.subtitles.usage': 'H2, H3, sections',
    'production.visual.typography.body.title': 'Body Text',
    'production.visual.typography.body.usage': 'Paragraphs, content',
    'production.visual.typography.code.title': 'Code/Technical',
    'production.visual.typography.code.usage': 'Codes, metadata',

    'production.visual.cutout.title': 'Magazine Cutout Aesthetic',
    'production.visual.cutout.principles.title': 'Key Principles',
    'production.visual.cutout.principles.borders.title': 'Irregular Borders',
    'production.visual.cutout.principles.borders.description':
      'Use clip-path to create cut paper borders',
    'production.visual.cutout.principles.textures.title': 'Paper Textures',
    'production.visual.cutout.principles.textures.description':
      'Noise and grain effects to simulate real paper',
    'production.visual.cutout.principles.shadows.title': 'Realistic Shadows',
    'production.visual.cutout.principles.shadows.description':
      'Drop shadows that simulate paper on surface',
    'production.visual.cutout.principles.colors.title': 'Vibrant Colors',
    'production.visual.cutout.principles.colors.description':
      'Saturated palette like 70s magazines',
    'production.visual.cutout.example_caption':
      'Example of emoji with cutout aesthetic',

    'production.visual.references.title': 'Visual References by Context',
    'production.visual.references.urban.title': 'Neo-Cuernavaca Urban',
    'production.visual.references.urban.item1': 'Bioclimatic architecture',
    'production.visual.references.urban.item2': 'Vertical gardens',
    'production.visual.references.urban.item3': 'Clean transportation',
    'production.visual.references.urban.item4': 'Community plazas',
    'production.visual.references.tech.title': 'Technological Spaces',
    'production.visual.references.tech.item1': 'Bio-tech laboratories',
    'production.visual.references.tech.item2': 'Integrated solar panels',
    'production.visual.references.tech.item3': 'Holographic interfaces',
    'production.visual.references.tech.item4': 'Minimalist design',
    'production.visual.references.wardrobe.title': 'Character Wardrobe',
    'production.visual.references.wardrobe.item1': 'Sustainable materials',
    'production.visual.references.wardrobe.item2': 'Earth + vibrant colors',
    'production.visual.references.wardrobe.item3': 'Technological accessories',
    'production.visual.references.wardrobe.item4': 'Functional-aesthetic style',

    'production.visual.tokens.title': 'CSS Design Tokens',
    'production.visual.tokens.main_colors': 'Main Colors',
    'production.visual.tokens.spacing': 'Spacing',
    'production.visual.tokens.cutout': 'Magazine Cutout',
    'production.visual.tokens.transitions': 'Transitions',
    'production.visual.back_button': 'Back to Production',

    // Common page elements
    'page.back.home': 'Back to Home',
    'page.more.info': 'More Information',
    'page.coming.soon': 'Coming Soon',

    // Error pages
    'error.404.title': '404 - Page not found',
    'error.404.heading': 'Page not found',
    'error.404.message':
      'It seems this page got lost in the solarpunk multiverse...',
    'error.404.home': 'Back to Home',
    'error.404.explore': 'Explore Characters',

    // Component labels
    'character.portrait.alt': 'Evangelist portrait of {name}, {occupation}',
    'character.age.label': 'years old',
    'character.learn.more': 'Learn more',
    'theme.toggle.label': 'Toggle theme',
    'theme.toggle.description': 'Switch between light, dark, and auto themes',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.auto': 'Auto',
    'theme.changed': 'Theme changed to {theme}',
    'theme.current': 'Current: {theme}',

    // Under construction
    'construction.title': '🚧 Coming Soon',
    'construction.message':
      "We're working on bringing you something amazing. This section will be ready very soon.",
    'construction.explore': 'How about exploring this in the meantime?',
    'construction.back': 'Go Back',
    'construction.close': 'Close modal',

    // ARIA labels
    'aria.nav.main': 'Main navigation',
    'aria.nav.brand': 'Solarpunk Witnesses - Go to homepage',
    'aria.logo.alt': 'Solarpunk Witnesses',
    'aria.submenu.content': 'Content Submenu',
    'aria.email.newsletter': 'Email for newsletter',
    'aria.duration': 'Duration',
    'aria.views': 'Views',
    'aria.watchSketch': 'Watch sketch: {title}',

    // CTAs
    'cta.watch': 'Watch',

    // UI Elements
    'ui.learn.more': 'Learn more',
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
  return function t(
    key: keyof (typeof ui)['es'] | keyof (typeof ui)['en'],
    params?: Record<string, string | number>
  ): string {
    const translation = ui[lang]?.[key as keyof (typeof ui)[typeof lang]] as
      | string
      | undefined;
    let result = '';

    if (translation !== undefined && translation.length > 0) {
      result = translation;
    } else {
      const defaultTranslation =
        ui[defaultLang][key as keyof (typeof ui)[typeof defaultLang]];
      result =
        defaultTranslation !== undefined && defaultTranslation.length > 0
          ? defaultTranslation
          : key;
    }

    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        result = result.replace(
          new RegExp(`\\{${paramKey}\\}`, 'g'),
          String(value)
        );
      });
    }

    return result;
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

  // Add trailing slash to match Astro's trailingSlash: 'always' configuration
  const fullPath = `/${lang}/${translatedSegments.join('/')}`;
  return fullPath.endsWith('/') ? fullPath : `${fullPath}/`;
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
