export interface ArticleMeta {
  slug: string;
  title: string;
  /** Shorter title for the browser tab and search results (about 45 characters). */
  seoTitle: string;
  /** One or two sentences, under about 155 characters, for search results and cards. */
  description: string;
  topic: string;
  /** ISO date, for example 2026-11-20. */
  published: string;
  updated?: string;
  /** Rough reading time. */
  minutes: number;
}
