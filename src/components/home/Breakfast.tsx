'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { useOra } from '@/components/site/OraContext';

export default function Breakfast() {
  const { t, breakfastPicks } = useOra();
  return (
<section id="breakfast" data-screen-label="04 Breakfast" style={{ padding: "clamp(96px,12vw,190px) 0 clamp(72px,9vw,140px)" }}>
    <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px clamp(32px,6vw,120px)", alignItems: "baseline" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#4B5345", flex: "0 0 auto", minWidth: "180px" }}>{t.s06.label}</span>
        <h2 style={{ margin: "0", fontFamily: "var(--font-display)", fontWeight: "300", textWrap: "balance", fontSize: "clamp(44px,7.4vw,128px)", lineHeight: ".94", letterSpacing: "-.045em", flex: "1 1 480px" }}><span style={{ display: "block", overflow: "hidden", paddingBottom: ".24em", marginBottom: "-.24em" }}><span data-mask="1" style={{ display: "block" }}>{t.s06.title}</span></span></h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px clamp(24px,4vw,72px)", marginTop: "clamp(40px,5vw,80px)", alignItems: "flex-end" }}>
        <figure data-tilt="3" data-cursor="" style={{ margin: "0", position: "relative", aspectRatio: "16/10", overflow: "hidden", borderRadius: "clamp(16px,1.6vw,24px)", background: "#2A2F25", flex: "1.7 1 460px", minWidth: "0" }}><div data-reveal-img="1" style={{ position: "absolute", inset: "0", overflow: "hidden", backgroundImage: "url(\"/media/posters/breakfast.webp\")", backgroundSize: "cover", backgroundPosition: "center" }}><img src="/media/posters/breakfast.webp" alt="" loading="lazy" decoding="async" aria-hidden="true" data-parallax="0.05" style={{ position: "absolute", left: "0", top: "-8%", width: "100%", height: "116%", objectFit: "cover", display: "block" }} /></div></figure>
        <div style={{ flex: "1 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "28px" }}>
          <p data-reveal="1" style={{ margin: "0", fontFamily: "var(--font-text)", fontSize: "18px", lineHeight: "1.6", color: "#4B5345", maxWidth: "40ch", textWrap: "pretty" }}>{t.s06.body}</p>
          <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column" }}>
            {(breakfastPicks).map((d, _i) => (<Fragment key={_i}>
              <li data-reveal="1" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 0", borderTop: "1px solid rgba(25,29,22,.16)" }}>
                <Image quality={85} src={d.img} alt="" width={72} height={72} sizes="72px" style={{ width: "72px", height: "72px", objectFit: "cover", display: "block", flexShrink: "0", background: "#D5DBCF", borderRadius: "12px" }} />
                <span style={{ flex: "1", minWidth: "0", fontFamily: "var(--font-display)", fontSize: "17px", lineHeight: "1.25" }}>{d.n}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", color: "#4B5345" }}>{d.p}</span>
              </li>
            </Fragment>))}
          </ul>
        </div>
      </div>
    </div>
  </section>
  );
}
