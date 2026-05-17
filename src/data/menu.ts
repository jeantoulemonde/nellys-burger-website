export type MenuItem = {
  name: string;
  description: string;
  price: number;
  /** mention inline en muted (allergène / régime), séparateur " · " */
  tag?: string;
  /** rend l'item en bloc large (template burger) au lieu de la ligne compacte (drinks) */
  featured?: boolean;
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
        tag: 'fruits à coque',
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
      { name: 'soda', description: '33 cl', price: 2 },
      { name: 'thé glacé maison', description: 'infusion du jour, peu sucré', price: 4 },
      { name: 'citronnade maison', description: 'citron pressé', price: 4 },
      { name: 'kombucha datxa', description: 'kombucha basque, 33 cl', price: 4.5 },
      { name: 'bière asahi bouteille', description: '33 cl', price: 4 },
      {
        name: "bière nelly's x landberry",
        description: 'collab avec la brasserie landberry, brassée à anglet, 44 cl',
        price: 6,
        tag: 'collab',
        featured: true,
      },
    ],
  },
];
