import { useEffect, useState } from 'react';

// Project artwork. `c` holds colors for the current view (edge vs rgb).

export function FerdaArt({ c }) {
  return (
<svg viewBox="0 0 400 240" className="art" aria-label="FERDA project image placeholder">
<rect x="0" y="0" width="400" height="240" fill={c.sky}></rect>
<path d="M0 180 L60 138 L110 158 L170 108 L230 148 L290 118 L350 158 L400 138 L400 240 L0 240 Z" fill={c.a} stroke={c.s} strokeWidth="1.2"></path>
<path d="M40 190 l10 -26 l10 26 Z M80 200 l10 -30 l10 30 Z M300 196 l10 -28 l10 28 Z M340 204 l10 -24 l10 24 Z" fill={c.b} stroke={c.s} strokeWidth="1.2"></path>
<circle cx="250" cy="92" r="30" fill={c.c} stroke={c.s} strokeWidth="1.2"></circle>
<circle cx="278" cy="66" r="24" fill={c.c} stroke={c.s} strokeWidth="1.2"></circle>
<circle cx="232" cy="64" r="20" fill={c.c} stroke={c.s} strokeWidth="1.2"></circle>
<g opacity={c.ov} style={{ transition: "opacity .25s" }}>
<rect x="204" y="36" width="108" height="92" fill="none" stroke="#F2A33A" strokeWidth="2"></rect>
<rect x="204" y="20" width="84" height="16" fill="#F2A33A"></rect>
<text x="209" y="32" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#0D0E0C">smoke 0.94</text>
</g>
</svg>
  );
}

export function CubeArt({ c }) {
  return (
<svg viewBox="0 0 400 240" className="art" aria-label="Rubik's cube tracker image placeholder">
<rect x="0" y="0" width="400" height="240" fill={c.sky}></rect>
<path d="M200 40 L280 80 L200 120 L120 80 Z" fill={c.a} stroke={c.s} strokeWidth="1.2"></path>
<path d="M120 80 L200 120 L200 210 L120 170 Z" fill={c.b} stroke={c.s} strokeWidth="1.2"></path>
<path d="M280 80 L200 120 L200 210 L280 170 Z" fill={c.c} stroke={c.s} strokeWidth="1.2"></path>
<path d="M173 53 L253 93 M147 67 L227 107 M227 53 L147 93 M253 67 L173 107 M120 110 L200 150 M120 140 L200 180 M147 93 L147 183 M173 107 L173 197 M280 110 L200 150 M280 140 L200 180 M253 93 L253 183 M227 107 L227 197" stroke={c.g} strokeWidth="1.5" fill="none"></path>
<g opacity={c.ov} style={{ transition: "opacity .25s" }}>
<circle cx="200" cy="40" r="4" fill="#6FD0DC"></circle><circle cx="280" cy="80" r="4" fill="#6FD0DC"></circle><circle cx="120" cy="80" r="4" fill="#6FD0DC"></circle><circle cx="200" cy="120" r="4" fill="#6FD0DC"></circle><circle cx="120" cy="170" r="4" fill="#6FD0DC"></circle><circle cx="280" cy="170" r="4" fill="#6FD0DC"></circle><circle cx="200" cy="210" r="4" fill="#6FD0DC"></circle>
<path d="M300 60 q30 40 0 80" stroke="#F2A33A" strokeWidth="2" fill="none"></path>
<path d="M294 134 l6 8 l6 -10" stroke="#F2A33A" strokeWidth="2" fill="none"></path>
<rect x="296" y="30" width="62" height="16" fill="#F2A33A"></rect>
<text x="301" y="42" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#0D0E0C">move: R'</text>
</g>
</svg>
  );
}

export function StageArt({ c }) {
  return (
<svg viewBox="0 0 400 240" className="art" aria-label="StageSense image placeholder">
<rect x="0" y="0" width="400" height="240" fill={c.sky}></rect>
<circle cx="150" cy="70" r="22" fill={c.b} stroke={c.s} strokeWidth="1.2"></circle>
<path d="M110 200 L118 124 Q150 100 182 124 L190 200 Z" fill={c.b} stroke={c.s} strokeWidth="1.2"></path>
<path d="M80 200 L220 200 L210 150 L90 150 Z" fill={c.a} stroke={c.s} strokeWidth="1.2"></path>
<path d="M250 120 L260 100 L270 140 L280 90 L290 150 L300 110 L310 130 L320 96 L330 144 L340 118 L350 120" stroke={c.g} strokeWidth="2" fill="none"></path>
<g opacity={c.ov} style={{ transition: "opacity .25s" }}>
<path d="M150 70 L150 110 M126 128 L150 110 L174 128 M126 128 L112 160 M174 128 L190 150" stroke="#6FD0DC" strokeWidth="2" fill="none"></path>
<circle cx="150" cy="70" r="4" fill="#6FD0DC"></circle><circle cx="150" cy="110" r="4" fill="#6FD0DC"></circle><circle cx="126" cy="128" r="4" fill="#6FD0DC"></circle><circle cx="174" cy="128" r="4" fill="#6FD0DC"></circle><circle cx="112" cy="160" r="4" fill="#6FD0DC"></circle><circle cx="190" cy="150" r="4" fill="#6FD0DC"></circle>
<rect x="244" y="74" width="112" height="16" fill="#F2A33A"></rect>
<text x="249" y="86" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#0D0E0C">pace: steady</text>
</g>
</svg>
  );
}

export function SightArt({ c }) {
  return (
<svg viewBox="0 0 400 240" className="art" aria-label="SightPlay image placeholder">
<rect x="0" y="0" width="400" height="240" fill={c.sky}></rect>
<path d="M40 80 L360 80 M40 96 L360 96 M40 112 L360 112 M40 128 L360 128 M40 144 L360 144" stroke={c.g} strokeWidth="1.2"></path>
<ellipse cx="110" cy="120" rx="9" ry="7" fill={c.b} stroke={c.s} strokeWidth="1.2"></ellipse>
<path d="M119 120 L119 70" stroke={c.g} strokeWidth="1.5"></path>
<ellipse cx="170" cy="104" rx="9" ry="7" fill={c.b} stroke={c.s} strokeWidth="1.2"></ellipse>
<path d="M179 104 L179 54" stroke={c.g} strokeWidth="1.5"></path>
<ellipse cx="230" cy="112" rx="9" ry="7" fill={c.b} stroke={c.s} strokeWidth="1.2"></ellipse>
<path d="M239 112 L239 62" stroke={c.g} strokeWidth="1.5"></path>
<ellipse cx="290" cy="88" rx="9" ry="7" fill={c.b} stroke={c.s} strokeWidth="1.2"></ellipse>
<path d="M299 88 L299 38" stroke={c.g} strokeWidth="1.5"></path>
<path d="M40 180 L360 180 L360 215 L40 215 Z" fill={c.a} stroke={c.s} strokeWidth="1.2"></path>
<path d="M80 180 L80 215 M120 180 L120 215 M160 180 L160 215 M200 180 L200 215 M240 180 L240 215 M280 180 L280 215 M320 180 L320 215" stroke={c.g} strokeWidth="1.2"></path>
<g opacity={c.ov} style={{ transition: "opacity .25s" }}>
<rect x="96" y="108" width="28" height="24" fill="none" stroke="#6FD0DC" strokeWidth="2"></rect>
<rect x="156" y="92" width="28" height="24" fill="none" stroke="#6FD0DC" strokeWidth="2"></rect>
<rect x="216" y="100" width="28" height="24" fill="none" stroke="#F2A33A" strokeWidth="2"></rect>
<rect x="276" y="76" width="28" height="24" fill="none" stroke="#6FD0DC" strokeWidth="2"></rect>
<rect x="216" y="84" width="44" height="16" fill="#F2A33A"></rect>
<text x="221" y="96" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#0D0E0C">note</text>
</g>
</svg>
  );
}

export function SpheroArt({ c }) {
  return (
<svg viewBox="0 0 400 240" className="art" aria-label="Sphero Swarm tracking image placeholder">
<rect x="0" y="0" width="400" height="240" fill={c.sky}></rect>
<path d="M25 0 V240" stroke={c.grid} strokeWidth="1"></path><path d="M75 0 V240" stroke={c.grid} strokeWidth="1"></path><path d="M125 0 V240" stroke={c.grid} strokeWidth="1"></path><path d="M175 0 V240" stroke={c.grid} strokeWidth="1"></path><path d="M225 0 V240" stroke={c.grid} strokeWidth="1"></path><path d="M275 0 V240" stroke={c.grid} strokeWidth="1"></path><path d="M325 0 V240" stroke={c.grid} strokeWidth="1"></path><path d="M375 0 V240" stroke={c.grid} strokeWidth="1"></path><path d="M0 20 H400" stroke={c.grid} strokeWidth="1"></path><path d="M0 70 H400" stroke={c.grid} strokeWidth="1"></path><path d="M0 120 H400" stroke={c.grid} strokeWidth="1"></path><path d="M0 170 H400" stroke={c.grid} strokeWidth="1"></path><path d="M0 220 H400" stroke={c.grid} strokeWidth="1"></path>
<path d="M75 70 L125 70" stroke={c.edge} strokeWidth="1.6"></path><path d="M75 70 L125 120" stroke={c.edge} strokeWidth="1.6"></path><path d="M125 70 L125 120" stroke={c.edge} strokeWidth="1.6"></path><path d="M125 120 L125 170" stroke={c.edge} strokeWidth="1.6"></path><path d="M125 70 L160 35" stroke={c.edge} strokeWidth="1.6"></path><path d="M225 120 L275 70" stroke={c.edge} strokeWidth="1.6"></path><path d="M275 70 L325 70" stroke={c.edge} strokeWidth="1.6"></path><path d="M275 70 L240 35" stroke={c.edge} strokeWidth="1.6"></path><path d="M275 70 L310 35" stroke={c.edge} strokeWidth="1.6"></path><path d="M325 70 L325 20" stroke={c.edge} strokeWidth="1.6"></path><path d="M325 70 L375 120" stroke={c.edge} strokeWidth="1.6"></path>
<circle cx="75" cy="70" r="15" fill={c.blue} stroke={c.ring} strokeWidth="1.5"></circle><circle cx="125" cy="70" r="15" fill={c.teal} stroke={c.ring} strokeWidth="1.5"></circle><circle cx="125" cy="120" r="15" fill={c.teal} stroke={c.ring} strokeWidth="1.5"></circle><circle cx="125" cy="170" r="15" fill={c.orange} stroke={c.ring} strokeWidth="1.5"></circle><circle cx="225" cy="120" r="15" fill={c.blue} stroke={c.ring} strokeWidth="1.5"></circle><circle cx="275" cy="70" r="15" fill={c.green} stroke={c.ring} strokeWidth="1.5"></circle><circle cx="325" cy="70" r="15" fill={c.pink} stroke={c.ring} strokeWidth="1.5"></circle>
<g opacity={c.ov} style={{ transition: "opacity .25s" }}><rect x="54" y="49" width="42" height="42" fill="none" stroke="#6FD0DC" strokeWidth="1.4"></rect><rect x="54" y="38" width="30" height="11" fill="#6FD0DC"></rect><text x="57" y="46.5" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#0D0E0C">id 01</text><rect x="104" y="49" width="42" height="42" fill="none" stroke="#6FD0DC" strokeWidth="1.4"></rect><rect x="104" y="38" width="30" height="11" fill="#6FD0DC"></rect><text x="107" y="46.5" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#0D0E0C">id 02</text><rect x="104" y="99" width="42" height="42" fill="none" stroke="#6FD0DC" strokeWidth="1.4"></rect><rect x="104" y="88" width="30" height="11" fill="#6FD0DC"></rect><text x="107" y="96.5" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#0D0E0C">id 03</text><rect x="104" y="149" width="42" height="42" fill="none" stroke="#6FD0DC" strokeWidth="1.4"></rect><rect x="104" y="138" width="30" height="11" fill="#6FD0DC"></rect><text x="107" y="146.5" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#0D0E0C">id 04</text><rect x="204" y="99" width="42" height="42" fill="none" stroke="#6FD0DC" strokeWidth="1.4"></rect><rect x="204" y="88" width="30" height="11" fill="#6FD0DC"></rect><text x="207" y="96.5" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#0D0E0C">id 05</text><rect x="254" y="49" width="42" height="42" fill="none" stroke="#6FD0DC" strokeWidth="1.4"></rect><rect x="254" y="38" width="30" height="11" fill="#6FD0DC"></rect><text x="257" y="46.5" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#0D0E0C">id 06</text><rect x="304" y="49" width="42" height="42" fill="none" stroke="#6FD0DC" strokeWidth="1.4"></rect><rect x="304" y="38" width="30" height="11" fill="#6FD0DC"></rect><text x="307" y="46.5" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#0D0E0C">id 07</text></g>
</svg>
  );
}

// A random Geometry Dash-style wave path: 45° zigzags with random segment lengths,
// kept inside the card. A new path is drawn on every hover.
const WAVE_S = 1.1; // time to cross the card
const FADE_DELAY_S = 1; // trail lingers this long after the run
const FADE_S = 0.4;
function randomWave() {
  let x = -30;
  let y = 50 + Math.random() * 80;
  let up = Math.random() < 0.5;
  const pts = [`M${x} ${y.toFixed(1)}`];
  while (x < 400) {
    const room = up ? y - 20 : 160 - y;
    const d = Math.min(room, 12 + Math.random() * 58);
    x += d;
    y += up ? -d : d;
    pts.push(`L${x.toFixed(1)} ${y.toFixed(1)}`);
    up = !up;
  }
  return pts.join(' ');
}

export function WaveRun() {
  const [d] = useState(randomWave);
  const dur = `${WAVE_S}s`;
  return (
<svg viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ position: "absolute", inset: "0", zIndex: "0", width: "100%", height: "100%", pointerEvents: "none" }}>
<path d={d} pathLength="100" fill="none" stroke="#7d7dff" strokeWidth="5" strokeLinejoin="miter" opacity="0.6" strokeDasharray="100" strokeDashoffset="100"><animate attributeName="stroke-dashoffset" from="100" to="0" dur={dur} fill="freeze"></animate><animate attributeName="opacity" from="0.6" to="0" begin={`${WAVE_S + FADE_DELAY_S}s`} dur={`${FADE_S}s`} fill="freeze"></animate></path>
<g><path d="M14 0 L-8 -9 L-4 0 L-8 9 Z" fill="#7d7dff" stroke="#0D0E0C" strokeWidth="1.5" strokeLinejoin="round"></path><circle cx="2" cy="0" r="2.2" fill="#0D0E0C"></circle><animateMotion dur={dur} fill="freeze" rotate="auto" path={d}></animateMotion></g>
</svg>
  );
}

// The cube scrambles into place over ~1.5s, shows "solved", lingers, then fades out.
const CUBE_SOLVE_S = 1.5;
const CUBE_FADE_DELAY_S = 1;
const CUBE_FADE_S = 0.4;

export function CubeSolve() {
  return (
<svg viewBox="-30 -34 60 66" width="64" height="70" aria-hidden="true" style={{ position: "absolute", right: "16px", top: "46px", pointerEvents: "none", overflow: "visible" }}>
<g>
<g><polygon points="0.0,-30.0 8.7,-25.0 0.0,-20.0 -8.7,-25.0" fill="#ECE9E0" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#2E62C9;#C8412F;#3A9D5D;#ECE9E0" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="26.0,15.0 17.3,20.0 17.3,10.0 26.0,5.0" fill="#C8412F" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#F2C94C;#ECE9E0;#ECE9E0;#C8412F" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="-26.0,15.0 -17.3,20.0 -17.3,10.0 -26.0,5.0" fill="#2E62C9" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#E5784A;#ECE9E0;#2E62C9;#2E62C9" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="-8.7,-25.0 0.0,-20.0 -8.7,-15.0 -17.3,-20.0" fill="#ECE9E0" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#E5784A;#ECE9E0;#E5784A;#ECE9E0" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="26.0,5.0 17.3,10.0 17.3,0.0 26.0,-5.0" fill="#C8412F" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#C8412F;#ECE9E0;#ECE9E0;#C8412F" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="-26.0,5.0 -17.3,10.0 -17.3,0.0 -26.0,-5.0" fill="#2E62C9" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#3A9D5D;#3A9D5D;#ECE9E0;#2E62C9" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="-17.3,-20.0 -8.7,-15.0 -17.3,-10.0 -26.0,-15.0" fill="#ECE9E0" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#C8412F;#ECE9E0;#E5784A;#ECE9E0" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="26.0,-5.0 17.3,0.0 17.3,-10.0 26.0,-15.0" fill="#C8412F" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#3A9D5D;#ECE9E0;#E5784A;#C8412F" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="-26.0,-5.0 -17.3,0.0 -17.3,-10.0 -26.0,-15.0" fill="#2E62C9" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#ECE9E0;#C8412F;#F2C94C;#2E62C9" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="8.7,-25.0 17.3,-20.0 8.7,-15.0 0.0,-20.0" fill="#ECE9E0" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#F2C94C;#E5784A;#ECE9E0;#ECE9E0" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="17.3,20.0 8.7,25.0 8.7,15.0 17.3,10.0" fill="#C8412F" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#E5784A;#E5784A;#3A9D5D;#C8412F" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="-17.3,20.0 -8.7,25.0 -8.7,15.0 -17.3,10.0" fill="#2E62C9" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#ECE9E0;#C8412F;#ECE9E0;#2E62C9" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="0.0,-20.0 8.7,-15.0 0.0,-10.0 -8.7,-15.0" fill="#ECE9E0" stroke="#0D0E0C" strokeWidth="1.2"></polygon><polygon points="17.3,10.0 8.7,15.0 8.7,5.0 17.3,0.0" fill="#C8412F" stroke="#0D0E0C" strokeWidth="1.2"></polygon><polygon points="-17.3,10.0 -8.7,15.0 -8.7,5.0 -17.3,0.0" fill="#2E62C9" stroke="#0D0E0C" strokeWidth="1.2"></polygon><polygon points="-8.7,-15.0 0.0,-10.0 -8.7,-5.0 -17.3,-10.0" fill="#ECE9E0" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#E5784A;#C8412F;#2E62C9;#ECE9E0" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="17.3,0.0 8.7,5.0 8.7,-5.0 17.3,-10.0" fill="#C8412F" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#3A9D5D;#C8412F;#E5784A;#C8412F" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="-17.3,0.0 -8.7,5.0 -8.7,-5.0 -17.3,-10.0" fill="#2E62C9" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#ECE9E0;#E5784A;#2E62C9;#2E62C9" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="17.3,-20.0 26.0,-15.0 17.3,-10.0 8.7,-15.0" fill="#ECE9E0" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#E5784A;#F2C94C;#C8412F;#ECE9E0" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="8.7,25.0 0.0,30.0 0.0,20.0 8.7,15.0" fill="#C8412F" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#ECE9E0;#E5784A;#E5784A;#C8412F" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="-8.7,25.0 0.0,30.0 0.0,20.0 -8.7,15.0" fill="#2E62C9" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#F2C94C;#C8412F;#2E62C9;#2E62C9" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="8.7,-15.0 17.3,-10.0 8.7,-5.0 0.0,-10.0" fill="#ECE9E0" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#ECE9E0;#E5784A;#F2C94C;#ECE9E0" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="8.7,15.0 0.0,20.0 0.0,10.0 8.7,5.0" fill="#C8412F" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#ECE9E0;#E5784A;#ECE9E0;#C8412F" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="-8.7,15.0 0.0,20.0 0.0,10.0 -8.7,5.0" fill="#2E62C9" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#E5784A;#C8412F;#3A9D5D;#2E62C9" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="0.0,-10.0 8.7,-5.0 0.0,0.0 -8.7,-5.0" fill="#ECE9E0" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#F2C94C;#E5784A;#3A9D5D;#ECE9E0" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="8.7,5.0 0.0,10.0 0.0,0.0 8.7,-5.0" fill="#C8412F" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#2E62C9;#3A9D5D;#E5784A;#C8412F" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><polygon points="-8.7,5.0 0.0,10.0 0.0,0.0 -8.7,-5.0" fill="#2E62C9" stroke="#0D0E0C" strokeWidth="1.2"><animate attributeName="fill" values="#3A9D5D;#2E62C9;#2E62C9;#2E62C9" keyTimes="0;0.3;0.6;1" dur="1.4s" calcMode="discrete" fill="freeze"></animate></polygon><animateTransform attributeName="transform" type="rotate" values="0;-8;6;-4;0" keyTimes="0;0.3;0.6;0.85;1" dur="1.4s" fill="freeze"></animateTransform></g>
<text x="0" y="40" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="7" fill="#5BC27A" opacity="0">solved<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.95;1" dur="1.5s" fill="freeze"></animate></text>
<animate attributeName="opacity" from="1" to="0" begin={`${CUBE_SOLVE_S + CUBE_FADE_DELAY_S}s`} dur={`${CUBE_FADE_S}s`} fill="freeze"></animate></g>
</svg>
  );
}

// Für Elise opening, as [note, length in eighth notes]. Played once per hover on a small
// keyboard (C4–E5), each key glowing while its note sounds. Visual only, no audio.
const FUR_ELISE = [
  ['E5', 1], ['D#5', 1], ['E5', 1], ['D#5', 1], ['E5', 1], ['B4', 1], ['D5', 1], ['C5', 1], ['A4', 3],
  ['C4', 1], ['E4', 1], ['A4', 1], ['B4', 3],
  ['E4', 1], ['G#4', 1], ['B4', 1], ['C5', 3],
  ['E4', 1], ['E5', 1], ['D#5', 1], ['E5', 1], ['D#5', 1], ['E5', 1], ['B4', 1], ['D5', 1], ['C5', 1], ['A4', 3],
];
const EIGHTH_MS = 190;
const PIANO_FADE_DELAY_MS = 1000; // keyboard lingers this long after the last note
const WHITE_KEYS = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5'];
// Black keys sit on the boundary after the white key at this index.
const BLACK_KEYS = [['C#4', 0], ['D#4', 1], ['F#4', 3], ['G#4', 4], ['A#4', 5], ['C#5', 7], ['D#5', 8]];
const KW = 11; // white key width
const KH = 34; // white key height

export function PianoPlay() {
  const [active, setActive] = useState(null);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timers = [];
    let t = 150;
    for (const [note, len] of FUR_ELISE) {
      timers.push(setTimeout(() => setActive(note), t));
      // release slightly early so repeated notes (E5 D#5 E5) visibly re-strike
      timers.push(setTimeout(() => setActive((n) => (n === note ? null : n)), t + len * EIGHTH_MS - 40));
      t += len * EIGHTH_MS;
    }
    timers.push(setTimeout(() => setFading(true), t + PIANO_FADE_DELAY_MS));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
<svg className={fading ? 'piano-play fading' : 'piano-play'} viewBox={`-1 -1 ${WHITE_KEYS.length * KW + 2} ${KH + 2}`} width="112" height="36" aria-hidden="true">
{WHITE_KEYS.map((n, i) => (
<rect key={n} className={active === n ? 'pk white on' : 'pk white'} x={i * KW} y="0" width={KW} height={KH} rx="1.5"></rect>
))}
{BLACK_KEYS.map(([n, i]) => (
<rect key={n} className={active === n ? 'pk black on' : 'pk black'} x={(i + 1) * KW - 3.5} y="0" width="7" height="21" rx="1"></rect>
))}
</svg>
  );
}
