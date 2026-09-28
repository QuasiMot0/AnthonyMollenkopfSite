// All site content lives here. Edit text, links and colors without touching layout code.

export const skills = [
  { label: 'languages', items: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'R', 'SQL'] },
  { label: 'vision / ml', accent: true, items: ['OpenCV', 'PyTorch', 'YOLOv8', 'MediaPipe', 'solvePnP', 'AprilTag'] },
  { label: 'web / apps', items: ['React', 'three.js', 'WebSockets', 'Web MIDI API', 'Tkinter', 'VexFlow'] },
  { label: 'tools', items: ['Git', 'GitHub', 'Linux', 'VS Code', 'Cursor', 'JUnit'] },
  {
    label: 'research interests',
    accent: true,
    items: ['real-time multi-object tracking', '3D pose estimation', 'robotics perception', 'aerial & remote sensing', 'edge inference', 'dataset curation'],
  },
];

// Colors used when a project frame is in "edge" view vs hovered ("rgb" view).
const EDGE = { sky: '#0F100E', a: 'none', b: 'none', c: 'none', g: '#6E6C65', s: '#8C8A82', ov: 0 };
const rgb = (c) => ({ s: '#0D0E0C', ov: 1, ...c });

// `featured: true` projects render as large alternating rows; the rest share a compact row below.
export const projects = [
  {
    id: 'cube',
    featured: true,
    art: 'CubeArt',
    tag: 'CV · pose + tracking',
    title: "Rubik's Cube Tracker",
    body: "Reconstructs full cube state from a webcam alone, using a custom YOLOv8-pose model, solvePnP and MediaPipe hand tracking. Kociemba's algorithm fills in moves hidden by occlusion.",
    link: { href: 'https://github.com/QuasiMot0/CV_Rubiks_Cube', label: 'view on github →' },
    placeholder: '[replace with tracker frame]',
    edge: EDGE,
    rgb: rgb({ sky: '#1B1C1A', a: '#E9E6DC', b: '#C8412F', c: '#2E62C9', g: '#0D0E0C' }),
  },
  {
    id: 'sphero',
    featured: true,
    art: 'SpheroArt',
    tag: 'CV · multi-object tracking',
    title: 'Sphero Swarm',
    body: "As Perceptions Lead, I built the club's real-time multi-object tracker with YOLOv8 and an OAK-D camera. It follows 30+ robots at once with unique IDs, latency measurement and a debug GUI. An AprilTag pipeline uses homography to turn the camera view into a top-down map of the arena.",
    link: { href: 'https://spheroswarm.com/#media', label: 'see the swarm →' },
    placeholder: '[replace with tracker GUI]',
    edge: { sky: '#0F100E', grid: '#1C1D1A', edge: '#5A5953', ring: '#8C8A82', blue: 'none', teal: 'none', green: 'none', pink: 'none', orange: 'none', ov: 0 },
    rgb: { sky: '#111A20', grid: '#1E2A31', edge: '#A89048', ring: '#DDE6EA', blue: '#7A9BF0', teal: '#6FA8A0', green: '#8AD3C0', pink: '#E393CC', orange: '#E5784A', ov: 1 },
  },
  {
    id: 'ferda',
    art: 'FerdaArt',
    tag: 'CV · segmentation',
    title: 'FERDA',
    body: 'Fine-tuned YOLOv8 instance segmentation on a custom-labeled smoke dataset (0.90 box / 0.95 mask mAP50), then projected estimated fire locations from 2D aerial imagery.',
    placeholder: '[replace with drone frame]',
    edge: EDGE,
    rgb: rgb({ sky: '#26313A', a: '#2F3B2A', b: '#1F2A1C', c: '#8E8B84', g: '#6E6C65' }),
  },
  {
    id: 'sight',
    art: 'SightArt',
    tag: 'full-stack · music',
    title: 'SightPlay',
    body: 'A full-stack sight-reading trainer with four drill modes (flash cards, sheet music, interval recognition and measure-by-measure practice) and real-time sheet music rendering. Accounts sync across devices through JWT auth with Google OAuth, backed by Postgres and Redis and deployed with Docker and nginx.',
    link: { href: 'https://github.com/drep2718/sightplay', label: 'view on github →' },
    placeholder: '[replace with app screenshot]',
    edge: EDGE,
    rgb: rgb({ sky: '#E9E6DC', a: '#FFFFFF', b: '#141413', c: '#141413', g: '#141413' }),
  },
  {
    id: 'stage',
    art: 'StageArt',
    tag: 'AI · team of 4',
    title: 'StageSense',
    body: 'A 4-person team built an AI speech coach with real-time feedback on delivery, pacing and filler words. I built frontend components and integrated speech-to-text.',
    placeholder: '[replace with app screenshot]',
    edge: EDGE,
    rgb: rgb({ sky: '#231E28', a: '#5A4632', b: '#3B3F4A', c: '#3B3F4A', g: '#F2A33A' }),
  },
];

// `anim` picks a hover animation: 'wave' or 'cube'. `body` may contain links (see Interests.jsx).
export const interests = [
  { id: 'golf', icon: 'golf', label: 'golf', body: 'Spent 2024–25 on the grounds crew at Victoria National, a top-50 U.S. course.' },
  { id: 'sports', icon: 'soccer', label: 'sports', body: 'Played soccer and still keep up with the Premier League as a Manchester City fan. Pole vaulted in high school and still follow the pros.' },
  { id: 'cube', icon: 'cube', label: 'speedcubing', anim: 'cube', stat: 'PR 15.086 s', body: "The hobby behind the Rubik's cube move tracker." },
  { id: 'piano', icon: 'piano', label: 'piano', body: [
    'I was learning to read sheet music and figured there had to be a better way to practice, so I built ',
    { href: '#inference', text: 'SightPlay' }, '.',
  ] },
  { id: 'gd', icon: 'gd', label: 'geometry_dash', anim: 'wave', body: [
    "I'm big into Geometry Dash, which led me to build ",
    { href: 'https://github.com/QuasiMot0/GDRankingGame', text: 'GD Ranking Game' },
    ", where you try to sort the game's hardest levels into their real order.",
  ] },
  { id: 'study', icon: 'study', label: 'studying', body: [
    'I was struggling in CS 252 and knew I had the skills to build a better way to study, so I made a ',
    { href: 'https://cs252-study.vercel.app', text: '900+ question practice site' },
    ". I posted it on the class discussion board and it caught the TAs' attention.",
  ] },
];

export const contacts = [
  { label: 'email', value: 'anthony.mollenkopf.06@gmail.com', href: 'mailto:anthony.mollenkopf.06@gmail.com' },
  { label: 'github', value: 'QuasiMot0', href: 'https://github.com/QuasiMot0' },
  { label: 'linkedin', value: 'anthony-mollenkopf', href: 'https://linkedin.com/in/anthony-mollenkopf' },
  { label: 'resume', value: 'download PDF ↓', href: '/resume.pdf', download: true },
];
