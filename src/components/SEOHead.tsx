import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '@/lib/seo';

interface SEOHeadProps {
  title: string;
  description?: string;
  url?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
  noIndex?: boolean;
}

const DEFAULT_DESCRIPTION = 'Track WEC standings, race schedules, teams and drivers for the FIA World Endurance Championship.';

const SEOHead = ({
  title,
  description,
  url,
  ogTitle,
  ogDescription,
  canonical: propCanonical,
  noIndex = false
}: SEOHeadProps) => {
  const location = useLocation();
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const canonical = propCanonical || `${BASE_URL}${url || location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || metaDescription} />
      <meta property="og:url" content={canonical} />
    </Helmet>
  );
};

export default SEOHead;
