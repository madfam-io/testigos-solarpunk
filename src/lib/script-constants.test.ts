import { describe, it, expect } from 'vitest';
import { platformColors, statusColors } from './script-constants';

describe('script-constants', () => {
  describe('platformColors', () => {
    it('should export platform colors object', () => {
      expect(platformColors).toBeDefined();
      expect(typeof platformColors).toBe('object');
    });

    it('should contain colors for all expected platforms', () => {
      expect(platformColors).toHaveProperty('TikTok', '#FF0050');
      expect(platformColors).toHaveProperty('Instagram', '#E4405F');
      expect(platformColors).toHaveProperty('YouTube', '#FF0000');
      expect(platformColors).toHaveProperty('Facebook', '#1877F2');
    });

    it('should have exactly 4 platform colors', () => {
      expect(Object.keys(platformColors)).toHaveLength(4);
    });

    it('should contain valid hex color values', () => {
      Object.values(platformColors).forEach((color) => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });
  });

  describe('statusColors', () => {
    it('should export status colors object', () => {
      expect(statusColors).toBeDefined();
      expect(typeof statusColors).toBe('object');
    });

    it('should contain colors for all expected statuses', () => {
      expect(statusColors).toHaveProperty('borrador');
      expect(statusColors).toHaveProperty('revision');
      expect(statusColors).toHaveProperty('aprobado');
      expect(statusColors).toHaveProperty('filmado');
    });

    it('should have exactly 4 status colors', () => {
      expect(Object.keys(statusColors)).toHaveLength(4);
    });

    it('should have correct structure for each status color', () => {
      Object.values(statusColors).forEach((colorSet) => {
        expect(colorSet).toHaveProperty('bg');
        expect(colorSet).toHaveProperty('text');
        expect(typeof colorSet.bg).toBe('string');
        expect(typeof colorSet.text).toBe('string');
      });
    });

    it('should have correct color values for each status', () => {
      expect(statusColors.borrador).toEqual({ bg: '#fff3cd', text: '#856404' });
      expect(statusColors.revision).toEqual({ bg: '#cce5ff', text: '#004085' });
      expect(statusColors.aprobado).toEqual({ bg: '#d4edda', text: '#155724' });
      expect(statusColors.filmado).toEqual({ bg: '#d1ecf1', text: '#0c5460' });
    });
  });
});
