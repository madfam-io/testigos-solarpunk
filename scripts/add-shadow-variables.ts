#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';

// New shadow-related variables that need to be added
const shadowVariables = `
  /* Shadow overlay variations */
  --shadow-overlay-dark: rgba(0, 0, 0, 0.24);
  --shadow-overlay-medium: rgba(0, 0, 0, 0.16);
  --shadow-overlay-strong: rgba(0, 0, 0, 0.20);
  --shadow-overlay-dark-mode: rgba(0, 0, 0, 0.5);
  --shadow-overlay-darkest: rgba(0, 0, 0, 0.8);
  --shadow-overlay-dark-medium: rgba(0, 0, 0, 0.4);
  --shadow-overlay-dark-strong: rgba(0, 0, 0, 0.6);
  --shadow-overlay-dark-stronger: rgba(0, 0, 0, 0.7);
  --cutout-shadow-dark: rgba(0, 0, 0, 0.3);
  
  /* Additional semantic colors */
  --color-error: #f44336;
  --color-error-light: #ef5350;
  --color-error-dark: #d32f2f;
  --color-warning-light: #ffb74d;
  
  /* Extended Solarpunk colors */
  --sp-community-light: #ff8a65;
  --sp-community-dark: #e55100;`;

// Removed unused darkThemeShadowVariables

async function addShadowVariables() {
  console.log('Adding shadow-related CSS variables...');

  // Update madfam-tokens.css
  const tokensPath = path.join(process.cwd(), 'src/styles/madfam-tokens.css');
  let tokensContent = await fs.promises.readFile(tokensPath, 'utf-8');

  // Find where to insert the new variables (after the shadow section)
  const shadowSectionEnd = tokensContent.indexOf('  /* Sombra interna */');
  if (shadowSectionEnd !== -1) {
    tokensContent =
      tokensContent.slice(0, shadowSectionEnd) +
      shadowVariables +
      '\n\n' +
      tokensContent.slice(shadowSectionEnd);
    await fs.promises.writeFile(tokensPath, tokensContent);
    console.log('✅ Added shadow variables to madfam-tokens.css');
  }

  // Update critical.css
  const criticalPath = path.join(process.cwd(), 'src/styles/critical.css');
  let criticalContent = await fs.promises.readFile(criticalPath, 'utf-8');

  // Add before the closing of :root
  const rootEnd = criticalContent.indexOf('  --button-primary-text: #212121;');
  if (rootEnd !== -1) {
    const insertPoint = rootEnd + '  --button-primary-text: #212121;'.length;
    criticalContent =
      criticalContent.slice(0, insertPoint) +
      '\n' +
      shadowVariables +
      criticalContent.slice(insertPoint);
    await fs.promises.writeFile(criticalPath, criticalContent);
    console.log('✅ Added shadow variables to critical.css');
  }

  // Update unified-dark-theme.css
  const darkThemePath = path.join(
    process.cwd(),
    'src/styles/unified-dark-theme.css'
  );
  let darkThemeContent = await fs.promises.readFile(darkThemePath, 'utf-8');

  // Add to the :root section after the button variables
  const insertAfter = '  --button-primary-text: #000000;';
  const insertPoint = darkThemeContent.indexOf(insertAfter);
  if (insertPoint !== -1) {
    const position = insertPoint + insertAfter.length;
    darkThemeContent =
      darkThemeContent.slice(0, position) +
      '\n' +
      shadowVariables +
      darkThemeContent.slice(position);
    await fs.promises.writeFile(darkThemePath, darkThemeContent);
    console.log('✅ Added shadow variables to unified-dark-theme.css');
  }

  console.log('\n✅ Successfully added all shadow-related CSS variables!');
}

// Run the script
addShadowVariables().catch(console.error);
