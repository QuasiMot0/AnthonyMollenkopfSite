// Rubik's cube logic for the scroll-driven background cube. No Three.js in here: cubies are
// integer positions (-1, 0, 1) plus a 3×3 integer rotation matrix, so every completed move
// lands on exact values and there is nothing to drift.

// Algorithms the page picks from at random. Standard notation: R L U D F B, each optionally
// followed by ' (counter-clockwise) or 2 (half turn). Add or remove entries freely.
export const ALGORITHMS = [
  { name: 'sune', moves: "R U R' U R U2 R'" },
  { name: 'checkerboard', moves: 'R2 L2 U2 D2 F2 B2' },
  { name: 'superflip', moves: "U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2" },
  { name: 'cube in a cube', moves: "F L F U' R U F2 L2 U' L' B D' B' L2 U" },
];

// true: the cube starts in the scramble the algorithm solves (its inverse), so the moves solve it
// on the way down and the bottom of the page is solved. false: start solved, end scrambled.
export const END_SOLVED = true;

// Colors shared by the 3D cube and the picker previews. Muted and dark so the cube stays a
// background element. From the fixed view you see U (top), F (left) and R (right); the rest
// follow the standard scheme. Keys are "<axis><sign>" in cube coordinates (x right, y up, z front).
export const CUBE_COLORS = {
  body: '#161714',
  ink: '#4A4B45', // outlines
  faces: {
    'y+': '#8C8A83', // U: white
    'z+': '#6E3A31', // F: red
    'x+': '#34496B', // R: blue
    'y-': '#857A4C', // D: yellow
    'z-': '#7A5334', // B: orange
    'x-': '#3D5E45', // L: green
  },
};

export function algorithmByName(name) {
  const algo = ALGORITHMS.find((a) => a.name === name) || ALGORITHMS[0];
  const moves = parseAlgorithm([algo.moves]);
  return { name: algo.name, moves, setup: setupFor(moves) };
}

// A random algorithm, never the same one twice in a row (when there's more than one).
export function pickAlgorithm(previous) {
  const pool = ALGORITHMS.length > 1 ? ALGORITHMS.filter((a) => a.name !== previous?.name) : ALGORITHMS;
  return algorithmByName(pool[Math.floor(Math.random() * pool.length)].name);
}

// Each face: which axis it turns about, which layer (-1 or 1) it moves, and the quarter-turn
// direction of a clockwise turn (seen from that face) as a right-handed rotation about +axis.
// Axes follow Three.js: x right, y up, z toward the viewer (so F is +z).
const FACES = {
  R: { axis: 0, layer: 1, dir: -1 },
  L: { axis: 0, layer: -1, dir: 1 },
  U: { axis: 1, layer: 1, dir: -1 },
  D: { axis: 1, layer: -1, dir: 1 },
  F: { axis: 2, layer: 1, dir: -1 },
  B: { axis: 2, layer: -1, dir: 1 },
};

export function parseMove(token) {
  const m = /^([RLUDFB])(2|')?$/.exec(token.trim());
  if (!m) throw new Error(`Unknown move "${token}". Use R L U D F B with optional ' or 2.`);
  const face = FACES[m[1]];
  const quarters = m[2] === '2' ? 2 * face.dir : m[2] === "'" ? -face.dir : face.dir;
  return {
    label: token.trim(),
    axis: face.axis,
    layer: face.layer,
    quarters, // signed quarter turns about +axis: ±1 or ±2
    weight: Math.abs(quarters), // share of the scroll: a half turn gets twice a quarter turn
  };
}

export function parseAlgorithm(tokens) {
  return tokens.flatMap((t) => t.split(/\s+/)).filter(Boolean).map(parseMove);
}

export function invertMove(move) {
  const face = move.label[0];
  const suffix = Math.abs(move.quarters) === 2 ? '2' : move.label.endsWith("'") ? '' : "'";
  return { ...move, label: face + suffix, quarters: -move.quarters };
}

// Moves applied instantly before the algorithm starts (empty unless END_SOLVED).
export function setupFor(moves) {
  return END_SOLVED ? moves.slice().reverse().map(invertMove) : [];
}

export function isSolved(cubies) {
  return cubies.every((c) => c.pos.every((v, i) => v === c.home[i]) && c.rot.join() === '1,0,0,0,1,0,0,0,1');
}

export function solvedState() {
  const cubies = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubies.push({ home: [x, y, z], pos: [x, y, z], rot: [1, 0, 0, 0, 1, 0, 0, 0, 1] });
      }
    }
  }
  return cubies;
}

export function inLayer(pos, move) {
  return pos[move.axis] === move.layer;
}

// Exact rotation matrix (row-major 3×3) for `quarters` quarter turns about an axis.
function quarterMatrix(axis, quarters) {
  const q = ((quarters % 4) + 4) % 4;
  const c = [1, 0, -1, 0][q];
  const s = [0, 1, 0, -1][q];
  if (axis === 0) return [1, 0, 0, 0, c, -s, 0, s, c];
  if (axis === 1) return [c, 0, s, 0, 1, 0, -s, 0, c];
  return [c, -s, 0, s, c, 0, 0, 0, 1];
}

function mul3(a, b) {
  const out = new Array(9);
  for (let r = 0; r < 3; r++) {
    for (let col = 0; col < 3; col++) {
      out[r * 3 + col] = a[r * 3] * b[col] + a[r * 3 + 1] * b[3 + col] + a[r * 3 + 2] * b[6 + col];
    }
  }
  return out;
}

function apply3(m, v) {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ];
}

// Apply a whole move instantly, in place. Integer math keeps positions and rotations exact.
export function applyMove(cubies, move) {
  const r = quarterMatrix(move.axis, move.quarters);
  for (const c of cubies) {
    if (!inLayer(c.pos, move)) continue;
    c.pos = apply3(r, c.pos);
    c.rot = mul3(r, c.rot);
  }
  return cubies;
}

export const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Map scroll progress p (0–1) to a cube state. Pure: the same p always gives the same state,
// so scrolling up replays the algorithm in reverse and jumping to a nav link lands correctly.
// Returns the cubies after all completed moves, plus the move in progress and its eased angle.
export function stateAt(moves, p, setup = []) {
  const total = moves.reduce((sum, m) => sum + m.weight, 0);
  const t = Math.min(Math.max(p, 0), 1) * total;
  const cubies = solvedState();
  for (const m of setup) applyMove(cubies, m);
  let start = 0;
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    const end = start + move.weight;
    if (t >= end) {
      applyMove(cubies, move);
      start = end;
      continue;
    }
    const fraction = (t - start) / move.weight;
    if (fraction <= 0) return { cubies, move: null, angle: 0, done: i, current: i };
    const angle = easeInOutCubic(fraction) * move.quarters * (Math.PI / 2);
    return { cubies, move, angle, done: i, current: i };
  }
  return { cubies, move: null, angle: 0, done: moves.length, current: moves.length };
}

// Readout text, e.g. "R'  4/7". Between moves it shows the last completed one, or
// "solved" / "scrambled" when no move has started or the cube is actually solved.
export function readout(moves, state) {
  const n = moves.length;
  if (state.move) return `${state.move.label}  ${state.current + 1}/${n}`;
  if (isSolved(state.cubies)) return `solved  ${state.done}/${n}`;
  if (state.done === 0) return `scrambled  0/${n}`;
  return `${moves[state.done - 1].label}  ${state.done}/${n}`;
}

// Sticker colors on the three faces the fixed view shows (U, F, R), for the 2D previews.
// Returns [{ axis, sign, pos, color }] where `color` is a CUBE_COLORS.faces key.
const VISIBLE = [[1, 1], [2, 1], [0, 1]]; // U (+y), F (+z), R (+x)
export function visibleFacelets(cubies) {
  const out = [];
  for (const c of cubies) {
    for (let a = 0; a < 3; a++) {
      if (c.home[a] === 0) continue;
      const home = [0, 0, 0];
      home[a] = c.home[a];
      const n = apply3(c.rot, home); // where this sticker faces now
      for (const [axis, sign] of VISIBLE) {
        if (n[axis] === sign) out.push({ axis, sign, pos: c.pos, color: `${'xyz'[a]}${c.home[a] > 0 ? '+' : '-'}` });
      }
    }
  }
  return out;
}
