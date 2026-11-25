import type { Metadata } from 'next';
import { HTML_LANG, LOCALES, OG_LOCALE, getDict } from '@/content/i18n';
import type { Lang } from '@/content/i18n';
import { SITE } from '@/content/site';

export function pagePath(lang: Lang, page: 'home' | 'menu') {
  return page === 'menu' ? `/${lang}/menu` : `/${lang}`;
}

export function buildMetadata(lang: Lang, page: 'home' | 'menu'): Metadata {
  const t = getDict(lang);
  const title = page === 'menu' ? t.meta.menuTitle : t.meta.title;
  const languages: Record<string, string> = Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], pagePath(l, page)]));
  languages['x-default'] = pagePath('en', page);
  return {
    metadataBase: new URL(SITE.url),
    title,
    description: t.meta.desc,
    alternates: { canonical: pagePath(lang, page), languages },
    openGraph: {
      type: 'website',
      siteName: 'ORA',
      title,
      description: t.meta.desc,
      url: pagePath(lang, page),
      locale: OG_LOCALE[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [{ url: '/media/og-ora.jpg', width: 1280, height: 720, alt: 'ORA, Tashkent' }],
    },
    twitter: { card: 'summary_large_image', title, description: t.meta.desc, images: ['/media/og-ora.jpg'] },
    formatDetection: { telephone: false },
  };
}

/** Restaurant / LocalBusiness structured data. Only facts stated in the approved design; no ratings. */
export function restaurantJsonLd(lang: Lang) {
  const t = getDict(lang);
  return {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'LocalBusiness'],
    '@id': `${SITE.url}/#restaurant`,
    name: 'ORA',
    description: t.meta.desc,
    url: `${SITE.url}${pagePath(lang, 'home')}`,
    image: `${SITE.url}/media/og-ora.jpg`,
    hasMenu: `${SITE.url}${pagePath(lang, 'menu')}`,
    servesCuisine: ['Italian', 'European'],
    priceRange: '$$ - $$$',
    telephone: SITE.phones[0].e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Istiqbol street 41, Infinity Luxury Residence, 2nd floor',
      addressLocality: 'Tashkent',
      addressRegion: 'Yashnabad district',
      addressCountry: 'UZ',
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.latitude, longitude: SITE.geo.longitude },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '23:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '09:00', closes: '23:45' },
    ],
    acceptsReservations: true,
    paymentAccepted: 'Cash, Credit Card, QR',
    maximumAttendeeCapacity: 180,
    // As listed on ORA's Yandex Eats page (verified 26 Nov 2026).
    award: ['Ultima Guide — Best decor', 'Ultima Guide — Superior service', "Ultima Guide — Users' choice"],
    sameAs: [SITE.instagram, SITE.telegram],
    inLanguage: HTML_LANG[lang],
  };
}
