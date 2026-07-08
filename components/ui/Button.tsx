'use client';

import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-heading font-semibold tracking-tight rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
          {
            'bg-accent text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_24px_-8px_rgba(59,130,246,0.5)] hover:bg-accent-hover hover:shadow-[0_0_0_1px_rgba(59,130,246,0.5),0_8px_32px_-6px_rgba(59,130,246,0.6)]':
              variant === 'primary',
            'bg-background-tertiary/60 text-foreground border border-border-strong hover:border-accent/40 hover:bg-background-tertiary':
              variant === 'secondary',
            'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary':
              variant === 'ghost',
          },
          {
            'text-sm px-4 py-2': size === 'sm',
            'text-sm px-6 py-3': size === 'md',
            'text-base px-8 py-4': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
