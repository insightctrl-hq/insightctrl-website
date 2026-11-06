import { Link } from 'react-router-dom'
import Badge from '../components/Badge'
import ChaosToArc from '../components/ChaosToArc'
import ClosingBand from '../components/ClosingBand'
import { PRODUCTS } from '../data/products'
import { WORST_TEAM, pickFixture, useDataMode } from '../dev/worstCase'

// From the ABOUT INSIGHTCTRL doc.
const VALUES = ['Vision', 'Innovation', 'Creativity', 'Insight', 'Strategy', 'Execution']

const TEAM = [
  {
    name: 'Chibueze Obunadike',
    bio: 'Operational strategy, systems design, and client engagement. Leads diagnostic architecture and the Chaos to CTRL Framework development.',
  },
  {
    name: 'Chukwuebuka Abah',
    bio: 'Operational review, strategy pressure-testing, and engagement oversight. Co-leads all client engagements.',
  },
]

function About() {
  const team = pickFixture(useDataMode(), TEAM, WORST_TEAM)

  return (
    <>
      <section className="container-content pb-16 pt-14 md:pt-20">
        <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_320px]">
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
          </div>
          <ChaosToArc className="h-[240px] lg:h-[420px]" />
        </div>

        <div className="mt-16 border-t border-border pt-6">
          <p className="text-eyebrow">Core values</p>
          <ul className="mt-5 grid grid-cols-2 gap-y-4 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-border">
            {VALUES.map((value) => (
              <li
                key={value}
                className="text-[1rem] font-medium tracking-[-0.01em] text-text-primary lg:px-6 lg:first:pl-0"
              >
                {value}
              </li>
            ))}
          </ul>
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
        <div className="grid gap-16 border-t border-border py-24 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-eyebrow">The team</p>
            <ul className="mt-8 border-t border-border">
              {team.map((member) => (
                <li key={member.name} className="border-b border-border py-6">
                  <h3 className="break-words text-[1.25rem] font-semibold tracking-[-0.01em] text-text-primary">
                    {member.name}
                  </h3>
                  {member.bio && <p className="mt-2 text-body">{member.bio}</p>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-eyebrow">What we're building</p>
            <ul className="mt-8 border-t border-border">
              {PRODUCTS.map((product) => (
                <li key={product.name} className="border-b border-border py-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[1.25rem] font-semibold tracking-[-0.01em] text-text-primary">
                      {product.name}
                    </h3>
                    <Badge label={product.status} />
                  </div>
                  <p className="mt-2 text-body">{product.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClosingBand />
    </>
  )
}

export default About
