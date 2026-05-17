export const site = {
  name: "Nelly's",
  displayName: "nelly's",
  legalName: "Nelly's Biarritz",
  tagline: 'smash burger à emporter, biarritz',
  description:
    "smash burger à emporter à biarritz, 21 avenue du jardin public. ouvert 7j/7, 12h à 22h.",
  url: 'https://example.com',
  street: '21 avenue du jardin public',
  postalCode: '64200',
  city: 'Biarritz',
  region: 'Nouvelle-Aquitaine',
  country: 'FR',
  area: 'jardin public',
  fullAddress: '21 avenue du jardin public, 64200 Biarritz',
  instagram: 'https://www.instagram.com/nellysburgerz/',
  instagramHandle: '@nellysburgerz',
  geo: {
    latitude: 43.4843,
    longitude: -1.5598,
  },
  priceRange: '€€',
  cuisine: ['Burger', 'American', 'Smash burger'],
  service: ['à emporter'],
  hours: [
    { days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], opens: '12:00', closes: '22:00' },
  ],
  hoursDisplay: [{ day: 'tous les jours', value: '12h à 22h' }],
  notes: {
    orders: 'commandes au comptoir',
    delivery: 'pas de livraison',
    reservation: 'pas de réservation',
    payment: 'cb ou espèces',
  },
} as const;

export type Site = typeof site;
