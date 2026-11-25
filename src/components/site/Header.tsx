'use client';

import { Fragment } from 'react';
import { useOra } from '@/components/site/OraContext';

export default function Header() {
  const { t, lang, showStickyCta, navLinks, langs, menuOpen, navBg, navLine, navInk, toggleMenu, goHome, openReserve } = useOra();
  return (
<header style={{ position: "fixed", top: "0", left: "0", right: "0", zIndex: "50", background: `${navBg}`, backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)", borderBottom: `1px solid ${navLine}`, color: `${navInk}`, transition: "background-color .6s ease,color .6s ease,border-color .6s ease" }}>
  <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box", height: "72px", display: "flex", alignItems: "center", gap: "clamp(16px,2.6vw,40px)" }}>
    <a href={`/${lang}`} onClick={goHome} aria-label="ORA" data-magnet="1" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", marginRight: "auto", minHeight: "44px" }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "21px", fontWeight: "500", letterSpacing: ".36em", lineHeight: "1", marginRight: "-.36em" }}>ORA</span>
    </a>
    <div className="v-dsk">
      <nav aria-label={t.a11y.mainNav} style={{ display: "flex", gap: "clamp(18px,2.2vw,36px)" }}>
        {(navLinks).map((l, _i) => (<Fragment key={_i}>
          <a className="hv0" href={l.href} onClick={l.onClick} aria-current={l.current} data-magnet="1" style={{ color: "inherit", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: "400", letterSpacing: ".01em", padding: "8px 0", backgroundImage: "linear-gradient(currentColor,currentColor)", backgroundSize: "0% 1px", backgroundPosition: "0 100%", backgroundRepeat: "no-repeat", transition: "background-size .45s cubic-bezier(.22,.61,.36,1)" }}>{l.label}</a>
        </Fragment>))}
      </nav>
      <div role="group" aria-label={t.a11y.language} style={{ display: "flex", gap: "2px" }}>
        {(langs).map((l, _i) => (<Fragment key={_i}>
          <button type="button" onClick={l.onClick} aria-pressed={l.pressed} lang={l.lang} style={{ background: "none", border: "0", cursor: "pointer", color: "inherit", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".06em", padding: "10px 7px", minHeight: "40px", opacity: `${l.opacity}`, textDecoration: "underline", textDecorationColor: `${l.line}`, textDecorationThickness: "1px", textUnderlineOffset: "7px" }}>{l.code}</button>
        </Fragment>))}
      </div>
      <button className="hv1" type="button" onClick={openReserve} data-magnet="1" style={{ display: "inline-flex", padding: "5px", borderRadius: "999px", cursor: "pointer", textDecoration: "none", boxSizing: "border-box", background: "rgba(255,255,255,.3)", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)", border: "1px solid rgba(255,255,255,.75)", boxShadow: "inset 0 1px 1px rgba(255,255,255,.85),inset 0 -1px 1px rgba(255,255,255,.14),0 10px 30px rgba(16,19,14,.16)", transition: "box-shadow .45s ease" }}><span className="ac2" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "36px", padding: "0 16px", borderRadius: "999px", background: "linear-gradient(180deg,#2A3124,#191D16)", color: "#F4F6F1", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".02em", whiteSpace: "nowrap", boxShadow: "inset 0 1px 0 rgba(255,255,255,.2)", transition: "transform .25s ease" }}>{t.nav.reserve}</span></button>
    </div>
    <div className="v-mob">
      <button className="hv1" type="button" onClick={openReserve} aria-hidden={showStickyCta || undefined} tabIndex={showStickyCta ? -1 : undefined} data-magnet="1" style={{ display: "inline-flex", padding: "5px", borderRadius: "999px", cursor: "pointer", textDecoration: "none", boxSizing: "border-box", background: "rgba(255,255,255,.3)", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)", border: "1px solid rgba(255,255,255,.75)", boxShadow: "inset 0 1px 1px rgba(255,255,255,.85),inset 0 -1px 1px rgba(255,255,255,.14),0 10px 30px rgba(16,19,14,.16)", opacity: showStickyCta ? 0 : 1, visibility: showStickyCta ? "hidden" : "visible", transition: "box-shadow .45s ease, opacity .35s ease, visibility .35s" }}><span className="ac2" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "36px", padding: "0 16px", borderRadius: "999px", background: "linear-gradient(180deg,#2A3124,#191D16)", color: "#F4F6F1", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".02em", whiteSpace: "nowrap", boxShadow: "inset 0 1px 0 rgba(255,255,255,.2)", transition: "transform .25s ease" }}>{t.nav.reserve}</span></button>
      <button type="button" onClick={toggleMenu} aria-label={t.a11y.menu} aria-expanded={menuOpen} aria-controls="ora-mobile-menu" style={{ background: "none", border: "0", color: "inherit", width: "44px", height: "44px", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", gap: "7px", cursor: "pointer", padding: "0" }}>
        <span style={{ display: "block", width: "26px", height: "1.5px", background: "currentColor" }}></span><span style={{ display: "block", width: "18px", height: "1.5px", background: "currentColor" }}></span>
      </button>
    </div>
  </div>
</header>
  );
}
