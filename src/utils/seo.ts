export interface PageSEO {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
}

export const BASE_URL = 'https://wec-pitwall.vercel.app';

export const buildTitle = (pageTitle: string) =>
  `${pageTitle} | WEC Pitwall`;
