import { Link } from 'react-router-dom'
import ChaosToArc from '../components/ChaosToArc'
import ClosingBand from '../components/ClosingBand'

// The six core values were cut: the ABOUT INSIGHTCTRL doc lists them without saying
// what they mean. In their place, one belief from the same doc, approved Nov 2026.
const BELIEF = [
  'Without a system, revenue is the only signal a founder can see. Chaos stays invisible until it kills the business.',
  'Structure makes the other signals visible.',
]

// Names and titles approved 8 Nov 2026. "View profile" links come once the bios
// are written and approved. Ebuka's photo is a low-resolution stand-in.
const FOUNDERS = [
  { name: 'Chibueze Obunadike', title: 'Co-founder', photo: '/team/chibueze-obunadike.jpg' },
  { name: 'Chukwuebuka Abah', title: 'Co-founder', photo: '/team/chukwuebuka-abah.jpg' },
]

function About() {
  return (
    <>
      <section className="container-content pb-16 pt-14 md:pt-20">
        {/* same grid and arc placement as Home, so the arc sits in the same spot */}
        <div className="grid items-center gap-x-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <h1 className="text-balance text-hero">Vision builders are the future of Africa.</h1>
            <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-[1.65] text-text-secondary">
              Running the business behind the vision is a different skill. We take care of the
              structure so you can do what you do best.
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
        <div className="border-t border-border py-28 md:py-36">
          {/* one colour throughout: picking out one phrase is a generated-page tell */}
          <blockquote className="max-w-[52rem] text-balance text-[1.875rem] font-bold leading-[1.15] tracking-[-0.02em] text-text-primary md:text-[2.5rem] lg:text-[3.3125rem] lg:leading-[1.08]">
            {BELIEF.map((sentence) => (
              <span key={sentence} className="block [&+&]:mt-[0.35em]">
                {sentence}
              </span>
            ))}
          </blockquote>
        </div>
      </section>

      <section className="container-content">
        <div className="border-t border-border py-24">
          <h2 className="text-section-headline">Founders</h2>
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
