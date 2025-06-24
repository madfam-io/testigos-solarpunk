import { defineCollection, z } from 'astro:content';

const charactersCollection = defineCollection({
  type: 'data',
  schema: z.object({
    nombre: z.string(),
    rol: z.string(),
    edad: z.number(),
    pronombres: z.string(),
    ocupacion: z.string(),
    rasgos: z.array(z.string()),
    historia: z.string(),
    relaciones: z.array(
      z.object({
        personaje: z.string(),
        tipo: z.string(),
        descripcion: z.string(),
      })
    ),
    episodios_destacados: z.array(z.string()),
    evolucion: z.object({
      temporada1: z.string().optional(),
      temporada2: z.string().optional(),
      temporada3: z.string().optional(),
    }),
    referencias_visuales: z.array(z.string()).optional(),
  }),
});

const scriptsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    episodio: z.string(),
    titulo: z.string(),
    plataforma: z.enum(['TikTok', 'Instagram', 'YouTube']),
    duracion: z.string(),
    personajes: z.array(z.string()),
    temas: z.array(z.string()),
    ubicacion: z.string(),
    fecha: z.date(),
    estado: z.enum(['borrador', 'revision', 'aprobado', 'filmado']),
  }),
});

const locationsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    nombre: z.string(),
    tipo: z.string(),
    distrito: z.string(),
    descripcion: z.string(),
    caracteristicas: z.array(z.string()),
    importancia: z.string(),
    aparece_en: z.array(z.string()),
    referencias_visuales: z.array(z.string()).optional(),
  }),
});

const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    categoria: z.enum(['guia', 'plantilla', 'referencia', 'filosofia']),
    descripcion: z.string(),
    archivo_descarga: z.string().optional(),
  }),
});

export const collections = {
  characters: charactersCollection,
  scripts: scriptsCollection,
  locations: locationsCollection,
  resources: resourcesCollection,
};
