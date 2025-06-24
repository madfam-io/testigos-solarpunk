# 🌟 Testigos de Solarpunk - Guía para Claude

## Contexto del Proyecto

Este es el sitio web del universo narrativo "Testigos de Solarpunk", una iniciativa de MADFAM que documenta personajes, guiones y el mundo de una narrativa solarpunk evangelista paródica para creadores de contenido, actores y patrocinadores.

### Filosofía del Proyecto

- **Tema**: Parodia evangelista mezclada con valores solarpunk
- **Tono**: Humorístico pero respetuoso, esperanzador y comunitario
- **Propósito**: Crear contenido viral que promueva la sostenibilidad

## Arquitectura Técnica

- **Framework**: Astro 5.x con renderizado estático
- **Estilos**: CSS puro con design tokens MADFAM
- **Contenido**: Colecciones de Astro (YAML/Markdown)
- **Deployment**: GitHub Pages con CI/CD automatizado
- **Testing**: Vitest con cobertura >90%
- **Calidad**: ESLint + Prettier + Husky

## Estructura del Proyecto

```
src/
├── components/     # Componentes Astro reutilizables
├── content/        # Contenido estructurado (personajes, guiones, etc.)
├── layouts/        # Layouts principales
├── pages/          # Páginas del sitio
├── styles/         # Estilos globales y tokens
└── lib/           # Utilidades y constantes
```

## Convenciones de Código

1. **Componentes**: PascalCase, archivo .astro
2. **Utilidades**: camelCase, archivos .ts
3. **Estilos**: BEM para clases, tokens CSS para valores
4. **Contenido**: YAML para datos, Markdown para narrativas
5. **Commits**: Conventional Commits (feat, fix, docs, etc.)

## Comandos Útiles

```bash
npm run dev          # Desarrollo local con hot reload
npm run build        # Construir para producción
npm run preview      # Vista previa de producción
npm run check:all    # Verificar calidad del código
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run format       # Formatear código
npm run lint:fix     # Corregir problemas de linting
```

## Tareas Comunes

### Añadir un Personaje Nuevo

1. Crear archivo en `src/content/characters/nombre-personaje.yaml`
2. Seguir el schema definido en `src/content/config.ts`
3. Incluir campos evangelistas paródicos como `cita_biblica_parodia`
4. Añadir imagen en `src/assets/images/characters/`

### Crear un Guión

1. Crear archivo en `src/content/scripts/EPXXX-PLATAFORMA.md`
2. Usar frontmatter con metadata del episodio
3. Incluir elementos evangelistas y solarpunk
4. Marcar momentos virales con `[VIRAL]`

### Optimizar Rendimiento

1. Ejecutar `npm run lighthouse`
2. Revisar métricas en `.lighthouseci/`
3. Optimizar según recomendaciones
4. Objetivo: 100 en todas las métricas

## Características Especiales

### Elementos Evangelistas Paródicos

- **Personajes**: Tienen títulos como "Hermana/Hermano"
- **Citas**: Parodias de textos bíblicos con temas solarpunk
- **Sermones**: Mensajes ecológicos en formato predicación
- **Milagros Verdes**: Transformaciones ecológicas presentadas como milagros

### Integración MADFAM

- **Colores**: Amarillo (#FFC107), Verde (#4CAF50), Púrpura (#663399)
- **Tipografía**: Poppins (principal), Space Mono (código)
- **Valores**: Innovación, Sostenibilidad, Comunidad

## Estándares de Calidad

- **Performance**: Lighthouse Score 100
- **Accesibilidad**: WCAG AAA
- **SEO**: Optimizado para búsquedas
- **Tests**: Cobertura >90%
- **Seguridad**: Headers CSP configurados

## Flujo de Trabajo

1. **Desarrollo**: Crear rama feature, desarrollar, testear
2. **Review**: PR con checks automáticos
3. **Deploy**: Merge a main despliega automáticamente

## Recursos Adicionales

- [Documentación de Astro](https://docs.astro.build)
- [Guía de Contenido](./content-guide.md)
- [Arquitectura Detallada](./architecture.md)
- [Convenciones Detalladas](./conventions.md)

## Contacto y Soporte

- **Issues**: GitHub Issues para bugs y features
- **Discusiones**: GitHub Discussions para ideas
- **Email**: contacto@madfam.io

---

💡 **Tip**: Usa los prompts en `/prompts` para tareas específicas.
