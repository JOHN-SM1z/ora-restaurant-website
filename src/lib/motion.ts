/*
 * ORA motion engine — a direct port of the approved design export's
 * animation logic. It drives everything through data attributes so the
 * markup stays declarative:
 *   data-hero-in / data-hero-mask   entrance on load
 *   data-reveal / data-mask / data-reveal-img   reveal on scroll
 *   data-parallax, data-tilt, data-magnet, data-drift, data-cursor
 *   data-expand (kitchen), data-transition (day→evening), data-gal (gallery),
 *   data-ev (events deck), data-cat-sec / data-cat-btn (menu categories)
 *   video[data-src] lazy, pointer-paced playback; video[data-hero] crossfade loop.
 */

type HostState = { view: 'home' | 'menu'; reserveOpen: boolean; menuOpen: boolean };

type Vid = HTMLVideoElement & { _t?: number | null; _primed?: boolean; _pp?: boolean; _dip?: boolean };
type Mov = HTMLElement & {
  _mx?: number; _my?: number; _mz?: boolean; _rx?: number; _ry?: number; _tz?: boolean;
  _h?: number; _act?: number; __rvTarget?: HTMLElement;
};

const EASE = 'cubic-bezier(.22,.61,.36,1)';
const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ss = (x: number) => x * x * (3 - 2 * x);

/** Resolve a design media path ("media/hero.mp4") to a served file, choosing a lighter rendition on small screens. */
export function resolveVideo(dataSrc: string, full: boolean): string {
  const name = dataSrc.replace(/^media\//, '').replace(/\.mp4$/, '');
  const px = window.innerWidth * Math.min(2, window.devicePixelRatio || 1);
  const big = full ? px > 1500 : px > 2200;
  return `/media/video/${name}${big ? '' : '-720'}.mp4`;
}

export class OraMotion {
  private get: () => HostState;
  private onOverHero: (v: boolean) => void;
  private overHero = true;
  reduced = false;
  private slow = false;
  private fine = false;
  private smoothOn = false;
  private smoothing = false;
  private tween: { from: number; to: number; start: number; dur: number } | null = null;
  private sy = 0;
  private ty = 0;
  private energy = 1.2;
  private prate = 0;
  private lmx: number | null = null;
  private lmy: number | null = null;
  private mx = -9999; private my = -9999; private cx = -9999; private cy = -9999; private cs = 1;
  private ptrType = '';
  private hoverKind = '';
  private hx = 0; private hy = 0; private px = 0; private py = 0; private dx = 0; private dy = 0;
  private trP = 0;
  private last = 0;
  private rafId = 0;
  private pointerMode = false;
  private heroVis = false;
  private heroA: Vid | null = null;
  private heroB: Vid | null = null;
  private heroCur: Vid | null = null;
  private heroX = false;
  private pvis = new Set<Vid>();
  private softEls: Vid[] = [];
  private scrubEls: Vid[] = [];
  private parallaxEls: HTMLElement[] = [];
  private tiltEls: Mov[] = [];
  private magEls: Mov[] = [];
  private driftEls: HTMLElement[] = [];
  private trEl: HTMLElement | null = null;
  private exEl: HTMLElement | null = null;
  private galEl: Mov | null = null;
  private evEl: Mov | null = null;
  private heroCopy: HTMLElement | null = null;
  private heroLayer: HTMLElement | null = null;
  private ring: HTMLElement | null = null;
  private catSecs: HTMLElement[] = [];
  private catBtns: HTMLElement[] = [];
  private catIdx: string | null = null;
  private loadIO: IntersectionObserver | null = null;
  private playIO: IntersectionObserver | null = null;
  private revealIO: IntersectionObserver | null = null;
  private mq: MediaQueryList;
  private cleanup: Array<() => void> = [];

  constructor(get: () => HostState, onOverHero: (v: boolean) => void) {
    this.get = get;
    this.onOverHero = onOverHero;
    this.mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    this.slow = !!(c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || '')));
    this.reduced = this.mq.matches;
    this.fine = window.matchMedia('(pointer: fine)').matches;
    this.smoothOn = this.fine && !this.reduced;
    this.sy = this.ty = window.scrollY;

    const on = <K extends keyof WindowEventMap>(t: K, fn: (e: WindowEventMap[K]) => void, o?: AddEventListenerOptions) => {
      window.addEventListener(t, fn as EventListener, o);
      this.cleanup.push(() => window.removeEventListener(t, fn as EventListener, o));
    };
    on('scroll', () => { if (!this.smoothing && !this.tween) this.sy = this.ty = window.scrollY; }, { passive: true });
    on('wheel', (e) => {
      const s = this.get();
      if (!this.smoothOn || e.ctrlKey || s.reserveOpen || s.menuOpen) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      this.tween = null;
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 16; else if (e.deltaMode === 2) d *= window.innerHeight;
      if (!this.smoothing) this.sy = this.ty = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      this.ty = Math.max(0, Math.min(max, this.ty + d));
      this.smoothing = true;
    }, { passive: false });
    on('pointerdown', () => this.cancelSmooth());
    on('keydown', (e) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Tab'].includes(e.key)) this.cancelSmooth();
    });
    on('pointermove', (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      const lx = this.lmx, ly = this.lmy;
      this.lmx = e.clientX; this.lmy = e.clientY;
      if (lx == null || ly == null) return;
      this.energy = Math.min(1.4, this.energy + Math.hypot(e.clientX - lx, e.clientY - ly) / 250);
    }, { passive: true });
    on('wheel', (e) => { this.energy = Math.min(1.4, this.energy + Math.min(120, Math.abs(e.deltaY || 0)) / 500); }, { passive: true });
    const onPtr = (e: PointerEvent) => { this.mx = e.clientX; this.my = e.clientY; this.ptrType = e.pointerType; };
    const onPtrUp = (e: PointerEvent) => { if (e.pointerType !== 'mouse') this.mx = this.my = -9999; };
    on('pointermove', onPtr, { passive: true });
    on('pointerdown', onPtr, { passive: true });
    on('pointerup', onPtrUp, { passive: true });
    on('pointercancel', onPtrUp, { passive: true });
    const onOver = (e: Event) => {
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      this.hoverKind = t.closest('a,button,input,label,select,textarea') ? 'link' : t.closest('[data-cursor]') ? 'media' : '';
    };
    document.addEventListener('pointerover', onOver, { passive: true });
    this.cleanup.push(() => document.removeEventListener('pointerover', onOver));
    const onLeave = () => { if (this.ptrType === 'mouse') this.mx = this.my = -9999; };
    document.documentElement.addEventListener('pointerleave', onLeave);
    this.cleanup.push(() => document.documentElement.removeEventListener('pointerleave', onLeave));
    const onMq = () => { this.reduced = this.mq.matches; this.smoothOn = this.fine && !this.reduced; this.setup(false); };
    this.mq.addEventListener('change', onMq);
    this.cleanup.push(() => this.mq.removeEventListener('change', onMq));

    this.last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, Math.max(1, now - this.last));
      this.last = now;
      this.step(dt);
      this.frame(dt);
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    this.cleanup.forEach((f) => f());
    [this.loadIO, this.playIO, this.revealIO].forEach((o) => o && o.disconnect());
  }

  cancelSmooth() {
    if (!this.smoothing && !this.tween) return;
    this.smoothing = false; this.tween = null; this.sy = this.ty = window.scrollY;
  }

  /** Hero parallax input (pointer position over the hero, -1..1). */
  heroPointer(x: number, y: number) { this.hx = x; this.hy = y; }

  setup(entrance: boolean) {
    const reduced = this.reduced, slow = this.slow;
    this.pointerMode = this.fine && !reduced && !slow;
    if (!this.playIO) {
      this.loadIO = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const v = e.target as Vid;
        if (!v.getAttribute('src')) this.setSrc(v);
        this.loadIO!.unobserve(v);
      }), { rootMargin: '600px 0px' });
      this.playIO = new IntersectionObserver((es) => es.forEach((e) => {
        let v = e.target as Vid;
        if (v === this.heroA && this.heroCur) v = this.heroCur;
        if (this.pointerMode) {
          if (v.dataset.hero) { this.heroVis = e.isIntersecting; if (!e.isIntersecting) v.pause(); return; }
          if (e.isIntersecting) { if (!v.getAttribute('src')) this.setSrc(v); this.pvis.add(v); } else { this.pvis.delete(v); v.pause(); }
          return;
        }
        if (e.isIntersecting) { if (!v.getAttribute('src')) this.setSrc(v); const p = v.play(); if (p) p.catch(() => {}); }
        else v.pause();
      }), { threshold: 0.01 });
      this.revealIO = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const target = (e.target as Mov).__rvTarget || (e.target as HTMLElement);
        this.show(target);
        this.revealIO!.unobserve(e.target);
      }), { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    }
    this.softEls = Array.from(document.querySelectorAll<Vid>('video[data-src]')).filter((v) => !v.dataset.hero);
    document.querySelectorAll<Vid>('video[data-src]').forEach((v) => {
      if (v.dataset.ready) return;
      v.dataset.ready = '1';
      v.muted = true; v.defaultMuted = true; v.playsInline = true;
      v.setAttribute('playsinline', ''); v.setAttribute('muted', '');
      v.loop = true;
      if (reduced || slow) return; // stills only
      if (v.dataset.hero) {
        v.loop = false; this.setSrc(v); v.preload = 'auto';
        if (v.dataset.hero === 'a') {
          this.heroA = v; this.heroCur = null; this.heroX = false;
          this.heroB = document.querySelector<Vid>('video[data-hero="b"]');
          if (this.heroB) this.heroB.loop = false;
          this.playIO!.observe(v);
        }
        v.addEventListener('ended', () => this.heroSwap(true));
        return;
      }
      v.loop = false; v.dataset.soft = '1'; v.style.transition = 'opacity .9s ease';
      v.addEventListener('ended', () => { v.currentTime = 0; const p = v.play(); if (p) p.catch(() => {}); v.style.opacity = '1'; v._dip = false; });
      this.loadIO!.observe(v); this.playIO!.observe(v);
    });
    const qa = <T extends HTMLElement = HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T>(sel));
    this.scrubEls = qa<Vid>('video[data-scrub]');
    this.trEl = document.querySelector('[data-transition]');
    this.parallaxEls = reduced ? [] : qa('[data-parallax]');
    this.tiltEls = qa<Mov>('[data-tilt]'); this.magEls = qa<Mov>('[data-magnet]'); this.driftEls = qa('[data-drift]');
    this.exEl = document.querySelector('[data-expand]');
    this.galEl = document.querySelector('[data-gal]');
    this.evEl = document.querySelector('[data-ev]');
    this.catSecs = qa('[data-cat-sec]'); this.catBtns = qa('[data-cat-btn]'); this.catIdx = null;
    this.heroCopy = document.querySelector('[data-hero-copy]');
    this.heroLayer = document.querySelector('[data-hero-layer]');
    this.ring = document.querySelector('[data-cursor-ring]');
    if (this.ring) this.ring.style.display = this.fine && !reduced ? 'block' : 'none';
    if (reduced) [...this.tiltEls, ...this.magEls, ...this.driftEls].forEach((el) => { el.style.transform = ''; });
    const vh = window.innerHeight;
    document.querySelectorAll<HTMLElement>('[data-hero-in],[data-hero-mask]').forEach((el) => {
      if (el.dataset.rv) return;
      el.dataset.rv = '1';
      if (reduced || !entrance) { el.style.transform = 'none'; el.style.opacity = '1'; return; }
      const mask = el.dataset.heroMask;
      const i = parseInt(mask || el.dataset.heroIn || '0', 10) || 0;
      el.style.transition = 'none';
      if (mask) el.style.transform = 'translateY(calc(100% + .32em))';
      else { el.style.opacity = '0'; el.style.transform = 'translateY(16px)'; }
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.transition = `transform 1.6s ${EASE} ${200 + i * 140}ms, opacity 1.6s ${EASE} ${200 + i * 140}ms`;
        el.style.transform = 'none'; el.style.opacity = '1';
      }));
    });
    document.querySelectorAll<Mov>('[data-reveal],[data-mask],[data-reveal-img]').forEach((el) => {
      if (el.dataset.rv) return;
      el.dataset.rv = '1';
      if (reduced || el.getBoundingClientRect().top < vh * 0.92) return;
      el.style.transition = 'none';
      if (el.dataset.mask) el.style.transform = 'translateY(calc(100% + .32em))';
      else if (el.dataset.revealImg) { el.style.clipPath = 'inset(0 0 100% 0)'; el.style.transform = 'scale(1.04)'; }
      else { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; }
      const anchor = (el.dataset.mask || el.dataset.revealImg ? el.parentElement : el) as Mov;
      anchor.__rvTarget = el;
      this.revealIO!.observe(anchor);
    });
    document.documentElement.dataset.motion = 'ready';
  }

  private setSrc(v: Vid) {
    const ds = v.dataset.src;
    if (ds) v.src = resolveVideo(ds, !!v.dataset.full || !!v.dataset.hero);
  }

  private show(el: HTMLElement) {
    if (el.dataset.revealImg) el.style.transition = `clip-path 1.6s ${EASE}, transform 2.2s ${EASE}`;
    else el.style.transition = `transform 1.4s ${EASE}, opacity 1.4s ${EASE}`;
    el.style.clipPath = 'inset(0 0 0 0)'; el.style.transform = 'none'; el.style.opacity = '1';
  }

  private step(dt: number) {
    if (this.tween) {
      const tw = this.tween, t = Math.min(1, (performance.now() - tw.start) / tw.dur);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const y = tw.from + (tw.to - tw.from) * e;
      window.scrollTo(0, y); this.sy = this.ty = y;
      if (t >= 1) this.tween = null;
      return;
    }
    if (!this.smoothing) return;
    const k = 1 - Math.pow(1 - 0.085, dt / 16.67);
    this.sy += (this.ty - this.sy) * k;
    if (Math.abs(this.ty - this.sy) < 0.5) { this.sy = this.ty; this.smoothing = false; }
    window.scrollTo(0, this.sy);
  }

  private heroSwap(force: boolean) {
    if (this.heroX && !force) return;
    const a = this.heroCur || this.heroA, b = a === this.heroA ? this.heroB : this.heroA;
    if (!a || !b) { if (a) { a.currentTime = 0; a.play().catch(() => {}); } return; }
    if (!b.getAttribute('src')) this.setSrc(b);
    this.heroX = true;
    b.currentTime = 0; b.style.zIndex = '2'; a.style.zIndex = '1';
    const go = () => {
      b.style.transition = 'opacity 1.2s ease'; b.style.opacity = '1';
      setTimeout(() => { a.pause(); a.style.transition = 'none'; a.style.opacity = '0'; a.currentTime = 0; this.heroCur = b; this.heroX = false; }, 1250);
    };
    const p = b.play();
    if (p) p.then(go).catch(() => { this.heroX = false; a.currentTime = 0; a.play().catch(() => {}); }); else go();
  }

  smoothTo(top: number, instant?: boolean) {
    top = Math.max(0, top);
    if (this.smoothOn && !instant) {
      const from = window.scrollY;
      this.smoothing = false;
      this.tween = { from, to: top, start: performance.now(), dur: Math.min(1800, Math.max(700, Math.abs(top - from) * 0.35)) };
    } else window.scrollTo({ top, behavior: instant || this.reduced ? 'auto' : 'smooth' });
  }

  scrollToId(id: string, instant?: boolean) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - (id === 'top' ? 0 : 72);
    this.smoothTo(top, instant);
  }

  private frame(dt = 16.67) {
    const y = window.scrollY, vh = window.innerHeight;
    const overHero = this.get().view === 'home' && y < vh - 80;
    if (overHero !== this.overHero) { this.overHero = overHero; this.onOverHero(overHero); }
    for (const el of this.parallaxEls) {
      if (!el.isConnected || !el.parentElement) continue;
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      const f = parseFloat(el.dataset.parallax || '') || 0.05, lim = r.height * 0.075;
      const d = Math.max(-lim, Math.min(lim, (r.top + r.height / 2 - vh / 2) * -f));
      el.style.transform = `translate3d(0,${d.toFixed(1)}px,0)`;
    }
    const tr = this.trEl && this.trEl.isConnected ? this.trEl : null;
    this.trP = 0;
    if (tr) {
      const r = tr.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
      this.trP = p;
      const e = ss(Math.min(1, Math.max(0, (p - 0.25) / 0.5)));
      const q = (sel: string) => tr.querySelector<HTMLElement>(sel);
      const ev = q('[data-tr-evening]'), w1 = q('[data-tr-w1]'), w2 = q('[data-tr-w2]'), bar = q('[data-tr-bar]'), day = q('[data-tr-day]');
      if (ev) ev.style.opacity = e.toFixed(3);
      if (w1) { w1.style.opacity = (1 - e).toFixed(3); w1.style.transform = `translateY(${(-e * 24).toFixed(1)}px)`; }
      if (w2) { w2.style.opacity = e.toFixed(3); w2.style.transform = `translateY(${((1 - e) * 24).toFixed(1)}px)`; }
      if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
      if (day && !this.reduced) day.style.transform = `scale(${(1.06 - p * 0.06).toFixed(4)})`;
    }
    const layer = this.heroLayer && this.heroLayer.isConnected ? this.heroLayer : null;
    if (layer && !this.reduced) {
      const kp = 1 - Math.pow(1 - 0.05, dt / 16.67);
      this.px += ((this.fine ? this.hx : 0) - this.px) * kp;
      this.py += ((this.fine ? this.hy : 0) - this.py) * kp;
      const hy = Math.min(y, vh), sp = hy / vh;
      layer.style.transform = `translate3d(${(-this.px * 18).toFixed(2)}px,${(-this.py * 12 + hy * 0.22).toFixed(2)}px,0) scale(${(1.02 + sp * 0.05).toFixed(4)})`;
    }
    if (this.pointerMode) {
      this.energy = this.energy * Math.pow(0.965, dt / 16.67);
      const kr = 1 - Math.pow(1 - 0.07, dt / 16.67);
      this.prate += (Math.min(1, this.energy) - this.prate) * kr;
      const list = Array.from(this.pvis);
      if (this.heroVis) {
        const h1 = this.heroCur || this.heroA;
        if (h1) list.push(h1);
        if (this.heroX) { const h2 = h1 === this.heroA ? this.heroB : this.heroA; if (h2) list.push(h2); }
      }
      for (const v of list) {
        if (!v.isConnected || !v.getAttribute('src')) continue;
        const pr = 0.55 + 0.45 * Math.min(1, this.prate);
        if (Math.abs(v.playbackRate - pr) > 0.03) v.playbackRate = pr;
        if (v.paused && !v._pp && !(v.dataset.hero && v !== (this.heroCur || this.heroA) && !this.heroX)) {
          v._pp = true;
          const p = v.play();
          if (p) p.then(() => { v._pp = false; }).catch(() => { v._pp = false; }); else v._pp = false;
        }
      }
    }
    this.fx(dt, y, vh);
    const ha = this.heroCur || this.heroA;
    if (ha && ha.isConnected && ha.duration && !ha.paused && !this.heroX && ha.duration - ha.currentTime < 1.3) this.heroSwap(false);
    for (const v of this.softEls) {
      if (v.dataset.soft && !v.paused && v.duration && !v._dip && v.duration - v.currentTime < 0.9) { v._dip = true; v.style.opacity = '0'; }
    }
    const k2 = 1 - Math.pow(1 - 0.18, dt / 16.67);
    for (const v of this.scrubEls) {
      if (!v.isConnected || !v.duration || v.readyState < 1 || !v.parentElement) continue;
      const box = v.parentElement.getBoundingClientRect();
      if (box.bottom < -50 || box.top > vh + 50) continue;
      const p = tr && tr.contains(v) ? this.trP : Math.min(1, Math.max(0, (vh - box.top) / (vh + box.height)));
      const target = p * Math.max(0, v.duration - 0.06);
      if (v._t == null) v._t = target;
      v._t += (target - v._t) * k2;
      if (!v.seeking && Math.abs(v.currentTime - v._t) > 0.012) v.currentTime = v._t;
    }
  }

  private fx(dt: number, y: number, vh: number) {
    const R = this.reduced, vw = window.innerWidth;
    const k = 1 - Math.pow(1 - 0.12, dt / 16.67), kf = 1 - Math.pow(1 - 0.24, dt / 16.67);
    const mx = this.mx, my = this.my, live = mx > -9000;
    // Elements hidden by a breakpoint report an empty rect; skip them.
    const vis = (r: DOMRect) => r.height > 0 && r.bottom > -40 && r.top < vh + 40;
    const ring = this.ring;
    if (ring && ring.style.display !== 'none') {
      if (!live) ring.style.opacity = '0';
      else {
        if (this.cx < -9000) { this.cx = mx; this.cy = my; }
        this.cx += (mx - this.cx) * kf; this.cy += (my - this.cy) * kf;
        const ts = this.hoverKind === 'media' ? 2.4 : this.hoverKind === 'link' ? 0.45 : 1;
        this.cs += (ts - this.cs) * k;
        ring.style.opacity = '1';
        ring.style.transform = `translate3d(${this.cx.toFixed(1)}px,${this.cy.toFixed(1)}px,0) scale(${this.cs.toFixed(3)})`;
        ring.style.background = this.hoverKind === 'link' ? 'rgba(255,255,255,.9)' : 'transparent';
      }
    }
    if (!R) {
      for (const el of this.magEls) {
        if (!el.isConnected) continue;
        const r = el.getBoundingClientRect();
        if (!vis(r)) continue;
        const ox = el._mx || 0, oy = el._my || 0;
        let tx = 0, ty = 0;
        if (live && this.fine) {
          const ddx = mx - (r.left + r.width / 2 - ox), ddy = my - (r.top + r.height / 2 - oy);
          const lim = Math.max(r.width, r.height) * 0.5 + 36;
          if (Math.abs(ddx) < lim + 20 && Math.abs(ddy) < r.height / 2 + 30) { tx = ddx * 0.22; ty = ddy * 0.3; }
        }
        const nx = ox + (tx - ox) * k, ny = oy + (ty - oy) * k;
        if (Math.abs(nx - ox) > 0.02 || Math.abs(ny - oy) > 0.02 || el._mz) {
          el._mx = nx; el._my = ny; el._mz = Math.abs(nx) + Math.abs(ny) > 0.05;
          el.style.transform = el._mz ? `translate3d(${nx.toFixed(2)}px,${ny.toFixed(2)}px,0)` : '';
        }
      }
      for (const el of this.tiltEls) {
        if (!el.isConnected) continue;
        const r = el.getBoundingClientRect();
        if (!vis(r)) continue;
        const amp = parseFloat(el.dataset.tilt || '') || 3;
        let tx = 0, ty = 0;
        if (live && mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom) {
          const nx = (mx - r.left) / r.width - 0.5, ny = (my - r.top) / r.height - 0.5;
          tx = -ny * amp * 2; ty = nx * amp * 2;
        }
        const ox = el._rx || 0, oy = el._ry || 0, nx = ox + (tx - ox) * k, ny = oy + (ty - oy) * k;
        if (Math.abs(nx - ox) > 0.005 || Math.abs(ny - oy) > 0.005 || el._tz) {
          el._rx = nx; el._ry = ny; el._tz = Math.abs(nx) + Math.abs(ny) > 0.01;
          el.style.transform = el._tz ? `perspective(1200px) rotateX(${nx.toFixed(3)}deg) rotateY(${ny.toFixed(3)}deg)` : '';
        }
      }
      const dX = live && this.fine ? mx / vw - 0.5 : 0, dY = live && this.fine ? my / vh - 0.5 : 0;
      this.dx += (dX - this.dx) * k * 0.6; this.dy += (dY - this.dy) * k * 0.6;
      for (const el of this.driftEls) {
        if (!el.isConnected) continue;
        el.style.transform = `translate3d(${(-this.dx * 16).toFixed(2)}px,${(-this.dy * 10).toFixed(2)}px,0)`;
      }
      if (this.heroCopy && this.heroCopy.isConnected) {
        const p = cl(y / vh);
        this.heroCopy.style.opacity = (1 - cl((p - 0.12) * 1.8)).toFixed(3);
        this.heroCopy.style.transform = `translate3d(0,${(-p * vh * 0.16).toFixed(1)}px,0)`;
      }
    }
    const ex = this.exEl && this.exEl.isConnected ? this.exEl : null;
    if (ex) {
      const r = ex.getBoundingClientRect();
      if (vis(r)) {
        const p = R ? 1 : cl(-r.top / Math.max(1, r.height - vh)), e = ss(cl(p / 0.55)), mob = vw < 900;
        const ti = (1 - e) * (mob ? 14 : 16), si = (1 - e) * (mob ? 6 : 22), rad = (1 - e) * 28;
        const q = (sel: string) => ex.querySelector<Mov>(sel);
        const m = q('[data-ex-media]');
        if (m) m.style.clipPath = `inset(${ti.toFixed(2)}% ${si.toFixed(2)}% ${ti.toFixed(2)}% ${si.toFixed(2)}% round ${rad.toFixed(1)}px)`;
        const v = q('[data-ex-vid]');
        if (v) v.style.transform = `scale(${(1.25 - e * 0.25).toFixed(4)})`;
        const sh = q('[data-ex-shade]');
        if (sh) sh.style.opacity = cl((p - 0.3) / 0.3).toFixed(3);
        const tx = q('[data-ex-text]');
        if (tx) { const o = ss(cl((p - 0.42) / 0.28)); tx.style.opacity = o.toFixed(3); tx.style.transform = `translate3d(0,${((1 - o) * 40).toFixed(1)}px,0)`; }
        const cd = q('[data-ex-card]');
        if (cd) { const o = ss(cl((p - 0.58) / 0.25)); cd.style.opacity = o.toFixed(3); if (!cd._tz) cd.style.transform = `translate3d(0,${((1 - o) * 60).toFixed(1)}px,0)`; }
      }
    }
    const g = this.galEl && this.galEl.isConnected ? this.galEl : null;
    if (g && g.offsetParent !== null) {
      const track = g.querySelector<HTMLElement>('[data-gal-track]');
      if (track) {
        const dist = Math.max(0, track.scrollWidth - vw), want = Math.round(dist + vh);
        if (g._h !== want) { g._h = want; g.style.height = want + 'px'; }
        const r = g.getBoundingClientRect();
        if (vis(r)) {
          const p = cl(-r.top / Math.max(1, dist));
          track.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`;
          const bar = g.querySelector<HTMLElement>('[data-gal-bar]');
          if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
          const items = g.querySelectorAll<HTMLElement>('[data-gal-item]');
          let best = 0, bd = 1e9;
          items.forEach((it, i) => {
            const ir = it.getBoundingClientRect(), c = (ir.left + ir.width / 2 - vw / 2) / vw;
            if (Math.abs(c) < bd) { bd = Math.abs(c); best = i; }
            if (R) return;
            const v = it.querySelector<HTMLElement>('[data-gal-vid]');
            if (v) v.style.transform = `translate3d(${(c * -7).toFixed(2)}%,0,0)`;
            it.style.scale = (1 - Math.min(0.08, Math.abs(c) * 0.09)).toFixed(4);
          });
          const cnt = g.querySelector('[data-gal-count]');
          const txt = String(best + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');
          if (cnt && cnt.textContent !== txt) cnt.textContent = txt;
        }
      }
    }
    const ev = this.evEl && this.evEl.isConnected ? this.evEl : null;
    if (ev) {
      const r = ev.getBoundingClientRect();
      if (vis(r)) {
        const p = cl(-r.top / Math.max(1, r.height - vh)), f = cl(p * 1.2) * 2;
        const bg = ev.querySelector<HTMLElement>('[data-ev-bg]');
        if (bg && !R) bg.style.transform = `scale(${(1.12 - p * 0.12).toFixed(4)})`;
        const base = [0, 3.5, -3];
        ev.querySelectorAll<HTMLElement>('[data-ev-card]').forEach((c) => {
          const i = +(c.dataset.evCard || 0), out = i < 2 ? cl(f - i) : 0, depth = Math.max(0, i - f), d1 = Math.min(1, depth);
          const oe = out * out * (3 - 2 * out);
          if (R) { c.style.opacity = out > 0.5 ? '0' : '1'; return; }
          c.style.transform = `translateX(-50%) translate3d(${(-oe * vw * 0.42).toFixed(1)}px,${(-oe * vh * 0.18 - d1 * 18).toFixed(1)}px,0) rotate(${(base[i] * d1 - oe * 16).toFixed(2)}deg) scale(${(1 - depth * 0.05 - oe * 0.06).toFixed(4)})`;
          c.style.opacity = (1 - cl((oe - 0.55) / 0.45)).toFixed(3);
          const v = c.querySelector<HTMLElement>('video,img');
          if (v) v.style.transform = `scale(${(1.04 + d1 * 0.1).toFixed(4)})`;
        });
        const act = Math.min(2, Math.round(f));
        if (ev._act !== act) {
          ev._act = act;
          ev.querySelectorAll<HTMLElement>('[data-ev-kind]').forEach((li) => {
            const on = +(li.dataset.evKind || 0) === act;
            li.style.opacity = on ? '1' : '.42';
            li.style.transform = on ? 'translateX(10px)' : 'none';
          });
        }
      }
    }
    if (this.catSecs.length && this.get().view === 'menu') {
      let idx: string | null = null;
      for (const sec of this.catSecs) { if (!sec.isConnected) continue; if (sec.getBoundingClientRect().top < 170) idx = sec.id; }
      if (idx == null && this.catSecs[0]) idx = this.catSecs[0].id;
      if (idx !== this.catIdx) {
        this.catIdx = idx;
        this.catBtns.forEach((b) => {
          const on = b.dataset.catBtn === idx;
          b.style.background = on ? '#191D16' : 'rgba(255,255,255,.35)';
          b.style.color = on ? '#F4F6F1' : '#191D16';
          b.style.borderColor = on ? '#191D16' : 'rgba(25,29,22,.14)';
          if (on) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
          if (on && b.parentElement) {
            const pr = b.parentElement;
            pr.scrollTo({ left: Math.max(0, b.offsetLeft - pr.clientWidth / 2 + b.offsetWidth / 2), behavior: this.reduced ? 'auto' : 'smooth' });
          }
        });
      }
    }
  }
}
