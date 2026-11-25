/** Verified contact and booking destinations taken from the approved ORA design. */
export const SITE = {
  name: 'ORA',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://ora-tashkent.vercel.app').replace(/\/$/, ''),
  phones: [
    { display: '+998 78 122 99 22', href: 'tel:+998781229922', e164: '+998781229922' },
    { display: '+998 95 418 12 12', href: 'tel:+998954181212', e164: '+998954181212' },
  ],
  telegram: 'https://t.me/Oratashkent',
  instagram: 'https://www.instagram.com/ora.tashkent/',
  yandexEats: 'https://eats.yandex.com/uz/offline_place/d8c768e1b2df4127a69f1031920b160f?slug=ora',
  twoGis: 'https://2gis.uz/tashkent/firm/70000001105345632',
  directions: 'https://www.google.com/maps/search/?api=1&query=ORA%20restaurant%20Istiqbol%2041%20Tashkent',
  mapEmbed:
    'https://maps.google.com/maps?q=ORA%20restaurant%2C%20Istiqbol%2041%2C%20Infinity%20Luxury%20Residence%2C%20Tashkent&z=16&output=embed',
  geo: { latitude: 41.302411, longitude: 69.289142 },
} as const;

/** Optional public Telegram booking bot (e.g. "@OraBookingBot"). Empty = shown as "Soon". */
export const TELEGRAM_BOT = (process.env.NEXT_PUBLIC_TELEGRAM_BOT || '').trim();

/** Videos that exist as real footage. Every other film slot shows its still poster, as in the design export. */
export const VIDEOS = new Set(['hero', 'evening', 'light', 'service']);
