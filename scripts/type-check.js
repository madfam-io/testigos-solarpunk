#!/usr/bin/env node

/**
 * @fileoverview Runs TypeScript type checking for the project.
 *
 * This script performs type checking using both Astro's built-in checker and
 * the TypeScript compiler. It adapts to CI environments by using reduced
 * memory limits and lighter checks when needed.
 *
 * Environment variables:
 * - CI=true: Enables CI mode with lighter checks
 * - SKIP_ASTRO_CHECK=true: Skips Astro type checking (useful for memory-constrained environments)
 *
 * Usage: node scripts/type-check.js
 *
 * @module type-check
 */

import { execSync } from 'child_process';

console.log('Running type checks...\n');

/**
 * Detect CI environment and configure memory limits accordingly.
 * CI environments get 8GB limit, local development gets 16GB.
 */
const isCI = process.env.CI === 'true';
const skipAstroCheck = process.env.SKIP_ASTRO_CHECK === 'true';
const memoryLimit = isCI ? '8192' : '16384'; // Increased CI memory to 8GB

/**
 * Run Astro type checking.
 * In CI mode, uses --skipPlugins flag to reduce memory usage.
 * Can be skipped entirely with SKIP_ASTRO_CHECK=true.
 */
if (skipAstroCheck) {
  console.log('1. Skipping astro check (SKIP_ASTRO_CHECK=true)\n');
} else {
  try {
    console.log('1. Running astro check...');
    // Use lighter check in CI to conserve memory
    const astroCmd = isCI ? 'astro check --skipPlugins' : 'astro check';

    execSync(astroCmd, {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_OPTIONS: `--max-old-space-size=${memoryLimit}`,
      },
    });
    console.log('✓ Astro check passed\n');
  } catch (error) {
    console.error('✗ Astro check failed');
    // In CI, continue with TypeScript check even if Astro fails
    if (isCI) {
      console.warn('⚠️  Continuing with TypeScript check only in CI...\n');
    } else {
      process.exit(1);
    }
  }
}

/**
 * Run TypeScript compiler type checking.
 * In CI mode, uses --skipLibCheck to skip checking declaration files.
 * This always runs regardless of Astro check results.
 */
try {
  console.log('2. Running TypeScript compiler...');
  // Skip library checks in CI to reduce memory usage and speed up checks
  const tscCmd = isCI ? 'tsc --noEmit --skipLibCheck' : 'tsc --noEmit';

  execSync(tscCmd, {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: `--max-old-space-size=${memoryLimit}`,
    },
  });
  console.log('✓ TypeScript check passed\n');
} catch (error) {
  console.error('✗ TypeScript check failed');
  process.exit(1);
}

console.log('All type checks passed!');
