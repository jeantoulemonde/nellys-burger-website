# Nelly's — v8 · "Cuisine ouverte"

Homepage seule. Direction artistique : **Paul & Bohne × carreaux écrus du restaurant Nelly's**.

URL : `/v8` (route Astro via `src/pages/v8.html`, assets statiques dans `public/v8/`).

## Parti pris

- **Vidéo hero plein cadre** réutilisée de la v1 (`/media/hero.mp4`).
- **Arrière-plan général** : mur de carreaux écrus bistrot vintage généré en SVG (`/v8/assets/tiles.svg`), 4 hues qui alternent, joints fins ton sur ton, patines locales subtiles, grain papier en overlay multiply. < 3 KB, repeat performant au scroll.
- **Header sticky en glassmorphism** qui se compresse au scroll (72 → 56 px), translucide sombre au-dessus du hero, translucide clair ensuite.
- **Pas de burger 3D** sur cette version. La vidéo est le seul élément visuel central.

## Typographie

**Une seule famille pour tout le site** : Brandon Grotesque (sans-serif géométrique humaniste) si disponible, sinon Mulish en alternative gratuite (Google Fonts). La hiérarchie se fait via les **weights** et les **letter-spacings**, jamais via une seconde famille. Le seul caractère manuscrit présent sur la page est le logo SVG `nelly_s.svg` — il reste intouchable et contraste avec la rigueur géométrique de Brandon.

Stack :

```css
font-family: 'Brandon Grotesque', 'Mulish', -apple-system, BlinkMacSystemFont, ui-sans-serif, system-ui, sans-serif;
```

Aucune trace de Brandon Grotesque dans le projet (pas de kit Adobe Fonts, pas de .woff2 local). À la date d'écriture, c'est **Mulish 300/400/500/700** chargé via Google Fonts qui rend. Pour basculer sur Brandon : déposer les fichiers dans `public/v8/assets/fonts/` + ajouter un bloc `@font-face` en tête de `v8.css`, la stack actuelle prendra automatiquement Brandon en priorité.

### Usage des weights

| weight | usage |
| ------ | ----- |
| **300 (Light)** | gros titres hero, titres de sections (h2), body long, leads. Donne le côté aéré, contemporain. |
| **400 (Regular)** | body courant, descriptions, footer info. |
| **500 (Medium)** | sous-titres, labels ALL CAPS, infos pratiques, CTAs principaux, prix. |
| **700 (Bold)** | nav header ALL CAPS, labels structurants forts (footer-label jaune). À utiliser avec parcimonie. |
| **900 (Black)** | jamais utilisé — casserait le côté premium. |

### Règles globales

- **Minuscules** dans le corps des paragraphes et les gros titres (cohérent avec le ton sec de Nelly's).
- **ALL CAPS espacé** dans les éléments de structure : nav, sous-titres de sections, labels, CTAs.
- **Pas d'italique** : `em { font-style: normal }` global. L'emphase passe par le poids ou la couleur jaune.
- **Jaune Nelly's** comme signature visuelle, appliqué avec parcimonie : uniquement sur `"fingers salty."` (hero) et `"sur instagram."` (IG). Deux moments dans toute la page.

## Palette

| token             | usage                          |
| ----------------- | ------------------------------ |
| `#e8e0d2` / `#ddd4c4` / `#d8cdb8` / `#e3dac9` | carreaux écrus du mur |
| `#cdc3b0`         | joints                         |
| `#faf7f0`         | fond crème uni des bandes lisibles |
| `#0c0c08`         | encre principale               |
| `#f5d442`         | signature jaune Nelly's, accent unique |

## Sections

1. Hero (vidéo + slogan + `scroll & enjoy`)
2. Concept / la maison (texte large posé sur les carreaux)
3. Où / quand / comment (3 cartes floats avec shadow douce)
4. Menu — 3 burgers + frites en bas
5. Storefront photo plein cadre avec parallax doux
6. Instagram
7. Footer minimal

## Comportements (v8.js)

- Header : classes `is-on-hero` / `is-scrolled` toggle au scroll.
- Status "ouvert maintenant" calculé sur l'heure courante (12-22h).
- IntersectionObserver pour les fade-up `[data-reveal]`.
- Parallax doux sur la storefront image (translateY ±24 px max).
- Curseur doré uniquement sur `(hover: hover) and (pointer: fine)`, agrandi sur les éléments interactifs.
- Relance de la vidéo au premier touch/click si autoplay bloqué.

## Accessibilité

- Skip link, `:focus-visible` outline jaune.
- Toutes les animations désactivées sous `prefers-reduced-motion` (la vidéo est remplacée par un dégradé ink).
- Aspect-ratio préservé sur les photos, alt-texts descriptifs en français propre.

## SEO

Pour l'instant : `<meta name="robots" content="noindex,nofollow">` (preview). À retirer quand la v8 devient prod. JSON-LD `Restaurant` complet, canonical, OG, sitemap auto.

## À faire si la direction est validée

- Pages `lieu`, `à propos`, `menu`, `contact` dans le même esprit.
- Retirer la directive noindex.
- Self-host les fonts pour économiser une requête.
- Vérifier le poids de `/media/hero.mp4` et envisager un encode AV1/WebM.
