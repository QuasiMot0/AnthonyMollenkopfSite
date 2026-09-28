import { useState } from 'react';
import { projects } from '../data.js';
import * as Art from './Art.jsx';

// `variant` is 'featured' (large alternating row) or 'compact' (one column of the secondary row).
function ProjectCard({ p, variant, flip }) {
  const [on, setOn] = useState(false);
  const Pic = Art[p.art];
  const colors = on ? p.rgb : p.edge;
  return (
    <article
      className={`project ${variant}${flip ? ' flip' : ''}`}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      <div className="frame">
        <Pic c={colors} />
        <div className="frame-tag mono">{on ? 'view: rgb · detections on' : 'view: canny edges'}</div>
      </div>
      <div className="project-text">
        <div className="mono small muted">{p.tag}</div>
        <h3>{p.title}</h3>
        <p className={variant === 'featured' ? 'body-md' : 'body-sm'}>{p.body}</p>
        {p.link && (
          <a className="text-link mono" href={p.link.href} target="_blank" rel="noopener">
            {p.link.label}
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <section id="inference" className="section projects">
      <h2 className="section-label mono">Projects</h2>
      <div className="featured-list">
        {featured.map((p, i) => (
          <ProjectCard key={p.id} p={p} variant="featured" flip={i % 2 === 1} />
        ))}
      </div>
      <div className="compact-grid">
        {rest.map((p) => (
          <ProjectCard key={p.id} p={p} variant="compact" />
        ))}
      </div>
    </section>
  );
}
