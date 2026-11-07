import { Link } from 'react-router-dom'
import ChaosToArc from '../components/ChaosToArc'
import ClosingBand from '../components/ClosingBand'
import SignalTraces from '../components/SignalTraces'

// The six core values were cut: the ABOUT INSIGHTCTRL doc lists them without saying
// what they mean. In their place, one belief from the same doc, approved Nov 2026.
const BELIEF = {
  unseen:
    'Without a system, revenue is the only signal a founder can see. Chaos stays invisible until it kills the business.',
  seen: 'Structure makes the other signals visible.',
}

// The team section is out for now (user's call, Nov 2026). Bios, if it returns:
// Chibueze Obunadike: Operational strategy, systems design, and client engagement.
// Chukwuebuka Abah: Operational review, strategy pressure-testing, and engagement oversight.

function About() {
  return (
    <>
      <section className="container-content pb-16 pt-14 md:pt-20">
        {/* same grid and arc placement as Home, so the arc sits in the same spot */}
        <div className="grid items-center gap-x-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <p className="text-eyebrow">Who we are</p>
            <h1 className="mt-8 text-balance text-hero">Vision builders are the future of Africa.</h1>
            <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-[1.65] text-text-secondary">
              Running the business behind the vision is a different skill. We take care of the
              structure so you can do what you do best.
            </p>
            <Link to="/insights" className="text-link mt-8">
              Learn more
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
          <p className="text-eyebrow">Our framework</p>
          <h2 className="mt-5 text-section-headline">From Chaos to CTRL.</h2>
          <p className="mt-5 max-w-[36rem] text-body">
            A seven-stage operational engineering sequence that moves a business from structural
            chaos to founder control. Every visible problem in a business traces back to a broken
            earlier stage. We find that stage and build from there.
          </p>
          <Link to="/insights" className="text-link mt-6">
            Learn more
          </Link>
        </div>
      </section>

      <section className="container-content">
        <div className="grid items-center gap-x-16 gap-y-14 border-t border-border py-28 md:py-36 lg:grid-cols-[minmax(0,1fr)_400px]">
          {/* The statement goes from faint to full ink, the way the signals it
              describes go from invisible to visible. */}
          <blockquote className="max-w-[40rem] text-balance text-[1.875rem] font-bold leading-[1.15] tracking-[-0.02em] md:text-[2.5rem] lg:text-[3.3125rem] lg:leading-[1.08]">
            <span className="text-text-muted">{BELIEF.unseen}</span>
            <span className="mt-[0.35em] block text-text-primary">{BELIEF.seen}</span>
          </blockquote>
          <SignalTraces />
        </div>
      </section>

      <ClosingBand />
    </>
  )
}

export default About
