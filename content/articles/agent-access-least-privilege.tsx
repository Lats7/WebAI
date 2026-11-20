import Link from 'next/link';
import { type ArticleMeta } from '@/content/articles/types';

export const meta: ArticleMeta = {
  slug: 'agent-access-least-privilege',
  title: 'How to give an AI agent access without handing it the keys',
  seoTitle: 'How to give an AI agent access safely',
  description:
    'The quickest way to build an agent is to give it your login. Here are eight safer habits, from separate identities to an off switch you have tested.',
  topic: 'AI agents',
  published: '2026-11-20',
  minutes: 6,
};

export function Body() {
  return (
    <>
      <p>
        The quickest way to get an AI agent working is to give it your own login. It can then do everything you
        can, which is the problem. An agent can be wrong, and it can be{' '}
        <Link href="/insights/prompt-injection-explained">tricked by the content it reads</Link>. Whatever access
        it holds is the size of the mistake it can make.
      </p>
      <p>These are the eight habits we apply to every agent we build. None of them needs special tooling.</p>

      <h2>1. Give it its own identity</h2>
      <p>
        Create a separate account or app registration for the agent. Never share a person&rsquo;s login. With
        its own identity you can see exactly what the agent did, give it different permissions from any human,
        and switch it off without locking anyone out.
      </p>

      <h2>2. Start read-only</h2>
      <p>
        Most agents spend most of their time reading. Begin with read access only, watch what it does for a
        while, and add the ability to change things one action at a time. Each new permission should have a
        reason someone can state in a sentence.
      </p>

      <h2>3. Scope it to the job</h2>
      <p>
        An agent that handles invoices needs the accounts inbox, not every mailbox. One that updates leads needs
        those records in the CRM, not the whole database. Narrow scopes take longer to set up and save you the
        day it matters.
      </p>

      <h2>4. Put a person on the steps you cannot undo</h2>
      <p>
        Ask one question of each action: can we reverse this? Drafting an email can be undone. Sending it cannot.
        Payments, deletions, messages to customers, and changes to permissions should wait for a named person to
        approve them. Let the agent prepare everything, so the approval takes seconds.
      </p>

      <h2>5. Set limits it cannot exceed</h2>
      <p>
        Put hard limits outside the agent, where clever input cannot talk its way past them. Examples are a spend
        cap, a maximum number of actions per hour, and a list of the only addresses or domains it may send to.
      </p>

      <h2>6. Log every action</h2>
      <p>
        Record what the agent did, when, and which input led to it. Keep the log somewhere the agent itself
        cannot edit. When someone asks why a customer received a particular message, you want to answer in a
        minute, not a week.
      </p>

      <h2>7. Have an off switch, and test it</h2>
      <p>
        Know the one place where you revoke the agent&rsquo;s access, and make sure more than one person knows
        it. Then try it. An off switch that has never been used is a guess.
      </p>

      <h2>8. Review it like a member of staff</h2>
      <p>
        Access tends to grow and never shrink. Every few months, look at what the agent can reach and remove
        anything it no longer uses. Do the same check you would do for a person who changed roles.
      </p>

      <h2>A quick test</h2>
      <p>Ask this about any agent, whether you built it or bought it:</p>
      <blockquote>
        <p>If this went wrong at 2am, what is the worst it could do before someone noticed?</p>
      </blockquote>
      <p>
        If the honest answer makes you uncomfortable, the agent has too much access. Reduce it until the answer
        is something you could live with.
      </p>
      <p>
        If you want a second pair of eyes on an agent you are planning or already running, that is what our{' '}
        <Link href="/services/ai-security">AI security work</Link> is for. To see where your business stands
        more broadly, try the <Link href="/tools/ai-readiness-check">two-minute self-check</Link>.
      </p>
    </>
  );
}
