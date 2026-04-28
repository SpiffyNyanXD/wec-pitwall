import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  url?: string;
  noIndex?: boolean;
}

const BASE_URL = 'https://wec-pitwall.vercel.app';
const DEFAULT_TITLE = 'WEC Pitwall — Fan-Made WEC Companion';
const DEFAULT_DESCRIPTION = 'Track WEC standings, race schedules, teams and drivers for the FIA World Endurance Championship.';

const SEOHead = ({ title, description, url, noIndex = false }: SEOHeadProps) => {
  const fullTitle = title ? `${title} | WEC Pitwall` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const canonical = url ? `${BASE_URL}${url}` : BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
    </Helmet>
  );
};

export default SEOHead;
