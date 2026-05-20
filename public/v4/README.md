# Nelly's — v4 (site complet cyber-sigilism)

Site complet multi-pages dérivé de la preview `v3-C1`. **B&W strict**, sparkles
animés, ornements sigil qui s'effilent depuis le logo, **constellation animée**
qui remplace la comète.

## Pages

| URL              | Fichier              | Description                                  |
| ---------------- | -------------------- | -------------------------------------------- |
| `/v4/`           | `index.html`         | Home — hero logo + sigils, 3 burgers, lieu   |
| `/v4/menu`       | `menu.html`          | Menu complet : burgers, sides, boissons      |
| `/v4/lieu`       | `lieu.html`          | Adresse, horaires, plan, comment venir       |
| `/v4/a-propos`   | `a-propos.html`      | Notre histoire, manifeste, ce qu'on ne fait pas |
| `/v4/contact`    | `contact.html`       | Contact minimal, FAQ                         |

URLs sans extension grâce au `vercel.json` `cleanUrls: true` déjà en place.

## Constellation par page

Chaque page a une constellation distincte tracée au load (sparkles + lignes fines).
Code dans `v4.js`, données en `CONSTELLATIONS[key]`. Le `key` est lu sur
`<body data-page="...">`.

| Page       | Forme                                                          |
| ---------- | -------------------------------------------------------------- |
| `home`     | Étoile sigil 8 pointes + losange central (13 stars / 20 lines) |
| `menu`     | Silhouette de burger empilé (15 stars / 18 lines)              |
| `lieu`     | Marqueur géographique / triangle (11 stars / 14 lines)         |
| `about`    | Radial minimal (9 stars / 8 lines)                             |
| `contact`  | Croix X simple (5 stars / 4 lines)                             |

Une fois tracée, la constellation reste à `opacity: 0.25` en arrière-plan.

## Animations conservées de v3-C1

- **Sparkles random** qui s'allument un par un au load (~38 par page),
  moitié en twinkle infini
- **Sigils émanant du logo** dans le hero, stroke-dasharray draw 2.4s
- **Burst de sparkles** au hover sur les `.menu-item` (`data-sparkle`)
- **Sigils header** qui apparaissent au hover sur le brand mark

Nouveau : la comète diagonale est remplacée par la **constellation par page**
(brief). Garde l'esprit "ciel étoilé qui se révèle" mais devient une
**signature stellaire propre à chaque page**.

## Choix techniques

- **HTML/CSS/JS vanilla**, pas de framework
- `v4.css` (design system partagé, ~330 lignes) + `v4.js` (sparkles +
  constellation, ~140 lignes) chargés une fois, mis en cache
- **Mobile-first** : breakpoints à 640 / 768 / 1024px
- **Animations GPU** : `transform`, `opacity`, `stroke-dashoffset`. Aucune
  animation de propriétés layout-trigger.
- **prefers-reduced-motion** : sparkles + constellation animations désactivées
- **JSON-LD Restaurant** sur `/v4/` et `Menu` complet sur `/v4/menu`
  (identique à la v1)
- **Schema.org `aria-current="page"`** sur le lien nav actif
- **Polices** : General Sans via Fontshare (chargée sur toutes les pages,
  cohérent avec v1)

## Images

5 photos copiées dans `/media/photos/` depuis `src/assets/photos/` :

- `burger.jpg` — cheeseburger sur assiette (menu)
- `counter-plancha.jpg` — comptoir + plancha (menu)
- `kitchen-prep.jpg` — cuisine en service (à-propos)
- `storefront.jpg` — vitrine store jaune (lieu + home)
- `storefront-queue.jpg` — file devant la vitrine au crépuscule (lieu)

Traitement appliqué (CSS, **non destructif** sur le fichier source) :

```css
.img-bw {
  filter: grayscale(1) contrast(1.15) brightness(0.95);
}
```

Plus une `.img-bw-frame` avec border noir + vignette radiale subtile en
overlay (pseudo-element `::after`). Aucune image traitée à la main, on peut
retirer le filtre d'un coup en supprimant les classes si besoin.

**Alt textes** : repris **mot pour mot** des composants v1 (cf. SEO image).

## SEO préservé de la v1

Pour chaque page v4, on retrouve **exactement** :

- `<title>` v1
- `<meta name="description">` v1
- `<meta property="og:*">` v1 (title, description, image, locale)
- Hiérarchie `h1` / `h2` / `h3` (h1 unique, lowercase, identique au texte v1)
- Texte des paragraphes v1 mot pour mot
- `<link rel="canonical">` vers `/v4/...`
- Favicons + apple-touch-icon + manifest
- JSON-LD Restaurant / Menu identiques

**À ajuster avant prod si on bascule v4 → v1** :
- Canonical actuel pointe sur `/v4/...` — à remplacer par `/...` racine
  si v4 devient la version principale.
- `acceptsReservations: false` confirmé.

## Performance

- 1 feuille de style globale partagée → cachée après la première page
- 1 script partagé, defer, ~3 KB minifié
- Pas de framework JS, pas de runtime hydration
- Images en `loading="lazy"` (sauf hero potentiel)
- Pas de vidéo (la v4 mise sur la typo + constellation, pas sur du contenu lourd)

Cible Lighthouse : **Performance 90+, SEO 100, Accessibilité 95+**.

## À faire avant mise en prod

Si tu décides de promouvoir v4 en remplacement de v1 :

1. Servir le contenu de `/v4/index.html` à la racine `/`
2. Mettre à jour `<link rel="canonical">` de `/v4/...` vers `/...`
3. Mettre à jour `og:url` dans les meta
4. Vérifier que `/v4/` reste accessible OU mettre en place une redirect
   permanente vers la racine
5. Mettre à jour le sitemap pour inclure (ou non) `/v4/*`
6. Page mentions-légales à créer si elle n'existe pas (lien actuellement
   404 dans le footer)
