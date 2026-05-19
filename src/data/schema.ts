/**
 * Helpers schema.org centralisés. Importés depuis les pages pour garantir
 * que toutes les pages affichent les mêmes valeurs canoniques (address,
 * phone, geo, openingHoursSpecification).
 */

import { site } from '~/data/site';
import { menu as menuData } from '~/data/menu';

const dayMap: Record<string, string> = {
  Mo: 'Monday',
  Tu: 'Tuesday',
  We: 'Wednesday',
  Th: 'Thursday',
  Fr: 'Friday',
  Sa: 'Saturday',
  Su: 'Sunday',
};

const openingHoursSpecification = site.hours.map((slot) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: slot.days.map((d) => dayMap[d]),
  opens: slot.opens,
  closes: slot.closes,
}));

const abs = (path: string) => new URL(path, site.url).toString();

export const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${site.url}#restaurant`,
  name: site.name,
  image: abs('/og-image.jpg'),
  url: site.url,
  telephone: site.phone,
  priceRange: site.priceRange,
  servesCuisine: site.cuisine,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.street,
    addressLocality: site.city,
    postalCode: site.postalCode,
    addressCountry: site.country,
    addressRegion: site.region,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  openingHoursSpecification,
  acceptsReservations: false,
  hasMenu: abs('/menu'),
  sameAs: [site.instagram],
};

export const menuSchema = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  '@id': `${site.url}/menu#menu`,
  name: `Menu ${site.name}`,
  inLanguage: 'fr',
  hasMenuSection: menuData.map((section) => ({
    '@type': 'MenuSection',
    name: section.title,
    hasMenuItem: section.items.map((item) => ({
      '@type': 'MenuItem',
      name: item.name,
      description: item.description,
      offers: {
        '@type': 'Offer',
        price: item.price.toFixed(2),
        priceCurrency: 'EUR',
      },
      ...(item.tag === 'fruits à coque'
        ? { suitableForDiet: 'https://schema.org/VegetarianDiet' }
        : {}),
    })),
  })),
};

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
