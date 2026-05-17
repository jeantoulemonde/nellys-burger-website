# conventions du projet

document de référence pour les sessions futures. lis-le avant toute modification non triviale.

## stack

- **astro 5** en mode statique (`output` par défaut). pas de SSR.
- **tailwind v4** via `@tailwindcss/vite`. aucun fichier `tailwind.config.*` — tous les tokens sont définis dans `src/styles/global.css` via `@theme`.
- **typescript strict**. chemin alias `~/*` → `src/*` (voir `tsconfig.json`).
- déploiement cible : **cloudflare pages** (build statique). vercel est compatible sans modification.

## parti pris typographique (non négociable)

- **une seule famille** : rethink sans (google fonts, par hans thiessen), poids **400 / 500 / 700 / 800**.
- **tout en lowercase** pour : titres (h1–h6), navigation, labels, noms de produits, ctas. via la classe utilitaire `lc` (`text-transform: lowercase`).
- **exceptions au lowercase** : adresses, noms propres dans le corps de texte, marques externes (instagram, google maps). ne **jamais** appliquer `lc` ou `text-transform: lowercase` à un `aria-label`, un `alt` ou un texte lu par les technologies d'assistance — la transformation est purement visuelle.
- **contraste de graisses** : extra-bold (800) pour titres et noms d'items, regular (400) pour descriptions et corps, medium (500) pour emphase secondaire, bold (700) ponctuellement.
- **tracking** : négatif sur les gros titres (-0.02 à -0.03em), neutre sur le corps.
- **pas d'italique décoratif**, pas de serif, pas de fioriture.

## palette

définie dans `src/styles/global.css` (`@theme`) :

| token                  | valeur     | usage                                           |
| ---------------------- | ---------- | ----------------------------------------------- |
| `--color-bg`           | `#fafaf7`  | fond principal (blanc cassé)                    |
| `--color-ink`          | `#0a0a0a`  | texte principal (noir doux)                     |
| `--color-ink-muted`    | `#5a5a57`  | texte secondaire / meta                         |
| `--color-line`         | `#e8e6df`  | filets, séparateurs                             |
| `--color-accent`       | `#b23a2c`  | rouge brique — uniquement liens hover, focus    |

l'accent n'est **jamais** utilisé en aplat large. uniquement états d'interaction et accents ponctuels.

## utilitaires custom

définis avec `@utility` dans `global.css`, à privilégier sur les chaînes tailwind verbeuses :

- `lc` — `text-transform: lowercase`
- `hero-title` — taille hero responsive
- `page-title` — h1 de page
- `section-title` — h2
- `lead` — paragraphe d'intro
- `prose-body` — corps de texte
- `meta` — étiquettes / footer / petites infos

## composants

| fichier                 | rôle                                                      |
| ----------------------- | --------------------------------------------------------- |
| `Layout.astro`          | layout principal, charge la police, intègre `<SEOHead>`.   |
| `SEOHead.astro`         | meta, og, twitter, canonical, json-ld. props typées.       |
| `Header.astro`          | nav sticky discrète, état actif déduit de `Astro.url`.     |
| `Footer.astro`          | adresse, horaires, instagram, mentions.                   |
| `Hero.astro`            | image plein écran + titre superposé.                       |
| `MenuItem.astro`        | format nelly's : nom bold + prix aligné droite, desc en dessous. inclut `itemprop` schema.org. |
| `MenuSection.astro`     | wrapper autour d'une liste de `MenuItem`, schema.org.      |
| `InfoBlock.astro`       | bloc d'info pratique (label, titre, cta).                 |

règles :
- chaque composant exporte une `interface Props` typée.
- pas de logique conditionnelle dans le markup au-delà du strict nécessaire.
- les données viennent toujours de `src/data/` (pas de hardcode dans les composants).

## SEO

- **`<html lang="fr">`** systématique.
- **un seul `<h1>` par page**, hiérarchie hn stricte (pas de h3 avant h2).
- toute page utilise `<Layout>` qui injecte `<SEOHead>` ; chaque page fournit `title`, `description`, `path` et optionnellement `jsonLd`.
- **json-ld par page** :
  - `/` → `Restaurant` (avec `openingHoursSpecification`, `address`, `geo`, `priceRange`, `hasMenu`)
  - `/menu` → `Menu` avec `hasMenuSection` / `hasMenuItem` + `Offer` par item
  - `/nos-valeurs` → `AboutPage`
  - `/contact` → `Restaurant` + `FAQPage`
- **canonical** automatique via `SEOHead` (basé sur `Astro.site` + `path`).
- toutes les images ont un **`alt` descriptif en français propre** (pas en lowercase forcé).
- urls **sans extension**, **sans trailing slash** (configuré dans `astro.config.mjs`).
- sitemap auto via `@astrojs/sitemap`.

## accessibilité

- contraste AA minimum partout (vérifié sur `#fafaf7` ↔ `#0a0a0a` et `#5a5a57`).
- focus visible : outline accent 2px (défini dans `global.css`).
- skip link `aller au contenu` dans `Layout`.
- pas de `lowercase` sur `aria-*` et `alt` (cf. parti pris typo).
- la nav fonctionne au clavier sans javascript.

## performance

- **zéro javascript client** sauf nécessité absolue. les `<details>` natifs suffisent pour le faq.
- images : préférer `astro:assets` (`import.meta`) sur les vraies images locales pour avoir AVIF/WebP + lazy loading. les urls unsplash actuelles sont des placeholders.
- police chargée via google fonts avec `preconnect` + `preload`. à terme, self-host avec `astro-font` ou similaire pour économiser une requête.
- pas de framework JS côté client.

## git

- branche principale : `main`.
- créer de **nouveaux commits**, pas d'amend, pas de force push.
- ne pas committer `.env*`, `dist/`, `node_modules/`, `.astro/`.

## à éviter

- ajouter des couleurs hors palette.
- introduire une seconde famille de police.
- mettre du texte en majuscules (sauf dans le corps de texte pour des noms propres).
- ajouter une dépendance js client sans justification.
- toucher au tracking ou aux line-heights des utilitaires custom sans raison forte.
- mocker / fake-rendre une page : si on ne peut pas tester réellement, le dire explicitement.
