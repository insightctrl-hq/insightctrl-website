import { Link } from 'react-router-dom'
import ChaosToArc from '../components/ChaosToArc'

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
  return (
    <div className="container-content">
      <section className="grid items-center gap-x-10 pb-6 pt-12 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p className="text-eyebrow">Who we are</p>
          <h1 className="mt-5 text-section-headline">
            Vision builders are the future of Africa. Running the business behind the vision is
            a different skill. We take care of the structure so you can do what you do best.
          </h1>
          <Link
            to="/thinking"
            className="mt-5 inline-block text-[13px] font-medium text-accent-cyan transition-colors hover:text-text-primary"
          >
            Learn more →
          </Link>
        </div>

        <div className="hidden lg:block">
          <ChaosToArc />
        </div>
      </section>

      <section className="section-divider pb-20 pt-6">
        <p className="text-eyebrow">Our framework</p>
        <h2 className="mt-5 text-section-headline">From Chaos to CTRL.</h2>
        <p className="mt-5 max-w-[36rem] text-body">
          A seven-stage operational engineering sequence that moves a business from structural
          chaos to founder control. Every visible problem in a business traces back to a broken
          earlier stage. We find that stage and build from there.
        </p>
      </section>

      <section className="section-divider py-20">
        <p className="text-eyebrow">The team</p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {TEAM.map((member) => (
            <div key={member.name} className="card">
              <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-text-primary">
                {member.name}
              </h3>
              <p className="mt-2 text-body">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
