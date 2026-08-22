import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.opproductions.com';

  const routes = [
    '',
    '/first-light',
    '/our-team',
    '/production-and-media',
    '/about',
    '/services',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}