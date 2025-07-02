#!/usr/bin/env node

/**
 * Simple link verification script
 * Checks that all critical navigation links have proper language prefixes
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

console.log('🔍 Verifying navigation links...\n');

// Patterns to check
const brokenPatterns = [
  /href=["{]`?\$\{basePath\}\/comunidad\//g,
  /href=["{]`?\$\{basePath\}\/personajes\//g,
  /href=["{]`?\$\{basePath\}\/recursos\//g,
  /href=["{]`?\$\{basePath\}\/mundo\//g,
  /href=["{]`?\$\{basePath\}\/guiones\//g,
];

const spanishFiles = glob.sync('src/pages/es/**/*.astro');
const issues = [];

spanishFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');

  brokenPatterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      issues.push({
        file: path.relative(process.cwd(), file),
        pattern: pattern.toString(),
        matches: matches.length,
      });
    }
  });
});

if (issues.length > 0) {
  console.log('❌ Found broken links:\n');
  issues.forEach((issue) => {
    console.log(`  File: ${issue.file}`);
    console.log(`  Pattern: ${issue.pattern}`);
    console.log(`  Matches: ${issue.matches}\n`);
  });
  process.exit(1);
} else {
  console.log(
    '✅ All navigation links are properly formatted with language prefixes!'
  );
  console.log(`   Checked ${spanishFiles.length} Spanish pages`);
  console.log('\n🎉 Link verification passed!');
}
