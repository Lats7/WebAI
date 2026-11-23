'use client';

import { CalendarClock } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { BOOKING, BOOKING_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface BookingLinkProps {
  /** Which page or placement this button is on. Shows up in analytics. */
  source: string;
  className?: string;
}

/**
 * A "book a call" button. It renders nothing until a booking link is set
 * (see BOOKING in lib/constants.ts), so it is safe to place anywhere.
 */
export function BookingLink({ source, className }: BookingLinkProps) {
  if (!BOOKING_URL) return null;
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('booking_click', { source })}
      className={cn('btn btn-secondary', className)}
    >
      <CalendarClock size={15} aria-hidden="true" />
      {BOOKING.label}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
