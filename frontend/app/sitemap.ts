import type { MetadataRoute } from 'next'
import { getPortfolioData } from '@/lib/api'
import { getServices } from '@/lib/services-seo'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aness.ir').replace(/\/$/, '')
const locales: Array<'en' | 'fa'> = ['en', 'fa']

const staticPaths = ['', '/about', '/services', '/contact', '/project-request']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const lang of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${lang}${path}`,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      })
    }

    for (const service of getServices(lang)) {
      entries.push({
        url: `${siteUrl}/${lang}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }

    try {
      const data = await getPortfolioData(lang)
      for (const post of data.blog || []) {
        entries.push({
          url: `${siteUrl}/${lang}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.created_at || now),
          changeFrequency: 'weekly',
          priority: 0.7,
        })
      }
    } catch {
      // Keep sitemap generation resilient if the API is temporarily unavailable.
    }
  }

  return entries
}
