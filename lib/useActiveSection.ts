'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently crossing the middle of the viewport.
 * Pass the current path as `key` so the observer re-attaches after navigation.
 */
export function useActiveSection(ids: readonly string[], key = '') {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    setActive(ids[0] ?? '');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids, key]);

  return active;
}
