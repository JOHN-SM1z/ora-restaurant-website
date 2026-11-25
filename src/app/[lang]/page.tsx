import type { Metadata } from 'next';
import { isLang } from '@/content/i18n';
import { buildMetadata } from '@/lib/seo';
import Hero from '@/components/home/Hero';
import Story from '@/components/home/Story';
import Room from '@/components/home/Room';
import Kitchen from '@/components/home/Kitchen';
import Breakfast from '@/components/home/Breakfast';
import Signature from '@/components/home/Signature';
import Beverages from '@/components/home/Beverages';
import Transition from '@/components/home/Transition';
import Evening from '@/components/home/Evening';
import Gallery from '@/components/home/Gallery';
import Events from '@/components/home/Events';
import Reserve from '@/components/home/Reserve';
import Visit from '@/components/home/Visit';

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  return isLang(lang) ? buildMetadata(lang, 'home') : {};
}

export default function HomePage() {
  return (
    <main id="top">
      <span id="main" />
      <Hero />
      <Story />
      <Room />
      <Kitchen />
      <Breakfast />
      <Signature />
      <Beverages />
      <Transition />
      <Evening />
      <Gallery />
      <Events />
      <Reserve />
      <Visit />
    </main>
  );
}
