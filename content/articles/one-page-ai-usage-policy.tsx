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
  updated: '2026-11-23',
  minutes: 7,
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

      <h2>The rule that matters most</h2>
      <p>
        If you only get one line of the policy right, make it the one about what goes in. Most AI tools send what
        you type to their provider, and once it is sent you cannot take it back.
      </p>
      <p>
        Australia&rsquo;s privacy regulator takes the same view. In its{' '}
        <a href="https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products">
          guidance on commercially available AI products
        </a>
        , the Office of the Australian Information Commissioner says that, as best practice, organisations should
        not enter personal information, and particularly sensitive information, into publicly available
        generative AI tools such as chatbots. It also points out that privacy obligations cover what an AI tool
        produces about a person, not only what you put in.
      </p>
      <p>
        So write the list of what must never go in as plainly as you can, and use examples from your own business.
        &ldquo;Customer files&rdquo; is easy to agree with and easy to forget. &ldquo;The client intake form&rdquo;
        is harder to get wrong.
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

      <h2>Common mistakes</h2>
      <ul>
        <li>
          <strong>Banning AI outright.</strong> People keep using it, on personal accounts, where you cannot see
          it. A short list of approved tools gives them somewhere safe to go.
        </li>
        <li>
          <strong>Naming a team, not a person.</strong> &ldquo;Ask IT&rdquo; has no owner. One named person
          answers questions faster and hears about mistakes sooner.
        </li>
        <li>
          <strong>Approving a tool without checking the plan.</strong> The same product can treat your data very
          differently on a free plan and a business plan. Check whether the plan you approve lets the provider
          train on what staff enter, and write the plan into the list, not just the product name.
        </li>
        <li>
          <strong>Leaving out the reporting line.</strong> If staff think they will be blamed, you will hear about
          a mistake weeks late, or never. The last line of the template is there for a reason.
        </li>
        <li>
          <strong>Writing it once.</strong> The approved list goes out of date the first time someone finds a
          better tool. A policy nobody has updated is one nobody trusts.
        </li>
      </ul>

      <h2>How this lines up with the government guidance</h2>
      <p>
        The National AI Centre&rsquo;s{' '}
        <a href="https://www.industry.gov.au/publications/guidance-ai-adoption">Guidance for AI Adoption</a>,
        published in October 2025, sets out six essential practices for using AI responsibly. A one-page policy
        does not cover all six, and it helps to know which ones it touches.
      </p>
      <ol>
        <li>
          <strong>Decide who is accountable.</strong> Covered: the policy names an owner.
        </li>
        <li>
          <strong>Understand impacts and plan accordingly.</strong> Not covered. This is about thinking through
          who an AI system affects before you deploy one.
        </li>
        <li>
          <strong>Measure and manage risks.</strong> Partly covered, through the approved tools list and the
          data rules.
        </li>
        <li>
          <strong>Share essential information.</strong> Covered: staff are upfront with customers about AI use.
        </li>
        <li>
          <strong>Test and monitor.</strong> Not covered. This matters once you build or deploy something.
        </li>
        <li>
          <strong>Maintain human control.</strong> Covered: staff check output before they rely on it.
        </li>
      </ol>
      <p>
        The same guidance comes with a fuller{' '}
        <a href="https://www.industry.gov.au/publications/guidance-for-ai-adoption/ai-policy-guide-and-template">
          AI policy guide and template
        </a>
        . It runs to several pages and covers developing and deploying AI systems as well as using them. Start
        with one page, and move to the fuller template when the next section describes you.
      </p>

      <h2>When one page stops being enough</h2>
      <ul>
        <li>
          <strong>You put AI in front of customers.</strong> A chatbot on your website or an assistant that
          replies to enquiries makes you the one deploying AI, not only using it.
        </li>
        <li>
          <strong>You give AI access to your systems.</strong> An agent that can read the inbox or update the CRM
          needs rules about access and approval, which we cover in{' '}
          <Link href="/insights/agent-access-least-privilege">
            how to give an AI agent access without handing it the keys
          </Link>
          .
        </li>
        <li>
          <strong>You handle health, financial, or children&rsquo;s information.</strong> Your obligations are
          heavier, and the policy should say how AI fits within them.
        </li>
        <li>
          <strong>Someone asks to see it.</strong> When a customer, an insurer, or a tender asks how you govern
          AI, they usually expect more than a page.
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
        This is general guidance for getting started, not legal advice. If you handle health, financial, or
        children&rsquo;s information, get advice that fits your obligations.
      </p>

      <h2>Sources and further reading</h2>
      <ul>
        <li>
          National AI Centre,{' '}
          <a href="https://www.industry.gov.au/publications/guidance-ai-adoption">Guidance for AI Adoption</a>{' '}
          (October 2025)
        </li>
        <li>
          National AI Centre,{' '}
          <a href="https://www.industry.gov.au/publications/guidance-for-ai-adoption/ai-policy-guide-and-template">
            AI policy guide and template
          </a>
        </li>
        <li>
          National AI Centre,{' '}
          <a href="https://www.ai.gov.au/staying-safe-and-responsible/essential-ai-practices/create-ai-policy">
            Create an AI policy
          </a>
        </li>
        <li>
          Office of the Australian Information Commissioner,{' '}
          <a href="https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products">
            Guidance on privacy and the use of commercially available AI products
          </a>
        </li>
      </ul>
    </>
  );
}
