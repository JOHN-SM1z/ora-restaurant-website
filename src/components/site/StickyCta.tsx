'use client';

import { useOra } from '@/components/site/OraContext';

export default function StickyCta() {
  const { t, showStickyCta, openReserve, trackLink } = useOra();
  if (!showStickyCta) return null;
  return (
<div className="v-mob">
  <div style={{ position: "fixed", left: "12px", right: "12px", bottom: "calc(12px + env(safe-area-inset-bottom))", zIndex: "40", padding: "6px", borderRadius: "999px", background: "rgba(227,232,222,.55)", backdropFilter: "blur(28px) saturate(180%)", WebkitBackdropFilter: "blur(28px) saturate(180%)", border: "1px solid rgba(255,255,255,.8)", boxShadow: "inset 0 1px 0 #fff,0 18px 50px rgba(16,19,14,.22)", display: "flex", gap: "8px", alignItems: "center" }}>
    <button className="hv1" type="button" onClick={openReserve} data-magnet="1" style={{ display: "inline-flex", padding: "5px", borderRadius: "999px", cursor: "pointer", textDecoration: "none", boxSizing: "border-box", background: "rgba(255,255,255,.3)", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)", border: "1px solid rgba(255,255,255,.75)", boxShadow: "inset 0 1px 1px rgba(255,255,255,.85),inset 0 -1px 1px rgba(255,255,255,.14),0 10px 30px rgba(16,19,14,.16)", flex: "1", transition: "box-shadow .45s ease" }}><span className="ac2" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "46px", padding: "0 24px", borderRadius: "999px", background: "linear-gradient(180deg,#2A3124,#191D16)", color: "#F4F6F1", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "500", letterSpacing: ".02em", whiteSpace: "nowrap", boxShadow: "inset 0 1px 0 rgba(255,255,255,.2)", flex: "1", transition: "transform .25s ease" }}>{t.reserveTable}</span></button>
    <a className="hv8" href="tel:+998781229922" onClick={trackLink} aria-label={t.ui.call} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "500", letterSpacing: ".02em", boxSizing: "border-box", cursor: "pointer", textDecoration: "none", borderRadius: "999px", transition: "background-color .3s ease,color .3s ease,border-color .3s ease", background: "transparent", color: "#191D16", border: "1px solid rgba(25,29,22,.36)", width: "52px", minHeight: "52px", padding: "0" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg></a>
  </div>
</div>
  );
}
