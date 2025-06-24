#!/usr/bin/env node

/**
 * Script para crear un nuevo personaje en el universo Testigos de Solarpunk
 * Genera el archivo YAML con la estructura correcta
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { slugify } from '../src/lib/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const CHARACTERS_DIR = path.join(ROOT_DIR, 'src/content/characters');

// Interfaz de línea de comandos
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisificar readline
const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

// Plantilla de personaje
function generateCharacterTemplate(data) {
  return `# ${data.nombre}
# ${data.titulo}

nombre: "${data.nombre}"
titulo: "${data.titulo}"
slug: "${data.slug}"

# Información básica
descripcion_corta: "${data.descripcion_corta}"
rol_principal: "${data.rol_principal}"
edad: ${data.edad}
ocupacion: "${data.ocupacion}"

# Apariencia y estilo
apariencia:
  estatura: "${data.estatura}"
  complexion: "${data.complexion}"
  cabello: "${data.cabello}"
  ojos: "${data.ojos}"
  rasgos_distintivos: "${data.rasgos_distintivos}"
  vestimenta: "${data.vestimenta}"
  gadget_sagrado: "${data.gadget_sagrado}"

# Personalidad
personalidad:
  rasgos_principales:
    - "${data.rasgo1}"
    - "${data.rasgo2}"
    - "${data.rasgo3}"
  motivaciones:
    - "${data.motivacion1}"
    - "${data.motivacion2}"
  miedos:
    - "${data.miedo1}"
    - "${data.miedo2}"

# Habilidades
habilidades:
  - "${data.habilidad1}"
  - "${data.habilidad2}"
  - "${data.habilidad3}"

valores:
  - "${data.valor1}"
  - "${data.valor2}"

# Elementos evangelistas paródicos
cita_biblica_parodia: "${data.cita_biblica}"
sermon_ecologico: |
  ${data.sermon_ecologico}

milagro_verde_signature: "${data.milagro_verde}"

# Historia
historia_origen: |
  ${data.historia_origen}

momento_conversion: "${data.momento_conversion}"

# Contenido viral
frases_iconicas:
  - "${data.frase1}"
  - "${data.frase2}"
  - "${data.frase3}"

momento_viral_signature: "${data.momento_viral}"

# Relaciones (opcional - descomenta si aplica)
# relaciones:
#   - nombre: "Otro Personaje"
#     tipo: "Mentor|Discípulo|Rival|Aliado"
#     descripcion: "Descripción de la relación"

# Apariciones (opcional - descomenta si aplica)
# primera_aparicion: "EP001-TT"
# episodios_principales:
#   - "EP001-TT: El Despertar Solar"

# Metadata
tags:
  - "${data.tag1}"
  - "${data.tag2}"
  - "${data.tag3}"
seo_description: "${data.seo_description}"
`;
}

// Opciones predefinidas
const ROLES = ['Protagonista', 'Antagonista', 'Secundario', 'Cameo'];
const TITULOS_SUGERIDOS = [
  'El/La Profeta de [Elemento Verde]',
  'El/La Guardián/a de [Lugar Sagrado]',
  'El/La Evangelista de [Tecnología]',
  'El/La Converso/a de [Industria]',
  'El/La Testimonio de [Milagro]',
];

async function main() {
  console.log('🌟 Creador de Personajes - Testigos de Solarpunk 🌟\n');
  console.log(
    'Este asistente te ayudará a crear un nuevo personaje evangelista ecológico.\n'
  );

  try {
    // Recopilar información
    const data = {};

    // Información básica
    console.log('=== INFORMACIÓN BÁSICA ===\n');
    data.nombre = await question('Nombre completo del personaje: ');

    console.log('\nSugerencias de títulos:');
    TITULOS_SUGERIDOS.forEach((titulo, i) =>
      console.log(`  ${i + 1}. ${titulo}`)
    );
    data.titulo = await question(
      '\nTítulo evangelista (ej: La Profeta de los Paneles Sagrados): '
    );

    data.slug = slugify(data.nombre);
    console.log(`Slug generado: ${data.slug}`);

    data.descripcion_corta = await question('Descripción corta (una línea): ');

    console.log('\nRoles disponibles:');
    ROLES.forEach((rol, i) => console.log(`  ${i + 1}. ${rol}`));
    const rolIndex = await question('Selecciona el rol (1-4): ');
    data.rol_principal = ROLES[parseInt(rolIndex) - 1] || 'Secundario';

    data.edad = await question('Edad: ');
    data.ocupacion = await question('Ocupación (con toque evangelista): ');

    // Apariencia
    console.log('\n=== APARIENCIA ===\n');
    data.estatura = await question('Estatura (ej: Alta, Media, Baja): ');
    data.complexion = await question(
      'Complexión (ej: Delgada, Atlética, Robusta): '
    );
    data.cabello = await question('Cabello: ');
    data.ojos = await question('Ojos: ');
    data.rasgos_distintivos = await question('Rasgos distintivos: ');
    data.vestimenta = await question('Vestimenta eco-evangelista: ');
    data.gadget_sagrado = await question(
      'Gadget sagrado (herramienta tecnológica-espiritual): '
    );

    // Personalidad
    console.log('\n=== PERSONALIDAD ===\n');
    data.rasgo1 = await question('Rasgo de personalidad 1: ');
    data.rasgo2 = await question('Rasgo de personalidad 2: ');
    data.rasgo3 = await question('Rasgo de personalidad 3: ');
    data.motivacion1 = await question('Motivación principal: ');
    data.motivacion2 = await question('Motivación secundaria: ');
    data.miedo1 = await question('Miedo principal: ');
    data.miedo2 = await question('Miedo secundario: ');

    // Habilidades
    console.log('\n=== HABILIDADES Y VALORES ===\n');
    data.habilidad1 = await question('Habilidad 1 (técnica/ecológica): ');
    data.habilidad2 = await question('Habilidad 2 (social/evangelista): ');
    data.habilidad3 = await question('Habilidad 3 (única/signature): ');
    data.valor1 = await question('Valor principal: ');
    data.valor2 = await question('Valor secundario: ');

    // Elementos evangelistas
    console.log('\n=== ELEMENTOS EVANGELISTAS PARÓDICOS ===\n');
    data.cita_biblica = await question(
      'Cita bíblica paródica (adaptación ecológica): '
    );
    console.log('Sermón ecológico (termina con línea vacía):');
    let sermon = '';
    let line;
    while ((line = await question('  ')) !== '') {
      sermon += '  ' + line + '\n';
    }
    data.sermon_ecologico = sermon.trim();

    data.milagro_verde = await question('Milagro verde signature: ');

    // Historia
    console.log('\n=== HISTORIA DE ORIGEN ===\n');
    console.log('Historia de origen (termina con línea vacía):');
    let historia = '';
    while ((line = await question('  ')) !== '') {
      historia += '  ' + line + '\n';
    }
    data.historia_origen = historia.trim();

    data.momento_conversion = await question(
      'Momento de conversión ecológica: '
    );

    // Contenido viral
    console.log('\n=== CONTENIDO VIRAL ===\n');
    data.frase1 = await question('Frase icónica 1: ');
    data.frase2 = await question('Frase icónica 2: ');
    data.frase3 = await question('Frase icónica 3: ');
    data.momento_viral = await question('Momento viral signature: ');

    // Metadata
    console.log('\n=== METADATA ===\n');
    data.tag1 = await question('Tag 1: ');
    data.tag2 = await question('Tag 2: ');
    data.tag3 = await question('Tag 3: ');
    data.seo_description = await question(
      'Descripción SEO (máx 160 caracteres): '
    );

    // Generar archivo
    const yamlContent = generateCharacterTemplate(data);
    const fileName = `${data.slug}.yaml`;
    const filePath = path.join(CHARACTERS_DIR, fileName);

    // Verificar si existe
    try {
      await fs.access(filePath);
      const overwrite = await question(
        `\n⚠️  El archivo ${fileName} ya existe. ¿Sobrescribir? (s/n): `
      );
      if (overwrite.toLowerCase() !== 's') {
        console.log('Operación cancelada.');
        rl.close();
        return;
      }
    } catch {
      // El archivo no existe, continuar
    }

    // Guardar archivo
    await fs.writeFile(filePath, yamlContent, 'utf8');

    console.log('\n' + '='.repeat(60));
    console.log('✅ ¡Personaje creado exitosamente!');
    console.log('='.repeat(60));
    console.log(`📁 Archivo: ${filePath}`);
    console.log(`🌟 ${data.nombre} - ${data.titulo}`);
    console.log('\n¡Aleluya Solar! El nuevo testigo ha sido registrado.\n');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

// Ejecutar
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
