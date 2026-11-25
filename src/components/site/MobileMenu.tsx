'use client';

import { Fragment } from 'react';
import { useOra } from '@/components/site/OraContext';

export default function MobileMenu() {
  const { t, navLinks, langs, menuOpen, toggleMenu, openReserve, trackLink } = useOra();
  if (!menuOpen) return null;
  return (
<>
  <div id="ora-mobile-menu" role="dialog" aria-modal="true" aria-label={t.a11y.mobileNav} style={{ position: "fixed", inset: "0", zIndex: "60", background: "#252C1F", color: "#E3E8DE", display: "flex", flexDirection: "column", padding: "0 20px calc(24px + env(safe-area-inset-bottom))", overflowY: "auto", boxSizing: "border-box" }}>
    <div style={{ height: "72px", flexShrink: "0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "21px", fontWeight: "500", letterSpacing: ".36em", lineHeight: "1", marginRight: "-.36em" }}>ORA</span>
      <button type="button" onClick={toggleMenu} aria-label={t.a11y.close} autoFocus style={{ background: "none", border: "0", color: "#E3E8DE", width: "44px", height: "44px", display: "grid", placeItems: "center", cursor: "pointer", padding: "0" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ strokeWidth: "1.5", strokeLinecap: "round" }}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></button>
    </div>
    <nav aria-label={t.a11y.mobileNav} style={{ display: "flex", flexDirection: "column", marginTop: "clamp(28px,7vh,64px)" }}>
      {(navLinks).map((l, _i) => (<Fragment key={_i}>
        <a className="hv3" href={l.href} onClick={l.onClick} style={{ color: "#E3E8DE", textDecoration: "none", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(40px,11.5vw,60px)", lineHeight: "1.12", letterSpacing: "-.035em", padding: "4px 0" }}>{l.label}</a>
      </Fragment>))}
    </nav>
    <div style={{ marginTop: "auto", paddingTop: "40px", display: "flex", flexDirection: "column", gap: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", paddingTop: "16px", borderTop: "1px solid rgba(227,232,222,.2)" }}>
        <div role="group" aria-label={t.a11y.language} style={{ display: "flex", gap: "2px" }}>
        {(langs).map((l, _i) => (<Fragment key={_i}>
          <button type="button" onClick={l.onClick} aria-pressed={l.pressed} lang={l.lang} style={{ background: "none", border: "0", cursor: "pointer", color: "#E3E8DE", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".06em", padding: "10px 7px", minHeight: "40px", opacity: `${l.opacity}`, textDecoration: "underline", textDecorationColor: `${l.line}`, textDecorationThickness: "1px", textUnderlineOffset: "7px" }}>{l.code}</button>
        </Fragment>))}
      </div>
        <a href="tel:+998781229922" onClick={trackLink} style={{ color: "#E3E8DE", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: "15px", minHeight: "44px", display: "flex", alignItems: "center" }}>+998 78 122 99 22</a>
      </div>
      <button className="hv4" type="button" onClick={openReserve} data-magnet="1" style={{ display: "inline-flex", padding: "5px", borderRadius: "999px", cursor: "pointer", textDecoration: "none", boxSizing: "border-box", background: "rgba(255,255,255,.16)", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)", border: "1px solid rgba(255,255,255,.5)", boxShadow: "inset 0 1px 1px rgba(255,255,255,.85),inset 0 -1px 1px rgba(255,255,255,.14),0 10px 30px rgba(16,19,14,.3)", transition: "box-shadow .45s ease" }}><span className="ac2" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "46px", padding: "0 24px", borderRadius: "999px", background: "linear-gradient(180deg,#FFFFFF,#E9EDE5)", color: "#191D16", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "500", letterSpacing: ".02em", whiteSpace: "nowrap", boxShadow: "inset 0 1px 0 rgba(255,255,255,1)", flex: "1", transition: "transform .25s ease" }}>{t.reserveTable}</span></button>
    </div>
  </div>
</>
  );
}
