'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { StyleHint } from '@/components/theme/StyleHint';
import { ThemeSwitch } from '@/components/theme/ThemeSwitch';
import { NAV_ITEMS, SECTIONS } from '@/lib/constants';
import { useRestoreTheme } from '@/lib/theme';
import { useActiveSection } from '@/lib/useActiveSection';
import { cn } from '@/lib/utils';

const SECTION_IDS = SECTIONS.map((section) => section.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  useRestoreTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll and listen for Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="btn btn-primary btn-sm sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-300',
          // Mission: full-width console bar. Workspace: floating pill.
          'mc:border-b ws:px-3 ws:pt-3',
          solid ? 'mc:border-edge mc:bg-bg/80 mc:backdrop-blur-xl' : 'mc:border-transparent'
        )}
      >
        <nav
          aria-label="Main"
          className={cn(
            'mx-auto flex h-16 max-w-site items-center justify-between gap-3 px-5 sm:px-8',
            'ws:h-14 ws:rounded-full ws:border ws:pl-5 ws:pr-2.5 ws:transition-[background-color,border-color,box-shadow] ws:duration-300 sm:ws:pl-6',
            solid
              ? 'ws:border-edge ws:bg-panel/85 ws:shadow-card ws:backdrop-blur-xl'
              : 'ws:border-transparent'
          )}
        >
          <a href="#top" aria-label="WebAI ProTech home" className="shrink-0" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <ul className="hidden h-full items-center lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href} className="relative flex h-full items-center">
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'block whitespace-nowrap px-3 py-2 transition-colors duration-200',
                      'mc:font-mono mc:text-[0.6875rem] mc:font-medium mc:uppercase mc:tracking-[0.14em]',
                      'ws:rounded-full ws:text-sm ws:font-medium',
                      isActive ? 'text-fg mc:text-accent ws:bg-raised' : 'text-fg-3 hover:text-fg'
                    )}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <span
                      className="mc-only absolute inset-x-3 -bottom-px h-px bg-accent shadow-[0_0_10px_rgb(var(--accent))]"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="hidden xl:block">
                <ThemeSwitch size="full" />
              </div>
              <div className="xl:hidden">
                <ThemeSwitch size="compact" />
              </div>
              <StyleHint />
            </div>

            <a href="#contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Start a project
              <ArrowRight size={14} aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-ctl border border-edge-strong text-fg transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-bg/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex min-h-full flex-col px-5 pb-10 pt-24 sm:px-8">
              <ul className="border-t border-edge">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-edge"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 text-fg"
                    >
                      <span className="display text-2xl">{item.label}</span>
                      <span className="label text-fg-3" aria-hidden="true">
                        <span className="mc-only">0{index + 1}</span>
                        <ArrowRight size={16} className="ws-only" />
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-5">
                <div>
                  <p className="label mb-3 text-fg-3">Site style</p>
                  <ThemeSwitch size="full" />
                </div>
                <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary btn-lg w-full">
                  Start a project
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
