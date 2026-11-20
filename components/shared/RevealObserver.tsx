'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/** One observer for every `[data-reveal]` element on the page, including ones added later. */
export function RevealObserver() {
  useEffect(() => {
    window.__revealReady = true;
    // If the page script was slow enough that the failsafe in the head script
    // already switched reveals off, leave everything visible. Re-hiding content
    // now would make it flicker.
    if (!document.documentElement.classList.contains('js')) return;

    const seen = new WeakSet<Element>();
    const show = (element: Element) => element.classList.add('is-visible');

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -60px 0px' }
    );

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        observer.observe(element);
      });
    };

    scan();
    // Pages change without a full reload, so pick up reveals as they are added.
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
