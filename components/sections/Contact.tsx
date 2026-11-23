import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { BookingLink } from '@/components/shared/BookingLink';
import { ContactForm } from '@/components/shared/ContactForm';
import { Reveal } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { COMPANY, NEXT_STEPS } from '@/lib/constants';

const CHANNELS = [
  { Icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { Icon: Phone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, '')}` },
  { Icon: Linkedin, label: 'LinkedIn', value: COMPANY.fullName, href: COMPANY.socials.linkedin, external: true },
  { Icon: MapPin, label: 'Based in', value: COMPANY.location },
];

/** What happens after a brief is sent, and the other ways to get in touch. */
export function ContactDetails() {
  return (
    <>
      <h3 className="label text-fg-3">What happens next</h3>
      <ol className="mt-5 space-y-4">
        {NEXT_STEPS.map((step, index) => (
          <li key={step} className="flex items-start gap-4">
            <span className="grid h-7 w-7 shrink-0 place-items-center border border-accent/50 font-mono text-xs text-accent mc:rounded-[3px] ws:rounded-full ws:border-transparent ws:bg-accent/10 ws:font-sans ws:font-medium">
              {index + 1}
            </span>
            <span className="pt-0.5 text-fg">{step}</span>
          </li>
        ))}
      </ol>

      <BookingLink source="contact" className="mt-8" />

      <ul className="mt-10 grid gap-px overflow-hidden border border-edge bg-edge mc:rounded-[3px] ws:rounded-2xl">
        {CHANNELS.map(({ Icon, label, value, href, external }) => {
          const content = (
            <>
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-edge-strong text-accent mc:rounded-[3px] mc:bg-accent/10 ws:rounded-xl ws:border-transparent ws:bg-accent/10">
                <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="label block text-fg-3 mc:!text-[0.625rem]">{label}</span>
                <span className="mt-0.5 block truncate text-[0.9375rem] font-medium text-fg">{value}</span>
              </span>
            </>
          );
          return (
            <li key={label} className="bg-bg ws:bg-panel">
              {href ? (
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-accent/[0.06]"
                >
                  {content}
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              ) : (
                <div className="flex items-center gap-4 p-4">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeader
        code="07"
        eyebrow="Contact"
        title={
          <>
            Tell us what you want <span className="accent-word">off your plate.</span>
          </>
        }
        description="A paragraph is enough to start. Say what is slow, risky, or manual, and we will tell you honestly whether we can help."
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <ContactDetails />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm source="home" />
        </Reveal>
      </div>
    </Section>
  );
}
