'use client';

import { Fragment } from 'react';
import { useOra } from '@/components/site/OraContext';

export default function Visit() {
  const { t, trackLink } = useOra();
  return (
<section id="visit" data-screen-label="12 Visit" style={{ background: "#252C1F", color: "#E3E8DE", padding: "clamp(96px,12vw,170px) 0 clamp(72px,9vw,140px)" }}>
    <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "56px clamp(32px,6vw,120px)", alignItems: "stretch" }}>
      <div style={{ flex: "1 1 340px", minWidth: "0", display: "flex", flexDirection: "column", gap: "40px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#C38D32" }}>{t.visit.label}</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {(t.visit.cells).map((c, _i) => (<Fragment key={_i}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "16px", borderTop: "1px solid rgba(227,232,222,.18)" }}>
              <h3 style={{ margin: "0", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#AEB6A3" }}>{c.k}</h3>
              {(c.lines as Array<{ v: string; href?: string }>).map((ln, _i) => (<Fragment key={_i}>{ln.href ? <a className="hv3" href={ln.href} target={ln.href.startsWith('http') ? '_blank' : undefined} rel={ln.href.startsWith('http') ? 'noopener' : undefined} onClick={trackLink} style={{ color: "#E3E8DE", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: "clamp(18px,1.5vw,22px)", lineHeight: "1.4" }}>{ln.v}</a> : <span style={{ color: "#E3E8DE", fontFamily: "var(--font-display)", fontSize: "clamp(18px,1.5vw,22px)", lineHeight: "1.4" }}>{ln.v}</span>}</Fragment>))}
            </div>
          </Fragment>))}
        </div>
        <a className="hv14" href="https://www.google.com/maps/search/?api=1&query=ORA%20restaurant%20Istiqbol%2041%20Tashkent" target="_blank" rel="noopener" onClick={trackLink} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "500", letterSpacing: ".02em", padding: "0 26px", minHeight: "52px", boxSizing: "border-box", cursor: "pointer", textDecoration: "none", borderRadius: "999px", transition: "background-color .3s ease,color .3s ease,border-color .3s ease", background: "#E3E8DE", color: "#191D16", border: "1px solid #E3E8DE" , alignSelf: "flex-start"}}>{t.visit.directions}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", flexShrink: "0" }}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg></a>
      </div>
      <div style={{ flex: "1.5 1 460px", minWidth: "0", display: "flex", flexDirection: "column", gap: "28px" }}>
        <div style={{ position: "relative", flex: "1", minHeight: "360px", background: "#2F3828", overflow: "hidden" }}>
          <iframe title={t.a11y.map} src="https://maps.google.com/maps?q=ORA%20restaurant%2C%20Istiqbol%2041%2C%20Infinity%20Luxury%20Residence%2C%20Tashkent&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", border: "0", filter: "grayscale(1) contrast(.95) brightness(.92)" }}></iframe>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#AEB6A3" }}>{t.visit.goodLabel}</span>
          <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "8px 22px" }}>
            {(t.visit.good).map((g, _i) => (<Fragment key={_i}><li style={{ fontFamily: "var(--font-text)", fontSize: "16px", lineHeight: "1.5", color: "#E3E8DE" }}>{g}</li></Fragment>))}
          </ul>
        </div>
      </div>
    </div>
  </section>
  );
}
