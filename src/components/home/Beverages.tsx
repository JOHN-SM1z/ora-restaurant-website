'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { useOra } from '@/components/site/OraContext';

export default function Beverages() {
  const { t, drinkPicks } = useOra();
  return (
<section id="beverages" data-screen-label="06 Bar" style={{ padding: "0 0 clamp(96px,12vw,190px)" }}>
    <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap-reverse", gap: "56px clamp(32px,6vw,120px)", alignItems: "center" }}>
      <div style={{ flex: "1 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "28px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#4B5345" }}>{t.s08.label}</span>
        <h2 style={{ margin: "0", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(36px,4.4vw,72px)", lineHeight: "1.02", letterSpacing: "-.03em", textWrap: "balance" }}><span style={{ display: "block", overflow: "hidden", paddingBottom: ".24em", marginBottom: "-.24em" }}><span data-mask="1" style={{ display: "block" }}>{t.s08.title}</span></span></h2>
        <p data-reveal="1" style={{ margin: "0", fontFamily: "var(--font-text)", fontSize: "18px", lineHeight: "1.6", color: "#4B5345", maxWidth: "40ch", textWrap: "pretty" }}>{t.s08.body}</p>
        <ul style={{ listStyle: "none", margin: "8px 0 0", padding: "0", display: "flex", flexDirection: "column", maxWidth: "420px" }}>
          {(drinkPicks).map((d, _i) => (<Fragment key={_i}>
            <li style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", padding: "12px 0", borderTop: "1px solid rgba(25,29,22,.16)", fontFamily: "var(--font-display)", fontSize: "16px" }}><span>{d.n}</span><span style={{ color: "#4B5345", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{d.p}</span></li>
          </Fragment>))}
        </ul>
      </div>
      <div style={{ flex: "1.4 1 460px", minWidth: "0", display: "flex", gap: "clamp(14px,2vw,32px)", alignItems: "flex-end" }}>
        <figure data-tilt="3" data-cursor="" style={{ margin: "0", position: "relative", aspectRatio: "3/4", overflow: "hidden", borderRadius: "clamp(16px,1.6vw,24px)", background: "#2A2F25", flex: "1.35 1 0", minWidth: "0" }}><div data-reveal-img="1" style={{ position: "absolute", inset: "0", overflow: "hidden", backgroundImage: "url(\"/media/posters/glass.webp\")", backgroundSize: "cover", backgroundPosition: "center" }}><img src="/media/posters/glass.webp" alt="" loading="lazy" decoding="async" aria-hidden="true" data-parallax="0.05" style={{ position: "absolute", left: "0", top: "-8%", width: "100%", height: "116%", objectFit: "cover", display: "block" }} /></div></figure>
        <figure data-tilt="3" data-cursor="" style={{ margin: "0", position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: "clamp(16px,1.6vw,24px)", background: "#D5DBCF", flex: "1 1 0", minWidth: "0", marginBottom: "14%" }}><div data-reveal-img="1" style={{ position: "absolute", inset: "0", overflow: "hidden" }}><Image quality={85} src="/media/dishes/64-jasmine-lemonade.jpg" alt="" width={560} height={560} sizes="(max-width: 900px) 45vw, 25vw" data-parallax="0.04" style={{ position: "absolute", left: "0", top: "-8%", width: "100%", height: "116%", objectFit: "cover", display: "block" }} /></div></figure>
      </div>
    </div>
  </section>
  );
}
