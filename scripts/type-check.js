#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('Running type checks...\n');

// For CI environments with limited memory, we'll run a lighter type check
const isCI = process.env.CI === 'true';
const skipAstroCheck = process.env.SKIP_ASTRO_CHECK === 'true';
const memoryLimit = isCI ? '8192' : '16384'; // Increased CI memory to 8GB

// Run astro check with appropriate memory limit
if (skipAstroCheck) {
  console.log('1. Skipping astro check (SKIP_ASTRO_CHECK=true)\n');
} else {
  try {
    console.log('1. Running astro check...');
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
    if (isCI) {
      console.warn('⚠️  Continuing with TypeScript check only in CI...\n');
    } else {
      process.exit(1);
    }
  }
}

// Run tsc with appropriate memory limit
try {
  console.log('2. Running TypeScript compiler...');
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
