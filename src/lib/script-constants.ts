/**
 * @fileoverview Script and Platform Constants
 *
 * Defines visual constants for social media platforms and script statuses.
 * Used for consistent branding and status visualization across the application.
 *
 * @module lib/script-constants
 */

/**
 * Social media platform brand colors
 *
 * Official brand colors for each platform, used in platform indicators
 * and social media integration components.
 *
 * @constant {Record<string, string>}
 *
 * Colors:
 * - TikTok: Hot pink (#FF0050)
 * - Instagram: Gradient pink (#E4405F)
 * - YouTube: Classic red (#FF0000)
 * - Facebook: Facebook blue (#1877F2)
 */
export const platformColors: Record<string, string> = {
  TikTok: '#FF0050',
  Instagram: '#E4405F',
  YouTube: '#FF0000',
  Facebook: '#1877F2',
};

/**
 * Script status colors for visual indicators
 *
 * Semantic color scheme for different script workflow states.
 * Each status has background and text colors for accessibility.
 *
 * @constant {Record<string, { bg: string; text: string }>}
 *
 * Status meanings:
 * - borrador: Draft status - Yellow warning palette
 * - revision: Under review - Blue info palette
 * - aprobado: Approved - Green success palette
 * - filmado: Filmed/Completed - Cyan completion palette
 *
 * Colors follow WCAG accessibility guidelines for contrast
 */
export const statusColors: Record<string, { bg: string; text: string }> = {
  borrador: { bg: 'var(--madfam-white)3cd', text: '#856404' },
  revision: { bg: '#cce5ff', text: '#004085' },
  aprobado: { bg: '#d4edda', text: '#155724' },
  filmado: { bg: '#d1ecf1', text: '#0c5460' },
};
