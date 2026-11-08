import { Link } from 'react-router-dom'
import ChaosToArc from '../components/ChaosToArc'
import ClosingBand from '../components/ClosingBand'
import { FOUNDERS } from '../data/founders'

// Hero approved 8 Nov 2026. It carries the revenue-signal belief that used to sit
// lower down, so that section is gone rather than saying it twice.
function About() {
  return (
    <>
      <section className="container-content pb-16 pt-14 md:pt-20">
        {/* same grid and arc placement as Home, so the arc sits in the same spot */}
        <div className="grid items-center gap-x-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <h1 className="max-w-[40rem] text-balance text-hero">
              Without a system, chaos stays invisible until it kills your business.
            </h1>
            <p className="text-lead mt-6 max-w-[34rem]">
              We work with you to build the strategy and systems your business runs on.
            </p>
            <Link to="/services" className="text-link mt-8">
              See how we work
            </Link>
            <div className="mt-12 lg:hidden">
              <ChaosToArc orientation="horizontal" />
            </div>
          </div>
          <div className="hidden justify-self-end lg:block">
            <ChaosToArc />
          </div>
        </div>
      </section>

      {/* the border sits inside the padding so it spans the content width, not the container */}
      <section className="container-content">
        <div className="border-t border-border py-24">
          <h2 className="text-section-headline">From Chaos to CTRL.</h2>
          <p className="mt-5 max-w-[36rem] text-body">
            A seven-stage operational engineering sequence that moves a business from structural
            chaos to founder control. Every visible problem in a business traces back to a broken
            earlier stage. We find that stage and build from there.
          </p>
          <Link to="/diagnostic" className="text-link mt-6">
            Run the diagnostic
          </Link>
        </div>
      </section>

      <section className="container-content">
        <div className="border-t border-border py-24">
          <h2 className="text-section-headline">Founders</h2>
          <p className="mt-5 max-w-[38rem] text-body">
            Both founders trained as engineers. It shapes how we see a business: as a complex,
            purposeful system of interacting components, feedback loops and resource flows, where a
            problem in one part shows up somewhere else.
          </p>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:max-w-[38rem] sm:gap-x-10">
            {FOUNDERS.map((founder) => (
              <li key={founder.name}>
                <img
                  src={founder.photo}
                  alt={`Portrait of ${founder.name}`}
                  width="640"
                  height="800"
                  loading="lazy"
                  className="block aspect-[4/5] w-full rounded-lg bg-bg-surface object-cover"
                />
                <p className="mt-4 text-[1.0625rem] font-bold">{founder.name}</p>
                <p className="mt-1 text-[0.9375rem] text-text-muted">{founder.title}</p>
                <Link
                  to={`/about/${founder.slug}`}
                  className="text-link mt-3 text-[0.9375rem]"
                  aria-label={`View profile of ${founder.name}`}
                >
                  View profile
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingBand />
    </>
  )
}

export default About
