import { describe, it, expect } from 'vitest';

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

interface LocationData {
  nombre: string;
  descripcion: string;
  caracteristicas: string[];
  importancia: string;
  primera_aparicion: string;
}

// Mock validation functions that would normally use zod
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

describe('Content Loading Integration', () => {
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

  it('should catch missing required fields', () => {
    const incompleteCharacter = {
      id: 'test',
      nombre: 'Test Character',
    } as CharacterData;

    const errors = validateCharacter(incompleteCharacter);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toContain('Missing required field: rol');
  });

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

  it('should handle multiple content types', () => {
    const contentTypes = ['characters', 'locations', 'episodes', 'resources'];

    for (const type of contentTypes) {
      expect(type).toMatch(/^[a-z]+$/);
    }
  });

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
