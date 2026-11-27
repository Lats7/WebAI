const isDev = process.env.NODE_ENV !== 'production';
const holdingConfig = require('./holding.json');

/**
 * The holding page switch. The same rule lives in lib/holding.ts, which
 * explains it. Keep the two in step.
 */
function isHolding() {
  const override = process.env.HOLDING_PAGE;
  if (override === 'on') return true;
  if (override === 'off') return false;
  return holdingConfig.enabled === true && process.env.VERCEL_ENV === 'production';
}

/**
 * Content Security Policy.
 * Next.js injects inline scripts for hydration, so script-src keeps
 * 'unsafe-inline'. Everything else is locked to this origin. If you add a
 * third-party script, font, or analytics host later, allow it here.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? ' ws:' : ''}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    if (!isHolding()) return [];
    // While the holding page is on, every address except the home page, the
    // site's own files, and the files robots and security researchers look
    // for sends the visitor to the home page. Temporary, so nothing is remembered.
    return [
      {
        source:
          '/:path((?!_next/|api/|\\.well-known/|robots\\.txt$|sitemap\\.xml$|security\\.txt$|icon\\.svg$|favicon\\.ico$|opengraph-image).+)',
        destination: '/',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    // The standard location for security.txt. The route itself lives at /security.txt.
    return [{ source: '/.well-known/security.txt', destination: '/security.txt' }];
  },
};

module.exports = nextConfig;
