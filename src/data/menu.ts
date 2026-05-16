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
          'boeuf, double american cheese, bacon fumé, pickles maison, oignons crus, laitue, sauce maison',
        price: 11,
      },
      {
        name: 'vg+',
        description:
          'galette de légumes maison, american cheese, pickles, oignons crus, laitue, sauce maison',
        price: 10,
        tag: 'végétarien',
      },
    ],
  },
  {
    id: 'sides',
    title: 'sides',
    items: [
      {
        name: 'frites graisse de boeuf',
        description: 'pommes de terre fraîches, cuisson à la graisse de boeuf, fleur de sel',
        price: 4.5,
      },
      {
        name: 'coleslaw',
        description: 'chou blanc, carotte, sauce yaourt-mayonnaise maison',
        price: 4,
      },
    ],
  },
  {
    id: 'boissons',
    title: 'boissons',
    items: [
      { name: 'coca-cola', description: '33 cl', price: 3.5 },
      { name: 'coca-cola zero', description: '33 cl', price: 3.5 },
      { name: 'limonade artisanale', description: 'producteur local, 25 cl', price: 4 },
      { name: 'bière blonde pression', description: 'brasserie locale, 25 cl', price: 5 },
      { name: 'eau plate', description: '50 cl', price: 2.5 },
    ],
  },
];
