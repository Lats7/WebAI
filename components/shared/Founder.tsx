import { Linkedin } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X } from '@/components/shared/Section';
import { Eyebrow } from '@/components/shared/SectionHeader';
import { FOUNDER } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * "Who you will work with". Renders nothing until FOUNDER.enabled is true in
 * lib/constants.ts, so no placeholder text can reach the live site.
 */
export function Founder() {
  if (!FOUNDER.enabled || !FOUNDER.name) return null;

  return (
    <div className="grid border-t border-edge lg:grid-cols-12">
      <Reveal className={cn(CELL_X, 'py-14 lg:col-span-7 lg:py-20')}>
        <Eyebrow>Who you will work with</Eyebrow>
        <h2 className="display mt-7 text-[clamp(2rem,4.2vw,3.25rem)] text-fg">{FOUNDER.name}</h2>
        {FOUNDER.role && <p className="label mt-3 text-signal ws:text-fg-3">{FOUNDER.role}</p>}
        <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-fg-2">
          {FOUNDER.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {FOUNDER.linkedin && (
          <a
            href={FOUNDER.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm mt-8"
          >
            <Linkedin size={14} aria-hidden="true" />
            Connect on LinkedIn
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </Reveal>

      <div className="border-t border-edge lg:col-span-5 lg:border-l lg:border-t-0">
        {FOUNDER.photo && (
          // A plain image keeps this component free of layout assumptions about the photo.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={FOUNDER.photo}
            alt={`Portrait of ${FOUNDER.name}`}
            loading="lazy"
            className="aspect-[4/3] w-full border-b border-edge object-cover"
          />
        )}
        {FOUNDER.credentials.length > 0 && (
          <div className="px-5 py-9 sm:px-8 lg:px-10">
            <h3 className="label text-fg-3">Credentials</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {FOUNDER.credentials.map((credential) => (
                <li key={credential} className="chip">
                  {credential}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
