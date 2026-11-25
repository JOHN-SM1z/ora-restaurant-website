'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { useOra } from '@/components/site/OraContext';

export default function Signature() {
  const { t, goMenu, featured, stripPrev, stripNext } = useOra();
  return (
<section id="signature" data-screen-label="05 From the menu" style={{ padding: "clamp(48px,6vw,96px) 0 clamp(96px,12vw,190px)", borderTop: "1px solid rgba(25,29,22,.14)" }}>
    <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", marginBottom: "clamp(40px,5vw,80px)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}><span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#4B5345" }}>{t.s07.label}</span><h2 style={{ margin: "0", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(36px,4.4vw,72px)", lineHeight: "1.02", letterSpacing: "-.03em", textWrap: "balance" }}><span style={{ display: "block", overflow: "hidden", paddingBottom: ".24em", marginBottom: "-.24em" }}><span data-mask="1" style={{ display: "block" }}>{t.s07.title}</span></span></h2></div>
        <button className="hv8" type="button" onClick={goMenu} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "500", letterSpacing: ".02em", padding: "0 26px", minHeight: "52px", boxSizing: "border-box", cursor: "pointer", textDecoration: "none", borderRadius: "999px", transition: "background-color .3s ease,color .3s ease,border-color .3s ease", background: "transparent", color: "#191D16", border: "1px solid rgba(25,29,22,.36)" }}>{t.viewMenu}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", flexShrink: "0" }}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg></button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "48px clamp(24px,5vw,96px)", alignItems: "flex-start" }}>
        <div style={{ flex: "1.5 1 440px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
          <figure data-tilt="3" data-cursor="" style={{ margin: "0", position: "relative", aspectRatio: "1/1", overflow: "hidden", borderRadius: "clamp(16px,1.6vw,24px)", background: "#D5DBCF" }}><div data-reveal-img="1" style={{ position: "absolute", inset: "0", overflow: "hidden" }}><Image quality={85} src="/media/photos/salmon-prawn-ravioli.jpg" alt={t.s07.cap1} width={1900} height={1900} sizes="(max-width: 900px) 100vw, 55vw" data-parallax="0.04" style={{ position: "absolute", left: "0", top: "-8%", width: "100%", height: "116%", objectFit: "cover", display: "block" }} /></div></figure>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px" }}><span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,1.8vw,26px)", lineHeight: "1.2", letterSpacing: "-.01em" }}>{t.s07.cap1}</span><span style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", color: "#4B5345" }}>{t.s07.note}</span></div>
        </div>
        <div className="sig-col2" style={{ flex: "1 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px", paddingTop: "clamp(0px,16vw,300px)" }}>
          <figure data-tilt="3" data-cursor="" style={{ margin: "0", position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: "clamp(16px,1.6vw,24px)", background: "#D5DBCF" }}><div data-reveal-img="1" style={{ position: "absolute", inset: "0", overflow: "hidden" }}><Image quality={85} src="/media/photos/braised-rib-carrot-cream.jpg" alt={t.s07.cap2} width={1400} height={1400} sizes="(max-width: 900px) 100vw, 38vw" data-parallax="0.04" style={{ position: "absolute", left: "0", top: "-8%", width: "100%", height: "116%", objectFit: "cover", display: "block" }} /></div></figure>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px" }}><span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,1.8vw,26px)", lineHeight: "1.2", letterSpacing: "-.01em" }}>{t.s07.cap2}</span><span style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", color: "#4B5345" }}>{t.s07.note2}</span></div>
        </div>
      </div>
    </div>
    <div style={{ marginTop: "clamp(72px,9vw,140px)" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#4B5345" }}>{t.menu.title}</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="hv8" type="button" onClick={stripPrev} aria-label={t.ui.prev} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "500", letterSpacing: ".02em", boxSizing: "border-box", cursor: "pointer", textDecoration: "none", borderRadius: "999px", transition: "background-color .3s ease,color .3s ease,border-color .3s ease", background: "transparent", color: "#191D16", border: "1px solid rgba(25,29,22,.36)", minHeight: "44px", width: "44px", padding: "0" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", flexShrink: "0" }}><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg></button>
          <button className="hv8" type="button" onClick={stripNext} aria-label={t.ui.next} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "500", letterSpacing: ".02em", boxSizing: "border-box", cursor: "pointer", textDecoration: "none", borderRadius: "999px", transition: "background-color .3s ease,color .3s ease,border-color .3s ease", background: "transparent", color: "#191D16", border: "1px solid rgba(25,29,22,.36)", minHeight: "44px", width: "44px", padding: "0" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", flexShrink: "0" }}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg></button>
        </div>
      </div>
      <ul id="ora-strip" style={{ listStyle: "none", margin: "0", padding: "0 clamp(20px,3.2vw,48px)", display: "flex", gap: "clamp(14px,1.6vw,24px)", overflowX: "auto", scrollSnapType: "x mandatory", scrollPadding: "0 clamp(20px,3.2vw,48px)", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        {(featured).map((d, _i) => (<Fragment key={_i}>
          <li style={{ flex: "0 0 clamp(220px,21vw,320px)", scrollSnapAlign: "start", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div data-tilt="4" data-cursor="" style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: "18px", background: "#D5DBCF" }}><Image quality={85} className="hv10" src={d.img} alt={d.n} fill sizes="(max-width: 900px) 240px, 22vw" style={{ objectFit: "cover", display: "block", transition: "transform 1.4s cubic-bezier(.22,.61,.36,1)" }} /></div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "17px", lineHeight: "1.25", textWrap: "pretty" }}>{d.n}</span>
            <span style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontFamily: "var(--font-display)", fontSize: "14px", color: "#4B5345", fontVariantNumeric: "tabular-nums" }}><span style={{ fontFamily: "var(--font-text)", fontStyle: "italic" }}>{d.d}</span><span>{d.p}</span></span>
          </li>
        </Fragment>))}
        <li style={{ flex: "0 0 clamp(220px,21vw,320px)", scrollSnapAlign: "start", display: "flex" }}>
          <button className="hv11" type="button" onClick={goMenu} data-magnet="1" style={{ width: "100%", aspectRatio: "4/5", borderRadius: "18px", background: "#252C1F", color: "#E3E8DE", border: "0", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", padding: "24px", boxSizing: "border-box", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(28px,2.4vw,40px)", letterSpacing: "-.02em", textAlign: "left", transition: "background-color .3s ease" }}>{t.viewMenu}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", flexShrink: "0" }}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg></button>
        </li>
        <li aria-hidden="true" style={{ flex: "0 0 1px" }}></li>
      </ul>
    </div>
  </section>
  );
}
