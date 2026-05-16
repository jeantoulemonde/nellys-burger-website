# nelly's burger website

site vitrine d'un restaurant de smash burgers à biarritz. astro + tailwind + typescript, statique, hébergé sur cloudflare pages (ou vercel).

## stack

- [astro 5](https://astro.build) — generation statique
- [tailwind css v4](https://tailwindcss.com) — via plugin vite, pas de fichier config (tokens dans `src/styles/global.css`)
- typescript strict
- `@astrojs/sitemap` — sitemap auto
- police : inter tight (google fonts, poids 400 + 700)
- zéro javascript client par défaut (seul détail interactif : `<details>` natifs sur le faq)

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
  components/      # composants .astro réutilisables
    Header.astro
    Footer.astro
    Hero.astro
    MenuItem.astro
    MenuSection.astro
    InfoBlock.astro
    SEOHead.astro
  data/            # données statiques typées
    site.ts        # infos restaurant (adresse, horaires, contact)
    menu.ts        # menu structuré (sections + items)
  layouts/
    Layout.astro   # layout principal avec slot + SEO
  pages/
    index.astro    # accueil
    menu.astro     # menu complet
    le-concept.astro
    contact.astro
  styles/
    global.css     # tailwind v4 + tokens + utilitaires
public/
  robots.txt
astro.config.mjs   # site url, sitemap, plugin tailwind
```

## conventions

voir `CLAUDE.md` pour les conventions détaillées (typographie lowercase, palette, structure des composants, règles SEO).

## à faire

### contenu
- [ ] remplacer `[NOM_RESTAU]` dans `src/data/site.ts` par le vrai nom
- [ ] adresse, code postal, téléphone, email réels
- [ ] coordonnées geo (latitude/longitude) précises
- [ ] handle instagram réel + url
- [ ] prix et descriptions définitives dans `src/data/menu.ts`
- [ ] page mentions-légales (route `/mentions-legales` à créer)
- [ ] textes définitifs sur `/le-concept` et accueil

### images
- [ ] remplacer les urls unsplash par des photos pro du restaurant
- [ ] créer un `og-default.jpg` (1200x630) dans `public/`
- [ ] créer un `favicon.svg` dans `public/`
- [ ] hero image en local (déplacer vers `src/assets/` et passer par `astro:assets` pour AVIF/WebP)

### SEO
- [ ] remplacer `site:` dans `astro.config.mjs` par l'url de production
- [ ] mettre à jour l'url dans `public/robots.txt`
- [ ] créer un compte google business profile
- [ ] soumettre le sitemap à search console après mise en ligne

### déploiement
- [ ] créer le projet sur cloudflare pages (commande build : `npm run build`, dossier sortie : `dist`)
- [ ] configurer le domaine custom + dns
- [ ] activer la compression brotli
- [ ] vérifier les redirections `www` ↔ apex

### qualité
- [ ] passer un lighthouse sur les 4 pages (cible 95+ partout)
- [ ] tester la navigation clavier
- [ ] vérifier le contraste de tous les éléments interactifs
- [ ] valider le json-ld sur [validator.schema.org](https://validator.schema.org)
