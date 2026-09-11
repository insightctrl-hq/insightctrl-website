import EngagementTierCard from '../components/EngagementTierCard'
import IntakeButton from '../components/IntakeButton'
import { TALLY_URL, TALLY_FDI_URL } from '../constants/links'

const TIERS = [
  {
    badge: 'Consult',
    title: 'Operating Room (Personal)',
    description: 'One founder, one specific question, one session.',
    price: '₦50,000',
    ctaLabel: 'Book this session',
  },
  {
    badge: 'Consult',
    title: 'Operating Room (Organisation)',
    description:
      'Leadership team session, up to four people, written diagnostic summary delivered within 48 hours.',
    price: '₦250,000',
    ctaLabel: 'Book this session',
  },
  {
    badge: 'Build',
    title: 'Full Build',
    description:
      'The strategy is clear. The systems are not. We come in and build them with you.',
    price: 'Project-based',
    ctaLabel: 'Start a conversation',
  },
  {
    badge: 'Partner',
    title: 'Partner',
    description:
      'Some visions take longer than a project. We work with a select few founders as their long-term operational partner.',
    price: 'By application',
    ctaLabel: 'Apply to partner',
    highlight: true,
  },
]

const openTally = (url) => window.open(url, '_blank', 'noopener,noreferrer')

function Book() {
  return (
    <div className="container-content">
      <section className="py-20">
        <p className="text-eyebrow">Book a session</p>
        <h1 className="mt-5 text-hero">Let's talk.</h1>
      </section>

      <section className="section-divider py-20">
        <p className="text-eyebrow">Engagements</p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TIERS.map((tier) => (
            <EngagementTierCard
              key={tier.title}
              {...tier}
              onCtaClick={() => openTally(TALLY_URL)}
            />
          ))}
        </div>
      </section>

      <section className="section-divider py-20">
        <p className="text-eyebrow">Investors</p>
        <p className="mt-5 max-w-[36rem] text-body">
          For investors assessing operational readiness of a business or portfolio company,
          reach out directly.
        </p>
        <div className="mt-8">
          <IntakeButton label="Reach out" url={TALLY_FDI_URL} variant="outline" />
        </div>
      </section>
    </div>
  )
}

export default Book
