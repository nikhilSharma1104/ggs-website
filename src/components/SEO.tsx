import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const defaultDescription = "Gurukulam Global School, Mathura - a premier school offering holistic, NEP 2020-aligned education from Playgroup to Grade 8, with modern facilities and traditional values.";
const defaultKeywords = "Gurukulam Global School, best school in Mathura, school in Krishna Nagar Mathura, Vrindavan school, admissions, holistic education, academic excellence";
const defaultImage = "https://www.gurukulamglobalschool.in/logo.png";
const defaultUrl = "https://www.gurukulamglobalschool.in";

export const SEO: React.FC<SEOProps> = ({
  title = "Gurukulam Global School",
  description = defaultDescription,
  keywords = defaultKeywords,
  image = defaultImage,
  url = defaultUrl,
  type = "website"
}) => {
  const fullTitle = title === "Gurukulam Global School" 
    ? title 
    : `${title} | Gurukulam Global School`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Gurukulam Global School" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Gurukulam Global School",
          "description": description,
          "url": defaultUrl,
          "logo": defaultImage,
          "sameAs": [
            "https://www.facebook.com/gurukulamglobalschool",
            "https://www.instagram.com/gurukulamglobalschool"
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "136, Madhuvan Enclave, Near Natraj Murti, Krishna Nagar",
            "addressLocality": "Mathura",
            "addressRegion": "Uttar Pradesh",
            "postalCode": "281003",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+917617645050",
            "email": "gurukulamglobalschool@gmail.com",
            "contactType": "admissions"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
