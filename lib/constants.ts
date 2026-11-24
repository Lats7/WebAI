/**
 * All site copy and data lives here, so you can change what the site says
 * without touching layout code.
 */

export const COMPANY = {
  name: 'WebAI',
  suffix: 'ProTech',
  fullName: 'WebAI ProTech',
  tagline: 'AI automation, IT support, and security',
  description:
    'AI agents and automation that take manual work and cost out of your business, with IT support to keep it running. Secure by default, without slowing you down. Based in Melbourne.',
  email: 'info@webaiprotech.com',
  phone: '+61 433 062 942',
  location: 'Melbourne, Australia',
  coordinates: { lat: '-37.8136', lon: '144.9631' },
  // The domain that serves the site. Canonical link, sitemap, and share image all build on it.
  url: 'https://www.webaiprotech.com',
  // Replace with your real ABN. The footer hides it while it is all zeros.
  abn: 'ABN 00 000 000 000',
  socials: {
    linkedin: 'https://www.linkedin.com/company/webaiprotech/',
    freelancer: 'https://www.freelancer.com/u/Lats7',
  },
  reviews: {
    rating: '5.0',
    count: 18,
    countries: '10+',
  },
} as const;

/**
 * Optional "book a call" link, for example a Google Calendar appointment page,
 * Cal.com, or Calendly. Every booking button stays hidden until this has a
 * link that starts with https://. Set NEXT_PUBLIC_BOOKING_URL in the host, or
 * put the link here, then redeploy.
 */
export const BOOKING: { url: string; label: string; note: string } = {
  url: process.env.NEXT_PUBLIC_BOOKING_URL ?? '',
  label: 'Book a call',
  note: 'Pick a time that suits you.',
};

/** The booking link, or an empty string while it is not set or not a secure link. */
export const BOOKING_URL = /^https:\/\/[^\s"'<>]+$/.test(BOOKING.url) ? BOOKING.url : '';

/** Shorter description for search results and share cards (under 155 characters). */
export const META_DESCRIPTION =
  'AI agents and automation that cut manual work and cost, plus IT support for Australian businesses. Built securely by a Melbourne team.';

/** Every page on the site, in the order used by the sitemap and the command menu. */
export const PAGES = [
  { href: '/', label: 'Home' },
  { href: '/services/ai-agents-automation', label: 'AI agents and automation' },
  { href: '/services/it-support', label: 'IT support' },
  { href: '/tools/automation-savings-calculator', label: 'Automation savings calculator' },
  { href: '/ai-readiness-review', label: 'AI Readiness Review' },
  { href: '/tools/ai-readiness-check', label: 'AI readiness self-check' },
  { href: '/services/cyber-security', label: 'Cyber security' },
  { href: '/services/ai-security', label: 'AI security' },
  { href: '/work', label: 'Work' },
  { href: '/insights', label: 'Insights' },
  { href: '/privacy', label: 'Privacy' },
] as const;

/** The top navigation, in priority order: what we do first, then proof. Keep it to five so it fits. */
export const NAV_ITEMS = [
  { label: 'AI & automation', href: '/services/ai-agents-automation' },
  { label: 'IT support', href: '/services/it-support' },
  { label: 'Security', href: '/services/cyber-security' },
  { label: 'Self-check', href: '/tools/ai-readiness-check' },
  { label: 'Work', href: '/work' },
] as const;

/** Extra links shown in the phone menu, where there is room for them. */
export const NAV_MORE = [
  { label: 'Readiness review', href: '/ai-readiness-review' },
  { label: 'Insights', href: '/insights' },
] as const;

/** Section order, used by the mission status bar readout. */
export const SECTIONS = [
  { id: 'top', label: 'Overview' },
  { id: 'services', label: 'Services' },
  { id: 'agents', label: 'AI & automation' },
  { id: 'it-support', label: 'IT support' },
  { id: 'security', label: 'Security & AI readiness' },
  { id: 'build', label: 'CRM, web & apps' },
  { id: 'approach', label: 'Approach' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
] as const;

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export type StepKind = 'trigger' | 'plan' | 'tool' | 'guard' | 'hold' | 'done';

export const STEP_KIND_LABEL: Record<StepKind, string> = {
  trigger: 'Trigger',
  plan: 'Plan',
  tool: 'Tool',
  guard: 'Guard',
  hold: 'Approval',
  done: 'Done',
};

export interface AgentRun {
  id: string;
  title: string;
  domain: string;
  /** Role that signs off the approval step. */
  approver: string;
  autonomy: string;
  /** Scope check, output check, and approval gate, in that order. */
  guardrails: [string, string, string];
  steps: { t: string; kind: StepKind; text: string }[];
}

/** Simulated agent runs shown in the hero console. Illustrative, not client data. */
export const AGENT_RUNS: AgentRun[] = [
  {
    id: 'invoice-intake',
    title: 'Invoice intake',
    domain: 'Finance',
    approver: 'Finance lead',
    autonomy: 'Drafts, then asks',
    guardrails: ['Least-privilege scope', 'Totals and ABN validated', 'Spend limit gate'],
    steps: [
      { t: '00:00.0', kind: 'trigger', text: 'New invoice email lands in the accounts inbox' },
      { t: '00:00.6', kind: 'plan', text: 'Extract the fields, match the purchase order, draft the bill' },
      { t: '00:01.9', kind: 'tool', text: 'extract_document(invoice.pdf) returned 14 fields' },
      { t: '00:02.4', kind: 'guard', text: 'Totals and ABN validated, personal data masked in logs' },
      { t: '00:03.1', kind: 'tool', text: 'match_purchase_order() found the PO, amounts agree' },
      { t: '00:03.3', kind: 'hold', text: 'Over the approval limit: waiting for Finance' },
      { t: '00:41.0', kind: 'done', text: 'Approved. Bill drafted and audit log written' },
    ],
  },
  {
    id: 'alert-triage',
    title: 'Security alert triage',
    domain: 'Security operations',
    approver: 'Duty analyst',
    autonomy: 'Recommends only',
    guardrails: ['Read-only scope', 'Evidence preserved', 'Containment gate'],
    steps: [
      { t: '00:00.0', kind: 'trigger', text: 'Impossible-travel sign-in alert raised by the SIEM' },
      { t: '00:00.5', kind: 'plan', text: 'Enrich the user, device, and IP, then score the risk' },
      { t: '00:01.4', kind: 'tool', text: 'query_signin_logs(user, 24h) shows 2 countries in 9 minutes' },
      { t: '00:02.2', kind: 'tool', text: 'lookup_ip_reputation() flags an anonymising proxy' },
      { t: '00:02.6', kind: 'guard', text: 'Read-only scope confirmed, containment needs approval' },
      { t: '00:02.8', kind: 'hold', text: 'Recommends revoking sessions: waiting for the analyst' },
      { t: '01:12.0', kind: 'done', text: 'Approved. Sessions revoked, ticket mapped to ATT&CK T1078' },
    ],
  },
  {
    id: 'lead-response',
    title: 'Lead response',
    domain: 'Sales',
    approver: 'Account owner',
    autonomy: 'Drafts, then asks',
    guardrails: ['CRM scope only', 'Consent and messaging check', 'First-touch review'],
    steps: [
      { t: '00:00.0', kind: 'trigger', text: 'New enquiry submitted through the website form' },
      { t: '00:00.4', kind: 'plan', text: 'Qualify the lead, check CRM history, draft a reply' },
      { t: '00:01.1', kind: 'tool', text: 'crm.find_contact() matched an account with 2 open deals' },
      { t: '00:01.8', kind: 'tool', text: 'calendar.find_slots() returned 3 options this week' },
      { t: '00:02.3', kind: 'guard', text: 'Consent on record, reply matches approved messaging' },
      { t: '00:02.5', kind: 'hold', text: 'First-touch email drafted: waiting for the account owner' },
      { t: '00:58.0', kind: 'done', text: 'Sent. CRM updated and follow-up task created' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Services overview                                                          */
/* -------------------------------------------------------------------------- */

export interface Service {
  slug: string;
  code: string;
  title: string;
  icon: 'Bot' | 'Workflow' | 'CloudCog' | 'ShieldCheck' | 'Contact' | 'AppWindow';
  href: string;
  tier: 'core' | 'support';
  description: string;
  features: string[];
}

/**
 * The order here is the order of priority on the site: AI and automation
 * first, IT support second, then security and AI readiness as one vertical.
 */
export const SERVICES: Service[] = [
  {
    slug: 'agentic-ai',
    code: '01',
    title: 'AI agents',
    icon: 'Bot',
    href: '/services/ai-agents-automation',
    tier: 'core',
    description:
      'Agents that plan, use your tools, and finish multi-step work, so your team gets those hours back. A person approves the steps that matter.',
    features: [
      'Single and multi-agent systems',
      'RAG and knowledge assistants',
      'Tool and MCP integrations',
      'Evaluations and guardrails',
    ],
  },
  {
    slug: 'automation',
    code: '02',
    title: 'Automation',
    icon: 'Workflow',
    href: '/services/ai-agents-automation#automation',
    tier: 'core',
    description:
      'Workflows that move data between your systems on their own. Cheaper to run than a person retyping it, and the same result every time.',
    features: [
      'Workflow orchestration',
      'Document processing',
      'API and system integrations',
      'Scheduled reporting',
    ],
  },
  {
    slug: 'it-support',
    code: '03',
    title: 'IT support',
    icon: 'CloudCog',
    href: '/services/it-support',
    tier: 'core',
    description:
      'Microsoft 365 and Google Workspace looked after, projects and migrations done properly, and security set up from the start.',
    features: [
      'Microsoft 365 and Google Workspace',
      'Projects and migrations',
      'Security set up from the start',
      'Monthly plan or one-off jobs',
    ],
  },
  {
    slug: 'cyber-security',
    code: '04',
    title: 'Security and AI readiness',
    icon: 'ShieldCheck',
    href: '/#security',
    tier: 'core',
    description:
      'Know that AI is safe to switch on, and prove your security to the people who ask. It is built into everything above, and available on its own.',
    features: [
      'AI Readiness Review',
      'AI and LLM security testing',
      'Hardening and monitoring',
      'Essential Eight, ASD Essentials, ISO 27001',
    ],
  },
  {
    slug: 'crm',
    code: '05',
    title: 'CRM',
    icon: 'Contact',
    href: '/#build',
    tier: 'support',
    description:
      'A CRM your team wants to use: configured, cleaned up, integrated, and automated.',
    features: ['Implementation', 'Data migration', 'Pipeline automation'],
  },
  {
    slug: 'web-app',
    code: '06',
    title: 'Web and app design',
    icon: 'AppWindow',
    href: '/#build',
    tier: 'support',
    description:
      'Websites, web apps, and mobile apps, designed and built end to end.',
    features: ['Websites', 'Web apps and SaaS', 'Mobile apps'],
  },
];

/**
 * Where automation saves money. Shown on the home page and the AI agents and
 * automation page.
 *
 * OWNER NOTE: these describe outcomes in general terms, with no figures. If
 * you have real numbers from client work, add them here. Do not add a figure
 * you could not back up if a client asked.
 */
export const SAVINGS = [
  {
    icon: 'Clock',
    title: 'Hours back',
    description:
      'Work that took someone an afternoon runs on its own. Your team spends that time on customers instead.',
  },
  {
    icon: 'CheckCheck',
    title: 'Fewer mistakes',
    description:
      'Data is entered once and moved by software, so nothing is retyped, missed, or sent to the wrong place.',
  },
  {
    icon: 'Zap',
    title: 'Faster turnaround',
    description:
      'Quotes, invoices, and replies go out when the work arrives, not when someone gets to it.',
  },
  {
    icon: 'Receipt',
    title: 'Costs you can plan',
    description:
      'You get a scope and a price in writing before we start, with the running costs worked out up front.',
  },
] as const;

/* -------------------------------------------------------------------------- */
/* IT support                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * OWNER NOTE: this is what the site says IT support covers. It was written
 * from three answers: Microsoft 365 and Google Workspace administration,
 * projects and migrations, and security. It does not offer a staff helpdesk
 * or device and network support. Change it here if that is wrong.
 */
export const IT_SUPPORT = {
  covers: [
    {
      icon: 'CloudCog',
      title: 'Microsoft 365 and Google Workspace',
      description:
        'Accounts, licences, email, and shared files kept in order. Starters set up on day one, leavers removed the day they go.',
    },
    {
      icon: 'ArrowRightLeft',
      title: 'Projects and migrations',
      description:
        'Moving email or files to the cloud, setting up a new business, or cleaning up a tenant that grew without a plan.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Security from the start',
      description:
        'Multi-factor authentication, email protection, and safe sharing defaults are part of the setup, not an extra.',
    },
  ],
  ways: [
    {
      icon: 'CalendarCheck',
      title: 'Monthly plan',
      description: 'Ongoing care from someone who knows your setup: changes, reviews, and problems dealt with.',
    },
    {
      icon: 'ListChecks',
      title: 'One job at a time',
      description: 'A migration, a clean-up, or a new setup, scoped and priced in writing before we start.',
    },
    {
      icon: 'MapPin',
      title: 'Remote first',
      description: 'Most work is done remotely, which keeps it quick. Site visits are available when a job needs one.',
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Agents & automation                                                        */
/* -------------------------------------------------------------------------- */

export interface AgentBlueprint {
  id: string;
  name: string;
  domain: string;
  autonomy: string;
  summary: string;
  trigger: string;
  plan: string;
  tools: string[];
  guardrails: string[];
  human: string;
  outcome: string;
}

/** Patterns we build. These describe the design, not a specific client. */
export const AGENT_BLUEPRINTS: AgentBlueprint[] = [
  {
    id: 'document-intake',
    name: 'Document intake agent',
    domain: 'Finance and operations',
    autonomy: 'Drafts, then asks',
    summary:
      'Reads inbound invoices and forms, pulls out the data, checks it, and drafts the record for approval.',
    trigger: 'An email or PDF arrives in a shared inbox.',
    plan: 'Classify the document, extract the fields, validate them against existing records, then draft the entry.',
    tools: ['Document extraction', 'Accounting API', 'CRM lookup'],
    guardrails: ['Schema and totals validation', 'Personal data masked in logs', 'Spend limit policy'],
    human: 'Finance approves anything over the limit or with a failed check.',
    outcome: 'A drafted record with the source attached and every step in the audit log.',
  },
  {
    id: 'alert-triage',
    name: 'Security alert triage agent',
    domain: 'Security operations',
    autonomy: 'Recommends, never contains alone',
    summary:
      'Enriches alerts with identity, device, and threat context so analysts start with an answer, not a queue.',
    trigger: 'The SIEM or EDR raises an alert.',
    plan: 'Gather sign-in, device, and network context, look up indicators, then score and summarise the risk.',
    tools: ['Log search', 'Threat intelligence lookup', 'Identity directory'],
    guardrails: ['Read-only by default', 'Containment requires approval', 'Evidence preserved'],
    human: 'An analyst approves any containment action, such as revoking sessions or isolating a device.',
    outcome: 'An enriched ticket mapped to MITRE ATT&CK with a recommended next step.',
  },
  {
    id: 'lead-response',
    name: 'Lead response agent',
    domain: 'Sales and CRM',
    autonomy: 'Drafts, then asks',
    summary:
      'Qualifies new enquiries, checks the CRM for history, and drafts a first reply with meeting times.',
    trigger: 'A web form, email, or missed call creates a new enquiry.',
    plan: 'Match the contact in the CRM, qualify against your criteria, then draft a reply with available times.',
    tools: ['CRM', 'Calendar', 'Email'],
    guardrails: ['Consent and opt-out check', 'Approved messaging only', 'No pricing commitments'],
    human: 'The account owner reviews first-touch emails before they send.',
    outcome: 'A qualified lead, an updated CRM record, and a follow-up task with a due date.',
  },
  {
    id: 'knowledge-assistant',
    name: 'Knowledge assistant',
    domain: 'Whole of business',
    autonomy: 'Answers with sources',
    summary:
      'Answers staff questions from your own documents and cites the source every time.',
    trigger: 'Someone asks a question in Teams, Slack, or a web chat.',
    plan: 'Search only the documents that person can already open, then answer and cite the passages used.',
    tools: ['Permission-aware search', 'Document store', 'Chat interface'],
    guardrails: ['Existing access controls honoured', 'No source, no answer', 'Sensitive topics routed to a person'],
    human: 'Questions it cannot source go to the document owner.',
    outcome: 'A cited answer in seconds, plus a list of the gaps in your documentation.',
  },
  {
    id: 'compliance-evidence',
    name: 'Compliance evidence agent',
    domain: 'Governance and audit',
    autonomy: 'Collects, never changes',
    summary:
      'Gathers control evidence on a schedule so audit preparation stops being a month of screenshots.',
    trigger: 'A monthly schedule, or an auditor request.',
    plan: 'Pull configuration and activity data for each control, compare it to the last run, then flag what changed.',
    tools: ['Microsoft 365 and cloud APIs', 'Ticketing system', 'Vulnerability scanner'],
    guardrails: ['Read-only access', 'Data minimisation', 'Tamper-evident storage'],
    human: 'The control owner reviews and signs off each evidence pack.',
    outcome: 'A dated evidence pack mapped to your framework, with exceptions listed first.',
  },
];

export const AGENT_PRINCIPLES = [
  {
    icon: 'KeyRound',
    title: 'Least privilege by default',
    description:
      'Each agent gets only the tools and data its job needs. Access stays read-only unless there is a reason to write.',
  },
  {
    icon: 'UserCheck',
    title: 'A person on the switch',
    description:
      'Irreversible or high-value actions wait for a named approver. You decide where that line sits.',
  },
  {
    icon: 'ListChecks',
    title: 'Tested before trusted',
    description:
      'Evaluation suites and adversarial prompts run before launch and again on every change.',
  },
  {
    icon: 'ScrollText',
    title: 'Everything on the record',
    description:
      'Every prompt, tool call, and decision is logged, so you can audit a run or replay it later.',
  },
] as const;

export const AUTOMATIONS = [
  {
    icon: 'Plug',
    title: 'System integrations',
    description: 'Connect the CRM, accounting, ticketing, and inboxes so data is entered once.',
  },
  {
    icon: 'FileText',
    title: 'Document pipelines',
    description: 'Extract, classify, and file invoices, forms, and contracts as they arrive.',
  },
  {
    icon: 'CalendarClock',
    title: 'Scheduled reporting',
    description: 'Reports that build and send themselves from live data, on the day they are due.',
  },
  {
    icon: 'Repeat',
    title: 'Back-office workflows',
    description: 'Onboarding, approvals, and renewals that run the same way every time.',
  },
] as const;

/** The stages drawn in the automation pipeline diagram. */
export const AUTOMATION_PIPELINE = [
  { icon: 'Inbox', label: 'Capture', detail: 'Email, forms, files' },
  { icon: 'ScanSearch', label: 'Extract', detail: 'Fields and line items' },
  { icon: 'ListChecks', label: 'Validate', detail: 'Rules and totals' },
  { icon: 'GitBranch', label: 'Route', detail: 'By type and value' },
  { icon: 'Database', label: 'Update', detail: 'CRM, accounts, reports' },
] as const;

/* -------------------------------------------------------------------------- */
/* Cyber security                                                             */
/* -------------------------------------------------------------------------- */

export interface SecurityTrack {
  id: 'technical' | 'governance' | 'ai';
  label: string;
  code: string;
  heading: string;
  intro: string;
  items: { icon: string; title: string; description: string }[];
}

export const SECURITY_TRACKS: SecurityTrack[] = [
  {
    id: 'technical',
    label: 'Technical',
    code: '01',
    heading: 'Security engineering',
    intro:
      'Hands-on work in your environment: design it properly, harden what exists, and make sure someone sees it when things go wrong.',
    items: [
      {
        icon: 'Layers',
        title: 'Architecture and design review',
        description: 'Threat models and design reviews for cloud, identity, and applications.',
      },
      {
        icon: 'CloudCog',
        title: 'Microsoft 365 and cloud hardening',
        description: 'Entra ID, Conditional Access, Defender, and secure baselines for Azure and AWS.',
      },
      {
        icon: 'Radar',
        title: 'Detection and monitoring',
        description: 'SIEM use cases, alert tuning, and detections mapped to MITRE ATT&CK.',
      },
      {
        icon: 'Bug',
        title: 'Vulnerability management',
        description: 'Scanning, prioritising by real exposure, and a patching rhythm that holds.',
      },
      {
        icon: 'Siren',
        title: 'Incident readiness',
        description: 'Response plans, playbooks, and tabletop exercises before you need them.',
      },
      {
        icon: 'Fingerprint',
        title: 'Application and API security',
        description: 'Secure code review, authentication design, and penetration test remediation.',
      },
    ],
  },
  {
    id: 'governance',
    label: 'Governance',
    code: '02',
    heading: 'Governance, risk, and compliance',
    intro:
      'The paperwork that customers, insurers, and auditors ask for, written so your team can follow it and backed by controls that exist.',
    items: [
      {
        icon: 'Gauge',
        title: 'Essential Eight and ASD Essentials',
        description:
          'An assessment against the Essential Eight, a costed uplift plan, and a map of that work to the ASD Essentials as the guidance changes over.',
      },
      {
        icon: 'BadgeCheck',
        title: 'ISO 27001 readiness',
        description: 'ISMS scope, risk register, Statement of Applicability, and internal audit preparation.',
      },
      {
        icon: 'Scale',
        title: 'Risk assessment',
        description: 'Risks identified, rated, and owned, in language your board can act on.',
      },
      {
        icon: 'BookOpenCheck',
        title: 'Policies and standards',
        description: 'A policy set people can follow, mapped to the controls that support it.',
      },
      {
        icon: 'Handshake',
        title: 'Third-party risk',
        description: 'Supplier assessments and the security clauses to put in your contracts.',
      },
      {
        icon: 'FileBarChart',
        title: 'Board and customer assurance',
        description: 'Security questionnaires answered, and reporting that shows the trend, not the noise.',
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI security',
    code: '03',
    heading: 'Security for AI systems',
    intro:
      'Where the two halves of this business meet. We test and govern AI the way an attacker and an auditor would look at it.',
    items: [
      {
        icon: 'ScanSearch',
        title: 'LLM application testing',
        description: 'Prompt injection, data leakage, and tool abuse, tested against the OWASP Top 10 for LLM Applications.',
      },
      {
        icon: 'KeyRound',
        title: 'Agent permission design',
        description: 'Scopes, approval gates, and kill switches for agents that can take actions.',
      },
      {
        icon: 'Database',
        title: 'Data and access review',
        description: 'Find over-shared files before Copilot or an agent finds them for you.',
      },
      {
        icon: 'ScrollText',
        title: 'AI usage policy',
        description: 'Clear rules for staff use of AI tools, including which data can go where.',
      },
      {
        icon: 'Landmark',
        title: 'AI governance',
        description: 'Controls aligned to the NIST AI Risk Management Framework and ISO/IEC 42001.',
      },
      {
        icon: 'GraduationCap',
        title: 'Team enablement',
        description: 'Practical training so staff use AI well and know what not to paste into it.',
      },
    ],
  },
];

/** Illustrative sample panels. They show the style of deliverable, not real client data. */
export const SAMPLE_ATTACK_COVERAGE = [
  { tactic: 'Initial Access', level: 3 },
  { tactic: 'Execution', level: 2 },
  { tactic: 'Persistence', level: 2 },
  { tactic: 'Privilege Escalation', level: 3 },
  { tactic: 'Defense Evasion', level: 1 },
  { tactic: 'Credential Access', level: 3 },
  { tactic: 'Discovery', level: 1 },
  { tactic: 'Lateral Movement', level: 2 },
  { tactic: 'Collection', level: 1 },
  { tactic: 'Command and Control', level: 2 },
  { tactic: 'Exfiltration', level: 2 },
  { tactic: 'Impact', level: 3 },
] as const;

export const SAMPLE_ESSENTIAL_EIGHT = [
  { control: 'Patch applications', current: 2, target: 3 },
  { control: 'Patch operating systems', current: 2, target: 3 },
  { control: 'Multi-factor authentication', current: 3, target: 3 },
  { control: 'Restrict administrative privileges', current: 1, target: 2 },
  { control: 'Application control', current: 0, target: 2 },
  { control: 'Restrict Microsoft Office macros', current: 2, target: 2 },
  { control: 'User application hardening', current: 1, target: 2 },
  { control: 'Regular backups', current: 2, target: 3 },
] as const;

export const SAMPLE_AI_RISKS = [
  {
    risk: 'Prompt injection through inbound email',
    rating: 'High',
    control: 'Input isolation, tool allow-list, approval gate',
  },
  {
    risk: 'Sensitive data pasted into public AI tools',
    rating: 'High',
    control: 'Approved tools list, DLP rules, staff policy',
  },
  {
    risk: 'Over-shared files surfaced by assistants',
    rating: 'Medium',
    control: 'Permission clean-up, sensitivity labels',
  },
  {
    risk: 'Agent actions nobody reviewed',
    rating: 'Medium',
    control: 'Human approval, full audit log',
  },
] as const;

export const READINESS_REVIEW = {
  title: 'AI Readiness Review',
  description:
    'We are pro-AI, and the fastest way to adopt it is to adopt it safely. In a short, structured review we look at your environment, your data, and your controls, then hand you a gap analysis and a governance roadmap your team can follow.',
  steps: [
    { title: 'Environment and data review', description: 'What you run, what it holds, and who can reach it.' },
    { title: 'Gap analysis', description: 'Where your controls fall short of safe AI use, ranked by risk.' },
    { title: 'Governance and usage policy', description: 'Rules and guardrails your staff can follow.' },
    { title: 'Adoption roadmap', description: 'What to fix first, and which AI projects to start with.' },
  ],
} as const;

/**
 * Price and timing for the AI Readiness Review page. Leave a value as null and
 * the page says the scope is fixed and the price is confirmed in writing first.
 *
 *   price:      for example '$2,950 + GST'
 *   priceNote:  one sentence under the price, for example what it covers
 *   turnaround: for example 'About two weeks from kick-off to written report.'
 */
export const READINESS_OFFER: { price: string | null; priceNote: string | null; turnaround: string | null } = {
  price: null,
  priceNote: null,
  turnaround: null,
};

// Review this list so it names only the frameworks you work to.
export const FRAMEWORKS = [
  'ASD Essential Eight',
  'ASD Essentials',
  'ISO/IEC 27001',
  'NIST CSF 2.0',
  'MITRE ATT&CK',
  'OWASP Top 10 for LLM Applications',
  'NIST AI RMF',
  'ISO/IEC 42001',
  'Privacy Act and NDB scheme',
] as const;

/* -------------------------------------------------------------------------- */
/* CRM, web & apps                                                            */
/* -------------------------------------------------------------------------- */

export const CRM_FEATURES = [
  'Implementation and configuration',
  'Data migration and clean-up',
  'Pipeline and workflow automation',
  'Email, phone, and accounting integrations',
  'AI lead scoring, call notes, and follow-ups',
  'Dashboards, health checks, and training',
] as const;

export const CRM_PIPELINE = [
  { stage: 'New', deals: ['Website enquiry', 'Referral'] },
  { stage: 'Qualified', deals: ['Discovery call booked'] },
  { stage: 'Proposal', deals: ['Scope sent', 'Pricing review'] },
  { stage: 'Won', deals: ['Kick-off scheduled'] },
] as const;

export const WEB_FEATURES = [
  'Marketing and company websites',
  'Web apps and SaaS products',
  'iOS and Android apps',
  'UX and interface design',
  'Design systems and theming',
  'Fast, accessible, and secure by default',
] as const;

/* -------------------------------------------------------------------------- */
/* Approach                                                                   */
/* -------------------------------------------------------------------------- */

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We map the work, what it costs you in time, and the risks before recommending anything. Sometimes the answer is not AI.',
    outputs: ['Process map', 'Risk snapshot'],
  },
  {
    number: '02',
    title: 'Design',
    description:
      'A clear plan with scope, architecture, a threat model, and a definition of what success looks like.',
    outputs: ['Architecture', 'Threat model'],
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Short cycles that end in working software, with evaluations and security checks in each one.',
    outputs: ['Working release', 'Test results'],
  },
  {
    number: '04',
    title: 'Run',
    description:
      'Monitoring, tuning, and support after go-live. If you would rather run it yourself, we hand over cleanly.',
    outputs: ['Runbook', 'Monitoring'],
  },
] as const;

export const DIFFERENTIATORS = [
  {
    icon: 'Clock',
    title: 'We start with the saving',
    description:
      'Before anything is built we work out what the task costs you now and what the fix will cost. If it does not stack up, we say so.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Secure, without the slowdown',
    description:
      'The person designing your systems also threat-models them. Controls are in the first diagram, so nothing waits on a review at the end.',
  },
  {
    icon: 'Wrench',
    title: 'Senior hands on the work',
    description:
      'You talk to the person doing the build. Nothing gets handed to a junior after the sale.',
  },
  {
    icon: 'BookOpen',
    title: 'Built to be handed over',
    description:
      'Documented, tested, and yours. You get the code, the runbook, and the reasoning behind each decision.',
  },
  {
    icon: 'MapPin',
    title: 'Melbourne based',
    description:
      'Local hours and Australian context, including ASD guidance and the Privacy Act.',
  },
] as const;

export const STATS = [
  { value: '50+', label: 'Projects delivered' },
  { value: '5.0', label: 'Average client rating' },
  { value: '18', label: 'Verified reviews' },
  { value: '10+', label: 'Countries served' },
] as const;

/* -------------------------------------------------------------------------- */
/* Work and founder                                                           */
/* -------------------------------------------------------------------------- */

/**
 * "Who you will work with" section. It stays hidden until `enabled` is true.
 * Fill in the details, set `enabled: true`, and it appears on the home page
 * and the Work page.
 *
 *   photo: a path under /public, for example '/founder.jpg' (optional)
 */
export const FOUNDER: {
  enabled: boolean;
  name: string;
  role: string;
  bio: string[];
  credentials: string[];
  linkedin: string;
  photo: string;
} = {
  enabled: false,
  name: '',
  role: '',
  bio: [],
  credentials: [],
  linkedin: '',
  photo: '',
};

/**
 * Projects shown on the Work page. Each one is matched to its verified review
 * by the reviewer's name.
 *
 * `kind` is a broad category inferred from the project title. Check each one.
 *
 * To turn a snapshot into a full case study, add any of the optional fields.
 * Only add what is true and what the client is happy to see published:
 *
 *   summary:  one sentence on what was built
 *   problem:  what was slow, risky, or manual before
 *   approach: what you built and how
 *   outcome:  what changed, ideally with a number
 */
export interface Project {
  reviewer: string;
  kind: 'AI agents' | 'Automation' | 'Web and apps' | 'Infrastructure';
  summary?: string;
  problem?: string;
  approach?: string;
  outcome?: string;
}

export const PROJECTS: Project[] = [
  { reviewer: 'Mohammed A.', kind: 'AI agents' },
  { reviewer: 'Christian G.', kind: 'AI agents' },
  { reviewer: 'Matt J.', kind: 'AI agents' },
  { reviewer: 'Jared A.', kind: 'AI agents' },
  { reviewer: 'Brett C.', kind: 'Automation' },
  { reviewer: 'Stefan P.', kind: 'Automation' },
  { reviewer: 'Bradley M.', kind: 'Automation' },
  { reviewer: 'Alwin N.', kind: 'Web and apps' },
  { reviewer: 'Alessandro V.', kind: 'Web and apps' },
  { reviewer: 'Former Client', kind: 'Web and apps' },
  { reviewer: 'Jhoan A.', kind: 'Infrastructure' },
  { reviewer: 'Rabih J.', kind: 'Infrastructure' },
];

/* -------------------------------------------------------------------------- */
/* Reviews                                                                    */
/* -------------------------------------------------------------------------- */

export const TESTIMONIALS = [
  {
    quote:
      'They really did great job for my AI project and were very responsive to provide a working solution. A++!',
    author: 'Christian G.',
    project: 'AI Chatbot Platform',
    location: 'Switzerland',
  },
  {
    quote:
      "I recently collaborated with Stefan, a highly skilled professional in Python and AI projects. Their expertise and dedication significantly enhanced our project's success. I highly recommend Stefan for any Python or AI endeavors.",
    author: 'Mohammed A.',
    project: 'Multi-Agent RAG System',
    location: 'Saudi Arabia',
  },
  {
    quote: 'Stefan did a custom web order system for us. Great work and efficient.',
    author: 'Alwin N.',
    project: 'Custom Order System',
    location: 'Hong Kong',
  },
  {
    quote:
      'WebAIProTech demonstrated exceptional skill and efficiency, completing the project exactly within the agreed timeframe. His level of communication was incredible: responsive and kept me updated at every step.',
    author: 'Alessandro V.',
    project: 'Chrome Extension',
    location: 'Italy',
  },
  {
    quote:
      'Stefan was great at understanding the scope of the project, and going above and beyond to tweak the code to better suit the goals of the tool he built.',
    author: 'Brett C.',
    project: 'PDF Parsing & AI Tool',
    location: 'United States',
  },
  {
    quote:
      'Very easy to work with, great communication, and quick delivery. Would definitely work with again.',
    author: 'Matt J.',
    project: 'SvelteKit SaaS Chatbot',
    location: 'United States',
  },
  {
    quote: 'Great work! Always on time and went the extra mile for his tasks.',
    author: 'Stefan P.',
    project: 'Medical Data Extraction',
    location: 'Switzerland',
  },
  {
    quote:
      'Stefan is a life saver, he went above and beyond to help me fix an issue I was having with my server. He will be working with me a lot.',
    author: 'Jhoan A.',
    project: 'Server Setup & Fix',
    location: 'United States',
  },
  {
    quote:
      'Stefan has delivered quality work, on time and budget. He is a very proactive Freelancer and works on the project with the end goal in mind. Pleasure to deal with.',
    author: 'Former Client',
    project: 'Website Design',
    location: 'Australia',
  },
  {
    quote: 'Good knowledge of AI & appropriate support systems.',
    author: 'Jared A.',
    project: 'Voice-Powered Diagnostics',
    location: 'United States',
  },
  {
    quote: 'I highly recommend to work with Stefan, very professional and delivers on time.',
    author: 'Rabih J.',
    project: 'Ubuntu Server Admin',
    location: 'United States',
  },
  {
    quote:
      'They really understood the project and the issue and were quickly able to resolve and provide a working solution.',
    author: 'Bradley M.',
    project: 'Python Development',
    location: 'Australia',
  },
] as const;

/**
 * The review shown large above the others. `lead` and `rest` are the same
 * quote split in two, so the first sentence can be set at full contrast.
 */
export const FEATURED_REVIEW = {
  author: 'Mohammed A.',
  lead: 'I recently collaborated with Stefan, a highly skilled professional in Python and AI projects.',
  rest: "Their expertise and dedication significantly enhanced our project's success. I highly recommend Stefan for any Python or AI endeavors.",
} as const;

/* -------------------------------------------------------------------------- */
/* Contact                                                                    */
/* -------------------------------------------------------------------------- */

export const CONTACT_INTERESTS = [
  'AI agents',
  'Automation',
  'IT support',
  'Cyber security',
  'AI Readiness Review',
  'CRM',
  'Website or app',
  'Not sure yet',
] as const;

export const NEXT_STEPS = [
  'A short call to understand the problem.',
  'A written scope with a clear price.',
  'No obligation if it is not the right fit.',
] as const;
