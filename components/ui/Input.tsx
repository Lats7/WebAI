'use client';

import { cn } from '@/lib/utils';
import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-xl bg-background-tertiary border border-border px-4 py-3 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200 font-body',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground-secondary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-xl bg-background-tertiary border border-border px-4 py-3 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200 font-body resize-none',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea };
