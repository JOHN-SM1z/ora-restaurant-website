'use client';

import { useOra } from '@/components/site/OraContext';

export default function Transition() {
  const { t } = useOra();
  return (
<section id="transition" data-transition="1" data-screen-label="07 Day to evening" style={{ position: "relative", height: "260vh", background: "#1E241A", color: "#E3E8DE" }}>
    <div style={{ position: "sticky", top: "0", height: "100svh", overflow: "hidden" }}>
      <video data-src="media/hero.mp4" data-full="1" poster="/media/posters/hero.webp" preload="none" aria-hidden="true" muted playsInline data-tr-day="1" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", display: "block" }}></video>
      <div data-tr-evening="1" style={{ position: "absolute", inset: "0", opacity: "0" }}><video data-src="media/evening.mp4" data-full="1" poster="/media/posters/evening.webp" preload="none" aria-hidden="true" muted playsInline style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", display: "block" }}></video></div>
      <div style={{ position: "absolute", inset: "0", background: "rgba(20,24,18,.34)" }}></div>
      <div className="cta-safe" style={{ position: "relative", height: "100%", maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box", paddingTop: "104px", paddingBottom: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "28px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#E3E8DE" }}>{t.s10.label}</span>
        <div style={{ position: "relative", height: "clamp(76px,15vw,250px)" }}>
          <span data-tr-w1="1" style={{ position: "absolute", left: "-.05em", bottom: "0", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(64px,15vw,250px)", lineHeight: ".8", letterSpacing: "-.05em", whiteSpace: "nowrap" }}>{t.s10.day}</span>
          <span data-tr-w2="1" style={{ position: "absolute", left: "-.05em", bottom: "0", fontFamily: "var(--font-display)", fontWeight: "300", fontStyle: "italic", fontSize: "clamp(64px,15vw,250px)", lineHeight: ".8", letterSpacing: "-.05em", whiteSpace: "nowrap", opacity: "0" }}>{t.s10.evening}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#E3E8DE" }}>
          <span>{t.s10.day}</span>
          <div style={{ position: "relative", flex: "1", height: "1px", background: "rgba(227,232,222,.3)" }}><div data-tr-bar="1" style={{ position: "absolute", inset: "0", background: "#C38D32", transformOrigin: "left center", transform: "scaleX(0)" }}></div></div>
          <span>{t.s10.evening}</span>
        </div>
      </div>
    </div>
  </section>
  );
}
