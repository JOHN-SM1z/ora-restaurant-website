'use client';

import { useOra } from '@/components/site/OraContext';

export default function CursorRing() {
  const {  } = useOra();
  return (
<div data-cursor-ring="1" aria-hidden="true" style={{ position: "fixed", left: "0", top: "0", width: "40px", height: "40px", margin: "-20px 0 0 -20px", borderRadius: "50%", border: "1px solid rgba(255,255,255,.9)", mixBlendMode: "difference", pointerEvents: "none", zIndex: "300", display: "none", willChange: "transform" }}></div>
  );
}
