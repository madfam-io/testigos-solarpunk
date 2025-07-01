# 🌱 Testigos de Solarpunk | Solarpunk Witnesses

<div align="center">

[Español](#español) | [English](#english)

[![Build Status](https://github.com/madfam-io/testigos-solarpunk/workflows/CI/badge.svg)](https://github.com/madfam-io/testigos-solarpunk/actions)
[![Test Coverage](https://img.shields.io/badge/Coverage-99.73%25-brightgreen)](./TEST_COVERAGE_REPORT.md)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen)](https://pagespeed.web.dev)
[![WCAG](https://img.shields.io/badge/WCAG-AAA-green.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![i18n](https://img.shields.io/badge/i18n-ES%20%7C%20EN-blue)](./docs/i18n.md)
[![Themes](https://img.shields.io/badge/Themes-Light%20%7C%20Dark%20%7C%20Auto-purple)](./docs/themes.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<img src="./public/logo-testigos-solarpunk.png" alt="Testigos de Solarpunk Logo" width="200" />

### _"Conectar, Concientizar y Crear Comunidad"_

</div>

---

## Español

### 🎯 Descripción

**Testigos de Solarpunk** es un universo narrativo evangelista ecológico de MADFAM que conecta, concientiza y crea comunidad a través del humor sostenible. Utilizando una estrategia innovadora de contenido de 3 fases, transformamos la percepción sobre la sostenibilidad con sketches virales, podcasts educativos y experiencias de aprendizaje inmersivas.

> 🎭 **DIY Magazine Cutout Aesthetic**: Todos los emojis del sitio tienen un estilo único de recorte de revista que refleja nuestra filosofía DIY y evangelista solar.

### ✨ Características Principales

- 🌐 **Bilingüe**: Español (principal) e Inglés con enrutamiento dinámico
- 🎨 **Sistema Triple de Temas**: Claro, Oscuro, Automático con persistencia
- ✂️ **Estética Magazine Cutout**: Diseño único con emojis recortados y texturas
- ♿ **Accesibilidad WCAG AAA**: En todos los temas e idiomas
- 🚀 **Performance 100/100**: Lighthouse perfecto en las 6 combinaciones
- 📱 **PWA Ready**: Instalable, offline-first con Service Worker
- 🧪 **Testing Integral**: Matriz 6x con cobertura 99.73%
- 📊 **Analytics Ready**: Preparado para Google Analytics y más

### 🚀 Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/madfam-io/testigos-solarpunk.git
cd testigos-solarpunk

# Instalar dependencias
npm install

# Desarrollo en Español
npm run dev:es

# Desarrollo en Inglés
npm run dev:en

# Desarrollo (detecta idioma del sistema)
npm run dev
```

Visita [http://localhost:4321/testigos-solarpunk/](http://localhost:4321/testigos-solarpunk/)

### 📋 Estrategia de 3 Fases

#### 🎭 Fase 1: Atracción (En Producción)

- **Sketches Virales**: Videos de 60-90 segundos que rompen barreras culturales
- **Humor Accesible**: Conecta con los pain points reales de la audiencia
- **Optimizado para Redes**: Diseñado para compartir y viralizar
- **Producción**: 25+ sketches completados con 500K+ vistas

#### 🎙️ Fase 2: Conexión (Próximamente Q1 2025)

- **Podcast MADFAM**: Conversaciones con expertos en sostenibilidad
- **Formato Híbrido**: Video podcast + clips para redes
- **Comunidad Discord**: Espacio para eco-curiosos
- **Eventos en Vivo**: Meetups y workshops virtuales

#### 🔬 Fase 3: Conversión (En Desarrollo)

- **MADLAB**: Experiencias educativas hands-on en escuelas
- **Programas Inmersivos**:
  - 🌞 Solar Lab: Energía renovable DIY
  - 💻 Green Hackers: Tecnología sostenible
  - 🌱 Huerto Futuro: Agricultura urbana
- **Kits Educativos**: Materiales listos para ensamblar
- **Impacto Medible**: KPIs educativos y de transformación

### 🛠️ Stack Tecnológico

- **Framework**: [Astro.js](https://astro.build) v5.0 - Arquitectura de islas
- **Estilos**: CSS nativo con design tokens + Magazine Cutout System
- **i18n**: Sistema propio con enrutamiento dinámico y detección automática
- **Temas**: Triple sistema con persistencia y transiciones < 50ms
- **TypeScript**: Tipado estricto con 100% de cobertura
- **Testing**: Vitest + Playwright con matriz 6x (idioma × tema)
- **CI/CD**: GitHub Actions con despliegue automático
- **Deployment**: GitHub Pages / Vercel ready
- **PWA**: Service Worker con estrategia offline-first

### 📁 Estructura del Proyecto

```
testigos-solarpunk/
├── src/
│   ├── i18n/                    # Sistema de internacionalización
│   │   ├── config.ts            # Configuración de idiomas
│   │   └── translations.ts      # Traducciones UI
│   │
│   ├── themes/                  # Sistema de temas
│   │   ├── theme-manager.ts    # Gestor de temas
│   │   └── tokens.ts           # Design tokens
│   │
│   ├── components/
│   │   ├── [Component].astro   # Componentes i18n-aware
│   │   └── README.md           # Catálogo de componentes
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro    # Layout principal responsive
│   │
│   ├── pages/
│   │   ├── [lang]/             # Rutas por idioma
│   │   └── api/                # API endpoints
│   │
│   └── content/                # Contenido multilingüe
│       └── [collection]/
│           ├── es/
│           └── en/
│
├── public/                     # Assets estáticos optimizados
├── scripts/                    # Scripts de build y health checks
├── tests/                      # Suite completa de pruebas
└── docs/                       # Documentación exhaustiva
```

### 🎬 Secciones Principales

- **[El Proyecto](./src/pages/proyecto.astro)**: Misión, visión y estrategia completa
- **[Contenido](./src/pages/contenido/)**: Sketches, Podcast y MADLAB
- **[Universo](./src/pages/mundo.astro)**: Worldbuilding y narrativa
- **[Personajes](./src/pages/personajes.astro)**: Cast de eco-evangelistas
- **[Comunidad](./src/pages/comunidad.astro)**: Buyer personas y engagement
- **[Producción](./src/pages/produccion.astro)**: Guías creativas y técnicas
- **[Impacto](./src/pages/impacto.astro)**: Métricas y resultados

### 📊 Métricas de Impacto

- **500K+** vistas totales en redes sociales
- **25** sketches producidos y publicados
- **89%** cambio positivo en percepción sobre sostenibilidad
- **5** comunidades activas participando
- **100/100** Lighthouse en todas las métricas
- **WCAG AAA** compliance verificado
- **99.73%** cobertura de tests

### 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Test de matriz completa (6 combinaciones)
npm run test:matrix

# Tests de accesibilidad
npm run test:a11y

# Tests de performance
npm run test:lighthouse

# Reporte de cobertura
npm run test:coverage
```

### 🚀 Deployment

```bash
# Build para producción (GitHub Pages)
npm run build

# Build para Vercel
npm run build:vercel

# Preview local del build
npm run preview

# Deploy automático en push a main
# Ver .github/workflows/deploy.yml
```

### 🤝 Contribuir

¡Todas las contribuciones son bienvenidas! Por favor:

1. Lee [CONTRIBUTING.md](CONTRIBUTING.md) para guías detalladas
2. Fork el repositorio
3. Crea una rama (`git checkout -b feature/amazing-feature`)
4. Commit con convención (`git commit -m 'feat: add amazing feature'`)
5. Push (`git push origin feature/amazing-feature`)
6. Abre un Pull Request

### 📚 Documentación

- [Arquitectura](./ARCHITECTURE.md) - Diseño del sistema
- [Desarrollo](./DEVELOPMENT.md) - Guía de desarrollo
- [i18n](./docs/i18n.md) - Sistema de internacionalización
- [Temas](./docs/themes.md) - Sistema de temas
- [Testing](./docs/TESTING.md) - Estrategia de pruebas
- [API](./API_REFERENCE.md) - Referencia de APIs
- [Deployment](./DEPLOYMENT.md) - Guía de despliegue

---

## English

### 🎯 Description

**Solarpunk Witnesses** is MADFAM's ecological evangelism narrative universe that connects, raises awareness, and creates community through sustainable humor. Using an innovative 3-phase content strategy, we transform perceptions about sustainability with viral sketches, educational podcasts, and immersive learning experiences.

> 🎭 **DIY Magazine Cutout Aesthetic**: All site emojis feature a unique magazine cutout style reflecting our DIY and solar evangelist philosophy.

### ✨ Key Features

- 🌐 **Bilingual**: Spanish (primary) and English with dynamic routing
- 🎨 **Triple Theme System**: Light, Dark, Auto with persistence
- ✂️ **Magazine Cutout Aesthetic**: Unique design with cutout emojis and textures
- ♿ **WCAG AAA Accessibility**: Across all themes and languages
- 🚀 **100/100 Performance**: Perfect Lighthouse in all 6 combinations
- 📱 **PWA Ready**: Installable, offline-first with Service Worker
- 🧪 **Comprehensive Testing**: 6x matrix with 99.73% coverage
- 📊 **Analytics Ready**: Prepared for Google Analytics and more

### 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/madfam-io/testigos-solarpunk.git
cd testigos-solarpunk

# Install dependencies
npm install

# Development in Spanish
npm run dev:es

# Development in English
npm run dev:en

# Development (detects system language)
npm run dev
```

Visit [http://localhost:4321/testigos-solarpunk/](http://localhost:4321/testigos-solarpunk/)

### 📋 3-Phase Strategy

#### 🎭 Phase 1: Attraction (In Production)

- **Viral Sketches**: 60-90 second videos breaking cultural barriers
- **Accessible Humor**: Connects with audience's real pain points
- **Social Optimized**: Designed to share and go viral
- **Production**: 25+ sketches completed with 500K+ views

#### 🎙️ Phase 2: Connection (Coming Q1 2025)

- **MADFAM Podcast**: Conversations with sustainability experts
- **Hybrid Format**: Video podcast + social media clips
- **Discord Community**: Space for eco-curious minds
- **Live Events**: Virtual meetups and workshops

#### 🔬 Phase 3: Conversion (In Development)

- **MADLAB**: Hands-on educational experiences in schools
- **Immersive Programs**:
  - 🌞 Solar Lab: DIY renewable energy
  - 💻 Green Hackers: Sustainable technology
  - 🌱 Future Garden: Urban agriculture
- **Educational Kits**: Ready-to-assemble materials
- **Measurable Impact**: Educational and transformation KPIs

### 🛠️ Tech Stack

- **Framework**: [Astro.js](https://astro.build) v5.0 - Islands architecture
- **Styling**: Native CSS with design tokens + Magazine Cutout System
- **i18n**: Custom system with dynamic routing and auto-detection
- **Themes**: Triple system with persistence and < 50ms transitions
- **TypeScript**: Strict typing with 100% coverage
- **Testing**: Vitest + Playwright with 6x matrix (language × theme)
- **CI/CD**: GitHub Actions with automatic deployment
- **Deployment**: GitHub Pages / Vercel ready
- **PWA**: Service Worker with offline-first strategy

### 📁 Project Structure

```
testigos-solarpunk/
├── src/
│   ├── i18n/                    # Internationalization system
│   │   ├── config.ts            # Language configuration
│   │   └── translations.ts      # UI translations
│   │
│   ├── themes/                  # Theme system
│   │   ├── theme-manager.ts    # Theme manager
│   │   └── tokens.ts           # Design tokens
│   │
│   ├── components/
│   │   ├── [Component].astro   # i18n-aware components
│   │   └── README.md           # Component catalog
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro    # Main responsive layout
│   │
│   ├── pages/
│   │   ├── [lang]/             # Language-based routes
│   │   └── api/                # API endpoints
│   │
│   └── content/                # Multilingual content
│       └── [collection]/
│           ├── es/
│           └── en/
│
├── public/                     # Optimized static assets
├── scripts/                    # Build and health check scripts
├── tests/                      # Complete test suite
└── docs/                       # Comprehensive documentation
```

### 🎬 Main Sections

- **[The Project](./src/pages/en/project.astro)**: Mission, vision, and complete strategy
- **[Content](./src/pages/en/content/)**: Sketches, Podcast, and MADLAB
- **[Universe](./src/pages/en/world.astro)**: Worldbuilding and narrative
- **[Characters](./src/pages/en/characters.astro)**: Cast of eco-evangelists
- **[Community](./src/pages/en/community.astro)**: Buyer personas and engagement
- **[Production](./src/pages/en/production.astro)**: Creative and technical guides
- **[Impact](./src/pages/en/impact.astro)**: Metrics and results

### 📊 Impact Metrics

- **500K+** total social media views
- **25** sketches produced and published
- **89%** positive change in sustainability perception
- **5** active participating communities
- **100/100** Lighthouse across all metrics
- **WCAG AAA** verified compliance
- **99.73%** test coverage

### 🧪 Testing

```bash
# Run all tests
npm test

# Full matrix test (6 combinations)
npm run test:matrix

# Accessibility tests
npm run test:a11y

# Performance tests
npm run test:lighthouse

# Coverage report
npm run test:coverage
```

### 🚀 Deployment

```bash
# Build for production (GitHub Pages)
npm run build

# Build for Vercel
npm run build:vercel

# Local build preview
npm run preview

# Automatic deploy on push to main
# See .github/workflows/deploy.yml
```

### 🤝 Contributing

All contributions are welcome! Please:

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guides
2. Fork the repository
3. Create a branch (`git checkout -b feature/amazing-feature`)
4. Commit with convention (`git commit -m 'feat: add amazing feature'`)
5. Push (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### 📚 Documentation

- [Architecture](./ARCHITECTURE.md) - System design
- [Development](./DEVELOPMENT.md) - Development guide
- [i18n](./docs/i18n.md) - Internationalization system
- [Themes](./docs/themes.md) - Theme system
- [Testing](./docs/TESTING.md) - Testing strategy
- [API](./API_REFERENCE.md) - API reference
- [Deployment](./DEPLOYMENT.md) - Deployment guide

---

## 📄 License | Licencia

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Acknowledgments | Agradecimientos

- **MADFAM** for making this project possible / por hacer posible este proyecto
- **Solarpunk Community** for the inspiration / por la inspiración
- **Contributors** growing the movement / haciendo crecer el movimiento
- **You** for believing in humor's power to change the world / por creer en el poder del humor para cambiar el mundo

---

<div align="center">

### _"Conectar, Concientizar y Crear Comunidad"_

### _"Connect, Raise Awareness, and Create Community"_

**Testigos de Solarpunk** - A MADFAM Project

[Website](https://testigos-solarpunk.madfam.mx) | [Discord](https://discord.gg/madfam) | [Twitter](https://twitter.com/madfam_mx)

</div>
