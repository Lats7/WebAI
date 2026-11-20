import { COMPANY } from '@/lib/constants';

// Regenerated daily, so the expiry date below always stays in the future.
export const revalidate = 86400;

/**
 * security.txt (RFC 9116): tells researchers how to report a security issue.
 * Served at /.well-known/security.txt through a rewrite in next.config.js.
 */
export function GET() {
  const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
  expires.setUTCHours(0, 0, 0, 0);

  const body = [
    `Contact: mailto:${COMPANY.email}`,
    `Expires: ${expires.toISOString()}`,
    'Preferred-Languages: en',
    `Canonical: ${COMPANY.url}/.well-known/security.txt`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
