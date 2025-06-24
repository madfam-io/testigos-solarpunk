# 🌱 Testigos de Solarpunk - Sitio Web del Universo

Sitio web estático integral que sirve como la documentación definitiva del universo creativo de "Testigos de Solarpunk". Este sitio es el centro principal donde creadores de contenido, actores, directores, patrocinadores y partes interesadas del solarpunk pueden explorar personajes, acceder a guiones, entender el mundo y navegar todo el ecosistema creativo.

## 🎯 Características Principales

- **Biblia de Personajes**: Perfiles detallados, relaciones y evolución narrativa
- **Repositorio de Guiones**: Episodios organizados por plataforma (TikTok, Instagram, YouTube)
- **Construcción del Mundo**: Ubicaciones, tecnología, estructura social, línea temporal
- **Recursos de Producción**: Guías de estilo, referencias de tono, mood boards visuales
- **Portal para Interesados**: Información para patrocinadores, colaboradores y defensores

## 🚀 Estructura del Proyecto

```text
testigos-solarpunk/
├── .github/
│   └── workflows/      # GitHub Actions para deployment automático
├── public/
│   ├── favicon.svg
│   └── downloads/      # Recursos descargables
├── src/
│   ├── components/     # Componentes reutilizables
│   │   ├── CharacterCard.astro
│   │   └── ScriptViewer.astro
│   ├── content/        # Contenido estructurado
│   │   ├── characters/ # Perfiles de personajes (YAML)
│   │   ├── scripts/    # Guiones de episodios (Markdown)
│   │   ├── locations/  # Ubicaciones del mundo (YAML)
│   │   └── resources/  # Recursos y guías (Markdown)
│   ├── layouts/        # Layouts principales
│   │   └── BaseLayout.astro
│   ├── pages/          # Páginas del sitio
│   │   ├── index.astro
│   │   ├── personajes/
│   │   ├── guiones/
│   │   ├── mundo/
│   │   ├── produccion/
│   │   └── recursos/
│   └── styles/         # Estilos globales
│       └── global.css
├── astro.config.mjs    # Configuración de Astro
└── package.json        # Dependencias y scripts
```

## 🛠️ Instalación y Desarrollo

### Prerrequisitos

- Node.js 18 o superior
- pnpm (recomendado) o npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/madfam-io/testigos-solarpunk.git
cd testigos-solarpunk

# Instalar dependencias con pnpm
pnpm install

# O con npm
npm install
```

### Comandos de Desarrollo

| Comando        | Acción                                            |
| :------------- | :------------------------------------------------ |
| `pnpm dev`     | Inicia servidor de desarrollo en `localhost:4321` |
| `pnpm build`   | Construye el sitio para producción en `./dist/`   |
| `pnpm preview` | Vista previa del build de producción              |
| `pnpm deploy`  | Construye y despliega a GitHub Pages              |

## 🌐 Deployment

El sitio se despliega automáticamente a GitHub Pages cuando se hace push a la rama `main`.

- **URL de Producción**: https://madfam-io.github.io/testigos-solarpunk/
- **Dominio Personalizado** (opcional): https://universo.testigosdesolarpunk.mx

### Deployment Manual

```bash
# Construir y desplegar manualmente
pnpm deploy
```

## 📝 Añadir Contenido

### Nuevo Personaje

Crear archivo en `src/content/characters/nombre-personaje.yaml`:

```yaml
nombre: Nombre del Personaje
rol: Protagonista/Apoyo/Comunidad
edad: 25
pronombres: ella/she
ocupacion: Descripción del trabajo
rasgos:
  - Rasgo 1
  - Rasgo 2
historia: |
  Historia detallada del personaje...
```

### Nuevo Guión

Crear archivo en `src/content/scripts/EP00X-PLATAFORMA.md`:

```markdown
---
episodio: EP00X-TT
titulo: 'Título del Episodio'
plataforma: TikTok
duracion: 45s
personajes: [personaje-1, personaje-2]
estado: borrador
---

## Visual

Descripción de elementos visuales...

## Diálogo

**PERSONAJE**:
Línea de diálogo...
```

### Nueva Ubicación

Crear archivo en `src/content/locations/nombre-ubicacion.yaml`:

```yaml
nombre: Nombre de la Ubicación
tipo: Tipo de lugar
distrito: Distrito o zona
descripcion: |
  Descripción detallada...
caracteristicas:
  - Característica 1
  - Característica 2
```

## 🎨 Diseño y Estilos

El sitio utiliza el sistema de diseño MADFAM con extensiones solarpunk:

### Paleta de Colores

```css
/* Paleta Principal MADFAM */
--amarillo-solar: #ffc107;
--verde-sostenible: #4caf50;
--purpura-creativo: #663399;
--azul-tecnologico: #2196f3;
--negro-profundo: #212121;

/* Paleta Extendida Solarpunk */
--bio-luminiscente: #7fff00;
--cielo-esperanza: #87ceeb;
--tierra-cafe: #8b4513;
--agua-clara: #00ced1;
--naranja-comunidad: #ff6b35;
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📜 Licencia

Este proyecto está bajo licencia Creative Commons BY-SA 4.0. Consulta el archivo LICENSE para más detalles.

## 🌟 Créditos

- **Concepto Original**: MADFAM
- **Desarrollo Web**: Equipo Testigos de Solarpunk
- **Framework**: [Astro](https://astro.build)

---

Hecho con 💚 para un futuro más esperanzador
