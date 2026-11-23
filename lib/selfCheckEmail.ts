import { BOOKING, BOOKING_URL, COMPANY } from '@/lib/constants';
import { type Attribution, LIMITS, attributionLines, isEmail, parseAttribution, singleLine } from '@/lib/contact';
import { ANSWER_LABELS, CHECK_QUESTIONS, MAX_SCORE, bandFor, isAnswerSet, scoreOf } from '@/lib/selfCheck';

/**
 * The self-check results email.
 *
 * A visitor can ask for their results by email. The request carries an email
 * address, ten answers (each 0, 1, or 2), and a yes or no for follow-up.
 * Nothing else is accepted, and every word of the email is written here from
 * those numbers. No text typed by a visitor is ever put in an email to someone
 * else, so the endpoint cannot be used to deliver a message of the sender's choosing.
 */

export interface ResultRequest {
  email: string;
  answers: number[];
  /** True only when the visitor ticked the box asking us to follow up. */
  followUp: boolean;
  attribution: Attribution;
}

export type ResultRequestResult = { ok: true; request: ResultRequest } | { ok: false; fields: string[] };

/** Validate and normalise an untrusted request body. */
export function parseResultRequest(input: unknown): ResultRequestResult {
  const body = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;
  const fields: string[] = [];

  const email = singleLine(body.email, LIMITS.email);
  if (!isEmail(email)) fields.push('email');

  const answers = body.answers;
  if (!isAnswerSet(answers)) fields.push('answers');

  if (fields.length > 0 || !isAnswerSet(answers)) return { ok: false, fields };

  return {
    ok: true,
    request: {
      email,
      answers: [...answers],
      followUp: body.followUp === true,
      attribution: parseAttribution(body.attribution),
    },
  };
}

const page = (path: string) => `${COMPANY.url}${path}`;
const hasRealAbn = /[1-9]/.test(COMPANY.abn);

function summarise(answers: number[]) {
  const score = scoreOf(answers);
  const rated = CHECK_QUESTIONS.map((question, index) => ({ question, value: answers[index] }));
  return { score, band: bandFor(score), rated };
}

/** The email the visitor asked for: score, every area, and the fix for each gap. Plain text. */
export function resultEmail(request: ResultRequest) {
  const { score, band, rated } = summarise(request.answers);
  // Weakest answers first. Ties keep the order of the questions.
  const fixes = rated.filter((item) => item.value < 2).sort((a, b) => a.value - b.value);

  const lines = [
    'Your AI readiness self-check',
    '',
    `Score: ${score} of ${MAX_SCORE}`,
    `Result: ${band.name}`,
    '',
    band.summary,
    '',
  ];

  if (fixes.length > 0) {
    lines.push('WHAT TO FIX, WEAKEST FIRST', '');
    fixes.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.question.area} (${ANSWER_LABELS[item.value]})`);
      lines.push(`   ${item.question.advice}`);
      if (item.question.link) lines.push(`   ${item.question.link.label}: ${page(item.question.link.href)}`);
      lines.push('');
    });
  } else {
    lines.push('Every area is in place. The next step is to test them.', '');
  }

  lines.push('ALL TEN AREAS', '');
  for (const item of rated) lines.push(`${ANSWER_LABELS[item.value].padEnd(9)} ${item.question.area}`);

  lines.push(
    '',
    'WHAT NEXT',
    '',
    'This is a quick indicator, not an assessment. The AI Readiness Review checks these areas in your real environment:',
    page('/ai-readiness-review'),
    ''
  );
  if (BOOKING_URL) lines.push(`${BOOKING.label}: ${BOOKING_URL}`, '');
  lines.push(
    'Questions? Reply to this email.',
    '',
    '--',
    `${COMPANY.fullName}, ${COMPANY.location}${hasRealAbn ? `, ${COMPANY.abn}` : ''}`,
    `${COMPANY.email}, ${COMPANY.phone}`,
    '',
    `You are getting this email once because it was requested at ${page('/tools/ai-readiness-check')}.`,
    request.followUp
      ? 'You also asked us to follow up with you about these results. To stop that, reply with the word "stop".'
      : 'We will not email you again unless you contact us.',
    'If you did not ask for this, ignore it or reply to let us know.'
  );

  return {
    subject: `Your AI readiness self-check: ${score} of ${MAX_SCORE} (${band.name})`,
    text: lines.join('\n'),
  };
}

/**
 * The note the business receives for each results request. It carries the
 * visitor's address only when they asked for a follow-up.
 */
export function leadEmail(request: ResultRequest) {
  const { score, band, rated } = summarise(request.answers);
  const areas = (value: number) =>
    rated
      .filter((item) => item.value === value)
      .map((item) => item.question.area)
      .join(', ') || 'None';

  const text = [
    'Someone asked for their self-check results by email. The results have been sent to them.',
    '',
    ...(request.followUp
      ? ['Follow-up: Yes. They asked us to follow up about their results.', `Email: ${request.email}`]
      : ['Follow-up: No. They did not ask to be contacted, so their address is not included here.']),
    '',
    `Score: ${score} of ${MAX_SCORE} (${band.name})`,
    `Gaps: ${areas(0)}`,
    `Partial: ${areas(1)}`,
    `In place: ${areas(2)}`,
    '',
    ...attributionLines(request.attribution),
  ].join('\n');

  return {
    subject: `Self-check results requested: ${score} of ${MAX_SCORE} (${band.name})${
      request.followUp ? ', follow-up requested' : ''
    }`,
    text,
  };
}
