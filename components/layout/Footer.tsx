import { COMPANY, NAV_ITEMS } from '@/lib/constants';
import { Linkedin, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-2xl font-heading font-bold tracking-tight text-foreground">
              Web<span className="text-accent">AI</span>
              <span className="text-xs font-medium text-foreground-muted ml-1.5 tracking-wide">ProTech</span>
            </span>
            <p className="text-foreground-muted max-w-sm text-sm leading-relaxed">
              {COMPANY.tagline}. Enterprise expertise with boutique attention, based in Melbourne, Australia.
            </p>
            <div className="flex gap-5 pt-2 items-center">
              <a
                href={COMPANY.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-foreground-muted hover:text-accent transition-colors"
              >
                <Linkedin size={28} />
              </a>
              <a
                href={COMPANY.socials.freelancer}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Freelancer Reviews"
                className="text-foreground-muted hover:text-accent transition-colors flex items-center gap-1.5"
              >
                <Award size={28} />
                <span className="text-xs font-medium">5.0</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-sm text-foreground">Navigate</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-sm text-foreground">Contact</h3>
            <ul className="space-y-3 text-sm text-foreground-muted">
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-foreground transition-colors">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="hover:text-foreground transition-colors">
                  {COMPANY.phone}
                </a>
              </li>
              <li>{COMPANY.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground-muted">
          <p>&copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>{COMPANY.abn}</p>
        </div>
      </div>
    </footer>
  );
}
