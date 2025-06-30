# 🤖 Guía para Asistentes AI - Testigos de Solarpunk

Esta guía está diseñada para asistentes AI (como Claude) que trabajen en el proyecto Testigos de Solarpunk. Proporciona contexto importante y comandos esenciales para mantener la calidad del código.

## 🎭 DIY Magazine Cutout Aesthetic

**IMPORTANTE**: El proyecto implementa un sistema completo de emojis con estética de "recortes de revista DIY":

- **CSS**: `/src/styles/emoji-magazine-cutout.css` (347 líneas) - Sistema completo implementado
- **Importado en**: `BaseLayout.astro` para aplicación site-wide
- **Clases aplicadas**: 50+ instancias en navegación, héroes, tarjetas, botones
- **Efectos**: Bordes irregulares con `clip-path`, texturas de papel, animaciones flutter
- **Temas**: Solar, verde, púrpura, comunidad con colores específicos
- **Tamaños**: `emoji-sm`, `emoji-md`, `emoji-lg`, `emoji-xl`
- **Contextos**: `emoji-nav`, `emoji-hero`, `emoji-card`, `emoji-button`

Al trabajar con emojis, SIEMPRE usar las clases del sistema magazine cutout.

## 📋 Contexto del Proyecto

Testigos de Solarpunk es un proyecto de MADFAM que utiliza una estrategia de contenido de 3 fases para transformar la percepción sobre sostenibilidad:

1. **Fase 1 - Atracción**: Sketches virales de humor (En Producción)
2. **Fase 2 - Conexión**: Podcast educativo (Próximamente)
3. **Fase 3 - Conversión**: Experiencias MADLAB en escuelas (En Desarrollo)

## 🏗️ Arquitectura Técnica

- **Framework**: Astro.js con TypeScript
- **Styling**: CSS con design tokens personalizados
- **Testing**: Vitest + Playwright
- **Deployment**: GitHub Pages

## ✅ Comandos Esenciales

Siempre ejecuta estos comandos antes de hacer commit:

```bash
# Verificar formato y linting
npm run lint

# Verificar tipos de TypeScript
npm run typecheck

# Ejecutar todas las pruebas
npm test

# Verificación completa (recomendado)
npm run check:all
```

### Comandos de Release (cuando sea apropiado)

```bash
# Commit normal (NO genera release)
git commit -m "fix: corregir typo en navegación"

# Patch release - Feature completa
git commit -m "release: agregar sistema de notificaciones push"

# Minor release - Conjunto de features
git commit -m "feat!: lanzar plataforma de contenido fase 2"

# Major release - Cambios fundamentales
git commit -m "feat: migrar a nueva arquitectura

BREAKING CHANGE: APIs completamente rediseñadas"
```

## 📁 Estructura Clave

```
src/
├── pages/
│   ├── proyecto.astro      # Estrategia 3 fases
│   ├── contenido/         # Páginas por fase
│   ├── comunidad.astro    # Buyer personas
│   └── impacto.astro      # Métricas
├── components/            # Componentes reutilizables
└── styles/               # Estilos globales
```

## 🎨 Convenciones de Código

### TypeScript/JavaScript

- Usa tipos explícitos siempre
- Evita `any`, usa tipos específicos
- Documenta funciones con JSDoc

### Astro Components

- Props tipadas con interfaces
- Componentes con nombres descriptivos
- Un componente por archivo

### CSS

- Usa variables CSS del design system
- Mobile-first approach
- Evita `!important`

## 🌟 Buyer Personas

Al crear contenido, considera estos perfiles:

1. **Gaby** - La ecoestresada (33 años)
2. **Carlos** - El escéptico práctico (45 años)
3. **Mari** - La influencer consciente (28 años)
4. **Tomás** - El papá millennial (35 años)
5. **Lucía** - La maestra innovadora (42 años)

## 🚀 Flujo de Trabajo

1. **Antes de empezar**: Lee el issue/requisito completo
2. **Durante desarrollo**: Ejecuta `npm run dev` para ver cambios
3. **Antes de commit**: Ejecuta `npm run check:all`
4. **Al finalizar**: Verifica que todos los tests pasen

## 🎯 Estrategia de Versionado y Releases

**IMPORTANTE**: Este proyecto usa una estrategia de releases controlada. NO todos los commits generan releases automáticamente.

### Criterios de Versionado

- **Patch (0.0.1)**: Features completas implementadas por AI (componentes nuevos, páginas, servicios)
- **Minor (0.1.0)**: Conjuntos de features relacionadas completadas (sistema completo)
- **Major (1.0.0)**: Cambios arquitectónicos transformadores o breaking changes

### Cómo Triggear Releases

```bash
# Para patch release (0.0.1) - Feature individual
git commit -m "release: implementar sistema de gestión de personajes"

# Para minor release (0.1.0) - Conjunto de features
git commit -m "feat!: completar fase 1 - plataforma de sketches virales"

# O incluir MINOR RELEASE en el body
git commit -m "feat: implementación de plataforma de podcast

MINOR RELEASE: Sistema completo de gestión de podcast con reproductor"

# Para major release (1.0.0) - Cambios fundamentales
git commit -m "feat: nueva arquitectura de plataforma

BREAKING CHANGE: Reescritura completa de la plataforma"
```

### Release Manual

También puedes usar el workflow manual:

1. Ve a Actions → Manual Release en GitHub
2. Selecciona el tipo de versión (patch/minor/major)
3. Agrega notas de release (opcional)
4. Ejecuta el workflow

### ⚠️ Commits que NO Generan Releases

- `fix:` - Correcciones menores
- `docs:` - Actualizaciones de documentación
- `style:` - Cambios de formato
- `test:` - Adiciones/cambios de tests
- `chore:` - Tareas de mantenimiento
- Commits sin prefijos convencionales

### Mejores Prácticas

- Acumula cambios pequeños sin generar releases
- Cada versión debe representar valor real
- Usa releases manuales para control explícito
- Documenta en el commit de release qué se incluye

## 🌐 Navegación en Desarrollo Local

Cuando ejecutes el servidor de desarrollo con `npm run dev`, el sitio estará disponible en:

```
http://localhost:4321/testigos-solarpunk/
```

**Importante**: Todas las URLs incluyen el prefijo `/testigos-solarpunk` debido a la configuración de GitHub Pages. Para navegar correctamente:

- Inicio: `http://localhost:4321/testigos-solarpunk/`
- Proyecto: `http://localhost:4321/testigos-solarpunk/proyecto/`
- Sketches: `http://localhost:4321/testigos-solarpunk/contenido/sketches/`
- Podcast: `http://localhost:4321/testigos-solarpunk/contenido/podcast/`
- Comunidad: `http://localhost:4321/testigos-solarpunk/comunidad/`

Si encuentras errores 404, asegúrate de:

1. Incluir el prefijo completo `/testigos-solarpunk` en la URL
2. Agregar la barra final `/` (trailing slash)

## ⚠️ Consideraciones Importantes

- **NO** crees archivos de documentación (README, etc.) a menos que se solicite explícitamente
- **NO** triggees releases para cambios menores (usa commits normales sin `release:`)
- **SIEMPRE** verifica que el código pase linting y tests
- **MANTÉN** consistencia con el estilo existente del proyecto
- **CONSIDERA** el impacto en las 3 fases de contenido
- **ACUMULA** cambios pequeños antes de crear un release
- **USA** `release:` solo cuando completes una feature significativa

## 📊 Métricas de Calidad

El proyecto mantiene estos estándares:

- Coverage de tests: >80%
- Sin errores de TypeScript
- Sin warnings de linting
- Bundle size: <400KB

## 🔗 Enlaces Útiles

- [Astro Docs](https://docs.astro.build)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Proyecto en GitHub](https://github.com/madfam-io/testigos-solarpunk)

---

_"Conectar, Concientizar y Crear Comunidad"_ - MADFAM
