/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly SITE: string;
  readonly PUBLIC_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
