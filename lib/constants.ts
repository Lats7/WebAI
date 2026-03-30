export const COMPANY = {
  name: 'WebAI',
  tagline: 'Managed Technology Services',
  description:
    'Salesforce, IT Support, AI & Automation, Project Management — delivered by senior consultants who actually give a damn.',
  email: 'info@webaiprotech.com',
  phone: '+61 433 062 942',
  location: 'Melbourne, Australia',
  url: 'https://webai.com.au',
  abn: 'ABN 00 000 000 000',
  socials: {
    linkedin: 'https://linkedin.com/company/webai',
    github: 'https://github.com/webai',
  },
} as const;

export const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
] as const;

export interface Service {
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    slug: 'salesforce',
    title: 'Salesforce Consulting',
    icon: 'Cloud',
    shortDescription:
      'Expert Salesforce administration, optimisation, and project delivery.',
    description:
      'From day-to-day BAU support to complex implementations and data migrations. We keep your Salesforce org healthy, optimised, and aligned with your business goals.',
    features: [
      'BAU Administration & Support',
      'Custom Development & Flows',
      'Data Migration & Cleanup',
      'Integration & API Development',
      'User Training & Adoption',
      'Health Checks & Optimisation',
    ],
  },
  {
    slug: 'it-support',
    title: 'IT Support & Infrastructure',
    icon: 'Monitor',
    shortDescription:
      'Microsoft 365, infrastructure management, and responsive IT support.',
    description:
      'Comprehensive IT support that keeps your team productive. From Microsoft 365 migrations to ongoing infrastructure management and security hardening.',
    features: [
      'Microsoft 365 Administration',
      'Cloud Migration & Setup',
      'Security & Compliance',
      'Help Desk & User Support',
      'Network & Infrastructure',
      'Vendor Management',
    ],
  },
  {
    slug: 'ai-automation',
    title: 'AI & Automation',
    icon: 'Sparkles',
    shortDescription:
      'Intelligent automation and AI strategy to transform your operations.',
    description:
      'Leverage AI and automation to eliminate manual work, improve decision-making, and gain competitive advantage. We build practical AI solutions that deliver real ROI.',
    features: [
      'AI Strategy & Roadmapping',
      'Workflow Automation',
      'Intelligent Document Processing',
      'Custom AI Tooling',
      'ChatBot & Agent Development',
      'Data Analytics & Insights',
    ],
  },
  {
    slug: 'project-management',
    title: 'Project Management',
    icon: 'Kanban',
    shortDescription:
      'Technology project delivery with structure, transparency, and accountability.',
    description:
      'Experienced project managers who understand technology. We deliver complex IT projects on time and on budget, with clear communication throughout.',
    features: [
      'Agile & Waterfall Delivery',
      'Stakeholder Management',
      'Risk & Issue Management',
      'Vendor Coordination',
      'Change Management',
      'Post-Implementation Reviews',
    ],
  },
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We listen first. Understanding your business, pain points, and goals before recommending anything.',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'A clear, honest plan with defined scope, timelines, and outcomes. No surprises, no scope creep.',
  },
  {
    number: '03',
    title: 'Delivery',
    description:
      'Senior consultants execute with precision. Regular check-ins, transparent progress, real accountability.',
  },
  {
    number: '04',
    title: 'Support',
    description:
      'Ongoing managed services to keep things running. We don\'t disappear after go-live.',
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      'WebAI transformed our Salesforce instance from a mess into our most valuable business tool. Their team actually understood our business, not just the technology.',
    author: 'Sarah Chen',
    role: 'Head of Operations',
    company: 'Meridian Group',
  },
  {
    quote:
      'We replaced a full-time IT manager with WebAI\'s managed services and got better coverage at half the cost. The response times are incredible.',
    author: 'James Whitfield',
    role: 'Managing Director',
    company: 'Apex Industries',
  },
  {
    quote:
      'The AI automation work they did for our document processing saved us 30 hours a week. Practical, measurable results — not just buzzwords.',
    author: 'Priya Sharma',
    role: 'CFO',
    company: 'Coastal Finance',
  },
] as const;

export const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '15+', label: 'Years Combined Experience' },
  { value: '98%', label: 'Client Retention' },
  { value: '24/7', label: 'Support Available' },
] as const;
