import Link from 'next/link';
import { type ArticleMeta } from '@/content/articles/types';

export const meta: ArticleMeta = {
  slug: 'one-page-ai-usage-policy',
  title: 'A one-page AI usage policy for a small business, with a template',
  seoTitle: 'One-page AI usage policy template',
  description:
    'Your staff already use AI tools. A long policy will not be read, so here is what a single page needs to say, and a template you can adapt today.',
  topic: 'AI governance',
  published: '2026-11-20',
  minutes: 5,
};

export function Body() {
  return (
    <>
      <p>
        If anyone in your business uses an AI tool for work, you need a usage policy. That is true whether you
        bought the tool or someone signed up with a personal account last year. Most of the risk comes from good
        staff making a reasonable guess about what is allowed.
      </p>
      <p>
        The policy does not have to be long. A twelve-page document that nobody reads protects you less than one
        page that everyone has. Start with one page.
      </p>

      <h2>What the page has to answer</h2>
      <p>Staff face three questions every time they open an AI tool. The policy exists to answer them.</p>
      <ol>
        <li>
          <strong>Which tools can I use?</strong> A short list, and a rule to ask before using anything else.
        </li>
        <li>
          <strong>What can I put into them?</strong> A plain list of what must never go in.
        </li>
        <li>
          <strong>Who do I ask, and who do I tell if something goes wrong?</strong> One named person.
        </li>
      </ol>
      <p>
        Add two more points and you have a complete first version: staff are responsible for checking what the
        tool gives back, and they are honest with customers about when AI was used.
      </p>

      <h2>The template</h2>
      <p>Copy this, replace the parts in square brackets, and delete anything that does not apply.</p>

      <div className="template">
        <h3>[Business name] AI usage policy</h3>
        <p>
          Applies to everyone who works here, including contractors. Owner: [name]. Last reviewed: [date].
        </p>

        <h3>1. Tools you may use</h3>
        <p>
          [List the approved tools, for example the AI assistant included in our Microsoft 365 or Google Workspace
          plan.] Use your work account, never a personal one. Ask [owner] before using any AI tool that is not on
          this list.
        </p>

        <h3>2. What must never go into an AI tool</h3>
        <p>Unless the list above says a tool is approved for it, never enter:</p>
        <ul>
          <li>customer or staff personal information</li>
          <li>health, financial, or identity information</li>
          <li>passwords, keys, or access codes</li>
          <li>contracts, pricing, or anything marked confidential</li>
        </ul>

        <h3>3. Check before you rely on it</h3>
        <p>
          AI output can be wrong, and it can sound certain when it is. You are responsible for anything you send,
          publish, or act on. Check facts, figures, and anything legal or financial against a real source.
        </p>

        <h3>4. Be upfront</h3>
        <p>
          If a customer asks whether AI was used, tell them. Do not present AI output as professional advice that
          nobody here has reviewed.
        </p>

        <h3>5. If something goes wrong</h3>
        <p>
          If sensitive information went into the wrong tool, or an AI tool did something you did not expect, tell
          [owner] the same day. You will not be in trouble for reporting it.
        </p>
      </div>

      <h2>Rolling it out</h2>
      <ul>
        <li>
          <strong>Walk through it once.</strong> Fifteen minutes in a team meeting does more than an email. Use a
          real example from your own work.
        </li>
        <li>
          <strong>Put it where people work.</strong> Pin it in the team chat or the intranet home page, not in a
          policies folder.
        </li>
        <li>
          <strong>Review it twice a year,</strong> and whenever you add a tool. The list of approved tools is the
          part that goes out of date.
        </li>
      </ul>

      <h2>What a policy cannot do</h2>
      <p>
        A policy tells people what to do. It does not change what an assistant can reach. If files in your
        Microsoft 365 or Google Workspace are shared too widely, an AI assistant will surface them however good
        your policy is. That needs a separate check, which we cover in{' '}
        <Link href="/insights/copilot-oversharing-checklist">the Copilot oversharing checklist</Link>.
      </p>
      <p>
        The Australian Government&rsquo;s National AI Centre publishes{' '}
        <a href="https://www.ai.gov.au/staying-safe-and-responsible/essential-ai-practices/create-ai-policy">
          guidance on creating an AI policy
        </a>
        , which is worth reading alongside this.
      </p>
      <p>
        This is general guidance for getting started, not legal advice. If you handle health, financial, or
        children&rsquo;s information, get advice that fits your obligations.
      </p>
    </>
  );
}
