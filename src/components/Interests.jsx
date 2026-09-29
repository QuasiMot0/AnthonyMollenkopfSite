import { useEffect, useState } from 'react';
import { interests } from '../data.js';
import { WaveRun, CubeSolve, PianoPlay } from './Art.jsx';

const ICONS = {
  golf: <><path d="M9 21V3l8 4-8 4" /><path d="M4 21h14" /></>,
  soccer: <><circle cx="12" cy="12" r="9" /><path d="M12 7l4 3-1.5 4.5h-5L8 10z" /><path d="M12 3v4M21 10l-5 0M3 10h5M6 19l3.5-4.5M18 19l-3.5-4.5" /></>,
  cube: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9" /></>,
  piano: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M8 5v14M13 5v14M18 5v14" /><path d="M6 5v8M10.5 5v8M15.5 5v8" /></>,
  gd: <><rect x="5" y="5" width="14" height="14" /><rect x="9" y="9" width="6" height="6" /><path d="M5 5l4 4M19 5l-4 4M5 19l4-4M19 19l-4-4" /></>,
  study: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5M9 8h6M9 11h4" /></>,
};

function Body({ body }) {
  if (typeof body === 'string') return body;
  return body.map((part, i) =>
    typeof part === 'string' ? (
      part
    ) : (
      <a key={i} href={part.href} {...(part.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
        {part.text}
      </a>
    )
  );
}

// Small detection box shown while a card is hovered. Like the cursor tracker, its edges
// jitter, it drops out now and then, and the confidence flickers like a live model.
function Detect({ label }) {
  const [n, setN] = useState({ t: 0, r: 0, b: 0, l: 0, conf: 0.93, drop: false });
  useEffect(() => {
    const j = (a) => (Math.random() * 2 - 1) * a;
    const t = setInterval(
      () => setN((prev) => ({
        t: j(1), r: j(1), b: j(1), l: j(1),
        conf: 0.86 + Math.random() * 0.11,
        drop: !prev.drop && Math.random() < 0.008,
      })),
      180
    );
    return () => clearInterval(t);
  }, []);
  const style = {
    top: 8 + n.t, right: -16 + n.r, bottom: -8 + n.b, left: -16 + n.l,
    opacity: n.drop ? 0 : 1,
  };
  return (
    <div className="interest-detect" style={style} aria-hidden="true">
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />
      <span className="interest-detect-label mono">{label} · {n.conf.toFixed(2)}</span>
    </div>
  );
}

function InterestCard({ it }) {
  const [on, setOn] = useState(false);
  return (
    <div className="interest" onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      {on && <Detect label={it.label} />}
      {on && it.anim === 'wave' && <WaveRun />}
      {on && it.anim === 'cube' && <CubeSolve />}
      {on && it.anim === 'piano' && <PianoPlay />}
      <div className="interest-head">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {ICONS[it.icon]}
        </svg>
        <span className="mono interest-label">{it.label}</span>
      </div>
      <div className="interest-body">
        {it.stat && <span className="stat mono">{it.stat}</span>}
        <Body body={it.body} />
      </div>
    </div>
  );
}

export default function Interests() {
  return (
    <section id="aux" className="section aux">
      <h2 className="section-label mono">Interests</h2>
      <div className="interest-grid">
        {interests.map((it) => (
          <InterestCard key={it.id} it={it} />
        ))}
      </div>
    </section>
  );
}
