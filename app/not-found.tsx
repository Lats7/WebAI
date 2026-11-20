import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title={
        <>
          That page <span className="accent-word">is not here.</span>
        </>
      }
      lead={<p>The link may be old, or the address may have a typo. These will get you back on track.</p>}
      actions={
        <>
          <Link href="/" className="btn btn-primary btn-lg">
            Go to the home page
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/insights" className="btn btn-secondary btn-lg">
            Read the insights
          </Link>
        </>
      }
    />
  );
}
