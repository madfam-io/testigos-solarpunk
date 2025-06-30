# 🌟 Guía de Contribución - Testigos de Solarpunk

¡Aleluya Solar! Gracias por tu interés en contribuir al universo de los Testigos de Solarpunk. Esta guía te ayudará a hacer que tu contribución sea aceptada rápidamente.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Guía de Contenido](#guía-de-contenido)
- [Proceso de Pull Request](#proceso-de-pull-request)

## 🤝 Código de Conducta

Este proyecto sigue los valores MADFAM:

- **Innovación**: Propuestas creativas y soluciones originales
- **Sostenibilidad**: Código eficiente y mantenible
- **Comunidad**: Colaboración respetuosa e inclusiva

Esperamos que todos los contribuyentes:

- Sean respetuosos y constructivos
- Acepten críticas constructivas
- Se enfoquen en lo mejor para la comunidad
- Muestren empatía hacia otros miembros

## 🎯 ¿Cómo puedo contribuir?

### 🐛 Reportando Bugs

- Usa la plantilla de issue para bugs
- Incluye pasos detallados para reproducir
- Añade capturas de pantalla si es relevante
- Menciona tu entorno (OS, navegador, etc.)

### ✨ Sugiriendo Mejoras

- Usa la plantilla de feature request
- Explica el problema que resuelve
- Describe la solución propuesta
- Considera alternativas

### 🌱 Añadiendo Contenido

- **Fase 1 - Sketches**: Guiones de 60-90 segundos con humor viral
- **Fase 2 - Podcast**: Temas y expertos para episodios
- **Fase 3 - MADLAB**: Actividades y experiencias educativas
- Personajes nuevos alineados con buyer personas
- Locaciones del universo solarpunk

### 💻 Contribuyendo Código

- Correcciones de bugs
- Nuevas características
- Mejoras de rendimiento
- Documentación

## 🔄 Proceso de Desarrollo

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/TU-USUARIO/testigos-solarpunk.git
cd testigos-solarpunk

# Añade el upstream
git remote add upstream https://github.com/madfam-io/testigos-solarpunk.git
```

### 2. Crear una Rama

```bash
# Actualiza tu main
git checkout main
git pull upstream main

# Crea una rama descriptiva
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
```

### 3. Instalar Dependencias

```bash
npm install
# o si prefieres pnpm
pnpm install
```

### 4. Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Verificar código mientras desarrollas
npm run lint
npm run type-check
```

### 5. Testing

```bash
# Ejecutar tests
npm test

# Ver cobertura
npm run test:coverage
```

### 6. Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Buenos ejemplos
git commit -m "feat(characters): add Hermana Lluvia character"
git commit -m "fix(navigation): correct mobile menu z-index"
git commit -m "docs(readme): update installation steps"
git commit -m "perf(images): implement lazy loading"

# Tipos permitidos:
# feat: Nueva característica
# fix: Corrección de bug
# docs: Cambios en documentación
# style: Cambios de formato (no afectan funcionalidad)
# refactor: Refactorización de código
# test: Añadir o modificar tests
# chore: Tareas de mantenimiento
# perf: Mejoras de rendimiento
```

## 📐 Estándares de Código

### TypeScript/JavaScript

- Usa TypeScript cuando sea posible
- Tipos explícitos para funciones públicas
- Evita `any`, usa tipos específicos
- Documenta funciones complejas con JSDoc

```typescript
/**
 * Calcula la eficiencia solar de un panel
 * @param watts - Potencia del panel en watts
 * @param hours - Horas de sol directo
 * @returns Energía generada en kWh
 */
export function calculateSolarOutput(watts: number, hours: number): number {
  return (watts * hours) / 1000;
}
```

### Componentes Astro

- Un componente por archivo
- Props tipadas con interfaces
- Nombres descriptivos en PascalCase

```astro
---
interface Props {
  character: Character;
  showDetails?: boolean;
}

const { character, showDetails = false } = Astro.props;
---

<article class="character-card">
  <!-- Contenido -->
</article>
```

### CSS

- Usa design tokens de `madfam-tokens.css`
- BEM para nombrado de clases
- Mobile-first responsive design
- Evita !important

```css
.character-card {
  padding: var(--space-md);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
}

.character-card__title {
  color: var(--madfam-yellow);
  font-size: var(--font-size-lg);
}

@media (min-width: 768px) {
  .character-card {
    padding: var(--space-lg);
  }
}
```

## 📝 Guía de Contenido

### Estrategia de 3 Fases

1. **Fase 1 - Atracción (Sketches)**

   - Duración: 60-90 segundos
   - Humor que rompe barreras culturales
   - Conecta con pain points de buyer personas
   - Optimizado para redes sociales

2. **Fase 2 - Conexión (Podcast)**

   - Duración: 20-30 minutos
   - Conversaciones con expertos
   - Soluciones prácticas y escalables
   - Construcción de comunidad

3. **Fase 3 - Conversión (MADLAB)**
   - Experiencias educativas presenciales
   - Actividades prácticas en escuelas
   - Impacto medible en comunidades

### Personajes

- Nombres temáticos evangelista-ecológicos
- Historia de conversión verde
- Milagro signature único
- Al menos 3 frases icónicas
- Alineación con buyer personas (Gaby, Carlos, Mari, Tomás, Lucía)

### Guiones

- Formato específico por plataforma
- Momentos virales marcados
- Duración apropiada según fase
- Hashtags estratégicos

### Tono y Estilo

- Humor respetuoso, nunca ofensivo
- Parodia afectuosa del evangelismo
- Mensaje ecológico positivo
- Esperanza y comunidad

## 🚀 Proceso de Pull Request

### Antes de Enviar

- [ ] Ejecuta `npm run check:all`
- [ ] Todos los tests pasan
- [ ] El código está formateado
- [ ] Has probado los cambios localmente
- [ ] La documentación está actualizada

### Creando el PR

1. Push a tu fork:

```bash
git push origin feature/tu-rama
```

2. Abre un PR en GitHub
3. Usa la plantilla de PR
4. Llena todos los campos requeridos
5. Enlaza issues relacionados

### Review Process

- Un maintainer revisará tu PR
- Pueden pedir cambios o mejoras
- Una vez aprobado, será mergeado
- ¡Tu contribución será parte del evangelio verde!

## 🎨 Recursos Útiles

### Herramientas

- [Astro Docs](https://docs.astro.build)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Scripts Útiles

```bash
# Crear nuevo personaje
npm run new:character

# Optimizar imágenes
npm run optimize:images

# Generar iconos PWA
npm run generate:icons

# Analizar bundle
npm run analyze:bundle
```

### Documentación del Proyecto

- `README.md` - Descripción general del proyecto
- `CLAUDE.md` - Guía para asistentes AI
- `CONTRIBUTING.md` - Esta guía de contribución
- `GITHUB_PAGES_SETUP.md` - Configuración de deployment

## 🙏 Agradecimientos

¡Gracias por contribuir a Testigos de Solarpunk! Cada contribución ayuda a expandir este universo de esperanza y sostenibilidad.

¡Que el sol brille para todos! ☀️🌱

---

Si tienes preguntas, no dudes en:

- Abrir un issue
- Contactar a los maintainers
- Unirte a la discusión en GitHub Discussions

¡Aleluya Solar!
