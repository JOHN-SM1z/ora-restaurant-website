'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { useOra } from '@/components/site/OraContext';

export default function MenuPage() {
  const { t, lang, goHome, q, onSearch, menuEmpty, menuCats } = useOra();
  return (
<main id="main" data-screen-label="Menu" style={{ paddingTop: "72px", background: "#E3E8DE" }}>
  <section style={{ padding: "clamp(24px,3.4vw,56px) 0 clamp(20px,2.4vw,36px)" }}>
    <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box" }}>
      <a href={`/${lang}`} onClick={goHome} style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "#191D16", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", minHeight: "44px" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", flexShrink: "0" }}><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg>{t.menu.back}</a>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px 48px", marginTop: "8px" }}>
        <h1 data-drift="1" style={{ margin: "0", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(84px,15vw,250px)", lineHeight: ".84", letterSpacing: "-.055em" }}><span style={{ display: "block", overflow: "hidden", paddingBottom: ".24em", marginBottom: "-.24em" }}><span data-hero-mask="1" style={{ display: "block" }}>{t.menu.title}</span></span></h1>
        <p data-hero-in="2" style={{ margin: "0", fontFamily: "var(--font-text)", fontStyle: "italic", fontSize: "clamp(20px,1.8vw,28px)", lineHeight: "1.3", maxWidth: "20ch", paddingBottom: "1.2vw", textWrap: "balance" }}>{t.menu.tag}</p>
      </div>
      <div data-hero-in="3" style={{ marginTop: "clamp(28px,3.4vw,52px)", display: "flex", alignItems: "center", gap: "14px", padding: "4px 24px", borderRadius: "999px", background: "rgba(255,255,255,.5)", backdropFilter: "blur(20px) saturate(170%)", WebkitBackdropFilter: "blur(20px) saturate(170%)", border: "1px solid rgba(255,255,255,.85)", boxShadow: "inset 0 1px 0 #fff,0 10px 30px rgba(25,29,22,.06)" }}>
        <label htmlFor="menu-q" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>{t.menu.searchPh}</label>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: "1.5", strokeLinecap: "round", flexShrink: "0", color: "#4B5345" }}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <input className="input" id="menu-q" type="search" aria-label={t.menu.searchPh} placeholder={t.menu.searchPh} value={q} onChange={onSearch} style={{ flex: "1", minWidth: "0", background: "none", border: "0", borderRadius: "0", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(20px,2vw,28px)", letterSpacing: "-.015em", color: "#191D16", padding: "10px 0", WebkitAppearance: "none", appearance: "none", outline: "none" }} />
      </div>
    </div>
  </section>
  <div style={{ position: "sticky", top: "72px", zIndex: "20", background: "rgba(227,232,222,.7)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)", borderBottom: "1px solid rgba(25,29,22,.08)" }}>
    <div data-cat-nav="1" style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box", display: "flex", gap: "6px", overflowX: "auto", scrollbarWidth: "none", paddingTop: "10px", paddingBottom: "10px" }}>
      {(menuCats).map((c, _i) => (<Fragment key={_i}>
        <button className="ac2" type="button" data-cat-btn={c.id} onClick={c.onClick} style={{ flexShrink: "0", border: "1px solid rgba(25,29,22,.14)", borderRadius: "999px", cursor: "pointer", background: "rgba(255,255,255,.35)", color: "#191D16", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "400", letterSpacing: ".01em", padding: "0 16px", minHeight: "40px", whiteSpace: "nowrap", transition: "background-color .4s ease,color .4s ease,border-color .4s ease" }}>{c.name}</button>
      </Fragment>))}
    </div>
  </div>
  <div style={{ paddingBottom: "clamp(72px,8vw,128px)" }}>
    {(menuEmpty) && (<><p style={{ maxWidth: "1600px", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box", paddingTop: "72px", paddingBottom: "72px", margin: "0", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-.02em" }}>{t.menu.noResults}</p></>)}
    {(menuCats).map((c, _i) => (<Fragment key={_i}>
      <section id={c.id} data-cat-sec="1" style={{ padding: "clamp(24px,3vw,44px) 0 clamp(48px,5vw,88px)" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box" }}>
          <figure data-tilt="1.5" data-cursor="" style={{ margin: "0", position: "relative", height: "clamp(240px,56vh,620px)", overflow: "hidden", borderRadius: "clamp(18px,2vw,30px)", background: "#2A2F25" }}>
            <div data-reveal-img="1" style={{ position: "absolute", inset: "0", overflow: "hidden", backgroundImage: `url(${c.poster})`, backgroundSize: "cover", backgroundPosition: "center" }}>{c.film ? <video data-src={c.film} poster={c.poster} preload="none" aria-hidden="true" muted playsInline data-parallax="0.06" style={{ position: "absolute", left: "0", top: "-8%", width: "100%", height: "116%", objectFit: "cover", display: "block" }}></video> : <img src={c.poster} alt="" loading="lazy" decoding="async" aria-hidden="true" data-parallax="0.06" style={{ position: "absolute", left: "0", top: "-8%", width: "100%", height: "116%", objectFit: "cover", display: "block" }} />}</div>
            <div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,rgba(16,19,14,0) 40%,rgba(16,19,14,.62) 100%)" }}></div>
            <figcaption style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "clamp(18px,3vw,44px)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px", color: "#F4F6F1" }}>
              <h2 style={{ margin: "0", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(40px,6.6vw,116px)", lineHeight: ".92", letterSpacing: "-.045em", textWrap: "balance" }}>{c.name}</h2>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 12px", borderRadius: "999px", background: "rgba(22,26,19,.28)", backdropFilter: "blur(16px) saturate(170%)", WebkitBackdropFilter: "blur(16px) saturate(170%)", border: "1px solid rgba(255,255,255,.28)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.3)", color: "#F4F6F1", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".02em", whiteSpace: "nowrap" }}>{c.num}</span>
            </figcaption>
          </figure>
          <ul style={{ listStyle: "none", margin: "clamp(24px,3vw,48px) 0 0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,264px),1fr))", gap: "clamp(32px,3.4vw,56px) clamp(16px,1.8vw,28px)" }}>
            {(c.items).map((it, _i) => (<Fragment key={_i}>
              <li data-reveal="1" style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                <figure data-tilt="5" data-cursor="" style={{ margin: "0", position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: "20px", background: "#D5DBCF" }}>
                  <Image quality={85} className="hv15" src={it.img} alt={it.n} fill sizes="(max-width: 600px) 92vw, (max-width: 1100px) 45vw, 24vw" style={{ objectFit: "cover", display: "block", transform: "scale(1.02)", transition: "transform 1.6s cubic-bezier(.22,.61,.36,1)" }} />
                  <span style={{ position: "absolute", left: "12px", bottom: "12px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 12px", borderRadius: "999px", background: "rgba(22,26,19,.28)", backdropFilter: "blur(16px) saturate(170%)", WebkitBackdropFilter: "blur(16px) saturate(170%)", border: "1px solid rgba(255,255,255,.28)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.3)", color: "#F4F6F1", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".02em", whiteSpace: "nowrap" }}>{it.d}</span>
                </figure>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "14px", paddingTop: "14px" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px,1.4vw,21px)", lineHeight: "1.22", letterSpacing: "-.01em", textWrap: "pretty", minWidth: "0" }}>{it.n}</span>
                  <span style={{ flexShrink: "0", fontFamily: "var(--font-display)", fontSize: "16px", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{it.p}</span>
                </div>
              </li>
            </Fragment>))}
          </ul>
        </div>
      </section>
    </Fragment>))}
    <p style={{ margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box", marginTop: "24px", fontFamily: "var(--font-text)", fontStyle: "italic", fontSize: "14px", lineHeight: "1.55", color: "#5A6253", maxWidth: "none" }}>{t.menu.notice}</p>
  </div>
</main>
  );
}
