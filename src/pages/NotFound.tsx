import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const NotFound: React.FC = () => (
  <>
    <SEO title="Page not found" noindex />
    <PageHero
      eyebrow="Error 404"
      title={
        <>
          This path leads <em className="gold-text">elsewhere</em>
        </>
      }
      lede="The page you were looking for has moved or no longer exists."
    >
      <div className="flex flex-wrap gap-3">
        <Link to="/" className="btn-gold">
          Back to home
        </Link>
        <Link to="/contact" className="btn-ghost text-ivory">
          Contact the office
        </Link>
      </div>
    </PageHero>
  </>
);

export default NotFound;
