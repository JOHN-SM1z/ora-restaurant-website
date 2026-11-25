import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['en', 'ru', 'uz'];

/**
 * Sends "/" to a language: an explicit ?lang, then the visitor's saved choice,
 * then the browser's Accept-Language, then English. Also keeps the design
 * prototype's "?view=menu" links working.
 */
export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const q = url.searchParams.get('lang');
  const saved = req.cookies.get('ora-lang')?.value;
  let lang = q && LOCALES.includes(q) ? q : saved && LOCALES.includes(saved) ? saved : '';
  if (!lang) {
    const accept = (req.headers.get('accept-language') || '').toLowerCase();
    const prefs = accept.split(',').map((p) => p.trim().slice(0, 2));
    lang = prefs.find((p) => LOCALES.includes(p)) || 'en';
  }
  const dest = url.clone();
  dest.pathname = url.searchParams.get('view') === 'menu' ? `/${lang}/menu` : `/${lang}`;
  dest.searchParams.delete('lang');
  dest.searchParams.delete('view');
  const res = NextResponse.redirect(dest, 307);
  res.headers.set('Vary', 'Accept-Language, Cookie');
  return res;
}

export const config = { matcher: ['/'] };
