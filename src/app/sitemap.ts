import type { MetadataRoute } from 'next';
import { HTML_LANG, LOCALES } from '@/content/i18n';
import { SITE } from '@/content/site';
import { pagePath } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['home', 'menu'] as const;
  return pages.flatMap((page) =>
    LOCALES.map((lang) => ({
      url: `${SITE.url}${pagePath(lang, page)}`,
      lastModified: new Date('2026-11-26'),
      changeFrequency: page === 'menu' ? ('weekly' as const) : ('monthly' as const),
      priority: page === 'home' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `${SITE.url}${pagePath(l, page)}`])),
      },
    })),
  );
}
