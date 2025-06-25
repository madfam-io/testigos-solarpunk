# 🤖 Guía para Asistentes AI - Testigos de Solarpunk

Esta guía está diseñada para asistentes AI (como Claude) que trabajen en el proyecto Testigos de Solarpunk. Proporciona contexto importante y comandos esenciales para mantener la calidad del código.

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

## ⚠️ Consideraciones Importantes

- **NO** crees archivos de documentación (README, etc.) a menos que se solicite explícitamente
- **SIEMPRE** verifica que el código pase linting y tests
- **MANTÉN** consistencia con el estilo existente del proyecto
- **CONSIDERA** el impacto en las 3 fases de contenido

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
