import { describe, it, expect } from 'vitest';
import { evangelistas } from './character-constants';

describe('character-constants', () => {
  describe('evangelistas', () => {
    it('should export an array of evangelistas', () => {
      expect(evangelistas).toBeDefined();
      expect(Array.isArray(evangelistas)).toBe(true);
    });

    it('should contain the expected evangelista characters', () => {
      expect(evangelistas).toEqual([
        'hermana-panelia',
        'hermano-compostino',
        'profeta-del-sol',
      ]);
    });

    it('should have exactly 3 evangelistas', () => {
      expect(evangelistas).toHaveLength(3);
    });

    it('should contain only string values', () => {
      evangelistas.forEach((evangelista) => {
        expect(typeof evangelista).toBe('string');
      });
    });
  });
});
