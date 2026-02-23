import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/auth/',
        '/(protected)/',
        '/h/',
      ],
    },
    sitemap: 'https://Answerforself.com/sitemap.xml',
  }
} 