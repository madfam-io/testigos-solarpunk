# 🚀 Deployment Guide - Testigos de Solarpunk

## Overview

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages usando GitHub Actions. Cada push a la rama `main` dispara una nueva construcción y despliegue.

## 🌐 Production URL

**Live Site**: [https://madfam-io.github.io/testigos-solarpunk/](https://madfam-io.github.io/testigos-solarpunk/)

## 🏗️ Build Process

### Automatic Deployment

1. **Trigger**: Push o merge a rama `main`
2. **CI/CD**: GitHub Actions ejecuta el workflow `.github/workflows/deploy.yml`
3. **Build**:
   - `npm ci` - Instalación limpia de dependencias
   - `npm run check:all` - Verificación de calidad (lint, typecheck, tests)
   - `npm run build` - Construcción para producción
4. **Deploy**: Archivos estáticos se publican en `gh-pages` branch
5. **Validation**: Tests de accesibilidad y performance

### Manual Deployment

```bash
# Construcción local para verificar
npm run build

# Preview del build
npm run preview

# Desplegar manualmente (solo para mantenedores)
npm run deploy
```

## ⚙️ Configuration

### GitHub Pages Settings

- **Source**: Deploy from a branch
- **Branch**: `gh-pages`
- **Folder**: `/ (root)`
- **Base Path**: `/testigos-solarpunk/`

### Astro Configuration

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://madfam-io.github.io',
  base: '/testigos-solarpunk',
  // ... otras configuraciones
});
```

### Environment Variables

| Variable   | Description                | Required |
| ---------- | -------------------------- | -------- |
| `BASE_URL` | Base path for GitHub Pages | ✅       |
| `SITE_URL` | Full site URL              | ✅       |

## 🔍 Quality Gates

Antes de cada despliegue, se ejecutan automáticamente:

### Code Quality

- **ESLint**: Verificación de estilo de código
- **TypeScript**: Verificación de tipos
- **Prettier**: Formateo automático

### Testing

- **Unit Tests**: Vitest para lógica de componentes
- **E2E Tests**: Playwright para flujos críticos
- **Accessibility Tests**: Verificación WCAG AAA

### Performance

- **Bundle Analysis**: Verificación de tamaño
- **Lighthouse**: Score mínimo de 90 en todas las categorías

## 🚨 Troubleshooting

### Common Issues

#### 404 en assets estáticos

```bash
# Verificar que el base path esté configurado
echo $BASE_URL
# Debe mostrar: /testigos-solarpunk
```

#### Build failures

```bash
# Verificar logs completos
npm run check:all
npm run build -- --verbose
```

#### Routing issues

- Verificar que todas las rutas incluyan el `basePath`
- Comprobar trailing slashes en URLs

### Debug Build Locally

```bash
# Simular ambiente de producción
npm run build
npm run preview

# Verificar URLs con base path
open http://localhost:4321/testigos-solarpunk/
```

## 📊 Monitoring

### Analytics Dashboard

- **Google Analytics**: Configurado en BaseLayout.astro
- **GitHub Pages**: Estadísticas en Settings > Pages

### Performance Monitoring

- **Lighthouse CI**: Ejecutado en cada despliegue
- **Bundle Size**: Tracking automático en PRs

### Error Tracking

- **Service Worker**: Caché y offline functionality
- **Console Logs**: Error monitoring para debugging

## 🔄 Rollback Process

### Automatic Rollback

Si el build falla, el sitio anterior se mantiene activo.

### Manual Rollback

```bash
# Revertir a commit anterior
git revert <commit-hash>
git push origin main

# O rollback directo en GitHub Pages
# Settings > Pages > Source > Select previous deployment
```

## 🚀 Performance Optimization

### Build Optimizations

- **Code Splitting**: Automático por Astro
- **Asset Optimization**: Imágenes y fuentes optimizadas
- **CSS Purging**: Eliminación de CSS no utilizado

### CDN & Caching

- **GitHub Pages CDN**: Distribución global automática
- **Service Worker**: Caché inteligente de assets
- **Browser Caching**: Headers optimizados

## 📋 Deployment Checklist

- [ ] Tests pasando
- [ ] Build local exitoso
- [ ] Lighthouse score > 90
- [ ] Accesibilidad WCAG AAA
- [ ] Assets optimizados
- [ ] Meta tags actualizados
- [ ] Sitemap generado
- [ ] Service Worker actualizado

## 🤝 Contributing to Deployment

Para mejorar el proceso de despliegue:

1. Modificar `.github/workflows/deploy.yml`
2. Actualizar `astro.config.mjs`
3. Probar cambios en branch de feature
4. Documentar cambios en este archivo

---

**Última actualización**: $(date)
**Mantenedor**: MADFAM Team
**Soporte**: [GitHub Issues](https://github.com/madfam-io/testigos-solarpunk/issues)
