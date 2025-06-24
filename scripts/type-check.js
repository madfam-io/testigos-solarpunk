#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('Running type checks...\n');

// For CI environments with limited memory, we'll run a lighter type check
const isCI = process.env.CI === 'true';
const memoryLimit = isCI ? '4096' : '16384';

// Run astro check with appropriate memory limit
try {
  console.log('1. Running astro check...');
  const astroCmd = isCI 
    ? 'astro check --skipPlugins' 
    : 'astro check';
  
  execSync(astroCmd, {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: `--max-old-space-size=${memoryLimit}`
    }
  });
  console.log('✓ Astro check passed\n');
} catch (error) {
  console.error('✗ Astro check failed');
  process.exit(1);
}

// Run tsc with appropriate memory limit
try {
  console.log('2. Running TypeScript compiler...');
  const tscCmd = isCI
    ? 'tsc --noEmit --skipLibCheck'
    : 'tsc --noEmit';
    
  execSync(tscCmd, {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: `--max-old-space-size=${memoryLimit}`
    }
  });
  console.log('✓ TypeScript check passed\n');
} catch (error) {
  console.error('✗ TypeScript check failed');
  process.exit(1);
}

console.log('All type checks passed!');