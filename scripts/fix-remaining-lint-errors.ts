#!/usr/bin/env node

/**
 * Script to fix remaining lint errors
 * Focuses on any types and unsafe operations
 */

import fs from 'fs/promises';
import { glob } from 'glob';

async function fixLintErrors() {
  const testFiles = await glob('**/*.test.ts', {
    ignore: ['**/node_modules/**', '**/dist/**'],
  });

  for (const file of testFiles) {
    let content = await fs.readFile(file, 'utf-8');
    let changed = false;

    // Fix window.caches delete
    if (content.includes('delete (window as any).caches')) {
      content = content.replace(
        /delete \(window as any\)\.caches/g,
        'delete (window as Window & { caches?: CacheStorage }).caches'
      );
      changed = true;
    }

    // Fix window.serviceWorker references
    if (content.includes('(window as any).serviceWorker')) {
      content = content.replace(
        /\(window as any\)\.serviceWorker/g,
        '(window as Window & { serviceWorker?: ServiceWorkerContainer }).serviceWorker'
      );
      changed = true;
    }

    // Fix window.cacheBuster references
    if (content.includes('(window as any).cacheBuster')) {
      content = content.replace(
        /\(window as any\)\.cacheBuster/g,
        '(window as Window & { cacheBuster?: unknown }).cacheBuster'
      );
      changed = true;
    }

    // Fix navigator.serviceWorker references
    if (content.includes('(navigator as any).serviceWorker')) {
      content = content.replace(
        /\(navigator as any\)\.serviceWorker/g,
        '(navigator as Navigator & { serviceWorker?: ServiceWorkerContainer }).serviceWorker'
      );
      changed = true;
    }

    // Fix unsafe assignments in telemetry test
    if (file.includes('telemetry.test.ts')) {
      // Fix mockPerformanceObserver assignment
      content = content.replace(
        /global\.PerformanceObserver = vi\.fn\(\)\.mockImplementation/g,
        'global.PerformanceObserver = vi.fn().mockImplementation'
      );

      // Fix observerCallbacks type
      content = content.replace(
        /const observerCallbacks: Function\[\] = \[\];/g,
        'const observerCallbacks: ((list: PerformanceObserverEntryList) => void)[] = [];'
      );
    }

    if (changed) {
      await fs.writeFile(file, content);
      console.log(`Fixed ${file}`);
    }
  }

  // Fix telemetry test specifically
  const telemetryTest = 'src/utils/__tests__/telemetry.test.ts';
  if (
    await fs
      .access(telemetryTest)
      .then(() => true)
      .catch(() => false)
  ) {
    let content = await fs.readFile(telemetryTest, 'utf-8');

    // Fix line 475 - any assignment
    content = content.replace(
      /body: expect\.stringContaining/g,
      'body: expect.stringContaining'
    );

    // Fix line 707-710 - PerformanceObserver mock
    content = content.replace(
      /global\.PerformanceObserver = vi\.fn\(\)\.mockImplementation\((.*?)\) as any;/g,
      'global.PerformanceObserver = vi.fn().mockImplementation($1) as unknown as typeof PerformanceObserver;'
    );

    // Fix line 817-823 - observerCallbacks
    content = content.replace(
      /vi\.fn\(\)\.mockImplementation\(\(callback\) => \{/g,
      'vi.fn().mockImplementation((callback: PerformanceObserverCallback) => {'
    );

    await fs.writeFile(telemetryTest, content);
    console.log('Fixed telemetry test');
  }

  console.log('Done fixing lint errors');
}

fixLintErrors().catch(console.error);
