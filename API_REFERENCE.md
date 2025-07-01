# 📚 API Reference - Testigos de Solarpunk

<div align="center">

[![Version](https://img.shields.io/badge/API_Version-v0.4.0-blue)](.)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org)
[![Documentation](https://img.shields.io/badge/Documentation-Complete-green)](./docs)

**Complete API documentation for all core systems and interfaces**

[Español](#español) | [English](#english)

</div>

---

## Español

### 📋 Tabla de Contenidos

1. [Sistema de Internacionalización (i18n)](#sistema-de-internacionalización-i18n)
2. [Sistema de Temas](#sistema-de-temas)
3. [Componentes de Layout](#componentes-de-layout)
4. [Componentes de Contenido](#componentes-de-contenido)
5. [Componentes Interactivos](#componentes-interactivos)
6. [Sistema Magazine Cutout](#sistema-magazine-cutout)
7. [Utilidades y Helpers](#utilidades-y-helpers)
8. [Health Check APIs](#health-check-apis)
9. [Tipos de Contenido](#tipos-de-contenido)
10. [Hooks y Eventos](#hooks-y-eventos)

---

## 🌐 Sistema de Internacionalización (i18n)

### Core i18n API

```typescript
// src/i18n/config.ts

// Idiomas soportados
export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Language = keyof typeof languages;

// Idioma por defecto
export const defaultLang: Language = 'es';

// UI Translations Object
export const ui: Record<Language, TranslationKeys> = {
  es: {
    /* ... */
  },
  en: {
    /* ... */
  },
};

// Función principal de traducción
export function useTranslations(lang: Language) {
  return function t(
    key: keyof (typeof ui)[typeof defaultLang],
    params?: Record<string, string | number>
  ): string {
    const translation = ui[lang]?.[key] || ui[defaultLang][key];

    if (params && translation) {
      return Object.entries(params).reduce(
        (str, [key, value]) => str.replace(`{${key}}`, String(value)),
        translation
      );
    }

    return translation || key;
  };
}

// Detectar idioma del navegador
export function detectLanguage(acceptLang: string): Language | null {
  const primaryLang = acceptLang.split(',')[0]?.split('-')[0];
  if (primaryLang && primaryLang in languages) {
    return primaryLang as Language;
  }
  return null;
}

// Obtener rutas traducidas
export function getRouteTranslations(route: string): Record<Language, string> {
  return Object.keys(languages).reduce(
    (acc, lang) => {
      acc[lang as Language] = `/${lang}${route}`;
      return acc;
    },
    {} as Record<Language, string>
  );
}
```

### Uso en Componentes

```astro
---
// Component.astro
import { useTranslations } from '@/i18n/config';

const { lang } = Astro.props;
const t = useTranslations(lang);
---

<h1>{t('page.title')}</h1>
<p>{t('welcome.message', { name: 'Usuario' })}</p>
```

### Translation Keys Interface

```typescript
interface TranslationKeys {
  // Navegación
  'nav.home': string;
  'nav.project': string;
  'nav.content': string;
  'nav.sketches': string;
  'nav.podcast': string;
  'nav.madlab': string;
  'nav.philosophy': string;
  'nav.community': string;
  'nav.impact': string;

  // UI común
  'ui.loading': string;
  'ui.error': string;
  'ui.learn.more': string;
  'ui.close': string;
  'ui.open': string;
  'ui.menu': string;

  // CTAs
  'cta.watch': string;
  'cta.listen': string;
  'cta.subscribe': string;
  'cta.share': string;
  'cta.contact': string;

  // [... más claves ...]
}
```

---

## 🎨 Sistema de Temas

### Theme Manager API

```typescript
// src/utils/theme-manager.ts

export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  theme: Theme;
  systemTheme?: 'light' | 'dark';
  resolvedTheme: 'light' | 'dark';
}

export class ThemeManager {
  private static STORAGE_KEY = 'theme-preference';

  // Obtener tema actual
  static getCurrentTheme(): Theme {
    if (typeof window === 'undefined') return 'auto';
    return (localStorage.getItem(this.STORAGE_KEY) as Theme) || 'auto';
  }

  // Establecer tema
  static setTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem(this.STORAGE_KEY, theme);
    this.applyTheme(theme);
    this.dispatchThemeChangeEvent(theme);
  }

  // Aplicar tema al DOM
  private static applyTheme(theme: Theme): void {
    const root = document.documentElement;
    const systemTheme = this.getSystemTheme();
    const resolvedTheme = theme === 'auto' ? systemTheme : theme;

    root.setAttribute('data-theme', resolvedTheme);
    root.style.colorScheme = resolvedTheme;

    // Actualizar meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#121212' : '#ffffff'
      );
    }
  }

  // Detectar tema del sistema
  static getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  // Escuchar cambios de tema
  static onThemeChange(callback: (theme: Theme) => void): () => void {
    const handler = (event: CustomEvent<{ theme: Theme }>) => {
      callback(event.detail.theme);
    };

    window.addEventListener('theme-change', handler as EventListener);
    return () =>
      window.removeEventListener('theme-change', handler as EventListener);
  }

  // Disparar evento de cambio
  private static dispatchThemeChangeEvent(theme: Theme): void {
    window.dispatchEvent(
      new CustomEvent('theme-change', { detail: { theme } })
    );
  }
}
```

### Theme CSS Variables

```css
/* Variables de tema claro */
[data-theme='light'] {
  /* Colores principales */
  --color-primary: #ffc107;
  --color-primary-dark: #f9a825;
  --color-secondary: #4caf50;
  --color-accent: #2196f3;

  /* Fondos */
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --bg-tertiary: #e0e0e0;

  /* Texto */
  --text-primary: #212121;
  --text-secondary: #757575;
  --text-on-primary: #000000;

  /* Bordes y sombras */
  --border-color: #e0e0e0;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

/* Variables de tema oscuro */
[data-theme='dark'] {
  /* Colores principales */
  --color-primary: #ffd54f;
  --color-primary-dark: #ffc107;
  --color-secondary: #66bb6a;
  --color-accent: #42a5f5;

  /* Fondos */
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --bg-tertiary: #2c2c2c;

  /* Texto */
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --text-on-primary: #000000;

  /* Bordes y sombras */
  --border-color: #424242;
  --shadow-color: rgba(255, 255, 255, 0.1);
}
```

---

## 🏗️ Componentes de Layout

### BaseLayout

```typescript
// src/layouts/BaseLayout.astro
export interface BaseLayoutProps {
  title: string;
  description: string;
  lang: Language;
  canonicalURL?: string;
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: object;
}
```

### Navigation

```typescript
// src/components/Navigation.astro
export interface NavigationProps extends HTMLAttributes<'nav'> {
  lang: Language;
  currentPath: string;
  sticky?: boolean;
  compact?: boolean;
  transparent?: boolean;
}

// Estructura de navegación
export interface NavItem {
  label: TranslationKey;
  href: string;
  icon?: string;
  children?: NavItem[];
  external?: boolean;
}

export const navigationItems: NavItem[] = [
  {
    label: 'nav.project',
    href: '/proyecto/',
    icon: '🎯',
  },
  {
    label: 'nav.content',
    href: '/contenido/',
    icon: '🎬',
    children: [
      { label: 'nav.sketches', href: '/contenido/sketches/', icon: '🎭' },
      { label: 'nav.podcast', href: '/contenido/podcast/', icon: '🎙️' },
      { label: 'nav.madlab', href: '/contenido/madlab/', icon: '🔬' },
    ],
  },
  // ...
];
```

### Container

```typescript
// src/components/Container.astro
export interface ContainerProps extends HTMLAttributes<'div'> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  centered?: boolean;
}

// Tamaños de container
const containerSizes = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  full: '100%',
};
```

### Grid

```typescript
// src/components/Grid.astro
export interface GridProps extends HTMLAttributes<'div'> {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
}
```

### Section

```typescript
// src/components/Section.astro
export interface SectionProps extends HTMLAttributes<'section'> {
  lang: Language;
  title?: string;
  subtitle?: string;
  background?: 'default' | 'subtle' | 'accent' | 'gradient';
  spacing?: 'compact' | 'normal' | 'large';
  centered?: boolean;
  fullWidth?: boolean;
}
```

---

## 📱 Componentes de Contenido

### Hero

```typescript
// src/components/Hero.astro
export interface HeroProps {
  lang: Language;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCta?: {
    text: string;
    link: string;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
  variant?: 'default' | 'video' | 'split' | 'minimal';
  height?: 'auto' | 'screen' | '50vh' | '75vh';
  overlay?: boolean;
  overlayOpacity?: number;
}
```

### SketchCard

```typescript
// src/components/SketchCard.astro
export interface SketchData {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  episode: number;
  videoUrl?: string;
  publishedAt?: Date;
  views?: string;
  likes?: string;
  theme: 'sustainability' | 'technology' | 'social';
  characters: string[];
}

export interface SketchCardProps {
  lang: Language;
  sketch: SketchData;
  featured?: boolean;
  horizontal?: boolean;
  showMetrics?: boolean;
  lazyLoad?: boolean;
}
```

### CharacterCard

```typescript
// src/components/CharacterCard.astro
export interface CharacterData {
  name: string;
  role: string;
  description: string;
  image: string;
  traits: string[];
  color?: string;
  age?: number;
  occupation?: string;
  painPoint?: string;
  favoriteSketch?: string;
}

export interface CharacterCardProps {
  lang: Language;
  character: CharacterData;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact' | 'detailed';
  showTraits?: boolean;
}
```

### PhaseCard

```typescript
// src/components/PhaseCard.astro
export interface PhaseCardProps {
  lang: Language;
  phase: 1 | 2 | 3;
  title: string;
  description: string;
  icon: string;
  status: 'active' | 'coming' | 'planning';
  features?: string[];
  metrics?: {
    label: string;
    value: string | number;
  }[];
  link?: string;
  startDate?: string;
  endDate?: string;
}
```

### MetricCard

```typescript
// src/components/MetricCard.astro
export interface MetricCardProps {
  lang: Language;
  value: string | number;
  label: string;
  icon?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  animate?: boolean;
  format?: 'number' | 'percentage' | 'currency';
  size?: 'sm' | 'md' | 'lg';
}
```

---

## 🎯 Componentes Interactivos

### Button

```typescript
// src/components/Button.astro
export interface ButtonProps extends HTMLAttributes<'button'> {
  lang: Language;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  href?: string; // Convierte en link
  external?: boolean; // Para links externos
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
```

### Modal

```typescript
// src/components/Modal.astro
export interface ModalProps {
  lang: Language;
  id: string;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  persistent?: boolean;
  centered?: boolean;
  scrollBehavior?: 'inside' | 'outside';
}

// Modal Manager
export class ModalManager {
  static open(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.setAttribute('data-open', 'true');
      document.body.style.overflow = 'hidden';
      this.trapFocus(modal);
    }
  }

  static close(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.removeAttribute('data-open');
      document.body.style.overflow = '';
      this.releaseFocus();
    }
  }

  static toggle(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal?.hasAttribute('data-open')) {
      this.close(modalId);
    } else {
      this.open(modalId);
    }
  }

  private static trapFocus(element: HTMLElement): void {
    // Implementación de focus trap
  }

  private static releaseFocus(): void {
    // Liberar focus trap
  }
}
```

### Tabs

```typescript
// src/components/Tabs.astro
export interface TabData {
  id: string;
  label: string;
  content: string | AstroComponent;
  icon?: string;
  disabled?: boolean;
}

export interface TabsProps {
  lang: Language;
  tabs: TabData[];
  defaultTab?: string;
  variant?: 'line' | 'pills' | 'enclosed' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  lazy?: boolean; // Lazy load tab content
  onChange?: (tabId: string) => void;
}
```

### Accordion

```typescript
// src/components/Accordion.astro
export interface AccordionItem {
  id: string;
  title: string;
  content: string | AstroComponent;
  icon?: string;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  lang: Language;
  items: AccordionItem[];
  variant?: 'default' | 'bordered' | 'separated';
  allowMultiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}
```

---

## 🎭 Sistema Magazine Cutout

### Magazine Cutout CSS System

```typescript
// Sistema completo de clases CSS para emojis

// Tamaños
type EmojiSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Contextos
type EmojiContext = 'nav' | 'hero' | 'card' | 'button' | 'inline';

// Temas
type EmojiTheme = 'solar' | 'green' | 'purple' | 'community';

// Props del sistema
interface MagazineCutoutProps {
  emoji: string;
  size?: EmojiSize;
  context?: EmojiContext;
  theme?: EmojiTheme;
  animated?: boolean;
  rotation?: number;
  shadow?: boolean;
}
```

### MagazineCutoutImage

```typescript
// src/components/MagazineCutoutImage.astro
export interface MagazineCutoutImageProps extends HTMLAttributes<'div'> {
  src: string;
  alt: string;
  tape?: 'none' | 'corner' | 'top' | 'random';
  tapeColor?: 'default' | 'yellow' | 'green' | 'purple';
  rotation?: number;
  shadow?: boolean;
  torn?: boolean;
  width?: string | number;
  height?: string | number;
  lazy?: boolean;
}
```

### EmojiCutout

```typescript
// src/components/EmojiCutout.astro
export interface EmojiCutoutProps extends HTMLAttributes<'span'> {
  emoji: string;
  size?: EmojiSize;
  context?: EmojiContext;
  theme?: EmojiTheme;
  animated?: boolean;
  rotation?: number;
  flutter?: boolean;
  interactive?: boolean;
}
```

### TapeDecoration

```typescript
// src/components/TapeDecoration.astro
export interface TapeDecorationProps {
  variant?: 'horizontal' | 'vertical' | 'diagonal';
  color?: 'default' | 'yellow' | 'green' | 'purple' | 'transparent';
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'center';
  width?: string;
  height?: string;
  rotation?: number;
  opacity?: number;
}
```

---

## 🔧 Utilidades y Helpers

### URL Builders

```typescript
// src/utils/url-builders.ts

export function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean>
): string {
  const url = new URL(path, import.meta.env.SITE);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

export function getLocalizedUrl(
  path: string,
  lang: Language,
  includeBase = true
): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const localizedPath = `/${lang}${cleanPath}`;

  if (includeBase && import.meta.env.BASE_URL) {
    return `${import.meta.env.BASE_URL}${localizedPath}`.replace(/\/+/g, '/');
  }

  return localizedPath;
}

export function getCurrentUrl(Astro: AstroGlobal): string {
  return Astro.url.pathname;
}
```

### Image Optimization

```typescript
// src/utils/image-helpers.ts

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  quality?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export function getOptimizedImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  // Implementación específica según el servicio de optimización
  const params = new URLSearchParams();

  if (options.width) params.append('w', String(options.width));
  if (options.height) params.append('h', String(options.height));
  if (options.format) params.append('fm', options.format);
  if (options.quality) params.append('q', String(options.quality));
  if (options.fit) params.append('fit', options.fit);

  return `${src}?${params.toString()}`;
}

export function generateSrcSet(
  src: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): string {
  return widths
    .map((width) => `${getOptimizedImageUrl(src, { width })} ${width}w`)
    .join(', ');
}
```

### Animation Utilities

```typescript
// src/utils/animation-helpers.ts

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
  iterations?: number | 'infinite';
}

export function animate(
  element: HTMLElement,
  keyframes: Keyframe[],
  options: AnimationOptions = {}
): Animation {
  const defaultOptions: KeyframeAnimationOptions = {
    duration: options.duration || 300,
    delay: options.delay || 0,
    easing: options.easing || 'ease-out',
    fill: options.fill || 'both',
    iterations: options.iterations || 1,
  };

  return element.animate(keyframes, defaultOptions);
}

export function fadeIn(
  element: HTMLElement,
  options?: AnimationOptions
): Animation {
  return animate(
    element,
    [
      { opacity: 0, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    options
  );
}

export function slideIn(
  element: HTMLElement,
  direction: 'left' | 'right' | 'up' | 'down',
  options?: AnimationOptions
): Animation {
  const transforms = {
    left: ['translateX(-100%)', 'translateX(0)'],
    right: ['translateX(100%)', 'translateX(0)'],
    up: ['translateY(100%)', 'translateY(0)'],
    down: ['translateY(-100%)', 'translateY(0)'],
  };

  return animate(
    element,
    [
      { transform: transforms[direction][0], opacity: 0 },
      { transform: transforms[direction][1], opacity: 1 },
    ],
    options
  );
}
```

### Storage Utilities

```typescript
// src/utils/storage-helpers.ts

export interface StorageOptions {
  expires?: number; // Minutos hasta expiración
  secure?: boolean; // Encriptar datos
}

export class StorageManager {
  static setItem(key: string, value: any, options: StorageOptions = {}): void {
    const data = {
      value,
      timestamp: Date.now(),
      expires: options.expires
        ? Date.now() + options.expires * 60 * 1000
        : null,
    };

    const serialized = JSON.stringify(data);
    const finalData = options.secure ? this.encrypt(serialized) : serialized;

    localStorage.setItem(key, finalData);
  }

  static getItem<T>(key: string, secure = false): T | null {
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    try {
      const data = secure ? this.decrypt(stored) : stored;
      const parsed = JSON.parse(data);

      // Verificar expiración
      if (parsed.expires && Date.now() > parsed.expires) {
        localStorage.removeItem(key);
        return null;
      }

      return parsed.value as T;
    } catch {
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }

  private static encrypt(data: string): string {
    // Implementación básica - usar librería crypto en producción
    return btoa(encodeURIComponent(data));
  }

  private static decrypt(data: string): string {
    // Implementación básica - usar librería crypto en producción
    return decodeURIComponent(atob(data));
  }
}
```

---

## 🏥 Health Check APIs

### i18n Health Check

```typescript
// scripts/health-check-i18n.ts

export interface I18nHealthCheckResult {
  status: 'healthy' | 'warning' | 'error';
  missingTranslations: Array<{
    key: string;
    languages: Language[];
  }>;
  unusedTranslations: string[];
  duplicateKeys: string[];
  coverage: {
    [key in Language]: number; // Porcentaje
  };
  suggestions: string[];
}

export async function runI18nHealthCheck(): Promise<I18nHealthCheckResult> {
  // Implementación del health check
}
```

### Theme Health Check

```typescript
// scripts/health-check-themes.ts

export interface ThemeHealthCheckResult {
  status: 'healthy' | 'warning' | 'error';
  missingVariables: Array<{
    variable: string;
    themes: Theme[];
  }>;
  inconsistentValues: Array<{
    variable: string;
    values: Record<Theme, string>;
  }>;
  unusedVariables: string[];
  contrastIssues: Array<{
    foreground: string;
    background: string;
    ratio: number;
    standard: 'AA' | 'AAA';
  }>;
}

export async function runThemeHealthCheck(): Promise<ThemeHealthCheckResult> {
  // Implementación del health check
}
```

### Performance Health Check

```typescript
// scripts/health-check-performance.ts

export interface PerformanceMetrics {
  lighthouse: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    pwa: number;
  };
  webVitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
    ttfb: number; // Time to First Byte
  };
  bundleSize: {
    total: number;
    js: number;
    css: number;
    images: number;
  };
}

export async function runPerformanceHealthCheck(): Promise<PerformanceMetrics> {
  // Implementación del health check
}
```

### Accessibility Health Check

```typescript
// scripts/health-check-accessibility.ts

export interface AccessibilityIssue {
  code: string;
  message: string;
  context: string;
  selector: string;
  type: 'error' | 'warning' | 'notice';
  standard: string; // WCAG standard
}

export interface AccessibilityHealthCheckResult {
  status: 'healthy' | 'warning' | 'error';
  issues: AccessibilityIssue[];
  summary: {
    errors: number;
    warnings: number;
    notices: number;
  };
  wcagCompliance: {
    levelA: boolean;
    levelAA: boolean;
    levelAAA: boolean;
  };
}

export async function runAccessibilityHealthCheck(): Promise<AccessibilityHealthCheckResult> {
  // Implementación del health check
}
```

---

## 📝 Tipos de Contenido

### Sketch Content Type

```typescript
// src/content/config.ts

export const sketchSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.string(),
  thumbnail: z.string(),
  videoUrl: z.string().optional(),
  publishedAt: z.date(),
  episode: z.number(),
  season: z.number().default(1),
  theme: z.enum(['sustainability', 'technology', 'social']),
  characters: z.array(z.string()),
  tags: z.array(z.string()).optional(),
  transcript: z.string().optional(),
  behindTheScenes: z.string().optional(),
  metrics: z
    .object({
      views: z.string(),
      likes: z.string(),
      shares: z.string().optional(),
      engagement: z.number().optional(),
    })
    .optional(),
});

export type Sketch = z.infer<typeof sketchSchema>;
```

### Character Content Type

```typescript
// src/content/config.ts

export const characterSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  role: z.string(),
  age: z.number(),
  occupation: z.string(),
  description: z.string(),
  personality: z.array(z.string()),
  painPoint: z.string(),
  motivation: z.string(),
  favoriteSketch: z.string(),
  quotes: z.array(z.string()).optional(),
  backstory: z.string().optional(),
  relationships: z.record(z.string()).optional(),
  image: z.string(),
  color: z.string().optional(),
  emoji: z.string().optional(),
});

export type Character = z.infer<typeof characterSchema>;
```

### Podcast Content Type

```typescript
// src/content/config.ts

export const podcastSchema = z.object({
  title: z.string(),
  description: z.string(),
  episode: z.number(),
  season: z.number().default(1),
  duration: z.string(),
  publishedAt: z.date(),
  audioUrl: z.string(),
  thumbnail: z.string().optional(),
  guests: z
    .array(
      z.object({
        name: z.string(),
        bio: z.string(),
        link: z.string().optional(),
      })
    )
    .optional(),
  topics: z.array(z.string()),
  transcript: z.string().optional(),
  shownotes: z.string().optional(),
  resources: z
    .array(
      z.object({
        title: z.string(),
        url: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),
});

export type Podcast = z.infer<typeof podcastSchema>;
```

---

## 🎣 Hooks y Eventos

### Custom Events

```typescript
// src/utils/events.ts

// Tipos de eventos personalizados
export interface CustomEvents {
  'theme-change': { theme: Theme };
  'language-change': { language: Language };
  'sketch-play': { sketchId: string };
  'modal-open': { modalId: string };
  'modal-close': { modalId: string };
  'navigation-toggle': { isOpen: boolean };
  'search-submit': { query: string };
  'form-submit': { formId: string; data: FormData };
}

// Type-safe event dispatcher
export function dispatchCustomEvent<K extends keyof CustomEvents>(
  eventName: K,
  detail: CustomEvents[K]
): void {
  window.dispatchEvent(new CustomEvent(eventName, { detail }));
}

// Type-safe event listener
export function addCustomEventListener<K extends keyof CustomEvents>(
  eventName: K,
  handler: (event: CustomEvent<CustomEvents[K]>) => void
): () => void {
  window.addEventListener(eventName, handler as EventListener);
  return () => window.removeEventListener(eventName, handler as EventListener);
}
```

### Lifecycle Hooks

```typescript
// src/utils/lifecycle-hooks.ts

export interface LifecycleHooks {
  onMount?: () => void | (() => void);
  onUnmount?: () => void;
  onVisible?: (entry: IntersectionObserverEntry) => void;
  onResize?: (size: { width: number; height: number }) => void;
  onMediaChange?: (matches: boolean) => void;
}

export function useLifecycle(
  element: HTMLElement,
  hooks: LifecycleHooks
): () => void {
  const cleanupFunctions: Array<() => void> = [];

  // onMount
  if (hooks.onMount) {
    const cleanup = hooks.onMount();
    if (cleanup) cleanupFunctions.push(cleanup);
  }

  // onVisible
  if (hooks.onVisible) {
    const observer = new IntersectionObserver(
      ([entry]) => hooks.onVisible!(entry),
      { threshold: 0.1 }
    );
    observer.observe(element);
    cleanupFunctions.push(() => observer.disconnect());
  }

  // onResize
  if (hooks.onResize) {
    const observer = new ResizeObserver(([entry]) => {
      hooks.onResize!({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(element);
    cleanupFunctions.push(() => observer.disconnect());
  }

  // Cleanup function
  return () => {
    cleanupFunctions.forEach((fn) => fn());
    if (hooks.onUnmount) hooks.onUnmount();
  };
}
```

### Form Validation Hooks

```typescript
// src/utils/form-validation.ts

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface FormField {
  name: string;
  rules: ValidationRule;
  errorMessages?: {
    required?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
    custom?: string;
  };
}

export function useFormValidation(
  form: HTMLFormElement,
  fields: FormField[]
): {
  validate: () => boolean;
  getErrors: () => Record<string, string>;
  clearErrors: () => void;
} {
  // Implementación de validación
}
```

---

## English

### 📋 Table of Contents

1. [Internationalization System (i18n)](#internationalization-system-i18n)
2. [Theme System](#theme-system)
3. [Layout Components](#layout-components)
4. [Content Components](#content-components)
5. [Interactive Components](#interactive-components)
6. [Magazine Cutout System](#magazine-cutout-system)
7. [Utilities and Helpers](#utilities-and-helpers)
8. [Health Check APIs](#health-check-apis-1)
9. [Content Types](#content-types)
10. [Hooks and Events](#hooks-and-events)

[Continue with English translations of all sections above...]

---

## 📚 Additional Resources

### TypeScript Configuration

```typescript
// tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@layouts/*": ["./src/layouts/*"],
      "@utils/*": ["./src/utils/*"],
      "@content/*": ["./src/content/*"],
      "@i18n/*": ["./src/i18n/*"],
      "@styles/*": ["./src/styles/*"]
    }
  }
}
```

### Environment Variables

```typescript
// Type definitions for environment variables
interface ImportMetaEnv {
  readonly SITE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;
  readonly PUBLIC_ANALYTICS_ID?: string;
  readonly PUBLIC_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

<div align="center">

### 🤝 Contributing to the API

See [CONTRIBUTING.md](./CONTRIBUTING.md#api) for guidelines on adding new APIs and components.

**API Reference v0.4.0** | **Testigos de Solarpunk**

</div>
