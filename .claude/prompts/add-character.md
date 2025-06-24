# Prompt: Añadir Nuevo Personaje

## Objetivo
Crear un nuevo personaje para el universo Testigos de Solarpunk siguiendo las convenciones establecidas.

## Pasos a Seguir

1. **Crear archivo YAML** en `src/content/characters/[nombre-personaje].yaml`

2. **Estructura requerida del personaje**:
```yaml
# Información básica (obligatoria)
nombre: "[Nombre Completo]"
titulo: "[Título Evangelista Ecológico]"
slug: "[nombre-url-friendly]"
descripcion_corta: "[Descripción en una línea]"
rol_principal: "[Protagonista|Antagonista|Secundario|Cameo]"
edad: [número]
ocupacion: "[Ocupación con toque evangelista]"

# Características (obligatorias)
habilidades:
  - "[Habilidad ecológica/técnica]"
  - "[Habilidad social/evangelista]"
  - "[Habilidad única/signature]"

valores:
  - "[Valor solarpunk]"
  - "[Valor comunitario]"

# Elementos evangelistas paródicos (obligatorios)
cita_biblica_parodia: "[Adaptación humorística con mensaje ecológico]"
sermon_ecologico: |
  [Sermón característico del personaje, 2-3 párrafos]

milagro_verde_signature: "[Transformación ecológica característica]"

# Apariencia y estilo (obligatorio)
apariencia:
  vestimenta: "[Descripción de ropa eco-evangelista]"
  rasgos_distintivos: "[Características físicas notables]"
  gadget_sagrado: "[Herramienta tecnológica-espiritual]"

# Backstory (obligatorio)
historia_origen: |
  [Historia de conversión ecológica del personaje, 2-3 párrafos]

momento_conversion: "[Evento específico que los cambió]"

# Relaciones (opcional)
relaciones:
  - nombre: "[Nombre de otro personaje]"
    tipo: "[Mentor|Discípulo|Rival|Aliado]"
    descripcion: "[Breve descripción de la relación]"

# Contenido viral (obligatorio)
frases_iconicas:
  - "[Frase pegajosa 1]"
  - "[Frase pegajosa 2]"
  - "[Frase pegajosa 3]"

momento_viral_signature: "[Acción que siempre genera reacciones]"

# Datos de producción (opcional)
primera_aparicion: "[Episodio donde debuta]"
episodios_principales:
  - "[EP001-TT: Título]"
  - "[EP005-YT: Título]"

# Metadata para buscadores (opcional)
tags:
  - "[tag1]"
  - "[tag2]"
seo_description: "[Descripción optimizada para búsquedas]"
```

3. **Validar que el personaje**:
   - Tenga un nombre memorable y temático
   - Su título refleje su rol evangelista-ecológico
   - Las habilidades mezclen lo técnico con lo espiritual
   - La cita bíblica paródica sea humorística pero respetuosa
   - El milagro signature sea visual y viral
   - La historia de origen incluya una transformación clara

4. **Añadir imagen** (si está disponible):
   - Guardar en `src/assets/images/characters/[slug].webp`
   - Formato: WebP, 800x800px mínimo
   - Optimizada para web (<100KB ideal)

5. **Actualizar índice** (si existe):
   - Añadir referencia en cualquier listado de personajes
   - Actualizar contadores o estadísticas

## Ejemplos de Nombres y Títulos

### Protagonistas
- Hermana Panelia - La Profeta de los Paneles Sagrados
- Hermano Compostino - El Mesías del Compost Divino
- Hermana Eólica - La Evangelista del Viento Santo

### Secundarios  
- Diácono Reciclón - El Guardián de los Materiales Benditos
- Madre Huerta - La Cultivadora de Milagros Verdes
- Padre Lluvia - El Recolector de Agua Celestial

### Antagonistas Convertibles
- CEO Petrolero - El Magnate Arrepentido
- Doctora Plástica - La Científica Redimida
- Banquero Carbón - El Financiero Iluminado

## Verificaciones Finales

- [ ] El archivo YAML es válido y sigue el schema
- [ ] El personaje encaja con el tono del universo
- [ ] Los elementos evangelistas son humorísticos pero respetuosos
- [ ] Tiene al menos 3 frases icónicas potencialmente virales
- [ ] Su milagro signature es visual y filmable
- [ ] La historia de origen es inspiradora
- [ ] No hay elementos ofensivos o divisivos

## Comando de Verificación
```bash
npm run lint
npm run type-check
```

Si todo está correcto, el personaje estará disponible automáticamente en el sitio.