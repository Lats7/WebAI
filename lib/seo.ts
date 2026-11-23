import type { Metadata } from 'next';
import { COMPANY } from '@/lib/constants';

interface PageMeta {
  /** Page title without the site name. Keep the full title under about 60 characters. */
  title: string;
  /** Under about 155 characters. */
  description: string;
  /** Path from the site root, for example "/work". */
  path: string;
}

/**
 * The share card drawn by app/opengraph-image.tsx. A page that sets its own
 * share details does not inherit the image from the home page, so every page
 * names it here. Without it, links shared on LinkedIn or in chat show no picture.
 */
export const SHARE_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: `${COMPANY.fullName}: AI agents, automation, and cyber security`,
};

/** Share-card fields that are the same on every page. */
export const SHARE_BASE = {
  type: 'website',
  locale: 'en_AU',
  siteName: COMPANY.fullName,
} as const;

/** Title, description, canonical link, and share card for one page. */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  const fullTitle = `${title} | ${COMPANY.fullName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...SHARE_BASE,
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [SHARE_IMAGE] },
  };
}

/** Absolute URL for a path, for structured data. */
export function absoluteUrl(path: string) {
  return `${COMPANY.url}${path === '/' ? '' : path}`;
}

/** Breadcrumb trail as schema.org data. */
export function breadcrumbData(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Question and answer pairs as schema.org data. */
export function faqData(items: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
