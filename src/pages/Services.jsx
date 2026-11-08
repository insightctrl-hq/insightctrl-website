import ClosingBand from '../components/ClosingBand'
import { PRODUCTS } from '../data/products'
import { TALLY_URL, TALLY_PARTNER_URL } from '../constants/links'

// Every link opens a form tagged with where it came from, so a request arrives
// already sorted. (Add a hidden field named "source" in Tally to see it.)
// Partner goes to its own application form; everything else to the intake form.
const intake = (source) =>
  `${source === 'partner' ? TALLY_PARTNER_URL : TALLY_URL}?source=${source}`

// Copy and prices approved by Chibueze, 8 Nov 2026.
const ENGAGEMENTS = [
  {
    name: 'Operating Room',
    description:
      'One hour on one specific question or task. You get a written diagnostic report within 24 hours.',
    price: ['₦50,000', 'Extra time is ₦25,000 per 30 minutes.'],
    cta: 'Book the Operating Room',
    source: 'operating-room',
  },
  {
    name: 'Operating Room (Roundtable)',
    description:
      'A half day with your leadership team, with the whole business and its operations on the table. You get a written diagnostic summary within 48 hours.',
    price: [
      // non-breaking spaces keep 'up to 10' from dropping onto a line of its own
      '₦250,000 for up to 4 people, then ₦50,000 per extra\u00a0person,\u00a0up\u00a0to\u00a010.',
      'Extra time is ₦50,000 per 30 minutes.',
    ],
    cta: 'Book a Roundtable',
    source: 'operating-room-roundtable',
  },
  {
    name: 'Full Build',
    description:
      'We deliver the strategy and come on board to handle operations and execution for a specific time-bound project.',
    price: ['Priced per project'],
    cta: 'Start a conversation',
    source: 'full-build',
  },
  {
    name: 'Partner',
    description:
      'Some visions take longer than a project. We work with a select few founders as their long-term operational partner.',
    price: ['By application'],
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
          <div className="mt-14 grid gap-x-16 gap-y-16 md:grid-cols-2">
            {ENGAGEMENTS.map((engagement) => (
              <div key={engagement.name} className="flex max-w-[30rem] flex-col">
                <h3 className="text-[1.375rem] font-bold tracking-[-0.01em]">{engagement.name}</h3>
                <p className="mt-3 text-body">{engagement.description}</p>
                {/* the first line is the price; any line after it is a condition */}
                <div className="mt-5 space-y-1">
                  {engagement.price.map((line, i) => (
                    <p
                      key={line}
                      className={
                        i === 0
                          ? 'text-[1.0625rem] font-medium text-text-primary'
                          : 'text-[0.9375rem] text-text-muted'
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <IntakeLink source={engagement.source}>{engagement.cta}</IntakeLink>
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
