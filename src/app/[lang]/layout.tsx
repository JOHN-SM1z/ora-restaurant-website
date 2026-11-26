import type { Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { HTML_LANG, LOCALES, getDict, isLang } from '@/content/i18n';
import { restaurantJsonLd } from '@/lib/seo';
import { OraProvider } from '@/components/site/OraContext';
import type { BookingMode } from '@/components/site/OraContext';
import Header from '@/components/site/Header';
import MobileMenu from '@/components/site/MobileMenu';
import Footer from '@/components/site/Footer';
import CursorRing from '@/components/site/CursorRing';
import StickyCta from '@/components/site/StickyCta';
import ReserveDialog from '@/components/site/ReserveDialog';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#252C1F',
};

// Adds `js-motion` before first paint so hero copy can animate in without a flash.
// Falls back to visible content if the motion engine has not started within 4s.
const motionBoot = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('js-motion');setTimeout(function(){if(d.dataset.motion!=='ready')d.classList.remove('js-motion')},4000)}catch(e){}})();`;

const fontPreloads = ['/fonts/jost-normal-latin.woff2', '/fonts/piazzolla-normal-latin.woff2'];

/** Reservations go straight to the restaurant only when a Telegram bot is configured server-side. */
function bookingMode(): BookingMode {
  return process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID ? 'bot' : 'manual';
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  return (
    <html lang={HTML_LANG[lang]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        {fontPreloads.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd(lang)).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">{t.a11y.skip}</a>
        <OraProvider initialLang={lang} bookingMode={bookingMode()}>
          <div style={{ background: '#E3E8DE', color: '#191D16', fontFamily: 'var(--font-body)', minHeight: '100vh' }}>
            <Header />
            <MobileMenu />
            {children}
            <Footer />
            <CursorRing />
            <StickyCta />
            <ReserveDialog />
          </div>
        </OraProvider>
      </body>
    </html>
  );
}
