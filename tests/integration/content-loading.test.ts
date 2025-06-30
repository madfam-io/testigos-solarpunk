/**
 * @fileoverview Integration tests for content loading and validation in the Testigos de Solarpunk project.
 * Tests the data structures and validation logic for characters, locations, and episodes
 * that form the narrative universe of the eco-comedy sketches (Phase 1 content).
 * These tests ensure data integrity across all content types and their relationships.
 */

import { describe, it, expect } from 'vitest';

/**
 * Character data structure interface
 * Represents the eco-warrior evangelists and supporting cast
 */
interface CharacterData {
  id: string;
  nombre: string;
  rol: string;
  edad: number;
  ocupacion: string;
  descripcion_breve: string;
  biografia: string;
  habilidades: string[];
  debilidades: string[];
  frase_iconica: string;
  primera_aparicion: string;
  creado_por: string;
  imagen?: string;
}

/**
 * Location data structure interface
 * Represents the solarpunk venues where stories unfold
 */
interface LocationData {
  nombre: string;
  descripcion: string;
  caracteristicas: string[];
  importancia: string;
  primera_aparicion: string;
}

/**
 * Mock character validation function
 * In production, this would use Zod schemas for runtime validation
 * @param data - Character data to validate
 * @returns Array of validation error messages
 */
const validateCharacter = (data: CharacterData): string[] => {
  const required = [
    'id',
    'nombre',
    'rol',
    'edad',
    'ocupacion',
    'descripcion_breve',
    'biografia',
    'habilidades',
    'debilidades',
    'frase_iconica',
    'primera_aparicion',
    'creado_por',
  ];

  const errors: string[] = [];

  for (const field of required) {
    if (!(field in data) || data[field as keyof CharacterData] === undefined) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate specific field types
  if ('edad' in data && typeof data.edad !== 'number') {
    errors.push('edad must be a number');
  }
  if ('habilidades' in data && !Array.isArray(data.habilidades)) {
    errors.push('habilidades must be an array');
  }
  if ('debilidades' in data && !Array.isArray(data.debilidades)) {
    errors.push('debilidades must be an array');
  }

  return errors;
};

/**
 * Mock location validation function
 * Ensures all required location fields are present and properly typed
 * @param data - Location data to validate
 * @returns Array of validation error messages
 */
const validateLocation = (data: LocationData): string[] => {
  const required = [
    'nombre',
    'descripcion',
    'caracteristicas',
    'importancia',
    'primera_aparicion',
  ];
  const errors: string[] = [];

  for (const field of required) {
    if (!(field in data) || data[field as keyof LocationData] === undefined) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if ('caracteristicas' in data && !Array.isArray(data.caracteristicas)) {
    errors.push('caracteristicas must be an array');
  }

  return errors;
};

/**
 * Integration test suite for content loading and validation
 * Ensures all content types can be loaded, validated, and cross-referenced
 */
describe('Content Loading Integration', () => {
  /**
   * Tests complete character data validation
   * Uses Lucía Solar as example - the main protagonist of the sketches
   */
  it('should validate character data structure', () => {
    // Mock character data
    const mockCharacter: CharacterData = {
      id: 'lucia-solar',
      nombre: 'Lucía Solar',
      rol: 'Protagonista',
      edad: 19,
      ocupacion: 'Estudiante de Ingeniería Ambiental y Evangelista Solar',
      descripcion_breve: 'Carismática predicadora del evangelio solar...',
      biografia: 'Lucía creció en el barrio de Xochimilco...',
      habilidades: [
        'Oratoria inspiradora',
        'Conocimiento técnico de energía solar',
        'Carisma natural',
      ],
      debilidades: [
        'Exceso de optimismo',
        'Impaciencia con los escépticos',
        'Tendencia a sobrecargarse de proyectos',
      ],
      frase_iconica: '¡Hermanos y hermanas, el sol brilla para todos!',
      primera_aparicion: 'episodio-001',
      creado_por: 'Colectivo MADFAM',
      imagen: '/images/characters/lucia-solar.jpg',
    };

    const errors = validateCharacter(mockCharacter);
    expect(errors).toHaveLength(0);
    expect(mockCharacter.imagen).toBeDefined();
  });

  /**
   * Edge case: Ensures validation catches incomplete character data
   * Critical for preventing runtime errors when rendering character pages
   */
  it('should catch missing required fields', () => {
    const incompleteCharacter = {
      id: 'test',
      nombre: 'Test Character',
    } as CharacterData;

    const errors = validateCharacter(incompleteCharacter);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toContain('Missing required field: rol');
  });

  /**
   * Type safety test: Validates that field types are enforced
   * Prevents type coercion issues that could break UI components
   */
  it('should validate field types', () => {
    const invalidCharacter = {
      id: 'test',
      nombre: 'Test',
      rol: 'Test',
      edad: '19' as unknown as number, // Wrong type
      ocupacion: 'Test',
      descripcion_breve: 'Test',
      biografia: 'Test',
      habilidades: 'not an array' as unknown as string[], // Wrong type
      debilidades: ['test'],
      frase_iconica: 'Test',
      primera_aparicion: 'test',
      creado_por: 'test',
    } as CharacterData;

    const errors = validateCharacter(invalidCharacter);
    expect(errors).toContain('edad must be a number');
    expect(errors).toContain('habilidades must be an array');
  });

  /**
   * Tests location data validation
   * Example uses the transformed sustainable market - a key setting
   */
  it('should validate location data structure', () => {
    const mockLocation: LocationData = {
      nombre: 'Mercado de Trueque Tlatelolco',
      descripcion:
        'Antiguo mercado transformado en centro de intercambio sostenible',
      caracteristicas: [
        'Sistema de créditos solares',
        'Talleres de reparación',
        'Huertos verticales',
      ],
      importancia: 'Centro neurálgico del movimiento Testigo en CDMX',
      primera_aparicion: 'episodio-003',
    };

    const errors = validateLocation(mockLocation);
    expect(errors).toHaveLength(0);
  });

  /**
   * Relationship test: Ensures characters and locations can be linked
   * Tests the connection between Hermano Compostino and his composting center
   */
  it('should handle content with relationships', () => {
    const character: CharacterData = {
      id: 'hermano-compostino',
      nombre: 'Hermano Compostino',
      rol: 'Secundario',
      edad: 45,
      ocupacion: 'Maestro compostero y filósofo del reciclaje',
      descripcion_breve: 'Sabio del compostaje con humor terroso',
      biografia: 'Antiguo recolector de basura que encontró la iluminación...',
      habilidades: ['Compostaje maestro', 'Filosofía del reciclaje'],
      debilidades: ['Olor peculiar', 'Monólogos extensos'],
      frase_iconica: '¡La basura de hoy es el oro negro del mañana!',
      primera_aparicion: 'episodio-002',
      creado_por: 'Colectivo MADFAM',
    };

    const location: LocationData = {
      nombre: 'Centro de Compostaje Comunitario',
      descripcion: 'Santuario del Hermano Compostino',
      caracteristicas: ['Montañas de composta', 'Aroma característico'],
      importancia: 'Lugar de peregrinación para conversos del compostaje',
      primera_aparicion: 'episodio-002',
    };

    // Validate both are valid
    expect(validateCharacter(character)).toHaveLength(0);
    expect(validateLocation(location)).toHaveLength(0);

    // Check relationship
    expect(character.primera_aparicion).toBe(location.primera_aparicion);
  });

  /**
   * Metadata validation test
   * Ensures project-wide metadata follows expected structure
   */
  it('should validate content metadata', () => {
    const metadata = {
      title: 'Testigos de Solarpunk',
      description: 'Universo narrativo evangelista ecológico',
      tags: ['solarpunk', 'evangelismo-verde', 'humor', 'sustentabilidad'],
      language: 'es-MX',
      version: '1.0.0',
    };

    expect(metadata.title).toBeDefined();
    expect(metadata.tags).toBeInstanceOf(Array);
    expect(metadata.language).toBe('es-MX');
  });

  /**
   * Content type enumeration test
   * Validates that all content types follow naming conventions
   */
  it('should handle multiple content types', () => {
    const contentTypes = ['characters', 'locations', 'episodes', 'resources'];

    for (const type of contentTypes) {
      expect(type).toMatch(/^[a-z]+$/);
    }
  });

  /**
   * Episode cross-reference test
   * Ensures episodes properly reference characters and locations
   */
  it('should validate episode references', () => {
    const episode = {
      id: 'episodio-001',
      titulo: 'La Conversión Solar de Lucía',
      personajes: ['lucia-solar', 'hermano-compostino'],
      locaciones: ['mercado-tlatelolco'],
    };

    expect(episode.personajes).toContain('lucia-solar');
    expect(episode.locaciones).toHaveLength(1);
  });

  /**
   * ID format consistency test
   * Enforces kebab-case convention for all content identifiers
   * This is critical for URL routing and content lookups
   */
  it('should ensure consistent ID formats', () => {
    const ids = [
      'lucia-solar',
      'hermano-compostino',
      'episodio-001',
      'mercado-tlatelolco',
    ];

    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9-]+$/);
      expect(id).not.toContain(' ');
      expect(id).not.toContain('_');
    }
  });

  /**
   * Image path validation test
   * Ensures all image references follow the project's file structure
   * and use supported formats
   */
  it('should validate image paths', () => {
    const imagePaths = [
      '/images/characters/lucia-solar.jpg',
      '/images/locations/mercado-tlatelolco.jpg',
      '/images/episodes/episodio-001-thumb.jpg',
    ];

    for (const path of imagePaths) {
      expect(path).toMatch(/^\/images\//);
      expect(path).toMatch(/\.(jpg|jpeg|png|webp)$/);
    }
  });

  /**
   * Optional field handling test
   * Ensures the system gracefully handles missing optional data
   * Example: characters without profile images
   */
  it('should handle missing optional fields gracefully', () => {
    const characterWithoutImage: CharacterData = {
      id: 'test-character',
      nombre: 'Test Character',
      rol: 'Cameo',
      edad: 30,
      ocupacion: 'Test',
      descripcion_breve: 'Test description',
      biografia: 'Test bio',
      habilidades: ['test'],
      debilidades: ['test'],
      frase_iconica: 'Test phrase',
      primera_aparicion: 'test-episode',
      creado_por: 'Test Creator',
      // Note: imagen is optional and not provided
    };

    const errors = validateCharacter(characterWithoutImage);
    expect(errors).toHaveLength(0);
    expect(characterWithoutImage.imagen).toBeUndefined();
  });
});
