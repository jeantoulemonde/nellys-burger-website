export const site = {
  name: "Nelly's",
  displayName: "nelly's",
  legalName: "Nelly's Biarritz",
  tagline: 'smash burger à emporter — biarritz',
  description:
    "smash burger à emporter à biarritz, 21 avenue du jardin public. cheeseburger classique, bacon, vg+, frites graisse de boeuf. ouvert 7j/7, midi et soir.",
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
  hoursDisplay: [{ day: 'lundi — dimanche', value: '12h — 22h' }],
  notes: {
    orders: 'commandes au comptoir uniquement, pas de téléphone',
    delivery: 'pas de livraison via plateforme',
    reservation: 'pas de réservation, premier arrivé premier servi',
    payment: 'carte bleue et espèces',
  },
} as const;

export type Site = typeof site;
