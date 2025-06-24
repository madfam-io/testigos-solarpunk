import { describe, it, expect } from 'vitest';

// Funciones de utilidad de ejemplo que crearemos después
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date in Spanish (Mexico) format', () => {
      const date = new Date('2024-03-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('marzo');
      expect(formatted).toContain('2024');
    });
  });

  describe('slugify', () => {
    it('should convert text to URL-friendly slug', () => {
      expect(slugify('Lucía Solar')).toBe('lucia-solar');
      expect(slugify('Hermano Compostino')).toBe('hermano-compostino');
      expect(slugify('¡Testigos de Solarpunk!')).toBe('testigos-de-solarpunk');
    });

    it('should handle special characters and spaces', () => {
      expect(slugify('Año 2050: El Futuro')).toBe('ano-2050-el-futuro');
      expect(slugify('  Espacios   múltiples  ')).toBe('espacios-multiples');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text with ellipsis', () => {
      const longText = 'Este es un texto muy largo que necesita ser truncado';
      expect(truncateText(longText, 20)).toBe('Este es un texto muy...');
    });

    it('should not truncate short text', () => {
      const shortText = 'Texto corto';
      expect(truncateText(shortText, 20)).toBe('Texto corto');
    });

    it('should handle edge cases', () => {
      expect(truncateText('', 10)).toBe('');
      expect(truncateText('Hola', 0)).toBe('...');
    });
  });
});
