import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { OG_IMAGE, SITE_URL, routeMeta } from '../data/seo';

interface SEOProps {
  /** Overrides; by default everything comes from src/data/seo.ts for the current route. */
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  /** Extra JSON-LD objects for this page (e.g. FAQPage) */
  jsonLd?: object[];
}

const SITE_NAME = 'Gurukulam Global School';

/** Pages are served from /path/index.html on GitHub Pages, so canonical URLs end in a slash. */
const canonicalUrl = (path: string) => `${SITE_URL}${path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`}`;

export const SEO: React.FC<SEOProps> = ({ title, description, image = OG_IMAGE, noindex, jsonLd = [] }) => {
  const { pathname } = useLocation();
  const meta = routeMeta(pathname);
  const fullTitle = title ? `${title} | ${SITE_NAME}` : meta?.title ?? SITE_NAME;
  const desc = description ?? meta?.description ?? '';
  const url = canonicalUrl(pathname);

  // Breadcrumb trail from the URL, e.g. Home > Academics > Middle Stage
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumb =
    segments.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [{ path: '/', name: 'Home' }, ...segments.map((_, i) => ({ path: `/${segments.slice(0, i + 1).join('/')}`, name: '' }))].map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name || routeMeta(c.path)?.title.split(/ [|–] /)[0] || c.path,
            item: canonicalUrl(c.path),
          })),
        }
      : null;

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      {!noindex && <link rel="canonical" href={url} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {breadcrumb && <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>}
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
