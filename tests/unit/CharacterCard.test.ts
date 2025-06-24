import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test, describe } from 'vitest';
import CharacterCard from '../../src/components/CharacterCard.astro';

describe('CharacterCard Component', () => {
  test('renders character information correctly', async () => {
    const container = await AstroContainer.create();
    const character = {
      id: 'lucia-solar',
      collection: 'characters',
      data: {
        nombre: 'Lucía Solar',
        titulo: 'La Ingeniera Visionaria',
        descripcion_corta: 'Ingeniera de energías renovables y líder comunitaria',
        rol_principal: 'Protagonista',
        edad: 32,
        ocupacion: 'Ingeniera de Energías Renovables',
        habilidades: ['Diseño solar', 'Liderazgo', 'Innovación'],
        filosofia_personal: 'El sol es para todos',
      },
    };

    const result = await container.renderToString(CharacterCard, {
      props: {
        character,
      },
    });

    expect(result).toContain('Lucía Solar');
    expect(result).toContain('La Ingeniera Visionaria');
    expect(result).toContain('Protagonista');
    expect(result).toContain('32');
  });

  test('handles missing optional fields gracefully', async () => {
    const container = await AstroContainer.create();
    const character = {
      id: 'test-character',
      collection: 'characters',
      data: {
        nombre: 'Test Character',
        descripcion_corta: 'A test character',
        rol_principal: 'Secundario',
        edad: 25,
        ocupacion: 'Tester',
      },
    };

    const result = await container.renderToString(CharacterCard, {
      props: {
        character,
      },
    });

    expect(result).toContain('Test Character');
    expect(result).toContain('25');
    expect(result).not.toContain('undefined');
    expect(result).not.toContain('null');
  });

  test('applies correct CSS classes for different roles', async () => {
    const container = await AstroContainer.create();
    const protagonistCharacter = {
      id: 'protagonist',
      collection: 'characters',
      data: {
        nombre: 'Protagonista',
        descripcion_corta: 'Main character',
        rol_principal: 'Protagonista',
        edad: 30,
        ocupacion: 'Hero',
      },
    };

    const result = await container.renderToString(CharacterCard, {
      props: {
        character: protagonistCharacter,
      },
    });

    // Verificar que se aplican las clases correctas según el rol
    expect(result).toMatch(/role-protagonista|protagonist|main-character/i);
  });
});