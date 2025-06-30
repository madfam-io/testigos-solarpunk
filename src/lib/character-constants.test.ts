/**
 * @fileoverview Unit tests for character constants used in the Testigos de Solarpunk project.
 * Tests the evangelistas array which contains the key character identifiers for the eco-comedy sketches.
 * These characters are central to Phase 1 of the content strategy.
 */

import { describe, it, expect } from 'vitest';
import { evangelistas } from './character-constants';

/**
 * Test suite for character-constants module
 * Validates the structure and content of character data used throughout the application
 */
describe('character-constants', () => {
  /**
   * Tests for the evangelistas array
   * Ensures the array contains the correct eco-warrior characters
   */
  describe('evangelistas', () => {
    /**
     * Verifies that evangelistas is properly exported and is an array
     */
    it('should export an array of evangelistas', () => {
      expect(evangelistas).toBeDefined();
      expect(Array.isArray(evangelistas)).toBe(true);
    });

    /**
     * Validates the exact content of the evangelistas array
     * These are the three main eco-warrior characters from the comedy sketches:
     * - hermana-panelia: The solar panel evangelist
     * - hermano-compostino: The composting enthusiast
     * - profeta-del-sol: The solar prophet
     */
    it('should contain the expected evangelista characters', () => {
      expect(evangelistas).toEqual([
        'hermana-panelia',
        'hermano-compostino',
        'profeta-del-sol',
      ]);
    });

    /**
     * Ensures the array length remains consistent
     * Important for maintaining the trinity of eco-warriors concept
     */
    it('should have exactly 3 evangelistas', () => {
      expect(evangelistas).toHaveLength(3);
    });

    /**
     * Type safety check to ensure all evangelista identifiers are strings
     * This prevents type errors when using these identifiers in the application
     */
    it('should contain only string values', () => {
      evangelistas.forEach((evangelista) => {
        expect(typeof evangelista).toBe('string');
      });
    });
  });
});
