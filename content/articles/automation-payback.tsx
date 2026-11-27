import Link from 'next/link';
import { type ArticleMeta } from '@/content/articles/types';

export const meta: ArticleMeta = {
  slug: 'automation-payback',
  title: 'Will automation pay for itself? How to work it out before you build',
  seoTitle: 'How to tell if automation will pay for itself',
  description:
    'A build is worth doing when the hours it saves cost more than building and running it. Here is the arithmetic, the costs people forget, and a worked example.',
  topic: 'Automation',
  published: '2026-11-24',
  minutes: 7,
};

export function Body() {
  return (
    <>
      <p>
        An automation is worth building when what it saves is more than what it costs to build and run. That
        sounds obvious. Most projects still start without either number.
      </p>
      <p>
        You can get both in under an hour, before you talk to anyone who wants to sell you something. This is
        the method.
      </p>

      <h2>Step 1: what the task costs now</h2>
      <p>Multiply four things:</p>
      <blockquote>
        <p>hours a week &times; people who do it &times; working weeks in a year &times; cost of an hour</p>
      </blockquote>
      <ul>
        <li>
          <strong>Use real hours.</strong> Guesses are unreliable. Time the task for a week.
        </li>
        <li>
          <strong>Use the full cost of an hour.</strong> That is the wage plus super, leave, and other
          on-costs. A quick way to get it is to divide the yearly cost of the role by the hours actually worked.
        </li>
        <li>
          <strong>Use 48 weeks.</strong> A year, less four weeks of leave.
        </li>
      </ul>
      <p>
        The <Link href="/tools/automation-savings-calculator">savings calculator</Link> does this sum for you.
      </p>

      <h2>Step 2: how much of it comes back</h2>
      <p>
        No automation removes all of the work. Some cases will not fit the pattern, and someone still checks the
        result. So estimate the share that is routine.
      </p>
      <p>
        Count cases, then adjust. If seven invoices in ten follow the standard layout, it is tempting to say 70
        per cent of the time comes back. It will be less, because the odd three take longer than the routine
        seven. Be conservative. If the case still stacks up at half, it is a good case.
      </p>

      <h2>Step 3: what it costs to build and run</h2>
      <p>There are three costs, and the second and third are the ones people forget.</p>
      <ul>
        <li>
          <strong>The build.</strong> A one-off cost. Ask for a fixed price and a written scope, so the number
          does not move after you have agreed to it.
        </li>
        <li>
          <strong>The running cost.</strong> Software subscriptions, AI usage that is charged by volume, and a
          little of someone&rsquo;s time to keep an eye on it. Ask what makes this number go up.
        </li>
        <li>
          <strong>The change.</strong> Staff need time to learn the new way and to trust it. Expect to run the
          old and new methods side by side for a couple of weeks.
        </li>
      </ul>

      <h2>Step 4: the payback period</h2>
      <blockquote>
        <p>months to pay back = build cost &divide; (monthly saving &minus; monthly running cost)</p>
      </blockquote>
      <p>As a rough guide to reading the answer:</p>
      <ul>
        <li>
          <strong>Under 12 months.</strong> A strong case on savings alone.
        </li>
        <li>
          <strong>12 to 24 months.</strong> Worth doing if there are other benefits, such as fewer errors or
          faster turnaround.
        </li>
        <li>
          <strong>Over 24 months.</strong> Hard to justify on savings. Look for a smaller version, or a
          different task.
        </li>
      </ul>

      <h2>A worked example</h2>
      <p>
        These numbers are invented to show the method. They are not prices, ours or anyone else&rsquo;s.
      </p>
      <p>
        Two people each spend five hours a week entering supplier invoices. An hour of their time costs the
        business $45.
      </p>
      <ul>
        <li>Hours a year: 5 &times; 2 &times; 48 = 480.</li>
        <li>Cost a year: 480 &times; $45 = $21,600.</li>
        <li>Say 60 per cent is routine: 288 hours, worth $12,960 a year, or $1,080 a month.</li>
        <li>Suppose the build is quoted at $9,000 and costs $150 a month to run.</li>
        <li>Net saving: $1,080 &minus; $150 = $930 a month.</li>
        <li>Payback: $9,000 &divide; $930 = just under 10 months.</li>
      </ul>
      <p>
        In the first year the business is about $2,160 ahead after paying for the build. In the second year it
        is about $11,160 ahead. If the routine share turned out to be 40 per cent, the payback would stretch to
        about 16 months, which is why step 2 deserves an honest answer.
      </p>

      <h2>What the arithmetic misses</h2>
      <p>The sum counts hours. Some of the value, and some of the risk, sits outside it.</p>
      <ul>
        <li>
          <strong>Fewer errors.</strong> Retyped data goes wrong, and fixing it costs more than entering it did.
        </li>
        <li>
          <strong>Faster turnaround.</strong> An invoice that goes out the same day tends to be paid sooner. A
          reply that arrives in minutes can win work that a reply the next morning would not.
        </li>
        <li>
          <strong>Cover.</strong> The work still happens when the person who normally does it is on leave.
        </li>
        <li>
          <strong>Room to grow.</strong> You can take on more volume without hiring for it.
        </li>
        <li>
          <strong>Upkeep.</strong> When a supplier changes a form or you change a system, the automation needs
          attention. Budget a little for it each year.
        </li>
        <li>
          <strong>Dependence.</strong> If only one person understands how it works, you have swapped one risk
          for another. Insist on documentation, and make sure you own what was built.
        </li>
      </ul>

      <h2>When the answer is no</h2>
      <ul>
        <li>
          <strong>The task is too small.</strong> The running cost eats the saving.
        </li>
        <li>
          <strong>The task varies too much.</strong> The routine share is too low to matter.
        </li>
        <li>
          <strong>The process is about to change.</strong> If you are replacing the system next year, wait and
          automate the new one.
        </li>
        <li>
          <strong>A simpler fix exists.</strong> A template, a rule in software you already own, or deleting the
          task altogether.
        </li>
      </ul>
      <p>
        A good provider will tell you when the numbers do not stack up. Ask them to show you the arithmetic.
      </p>

      <h2>Five questions to ask before you sign</h2>
      <ul>
        <li>Is the price fixed, and what exactly is in scope?</li>
        <li>What will it cost to run each month, and what makes that go up?</li>
        <li>What happens to the cases it cannot handle?</li>
        <li>Who looks after it, and what do I keep if we part ways?</li>
        <li>How will we measure whether it worked?</li>
      </ul>
      <p>
        If you want to choose the right task before you run the numbers, read{' '}
        <Link href="/insights/what-to-automate-first">what to automate first</Link>. If you would like us to
        check your sums, send the estimate from the{' '}
        <Link href="/tools/automation-savings-calculator">calculator</Link> and we will tell you what we see.
      </p>
    </>
  );
}
