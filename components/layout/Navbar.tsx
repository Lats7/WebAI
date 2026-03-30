'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll detection + active section tracking via IntersectionObserver
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Escape key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleMobileNavClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    // Small delay so menu closes visually before scroll
    setTimeout(() => scrollToSection(href), 150);
  }, [scrollToSection]);

  return (
    <>
      {/* Skip to content — accessibility */}
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-xl focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-semibold focus:outline-none"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'glass py-3 shadow-lg shadow-black/5'
            : 'py-5 bg-transparent'
        )}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative z-10 group"
          >
            <span className="text-2xl font-heading font-bold tracking-tight text-foreground transition-colors duration-200">
              Web<span className="text-accent group-hover:text-cyan-400 transition-colors duration-300">AI</span>
              <span className="text-xs font-medium text-foreground-muted ml-1.5 tracking-wide">ProTech</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg',
                    isActive
                      ? 'text-foreground'
                      : 'text-foreground-muted hover:text-foreground-secondary'
                  )}
                >
                  {item.label}
                  {/* Animated underline indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full gradient-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <div className="ml-4">
              <Button size="sm" onClick={() => scrollToSection('#contact')}>
                Get in Touch
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden relative z-10 p-2 text-foreground hover:text-accent transition-colors"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              {isMobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex flex-col items-center justify-center h-full gap-2"
            >
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileNavClick(item.href);
                    }}
                    className={cn(
                      'text-3xl font-heading font-bold tracking-tight transition-colors py-3 px-6 rounded-2xl',
                      isActive
                        ? 'text-accent'
                        : 'text-foreground-muted hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-6"
              >
                <Button
                  size="lg"
                  onClick={() => handleMobileNavClick('#contact')}
                >
                  Get in Touch
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
