'use client';

import { Fragment } from 'react';
import type { KeyboardEvent } from 'react';
import { useOra } from '@/components/site/OraContext';

export default function ReserveDialog() {
  const { t, reserveOpen, status, trackLink, tgHref, closeReserve, stop, submitted, notSubmitted, hasError, error, errorText, dialogTitle, formSub, submitLabel, sending, failed, copied, copyMessage, todayISO, f, on, guestOpts, occasionOpts, submit, doneBody, doneRows, bookChips } = useOra();
  if (!reserveOpen) return null;
  const req = (v: string) => (error === 'required' && !v.trim()) || undefined;
  // Keep keyboard focus inside the dialog while it is open.
  const trap = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const els = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([tabindex="-1"]),textarea,[tabindex]:not([tabindex="-1"])')).filter((el) => el.offsetParent !== null);
    if (!els.length) return;
    const first = els[0], last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  return (
<>
  <div className="dialog-backdrop" onClick={closeReserve} style={{ zIndex: "100", background: "rgba(16,19,14,.34)", backdropFilter: "blur(18px) saturate(140%)", WebkitBackdropFilter: "blur(18px) saturate(140%)", overflowY: "auto", overscrollBehavior: "contain", padding: "max(clamp(12px,4vw,48px), env(safe-area-inset-top)) max(clamp(12px,4vw,48px), env(safe-area-inset-right)) max(clamp(12px,4vw,48px), env(safe-area-inset-bottom)) max(clamp(12px,4vw,48px), env(safe-area-inset-left))", placeItems: "start center" }}>
    <div role="dialog" aria-modal="true" aria-labelledby="rsv-title" onClick={stop} onKeyDown={trap} style={{ width: "min(680px,100%)", margin: "auto 0", background: "rgba(244,246,241,.66)", backdropFilter: "blur(44px) saturate(190%)", WebkitBackdropFilter: "blur(44px) saturate(190%)", border: "1px solid rgba(255,255,255,.8)", borderRadius: "clamp(22px,3vw,32px)", boxShadow: "inset 0 1px 0 #fff,inset 0 -1px 0 rgba(255,255,255,.4),0 40px 120px rgba(10,12,9,.35)", color: "#191D16", padding: "clamp(22px,4vw,44px)", boxSizing: "border-box" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", paddingBottom: "24px", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{ fontSize: "13px", letterSpacing: ".01em", color: "var(--color-accent)", fontWeight: "500" }}>ORA · Tashkent</span>
          <h2 id="rsv-title" style={{ fontFamily: "var(--font-heading)", fontWeight: "400", fontSize: "clamp(36px,5vw,52px)", lineHeight: "1", margin: "0" }}>{dialogTitle}</h2>
        </div>
        <button type="button" onClick={closeReserve} aria-label={t.form.close} style={{ background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "50%", width: "44px", height: "44px", display: "grid", placeItems: "center", cursor: "pointer", padding: "0", color: "inherit", flex: "none" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ strokeWidth: "1.5", strokeLinecap: "round" }}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      </div>
      {(notSubmitted) && (<>
        <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "24px" }}>
          <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#4B5345" }}>{formSub}</p>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={on.website} style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", opacity: "0" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "20px" }}>
            <div className="field"><label htmlFor="rsv-date" style={{ fontSize: "13px", letterSpacing: ".01em", color: "#4B5345", marginBottom: "8px" }}>{t.form.date}</label><input className="input" id="rsv-date" type="date" required min={todayISO || undefined} value={f.date} onChange={on.date} aria-invalid={req(f.date) || (error === "date" || undefined)} style={{ background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "14px", boxShadow: "inset 0 1px 2px rgba(25,29,22,.06)", minHeight: "50px", fontSize: "16px", boxSizing: "border-box", padding: "0 14px" }} /></div>
            <div className="field"><label htmlFor="rsv-time" style={{ fontSize: "13px", letterSpacing: ".01em", color: "#4B5345", marginBottom: "8px" }}>{t.form.time}</label><input className="input" id="rsv-time" type="time" required step="900" value={f.time} onChange={on.time} aria-invalid={req(f.time)} style={{ background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "14px", boxShadow: "inset 0 1px 2px rgba(25,29,22,.06)", minHeight: "50px", fontSize: "16px", boxSizing: "border-box", padding: "0 14px" }} /></div>
          </div>
          <div className="field"><label id="rsv-guests-l" style={{ fontSize: "13px", letterSpacing: ".01em", color: "#4B5345", marginBottom: "8px" }}>{t.form.guests}</label>
            <div className="seg" role="radiogroup" aria-labelledby="rsv-guests-l" style={{ display: "flex", width: "100%", borderRadius: "14px", overflow: "hidden", background: "rgba(255,255,255,.4)", border: "1px solid rgba(255,255,255,.9)" }}>
              {(guestOpts).map((o, _i) => (<Fragment key={_i}>
                <label className="seg-opt" style={{ flex: "1", justifyContent: "center", minHeight: "48px", padding: "0 6px", fontSize: "15px" }}><input type="radio" name="rsv-guests" checked={o.checked} onChange={o.onChange} />{o.label}</label>
              </Fragment>))}
            </div>
          </div>
          <div className="field"><label id="rsv-occ-l" style={{ fontSize: "13px", letterSpacing: ".01em", color: "#4B5345", marginBottom: "8px" }}>{t.form.occasion}</label>
            <div className="seg" role="radiogroup" aria-labelledby="rsv-occ-l" style={{ borderRadius: "14px", overflow: "hidden", background: "rgba(255,255,255,.4)", border: "1px solid rgba(255,255,255,.9)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,130px),1fr))", width: "100%" }}>
              {(occasionOpts).map((o, _i) => (<Fragment key={_i}>
                <label className="seg-opt" style={{ justifyContent: "center", textAlign: "center", minHeight: "48px", padding: "6px 10px", fontSize: "14px", borderLeft: "1px solid var(--color-divider)", marginLeft: "-1px" }}><input type="radio" name="rsv-occasion" checked={o.checked} onChange={o.onChange} />{o.label}</label>
              </Fragment>))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "20px" }}>
            <div className="field"><label htmlFor="rsv-name" style={{ fontSize: "13px", letterSpacing: ".01em", color: "#4B5345", marginBottom: "8px" }}>{t.form.name}</label><input className="input" id="rsv-name" type="text" required autoComplete="name" maxLength={80} value={f.name} onChange={on.name} aria-invalid={req(f.name)} style={{ background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "14px", boxShadow: "inset 0 1px 2px rgba(25,29,22,.06)", minHeight: "50px", fontSize: "16px", boxSizing: "border-box", padding: "0 14px" }} /></div>
            <div className="field"><label htmlFor="rsv-phone" style={{ fontSize: "13px", letterSpacing: ".01em", color: "#4B5345", marginBottom: "8px" }}>{t.form.phone}</label><input className="input" id="rsv-phone" type="tel" required autoComplete="tel" inputMode="tel" maxLength={32} placeholder="+998" value={f.phone} onChange={on.phone} aria-invalid={req(f.phone) || (error === "phone" || undefined)} style={{ background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "14px", boxShadow: "inset 0 1px 2px rgba(25,29,22,.06)", minHeight: "50px", fontSize: "16px", boxSizing: "border-box", padding: "0 14px" }} /></div>
          </div>
          <div className="field"><label htmlFor="rsv-email" style={{ fontSize: "13px", letterSpacing: ".01em", color: "#4B5345", marginBottom: "8px" }}>{t.form.email}</label><input className="input" id="rsv-email" type="email" autoComplete="email" maxLength={120} value={f.email} onChange={on.email} style={{ background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "14px", boxShadow: "inset 0 1px 2px rgba(25,29,22,.06)", minHeight: "50px", fontSize: "16px", boxSizing: "border-box", padding: "0 14px" }} /></div>
          <div className="field"><label htmlFor="rsv-notes" style={{ fontSize: "13px", letterSpacing: ".01em", color: "#4B5345", marginBottom: "8px" }}>{t.form.notes}</label><textarea className="input" id="rsv-notes" rows={3} maxLength={1000} placeholder={t.form.notesPh} value={f.notes} onChange={on.notes} style={{ background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "14px", boxShadow: "inset 0 1px 2px rgba(25,29,22,.06)", fontSize: "16px", boxSizing: "border-box", minHeight: "96px", padding: "12px 14px" }}></textarea></div>
          {(hasError) && (<><p role="alert" style={{ margin: "0", fontSize: "14px", color: "#8A3B2A" }}>{errorText}</p></>)}
          <button className="hv1" type="submit" data-magnet="1" disabled={sending} aria-busy={sending || undefined} style={{ display: "inline-flex", padding: "5px", borderRadius: "999px", cursor: "pointer", textDecoration: "none", boxSizing: "border-box", background: "rgba(255,255,255,.3)", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)", border: "1px solid rgba(255,255,255,.75)", boxShadow: "inset 0 1px 1px rgba(255,255,255,.85),inset 0 -1px 1px rgba(255,255,255,.14),0 10px 30px rgba(16,19,14,.16)", transition: "box-shadow .45s ease", width: "100%" }}><span className="ac2" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "0 24px", borderRadius: "999px", background: "linear-gradient(180deg,#2A3124,#191D16)", color: "#F4F6F1", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "500", letterSpacing: ".02em", whiteSpace: "nowrap", boxShadow: "inset 0 1px 0 rgba(255,255,255,.2)", transition: "transform .25s ease", flex: "1", minHeight: "50px" }}>{submitLabel}</span></button>
          <a className="hv17" href="tel:+998781229922" onClick={trackLink} style={{ alignSelf: "center", color: "#4B5345", textDecoration: "none", fontSize: "14px", padding: "8px 0", borderBottom: "1px solid var(--color-divider)" }}>{t.form.callAlt} +998 78 122 99 22</a>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
            {(bookChips).map((b, _i) => (<Fragment key={_i}>{(b.live) && (<><a className="hv18" href={b.href} target={b.target} rel="noopener" onClick={b.onClick} style={{ display: "inline-flex", alignItems: "center", minHeight: "36px", padding: "0 14px", borderRadius: "999px", background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)", color: "#191D16", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "500", letterSpacing: ".02em" }}>{b.tag}</a></>)}</Fragment>))}
          </div>
        </form>
      </>)}
      {(submitted) && (<>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", paddingTop: "28px" }}>
          <p role="status" style={{ margin: "0", fontSize: "17px", lineHeight: "1.7", color: "#4B5345", maxWidth: "46ch" }}>{doneBody}</p>
          {(failed) && (<><p role="alert" style={{ margin: "0", fontSize: "14px", lineHeight: "1.6", color: "#8A3B2A" }}>{t.rsv.failNote}</p></>)}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,140px),1fr))", borderTop: "1px solid var(--color-divider)", borderLeft: "1px solid var(--color-divider)" }}>
            {(doneRows).map((r, _i) => (<Fragment key={_i}>
              <div style={{ padding: "16px", borderRight: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)", display: "flex", flexDirection: "column", gap: "8px" }}><span style={{ fontSize: "13px", letterSpacing: ".01em", color: "#5A6253" }}>{r.k}</span><span style={{ fontFamily: "var(--font-heading)", fontSize: "24px", lineHeight: "1.1" }}>{r.v}</span></div>
            </Fragment>))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>{status === "manual" && (<><a className="btn btn-primary" href={tgHref} target="_blank" rel="noopener" onClick={trackLink} style={{ borderRadius: "999px", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: "500", letterSpacing: ".01em", padding: "16px 24px", minHeight: "52px", textDecoration: "none" }}>{t.form.again}</a><button type="button" className="btn btn-secondary" onClick={copyMessage} style={{ borderRadius: "999px", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: "500", letterSpacing: ".01em", padding: "16px 20px", minHeight: "52px" }}><span aria-live="polite">{copied ? t.rsv.copied : t.rsv.copy}</span></button></>)}<a className="btn btn-secondary" href="tel:+998781229922" onClick={trackLink} style={{ borderRadius: "999px", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: "500", letterSpacing: ".12em", padding: "16px 20px", minHeight: "52px", textDecoration: "none" }}>+998 78 122 99 22</a></div>
          <button className="btn btn-secondary" type="button" onClick={closeReserve} style={{ borderRadius: "999px", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: "500", letterSpacing: ".01em", padding: "16px 24px", minHeight: "52px", alignSelf: "flex-start" }}>{t.form.doneBtn}</button>
        </div>
      </>)}
    </div>
  </div>
</>
  );
}
