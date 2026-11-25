'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import type { FormEvent, MouseEvent, PointerEvent, ReactNode, SyntheticEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CURRENCY, DATE_LOCALE, DICTS, HTML_LANG, LOCALES, isLang } from '@/content/i18n';
import type { Dict, Lang } from '@/content/i18n';
import { SITE, TELEGRAM_BOT, VIDEOS } from '@/content/site';
import { OraMotion } from '@/lib/motion';
import { track } from '@/lib/track';

export type BookingMode = 'bot' | 'manual';
type Status = 'form' | 'sending' | 'sent' | 'manual';
type FormState = { date: string; time: string; guests: number; occasion: number; name: string; phone: string; email: string; notes: string; website: string };
type FieldKey = 'date' | 'time' | 'name' | 'phone' | 'email' | 'notes' | 'website';

const GUESTS = ['1', '2', '3', '4', '5', '6', '7+'];
const FEATURED = ['17-scallop-with-duxelles-and-black-truffle.jpg', '37-truffle-risotto.jpg', '35-porcini-ravioli.jpg', '23-creamy-eel-with-lime-and-coconut.jpg', '43-filet-mignon.jpg', '42-salmon-with-beurre-blanc.jpg', '33-prawn-pasta.jpg', '51-panna-cotta.jpg'];
const BREAKFAST = ['15-syrniki-with-mascarpone-cream.jpg', '16-french-toast-with-salted-caramel.jpg', '14-omelette-with-black-truffle-and-stracciatella.jpg'];
const DRINKS = ['64-jasmine-lemonade.jpg', '62-detox-blueberry-banana-mint.jpg', '87-cappuccino.jpg'];

function pick(t: Dict, file: string, cur: string) {
  for (const c of t.menu.cats) for (const it of c.items) if (it.i === file) return { n: it.n, d: it.d, p: it.p ? `${it.p} ${cur}` : '', img: `/media/dishes/${file}` };
  return null;
}

function viewOf(path: string): 'home' | 'menu' {
  return /\/menu\/?$/.test(path) ? 'menu' : 'home';
}

const noopSubscribe = () => () => {};

function localISODate(d = new Date()) {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
}

function useOraValues(initialLang: Lang, bookingMode: BookingMode) {
  const router = useRouter();
  const pathname = usePathname() || `/${initialLang}`;
  const view = viewOf(pathname);
  // Language comes from the URL; switching languages swaps the URL in place (see setLang).
  const seg = pathname.split('/')[1];
  const lang: Lang = isLang(seg) ? seg : initialLang;
  const [overHero, setOverHero] = useState(view === 'home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [status, setStatus] = useState<Status>('form');
  const [error, setError] = useState<'' | 'required' | 'phone' | 'date'>('');
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prepared, setPrepared] = useState({ msg: '', url: SITE.telegram as string });
  const [q, setQ] = useState('');
  // Today's date only exists on the client; the server renders without a minimum.
  const todayISO = useSyncExternalStore(noopSubscribe, () => localISODate(), () => '');
  const [f, setF] = useState<FormState>({ date: '', time: '', guests: 1, occasion: 3, name: '', phone: '', email: '', notes: '', website: '' });

  const engine = useRef<OraMotion | null>(null);
  const stateRef = useRef({ view, reserveOpen, menuOpen });
  useEffect(() => { stateRef.current = { view, reserveOpen, menuOpen }; }, [view, reserveOpen, menuOpen]);
  const pending = useRef<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const t = DICTS[lang];

  // Motion engine lifecycle.
  useEffect(() => {
    const m = new OraMotion(() => stateRef.current, setOverHero);
    engine.current = m;
    m.setup(true);
    return () => { m.destroy(); engine.current = null; };
  }, []);

  // Route (view) changes: scroll to the requested section or to the top, then re-arm animations.
  const prevView = useRef(view);
  useEffect(() => {
    if (prevView.current === view) return;
    prevView.current = view;
    requestAnimationFrame(() => {
      setOverHero(view === 'home');
      const m = engine.current;
      if (pending.current) { const id = pending.current; pending.current = null; m?.setup(true); m?.scrollToId(id, true); }
      else { window.scrollTo(0, 0); m?.setup(true); }
    });
  }, [view]);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    document.title = view === 'menu' ? t.meta.menuTitle : t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.desc);
  }, [lang, view, t]);

  // Body scroll lock, focus on open, focus restore on close.
  useEffect(() => {
    document.body.style.overflow = reserveOpen || menuOpen ? 'hidden' : '';
  }, [reserveOpen, menuOpen]);
  useEffect(() => {
    if (reserveOpen) {
      const id = setTimeout(() => document.getElementById('rsv-date')?.focus({ preventScroll: true }), 60);
      return () => clearTimeout(id);
    }
    opener.current?.focus?.({ preventScroll: true });
    opener.current = null;
  }, [reserveOpen]);

  const closeReserve = useCallback(() => {
    setReserveOpen(false);
    setError('');
    setFailed(false);
    setCopied(false);
    setStatus((s) => {
      if (s === 'sent' || s === 'manual') setF((p) => ({ ...p, name: '', phone: '', email: '', notes: '' }));
      return 'form';
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (stateRef.current.reserveOpen) closeReserve();
      else if (stateRef.current.menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeReserve]);

  const pathFor = useCallback((l: Lang, v: 'home' | 'menu' = view) => (v === 'menu' ? `/${l}/menu` : `/${l}`), [view]);

  const setLang = useCallback((l: Lang) => {
    try { localStorage.setItem('ora-lang', l); } catch {}
    document.cookie = `ora-lang=${l}; path=/; max-age=31536000; samesite=lax`;
    // Same page, other language: swap the URL without remounting, as the design does.
    window.history.replaceState(null, '', pathFor(l) + window.location.hash);
    requestAnimationFrame(() => engine.current?.setup(false));
  }, [pathFor]);

  const setView = useCallback((v: 'home' | 'menu') => {
    if (v === 'menu') track('menu_view', lang);
    setMenuOpen(false);
    router.push(pathFor(lang, v), { scroll: false });
  }, [lang, pathFor, router]);

  const goSection = useCallback((id: string) => {
    setMenuOpen(false);
    if (id === 'menu') { setView('menu'); return; }
    if (view !== 'home') { pending.current = id; setView('home'); } else engine.current?.scrollToId(id);
  }, [setView, view]);

  const openReserve = useCallback((e?: SyntheticEvent) => {
    opener.current = (e?.currentTarget as HTMLElement) || (document.activeElement as HTMLElement);
    track('reservation_click', lang, { view });
    setReserveOpen(true);
    setMenuOpen(false);
  }, [lang, view]);

  const trackLink = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const h = e.currentTarget.getAttribute('href') || '';
    const n = h.startsWith('tel:') ? 'call_click' : /maps/.test(h) ? 'directions_click' : /t\.me/.test(h) ? 'telegram_click' : /instagram/.test(h) ? 'social_click' : 'link_click';
    track(n, lang, { href: h.split('?')[0] });
  }, [lang]);

  const dateStr = useMemo(() => {
    if (!f.date) return '';
    try { return new Date(f.date + 'T00:00').toLocaleDateString(DATE_LOCALE[lang], { day: 'numeric', month: 'long' }); } catch { return f.date; }
  }, [f.date, lang]);

  const buildMessage = useCallback(() => {
    const L = t.form;
    return [
      `${L.title} — ORA`, `${L.date}: ${dateStr}`, `${L.time}: ${f.time}`, `${L.guests}: ${GUESTS[f.guests]}`,
      `${L.occasion}: ${L.occasions[f.occasion]}`, `${L.name}: ${f.name.trim()}`, `${L.phone}: ${f.phone.trim()}`,
    ].concat(f.email.trim() ? [`${L.email}: ${f.email.trim()}`] : [])
      .concat(f.notes.trim() ? [`${L.notes}: ${f.notes.trim()}`] : [])
      .join('\n');
  }, [t, dateStr, f]);

  const copyMessage = useCallback(async (msg?: string) => {
    try { await navigator.clipboard.writeText(msg ?? prepared.msg); setCopied(true); } catch { setCopied(false); }
  }, [prepared.msg]);

  const submit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!f.date || !f.time || !f.name.trim() || !f.phone.trim()) { setError('required'); return; }
    const digits = f.phone.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 15) { setError('phone'); return; }
    if (todayISO && f.date < todayISO) { setError('date'); return; }
    const msg = buildMessage();
    const url = `${SITE.telegram}?text=${encodeURIComponent(msg)}`;
    setPrepared({ msg, url });
    setError('');
    if (bookingMode === 'manual') {
      // No booking backend is configured: hand the prepared message to Telegram
      // and say plainly that the guest still has to press Send.
      try { window.open(url, '_blank', 'noopener'); } catch {}
      void copyMessage(msg);
      track('inquiry_prepared', lang, { channel: 'telegram', guests: GUESTS[f.guests], occasion: f.occasion });
      setStatus('manual');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang, date: f.date, time: f.time, guests: GUESTS[f.guests], occasion: t.form.occasions[f.occasion],
          name: f.name.trim(), phone: f.phone.trim(), email: f.email.trim(), notes: f.notes.trim(), website: f.website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) throw new Error('send_failed');
      track('inquiry_submitted', lang, { channel: 'bot', guests: GUESTS[f.guests], occasion: f.occasion });
      setStatus('sent');
    } catch {
      track('inquiry_failed', lang, { channel: 'bot' });
      setFailed(true);
      void copyMessage(msg);
      setStatus('manual');
    }
  }, [status, f, todayISO, buildMessage, bookingMode, copyMessage, lang, t]);

  const vals = useMemo(() => {
    const dark = overHero && !menuOpen;
    const cur = CURRENCY[lang];
    const setField = (k: FieldKey) => (e: { target: { value: string } }) => {
      const v = e.target.value;
      setF((s) => ({ ...s, [k]: v }));
      setError('');
    };
    const navKeys: Array<[keyof Dict['nav'], string]> = [['story', 'story'], ['kitchen', 'kitchen'], ['menu', 'menu'], ['events', 'events'], ['visit', 'visit']];
    const navLinks = navKeys.map(([k, id], i) => ({
      label: t.nav[k], num: String(i + 1).padStart(2, '0'), href: id === 'menu' ? `/${lang}/menu` : `/${lang}#${id}`,
      current: id === 'menu' && view === 'menu' ? ('page' as const) : undefined,
      // eslint-disable-next-line react-hooks/refs -- called from a click handler, never during render
      onClick: (e: MouseEvent) => { e.preventDefault(); goSection(id); },
    }));
    const langs = LOCALES.map((c) => ({
      code: c.toUpperCase(), lang: c, href: pathFor(c), pressed: c === lang, opacity: c === lang ? 1 : 0.55, line: c === lang ? 'currentColor' : 'transparent',
      onClick: (e: MouseEvent) => { e.preventDefault(); setLang(c); },
    }));
    const B = t.book;
    const botUrl = TELEGRAM_BOT ? (/^https?:/.test(TELEGRAM_BOT) ? TELEGRAM_BOT : `https://t.me/${TELEGRAM_BOT.replace(/^@/, '')}`) : '';
    const ways = [
      { tag: 'Telegram', name: '@Oratashkent', note: B.tg, href: SITE.telegram as string, soon: false },
      { tag: 'Telegram', name: TELEGRAM_BOT ? '@' + botUrl.split('/').pop() : B.botName, note: B.bot, href: botUrl, soon: !TELEGRAM_BOT },
      { tag: 'Yandex Eats', name: B.yandexName, note: B.yandex, href: SITE.yandexEats as string, soon: false },
      { tag: '2GIS', name: B.gisName, note: B.gis, href: SITE.twoGis as string, soon: false },
      { tag: 'Instagram', name: '@ora.tashkent', note: B.ig, href: SITE.instagram as string, soon: false },
      { tag: B.phoneTag, name: SITE.phones[0].display, note: B.phone, href: SITE.phones[0].href as string, soon: false },
      { tag: B.phoneTag, name: SITE.phones[1].display, note: B.phone2, href: SITE.phones[1].href as string, soon: false },
    ];
    const bookWays = ways.map((w) => ({
      ...w, live: !w.soon, op: w.soon ? 0.62 : 1, cursor: w.soon ? 'default' : 'pointer',
      target: w.href.startsWith('tel:') ? '_self' : '_blank',
      onClick: (e: MouseEvent) => {
        if (w.soon) { e.preventDefault(); return; }
        const h = w.href;
        track(h.startsWith('tel:') ? 'call_click' : /t\.me/.test(h) ? 'telegram_click' : /instagram/.test(h) ? 'social_click' : 'booking_link_click', lang, { channel: w.tag, href: h.split('?')[0] });
      },
    }));
    const bookChips = bookWays.filter((b, i, a) => b.live && !b.href.startsWith('tel:') && a.findIndex((x) => x.live && x.tag === b.tag) === i);
    const query = q.trim().toLowerCase();
    const menuCats = t.menu.cats.map((c, i) => ({
      name: c.name, id: `menu-${i}`, num: String(i + 1).padStart(2, '0'),
      film: VIDEOS.has(c.f) ? `media/${c.f}.mp4` : '',
      poster: `/media/posters/${c.f}.webp`,
      items: c.items
        .filter((it) => !query || `${it.n} ${it.d || ''}`.toLowerCase().includes(query))
        .map((it) => ({ ...it, img: `/media/dishes/${it.i}`, p: it.p ? `${it.p} ${cur}` : t.menu.askPrice })),
      onClick: () => {
        const el = document.getElementById(`menu-${i}`);
        if (el) engine.current?.smoothTo(el.getBoundingClientRect().top + window.scrollY - 136);
      },
    })).filter((c) => c.items.length);
    const pickAll = (list: string[]) => list.map((x) => pick(t, x, cur)).filter((x): x is NonNullable<typeof x> => !!x);
    const submitted = status === 'sent' || status === 'manual';
    const doneTitle = status === 'sent' ? t.rsv.sentTitle : t.form.doneTitle;
    const doneBody = (status === 'sent' ? t.rsv.sentBody : t.form.doneBody).replace('{name}', f.name.trim()).replace('{phone}', f.phone.trim());
    return {
      t, lang, view, bookingMode, navLinks, langs, menuOpen,
      navBg: dark ? 'rgba(16,19,14,.14)' : 'rgba(227,232,222,.72)',
      navLine: dark ? 'rgba(255,255,255,.14)' : 'rgba(25,29,22,.1)',
      navInk: dark ? '#F4F6F1' : '#191D16',
      quickSubmit: (e: FormEvent) => { e.preventDefault(); track('reservation_click', lang, { view: 'hero' }); opener.current = document.activeElement as HTMLElement; setReserveOpen(true); setMenuOpen(false); },
      guestDec: () => setF((s) => ({ ...s, guests: Math.max(0, s.guests - 1) })),
      guestInc: () => setF((s) => ({ ...s, guests: Math.min(6, s.guests + 1) })),
      guestLabel: GUESTS[f.guests],
      evKinds: (t.events.kinds || []).map((n, i) => ({ name: n, num: '0' + (i + 1), i })),
      evName0: t.events.kinds[0], evName1: t.events.kinds[1], evName2: t.events.kinds[2],
      seatsLabel: t.s01.facts[0]?.k || '',
      bookWays, bookChips,
      isHome: view === 'home', isMenu: view === 'menu',
      showStickyCta: view === 'home' && !overHero && !reserveOpen && !menuOpen,
      toggleMenu: () => setMenuOpen((o) => !o),
      goHome: (e?: MouseEvent) => { e?.preventDefault(); setMenuOpen(false); if (view === 'home') engine.current?.scrollToId('top'); else setView('home'); },
      goMenu: () => goSection('menu'),
      openReserve, trackLink,
      eventsHref: `${SITE.telegram}?text=${encodeURIComponent(t.events.msg)}`,
      tgHref: prepared.url,
      q, onSearch: (e: { target: { value: string } }) => { setQ(e.target.value); requestAnimationFrame(() => engine.current?.setup(false)); },
      closeReserve, stop: (e: MouseEvent) => e.stopPropagation(),
      heroMove: (e: PointerEvent<HTMLElement>) => { const r = e.currentTarget.getBoundingClientRect(); engine.current?.heroPointer(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2); },
      heroLeave: () => engine.current?.heroPointer(0, 0),
      reserveOpen, status, submitted, notSubmitted: !submitted, sending: status === 'sending', failed, copied,
      error, hasError: !!error,
      errorText: error === 'phone' ? t.rsv.invalidPhone : error === 'date' ? t.rsv.pastDate : t.form.required,
      dialogTitle: submitted ? doneTitle : t.form.title,
      formSub: bookingMode === 'bot' ? t.rsv.subAuto : t.form.sub,
      submitLabel: status === 'sending' ? t.rsv.sending : bookingMode === 'bot' ? t.rsv.submitAuto : t.form.submit,
      todayISO, f,
      on: { date: setField('date'), time: setField('time'), name: setField('name'), phone: setField('phone'), email: setField('email'), notes: setField('notes'), website: setField('website') },
      guestOpts: GUESTS.map((g, i) => ({ label: g, checked: f.guests === i, onChange: () => setF((s) => ({ ...s, guests: i })) })),
      occasionOpts: t.form.occasions.map((o, i) => ({ label: o, checked: f.occasion === i, onChange: () => setF((s) => ({ ...s, occasion: i })) })),
      submit, copyMessage: () => copyMessage(),
      doneBody,
      doneRows: [{ k: t.form.date, v: dateStr }, { k: t.form.time, v: f.time }, { k: t.form.guests, v: GUESTS[f.guests] }, { k: t.form.occasion, v: t.form.occasions[f.occasion] }],
      featured: pickAll(FEATURED), breakfastPicks: pickAll(BREAKFAST), drinkPicks: pickAll(DRINKS),
      stripPrev: () => { const el = document.getElementById('ora-strip'); el?.scrollBy({ left: -el.clientWidth * 0.8, behavior: 'smooth' }); },
      stripNext: () => { const el = document.getElementById('ora-strip'); el?.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' }); },
      menuCats, menuEmpty: menuCats.length === 0,
    };
  }, [t, lang, view, bookingMode, overHero, menuOpen, reserveOpen, status, failed, copied, error, f, q, todayISO, dateStr, prepared.url,
    goSection, pathFor, setLang, setView, openReserve, trackLink, closeReserve, submit, copyMessage]);

  return vals;
}

export type OraValues = ReturnType<typeof useOraValues>;
const Ctx = createContext<OraValues | null>(null);

export function OraProvider({ initialLang, bookingMode, children }: { initialLang: Lang; bookingMode: BookingMode; children: ReactNode }) {
  const vals = useOraValues(initialLang, bookingMode);
  return <Ctx.Provider value={vals}>{children}</Ctx.Provider>;
}

export function useOra(): OraValues {
  const v = useContext(Ctx);
  if (!v) throw new Error('useOra must be used inside <OraProvider>');
  return v;
}
