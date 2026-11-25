'use client';

import Image from 'next/image';
import { useOra } from '@/components/site/OraContext';

export default function Kitchen() {
  const { t } = useOra();
  return (
<section id="kitchen" data-expand="1" data-screen-label="03 Open kitchen" style={{ position: "relative", height: "240vh", background: "#1E241A", color: "#F4F6F1" }}>
    <div style={{ position: "sticky", top: "0", height: "100svh", overflow: "hidden" }}>
      <div data-ex-media="1" style={{ position: "absolute", inset: "0", clipPath: "inset(16% 22% 16% 22% round 28px)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: "0", backgroundImage: "url(\"/media/posters/kitchen.webp\")", backgroundSize: "cover", backgroundPosition: "center" }}><img src="/media/posters/kitchen.webp" alt="" loading="lazy" decoding="async" data-ex-vid="1" aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.25)" }} /></div>
        <div data-ex-shade="1" style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,rgba(16,19,14,.25) 0%,rgba(16,19,14,0) 35%,rgba(16,19,14,.8) 100%)", opacity: "0" }}></div>
      </div>
      <div style={{ position: "absolute", top: "96px", left: "0", right: "0" }}><div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box" }}><span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#C38D32" }}>{t.s04.label}</span></div></div>
      <div style={{ position: "absolute", left: "0", right: "0", bottom: "0" }}><div className="cta-safe" style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box", paddingBottom: "clamp(24px,5vh,56px)", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "28px" }}>
        <div className="ex-text" data-ex-text="1" style={{ flex: "1 1 440px", maxWidth: "780px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
          <h2 style={{ margin: "0", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(38px,5vw,84px)", lineHeight: ".98", letterSpacing: "-.035em", textWrap: "balance" }}>{t.s04.title}</h2>
          <p style={{ margin: "0", fontFamily: "var(--font-text)", fontSize: "18px", lineHeight: "1.6", color: "#DCE2D6", maxWidth: "46ch", textWrap: "pretty" }}>{t.s04.body}</p>
        </div>
        <figure className="ex-card" data-ex-card="1" data-tilt="6" data-cursor="" style={{ flex: "0 0 auto", width: "min(340px,100%)", margin: "0", padding: "8px", borderRadius: "24px", boxSizing: "border-box", background: "rgba(22,26,19,.34)", backdropFilter: "blur(30px) saturate(170%)", WebkitBackdropFilter: "blur(30px) saturate(170%)", border: "1px solid rgba(255,255,255,.2)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.26),inset 0 -1px 0 rgba(255,255,255,.06),0 30px 80px rgba(0,0,0,.32)" }}>
          <Image quality={85} src="/media/photos/chefs-table-salmon-caviar.jpg" alt={t.s04.cap} width={1400} height={1050} sizes="340px" style={{ width: "100%", height: "auto", aspectRatio: "4/3", objectFit: "cover", display: "block", borderRadius: "17px" }} />
          <figcaption style={{ padding: "12px 8px 4px", fontFamily: "var(--font-display)", fontSize: "14px", lineHeight: "1.35", color: "#E6EBE0" }}>{t.s04.cap}</figcaption>
        </figure>
      </div></div>
    </div>
  </section>
  );
}
