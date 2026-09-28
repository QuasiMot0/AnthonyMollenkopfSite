import { skills, contacts } from '../data.js';

// Section ids are kept stable because links in data.js point at them (e.g. '#inference').
const NAV = [
  ['#features', 'About'],
  ['#inference', 'Projects'],
  ['#aux', 'Interests'],
  ['#output', 'Contact'],
];

export function Header() {
  return (
    <header className="topbar mono">
      <a className="brand" href="#input">anthony.cv</a>
      <nav className="nav">
        {NAV.map(([href, text]) => (
          <a key={href} href={href}>{text}</a>
        ))}
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section id="input" className="section hero">
      <div className="scan" aria-hidden="true" />
      <div className="hero-box">
        <div className="draw hero-frame" aria-hidden="true" />
        <div className="draw hero-label mono">person: anthony_mollenkopf · 0.99</div>
        <h1>Anthony</h1>
      </div>
      <p className="lede">
        CS student at Purdue building real-time computer vision systems. Perceptions Lead for the Sphero Swarm Club.
      </p>
      <dl className="status mono">
        <div>
          <dt>status</dt>
          <dd>open to computer vision &amp; ML internships</dd>
        </div>
        <div>
          <dt>currently</dt>
          <dd>turning the Rubik's cube tracker into a research paper</dd>
        </div>
      </dl>
      <div className="cta">
        <a className="btn primary mono" href="#inference">See projects</a>
        <a className="btn mono" href="#output">Contact</a>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="features" className="section about">
      <h2 className="section-label mono">About</h2>
      <div className="about-grid">
        <div className="about-main">
          <p className="body-lg measure">
            I'm a computer science student at Purdue (B.S., May 2028) who likes making cameras understand what they're
            looking at, in real time. So far that's meant custom-trained YOLOv8 models, pose estimation, multi-object
            tracking, and the GUIs and pipelines that make them usable.
          </p>
          <div className="experience measure">
            <div className="row between mono small muted">
              <span>experience</span>
              <span>Sep 2025 – present</span>
            </div>
            <div className="experience-title">Perceptions Lead, Sphero Swarm Club</div>
            <p className="body-sm">
              Built a real-time multi-object tracker with YOLOv8 and OAK-D that handles 30+ objects with unique IDs, plus
              an AprilTag pipeline that uses homography to produce a top-down view of the arena.
            </p>
          </div>
        </div>
        <dl className="skills">
          {skills.map((g) => (
            <div key={g.label} className="skill-group">
              <dt className="mono small muted">{g.label}</dt>
              <dd>{g.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="output" className="section contact">
      <h2 className="section-label mono">Contact</h2>
      <p className="contact-title">Get in touch</p>
      <ul className="contact-list mono">
        {contacts.map((c) => (
          <li key={c.label}>
            <a href={c.href} {...(c.download ? { target: '_blank', rel: 'noopener' } : {})}>
              <span className="contact-label">{c.label}</span>
              <span className="contact-value">{c.value}</span>
            </a>
          </li>
        ))}
      </ul>
      <footer className="footer mono small muted">© {new Date().getFullYear()} Anthony Mollenkopf</footer>
    </section>
  );
}
