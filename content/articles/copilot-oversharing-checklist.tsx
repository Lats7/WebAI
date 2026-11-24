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
  updated: '2026-11-23',
  minutes: 7,
};

export function Body() {
  return (
    <>
      <p>
        Copilot in Microsoft 365 does not break your permissions. It uses them. When someone asks it a question,
        it can draw on anything that person is already allowed to open. Microsoft&rsquo;s{' '}
        <a href="https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy">
          own documentation
        </a>{' '}
        puts it this way:
      </p>
      <blockquote>
        <p>
          Microsoft Copilot only surfaces organizational data to which individual users have at least view
          permissions.
        </p>
      </blockquote>
      <p>
        That sounds safe, and it would be if permissions were tidy. In most small tenants they are not. A payroll
        spreadsheet shared with the whole company in 2021 has been sitting quietly ever since, protected only by
        the fact that nobody knew where to look. An assistant removes that protection. The file is now one question
        away.
      </p>
      <p>
        So the work before a Copilot rollout is mostly a clean-up of sharing. This is the order we do it in.
      </p>

      <h2>Where the surprises come from</h2>
      <p>
        Copilot also draws on a person&rsquo;s own mailbox, chats, and calendar. Those are theirs already, so
        they rarely cause trouble. The surprises are almost always in shared files and sites, and they tend to
        come from the same three habits:
      </p>
      <ul>
        <li>
          <strong>Sharing with everyone because it was quicker.</strong> Someone needed three people to see a
          folder, picked &ldquo;Everyone except external users&rdquo;, and moved on.
        </li>
        <li>
          <strong>Links that outlive their purpose.</strong> A link made for one meeting still works two years
          later, for anyone in the company who has it or can find it.
        </li>
        <li>
          <strong>Sites nobody owns.</strong> The project finished and the person who ran it left. The site
          still holds the contract, the pricing, and the staff list.
        </li>
      </ul>
      <p>
        None of this was created by AI. An assistant just makes it easy to find, which is why a rollout is a good
        reason to fix it.
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

      <h2>If you only have a day</h2>
      <p>
        Do the search test above, then steps 1 to 3. Shared-with-everyone content, anonymous links, and the
        obvious sensitive folders account for most of the damage a rollout can do. The rest of the list makes the
        clean-up last. Those three make the first week safe.
      </p>

      <h2>The tools Microsoft gives you</h2>
      <p>
        Microsoft&rsquo;s{' '}
        <a href="https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-blueprint-oversharing">
          deployment guidance for Copilot
        </a>{' '}
        is built on three pillars: remediate oversharing, set up guardrails, and meet regulations. It points to
        two products for the work, SharePoint Advanced Management and Microsoft Purview. This is what they give
        you, as documented in November 2026.
      </p>
      <ul>
        <li>
          <strong>Data access governance reports.</strong> Part of SharePoint Advanced Management, which
          Microsoft&rsquo;s guidance says is included with a Copilot licence. The{' '}
          <a href="https://learn.microsoft.com/en-us/sharepoint/data-access-governance-reports">reports</a> find
          sites that hold overshared or sensitive content. They cover site permissions across the organisation,
          sharing links, and content shared with &ldquo;Everyone except external users&rdquo;. This is the
          fastest way to do steps 1 and 2.
        </li>
        <li>
          <strong>Restricted Content Discovery.</strong> A{' '}
          <a href="https://learn.microsoft.com/en-us/sharepoint/restricted-content-discovery">setting</a> that
          keeps a specific site out of organisation-wide search and Copilot responses while you review it.
          Microsoft describes it as a temporary control. Use it to buy time for a site you cannot fix this week,
          not as the fix.
        </li>
        <li>
          <strong>Data risk assessments in Purview.</strong> Microsoft Purview&rsquo;s{' '}
          <a href="https://learn.microsoft.com/en-us/purview/dspm-for-ai">
            Data Security Posture Management for AI
          </a>{' '}
          includes assessments designed to find and monitor oversharing. By default one runs every week across
          your 100 most-used SharePoint sites.
        </li>
        <li>
          <strong>Sensitivity labels.</strong> Labels travel with the file, so the protection holds wherever the
          file is copied. They take longer to set up than the reports, which is why they come later in the list.
        </li>
      </ul>
      <p>
        One warning about older guides. Many of them recommend Restricted SharePoint Search, which limited search
        and Copilot to an approved list of up to 100 sites. Microsoft is{' '}
        <a href="https://learn.microsoft.com/en-us/sharepoint/restricted-sharepoint-search">retiring it</a>, and
        has blocked new enablement since 31 July 2026. Do not plan a rollout around it.
      </p>
      <p>
        What you get still depends on your licence, and the names and packaging change often. The Purview page
        above is already marked as the classic version of a feature Microsoft has replaced. Check the current
        documentation before you plan around anything, and treat any blog post, including this one, as a starting
        point.
      </p>

      <h2>Who decides what</h2>
      <p>
        The reports tell you where content is exposed. They cannot tell you who should be able to see it. That is
        a business decision, and it is the part that stalls most clean-ups.
      </p>
      <ul>
        <li>
          <strong>The business owner or a manager</strong> decides who needs access to each sensitive area, and
          names an owner for each site.
        </li>
        <li>
          <strong>Whoever runs your IT</strong> pulls the reports, makes the permission changes, and sets the
          defaults so new sharing starts out safe.
        </li>
        <li>
          <strong>Site owners</strong> confirm the membership of their own sites, and do it again each quarter.
        </li>
      </ul>
      <p>
        Book an hour with the people who can make those decisions before anyone opens an admin centre. It saves
        days.
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

      <h2>Sources and further reading</h2>
      <ul>
        <li>
          Microsoft Learn,{' '}
          <a href="https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy">
            Data, privacy, and security for Microsoft Copilot
          </a>
        </li>
        <li>
          Microsoft Learn,{' '}
          <a href="https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-blueprint-oversharing">
            Secure and governed data foundation for Microsoft Copilot
          </a>
        </li>
        <li>
          Microsoft Learn,{' '}
          <a href="https://learn.microsoft.com/en-us/sharepoint/data-access-governance-reports">
            Data access governance reports for SharePoint sites
          </a>
        </li>
        <li>
          Microsoft Learn,{' '}
          <a href="https://learn.microsoft.com/en-us/sharepoint/restricted-content-discovery">
            Restrict discovery of SharePoint sites and content
          </a>
        </li>
        <li>
          Microsoft Learn,{' '}
          <a href="https://learn.microsoft.com/en-us/sharepoint/restricted-sharepoint-search">
            Restricted SharePoint Search
          </a>{' '}
          (retiring)
        </li>
      </ul>
    </>
  );
}
