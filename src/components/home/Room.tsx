'use client';

import { useOra } from '@/components/site/OraContext';

export default function Room() {
  const { t } = useOra();
  return (
<section id="room" data-screen-label="02 Room" style={{ position: "relative", height: "100svh", minHeight: "520px", overflow: "hidden", background: "#2A2F25", color: "#E3E8DE" }}>
    <div data-reveal-img="1" style={{ position: "absolute", inset: "0", overflow: "hidden", backgroundImage: "url(\"/media/posters/dolly.webp\")", backgroundSize: "cover", backgroundPosition: "center" }}><img src="/media/posters/dolly.webp" alt="" loading="lazy" decoding="async" aria-hidden="true" data-parallax="0.06" style={{ position: "absolute", left: "0", top: "-8%", width: "100%", height: "116%", objectFit: "cover", display: "block" }} /></div>
    <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "42%", background: "linear-gradient(180deg,rgba(20,24,18,0),rgba(20,24,18,.5))" }}></div>
    <div style={{ position: "absolute", left: "0", right: "0", bottom: "0" }}><div className="cta-safe" style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box", paddingBottom: "clamp(22px,3vw,40px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "12px 32px" }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#E3E8DE" }}>{t.s02.label}</span>
      <p data-reveal="1" style={{ margin: "0", fontFamily: "var(--font-text)", fontStyle: "italic", fontSize: "clamp(18px,1.6vw,24px)", lineHeight: "1.4", maxWidth: "28ch", textWrap: "balance" }}>{t.s02.title}</p>
    </div></div>
  </section>
  );
}
