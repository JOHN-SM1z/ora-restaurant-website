'use client';

import { useOra } from '@/components/site/OraContext';

export default function Evening() {
  const { t } = useOra();
  return (
<section id="evening" data-screen-label="08 Evening" style={{ background: "#252C1F", color: "#E3E8DE", padding: "clamp(96px,12vw,190px) 0", overflow: "hidden" }}>
    <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "56px clamp(32px,6vw,120px)", alignItems: "flex-end" }}>
      <div style={{ flex: "1 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "28px", paddingBottom: "clamp(0px,3vw,48px)" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#C38D32" }}>{t.s11.label}</span>
        <h2 style={{ margin: "0", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(36px,4.4vw,72px)", lineHeight: "1.02", letterSpacing: "-.03em", textWrap: "balance" }}><span style={{ display: "block", overflow: "hidden", paddingBottom: ".24em", marginBottom: "-.24em" }}><span data-mask="1" style={{ display: "block" }}>{t.s11.title}</span></span></h2>
        <p data-reveal="1" style={{ margin: "0", fontFamily: "var(--font-text)", fontSize: "18px", lineHeight: "1.6", color: "#AEB6A3", maxWidth: "40ch", textWrap: "pretty" }}>{t.s11.body}</p>
      </div>
      <figure data-tilt="3" data-cursor="" style={{ margin: "0", position: "relative", aspectRatio: "16/11", overflow: "hidden", borderRadius: "clamp(16px,1.6vw,24px)", background: "#2A2F25", flex: "1.9 1 520px", minWidth: "0", marginRight: "calc(-1 * clamp(20px,3.2vw,48px))" }}><div data-reveal-img="1" style={{ position: "absolute", inset: "0", overflow: "hidden", backgroundImage: "url(\"/media/posters/service.webp\")", backgroundSize: "cover", backgroundPosition: "center" }}><video data-src="media/service.mp4" poster="/media/posters/service.webp" preload="none" aria-hidden="true" data-parallax="0.05" style={{ position: "absolute", left: "0", top: "-8%", width: "100%", height: "116%", objectFit: "cover", display: "block" }}></video></div></figure>
    </div>
  </section>
  );
}
