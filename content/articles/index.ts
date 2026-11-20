import { type JSX } from 'react';
import * as agentAccess from '@/content/articles/agent-access-least-privilege';
import * as copilot from '@/content/articles/copilot-oversharing-checklist';
import * as policy from '@/content/articles/one-page-ai-usage-policy';
import * as injection from '@/content/articles/prompt-injection-explained';
import { type ArticleMeta } from '@/content/articles/types';

export type { ArticleMeta };

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
