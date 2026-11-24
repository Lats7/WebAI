import { type JSX } from 'react';
import * as agentAccess from '@/content/articles/agent-access-least-privilege';
import * as copilot from '@/content/articles/copilot-oversharing-checklist';
import * as policy from '@/content/articles/one-page-ai-usage-policy';
import * as injection from '@/content/articles/prompt-injection-explained';
import { type ArticleMeta } from '@/content/articles/types';

export type { ArticleMeta };

/**
 * OWNER NOTE: the articles quote and link outside sources. Each one was
 * checked on 23 November 2026.
 *
 * - The OWASP, NIST, UK NCSC, Microsoft, and Simon Willison pages were opened
 *   and read, and the wording in the articles follows them.
 * - The Australian Government pages (industry.gov.au, ai.gov.au, oaic.gov.au)
 *   refused automated access, so what the articles say about them rests on
 *   search results. Open those links yourself and confirm the wording.
 * - Microsoft changes product names and licensing often. Recheck the Copilot
 *   checklist against Microsoft Learn every few months.
 *
 * When you revise an article, set `updated` in its meta so the page and the
 * sitemap show the new date.
 */

/**
 * Every article on the site, newest first.
 *
 * To add one: create a file in this folder that exports `meta` and `Body`
 * (copy an existing article), then add it to the list below.
 */
const MODULES = [policy, copilot, injection, agentAccess];

export const ARTICLES: ArticleMeta[] = MODULES.map((module) => module.meta);

export function getArticle(slug: string): { meta: ArticleMeta; Body: () => JSX.Element } | undefined {
  const found = MODULES.find((module) => module.meta.slug === slug);
  return found ? { meta: found.meta, Body: found.Body } : undefined;
}
