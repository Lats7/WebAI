import config from '@/holding.json';

/**
 * The holding page switch.
 *
 * While it is on, the live site shows one message and nothing else. Every
 * other address sends the visitor to that page, and the forms answer
 * "unavailable". Vercel's preview links are not affected, so the full site
 * can still be tested there.
 *
 * OWNER NOTE: to bring the site back, do one of these, then redeploy.
 *   1. Set "enabled" to false in holding.json (at the top of the project).
 *   2. Or, in Vercel, add the environment variable HOLDING_PAGE=off for
 *      Production.
 * To change the wording, edit "message" in holding.json.
 *
 * HOLDING_PAGE=on forces the holding page anywhere, which is how it is tested
 * on a local machine. The same rule is repeated in next.config.js, because
 * that file cannot import this one. Keep the two in step.
 */
export function isHolding(): boolean {
  const override = process.env.HOLDING_PAGE;
  if (override === 'on') return true;
  if (override === 'off') return false;
  return config.enabled === true && process.env.VERCEL_ENV === 'production';
}

export const HOLDING_MESSAGE: string = config.message;
