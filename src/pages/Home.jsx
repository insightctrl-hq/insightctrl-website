import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import EngagementTierCard from '../components/EngagementTierCard'
import CaseStudyCard from '../components/CaseStudyCard'
import RotatingWord from '../components/RotatingWord'
import HeroArc from '../components/HeroArc'

const ROTATING_WORDS = [
  'Strategy',
  'Structure',
  'Clarity',
  'Control',
  'Intelligence',
  'Diagnosis',
  'Architecture',
  'Precision',
  'Discipline',
  'Transformation',
]

function Home() {
  const navigate = useNavigate()

  return (
    <div className="container-content">
      <section className="grid items-center gap-x-10 py-12 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
        <p className="text-eyebrow">Port Harcourt, Nigeria — Operational Advisory</p>
        <h1 className="mt-5 text-hero">
          <span className="block">Operational</span>
          <RotatingWord words={ROTATING_WORDS} />
        </h1>
        <p className="mt-5 max-w-[36rem] text-body">
          Without defined systems and structure, you don't have a business. You have chaos
          operating at scale. We bring the insight that puts CTRL back in your hands.
        </p>
        <div className="mt-10">
          <Button
            label="Start with a diagnosis"
            variant="primary"
            onClick={() => navigate('/diagnostic')}
          />
        </div>
        </div>

        <div className="hidden justify-self-end lg:block">
          <HeroArc />
        </div>
      </section>

      <section className="section-divider py-20">
        <p className="text-eyebrow">Work with us</p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <EngagementTierCard
            badge="Consult"
            title="Operating Room"
            description="Sixty minutes with an InsightCTRL advisor. Walk in with a question. Leave with a direction."
            ctaLabel="Book a session"
            onCtaClick={() => navigate('/book')}
          />
          <EngagementTierCard
            badge="Build"
            title="Full Build"
            description="The strategy is clear. The systems are not. We come in and build them with you."
            ctaLabel="Start a build"
            onCtaClick={() => navigate('/book')}
          />
          <EngagementTierCard
            badge="Partner"
            title="Partner"
            description="Some visions take longer than a project. We work with a select few founders as their long-term operational partner."
            ctaLabel="Apply to partner"
            onCtaClick={() => navigate('/book')}
            highlight
          />
        </div>
      </section>

      <section className="section-divider py-20">
        <p className="text-eyebrow">Projects</p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <CaseStudyCard
            status="Live"
            client="Rereandco"
            industry="Hospitality"
            engagementType="Full Build"
            description="A Port Harcourt hospitality brand rebuilt from operational ground up. Delivered full infrastructure design: hiring architecture, financial controls, product system, and operating rhythm."
          />
          <CaseStudyCard
            status="Live"
            client="8Wings"
            industry="Logistics"
            engagementType="Full Build"
            description="A logistics and delivery business built for scale from day one. Designed the complete operational structure and business model: service architecture, delivery systems, pricing logic."
          />
        </div>
        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="mt-8 text-[13px] font-medium text-accent-cyan transition-colors hover:text-text-primary"
        >
          All projects
        </button>
      </section>
    </div>
  )
}

export default Home
