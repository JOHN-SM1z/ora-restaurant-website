'use client';

import { Fragment } from 'react';
import { useOra } from '@/components/site/OraContext';

export default function Footer() {
  const { t, lang, isHome, navLinks, langs, goHome, openReserve, trackLink } = useOra();
  return (
<footer className={isHome ? "footer-home" : undefined} style={{ background: "#1E241A", color: "#E3E8DE", padding: "clamp(56px,7vw,104px) 0 calc(20px + var(--footer-pad))", overflow: "hidden" }}>
  <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "40px clamp(32px,5vw,96px)" }}>
      <nav aria-label={t.a11y.footerNav} style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 180px" }}>
        {(navLinks).map((l, _i) => (<Fragment key={_i}><a className="hv3" href={l.href} onClick={l.onClick} style={{ color: "#E3E8DE", textDecoration: "none", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(22px,2vw,28px)", letterSpacing: "-.015em", lineHeight: "1.3" }}>{l.label}</a></Fragment>))}
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: "1 1 200px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#AEB6A3", marginBottom: "6px" }}>{t.visit.socialLabel}</span>
        {(t.visit.social).map((so, _i) => (<Fragment key={_i}><a className="hv3" href={so.href} target="_blank" rel="noopener" onClick={trackLink} style={{ color: "#E3E8DE", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: "17px", display: "flex", gap: "10px" }}><span>{so.k}</span><span style={{ color: "#AEB6A3" }}>{so.v}</span></a></Fragment>))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: "1 1 200px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#AEB6A3", marginBottom: "6px" }}>{t.s12.label}</span>
        <a className="hv3" href="tel:+998781229922" onClick={trackLink} style={{ color: "#E3E8DE", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: "17px" }}>+998 78 122 99 22</a>
        <a className="hv3" href="tel:+998954181212" onClick={trackLink} style={{ color: "#E3E8DE", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: "17px" }}>+998 95 418 12 12</a>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start", flex: "1 1 200px" }}>
        <div role="group" aria-label={t.a11y.language} style={{ display: "flex", gap: "2px" }}>
        {(langs).map((l, _i) => (<Fragment key={_i}>
          <button type="button" onClick={l.onClick} aria-pressed={l.pressed} lang={l.lang} style={{ background: "none", border: "0", cursor: "pointer", color: "#E3E8DE", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".06em", padding: "10px 7px", minHeight: "40px", opacity: `${l.opacity}`, textDecoration: "underline", textDecorationColor: `${l.line}`, textDecorationThickness: "1px", textUnderlineOffset: "7px" }}>{l.code}</button>
        </Fragment>))}
      </div>
        <button className="hv4" type="button" onClick={openReserve} data-magnet="1" style={{ display: "inline-flex", padding: "5px", borderRadius: "999px", cursor: "pointer", textDecoration: "none", boxSizing: "border-box", background: "rgba(255,255,255,.16)", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)", border: "1px solid rgba(255,255,255,.5)", boxShadow: "inset 0 1px 1px rgba(255,255,255,.85),inset 0 -1px 1px rgba(255,255,255,.14),0 10px 30px rgba(16,19,14,.3)", transition: "box-shadow .45s ease" }}><span className="ac2" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "46px", padding: "0 24px", borderRadius: "999px", background: "linear-gradient(180deg,#FFFFFF,#E9EDE5)", color: "#191D16", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "500", letterSpacing: ".02em", whiteSpace: "nowrap", boxShadow: "inset 0 1px 0 rgba(255,255,255,1)", transition: "transform .25s ease" }}>{t.reserveTable}</span></button>
      </div>
    </div>
    <div aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "33vw", lineHeight: "1", letterSpacing: ".02em", color: "#2F3828", height: ".66em", overflow: "hidden", margin: "clamp(40px,6vw,96px) 0 0 -.05em", whiteSpace: "nowrap", userSelect: "none" }}>ORA</div>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "10px 32px", paddingTop: "18px", borderTop: "1px solid rgba(227,232,222,.16)", fontFamily: "var(--font-text)", fontSize: "14px", lineHeight: "1.5", color: "#AEB6A3" }}>
      <span>{t.footer.rights}</span>
      <span style={{ maxWidth: "60ch" }}>{t.footer.imagery}</span>
      <a className="hv3" href={`/${lang}`} onClick={goHome} style={{ color: "#E3E8DE", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em" }}>{t.ui.top}</a>
    </div>
  </div>
</footer>
  );
}
