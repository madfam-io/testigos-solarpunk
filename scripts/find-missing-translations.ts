#!/usr/bin/env tsx
import { ui } from '../src/i18n/config';

// Get all keys from both languages
const esKeys = Object.keys(ui.es);
const enKeys = Object.keys(ui.en);

// Find missing translations
const missingInEn = esKeys.filter((key) => !enKeys.includes(key));
const missingInEs = enKeys.filter((key) => !esKeys.includes(key));

console.log('Missing translations in English:');
missingInEn.forEach((key) => {
  console.log(`  - ${key}: "${(ui.es as any)[key]}"`);
});

console.log('\nMissing translations in Spanish:');
missingInEs.forEach((key) => {
  console.log(`  - ${key}: "${(ui.en as any)[key]}"`);
});

console.log(`\nTotal missing in English: ${missingInEn.length}`);
console.log(`Total missing in Spanish: ${missingInEs.length}`);
