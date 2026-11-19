import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: COMPANY.url, changeFrequency: 'monthly', priority: 1 }];
}
