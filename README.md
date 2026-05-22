# nelly's burger website

dépôt des directions artistiques explorées pour **Nelly's** (smash burger à emporter, 21 avenue du jardin public, biarritz). astro + html statique + vercel.

> **Aucune version n'est en production.** Toutes les versions présentées ici sont des démos cliquables, destinées à la présentation client pour choisir la direction visuelle finale.

## stack

- [astro 5](https://astro.build) — génération statique, gère les pages avec composants et les fichiers `.html` plats dans `src/pages/`
- [tailwind css v4](https://tailwindcss.com) — pour v1 uniquement (via plugin vite, tokens dans `src/styles/global.css`)
- typescript strict
- `@astrojs/sitemap` — sitemap auto
- `astro:assets` — optimisation des photos (AVIF/WebP, srcset) côté v1
- hébergement : vercel (`cleanUrls: true`, `trailingSlash: false`)

## commandes

| commande            | action                                          |
| ------------------- | ----------------------------------------------- |
| `npm install`       | installe les dépendances                        |
| `npm run dev`       | serveur de dev sur `localhost:4321`             |
| `npm run build`     | build de production dans `./dist/`              |
| `npm run preview`   | prévisualise le build local                     |
| `npm run check`     | vérification typescript + astro                 |

## architecture du projet

Le dashboard racine (`/`) sépare deux catégories :

### Catégorie A — versions abouties

Directions artistiques traitées jusqu'à un état présentable. Sites complets ou homepages seules.

| route   | type           | direction                          | source                          |
| ------- | -------------- | ---------------------------------- | ------------------------------- |
| `/v1/`  | site complet   | SEO baseline (référence)           | `src/pages/v1/` (Astro + i18n)  |
| `/v2`   | site complet   | Pixel synthwave                    | `src/pages/v2.astro` (Astro)    |
| `/v4/`  | site complet   | Cyber-sigilism                     | `public/v4/` (HTML statique)    |
| `/v5/`  | site complet   | Y2K dark                           | `public/v5/` (HTML statique)    |
| `/v6/`  | site complet   | Y2K lumineux (+ burger 3D)         | `public/v6/` (HTML statique)    |
| `/v7`   | homepage seule | Édition du soir (broadsheet)       | `src/pages/v7.html` + `public/v7/` |
| `/v8`   | homepage seule | Paul & Bohne × carreaux écrus      | `src/pages/v8.html` + `public/v8/` |

### Catégorie B — previews v3 (explorations)

28 one-pagers explorant les courants graphiques contemporains. Listés à `/previews`. Filtre par courant.

| courant       | previews                          |
| ------------- | --------------------------------- |
| Acid          | a1, a2                            |
| Brutalist     | b1, b2                            |
| Cyber-sigil   | c1, c2                            |
| Diner         | a, e, l, m, n, p                  |
| Éditorial     | b, c, g, i, j, k, o, q, r         |
| Pixel         | d                                 |
| Riso          | f, h                              |
| Techno        | t1, t2                            |
| Y2K           | y1, y2                            |

Source : `public/previews/*.html` (un fichier HTML par preview, plat).

### Fichier de routage

- Pages Astro et `.html` dans `src/pages/` → routes `/`, `/v1/...`, `/v2`, `/v7`, `/v8`
- Tout dans `public/` est copié verbatim vers `dist/` → routes `/v4/...`, `/v5/...`, `/v6/...`, `/previews/...`, `/media/...`
- `vercel.json` gère `cleanUrls` (donc `/v8` sert `/v8.html`) et les redirects 301 hérités

## structure de fichiers

```
src/
  components/            composants .astro partagés (v1) + v2/
  data/                  site.ts, menu.ts, schema.ts (json-ld pour v1)
  layouts/               Layout.astro (v1) · V2Layout.astro (v2)
  pages/
    index.astro          dashboard client (refonte deux sections)
    v2.astro             route /v2 (site complet pixel synthwave)
    v7.html              route /v7 (broadsheet éditorial — assets dans public/v7/)
    v8.html              route /v8 (paul & bohne — assets dans public/v8/)
    v1/                  site complet /v1/...
      index.astro · menu.astro · contact.astro · ...
      biarritz/jardin-public.astro
      en/                i18n anglais
  styles/                global.css (tokens + @utility, v1 uniquement)
public/
  media/
    nelly_s.svg          logo vectoriel canonique (mask-image partout)
    hero.mp4             vidéo hero partagée (v1, v8)
    photos/              photos partagées
  v4/ v5/ v6/            sites complets HTML/CSS/JS statiques
  v7/ v8/                assets (css, js, README, sous-dossier assets)
  previews/              galerie 28 one-pagers + index.html
vercel.json              cleanUrls + 301 redirects
```

## convention pour ajouter une nouvelle direction

### Nouvelle version aboutie (catégorie A)

1. Numéroter `vN` (incrément du dernier numéro utilisé).
2. **Site complet via Astro** : créer `src/pages/vN/` (un dossier) avec un `index.astro` minimum + autres pages. Réutiliser ou non `Layout.astro`.
3. **Site complet en HTML statique** : créer `public/vN/index.html`, `vN.css`, `vN.js`, autres pages. Réutilise les assets partagés `/media/`.
4. **Homepage seule** : préférer `src/pages/vN.html` (route directe) + `public/vN/{vN.css, vN.js, README.md, assets/}` (assets).
5. Ajouter une entrée dans le tableau `versions[]` en haut de `src/pages/index.astro` (id, href, direction, type, status, tagline, kind). Créer un mini-thumbnail CSS en ajoutant un sélecteur `.v-thumb[data-kind="..."]` dans les styles.
6. Mettre à jour le tableau de la **Catégorie A** ci-dessus dans ce README.

### Nouvelle preview (catégorie B)

1. Créer le fichier plat `public/previews/X.html` (lettre minuscule, suffixe numérique si série : `x1`, `x2`).
2. Title HTML : `v3-X · sujet` pour cohérence.
3. Ajouter une ligne dans le tableau `previews[]` de `src/pages/index.astro` ET dans la grille de `public/previews/index.html` (id, title, courant, tag).
4. Si nouveau courant graphique : ajouter un sélecteur `.p-thumb[data-courant="X"]` dans **les deux** dashboards.

## média — compression vidéo hero

la vidéo hero (`public/media/hero.mp4`) pèse actuellement **6,1 MB en 720×1280 / 1,5 Mbps**. cible recommandée : **< 3 MB, ~1,2 Mbps**.

### prérequis : installer ffmpeg

```bash
brew install ffmpeg
```

### compresser au bon ratio / poids

```bash
ffmpeg -i public/media/hero.mp4 \
  -c:v libx264 -preset slow -crf 28 \
  -vf "scale=720:-2" \
  -b:v 1200k -maxrate 1500k -bufsize 2400k \
  -movflags +faststart \
  -c:a aac -b:a 96k \
  public/media/hero-optimized.mp4
```

une fois validé, remplacer :

```bash
mv public/media/hero-optimized.mp4 public/media/hero.mp4
```

### version webm bonus

```bash
ffmpeg -i public/media/hero.mp4 \
  -c:v libvpx-vp9 -crf 33 -b:v 0 \
  -vf "scale=720:-2" \
  -c:a libopus -b:a 96k \
  public/media/hero.webm
```

## conventions

voir `CLAUDE.md` pour les conventions de v1 (typographie lowercase, palette, structure des composants Astro, règles SEO). Les versions ultérieures (v4–v8) ont chacune leurs propres conventions documentées dans leur `README.md` local quand il existe (cf. `public/v8/README.md`).
