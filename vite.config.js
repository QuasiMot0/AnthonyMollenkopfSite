import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site's public address (no trailing slash).
// Used for the canonical URL, link-preview URLs and the sitemap. Can also be set with the
// SITE_URL environment variable (e.g. in Vercel's project settings). If set to an empty
// string, those address-specific tags are omitted rather than pointing at a wrong domain.
const SITE_URL = (process.env.SITE_URL ?? 'https://anthonymollenkopf.com').replace(/\/+$/, '');

// Structured data so search engines understand the page is about a person.
const PERSON = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Anthony Mollenkopf',
  description: 'Computer science student at Purdue building real-time computer vision systems.',
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Purdue University' },
  knowsAbout: ['Computer vision', 'Object detection', 'Pose estimation', 'Multi-object tracking', 'YOLOv8', 'OpenCV', 'PyTorch', 'React'],
  sameAs: ['https://github.com/QuasiMot0', 'https://www.linkedin.com/in/anthony-mollenkopf'],
};

function seo() {
  return {
    name: 'seo',
    transformIndexHtml() {
      const person = SITE_URL ? { ...PERSON, url: `${SITE_URL}/` } : PERSON;
      const tags = [
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(person), injectTo: 'head' },
      ];
      if (SITE_URL) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${SITE_URL}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${SITE_URL}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: `${SITE_URL}/og-image.png` }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE_URL}/og-image.png` }, injectTo: 'head' }
        );
      }
      return tags;
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /'];
      if (SITE_URL) {
        robots.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
        const today = new Date().toISOString().slice(0, 10);
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`,
        });
      } else {
        this.warn('SITE_URL is not set: skipping canonical URL, og:url/og:image and sitemap.xml.');
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' });
    },
  };
}

export default defineConfig({
  plugins: [react(), seo()],
});
