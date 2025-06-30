/**
 * @fileoverview Unit tests for script constants used in content production.
 * Tests platform-specific color schemes and script status color configurations.
 * These constants are used to visually differentiate content across platforms
 * and track script production stages in the Phase 1 sketch content strategy.
 */

import { describe, it, expect } from 'vitest';
import { platformColors, statusColors } from './script-constants';

/**
 * Test suite for script-constants module
 * Validates color schemes and status indicators for content production workflow
 */
describe('script-constants', () => {
  /**
   * Tests for platformColors object
   * Ensures consistent branding colors for each social media platform
   */
  describe('platformColors', () => {
    /**
     * Verifies platformColors is properly exported as an object
     */
    it('should export platform colors object', () => {
      expect(platformColors).toBeDefined();
      expect(typeof platformColors).toBe('object');
    });

    /**
     * Validates that all target social media platforms have assigned colors
     * These colors match each platform's official branding for visual consistency
     */
    it('should contain colors for all expected platforms', () => {
      expect(platformColors).toHaveProperty('TikTok', '#FF0050');
      expect(platformColors).toHaveProperty('Instagram', '#E4405F');
      expect(platformColors).toHaveProperty('YouTube', '#FF0000');
      expect(platformColors).toHaveProperty('Facebook', '#1877F2');
    });

    /**
     * Ensures no platforms are accidentally added or removed
     * The project targets exactly 4 platforms for Phase 1 content distribution
     */
    it('should have exactly 4 platform colors', () => {
      expect(Object.keys(platformColors)).toHaveLength(4);
    });

    /**
     * Validates that all colors are in proper hex format
     * This ensures CSS compatibility and prevents rendering issues
     */
    it('should contain valid hex color values', () => {
      Object.values(platformColors).forEach((color) => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });
  });

  /**
   * Tests for statusColors object
   * Validates the color scheme for script production workflow stages
   */
  describe('statusColors', () => {
    /**
     * Verifies statusColors is properly exported as an object
     */
    it('should export status colors object', () => {
      expect(statusColors).toBeDefined();
      expect(typeof statusColors).toBe('object');
    });

    /**
     * Validates all script workflow stages have color configurations
     * The stages represent: borrador (draft), revision (review),
     * aprobado (approved), filmado (filmed)
     */
    it('should contain colors for all expected statuses', () => {
      expect(statusColors).toHaveProperty('borrador');
      expect(statusColors).toHaveProperty('revision');
      expect(statusColors).toHaveProperty('aprobado');
      expect(statusColors).toHaveProperty('filmado');
    });

    /**
     * Ensures the complete production workflow is represented
     * No stages should be missing or added without updating tests
     */
    it('should have exactly 4 status colors', () => {
      expect(Object.keys(statusColors)).toHaveLength(4);
    });

    /**
     * Validates each status has both background and text colors
     * This ensures proper contrast and accessibility in the UI
     */
    it('should have correct structure for each status color', () => {
      Object.values(statusColors).forEach((colorSet) => {
        expect(colorSet).toHaveProperty('bg');
        expect(colorSet).toHaveProperty('text');
        expect(typeof colorSet.bg).toBe('string');
        expect(typeof colorSet.text).toBe('string');
      });
    });

    /**
     * Tests exact color values for each production stage
     * These colors follow accessibility standards with proper contrast ratios:
     * - borrador: Yellow theme (draft/warning)
     * - revision: Blue theme (information/in-progress)
     * - aprobado: Green theme (success/ready)
     * - filmado: Cyan theme (completed/archived)
     */
    it('should have correct color values for each status', () => {
      expect(statusColors.borrador).toEqual({ bg: '#fff3cd', text: '#856404' });
      expect(statusColors.revision).toEqual({ bg: '#cce5ff', text: '#004085' });
      expect(statusColors.aprobado).toEqual({ bg: '#d4edda', text: '#155724' });
      expect(statusColors.filmado).toEqual({ bg: '#d1ecf1', text: '#0c5460' });
    });
  });
});
