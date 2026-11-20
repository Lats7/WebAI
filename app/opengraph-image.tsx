import { ImageResponse } from 'next/og';
import { COMPANY } from '@/lib/constants';

export const alt = `${COMPANY.fullName}: AI agents, automation, and cyber security`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TAGS = ['Agentic AI', 'Automation', 'Cyber security', 'CRM', 'Web and apps'];

/** Social share card, drawn in the Mission Control style. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: '#05080d',
          backgroundImage:
            'radial-gradient(circle at 80% -10%, rgba(64,196,255,0.28), transparent 55%), linear-gradient(rgba(140,165,210,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(140,165,210,0.07) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
          color: '#e9eff9',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              border: '2px solid rgba(64,196,255,0.7)',
              backgroundColor: 'rgba(64,196,255,0.12)',
              color: '#40c4ff',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            W
          </div>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
            <span>Web</span>
            <span style={{ color: '#40c4ff' }}>AI</span>
            <span style={{ marginLeft: 14, color: '#7c8aa4', fontSize: 20, letterSpacing: 5, alignSelf: 'center' }}>
              PROTECH
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 86, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02 }}>
            Build the agent.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 86,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1.02,
              color: '#40c4ff',
            }}
          >
            Prove it's safe.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {TAGS.map((tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  padding: '10px 16px',
                  border: '1px solid rgba(140,165,210,0.3)',
                  backgroundColor: 'rgba(17,24,36,0.8)',
                  color: '#aab6cc',
                  fontSize: 20,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', color: '#7c8aa4', fontSize: 22 }}>{COMPANY.location}</div>
        </div>
      </div>
    ),
    size
  );
}
