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
  updated: '2026-11-23',
  minutes: 7,
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
      <p>
        Security people have a name for the fix, and it is decades older than AI. The NIST glossary defines{' '}
        <a href="https://csrc.nist.gov/glossary/term/least_privilege">least privilege</a> as restricting the
        access of users, &ldquo;or processes acting on behalf of users&rdquo;, to the minimum necessary to
        accomplish assigned tasks. An agent is a process acting on your behalf. The principle already covers it.
      </p>
      <p>
        OWASP has a name for what happens when you skip it. Its Top 10 for LLM Applications lists{' '}
        <a href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/">Excessive Agency</a> and gives
        three root causes: excessive functionality, excessive permissions, and excessive autonomy. In plain
        terms, the agent has tools it does not need, access it does not need, or freedom to act without a check.
      </p>
      <p>
        These are the eight habits we apply to every agent we build. Each one removes at least one of those
        three. None of them needs special tooling.
      </p>

      <h2>1. Give it its own identity</h2>
      <p>
        Create a separate account or app registration for the agent. Never share a person&rsquo;s login. With
        its own identity you can see exactly what the agent did, give it different permissions from any human,
        and switch it off without locking anyone out.
      </p>
      <p>
        The platforms you already use support this. Microsoft calls it a{' '}
        <a href="https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview">
          workload identity
        </a>
        : an identity you assign to software, such as an application or a script, so it can sign in and reach
        other services. Google Workspace and most business software have an equivalent, usually called a service
        account or an API key with its own permissions.
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
      <p>
        Scope the tools as well as the data. An agent that needs to look up an order should get a tool that looks
        up an order, not one that can run any query or fetch any web address. OWASP calls the second kind
        open-ended and recommends avoiding it. A general-purpose tool turns one bad instruction into anything the
        tool can do.
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
      <p>
        The same goes for permission checks. A line in the agent&rsquo;s instructions that says &ldquo;never
        open the payroll folder&rdquo; is a request. A permission on the payroll folder that the agent&rsquo;s
        account does not have is a control. Enforce the rule in the system that holds the data, every time.
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

      <h2>A worked example</h2>
      <p>
        Take an agent that handles supplier invoices. This is an illustration of the difference, not a
        specification.
      </p>
      <p>
        <strong>The quick build.</strong> It signs in as the office manager. It can read every mailbox she can,
        open every file she can, and do anything she can in the accounting system, including approving and paying
        bills. If an email tricks it, the attacker has the office manager&rsquo;s access. Afterwards the log
        shows that the office manager did it.
      </p>
      <p>
        <strong>The careful build.</strong>
      </p>
      <ul>
        <li>It has its own account, named so anyone can tell what it is.</li>
        <li>It can read one mailbox, the accounts inbox, and nothing else in email.</li>
        <li>In the accounting system it can create a draft bill. It cannot approve or pay one.</li>
        <li>A named person approves each bill. The agent has already matched it to the purchase order, so that takes seconds.</li>
        <li>It can send email only to addresses inside the business.</li>
        <li>Every action is written to a log the agent cannot change.</li>
        <li>Two people know how to disable the account, and one of them has tried it.</li>
      </ul>
      <p>
        If the same email tricks the careful build, the worst outcome is a strange draft bill that a person
        declines. The work the agent saves is almost the same. The size of the mistake it can make is not.
      </p>

      <h2>If you bought the agent</h2>
      <p>
        Most of this still applies when the agent comes from a vendor. You cannot change how it was built, but
        you control what it connects to. Before you switch it on, find out:
      </p>
      <ul>
        <li>Which account it runs as, and whether that can be a dedicated one.</li>
        <li>
          Exactly which permissions it asks for. Read the consent screen. &ldquo;Read and write all files&rdquo;
          for a tool that summarises meetings is a reason to ask why.
        </li>
        <li>Which actions it takes without asking, and whether you can turn on approval for the risky ones.</li>
        <li>Where its activity log is, and how long it is kept.</li>
        <li>How you disconnect it, and what happens to the data it already holds.</li>
      </ul>

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

      <h2>Sources and further reading</h2>
      <ul>
        <li>
          OWASP Gen AI Security Project,{' '}
          <a href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/">LLM06:2025 Excessive Agency</a>
        </li>
        <li>
          OWASP Gen AI Security Project,{' '}
          <a href="https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/">
            OWASP Top 10 for Agentic Applications for 2026
          </a>{' '}
          (December 2025)
        </li>
        <li>
          NIST Computer Security Resource Center,{' '}
          <a href="https://csrc.nist.gov/glossary/term/least_privilege">glossary entry for least privilege</a>
        </li>
        <li>
          Microsoft Learn,{' '}
          <a href="https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview">
            Workload identities
          </a>
        </li>
      </ul>
    </>
  );
}
