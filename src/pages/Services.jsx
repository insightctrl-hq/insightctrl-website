import ClosingBand from '../components/ClosingBand'
import { PRODUCTS } from '../data/products'
import { TALLY_URL } from '../constants/links'

// Every link opens the intake form tagged with where it came from, so a request
// arrives already sorted. (Add a hidden field named "source" in Tally to see it.)
// Partner should move to its own application form once that exists.
const intake = (source) => `${TALLY_URL}?source=${source}`

// Operating Room prices are pending Chibueze's decision (per seat or per session),
// so no price shows for it yet.
const ENGAGEMENTS = [
  {
    name: 'Operating Room',
    formats: [
      {
        name: 'Tactical Sprint',
        description:
          'A one-hour session on one specific question or task. Best for fast-moving teams and projects with short planning-to-execution times.',
        cta: 'Book a Tactical Sprint',
        source: 'operating-room-sprint',
      },
      {
        name: 'Deep Work',
        description:
          'A three-hour strategy session with your entire business and operations as the focus.',
        cta: 'Book a Deep Work session',
        source: 'operating-room-deep-work',
      },
    ],
  },
  {
    name: 'Full Build',
    description:
      'We deliver the strategy and come on board to handle operations and execution for a specific project.',
    price: 'Priced per project',
    cta: 'Start a conversation',
    source: 'full-build',
  },
  {
    name: 'Partner',
    description:
      'Some visions take longer than a project. We work with a select few founders as their long-term operational partner.',
    price: 'By application',
    cta: 'Apply to partner',
    source: 'partner',
  },
]

const external = { target: '_blank', rel: 'noopener noreferrer' }

function IntakeLink({ source, children }) {
  return (
    <a href={intake(source)} {...external} className="text-link mt-5 self-start">
      {children}
    </a>
  )
}

function Services() {
  return (
    <>
      <section className="container-content pb-20 pt-16 md:pb-28 md:pt-24">
        <h1 className="max-w-[48rem] text-balance text-hero">
          A business is a whole entity, not an instrument.
        </h1>
        <p className="text-lead mt-6 max-w-[38rem]">
          Strategy is seeing the entire system and knowing which levers to pull to get results.
        </p>
      </section>

      <section className="container-content">
        <div className="border-t border-border py-24">
          <h2 className="text-section-headline">Engagements</h2>
          <div className="mt-14 grid gap-x-14 gap-y-16 lg:grid-cols-3">
            {ENGAGEMENTS.map((engagement) => (
              <div key={engagement.name} className="flex max-w-[26rem] flex-col">
                <h3 className="text-[1.375rem] font-bold tracking-[-0.01em]">{engagement.name}</h3>
                {engagement.formats ? (
                  <div className="mt-4 space-y-8">
                    {engagement.formats.map((format) => (
                      <div key={format.name} className="flex flex-col">
                        <h4 className="text-[1.0625rem] font-medium text-text-primary">
                          {format.name}
                        </h4>
                        <p className="mt-1 text-body">{format.description}</p>
                        <IntakeLink source={format.source}>{format.cta}</IntakeLink>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="mt-4 text-body">{engagement.description}</p>
                    <p className="mt-5 text-[1.0625rem] font-medium text-text-primary">
                      {engagement.price}
                    </p>
                    <IntakeLink source={engagement.source}>{engagement.cta}</IntakeLink>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Previews only. A full Tools & Products page will hold everything we build. */}
      <section className="container-content">
        <div className="border-t border-border py-24">
          <h2 className="text-section-headline">Tools &amp; Products</h2>
          <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {PRODUCTS.map((product) => (
              <article key={product.name} className="flex flex-col">
                <div className="overflow-hidden rounded-lg border border-border">
                  <img
                    src={product.image}
                    alt={product.alt}
                    width={product.width}
                    height={product.height}
                    className="block aspect-[16/10] w-full object-cover object-left-top"
                  />
                </div>
                <p className="text-eyebrow mt-6">
                  <span className="text-text-primary">{product.name}</span>
                  <span className="ml-3">In testing</span>
                </p>
                <h3 className="mt-2 text-[1.375rem] font-bold leading-[1.25] tracking-[-0.01em]">
                  {product.tagline}
                </h3>
                <p className="mt-2 max-w-[30rem] text-body">{product.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClosingBand />
    </>
  )
}

export default Services
