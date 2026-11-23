/**
 * The AI readiness self-check: ten questions, three answers each.
 * Answers are scored 0, 1, or 2 in the order written (weakest first).
 * Everything runs in the visitor's browser. Nothing is sent anywhere unless
 * they ask for their results by email or include their result in a brief.
 */

export interface CheckQuestion {
  /** Short name for the result breakdown. */
  area: string;
  question: string;
  /** Weakest answer first, strongest last. */
  options: [string, string, string];
  /** Why the area matters, for the explainer under the tool. */
  why: string;
  /** Shown when the answer is not the strongest one. */
  advice: string;
  /** Optional page to read next. */
  link?: { label: string; href: string };
}

export const CHECK_QUESTIONS: CheckQuestion[] = [
  {
    area: 'Tools in use',
    why:
      'Staff often adopt AI tools before the business does. A tool nobody knows about is a tool nobody has checked.',
    question: 'Do you know which AI tools your staff use for work?',
    options: ['No, or not really', 'Roughly, but there is no list', 'Yes, there is a list of approved tools'],
    advice:
      'Ask your team which AI tools they use, then write down the ones you approve. You cannot set rules for tools you do not know about.',
  },
  {
    area: 'Written rules',
    why:
      'Without written rules, each person guesses what is allowed, and the guesses differ.',
    question: 'Are there written rules for using AI at work?',
    options: ['No', 'Informal guidance only', 'Yes, a policy staff have read'],
    advice: 'Write a one-page AI usage policy and walk the team through it once.',
    link: { label: 'Use the one-page template', href: '/insights/one-page-ai-usage-policy' },
  },
  {
    area: 'Sensitive data',
    why:
      'Most AI tools send what you type to their provider. Some information should never make that trip.',
    question: 'Do staff know which information must never go into an AI tool?',
    options: ['No', 'Some of them do', 'Yes, it is written down and explained'],
    advice:
      'List what must never go into an AI tool: customer details, credentials, contracts, and anything confidential.',
  },
  {
    area: 'File sharing',
    why:
      'An assistant can surface any file a person is able to open, including ones shared too widely years ago.',
    question: 'If an AI assistant could read everything each person can open, would anything surprising turn up?',
    options: ['Probably, sharing is messy', 'Not sure', 'No, access was reviewed recently'],
    advice:
      'Review who can open your most sensitive folders before you roll out an assistant. Start with HR, payroll, and finance.',
    link: { label: 'Read the oversharing checklist', href: '/insights/copilot-oversharing-checklist' },
  },
  {
    area: 'Sign-in security',
    why:
      'An AI tool is only as safe as the account behind it. A stolen password now unlocks the assistant too.',
    question: 'Is multi-factor authentication on for every account that can reach company data?',
    options: ['No', 'Most accounts', 'Every account, including administrators'],
    advice:
      'Turn on multi-factor authentication for every account, starting with administrators. An AI tool is only as safe as the account behind it.',
  },
  {
    area: 'Software access',
    why:
      'Integrations and agents often inherit the full access of whoever set them up, which is far more than the job needs.',
    question: 'When software acts for you (an integration, a bot, or an agent), what can it do?',
    options: [
      'Whatever the person who set it up can do',
      'It is limited, but nobody reviews it',
      'Only what its job needs, and we review it',
    ],
    advice:
      'Give each integration or agent its own account with only the access its job needs, and review that access every few months.',
    link: { label: 'Read how to scope agent access', href: '/insights/agent-access-least-privilege' },
  },
  {
    area: 'Human approval',
    why:
      'AI can be wrong, and it can be tricked. A person should approve anything that cannot be undone.',
    question: 'Could an AI tool pay money, delete data, or message customers without a person approving it?',
    options: ['Yes, or not sure', 'Only for small things', 'No, a named person approves those'],
    advice: 'Put a named person on anything you cannot undo: payments, deletions, and messages to customers.',
  },
  {
    area: 'Audit trail',
    why:
      'If you cannot see what an AI tool did, you cannot explain it to a customer or fix what went wrong.',
    question: 'If an AI tool did something wrong, could you see what it did and why?',
    options: ['No', 'Partly', 'Yes, its actions are logged'],
    advice:
      'Make sure any AI tool that takes actions keeps a log you can read, and check that you know where to find it.',
  },
  {
    area: 'Vendors',
    why:
      'Where your data is stored, and whether it trains someone else’s model, is set by terms most people never read.',
    question: 'Do you know where your AI vendors store your data and whether they train on it?',
    options: ['No', 'For some of them', 'Yes, we checked the terms'],
    advice:
      'Check each AI vendor’s terms for where data is stored and whether it is used for training. Prefer business plans that say it is not.',
  },
  {
    area: 'Incident plan',
    why:
      'Mistakes cost less when someone knows the first steps and has the authority to take them.',
    question: 'If sensitive data went into the wrong AI tool tomorrow, does someone know what to do?',
    options: ['No', 'We would work it out', 'Yes, there is a plan and an owner'],
    advice: 'Name one person who owns AI incidents, and write down the first three steps they would take.',
  },
];

export const MAX_SCORE = CHECK_QUESTIONS.length * 2;

/** What each answer value means in a result: 0, 1, then 2. */
export const ANSWER_LABELS = ['Gap', 'Partial', 'In place'] as const;

/** True for a complete set of answers: one value of 0, 1, or 2 per question. */
export function isAnswerSet(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length === CHECK_QUESTIONS.length &&
    value.every((answer) => answer === 0 || answer === 1 || answer === 2)
  );
}

export function scoreOf(answers: readonly (number | undefined)[]) {
  return answers.reduce<number>((sum, value) => sum + (value ?? 0), 0);
}

export interface CheckBand {
  name: string;
  /** The scores that fall in this band, for example "8 to 14". */
  range: string;
  /** Signal colour: maps to the site's alert, warn, and ok tokens. */
  tone: 'alert' | 'warn' | 'ok';
  summary: string;
}

export function bandFor(score: number): CheckBand {
  if (score >= 15) {
    return {
      name: 'In good shape',
      range: `15 to ${MAX_SCORE}`,
      tone: 'ok',
      summary:
        'You have the basics covered. The next step is to test them, because a control that has never been tested is an assumption.',
    };
  }
  if (score >= 8) {
    return {
      name: 'Getting there',
      range: '8 to 14',
      tone: 'warn',
      summary:
        'Some of the basics are in place. A few gaps would matter as soon as an assistant or agent had real access.',
    };
  }
  return {
    name: 'Exposed',
    range: '0 to 7',
    tone: 'alert',
    summary:
      'AI is probably already in use, and the basics are not in place yet. The good news is that the first fixes are cheap.',
  };
}

/** The three bands, weakest first, for the explainer under the tool. */
export const CHECK_BANDS = [bandFor(0), bandFor(8), bandFor(15)];
