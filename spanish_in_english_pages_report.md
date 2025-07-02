# Spanish Text Found in English Pages Report

## Summary

I found several instances of Spanish text hardcoded in English pages that should be using translation keys instead. Here are the findings:

## Files with Spanish Text

### 1. `/src/pages/en/content/madlab.astro`

- Line 21: `description="Eventos y experiencias educativas que transforman comunidades"`
- Line 25: `<span class="fase-label">Fase 3: Conversión</span>`
- Line 28-29: `Laboratorios de innovación sostenible: eventos, experiencias y activaciones en escuelas que generan impacto real`
- Line 39: `<span class="stat-label">Escuelas objetivo</span>`
- Line 47: `<span class="stat-label">Estudiantes</span>`
- Line 54: `<span class="stat-label">Impacto directo</span>`
- Line 63: `<h2>¿Qué es MADLAB?</h2>`
- Line 67-74: Full paragraph in Spanish
- Line 77-80: List items in Spanish
- Line 96: `<h2>Programas MADLAB</h2>`
- Line 107-108: Spanish description text
- Line 111-113: Spanish list items
- Line 123-124: Spanish description
- Line 139-140: Spanish description
- Line 155-156: Spanish description
- Line 170: `<h2>Impacto Esperado</h2>`
- Line 200: `<h2>Patrocinadores</h2>`
- Line 202-203: Spanish text
- Line 206: `<h3>Beneficios para Patrocinadores</h3>`
- Line 210: `<h3>Impacto Directo</h3>`
- Line 211: Spanish description
- Line 215: `<h3>Métricas Claras</h3>`
- Line 216: Spanish description
- Line 220: `<h3>Reconocimiento</h3>`
- Line 221: Spanish description
- Line 225: `<h3>Co-creación</h3>`
- Line 226: Spanish description
- Line 235: `Ser Patrocinador`
- Line 245: `<h3>Para Escuelas</h3>`
- Line 246: `<p>¿Quieres llevar MADLAB a tu escuela?</p>`
- Line 247: `<button class="btn btn-secondary">Solicitar Información</button>`
- Line 250: `<h3>Para Voluntarios</h3>`
- Line 251: `<p>Únete como facilitador o mentor</p>`
- Line 253: `Aplicar`

### 2. `/src/pages/en/content/index.astro`

- Line 148: `<span class="stat-label">Impacto</span>`

### 3. `/src/pages/en/project.astro`

- Line 338: `.formato` (CSS class name, but references Spanish word)

### 4. `/src/pages/en/unified-project.astro`

- Line 94-97: Spanish content in phase 2 description
- Line 104-106: Spanish list items
- Line 119-120: Spanish description
- Line 127-129: Spanish list items
- Line 141: `<h2>Nuestro Proceso Creativo</h2>`
- Line 145: `<h3>Investigación</h3>`
- Line 147: Spanish description
- Line 152: `<h3>Diseño</h3>`
- Line 153: Spanish description
- Line 157: `<h3>Producción</h3>`
- Line 158: Spanish description
- Line 162: `<h3>Distribución</h3>`
- Line 164: Spanish description
- Line 169: `<h3>Impacto</h3>`
- Line 178: `<h2>¿Listo para ser parte del cambio?</h2>`
- Line 180: Spanish subtitle

### 5. `/src/pages/en/production/tone-voice.astro`

- Line 346: `Somos parte de una red más grande. Nuestro bienestar está`

### 6. `/src/pages/en/resources/sponsors/values/index.astro`

- Line 461: `Nuestra audiencia tiene derecho a conocer quién financia qué`

### 7. `/src/pages/en/philosophy/index.astro`

- Line 108: `Crear comunidad alrededor de la cultura maker, el pensamiento`

### 8. `/src/pages/en/resources/creators/index.astro`

- Line 52: `Reels, YouTube Shorts, y contenido de formato largo. Estructuras`
- Line 469: `const formato = formatos[Math.floor(Math.random() * formatos.length)];`

### 9. `/src/pages/en/resources/sponsors/integration/index.astro`

- Line 181: `Nuestra audiencia se convierte en tu laboratorio de innovación,`

### 10. `/src/pages/en/resources/sponsors/impact/index.astro`

- Line 329: `Impacto Social Medible`
- Line 354: `<h3>Impacto Económico</h3>`
- Line 375: `<h3>Impacto Ambiental</h3>`

## Recommendations

1. **High Priority**: The `/src/pages/en/content/madlab.astro` file has the most Spanish content and needs immediate attention.
2. **Medium Priority**: The `/src/pages/en/unified-project.astro` file has significant Spanish sections that need translation keys.
3. **Low Priority**: Other files have isolated Spanish words or phrases that should also be replaced with translation keys.

## Action Items

1. Create translation keys for all hardcoded Spanish text found in English pages
2. Replace hardcoded text with appropriate `t()` function calls
3. Ensure the Spanish translations exist in the Spanish locale files
4. Test both English and Spanish versions to ensure proper rendering

## Notes on Special Cases

- Some Spanish words like "formato" appear in CSS class names or JavaScript variable names. These are acceptable as they are internal code identifiers.
- The word "Impacto" appears frequently and should definitely have a translation key like `t('impact.label')` or similar.
- Full paragraphs and descriptions in Spanish need to be extracted into proper translation keys.
