import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Gurukulam Global School',
  description = 'Gurukulam Global School - Where tradition meets innovation. Experience world-class education with our holistic approach to learning.',
  keywords = [],
  image = '/logo.png',
  url = 'https://www.gurukulamglobalschool.com',
  type = 'website'
}) => {
  const defaultKeywords = [
    'Gurukulam Global School',
    'education',
    'school',
    'learning',
    'academic excellence',
    'holistic education',
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
