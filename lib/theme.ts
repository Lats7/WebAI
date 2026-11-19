'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { THEME_KEY, THEME_META, type Theme } from '@/lib/theme-config';

/**
 * Site style store.
 *
 * The source of truth is the `data-theme` attribute on <html>, which an inline
 * script in app/layout.tsx sets before first paint. All styling keys off that
 * attribute in CSS, so there is no flash and no hydration mismatch. React only
 * subscribes where it needs the value in JavaScript.
 */

export { THEME_KEY, THEME_META, type Theme };

const listeners = new Set<() => void>();

function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'workspace' ? 'workspace' : 'mission';
}

let storageBound = false;

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Keep other open tabs in step. One listener serves every subscriber.
  if (!storageBound) {
    storageBound = true;
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key !== THEME_KEY) return;
      if (event.newValue === 'mission' || event.newValue === 'workspace') {
        applyTheme(event.newValue, false);
      }
    });
  }

  return () => {
    listeners.delete(listener);
  };
}

function applyTheme(next: Theme, persist: boolean) {
  document.documentElement.dataset.theme = next;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_META[next].themeColor);

  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage can be blocked (private mode). The style still applies for this visit.
    }
  }

  listeners.forEach((listener) => listener());
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

/**
 * Switch the site style. When the browser supports the View Transitions API,
 * the new style expands in a circle from `origin` (usually the click point).
 */
export function setTheme(next: Theme, origin?: { x: number; y: number }) {
  if (readTheme() === next) return;

  const doc = document as ViewTransitionDocument;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!doc.startViewTransition || reduceMotion) {
    applyTheme(next, true);
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = doc.startViewTransition(() => {
    flushSync(() => applyTheme(next, true));
  });

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 650,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    })
    .catch(() => {
      // The transition was skipped. The style has already been applied.
    });
}

/** Current site style. Returns "mission" during server render. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => 'mission');
}

/**
 * Safety net. If React ever re-renders <html> on the client, the attribute set
 * by the inline script is lost. This puts the saved style back after mount.
 */
export function useRestoreTheme() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if ((saved === 'mission' || saved === 'workspace') && saved !== readTheme()) {
        applyTheme(saved, false);
      }
    } catch {
      // Storage unavailable. Keep the default style.
    }
  }, []);
}
