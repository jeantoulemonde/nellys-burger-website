// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// URL canonique du domaine. Propagée dans : sitemap, schema.org (logo/image absolus),
// canonical, Open Graph, Twitter Card. Toucher ici suffit, pas besoin de chercher ailleurs.
const SITE_URL = 'https://nellys.fr';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  // redirects désactivés temporairement (nos-valeurs en pause). Réactiver :
  // redirects: { '/le-concept': '/nos-valeurs' },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.8,
      // exclure la racine (dashboard meta, noindex) et la variante A/B (noindex)
      filter: (page) => page !== 'https://nellys.fr/' && !/\/v2(\/|$)/.test(page),
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR',
          en: 'en-US',
        },
      },
    }),
  ],
  vite: {
    // @ts-expect-error — tailwindcss vite plugin uses a different Plugin type than Astro's bundled vite; safe at runtime
    plugins: [tailwindcss()],
  },
});
