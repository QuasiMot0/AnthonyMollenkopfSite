import { useEffect, useRef, useState } from 'react';
import { ALGORITHMS, CUBE_COLORS, algorithmByName, easeInOutCubic, pickAlgorithm, readout, solvedState, stateAt, inLayer } from '../lib/cube.js';
import CubePicker from './CubePicker.jsx';

// Look (colors are shared with the picker previews, see CUBE_COLORS in cube.js)
const BODY = CUBE_COLORS.body;
const FACE_COLORS = CUBE_COLORS.faces;
const INK = CUBE_COLORS.ink;
const OUTLINE_PX = 3; // outline thickness at full (centered) size; ~2px in the hero
const STICKER_OUTLINE = 0.03; // sticker ring width, in cubie units
const SIZE = 0.96; // cubie edge (spacing is 1, so this leaves a small gap)
const RADIUS = 0.1;
const STICKER_SIZE = 0.78;
const VIEW = 2.8; // half-height of the orthographic view, in cubie units
const ELEVATION = (30 * Math.PI) / 180; // fixed 3/4 view: looking down 30°...
const AZIMUTH = (45 * Math.PI) / 180; // ...and 45° around, so three faces show

// Scroll layout. The canvas is rendered at its centered size and scaled down in the hero,
// so it's never scaled up (which would blur it). Widths come from CSS (.scroll-cube).
const LAYOUT = {
  wide: { heroPx: 480, heroOpacity: 0.55, centerOpacity: 0.32 },
  narrow: { heroPx: 340, heroOpacity: 0.35, centerOpacity: 0.2 }, // under 1000px
};


// The visitor's chosen pattern, remembered in this browser. null means random mode.
const STORAGE_KEY = 'cube-pattern';
function loadLocked() {
  try {
    const name = window.localStorage.getItem(STORAGE_KEY);
    return ALGORITHMS.some((a) => a.name === name) ? name : null;
  } catch {
    return null;
  }
}
function saveLocked(name) {
  try {
    if (name) window.localStorage.setItem(STORAGE_KEY, name);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage blocked (private mode etc.): the choice still holds for this visit
  }
}

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.min(Math.max(v, 0), 1);

// Everything the cube shows is a pure function of scroll position:
//  - exit: 0 at the top, 1 once the hero has scrolled away (eased) → slide + scale + fade
//  - algo: 0 until the hero is gone, then 0–1 over the rest of the page → the algorithm
function scrollState(reduced) {
  const hero = document.getElementById('input');
  const heroH = hero ? hero.offsetHeight : window.innerHeight;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const y = window.scrollY;
  if (reduced) return { exit: 1, algo: 1 }; // static and solved
  return {
    exit: easeInOutCubic(clamp01(y / heroH)),
    algo: max > heroH ? clamp01((y - heroH) / (max - heroH)) : 0,
  };
}

function roundedRect(THREE, size, radius) {
  const h = size / 2;
  const s = new THREE.Shape();
  s.moveTo(-h + radius, -h);
  s.lineTo(h - radius, -h);
  s.quadraticCurveTo(h, -h, h, -h + radius);
  s.lineTo(h, h - radius);
  s.quadraticCurveTo(h, h, h - radius, h);
  s.lineTo(-h + radius, h);
  s.quadraticCurveTo(-h, h, -h, h - radius);
  s.lineTo(-h, -h + radius);
  s.quadraticCurveTo(-h, -h, -h + radius, -h);
  return new THREE.ShapeGeometry(s, 6);
}

// Builds the scene. Returns { draw(state), dispose() }; it only renders when draw is called.
function createScene(THREE, RoundedBoxGeometry, canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  // Orthographic, so outlines are the same pixel width everywhere on the cube.
  const camera = new THREE.OrthographicCamera(-VIEW, VIEW, VIEW, -VIEW, 0.1, 30);
  camera.position.set(0, 0, 10);
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const light = new THREE.DirectionalLight(0xffffff, 1.1);
  light.position.set(-3, 5, 6);
  scene.add(light);

  // Cel shading: three hard bands.
  const gradient = new THREE.DataTexture(new Uint8Array([70, 150, 255]), 3, 1, THREE.RedFormat);
  gradient.minFilter = THREE.NearestFilter;
  gradient.magFilter = THREE.NearestFilter;
  gradient.generateMipmaps = false;
  gradient.needsUpdate = true;

  const bodyMat = new THREE.MeshToonMaterial({ color: BODY, gradientMap: gradient });
  const stickerMats = Object.fromEntries(
    Object.entries(FACE_COLORS).map(([k, color]) => [k, new THREE.MeshToonMaterial({ color, gradientMap: gradient })])
  );
  const hullMat = new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide });
  const ringMat = new THREE.MeshBasicMaterial({ color: INK });

  const bodyGeo = new RoundedBoxGeometry(SIZE, SIZE, SIZE, 4, RADIUS);
  const stickerGeo = roundedRect(THREE, STICKER_SIZE, 0.1);
  const ringGeo = roundedRect(THREE, STICKER_SIZE + 2 * STICKER_OUTLINE, 0.1 + STICKER_OUTLINE);

  // Fixed 3/4 view. The whole cube never rotates; only the layer being turned moves.
  const view = new THREE.Group();
  view.rotation.set(ELEVATION, -AZIMUTH, 0, 'XYZ');
  scene.add(view);

  const hulls = [];
  const zAxis = new THREE.Vector3(0, 0, 1);
  const cubies = solvedState().map((c) => {
    const g = new THREE.Group();
    g.matrixAutoUpdate = false;
    g.add(new THREE.Mesh(bodyGeo, bodyMat));
    // Inverted hull: a slightly larger back-face-only copy reads as a thick, even outline.
    const hull = new THREE.Mesh(bodyGeo, hullMat);
    hulls.push(hull);
    g.add(hull);
    // Stickers on each outer face, each with its own thinner outline ring behind it.
    for (let axis = 0; axis < 3; axis++) {
      if (c.home[axis] === 0) continue;
      const n = new THREE.Vector3();
      n.setComponent(axis, c.home[axis]);
      const q = new THREE.Quaternion().setFromUnitVectors(zAxis, n);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.quaternion.copy(q);
      ring.position.copy(n).multiplyScalar(SIZE / 2 + 0.002);
      const sticker = new THREE.Mesh(stickerGeo, stickerMats[`${'xyz'[axis]}${c.home[axis] > 0 ? '+' : '-'}`]);
      sticker.quaternion.copy(q);
      sticker.position.copy(n).multiplyScalar(SIZE / 2 + 0.004);
      g.add(ring, sticker);
    }
    view.add(g);
    return g;
  });

  const base = new THREE.Matrix4();
  const turn = new THREE.Matrix4();
  const axes = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
  let lastState = null;

  function draw(state = lastState) {
    if (!state) return;
    lastState = state;
    if (state.move) turn.makeRotationAxis(axes[state.move.axis], state.angle);
    state.cubies.forEach((c, i) => {
      const r = c.rot;
      base.set(r[0], r[1], r[2], c.pos[0], r[3], r[4], r[5], c.pos[1], r[6], r[7], r[8], c.pos[2], 0, 0, 0, 1);
      if (state.move && inLayer(c.pos, state.move)) base.premultiply(turn);
      cubies[i].matrix.copy(base);
      cubies[i].matrixWorldNeedsUpdate = true;
    });
    renderer.render(scene, camera);
  }

  function resize() {
    const size = canvas.clientWidth;
    if (!size) return;
    renderer.setSize(size, size, false);
    const pxPerUnit = size / (2 * VIEW);
    const scale = 1 + OUTLINE_PX / pxPerUnit / (SIZE / 2);
    for (const h of hulls) h.scale.setScalar(scale);
    draw();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  return {
    draw,
    dispose() {
      ro.disconnect();
      [bodyGeo, stickerGeo, ringGeo].forEach((g) => g.dispose());
      [bodyMat, hullMat, ringMat, ...Object.values(stickerMats)].forEach((m) => m.dispose());
      gradient.dispose();
      renderer.dispose();
    },
  };
}

// Scroll-driven 3D cube behind the page content. Hidden under 720px wide.
export default function ScrollCube() {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const readoutRef = useRef(null);
  const hitRef = useRef(null);
  // The current algorithm lives in a ref so the scroll handler and the picker share it.
  // Random mode (default): a random one on every load and a new one after each trip to the bottom.
  // Picking a specific pattern locks it, across reloads too, until the visitor picks another or random.
  const lockedRef = useRef(undefined);
  if (lockedRef.current === undefined) lockedRef.current = loadLocked();
  const algorithmRef = useRef(null);
  if (!algorithmRef.current) algorithmRef.current = lockedRef.current ? algorithmByName(lockedRef.current) : pickAlgorithm();
  const scheduleRef = useRef(() => {});
  const hoverRef = useRef(false);
  const [picker, setPicker] = useState(null); // null, or { x, y } where the panel is centered
  const [enabled, setEnabled] = useState(() => window.matchMedia('(min-width: 721px)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 721px)');
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const box = boxRef.current;
    const readoutEl = readoutRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrowMq = window.matchMedia('(max-width: 1000px)');
    let scene = null;
    let cancelled = false;
    let raf = 0;
    let lastText = '';
    // Each time the bottom is reached (cube solved), a new algorithm is picked, so scrolling back
    // up builds a different scramble. The swap is invisible: every algorithm ends solved.
    let atBottom = false;
    const hit = hitRef.current;

    // Reads first, then writes, once per frame.
    function update() {
      raf = 0;
      const { exit, algo } = scrollState(reduced);
      const cfg = narrowMq.matches ? LAYOUT.narrow : LAYOUT.wide;
      const vw = document.documentElement.clientWidth;
      const size = box.offsetWidth; // centered (full) size, from CSS
      const textMax = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--text-max')) || 1100;

      // Hero spot: right edge lined up with the content column, vertically centered.
      const heroScale = cfg.heroPx / size;
      const rightEdge = vw - Math.max(24, (vw - textMax) / 2 - 64);
      const heroDx = rightEdge - cfg.heroPx / 2 - vw / 2;
      const dx = lerp(heroDx, 0, exit);
      const scale = lerp(heroScale, 1, exit);

      box.style.transform = `translate(-50%, -50%) translateX(${dx.toFixed(1)}px) scale(${scale.toFixed(4)})`;
      const hovered = hoverRef.current && exit < 0.02;
      box.style.opacity = (lerp(cfg.heroOpacity, cfg.centerOpacity, exit) + (hovered ? 0.15 : 0)).toFixed(3);

      // Click target over the cube, only on the landing screen (the cube is behind the content).
      const inHero = !reduced && exit < 0.02;
      hit.style.display = inHero ? 'block' : 'none';
      if (inHero) {
        const hitSize = cfg.heroPx * 0.8; // the cube fills about 80% of its canvas
        hit.style.width = hit.style.height = `${hitSize}px`;
        hit.style.transform = `translate(-50%, -50%) translateX(${dx.toFixed(1)}px)`;
      } else if (exit > 0.05) {
        setPicker(null); // scrolled away from the landing screen
      }
      // Readout sits just under the cube (the cube fills ~90% of the canvas height).
      const below = (size * scale) / 2 - 12;
      readoutEl.style.transform = `translate(-50%, 0) translate(${dx.toFixed(1)}px, ${below.toFixed(1)}px)`;

      if (!reduced) {
        if (algo >= 0.998 && !atBottom) {
          atBottom = true;
          if (!lockedRef.current) algorithmRef.current = pickAlgorithm(algorithmRef.current);
        } else if (algo < 0.99) {
          atBottom = false;
        }
      }
      const algorithm = algorithmRef.current;
      const state = stateAt(algorithm.moves, algo, algorithm.setup);
      const text = `${algorithm.name}  ${readout(algorithm.moves, state)}`;
      if (text !== lastText) readoutEl.textContent = lastText = text;
      scene?.draw(state);
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    scheduleRef.current = schedule;

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    narrowMq.addEventListener('change', schedule);

    // Load three.js after first paint so it never blocks the page.
    const start = async () => {
      const [THREE, { RoundedBoxGeometry }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/geometries/RoundedBoxGeometry.js'),
      ]);
      if (cancelled || !canvasRef.current) return;
      scene = createScene(THREE, RoundedBoxGeometry, canvasRef.current);
      update();
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 200);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      narrowMq.removeEventListener('change', schedule);
      scene?.dispose();
    };
  }, [enabled]);

  function openPicker() {
    // Center the panel on the cube, but keep it inside the viewport (it's up to 400px wide).
    const r = hitRef.current.getBoundingClientRect();
    const half = Math.min(400, window.innerWidth - 48) / 2 + 16;
    const x = Math.min(Math.max(r.left + r.width / 2, half), window.innerWidth - half);
    setPicker((open) => (open ? null : { x, y: r.top + r.height / 2 }));
  }
  function choose(algorithm, locked) {
    lockedRef.current = locked;
    saveLocked(locked);
    algorithmRef.current = algorithm;
    setPicker(null);
    scheduleRef.current();
    hitRef.current?.focus();
  }
  const setHover = (on) => {
    hoverRef.current = on;
    scheduleRef.current();
  };

  if (!enabled) return null;
  return (
    <>
      <div ref={boxRef} className="scroll-cube" aria-hidden="true">
        <canvas ref={canvasRef} />
      </div>
      <div ref={readoutRef} className="scroll-cube-readout mono" aria-hidden="true" />
      <button
        ref={hitRef}
        type="button"
        className="scroll-cube-hit"
        aria-label="Choose the cube's starting pattern"
        aria-expanded={!!picker}
        title="Choose a starting pattern"
        onClick={openPicker}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      />
      {picker && (
        <CubePicker
          current={lockedRef.current}
          anchor={picker}
          onPick={(name) => choose(algorithmByName(name), name)}
          onRandom={() => choose(pickAlgorithm(algorithmRef.current), null)}
          onClose={() => {
            setPicker(null);
            hitRef.current?.focus();
          }}
        />
      )}
    </>
  );
}
