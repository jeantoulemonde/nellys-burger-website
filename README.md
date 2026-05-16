# nelly's burger website

site vitrine du restaurant **Nelly's** (smash burger à emporter, 21 avenue du jardin public, biarritz). astro + tailwind + typescript, statique, hébergé sur cloudflare pages (ou vercel).

## stack

- [astro 5](https://astro.build) — génération statique
- [tailwind css v4](https://tailwindcss.com) — via plugin vite, pas de fichier config (tokens dans `src/styles/global.css`)
- typescript strict
- `@astrojs/sitemap` — sitemap auto
- `astro:assets` — optimisation automatique des photos (AVIF/WebP, srcset)
- police : inter tight (google fonts, poids 400 + 700)
- javascript client minimal : un script inline pour la gestion vidéo hero + `<details>` natifs sur les faq

## commandes

| commande            | action                                          |
| ------------------- | ----------------------------------------------- |
| `npm install`       | installe les dépendances                        |
| `npm run dev`       | lance le serveur de dev sur `localhost:4321`    |
| `npm run build`     | build de production dans `./dist/`              |
| `npm run preview`   | prévisualise le build local                     |
| `npm run check`     | vérification typescript + astro                 |

## structure

```
src/
  assets/photos/         # photos sources, processées par astro:assets
    menu-lightbox.jpg    # signature visuelle, hero poster + og
    kitchen-wide.jpg     # cuisine large
    counter-plancha.jpg  # comptoir et plancha
    ceiling-neons.jpg    # texture plafond
    wooden-blinds.jpg    # ambiance contact
    street-cigarettes.jpg # détail urbain
  components/            # composants .astro
    Header.astro
    Footer.astro
    Hero.astro           # vidéo + poster + gating mobile
    MenuItem.astro
    MenuSection.astro
    InfoBlock.astro
    SEOHead.astro
  data/                  # données typées
    site.ts              # infos restaurant
    menu.ts              # menu structuré
  layouts/
    Layout.astro
  pages/
    index.astro
    menu.astro
    le-concept.astro
    contact.astro
  styles/
    global.css
public/
  media/
    hero.mp4             # vidéo hero (6.1 MB — à compresser, cf. ci-dessous)
  robots.txt
```

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

### extraire un vrai poster (frame représentative)

actuellement le poster utilisé est `menu-lightbox.jpg` (panneau menu). pour un vrai poster issu de la vidéo (recommandé pour cohérence visuelle) :

```bash
# extraire la frame à 2 secondes
ffmpeg -ss 00:00:02 -i public/media/hero.mp4 \
  -frames:v 1 -q:v 2 \
  src/assets/photos/hero-poster.jpg
```

puis remplacer l'import dans `src/pages/index.astro` :

```ts
import heroPoster from '~/assets/photos/hero-poster.jpg';
// ...
<Hero posterImage={heroPoster} ... />
```

### générer une version webm en bonus (qualité supérieure à poids égal sur navigateurs récents)

```bash
ffmpeg -i public/media/hero.mp4 \
  -c:v libvpx-vp9 -crf 33 -b:v 0 \
  -vf "scale=720:-2" \
  -c:a libopus -b:a 96k \
  public/media/hero.webm
```

ajouter ensuite la `<source type="video/webm">` en premier dans `Hero.astro`.

## conventions

voir `CLAUDE.md` pour les conventions détaillées (typographie lowercase, palette, structure des composants, règles SEO).

## à faire avant déploiement

### contenu
- [ ] vérifier l'avenue exacte et le code postal sur place
- [ ] confirmer / ajuster les coordonnées geo (latitude/longitude) — actuellement approximation
- [ ] page `/mentions-legales` à créer (route 404 actuellement)
- [ ] favicon svg à créer dans `public/favicon.svg`

### média
- [ ] compresser `hero.mp4` (cf. ci-dessus) — 6,1 MB → ~3 MB
- [ ] extraire un poster depuis la vidéo (cf. ci-dessus)
- [ ] photos de burger à ajouter si on souhaite illustrer les items du menu

### SEO
- [ ] remplacer `site:` dans `astro.config.mjs` par l'url de production
- [ ] mettre à jour l'url dans `public/robots.txt`
- [ ] créer / réclamer la fiche google business profile
- [ ] soumettre le sitemap à search console après mise en ligne
- [ ] valider tous les json-ld sur [validator.schema.org](https://validator.schema.org)

### déploiement
- [ ] créer le projet sur cloudflare pages (build : `npm run build`, output : `dist`)
- [ ] configurer le domaine custom + dns
- [ ] vérifier les redirections `www` ↔ apex
- [ ] activer la compression brotli (par défaut sur cloudflare)

### qualité
- [ ] lighthouse sur les 4 pages (cible 95+ partout)
- [ ] tester la navigation clavier
- [ ] vérifier la lecture vidéo sur safari ios + chrome android
- [ ] vérifier le fallback poster sur connexion lente (devtools throttling)
