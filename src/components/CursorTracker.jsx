import { useEffect, useRef, useState } from 'react';

// A detection box that follows the mouse. It is position: fixed, so it stays with the
// cursor while scrolling. "Jitter" makes it wobble like a real model running at ~12 fps.
const JITTER = true;

export default function CursorTracker() {
  const [pos, setPos] = useState({ x: 0, y: 0, on: false });
  const [noise, setNoise] = useState({ jx: 0, jy: 0, jw: 0, jh: 0, conf: 0.93, drop: false });
  const onRef = useRef(false);

  useEffect(() => {
    // No tracker on touch-only devices.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const move = (e) => {
      onRef.current = true;
      setPos({ x: e.clientX, y: e.clientY, on: true });
    };
    const leave = () => {
      onRef.current = false;
      setPos((p) => ({ ...p, on: false }));
    };
    window.addEventListener('mousemove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);

    let timer;
    if (JITTER) {
      timer = setInterval(() => {
        if (!onRef.current) return;
        const n = (a) => (Math.random() * 2 - 1) * a;
        setNoise((prev) => ({
          jx: n(0.75), jy: n(0.75), jw: n(1), jh: n(1),
          conf: 0.86 + Math.random() * 0.11,
          drop: !prev.drop && Math.random() < 0.008,
        }));
      }, 180);
    }
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
      clearInterval(timer);
    };
  }, []);

  if (!pos.on) return null;
  const w = 28 + noise.jw;
  const h = 28 + noise.jh;
  const opacity = noise.drop ? 0 : 1;
  return (
    <div className="tracker" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }} aria-hidden="true">
      <div className="tracker-box" style={{ left: -w / 2 + noise.jx, top: -h / 2 + noise.jy, width: w, height: h, opacity }} />
      <div className="tracker-dot" />
      <div className="tracker-label mono" style={{ opacity }}>
        cursor {noise.conf.toFixed(2)} · x {Math.round(pos.x + window.scrollX)} y {Math.round(pos.y + window.scrollY)}
      </div>
    </div>
  );
}
