/**
 * Line-art figures for the three core disciplines.
 * Strokes use currentColor at different strengths, so one drawing serves both
 * site styles. Accent parts use the theme accent.
 */

interface FigureProps {
  className?: string;
}

const VIEW = '0 0 320 240';
const CX = 160;
const CY = 120;

const thin = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  vectorEffect: 'non-scaling-stroke' as const,
};

const origin = { transformOrigin: `${CX}px ${CY}px`, transformBox: 'view-box' as const };

function polar(radius: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180;
  return { x: CX + radius * Math.cos(radians), y: CY + radius * Math.sin(radians) };
}

/** An orchestrator with sub-agents on the inner orbit and tools on the outer one. */
export function AgentFigure({ className }: FigureProps) {
  const agents = [-90, 30, 150].map((angle) => polar(62, angle));
  const tools = [-40, 40, 140, 220].map((angle) => polar(102, angle));

  return (
    <svg viewBox={VIEW} className={className} aria-hidden="true">
      <circle cx={CX} cy={CY} r="102" {...thin} strokeDasharray="2 6" opacity="0.35" />
      <circle cx={CX} cy={CY} r="62" {...thin} strokeDasharray="3 5" opacity="0.5" />

      {/* Tools drift slowly the other way */}
      <g className="animate-orbit-reverse" style={origin}>
        {tools.map((tool, index) => (
          <rect key={index} x={tool.x - 7} y={tool.y - 7} width="14" height="14" rx="2" {...thin} opacity="0.55" />
        ))}
      </g>

      {/* Sub-agents and their links to the orchestrator */}
      <g className="animate-orbit" style={origin}>
        {agents.map((agent, index) => (
          <g key={index}>
            <line
              x1={CX}
              y1={CY}
              x2={agent.x}
              y2={agent.y}
              {...thin}
              strokeDasharray="3 5"
              className="animate-dash text-accent"
              opacity="0.8"
            />
            <circle cx={agent.x} cy={agent.y} r="11" {...thin} className="fill-[rgb(var(--bg))]" />
            <circle cx={agent.x} cy={agent.y} r="3" className="fill-accent" />
          </g>
        ))}
      </g>

      <circle cx={CX} cy={CY} r="24" {...thin} className="fill-[rgb(var(--bg))]" />
      <circle cx={CX} cy={CY} r="24" {...thin} className="text-accent" opacity="0.7" />
      <circle cx={CX} cy={CY} r="7" className="fill-accent" />
      <circle
        cx={CX}
        cy={CY}
        r="7"
        className="animate-ping fill-accent"
        style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
      />
    </svg>
  );
}

/** Three sources feed one process, which writes to two systems. */
export function AutomationFigure({ className }: FigureProps) {
  const inputs = [
    'M52 62 C 96 62, 100 120, 132 120',
    'M52 120 L 132 120',
    'M52 178 C 96 178, 100 120, 132 120',
  ];
  const outputs = ['M188 120 C 222 120, 226 78, 268 78', 'M188 120 C 222 120, 226 162, 268 162'];

  return (
    <svg viewBox={VIEW} className={className} aria-hidden="true">
      {[...inputs, ...outputs].map((path, index) => (
        <path key={path} d={path} {...thin} strokeDasharray="3 5" className="animate-dash" opacity="0.55" style={{ animationDelay: `${index * -0.3}s` }} />
      ))}

      {[62, 120, 178].map((y) => (
        <g key={y}>
          <rect x="24" y={y - 14} width="28" height="28" rx="3" {...thin} className="fill-[rgb(var(--bg))]" opacity="0.8" />
          <path d={`M32 ${y - 4}h12M32 ${y + 4}h8`} {...thin} opacity="0.5" />
        </g>
      ))}

      {/* The process */}
      <rect x="132" y="92" width="56" height="56" rx="4" {...thin} className="fill-[rgb(var(--bg))]" />
      <rect x="132" y="92" width="56" height="56" rx="4" {...thin} className="text-accent" opacity="0.8" />
      <path d="M146 110h28M146 120h28M146 130h18" {...thin} className="text-accent" />

      {[78, 162].map((y) => (
        <g key={y}>
          <rect x="268" y={y - 16} width="32" height="32" rx="3" {...thin} className="fill-[rgb(var(--bg))]" opacity="0.8" />
          <path d={`M277 ${y}l5 5 9-10`} {...thin} className="text-accent" />
        </g>
      ))}

      {/* Data in motion */}
      {inputs.map((path, index) => (
        <circle key={path} r="2.6" className="motion-dot fill-accent">
          <animateMotion dur="2.8s" begin={`${index * 0.9}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}
      {outputs.map((path, index) => (
        <circle key={path} r="2.6" className="motion-dot fill-accent">
          <animateMotion dur="2.4s" begin={`${1.2 + index * 1.1}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}
    </svg>
  );
}

/** Layered defence around an asset, with a sweep and one flagged contact. */
export function SecurityFigure({ className }: FigureProps) {
  const contact = polar(84, -38);
  const quiet = polar(60, 152);

  return (
    <svg viewBox={VIEW} className={className} aria-hidden="true">
      <path d={`M${CX} 12V228M52 ${CY}H268`} {...thin} opacity="0.18" />
      <circle cx={CX} cy={CY} r="104" {...thin} strokeDasharray="1 7" opacity="0.4" />
      <circle cx={CX} cy={CY} r="80" {...thin} opacity="0.3" />
      <circle cx={CX} cy={CY} r="56" {...thin} strokeDasharray="14 6" opacity="0.5" />
      <circle cx={CX} cy={CY} r="32" {...thin} opacity="0.75" />

      <g className="animate-sweep" style={origin}>
        <path d={`M${CX} ${CY} L${CX} 16 A104 104 0 0 1 233.5 46.5 Z`} className="fill-accent" opacity="0.12" />
        <line x1={CX} y1={CY} x2={CX} y2="16" {...thin} className="text-accent" />
      </g>

      {/* Asset at the centre */}
      <path
        d={`M${CX} ${CY - 14} l12 5 v10 c0 8 -5 13 -12 16 c-7 -3 -12 -8 -12 -16 v-10 z`}
        className="fill-[rgb(var(--bg))] text-accent"
        stroke="currentColor"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
      <path d={`M${CX - 5} ${CY + 1} l4 4 7 -8`} {...thin} className="text-accent" />

      {/* Flagged contact */}
      <circle cx={contact.x} cy={contact.y} r="3" className="fill-warn" />
      <circle
        cx={contact.x}
        cy={contact.y}
        r="3"
        className="animate-ping fill-warn"
        style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
      />
      <path d={`M${contact.x + 8} ${contact.y - 8} h16`} {...thin} className="text-warn" opacity="0.8" />
      <circle cx={quiet.x} cy={quiet.y} r="2.2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
