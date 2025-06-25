# Reporte de Accesibilidad

Fecha: 2025-06-25T00:19:46.033Z

## Resumen

- **Issues críticos**: 6
- **Advertencias**: 20
- **Verificaciones pasadas**: 6
- **Nivel WCAG**: Fails

## Issues Críticos

- **missing-skip-link**: Falta skip link para saltar al contenido principal (src/layouts/BaseLayout.astro)
- **dropdown-no-aria**: Dropdown sin atributos ARIA apropiados (aria-expanded, aria-haspopup) (src/layouts/BaseLayout.astro)
- **low-contrast**: Bordes sobre fondo: ratio 1.74:1 (mínimo 3:1)
- **no-focus-visible**: No se encontraron estilos :focus-visible para navegación por teclado
- **no-skip-link-styles**: No se encontraron estilos para skip links
- **no-sr-only**: No se encontró clase .sr-only para contenido de screen readers

## Advertencias

- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/contenido/madlab.astro)
- **heading-skip**: Salto en jerarquía de headings: h1 a h3 (src/pages/contenido/podcast.astro)
- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/contenido/podcast.astro)
- **heading-skip**: Salto en jerarquía de headings: h1 a h3 (src/pages/contenido/sketches.astro)
- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/filosofia/index.astro)
- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/filosofia/index.astro)
- **heading-skip**: Salto en jerarquía de headings: h1 a h3 (src/pages/formatos/index.astro)
- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/guia-visual/index.astro)
- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/guia-visual/index.astro)
- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/guia-visual/index.astro)
- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/guia-visual/index.astro)
- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/guia-visual/index.astro)
- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/impacto.astro)
- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/index.astro)
- **heading-skip**: Salto en jerarquía de headings: h1 a h3 (src/pages/proyecto.astro)
- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/proyecto.astro)
- **heading-skip**: Salto en jerarquía de headings: h2 a h4 (src/pages/recursos/index.astro)
- **unsafe-blank-link**: Enlace con target="\_blank" sin rel="noopener noreferrer" (src/layouts/BaseLayout.astro)
- **required-no-aria**: Campo requerido sin aria-required="true" (src/pages/comunidad.astro)
- **required-no-aria**: Campo requerido sin aria-required="true" (src/pages/contenido/podcast.astro)

## Recomendaciones

- Implementar skip links en el layout principal
- Añadir estilos :focus-visible para todos los elementos interactivos
- Crear utilidad .sr-only para contenido de screen readers
- Añadir ARIA labels a todos los elementos interactivos
- Implementar navegación por teclado en dropdowns
- Verificar y ajustar contrastes de color para WCAG AAA
