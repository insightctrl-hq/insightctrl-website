import ClosingBand from '../components/ClosingBand'
import { PRODUCTS } from '../data/products'
import { TALLY_URL, TALLY_FDI_URL } from '../constants/links'

// Engagement copy is carried over from the old Book page. Prices are the public ones.
const ENGAGEMENTS = [
  {
    name: 'Operating Room',
    description: 'One session on one specific question.',
    prices: [
      '₦50,000 for a founder',
      '₦250,000 for a leadership team of up to four, with a written diagnostic summary within 48 hours',
    ],
    cta: 'Book the Operating Room',
  },
  {
    name: 'Full Build',
    description: 'The strategy is clear. The systems are not. We come in and build them with you.',
    prices: ['Project-based'],
    cta: 'Start a conversation',
  },
  {
    name: 'Partner',
    description:
      'Some visions take longer than a project. We work with a select few founders as their long-term operational partner.',
    prices: ['By application'],
    cta: 'Apply to partner',
  },
]

const external = { target: '_blank', rel: 'noopener noreferrer' }

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
          <h2 className="text-section-headline">Ways to work with us</h2>
          <div className="mt-14 grid gap-x-14 gap-y-16 lg:grid-cols-3">
            {ENGAGEMENTS.map((engagement) => (
              <div key={engagement.name} className="flex max-w-[26rem] flex-col">
                <h3 className="text-[1.375rem] font-bold tracking-[-0.01em]">{engagement.name}</h3>
                <p className="mt-3 text-body">{engagement.description}</p>
                <ul className="mt-6 space-y-2">
                  {engagement.prices.map((price) => (
                    <li key={price} className="text-[1.0625rem] font-medium leading-[1.5] text-text-primary">
                      {price}
                    </li>
                  ))}
                </ul>
                <a href={TALLY_URL} {...external} className="text-link mt-6 self-start">
                  {engagement.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-20 max-w-[36rem] text-body">
            Investors assessing the operational readiness of a business or portfolio company can{' '}
            <a href={TALLY_FDI_URL} {...external} className="text-link">
              reach out directly
            </a>
            .
          </p>
        </div>
      </section>

      <section className="container-content">
        <div className="border-t border-border py-24">
          <h2 className="text-section-headline">Products we build</h2>
          <div className="mt-14 space-y-24">
            {PRODUCTS.map((product) => (
              <article key={product.name}>
                <div className="grid gap-x-14 gap-y-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
                  <div>
                    <p className="text-eyebrow">{product.name}</p>
                    <h3 className="mt-2 text-balance text-[1.875rem] font-bold leading-[1.15] tracking-[-0.02em] md:text-[2.5rem]">
                      {product.tagline}
                    </h3>
                  </div>
                  <p className="max-w-[30rem] text-body lg:pb-1">{product.description}</p>
                </div>
                {/* On phones the whole screen would shrink past reading, so it shows
                    the left part at a size where the numbers can be read. */}
                <div className="mt-10 overflow-hidden rounded-xl border border-border">
                  <img
                    src={product.image}
                    alt={product.alt}
                    width={product.width}
                    height={product.height}
                    className="block aspect-[4/3] w-full object-cover object-left-top md:aspect-auto md:h-auto"
                  />
                </div>
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
