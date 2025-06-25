# 🌱 Testigos de Solarpunk - Proyecto MADFAM

[![Build Status](https://github.com/madfam-io/testigos-solarpunk/workflows/CI/badge.svg)](https://github.com/madfam-io/testigos-solarpunk/actions)
[![Accessibility](https://img.shields.io/badge/WCAG-AAA-green.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Testigos de Solarpunk** es un universo narrativo evangelista ecológico de MADFAM que conecta, concientiza y crea comunidad a través del humor sostenible. Utilizando una estrategia innovadora de contenido de 3 fases, transformamos la percepción sobre la sostenibilidad con sketches virales, podcasts educativos y experiencias de aprendizaje inmersivas.

> 🎭 **DIY Magazine Cutout Aesthetic**: Todos los emojis del sitio tienen un estilo de recorte de revista que refleja nuestra filosofía DIY y evangelista solar.

## 🚀 Estrategia de 3 Fases

### 🎭 Fase 1: Atracción (En Producción)

- **Sketches virales** de 60-90 segundos que rompen barreras culturales
- **Humor accesible** que conecta con los pain points de la audiencia
- **Contenido para redes sociales** optimizado para compartir

### 🎙️ Fase 2: Conexión (Próximamente)

- **Podcast MADFAM** con expertos en sostenibilidad
- **Conversaciones profundas** sobre soluciones prácticas
- **Comunidad activa** en Discord y eventos en vivo

### 🔬 Fase 3: Conversión (En Desarrollo)

- **MADLAB**: Experiencias educativas en escuelas
- **Programas inmersivos**: Solar Lab, Green Hackers, Huerto Futuro
- **Impacto directo** en comunidades escolares

## 🎯 Objetivos del Proyecto

1. **Conectar** con audiencias masivas a través del humor
2. **Concientizar** sobre sostenibilidad sin sermones
3. **Crear Comunidad** de agentes de cambio positivo
4. **Transformar percepciones** sobre la vida sostenible
5. **Generar impacto medible** en comunidades escolares

## 📁 Estructura del Proyecto

```
testigos-solarpunk/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Página principal
│   │   ├── proyecto.astro           # Estrategia y misión
│   │   ├── contenido/
│   │   │   ├── sketches.astro       # Fase 1: Galería de sketches
│   │   │   ├── podcast.astro        # Fase 2: Podcast (próximamente)
│   │   │   └── madlab.astro         # Fase 3: Programas educativos
│   │   ├── personajes.astro         # Universo: Personajes
│   │   ├── mundo.astro              # Universo: Construcción del mundo
│   │   ├── guiones.astro            # Universo: Guiones
│   │   ├── comunidad.astro          # Buyer personas y comunidad
│   │   ├── produccion.astro         # Guía de producción
│   │   ├── impacto.astro            # Métricas y resultados
│   │   └── otros/                   # Páginas adicionales
│   ├── components/                  # Componentes reutilizables
│   ├── layouts/                     # Layouts base
│   └── styles/                      # Estilos globales
├── public/                          # Archivos estáticos
└── tests/                           # Suite de pruebas
```

## 🚀 Quick Start

```bash
# Clonar el repositorio
git clone https://github.com/madfam-io/testigos-solarpunk.git
cd testigos-solarpunk

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Visita [http://localhost:4321/testigos-solarpunk/](http://localhost:4321/testigos-solarpunk/) para ver el sitio en acción.

## 🛠️ Instalación y Desarrollo

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn (se recomienda npm)
- Git

### 🏗️ Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# El servidor estará disponible en http://localhost:4321/testigos-solarpunk/

# Para desarrollo local sin base path (URLs más simples)
npm run dev:local
# El servidor estará disponible en http://localhost:4321/

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Verificar código
npm run lint
npm run typecheck

# Ejecutar pruebas
npm test
```

## 🎬 Navegación Principal

- **El Proyecto**: Misión, visión y estrategia de 3 fases
- **Contenido**: Sketches, Podcast y MADLAB
- **Universo**: Personajes, mundo y guiones
- **Comunidad**: Buyer personas y participación
- **Producción**: Guías y estándares creativos
- **Impacto**: Métricas y resultados del proyecto

## 🛠️ Tech Stack

- **Framework**: [Astro.js](https://astro.build) - Arquitectura de islas para máximo rendimiento
- **Styling**: CSS nativo con design tokens personalizados + Magazine Cutout Emojis
- **TypeScript**: Tipado estricto para mayor calidad de código
- **Testing**: Vitest + Playwright para pruebas unitarias y E2E
- **Deployment**: GitHub Pages con Actions automatizadas
- **PWA**: Service Worker y manifest para experiencia nativa

## 📊 Impacto Actual

- **500K+** vistas en redes sociales
- **25** sketches producidos
- **89%** cambio positivo en percepción sobre sostenibilidad
- **5** comunidades activas
- **WCAG AAA** compliance para accesibilidad
- **95%** Lighthouse performance score

## 🌐 Deployment

El sitio está configurado para desplegarse automáticamente en GitHub Pages cuando se hace push a la rama `main`. Visita [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) para más detalles sobre la configuración.

## 🤝 Contribuir

¡Bienvenidas todas las contribuciones! Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Para más detalles, consulta [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- A MADFAM por hacer posible este proyecto
- A toda la comunidad solarpunk por la inspiración
- A los contribuidores que hacen crecer el movimiento
- A ti, por creer en el poder del humor para cambiar el mundo

---

_"Conectar, Concientizar y Crear Comunidad"_ - Testigos de Solarpunk
