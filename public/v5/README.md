# Nelly's — v5 (site complet Y2K dark / frutiger aero)

Site complet multi-pages dérivé de la preview `v3-Y1`. Globe terrestre
wireframe qui tourne en continu, logo Nelly's planté dessus comme un pin
de localisation (Biarritz), copy en orbite autour, étoiles qui
scintillent. Esthétique **y2k / frutiger aero** sur fond **noir bleuté
très foncé** (`#050814`) — un noir d'espace plutôt qu'un bleu nuit.

## Pages

| URL              | Fichier              | Description                                     |
| ---------------- | -------------------- | ----------------------------------------------- |
| `/v5/`           | `index.html`         | Home — globe wireframe + logo en pin, hero      |
| `/v5/menu`       | `menu.html`          | Menu complet : burgers, sides, boissons         |
| `/v5/lieu`       | `lieu.html`          | Adresse, horaires, plan, globe centré Biarritz  |
| `/v5/a-propos`   | `a-propos.html`      | Manifeste, histoire 2021-2022, "ce qu'on fait pas" |
| `/v5/contact`    | `contact.html`       | Contact minimal, FAQ                            |

URLs sans extension grâce au `vercel.json` `cleanUrls: true` déjà en place.

## Direction artistique

- **Fond** : noir bleuté très foncé `#050814` avec léger halo cyan en haut
  et en bas, donne une profondeur d'espace
- **Globe wireframe** : SVG 200×200 avec 10 ellipses (latitudes +
  longitudes), gradient radial cyan/transparent au centre, rotation
  `30s` linear infinite. Au clic → zoom × 2 (toggle)
- **Pin Nelly's** : logo SVG en mask blanc, avec drop-shadow cyan +
  blanc, posé au centre du globe avec une "tige" + pulse cyan en
  dessous
- **Orbites** : 2 anneaux SVG `textPath` qui tournent en sens inverse
  ("come and get your fingers salty" + "ouvert 7j/7...")
- **Étoiles** : ~90 dots blancs/cyan en `position: fixed` avec animation
  `twinkle` 3s ease-in-out infinite, opacité 0.3→1, scale 1→1.6
- **Cards** : verre glossy `backdrop-filter: blur(14px)`, bordure
  `rgba(255,255,255,0.18)`, gradient blanc `135deg 40%` en pseudo-element
  pour le shine, élévation au hover avec glow cyan
- **Boutons aqua** : gradient `#d8efff → #8fd9ff → #5fb7ff`, inner glow
  blanc en haut, ombre cyan en bas, pure frutiger aero
- **Typographie** : `General Sans` (Fontshare), 400/500/600, italiques
  pour les mots clés ("salty", "biarritz", "fréquentes"), tout en
  lowercase sauf adresses

## Contenu et SEO

Tout le copy vient **mot pour mot de la v1** :
- `<title>`, `<meta description>`, `og:*` : identiques
- `<h1>` / `<h2>` / `<h3>` : identiques (texte v1, juste l'italique
  visuel ajouté sur certains mots)
- Texte des paragraphes (lead, manifeste, sections) : verbatim
- Alt textes : repris à l'identique des composants v1 (cf. SEO image)
- JSON-LD : `Restaurant` (home), `Menu` complet (menu), `FAQPage` (contact)
- `noindex,nofollow` partout — la v5 ne competitionne pas la v1 en prod

## Images

5 photos partagées factorisées sous `/media/photos/` (déjà utilisées par
v4) :

- `burger.jpg` — cheeseburger sur assiette (menu, home)
- `counter-plancha.jpg` — comptoir + plancha (à-propos)
- `kitchen-prep.jpg` — cuisine en service (à-propos)
- `storefront.jpg` — vitrine store jaune (lieu, home)
- `storefront-queue.jpg` — file devant la vitrine au crépuscule (lieu)

Traitement appliqué côté CSS (**non destructif** sur le fichier source) :

```css
.img-glow img {
  filter: contrast(1.05) saturate(1.05);
}
.img-glow::after {
  /* halo cyan en haut, fade noir en bas pour que la photo se fonde
     dans le fond dark sans rupture nette */
}
.img-glow::before {
  /* fine ligne blanche en haut, façon "vitre highlight" */
}
```

Pas de filtre destructif (grayscale, sepia) — les photos gardent leurs
couleurs originales et juste un léger boost de contraste/saturation pour
ressortir sur le fond sombre. Glow cyan + bordure translucide au tour.

## Animations conservées de v3-Y1

- **Globe wireframe** qui tourne en continu (30s/tour)
- **Étoiles scintillantes** ~90 dots, animation twinkle infinie
- **Orbites de texte** autour du globe (2 anneaux, sens inverse)
- **Pulse pin** : le point sous le pin pulse en cyan (2s ease-in-out)
- **Zoom du globe au clic** : `scale(2)` toggle, transition 1.2s, vitesse
  de rotation accélérée en mode zoom
- **Keyboard support** : Enter / Space sur le globe focusable

## Navigation

- Header **sticky** avec `backdrop-filter` blur + saturate, fond
  semi-transparent du bg dark
- Logo à gauche (mask SVG blanc), nav à droite (boutons pill
  translucides avec hover cyan glow)
- État `aria-current="page"` rendu en gradient cyan léger
- Footer minimal : adresse, horaires, instagram, mentions légales

## Choix techniques

- **HTML/CSS/JS vanilla**, aucun framework
- `v5.css` (design system, ~440 lignes) + `v5.js` (~50 lignes : spawn
  étoiles + zoom globe) chargés une fois, mis en cache
- **Mobile-first** : breakpoints 640 / 768 / 1024 px
- **Animations GPU** : `transform`, `opacity` uniquement. Aucune
  propriété layout-trigger animée
- **prefers-reduced-motion** : globe, étoiles, orbites, pulse désactivés
- **WCAG AA** : contraste texte/fond vérifié (`#f0f6ff` sur `#050814` →
  ratio 17.5:1 ; muted `rgba(240,246,255,0.65)` → ratio 11:1)

## Performance

- 1 feuille de style globale partagée → cachée après la première page
- 1 script partagé, defer, ~50 lignes
- Pas de framework, pas de runtime hydration
- Images en `loading="lazy"` (sauf hero burger sur /menu)
- Photos déjà existantes, pas de duplication

Cible Lighthouse : **Performance 90+, SEO 100, Accessibilité 95+**.
