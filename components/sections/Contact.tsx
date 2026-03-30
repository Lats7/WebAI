'use client';

import { useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle2, ChevronDown } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { COMPANY, services } from '@/lib/constants';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const subject = encodeURIComponent(`Website Enquiry — ${data.get('company') || 'New Lead'}`);
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')}\nService: ${data.get('service')}\n\n${data.get('message')}`
    );

    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;

    // Show success state, then reset
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      formRef.current?.reset();
    }, 500);

    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <SectionWrapper id="contact">
      <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
        {/* Left — Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-10"
        >
          <div>
            <span className="text-accent font-heading font-semibold text-sm tracking-wider uppercase">
              Get in Touch
            </span>
            <h2 className="mt-3 font-heading text-heading md:text-display-sm font-bold text-foreground">
              Let&apos;s Talk.
            </h2>
            <p className="mt-4 text-foreground-secondary leading-relaxed text-lg">
              Whether you need ongoing support or a specific project delivered, we&apos;d love to hear from you. No hard sell, just an honest conversation about how we can help.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-4 text-foreground-secondary hover:text-foreground transition-all duration-200 group p-3 -m-3 rounded-2xl hover:bg-background-tertiary/50"
              aria-label={`Email us at ${COMPANY.email}`}
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300">
                <Mail size={18} />
              </div>
              <span className="text-sm font-medium">{COMPANY.email}</span>
            </a>

            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-4 text-foreground-secondary hover:text-foreground transition-all duration-200 group p-3 -m-3 rounded-2xl hover:bg-background-tertiary/50"
              aria-label={`Call us at ${COMPANY.phone}`}
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300">
                <Phone size={18} />
              </div>
              <span className="text-sm font-medium">{COMPANY.phone}</span>
            </a>

            <a
              href="https://maps.google.com/?q=Melbourne+Australia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-foreground-secondary hover:text-foreground transition-all duration-200 group p-3 -m-3 rounded-2xl hover:bg-background-tertiary/50"
              aria-label="Find us in Melbourne, Australia"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300">
                <MapPin size={18} />
              </div>
              <span className="text-sm font-medium">{COMPANY.location}</span>
            </a>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-3"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card rounded-3xl p-8 lg:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                id="name"
                name="name"
                label="Name"
                placeholder="Your name"
                required
                autoComplete="name"
              />
              <Input
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="you@company.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                id="company"
                name="company"
                label="Company"
                placeholder="Your company"
                autoComplete="organization"
              />
              <div className="space-y-2">
                <label htmlFor="service" className="block text-sm font-medium text-foreground-secondary">
                  Service Interest
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    className="w-full appearance-none rounded-xl bg-background-tertiary border border-border px-4 py-3 pr-10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200 font-body cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a service</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>{s.title}</option>
                    ))}
                    <option value="general">General Enquiry</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
                </div>
              </div>
            </div>

            <Textarea
              id="message"
              name="message"
              label="Message"
              placeholder="Tell us about your project or what you need help with..."
              rows={5}
              required
            />

            {/* Submit + Success feedback */}
            <div className="flex items-center gap-4 flex-wrap">
              <Button
                type="submit"
                size="lg"
                className="group/send"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    Sending...
                    <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5" />
                  </>
                )}
              </Button>

              <AnimatePresence>
                {submitted && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-emerald-400 font-medium"
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircle2 size={16} />
                    Email client opened!
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
