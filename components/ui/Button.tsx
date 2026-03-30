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
          'relative inline-flex items-center justify-center font-heading font-semibold tracking-tight rounded-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]',
          {
            'gradient-accent text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md':
              variant === 'primary',
            'bg-background-tertiary text-foreground border border-border hover:border-accent/30 hover:bg-background-secondary hover:-translate-y-0.5 active:translate-y-0':
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
