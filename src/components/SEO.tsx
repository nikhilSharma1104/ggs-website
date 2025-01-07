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

const defaultDescription = "Gurukulam Global School - A premier educational institution in India offering holistic education with modern facilities and traditional values.";
const defaultKeywords = "Gurukulam Global School, education, CBSE, school in India, holistic education, academic excellence";
const defaultImage = "/logo.png"; // Update with your actual logo path
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            "https://www.instagram.com/gurukulamglobalschool",
            // Add other social media links
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Your School Address",
            "addressLocality": "Your City",
            "addressRegion": "Your State",
            "postalCode": "Your Postal Code",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "Your-Phone-Number",
            "contactType": "customer service"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
