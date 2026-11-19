/**
 * Small animated diagrams for the three core services.
 * They use currentColor and theme tokens, so both site styles are covered.
 */

const stroke = {
  stroke: 'currentColor',
  strokeWidth: 1,
  fill: 'none',
  vectorEffect: 'non-scaling-stroke' as const,
};

/** Orchestrator with sub-agents. */
export function AgentGlyph({ className }: { className?: string }) {
  const nodes = [
    { x: 22, y: 20 },
    { x: 98, y: 20 },
    { x: 22, y: 76 },
    { x: 98, y: 76 },
  ];
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true">
      {nodes.map((node, index) => (
        <line
          key={index}
          x1="60"
          y1="48"
          x2={node.x}
          y2={node.y}
          {...stroke}
          strokeDasharray="3 5"
          className="animate-dash opacity-60"
          style={{ animationDelay: `${index * -0.4}s` }}
        />
      ))}
      {nodes.map((node, index) => (
        <rect
          key={index}
          x={node.x - 9}
          y={node.y - 9}
          width="18"
          height="18"
          rx="2"
          {...stroke}
          className="opacity-70"
        />
      ))}
      <circle cx="60" cy="48" r="15" {...stroke} />
      <circle cx="60" cy="48" r="5" fill="currentColor" />
      <circle cx="60" cy="48" r="5" fill="currentColor" className="origin-center animate-ping [transform-box:fill-box]" />
    </svg>
  );
}

/** Three systems joined by a pipeline with data moving through it. */
export function AutomationGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true">
      <path d="M26 48 H94" {...stroke} strokeDasharray="3 5" className="animate-dash opacity-60" />
      <path d="M60 48 V78 H94" {...stroke} strokeDasharray="3 5" className="animate-dash opacity-60" />
      {[
        { x: 8, y: 36 },
        { x: 48, y: 36 },
        { x: 88, y: 36 },
        { x: 88, y: 66 },
      ].map((box, index) => (
        <rect
          key={index}
          x={box.x}
          y={box.y}
          width="24"
          height="24"
          rx="2"
          {...stroke}
          className="fill-[rgb(var(--panel))]"
        />
      ))}
      <path d="M15 48h10M55 44v8M56 48h8M95 48h10M95 78h10" {...stroke} className="opacity-70" />
      <circle r="2.6" fill="currentColor">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M20 48 H100" />
      </circle>
      <circle r="2.6" fill="currentColor" opacity="0.7">
        <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" path="M60 48 V78 H100" />
      </circle>
    </svg>
  );
}

/** Layered defences with a sweep. */
export function SecurityGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true">
      <circle cx="60" cy="48" r="40" {...stroke} className="opacity-30" />
      <circle cx="60" cy="48" r="28" {...stroke} className="opacity-50" />
      <circle cx="60" cy="48" r="16" {...stroke} className="opacity-80" />
      <path d="M60 4 V92 M16 48 H104" {...stroke} className="opacity-20" />
      <g className="origin-center animate-sweep [transform-box:view-box]">
        <path d="M60 48 L60 8 A40 40 0 0 1 94.6 28 Z" fill="currentColor" opacity="0.14" />
        <line x1="60" y1="48" x2="60" y2="8" {...stroke} />
      </g>
      <path
        d="M60 39 l7 3 v6 c0 5 -3 8 -7 10 c-4 -2 -7 -5 -7 -10 v-6 z"
        fill="rgb(var(--panel))"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="86" cy="30" r="2.2" fill="rgb(var(--warn))" />
      <circle cx="34" cy="66" r="2.2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
