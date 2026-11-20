import { ArrowUpRight, MapPin, Star } from 'lucide-react';
import { BriefCta } from '@/components/shared/BriefCta';
import { Founder } from '@/components/shared/Founder';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { CELL_X, Section } from '@/components/shared/Section';
import { Eyebrow } from '@/components/shared/SectionHeader';
import { COMPANY, PROJECTS, STATS, TESTIMONIALS, type Project } from '@/lib/constants';
import { breadcrumbData, pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const metadata = pageMetadata({
  title: 'Work: AI, automation, and web projects',
  description:
    'A selection of AI agent, automation, web, and infrastructure projects, each with a verified client review. Rated 5.0 by clients in more than ten countries.',
  path: '/work',
});

const KINDS: Project['kind'][] = ['AI agents', 'Automation', 'Web and apps', 'Infrastructure'];

function reviewFor(project: Project) {
  return TESTIMONIALS.find((review) => review.author === project.reviewer);
}

function ProjectCard({ project }: { project: Project }) {
  const review = reviewFor(project);
  if (!review) return null;

  const detail = [
    ['Problem', project.problem],
    ['Approach', project.approach],
    ['Outcome', project.outcome],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <article className="spotlight flex h-full flex-col px-5 py-9 sm:px-8 lg:px-10 lg:py-11">
      <div className="flex items-center justify-between gap-4">
        <span className="label text-signal ws:text-fg-3">{project.kind}</span>
        <span className="flex gap-0.5 text-star" role="img" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={12} className="fill-current" aria-hidden="true" />
          ))}
        </span>
      </div>
      <h3 className="display mt-6 text-2xl text-fg">{review.project}</h3>
      {project.summary && <p className="mt-3 leading-relaxed text-fg-2">{project.summary}</p>}

      {detail.length > 0 && (
        <dl className="mt-6 space-y-4 border-t border-edge pt-6">
          {detail.map(([label, text]) => (
            <div key={label}>
              <dt className="label text-fg-3">{label}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg-2">{text}</dd>
            </div>
          ))}
        </dl>
      )}

      <figure className="mt-6 flex flex-1 flex-col justify-between border-t border-edge pt-6">
        <blockquote className="leading-relaxed text-fg">&ldquo;{review.quote}&rdquo;</blockquote>
        <figcaption className="mt-5 flex items-center gap-2 text-sm text-fg-3">
          <span className="font-medium text-fg-2">{review.author}</span>
          <span aria-hidden="true">·</span>
          <MapPin size={12} aria-hidden="true" />
          {review.location}
        </figcaption>
      </figure>
    </article>
  );
}

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }])} />
      <PageHero
        eyebrow="Work"
        trail={[{ name: 'Work', path: '/work' }]}
        title={
          <>
            Projects with <span className="accent-word">a verified review.</span>
          </>
        }
        lead={
          <p>
            A selection of what we have built, in the client&rsquo;s own words. Client details stay private unless
            they have agreed otherwise.
          </p>
        }
        actions={
          <a
            href={COMPANY.socials.freelancer}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-lg"
          >
            All {COMPANY.reviews.count} reviews on Freelancer
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        }
      />

      {/* Proof row */}
      <section className="relative">
        <div className="frame">
          <dl className="cell cell-marks grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'flex flex-col-reverse gap-2 border-edge px-5 py-7 sm:px-8 lg:px-14 lg:py-9',
                  index % 2 === 1 && 'border-l',
                  index >= 2 && 'border-t lg:border-t-0',
                  index === 2 && 'lg:border-l'
                )}
              >
                <dt className="label text-fg-3">{stat.label}</dt>
                <dd className="display text-4xl tabular-nums text-fg sm:text-5xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {KINDS.map((kind, kindIndex) => {
        const projects = PROJECTS.filter((project) => project.kind === kind && reviewFor(project));
        if (projects.length === 0) return null;
        return (
          <Section key={kind} id={kind.toLowerCase().replace(/\s+/g, '-')} flush tint={kindIndex % 2 === 1}>
            <Reveal className={cn(CELL_X, 'py-12 lg:py-16')}>
              <Eyebrow code={String(kindIndex + 1).padStart(2, '0')}>Projects</Eyebrow>
              <h2 className="display mt-6 text-[clamp(1.9rem,3.6vw,2.75rem)] text-fg">{kind}</h2>
            </Reveal>
            <ul className={cn('grid border-t border-edge md:grid-cols-2', projects.length > 2 && 'xl:grid-cols-3')}>
              {projects.map((project, index) => (
                <li
                  key={project.reviewer}
                  className={cn(
                    'border-edge',
                    index > 0 && 'border-t md:border-t-0',
                    index % 2 === 1 && 'md:border-l',
                    index >= 2 && 'md:border-t',
                    projects.length > 2 && [
                      'xl:border-l-0 xl:border-t-0',
                      index % 3 !== 0 && 'xl:border-l',
                      index >= 3 && 'xl:border-t',
                    ]
                  )}
                >
                  <Reveal delay={(index % 3) * 0.06} className="h-full">
                    <ProjectCard project={project} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </Section>
        );
      })}

      <section className="relative">
        <div className="frame">
          <p className={cn(CELL_X, 'cell py-7 text-sm leading-relaxed text-fg-3')}>
            These are {PROJECTS.length} of {COMPANY.reviews.count} reviews, shown as the clients wrote them.{' '}
            <a
              href={COMPANY.socials.freelancer}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4"
            >
              Read all of them on Freelancer
            </a>
            .
          </p>
          <Founder />
        </div>
      </section>

      <BriefCta
        source="work"
        title={
          <>
            Have a project <span className="accent-word">like these?</span>
          </>
        }
        description="Say what you want built or fixed. We will tell you honestly whether we are the right people for it."
      />
    </>
  );
}
