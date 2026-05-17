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
        name: 'cheeseburger',
        description:
          'boeuf · american cheese · pickles · oignons · laitue · ketchup · moutarde',
        price: 9,
      },
      {
        name: 'bacon',
        description:
          "boeuf · american cheese · oignons confits · bacon · laitue · sauce nelly's",
        price: 10,
      },
      {
        name: 'vg+',
        description:
          'falafel · aubergine · american cheese · laitue · sauce fromage blanc',
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
        name: 'frites',
        description: 'graisse de boeuf · fleur de sel',
        price: 4,
      },
      {
        name: 'coleslaw',
        description: 'carotte · chou',
        price: 3,
      },
    ],
  },
  {
    id: 'boissons',
    title: 'boissons',
    items: [
      { name: 'soda', description: '33 cl', price: 2 },
      { name: 'thé glacé maison', description: '', price: 4 },
      { name: 'citronnade maison', description: '', price: 4 },
      { name: 'kombucha datxa', description: '33 cl', price: 4.5 },
      { name: 'asahi', description: '33 cl', price: 4 },
      {
        name: "nelly's × landberry",
        description: 'brassée à anglet · 44 cl',
        price: 6,
        tag: 'collab',
        featured: true,
      },
    ],
  },
];
