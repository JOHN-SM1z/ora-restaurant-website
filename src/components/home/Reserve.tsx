'use client';

import { Fragment } from 'react';
import { useOra } from '@/components/site/OraContext';

export default function Reserve() {
  const { t, openReserve, bookWays } = useOra();
  return (
<section id="reserve" data-screen-label="11 Reserve" style={{ background: "#EEF1EA", padding: "clamp(80px,10vw,160px) 0" }}>
    <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px,3.2vw,48px)", boxSizing: "border-box" }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#4B5345" }}>{t.s12.label}</span>
      <h2 style={{ margin: "20px 0 0", fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(38px,11vw,196px)", lineHeight: ".92", letterSpacing: "-.05em" }}><span style={{ display: "block", overflow: "hidden", paddingBottom: ".24em", marginBottom: "-.24em" }}><span data-mask="1" style={{ display: "block" }}>{t.s12.title}</span></span></h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px clamp(32px,6vw,120px)", marginTop: "clamp(32px,4vw,56px)", alignItems: "flex-start" }}>
        <p data-reveal="1" style={{ margin: "0", fontFamily: "var(--font-text)", fontSize: "18px", lineHeight: "1.6", color: "#4B5345", maxWidth: "40ch", textWrap: "pretty", flex: "1 1 280px" }}>{t.s12.body}</p>
        <ul style={{ flex: "1 1 320px", listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "10px 28px" }}>
          {(t.s12.trust).map((tr, _i) => (<Fragment key={_i}><li style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#4B5345" }}>{tr.k}</span><span style={{ fontFamily: "var(--font-display)", fontSize: "16px" }}>{tr.v}</span></li></Fragment>))}
        </ul>
      </div>
      <div className="book-grid" style={{ marginTop: "clamp(40px,5vw,80px)", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,270px),1fr))", gap: "clamp(10px,1.2vw,16px)" }}>
        <button className="ac12 book-card book-wide" type="button" onClick={openReserve} data-tilt="3" style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "28px", minHeight: "clamp(150px,14vw,196px)", padding: "clamp(18px,1.8vw,26px)", boxSizing: "border-box", borderRadius: "24px", textDecoration: "none", color: "#F4F6F1", background: "linear-gradient(160deg,#2F3828,#191D16)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,.18)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.2),0 12px 36px rgba(25,29,22,.07)", transition: "background-color .4s ease,box-shadow .4s ease", cursor: "pointer", textAlign: "left", font: "inherit" }}>
          <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}><span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#C38D32" }}>{t.book.formTag}</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", flexShrink: "0" }}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg></span>
          <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}><span className="book-name" style={{ fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(26px,2.2vw,34px)", lineHeight: "1.05", letterSpacing: "-.02em" }}>{t.ui.request}</span><span className="book-note" style={{ fontFamily: "var(--font-text)", fontSize: "15px", lineHeight: "1.45", color: "#C9D0C1" }}>{t.book.formNote}</span></span>
        </button>
        {(bookWays.filter((b) => !b.soon)).map((b, _i) => (<Fragment key={_i}>
          <a className={`hv13 ac12 book-card${b.href.startsWith("tel:") ? " book-wide" : ""}`} href={b.soon ? undefined : b.href} target={b.soon ? undefined : b.target} rel="noopener" onClick={b.onClick} aria-disabled={b.soon || undefined} role={b.soon ? "link" : undefined} data-tilt="3" style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "28px", minHeight: "clamp(150px,14vw,196px)", padding: "clamp(18px,1.8vw,26px)", boxSizing: "border-box", borderRadius: "24px", textDecoration: "none", color: "#191D16", background: "rgba(255,255,255,.5)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,.9)", boxShadow: "inset 0 1px 0 #fff,0 12px 36px rgba(25,29,22,.07)", transition: "background-color .4s ease,box-shadow .4s ease", opacity: `${b.op}`, cursor: `${b.cursor}` }}>
            <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}><span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", color: "#7A5714" }}>{b.tag}</span>{(b.soon) && (<><span style={{ fontFamily: "var(--font-display)", fontWeight: "500", letterSpacing: ".04em", lineHeight: "1.3", fontSize: "12px", padding: "5px 10px", borderRadius: "999px", border: "1px solid rgba(25,29,22,.2)" }}>{t.book.soon}</span></>)}{(b.live) && (<><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", flexShrink: "0" }}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg></>)}</span>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}><span className="book-name" style={{ fontFamily: "var(--font-display)", fontWeight: "300", fontSize: "clamp(26px,2.2vw,34px)", lineHeight: "1.05", letterSpacing: "-.02em" }}>{b.name}</span><span className="book-note" style={{ fontFamily: "var(--font-text)", fontSize: "15px", lineHeight: "1.45", color: "#4B5345" }}>{b.note}</span></span>
          </a>
        </Fragment>))}
      </div>
    </div>
  </section>
  );
}
