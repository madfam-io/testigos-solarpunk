/**
 * Utilidades generales para el proyecto Testigos de Solarpunk
 */

/**
 * Formatea una fecha en formato legible en español
 * @param date - Fecha a formatear
 * @param options - Opciones de formato adicionales
 * @returns Fecha formateada en español
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(dateObj);
}

/**
 * Convierte texto a slug URL-friendly
 * @param text - Texto a convertir
 * @returns Slug normalizado
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9]+/g, '-') // Reemplazar caracteres especiales
    .replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio/final
}

/**
 * Trunca texto con puntos suspensivos
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima
 * @returns Texto truncado
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Genera un excerpt de contenido Markdown
 * @param content - Contenido Markdown
 * @param maxLength - Longitud máxima del excerpt
 * @returns Texto plano truncado
 */
export function generateExcerpt(content: string, maxLength = 160): string {
  // Eliminar frontmatter YAML
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');
  
  // Eliminar sintaxis Markdown básica
  const plainText = withoutFrontmatter
    .replace(/#{1,6}\s+/g, '') // Headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    .replace(/\*([^*]+)\*/g, '$1') // Italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/`([^`]+)`/g, '$1') // Inline code
    .replace(/\n+/g, ' ') // Newlines
    .trim();
  
  return truncateText(plainText, maxLength);
}

/**
 * Capitaliza la primera letra de un texto
 * @param text - Texto a capitalizar
 * @returns Texto con primera letra en mayúscula
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convierte duración en segundos a formato MM:SS
 * @param seconds - Duración en segundos
 * @returns Formato MM:SS
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Obtiene el icono de plataforma
 * @param platform - Código de plataforma
 * @returns Emoji o símbolo de la plataforma
 */
export function getPlatformIcon(platform: string): string {
  const icons: Record<string, string> = {
    'TT': '📱', // TikTok
    'YT': '📺', // YouTube
    'IG': '📷', // Instagram
    'FB': '👥', // Facebook
  };
  return icons[platform] || '🌐';
}

/**
 * Genera un color consistente basado en un string
 * @param str - String para generar color
 * @returns Color en formato HSL
 */
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = hash % 360;
  // Usar colores MADFAM como base
  const saturation = 70; // Saturación vibrante
  const lightness = 50; // Brillo balanceado
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Ordena elementos por fecha (más reciente primero)
 * @param items - Array de elementos con fecha
 * @param dateField - Campo de fecha a usar
 * @returns Array ordenado
 */
export function sortByDate<T extends Record<string, any>>(
  items: T[],
  dateField = 'fecha_publicacion'
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateField]);
    const dateB = new Date(b[dateField]);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Agrupa elementos por una propiedad
 * @param items - Array de elementos
 * @param key - Clave para agrupar
 * @returns Objeto con elementos agrupados
 */
export function groupBy<T extends Record<string, any>>(
  items: T[],
  key: keyof T
): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const group = String(item[key]);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Genera metadatos SEO para una página
 * @param options - Opciones de metadatos
 * @returns Objeto con metadatos formateados
 */
export function generateSEOMeta({
  title,
  description,
  image,
  url,
  type = 'website',
}: {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: string;
}) {
  const siteName = 'Testigos de Solarpunk';
  const defaultImage = '/og-image.jpg';
  
  return {
    title: `${title} | ${siteName}`,
    description: truncateText(description, 160),
    canonical: url,
    openGraph: {
      title,
      description,
      image: image || defaultImage,
      url,
      type,
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: image || defaultImage,
    },
  };
}

/**
 * Debounce para optimizar llamadas a funciones
 * @param func - Función a ejecutar
 * @param wait - Tiempo de espera en ms
 * @returns Función con debounce
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Verifica si estamos en el navegador
 * @returns true si estamos en el cliente
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Obtiene parámetros de URL de forma segura
 * @param param - Nombre del parámetro
 * @returns Valor del parámetro o null
 */
export function getURLParam(param: string): string | null {
  if (!isBrowser()) return null;
  
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

/**
 * Carga una imagen de forma lazy con placeholder
 * @param src - URL de la imagen
 * @param placeholder - URL del placeholder
 * @returns Promise con la imagen cargada
 */
export function lazyLoadImage(
  src: string,
  placeholder?: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => resolve(img);
    img.onerror = reject;
    
    // Si hay placeholder, usarlo mientras carga
    if (placeholder) {
      img.src = placeholder;
      // Cargar imagen real después
      setTimeout(() => {
        img.src = src;
      }, 0);
    } else {
      img.src = src;
    }
  });
}