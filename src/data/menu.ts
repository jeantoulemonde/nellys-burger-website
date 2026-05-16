export type MenuItem = {
  name: string;
  description: string;
  price: number;
  tag?: string;
};

export type MenuSection = {
  id: string;
  title: string;
  items: MenuItem[];
};

export const menu: MenuSection[] = [
  {
    id: 'burgers',
    title: 'burgers',
    items: [
      {
        name: 'cheeseburger classique',
        description:
          'boeuf, american cheese, pickles maison, oignons crus, laitue, ketchup, moutarde américaine',
        price: 9,
      },
      {
        name: 'cheeseburger bacon',
        description:
          "boeuf, american cheese, oignons confits, poitrine fumée, laitue, sauce nelly's",
        price: 10,
      },
      {
        name: 'vg+',
        description:
          'falafel aux noisettes, aubergine fondante, american cheese, laitue, sauce au fromage blanc',
        price: 9.5,
        tag: 'végétarien',
      },
    ],
  },
  {
    id: 'sides',
    title: 'sides',
    items: [
      {
        name: 'frites à la graisse de boeuf',
        description: 'pommes de terre fraîches, cuisson à la graisse de boeuf, fleur de sel',
        price: 4,
      },
      {
        name: 'coleslaw',
        description: 'salade de carotte et de chou',
        price: 3,
      },
    ],
  },
  {
    id: 'boissons',
    title: 'boissons',
    items: [
      { name: 'canettes', description: 'coca, coca zero, fanta, sprite — 33 cl', price: 2 },
      { name: 'thé glacé maison', description: 'infusion du jour, peu sucré', price: 4 },
      { name: 'citronnade maison', description: 'citron pressé, eau, sucre de canne', price: 4 },
      { name: 'kombucha datxa', description: 'kombucha basque, 33 cl', price: 4.5 },
      { name: 'bière asahi bouteille', description: '33 cl', price: 4 },
      { name: "bière nelly's x landberry", description: 'collab avec la brasserie landberry, 44 cl', price: 6 },
    ],
  },
];
