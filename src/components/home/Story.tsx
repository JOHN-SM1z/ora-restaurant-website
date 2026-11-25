'use client';

import { Fragment } from 'react';
import { useOra } from '@/components/site/OraContext';

export default function Story() {
  const { t } = useOra();
  return (
<section id="story" data-screen-label="01 About" style={{ padding: "clamp(96px,13vw,210px) 0 clamp(80px,10vw,160px)" }}>
    <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "56px clamp(32px,6vw,120px)", alignItems: "flex-end" }}>
      <div style={{ flex: "1 1 240px", maxWidth: "360px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#4B5345" }}>{t.s01.label}</span>
        <figure data-tilt="3" data-cursor="" style={{ margin: "0", position: "relative", aspectRatio: "3/4", overflow: "hidden", borderRadius: "clamp(16px,1.6vw,24px)", background: "#2A2F25" }}><div data-reveal-img="1" style={{ position: "absolute", inset: "0", overflow: "hidden", backgroundImage: "url(\"/media/posters/interior.webp\")", backgroundSize: "cover", backgroundPosition: "center" }}><img src="/media/posters/interior.webp" alt="" loading="lazy" decoding="async" aria-hidden="true" data-parallax="0.05" style={{ position: "absolute", left: "0", top: "-8%", width: "100%", height: "116%", objectFit: "cover", display: "block" }} /></div></figure>
      </div>
      <div style={{ flex: "2.4 1 480px", minWidth: "0", display: "flex", flexDirection: "column", gap: "clamp(40px,5vw,80px)" }}>
        <h2 style={{ margin: "0", fontFamily: "var(--font-display)", fontWeight: "300", lineHeight: "1.02", letterSpacing: "-.03em", textWrap: "balance", fontSize: "clamp(34px,4vw,66px)", maxWidth: "19ch" }}><span style={{ display: "block", overflow: "hidden", paddingBottom: ".24em", marginBottom: "-.24em" }}><span data-mask="1" style={{ display: "block" }}>{t.s01.title}</span></span></h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px clamp(32px,4vw,72px)", alignItems: "flex-start" }}>
          <p data-reveal="1" style={{ margin: "0", fontFamily: "var(--font-text)", fontSize: "18px", lineHeight: "1.6", color: "#4B5345", maxWidth: "40ch", textWrap: "pretty", flex: "1.3 1 300px" }}>{t.s01.body}</p>
          <dl style={{ flex: "1 1 220px", margin: "0", display: "flex", flexDirection: "column" }}>
            {(t.s01.facts).map((fa, _i) => (<Fragment key={_i}>
              <div data-reveal="1" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px", padding: "12px 0", borderTop: "1px solid rgba(25,29,22,.18)" }}>
                <dt style={{ fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(28px,2.6vw,40px)", lineHeight: "1", letterSpacing: "-.02em", whiteSpace: "nowrap" }}>{fa.v}</dt>
                <dd style={{ margin: "0", fontFamily: "var(--font-text)", fontStyle: "italic", fontSize: "15px", color: "#4B5345", textAlign: "right" }}>{fa.k}</dd>
              </div>
            </Fragment>))}
          </dl>
        </div>
      </div>
    </div>
  </section>
  );
}
