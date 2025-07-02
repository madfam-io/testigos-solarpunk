import type { APIRoute } from 'astro';
// import { getCollection } from 'astro:content';

const BASE_URL = 'https://testigos-solarpunk.vercel.app';

// Static routes with priorities
const staticRoutes = [
  // Homepage
  { url: '/es/', priority: 1.0, changefreq: 'weekly' },
  { url: '/en/', priority: 1.0, changefreq: 'weekly' },

  // Main sections - Spanish
  { url: '/es/proyecto/', priority: 0.9, changefreq: 'monthly' },
  { url: '/es/proyecto-unified/', priority: 0.8, changefreq: 'monthly' },
  { url: '/es/contenido/', priority: 0.9, changefreq: 'weekly' },
  { url: '/es/contenido/sketches/', priority: 0.9, changefreq: 'daily' },
  { url: '/es/contenido/podcast/', priority: 0.8, changefreq: 'weekly' },
  { url: '/es/contenido/madlab/', priority: 0.8, changefreq: 'monthly' },
  { url: '/es/personajes/', priority: 0.7, changefreq: 'monthly' },
  { url: '/es/mundo/', priority: 0.7, changefreq: 'monthly' },
  { url: '/es/guiones/', priority: 0.6, changefreq: 'weekly' },
  { url: '/es/comunidad/', priority: 0.8, changefreq: 'weekly' },
  { url: '/es/produccion/', priority: 0.6, changefreq: 'monthly' },
  { url: '/es/impacto/', priority: 0.7, changefreq: 'monthly' },
  { url: '/es/filosofia/', priority: 0.6, changefreq: 'yearly' },
  { url: '/es/guia-visual/', priority: 0.6, changefreq: 'monthly' },
  { url: '/es/formatos/', priority: 0.6, changefreq: 'monthly' },
  { url: '/es/recursos/', priority: 0.7, changefreq: 'weekly' },
  { url: '/es/sitemap/', priority: 0.3, changefreq: 'monthly' },

  // Main sections - English
  { url: '/en/project/', priority: 0.9, changefreq: 'monthly' },
  { url: '/en/unified-project/', priority: 0.8, changefreq: 'monthly' },
  { url: '/en/content/', priority: 0.9, changefreq: 'weekly' },
  { url: '/en/content/sketches/', priority: 0.9, changefreq: 'daily' },
  { url: '/en/content/podcast/', priority: 0.8, changefreq: 'weekly' },
  { url: '/en/content/madlab/', priority: 0.8, changefreq: 'monthly' },
  { url: '/en/characters/', priority: 0.7, changefreq: 'monthly' },
  { url: '/en/world/', priority: 0.7, changefreq: 'monthly' },
  { url: '/en/scripts/', priority: 0.6, changefreq: 'weekly' },
  { url: '/en/community/', priority: 0.8, changefreq: 'weekly' },
  { url: '/en/production/', priority: 0.6, changefreq: 'monthly' },
  { url: '/en/impact/', priority: 0.7, changefreq: 'monthly' },
  { url: '/en/philosophy/', priority: 0.6, changefreq: 'yearly' },
  { url: '/en/visual-guide/', priority: 0.6, changefreq: 'monthly' },
  { url: '/en/formats/', priority: 0.6, changefreq: 'monthly' },
  { url: '/en/resources/', priority: 0.7, changefreq: 'weekly' },
  { url: '/en/sitemap/', priority: 0.3, changefreq: 'monthly' },

  // Production subsections - Spanish
  {
    url: '/es/produccion/estilo-visual/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  { url: '/es/produccion/tono-voz/', priority: 0.5, changefreq: 'monthly' },
  { url: '/es/produccion/audio/', priority: 0.5, changefreq: 'monthly' },
  { url: '/es/produccion/specs/', priority: 0.5, changefreq: 'monthly' },

  // Production subsections - English
  { url: '/en/production/visual-style/', priority: 0.5, changefreq: 'monthly' },
  { url: '/en/production/tone-voice/', priority: 0.5, changefreq: 'monthly' },
  { url: '/en/production/audio/', priority: 0.5, changefreq: 'monthly' },
  { url: '/en/production/specs/', priority: 0.5, changefreq: 'monthly' },

  // Resources subsections - Spanish
  { url: '/es/recursos/actores/', priority: 0.6, changefreq: 'monthly' },
  {
    url: '/es/recursos/actores/personajes/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/es/recursos/actores/dialogo/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/es/recursos/actores/movimiento/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  { url: '/es/recursos/creadores/', priority: 0.6, changefreq: 'monthly' },
  {
    url: '/es/recursos/creadores/personajes/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/es/recursos/creadores/plantillas/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/es/recursos/creadores/worldbuilding/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  { url: '/es/recursos/patrocinadores/', priority: 0.6, changefreq: 'monthly' },
  {
    url: '/es/recursos/patrocinadores/valores/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/es/recursos/patrocinadores/impacto/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/es/recursos/patrocinadores/integracion/',
    priority: 0.5,
    changefreq: 'monthly',
  },

  // Resources subsections - English
  { url: '/en/resources/actors/', priority: 0.6, changefreq: 'monthly' },
  {
    url: '/en/resources/actors/characters/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/en/resources/actors/dialogue/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/en/resources/actors/movement/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  { url: '/en/resources/creators/', priority: 0.6, changefreq: 'monthly' },
  {
    url: '/en/resources/creators/characters/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/en/resources/creators/templates/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/en/resources/creators/worldbuilding/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  { url: '/en/resources/sponsors/', priority: 0.6, changefreq: 'monthly' },
  {
    url: '/en/resources/sponsors/values/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/en/resources/sponsors/impact/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/en/resources/sponsors/integration/',
    priority: 0.5,
    changefreq: 'monthly',
  },

  // World subsections
  {
    url: '/es/mundo/azotea-verde-neo-cuernavaca/',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    url: '/en/world/green-roof-neo-cuernavaca/',
    priority: 0.5,
    changefreq: 'monthly',
  },
];

export const GET: APIRoute = () => {
  // Collect all URLs
  const urls = [...staticRoutes];

  // Dynamic content collections would be added here if needed
  // For now, we only include static routes

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(({ url, priority, changefreq }) => {
    const fullUrl = `${BASE_URL}${url}`;
    const lastmod = new Date().toISOString();

    // Determine alternate language URL
    let alternateUrl = '';
    if (url.includes('/es/')) {
      // Convert Spanish URL to English
      alternateUrl = url
        .replace('/es/', '/en/')
        .replace('/proyecto/', '/project/')
        .replace('/proyecto-unified/', '/unified-project/')
        .replace('/contenido/', '/content/')
        .replace('/personajes/', '/characters/')
        .replace('/mundo/', '/world/')
        .replace('/guiones/', '/scripts/')
        .replace('/comunidad/', '/community/')
        .replace('/produccion/', '/production/')
        .replace('/impacto/', '/impact/')
        .replace('/filosofia/', '/philosophy/')
        .replace('/guia-visual/', '/visual-guide/')
        .replace('/formatos/', '/formats/')
        .replace('/recursos/', '/resources/')
        .replace('/actores/', '/actors/')
        .replace('/creadores/', '/creators/')
        .replace('/patrocinadores/', '/sponsors/')
        .replace('/dialogo/', '/dialogue/')
        .replace('/movimiento/', '/movement/')
        .replace('/plantillas/', '/templates/')
        .replace('/valores/', '/values/')
        .replace('/integracion/', '/integration/')
        .replace('/estilo-visual/', '/visual-style/')
        .replace('/tono-voz/', '/tone-voice/')
        .replace(
          '/azotea-verde-neo-cuernavaca/',
          '/green-roof-neo-cuernavaca/'
        );
    } else if (url.includes('/en/')) {
      // Convert English URL to Spanish
      alternateUrl = url
        .replace('/en/', '/es/')
        .replace('/project/', '/proyecto/')
        .replace('/unified-project/', '/proyecto-unified/')
        .replace('/content/', '/contenido/')
        .replace('/characters/', '/personajes/')
        .replace('/world/', '/mundo/')
        .replace('/scripts/', '/guiones/')
        .replace('/community/', '/comunidad/')
        .replace('/production/', '/produccion/')
        .replace('/impact/', '/impacto/')
        .replace('/philosophy/', '/filosofia/')
        .replace('/visual-guide/', '/guia-visual/')
        .replace('/formats/', '/formatos/')
        .replace('/resources/', '/recursos/')
        .replace('/actors/', '/actores/')
        .replace('/creators/', '/creadores/')
        .replace('/sponsors/', '/patrocinadores/')
        .replace('/dialogue/', '/dialogo/')
        .replace('/movement/', '/movimiento/')
        .replace('/templates/', '/plantillas/')
        .replace('/values/', '/valores/')
        .replace('/integration/', '/integracion/')
        .replace('/visual-style/', '/estilo-visual/')
        .replace('/tone-voice/', '/tono-voz/')
        .replace(
          '/green-roof-neo-cuernavaca/',
          '/azotea-verde-neo-cuernavaca/'
        );
    }

    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${
      alternateUrl !== ''
        ? `
    <xhtml:link rel="alternate" hreflang="${url.includes('/es/') ? 'en' : 'es'}" href="${BASE_URL}${alternateUrl}" />
    <xhtml:link rel="alternate" hreflang="${url.includes('/es/') ? 'es' : 'en'}" href="${fullUrl}" />`
        : ''
    }
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
