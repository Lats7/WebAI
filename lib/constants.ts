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
    linkedin: 'https://www.linkedin.com/company/webaiprotech/',
    freelancer: 'https://www.freelancer.com/u/Lats7',
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
  mobileOrder: number;
}

export const services: Service[] = [
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
    mobileOrder: 1,
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
    mobileOrder: 2,
  },
  {
    slug: 'full-stack-development',
    title: 'Full-Stack AI Development',
    icon: 'Code',
    shortDescription:
      'End-to-end development from AI-powered backends to polished frontends.',
    description:
      'We build the full picture — intelligent backends, clean APIs, and modern frontends. Whether it\'s a standalone product or integrating AI into your existing stack, we ship production-ready code and manage the dev team to get it there.',
    features: [
      'Full-Stack Web Applications',
      'AI-Powered Backend Systems',
      'API Design & Integration',
      'Dev Team Leadership',
      'Cloud Deployment & DevOps',
      'Technical Architecture',
    ],
    mobileOrder: 3,
  },
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
    mobileOrder: 4,
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
      'They really did great job for my AI project and were very responsive to provide a working solution. A++!',
    author: 'Christian G.',
    project: 'AI Chatbot Platform',
    location: 'Switzerland',
  },
  {
    quote:
      'I recently collaborated with Stefan, a highly skilled professional in Python and AI projects. Their expertise and dedication significantly enhanced our project\'s success. I highly recommend Stefan for any Python or AI endeavors.',
    author: 'Mohammed A.',
    project: 'Multi-Agent RAG System',
    location: 'Saudi Arabia',
  },
  {
    quote:
      'Stefan did a custom web order system for us. Great work and efficient.',
    author: 'Alwin N.',
    project: 'Custom Order System',
    location: 'Hong Kong',
  },
  {
    quote:
      'WebAIProTech demonstrated exceptional skill and efficiency, completing the project exactly within the agreed timeframe. His level of communication was incredible — responsive and kept me updated at every step.',
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
    quote:
      'Great work! Always on time and went the extra mile for his tasks.',
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
    quote:
      'Good knowledge of AI & appropriate support systems.',
    author: 'Jared A.',
    project: 'Voice-Powered Diagnostics',
    location: 'United States',
  },
  {
    quote:
      'I highly recommend to work with Stefan, very professional and delivers on time.',
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

export const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '15+', label: 'Years Combined Experience' },
  { value: '98%', label: 'Client Retention' },
  { value: '24/7', label: 'Support Available' },
] as const;
