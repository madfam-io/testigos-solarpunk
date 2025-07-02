#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';

// Missing CSS variables that need to be defined

// Define the missing variables with appropriate values
const newVariables = `
  /* =================================================================
   * Colores temáticos de Testigos de Solarpunk
   * ================================================================= */
  
  /* Colores de personajes y temas */
  --color-eco-green: var(--madfam-green);
  --color-solar-yellow: var(--madfam-yellow);
  --color-comedy-purple: var(--madfam-purple);
  --color-tech-blue: var(--madfam-blue);
  --color-community-orange: var(--sp-community);
  
  /* Efectos de revista */
  --paper-texture-opacity: 0.1;
  --torn-edge-color: var(--color-border);
  
  /* Navegación */
  --nav-text: var(--color-text-primary);
  
  /* Botones */
  --button-primary-bg: var(--color-primary);
  --button-primary-text: var(--color-text-on-primary);`;

const darkThemeVariables = `
    /* Colores temáticos ajustados para modo oscuro */
    --color-eco-green: var(--madfam-green-light);
    --color-solar-yellow: var(--madfam-yellow-light);
    --color-comedy-purple: var(--madfam-purple-light);
    --color-tech-blue: var(--madfam-blue-light);
    --color-community-orange: #ff8a65; /* Lighter orange for dark mode */
    
    /* Efectos de revista en modo oscuro */
    --paper-texture-opacity: 0.05;
    --torn-edge-color: var(--madfam-gray-700);
    
    /* Navegación en modo oscuro */
    --nav-text: var(--madfam-gray-100);
    
    /* Botones en modo oscuro */
    --button-primary-bg: var(--madfam-yellow-light);
    --button-primary-text: var(--madfam-black);`;

console.log('Adding missing CSS variables to madfam-tokens.css...');

const tokensPath = path.join(process.cwd(), 'src/styles/madfam-tokens.css');
let content = fs.readFileSync(tokensPath, 'utf-8');

// Find where to insert the new variables (after the semantic colors section)
const insertPoint = content.indexOf('  /* Bordes y divisores */');
if (insertPoint !== -1) {
  // Insert the new variables before the borders section
  content =
    content.slice(0, insertPoint) +
    newVariables +
    '\n\n' +
    content.slice(insertPoint);
  console.log('✅ Added light theme variables');
}

// Find the dark mode section and add the dark theme overrides
const darkModeSection = content.indexOf(
  '    /* Ajustar sombras para modo oscuro */'
);
if (darkModeSection !== -1) {
  const insertPoint = content.indexOf('  }\n}', darkModeSection);
  if (insertPoint !== -1) {
    content =
      content.slice(0, insertPoint) +
      '\n' +
      darkThemeVariables +
      '\n' +
      content.slice(insertPoint);
    console.log('✅ Added dark theme variables');
  }
}

// Write the updated content
fs.writeFileSync(tokensPath, content);

// Also need to add these variables to critical.css for immediate availability
const criticalPath = path.join(process.cwd(), 'src/styles/critical.css');
let criticalContent = fs.readFileSync(criticalPath, 'utf-8');

// Find the :root section and add the missing variables
const rootEnd = criticalContent.indexOf('}\n\n/* Dark theme overrides */');
if (rootEnd !== -1) {
  const additionalVars = `
  
  /* Theme-specific colors */
  --color-eco-green: #4caf50;
  --color-solar-yellow: #ffc107;
  --color-comedy-purple: #663399;
  --color-tech-blue: #2196f3;
  --color-community-orange: #ff6b35;
  --paper-texture-opacity: 0.1;
  --torn-edge-color: rgba(0, 0, 0, 0.12);
  --nav-text: #212121;
  --button-primary-bg: #ffc107;
  --button-primary-text: #212121;`;

  criticalContent =
    criticalContent.slice(0, rootEnd) +
    additionalVars +
    '\n' +
    criticalContent.slice(rootEnd);
}

// Add dark theme overrides to critical.css
const darkThemeEnd = criticalContent.indexOf(
  '}\n\n/* Reset and base styles */'
);
if (darkThemeEnd !== -1) {
  const darkVars = `
  --color-eco-green: #81c784;
  --color-solar-yellow: #ffd54f;
  --color-comedy-purple: #9575cd;
  --color-tech-blue: #64b5f6;
  --color-community-orange: #ff8a65;
  --paper-texture-opacity: 0.05;
  --torn-edge-color: rgba(255, 255, 255, 0.2);
  --nav-text: #ffffff;
  --button-primary-bg: #ffd54f;
  --button-primary-text: #212121;`;

  criticalContent =
    criticalContent.slice(0, darkThemeEnd) +
    darkVars +
    '\n' +
    criticalContent.slice(darkThemeEnd);
}

fs.writeFileSync(criticalPath, criticalContent);
console.log('✅ Updated critical.css with missing variables');

console.log('\n✅ Successfully added all missing CSS variables!');
