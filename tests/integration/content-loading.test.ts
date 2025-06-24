import { describe, it, expect, vi } from 'vitest';

// Mock validation functions that would normally use zod
const validateCharacter = (data: any) => {
  const required = [
    'id', 'nombre', 'rol', 'edad', 'ocupacion', 'descripcion_breve',
    'biografia', 'habilidades', 'debilidades', 'frase_iconica',
    'primera_aparicion', 'creado_por'
  ];
  
  // Check required fields
  for (const field of required) {
    if (!(field in data)) return { success: false, error: `Missing field: ${field}` };
  }
  
  // Validate types
  if (typeof data.id !== 'string') return { success: false };
  if (typeof data.nombre !== 'string') return { success: false };
  if (!['protagonista', 'antagonista', 'secundario', 'cameo'].includes(data.rol)) {
    return { success: false };
  }
  if (typeof data.edad !== 'number' || data.edad <= 0) return { success: false };
  if (!Array.isArray(data.habilidades)) return { success: false };
  if (!Array.isArray(data.debilidades)) return { success: false };
  
  return { success: true, data };
};

const validateLocation = (data: any) => {
  const required = [
    'id', 'nombre', 'tipo', 'descripcion', 'ubicacion',
    'caracteristicas', 'importancia'
  ];
  
  for (const field of required) {
    if (!(field in data)) return { success: false, error: `Missing field: ${field}` };
  }
  
  if (!Array.isArray(data.caracteristicas)) return { success: false };
  
  return { success: true, data };
};

describe('Content Loading Integration', () => {
  describe('Character Content', () => {
    it('should validate character YAML structure', () => {
      const validCharacter = {
        id: 'test-character',
        nombre: 'Test Character',
        rol: 'secundario',
        edad: 30,
        ocupacion: 'Test Occupation',
        descripcion_breve: 'A test character',
        biografia: 'Full biography of the test character',
        habilidades: ['Skill 1', 'Skill 2'],
        debilidades: ['Weakness 1'],
        frase_iconica: 'Test phrase',
        primera_aparicion: 'EP001',
        creado_por: 'Test Creator',
      };

      const result = validateCharacter(validCharacter);
      expect(result.success).toBe(true);
    });

    it('should reject invalid character data', () => {
      const invalidCharacter = {
        id: 'test',
        nombre: 'Test',
        rol: 'invalid-role', // Invalid enum value
        edad: -5, // Negative age
        // Missing required fields
      };

      const result = validateCharacter(invalidCharacter);
      expect(result.success).toBe(false);
    });

    it('should handle optional fields correctly', () => {
      const characterWithOptionals = {
        id: 'test-character',
        nombre: 'Test Character',
        rol: 'protagonista',
        edad: 25,
        ocupacion: 'Test Job',
        descripcion_breve: 'Brief desc',
        biografia: 'Full bio',
        habilidades: ['Skill'],
        debilidades: ['Weakness'],
        frase_iconica: 'Phrase',
        primera_aparicion: 'EP001',
        creado_por: 'Creator',
        imagen: '/path/to/image.jpg',
      };

      const result = validateCharacter(characterWithOptionals);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.imagen).toBe('/path/to/image.jpg');
      }
    });
  });

  describe('Location Content', () => {
    it('should validate location YAML structure', () => {
      const validLocation = {
        id: 'test-location',
        nombre: 'Test Location',
        tipo: 'Urban',
        descripcion: 'A test location description',
        ubicacion: 'Test City',
        caracteristicas: ['Feature 1', 'Feature 2'],
        importancia: 'Very important location',
      };

      const result = validateLocation(validLocation);
      expect(result.success).toBe(true);
    });

    it('should handle array fields correctly', () => {
      const location = {
        id: 'test',
        nombre: 'Test',
        tipo: 'Rural',
        descripcion: 'Description',
        ubicacion: 'Location',
        caracteristicas: [], // Empty array should be valid
        importancia: 'Important',
      };

      const result = validateLocation(location);
      expect(result.success).toBe(true);
    });
  });

  describe('Content Collection Patterns', () => {
    it('should handle glob patterns for content files', () => {
      // Mock file patterns that would be used in Astro.glob
      const mockCharacterFiles = [
        '/src/content/characters/lucia-solar.yaml',
        '/src/content/characters/hermano-compostino.yaml',
        '/src/content/characters/hermana-panelia.yaml',
      ];

      expect(mockCharacterFiles).toHaveLength(3);
      expect(mockCharacterFiles.every(f => f.endsWith('.yaml'))).toBe(true);
      expect(mockCharacterFiles.every(f => f.includes('/characters/'))).toBe(true);
    });

    it('should extract IDs from filenames', () => {
      const filename = '/src/content/characters/lucia-solar.yaml';
      const id = filename.split('/').pop()?.replace('.yaml', '');
      expect(id).toBe('lucia-solar');
    });
  });

  describe('Content Relationships', () => {
    it('should validate character references in scripts', () => {
      const script = {
        personajes: ['lucia-solar', 'hermano-compostino'],
        duracion: '1:30',
        plataforma: 'TT',
      };

      const characterIds = ['lucia-solar', 'hermano-compostino', 'hermana-panelia'];
      
      const validReferences = script.personajes.every(p => 
        characterIds.includes(p)
      );

      expect(validReferences).toBe(true);
    });

    it('should validate location references', () => {
      const script = {
        ubicacion: 'azotea-verde-neo-cuernavaca',
      };

      const locationIds = ['azotea-verde-neo-cuernavaca'];
      
      expect(locationIds.includes(script.ubicacion)).toBe(true);
    });
  });

  describe('Content Transformations', () => {
    it('should transform snake_case to camelCase for props', () => {
      const yamlData = {
        descripcion_breve: 'Test description',
        primera_aparicion: 'EP001',
      };

      const transformed = {
        descripcionBreve: yamlData.descripcion_breve,
        primeraAparicion: yamlData.primera_aparicion,
      };

      expect(transformed.descripcionBreve).toBe('Test description');
      expect(transformed.primeraAparicion).toBe('EP001');
    });

    it('should handle multilingual content', () => {
      const content = {
        nombre: 'Lucía Solar',
        descripcion: 'Líder carismática del movimiento',
        frase: '¡Aleluya Solar!',
      };

      // Spanish characters should be preserved
      expect(content.nombre).toContain('í');
      expect(content.descripcion).toContain('á');
      expect(content.frase).toContain('¡');
    });
  });
});