import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://Answerforself.com'
  
  // Define your main routes
  const routes = [
    '',
    '/h/about',
    '/h/services',
    '/h/appointment',
    '/h/blog',
    '/h/blogs',
    '/h/contact',
    '/h/faq',
    '/h/gallery',
    '/h/shop',
    '/h/privacy',
    '/h/terms-and-conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
} 