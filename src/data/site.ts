export const site = {
  name: '[NOM_RESTAU]',
  legalName: '[NOM_RESTAU]',
  tagline: 'smash burger artisanal à biarritz',
  description:
    "smash burgers artisanaux à biarritz. viande fraîche, pain brioché, american cheese, sauces maison. sur place ou à emporter.",
  url: 'https://example.com',
  city: 'Biarritz',
  postalCode: '64200',
  region: 'Nouvelle-Aquitaine',
  country: 'FR',
  address: '12 rue placeholder',
  fullAddress: '12 rue placeholder, 64200 Biarritz',
  phone: '+33 5 00 00 00 00',
  email: 'bonjour@example.com',
  instagram: 'https://instagram.com/placeholder',
  instagramHandle: '@placeholder',
  geo: {
    latitude: 43.4832,
    longitude: -1.5586,
  },
  priceRange: '€€',
  cuisine: 'American',
  hours: [
    { days: ['Tu', 'We', 'Th'], opens: '12:00', closes: '14:30' },
    { days: ['Tu', 'We', 'Th'], opens: '19:00', closes: '22:30' },
    { days: ['Fr', 'Sa'], opens: '12:00', closes: '14:30' },
    { days: ['Fr', 'Sa'], opens: '19:00', closes: '23:00' },
  ],
  hoursDisplay: [
    { day: 'mardi — jeudi', value: '12h — 14h30 · 19h — 22h30' },
    { day: 'vendredi — samedi', value: '12h — 14h30 · 19h — 23h' },
    { day: 'dimanche — lundi', value: 'fermé' },
  ],
  service: ['sur place', 'à emporter'],
} as const;

export type Site = typeof site;
