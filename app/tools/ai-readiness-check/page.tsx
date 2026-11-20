import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { SelfCheck } from '@/components/tools/SelfCheck';
import { breadcrumbData, pageMetadata } from '@/lib/seo';

const PATH = '/tools/ai-readiness-check';

export const metadata = pageMetadata({
  title: 'Free AI readiness self-check',
  description:
    'Ten questions, two minutes. See how ready your business is to use AI safely, and what to fix first. No sign-up, and nothing you enter leaves your browser.',
  path: PATH,
});

export default function SelfCheckPage() {
  return (
    <>
      <JsonLd data={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'AI readiness self-check', path: PATH }])} />
      <PageHero
        eyebrow="Free self-check"
        trail={[{ name: 'AI readiness self-check', path: PATH }]}
        title={
          <>
            How ready are you <span className="accent-word">to use AI safely?</span>
          </>
        }
        lead={
          <p>
            Ten questions, about two minutes. You get a score and the three things to fix first. No sign-up, and
            nothing you enter leaves your browser.
          </p>
        }
      />

      <section className="relative">
        <div className="frame">
          <div className="cell cell-marks dot-grid px-3 py-10 sm:px-6 lg:px-10 lg:py-16">
            <div className="mx-auto max-w-3xl">
              <SelfCheck />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
