# 🔍 Testigos de Solarpunk - Routing Audit Report

## Summary

This audit identifies all routing issues, broken links, and missing page translations in the Testigos de Solarpunk website.

## 🚨 Critical Issues Found

### 1. English Sitemap Route Mismatches

The English sitemap (`/src/pages/en/sitemap.astro`) contains incorrect routes that don't match the actual file structure:

#### ❌ Broken Links in English Sitemap:

- `${basePath}/en/proyecto/` → Should be `${basePath}/en/project/`
- `${basePath}/en/proyecto-unified/` → Should be `${basePath}/en/unified-project/`
- `${basePath}/en/contenido/` → Should be `${basePath}/en/content/`
- `${basePath}/en/contenido/sketches/` → Already correct as `/en/content/sketches/`
- `${basePath}/en/personajes/` → Should be `${basePath}/en/characters/`
- `${basePath}/en/comunidad/` → Should be `${basePath}/en/community/`
- `${basePath}/en/mundo/` → Should be `${basePath}/en/world/`
- `${basePath}/en/filosofia/` → Should be `${basePath}/en/philosophy/`
- `${basePath}/en/guia-visual/` → Should be `${basePath}/en/visual-guide/`
- `${basePath}/en/formatos/` → Should be `${basePath}/en/formats/`
- `${basePath}/en/guiones/` → Should be `${basePath}/en/scripts/`
- `${basePath}/en/produccion/` → Should be `${basePath}/en/production/`
- `${basePath}/en/recursos/` → Should be `${basePath}/en/resources/`
- `${basePath}/en/impacto/` → Should be `${basePath}/en/impact/`

### 2. Navigation Menu Issues

The navigation menu in `BaseLayout.astro` uses the `getLangPath()` function correctly, but the production submenu has inconsistent route naming:

#### ❌ Production Submenu Route Issues:

- Spanish: `/es/produccion/estilo-visual/`
- English: Should translate to `/en/production/visual-style/` but actual file is at `/en/production/visual-style.astro`
- Spanish: `/es/produccion/tono-voz/`
- English: Should translate to `/en/production/tone-voice/` but actual file is at `/en/production/tone-voice.astro`

### 3. Missing Page Pairs (ES/EN)

Based on file structure analysis:

#### ✅ Complete Page Pairs:

- `/es/index.astro` ↔ `/en/index.astro`
- `/es/proyecto.astro` ↔ `/en/project.astro`
- `/es/comunidad.astro` ↔ `/en/community.astro`
- `/es/impacto.astro` ↔ `/en/impact.astro`
- `/es/sitemap.astro` ↔ `/en/sitemap.astro`
- All content pages (sketches, podcast, madlab)
- All production pages
- All resources subsections

#### ❌ Missing English Page:

- `/es/equipo/` → No `/en/team/` directory or page found

### 4. Footer Link Issues

The footer in `BaseLayout.astro` contains hardcoded Spanish text and some potentially broken links:

#### Issues Found:

- All footer headings are in Spanish regardless of language
- Footer links text is in Spanish for both languages
- No sitemap link in footer
- Missing translations for footer content

### 5. Route Configuration vs Actual Files

#### Routes defined in config but missing pages:

- `equipo` / `team` - Route defined but no page files exist

#### Actual pages without route configuration:

- `/es/proyecto-unified.astro` and `/en/unified-project.astro` - Not in route config
- World subsection pages like `/es/mundo/azotea-verde-neo-cuernavaca.astro`

## 📋 Complete Route Mapping

### Spanish Routes (ES)

```
/es/
/es/proyecto/
/es/proyecto-unified/
/es/contenido/
/es/contenido/sketches/
/es/contenido/podcast/
/es/contenido/madlab/
/es/personajes/
/es/personajes/[slug]
/es/mundo/
/es/mundo/azotea-verde-neo-cuernavaca/
/es/guiones/
/es/guiones/[slug]
/es/comunidad/
/es/produccion/
/es/produccion/estilo-visual/
/es/produccion/tono-voz/
/es/produccion/audio/
/es/produccion/specs/
/es/recursos/
/es/recursos/actores/
/es/recursos/actores/personajes/
/es/recursos/actores/dialogo/
/es/recursos/actores/movimiento/
/es/recursos/creadores/
/es/recursos/creadores/personajes/
/es/recursos/creadores/plantillas/
/es/recursos/creadores/worldbuilding/
/es/recursos/patrocinadores/
/es/recursos/patrocinadores/valores/
/es/recursos/patrocinadores/impacto/
/es/recursos/patrocinadores/integracion/
/es/filosofia/
/es/guia-visual/
/es/formatos/
/es/impacto/
/es/sitemap/
```

### English Routes (EN)

```
/en/
/en/project/
/en/unified-project/
/en/content/
/en/content/sketches/
/en/content/podcast/
/en/content/madlab/
/en/characters/
/en/characters/[slug]
/en/world/
/en/world/green-roof-neo-cuernavaca/
/en/scripts/
/en/scripts/[slug]
/en/community/
/en/production/
/en/production/visual-style/
/en/production/tone-voice/
/en/production/audio/
/en/production/specs/
/en/resources/
/en/resources/actors/
/en/resources/actors/characters/
/en/resources/actors/dialogue/
/en/resources/actors/movement/
/en/resources/creators/
/en/resources/creators/characters/
/en/resources/creators/templates/
/en/resources/creators/worldbuilding/
/en/resources/sponsors/
/en/resources/sponsors/values/
/en/resources/sponsors/impact/
/en/resources/sponsors/integration/
/en/philosophy/
/en/visual-guide/
/en/formats/
/en/impact/
/en/sitemap/
```

## 🔧 Recommended Fixes

### 1. Fix English Sitemap Routes

Update `/src/pages/en/sitemap.astro` to use correct English routes matching the actual file structure.

### 2. Add Missing Team Page

Either:

- Create `/src/pages/en/team/index.astro` and `/src/pages/es/equipo/index.astro`
- Or remove the team route from configuration

### 3. Fix Footer Translations

- Add translation keys for footer headings and links
- Ensure footer content changes based on current language
- Add sitemap link to footer

### 4. Update Route Configuration

- Add missing routes for unified project pages
- Remove or implement missing team route

### 5. Implement Automated Route Testing

Create a script to automatically verify:

- All defined routes have corresponding page files
- All pages have translations in both languages
- No broken internal links exist

## 🎯 Action Items

1. **Immediate**: Fix English sitemap routes to prevent 404 errors
2. **High Priority**: Add missing translations for footer
3. **Medium Priority**: Implement missing team page or remove from config
4. **Low Priority**: Add sitemap link to footer
5. **Future**: Implement automated route testing in CI/CD pipeline
