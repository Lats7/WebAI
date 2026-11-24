import { type JSX } from 'react';
import * as agentAccess from '@/content/articles/agent-access-least-privilege';
import * as payback from '@/content/articles/automation-payback';
import * as copilot from '@/content/articles/copilot-oversharing-checklist';
import * as housekeeping from '@/content/articles/it-housekeeping-before-automation';
import * as policy from '@/content/articles/one-page-ai-usage-policy';
import * as injection from '@/content/articles/prompt-injection-explained';
import * as automateFirst from '@/content/articles/what-to-automate-first';
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
 * - The three guides added on 24 November 2026 (what to automate first,
 *   automation payback, IT housekeeping) are practical method, not research.
 *   The housekeeping guide quotes Microsoft and Google pages that were opened
 *   and read. The payback guide uses invented numbers in its worked example
 *   and says so. Read all three and check they match how you work.
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
const MODULES = [automateFirst, payback, housekeeping, policy, copilot, injection, agentAccess];

export const ARTICLES: ArticleMeta[] = MODULES.map((module) => module.meta);

/** Topics that belong to the "automation and IT" group. Everything else is about using AI safely. */
const BUSINESS_TOPICS = ['Automation', 'IT support'];

/** Guides on automation and IT: what to automate, whether it pays, and the IT underneath. */
export const BUSINESS_ARTICLES = ARTICLES.filter((article) => BUSINESS_TOPICS.includes(article.topic));

/** Guides on using AI safely: policy, Copilot, prompt injection, and agent access. */
export const SAFETY_ARTICLES = ARTICLES.filter((article) => !BUSINESS_TOPICS.includes(article.topic));

export function getArticle(slug: string): { meta: ArticleMeta; Body: () => JSX.Element } | undefined {
  const found = MODULES.find((module) => module.meta.slug === slug);
  return found ? { meta: found.meta, Body: found.Body } : undefined;
}
