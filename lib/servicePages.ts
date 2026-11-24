import {
  AGENT_PRINCIPLES,
  AUTOMATIONS,
  SECURITY_TRACKS,
  type CONTACT_INTERESTS,
} from '@/lib/constants';

/**
 * Content for the service pages at /services/[slug].
 *
 * These pages exist so a visitor from a search or an ad lands on the one thing
 * they asked about, with a form on the same page. Edit the copy here.
 *
 * OWNER NOTE: the questions and answers describe how you work. Check each one
 * is true for you before you send traffic to these pages.
 */

export interface ServiceGroup {
  /** Optional anchor, for links such as /services/ai-agents-automation#automation. */
  id?: string;
  heading: string;
  intro: string;
  items: readonly { icon: string; title: string; description: string }[];
}

export interface ServicePage {
  slug: string;
  /** Short name used in breadcrumbs and links. */
  name: string;
  eyebrow: string;
  /** Headline in two parts. The second is the highlighted phrase. */
  title: [string, string];
  lead: string;
  metaTitle: string;
  metaDescription: string;
  interest: (typeof CONTACT_INTERESTS)[number];
  /** A large two-tone statement under the hero: the claim, then the support. */
  statement: [string, string];
  groups: ServiceGroup[];
  faqs: { question: string; answer: string }[];
  /** Article slugs to link at the end of the page. */
  related: string[];
  cta: { title: [string, string]; description: string };
}

const track = (id: (typeof SECURITY_TRACKS)[number]['id']) => SECURITY_TRACKS.find((item) => item.id === id)!;

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'ai-agents-automation',
    name: 'AI agents and automation',
    eyebrow: 'AI agents and automation',
    title: ['AI agents and automation', 'that finish the job.'],
    lead: 'We build agents and workflows that take real work off your team: reading documents, triaging alerts, answering enquiries, moving data between systems. Each one is scoped, tested, and logged so you can trust what it does.',
    metaTitle: 'AI agents and automation, Melbourne',
    metaDescription:
      'AI agents and workflow automation for Australian businesses, built by a cyber security engineer. Least-privilege access, human approval, and a full audit log.',
    interest: 'AI agents',
    statement: [
      'An agent is only useful if you can trust it with real access.',
      'So every build starts with what it is allowed to touch, who approves the risky steps, and how you will see what it did.',
    ],
    groups: [
      {
        heading: 'How we engineer agents',
        intro:
          'An agent can plan, call your systems, and complete a task from start to end. The same four rules apply to every one we ship.',
        items: AGENT_PRINCIPLES,
      },
      {
        id: 'automation',
        heading: 'Automation, where an agent is overkill',
        intro:
          'A lot of work is better served by plain automation. It costs less to run, it is easier to test, and it does the same thing every time. We reach for an agent only where the task needs judgement.',
        items: AUTOMATIONS,
      },
    ],
    faqs: [
      {
        question: 'What is the difference between an AI agent and automation?',
        answer:
          'Automation follows fixed steps: when this happens, do that. An agent is given a goal and works out the steps itself, choosing which tools to call along the way. Automation is cheaper and more predictable, so we use it wherever the steps are known. We use an agent where the work needs judgement, such as reading a messy document or deciding how to route an enquiry.',
      },
      {
        question: 'How do you stop an agent doing something it should not?',
        answer:
          'Four ways. It gets only the access its job needs, and read-only unless there is a reason to write. Irreversible or high-value actions wait for a named person to approve them. It is tested against adversarial inputs before launch and after every change. And every prompt, tool call, and decision is logged, so you can audit a run or replay it.',
      },
      {
        question: 'Where does our data go?',
        answer:
          'That depends on the model and hosting chosen for your build, and it is one of the first things we settle. We design so the least possible data leaves your environment, and we tell you exactly where it goes before you approve the work.',
      },
      {
        question: 'Which AI models and tools do you use?',
        answer:
          'We choose the model and tooling to fit the job, your data requirements, and what your team can maintain. We explain the choice and the alternatives in the design, and we avoid locking you into anything you cannot run without us.',
      },
      {
        question: 'What does a build cost?',
        answer:
          'It depends on scope. A focused automation between two systems is a much smaller job than an agent that works across several. We scope each build and give you a price in writing before any work starts.',
      },
    ],
    related: ['agent-access-least-privilege', 'prompt-injection-explained'],
    cta: {
      title: ['Tell us what you want', 'off your plate.'],
      description:
        'Describe the task that eats your team’s time. We will tell you whether it needs an agent, plain automation, or neither.',
    },
  },
  {
    slug: 'cyber-security',
    name: 'Cyber security',
    eyebrow: 'Cyber security',
    title: ['Cyber security you can prove,', 'not just claim.'],
    lead: 'Hands-on engineering to harden and monitor your environment, and the governance to show customers, insurers, and auditors that it works. From a practising security engineer, not a reseller.',
    metaTitle: 'Cyber security and governance, Melbourne',
    metaDescription:
      'Security engineering and governance for Australian businesses: Microsoft 365 hardening, detection, Essential Eight and ASD Essentials, ISO 27001 readiness.',
    interest: 'Cyber security',
    statement: [
      'Most small businesses do not need more security products.',
      'They need the ones they already own configured properly, someone watching, and evidence they can hand to whoever asks.',
    ],
    groups: [
      { heading: track('technical').heading, intro: track('technical').intro, items: track('technical').items },
      { heading: track('governance').heading, intro: track('governance').intro, items: track('governance').items },
    ],
    faqs: [
      {
        question: 'Is the Essential Eight still worth working on?',
        answer:
          'ASD is replacing the Essential Eight with its Essentials series, and the Essential Eight stays in place during the changeover. We assess against the Essential Eight today and map the result to the Essentials, so the work you do now is not wasted.',
      },
      {
        question: 'We are a small business. Where should we start?',
        answer:
          'Usually with identity and email, because that is where most incidents begin: multi-factor authentication on every account, admin rights cut back, and Microsoft 365 or Google Workspace configured to a secure baseline. After that, backups you have tested and a short plan for what to do when something goes wrong.',
      },
      {
        question: 'Can you work alongside our existing IT provider?',
        answer:
          'Yes. Many clients keep their IT provider for day-to-day support and bring us in for the security design, the assessment, or the governance work. We write findings so your provider can act on them.',
      },
      {
        question: 'Do we need ISO 27001?',
        answer:
          'Only if a customer, tender, or regulator asks for it, or you sell to organisations that expect it. It is a real commitment. If nobody is asking yet, a smaller set of well-run controls and clear evidence often answers the same questions for far less effort. We will tell you which applies.',
      },
      {
        question: 'What do we get at the end of an assessment?',
        answer:
          'A written report in plain language: what we found, how serious each finding is, what to fix first, and roughly what each fix involves. You own it, and you can act on it with us, with your IT provider, or yourselves.',
      },
    ],
    related: ['copilot-oversharing-checklist', 'one-page-ai-usage-policy'],
    cta: {
      title: ['Tell us what you need', 'to prove.'],
      description:
        'A customer questionnaire, an insurer’s form, an audit, or a nagging feeling. Say what prompted this and we will tell you the shortest path.',
    },
  },
  {
    slug: 'ai-security',
    name: 'AI security',
    eyebrow: 'AI security',
    title: ['AI security testing,', 'before an attacker does it for you.'],
    lead: 'If you run Copilot, a chatbot, or an agent, it can read and do things on your behalf. We test what it can be talked into, check what it can reach, and put the rules in place to keep it useful and safe.',
    metaTitle: 'AI and LLM security testing, Australia',
    metaDescription:
      'AI and LLM security testing and governance for Australian businesses. Prompt injection, data leakage, and tool abuse, tested by a security engineer.',
    interest: 'Cyber security',
    statement: [
      'We build agents, so we know how they break.',
      'That is the difference between testing an AI system from a checklist and testing it the way an attacker would.',
    ],
    groups: [{ heading: track('ai').heading, intro: track('ai').intro, items: track('ai').items }],
    faqs: [
      {
        question: 'What is prompt injection?',
        answer:
          'It is when text an AI system reads contains instructions that the system follows. The text might be typed by a user, or hidden in an email, document, or web page the system processes. If the system can also take actions, such as sending email or reading files, an attacker can use it to do those things. No model fully prevents it, so the defence is in how the system is designed.',
      },
      {
        question: 'We only use Copilot or ChatGPT. Is this relevant to us?',
        answer:
          'Yes, though the work is different. The main risks are staff putting sensitive information into tools that should not have it, and assistants surfacing files that were shared too widely. A data and access review and a clear usage policy deal with both.',
      },
      {
        question: 'Can you test an agent or chatbot that someone else built?',
        answer:
          'Yes. Tell us what it can access and what it is allowed to do, and we will scope a test. You get a written report of what we could make it do, how serious each finding is, and how to fix it.',
      },
      {
        question: 'How is this different from a normal penetration test?',
        answer:
          'A normal test looks for flaws in code and configuration. An AI system adds a new one: it can be persuaded. We test whether crafted input can make it reveal data, ignore its rules, or misuse the tools it has, using the OWASP Top 10 for LLM Applications as the reference.',
      },
      {
        question: 'Do we need an AI governance framework?',
        answer:
          'Most small businesses need three things first: a list of approved tools, a one-page usage policy, and an owner. Frameworks such as the NIST AI Risk Management Framework and ISO/IEC 42001 matter when customers or regulators start asking for them. We can align you to either when that time comes.',
      },
    ],
    related: ['prompt-injection-explained', 'agent-access-least-privilege'],
    cta: {
      title: ['Tell us what your AI', 'can reach.'],
      description:
        'Name the tools you run and what they have access to. We will tell you what is worth testing and what can wait.',
    },
  },
];

export function getServicePage(slug: string) {
  return SERVICE_PAGES.find((page) => page.slug === slug);
}
