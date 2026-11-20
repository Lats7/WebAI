import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/content/articles';
import { PAGES } from '@/lib/constants';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = PAGES.map((page) => ({
    url: absoluteUrl(page.href),
    changeFrequency: 'monthly' as const,
    priority: page.href === '/' ? 1 : page.href === '/privacy' ? 0.2 : 0.8,
  }));

  const articles = ARTICLES.map((article) => ({
    url: absoluteUrl(`/insights/${article.slug}`),
    lastModified: article.updated ?? article.published,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
