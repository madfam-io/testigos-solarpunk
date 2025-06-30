/**
 * @fileoverview Astro Content Collections Configuration
 *
 * Defines the schema and validation for all content collections in the project.
 * Uses Zod for runtime type validation and ensures content consistency.
 *
 * Collections:
 * - characters: Character profiles and relationships
 * - scripts: Episode scripts with metadata
 * - locations: World-building location data
 * - resources: Downloadable guides and references
 *
 * @module content/config
 */

import { defineCollection, z } from 'astro:content';

/**
 * Character collection schema
 *
 * Stores detailed character profiles for the Solarpunk universe.
 * Data files in YAML/JSON format for easy editing.
 */
const charactersCollection = defineCollection({
  type: 'data',
  schema: z.object({
    /** Character's full name */
    nombre: z.string(),
    /** Role in the universe (evangelista, converso, etc.) */
    rol: z.string(),
    /** Age in years */
    edad: z.number(),
    /** Preferred pronouns */
    pronombres: z.string(),
    /** Current occupation/job */
    ocupacion: z.string(),
    /** List of personality traits */
    rasgos: z.array(z.string()),
    /** Background story/biography */
    historia: z.string(),
    /** Relationships with other characters */
    relaciones: z.array(
      z.object({
        /** Related character's ID */
        personaje: z.string(),
        /** Relationship type (amigo, rival, mentor, etc.) */
        tipo: z.string(),
        /** Description of the relationship dynamic */
        descripcion: z.string(),
      })
    ),
    /** Featured episode IDs */
    episodios_destacados: z.array(z.string()),
    /** Character development arc by season */
    evolucion: z.object({
      temporada1: z.string().optional(),
      temporada2: z.string().optional(),
      temporada3: z.string().optional(),
    }),
    /** Visual design references/mood board URLs */
    referencias_visuales: z.array(z.string()).optional(),
  }),
});

/**
 * Scripts collection schema
 *
 * Episode scripts with full content and metadata.
 * Markdown files with frontmatter for script management.
 */
const scriptsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    /** Episode identifier (e.g., "S01E01") */
    episodio: z.string(),
    /** Episode title */
    titulo: z.string(),
    /** Target social media platform */
    plataforma: z.enum(['TikTok', 'Instagram', 'YouTube', 'Facebook']),
    /** Video duration (e.g., "2:30") */
    duracion: z.string(),
    /** Character IDs appearing in episode */
    personajes: z.array(z.string()),
    /** Thematic tags for categorization */
    temas: z.array(z.string()),
    /** Location ID where episode takes place */
    ubicacion: z.string(),
    /** Publication or filming date */
    fecha: z.date(),
    /** Production workflow status */
    estado: z.enum(['borrador', 'revision', 'aprobado', 'filmado']),
  }),
});

/**
 * Locations collection schema
 *
 * World-building location data for the Solarpunk CDMX universe.
 * Defines important places where stories take place.
 */
const locationsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    /** Location name */
    nombre: z.string(),
    /** Location type (parque, iglesia, mercado, etc.) */
    tipo: z.string(),
    /** CDMX district/neighborhood */
    distrito: z.string(),
    /** Detailed description of the location */
    descripcion: z.string(),
    /** Notable features and landmarks */
    caracteristicas: z.array(z.string()),
    /** Narrative importance and symbolism */
    importancia: z.string(),
    /** Episode IDs where location appears */
    aparece_en: z.array(z.string()),
    /** Visual references and mood board URLs */
    referencias_visuales: z.array(z.string()).optional(),
  }),
});

/**
 * Resources collection schema
 *
 * Downloadable guides, templates, and reference materials.
 * Markdown content with optional file attachments.
 */
const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    /** Resource title */
    titulo: z.string(),
    /** Resource category for organization */
    categoria: z.enum([
      'guia', // How-to guides
      'plantilla', // Templates for creators
      'referencia', // Reference documents
      'filosofia', // Philosophy and worldbuilding
    ]),
    /** Brief description of resource contents */
    descripcion: z.string(),
    /** Optional download file path */
    archivo_descarga: z.string().optional(),
  }),
});

/**
 * Export all content collections
 *
 * These collections are automatically processed by Astro
 * and available through the Content Collections API.
 *
 * @example
 * ```typescript
 * import { getCollection } from 'astro:content';
 * const allCharacters = await getCollection('characters');
 * ```
 */
export const collections = {
  characters: charactersCollection,
  scripts: scriptsCollection,
  locations: locationsCollection,
  resources: resourcesCollection,
};
