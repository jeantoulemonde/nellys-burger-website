# Nelly's — v8 · "Cuisine ouverte"

Homepage seule. Direction artistique : **Paul & Bohne × dalles Paris Beige** (pierre calcaire claire, architecture contemporaine épurée — esprit Tadao Ando soft, galerie d'art, coffee shop Tokyo / Copenhague).

URL : `/v8` (route Astro via `src/pages/v8.html`, assets statiques dans `public/v8/`).

## Parti pris

- **Vidéo hero plein cadre** réutilisée de la v1 (`/media/hero.mp4`).
- **Arrière-plan général** : grandes dalles pierre/béton clair façon Paris Beige générées en SVG (`/v8/assets/tiles.svg`), tuile de **400×200 px** (rapport 2:1), fond `#e2dac8`, granulation `feTurbulence` opacity 0.7 en mix de tons gris-beige, 4 micro-cavités sombres `#585348` opacity 0.35-0.4, deux joints `#9b9382` (croix verticale + horizontale) opacity 0.55 séparant la grille en sous-rectangles de 200×100. Aucune variation de couleur entre dalles — c'est le côté contemporain épuré. < 1.5 KB, repeat performant au scroll.
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

| token       | valeur     | usage                                |
| ----------- | ---------- | ------------------------------------ |
| `--stone`        | `#e2dac8` | fond beige pierre (background principal) |
| `--stone-joint`  | `#9b9382` | joints visibles des dalles           |
| `--stone-grain`  | `#8a8275` | granulation interne (feTurbulence)   |
| `--stone-cavity` | `#585348` | micro-cavités sombres de la pierre   |
| `--cream`        | `#faf7f0` | fond uni des bandes lisibles posées sur la pierre |
| `--ink`          | `#0c0c08` | encre principale                     |
| `--yellow`       | `#f5d442` | signature jaune Nelly's, accent unique |

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
