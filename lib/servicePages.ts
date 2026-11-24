import {
  AGENT_PRINCIPLES,
  AUTOMATIONS,
  SAVINGS,
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
 *
 * The IT support page was written from three answers: it covers Microsoft 365
 * and Google Workspace administration, projects and migrations, and security.
 * It says plainly that hardware, printers, and office networks are not
 * included. Change that here if it is wrong.
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
    lead: 'We build agents and workflows that take hours of manual work off your team: reading documents, answering enquiries, moving data between systems. You get the time back, fewer errors, and a price agreed before we start.',
    metaTitle: 'AI agents and automation, Melbourne',
    metaDescription:
      'AI agents and workflow automation that take manual work and cost out of Australian businesses. Scoped and priced up front, and built securely in Melbourne.',
    interest: 'AI agents',
    statement: [
      'The cheapest hour of work is the one nobody has to do.',
      'We look for the tasks that follow the same steps every time, automate them from start to end, and keep a person on the decisions that matter.',
    ],
    groups: [
      {
        heading: 'Where the savings come from',
        intro:
          'Automation pays off in four ways. We look for all four before we recommend building anything.',
        items: SAVINGS,
      },
      {
        heading: 'Safe by design, which is why it ships sooner',
        intro:
          'An agent can plan, call your systems, and complete a task from start to end. Four rules are built into every one from the first day, so there is no security review to wait for at the end.',
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
        question: 'How do we know it will save money?',
        answer:
          'Before we build anything, we work out how many hours the task takes now and what the automation will cost to build and run. You see both numbers. If they do not stack up, we will say so, and sometimes the right answer is a simpler fix.',
      },
      {
        question: 'Does building it securely slow things down?',
        answer:
          'No. The controls are part of the design from the first diagram, so there is no separate security review to wait for at the end. It also means fewer surprises when a customer or an insurer asks how the system works.',
      },
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
    slug: 'it-support',
    name: 'IT support',
    eyebrow: 'IT support',
    title: ['IT support that keeps', 'the business moving.'],
    lead: 'We look after Microsoft 365 and Google Workspace, run your IT projects and migrations, and set security up properly from the start. Take it as a monthly plan or one job at a time.',
    metaTitle: 'IT support for small business, Melbourne',
    metaDescription:
      'IT support for Australian small businesses: Microsoft 365 and Google Workspace admin, migrations and projects, and security built in. Monthly or by the job.',
    interest: 'IT support',
    statement: [
      'Good IT is the kind you stop noticing.',
      'Accounts that work, files where people expect them, and nothing that depends on one person’s memory. It is also what makes AI and automation possible later.',
    ],
    groups: [
      {
        heading: 'Microsoft 365 and Google Workspace',
        intro: 'The day-to-day administration that keeps accounts, email, and files in order.',
        items: [
          {
            icon: 'UserCheck',
            title: 'Accounts and licences',
            description:
              'Starters set up on day one, leavers removed the day they go, and no licences paid for that nobody uses.',
          },
          {
            icon: 'Inbox',
            title: 'Email and domains',
            description:
              'Mailboxes, shared inboxes, and the records that keep your email out of spam folders.',
          },
          {
            icon: 'Layers',
            title: 'Files and sharing',
            description:
              'Shared drives and sites organised so people find things, with access that matches who should see what.',
          },
          {
            icon: 'Gauge',
            title: 'Tenant health',
            description:
              'Settings reviewed against a secure baseline, and every change written down so the setup is never a mystery.',
          },
        ],
      },
      {
        heading: 'Projects and migrations',
        intro: 'One-off jobs with a start, an end, and a scope agreed in writing.',
        items: [
          {
            icon: 'ArrowRightLeft',
            title: 'Email and cloud migrations',
            description:
              'Moving to Microsoft 365 or Google Workspace, or between them, planned so staff keep working through the change.',
          },
          {
            icon: 'Wrench',
            title: 'New business setup',
            description:
              'Domains, email, accounts, and file storage set up properly the first time, ready for your first hire.',
          },
          {
            icon: 'Repeat',
            title: 'Onboarding and offboarding',
            description:
              'A process that runs the same way for every starter and leaver, so access is granted and removed on time.',
          },
          {
            icon: 'Database',
            title: 'Backups',
            description:
              'Backups for the cloud data your provider does not protect for you, tested so you know a restore works.',
          },
        ],
      },
      {
        heading: 'Security, set up from the start',
        intro:
          'The work is led by a cyber security engineer, so the secure setup is the default one. It does not add steps for your staff or weeks to the job.',
        items: [
          {
            icon: 'Fingerprint',
            title: 'Sign-in protection',
            description: 'Multi-factor authentication for every account, with stronger rules for administrators.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Email protection',
            description:
              'Phishing and impersonation filters turned on and tuned, plus the records that stop others sending as you.',
          },
          {
            icon: 'KeyRound',
            title: 'Least access',
            description: 'Admin rights kept to the few who need them, and sharing defaults that start out safe.',
          },
          {
            icon: 'Bot',
            title: 'Ready for AI',
            description:
              'Sharing and permissions tidy enough that an assistant such as Copilot can be switched on without surprises.',
          },
        ],
      },
      {
        heading: 'How we work',
        intro: 'Two ways to buy it, and one way of working.',
        items: [
          {
            icon: 'CalendarCheck',
            title: 'Monthly plan',
            description:
              'Ongoing care from someone who knows your setup: changes, reviews, and problems dealt with.',
          },
          {
            icon: 'ListChecks',
            title: 'One job at a time',
            description: 'A migration, a clean-up, or a new setup, scoped and priced in writing before we start.',
          },
          {
            icon: 'MapPin',
            title: 'Remote first',
            description:
              'Most work is done remotely, which keeps it quick and keeps the cost down. Site visits are available when a job needs one.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is not included?',
        answer:
          'Hardware repairs, printers, and office networks. We look after your cloud platform, your accounts, and your projects. If you need someone on site for devices every week, a local provider is a better fit for that part, and we are happy to work alongside one.',
      },
      {
        question: 'Can we start with one job and move to a plan later?',
        answer:
          'Yes. A single job is a good way to see how we work. If you want ongoing care afterwards, the monthly plan picks up from what we already know about your setup.',
      },
      {
        question: 'Do you come on site?',
        answer:
          'When a job needs it. Most of the work is done remotely, which keeps it quick and keeps the cost down. We are based in Melbourne.',
      },
      {
        question: 'We already have an IT provider. Can you still help?',
        answer:
          'Yes. We can take a single project, review the security of your setup, or build automation on top of what they manage. We write everything up so they can keep running it.',
      },
      {
        question: 'How does IT support connect to AI and automation?',
        answer:
          'Tidy accounts, permissions, and data are what make automation possible. Once we know your systems, we can see which manual jobs are worth automating and which are not. Some routine IT tasks, such as onboarding a new starter, can be automated too.',
      },
      {
        question: 'What does it cost?',
        answer:
          'It depends on the size of your team and what you want covered. Either way, you get a price in writing before anything starts.',
      },
    ],
    related: ['copilot-oversharing-checklist', 'one-page-ai-usage-policy'],
    cta: {
      title: ['Tell us what is', 'getting in the way.'],
      description:
        'A messy tenant, a migration you keep putting off, or nobody looking after IT at all. Say where things stand and we will tell you what we would do first.',
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
