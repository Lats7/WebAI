'use client';

import { track } from '@vercel/analytics';

/**
 * Record a named event, such as a brief being sent. Never pass anything that
 * identifies a person. This is a no-op when analytics is not running.
 */
export function trackEvent(name: string, properties?: Record<string, string | number | boolean>) {
  try {
    track(name, properties);
  } catch {
    // Analytics must never break the page.
  }
}
