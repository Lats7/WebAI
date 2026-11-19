'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CornerDownLeft,
  Hash,
  Linkedin,
  Mail,
  PanelsTopLeft,
  Phone,
  Radar,
  Search,
  Star,
  type LucideIcon,
} from 'lucide-react';
import { COMPANY, SECTIONS } from '@/lib/constants';
import { setTheme, useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

const OPEN_EVENT = 'webai:command-menu';

/** Open the command menu from anywhere, for example a button in the nav. */
export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

interface Command {
  id: string;
  group: 'Go to' | 'Actions' | 'Style';
  label: string;
  hint?: string;
  keywords?: string;
  Icon: LucideIcon;
  run: () => void;
}

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView();
  history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`);
}

/**
 * Keyboard-first way around the site. Opens with Cmd+K or Ctrl+K.
 * Jump to a section, start a conversation, or switch the site style.
 */
export function CommandMenu() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const openRef = useRef(false);
  openRef.current = open;

  const close = useCallback(() => {
    setOpen(false);
    returnFocusRef.current?.focus();
  }, []);

  const commands = useMemo<Command[]>(() => {
    const other = theme === 'mission' ? 'workspace' : 'mission';
    return [
      ...SECTIONS.map((section, index) => ({
        id: `go-${section.id}`,
        group: 'Go to' as const,
        label: section.label,
        hint: String(index + 1).padStart(2, '0'),
        keywords: section.id,
        Icon: Hash,
        run: () => goTo(section.id),
      })),
      {
        id: 'start',
        group: 'Actions',
        label: 'Start a project',
        keywords: 'contact brief hire quote',
        Icon: ArrowRight,
        run: () => goTo('contact'),
      },
      {
        id: 'email',
        group: 'Actions',
        label: `Email ${COMPANY.email}`,
        keywords: 'mail contact',
        Icon: Mail,
        run: () => {
          window.location.href = `mailto:${COMPANY.email}`;
        },
      },
      {
        id: 'call',
        group: 'Actions',
        label: `Call ${COMPANY.phone}`,
        keywords: 'phone contact',
        Icon: Phone,
        run: () => {
          window.location.href = `tel:${COMPANY.phone.replace(/\s/g, '')}`;
        },
      },
      {
        id: 'linkedin',
        group: 'Actions',
        label: 'Open LinkedIn',
        keywords: 'social',
        Icon: Linkedin,
        run: () => window.open(COMPANY.socials.linkedin, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'reviews',
        group: 'Actions',
        label: 'Read the reviews on Freelancer',
        keywords: 'testimonials rating',
        Icon: Star,
        run: () => window.open(COMPANY.socials.freelancer, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'style',
        group: 'Style',
        label: other === 'workspace' ? 'Switch to Workspace' : 'Switch to Mission Control',
        keywords: 'theme look dark light mode style',
        Icon: other === 'workspace' ? PanelsTopLeft : Radar,
        run: () => setTheme(other),
      },
    ];
  }, [theme]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.group} ${command.keywords ?? ''}`.toLowerCase().includes(needle)
    );
  }, [commands, query]);

  // Open from the shortcut or from openCommandMenu().
  useEffect(() => {
    const show = () => {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setActiveIndex(0);
      setOpen(true);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (openRef.current) {
          setOpen(false);
          returnFocusRef.current?.focus();
        } else {
          show();
        }
      }
    };
    window.addEventListener(OPEN_EVENT, show);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener(OPEN_EVENT, show);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Keep the highlighted option in view.
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, results]);

  function run(command: Command) {
    setOpen(false);
    command.run();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const command = results[activeIndex];
      if (command) run(command);
    } else if (event.key === 'Tab') {
      // The input is the only stop. Keep focus inside the dialog.
      event.preventDefault();
    }
  }

  const active = results[activeIndex];
  let lastGroup = '';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80] bg-bg/75 px-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onKeyDown}
            className="card bracketed mx-auto w-full max-w-xl overflow-hidden shadow-pop mc:bg-panel ws:bg-panel"
          >
            <div className="flex items-center gap-3 border-b border-edge px-4">
              <span className="mc-only font-mono text-sm text-accent" aria-hidden="true">
                &gt;
              </span>
              <Search size={16} className="ws-only shrink-0 text-fg-3" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-activedescendant={active ? `command-${active.id}` : undefined}
                aria-label="Search commands"
                placeholder="Jump to a section or run a command"
                autoComplete="off"
                spellCheck={false}
                className="h-14 min-w-0 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-fg-3 mc:font-mono mc:text-sm"
              />
              <kbd className="kbd">Esc</kbd>
            </div>

            <div
              ref={listRef}
              id="command-list"
              role="listbox"
              aria-label="Commands"
              className="max-h-[min(24rem,52vh)] overflow-y-auto p-2"
            >
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-fg-3">Nothing matches &ldquo;{query}&rdquo;.</p>
              )}
              {results.map((command, index) => {
                const selected = index === activeIndex;
                const showGroup = command.group !== lastGroup;
                lastGroup = command.group;
                return (
                  <div key={command.id}>
                    {showGroup && (
                      <p className="label px-3 pb-1.5 pt-3 text-fg-3 mc:!text-[0.625rem]" role="presentation">
                        {command.group}
                      </p>
                    )}
                    <div
                      id={`command-${command.id}`}
                      role="option"
                      aria-selected={selected}
                      onMouseMove={() => setActiveIndex(index)}
                      onClick={() => run(command)}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm transition-colors mc:rounded-[2px] ws:rounded-lg',
                        selected ? 'bg-accent/10 text-fg' : 'text-fg-2'
                      )}
                    >
                      <command.Icon
                        size={15}
                        className={cn('shrink-0', selected ? 'text-accent' : 'text-fg-3')}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1 truncate">{command.label}</span>
                      {selected ? (
                        <CornerDownLeft size={13} className="shrink-0 text-fg-3" aria-hidden="true" />
                      ) : (
                        command.hint && (
                          <span className="label shrink-0 tabular-nums text-fg-3 mc:!text-[0.625rem]" aria-hidden="true">
                            {command.hint}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-edge px-4 py-2.5 text-xs text-fg-3" aria-hidden="true">
              <span className="flex items-center gap-1.5">
                <kbd className="kbd">↑</kbd>
                <kbd className="kbd">↓</kbd>
                Move
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="kbd">↵</kbd>
                Select
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
