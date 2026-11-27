import Link from 'next/link';
import { type ArticleMeta } from '@/content/articles/types';

export const meta: ArticleMeta = {
  slug: 'what-to-automate-first',
  title: 'What to automate first in a small business, and what to leave alone',
  seoTitle: 'What to automate first in a small business',
  description:
    'Most businesses start with the wrong task. Here are five tests for choosing the first thing to automate, and four kinds of work to leave alone.',
  topic: 'Automation',
  published: '2026-11-24',
  minutes: 6,
};

export function Body() {
  return (
    <>
      <p>
        Most small businesses that try automation start with the task that annoys them most, or the one that
        would look most impressive. Neither is a good guide. The first thing you automate should be boring,
        frequent, and easy to check.
      </p>
      <p>
        Get one small automation working and two things happen. You get some hours back, and you learn enough to
        choose the second one well. Start too big and you get neither.
      </p>

      <h2>Five tests for a good first task</h2>
      <ol>
        <li>
          <strong>It happens often.</strong> Weekly at least, and daily is better. A task you do twice a year
          will not repay the setup, and nobody will remember how the automation works when it breaks.
        </li>
        <li>
          <strong>The steps are the same each time.</strong> If you can write the task as a checklist a new
          starter could follow, software can probably follow it too. If the checklist says &ldquo;use your
          judgement&rdquo; at step two, it is not ready.
        </li>
        <li>
          <strong>The inputs are already digital.</strong> Emails, web forms, spreadsheets, and typed PDFs are
          easy. Handwritten notes and phone calls can be handled, but they add cost and mistakes.
        </li>
        <li>
          <strong>Mistakes are cheap and easy to spot.</strong> For a first build, choose work where a wrong
          result is caught before it matters. Creating a draft is safer than sending it. Entering a bill is
          safer than paying it.
        </li>
        <li>
          <strong>You can measure it today.</strong> If you cannot say how long the task takes now, you will not
          be able to say whether automating it helped. Time it for a week first.
        </li>
      </ol>
      <p>
        A task that passes all five is a strong candidate. Four is usually fine. If it passes two, pick another
        task.
      </p>

      <h2>Where good first tasks usually hide</h2>
      <ul>
        <li>
          <strong>Retyping.</strong> Copying data from one system into another: orders into the accounting
          software, form submissions into the CRM, timesheets into payroll.
        </li>
        <li>
          <strong>Sorting.</strong> An inbox where someone reads every message only to decide who should deal
          with it.
        </li>
        <li>
          <strong>Chasing.</strong> Reminders for overdue invoices, unsigned documents, and information a
          customer still owes you.
        </li>
        <li>
          <strong>Assembling.</strong> A report built by hand each week from the same three places.
        </li>
        <li>
          <strong>Setting up.</strong> The accounts, welcome emails, and checklists that go with every new
          customer or new starter.
        </li>
      </ul>
      <p>
        None of these is glamorous. That is the point. They are the same every time, they happen constantly, and
        nobody would miss doing them.
      </p>

      <h2>What to leave alone, for now</h2>
      <ul>
        <li>
          <strong>A process nobody agrees on.</strong> If three people do the job three ways, automating it
          locks in one version and starts an argument. Agree on the steps first. Automating a broken process
          gives you a faster broken process.
        </li>
        <li>
          <strong>Rare, high-stakes work.</strong> The end-of-year accounts or a once-a-year tender. There is
          too little repetition to repay the build, and too much at risk to learn on.
        </li>
        <li>
          <strong>Work where the relationship is the point.</strong> A difficult customer call, a negotiation,
          a note to someone who has had bad news. Software can prepare. A person should decide and send.
        </li>
        <li>
          <strong>Anything you could simply stop.</strong> Before you automate a report, ask who reads it. The
          cheapest automation is a task you no longer do.
        </li>
      </ul>

      <h2>Automation or an AI agent?</h2>
      <p>
        Plain automation follows fixed steps: when this happens, do that. It is cheaper to build, easy to test,
        and does the same thing every time. Use it wherever the steps are known.
      </p>
      <p>
        An AI agent earns its place at the step that needs reading or judgement: a supplier invoice in an
        unfamiliar layout, a customer email that could mean three things. Many good builds are mostly plain
        automation with one AI step in the middle. We explain the difference in more detail on the{' '}
        <Link href="/services/ai-agents-automation">AI agents and automation page</Link>.
      </p>

      <h2>How to run the first one</h2>
      <ol>
        <li>
          <strong>Time the task for a week.</strong> How long it takes, how often, and who does it.
        </li>
        <li>
          <strong>Write the steps down.</strong> Mark every point where someone has to decide something.
        </li>
        <li>
          <strong>Put a number on it.</strong> The{' '}
          <Link href="/tools/automation-savings-calculator">savings calculator</Link> turns the hours into a
          yearly cost in about a minute.
        </li>
        <li>
          <strong>Automate the routine cases.</strong> Send the exceptions to a person. Trying to handle every
          odd case is what makes a small build expensive.
        </li>
        <li>
          <strong>Give it its own account.</strong> The automation should sign in as itself, with only the
          access the job needs. It takes an hour at the start and saves a clean-up later. We cover this in{' '}
          <Link href="/insights/agent-access-least-privilege">
            how to give an AI agent access without handing it the keys
          </Link>
          .
        </li>
        <li>
          <strong>Run it beside the manual way for two weeks.</strong> Compare the results before you switch
          over.
        </li>
        <li>
          <strong>Measure again after a month.</strong> That number tells you whether to do a second one.
        </li>
      </ol>

      <h2>The mistake to avoid</h2>
      <p>
        The most common mistake is scope. &ldquo;Automate accounts&rdquo; is a programme of work with no clear
        end. &ldquo;Enter supplier invoices from the accounts inbox as draft bills&rdquo; is a job you can
        build, test, and measure.
      </p>
      <p>
        If you are not sure whether a task is worth it, work through{' '}
        <Link href="/insights/automation-payback">how to tell if automation will pay for itself</Link>. If your
        accounts and files are in a mess, do{' '}
        <Link href="/insights/it-housekeeping-before-automation">the IT housekeeping</Link> first. And if you
        would like a second opinion on where to start, <Link href="/#contact">tell us about the task</Link>.
      </p>
    </>
  );
}
