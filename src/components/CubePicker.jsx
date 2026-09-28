import { useEffect, useMemo, useRef } from 'react';
import { ALGORITHMS, CUBE_COLORS, algorithmByName, solvedState, stateAt, visibleFacelets } from '../lib/cube.js';

// Same fixed 3/4 view as the 3D cube: 45° around, then 30° down (x right, y up, z front).
const AZ = -Math.PI / 4;
const EL = Math.PI / 6;
function project([x, y, z]) {
  const x1 = x * Math.cos(AZ) + z * Math.sin(AZ);
  const z1 = -x * Math.sin(AZ) + z * Math.cos(AZ);
  const y2 = y * Math.cos(EL) - z1 * Math.sin(EL);
  return [x1, -y2];
}

// Corners of a square of half-size h on the face (axis, sign), centered on a cubie's position.
function square(axis, sign, pos, h) {
  const [b, c] = [0, 1, 2].filter((i) => i !== axis);
  return [[-h, -h], [h, -h], [h, h], [-h, h]]
    .map(([db, dc]) => {
      const p = [0, 0, 0];
      p[axis] = sign * 1.5;
      p[b] = pos[b] + db;
      p[c] = pos[c] + dc;
      return project(p).map((v) => v.toFixed(3)).join(',');
    })
    .join(' ');
}

// Flat drawing of the three visible faces for a cube state. `blank` draws stickers without color.
export function CubePreview({ cubies, blank = false, size = 72 }) {
  const facelets = visibleFacelets(cubies);
  return (
    <svg viewBox="-2.3 -2.5 4.6 5" width={size} height={(size * 5) / 4.6} aria-hidden="true">
      {facelets.map((f, i) => (
        <g key={i}>
          <polygon points={square(f.axis, f.sign, f.pos, 0.5)} fill={CUBE_COLORS.body} stroke={CUBE_COLORS.ink} strokeWidth="0.06" strokeLinejoin="round" />
          <polygon
            points={square(f.axis, f.sign, f.pos, 0.36)}
            fill={blank ? '#2A2B27' : CUBE_COLORS.faces[f.color]}
            stroke={CUBE_COLORS.ink}
            strokeWidth="0.03"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );
}

// Starting-pattern picker shown when the cube is clicked in the hero.
// `current` is the locked pattern's name, or null in random mode.
export default function CubePicker({ current, anchor, onPick, onRandom, onClose }) {
  const panelRef = useRef(null);
  const options = useMemo(
    () =>
      ALGORITHMS.map((a) => {
        const algo = algorithmByName(a.name);
        return { ...algo, cubies: stateAt(algo.moves, 0, algo.setup).cubies };
      }),
    []
  );
  const solved = useMemo(() => solvedState(), []);

  useEffect(() => {
    const panel = panelRef.current;
    (panel?.querySelector('[aria-pressed="true"]') || panel?.querySelector('.cube-option'))?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const onDown = (e) => {
      // Clicks on the cube itself toggle the picker, so leave those to its own handler.
      if (panel && !panel.contains(e.target) && !e.target.closest?.('.scroll-cube-hit')) onClose();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="cube-picker"
      role="dialog"
      aria-label="Choose the cube's starting pattern"
      style={{ left: anchor.x, top: anchor.y }}
    >
      <div className="cube-picker-head mono small">
        <span>starting pattern</span>
        <button type="button" className="cube-picker-close" onClick={onClose} aria-label="Close">×</button>
      </div>
      <div className="cube-picker-grid">
        {options.map((o) => (
          <button
            key={o.name}
            type="button"
            className="cube-option"
            aria-pressed={o.name === current}
            onClick={() => onPick(o.name)}
          >
            <CubePreview cubies={o.cubies} />
            <span className="cube-option-name mono">{o.name}</span>
            <span className="cube-option-meta mono">{o.moves.length} moves</span>
          </button>
        ))}
        <button type="button" className="cube-option random" aria-pressed={!current} onClick={onRandom}>
          <span className="cube-option-random-art">
            <CubePreview cubies={solved} blank />
            <span className="cube-option-q mono" aria-hidden="true">?</span>
          </span>
          <span className="cube-option-name mono">random</span>
          <span className="cube-option-meta mono">changes each visit</span>
        </button>
      </div>
    </div>
  );
}
