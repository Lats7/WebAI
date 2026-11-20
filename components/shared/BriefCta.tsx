import { ContactForm } from '@/components/shared/ContactForm';
import { Reveal } from '@/components/shared/Reveal';
import { Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ContactDetails } from '@/components/sections/Contact';
import { type CONTACT_INTERESTS } from '@/lib/constants';

interface BriefCtaProps {
  /** Where this form sits, for the brief and for analytics. */
  source: string;
  interest?: (typeof CONTACT_INTERESTS)[number];
  title: React.ReactNode;
  description: string;
  defaultMessage?: string;
}

/** The brief form as a page section, so a visitor can act without leaving the page they landed on. */
export function BriefCta({ source, interest, title, description, defaultMessage }: BriefCtaProps) {
  return (
    <Section id="brief" tint>
      <SectionHeader code="→" eyebrow="Next step" title={title} description={description} />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <ContactDetails />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm source={source} defaultInterest={interest} defaultMessage={defaultMessage} />
        </Reveal>
      </div>
    </Section>
  );
}
