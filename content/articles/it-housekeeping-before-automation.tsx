import Link from 'next/link';
import { type ArticleMeta } from '@/content/articles/types';

export const meta: ArticleMeta = {
  slug: 'it-housekeeping-before-automation',
  title: 'The IT housekeeping that makes automation possible',
  seoTitle: 'IT housekeeping before you automate',
  description:
    'Automation fails on shared passwords, leftover accounts, and lost files. Seven pieces of housekeeping to do first, in Microsoft 365 or Google Workspace.',
  topic: 'IT support',
  published: '2026-11-24',
  minutes: 7,
};

export function Body() {
  return (
    <>
      <p>
        Automation and AI sit on top of your accounts, your email, and your files. If those are untidy, the
        automation inherits the mess. It cannot find the right file. It runs under the account of someone who
        left. It stops the day a password changes.
      </p>
      <p>
        None of this housekeeping is exciting. All of it is cheaper to do before you build than after. These are
        the seven things we check first, and they apply whether you use Microsoft 365 or Google Workspace.
      </p>

      <h2>1. One account per person, and none shared</h2>
      <p>
        A shared login, such as an accounts address with the password on a sticky note, causes three problems.
        You cannot tell who did what. You cannot remove one person&rsquo;s access without changing it for
        everyone. And an automation has nowhere safe to sign in.
      </p>
      <p>
        For an address several people answer, use a shared mailbox, not a shared password. Each person reaches
        it through their own account. Microsoft&rsquo;s documentation on{' '}
        <a href="https://learn.microsoft.com/en-us/microsoft-365/admin/email/about-shared-mailboxes">
          shared mailboxes
        </a>{' '}
        says a shared mailbox &ldquo;isn&rsquo;t intended for direct sign-in&rdquo; and that you should block
        sign-in for its account. It also says a shared mailbox can hold up to 50 GB without a licence of its
        own, so doing it properly usually costs nothing. Google Workspace has equivalents, such as a group that
        works as a shared inbox.
      </p>

      <h2>2. A leaver process that removes access the same day</h2>
      <p>
        The account of someone who left is the most common loose end in a small business. It is also where
        automations go to die. A workflow set up under a leaver&rsquo;s account either stops when the account
        is closed, or keeps running with access nobody is watching.
      </p>
      <p>Both platforms publish a checklist. Use the one that applies to you.</p>
      <ul>
        <li>
          Microsoft&rsquo;s guide to{' '}
          <a href="https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/remove-former-employee">
            removing a former employee
          </a>{' '}
          has seven steps. It starts with blocking sign-in and saving the mailbox, covers forwarding their
          email or converting it to a shared mailbox, and ends with removing the licence and deleting the
          account.
        </li>
        <li>
          Google&rsquo;s guide to{' '}
          <a href="https://knowledge.workspace.google.com/admin/users/maintain-data-security-after-an-employee-leaves">
            data security after an employee leaves
          </a>{' '}
          covers wiping mobile devices, changing the password, revoking app tokens and security keys, and
          deleting the account.
        </li>
      </ul>
      <p>
        Turn it into a one-page checklist of your own and run it every time. It is also a good early candidate
        for automation, because it follows the same steps for every person.
      </p>

      <h2>3. Licences that match people</h2>
      <p>
        Count your licences against the people who work for you. It is common to find some still assigned to
        people who left, and some on a more expensive plan than the person needs. A licence assigned to someone
        who left is money spent on nothing.
      </p>
      <p>This is usually the quickest saving in IT. Check it every quarter.</p>

      <h2>4. Files with a home</h2>
      <p>
        An automation has to be told where things are. If invoices live in four places under four naming
        habits, a person copes. Software does not.
      </p>
      <ul>
        <li>One place for each kind of document.</li>
        <li>
          A naming pattern everyone follows, such as the supplier name followed by the invoice number.
        </li>
        <li>
          Business files in shared drives or sites the business owns, not in one person&rsquo;s own drive. When
          that person leaves, their drive goes with the account.
        </li>
      </ul>

      <h2>5. Access by group, not by person</h2>
      <p>
        Give access to folders through groups such as Finance or Managers, not one person at a time. A new
        starter joins the group and has everything they need. A leaver is removed from the group and has
        nothing.
      </p>
      <p>
        It matters more once AI is involved. An assistant can draw on whatever the person using it can open, so
        loose sharing becomes easy to find. We cover that clean-up in{' '}
        <Link href="/insights/copilot-oversharing-checklist">the Copilot oversharing checklist</Link>.
      </p>

      <h2>6. Sign-in protection on every account</h2>
      <p>
        Turn on multi-factor authentication for every account, starting with administrators. Make no exception
        for the owner. The owner&rsquo;s account is the one an attacker wants most.
      </p>
      <p>
        Automations need care here. The wrong fix is a normal user account with the protection switched off so a
        script can sign in. The right one is an identity made for software, with only the access the job needs.
        We explain how in{' '}
        <Link href="/insights/agent-access-least-privilege">
          how to give an AI agent access without handing it the keys
        </Link>
        .
      </p>

      <h2>7. A backup you have tested</h2>
      <p>
        Keeping files in the cloud is not the same as backing them up. Microsoft says so itself. Its{' '}
        <a href="https://www.microsoft.com/en-us/servicesagreement">Services Agreement</a> recommends that
        customers &ldquo;regularly backup Your Content and Data&rdquo; stored on its services.
      </p>
      <p>
        Decide what you could not afford to lose, back it up somewhere separate, and restore one file as a test.
        A backup nobody has restored from is a hope.
      </p>

      <h2>Write it down</h2>
      <p>One page is enough. It should say:</p>
      <ul>
        <li>who the administrators are</li>
        <li>where each kind of file lives</li>
        <li>which automations exist, and which account each one runs as</li>
        <li>how to switch each one off</li>
      </ul>
      <p>
        When the person who set everything up is on leave, this page is the difference between a five-minute
        fix and a lost day.
      </p>

      <h2>How long this takes</h2>
      <p>
        For a small business the first pass is a short project. The changes themselves are quick. Most of the
        time goes on decisions only the business can make: who owns each area, and who should be able to see
        what.
      </p>
      <p>
        If you would like it done for you, it is part of our{' '}
        <Link href="/services/it-support">IT support</Link>. Once the basics are in order, the next question is{' '}
        <Link href="/insights/what-to-automate-first">what to automate first</Link>.
      </p>

      <h2>Sources and further reading</h2>
      <ul>
        <li>
          Microsoft Learn,{' '}
          <a href="https://learn.microsoft.com/en-us/microsoft-365/admin/email/about-shared-mailboxes">
            About shared mailboxes in Microsoft 365
          </a>
        </li>
        <li>
          Microsoft Learn,{' '}
          <a href="https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/remove-former-employee">
            Remove a former employee
          </a>
        </li>
        <li>
          Google Workspace Help,{' '}
          <a href="https://knowledge.workspace.google.com/admin/users/maintain-data-security-after-an-employee-leaves">
            Maintain data security after an employee leaves
          </a>
        </li>
        <li>
          Microsoft, <a href="https://www.microsoft.com/en-us/servicesagreement">Microsoft Services Agreement</a>
        </li>
      </ul>
    </>
  );
}
