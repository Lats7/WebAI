import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

/**
 * Colours are stored as RGB channels in CSS variables (see app/globals.css)
 * so every token works with Tailwind opacity modifiers, e.g. `bg-accent/10`.
 * The two site styles ("mission" and "workspace") redefine the same tokens.
 */
const channel = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const sans = ['var(--font-sans)', 'system-ui', 'sans-serif'];

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: channel('--bg'),
        panel: channel('--panel'),
        raised: channel('--raised'),
        fg: {
          DEFAULT: channel('--fg'),
          2: channel('--fg-2'),
          3: channel('--fg-3'),
        },
        line: channel('--line'),
        edge: {
          DEFAULT: 'rgb(var(--line) / var(--edge-alpha))',
          strong: 'rgb(var(--line) / var(--edge-strong-alpha))',
        },
        accent: {
          DEFAULT: channel('--accent'),
          2: channel('--accent-2'),
        },
        // Amber in Mission Control (codes, attention). Matches the accent in Workspace.
        signal: channel('--signal'),
        'on-accent': channel('--on-accent'),
        ok: channel('--ok'),
        warn: channel('--warn'),
        alert: channel('--alert'),
        star: channel('--star'),
        // Signal colour inherited from the nearest [data-kind] element.
        k: channel('--k'),
      },
      fontFamily: {
        sans,
        display: sans,
        body: sans,
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        ctl: 'var(--radius-ctl)',
        chip: 'var(--radius-chip)',
        stage: 'var(--radius-stage)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        pop: 'var(--shadow-pop)',
      },
      maxWidth: {
        site: '80rem',
      },
      // `sweep` is defined in app/globals.css because the radar uses it too.
      keyframes: {
        ping: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        dash: {
          to: { strokeDashoffset: '-24' },
        },
        travel: {
          '0%': { top: '0%', opacity: '0' },
          '8%': { opacity: '1' },
          '92%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        flow: {
          '0%': { left: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { left: '100%', opacity: '0' },
        },
        orbit: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        sweep: 'sweep 9s linear infinite',
        ping: 'ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite',
        dash: 'dash 1.6s linear infinite',
        travel: 'travel 5s linear infinite',
        flow: 'flow 3.2s linear infinite',
        orbit: 'orbit 40s linear infinite',
        'orbit-reverse': 'orbit 60s linear infinite reverse',
      },
    },
  },
  plugins: [
    // `mc:` styles apply in Mission Control, `ws:` styles apply in Workspace.
    plugin(({ addVariant }) => {
      addVariant('mc', ':root[data-theme="mission"] &');
      addVariant('ws', ':root[data-theme="workspace"] &');
    }),
  ],
};

export default config;
