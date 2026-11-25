import type { Metadata } from 'next';
import { getDict, isLang } from '@/content/i18n';
import { SITE } from '@/content/site';
import { buildMetadata, pagePath } from '@/lib/seo';
import MenuPage from '@/components/menu/MenuPage';

export async function generateMetadata({ params }: PageProps<'/[lang]/menu'>): Promise<Metadata> {
  const { lang } = await params;
  return isLang(lang) ? buildMetadata(lang, 'menu') : {};
}

export default async function Menu({ params }: PageProps<'/[lang]/menu'>) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  const t = getDict(lang);
  // schema.org Menu built from the verified dish list (names, prices in UZS, weights).
  const menuLd = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: t.menu.title,
    url: `${SITE.url}${pagePath(lang, 'menu')}`,
    inLanguage: lang,
    hasMenuSection: t.menu.cats.map((c) => ({
      '@type': 'MenuSection',
      name: c.name,
      hasMenuItem: c.items.map((it) => ({
        '@type': 'MenuItem',
        name: it.n,
        image: `${SITE.url}/media/dishes/${it.i}`,
        ...(it.d ? { description: it.d } : {}),
        ...(it.p ? { offers: { '@type': 'Offer', price: it.p.replace(/\s/g, ''), priceCurrency: 'UZS' } } : {}),
      })),
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuLd).replace(/</g, '\\u003c') }} />
      <MenuPage />
    </>
  );
}
