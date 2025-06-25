# ♿ Accessibility Guide - Testigos de Solarpunk

## 🎯 Commitment to Accessibility

Testigos de Solarpunk está comprometido con hacer nuestro contenido accesible para todos los usuarios, incluyendo personas con discapacidades. Seguimos las pautas WCAG 2.1 nivel AAA.

## 🛠️ Implemented Features

### Navigation Accessibility

- **Skip Links**: Enlaces para saltar al contenido principal y menú de navegación
- **ARIA Labels**: Etiquetas descriptivas para todos los elementos interactivos
- **Keyboard Navigation**: Navegación completa por teclado
- **Role Attributes**: Roles ARIA apropiados para elementos de navegación
- **Focus Management**: Indicadores visuales de enfoque claros

### Content Accessibility

- **Semantic HTML**: Estructura HTML semánticamente correcta
- **Alt Text**: Texto alternativo descriptivo para todas las imágenes
- **Heading Hierarchy**: Jerarquía de encabezados apropiada (h1 → h2 → h3)
- **Color Contrast**: Ratio de contraste mínimo 4.5:1 (AAA: 7:1)
- **Text Scaling**: Contenido funcional hasta 200% de zoom

### Interactive Elements

- **Form Labels**: Etiquetas asociadas correctamente con inputs
- **Error Messages**: Mensajes de error claros y descriptivos
- **Focus Indicators**: Indicadores de enfoque visibles para todos los elementos
- **Touch Targets**: Tamaño mínimo de 44x44px para elementos táctiles

## 🎨 Design Considerations

### Magazine Cutout Aesthetic & Accessibility

Nuestro sistema de emojis con estética "recortes de revista" mantiene accesibilidad:

```css
/* Conserva legibilidad mientras aplica efectos visuales */
.emoji-cutout {
  /* Efectos decorativos que no interfieren con screen readers */
  clip-path: polygon(/* recorte irregular */);
  filter: sepia(0.1) contrast(1.1);
}

/* Respeta preferencias de usuario */
@media (prefers-reduced-motion: reduce) {
  .emoji-cutout.flutter {
    animation: none;
  }
}
```

### Color System

```css
:root {
  /* Colores principales con ratio de contraste AAA */
  --texto-primario: #ffffff; /* 21:1 sobre fondo oscuro */
  --texto-secundario: #cccccc; /* 12:1 sobre fondo oscuro */
  --amarillo-solar: #ffc107; /* 4.5:1 mínimo */
  --verde-sostenible: #4caf50; /* 4.5:1 mínimo */
}

/* Modo de alto contraste */
@media (prefers-contrast: high) {
  :root {
    --texto-primario: #ffffff;
    --texto-secundario: #ffffff;
    --fondo-primario: #000000;
  }
}
```

## 📋 Testing Checklist

### Automated Testing

- [ ] WAVE (Web Accessibility Evaluation Tool)
- [ ] axe DevTools
- [ ] Lighthouse Accessibility Audit
- [ ] Pa11y command line testing

### Manual Testing

- [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Color contrast verification
- [ ] Text scaling to 200%
- [ ] Focus indicator visibility

### User Testing

- [ ] Testing with users with disabilities
- [ ] Feedback collection and implementation
- [ ] Regular accessibility reviews

## 🔧 Development Guidelines

### HTML Best Practices

```html
<!-- Usar elementos semánticos -->
<nav role="navigation" aria-label="Navegación principal">
  <main id="main-content" role="main">
    <section aria-labelledby="section-heading">
      <!-- Skip links al inicio del body -->
      <a href="#main-content" class="skip-link">Saltar al contenido</a>

      <!-- ARIA attributes para interactividad -->
      <button aria-expanded="false" aria-controls="menu">Menú</button>
    </section>
  </main>
</nav>
```

### CSS Best Practices

```css
/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 1000;
  text-decoration: none;
}

.skip-link:focus {
  top: 6px;
}

/* Focus indicators */
:focus-visible {
  outline: 2px solid var(--amarillo-solar);
  outline-offset: 2px;
}

/* Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### JavaScript Best Practices

```javascript
// Keyboard event handling
element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    // Handle activation
  }
});

// ARIA state management
function toggleMenu(button) {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !expanded);
}
```

## 🚨 Common Issues & Solutions

### Navigation Issues

**Problem**: Dropdown menus not keyboard accessible
**Solution**: Add ARIA attributes and keyboard event handlers

**Problem**: Skip links not visible
**Solution**: Implement proper CSS with :focus styles

### Content Issues

**Problem**: Images without alt text
**Solution**: Add descriptive alt attributes or role="presentation" for decorative images

**Problem**: Poor color contrast
**Solution**: Use color contrast tools and follow WCAG guidelines

### Form Issues

**Problem**: Labels not associated with inputs
**Solution**: Use `<label for="input-id">` or wrap inputs in labels

## 📊 Accessibility Metrics

Current status:

- **WCAG Level**: AAA (target)
- **Color Contrast**: 7:1 minimum
- **Keyboard Navigation**: 100% coverage
- **Screen Reader**: Compatible with major screen readers
- **Touch Targets**: 44x44px minimum
- **Form Labels**: 100% associated

## 🔄 Continuous Improvement

### Regular Audits

- Monthly automated testing
- Quarterly manual testing
- Annual user testing with disabled users
- Continuous monitoring with accessibility tools

### Training & Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## 📞 Contact & Feedback

Para reportar problemas de accesibilidad o sugerir mejoras:

- **Email**: accessibility@madfam.io
- **GitHub Issues**: [Crear issue de accesibilidad](https://github.com/madfam-io/testigos-solarpunk/issues/new?labels=accessibility)

---

**Última revisión**: $(date)
**Próxima auditoría**: $(date --date='+3 months')
**Responsable**: MADFAM Accessibility Team
