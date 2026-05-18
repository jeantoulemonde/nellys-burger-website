// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// À remplacer à la mise en prod : URL canonique du domaine (ex. 'https://nellys.fr').
// Cette valeur est propagée dans : sitemap, schema.org (logo/image absolus),
// canonical, Open Graph, Twitter Card. Toucher ici suffit, pas besoin de chercher ailleurs.
const SITE_URL = 'https://example.com';

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
    }),
  ],
  vite: {
    // @ts-expect-error — tailwindcss vite plugin uses a different Plugin type than Astro's bundled vite; safe at runtime
    plugins: [tailwindcss()],
  },
});
