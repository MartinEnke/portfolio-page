import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://martinenke.vercel.app/', lastModified: new Date() },
    // Add more URLs as you add routes (e.g., /projects/...).
  ]
}
