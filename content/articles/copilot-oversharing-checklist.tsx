import Link from 'next/link';
import { type ArticleMeta } from '@/content/articles/types';

export const meta: ArticleMeta = {
  slug: 'copilot-oversharing-checklist',
  title: 'Before you turn on Copilot: an oversharing checklist for small Microsoft 365 tenants',
  seoTitle: 'Copilot oversharing checklist for small tenants',
  description:
    'Copilot can draw on anything a person can already open. Here is how to find the files that were shared too widely before an assistant finds them for you.',
  topic: 'Microsoft 365',
  published: '2026-11-20',
  minutes: 6,
};

export function Body() {
  return (
    <>
      <p>
        Microsoft 365 Copilot does not break your permissions. It uses them. When someone asks it a question, it
        can draw on anything that person is already allowed to open.
      </p>
      <p>
        That sounds safe, and it would be if permissions were tidy. In most small tenants they are not. A payroll
        spreadsheet shared with the whole company in 2021 has been sitting quietly ever since, protected only by
        the fact that nobody knew where to look. An assistant removes that protection. The file is now one question
        away.
      </p>
      <p>
        So the work before a Copilot rollout is mostly a clean-up of sharing. This is the order we do it in.
      </p>

      <h2>A test you can run today</h2>
      <p>
        Sign in as an ordinary member of staff, not an administrator. Use the search box in SharePoint or
        Microsoft 365 and search for <code>salary</code>, <code>passport</code>, <code>password</code>, and{' '}
        <code>termination</code>. Whatever comes back is what Copilot could use to answer that person. If the
        results make you wince, do the checklist before you assign a single licence.
      </p>

      <h2>The checklist</h2>
      <ol>
        <li>
          <strong>Find anything shared with everyone.</strong> Look for sites and files shared with the built-in
          groups &ldquo;Everyone&rdquo; and &ldquo;Everyone except external users&rdquo;, and for links set to
          &ldquo;People in your organisation&rdquo;. These are the biggest source of surprises.
        </li>
        <li>
          <strong>Deal with &ldquo;Anyone with the link&rdquo;.</strong> Find existing anonymous links, remove the
          ones you do not need, and set new ones to expire. Then change the default sharing link to
          &ldquo;Specific people&rdquo;, so the safe choice is the easy one.
        </li>
        <li>
          <strong>Check the obvious places first.</strong> HR, payroll, finance, management, legal, and client
          folders. You are not auditing every file. You are making sure the most damaging ones are locked down.
        </li>
        <li>
          <strong>Clean up groups and guests.</strong> Teams and Microsoft 365 groups collect members who have
          moved roles or left. Review the membership of any group that owns sensitive content, and remove guest
          accounts nobody can explain.
        </li>
        <li>
          <strong>Archive what is stale.</strong> Old project sites with no active owner still hold files and
          still answer questions. Archive or delete them, and give every remaining site a named owner.
        </li>
        <li>
          <strong>Label what is sensitive.</strong> Apply sensitivity labels to the content that matters most.
          Where your licence allows it, you can also stop Copilot from using content that carries particular
          labels.
        </li>
        <li>
          <strong>Start with a small group.</strong> Give the first licences to a handful of people and ask them
          to go looking for things they should not see. Fix what they find before the wider rollout.
        </li>
        <li>
          <strong>Tell staff what it can see.</strong> People are careful with a tool when they understand it.
          Explain that Copilot answers from whatever they can open, and point them to your{' '}
          <Link href="/insights/one-page-ai-usage-policy">AI usage policy</Link>.
        </li>
        <li>
          <strong>Keep reviewing.</strong> Sharing drifts. Put a quarterly access review in the calendar for the
          sites that hold sensitive content.
        </li>
      </ol>

      <h2>The tools Microsoft gives you</h2>
      <p>
        Microsoft provides reports and controls for this work in the SharePoint admin centre and in Microsoft
        Purview. They can show you which sites are shared broadly, restrict what search and Copilot can reach
        while you clean up, and apply labels automatically.
      </p>
      <p>
        What you get depends on your licence, and the names and packaging change often. Check Microsoft&rsquo;s
        current documentation before you plan around a feature, and treat any blog post, including this one, as a
        starting point.
      </p>

      <h2>How long this takes</h2>
      <p>
        For a small tenant, the first pass is a short project. Most of the time goes on deciding who should own
        each site and who should have access, which only your business can answer. The technical changes are
        quick once those decisions are made.
      </p>
      <p>
        If you would like someone to do the first pass with you, that is part of the{' '}
        <Link href="/ai-readiness-review">AI Readiness Review</Link>.
      </p>
    </>
  );
}
