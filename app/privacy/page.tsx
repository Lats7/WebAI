import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { CELL_X } from '@/components/shared/Section';
import { COMPANY } from '@/lib/constants';
import { breadcrumbData, pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

/**
 * OWNER NOTE: this page describes what the site does as built on the date
 * below. Read it before relying on it, and update it when the site changes.
 * In particular it says there are no advertising cookies or tracking pixels.
 * If you add a LinkedIn, Google, or Meta tag for ad campaigns, that statement
 * stops being true and this page must change first.
 */

const UPDATED = '20 November 2026';
const hasRealAbn = /[1-9]/.test(COMPANY.abn);

export const metadata = pageMetadata({
  title: 'Privacy',
  description:
    'What the WebAI ProTech website collects, why, where it goes, and what you can ask us to do with it. No advertising cookies and no tracking pixels.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'Privacy', path: '/privacy' }])} />
      <PageHero
        eyebrow="Privacy"
        title={
          <>
            What we collect, <span className="accent-word">and why.</span>
          </>
        }
        lead={
          <p>
            The short version: we collect what you choose to send us, plus anonymous page counts. No advertising
            cookies, no tracking pixels, and nothing sold or traded.
          </p>
        }
      />

      <section className="relative">
        <div className="frame">
          <div className={cn(CELL_X, 'cell cell-marks py-16 lg:py-24')}>
            <div className="prose-site">
              <p>
                <strong>Last updated {UPDATED}.</strong> This page covers the website at{' '}
                {COMPANY.url.replace('https://', '')}. Work we do for clients is covered by the agreement for that
                work.
              </p>

              <h2>Who we are</h2>
              <p>
                {COMPANY.fullName} is a technology consultancy based in {COMPANY.location}.
                {hasRealAbn && <> {COMPANY.abn}.</>} For anything on this page, email{' '}
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or call {COMPANY.phone}.
              </p>

              <h2>What we collect</h2>
              <h3>When you send a brief</h3>
              <p>
                Your name, email address, company (if you give it), what you are interested in, and your message.
                We also receive three things about how you arrived: the page you landed on, the site that linked
                you here, and any campaign tags in that link. Those are held in your browser tab and are sent only
                if you send a brief.
              </p>
              <h3>When you browse</h3>
              <p>
                Anonymous page-view counts, through Vercel Web Analytics. It sets no cookies. Visits are counted
                with a short-lived hash that is discarded after 24 hours and does not identify you.
              </p>
              <h3>When you use the self-check</h3>
              <p>
                Your answers stay in your browser. They reach us only if you choose to include your result in a
                brief.
              </p>
              <h3>Stored in your browser</h3>
              <p>
                Your choice of site style (Mission Control or Workspace), so the site looks the same when you come
                back. This never leaves your device.
              </p>
              <h3>What we do not collect</h3>
              <ul>
                <li>No advertising cookies and no tracking pixels.</li>
                <li>No purchased or traded contact lists.</li>
                <li>No sensitive information. Please do not put any in a brief.</li>
              </ul>

              <h2>Why we collect it</h2>
              <ul>
                <li>To reply to your enquiry and scope the work you ask about.</li>
                <li>To see which pages and campaigns are useful, so we can improve the site.</li>
              </ul>
              <p>
                We do not sell or trade personal information. We do not add you to a mailing list because you sent
                a brief. If we ever send marketing email, it will be because you asked for it, and every message
                will say who it is from and how to stop it.
              </p>

              <h2>Where it goes</h2>
              <p>We use a small number of service providers to run the site and our email:</p>
              <ul>
                <li>
                  <strong>Vercel</strong> hosts the site and provides the anonymous analytics.
                </li>
                <li>
                  <strong>An email delivery service</strong> passes your brief to our inbox.
                </li>
                <li>
                  <strong>Google Workspace</strong> provides our email.
                </li>
              </ul>
              <p>
                These providers may store or process information outside Australia, including in the United
                States.
              </p>

              <h2>How long we keep it</h2>
              <p>
                We keep enquiries for as long as we need them to respond and to keep proper business records, and
                then delete them. Ask us to delete yours sooner and we will, unless the law requires us to keep
                it.
              </p>

              <h2>How we protect it</h2>
              <p>
                We take reasonable steps to protect the information we hold, and we limit access to the people who
                need it to respond to you.
              </p>

              <h2>Your choices</h2>
              <p>
                You can ask what information we hold about you, ask us to correct it, or ask us to delete it. Email{' '}
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> and we will respond within a reasonable
                time.
              </p>

              <h2>Automated decisions</h2>
              <p>We do not use your personal information to make automated decisions about you.</p>

              <h2>Complaints</h2>
              <p>
                If you think we have mishandled your information, tell us first at{' '}
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> so we can put it right. If you are not
                satisfied with our response, you can contact the Office of the Australian Information Commissioner
                at <a href="https://www.oaic.gov.au/">oaic.gov.au</a>.
              </p>

              <h2>Changes to this page</h2>
              <p>
                When the site changes what it collects, this page changes first and the date at the top is updated.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
