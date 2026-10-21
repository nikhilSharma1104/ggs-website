// Runs after `react-scripts build`:
//  1. writes build/<route>/index.html for every route in src/data/seo.ts with
//     that page's title, description and canonical baked in, so GitHub Pages
//     answers deep links with 200 (instead of the 404.html redirect) and
//     crawlers/social previews see the right metadata without running JS;
//  2. regenerates build/sitemap.xml from the same list.
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.join(__dirname, '..');
const build = path.join(root, 'build');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ggs-seo-'));
execFileSync(path.join(root, 'node_modules', '.bin', 'tsc'), ['src/data/seo.ts', '--outDir', tmp, '--module', 'commonjs', '--target', 'es2019', '--skipLibCheck'], {
  cwd: root,
  stdio: 'inherit',
});
const { routes, SITE_URL } = require(path.join(tmp, 'seo.js'));
fs.rmSync(tmp, { recursive: true, force: true });

const template = fs.readFileSync(path.join(build, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const canonical = (p) => `${SITE_URL}${p === '/' ? '/' : `${p}/`}`;

const setAttr = (html, selector, value) => html.replace(selector, (tag) => tag.replace(/content="[^"]*"|href="[^"]*"/, (m) => `${m.split('=')[0]}="${esc(value)}"`));

for (const r of routes) {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`);
  html = setAttr(html, /<meta data-rh="true" name="description"[^>]*>/, r.description);
  html = setAttr(html, /<link data-rh="true" rel="canonical"[^>]*>/, canonical(r.path));
  html = setAttr(html, /<meta data-rh="true" property="og:url"[^>]*>/, canonical(r.path));
  html = setAttr(html, /<meta data-rh="true" property="og:title"[^>]*>/, r.title);
  html = setAttr(html, /<meta data-rh="true" property="og:description"[^>]*>/, r.description);
  html = setAttr(html, /<meta data-rh="true" name="twitter:title"[^>]*>/, r.title);
  html = setAttr(html, /<meta data-rh="true" name="twitter:description"[^>]*>/, r.description);
  const dir = path.join(build, r.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map(
    (r) => `  <url>
    <loc>${canonical(r.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>${
      r.path === '/'
        ? `
    <image:image><image:loc>${SITE_URL}/images/og-image.png</image:loc></image:image>`
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(build, 'sitemap.xml'), sitemap);
console.log(`SEO: wrote ${routes.length} route pages and sitemap.xml`);
