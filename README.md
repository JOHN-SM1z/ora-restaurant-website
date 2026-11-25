# ORA — restaurant website

Production build of the approved ORA design (Italian & author's cuisine, Tashkent).
Next.js 16 (App Router, TypeScript), statically pre-rendered in English, Russian and Uzbek,
deployed on Vercel.

## Run

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en, /ru or /uz
npm run build && npm start
npm run lint
```

## Routes

| URL | Page |
| --- | --- |
| `/` | Redirects to the visitor's language (saved choice → `Accept-Language` → English). `/?view=menu&lang=ru` from the prototype still works. |
| `/en`, `/ru`, `/uz` | Home (hero, story, room, open kitchen, breakfast, signature dishes, bar, day→evening, evening, gallery, private events, reservations, visit) |
| `/en/menu`, `/ru/menu`, `/uz/menu` | Full menu: 79 dishes in 12 categories, search, sticky category bar |
| `/api/reservation` | Reservation requests → Telegram Bot API (only when configured) |
| `/sitemap.xml`, `/robots.txt` | SEO |

## Structure

```
src/
  app/
    [lang]/layout.tsx     root layout: <html lang>, fonts, JSON-LD, site chrome
    [lang]/page.tsx       home page (section components)
    [lang]/menu/page.tsx  menu page + schema.org Menu
    api/reservation/      Telegram delivery, validation, honeypot, throttle
    globals.css           tokens + base rules from the design export
    hover.css             the design's :hover / :active styles
    fonts.css             self-hosted Jost + Piazzolla (@font-face, unicode-range subsets)
    sitemap.ts robots.ts icon.svg
  components/
    site/                 OraContext (state, routing, booking), Header, MobileMenu,
                          Footer, StickyCta, ReserveDialog, CursorRing
    home/                 one component per home section
    menu/MenuPage.tsx
  content/
    en.json ru.json uz.json   all copy + the verified menu (name, price, weight, photo file)
    i18n.ts                   locales, helpers
    site.ts                   verified phones / links / coordinates
  lib/
    motion.ts             motion engine ported from the design (reveals, parallax,
                          tilt, magnet, cursor ring, kitchen expand, day→evening,
                          horizontal gallery, events deck, pointer-paced video)
    seo.ts track.ts
  proxy.ts                language redirect for "/"
public/
  media/dishes/           79 dish photos, file names match `i` in the menu data
  media/photos/           3 signature photographs
  media/posters/          13 film stills (WebP for display, JPG originals)
  media/video/            4 films, H.264 1080p + 720p (mobile), no audio track
  fonts/                  20 woff2 files
scripts/posters-webp.mjs  regenerates poster WebP files
```

Section markup keeps the design's inline styles verbatim, so visual changes are made in the
component for that section. The editable copy and menu live in `src/content/*.json`.

## Reservations

* **No bot configured (current default):** the form validates, opens Telegram with the request
  prepared for @Oratashkent, copies the text, and tells the guest the request is *waiting in
  Telegram* until they press Send; the table is confirmed only when ORA replies.
* **Bot configured:** set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in Vercel (see
  `.env.example`) and redeploy. The form then posts to `/api/reservation`, which shows
  "Request sent" only after Telegram confirms delivery, and states that it is not yet a
  confirmed booking. On any failure it falls back to the manual Telegram flow.
* The "ORA bot" card is hidden until `NEXT_PUBLIC_TELEGRAM_BOT` is set.

## Analytics

Events are pushed as `ora_*` to `window.dataLayer` (and gtag / Yandex Metrica when present).
No tracking script is included; add one if the restaurant wants analytics.
