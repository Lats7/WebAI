'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '@/lib/theme';

const HINT_KEY = 'webai-style-hint';
const SHOW_AFTER_MS = 3500;
const HIDE_AFTER_MS = 14000;

/**
 * One-time pointer to the style switch for first-time visitors.
 * It never shows again once dismissed or once the style has been changed.
 */
export function StyleHint() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [initialTheme] = useState(theme);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(HINT_KEY) === '1' || localStorage.getItem('webai-theme') !== null;
    } catch {
      seen = true;
    }
    if (seen) return;

    const show = window.setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    const hide = window.setTimeout(() => dismiss(), SHOW_AFTER_MS + HIDE_AFTER_MS);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  // Switching styles is the whole point, so that counts as seen.
  useEffect(() => {
    if (theme !== initialTheme) dismiss();
  }, [theme, initialTheme]);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(HINT_KEY, '1');
    } catch {
      // Storage unavailable. The hint just shows again next visit.
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="note"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 top-full z-10 mt-3 w-60 border border-accent/50 bg-panel p-3.5 pr-9 shadow-pop mc:rounded-[2px] ws:rounded-2xl ws:border-edge"
        >
          <span
            className="absolute -top-[5px] right-6 h-2 w-2 rotate-45 border-l border-t border-accent/50 bg-panel ws:border-edge"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-fg">Two looks, one site</p>
          <p className="mt-1 text-xs leading-relaxed text-fg-2">
            Prefer something calmer? Switch between Mission Control and Workspace here.
          </p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-ctl text-fg-3 transition-colors hover:text-fg"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
