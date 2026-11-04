import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Badge from '../components/Badge'
import HeroArc from '../components/HeroArc'
import InverseBand from '../components/InverseBand'
import { DIAGNOSTIC_STAGES } from '../data/diagnosticStages'
import { PROJECTS } from '../data/projects'

// Names as the ABOUT INSIGHTCTRL doc gives them.
const CORE_STRENGTHS = [
  'Structural Diagnosis',
  'Systems Thinking',
  'Operational Strategy',
  'Enterprise Architecture',
]

// Names from the ABOUT doc. Descriptions are Chibueze's to supply.
const FAILURE_TYPES = [
  'Structural Failure',
  'Strategic Misalignment',
  'Operational Breakdown',
  'Revival/Reconstruction Failure',
]

const ENGAGEMENTS = [
  {
    badge: 'Consult',
    title: 'Operating Room',
    description:
      'Sixty minutes with an InsightCTRL advisor. Walk in with a question. Leave with a direction.',
    ctaLabel: 'Book a session',
  },
  {
    badge: 'Build',
    title: 'Full Build',
    description: 'The strategy is clear. The systems are not. We come in and build them with you.',
    ctaLabel: 'Start a build',
  },
  {
    badge: 'Partner',
    title: 'Partner',
    description:
      'Some visions take longer than a project. We work with a select few founders as their long-term operational partner.',
    ctaLabel: 'Apply to partner',
    highlight: true,
  },
]

const pad = (n) => String(n).padStart(2, '0')

function Arrow() {
  return <span aria-hidden="true">→</span>
}

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <section className="container-content pb-12 pt-12 md:pt-14">
        <div className="grid items-center gap-x-8 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <p className="text-eyebrow">Port Harcourt, Nigeria — Operational Advisory</p>
            <h1 className="mt-8 text-balance text-hero xl:text-[3.75rem]">
              <span className="mb-4 block text-[1.25rem] font-medium leading-[1.4] tracking-[-0.01em] text-text-secondary md:text-[1.5rem]">
                Without defined systems and structure,
              </span>
              {/* each sentence starts its own line; the no-break spaces stop "a" and
                  "at" stranding at a line end */}
              <span className="block">you don't have a{' '}business.</span>
              <span className="block">You have chaos operating at{' '}scale.</span>
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-[1.65] text-text-secondary">
              We bring the insight that puts CTRL back in your hands.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button
                label="Start with a diagnosis"
                size="lg"
                onClick={() => navigate('/diagnostic')}
              />
              <Link to="/services" className="text-link">
                Explore services <Arrow />
              </Link>
            </div>
          </div>

          <div className="hidden justify-self-end xl:block">
            <HeroArc />
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-eyebrow">Core strengths</p>
          <ul className="mt-5 grid grid-cols-2 gap-y-4 md:grid-cols-4 md:divide-x md:divide-border">
            {CORE_STRENGTHS.map((strength) => (
              <li
                key={strength}
                className="pr-4 text-[0.9375rem] font-medium tracking-[-0.01em] text-text-primary md:px-6 md:first:pl-0"
              >
                {strength}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InverseBand className="pb-24 pt-20">
        <div className="container-content">
          <p className="text-eyebrow">Four failure types</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <h2 className="max-w-[18ch] text-balance text-section-headline md:text-[2.75rem] md:leading-[1.1]">
              You may have been solving the wrong problem.
            </h2>
            <Link to="/diagnostic" className="text-link">
              Take the free diagnostic <Arrow />
            </Link>
          </div>

          <ol className="mt-14 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {FAILURE_TYPES.map((name, i) => (
              <li
                key={name}
                className="border-b border-border py-7 sm:pr-6 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0"
              >
                <span className="text-eyebrow tabular-nums">{pad(i + 1)}</span>
                <h3 className="mt-4 text-[1.25rem] font-semibold leading-[1.25] tracking-[-0.01em] text-text-primary">
                  {name}
                </h3>
                <p className="mt-3 text-[0.8125rem] leading-[1.6] text-text-muted">
                  [Description from the ABOUT doc]
                </p>
              </li>
            ))}
          </ol>
        </div>
      </InverseBand>

      <section className="container-content py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <p className="text-eyebrow">Our framework</p>
            <h2 className="mt-5 text-section-headline">From Chaos to CTRL.</h2>
            <p className="mt-5 max-w-[30rem] text-body">
              A seven-stage operational engineering sequence that moves a business from structural
              chaos to founder control. Every visible problem in a business traces back to a broken
              earlier stage. We find that stage and build from there.
            </p>
            <Link to="/about" className="text-link mt-8">
              Learn more <Arrow />
            </Link>
          </div>

          <ol className="border-t border-border">
            {DIAGNOSTIC_STAGES.map((stage, i) => (
              <li
                key={stage.id}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-border py-5"
              >
                <span className="pt-1 text-eyebrow tabular-nums">{pad(i + 1)}</span>
                <div>
                  <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-text-primary">
                    {stage.name}
                  </h3>
                  <p className="mt-1 text-body">{stage.question}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-content border-t border-border py-24">
        <p className="text-eyebrow">Work with us</p>
        <ul className="mt-10 grid md:grid-cols-3">
          {ENGAGEMENTS.map((tier) => (
            <li
              key={tier.title}
              className="relative flex flex-col border-b border-border py-8 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
            >
              {tier.highlight && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] bg-brand-gradient md:left-8"
                />
              )}
              <p className="text-eyebrow">{tier.badge}</p>
              <h3 className="mt-4 text-[1.5rem] font-semibold tracking-[-0.015em] text-text-primary">
                {tier.title}
              </h3>
              <p className="mt-3 flex-1 text-body">{tier.description}</p>
              <Link to="/book" className="text-link mt-6 self-start">
                {tier.ctaLabel} <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-content border-t border-border py-24">
        <div className="flex items-end justify-between gap-6">
          <p className="text-eyebrow">Projects</p>
          <Link to="/projects" className="text-link">
            All projects <Arrow />
          </Link>
        </div>
        <ul className="mt-10 grid gap-14 md:grid-cols-2 md:gap-10">
          {PROJECTS.slice(0, 2).map(({ home, ...base }) => {
            const project = { ...base, ...home }
            return (
              <li key={project.client} className="min-w-0">
                <div className="flex aspect-[16/10] items-center justify-center rounded-lg border border-dashed border-border-accent">
                  <span className="text-eyebrow">{project.client} photo, to supply</span>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <h3 className="min-w-0 break-words text-[1.5rem] font-semibold tracking-[-0.015em] text-text-primary">
                    {project.client}
                  </h3>
                  {project.status && <Badge label={project.status} variant="success" />}
                </div>
                <p className="mt-1 text-[0.8125rem] text-text-muted">
                  {[project.industry, project.engagementType].filter(Boolean).join(' · ')}
                </p>
                <p className="mt-4 text-body">{project.description}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <InverseBand className="py-28">
        <div className="container-content">
          <h2 className="max-w-[20ch] text-balance text-hero">
            Insight into what is broken. CTRL over how it gets fixed.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              label="Start with a diagnosis"
              size="lg"
              onClick={() => navigate('/diagnostic')}
            />
            <Link to="/book" className="text-link">
              Book a session <Arrow />
            </Link>
          </div>
        </div>
      </InverseBand>
    </>
  )
}

export default Home
