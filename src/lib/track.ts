/**
 * Analytics hook carried over from the design: pushes `ora_*` events to
 * window.dataLayer and, when present, gtag / Yandex Metrica. Nothing is sent
 * unless the restaurant adds one of those tags.
 */
type W = Window & {
  dataLayer?: unknown[];
  gtag?: (...a: unknown[]) => void;
  ym?: (...a: unknown[]) => void;
  ORA_YM_ID?: number;
};

export function track(name: string, lang: string, data: Record<string, unknown> = {}) {
  try {
    const w = window as W;
    (w.dataLayer = w.dataLayer || []).push({ event: 'ora_' + name, lang, ...data });
    if (typeof w.gtag === 'function') w.gtag('event', 'ora_' + name, data);
    if (typeof w.ym === 'function' && w.ORA_YM_ID) w.ym(w.ORA_YM_ID, 'reachGoal', 'ora_' + name);
  } catch {
    /* analytics must never break the page */
  }
}
