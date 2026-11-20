/**
 * First-touch attribution, kept in this browser tab only.
 *
 * When a visitor arrives we note the page they landed on, the site that sent
 * them, and any campaign tags in the link. It is attached to a brief only if
 * they choose to send one. Nothing is stored in a cookie and nothing is sent
 * anywhere until then.
 */

const KEY = 'webai-attribution';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number] | 'landing' | 'referrer', string>>;

export function captureAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = { landing: window.location.pathname };

    if (document.referrer) {
      const host = new URL(document.referrer).host;
      if (host && host !== window.location.host) data.referrer = host;
    }
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) data[key] = value.slice(0, 120);
    }
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Storage blocked. Attribution is optional, so carry on without it.
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? '{}') as Attribution;
  } catch {
    return {};
  }
}
