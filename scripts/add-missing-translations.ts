#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'src/i18n/config.ts');
const configContent = fs.readFileSync(configPath, 'utf-8');

// Missing English translations
const missingEnglish = {
  'resources.actors.title': 'For Actors',
  'resources.creators.title': 'For Creators',
  'resources.sponsors.title': 'For Sponsors',
};

// Missing Spanish translations
const missingSpanish = {
  'impact.cta.subtitle': 'Tu apoyo puede multiplicar nuestro alcance',
  'metrics.people.reached': 'Personas Alcanzadas',
  'metrics.sketches.produced': 'Sketches Producidos',
  'metrics.active.communities': 'Comunidades Activas',
  'metrics.perception.change': 'Cambio de Percepción',
  'metrics.goal': 'Meta',
  'phase.1.title': 'Fase 1: Atracción',
  'phase.2.title': 'Fase 2: Conexión',
  'phase.3.title': 'Fase 3: Conversión',
  'stats.total.views': 'Vistas Totales',
  'stats.engagement.rate': 'Tasa de Engagement',
  'stats.shares': 'Compartidos',
  'stats.launch': 'Lanzamiento',
  'stats.experts.confirmed': 'Expertos Confirmados',
  'stats.preregistrations': 'Pre-registros',
  'stats.pilot.start': 'Inicio Piloto',
  'stats.pilot.schools': 'Escuelas Piloto',
  'stats.students': 'Estudiantes',
  'achievements.title': 'Logros',
  'achievements.phase1.viral': 'Viral en TikTok México',
  'achievements.phase1.influencers': 'Colaboración con 10 influencers',
  'achievements.phase1.trending': 'Trending topic #TestigosDeSolarpunk',
  'goals.title': 'Objetivos',
  'goals.phase2.weekly.episodes': 'Episodios semanales',
  'goals.phase2.discord.community': 'Comunidad Discord',
  'goals.phase2.live.events': 'Eventos en vivo',
  'goals.phase3.schools.first.year': '10 escuelas primer año',
  'goals.phase3.students.impacted': '5,000 estudiantes impactados',
  'goals.phase3.replicable.model': 'Modelo replicable',
  'testimonials.maria':
    'Los sketches me hicieron ver que puedo ser sostenible sin ser perfecta. Ahora la composta es parte de mi rutina diaria.',
  'testimonials.maria.name': 'María, 28 años',
  'testimonials.roberto':
    'Mis estudiantes ahora ven la sostenibilidad como algo cool gracias a los videos. Empezamos un huerto escolar inspirados en ustedes.',
  'testimonials.roberto.name': 'Prof. Roberto',
  'testimonials.carlos':
    'Instalé paneles solares después de ver el sketch del Hermano Voltio. Mi recibo de luz bajó 80% y ahora predico el evangelio solar.',
  'testimonials.carlos.name': 'Carlos, 45 años',
  'growth.chart.caption': 'Crecimiento mensual de la comunidad',
  'partners.intro': 'Organizaciones que hacen posible nuestro impacto',
  'partners.sustainable.companies': 'Empresas Sostenibles',
  'partners.sustainable.companies.desc': 'Apoyo financiero y recursos',
  'partners.educational.institutions': 'Instituciones Educativas',
  'partners.educational.institutions.desc': 'Espacios y comunidades',
  'partners.environmental.ngos': 'ONGs Ambientales',
  'partners.environmental.ngos.desc': 'Experiencia y redes',
  'partners.content.creators': 'Creadores de Contenido',
  'partners.content.creators.desc': 'Amplificación del mensaje',
  'content.page.description':
    'Explora todas las fases de contenido de Testigos de Solarpunk: Sketches, Podcast y MADLAB',
  'content.hero.title': 'Contenido Testigos de Solarpunk',
  'content.hero.subtitle':
    'Una estrategia de contenido de tres fases para conectar, concientizar y crear comunidad',
  'phase.1.sketches': 'Fase 1: Sketches',
  'phase.2.podcast': 'Fase 2: Podcast',
  'phase.3.madlab': 'Fase 3: MADLAB',
  'content.phase1.description':
    'Sketches cómicos virales de 60-90 segundos que rompen barreras culturales sobre la sostenibilidad. Con personajes memorables y humor inteligente, llevamos el mensaje ecológico a las masas.',
  'content.phase2.description':
    'MADFAM Podcast profundiza en conversaciones de 20-30 minutos con expertos, activistas y visionarios. Exploramos soluciones prácticas y escalables para los desafíos ambientales actuales.',
  'content.phase3.description':
    'Laboratorios de innovación sostenible: eventos presenciales y experiencias educativas en escuelas que transforman comunidades. Llevamos la teoría a la práctica con talleres y activaciones.',
  'stats.episodes': 'Episodios',
  'stats.views': 'Vistas',
  'stats.minutes': 'Minutos',
  'stats.schools': 'Escuelas',
  'cta.learn.more': 'Saber Más',
  'content.strategy.title': 'Estrategia de Contenido Integral',
  'strategy.attract': 'Atraer',
  'strategy.attract.desc': 'Sketches virales que capturan la atención',
  'strategy.educate': 'Educar',
  'strategy.educate.desc': 'Podcasts que profundizan el mensaje',
  'strategy.activate': 'Activar',
  'strategy.activate.desc': 'Eventos que generan cambio real',
  'resources.hero.subtitle':
    'Herramientas, guías y materiales para creadores, patrocinadores y defensores del solarpunk',
  'resources.for.creators': 'Para Creadores',
  'resources.creators.description':
    'Todo lo que necesitas para crear contenido en nuestro universo',
  'resources.script.templates': 'Plantillas de Guiones',
  'resources.script.templates.desc':
    'Formatos optimizados para cada plataforma',
  'resources.character.sheets': 'Fichas de Personajes',
  'resources.character.sheets.desc':
    'Perfiles detallados para desarrollo narrativo',
  'resources.worldbuilding.guide': 'Guía de Worldbuilding',
  'resources.worldbuilding.guide.desc':
    'Reglas y coherencia del universo solarpunk',
  'resources.for.actors': 'Para Actores',
  'resources.actors.description': 'Recursos para dar vida a los personajes',
  'resources.character.analysis': 'Análisis de Personajes',
  'resources.character.analysis.desc':
    'Motivaciones, historias y arcos narrativos',
  'resources.dialogue.guides': 'Guías de Diálogo',
  'resources.dialogue.guides.desc': 'Tono, ritmo y estilo de cada personaje',
  'resources.movement.references': 'Referencias de Movimiento',
  'resources.movement.references.desc': 'Gestos y presencia física',
  'resources.for.sponsors': 'Para Patrocinadores',
  'resources.sponsors.description': 'Oportunidades de colaboración e impacto',
  'resources.impact.report': 'Reporte de Impacto',
  'resources.impact.report.desc': 'Métricas de alcance y engagement',
  'resources.integration.opportunities': 'Oportunidades de Integración',
  'resources.integration.opportunities.desc':
    'Formas orgánicas de participar en las historias',
  'resources.values.alignment': 'Alineación de Valores',
  'resources.values.alignment.desc': 'Filosofía y principios del proyecto',
  'resources.philosophy.title': 'Filosofía Solarpunk',
  'philosophy.radical.optimism': 'Optimismo Radical',
  'philosophy.radical.optimism.desc':
    'Creemos que un futuro mejor no solo es posible, sino inevitable si trabajamos juntos.',
  'philosophy.local.action': 'Acción Local',
  'philosophy.local.action.desc':
    'Los cambios globales comienzan con transformaciones en nuestras comunidades.',
  'philosophy.appropriate.tech': 'Tecnología Apropiada',
  'philosophy.appropriate.tech.desc':
    'La mejor tecnología es aquella que resuelve problemas reales respetando el ambiente.',
  'philosophy.regenerative.diversity': 'Diversidad Regenerativa',
  'philosophy.regenerative.diversity.desc':
    'La fuerza viene de la diversidad de voces, culturas y soluciones.',
  'resources.downloads.title': 'Descargas Rápidas',
  'resources.downloads.subtitle': 'Accede a los recursos más utilizados',
  'downloads.character.bible': 'Biblia de Personajes',
  'downloads.world.guide': 'Guía del Mundo',
  'downloads.press.kit': 'Kit de Prensa',
  'downloads.visual.assets': 'Assets Visuales',
  'project.phase1.name': 'Testigos de Solarpunk',
  'units.seconds': 'segundos',
  'phase1.feature1': 'Contenido viral para redes sociales',
  'phase1.feature2': 'Humor que rompe barreras culturales',
  'phase1.feature3': 'Tips prácticos de sostenibilidad',
};

console.log('Adding missing translations to i18n config...');
console.log(
  `English translations to add: ${Object.keys(missingEnglish).length}`
);
console.log(
  `Spanish translations to add: ${Object.keys(missingSpanish).length}`
);

// This script outputs the translations to be manually added to the config file
console.log('\n=== Add these to the English section ===\n');
Object.entries(missingEnglish).forEach(([key, value]) => {
  console.log(`    '${key}': '${value}',`);
});

console.log('\n=== Add these to the Spanish section ===\n');
Object.entries(missingSpanish).forEach(([key, value]) => {
  console.log(`    '${key}': '${value}',`);
});
