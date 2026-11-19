import { COMPANY } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'grid h-8 w-8 shrink-0 place-items-center transition-colors',
        'mc:rounded-[2px] mc:border mc:border-accent/60 mc:bg-accent/10 mc:text-accent',
        'ws:rounded-[10px] ws:bg-fg ws:text-bg',
        className
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <path
          d="M3.5 6.5 8 17.5 12 9.5l4 8 4.5-11"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9.5" r="1.9" fill="currentColor" />
      </svg>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="flex items-baseline gap-2">
        <span className="text-[1.3rem] font-semibold leading-none tracking-[-0.04em] text-fg">
          {COMPANY.name.replace('AI', '')}
          <span className="text-accent">AI</span>
        </span>
        <span className="label text-fg-3 mc:text-[0.625rem] ws:text-xs ws:font-medium">{COMPANY.suffix}</span>
      </span>
    </span>
  );
}
